from __future__ import annotations

from pathlib import Path
from textwrap import wrap

from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "petory-portfolio.pdf"
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")
ERD_PATH = ROOT / "src" / "assets" / "petory-erd-0131.png"

PAGE_W, PAGE_H = landscape(A4)
MARGIN = 38


PALETTE = {
    "ink": colors.HexColor("#151923"),
    "muted": colors.HexColor("#687182"),
    "line": colors.HexColor("#D9DEE8"),
    "bg": colors.HexColor("#F6F8FB"),
    "navy": colors.HexColor("#17324D"),
    "teal": colors.HexColor("#147C82"),
    "green": colors.HexColor("#2F7D50"),
    "orange": colors.HexColor("#B86A20"),
    "red": colors.HexColor("#B94A48"),
    "soft_blue": colors.HexColor("#E7F0FA"),
    "soft_teal": colors.HexColor("#E5F5F4"),
    "soft_green": colors.HexColor("#EAF5ED"),
    "soft_orange": colors.HexColor("#FFF1E4"),
}


def setup_font() -> str:
    if FONT_PATH.exists():
        pdfmetrics.registerFont(TTFont("PortfolioKR", str(FONT_PATH)))
        return "PortfolioKR"
    return "Helvetica"


FONT = setup_font()


def text_width(text: str, size: int) -> float:
    return pdfmetrics.stringWidth(text, FONT, size)


def draw_text(c: canvas.Canvas, text: str, x: float, y: float, size: int = 12, color=PALETTE["ink"]):
    c.setFillColor(color)
    c.setFont(FONT, size)
    c.drawString(x, y, text)


def draw_wrapped(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    size: int = 12,
    leading: float | None = None,
    color=PALETTE["ink"],
    max_lines: int | None = None,
) -> float:
    if leading is None:
        leading = size * 1.45
    chars = max(8, int(width / max(text_width("가", size), 1)))
    lines: list[str] = []
    for para in text.split("\n"):
        if not para:
            lines.append("")
        else:
            lines.extend(wrap(para, chars, break_long_words=False, replace_whitespace=False))
    if max_lines is not None:
        lines = lines[:max_lines]
    c.setFont(FONT, size)
    c.setFillColor(color)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def rounded_rect(c: canvas.Canvas, x: float, y: float, w: float, h: float, fill, stroke=PALETTE["line"], radius: int = 8):
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.setLineWidth(0.8)
    c.roundRect(x, y, w, h, radius, stroke=1, fill=1)


def header(c: canvas.Canvas, title: str, page: int):
    draw_text(c, "Petory Backend Portfolio", MARGIN, PAGE_H - 28, 8, PALETTE["muted"])
    draw_text(c, f"{page:02d}", PAGE_W - MARGIN - 12, PAGE_H - 28, 8, PALETTE["muted"])
    c.setStrokeColor(PALETTE["line"])
    c.setLineWidth(0.7)
    c.line(MARGIN, PAGE_H - 42, PAGE_W - MARGIN, PAGE_H - 42)
    draw_text(c, title, MARGIN, PAGE_H - 72, 22, PALETTE["navy"])


def footer(c: canvas.Canvas):
    c.setStrokeColor(PALETTE["line"])
    c.setLineWidth(0.6)
    c.line(MARGIN, 30, PAGE_W - MARGIN, 30)
    draw_text(c, "makkong1.github.io/makkong1-github.io  |  github.com/makkong1/Petory", MARGIN, 16, 7.5, PALETTE["muted"])


def card(c: canvas.Canvas, x, y, w, h, title, body, fill=colors.white, accent=PALETTE["teal"]):
    rounded_rect(c, x, y, w, h, fill)
    c.setFillColor(accent)
    c.rect(x, y + h - 4, w, 4, stroke=0, fill=1)
    draw_text(c, title, x + 14, y + h - 26, 13, PALETTE["navy"])
    draw_wrapped(c, body, x + 14, y + h - 48, w - 28, 9.5, color=PALETTE["ink"])


def stat_card(c, x, y, w, h, number, label, sub, color):
    rounded_rect(c, x, y, w, h, colors.white)
    draw_text(c, number, x + 14, y + h - 31, 22, color)
    draw_text(c, label, x + 14, y + h - 52, 10, PALETTE["ink"])
    draw_wrapped(c, sub, x + 14, y + h - 70, w - 28, 8, color=PALETTE["muted"])


