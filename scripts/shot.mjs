// scripts/shot.mjs
import { chromium } from "playwright-core";
import { mkdirSync } from "fs";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:5173/makkong1-github.io";
const OUT = new URL("./_shots/", import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
const args = process.argv.slice(2); // route out route out ...
const pairs = [];
for (let i = 0; i < args.length; i += 2) pairs.push([args[i], args[i + 1]]);
const browser = await chromium.launch({ executablePath: CHROME });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));
for (const [route, out] of pairs) {
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}${out}.png`, fullPage: true });
  console.log("saved", out);
}
await browser.close();
if (errors.length) {
  console.error("CONSOLE ERRORS:\n" + errors.join("\n"));
  process.exit(2);
}