def bar_chart(c, x, y, w, h, title, rows, unit="", color=PALETTE["teal"]):
    rounded_rect(c, x, y, w, h, colors.white)
    draw_text(c, title, x + 14, y + h - 25, 12, PALETTE["navy"])
    max_val = max(before for _, before, _ in rows)
    top = y + h - 52
    row_h = 34
    for i, (label, before, after) in enumerate(rows):
        yy = top - i * row_h
        draw_text(c, label, x + 14, yy + 4, 8.5, PALETTE["ink"])
        bx = x + 116
        bw = w - 176
        c.setFillColor(PALETTE["soft_blue"])
        c.rect(bx, yy + 11, bw * before / max_val, 8, stroke=0, fill=1)
        c.setFillColor(color)
        c.rect(bx, yy - 2, bw * after / max_val, 8, stroke=0, fill=1)
        draw_text(c, f"{before:g}{unit}", bx + bw + 8, yy + 9, 7.5, PALETTE["muted"])
        draw_text(c, f"{after:g}{unit}", bx + bw + 8, yy - 4, 7.5, color)


def flow_box(c, x, y, w, h, text, fill, color=PALETTE["ink"]):
    rounded_rect(c, x, y, w, h, fill)
    draw_wrapped(c, text, x + 10, y + h - 18, w - 20, 8.5, leading=11, color=color)


def arrow(c, x1, y1, x2, y2):
    c.setStrokeColor(PALETTE["muted"])
    c.setLineWidth(1)
    c.line(x1, y1, x2, y2)
    c.setFillColor(PALETTE["muted"])
    if x2 >= x1:
        c.line(x2, y2, x2 - 5, y2 + 3)
        c.line(x2, y2, x2 - 5, y2 - 3)


def new_page(c, title, page):
    c.showPage()
    header(c, title, page)
    footer(c)


def build_pdf():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=landscape(A4))
    c.setTitle("Petory Portfolio - 박영범")

    # 1
    c.setFillColor(PALETTE["bg"])
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    c.setFillColor(PALETTE["navy"])
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    c.setFillColor(PALETTE["teal"])
    c.circle(PAGE_W - 135, PAGE_H - 110, 80, stroke=0, fill=1)
    draw_text(c, "Backend Portfolio", MARGIN, PAGE_H - 110, 16, colors.white)
    draw_text(c, "Petory", MARGIN, PAGE_H - 170, 54, colors.white)
    draw_wrapped(c, "문제를 재현하고 측정하며 개선하는 백엔드 개발자 박영범", MARGIN, PAGE_H - 205, 520, 18, color=colors.white)
    draw_wrapped(c, "Spring Boot, JPA, MySQL 기반 반려동물 통합 플랫폼. N+1, 동시성, 위치 검색, NLP 호출 정책을 실제 사용자 흐름 기준으로 재현하고 개선했습니다.", MARGIN, PAGE_H - 265, 560, 13, color=colors.HexColor("#DCE9F4"))
    x = MARGIN
    for tag in ["Spring Boot", "JPA", "MySQL", "Redis", "WebSocket", "FastAPI", "React"]:
        tw = text_width(tag, 9) + 22
        rounded_rect(c, x, 92, tw, 25, colors.HexColor("#254968"), stroke=colors.HexColor("#47708E"), radius=11)
        draw_text(c, tag, x + 11, 100, 9, colors.white)
        x += tw + 8
    draw_text(c, "Portfolio site: makkong1.github.io/makkong1-github.io", MARGIN, 56, 9, colors.HexColor("#DCE9F4"))
    draw_text(c, "Backend repo: github.com/makkong1/Petory", MARGIN, 40, 9, colors.HexColor("#DCE9F4"))

    # 2
    new_page(c, "포지셔닝", 2)
    draw_wrapped(c, "문제 해결 방향", MARGIN, PAGE_H - 112, 300, 14, color=PALETTE["teal"])
    draw_wrapped(c, "기능 구현 자체보다, 기능이 실제 사용량과 동시 접근을 만났을 때 어떤 병목과 데이터 불일치가 생기는지 확인했습니다. 쿼리 수, 실행 시간, 메모리 사용량을 기준으로 Before/After를 비교하고, 같은 패턴을 여러 도메인에 재사용했습니다.", MARGIN, PAGE_H - 140, 350, 12, color=PALETTE["ink"])
    stat_card(c, 440, PAGE_H - 165, 110, 92, "99.8%", "Care 쿼리 감소", "2400개에서 4-5개", PALETTE["teal"])
    stat_card(c, 565, PAGE_H - 165, 110, 92, "24.8x", "Board 속도 개선", "745ms에서 30ms", PALETTE["green"])
    stat_card(c, 690, PAGE_H - 165, 110, 92, "4개", "Chat 목록 쿼리", "채팅방 수와 무관", PALETTE["orange"])
    card(c, MARGIN, PAGE_H - 325, 245, 110, "핵심 강점", "JPA 연관관계와 DTO 변환 과정에서 생기는 N+1을 로그와 시나리오로 추적하고, IN 절 배치 조회, Fetch Join, Map 매핑으로 해결했습니다.", PALETTE["soft_teal"], PALETTE["teal"])
    card(c, MARGIN + 265, PAGE_H - 325, 245, 110, "설계 태도", "비관적 락, 원자적 UPDATE, DB Unique 제약조건을 문제 성격별로 구분했습니다. 정합성이 중요한 기능과 부가 기능의 실패 정책도 분리했습니다.", PALETTE["soft_green"], PALETTE["green"])
    card(c, MARGIN + 530, PAGE_H - 325, 245, 110, "검증 방식", "문서와 데모를 함께 두어 문제 상황, 원인, 수정 전후 흐름, 측정 결과를 같은 저장소에서 추적할 수 있게 정리했습니다.", PALETTE["soft_orange"], PALETTE["orange"])

    # 3
    new_page(c, "프로젝트 개요", 3)
    draw_wrapped(c, "Petory는 반려동물 보호자를 위한 통합 플랫폼입니다. 커뮤니티, 펫케어 매칭, 실종 동물 신고, 위치 기반 주변 서비스, 산책 모임, 채팅, 결제, 알림, 신고 및 관리자 기능으로 구성됩니다.", MARGIN, PAGE_H - 115, PAGE_W - 2 * MARGIN, 12)
    labels = [
        ("User", "JWT, OAuth2, 이메일 인증, 반려동물, 제재"),
        ("Board", "게시판, 댓글, 반응, 인기글 스냅샷"),
        ("Care", "요청/지원, 채팅 매칭, 거래 확정, 리뷰"),
        ("Location", "공공데이터, 지도, 카테고리/반경 검색"),
        ("Recommendation", "이벤트 기반 intent signal, NLP, 추천 카드"),
        ("Meetup", "모임 생성/참여, 위치 검색, 참여자 제한"),
        ("Chat", "WebSocket/STOMP, 읽음 상태, 최신 메시지"),
        ("Common", "Payment, Notification, Report, Admin, File"),
    ]
    x0, y0 = MARGIN, PAGE_H - 185
    for i, (name, desc) in enumerate(labels):
        col, row = i % 4, i // 4
        card(c, x0 + col * 194, y0 - row * 118, 176, 82, name, desc, colors.white, [PALETTE["teal"], PALETTE["green"], PALETTE["orange"], PALETTE["navy"]][col])
    draw_text(c, "Frontend", MARGIN, 88, 12, PALETTE["navy"])
    draw_wrapped(c, "React 19, Vite, Styled Components, Recharts, Mermaid, Axios, mock 기반 라이브 데모", MARGIN, 70, 330, 9, color=PALETTE["muted"])
    draw_text(c, "Backend", 438, 88, 12, PALETTE["navy"])
    draw_wrapped(c, "Spring Boot 3.x, Java 17, Spring Data JPA, MySQL, Redis, Spring Security, WebSocket, SSE/FCM", 438, 70, 330, 9, color=PALETTE["muted"])

    # 4
    new_page(c, "시스템 아키텍처", 4)
    stages = [
        ("React SPA\nCapacitor\nLive demo", PALETTE["soft_blue"]),
        ("Spring Security\nJWT, OAuth2\n권한 검사", PALETTE["soft_orange"]),
        ("Domain Services\nUser, Board, Care\nLocation, Meetup, Chat", PALETTE["soft_teal"]),
        ("MySQL\nJPA Entity\nIndex, Transaction", PALETTE["soft_green"]),
        ("Redis\nCache, TTL\nNLP dedup", PALETTE["soft_blue"]),
    ]
    sx, sy = MARGIN, PAGE_H - 190
    for i, (txt, fill) in enumerate(stages):
        flow_box(c, sx + i * 154, sy, 132, 76, txt, fill)
        if i < len(stages) - 1:
            arrow(c, sx + i * 154 + 132, sy + 38, sx + (i + 1) * 154 - 8, sy + 38)
    card(c, MARGIN, PAGE_H - 350, 245, 122, "레이어드 아키텍처", "Controller는 요청/응답과 검증, Service는 비즈니스 로직과 트랜잭션, Repository는 데이터 접근, Entity는 도메인 모델을 담당합니다.", colors.white, PALETTE["navy"])
    card(c, MARGIN + 265, PAGE_H - 350, 245, 122, "도메인 중심 구조", "도메인별 controller/service/repository/entity/dto/converter 구조를 유지해 기능 경계를 읽기 쉽게 만들었습니다.", colors.white, PALETTE["teal"])
    card(c, MARGIN + 530, PAGE_H - 350, 245, 122, "외부 연동", "Naver Map, OAuth2, SMTP, FCM, FastAPI NLP 서버를 Spring Boot 뒤에 두어 프론트가 직접 외부 분석 서버를 호출하지 않게 했습니다.", colors.white, PALETTE["green"])

    # 5
    new_page(c, "데이터 모델과 문서화", 5)
    if ERD_PATH.exists():
        img = ImageReader(str(ERD_PATH))
        img_w, img_h = img.getSize()
        max_w, max_h = 500, 295
        ratio = min(max_w / img_w, max_h / img_h)
        draw_w, draw_h = img_w * ratio, img_h * ratio
        c.drawImage(img, MARGIN, PAGE_H - 120 - draw_h, draw_w, draw_h, preserveAspectRatio=True, mask="auto")
    card(c, 575, PAGE_H - 170, 220, 92, "ERD 활용", "도메인 간 연관관계를 한 장에서 확인할 수 있게 두고, 각 도메인 상세 페이지와 문제 해결 문서로 내려가도록 구성했습니다.", PALETTE["soft_blue"], PALETTE["navy"])
    card(c, 575, PAGE_H - 282, 220, 92, "문서 허브", "architecture, domains, troubleshooting, refactoring, concurrency, migration SQL 문서를 분리해 원인과 개선 근거를 추적합니다.", PALETTE["soft_teal"], PALETTE["teal"])
    card(c, 575, PAGE_H - 394, 220, 92, "데모", "백엔드 없이도 mock 계층으로 핵심 UI 흐름을 확인할 수 있는 React 데모 앱을 포함했습니다.", PALETTE["soft_green"], PALETTE["green"])

    # 6
    new_page(c, "Case 1. Care 요청 목록 N+1", 6)
    draw_wrapped(c, "페이징된 펫케어 요청 목록에서 CareRequest의 applications를 DTO 변환 중 lazy load하면서 요청 수만큼 careapplication 쿼리가 반복되는 문제가 있었습니다. Fetch Join과 BatchSize/배치 조회 관점으로 목록 조회 경로를 재정리했습니다.", MARGIN, PAGE_H - 115, 390, 11.5)
    bar_chart(c, 465, PAGE_H - 260, 310, 155, "Before / After", [("Query", 2400, 5), ("Time ms", 1084, 66), ("Memory MB", 21, 6)], color=PALETTE["teal"])
    card(c, MARGIN, 120, 230, 130, "원인", "페이징 쿼리에서 applications fetch가 빠졌고, Converter가 applicationCount와 리스트를 만들며 lazy load를 반복했습니다.", colors.white, PALETTE["red"])
    card(c, MARGIN + 250, 120, 230, 130, "해결", "필요한 연관 데이터를 한 번에 가져오거나 BatchSize로 IN 절 조회가 일어나도록 조정했습니다. DTO 변환은 메모리 매핑으로 제한했습니다.", colors.white, PALETTE["teal"])
    card(c, MARGIN + 500, 120, 230, 130, "결과", "1004개 데이터 기준 쿼리 수 2400개에서 4-5개, 실행 시간 1084ms에서 66ms, 메모리 21MB에서 6MB로 감소했습니다.", colors.white, PALETTE["green"])

    # 7
    new_page(c, "Case 2. Board 목록 조회 최적화", 7)
    draw_wrapped(c, "게시글 목록에서 작성자, 반응, 댓글/첨부 정보가 게시글마다 반복 조회되며 쿼리 수가 선형 증가했습니다. 게시글 ID 목록을 먼저 모으고 반응/파일/댓글 카운트를 그룹 조회한 뒤 Map으로 합치는 방식으로 바꿨습니다.", MARGIN, PAGE_H - 115, 420, 11.5)
    bar_chart(c, 465, PAGE_H - 260, 310, 155, "Before / After", [("Query", 301, 3), ("Time ms", 745, 30), ("Memory MB", 22.5, 2)], color=PALETTE["green"])
    card(c, MARGIN, 150, 230, 105, "패턴", "IN 절 배치 조회, Fetch Join, GROUP BY count, Map 기반 DTO 조립을 조합했습니다.", colors.white, PALETTE["teal"])
    card(c, MARGIN + 250, 150, 230, 105, "관리자 경로", "전체 게시글 로드 후 메모리 필터링하던 관리자 API를 DB 레벨 필터링과 페이징으로 전환했습니다.", colors.white, PALETTE["orange"])
    card(c, MARGIN + 500, 150, 230, 105, "효과", "100개 게시글 실측 기준 301개에서 3개 쿼리, 745ms에서 30ms, 메모리 22.5MB에서 2MB로 개선했습니다.", colors.white, PALETTE["green"])

    # 8
    new_page(c, "Case 3. 로그인과 Chat 목록 N+1", 8)
    draw_wrapped(c, "로그인 이후 채팅방 목록, 참여자, 최신 메시지를 함께 구성하는 흐름에서 방마다 참여자와 메시지를 개별 조회했습니다. 최신 메시지만 배치 조회하고 참여자 정보도 conversationIdx IN 조건으로 가져와 쿼리 수를 채팅방 개수와 분리했습니다.", MARGIN, PAGE_H - 115, 410, 11.5)
    bar_chart(c, 465, PAGE_H - 260, 310, 155, "Before / After", [("Query", 21, 4), ("Time ms", 305, 55), ("Memory MB", 0.58, 0.13)], color=PALETTE["orange"])
    flow_box(c, MARGIN, PAGE_H - 300, 150, 58, "1. 채팅방 목록\n1 query", PALETTE["soft_blue"])
    flow_box(c, MARGIN + 170, PAGE_H - 300, 150, 58, "2. 내 참여자\nbatch query", PALETTE["soft_teal"])
    flow_box(c, MARGIN + 340, PAGE_H - 300, 150, 58, "3. 전체 참여자\nbatch query", PALETTE["soft_green"])
    flow_box(c, MARGIN + 510, PAGE_H - 300, 150, 58, "4. 최신 메시지\nbatch query", PALETTE["soft_orange"])
    for i in range(3):
        arrow(c, MARGIN + 150 + i * 170, PAGE_H - 271, MARGIN + 162 + i * 170, PAGE_H - 271)
    draw_wrapped(c, "결과: 채팅방 10개, 참여자 30명, 메시지 200개 시나리오에서 쿼리 21개에서 4개, 실행 시간 305ms에서 55ms, 메모리 0.58MB에서 0.13MB.", MARGIN, 90, PAGE_W - 2 * MARGIN, 10.5, color=PALETTE["muted"])

    # 9
    new_page(c, "동시성 제어", 9)
    draw_wrapped(c, "동시성 문제는 모두 같은 락으로 풀지 않았습니다. 비즈니스 정합성, 중복 방지, 카운터 정확성, 실패 비용을 기준으로 Pessimistic Lock, DB Unique 제약조건, 원자적 UPDATE를 구분했습니다.", MARGIN, PAGE_H - 115, PAGE_W - 2 * MARGIN, 11.5)
    items = [
        ("Meetup", "최대 인원 초과", "원자적 UPDATE 또는 비관적 락으로 참가 가능 조건을 DB에서 보장"),
        ("Board", "좋아요 중복", "board/user unique index와 예외 처리로 중복 반응 차단"),
        ("Chat", "읽지 않은 메시지 Lost Update", "unread_count = unread_count + 1 원자적 증가 쿼리"),
        ("Payment/Care", "거래 확정/지급 중복", "트랜잭션 범위와 row lock으로 상태 전이 보호"),
        ("Report/User", "중복 신고/닉네임", "DB Unique 제약조건으로 애플리케이션 체크의 빈틈 보완"),
    ]
    y = PAGE_H - 170
    for domain, problem, solution in items:
        rounded_rect(c, MARGIN, y - 5, PAGE_W - 2 * MARGIN, 48, colors.white)
        draw_text(c, domain, MARGIN + 14, y + 24, 11, PALETTE["navy"])
        draw_text(c, problem, MARGIN + 150, y + 24, 10, PALETTE["red"])
        draw_wrapped(c, solution, MARGIN + 310, y + 24, 430, 9, color=PALETTE["ink"], max_lines=2)
        y -= 58

    # 10
    new_page(c, "위치 기반 조회 최적화", 10)
    draw_wrapped(c, "근처 모임 조회는 처음에 전체 meetup을 메모리에 로드한 뒤 Java에서 거리 계산과 필터링을 수행했습니다. 이후 DB 쿼리로 필터링을 옮겼고, 최종적으로 Bounding Box 조건을 추가해 위치 인덱스를 활용했습니다.", MARGIN, PAGE_H - 115, 420, 11.5)
    bar_chart(c, 465, PAGE_H - 275, 310, 170, "Before / Bounding Box", [("Total ms", 486, 273), ("DB ms", 241, 143), ("Memory MB", 1.48, 0.21), ("Scanned rows", 2958, 117)], color=PALETTE["teal"])
    card(c, MARGIN, 135, 230, 110, "Before", "findAllNotDeleted로 전체 데이터를 가져와 Java Stream에서 날짜, 상태, 좌표, 반경 필터와 정렬을 처리했습니다.", colors.white, PALETTE["red"])
    card(c, MARGIN + 250, 135, 230, 110, "After", "위도/경도 BETWEEN 조건으로 후보군을 줄이고 Haversine 계산을 DB에서 수행했습니다.", colors.white, PALETTE["teal"])
    card(c, MARGIN + 500, 135, 230, 110, "결과", "스캔 행 수 2958개에서 117개, 메모리 1.48MB에서 0.21MB, 전체 실행 시간 486ms에서 273ms.", colors.white, PALETTE["green"])

    # 11
    new_page(c, "Recommendation / NLP", 11)
    draw_wrapped(c, "추천은 사용자의 게시글, 케어 요청, 위치 검색 이벤트를 기반으로 intent signal을 만들고 Location 검색 카테고리로 연결합니다. React는 Python 서버를 직접 호출하지 않고 Spring Boot가 이벤트 수집, 저장, 알림, 장소 검색을 조율합니다.", MARGIN, PAGE_H - 115, PAGE_W - 2 * MARGIN, 11.5)
    flow_box(c, MARGIN, PAGE_H - 210, 120, 62, "Board/Care/\nLocation event", PALETTE["soft_blue"])
    flow_box(c, MARGIN + 145, PAGE_H - 210, 130, 62, "Spring Event\nAFTER_COMMIT", PALETTE["soft_teal"])
    flow_box(c, MARGIN + 300, PAGE_H - 210, 130, 62, "petIntentExecutor\nbounded queue", PALETTE["soft_green"])
    flow_box(c, MARGIN + 455, PAGE_H - 210, 120, 62, "FastAPI NLP\nrule + embedding", PALETTE["soft_orange"])
    flow_box(c, MARGIN + 600, PAGE_H - 210, 140, 62, "Signal card\nLocation search", PALETTE["soft_blue"])
    for i, gap in enumerate([120, 275, 430, 575]):
        arrow(c, MARGIN + gap, PAGE_H - 179, MARGIN + gap + 20, PAGE_H - 179)
    card(c, MARGIN, PAGE_H - 350, 230, 112, "트래픽 제어", "NLP 작업은 core 2, max 6, queue 500 전용 executor에서 처리합니다. 큐 포화 시 부가 기능 작업은 버려 핵심 요청을 보호합니다.", colors.white, PALETTE["teal"])
    card(c, MARGIN + 250, PAGE_H - 350, 230, 112, "중복 호출 억제", "Location 검색은 keyword 정규화, 길이/공백 조건, Redis setIfAbsent TTL 10분으로 반복 NLP 호출을 줄였습니다.", colors.white, PALETTE["green"])
    card(c, MARGIN + 500, PAGE_H - 350, 230, 112, "장애 격리", "Python timeout, Redis 장애, signal 저장 실패는 원 액션을 막지 않습니다. 즉시 추천은 keyword fallback으로 기본 결과를 반환합니다.", colors.white, PALETTE["orange"])

    # 12
    new_page(c, "프론트 데모와 포트폴리오 구조", 12)
    draw_wrapped(c, "이 저장소는 실행 가능한 React 포트폴리오와 Petory 백엔드 문서 자산을 함께 담습니다. 사이트는 이력서형 홈, Petory 소개, 도메인 상세, mock 기반 데모, 문서 링크 허브로 구성됩니다.", MARGIN, PAGE_H - 115, PAGE_W - 2 * MARGIN, 11.5)
    card(c, MARGIN, PAGE_H - 245, 230, 110, "Live Demo", "백엔드 없이 mock interceptor와 mockData로 주요 화면 흐름을 브라우저에서 확인할 수 있습니다.", colors.white, PALETTE["teal"])
    card(c, MARGIN + 250, PAGE_H - 245, 230, 110, "Domain Pages", "User, Board, Care, Missing Pet, Location, Recommendation, Meetup, Chat 상세 페이지를 분리했습니다.", colors.white, PALETTE["green"])
    card(c, MARGIN + 500, PAGE_H - 245, 230, 110, "Docs Hub", "아키텍처, 트러블슈팅, 리팩토링, 동시성, SQL migration 문서의 진입점을 제공합니다.", colors.white, PALETTE["orange"])
    draw_text(c, "주요 라우트", MARGIN, PAGE_H - 300, 13, PALETTE["navy"])
    routes = ["/", "/portfolio/petory", "/demo", "/domains/user", "/domains/board", "/domains/care", "/domains/location", "/domains/recommendation", "/domains/flows", "/docs"]
    y = PAGE_H - 327
    x = MARGIN
    for route in routes:
        tw = text_width(route, 9) + 18
        if x + tw > PAGE_W - MARGIN:
            x = MARGIN
            y -= 32
        rounded_rect(c, x, y, tw, 24, PALETTE["soft_blue"], stroke=PALETTE["line"], radius=8)
        draw_text(c, route, x + 9, y + 8, 9, PALETTE["navy"])
        x += tw + 8

    # 13
    new_page(c, "정리", 13)
    draw_text(c, "이 포트폴리오가 보여주는 것", MARGIN, PAGE_H - 120, 18, PALETTE["navy"])
    bullets = [
        "문제를 단순히 설명하지 않고 실제 사용자 흐름으로 재현했습니다.",
        "쿼리 수, 실행 시간, 메모리 사용량을 기준으로 개선 효과를 측정했습니다.",
        "JPA N+1, 페이징, DTO 변환, 연관관계 조회의 비용을 도메인별로 분해했습니다.",
        "동시성 문제는 락, 원자적 쿼리, Unique 제약조건을 문제 성격에 맞게 선택했습니다.",
        "NLP와 추천은 핵심 트랜잭션에서 분리해 실패가 원 요청에 전파되지 않도록 설계했습니다.",
    ]
    y = PAGE_H - 160
    for b in bullets:
        c.setFillColor(PALETTE["teal"])
        c.circle(MARGIN + 5, y + 4, 3, stroke=0, fill=1)
        draw_wrapped(c, b, MARGIN + 20, y + 8, PAGE_W - 2 * MARGIN - 20, 11, color=PALETTE["ink"], max_lines=2)
        y -= 36
    rounded_rect(c, MARGIN, 95, PAGE_W - 2 * MARGIN, 80, PALETTE["navy"], stroke=PALETTE["navy"], radius=10)
    draw_text(c, "Contact", MARGIN + 22, 145, 12, colors.white)
    draw_text(c, "Email: wowong123@naver.com", MARGIN + 22, 125, 10, colors.white)
    draw_text(c, "GitHub: github.com/makkong1", MARGIN + 22, 108, 10, colors.white)
    draw_text(c, "Portfolio: makkong1.github.io/makkong1-github.io", MARGIN + 330, 125, 10, colors.white)
    draw_text(c, "Backend: github.com/makkong1/Petory", MARGIN + 330, 108, 10, colors.white)

    c.save()
    print(OUT)


if __name__ == "__main__":
    build_pdf()
