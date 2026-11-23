import{j as i,_ as Ie,R as ar,r as p,S as jd,g as Pn,a as ym,b as bm,c as AA}from"./index-DtO7nF18.js";import{a as bS}from"./array-BKyUJesY.js";import{w as wS,c as rt}from"./path-CbwjOpE9.js";import{b as OA,p as RA}from"./band-BGq39--H.js";import{a as Cc,n as TA,b as IA,i as wm,c as tp,l as Uo,t as $m,d as Sm,e as dx,f as DA,g as _A,h as bn,j as LA,k as vl,m as $S,o as MA,p as zA}from"./linear-4Cfi_Lv_.js";import{m as ux,a as hx,n as NA,c as BA,u as FA,s as UA,b as qA,d as WA,e as HA,f as VA,g as KA,h as GA,i as YA,j as XA,t as ZA}from"./time-BoTYET6O.js";import{i as oo,a as An}from"./init-Dmth1JHB.js";import{i as JA,o as QA}from"./ordinal-GwB6lWY3.js";import{c as jm,s as Ur,t as yl,p as rp,a as Pc,b as SS,d as eO,e as tO,f as rO,g as nO,m as oO,h as iO,i as aO,j as sO,k as cO,l as lO,n as dO,o as uO}from"./step-BymL3zDf.js";import{x as hO,y as fO,l as jS}from"./line-CEZz0R78.js";function pO(e=Cc){if(e===Cc)return kS;if(typeof e!="function")throw new TypeError("compare is not a function");return(t,r)=>{const n=e(t,r);return n||n===0?n:(e(r,r)===0)-(e(t,t)===0)}}function kS(e,t){return(e==null||!(e>=e))-(t==null||!(t>=t))||(e<t?-1:e>t?1:0)}function ES(e,t,r=0,n=1/0,o){if(t=Math.floor(t),r=Math.floor(Math.max(0,r)),n=Math.floor(Math.min(e.length-1,n)),!(r<=t&&t<=n))return e;for(o=o===void 0?kS:pO(o);n>r;){if(n-r>600){const l=n-r+1,u=t-r+1,d=Math.log(l),f=.5*Math.exp(2*d/3),m=.5*Math.sqrt(d*f*(l-f)/l)*(u-l/2<0?-1:1),g=Math.max(r,Math.floor(t-u*f/l+m)),x=Math.min(n,Math.floor(t+(l-u)*f/l+m));ES(e,t,g,x,o)}const a=e[t];let s=r,c=n;for(Wi(e,r,t),o(e[n],a)>0&&Wi(e,r,n);s<c;){for(Wi(e,s,c),++s,--c;o(e[s],a)<0;)++s;for(;o(e[c],a)>0;)--c}o(e[r],a)===0?Wi(e,r,c):(++c,Wi(e,c,n)),c<=t&&(r=c+1),t<=c&&(n=c-1)}return e}function Wi(e,t,r){const n=e[t];e[t]=e[r],e[r]=n}function mO(e,t,r){if(e=Float64Array.from(TA(e)),!(!(n=e.length)||isNaN(t=+t))){if(t<=0||n<2)return ux(e);if(t>=1)return hx(e);var n,o=(n-1)*t,a=Math.floor(o),s=hx(ES(e,a).subarray(0,a+1)),c=ux(e.subarray(a+1));return s+(c-s)*(o-a)}}function gO(e,t,r=IA){if(!(!(n=e.length)||isNaN(t=+t))){if(t<=0||n<2)return+r(e[0],0,e);if(t>=1)return+r(e[n-1],n-1,e);var n,o=(n-1)*t,a=Math.floor(o),s=+r(e[a],a,e),c=+r(e[a+1],a+1,e);return s+(c-s)*(o-a)}}function xO(e,t){t===void 0&&(t=e,e=wm);for(var r=0,n=t.length-1,o=t[0],a=new Array(n<0?0:n);r<n;)a[r]=e(o,o=t[++r]);return function(s){var c=Math.max(0,Math.min(n-1,Math.floor(s*=n)));return a[c](s-c)}}function CS(e){var t;function r(n){return n==null||isNaN(n=+n)?t:n}return r.invert=r,r.domain=r.range=function(n){return arguments.length?(e=Array.from(n,tp),r):e.slice()},r.unknown=function(n){return arguments.length?(t=n,r):t},r.copy=function(){return CS(e).unknown(t)},e=arguments.length?Array.from(e,tp):[0,1],Uo(r)}function fx(e){return Math.log(e)}function px(e){return Math.exp(e)}function vO(e){return-Math.log(-e)}function yO(e){return-Math.exp(-e)}function bO(e){return isFinite(e)?+("1e"+e):e<0?0:e}function wO(e){return e===10?bO:e===Math.E?Math.exp:t=>Math.pow(e,t)}function $O(e){return e===Math.E?Math.log:e===10&&Math.log10||e===2&&Math.log2||(e=Math.log(e),t=>Math.log(t)/e)}function mx(e){return(t,r)=>-e(-t,r)}function km(e){const t=e(fx,px),r=t.domain;let n=10,o,a;function s(){return o=$O(n),a=wO(n),r()[0]<0?(o=mx(o),a=mx(a),e(vO,yO)):e(fx,px),t}return t.base=function(c){return arguments.length?(n=+c,s()):n},t.domain=function(c){return arguments.length?(r(c),s()):r()},t.ticks=c=>{const l=r();let u=l[0],d=l[l.length-1];const f=d<u;f&&([u,d]=[d,u]);let m=o(u),g=o(d),x,v;const b=c==null?10:+c;let E=[];if(!(n%1)&&g-m<b){if(m=Math.floor(m),g=Math.ceil(g),u>0){for(;m<=g;++m)for(x=1;x<n;++x)if(v=m<0?x/a(-m):x*a(m),!(v<u)){if(v>d)break;E.push(v)}}else for(;m<=g;++m)for(x=n-1;x>=1;--x)if(v=m>0?x/a(-m):x*a(m),!(v<u)){if(v>d)break;E.push(v)}E.length*2<b&&(E=dx(u,d,b))}else E=dx(m,g,Math.min(g-m,b)).map(a);return f?E.reverse():E},t.tickFormat=(c,l)=>{if(c==null&&(c=10),l==null&&(l=n===10?"s":","),typeof l!="function"&&(!(n%1)&&(l=DA(l)).precision==null&&(l.trim=!0),l=_A(l)),c===1/0)return l;const u=Math.max(1,n*c/t.ticks().length);return d=>{let f=d/a(Math.round(o(d)));return f*n<n-.5&&(f*=n),f<=u?l(d):""}},t.nice=()=>r(NA(r(),{floor:c=>a(Math.floor(o(c))),ceil:c=>a(Math.ceil(o(c)))})),t}function PS(){const e=km($m()).domain([1,10]);return e.copy=()=>Sm(e,PS()).base(e.base()),oo.apply(e,arguments),e}function gx(e){return function(t){return Math.sign(t)*Math.log1p(Math.abs(t/e))}}function xx(e){return function(t){return Math.sign(t)*Math.expm1(Math.abs(t))*e}}function Em(e){var t=1,r=e(gx(t),xx(t));return r.constant=function(n){return arguments.length?e(gx(t=+n),xx(t)):t},Uo(r)}function AS(){var e=Em($m());return e.copy=function(){return Sm(e,AS()).constant(e.constant())},oo.apply(e,arguments)}function vx(e){return function(t){return t<0?-Math.pow(-t,e):Math.pow(t,e)}}function SO(e){return e<0?-Math.sqrt(-e):Math.sqrt(e)}function jO(e){return e<0?-e*e:e*e}function Cm(e){var t=e(bn,bn),r=1;function n(){return r===1?e(bn,bn):r===.5?e(SO,jO):e(vx(r),vx(1/r))}return t.exponent=function(o){return arguments.length?(r=+o,n()):r},Uo(t)}function Pm(){var e=Cm($m());return e.copy=function(){return Sm(e,Pm()).exponent(e.exponent())},oo.apply(e,arguments),e}function kO(){return Pm.apply(null,arguments).exponent(.5)}function yx(e){return Math.sign(e)*e*e}function EO(e){return Math.sign(e)*Math.sqrt(Math.abs(e))}function OS(){var e=LA(),t=[0,1],r=!1,n;function o(a){var s=EO(e(a));return isNaN(s)?n:r?Math.round(s):s}return o.invert=function(a){return e.invert(yx(a))},o.domain=function(a){return arguments.length?(e.domain(a),o):e.domain()},o.range=function(a){return arguments.length?(e.range((t=Array.from(a,tp)).map(yx)),o):t.slice()},o.rangeRound=function(a){return o.range(a).round(!0)},o.round=function(a){return arguments.length?(r=!!a,o):r},o.clamp=function(a){return arguments.length?(e.clamp(a),o):e.clamp()},o.unknown=function(a){return arguments.length?(n=a,o):n},o.copy=function(){return OS(e.domain(),t).round(r).clamp(e.clamp()).unknown(n)},oo.apply(o,arguments),Uo(o)}function RS(){var e=[],t=[],r=[],n;function o(){var s=0,c=Math.max(1,t.length);for(r=new Array(c-1);++s<c;)r[s-1]=gO(e,s/c);return a}function a(s){return s==null||isNaN(s=+s)?n:t[vl(r,s)]}return a.invertExtent=function(s){var c=t.indexOf(s);return c<0?[NaN,NaN]:[c>0?r[c-1]:e[0],c<r.length?r[c]:e[e.length-1]]},a.domain=function(s){if(!arguments.length)return e.slice();e=[];for(let c of s)c!=null&&!isNaN(c=+c)&&e.push(c);return e.sort(Cc),o()},a.range=function(s){return arguments.length?(t=Array.from(s),o()):t.slice()},a.unknown=function(s){return arguments.length?(n=s,a):n},a.quantiles=function(){return r.slice()},a.copy=function(){return RS().domain(e).range(t).unknown(n)},oo.apply(a,arguments)}function TS(){var e=0,t=1,r=1,n=[.5],o=[0,1],a;function s(l){return l!=null&&l<=l?o[vl(n,l,0,r)]:a}function c(){var l=-1;for(n=new Array(r);++l<r;)n[l]=((l+1)*t-(l-r)*e)/(r+1);return s}return s.domain=function(l){return arguments.length?([e,t]=l,e=+e,t=+t,c()):[e,t]},s.range=function(l){return arguments.length?(r=(o=Array.from(l)).length-1,c()):o.slice()},s.invertExtent=function(l){var u=o.indexOf(l);return u<0?[NaN,NaN]:u<1?[e,n[0]]:u>=r?[n[r-1],t]:[n[u-1],n[u]]},s.unknown=function(l){return arguments.length&&(a=l),s},s.thresholds=function(){return n.slice()},s.copy=function(){return TS().domain([e,t]).range(o).unknown(a)},oo.apply(Uo(s),arguments)}function IS(){var e=[.5],t=[0,1],r,n=1;function o(a){return a!=null&&a<=a?t[vl(e,a,0,n)]:r}return o.domain=function(a){return arguments.length?(e=Array.from(a),n=Math.min(e.length,t.length-1),o):e.slice()},o.range=function(a){return arguments.length?(t=Array.from(a),n=Math.min(e.length,t.length-1),o):t.slice()},o.invertExtent=function(a){var s=t.indexOf(a);return[e[s-1],e[s]]},o.unknown=function(a){return arguments.length?(r=a,o):r},o.copy=function(){return IS().domain(e).range(t).unknown(r)},oo.apply(o,arguments)}function CO(){return oo.apply(BA(XA,YA,GA,KA,VA,HA,WA,qA,UA,FA).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)]),arguments)}function bl(){var e=0,t=1,r,n,o,a,s=bn,c=!1,l;function u(f){return f==null||isNaN(f=+f)?l:s(o===0?.5:(f=(a(f)-r)*o,c?Math.max(0,Math.min(1,f)):f))}u.domain=function(f){return arguments.length?([e,t]=f,r=a(e=+e),n=a(t=+t),o=r===n?0:1/(n-r),u):[e,t]},u.clamp=function(f){return arguments.length?(c=!!f,u):c},u.interpolator=function(f){return arguments.length?(s=f,u):s};function d(f){return function(m){var g,x;return arguments.length?([g,x]=m,s=f(g,x),u):[s(0),s(1)]}}return u.range=d(wm),u.rangeRound=d($S),u.unknown=function(f){return arguments.length?(l=f,u):l},function(f){return a=f,r=f(e),n=f(t),o=r===n?0:1/(n-r),u}}function io(e,t){return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown())}function DS(){var e=Uo(bl()(bn));return e.copy=function(){return io(e,DS())},An.apply(e,arguments)}function _S(){var e=km(bl()).domain([1,10]);return e.copy=function(){return io(e,_S()).base(e.base())},An.apply(e,arguments)}function LS(){var e=Em(bl());return e.copy=function(){return io(e,LS()).constant(e.constant())},An.apply(e,arguments)}function Am(){var e=Cm(bl());return e.copy=function(){return io(e,Am()).exponent(e.exponent())},An.apply(e,arguments)}function PO(){return Am.apply(null,arguments).exponent(.5)}function MS(){var e=[],t=bn;function r(n){if(n!=null&&!isNaN(n=+n))return t((vl(e,n,1)-1)/(e.length-1))}return r.domain=function(n){if(!arguments.length)return e.slice();e=[];for(let o of n)o!=null&&!isNaN(o=+o)&&e.push(o);return e.sort(Cc),r},r.interpolator=function(n){return arguments.length?(t=n,r):t},r.range=function(){return e.map((n,o)=>t(o/(e.length-1)))},r.quantiles=function(n){return Array.from({length:n+1},(o,a)=>mO(e,a/n))},r.copy=function(){return MS(t).domain(e)},An.apply(r,arguments)}function wl(){var e=0,t=.5,r=1,n=1,o,a,s,c,l,u=bn,d,f=!1,m;function g(v){return isNaN(v=+v)?m:(v=.5+((v=+d(v))-a)*(n*v<n*a?c:l),u(f?Math.max(0,Math.min(1,v)):v))}g.domain=function(v){return arguments.length?([e,t,r]=v,o=d(e=+e),a=d(t=+t),s=d(r=+r),c=o===a?0:.5/(a-o),l=a===s?0:.5/(s-a),n=a<o?-1:1,g):[e,t,r]},g.clamp=function(v){return arguments.length?(f=!!v,g):f},g.interpolator=function(v){return arguments.length?(u=v,g):u};function x(v){return function(b){var E,w,j;return arguments.length?([E,w,j]=b,u=xO(v,[E,w,j]),g):[u(0),u(.5),u(1)]}}return g.range=x(wm),g.rangeRound=x($S),g.unknown=function(v){return arguments.length?(m=v,g):m},function(v){return d=v,o=v(e),a=v(t),s=v(r),c=o===a?0:.5/(a-o),l=a===s?0:.5/(s-a),n=a<o?-1:1,g}}function zS(){var e=Uo(wl()(bn));return e.copy=function(){return io(e,zS())},An.apply(e,arguments)}function NS(){var e=km(wl()).domain([.1,1,10]);return e.copy=function(){return io(e,NS()).base(e.base())},An.apply(e,arguments)}function BS(){var e=Em(wl());return e.copy=function(){return io(e,BS()).constant(e.constant())},An.apply(e,arguments)}function Om(){var e=Cm(wl());return e.copy=function(){return io(e,Om()).exponent(e.exponent())},An.apply(e,arguments)}function AO(){return Om.apply(null,arguments).exponent(.5)}function vs(e,t,r){var n=null,o=rt(!0),a=null,s=jm,c=null,l=wS(u);e=typeof e=="function"?e:e===void 0?hO:rt(+e),t=typeof t=="function"?t:t===void 0?rt(0):rt(+t),r=typeof r=="function"?r:r===void 0?fO:rt(+r);function u(f){var m,g,x,v=(f=bS(f)).length,b,E=!1,w,j=new Array(v),S=new Array(v);for(a==null&&(c=s(w=l())),m=0;m<=v;++m){if(!(m<v&&o(b=f[m],m,f))===E)if(E=!E)g=m,c.areaStart(),c.lineStart();else{for(c.lineEnd(),c.lineStart(),x=m-1;x>=g;--x)c.point(j[x],S[x]);c.lineEnd(),c.areaEnd()}E&&(j[m]=+e(b,m,f),S[m]=+t(b,m,f),c.point(n?+n(b,m,f):j[m],r?+r(b,m,f):S[m]))}if(w)return c=null,w+""||null}function d(){return jS().defined(o).curve(s).context(a)}return u.x=function(f){return arguments.length?(e=typeof f=="function"?f:rt(+f),n=null,u):e},u.x0=function(f){return arguments.length?(e=typeof f=="function"?f:rt(+f),u):e},u.x1=function(f){return arguments.length?(n=f==null?null:typeof f=="function"?f:rt(+f),u):n},u.y=function(f){return arguments.length?(t=typeof f=="function"?f:rt(+f),r=null,u):t},u.y0=function(f){return arguments.length?(t=typeof f=="function"?f:rt(+f),u):t},u.y1=function(f){return arguments.length?(r=f==null?null:typeof f=="function"?f:rt(+f),u):r},u.lineX0=u.lineY0=function(){return d().x(e).y(t)},u.lineY1=function(){return d().x(e).y(r)},u.lineX1=function(){return d().x(n).y(t)},u.defined=function(f){return arguments.length?(o=typeof f=="function"?f:rt(!!f),u):o},u.curve=function(f){return arguments.length?(s=f,a!=null&&(c=s(a)),u):s},u.context=function(f){return arguments.length?(f==null?a=c=null:c=s(a=f),u):a},u}const Rm={draw(e,t){const r=Ur(t/rp);e.moveTo(r,0),e.arc(0,0,r,0,yl)}},OO={draw(e,t){const r=Ur(t/5)/2;e.moveTo(-3*r,-r),e.lineTo(-r,-r),e.lineTo(-r,-3*r),e.lineTo(r,-3*r),e.lineTo(r,-r),e.lineTo(3*r,-r),e.lineTo(3*r,r),e.lineTo(r,r),e.lineTo(r,3*r),e.lineTo(-r,3*r),e.lineTo(-r,r),e.lineTo(-3*r,r),e.closePath()}},FS=Ur(1/3),RO=FS*2,TO={draw(e,t){const r=Ur(t/RO),n=r*FS;e.moveTo(0,-r),e.lineTo(n,0),e.lineTo(0,r),e.lineTo(-n,0),e.closePath()}},IO={draw(e,t){const r=Ur(t),n=-r/2;e.rect(n,n,r,r)}},DO=.8908130915292852,US=Pc(rp/10)/Pc(7*rp/10),_O=Pc(yl/10)*US,LO=-SS(yl/10)*US,MO={draw(e,t){const r=Ur(t*DO),n=_O*r,o=LO*r;e.moveTo(0,-r),e.lineTo(n,o);for(let a=1;a<5;++a){const s=yl*a/5,c=SS(s),l=Pc(s);e.lineTo(l*r,-c*r),e.lineTo(c*n-l*o,l*n+c*o)}e.closePath()}},kd=Ur(3),zO={draw(e,t){const r=-Ur(t/(kd*3));e.moveTo(0,r*2),e.lineTo(-kd*r,-r),e.lineTo(kd*r,-r),e.closePath()}},dr=-.5,ur=Ur(3)/2,np=1/Ur(12),NO=(np/2+1)*3,BO={draw(e,t){const r=Ur(t/NO),n=r/2,o=r*np,a=n,s=r*np+r,c=-a,l=s;e.moveTo(n,o),e.lineTo(a,s),e.lineTo(c,l),e.lineTo(dr*n-ur*o,ur*n+dr*o),e.lineTo(dr*a-ur*s,ur*a+dr*s),e.lineTo(dr*c-ur*l,ur*c+dr*l),e.lineTo(dr*n+ur*o,dr*o-ur*n),e.lineTo(dr*a+ur*s,dr*s-ur*a),e.lineTo(dr*c+ur*l,dr*l-ur*c),e.closePath()}};function FO(e,t){let r=null,n=wS(o);e=typeof e=="function"?e:rt(e||Rm),t=typeof t=="function"?t:rt(t===void 0?64:+t);function o(){let a;if(r||(r=a=n()),e.apply(this,arguments).draw(r,+t.apply(this,arguments)),a)return r=null,a+""||null}return o.type=function(a){return arguments.length?(e=typeof a=="function"?a:rt(a),o):e},o.size=function(a){return arguments.length?(t=typeof a=="function"?a:rt(+a),o):t},o.context=function(a){return arguments.length?(r=a??null,o):r},o}function Ao(e,t){if((s=e.length)>1)for(var r=1,n,o,a=e[t[0]],s,c=a.length;r<s;++r)for(o=a,a=e[t[r]],n=0;n<c;++n)a[n][1]+=a[n][0]=isNaN(o[n][1])?o[n][0]:o[n][1]}function op(e){for(var t=e.length,r=new Array(t);--t>=0;)r[t]=t;return r}function UO(e,t){return e[t]}function qO(e){const t=[];return t.key=e,t}function WO(){var e=rt([]),t=op,r=Ao,n=UO;function o(a){var s=Array.from(e.apply(this,arguments),qO),c,l=s.length,u=-1,d;for(const f of a)for(c=0,++u;c<l;++c)(s[c][u]=[0,+n(f,s[c].key,u,a)]).data=f;for(c=0,d=bS(t(s));c<l;++c)s[d[c]].index=c;return r(s,d),s}return o.keys=function(a){return arguments.length?(e=typeof a=="function"?a:rt(Array.from(a)),o):e},o.value=function(a){return arguments.length?(n=typeof a=="function"?a:rt(+a),o):n},o.order=function(a){return arguments.length?(t=a==null?op:typeof a=="function"?a:rt(Array.from(a)),o):t},o.offset=function(a){return arguments.length?(r=a??Ao,o):r},o}function HO(e,t){if((n=e.length)>0){for(var r,n,o=0,a=e[0].length,s;o<a;++o){for(s=r=0;r<n;++r)s+=e[r][o][1]||0;if(s)for(r=0;r<n;++r)e[r][o][1]/=s}Ao(e,t)}}function VO(e,t){if((o=e.length)>0){for(var r=0,n=e[t[0]],o,a=n.length;r<a;++r){for(var s=0,c=0;s<o;++s)c+=e[s][r][1]||0;n[r][1]+=n[r][0]=-c/2}Ao(e,t)}}function KO(e,t){if(!(!((s=e.length)>0)||!((a=(o=e[t[0]]).length)>0))){for(var r=0,n=1,o,a,s;n<a;++n){for(var c=0,l=0,u=0;c<s;++c){for(var d=e[t[c]],f=d[n][1]||0,m=d[n-1][1]||0,g=(f-m)/2,x=0;x<c;++x){var v=e[t[x]],b=v[n][1]||0,E=v[n-1][1]||0;g+=b-E}l+=f,u+=g*f}o[n-1][1]+=o[n-1][0]=r,l&&(r-=u/l)}o[n-1][1]+=o[n-1][0]=r,Ao(e,t)}}function GO(){return i.jsx("div",{style:{position:"sticky",top:0,zIndex:1e3,backgroundColor:"#ff9800",color:"#fff",padding:"0.75rem 1rem",textAlign:"center",fontSize:"0.9rem",fontWeight:"bold",boxShadow:"0 2px 4px rgba(0,0,0,0.1)",borderBottom:"2px solid #f57c00"},children:"🎮 데모 모드 (더미 데이터) | 실제 백엔드 API는 GitHub 코드에서 확인 가능"})}function qS(e,t){return function(){return e.apply(t,arguments)}}const{toString:YO}=Object.prototype,{getPrototypeOf:Tm}=Object,{iterator:$l,toStringTag:WS}=Symbol,Sl=(e=>t=>{const r=YO.call(t);return e[r]||(e[r]=r.slice(8,-1).toLowerCase())})(Object.create(null)),qr=e=>(e=e.toLowerCase(),t=>Sl(t)===e),jl=e=>t=>typeof t===e,{isArray:Ci}=Array,fi=jl("undefined");function Wa(e){return e!==null&&!fi(e)&&e.constructor!==null&&!fi(e.constructor)&&Zt(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const HS=qr("ArrayBuffer");function XO(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&HS(e.buffer),t}const ZO=jl("string"),Zt=jl("function"),VS=jl("number"),Ha=e=>e!==null&&typeof e=="object",JO=e=>e===!0||e===!1,sc=e=>{if(Sl(e)!=="object")return!1;const t=Tm(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(WS in e)&&!($l in e)},QO=e=>{if(!Ha(e)||Wa(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},eR=qr("Date"),tR=qr("File"),rR=e=>!!(e&&typeof e.uri<"u"),nR=e=>e&&typeof e.getParts<"u",oR=qr("Blob"),iR=qr("FileList"),aR=e=>Ha(e)&&Zt(e.pipe);function sR(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof globalThis<"u"?globalThis:{}}const bx=sR(),wx=typeof bx.FormData<"u"?bx.FormData:void 0,cR=e=>{let t;return e&&(wx&&e instanceof wx||Zt(e.append)&&((t=Sl(e))==="formdata"||t==="object"&&Zt(e.toString)&&e.toString()==="[object FormData]"))},lR=qr("URLSearchParams"),[dR,uR,hR,fR]=["ReadableStream","Request","Response","Headers"].map(qr),pR=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Va(e,t,{allOwnKeys:r=!1}={}){if(e===null||typeof e>"u")return;let n,o;if(typeof e!="object"&&(e=[e]),Ci(e))for(n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else{if(Wa(e))return;const a=r?Object.getOwnPropertyNames(e):Object.keys(e),s=a.length;let c;for(n=0;n<s;n++)c=a[n],t.call(null,e[c],c,e)}}function KS(e,t){if(Wa(e))return null;t=t.toLowerCase();const r=Object.keys(e);let n=r.length,o;for(;n-- >0;)if(o=r[n],t===o.toLowerCase())return o;return null}const wo=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:globalThis,GS=e=>!fi(e)&&e!==wo;function ip(){const{caseless:e,skipUndefined:t}=GS(this)&&this||{},r={},n=(o,a)=>{if(a==="__proto__"||a==="constructor"||a==="prototype")return;const s=e&&KS(r,a)||a;sc(r[s])&&sc(o)?r[s]=ip(r[s],o):sc(o)?r[s]=ip({},o):Ci(o)?r[s]=o.slice():(!t||!fi(o))&&(r[s]=o)};for(let o=0,a=arguments.length;o<a;o++)arguments[o]&&Va(arguments[o],n);return r}const mR=(e,t,r,{allOwnKeys:n}={})=>(Va(t,(o,a)=>{r&&Zt(o)?Object.defineProperty(e,a,{value:qS(o,r),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,a,{value:o,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:n}),e),gR=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),xR=(e,t,r,n)=>{e.prototype=Object.create(t.prototype,n),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),r&&Object.assign(e.prototype,r)},vR=(e,t,r,n)=>{let o,a,s;const c={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),a=o.length;a-- >0;)s=o[a],(!n||n(s,e,t))&&!c[s]&&(t[s]=e[s],c[s]=!0);e=r!==!1&&Tm(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},yR=(e,t,r)=>{e=String(e),(r===void 0||r>e.length)&&(r=e.length),r-=t.length;const n=e.indexOf(t,r);return n!==-1&&n===r},bR=e=>{if(!e)return null;if(Ci(e))return e;let t=e.length;if(!VS(t))return null;const r=new Array(t);for(;t-- >0;)r[t]=e[t];return r},wR=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Tm(Uint8Array)),$R=(e,t)=>{const n=(e&&e[$l]).call(e);let o;for(;(o=n.next())&&!o.done;){const a=o.value;t.call(e,a[0],a[1])}},SR=(e,t)=>{let r;const n=[];for(;(r=e.exec(t))!==null;)n.push(r);return n},jR=qr("HTMLFormElement"),kR=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(r,n,o){return n.toUpperCase()+o}),$x=(({hasOwnProperty:e})=>(t,r)=>e.call(t,r))(Object.prototype),ER=qr("RegExp"),YS=(e,t)=>{const r=Object.getOwnPropertyDescriptors(e),n={};Va(r,(o,a)=>{let s;(s=t(o,a,e))!==!1&&(n[a]=s||o)}),Object.defineProperties(e,n)},CR=e=>{YS(e,(t,r)=>{if(Zt(e)&&["arguments","caller","callee"].indexOf(r)!==-1)return!1;const n=e[r];if(Zt(n)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")})}})},PR=(e,t)=>{const r={},n=o=>{o.forEach(a=>{r[a]=!0})};return Ci(e)?n(e):n(String(e).split(t)),r},AR=()=>{},OR=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function RR(e){return!!(e&&Zt(e.append)&&e[WS]==="FormData"&&e[$l])}const TR=e=>{const t=new Array(10),r=(n,o)=>{if(Ha(n)){if(t.indexOf(n)>=0)return;if(Wa(n))return n;if(!("toJSON"in n)){t[o]=n;const a=Ci(n)?[]:{};return Va(n,(s,c)=>{const l=r(s,o+1);!fi(l)&&(a[c]=l)}),t[o]=void 0,a}}return n};return r(e,0)},IR=qr("AsyncFunction"),DR=e=>e&&(Ha(e)||Zt(e))&&Zt(e.then)&&Zt(e.catch),XS=((e,t)=>e?setImmediate:t?((r,n)=>(wo.addEventListener("message",({source:o,data:a})=>{o===wo&&a===r&&n.length&&n.shift()()},!1),o=>{n.push(o),wo.postMessage(r,"*")}))(`axios@${Math.random()}`,[]):r=>setTimeout(r))(typeof setImmediate=="function",Zt(wo.postMessage)),_R=typeof queueMicrotask<"u"?queueMicrotask.bind(wo):typeof process<"u"&&process.nextTick||XS,LR=e=>e!=null&&Zt(e[$l]),H={isArray:Ci,isArrayBuffer:HS,isBuffer:Wa,isFormData:cR,isArrayBufferView:XO,isString:ZO,isNumber:VS,isBoolean:JO,isObject:Ha,isPlainObject:sc,isEmptyObject:QO,isReadableStream:dR,isRequest:uR,isResponse:hR,isHeaders:fR,isUndefined:fi,isDate:eR,isFile:tR,isReactNativeBlob:rR,isReactNative:nR,isBlob:oR,isRegExp:ER,isFunction:Zt,isStream:aR,isURLSearchParams:lR,isTypedArray:wR,isFileList:iR,forEach:Va,merge:ip,extend:mR,trim:pR,stripBOM:gR,inherits:xR,toFlatObject:vR,kindOf:Sl,kindOfTest:qr,endsWith:yR,toArray:bR,forEachEntry:$R,matchAll:SR,isHTMLForm:jR,hasOwnProperty:$x,hasOwnProp:$x,reduceDescriptors:YS,freezeMethods:CR,toObjectSet:PR,toCamelCase:kR,noop:AR,toFiniteNumber:OR,findKey:KS,global:wo,isContextDefined:GS,isSpecCompliantForm:RR,toJSONObject:TR,isAsyncFn:IR,isThenable:DR,setImmediate:XS,asap:_R,isIterable:LR};let xe=class ZS extends Error{static from(t,r,n,o,a,s){const c=new ZS(t.message,r||t.code,n,o,a);return c.cause=t,c.name=t.name,t.status!=null&&c.status==null&&(c.status=t.status),s&&Object.assign(c,s),c}constructor(t,r,n,o,a){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,r&&(this.code=r),n&&(this.config=n),o&&(this.request=o),a&&(this.response=a,this.status=a.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:H.toJSONObject(this.config),code:this.code,status:this.status}}};xe.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";xe.ERR_BAD_OPTION="ERR_BAD_OPTION";xe.ECONNABORTED="ECONNABORTED";xe.ETIMEDOUT="ETIMEDOUT";xe.ERR_NETWORK="ERR_NETWORK";xe.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";xe.ERR_DEPRECATED="ERR_DEPRECATED";xe.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";xe.ERR_BAD_REQUEST="ERR_BAD_REQUEST";xe.ERR_CANCELED="ERR_CANCELED";xe.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";xe.ERR_INVALID_URL="ERR_INVALID_URL";const MR=null;function ap(e){return H.isPlainObject(e)||H.isArray(e)}function JS(e){return H.endsWith(e,"[]")?e.slice(0,-2):e}function Ed(e,t,r){return e?e.concat(t).map(function(o,a){return o=JS(o),!r&&a?"["+o+"]":o}).join(r?".":""):t}function zR(e){return H.isArray(e)&&!e.some(ap)}const NR=H.toFlatObject(H,{},null,function(t){return/^is[A-Z]/.test(t)});function kl(e,t,r){if(!H.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,r=H.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,function(v,b){return!H.isUndefined(b[v])});const n=r.metaTokens,o=r.visitor||d,a=r.dots,s=r.indexes,l=(r.Blob||typeof Blob<"u"&&Blob)&&H.isSpecCompliantForm(t);if(!H.isFunction(o))throw new TypeError("visitor must be a function");function u(x){if(x===null)return"";if(H.isDate(x))return x.toISOString();if(H.isBoolean(x))return x.toString();if(!l&&H.isBlob(x))throw new xe("Blob is not supported. Use a Buffer instead.");return H.isArrayBuffer(x)||H.isTypedArray(x)?l&&typeof Blob=="function"?new Blob([x]):Buffer.from(x):x}function d(x,v,b){let E=x;if(H.isReactNative(t)&&H.isReactNativeBlob(x))return t.append(Ed(b,v,a),u(x)),!1;if(x&&!b&&typeof x=="object"){if(H.endsWith(v,"{}"))v=n?v:v.slice(0,-2),x=JSON.stringify(x);else if(H.isArray(x)&&zR(x)||(H.isFileList(x)||H.endsWith(v,"[]"))&&(E=H.toArray(x)))return v=JS(v),E.forEach(function(j,S){!(H.isUndefined(j)||j===null)&&t.append(s===!0?Ed([v],S,a):s===null?v:v+"[]",u(j))}),!1}return ap(x)?!0:(t.append(Ed(b,v,a),u(x)),!1)}const f=[],m=Object.assign(NR,{defaultVisitor:d,convertValue:u,isVisitable:ap});function g(x,v){if(!H.isUndefined(x)){if(f.indexOf(x)!==-1)throw Error("Circular reference detected in "+v.join("."));f.push(x),H.forEach(x,function(E,w){(!(H.isUndefined(E)||E===null)&&o.call(t,E,H.isString(w)?w.trim():w,v,m))===!0&&g(E,v?v.concat(w):[w])}),f.pop()}}if(!H.isObject(e))throw new TypeError("data must be an object");return g(e),t}function Sx(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(n){return t[n]})}function Im(e,t){this._pairs=[],e&&kl(e,this,t)}const QS=Im.prototype;QS.append=function(t,r){this._pairs.push([t,r])};QS.toString=function(t){const r=t?function(n){return t.call(this,n,Sx)}:Sx;return this._pairs.map(function(o){return r(o[0])+"="+r(o[1])},"").join("&")};function BR(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function ej(e,t,r){if(!t)return e;const n=r&&r.encode||BR,o=H.isFunction(r)?{serialize:r}:r,a=o&&o.serialize;let s;if(a?s=a(t,o):s=H.isURLSearchParams(t)?t.toString():new Im(t,o).toString(n),s){const c=e.indexOf("#");c!==-1&&(e=e.slice(0,c)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class jx{constructor(){this.handlers=[]}use(t,r,n){return this.handlers.push({fulfilled:t,rejected:r,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){H.forEach(this.handlers,function(n){n!==null&&t(n)})}}const Dm={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},FR=typeof URLSearchParams<"u"?URLSearchParams:Im,UR=typeof FormData<"u"?FormData:null,qR=typeof Blob<"u"?Blob:null,WR={isBrowser:!0,classes:{URLSearchParams:FR,FormData:UR,Blob:qR},protocols:["http","https","file","blob","url","data"]},_m=typeof window<"u"&&typeof document<"u",sp=typeof navigator=="object"&&navigator||void 0,HR=_m&&(!sp||["ReactNative","NativeScript","NS"].indexOf(sp.product)<0),VR=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",KR=_m&&window.location.href||"http://localhost",GR=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:_m,hasStandardBrowserEnv:HR,hasStandardBrowserWebWorkerEnv:VR,navigator:sp,origin:KR},Symbol.toStringTag,{value:"Module"})),_t={...GR,...WR};function YR(e,t){return kl(e,new _t.classes.URLSearchParams,{visitor:function(r,n,o,a){return _t.isNode&&H.isBuffer(r)?(this.append(n,r.toString("base64")),!1):a.defaultVisitor.apply(this,arguments)},...t})}function XR(e){return H.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function ZR(e){const t={},r=Object.keys(e);let n;const o=r.length;let a;for(n=0;n<o;n++)a=r[n],t[a]=e[a];return t}function tj(e){function t(r,n,o,a){let s=r[a++];if(s==="__proto__")return!0;const c=Number.isFinite(+s),l=a>=r.length;return s=!s&&H.isArray(o)?o.length:s,l?(H.hasOwnProp(o,s)?o[s]=[o[s],n]:o[s]=n,!c):((!o[s]||!H.isObject(o[s]))&&(o[s]=[]),t(r,n,o[s],a)&&H.isArray(o[s])&&(o[s]=ZR(o[s])),!c)}if(H.isFormData(e)&&H.isFunction(e.entries)){const r={};return H.forEachEntry(e,(n,o)=>{t(XR(n),o,r,0)}),r}return null}function JR(e,t,r){if(H.isString(e))try{return(t||JSON.parse)(e),H.trim(e)}catch(n){if(n.name!=="SyntaxError")throw n}return(r||JSON.stringify)(e)}const Ka={transitional:Dm,adapter:["xhr","http","fetch"],transformRequest:[function(t,r){const n=r.getContentType()||"",o=n.indexOf("application/json")>-1,a=H.isObject(t);if(a&&H.isHTMLForm(t)&&(t=new FormData(t)),H.isFormData(t))return o?JSON.stringify(tj(t)):t;if(H.isArrayBuffer(t)||H.isBuffer(t)||H.isStream(t)||H.isFile(t)||H.isBlob(t)||H.isReadableStream(t))return t;if(H.isArrayBufferView(t))return t.buffer;if(H.isURLSearchParams(t))return r.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let c;if(a){if(n.indexOf("application/x-www-form-urlencoded")>-1)return YR(t,this.formSerializer).toString();if((c=H.isFileList(t))||n.indexOf("multipart/form-data")>-1){const l=this.env&&this.env.FormData;return kl(c?{"files[]":t}:t,l&&new l,this.formSerializer)}}return a||o?(r.setContentType("application/json",!1),JR(t)):t}],transformResponse:[function(t){const r=this.transitional||Ka.transitional,n=r&&r.forcedJSONParsing,o=this.responseType==="json";if(H.isResponse(t)||H.isReadableStream(t))return t;if(t&&H.isString(t)&&(n&&!this.responseType||o)){const s=!(r&&r.silentJSONParsing)&&o;try{return JSON.parse(t,this.parseReviver)}catch(c){if(s)throw c.name==="SyntaxError"?xe.from(c,xe.ERR_BAD_RESPONSE,this,null,this.response):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:_t.classes.FormData,Blob:_t.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};H.forEach(["delete","get","head","post","put","patch"],e=>{Ka.headers[e]={}});const QR=H.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),eT=e=>{const t={};let r,n,o;return e&&e.split(`
`).forEach(function(s){o=s.indexOf(":"),r=s.substring(0,o).trim().toLowerCase(),n=s.substring(o+1).trim(),!(!r||t[r]&&QR[r])&&(r==="set-cookie"?t[r]?t[r].push(n):t[r]=[n]:t[r]=t[r]?t[r]+", "+n:n)}),t},kx=Symbol("internals");function Hi(e){return e&&String(e).trim().toLowerCase()}function cc(e){return e===!1||e==null?e:H.isArray(e)?e.map(cc):String(e)}function tT(e){const t=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=r.exec(e);)t[n[1]]=n[2];return t}const rT=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Cd(e,t,r,n,o){if(H.isFunction(n))return n.call(this,t,r);if(o&&(t=r),!!H.isString(t)){if(H.isString(n))return t.indexOf(n)!==-1;if(H.isRegExp(n))return n.test(t)}}function nT(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,r,n)=>r.toUpperCase()+n)}function oT(e,t){const r=H.toCamelCase(" "+t);["get","set","has"].forEach(n=>{Object.defineProperty(e,n+r,{value:function(o,a,s){return this[n].call(this,t,o,a,s)},configurable:!0})})}let Jt=class{constructor(t){t&&this.set(t)}set(t,r,n){const o=this;function a(c,l,u){const d=Hi(l);if(!d)throw new Error("header name must be a non-empty string");const f=H.findKey(o,d);(!f||o[f]===void 0||u===!0||u===void 0&&o[f]!==!1)&&(o[f||l]=cc(c))}const s=(c,l)=>H.forEach(c,(u,d)=>a(u,d,l));if(H.isPlainObject(t)||t instanceof this.constructor)s(t,r);else if(H.isString(t)&&(t=t.trim())&&!rT(t))s(eT(t),r);else if(H.isObject(t)&&H.isIterable(t)){let c={},l,u;for(const d of t){if(!H.isArray(d))throw TypeError("Object iterator must return a key-value pair");c[u=d[0]]=(l=c[u])?H.isArray(l)?[...l,d[1]]:[l,d[1]]:d[1]}s(c,r)}else t!=null&&a(r,t,n);return this}get(t,r){if(t=Hi(t),t){const n=H.findKey(this,t);if(n){const o=this[n];if(!r)return o;if(r===!0)return tT(o);if(H.isFunction(r))return r.call(this,o,n);if(H.isRegExp(r))return r.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,r){if(t=Hi(t),t){const n=H.findKey(this,t);return!!(n&&this[n]!==void 0&&(!r||Cd(this,this[n],n,r)))}return!1}delete(t,r){const n=this;let o=!1;function a(s){if(s=Hi(s),s){const c=H.findKey(n,s);c&&(!r||Cd(n,n[c],c,r))&&(delete n[c],o=!0)}}return H.isArray(t)?t.forEach(a):a(t),o}clear(t){const r=Object.keys(this);let n=r.length,o=!1;for(;n--;){const a=r[n];(!t||Cd(this,this[a],a,t,!0))&&(delete this[a],o=!0)}return o}normalize(t){const r=this,n={};return H.forEach(this,(o,a)=>{const s=H.findKey(n,a);if(s){r[s]=cc(o),delete r[a];return}const c=t?nT(a):String(a).trim();c!==a&&delete r[a],r[c]=cc(o),n[c]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const r=Object.create(null);return H.forEach(this,(n,o)=>{n!=null&&n!==!1&&(r[o]=t&&H.isArray(n)?n.join(", "):n)}),r}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,r])=>t+": "+r).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...r){const n=new this(t);return r.forEach(o=>n.set(o)),n}static accessor(t){const n=(this[kx]=this[kx]={accessors:{}}).accessors,o=this.prototype;function a(s){const c=Hi(s);n[c]||(oT(o,s),n[c]=!0)}return H.isArray(t)?t.forEach(a):a(t),this}};Jt.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);H.reduceDescriptors(Jt.prototype,({value:e},t)=>{let r=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(n){this[r]=n}}});H.freezeMethods(Jt);function Pd(e,t){const r=this||Ka,n=t||r,o=Jt.from(n.headers);let a=n.data;return H.forEach(e,function(c){a=c.call(r,a,o.normalize(),t?t.status:void 0)}),o.normalize(),a}function rj(e){return!!(e&&e.__CANCEL__)}let Ga=class extends xe{constructor(t,r,n){super(t??"canceled",xe.ERR_CANCELED,r,n),this.name="CanceledError",this.__CANCEL__=!0}};function nj(e,t,r){const n=r.config.validateStatus;!r.status||!n||n(r.status)?e(r):t(new xe("Request failed with status code "+r.status,[xe.ERR_BAD_REQUEST,xe.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r))}function iT(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function aT(e,t){e=e||10;const r=new Array(e),n=new Array(e);let o=0,a=0,s;return t=t!==void 0?t:1e3,function(l){const u=Date.now(),d=n[a];s||(s=u),r[o]=l,n[o]=u;let f=a,m=0;for(;f!==o;)m+=r[f++],f=f%e;if(o=(o+1)%e,o===a&&(a=(a+1)%e),u-s<t)return;const g=d&&u-d;return g?Math.round(m*1e3/g):void 0}}function sT(e,t){let r=0,n=1e3/t,o,a;const s=(u,d=Date.now())=>{r=d,o=null,a&&(clearTimeout(a),a=null),e(...u)};return[(...u)=>{const d=Date.now(),f=d-r;f>=n?s(u,d):(o=u,a||(a=setTimeout(()=>{a=null,s(o)},n-f)))},()=>o&&s(o)]}const Ac=(e,t,r=3)=>{let n=0;const o=aT(50,250);return sT(a=>{const s=a.loaded,c=a.lengthComputable?a.total:void 0,l=s-n,u=o(l),d=s<=c;n=s;const f={loaded:s,total:c,progress:c?s/c:void 0,bytes:l,rate:u||void 0,estimated:u&&c&&d?(c-s)/u:void 0,event:a,lengthComputable:c!=null,[t?"download":"upload"]:!0};e(f)},r)},Ex=(e,t)=>{const r=e!=null;return[n=>t[0]({lengthComputable:r,total:e,loaded:n}),t[1]]},Cx=e=>(...t)=>H.asap(()=>e(...t)),cT=_t.hasStandardBrowserEnv?((e,t)=>r=>(r=new URL(r,_t.origin),e.protocol===r.protocol&&e.host===r.host&&(t||e.port===r.port)))(new URL(_t.origin),_t.navigator&&/(msie|trident)/i.test(_t.navigator.userAgent)):()=>!0,lT=_t.hasStandardBrowserEnv?{write(e,t,r,n,o,a,s){if(typeof document>"u")return;const c=[`${e}=${encodeURIComponent(t)}`];H.isNumber(r)&&c.push(`expires=${new Date(r).toUTCString()}`),H.isString(n)&&c.push(`path=${n}`),H.isString(o)&&c.push(`domain=${o}`),a===!0&&c.push("secure"),H.isString(s)&&c.push(`SameSite=${s}`),document.cookie=c.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function dT(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function uT(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function oj(e,t,r){let n=!dT(t);return e&&(n||r==!1)?uT(e,t):t}const Px=e=>e instanceof Jt?{...e}:e;function Oo(e,t){t=t||{};const r={};function n(u,d,f,m){return H.isPlainObject(u)&&H.isPlainObject(d)?H.merge.call({caseless:m},u,d):H.isPlainObject(d)?H.merge({},d):H.isArray(d)?d.slice():d}function o(u,d,f,m){if(H.isUndefined(d)){if(!H.isUndefined(u))return n(void 0,u,f,m)}else return n(u,d,f,m)}function a(u,d){if(!H.isUndefined(d))return n(void 0,d)}function s(u,d){if(H.isUndefined(d)){if(!H.isUndefined(u))return n(void 0,u)}else return n(void 0,d)}function c(u,d,f){if(f in t)return n(u,d);if(f in e)return n(void 0,u)}const l={url:a,method:a,data:a,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,withXSRFToken:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:c,headers:(u,d,f)=>o(Px(u),Px(d),f,!0)};return H.forEach(Object.keys({...e,...t}),function(d){if(d==="__proto__"||d==="constructor"||d==="prototype")return;const f=H.hasOwnProp(l,d)?l[d]:o,m=f(e[d],t[d],d);H.isUndefined(m)&&f!==c||(r[d]=m)}),r}const ij=e=>{const t=Oo({},e);let{data:r,withXSRFToken:n,xsrfHeaderName:o,xsrfCookieName:a,headers:s,auth:c}=t;if(t.headers=s=Jt.from(s),t.url=ej(oj(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),c&&s.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?unescape(encodeURIComponent(c.password)):""))),H.isFormData(r)){if(_t.hasStandardBrowserEnv||_t.hasStandardBrowserWebWorkerEnv)s.setContentType(void 0);else if(H.isFunction(r.getHeaders)){const l=r.getHeaders(),u=["content-type","content-length"];Object.entries(l).forEach(([d,f])=>{u.includes(d.toLowerCase())&&s.set(d,f)})}}if(_t.hasStandardBrowserEnv&&(n&&H.isFunction(n)&&(n=n(t)),n||n!==!1&&cT(t.url))){const l=o&&a&&lT.read(a);l&&s.set(o,l)}return t},hT=typeof XMLHttpRequest<"u",fT=hT&&function(e){return new Promise(function(r,n){const o=ij(e);let a=o.data;const s=Jt.from(o.headers).normalize();let{responseType:c,onUploadProgress:l,onDownloadProgress:u}=o,d,f,m,g,x;function v(){g&&g(),x&&x(),o.cancelToken&&o.cancelToken.unsubscribe(d),o.signal&&o.signal.removeEventListener("abort",d)}let b=new XMLHttpRequest;b.open(o.method.toUpperCase(),o.url,!0),b.timeout=o.timeout;function E(){if(!b)return;const j=Jt.from("getAllResponseHeaders"in b&&b.getAllResponseHeaders()),y={data:!c||c==="text"||c==="json"?b.responseText:b.response,status:b.status,statusText:b.statusText,headers:j,config:e,request:b};nj(function($){r($),v()},function($){n($),v()},y),b=null}"onloadend"in b?b.onloadend=E:b.onreadystatechange=function(){!b||b.readyState!==4||b.status===0&&!(b.responseURL&&b.responseURL.indexOf("file:")===0)||setTimeout(E)},b.onabort=function(){b&&(n(new xe("Request aborted",xe.ECONNABORTED,e,b)),b=null)},b.onerror=function(S){const y=S&&S.message?S.message:"Network Error",k=new xe(y,xe.ERR_NETWORK,e,b);k.event=S||null,n(k),b=null},b.ontimeout=function(){let S=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded";const y=o.transitional||Dm;o.timeoutErrorMessage&&(S=o.timeoutErrorMessage),n(new xe(S,y.clarifyTimeoutError?xe.ETIMEDOUT:xe.ECONNABORTED,e,b)),b=null},a===void 0&&s.setContentType(null),"setRequestHeader"in b&&H.forEach(s.toJSON(),function(S,y){b.setRequestHeader(y,S)}),H.isUndefined(o.withCredentials)||(b.withCredentials=!!o.withCredentials),c&&c!=="json"&&(b.responseType=o.responseType),u&&([m,x]=Ac(u,!0),b.addEventListener("progress",m)),l&&b.upload&&([f,g]=Ac(l),b.upload.addEventListener("progress",f),b.upload.addEventListener("loadend",g)),(o.cancelToken||o.signal)&&(d=j=>{b&&(n(!j||j.type?new Ga(null,e,b):j),b.abort(),b=null)},o.cancelToken&&o.cancelToken.subscribe(d),o.signal&&(o.signal.aborted?d():o.signal.addEventListener("abort",d)));const w=iT(o.url);if(w&&_t.protocols.indexOf(w)===-1){n(new xe("Unsupported protocol "+w+":",xe.ERR_BAD_REQUEST,e));return}b.send(a||null)})},pT=(e,t)=>{const{length:r}=e=e?e.filter(Boolean):[];if(t||r){let n=new AbortController,o;const a=function(u){if(!o){o=!0,c();const d=u instanceof Error?u:this.reason;n.abort(d instanceof xe?d:new Ga(d instanceof Error?d.message:d))}};let s=t&&setTimeout(()=>{s=null,a(new xe(`timeout of ${t}ms exceeded`,xe.ETIMEDOUT))},t);const c=()=>{e&&(s&&clearTimeout(s),s=null,e.forEach(u=>{u.unsubscribe?u.unsubscribe(a):u.removeEventListener("abort",a)}),e=null)};e.forEach(u=>u.addEventListener("abort",a));const{signal:l}=n;return l.unsubscribe=()=>H.asap(c),l}},mT=function*(e,t){let r=e.byteLength;if(r<t){yield e;return}let n=0,o;for(;n<r;)o=n+t,yield e.slice(n,o),n=o},gT=async function*(e,t){for await(const r of xT(e))yield*mT(r,t)},xT=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:r,value:n}=await t.read();if(r)break;yield n}}finally{await t.cancel()}},Ax=(e,t,r,n)=>{const o=gT(e,t);let a=0,s,c=l=>{s||(s=!0,n&&n(l))};return new ReadableStream({async pull(l){try{const{done:u,value:d}=await o.next();if(u){c(),l.close();return}let f=d.byteLength;if(r){let m=a+=f;r(m)}l.enqueue(new Uint8Array(d))}catch(u){throw c(u),u}},cancel(l){return c(l),o.return()}},{highWaterMark:2})},Ox=64*1024,{isFunction:ys}=H,vT=(({Request:e,Response:t})=>({Request:e,Response:t}))(H.global),{ReadableStream:Rx,TextEncoder:Tx}=H.global,Ix=(e,...t)=>{try{return!!e(...t)}catch{return!1}},yT=e=>{e=H.merge.call({skipUndefined:!0},vT,e);const{fetch:t,Request:r,Response:n}=e,o=t?ys(t):typeof fetch=="function",a=ys(r),s=ys(n);if(!o)return!1;const c=o&&ys(Rx),l=o&&(typeof Tx=="function"?(x=>v=>x.encode(v))(new Tx):async x=>new Uint8Array(await new r(x).arrayBuffer())),u=a&&c&&Ix(()=>{let x=!1;const v=new r(_t.origin,{body:new Rx,method:"POST",get duplex(){return x=!0,"half"}}).headers.has("Content-Type");return x&&!v}),d=s&&c&&Ix(()=>H.isReadableStream(new n("").body)),f={stream:d&&(x=>x.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(x=>{!f[x]&&(f[x]=(v,b)=>{let E=v&&v[x];if(E)return E.call(v);throw new xe(`Response type '${x}' is not supported`,xe.ERR_NOT_SUPPORT,b)})});const m=async x=>{if(x==null)return 0;if(H.isBlob(x))return x.size;if(H.isSpecCompliantForm(x))return(await new r(_t.origin,{method:"POST",body:x}).arrayBuffer()).byteLength;if(H.isArrayBufferView(x)||H.isArrayBuffer(x))return x.byteLength;if(H.isURLSearchParams(x)&&(x=x+""),H.isString(x))return(await l(x)).byteLength},g=async(x,v)=>{const b=H.toFiniteNumber(x.getContentLength());return b??m(v)};return async x=>{let{url:v,method:b,data:E,signal:w,cancelToken:j,timeout:S,onDownloadProgress:y,onUploadProgress:k,responseType:$,headers:C,withCredentials:P="same-origin",fetchOptions:z}=ij(x),_=t||fetch;$=$?($+"").toLowerCase():"text";let N=pT([w,j&&j.toAbortSignal()],S),R=null;const F=N&&N.unsubscribe&&(()=>{N.unsubscribe()});let O;try{if(k&&u&&b!=="get"&&b!=="head"&&(O=await g(C,E))!==0){let B=new r(v,{method:"POST",body:E,duplex:"half"}),X;if(H.isFormData(E)&&(X=B.headers.get("content-type"))&&C.setContentType(X),B.body){const[ie,Z]=Ex(O,Ac(Cx(k)));E=Ax(B.body,Ox,ie,Z)}}H.isString(P)||(P=P?"include":"omit");const D=a&&"credentials"in r.prototype,A={...z,signal:N,method:b.toUpperCase(),headers:C.normalize().toJSON(),body:E,duplex:"half",credentials:D?P:void 0};R=a&&new r(v,A);let M=await(a?_(R,z):_(v,A));const I=d&&($==="stream"||$==="response");if(d&&(y||I&&F)){const B={};["status","statusText","headers"].forEach(q=>{B[q]=M[q]});const X=H.toFiniteNumber(M.headers.get("content-length")),[ie,Z]=y&&Ex(X,Ac(Cx(y),!0))||[];M=new n(Ax(M.body,Ox,ie,()=>{Z&&Z(),F&&F()}),B)}$=$||"text";let T=await f[H.findKey(f,$)||"text"](M,x);return!I&&F&&F(),await new Promise((B,X)=>{nj(B,X,{data:T,headers:Jt.from(M.headers),status:M.status,statusText:M.statusText,config:x,request:R})})}catch(D){throw F&&F(),D&&D.name==="TypeError"&&/Load failed|fetch/i.test(D.message)?Object.assign(new xe("Network Error",xe.ERR_NETWORK,x,R,D&&D.response),{cause:D.cause||D}):xe.from(D,D&&D.code,x,R,D&&D.response)}}},bT=new Map,aj=e=>{let t=e&&e.env||{};const{fetch:r,Request:n,Response:o}=t,a=[n,o,r];let s=a.length,c=s,l,u,d=bT;for(;c--;)l=a[c],u=d.get(l),u===void 0&&d.set(l,u=c?new Map:yT(t)),d=u;return u};aj();const Lm={http:MR,xhr:fT,fetch:{get:aj}};H.forEach(Lm,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Dx=e=>`- ${e}`,wT=e=>H.isFunction(e)||e===null||e===!1;function $T(e,t){e=H.isArray(e)?e:[e];const{length:r}=e;let n,o;const a={};for(let s=0;s<r;s++){n=e[s];let c;if(o=n,!wT(n)&&(o=Lm[(c=String(n)).toLowerCase()],o===void 0))throw new xe(`Unknown adapter '${c}'`);if(o&&(H.isFunction(o)||(o=o.get(t))))break;a[c||"#"+s]=o}if(!o){const s=Object.entries(a).map(([l,u])=>`adapter ${l} `+(u===!1?"is not supported by the environment":"is not available in the build"));let c=r?s.length>1?`since :
`+s.map(Dx).join(`
`):" "+Dx(s[0]):"as no adapter specified";throw new xe("There is no suitable adapter to dispatch the request "+c,"ERR_NOT_SUPPORT")}return o}const sj={getAdapter:$T,adapters:Lm};function Ad(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Ga(null,e)}function _x(e){return Ad(e),e.headers=Jt.from(e.headers),e.data=Pd.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),sj.getAdapter(e.adapter||Ka.adapter,e)(e).then(function(n){return Ad(e),n.data=Pd.call(e,e.transformResponse,n),n.headers=Jt.from(n.headers),n},function(n){return rj(n)||(Ad(e),n&&n.response&&(n.response.data=Pd.call(e,e.transformResponse,n.response),n.response.headers=Jt.from(n.response.headers))),Promise.reject(n)})}const cj="1.13.6",El={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{El[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}});const Lx={};El.transitional=function(t,r,n){function o(a,s){return"[Axios v"+cj+"] Transitional option '"+a+"'"+s+(n?". "+n:"")}return(a,s,c)=>{if(t===!1)throw new xe(o(s," has been removed"+(r?" in "+r:"")),xe.ERR_DEPRECATED);return r&&!Lx[s]&&(Lx[s]=!0,console.warn(o(s," has been deprecated since v"+r+" and will be removed in the near future"))),t?t(a,s,c):!0}};El.spelling=function(t){return(r,n)=>(console.warn(`${n} is likely a misspelling of ${t}`),!0)};function ST(e,t,r){if(typeof e!="object")throw new xe("options must be an object",xe.ERR_BAD_OPTION_VALUE);const n=Object.keys(e);let o=n.length;for(;o-- >0;){const a=n[o],s=t[a];if(s){const c=e[a],l=c===void 0||s(c,a,e);if(l!==!0)throw new xe("option "+a+" must be "+l,xe.ERR_BAD_OPTION_VALUE);continue}if(r!==!0)throw new xe("Unknown option "+a,xe.ERR_BAD_OPTION)}}const lc={assertOptions:ST,validators:El},hr=lc.validators;let ko=class{constructor(t){this.defaults=t||{},this.interceptors={request:new jx,response:new jx}}async request(t,r){try{return await this._request(t,r)}catch(n){if(n instanceof Error){let o={};Error.captureStackTrace?Error.captureStackTrace(o):o=new Error;const a=o.stack?o.stack.replace(/^.+\n/,""):"";try{n.stack?a&&!String(n.stack).endsWith(a.replace(/^.+\n.+\n/,""))&&(n.stack+=`
`+a):n.stack=a}catch{}}throw n}}_request(t,r){typeof t=="string"?(r=r||{},r.url=t):r=t||{},r=Oo(this.defaults,r);const{transitional:n,paramsSerializer:o,headers:a}=r;n!==void 0&&lc.assertOptions(n,{silentJSONParsing:hr.transitional(hr.boolean),forcedJSONParsing:hr.transitional(hr.boolean),clarifyTimeoutError:hr.transitional(hr.boolean),legacyInterceptorReqResOrdering:hr.transitional(hr.boolean)},!1),o!=null&&(H.isFunction(o)?r.paramsSerializer={serialize:o}:lc.assertOptions(o,{encode:hr.function,serialize:hr.function},!0)),r.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?r.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:r.allowAbsoluteUrls=!0),lc.assertOptions(r,{baseUrl:hr.spelling("baseURL"),withXsrfToken:hr.spelling("withXSRFToken")},!0),r.method=(r.method||this.defaults.method||"get").toLowerCase();let s=a&&H.merge(a.common,a[r.method]);a&&H.forEach(["delete","get","head","post","put","patch","common"],x=>{delete a[x]}),r.headers=Jt.concat(s,a);const c=[];let l=!0;this.interceptors.request.forEach(function(v){if(typeof v.runWhen=="function"&&v.runWhen(r)===!1)return;l=l&&v.synchronous;const b=r.transitional||Dm;b&&b.legacyInterceptorReqResOrdering?c.unshift(v.fulfilled,v.rejected):c.push(v.fulfilled,v.rejected)});const u=[];this.interceptors.response.forEach(function(v){u.push(v.fulfilled,v.rejected)});let d,f=0,m;if(!l){const x=[_x.bind(this),void 0];for(x.unshift(...c),x.push(...u),m=x.length,d=Promise.resolve(r);f<m;)d=d.then(x[f++],x[f++]);return d}m=c.length;let g=r;for(;f<m;){const x=c[f++],v=c[f++];try{g=x(g)}catch(b){v.call(this,b);break}}try{d=_x.call(this,g)}catch(x){return Promise.reject(x)}for(f=0,m=u.length;f<m;)d=d.then(u[f++],u[f++]);return d}getUri(t){t=Oo(this.defaults,t);const r=oj(t.baseURL,t.url,t.allowAbsoluteUrls);return ej(r,t.params,t.paramsSerializer)}};H.forEach(["delete","get","head","options"],function(t){ko.prototype[t]=function(r,n){return this.request(Oo(n||{},{method:t,url:r,data:(n||{}).data}))}});H.forEach(["post","put","patch"],function(t){function r(n){return function(a,s,c){return this.request(Oo(c||{},{method:t,headers:n?{"Content-Type":"multipart/form-data"}:{},url:a,data:s}))}}ko.prototype[t]=r(),ko.prototype[t+"Form"]=r(!0)});let jT=class lj{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let r;this.promise=new Promise(function(a){r=a});const n=this;this.promise.then(o=>{if(!n._listeners)return;let a=n._listeners.length;for(;a-- >0;)n._listeners[a](o);n._listeners=null}),this.promise.then=o=>{let a;const s=new Promise(c=>{n.subscribe(c),a=c}).then(o);return s.cancel=function(){n.unsubscribe(a)},s},t(function(a,s,c){n.reason||(n.reason=new Ga(a,s,c),r(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const r=this._listeners.indexOf(t);r!==-1&&this._listeners.splice(r,1)}toAbortSignal(){const t=new AbortController,r=n=>{t.abort(n)};return this.subscribe(r),t.signal.unsubscribe=()=>this.unsubscribe(r),t.signal}static source(){let t;return{token:new lj(function(o){t=o}),cancel:t}}};function kT(e){return function(r){return e.apply(null,r)}}function ET(e){return H.isObject(e)&&e.isAxiosError===!0}const cp={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(cp).forEach(([e,t])=>{cp[t]=e});function dj(e){const t=new ko(e),r=qS(ko.prototype.request,t);return H.extend(r,ko.prototype,t,{allOwnKeys:!0}),H.extend(r,t,null,{allOwnKeys:!0}),r.create=function(o){return dj(Oo(e,o))},r}const se=dj(Ka);se.Axios=ko;se.CanceledError=Ga;se.CancelToken=jT;se.isCancel=rj;se.VERSION=cj;se.toFormData=kl;se.AxiosError=xe;se.Cancel=se.CanceledError;se.all=function(t){return Promise.all(t)};se.spread=kT;se.isAxiosError=ET;se.mergeConfig=Oo;se.AxiosHeaders=Jt;se.formToJSON=e=>tj(H.isHTMLForm(e)?new FormData(e):e);se.getAdapter=sj.getAdapter;se.HttpStatusCode=cp;se.default=se;const{Axios:Dse,AxiosError:_se,CanceledError:Lse,isCancel:Mse,CancelToken:zse,VERSION:Nse,all:Bse,Cancel:Fse,isAxiosError:Use,spread:qse,toFormData:Wse,AxiosHeaders:Hse,HttpStatusCode:Vse,formToJSON:Kse,getAdapter:Gse,mergeConfig:Yse}=se,Vi=()=>!0,Ko=(e=300)=>new Promise(t=>setTimeout(t,e)),Od={"POST:/api/care-offers":e=>{const t=e?.url||"";return t.includes("/accept")?Promise.resolve({idx:1,status:"ACCEPTED",message:"제안을 수락했습니다. 케어 요청이 진행 중으로 바뀝니다."}):t.includes("/reject")?Promise.resolve({idx:1,status:"REJECTED",message:"제안을 거절했습니다."}):Promise.resolve({idx:1,status:"PENDING",offeredCoins:3e3,message:"제안을 보냈습니다."})},"GET:/api/care-offers/between":()=>Promise.resolve(null),"GET:/api/care-offers/candidates":()=>Promise.resolve([]),"GET:/api/pet-news/":e=>{const t=(e?.url||"").split("/").pop();return Promise.resolve({idx:Number(t)||1,title:"서울시 반려동물 동반 가능 시설 안내",link:"https://news.seoul.go.kr/",publishedAt:"2026-11-20T09:00:00"})},"POST:/api/auth/login":()=>Ie(()=>import("./auth-LKdcXZI2.js"),[]).then(e=>e.loginResponse),"POST:/api/auth/register":()=>Ie(()=>import("./auth-LKdcXZI2.js"),[]).then(e=>e.registerResponse),"POST:/api/auth/validate":()=>Ie(()=>import("./auth-LKdcXZI2.js"),[]).then(e=>e.validateResponse),"POST:/api/auth/refresh":()=>Ie(()=>import("./auth-LKdcXZI2.js"),[]).then(e=>e.refreshResponse),"POST:/api/auth/logout":()=>Promise.resolve({success:!0}),"GET:/api/boards":e=>{const t=e?.params?.page||0;return Ie(()=>import("./boards-DterCtQZ.js"),[]).then(r=>r.getBoardsList(t))},"GET:/api/boards/popular":()=>Ie(()=>import("./boards-DterCtQZ.js"),[]).then(e=>e.getPopularBoards()),"GET:/api/boards/search":e=>{const t=e?.params?.keyword||"",r=e?.params?.page||0;return Ie(()=>import("./boards-DterCtQZ.js"),[]).then(n=>n.searchBoards(t,r))},"GET:/api/boards/":e=>{const t=e.url||"";if(t.includes("/comments")){const n=t.match(/\/boards\/(\d+)\/comments/)?.[1];return Ie(()=>import("./boards-DterCtQZ.js"),[]).then(o=>o.getComments(n))}const r=t.split("/").pop();return Ie(()=>import("./boards-DterCtQZ.js"),[]).then(n=>n.getBoardDetail(r))},"POST:/api/boards":e=>(e.url||"").includes("/comments")?Ie(()=>import("./boards-DterCtQZ.js"),[]).then(r=>r.createCommentResponse()):Ie(()=>import("./boards-DterCtQZ.js"),[]).then(r=>r.createBoardResponse()),"PUT:/api/boards/":e=>{const r=(e.url||"").split("/").pop();return Ie(()=>import("./boards-DterCtQZ.js"),[]).then(n=>n.updateBoardResponse(r))},"DELETE:/api/boards/":()=>Promise.resolve({success:!0}),"GET:/api/admin/users":e=>{const t=e?.params?.page||0;return Ie(()=>import("./users-KQuJuI9B.js"),[]).then(r=>r.getUsersList(t))},"GET:/api/admin/users/paging":e=>{const t=e?.params?.page||0;return Ie(()=>import("./users-KQuJuI9B.js"),[]).then(r=>r.getUsersList(t))},"GET:/api/admin/users/":e=>{const r=(e.url||"").split("/").pop();return Ie(()=>import("./users-KQuJuI9B.js"),[]).then(n=>n.getUserDetail(r))},"GET:/api/care-requests":e=>{const t=e?.params?.page||0;return Ie(()=>import("./careRequests-CLh39pvX.js"),[]).then(r=>r.getCareRequestsList(t))},"GET:/api/care-requests/":e=>{const r=(e.url||"").split("/").pop();return Ie(()=>import("./careRequests-CLh39pvX.js"),[]).then(n=>n.getCareRequestDetail(r))},"GET:/api/location-services":e=>{const t=e?.params?.page||0;return Ie(()=>import("./location-Cuj7TNE6.js"),[]).then(r=>r.getLocationServicesList(t))},"GET:/api/location-services/search":e=>Ie(()=>import("./location-Cuj7TNE6.js"),[]).then(t=>t.searchLocationServices(e?.params||{})),"GET:/api/location-services/":e=>{const r=(e.url||"").split("/").pop();return Ie(()=>import("./location-Cuj7TNE6.js"),[]).then(n=>n.getLocationServiceDetail(r))},"GET:/api/chat/conversations":()=>Ie(()=>import("./chat-_QL4XQQt.js"),[]).then(e=>e.getChatRooms()),"GET:/api/chat/conversations/":e=>{const r=(e?.url||"").match(/\/conversations\/(\d+)/)?.[1];return Ie(()=>import("./chat-_QL4XQQt.js"),[]).then(n=>{const o=n.getChatRooms(),a=Array.isArray(o)?o:o?.content||[];return a.find(s=>String(s.idx??s.id)===String(r))||a[0]||null})},"POST:/api/chat/conversations":()=>Promise.resolve({idx:1,message:"데모에서는 채팅방을 새로 만들지 않습니다."}),"GET:/api/chat/messages/":e=>{const t=(e?.url||"").match(/\/conversation\/(\d+)/)?.[1];return Ie(()=>import("./chat-_QL4XQQt.js"),[]).then(r=>r.getMessages(t))},"POST:/api/chat/messages":()=>Promise.resolve({idx:Date.now(),message:"전송됨"}),"GET:/api/chat/rooms":()=>Ie(()=>import("./chat-_QL4XQQt.js"),[]).then(e=>e.getChatRooms()),"GET:/api/chat/rooms/":e=>{const t=e.url||"";if(t.includes("/messages")){const r=t.match(/\/rooms\/(\d+)\/messages/)?.[1];return Ie(()=>import("./chat-_QL4XQQt.js"),[]).then(n=>n.getMessages(r))}return null},"GET:/api/admin/statistics":()=>Ie(()=>import("./admin-DPsCMkID.js"),[]).then(e=>e.getStatistics()),"GET:/api/admin/reports":e=>{const t=e?.params?.page||0;return Ie(()=>import("./admin-DPsCMkID.js"),[]).then(r=>r.getReports(t))},"POST:/api/upload":()=>Ie(()=>import("./files-D-vdYkXb.js"),[]).then(e=>e.uploadResponse())},bs=(e,t)=>{let r=t;if(t.startsWith("http://")||t.startsWith("https://"))try{r=new URL(t).pathname}catch{}const n=`${e}:${r}`;if(Od[n])return Od[n];for(const[o,a]of Object.entries(Od)){const s=o.replace(/^[A-Z]+:/,"");if(r===s||o.endsWith("/")&&r.startsWith(s.replace(/\/$/,""))||r.includes(s)&&!s.includes("*"))return a}return null},CT=()=>{if(!Vi()){console.log("🔌 실제 API 모드 (모킹 비활성화)");return}console.log("🎮 데모 모드 활성화 (더미 데이터 사용)");const e=se.defaults.adapter||se.getAdapter(["xhr","http"]),t=async s=>{if(!Vi())return e(s);const c=(s.method||"get").toUpperCase(),l=s.url||"",u=s.baseURL?`${s.baseURL}${l}`:l,d=bs(c,u);if(d){console.log("✅ 모킹 매칭 성공 (adapter):",{method:c,path:u});try{await Ko(300);const f=await d(s);if(f!==null)return{data:f,status:200,statusText:"OK",headers:{},config:s}}catch(f){throw console.error("더미데이터 로드 실패:",f),f}}return Promise.reject(new Error(`데모 모드: ${c} ${u}에 대한 더미데이터가 없습니다.`))};se.defaults.adapter=t;const r=se.create;se.create=function(s){const c=r.call(this,s);return c.defaults.adapter=t,c.interceptors.request.use(l=>(l.adapter=t,l)),c};const n=se.interceptors.request.use(async s=>{if(!Vi())return s;const c=(s.method||"get").toUpperCase(),l=s.url||"",u=s.baseURL?`${s.baseURL}${l}`:l,d=bs(c,u);return d?(console.log("✅ 모킹 매칭 성공:",{method:c,path:u}),s.adapter=async()=>{await Ko(300);const f=await d(s);if(f!==null)return{data:f,status:200,statusText:"OK",headers:{},config:s};throw new Error("Mock data is null")}):(console.warn("🔍 모킹 매칭 실패:",{method:c,url:l,baseURL:s.baseURL,fullUrl:u}),s.adapter=async()=>{throw new Error(`데모 모드: ${c} ${u}에 대한 더미데이터가 없습니다.`)}),s},s=>Promise.reject(s)),o=se.Axios.prototype.request;se.Axios.prototype.request=function(s){if(Vi()){const c=(s.method||this.defaults.method||"get").toUpperCase(),l=s.url||"",u=s.baseURL||this.defaults.baseURL||"",d=u?`${u}${l}`:l;let f=d;if(d.startsWith("http://")||d.startsWith("https://"))try{f=new URL(d).pathname}catch{}const m=bs(c,f);return m?(console.log("✅ 모킹 매칭 성공 (request override):",{method:c,path:f,fullUrl:d,baseURL:u,url:l}),(async()=>{await Ko(300);const g=await m({...s,baseURL:u,url:l});if(g!==null)return{data:g,status:200,statusText:"OK",headers:{},config:{...s,baseURL:u,url:l}};throw new Error("Mock data is null")})()):(console.warn("🔍 모킹 매칭 실패 (request override):",{method:c,url:l,baseURL:u,fullUrl:d,path:f,instanceDefaults:this.defaults.baseURL}),Promise.reject(new Error(`데모 모드: ${c} ${f}에 대한 더미데이터가 없습니다.`)))}return s?.adapter?s.adapter(s):o.call(this,s)};const a=se.interceptors.response.use(s=>s,async s=>{if(se.isCancel(s)&&s.config?._isMock){const c=s.config;if(c?._mockData!==void 0)return await Ko(300),Promise.resolve({data:c._mockData,status:200,statusText:"OK",headers:{},config:c});if(c?._mockError)return await Ko(300),Promise.reject(c._mockError)}if(Vi()&&s.config&&!s.config._triedMock){s.config._triedMock=!0;const c=(s.config.method||"get").toUpperCase(),l=s.config.url||"",u=s.config.baseURL?`${s.config.baseURL}${l}`:l,d=bs(c,u);if(d)try{await Ko(300);const f=await d(s.config);if(f!==null)return Promise.resolve({data:f,status:200,statusText:"OK",headers:{},config:s.config})}catch(f){return console.error("더미데이터 로드 실패:",f),Promise.reject(f)}}return Promise.reject(s)});return{requestInterceptor:n,responseInterceptor:a}};var bt=function(){return bt=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a])}return t},bt.apply(this,arguments)};function pi(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,a;n<o;n++)(a||!(n in t))&&(a||(a=Array.prototype.slice.call(t,0,n)),a[n]=t[n]);return e.concat(a||Array.prototype.slice.call(t))}var Fe="-ms-",Sa="-moz-",Oe="-webkit-",uj="comm",Cl="rule",Mm="decl",PT="@import",hj="@keyframes",AT="@layer",fj=Math.abs,zm=String.fromCharCode,lp=Object.assign;function OT(e,t){return yt(e,0)^45?(((t<<2^yt(e,0))<<2^yt(e,1))<<2^yt(e,2))<<2^yt(e,3):0}function pj(e){return e.trim()}function gn(e,t){return(e=t.exec(e))?e[0]:e}function ye(e,t,r){return e.replace(t,r)}function dc(e,t,r){return e.indexOf(t,r)}function yt(e,t){return e.charCodeAt(t)|0}function mi(e,t,r){return e.slice(t,r)}function tn(e){return e.length}function mj(e){return e.length}function pa(e,t){return t.push(e),e}function RT(e,t){return e.map(t).join("")}function Mx(e,t){return e.filter(function(r){return!gn(r,t)})}var Pl=1,gi=1,gj=0,wr=0,ot=0,Pi="";function Al(e,t,r,n,o,a,s,c){return{value:e,root:t,parent:r,type:n,props:o,children:a,line:Pl,column:gi,length:s,return:"",siblings:c}}function Hn(e,t){return lp(Al("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Go(e){for(;e.root;)e=Hn(e.root,{children:[e]});pa(e,e.siblings)}function TT(){return ot}function IT(){return ot=wr>0?yt(Pi,--wr):0,gi--,ot===10&&(gi=1,Pl--),ot}function Lr(){return ot=wr<gj?yt(Pi,wr++):0,gi++,ot===10&&(gi=1,Pl++),ot}function Eo(){return yt(Pi,wr)}function uc(){return wr}function Ol(e,t){return mi(Pi,e,t)}function dp(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function DT(e){return Pl=gi=1,gj=tn(Pi=e),wr=0,[]}function _T(e){return Pi="",e}function Rd(e){return pj(Ol(wr-1,up(e===91?e+2:e===40?e+1:e)))}function LT(e){for(;(ot=Eo())&&ot<33;)Lr();return dp(e)>2||dp(ot)>3?"":" "}function MT(e,t){for(;--t&&Lr()&&!(ot<48||ot>102||ot>57&&ot<65||ot>70&&ot<97););return Ol(e,uc()+(t<6&&Eo()==32&&Lr()==32))}function up(e){for(;Lr();)switch(ot){case e:return wr;case 34:case 39:e!==34&&e!==39&&up(ot);break;case 40:e===41&&up(e);break;case 92:Lr();break}return wr}function zT(e,t){for(;Lr()&&e+ot!==57;)if(e+ot===84&&Eo()===47)break;return"/*"+Ol(t,wr-1)+"*"+zm(e===47?e:Lr())}function NT(e){for(;!dp(Eo());)Lr();return Ol(e,wr)}function BT(e){return _T(hc("",null,null,null,[""],e=DT(e),0,[0],e))}function hc(e,t,r,n,o,a,s,c,l){for(var u=0,d=0,f=s,m=0,g=0,x=0,v=1,b=1,E=1,w=0,j="",S=o,y=a,k=n,$=j;b;)switch(x=w,w=Lr()){case 40:if(x!=108&&yt($,f-1)==58){dc($+=ye(Rd(w),"&","&\f"),"&\f",fj(u?c[u-1]:0))!=-1&&(E=-1);break}case 34:case 39:case 91:$+=Rd(w);break;case 9:case 10:case 13:case 32:$+=LT(x);break;case 92:$+=MT(uc()-1,7);continue;case 47:switch(Eo()){case 42:case 47:pa(FT(zT(Lr(),uc()),t,r,l),l);break;default:$+="/"}break;case 123*v:c[u++]=tn($)*E;case 125*v:case 59:case 0:switch(w){case 0:case 125:b=0;case 59+d:E==-1&&($=ye($,/\f/g,"")),g>0&&tn($)-f&&pa(g>32?Nx($+";",n,r,f-1,l):Nx(ye($," ","")+";",n,r,f-2,l),l);break;case 59:$+=";";default:if(pa(k=zx($,t,r,u,d,o,c,j,S=[],y=[],f,a),a),w===123)if(d===0)hc($,t,k,k,S,a,f,c,y);else switch(m===99&&yt($,3)===110?100:m){case 100:case 108:case 109:case 115:hc(e,k,k,n&&pa(zx(e,k,k,0,0,o,c,j,o,S=[],f,y),y),o,y,f,c,n?S:y);break;default:hc($,k,k,k,[""],y,0,c,y)}}u=d=g=0,v=E=1,j=$="",f=s;break;case 58:f=1+tn($),g=x;default:if(v<1){if(w==123)--v;else if(w==125&&v++==0&&IT()==125)continue}switch($+=zm(w),w*v){case 38:E=d>0?1:($+="\f",-1);break;case 44:c[u++]=(tn($)-1)*E,E=1;break;case 64:Eo()===45&&($+=Rd(Lr())),m=Eo(),d=f=tn(j=$+=NT(uc())),w++;break;case 45:x===45&&tn($)==2&&(v=0)}}return a}function zx(e,t,r,n,o,a,s,c,l,u,d,f){for(var m=o-1,g=o===0?a:[""],x=mj(g),v=0,b=0,E=0;v<n;++v)for(var w=0,j=mi(e,m+1,m=fj(b=s[v])),S=e;w<x;++w)(S=pj(b>0?g[w]+" "+j:ye(j,/&\f/g,g[w])))&&(l[E++]=S);return Al(e,t,r,o===0?Cl:c,l,u,d,f)}function FT(e,t,r,n){return Al(e,t,r,uj,zm(TT()),mi(e,2,-2),0,n)}function Nx(e,t,r,n,o){return Al(e,t,r,Mm,mi(e,0,n),mi(e,n+1,-1),n,o)}function xj(e,t,r){switch(OT(e,t)){case 5103:return Oe+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Oe+e+e;case 4789:return Sa+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Oe+e+Sa+e+Fe+e+e;case 5936:switch(yt(e,t+11)){case 114:return Oe+e+Fe+ye(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Oe+e+Fe+ye(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Oe+e+Fe+ye(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Oe+e+Fe+e+e;case 6165:return Oe+e+Fe+"flex-"+e+e;case 5187:return Oe+e+ye(e,/(\w+).+(:[^]+)/,Oe+"box-$1$2"+Fe+"flex-$1$2")+e;case 5443:return Oe+e+Fe+"flex-item-"+ye(e,/flex-|-self/g,"")+(gn(e,/flex-|baseline/)?"":Fe+"grid-row-"+ye(e,/flex-|-self/g,""))+e;case 4675:return Oe+e+Fe+"flex-line-pack"+ye(e,/align-content|flex-|-self/g,"")+e;case 5548:return Oe+e+Fe+ye(e,"shrink","negative")+e;case 5292:return Oe+e+Fe+ye(e,"basis","preferred-size")+e;case 6060:return Oe+"box-"+ye(e,"-grow","")+Oe+e+Fe+ye(e,"grow","positive")+e;case 4554:return Oe+ye(e,/([^-])(transform)/g,"$1"+Oe+"$2")+e;case 6187:return ye(ye(ye(e,/(zoom-|grab)/,Oe+"$1"),/(image-set)/,Oe+"$1"),e,"")+e;case 5495:case 3959:return ye(e,/(image-set\([^]*)/,Oe+"$1$`$1");case 4968:return ye(ye(e,/(.+:)(flex-)?(.*)/,Oe+"box-pack:$3"+Fe+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Oe+e+e;case 4200:if(!gn(e,/flex-|baseline/))return Fe+"grid-column-align"+mi(e,t)+e;break;case 2592:case 3360:return Fe+ye(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,gn(n.props,/grid-\w+-end/)})?~dc(e+(r=r[t].value),"span",0)?e:Fe+ye(e,"-start","")+e+Fe+"grid-row-span:"+(~dc(r,"span",0)?gn(r,/\d+/):+gn(r,/\d+/)-+gn(e,/\d+/))+";":Fe+ye(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return gn(n.props,/grid-\w+-start/)})?e:Fe+ye(ye(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return ye(e,/(.+)-inline(.+)/,Oe+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(tn(e)-1-t>6)switch(yt(e,t+1)){case 109:if(yt(e,t+4)!==45)break;case 102:return ye(e,/(.+:)(.+)-([^]+)/,"$1"+Oe+"$2-$3$1"+Sa+(yt(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~dc(e,"stretch",0)?xj(ye(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return ye(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,a,s,c,l,u){return Fe+o+":"+a+u+(s?Fe+o+"-span:"+(c?l:+l-+a)+u:"")+e});case 4949:if(yt(e,t+6)===121)return ye(e,":",":"+Oe)+e;break;case 6444:switch(yt(e,yt(e,14)===45?18:11)){case 120:return ye(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Oe+(yt(e,14)===45?"inline-":"")+"box$3$1"+Oe+"$2$3$1"+Fe+"$2box$3")+e;case 100:return ye(e,":",":"+Fe)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return ye(e,"scroll-","scroll-snap-")+e}return e}function Oc(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function UT(e,t,r,n){switch(e.type){case AT:if(e.children.length)break;case PT:case Mm:return e.return=e.return||e.value;case uj:return"";case hj:return e.return=e.value+"{"+Oc(e.children,n)+"}";case Cl:if(!tn(e.value=e.props.join(",")))return""}return tn(r=Oc(e.children,n))?e.return=e.value+"{"+r+"}":""}function qT(e){var t=mj(e);return function(r,n,o,a){for(var s="",c=0;c<t;c++)s+=e[c](r,n,o,a)||"";return s}}function WT(e){return function(t){t.root||(t=t.return)&&e(t)}}function HT(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case Mm:e.return=xj(e.value,e.length,r);return;case hj:return Oc([Hn(e,{value:ye(e.value,"@","@"+Oe)})],n);case Cl:if(e.length)return RT(r=e.props,function(o){switch(gn(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Go(Hn(e,{props:[ye(o,/:(read-\w+)/,":"+Sa+"$1")]})),Go(Hn(e,{props:[o]})),lp(e,{props:Mx(r,n)});break;case"::placeholder":Go(Hn(e,{props:[ye(o,/:(plac\w+)/,":"+Oe+"input-$1")]})),Go(Hn(e,{props:[ye(o,/:(plac\w+)/,":"+Sa+"$1")]})),Go(Hn(e,{props:[ye(o,/:(plac\w+)/,Fe+"input-$1")]})),Go(Hn(e,{props:[o]})),lp(e,{props:Mx(r,n)});break}return""})}}var VT={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},tr={},xi=typeof process<"u"&&tr!==void 0&&(tr.REACT_APP_SC_ATTR||tr.SC_ATTR)||"data-styled",vj="active",yj="data-styled-version",Rl="6.1.19",Nm=`/*!sc*/
`,Rc=typeof window<"u"&&typeof document<"u",KT=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&tr!==void 0&&tr.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&tr.REACT_APP_SC_DISABLE_SPEEDY!==""?tr.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&tr.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&tr!==void 0&&tr.SC_DISABLE_SPEEDY!==void 0&&tr.SC_DISABLE_SPEEDY!==""&&tr.SC_DISABLE_SPEEDY!=="false"&&tr.SC_DISABLE_SPEEDY),GT={},Tl=Object.freeze([]),vi=Object.freeze({});function bj(e,t,r){return r===void 0&&(r=vi),e.theme!==r.theme&&e.theme||t||r.theme}var wj=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),YT=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,XT=/(^-|-$)/g;function Bx(e){return e.replace(YT,"-").replace(XT,"")}var ZT=/(a)(d)/gi,ws=52,Fx=function(e){return String.fromCharCode(e+(e>25?39:97))};function hp(e){var t,r="";for(t=Math.abs(e);t>ws;t=t/ws|0)r=Fx(t%ws)+r;return(Fx(t%ws)+r).replace(ZT,"$1-$2")}var Td,$j=5381,ai=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},Sj=function(e){return ai($j,e)};function Bm(e){return hp(Sj(e)>>>0)}function JT(e){return e.displayName||e.name||"Component"}function Id(e){return typeof e=="string"&&!0}var jj=typeof Symbol=="function"&&Symbol.for,kj=jj?Symbol.for("react.memo"):60115,QT=jj?Symbol.for("react.forward_ref"):60112,eI={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},tI={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Ej={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},rI=((Td={})[QT]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Td[kj]=Ej,Td);function Ux(e){return("type"in(t=e)&&t.type.$$typeof)===kj?Ej:"$$typeof"in e?rI[e.$$typeof]:eI;var t}var nI=Object.defineProperty,oI=Object.getOwnPropertyNames,qx=Object.getOwnPropertySymbols,iI=Object.getOwnPropertyDescriptor,aI=Object.getPrototypeOf,Wx=Object.prototype;function Cj(e,t,r){if(typeof t!="string"){if(Wx){var n=aI(t);n&&n!==Wx&&Cj(e,n,r)}var o=oI(t);qx&&(o=o.concat(qx(t)));for(var a=Ux(e),s=Ux(t),c=0;c<o.length;++c){var l=o[c];if(!(l in tI||r&&r[l]||s&&l in s||a&&l in a)){var u=iI(t,l);try{nI(e,l,u)}catch{}}}}return e}function Ro(e){return typeof e=="function"}function Fm(e){return typeof e=="object"&&"styledComponentId"in e}function $o(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function Tc(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function Pa(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function fp(e,t,r){if(r===void 0&&(r=!1),!r&&!Pa(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=fp(e[n],t[n]);else if(Pa(t))for(var n in t)e[n]=fp(e[n],t[n]);return e}function Um(e,t){Object.defineProperty(e,"toString",{value:t})}function eo(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var sI=(function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,a=o;t>=a;)if((a<<=1)<0)throw eo(16,"".concat(t));this.groupSizes=new Uint32Array(a),this.groupSizes.set(n),this.length=a;for(var s=o;s<a;s++)this.groupSizes[s]=0}for(var c=this.indexOfGroup(t+1),l=(s=0,r.length);s<l;s++)this.tag.insertRule(c,r[s])&&(this.groupSizes[t]++,c++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var a=n;a<o;a++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),a=o+n,s=o;s<a;s++)r+="".concat(this.tag.getRule(s)).concat(Nm);return r},e})(),fc=new Map,Ic=new Map,pc=1,$s=function(e){if(fc.has(e))return fc.get(e);for(;Ic.has(pc);)pc++;var t=pc++;return fc.set(e,t),Ic.set(t,e),t},cI=function(e,t){pc=t+1,fc.set(e,t),Ic.set(t,e)},lI="style[".concat(xi,"][").concat(yj,'="').concat(Rl,'"]'),dI=new RegExp("^".concat(xi,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),uI=function(e,t,r){for(var n,o=r.split(","),a=0,s=o.length;a<s;a++)(n=o[a])&&e.registerName(t,n)},hI=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(Nm),o=[],a=0,s=n.length;a<s;a++){var c=n[a].trim();if(c){var l=c.match(dI);if(l){var u=0|parseInt(l[1],10),d=l[2];u!==0&&(cI(d,u),uI(e,d,l[3]),e.getTag().insertRules(u,o)),o.length=0}else o.push(c)}}},Hx=function(e){for(var t=document.querySelectorAll(lI),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(xi)!==vj&&(hI(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function fI(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Pj=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=(function(c){var l=Array.from(c.querySelectorAll("style[".concat(xi,"]")));return l[l.length-1]})(r),a=o!==void 0?o.nextSibling:null;n.setAttribute(xi,vj),n.setAttribute(yj,Rl);var s=fI();return s&&n.setAttribute("nonce",s),r.insertBefore(n,a),n},pI=(function(){function e(t){this.element=Pj(t),this.element.appendChild(document.createTextNode("")),this.sheet=(function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,o=0,a=n.length;o<a;o++){var s=n[o];if(s.ownerNode===r)return s}throw eo(17)})(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e})(),mI=(function(){function e(t){this.element=Pj(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e})(),gI=(function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e})(),Vx=Rc,xI={isServer:!Rc,useCSSOMInjection:!KT},Dc=(function(){function e(t,r,n){t===void 0&&(t=vi),r===void 0&&(r={});var o=this;this.options=bt(bt({},xI),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Rc&&Vx&&(Vx=!1,Hx(this)),Um(this,function(){return(function(a){for(var s=a.getTag(),c=s.length,l="",u=function(f){var m=(function(E){return Ic.get(E)})(f);if(m===void 0)return"continue";var g=a.names.get(m),x=s.getGroup(f);if(g===void 0||!g.size||x.length===0)return"continue";var v="".concat(xi,".g").concat(f,'[id="').concat(m,'"]'),b="";g!==void 0&&g.forEach(function(E){E.length>0&&(b+="".concat(E,","))}),l+="".concat(x).concat(v,'{content:"').concat(b,'"}').concat(Nm)},d=0;d<c;d++)u(d);return l})(o)})}return e.registerId=function(t){return $s(t)},e.prototype.rehydrate=function(){!this.server&&Rc&&Hx(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(bt(bt({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=(function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new gI(o):n?new pI(o):new mI(o)})(this.options),new sI(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if($s(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules($s(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup($s(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e})(),vI=/&/g,yI=/^\s*\/\/.*$/gm;function Aj(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Aj(r.children,t)),r})}function bI(e){var t,r,n,o=vi,a=o.options,s=a===void 0?vi:a,c=o.plugins,l=c===void 0?Tl:c,u=function(m,g,x){return x.startsWith(r)&&x.endsWith(r)&&x.replaceAll(r,"").length>0?".".concat(t):m},d=l.slice();d.push(function(m){m.type===Cl&&m.value.includes("&")&&(m.props[0]=m.props[0].replace(vI,r).replace(n,u))}),s.prefix&&d.push(HT),d.push(UT);var f=function(m,g,x,v){g===void 0&&(g=""),x===void 0&&(x=""),v===void 0&&(v="&"),t=v,r=g,n=new RegExp("\\".concat(r,"\\b"),"g");var b=m.replace(yI,""),E=BT(x||g?"".concat(x," ").concat(g," { ").concat(b," }"):b);s.namespace&&(E=Aj(E,s.namespace));var w=[];return Oc(E,qT(d.concat(WT(function(j){return w.push(j)})))),w};return f.hash=l.length?l.reduce(function(m,g){return g.name||eo(15),ai(m,g.name)},$j).toString():"",f}var wI=new Dc,pp=bI(),Oj=ar.createContext({shouldForwardProp:void 0,styleSheet:wI,stylis:pp});Oj.Consumer;ar.createContext(void 0);function mp(){return p.useContext(Oj)}var Rj=(function(){function e(t,r){var n=this;this.inject=function(o,a){a===void 0&&(a=pp);var s=n.name+a.hash;o.hasNameForId(n.id,s)||o.insertRules(n.id,s,a(n.rules,s,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Um(this,function(){throw eo(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=pp),this.name+t.hash},e})(),$I=function(e){return e>="A"&&e<="Z"};function Kx(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;$I(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var Tj=function(e){return e==null||e===!1||e===""},Ij=function(e){var t,r,n=[];for(var o in e){var a=e[o];e.hasOwnProperty(o)&&!Tj(a)&&(Array.isArray(a)&&a.isCss||Ro(a)?n.push("".concat(Kx(o),":"),a,";"):Pa(a)?n.push.apply(n,pi(pi(["".concat(o," {")],Ij(a),!1),["}"],!1)):n.push("".concat(Kx(o),": ").concat((t=o,(r=a)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in VT||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function Qn(e,t,r,n){if(Tj(e))return[];if(Fm(e))return[".".concat(e.styledComponentId)];if(Ro(e)){if(!Ro(a=e)||a.prototype&&a.prototype.isReactComponent||!t)return[e];var o=e(t);return Qn(o,t,r,n)}var a;return e instanceof Rj?r?(e.inject(r,n),[e.getName(n)]):[e]:Pa(e)?Ij(e):Array.isArray(e)?Array.prototype.concat.apply(Tl,e.map(function(s){return Qn(s,t,r,n)})):[e.toString()]}function Dj(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(Ro(r)&&!Fm(r))return!1}return!0}var SI=Sj(Rl),jI=(function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&Dj(t),this.componentId=r,this.baseHash=ai(SI,r),this.baseStyle=n,Dc.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=$o(o,this.staticRulesId);else{var a=Tc(Qn(this.rules,t,r,n)),s=hp(ai(this.baseHash,a)>>>0);if(!r.hasNameForId(this.componentId,s)){var c=n(a,".".concat(s),void 0,this.componentId);r.insertRules(this.componentId,s,c)}o=$o(o,s),this.staticRulesId=s}else{for(var l=ai(this.baseHash,n.hash),u="",d=0;d<this.rules.length;d++){var f=this.rules[d];if(typeof f=="string")u+=f;else if(f){var m=Tc(Qn(f,t,r,n));l=ai(l,m+d),u+=m}}if(u){var g=hp(l>>>0);r.hasNameForId(this.componentId,g)||r.insertRules(this.componentId,g,n(u,".".concat(g),void 0,this.componentId)),o=$o(o,g)}}return o},e})(),yi=ar.createContext(void 0);yi.Consumer;function _j(){var e=p.useContext(yi);if(!e)throw eo(18);return e}function kI(e){var t=ar.useContext(yi),r=p.useMemo(function(){return(function(n,o){if(!n)throw eo(14);if(Ro(n)){var a=n(o);return a}if(Array.isArray(n)||typeof n!="object")throw eo(8);return o?bt(bt({},o),n):n})(e.theme,t)},[e.theme,t]);return e.children?ar.createElement(yi.Provider,{value:r},e.children):null}var Dd={};function EI(e,t,r){var n=Fm(e),o=e,a=!Id(e),s=t.attrs,c=s===void 0?Tl:s,l=t.componentId,u=l===void 0?(function(S,y){var k=typeof S!="string"?"sc":Bx(S);Dd[k]=(Dd[k]||0)+1;var $="".concat(k,"-").concat(Bm(Rl+k+Dd[k]));return y?"".concat(y,"-").concat($):$})(t.displayName,t.parentComponentId):l,d=t.displayName,f=d===void 0?(function(S){return Id(S)?"styled.".concat(S):"Styled(".concat(JT(S),")")})(e):d,m=t.displayName&&t.componentId?"".concat(Bx(t.displayName),"-").concat(t.componentId):t.componentId||u,g=n&&o.attrs?o.attrs.concat(c).filter(Boolean):c,x=t.shouldForwardProp;if(n&&o.shouldForwardProp){var v=o.shouldForwardProp;if(t.shouldForwardProp){var b=t.shouldForwardProp;x=function(S,y){return v(S,y)&&b(S,y)}}else x=v}var E=new jI(r,m,n?o.componentStyle:void 0);function w(S,y){return(function(k,$,C){var P=k.attrs,z=k.componentStyle,_=k.defaultProps,N=k.foldedComponentIds,R=k.styledComponentId,F=k.target,O=ar.useContext(yi),D=mp(),A=k.shouldForwardProp||D.shouldForwardProp,M=bj($,O,_)||vi,I=(function(q,W,J){for(var L,G=bt(bt({},W),{className:void 0,theme:J}),K=0;K<q.length;K+=1){var ee=Ro(L=q[K])?L(G):L;for(var ne in ee)G[ne]=ne==="className"?$o(G[ne],ee[ne]):ne==="style"?bt(bt({},G[ne]),ee[ne]):ee[ne]}return W.className&&(G.className=$o(G.className,W.className)),G})(P,$,M),T=I.as||F,B={};for(var X in I)I[X]===void 0||X[0]==="$"||X==="as"||X==="theme"&&I.theme===M||(X==="forwardedAs"?B.as=I.forwardedAs:A&&!A(X,T)||(B[X]=I[X]));var ie=(function(q,W){var J=mp(),L=q.generateAndInjectStyles(W,J.styleSheet,J.stylis);return L})(z,I),Z=$o(N,R);return ie&&(Z+=" "+ie),I.className&&(Z+=" "+I.className),B[Id(T)&&!wj.has(T)?"class":"className"]=Z,C&&(B.ref=C),p.createElement(T,B)})(j,S,y)}w.displayName=f;var j=ar.forwardRef(w);return j.attrs=g,j.componentStyle=E,j.displayName=f,j.shouldForwardProp=x,j.foldedComponentIds=n?$o(o.foldedComponentIds,o.styledComponentId):"",j.styledComponentId=m,j.target=n?o.target:e,Object.defineProperty(j,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(S){this._foldedDefaultProps=n?(function(y){for(var k=[],$=1;$<arguments.length;$++)k[$-1]=arguments[$];for(var C=0,P=k;C<P.length;C++)fp(y,P[C],!0);return y})({},o.defaultProps,S):S}}),Um(j,function(){return".".concat(j.styledComponentId)}),a&&Cj(j,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),j}function Gx(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var Yx=function(e){return Object.assign(e,{isCss:!0})};function Aa(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(Ro(e)||Pa(e))return Yx(Qn(Gx(Tl,pi([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?Qn(n):Yx(Qn(Gx(n,t)))}function gp(e,t,r){if(r===void 0&&(r=vi),!t)throw eo(1,t);var n=function(o){for(var a=[],s=1;s<arguments.length;s++)a[s-1]=arguments[s];return e(t,r,Aa.apply(void 0,pi([o],a,!1)))};return n.attrs=function(o){return gp(e,t,bt(bt({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return gp(e,t,bt(bt({},r),o))},n}var Lj=function(e){return gp(EI,e)},h=Lj;wj.forEach(function(e){h[e]=Lj(e)});var CI=(function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=Dj(t),Dc.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var a=o(Tc(Qn(this.rules,r,n,o)),""),s=this.componentId+t;n.insertRules(s,s,a)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&Dc.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,o)},e})();function PI(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=Aa.apply(void 0,pi([e],t,!1)),o="sc-global-".concat(Bm(JSON.stringify(n))),a=new CI(n,o),s=function(l){var u=mp(),d=ar.useContext(yi),f=ar.useRef(u.styleSheet.allocateGSInstance(o)).current;return u.styleSheet.server&&c(f,l,u.styleSheet,d,u.stylis),ar.useLayoutEffect(function(){if(!u.styleSheet.server)return c(f,l,u.styleSheet,d,u.stylis),function(){return a.removeStyles(f,u.styleSheet)}},[f,l,u.styleSheet,d,u.stylis]),null};function c(l,u,d,f,m){if(a.isStatic)a.renderStyles(l,GT,d,m);else{var g=bt(bt({},u),{theme:bj(u,f,s.defaultProps)});a.renderStyles(l,g,d,m)}}return ar.memo(s)}function Ya(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=Tc(Aa.apply(void 0,pi([e],t,!1))),o=Bm(n);return new Rj(o,n)}const Vn={colors:{primary:"#E8714A",primaryDark:"#C9573A",primaryLight:"#F0926E",primarySoft:"#FDF0EB",secondary:"#3D8B7A",secondaryDark:"#2E6B5E",secondaryLight:"#5BA898",secondarySoft:"#EBF5F3",background:"#FAFAF8",surface:"#F5F4F1",surfaceSoft:"#EFEDE9",surfaceElevated:"#FFFFFF",surfaceHover:"#EAE8E4",text:"#1C1917",textSecondary:"#6B7280",textLight:"#6B7280",textInverse:"#FFFFFF",textMuted:"#9CA3AF",border:"#E2DDD8",borderLight:"#F0EDE8",borderDark:"#B5AFA8",borderFocus:"#E8714A",success:"#22C55E",successDark:"#16A34A",successSoft:"#F0FDF4",warning:"#F59E0B",warningDark:"#D97706",warningSoft:"#FFFBEB",error:"#EF4444",errorDark:"#DC2626",errorSoft:"#FEF2F2",info:"#3B82F6",infoDark:"#2563EB",infoSoft:"#EFF6FF",shadow:"rgba(28,25,23,0.08)",shadowHover:"rgba(28,25,23,0.14)",gradient:"linear-gradient(135deg, #E8714A 0%, #F0926E 100%)",overlay:"rgba(28,25,23,0.6)",domain:{location:"#3B82F6",meetup:"#10B981",care:"#F59E0B",community:"#8B5CF6",missing:"#EF4444"},category:{all:"#6366F1",daily:"#EC4899",pride:"#F472B6",question:"#3B82F6",info:"#10B981",review:"#8B5CF6",meetup:"#F59E0B",notice:"#EF4444",missing:"#EF4444",adoption:"#8B5CF6",free:"#6366F1"},oauth:{google:"#4285F4",naver:"#03C75A",kakao:"#FEE500",kakaoText:"#3C1E1E"},ai:{accent:"#F5A623",bg:"#FFF8EC",text:"#c47d00"},status:{missing:"#EF4444",found:"#10B981",resolved:"#6366F1",recruiting:"#22C55E",closed:"#F59E0B",completed:"#9CA3AF",cancelled:"#EF4444",open:"#3B82F6",inProgress:"#E8714A"}},chart:["#E8714A","#3D8B7A","#22C55E","#F59E0B","#8B5CF6","#06B6D4","#EF4444","#F97316"],shadows:{none:"none",sm:"0 1px 3px rgba(28,25,23,0.08), 0 1px 2px rgba(28,25,23,0.04)",md:"0 4px 8px rgba(28,25,23,0.08), 0 2px 4px rgba(28,25,23,0.04)",lg:"0 10px 24px rgba(28,25,23,0.10), 0 4px 8px rgba(28,25,23,0.06)",xl:"0 20px 40px rgba(28,25,23,0.14), 0 8px 16px rgba(28,25,23,0.08)",focus:"0 0 0 3px rgba(232,113,74,0.3)"},spacing:{xs:"4px",sm:"8px",md:"12px",lg:"16px",xl:"20px",xxl:"24px","3xl":"32px","4xl":"40px","5xl":"48px","6xl":"64px"},borderRadius:{xs:"2px",sm:"4px",md:"8px",lg:"12px",xl:"16px","2xl":"24px",pill:"9999px",full:"50%"},typography:{fontFamily:{korean:"'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Noto Sans KR', sans-serif",english:"'Inter', -apple-system, BlinkMacSystemFont, sans-serif",mono:"'JetBrains Mono', 'Fira Code', monospace"},fontWeight:{regular:400,medium:500,semibold:600,bold:700,extrabold:800},lineHeight:{tight:1.2,normal:1.5,relaxed:1.75},hero:{fontSize:"48px",fontWeight:"800",lineHeight:1.2},h1:{fontSize:"32px",fontWeight:"700",lineHeight:1.2},h2:{fontSize:"24px",fontWeight:"600",lineHeight:1.2},h3:{fontSize:"20px",fontWeight:"600",lineHeight:1.5},h4:{fontSize:"17px",fontWeight:"500",lineHeight:1.5},body1:{fontSize:"15px",fontWeight:"400",lineHeight:1.5},body2:{fontSize:"13px",fontWeight:"400",lineHeight:1.5},caption:{fontSize:"11px",fontWeight:"400",lineHeight:1.2},tiny:{fontSize:"10px",fontWeight:"400",lineHeight:1.2}},duration:{instant:"0ms",fast:"100ms",normal:"200ms",slow:"300ms",slower:"500ms"},easing:{linear:"linear",easeIn:"cubic-bezier(0.4, 0, 1, 1)",easeOut:"cubic-bezier(0, 0, 0.2, 1)",easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",spring:"cubic-bezier(0.34, 1.56, 0.64, 1)"},container:{sm:"640px",md:"768px",lg:"1024px",xl:"1280px",full:"100%"}},AI={colors:{primary:"#F0926E",primaryDark:"#E8714A",primaryLight:"#F5AE92",primarySoft:"#3D2218",secondary:"#5BA898",secondaryDark:"#3D8B7A",secondaryLight:"#7DC0B4",secondarySoft:"#1A2E2B",background:"#171412",surface:"#242220",surfaceSoft:"#1E1C1A",surfaceElevated:"#2E2C2A",surfaceHover:"#322F2C",text:"#F5F0EC",textSecondary:"#C4BDB7",textLight:"#9C958E",textInverse:"#1C1917",textMuted:"#7A7470",border:"#3D3A37",borderLight:"#302D2A",borderDark:"#524E4A",borderFocus:"#F0926E",success:"#4ADE80",successDark:"#22C55E",successSoft:"#052E16",warning:"#FCD34D",warningDark:"#F59E0B",warningSoft:"#2D1B00",error:"#F87171",errorDark:"#EF4444",errorSoft:"#2D0A0A",info:"#60A5FA",infoDark:"#3B82F6",infoSoft:"#0C1A3D",shadow:"rgba(0,0,0,0.4)",shadowHover:"rgba(0,0,0,0.5)",gradient:"linear-gradient(135deg, #F0926E 0%, #F5AE92 100%)",overlay:"rgba(0,0,0,0.7)",domain:{location:"#60A5FA",meetup:"#34D399",care:"#FCD34D",community:"#A78BFA",missing:"#F87171"},category:{all:"#818CF8",daily:"#F472B6",pride:"#F9A8D4",question:"#60A5FA",info:"#34D399",review:"#A78BFA",meetup:"#FCD34D",notice:"#F87171",missing:"#F87171",adoption:"#A78BFA",free:"#818CF8"},oauth:{google:"#4285F4",naver:"#03C75A",kakao:"#FEE500",kakaoText:"#3C1E1E"},ai:{accent:"#F5A623",bg:"#3D3220",text:"#F5C668"},status:{missing:"#F87171",found:"#34D399",resolved:"#818CF8",recruiting:"#4ADE80",closed:"#FCD34D",completed:"#9CA3AF",cancelled:"#F87171",open:"#60A5FA",inProgress:"#F0926E"}},chart:["#E8714A","#3D8B7A","#22C55E","#F59E0B","#8B5CF6","#06B6D4","#EF4444","#F97316"],shadows:Vn.shadows,spacing:Vn.spacing,borderRadius:Vn.borderRadius,typography:Vn.typography,duration:Vn.duration,easing:Vn.easing,container:Vn.container},Mj=p.createContext();function OI(){const e=localStorage.getItem("theme");return e==="dark"||e==="light"?e==="dark":localStorage.getItem("petory-theme")==="dark"}const Il=()=>{const e=p.useContext(Mj);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},RI=({children:e})=>{const[t,r]=p.useState(OI),n=()=>{r(a=>!a)},o=t?AI:Vn;return p.useEffect(()=>{const a=t?"dark":"light";localStorage.setItem("theme",a),localStorage.setItem("petory-theme",a),document.documentElement.setAttribute("data-theme",a),window.dispatchEvent(new CustomEvent(jd,{detail:a}))},[t]),p.useEffect(()=>{const a=s=>{const c=s.detail;if(c!=="dark"&&c!=="light")return;const l=c==="dark";r(u=>u===l?u:l)};return window.addEventListener(jd,a),()=>window.removeEventListener(jd,a)},[]),i.jsx(Mj.Provider,{value:{isDarkMode:t,toggleTheme:n,theme:o},children:i.jsx(kI,{theme:o,children:e})})},TI=()=>!0,Lt=new Date,Mt=e=>e.toISOString().slice(0,19).replace("T"," "),ja={idx:1,id:"demo",username:"demo",nickname:"데모유저",email:"demo@petory.demo",phone:"010-1234-5678",role:"USER",location:"서울시 강남구",status:"ACTIVE",warningCount:0,petCoinBalance:1e3,emailVerified:!0,pets:[{idx:1,name:"초코",species:"DOG",breed:"골든리트리버",age:"3살",color:"골드"}]},mo=[{idx:1,title:"우리 강아지 첫 산책 후기 🐕",content:"오늘 날씨가 좋아서 강아지랑 공원에 다녀왔어요. 정말 좋았어요!",category:"일상",status:"ACTIVE",createdAt:Mt(new Date(Lt-2880*60*1e3)),deleted:!1,userId:1,username:"demo",userLocation:"서울시 강남구",comments:[],commentCount:3,attachments:[],likes:12,dislikes:0,views:45,boardFilePath:null,commentFilePath:null},{idx:2,title:"고양이 사료 추천 부탁드려요",content:"6개월 된 영국숏헤어 키우고 있는데, 어떤 사료가 좋을까요?",category:"질문",status:"ACTIVE",createdAt:Mt(new Date(Lt-1440*60*1e3)),deleted:!1,userId:2,username:"cat_lover",userLocation:"경기도 성남시",comments:[],commentCount:5,attachments:[],likes:8,dislikes:0,views:32,boardFilePath:null,commentFilePath:null},{idx:3,title:"🐾 우리 뽀삐 자랑합니다!",content:"오늘 미용 다녀온 우리 뽀삐 너무 귀엽죠?",category:"자랑",status:"ACTIVE",createdAt:Mt(new Date(Lt-300*60*1e3)),deleted:!1,userId:1,username:"demo",userLocation:"서울시 강남구",comments:[],commentCount:7,attachments:[],likes:25,dislikes:0,views:120,boardFilePath:null,commentFilePath:null},{idx:4,title:"반려동물 동물병원 정보 공유",content:"강남구 근처에 야간 진료하는 동물병원 아시는 분 계신가요?",category:"정보공유",status:"ACTIVE",createdAt:Mt(new Date(Lt-4320*60*1e3)),deleted:!1,userId:3,username:"pet_parent",userLocation:"서울시 강남구",comments:[],commentCount:2,attachments:[],likes:5,dislikes:0,views:28,boardFilePath:null,commentFilePath:null}],II=mo.filter(e=>e.category==="자랑"),ho=[{idx:1,title:"주말 2일간 강아지 맡아주실 분",description:"이번 주말에 출장이 있어서 2일간 강아지 맡아주실 분 구해요. 골든리트리버 3살입니다.",date:Mt(new Date(Lt.getTime()+4320*60*1e3)),offeredCoins:500,status:"OPEN",createdAt:Mt(new Date(Lt-1440*60*1e3)),deleted:!1,userId:1,username:"demo",userLocation:"서울시 강남구",petIdx:1,pet:{idx:1,name:"초코",species:"DOG",breed:"골든리트리버",age:"3살"},applications:[],applicationCount:2,comments:[],commentCount:1},{idx:2,title:"고양이 하루 돌봐주실 분",description:"병원 가야 해서 오후 2시~6시 정도 고양이 봐주실 분 구합니다.",date:Mt(new Date(Lt.getTime()+1440*60*1e3)),offeredCoins:200,status:"OPEN",createdAt:Mt(new Date(Lt-300*60*1e3)),deleted:!1,userId:2,username:"cat_lover",userLocation:"경기도 성남시",petIdx:null,pet:null,applications:[],applicationCount:0,comments:[],commentCount:0}],Ss=[{idx:1,userId:1,username:"demo",nickname:"데모유저",title:"우리 강아지 실종했습니다",content:"오늘 오후 3시경 강남역 근처에서 실종했습니다. 이름은 초코입니다.",phoneNumber:"010-1234-5678",petName:"초코",species:"DOG",breed:"골든리트리버",gender:"MALE",age:"3살",color:"골드",lostDate:"2024-03-15",lostLocation:"서울 강남구 강남역 2번 출구",latitude:37.4979,longitude:127.0276,status:"MISSING",imageUrl:null,createdAt:Mt(new Date(Lt-2880*60*1e3)),updatedAt:Mt(new Date(Lt-2880*60*1e3)),deleted:!1,comments:[],commentCount:2,attachments:[]},{idx:2,userId:2,username:"cat_lover",nickname:"고양이사랑",title:"노란색 고양이 목격",content:"어제 저녁 성남시 분당구에서 노란색 고양이를 봤어요.",phoneNumber:"010-9876-5432",petName:null,species:"CAT",breed:"코리안숏헤어",gender:"FEMALE",age:null,color:"노랑",lostDate:"2024-03-16",lostLocation:"경기 성남시 분당구",latitude:37.3826,longitude:127.121,status:"FOUND",imageUrl:null,createdAt:Mt(new Date(Lt-1440*60*1e3)),updatedAt:Mt(new Date(Lt-1440*60*1e3)),deleted:!1,comments:[],commentCount:0,attachments:[]}],Ki=[{idx:1,title:"주말 강남역 산책 모임",description:"날씨 좋은 주말에 강아지랑 함께 산책해요!",meetupDate:Mt(new Date(Lt.getTime()+2880*60*1e3)),meetupTime:"10:00",location:"서울 강남구 강남역 공원",latitude:37.4979,longitude:127.0276,maxParticipants:10,currentParticipants:3,status:"RECRUITING",createdAt:Mt(new Date(Lt-1440*60*1e3)),hostUserId:1,hostNickname:"데모유저"}],_d=[{idx:1,name:"펫토리 동물병원",category:"동물병원",address:"서울시 강남구 테헤란로 123",latitude:37.5012,longitude:127.0396,description:"24시간 응급진료 가능",averageRating:4.5,reviewCount:28},{idx:2,name:"강아지 카페 퐁퐁",category:"반려동물카페",address:"서울시 강남구 역삼동 456",latitude:37.4995,longitude:127.0375,description:"넓은 실내 놀이공간",averageRating:4.8,reviewCount:45}],js=[{idx:1,type:"BOARD_CREATE",description:"커뮤니티에 게시글을 작성했습니다.",createdAt:Mt(new Date(Lt-7200*1e3)),targetIdx:1,targetType:"BOARD"},{idx:2,type:"CARE_APPLY",description:"펫케어 요청에 지원했습니다.",createdAt:Mt(new Date(Lt-1440*60*1e3)),targetIdx:1,targetType:"CARE_REQUEST"}],Gi=[{...ja},{idx:2,id:"cat_lover",username:"cat_lover",nickname:"고양이사랑",email:"cat@petory.demo",role:"USER",status:"ACTIVE",warningCount:0,petCoinBalance:500},{idx:3,id:"pet_parent",username:"pet_parent",nickname:"반려인",email:"parent@petory.demo",role:"USER",status:"ACTIVE",warningCount:0,petCoinBalance:800}],qm="http://localhost:8080/api/auth",Yi="demo-access-token",Xi="demo-refresh-token",mc=se.create({baseURL:qm,headers:{"Content-Type":"application/json"}}),xp=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),gc=e=>{localStorage.setItem("accessToken",e),localStorage.getItem("token")&&localStorage.removeItem("token")},zj=()=>{localStorage.removeItem("accessToken"),localStorage.removeItem("token")},vp=()=>localStorage.getItem("refreshToken"),xc=e=>{localStorage.setItem("refreshToken",e)},DI=()=>{localStorage.removeItem("refreshToken")},ka=()=>{zj(),DI()};mc.interceptors.request.use(e=>{const t=xp();return t&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));let Zi=!1,yp=[];const Ld=(e,t=null)=>{yp.forEach(r=>{e?r.reject(e):r.resolve(t)}),yp=[]};mc.interceptors.response.use(e=>e,async e=>{const t=e.config;if(e.response?.status===401&&!t._retry){if(Zi)return new Promise((n,o)=>{yp.push({resolve:n,reject:o})}).then(n=>(t.headers.Authorization=`Bearer ${n}`,mc(t))).catch(n=>Promise.reject(n));t._retry=!0,Zi=!0;const r=vp();if(!r)return ka(),Ld(e),Zi=!1,window.redirectToLogin&&window.redirectToLogin(),Promise.reject(e);try{const n=await se.post(`${qm}/refresh`,{refreshToken:r}),{accessToken:o,refreshToken:a}=n.data;return gc(o),a&&xc(a),t.headers.Authorization=`Bearer ${o}`,Ld(null,o),Zi=!1,mc(t)}catch(n){return ka(),Ld(n),Zi=!1,window.redirectToLogin&&window.redirectToLogin(),Promise.reject(n)}}return Promise.reject(e)});const Zn={login:async(e,t)=>(gc(Yi),xc(Xi),{accessToken:Yi,refreshToken:Xi,user:ja}),register:async e=>({success:!0,message:"데모 모드에서는 회원가입이 제한됩니다."}),validateToken:async()=>xp()===Yi?{valid:!0,user:ja}:{valid:!1},refreshAccessToken:async()=>{{if(vp()===Xi)return gc(Yi),xc(Xi),{accessToken:Yi,refreshToken:Xi,user:ja};throw ka(),new Error("Refresh Token이 없습니다.")}},logout:async()=>{{ka();return}},forgotPassword:async e=>{try{return(await se.post(`${qm}/forgot-password`,{email:e})).data}catch(t){throw t}},getToken:xp,getRefreshToken:vp,setToken:gc,setRefreshToken:xc,removeToken:zj,removeAllTokens:ka},Nj=p.createContext(),dt=()=>{const e=p.useContext(Nj);if(!e)throw new Error("useAuth must be used within an AuthProvider");return e},_I=({children:e})=>{const[t,r]=p.useState(ja),[n,o]=p.useState(!1),[a,s]=p.useState(TI());p.useEffect(()=>{},[]);const m={user:t,loading:n,isAuthenticated:a,login:async(g,x)=>{try{const v=await Zn.login(g,x);return r(v.user),s(!0),v}catch(v){throw v}},register:async g=>{try{return await Zn.register(g)}catch(x){throw x}},logout:async()=>{try{await Zn.logout()}catch(g){console.error("로그아웃 중 오류:",g),Zn.removeAllTokens()}finally{r(null),s(!1)}},redirectToLogin:()=>{typeof window<"u"&&window.redirectToLogin&&window.redirectToLogin()},updateUserProfile:g=>{r(x=>x?{...x,...g}:g||x)}};return i.jsx(Nj.Provider,{value:m,children:e})},LI=["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"],MI="http://localhost:8080/api/admin/users",Dl=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),zI=se.create({baseURL:MI,headers:{"Content-Type":"application/json"}});zI.interceptors.request.use(e=>{const t=Dl();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const fo=e=>Promise.resolve({data:e}),bp={getAllUsersWithPaging:(e={})=>{{const{page:t=0,size:r=20}=e,n=t*r,o=Gi.slice(n,n+r);return fo({users:o,totalCount:Gi.length,hasNext:n+o.length<Gi.length})}},getUser:e=>{{const t=Gi.find(r=>r.idx===Number(e));return fo(t||Gi[0])}},createUser:e=>fo({idx:99,...e}),updateUser:(e,t)=>fo({idx:e,...t}),deleteUser:e=>fo({}),restoreUser:e=>fo({}),updateUserStatus:(e,t)=>fo({})},Bj=se.create({baseURL:"http://localhost:8080/api/master/admin-users",headers:{"Content-Type":"application/json"}});Bj.interceptors.request.use(e=>{const t=Dl();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const NI={promoteToAdmin:e=>Bj.patch(`/${e}/promote-to-admin`)},Yt=se.create({baseURL:"http://localhost:8080/api/users",headers:{"Content-Type":"application/json"}});Yt.interceptors.request.use(e=>{const t=Dl();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const yr={getMyProfile:()=>Yt.get("/me"),updateMyProfile:e=>Yt.put("/me",e),changePassword:(e,t)=>Yt.patch("/me/password",{currentPassword:e,newPassword:t}),updateMyUsername:e=>Yt.patch("/me/username",{username:e}),setNickname:e=>Yt.post("/me/nickname",{nickname:e}),checkNicknameAvailability:e=>Yt.get("/nickname/check",{params:{nickname:e}}),checkIdAvailability:e=>Yt.get("/id/check",{params:{id:e}}),getUserProfile:e=>Yt.get(`/${e}/profile`),getUserReviews:e=>Yt.get(`/${e}/reviews`),sendVerificationEmail:e=>Yt.post("/email/verify",{purpose:e}),verifyEmail:e=>Yt.get(`/email/verify/${e}`),sendPreRegistrationVerificationEmail:e=>Yt.post("/email/verify/pre-registration",{email:e}),checkPreRegistrationVerification:e=>Yt.get("/email/verify/pre-registration/check",{params:{email:e}})},go=se.create({baseURL:"http://localhost:8080/api/pets",headers:{"Content-Type":"application/json"}});go.interceptors.request.use(e=>{const t=Dl();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const si={getMyPets:()=>go.get(""),getPet:e=>go.get(`/${e}`),createPet:e=>go.post("",e),updatePet:(e,t)=>go.put(`/${e}`,t),deletePet:e=>go.delete(`/${e}`),restorePet:e=>go.post(`/${e}/restore`)},BI="http://localhost:8080/api/uploads",Fj=se.create({baseURL:BI});Fj.interceptors.request.use(e=>{const t=localStorage.getItem("accessToken")||localStorage.getItem("token");return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const Xa={uploadImage:async(e,t={})=>{const r=new FormData;r.append("file",e);const n={},{category:o,ownerType:a,ownerId:s,entityId:c}=t;return o&&(n.category=o),a&&(n.ownerType=a),s!=null&&(n.ownerId=s),c!=null&&(n.entityId=c),(await Fj.post("/images",r,{headers:{"Content-Type":"multipart/form-data"},params:n})).data}},FI="http://localhost:8080/api/meetups",UI=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),qI=se.create({baseURL:FI,headers:{"Content-Type":"application/json"}});qI.interceptors.request.use(e=>{const t=UI();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const fr=e=>Promise.resolve({data:e}),rr={getHomeMeetups:(e,t,r=6)=>fr(Ki.slice(0,r)),getRecruitingMeetups:(e=6)=>fr(Ki.slice(0,e)),getNearbyMeetups:(e,t,r=5)=>fr(Ki),getMeetupById:e=>{{const t=Ki.find(r=>r.idx===Number(e));return fr(t||Ki[0])}},getParticipants:e=>fr([{idx:1,nickname:"데모유저"}]),createMeetup:e=>fr({idx:99,...e}),updateMeetup:(e,t)=>fr({idx:e,...t}),deleteMeetup:e=>fr({}),joinMeetup:e=>fr({}),cancelParticipation:e=>fr({}),checkParticipation:e=>fr({isParticipating:!1,liked:!1}),updateHistoryLike:(e,t)=>fr({history:{meetupIdx:e,liked:t}})},WI=h.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({padding:e})=>e||"48px 24px"};
  text-align: center;
  gap: 12px;
`,HI=h.div`
  font-size: ${({iconSize:e})=>e||"48px"};
  line-height: 1;
`,VI=h.p`
  font-size: 15px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,KI=h.p`
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textLight};
  margin: 0;
  line-height: 1.5;
`;function Oa({icon:e,title:t,description:r,padding:n,iconSize:o,children:a}){return i.jsxs(WI,{padding:n,children:[e&&i.jsx(HI,{iconSize:o,children:e}),t&&i.jsx(VI,{children:t}),r&&i.jsx(KI,{children:r}),a]})}const Wm=({isOpen:e,userId:t,onClose:r,onUpdated:n})=>{const{user:o}=dt(),[a,s]=p.useState(null),[c,l]=p.useState(!1),[u,d]=p.useState(""),[f,m]=p.useState(!1),[g,x]=p.useState({nickname:"",email:"",phone:"",location:"",regionSigungu:""}),[v,b]=p.useState(!1),[E,w]=p.useState([]),[j,S]=p.useState(!1),[y,k]=p.useState(!1),[$,C]=p.useState(null),[P,z]=p.useState({petName:"",petType:"DOG",customPetType:"",breed:"",gender:"UNKNOWN",age:"",color:"",weight:"",birthDate:"",isNeutered:!1,healthInfo:"",specialNotes:"",profileImageUrl:""}),[_,N]=p.useState(!1),[R,F]=p.useState(""),O=o&&(o.idx===t||o.id===t);p.useEffect(()=>{e&&t?(D(),O&&A()):(s(null),d(""),m(!1),w([]))},[e,t,O]);const D=async()=>{try{if(l(!0),d(""),O){const L=await yr.getMyProfile();s(L.data),x({nickname:L.data.user?.nickname||"",email:L.data.user?.email||"",phone:L.data.user?.phone||"",location:L.data.user?.location||"",regionSigungu:L.data.user?.regionSigungu||""})}else{const L=await yr.getUserProfile(t);s(L.data)}}catch(L){const G=L.response?.data?.error||L.message||"프로필을 불러오는데 실패했습니다.";d(G)}finally{l(!1)}},A=async()=>{try{S(!0);const L=await si.getMyPets();w(L.data||[])}catch(L){console.error("펫 목록 조회 실패:",L)}finally{S(!1)}},M=async()=>{try{b(!0);const L=await yr.updateMyProfile(g);await D(),m(!1),n&&n(L)}catch(L){alert(L.response?.data?.error||"프로필 수정에 실패했습니다.")}finally{b(!1)}},I=L=>{const{name:G,value:K,type:ee,checked:ne}=L.target;z(we=>({...we,[G]:ee==="checkbox"?ne:K}))},T=async L=>{const G=L.target.files?.[0];if(G){F(""),N(!0);try{const K=await Xa.uploadImage(G,{category:"pets",ownerType:"user",ownerId:o?.idx,entityId:$?.idx});z(ee=>({...ee,profileImageUrl:K.url}))}catch(K){F(K.response?.data?.error||K.message||"이미지 업로드 중 문제가 발생했습니다.")}finally{N(!1),L.target&&(L.target.value="")}}},B=async L=>{L.preventDefault();try{const G={...P,weight:P.weight?parseFloat(P.weight):null,birthDate:P.birthDate||null,profileImageUrl:P.profileImageUrl||null};$?await si.updatePet($.idx,G):await si.createPet(G),k(!1),C(null),z({petName:"",petType:"DOG",customPetType:"",breed:"",gender:"UNKNOWN",age:"",color:"",weight:"",birthDate:"",isNeutered:!1,healthInfo:"",specialNotes:"",profileImageUrl:""}),A()}catch(G){alert(G.response?.data?.error||"펫 정보 저장에 실패했습니다.")}},X=L=>{C(L);const G=L.birthDate?L.birthDate.split("T")[0]:"";z({petName:L.petName||"",petType:L.petType||"DOG",customPetType:L.customPetType||"",breed:L.breed||"",gender:L.gender||"UNKNOWN",age:L.age||"",color:L.color||"",weight:L.weight||"",birthDate:G,isNeutered:L.isNeutered||!1,healthInfo:L.healthInfo||"",specialNotes:L.specialNotes||"",profileImageUrl:L.profileImageUrl||""}),k(!0)},ie=async L=>{if(window.confirm("정말 이 펫 정보를 삭제하시겠습니까?"))try{await si.deletePet(L),A()}catch(G){alert(G.response?.data?.error||"펫 정보 삭제에 실패했습니다.")}},Z={DOG:"강아지",CAT:"고양이",BIRD:"새",RABBIT:"토끼",HAMSTER:"햄스터",ETC:"기타"},q={M:"수컷",F:"암컷",UNKNOWN:"미확인"},W=async L=>{if(!L?.meetupIdx)return;const G=!L.liked;try{await rr.updateHistoryLike(L.meetupIdx,G),s(K=>{if(!K?.meetupHistories)return K;const ee=K.meetupHistories.map(ne=>ne.meetupIdx===L.meetupIdx?{...ne,liked:G}:ne);return{...K,meetupHistories:ee,meetupLikedCount:ee.filter(ne=>ne.liked).length}})}catch(K){alert(K.response?.data?.error||"모임 좋아요 변경에 실패했습니다.")}};if(!e)return null;const J=L=>{L.target===L.currentTarget&&r()};return i.jsx(GI,{onClick:J,children:i.jsxs(YI,{onClick:L=>L.stopPropagation(),children:[i.jsxs(XI,{children:[i.jsx(ZI,{children:O?"내 프로필":"프로필"}),i.jsx(JI,{onClick:r,children:"✕"})]}),i.jsx(QI,{children:c?i.jsx(Xx,{children:"프로필을 불러오는 중..."}):u?i.jsx(eD,{children:u}):a?i.jsxs(i.Fragment,{children:[i.jsxs(tD,{children:[i.jsx(rD,{children:a.user?.username?a.user.username.charAt(0).toUpperCase():"U"}),f?i.jsxs(uD,{children:[i.jsxs(jt,{children:[i.jsx(kt,{children:"닉네임"}),i.jsx(Pr,{type:"text",value:g.nickname,onChange:L=>x(G=>({...G,nickname:L.target.value}))})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"이메일"}),i.jsx(Pr,{type:"email",value:g.email,onChange:L=>x(G=>({...G,email:L.target.value}))})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"전화번호"}),i.jsx(Pr,{type:"tel",value:g.phone,onChange:L=>x(G=>({...G,phone:L.target.value})),placeholder:"010-1234-5678"})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"위치"}),i.jsx(Pr,{type:"text",value:g.location,onChange:L=>x(G=>({...G,location:L.target.value})),placeholder:"예: 서울시 강남구"})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"자치구 (서울 반려동물 소식 알림)"}),i.jsxs(Md,{value:g.regionSigungu,onChange:L=>x(G=>({...G,regionSigungu:L.target.value})),children:[i.jsx("option",{value:"",children:"받지 않음"}),LI.map(L=>i.jsx("option",{value:L,children:L},L))]}),i.jsx(hD,{children:"고르면 서울시가 올리는 반려동물 행사·교육·안전 소식을 알림으로 받는다. 현재는 서울만 지원한다."})]}),i.jsxs(Qx,{children:[i.jsx(tv,{onClick:()=>m(!1),children:"취소"}),i.jsx(ev,{onClick:M,disabled:v,children:v?"저장 중...":"저장"})]})]}):i.jsxs(i.Fragment,{children:[i.jsx(nD,{children:a.user?.nickname||a.user?.username||"알 수 없음"}),a.user?.email&&i.jsx(oD,{children:a.user.email}),a.user?.phone&&i.jsxs(iD,{children:["📞 ",a.user.phone]}),a.user?.location&&i.jsxs(aD,{children:[i.jsx(sD,{children:"📍"}),a.user.location]}),a.user?.petCoinBalance!==void 0&&i.jsxs(cD,{children:[i.jsx(lD,{children:"💰"}),a.user.petCoinBalance?.toLocaleString()||0," 코인"]}),a.user?.role&&i.jsx(dD,{children:a.user.role==="SERVICE_PROVIDER"?"서비스 제공자":"일반 사용자"}),O&&i.jsx(Zx,{onClick:()=>m(!0),children:"프로필 수정"})]})]}),O&&i.jsxs(fD,{children:[i.jsxs(pD,{children:[i.jsx(mD,{children:"반려동물 정보"}),!y&&i.jsx(gD,{onClick:()=>k(!0),children:"+ 펫 추가"})]}),y&&i.jsxs(xD,{onSubmit:B,children:[i.jsxs(jt,{children:[i.jsx(kt,{children:"이름 *"}),i.jsx(Pr,{type:"text",name:"petName",value:P.petName,onChange:I,required:!0})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"종류 *"}),i.jsx(Md,{name:"petType",value:P.petType,onChange:I,required:!0,children:Object.entries(Z).map(([L,G])=>i.jsx("option",{value:L,children:G},L))}),P.petType==="ETC"&&i.jsx(Pr,{type:"text",name:"customPetType",value:P.customPetType,onChange:I,placeholder:"어떤 펫인지 입력해주세요",style:{marginTop:"0.5rem"},required:!0})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"품종"}),i.jsx(Pr,{type:"text",name:"breed",value:P.breed,onChange:I,placeholder:"예: 골든 리트리버"})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"성별"}),i.jsx(Md,{name:"gender",value:P.gender,onChange:I,children:Object.entries(q).map(([L,G])=>i.jsx("option",{value:L,children:G},L))})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"나이"}),i.jsx(Pr,{type:"text",name:"age",value:P.age,onChange:I,placeholder:"예: 3살"})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"체중 (kg)"}),i.jsx(Pr,{type:"number",step:"0.1",name:"weight",value:P.weight,onChange:I,placeholder:"예: 5.5"})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"색상"}),i.jsx(Pr,{type:"text",name:"color",value:P.color,onChange:I,placeholder:"예: 갈색"})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"생년월일"}),i.jsx(Pr,{type:"date",name:"birthDate",value:P.birthDate,onChange:I})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"펫 프로필 이미지"}),i.jsx(bD,{id:"pet-image-upload",type:"file",accept:"image/*",onChange:T}),i.jsx(wD,{htmlFor:"pet-image-upload",$disabled:_,children:_?"업로드 중...":"이미지 선택"}),R&&i.jsx($D,{children:R}),P.profileImageUrl&&i.jsxs(SD,{children:[i.jsx(jD,{src:P.profileImageUrl,alt:"펫 프로필 이미지"}),i.jsx(kD,{type:"button",onClick:()=>z(L=>({...L,profileImageUrl:""})),children:"이미지 삭제"})]})]}),i.jsx(jt,{children:i.jsxs(vD,{children:[i.jsx(yD,{type:"checkbox",name:"isNeutered",checked:P.isNeutered,onChange:I}),i.jsx(kt,{children:"중성화 여부"})]})}),i.jsxs(jt,{children:[i.jsx(kt,{children:"건강 정보"}),i.jsx(Jx,{name:"healthInfo",value:P.healthInfo,onChange:I,placeholder:"알레르기, 특별한 건강 상태 등을 입력하세요",rows:3})]}),i.jsxs(jt,{children:[i.jsx(kt,{children:"특이사항"}),i.jsx(Jx,{name:"specialNotes",value:P.specialNotes,onChange:I,placeholder:"특별한 주의사항이나 특징을 입력하세요",rows:3})]}),i.jsxs(Qx,{children:[i.jsx(tv,{type:"button",onClick:()=>{k(!1),C(null),z({petName:"",petType:"DOG",customPetType:"",breed:"",gender:"UNKNOWN",age:"",color:"",weight:"",birthDate:"",isNeutered:!1,healthInfo:"",specialNotes:"",profileImageUrl:""})},children:"취소"}),i.jsx(ev,{type:"submit",children:$?"수정":"등록"})]})]}),j?i.jsx(Xx,{children:"펫 목록을 불러오는 중..."}):E.length===0?i.jsx(Oa,{icon:"🐾",title:"등록된 펫이 없어요",description:'"펫 추가" 버튼으로 우리 아이를 등록해주세요'}):i.jsx(ED,{children:E.map(L=>i.jsxs(CD,{children:[L.profileImageUrl&&i.jsx(PD,{src:L.profileImageUrl,alt:L.petName||"펫 이미지"}),i.jsxs(AD,{children:[i.jsx(OD,{children:L.petName||"이름 없음"}),i.jsx(RD,{children:L.petType==="ETC"&&L.customPetType?L.customPetType:Z[L.petType]||L.petType})]}),i.jsxs(TD,{children:[L.breed&&i.jsxs(hn,{children:["품종: ",L.breed]}),L.gender&&i.jsxs(hn,{children:["성별: ",q[L.gender]]}),L.age&&i.jsxs(hn,{children:["나이: ",L.age]}),L.color&&i.jsxs(hn,{children:["색상: ",L.color]}),L.weight&&i.jsxs(hn,{children:["체중: ",L.weight,"kg"]}),L.birthDate&&i.jsxs(hn,{children:["생년월일: ",new Date(L.birthDate).toLocaleDateString("ko-KR")]}),L.isNeutered&&i.jsx(hn,{children:"중성화 완료"}),L.healthInfo&&i.jsxs(hn,{children:["건강 정보: ",L.healthInfo]}),L.specialNotes&&i.jsxs(hn,{children:["특이사항: ",L.specialNotes]})]}),i.jsxs(ID,{children:[i.jsx(Zx,{onClick:()=>X(L),children:"수정"}),i.jsx(DD,{onClick:()=>ie(L.idx),children:"삭제"})]})]},L.idx))})]}),a.reviewCount>0&&i.jsxs(zd,{children:[i.jsx(Nd,{children:a.careReviewMode==="WRITTEN"?"내가 남긴 펫케어 리뷰":"받은 펫케어 리뷰"}),i.jsxs(Bd,{children:[i.jsxs(Yo,{children:[i.jsx(Xo,{children:a.careReviewMode==="WRITTEN"?"평균 남긴 평점":"평균 받은 평점"}),i.jsxs(Zo,{children:[a.averageRating?a.averageRating.toFixed(1):"-",a.averageRating&&i.jsx(rv,{children:"⭐"})]})]}),i.jsxs(Yo,{children:[i.jsx(Xo,{children:a.careReviewMode==="WRITTEN"?"작성 리뷰 개수":"받은 리뷰 개수"}),i.jsxs(Zo,{children:[a.reviewCount||0,"개"]})]})]})]}),a.reviews&&a.reviews.length>0&&i.jsxs(Fd,{children:[i.jsx(Ud,{children:a.careReviewMode==="WRITTEN"?"내가 남긴 펫케어 리뷰":"받은 펫케어 리뷰"}),i.jsx(qd,{children:a.reviews.map(L=>i.jsxs(Wd,{children:[i.jsxs(Hd,{children:[i.jsx(Vd,{children:a.careReviewMode==="WRITTEN"?L.revieweeName||"알 수 없음":L.reviewerName||"알 수 없음"}),i.jsxs(nv,{children:["⭐".repeat(L.rating),i.jsx(ov,{children:L.rating})]})]}),L.comment&&i.jsx(Kd,{children:L.comment}),i.jsx(Gd,{children:L.createdAt?new Date(L.createdAt).toLocaleDateString("ko-KR"):""})]},L.idx))})]}),a.reviewCount===0&&i.jsx(Oa,{icon:"⭐",title:"아직 펫케어 리뷰가 없어요",padding:"32px 24px",iconSize:"36px"}),a.locationServiceReviewCount>0&&i.jsxs(zd,{children:[i.jsx(Nd,{children:"주변 서비스 리뷰 활동"}),i.jsxs(Bd,{children:[i.jsxs(Yo,{children:[i.jsx(Xo,{children:"평균 남긴 평점"}),i.jsxs(Zo,{children:[a.locationServiceAverageRating?a.locationServiceAverageRating.toFixed(1):"-",a.locationServiceAverageRating&&i.jsx(rv,{children:"⭐"})]})]}),i.jsxs(Yo,{children:[i.jsx(Xo,{children:"작성 리뷰 개수"}),i.jsxs(Zo,{children:[a.locationServiceReviewCount||0,"개"]})]})]})]}),a.locationServiceReviews&&a.locationServiceReviews.length>0&&i.jsxs(Fd,{children:[i.jsx(Ud,{children:"작성한 주변 서비스 리뷰"}),i.jsx(qd,{children:a.locationServiceReviews.map(L=>i.jsxs(Wd,{children:[i.jsxs(Hd,{children:[i.jsx(Vd,{children:L.serviceName||`서비스 #${L.serviceIdx}`}),i.jsxs(nv,{children:["⭐".repeat(L.rating),i.jsx(ov,{children:L.rating})]})]}),L.comment&&i.jsx(Kd,{children:L.comment}),i.jsx(Gd,{children:L.createdAt?new Date(L.createdAt).toLocaleDateString("ko-KR"):""})]},`location-review-${L.idx}`))})]}),a.meetupHistoryCount>0&&i.jsxs(zd,{children:[i.jsx(Nd,{children:"모임 히스토리"}),i.jsxs(Bd,{children:[i.jsxs(Yo,{children:[i.jsx(Xo,{children:"참여/주최 기록"}),i.jsxs(Zo,{children:[a.meetupHistoryCount||0,"개"]})]}),i.jsxs(Yo,{children:[i.jsx(Xo,{children:"좋아요 기록"}),i.jsxs(Zo,{children:[a.meetupLikedCount||0,"개"]})]})]})]}),a.meetupHistories&&a.meetupHistories.length>0&&i.jsxs(Fd,{children:[i.jsx(Ud,{children:"모임 기록"}),i.jsx(qd,{children:a.meetupHistories.map(L=>i.jsxs(Wd,{children:[i.jsxs(Hd,{children:[i.jsx(Vd,{children:L.title||`모임 #${L.meetupIdx}`}),i.jsx(_D,{children:L.participationRole==="ORGANIZER"?"주최":"참가"})]}),L.location&&i.jsx(Kd,{children:L.location}),i.jsx(Gd,{children:L.date?new Date(L.date).toLocaleString("ko-KR"):""}),O&&i.jsx(LD,{type:"button",onClick:()=>W(L),$liked:L.liked,children:L.liked?"❤️ 좋아요 기록됨":"🤍 좋아요로 기록"})]},`meetup-history-${L.meetupIdx}`))})]})]}):null})]})})},GI=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: ${e=>e.theme.spacing.lg};
`,YI=h.div`
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`,XI=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing.lg};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  position: sticky;
  top: 0;
  background: ${e=>e.theme.colors.surface};
  z-index: 10;
`,ZI=h.h2`
  margin: 0;
  color: ${e=>e.theme.colors.text};
  font-size: 1.5rem;
`,JI=h.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${e=>e.theme.colors.textSecondary};
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${e=>e.theme.borderRadius.md};

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
    color: ${e=>e.theme.colors.text};
  }
`,QI=h.div`
  padding: ${e=>e.theme.spacing.lg};
`,Xx=h.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.xl};
  color: ${e=>e.theme.colors.textSecondary};
`,eD=h.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.xl};
  color: ${e=>e.theme.colors.error||"#dc2626"};
`,tD=h.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.spacing.md};
  padding-bottom: ${e=>e.theme.spacing.lg};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  margin-bottom: ${e=>e.theme.spacing.lg};
`,rD=h.div`
  width: 80px;
  height: 80px;
  border-radius: ${e=>e.theme.borderRadius.full};
  background: ${e=>e.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 600;
`,nD=h.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
`,oD=h.div`
  font-size: 0.95rem;
  color: ${e=>e.theme.colors.textSecondary};
`,iD=h.div`
  font-size: 0.95rem;
  color: ${e=>e.theme.colors.textSecondary};
`,aD=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 0.95rem;
`,sD=h.span`
  font-size: 0.9rem;
`,cD=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  color: ${e=>e.theme.colors.primary||"#FF7E36"};
  font-size: 1rem;
  font-weight: 600;
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.surfaceElevated||"#f8f9fa"};
  border-radius: ${e=>e.theme.borderRadius.md};
`,lD=h.span`
  font-size: 1rem;
`,dD=h.div`
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.primary};
  color: white;
  border-radius: ${e=>e.theme.borderRadius.full};
  font-size: 0.9rem;
  font-weight: 500;
`,Zx=h.button`
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  background: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: ${e=>e.theme.spacing.sm};

  &:hover {
    background: ${e=>e.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`,uD=h.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};
`,jt=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xs};
`,kt=h.label`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: 500;
`,Pr=h.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,Md=h.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,hD=h.p`
  margin: 0.4rem 0 0;
  font-size: 0.8rem;
  line-height: 1.4;
  color: ${e=>e.theme.colors.textSecondary};
`,Jx=h.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  font-size: 1rem;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,Qx=h.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing.sm};
  margin-top: ${e=>e.theme.spacing.md};
`,ev=h.button`
  background: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,tv=h.button`
  background: ${e=>e.theme.colors.surfaceElevated};
  color: ${e=>e.theme.colors.textSecondary};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${e=>e.theme.colors.primary};
    border-color: ${e=>e.theme.colors.primary};
  }
`,fD=h.div`
  margin-top: ${e=>e.theme.spacing.xl};
  padding-top: ${e=>e.theme.spacing.xl};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,pD=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing.lg};
`,mD=h.h3`
  margin: 0;
  color: ${e=>e.theme.colors.text};
  font-size: 1.2rem;
`,gD=h.button`
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  background: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`,xD=h.form`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};
  padding: ${e=>e.theme.spacing.lg};
  background: ${e=>e.theme.colors.surfaceElevated};
  border-radius: ${e=>e.theme.borderRadius.md};
  margin-bottom: ${e=>e.theme.spacing.lg};
`,vD=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
`,yD=h.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`,bD=h.input`
  display: none;
`,wD=h.label`
  display: inline-block;
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  background: ${e=>e.$disabled?e.theme.colors.border:e.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  font-weight: 600;
  cursor: ${e=>e.$disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.$disabled?.6:1};
  transition: all 0.2s ease;

  &:hover:not([disabled]) {
    background: ${e=>e.theme.colors.primaryDark};
  }
`,$D=h.div`
  color: ${e=>e.theme.colors.error||"#dc2626"};
  font-size: 0.875rem;
  margin-top: ${e=>e.theme.spacing.xs};
`,SD=h.div`
  margin-top: ${e=>e.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.sm};
`,jD=h.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: ${e=>e.theme.borderRadius.md};
  object-fit: cover;
`,kD=h.button`
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  background: ${e=>e.theme.colors.error||"#dc2626"};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`,ED=h.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${e=>e.theme.spacing.md};
`,CD=h.div`
  background: ${e=>e.theme.colors.surfaceElevated};
  padding: ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.sm};
`,PD=h.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: ${e=>e.theme.borderRadius.md};
  margin-bottom: ${e=>e.theme.spacing.sm};
`,AD=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,OD=h.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
`,RD=h.span`
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  background: ${e=>e.theme.colors.primary};
  color: white;
  border-radius: ${e=>e.theme.borderRadius.full};
  font-size: 0.875rem;
`,TD=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xs};
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.textSecondary};
`,hn=h.div`
  color: ${e=>e.theme.colors.textSecondary};
`,ID=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.sm};
  margin-top: ${e=>e.theme.spacing.sm};
`,DD=h.button`
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.error||"#dc2626"};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`,zd=h.div`
  margin-bottom: ${e=>e.theme.spacing.lg};
  padding-bottom: ${e=>e.theme.spacing.lg};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,Nd=h.h3`
  margin: 0 0 ${e=>e.theme.spacing.md} 0;
  color: ${e=>e.theme.colors.text};
  font-size: 1.2rem;
`,Bd=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.xl};
`,Yo=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xs};
`,Xo=h.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 0.9rem;
`,Zo=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  color: ${e=>e.theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
`,rv=h.span`
  font-size: 1.2rem;
`,Fd=h.div`
  margin-bottom: ${e=>e.theme.spacing.lg};
`,Ud=h.h3`
  margin: 0 0 ${e=>e.theme.spacing.md} 0;
  color: ${e=>e.theme.colors.text};
  font-size: 1.2rem;
`,qd=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};
`,Wd=h.div`
  padding: ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.surfaceElevated};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
`,Hd=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing.xs};
`,Vd=h.div`
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
`,nv=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
`,_D=h.span`
  padding: 2px 8px;
  border-radius: ${e=>e.theme.borderRadius.sm};
  background: ${e=>e.theme.colors.surfaceHover};
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 0.8rem;
  font-weight: 600;
`,LD=h.button`
  margin-top: ${e=>e.theme.spacing.sm};
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.$liked?e.theme.colors.primary:e.theme.colors.border};
  background: ${e=>e.$liked?`${e.theme.colors.primary}18`:e.theme.colors.surface};
  color: ${e=>e.$liked?e.theme.colors.primary:e.theme.colors.textSecondary};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
  }
`,ov=h.span`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.textSecondary};
`,Kd=h.div`
  color: ${e=>e.theme.colors.text};
  margin-bottom: ${e=>e.theme.spacing.xs};
  line-height: 1.5;
`,Gd=h.div`
  font-size: 0.85rem;
  color: ${e=>e.theme.colors.textSecondary};
`,ks="http://localhost:8080/api",Es=()=>{const e=localStorage.getItem("accessToken")||localStorage.getItem("token");return{"Content-Type":"application/json",...e&&{Authorization:`Bearer ${e}`}}},Ra={getBalance:async()=>(await se.get(`${ks}/payment/balance`,{headers:Es()})).data,getTransactions:async(e=0,t=20)=>(await se.get(`${ks}/payment/transactions`,{params:{page:e,size:t},headers:Es()})).data,getTransactionDetail:async e=>(await se.get(`${ks}/payment/transactions/${e}`,{headers:Es()})).data,chargeCoins:async(e,t)=>(await se.post(`${ks}/payment/charge`,{amount:e,description:t},{headers:Es()})).data},MD=({onClose:e,onChargeSuccess:t})=>{const{theme:r}=Il(),[n,o]=p.useState(0),[a,s]=p.useState(!1),[c,l]=p.useState(""),[u,d]=p.useState(null),[f,m]=p.useState(""),[g,x]=p.useState(""),v=100,b=[{coins:10,label:"10코인",price:1e3},{coins:50,label:"50코인",price:5e3},{coins:100,label:"100코인",price:1e4},{coins:500,label:"500코인",price:5e4}];p.useEffect(()=>{E()},[]);const E=async()=>{try{const k=(await Ra.getBalance()).balance||0;return o(k),k}catch(y){return console.error("잔액 조회 실패:",y),m("잔액을 불러오는데 실패했습니다."),null}},w=async y=>{if(!y||y<=0){m("충전할 코인 수를 입력해주세요.");return}s(!0),m(""),x("");try{await Ra.chargeCoins(y,`코인 충전 - ${y}코인`),x(`${y}코인이 충전되었습니다!`),d(null),l("");const k=await E();k!=null&&t&&t(k),setTimeout(()=>{x("")},2e3)}catch(k){console.error("충전 실패:",k);const $=k.response?.data?.message||k.message||"충전에 실패했습니다.";m($)}finally{s(!1)}},j=y=>{d(y),l(""),m("")},S=()=>{const y=parseInt(c,10);if(isNaN(y)||y<=0){m("올바른 코인 수를 입력해주세요.");return}w(y)};return i.jsx(zD,{onClick:e,theme:r,children:i.jsxs(ND,{onClick:y=>y.stopPropagation(),theme:r,children:[i.jsxs(BD,{theme:r,children:[i.jsx(FD,{theme:r,children:"펫코인 충전"}),i.jsx(UD,{onClick:e,theme:r,children:"✕"})]}),i.jsxs(qD,{theme:r,children:[i.jsx(WD,{theme:r,children:"현재 잔액"}),i.jsxs(HD,{theme:r,children:[n.toLocaleString()," 코인"]})]}),i.jsxs(VD,{theme:r,children:[i.jsx(KD,{theme:r,children:"충전할 코인 선택"}),i.jsx(GD,{children:b.map(y=>i.jsxs(YD,{selected:u===y.coins,onClick:()=>j(y.coins),theme:r,children:[i.jsx(XD,{theme:r,children:y.label}),i.jsxs(ZD,{theme:r,children:[y.price.toLocaleString(),"원"]})]},y.coins))}),i.jsx(JD,{theme:r,children:i.jsx("span",{children:"또는"})}),i.jsxs(QD,{theme:r,children:[i.jsx(e_,{theme:r,children:"직접 입력"}),i.jsxs(t_,{children:[i.jsx(r_,{type:"number",placeholder:"코인 수 입력",value:c,onChange:y=>{l(y.target.value),d(null),m("")},min:"1",theme:r}),i.jsx(n_,{theme:r,children:"코인"}),c&&i.jsxs(o_,{theme:r,children:["= ",parseInt(c||0)*v,"원"]})]}),i.jsx(i_,{onClick:S,disabled:!c||a,theme:r,children:"충전하기"})]})]}),u&&i.jsxs(a_,{theme:r,children:[i.jsxs(s_,{theme:r,children:[b.find(y=>y.coins===u)?.label," (",b.find(y=>y.coins===u)?.price.toLocaleString(),"원)"]}),i.jsx(c_,{onClick:()=>w(u),disabled:a,theme:r,children:a?"충전 중...":"충전하기"})]}),f&&i.jsx(l_,{theme:r,children:f}),g&&i.jsx(d_,{theme:r,children:g}),i.jsxs(u_,{theme:r,children:[i.jsx(iv,{theme:r,children:"💡 1코인 = 100원"}),i.jsx(iv,{theme:r,children:"개발 환경에서는 테스트 충전이 가능합니다."})]})]})})},zD=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${e=>e.theme?.colors?.overlay||"rgba(0, 0, 0, 0.5)"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`,ND=h.div`
  background: ${e=>e.theme.colors.surface||"#ffffff"};
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`,BD=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid ${e=>e.theme.colors.border||"#e0e0e0"};
`,FD=h.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: ${e=>e.theme.colors.text||"#333"};
`,UD=h.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${e=>e.theme.colors.textSecondary||"#666"};
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover||"#f5f5f5"};
    color: ${e=>e.theme.colors.text||"#333"};
  }
`,qD=h.div`
  padding: 24px;
  background: ${e=>e.theme.colors.surfaceElevated||"#f8f9fa"};
  border-bottom: 1px solid ${e=>e.theme.colors.border||"#e0e0e0"};
`,WD=h.div`
  font-size: 14px;
  color: ${e=>e.theme.colors.textSecondary||"#666"};
  margin-bottom: 8px;
`,HD=h.div`
  font-size: 32px;
  font-weight: 700;
  color: ${e=>e.theme.colors.primary||"#FF7E36"};
`,VD=h.div`
  padding: 24px;
`,KD=h.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: ${e=>e.theme.colors.text||"#333"};
`,GD=h.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`,YD=h.div`
  padding: 20px;
  border: 2px solid ${e=>e.selected?e.theme.colors.primary||"#FF7E36":e.theme.colors.border||"#e0e0e0"};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${e=>e.selected?e.theme.colors.primaryLight||"#fff5f0":e.theme.colors.surface||"#ffffff"};
  text-align: center;

  &:hover {
    border-color: ${e=>e.theme.colors.primary||"#FF7E36"};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,XD=h.div`
  font-size: 20px;
  font-weight: 600;
  color: ${e=>e.theme.colors.text||"#333"};
  margin-bottom: 4px;
`,ZD=h.div`
  font-size: 14px;
  color: ${e=>e.theme.colors.textSecondary||"#666"};
`,JD=h.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
  color: ${e=>e.theme.colors.textSecondary||"#666"};
  font-size: 14px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${e=>e.theme.colors.border||"#e0e0e0"};
  }

  span {
    padding: 0 16px;
  }
`,QD=h.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,e_=h.label`
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.theme.colors.text||"#333"};
`,t_=h.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,r_=h.input`
  flex: 1;
  min-width: 150px;
  padding: 12px 16px;
  border: 2px solid ${e=>e.theme.colors.border||"#e0e0e0"};
  border-radius: 8px;
  font-size: 16px;
  background: ${e=>e.theme.colors.surface||"#ffffff"};
  color: ${e=>e.theme.colors.text||"#333"};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary||"#FF7E36"};
  }

  &::placeholder {
    color: ${e=>e.theme.colors.textLight||"#999"};
  }
`,n_=h.span`
  font-size: 16px;
  color: ${e=>e.theme.colors.text||"#333"};
  font-weight: 500;
`,o_=h.span`
  font-size: 14px;
  color: ${e=>e.theme.colors.primary||"#FF7E36"};
  font-weight: 600;
`,i_=h.button`
  padding: 12px 24px;
  background: ${e=>e.theme.colors.primary||"#FF7E36"};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.primaryDark||"#e66a2b"};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 126, 54, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,a_=h.div`
  padding: 24px;
  background: ${e=>e.theme.colors.surfaceElevated||"#f8f9fa"};
  border-top: 1px solid ${e=>e.theme.colors.border||"#e0e0e0"};
  display: flex;
  flex-direction: column;
  gap: 16px;
`,s_=h.div`
  font-size: 16px;
  color: ${e=>e.theme.colors.text||"#333"};
  text-align: center;
`,c_=h.button`
  padding: 16px;
  background: ${e=>e.theme.colors.primary||"#FF7E36"};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.primaryDark||"#e66a2b"};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 126, 54, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,l_=h.div`
  padding: 12px 24px;
  margin: 0 24px;
  background: ${e=>e.theme.colors.errorSoft};
  color: ${e=>e.theme.colors.errorDark};
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`,d_=h.div`
  padding: 12px 24px;
  margin: 0 24px;
  background: ${e=>e.theme.colors.successSoft};
  color: ${e=>e.theme.colors.successDark};
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`,u_=h.div`
  padding: 16px 24px;
  background: ${e=>e.theme.colors.surfaceElevated||"#f8f9fa"};
  border-top: 1px solid ${e=>e.theme.colors.border||"#e0e0e0"};
  display: flex;
  flex-direction: column;
  gap: 8px;
`,iv=h.div`
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary||"#666"};
  text-align: center;
`,kr=({currentPage:e,totalCount:t,pageSize:r,onPageChange:n,loading:o=!1,showTotal:a=!0,showEdges:s=!1})=>{const c=Math.max(1,Math.ceil(t/r)),[l,u]=p.useState(String(e+1));p.useEffect(()=>{u(String(e+1))},[e]);const d=()=>{e>0&&!o&&n(e-1)},f=()=>{e<c-1&&!o&&n(e+1)},m=()=>{e>0&&!o&&n(0)},g=()=>{e<c-1&&!o&&n(c-1)},x=w=>{const j=w.target.value.replace(/\D/g,"");u(j)},v=w=>{w.key==="Enter"&&b()},b=()=>{const w=parseInt(l,10);if(Number.isNaN(w)||w<1||w>c){u(String(e+1));return}w-1!==e&&!o&&n(w-1)},E=()=>{b()};return t<=0?null:i.jsxs(h_,{children:[a&&i.jsxs(f_,{children:["총 ",t.toLocaleString(),"건"]}),i.jsxs(p_,{children:[s&&i.jsx(Cs,{type:"button",onClick:m,disabled:e<=0||o,"aria-label":"맨 앞 페이지",children:"«"}),i.jsx(Cs,{type:"button",onClick:d,disabled:e<=0||o,"aria-label":"이전 페이지",children:"이전"}),i.jsxs(m_,{children:[i.jsx(g_,{type:"text",inputMode:"numeric",value:l,onChange:x,onKeyDown:v,onBlur:E,disabled:o,"aria-label":"페이지 번호"}),i.jsx(x_,{children:"/"}),i.jsx(v_,{children:c})]}),i.jsx(Cs,{type:"button",onClick:f,disabled:e>=c-1||o,"aria-label":"다음 페이지",children:"다음"}),s&&i.jsx(Cs,{type:"button",onClick:g,disabled:e>=c-1||o,"aria-label":"맨 뒤 페이지",children:"»"})]})]})},h_=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${e=>e.theme?.spacing?.md||"16px"};
  flex-wrap: wrap;
  font-size: ${e=>e.theme?.typography?.caption?.fontSize||"14px"};
  color: ${e=>e.theme?.colors?.textSecondary||"#64748b"};
`,f_=h.span``,p_=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme?.spacing?.sm||"8px"};
`,Cs=h.button`
  padding: 6px 12px;
  border: 1px solid ${e=>e.theme?.colors?.border||"#e2e8f0"};
  background: ${e=>e.theme?.colors?.surface||"#fff"};
  color: ${e=>e.theme?.colors?.text||"#1e293b"};
  border-radius: 6px;
  cursor: pointer;
  font-size: inherit;

  &:hover:not(:disabled) {
    background: ${e=>e.theme?.colors?.surfaceHover||"#f1f5f9"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,m_=h.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,g_=h.input`
  width: 48px;
  padding: 6px 8px;
  border: 1px solid ${e=>e.theme?.colors?.border||"#e2e8f0"};
  border-radius: 6px;
  background: ${e=>e.theme?.colors?.surface||"#fff"};
  color: ${e=>e.theme?.colors?.text||"#1e293b"};
  font-size: inherit;
  text-align: center;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme?.colors?.primary||"#3b82f6"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,x_=h.span`
  color: ${e=>e.theme?.colors?.textSecondary||"#64748b"};
`,v_=h.span`
  min-width: 24px;
  color: ${e=>e.theme?.colors?.textSecondary||"#64748b"};
`,y_={CHARGE:"충전",DEDUCT:"차감",PAYOUT:"지급",REFUND:"환불"},b_=({transactionId:e,onClose:t})=>{const{theme:r}=Il(),[n,o]=p.useState(null),[a,s]=p.useState(!0),[c,l]=p.useState("");p.useEffect(()=>(e&&u(),()=>{}),[e]);const u=async()=>{s(!0),l("");try{const x=await Ra.getTransactionDetail(e);o(x)}catch(x){console.error("거래 상세 조회 실패:",x),l("거래 상세를 불러오는데 실패했습니다.")}finally{s(!1)}},d=x=>x?new Date(x).toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}):"-",f=x=>x==="CHARGE"||x==="PAYOUT"||x==="REFUND"?r?.colors?.primary||"#FF7E36":r?.colors?.text||"#333",m=x=>x==="CHARGE"||x==="PAYOUT"||x==="REFUND"?"+":"-",g=()=>{if(!n)return null;const{transactionType:x,counterpartyUsername:v,amount:b}=n;if(!v)return null;switch(x){case"DEDUCT":return`${v}님에게 ${b?.toLocaleString()}코인 결제`;case"PAYOUT":return`${v}님으로부터 ${b?.toLocaleString()}코인 수령`;case"REFUND":return`${v}님과의 거래 취소로 ${b?.toLocaleString()}코인 환불`;default:return null}};return i.jsx(w_,{onClick:t,theme:r,children:i.jsxs($_,{onClick:x=>x.stopPropagation(),theme:r,children:[i.jsxs(S_,{theme:r,children:[i.jsx(j_,{theme:r,children:"거래 상세"}),i.jsx(k_,{onClick:t,theme:r,children:"✕"})]}),c&&i.jsx(E_,{theme:r,children:c}),a?i.jsx(C_,{theme:r,children:"불러오는 중..."}):n?i.jsxs(P_,{theme:r,children:[i.jsxs(fn,{children:[i.jsx(pn,{theme:r,children:"거래 유형"}),i.jsx(mn,{theme:r,children:y_[n.transactionType]||n.transactionType})]}),i.jsxs(fn,{children:[i.jsx(pn,{theme:r,children:"금액"}),i.jsxs(mn,{theme:r,$color:f(n.transactionType),$bold:!0,children:[m(n.transactionType),n.amount?.toLocaleString()," 코인"]})]}),n.counterpartyUsername&&i.jsxs(fn,{children:[i.jsx(pn,{theme:r,children:"거래 상대방"}),i.jsx(mn,{theme:r,children:n.counterpartyUsername})]}),g()&&i.jsxs(fn,{children:[i.jsx(pn,{theme:r,children:"거래 내용"}),i.jsx(mn,{theme:r,children:g()})]}),n.relatedTitle&&i.jsxs(fn,{children:[i.jsx(pn,{theme:r,children:"관련 서비스"}),i.jsx(mn,{theme:r,children:n.relatedTitle})]}),i.jsxs(fn,{children:[i.jsx(pn,{theme:r,children:"거래 전 잔액"}),i.jsxs(mn,{theme:r,children:[n.balanceBefore?.toLocaleString()," 코인"]})]}),i.jsxs(fn,{children:[i.jsx(pn,{theme:r,children:"거래 후 잔액"}),i.jsxs(mn,{theme:r,children:[n.balanceAfter?.toLocaleString()," 코인"]})]}),i.jsxs(fn,{children:[i.jsx(pn,{theme:r,children:"거래 일시"}),i.jsx(mn,{theme:r,children:d(n.createdAt)})]}),n.description&&i.jsxs(fn,{children:[i.jsx(pn,{theme:r,children:"설명"}),i.jsx(mn,{theme:r,children:n.description})]})]}):null]})})},w_=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${e=>e.theme?.colors?.overlay||"rgba(0, 0, 0, 0.5)"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2100;
  padding: 20px;
`,$_=h.div`
  background: ${e=>e.theme?.colors?.surface||"#ffffff"};
  border-radius: 16px;
  width: 100%;
  max-width: 440px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`,S_=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid ${e=>e.theme?.colors?.border||"#e0e0e0"};
`,j_=h.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: ${e=>e.theme?.colors?.text||"#333"};
`,k_=h.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${e=>e.theme?.colors?.textSecondary||"#666"};
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:hover {
    background: ${e=>e.theme?.colors?.surfaceHover||"#f5f5f5"};
  }
`,E_=h.div`
  padding: 12px 24px;
  margin: 0 24px;
  background: ${e=>e.theme.colors.errorSoft};
  color: ${e=>e.theme.colors.errorDark};
  border-radius: 8px;
  font-size: 14px;
`,C_=h.div`
  padding: 48px;
  text-align: center;
  color: ${e=>e.theme?.colors?.textSecondary||"#666"};
`,P_=h.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,fn=h.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,pn=h.span`
  font-size: 12px;
  color: ${e=>e.theme?.colors?.textSecondary||"#666"};
`,mn=h.span`
  font-size: 15px;
  color: ${e=>e.$color||e.theme?.colors?.text||"#333"};
  font-weight: ${e=>e.$bold?600:400};
`,A_={CHARGE:"충전",DEDUCT:"차감",PAYOUT:"지급",REFUND:"환불"},O_=({onClose:e})=>{const{theme:t}=Il(),[r,n]=p.useState([]),[o,a]=p.useState(0),[s,c]=p.useState(0),l=20,[u,d]=p.useState(!1),[f,m]=p.useState(""),[g,x]=p.useState(null);p.useEffect(()=>{v(s)},[s]);const v=async(j=0)=>{d(!0),m("");try{const S=await Ra.getTransactions(j,l);n(S.content||[]),a(S.totalElements||0)}catch(S){console.error("거래 내역 조회 실패:",S),m("거래 내역을 불러오는데 실패했습니다.")}finally{d(!1)}},b=j=>j?new Date(j).toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}):"-",E=j=>j==="CHARGE"||j==="PAYOUT"||j==="REFUND"?t?.colors?.primary||"#FF7E36":t?.colors?.textSecondary||"#666",w=j=>j==="CHARGE"||j==="PAYOUT"||j==="REFUND"?"+":"-";return i.jsxs(R_,{onClick:e,theme:t,children:[i.jsxs(T_,{onClick:j=>j.stopPropagation(),theme:t,children:[i.jsxs(I_,{theme:t,children:[i.jsx(D_,{theme:t,children:"거래 내역"}),i.jsx(__,{onClick:e,theme:t,children:"✕"})]}),f&&i.jsx(L_,{theme:t,children:f}),u?i.jsx(M_,{theme:t,children:"불러오는 중..."}):r.length===0?i.jsx(z_,{theme:t,children:"거래 내역이 없습니다."}):i.jsxs(i.Fragment,{children:[i.jsx(N_,{children:r.map(j=>i.jsxs(B_,{onClick:()=>x(j.idx),theme:t,children:[i.jsxs(F_,{children:[i.jsx(U_,{theme:t,children:A_[j.transactionType]||j.transactionType}),i.jsx(q_,{theme:t,children:j.description||"-"}),i.jsx(W_,{theme:t,children:b(j.createdAt)})]}),i.jsxs(H_,{theme:t,$type:j.transactionType,$color:E(j.transactionType),children:[w(j.transactionType),j.amount?.toLocaleString()," 코인"]})]},j.idx))}),o>0&&i.jsx(V_,{theme:t,children:i.jsx(kr,{currentPage:s,totalCount:o,pageSize:l,onPageChange:c,loading:u})})]}),i.jsx(K_,{theme:t,children:i.jsx(G_,{theme:t,children:"항목을 클릭하면 상세 정보를 확인할 수 있습니다."})})]}),g&&i.jsx(b_,{transactionId:g,onClose:()=>x(null)})]})},R_=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${e=>e.theme?.colors?.overlay||"rgba(0, 0, 0, 0.5)"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`,T_=h.div`
  background: ${e=>e.theme?.colors?.surface||"#ffffff"};
  border-radius: 16px;
  width: 100%;
  max-width: 560px;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`,I_=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid ${e=>e.theme?.colors?.border||"#e0e0e0"};
`,D_=h.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: ${e=>e.theme?.colors?.text||"#333"};
`,__=h.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${e=>e.theme?.colors?.textSecondary||"#666"};
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:hover {
    background: ${e=>e.theme?.colors?.surfaceHover||"#f5f5f5"};
  }
`,L_=h.div`
  padding: 12px 24px;
  margin: 0 24px;
  background: ${e=>e.theme.colors.errorSoft};
  color: ${e=>e.theme.colors.errorDark};
  border-radius: 8px;
  font-size: 14px;
`,M_=h.div`
  padding: 48px;
  text-align: center;
  color: ${e=>e.theme?.colors?.textSecondary||"#666"};
`,z_=h.div`
  padding: 48px;
  text-align: center;
  color: ${e=>e.theme?.colors?.textSecondary||"#666"};
`,N_=h.div`
  overflow-y: auto;
  flex: 1;
  padding: 16px;
`,B_=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid ${e=>e.theme?.colors?.border||"#eee"};
  &:hover {
    background: ${e=>e.theme?.colors?.surfaceHover||"#f8f9fa"};
  }
`,F_=h.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,U_=h.span`
  font-weight: 600;
  font-size: 15px;
  color: ${e=>e.theme?.colors?.text||"#333"};
`,q_=h.span`
  font-size: 13px;
  color: ${e=>e.theme?.colors?.textSecondary||"#666"};
`,W_=h.span`
  font-size: 12px;
  color: ${e=>e.theme?.colors?.textLight||"#999"};
`,H_=h.span`
  font-weight: 600;
  font-size: 16px;
  color: ${e=>e.$color};
`,V_=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid ${e=>e.theme?.colors?.border||"#e0e0e0"};
`,K_=h.div`
  padding: 12px 24px;
  background: ${e=>e.theme?.colors?.surfaceElevated||"#f8f9fa"};
  border-top: 1px solid ${e=>e.theme?.colors?.border||"#e0e0e0"};
`,G_=h.div`
  font-size: 12px;
  color: ${e=>e.theme?.colors?.textSecondary||"#666"};
  text-align: center;
`,Y_="http://localhost:8080/api/notifications",X_=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),ti=se.create({baseURL:Y_,headers:{"Content-Type":"application/json"}});ti.interceptors.request.use(e=>{const t=X_();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const bo={getUserNotifications:e=>ti.get("",{params:{userId:e}}),getUnreadNotifications:e=>ti.get("/unread",{params:{userId:e}}),getUnreadCount:e=>ti.get("/unread/count",{params:{userId:e}}),markAsRead:(e,t)=>ti.put(`/${e}/read`,null,{params:{userId:t}}),markAllAsRead:e=>ti.put("/read-all",null,{params:{userId:e}})},Z_=({activeTab:e,setActiveTab:t,user:r,onNavigateToBoard:n})=>{const{isDarkMode:o,toggleTheme:a}=Il(),{logout:s,updateUserProfile:c}=dt(),[l,u]=p.useState(!1),[d,f]=p.useState(!1),[m,g]=p.useState(!1),[x,v]=p.useState(!1),[b,E]=p.useState(!1),[w,j]=p.useState([]),[S,y]=p.useState(0),[k,$]=p.useState(!1),C=r&&(r.role==="ADMIN"||r.role==="MASTER"),P=p.useRef(null),z=p.useRef(null);p.useEffect(()=>{const A=M=>{P.current&&!P.current.contains(M.target)&&u(!1)};return l&&document.addEventListener("mousedown",A),()=>document.removeEventListener("mousedown",A)},[l]),p.useEffect(()=>{const A=M=>{z.current&&!z.current.contains(M.target)&&g(!1)};return m&&document.addEventListener("mousedown",A),()=>document.removeEventListener("mousedown",A)},[m]);const _=p.useCallback(async()=>{if(!r){console.warn("알림 조회 실패: user 정보가 없습니다.");return}try{$(!0);const[A,M]=await Promise.all([bo.getUserNotifications(),bo.getUnreadCount()]);j(A.data||[]),y(M.data||0)}catch(A){A.response?.status!==401&&console.error("알림 조회 실패:",{error:A,message:A.message,response:A.response?.data,status:A.response?.status,url:A.config?.url})}finally{$(!1)}},[r]);p.useEffect(()=>{m&&r&&_()},[m,r,_]);const N=p.useCallback(async()=>{if(r)try{const A=await bo.getUnreadCount();y(A.data||0)}catch(A){A.response?.status!==401&&console.error("알림 개수 조회 실패:",A)}},[r]);p.useEffect(()=>{if(!r)return;const A=localStorage.getItem("accessToken")||localStorage.getItem("token");if(!A)return;let M=null,I=null;return(()=>{M&&M.close(),M=new EventSource(`/api/notifications/stream?token=${encodeURIComponent(A)}`,{withCredentials:!0}),M.onopen=()=>{console.log("SSE 연결 성공"),I&&(clearInterval(I),I=null)},M.addEventListener("notification",B=>{try{const X=JSON.parse(B.data);console.log("새 알림 수신 (SSE):",X),j(ie=>ie.some(q=>q.idx===X.idx)?ie:[X,...ie]),y(ie=>ie+1)}catch(X){console.error("알림 파싱 실패:",X)}}),M.addEventListener("unreadCount",B=>{try{const X=parseInt(B.data,10);y(X)}catch(X){console.error("알림 개수 파싱 실패:",X)}}),M.onerror=B=>{console.error("SSE 연결 오류:",B),I||(console.log("SSE 연결 실패, 폴백 폴링 시작"),I=setInterval(()=>{N()},3e5))}})(),N(),()=>{M&&M.close(),I&&clearInterval(I)}},[r,N]);const R=async A=>{if(r)try{await bo.markAsRead(A),j(M=>M.map(I=>I.idx===A?{...I,isRead:!0}:I)),y(M=>Math.max(0,M-1))}catch(M){console.error("알림 읽음 처리 실패:",M)}},F=async()=>{if(r)try{await bo.markAllAsRead(),j(A=>A.map(M=>({...M,isRead:!0}))),y(0)}catch(A){console.error("모든 알림 읽음 처리 실패:",A)}},O=[{id:"home",label:"홈",icon:"🏠"},{id:"unified-map",label:"탐색",icon:"🗺️"},{id:"community",label:"커뮤니티",icon:"💬"},{id:"missing-pets",label:"실종 제보",icon:"🚨"},...C?[{id:"admin",label:"관리자",icon:"🔧"}]:[]],D=A=>{A.isRead||R(A.idx),g(!1),A.relatedType==="BOARD"&&A.relatedId?(t("community"),setTimeout(()=>{window.dispatchEvent(new CustomEvent("openBoardDetail",{detail:{boardId:A.relatedId}}))},100)):A.relatedType==="MISSING_PET"&&A.relatedId?(t("missing-pets"),setTimeout(()=>{window.dispatchEvent(new CustomEvent("openMissingPetDetail",{detail:{boardId:A.relatedId}}))},100)):A.relatedType==="CARE_REQUEST"&&A.relatedId?t("unified-map"):A.type==="PET_HEALTH_ALERT"&&(t("unified-map"),setTimeout(()=>{window.dispatchEvent(new CustomEvent("navigateToHealthAlert",{detail:{category:"동물병원",groupId:"medical"}}))},100))};return i.jsxs(i.Fragment,{children:[i.jsxs(J_,{children:[i.jsxs(Q_,{onClick:()=>t("home"),children:[i.jsx("span",{className:"icon",children:"🐾"}),i.jsx("span",{children:"Petory"})]}),i.jsx(e2,{children:O.map(A=>i.jsxs(t2,{$active:e===A.id,onClick:()=>t(A.id),children:[i.jsx("span",{className:"menu-icon",children:A.icon}),i.jsx("span",{children:A.label})]},A.id))}),i.jsxs(r2,{children:[r&&i.jsxs("div",{ref:z,style:{position:"relative"},children:[i.jsxs(av,{type:"button",onClick:()=>{g(A=>!A),u(!1)},children:[i.jsx("span",{children:"🔔"}),i.jsx("span",{children:"알림"}),S>0&&i.jsx(n2,{children:S})]}),m&&i.jsxs(o2,{children:[i.jsxs(h2,{children:[i.jsx(f2,{children:"알림"}),S>0&&i.jsx(p2,{onClick:F,children:"모두 읽음"})]}),i.jsx(m2,{children:k?i.jsx(cv,{children:"알림을 불러오는 중..."}):w.length===0?i.jsx(cv,{children:"알림이 없습니다"}):w.map(A=>i.jsxs(g2,{$unread:!A.isRead,onClick:()=>D(A),children:[i.jsxs(x2,{children:[i.jsx(v2,{children:A.title||"알림"}),i.jsx(y2,{children:A.content||""}),i.jsx(b2,{children:A.createdAt?new Date(A.createdAt).toLocaleString("ko-KR"):"시간 정보 없음"})]}),!A.isRead&&i.jsx(w2,{})]},A.idx))})]})]}),i.jsxs(av,{type:"button",onClick:a,children:[i.jsx("span",{children:o?"🌙":"☀️"}),i.jsx("span",{children:o?"다크모드":"라이트모드"})]}),r&&i.jsxs(i2,{ref:P,children:[i.jsxs(a2,{type:"button",onClick:()=>{u(A=>!A),g(!1)},$active:l,children:[i.jsx("span",{children:"👤"}),i.jsxs(s2,{children:[i.jsx(c2,{children:r.nickname||"내 정보"}),i.jsxs(l2,{children:["💰 ",(r.petCoinBalance??0).toLocaleString()]})]})]}),l&&i.jsxs(d2,{children:[i.jsx(Ji,{onClick:()=>{u(!1),f(!0)},children:"👤 프로필보기"}),i.jsx(Ji,{onClick:()=>{u(!1),v(!0)},children:"💰 코인충전"}),i.jsx(Ji,{onClick:()=>{u(!1),E(!0)},children:"📋 거래내역"}),i.jsx(Ji,{onClick:()=>{u(!1),t("activity")},children:"📌 내활동보기"}),i.jsx(Ji,{onClick:s,style:{borderTop:"1px solid rgba(120,113,108,0.2)",marginTop:4,paddingTop:8},children:"↩ 로그아웃"})]})]})]})]}),i.jsxs(u2,{children:[O.slice(0,4).map(A=>i.jsxs(sv,{$active:e===A.id,onClick:()=>t(A.id),children:[i.jsx("span",{children:A.icon}),i.jsx("span",{children:A.label})]},A.id)),i.jsxs(sv,{$active:!1,onClick:()=>u(A=>!A),children:[i.jsx("span",{children:"👤"}),i.jsx("span",{children:"프로필"})]})]}),r&&i.jsxs(i.Fragment,{children:[i.jsx(Wm,{isOpen:d,userId:r.idx,onClose:()=>f(!1),onUpdated:A=>{c?.(A)}}),b&&i.jsx(O_,{onClose:()=>E(!1)}),x&&i.jsx(MD,{onClose:()=>v(!1),onChargeSuccess:A=>c?.({petCoinBalance:A})})]})]})},J_=h.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 240px;
  height: 100vh;
  padding-top: env(safe-area-inset-top, 0px);
  background: ${e=>e.theme.colors.surface};
  border-right: 1px solid ${e=>e.theme.colors.border};
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: visible;

  @media (max-width: 768px) {
    display: none;
  }
`,Q_=h.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 16px 16px;
  font-size: 18px;
  font-weight: 700;
  color: ${e=>e.theme.colors.primary};
  cursor: pointer;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  flex-shrink: 0;

  .icon {
    font-size: 22px;
  }
`,e2=h.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  flex: 1;
`,t2=h.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  width: 100%;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${e=>e.theme.typography.body2.fontSize};
  background: ${e=>e.$active?e.theme.colors.primarySoft:"transparent"};
  color: ${e=>e.$active?e.theme.colors.primary:e.theme.colors.text};
  font-weight: ${e=>e.$active?"600":"400"};
  text-align: left;

  .menu-icon {
    font-size: 18px;
    flex-shrink: 0;
    width: 22px;
    text-align: center;
  }

  &:hover {
    background: ${e=>e.$active?e.theme.colors.primarySoft:e.theme.colors.surfaceHover};
  }
`,r2=h.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  flex-shrink: 0;
  border-top: 1px solid ${e=>e.theme.colors.border};
`,av=h.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  width: 100%;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  background: transparent;
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  text-align: left;

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
  }
`,n2=h.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background: ${e=>e.theme.colors.error||"#ef4444"};
  color: white;
  border-radius: ${e=>e.theme.borderRadius.full};
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  padding: 0 4px;
`,Uj=Ya`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,o2=h.div`
  position: fixed;
  top: 0;
  left: 240px;
  bottom: auto;
  right: auto;
  width: 360px;
  max-width: calc(100vw - 256px);
  max-height: 450px;
  background: ${e=>e.theme.colors.surface||"#ffffff"};
  border: 1px solid ${e=>e.theme.colors.border||"#e0e0e0"};
  border-radius: ${e=>e.theme.borderRadius?.lg||"8px"};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 200;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${Uj} 0.2s ease-out;

  @media (max-width: 768px) {
    top: auto;
    left: 8px;
    right: 8px;
    bottom: calc(60px + env(safe-area-inset-bottom, 0px) + 8px);
    width: auto;
  }
`,i2=h.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
`,a2=h.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  width: 100%;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  background: ${e=>e.$active?e.theme.colors.surfaceHover:"transparent"};
  color: ${e=>e.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
  }
`,s2=h.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
  flex: 1;
`,c2=h.div`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,l2=h.div`
  font-size: ${e=>e.theme.typography.caption.fontSize};
  color: ${e=>e.theme.colors.primary};
`,d2=h.div`
  position: fixed;
  bottom: 8px;
  left: 248px;
  top: auto;
  right: auto;
  width: 220px;
  background: ${e=>e.theme.colors.surface||"#ffffff"};
  border: 1px solid ${e=>e.theme.colors.border||"#e0e0e0"};
  border-radius: ${e=>e.theme.borderRadius?.lg||"12px"};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 200;
  overflow: hidden;
  animation: ${Uj} 0.2s ease-out;

  @media (max-width: 768px) {
    bottom: calc(60px + env(safe-area-inset-bottom, 0px) + 8px);
    left: 8px;
    right: 8px;
    width: auto;
    top: auto;
  }
`,Ji=h.button`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.sm};
  width: 100%;
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  border: none;
  background: none;
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  text-align: left;
  cursor: pointer;
  border-radius: ${e=>e.theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
    color: ${e=>e.theme.colors.primary};
  }
`,u2=h.nav`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(60px + env(safe-area-inset-bottom, 0px));
    padding-bottom: env(safe-area-inset-bottom, 0px);
    background: ${e=>e.theme.colors.surface};
    border-top: 1px solid ${e=>e.theme.colors.border};
    z-index: 100;
    align-items: stretch;
  }
`,sv=h.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  flex: 1;
  border: none;
  background: transparent;
  color: ${e=>e.$active?e.theme.colors.primary:e.theme.colors.textMuted};
  font-size: 10px;
  font-weight: ${e=>e.$active?"700":"500"};
  cursor: pointer;
  transition: color 0.2s ease;

  span:first-child {
    font-size: 20px;
    transition: transform 0.2s ${e=>e.theme.easing?.spring||"ease"};
    transform: ${e=>e.$active?"translateY(-1px) scale(1.08)":"none"};
  }

  &:hover {
    color: ${e=>e.theme.colors.primary};
  }
`,h2=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing.md};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  flex-shrink: 0;
`,f2=h.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.h4.fontSize};
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
`,p2=h.button`
  background: none;
  border: none;
  color: ${e=>e.theme.colors.primary};
  font-size: 12px;
  cursor: pointer;
  padding: ${e=>e.theme.spacing.xs};

  &:hover {
    text-decoration: underline;
  }
`,m2=h.div`
  overflow-y: auto;
  flex: 1;
`,g2=h.div`
  display: flex;
  align-items: flex-start;
  gap: ${e=>e.theme.spacing.sm};
  padding: ${e=>e.theme.spacing.md};
  border-bottom: 1px solid ${e=>e.theme.colors.borderLight};
  cursor: pointer;
  transition: background 0.2s ease;
  background: ${e=>e.$unread&&e.theme.colors.surfaceElevated||e.theme.colors.surface};

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
  }

  &:last-child {
    border-bottom: none;
  }
`,x2=h.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xs};
`,v2=h.div`
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.body1.fontSize};
`,y2=h.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  line-height: 1.5;
`,b2=h.div`
  color: ${e=>e.theme.colors.textLight};
  font-size: ${e=>e.theme.typography.caption.fontSize};
  margin-top: ${e=>e.theme.spacing.xs};
`,w2=h.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.theme.colors.primary};
  margin-top: ${e=>e.theme.spacing.xs};
  flex-shrink: 0;
`,cv=h.div`
  padding: ${e=>e.theme.spacing.xl};
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
`,$2="http://localhost:8080/api/location-services",S2=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),j2=se.create({baseURL:$2,headers:{"Content-Type":"application/json"}}),qj=e=>{const t=S2();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e};j2.interceptors.request.use(qj,e=>Promise.reject(e));const Wj=se.create({baseURL:"http://localhost:8080/api/admin/location-services",headers:{"Content-Type":"application/json"}});Wj.interceptors.request.use(qj,e=>Promise.reject(e));const Yd=e=>Promise.resolve({data:e}),_l={searchPlaces:({latitude:e,longitude:t,radius:r,sido:n,sigungu:o,eupmyeondong:a,roadName:s,category:c,keyword:l,size:u}={})=>Yd({services:_d}),recommendPlaces:({latitude:e,longitude:t,radius:r,sido:n,sigungu:o,eupmyeondong:a,roadName:s,category:c,keyword:l}={})=>Yd({services:_d}),listLocationServices:e=>Yd({services:_d}),importPublicData:e=>{const t=new FormData;return t.append("file",e),Wj.post("/import-public-data",t,{headers:{"Content-Type":"multipart/form-data"}})}},k2="http://localhost:8080/api/missing-pets",E2=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),C2=se.create({baseURL:k2,headers:{"Content-Type":"application/json"}});C2.interceptors.request.use(e=>{const t=E2();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const Ar=e=>Promise.resolve({data:e}),nn={getHomeMissing:(e,t,r=6)=>Ar(Ss.slice(0,r)),list:e=>{{const{page:t=0,size:r=20,status:n}=e||{};let o=[...Ss];n&&n!=="ALL"&&(o=o.filter(c=>c.status===n));const a=t*r,s=o.slice(a,a+r);return Ar({boards:s,totalCount:o.length,hasNext:a+s.length<o.length})}},get:e=>{{const t=Ss.find(r=>r.idx===Number(e));return Ar(t||Ss[0])}},create:e=>Ar({idx:99,...e}),update:(e,t)=>Ar({idx:e,...t}),updateStatus:(e,t)=>Ar({}),delete:e=>Ar({}),getComments:(e,t=0,r=20)=>Ar({comments:[],totalCount:0}),addComment:(e,t)=>Ar({idx:1,...t}),deleteComment:(e,t)=>Ar({}),startChat:(e,t)=>Ar({idx:1})},P2="http://localhost:8080/api/boards",A2=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),O2=se.create({baseURL:P2,headers:{"Content-Type":"application/json"}});O2.interceptors.request.use(e=>{const t=A2();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const Gr=e=>Promise.resolve({data:e}),nr={getAllBoards:(e={})=>{{const{page:t=0,size:r=20,category:n}=e;let o=[...mo];n&&(o=o.filter(c=>c.category===n));const a=t*r,s=o.slice(a,a+r);return Gr({boards:s,totalCount:o.length,hasNext:a+s.length<o.length})}},getBoard:(e,t)=>{{const r=mo.find(n=>n.idx===Number(e));return Gr(r||mo[0])}},getPopularBoards:(e="WEEKLY")=>Gr(II),createBoard:e=>Gr({idx:99,...e}),updateBoard:(e,t)=>Gr({idx:e,...t}),deleteBoard:e=>Gr({}),getMyBoards:e=>Gr({boards:mo.filter(t=>t.userId===1),totalCount:2}),searchBoards:(e,t="TITLE_CONTENT",r=0,n=20)=>{{const o=e?mo.filter(c=>c.title&&c.title.includes(e)||c.content&&c.content.includes(e)):mo,a=r*n,s=o.slice(a,a+n);return Gr({boards:s,totalCount:o.length,hasNext:a+s.length<o.length})}},reactToBoard:(e,t)=>Gr({}),reactToComment:(e,t,r)=>Gr({})},lv={},dv=lv?.VITE_NAVER_MAPS_KEY_ID||lv?.VITE_NAVER_MAPS_CLIENT_ID||"",R2={lat:37.5665,lng:126.978},T2=e=>{const t=e?e.length>6?e.slice(0,6)+"…":e:"";return{content:`<div style="display:flex;flex-direction:column;align-items:center;"><svg width="20" height="28" viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.3));"><path fill="#14b8a6" d="M12 0C5.37 0 0 5.37 0 12c0 7 12 22 12 22s12-15 12-22C24 5.37 18.63 0 12 0Z"/><circle cx="12" cy="12" r="4.5" fill="#fff"/></svg>${t?`<div style="background:rgba(255,255,255,0.95);padding:1px 5px;border-radius:4px;font-size:10px;font-weight:600;white-space:nowrap;box-shadow:0 1px 2px rgba(0,0,0,0.2);color:#2d3b39;margin-top:1px;line-height:1.3;">${t}</div>`:""}</div>`,anchor:new window.naver.maps.Point(10,28)}},I2=({coords:e,services:t=[]})=>{const r=p.useRef(null),n=p.useRef(null),o=p.useRef(null),a=p.useRef([]),s=p.useRef(e),c=p.useRef(t),[l,u]=p.useState(!1);s.current=e,c.current=t;const d=()=>{const f=n.current;if(!f||!window.naver?.maps)return;a.current.forEach(x=>x.setMap(null)),a.current=[];const m=(c.current||[]).filter(x=>x&&x.latitude!=null&&x.longitude!=null);m.forEach(x=>{const v=new window.naver.maps.Marker({position:new window.naver.maps.LatLng(x.latitude,x.longitude),map:f,icon:T2(x.name)});a.current.push(v)});const g=s.current;if(g&&m.length){const x=new window.naver.maps.LatLng(g.lat,g.lng),v=new window.naver.maps.LatLngBounds(x,x);m.forEach(b=>v.extend(new window.naver.maps.LatLng(b.latitude,b.longitude))),f.fitBounds(v),f.getZoom()>16&&f.setZoom(16)}};return p.useEffect(()=>{let f=!1;const m=s.current||R2,g=()=>{if(f||!r.current||n.current||!window.naver?.maps)return;const b=new window.naver.maps.LatLng(m.lat,m.lng);n.current=new window.naver.maps.Map(r.current,{center:b,zoom:15,draggable:!1,pinchZoom:!1,scrollWheel:!1,keyboardShortcuts:!1,disableDoubleClickZoom:!0,disableDoubleTapZoom:!0,zoomControl:!1,logoControl:!1,mapDataControl:!1,scaleControl:!1}),o.current=new window.naver.maps.Marker({position:b,map:n.current}),d()};if(window.naver?.maps)return g(),()=>{f=!0};if(document.querySelector('script[src*="map.naver.com"]')){const b=setInterval(()=>{window.naver?.maps&&(clearInterval(b),g())},100);return()=>{f=!0,clearInterval(b)}}if(!dv)return u(!0),()=>{f=!0};const v=document.createElement("script");return v.src=`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${dv}`,v.async=!0,v.onload=g,v.onerror=()=>{f||u(!0)},document.head.appendChild(v),()=>{f=!0}},[]),p.useEffect(()=>{if(!n.current||!e||!window.naver?.maps)return;const f=new window.naver.maps.LatLng(e.lat,e.lng);o.current?o.current.setPosition(f):o.current=new window.naver.maps.Marker({position:f,map:n.current}),c.current?.length?d():n.current.setCenter(f)},[e]),p.useEffect(()=>{d()},[t]),l?null:i.jsx(D2,{ref:r})},D2=h.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`,uv=[{icon:"☀️",text:"산책하기 좋은 날이에요. 우리 아이와 나가볼까요?"},{icon:"💧",text:"물그릇, 신선한 물로 갈아주는 거 잊지 마세요."},{icon:"🦴",text:"오늘도 간식은 적당히! 건강한 하루 되세요."},{icon:"🐾",text:"발바닥 패드 상태도 가끔 확인해 주세요."},{icon:"🧸",text:"짧은 놀이 시간이 아이의 스트레스를 줄여줘요."}],_2=({setActiveTab:e})=>{const{user:t}=dt(),r=t&&(t.role==="ADMIN"||t.role==="MASTER"),n=t?.nickname||"사용자",o=uv[new Date().getDate()%uv.length],[a,s]=p.useState({missing:{items:[],loading:!0,error:!1},service:{items:[],loading:!0,error:!1},meetup:{items:[],loading:!0,error:!1},community:{items:[],loading:!0,error:!1}}),[c,l]=p.useState({coords:null,ready:!1});p.useEffect(()=>{if(!navigator.geolocation){l({coords:null,ready:!0});return}navigator.geolocation.getCurrentPosition(g=>l({coords:{lat:g.coords.latitude,lng:g.coords.longitude},ready:!0}),()=>l({coords:null,ready:!0}),{timeout:5e3,maximumAge:6e4})},[]),p.useEffect(()=>{if(!c.ready)return;const g=w=>Array.isArray(w)?w:[],x=(w,j)=>s(S=>({...S,[w]:{items:j.slice(0,4),loading:!1,error:!1}})),v=w=>s(j=>({...j,[w]:{items:[],loading:!1,error:!0}})),{coords:b}=c;nn.getHomeMissing(b?.lat??null,b?.lng??null,6).then(w=>x("missing",g(w.data?.boards??w.data))).catch(()=>v("missing"));const E={sort:"score",size:6};b&&(E.latitude=b.lat,E.longitude=b.lng,E.radius=1e4),_l.searchPlaces(E).then(w=>x("service",g(w.data?.services??w.data?.results??w.data))).catch(()=>v("service")),rr.getHomeMeetups(b?.lat??null,b?.lng??null,6).then(w=>x("meetup",g(w.data?.meetups??w.data?.content??w.data))).catch(()=>v("meetup")),nr.getPopularBoards("WEEKLY").then(w=>x("community",g(w.data?.boards??w.data?.content??w.data))).catch(()=>v("community"))},[c]);const u=a.missing,d=a.community,f=a.meetup.items.length,m=(g,x,v)=>g.loading?[1,2,3].map(b=>i.jsx(Q2,{},b)):g.items.length===0?i.jsx(J2,{children:v}):g.items.slice(0,3).map(x);return i.jsx(L2,{children:i.jsxs(M2,{children:[i.jsxs(z2,{children:[i.jsxs(N2,{children:["안녕하세요, ",i.jsx("strong",{children:n}),"님 👋",i.jsx(B2,{children:"오늘도 반려동물과 함께하는 하루 되세요"})]}),i.jsxs(F2,{children:[i.jsx(U2,{children:"🔔"}),i.jsx(q2,{children:n.charAt(0)})]})]}),i.jsxs(W2,{children:[i.jsxs(H2,{onClick:()=>e("unified-map"),children:[i.jsx(I2,{coords:c.coords,services:a.service.items}),i.jsx(V2,{children:"📍 내 주변"}),i.jsx(K2,{children:"주변 서비스 보기 →"})]}),i.jsxs(G2,{children:[i.jsx(Xd,{children:"오늘의 케어 팁"}),i.jsxs(Y2,{children:[i.jsx("span",{children:o.icon}),o.text]})]}),i.jsxs(hv,{children:[i.jsx(Xd,{children:"펫코인"}),i.jsxs(fv,{children:[(t?.petCoinBalance??0).toLocaleString(),i.jsx("small",{children:" C"})]})]}),i.jsxs(hv,{onClick:()=>e("unified-map"),children:[i.jsx(Xd,{children:"모임"}),i.jsxs(fv,{children:[f,i.jsx("small",{children:" 개"})]}),i.jsx(X2,{children:"내 주변 모집 중"})]}),i.jsxs(pv,{children:[i.jsxs(mv,{children:[i.jsxs(gv,{children:[i.jsx(xv,{$c:"#EF4444"}),"실종신고"]}),i.jsx(vv,{onClick:()=>e("missing-pets"),children:"전체 →"})]}),m(u,(g,x)=>i.jsxs(yv,{onClick:()=>e("missing-pets"),children:[i.jsxs(bv,{children:[i.jsx(wv,{children:g.petName||g.title||"이름 없음"}),i.jsx(Z2,{children:[g.breed,g.region].filter(Boolean).join(" · ")||"실종 신고"})]}),i.jsx($v,{children:g.lostDate||""})]},x),"주변 실종 신고가 없어요")]}),i.jsxs(pv,{children:[i.jsxs(mv,{children:[i.jsxs(gv,{children:[i.jsx(xv,{$c:"#8B5CF6"}),"인기 커뮤니티"]}),i.jsx(vv,{onClick:()=>e("community"),children:"전체 →"})]}),m(d,(g,x)=>i.jsxs(yv,{onClick:()=>e("community"),children:[i.jsx(bv,{children:i.jsx(wv,{children:g.boardTitle||g.title||"제목 없음"})}),i.jsxs($v,{children:["❤ ",g.likeCount??0]})]},x),"인기 글이 아직 없어요")]})]}),r&&i.jsxs(eL,{children:[i.jsx(tL,{children:"🔧 관리자 기능"}),i.jsxs(rL,{children:[i.jsxs(Sv,{onClick:()=>e("admin"),children:[i.jsx(jv,{children:"📥"}),i.jsx(kv,{children:"초기 데이터 로딩"})]}),i.jsxs(Sv,{onClick:()=>e("users"),children:[i.jsx(jv,{children:"👥"}),i.jsx(kv,{children:"사용자 관리"})]})]})]})]})})},L2=h.div`
  min-height: 100vh;
  background: ${e=>e.theme.colors.background};
`,M2=h.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 24px 22px 40px;

  @media (max-width: 600px) {
    padding: 20px 16px 28px;
  }
`,z2=h.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
`,N2=h.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${e=>e.theme.colors.text};
  line-height: 1.3;

  strong { color: ${e=>e.theme.colors.primary}; font-weight: 800; }
`,B2=h.div`
  font-size: 13px;
  font-weight: 400;
  color: ${e=>e.theme.colors.textSecondary};
  margin-top: 5px;
`,F2=h.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`,U2=h.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
`,q2=h.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${e=>e.theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
`,W2=h.div`
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 130px;
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 132px;
  }
`,Ll=h.div`
  background: ${e=>e.theme.colors.surfaceElevated};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 18px;
  padding: 16px 17px;
  overflow: hidden;
`,Xd=h.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: 9px;
`,H2=h(Ll)`
  position: relative;
  padding: 0;
  min-height: 210px;
  cursor: pointer;
  background: linear-gradient(135deg, #dfe7e6, #eef1ec);
  transition: transform 200ms ${e=>e.theme.easing?.spring||"ease"}, box-shadow 200ms ease;

  &:hover { transform: translateY(-2px); box-shadow: ${e=>e.theme.shadows.md}; }

  @media (min-width: 600px) { grid-column: span 2; grid-row: span 2; min-height: 0; }
`,V2=h.div`
  position: absolute;
  top: 15px;
  left: 16px;
  font-size: 12px;
  font-weight: 800;
  color: #2d3b39;
  background: #ffffffd9;
  padding: 6px 11px;
  border-radius: 999px;
`,K2=h.div`
  position: absolute;
  bottom: 15px;
  left: 16px;
  font-size: 12.5px;
  font-weight: 700;
  color: #2d3b39;
  background: #ffffffd9;
  padding: 7px 13px;
  border-radius: 999px;
`,G2=h(Ll)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${e=>e.theme.colors.primarySoft};
  border-color: transparent;

  @media (min-width: 600px) { grid-column: span 2; }
`,Y2=h.div`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: ${e=>e.theme.colors.primaryDark};

  span { font-size: 19px; line-height: 1.2; flex-shrink: 0; }
`,hv=h(Ll).attrs(e=>({as:e.onClick?"button":"div"}))`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  font-family: inherit;
  cursor: ${e=>e.onClick?"pointer":"default"};
  transition: border-color 200ms ease, transform 200ms ease;

  ${e=>e.onClick&&`&:hover { border-color: ${e.theme.colors.primaryLight}; transform: translateY(-2px); }`}
`,fv=h.div`
  font-size: 27px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${e=>e.theme.colors.text};
  font-variant-numeric: tabular-nums;
  line-height: 1.1;

  small { font-size: 14px; font-weight: 700; color: ${e=>e.theme.colors.textSecondary}; }
`,X2=h.div`
  font-size: 11.5px;
  color: ${e=>e.theme.colors.textSecondary};
  margin-top: 6px;
`,pv=h(Ll)`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) { grid-column: span 2; grid-row: span 2; }
`,mv=h.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`,gv=h.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${e=>e.theme.colors.text};
`,xv=h.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$c||e.theme.colors.primary};
  flex-shrink: 0;
`,vv=h.button`
  margin-left: auto;
  background: none;
  border: none;
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
  cursor: pointer;
  padding: 2px;
`,yv=h.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 0;
  border-bottom: 1px solid ${e=>e.theme.colors.borderLight};
  cursor: pointer;

  &:last-child { border-bottom: none; }
  &:hover .mini-title { color: ${e=>e.theme.colors.primary}; }
`,bv=h.div`
  min-width: 0;
  flex: 1;
`,wv=h.div.attrs({className:"mini-title"})`
  font-size: 13.5px;
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 150ms ease;
`,Z2=h.div`
  font-size: 11.5px;
  color: ${e=>e.theme.colors.textSecondary};
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,$v=h.div`
  font-size: 11.5px;
  color: ${e=>e.theme.colors.textSecondary};
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`,J2=h.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 0;
  font-size: 12.5px;
  color: ${e=>e.theme.colors.textMuted};
`,Q2=h.div`
  height: 14px;
  margin: 13px 0;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    ${e=>e.theme.colors.border} 25%,
    ${e=>e.theme.colors.borderLight} 50%,
    ${e=>e.theme.colors.border} 75%
  );
  background-size: 200px 100%;
  animation: shimmer 1.2s infinite;
  @keyframes shimmer {
    0%   { background-position: -200px 0; }
    100% { background-position: calc(200px + 100%) 0; }
  }
`,eL=h.div`
  margin: 30px 0 0;
  padding-top: 24px;
  border-top: 1px solid ${e=>e.theme.colors.border};
`,tL=h.div`
  font-size: 15px;
  font-weight: 700;
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: 14px;
`,rL=h.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  max-width: 420px;
`,Sv=h.div`
  background: ${e=>e.theme.colors.surface};
  border: 1.5px solid ${e=>e.theme.colors.border};
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  text-align: center;
  transition: border-color 150ms ease;
  &:hover { border-color: ${e=>e.theme.colors.primary}; }
`,jv=h.div`
  font-size: 24px;
  margin-bottom: 8px;
`,kv=h.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
`,nL=({user:e,onClose:t})=>{const[r,n]=p.useState({status:"ACTIVE",warningCount:0,suspendedUntil:"",role:"USER"}),[o,a]=p.useState(!1),[s,c]=p.useState({});p.useEffect(()=>{e&&n({status:e.status||"ACTIVE",warningCount:e.warningCount||0,suspendedUntil:e.suspendedUntil?new Date(e.suspendedUntil).toISOString().slice(0,16):"",role:e.role||"USER"})},[e]);const l=f=>{const{name:m,value:g}=f.target;n(x=>({...x,[m]:g})),s[m]&&c(x=>({...x,[m]:""}))},u=async f=>{f.preventDefault(),a(!0);try{const m={status:r.status,warningCount:parseInt(r.warningCount)||0,suspendedUntil:r.suspendedUntil?new Date(r.suspendedUntil).toISOString():null},g=e.role,x=r.role;if(g!=="ADMIN"&&g!=="MASTER"&&x==="ADMIN")await NI.promoteToAdmin(e.idx),alert("유저가 ADMIN으로 승격되었습니다.");else if(x==="ADMIN"||x==="MASTER"){alert("관리자 역할 변경은 별도 엔드포인트를 사용해주세요."),a(!1);return}await bp.updateUserStatus(e.idx,m),alert("상태가 성공적으로 업데이트되었습니다."),t()}catch(m){console.error("Error updating user status:",m);const g=m.response?.data?.message||m.message||"상태 업데이트에 실패했습니다.";alert(g)}finally{a(!1)}},d=f=>{f.target===f.currentTarget&&t()};return i.jsx(oL,{onClick:d,children:i.jsxs(iL,{children:[i.jsxs(aL,{children:[i.jsx(sL,{children:"사용자 상태 관리"}),i.jsx(cL,{onClick:t,children:"×"})]}),i.jsxs(lL,{children:[i.jsxs(Zd,{children:[i.jsx("strong",{children:"사용자명:"})," ",e?.username]}),i.jsxs(Zd,{children:[i.jsx("strong",{children:"이메일:"})," ",e?.email]}),i.jsxs(Zd,{children:[i.jsx("strong",{children:"현재 역할:"})," ",e?.role]})]}),i.jsxs(dL,{onSubmit:u,children:[i.jsxs(Ps,{children:[i.jsx(As,{children:"계정 상태 *"}),i.jsxs(Cv,{name:"status",value:r.status,onChange:l,children:[i.jsx("option",{value:"ACTIVE",children:"정상 (ACTIVE)"}),i.jsx("option",{value:"SUSPENDED",children:"이용제한 중 (SUSPENDED)"}),i.jsx("option",{value:"BANNED",children:"영구 차단 (BANNED)"})]})]}),i.jsxs(Ps,{children:[i.jsx(As,{children:"경고 횟수"}),i.jsx(Ev,{type:"number",name:"warningCount",value:r.warningCount,onChange:l,min:"0",placeholder:"경고 횟수를 입력하세요"})]}),i.jsxs(Ps,{children:[i.jsx(As,{children:"정지 기간 (SUSPENDED일 때만 적용)"}),i.jsx(Ev,{type:"datetime-local",name:"suspendedUntil",value:r.suspendedUntil,onChange:l,disabled:r.status!=="SUSPENDED"}),r.status!=="SUSPENDED"&&i.jsx(Pv,{children:"정지 기간은 이용제한 중 상태일 때만 설정할 수 있습니다."})]}),e&&e.role!=="ADMIN"&&e.role!=="MASTER"&&i.jsxs(Ps,{children:[i.jsx(As,{children:"역할 승격"}),i.jsxs(Cv,{name:"role",value:r.role,onChange:l,children:[i.jsx("option",{value:"USER",children:"일반 사용자"}),i.jsx("option",{value:"SERVICE_PROVIDER",children:"서비스 제공자"}),i.jsx("option",{value:"ADMIN",children:"관리자 (승격)"})]}),r.role==="ADMIN"&&i.jsx(Pv,{children:"일반 사용자를 ADMIN으로 승격합니다."})]}),i.jsxs(uL,{children:[i.jsx(Av,{type:"button",variant:"secondary",onClick:t,children:"취소"}),i.jsx(Av,{type:"submit",variant:"primary",disabled:o,children:o?"저장 중...":"저장"})]})]})]})})},oL=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({theme:e})=>e.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,iL=h.div`
  background: ${({theme:e})=>e.colors.surfaceElevated};
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${({theme:e})=>e.shadows.xl};
`,aL=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,sL=h.h2`
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,cL=h.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({theme:e})=>e.colors.textSecondary};

  &:hover {
    color: ${({theme:e})=>e.colors.text};
  }
`,lL=h.div`
  background: ${({theme:e})=>e.colors.surfaceSoft};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`,Zd=h.div`
  margin-bottom: 8px;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: 14px;

  strong {
    color: ${({theme:e})=>e.colors.text};
    margin-right: 8px;
  }
`,dL=h.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Ps=h.div`
  display: flex;
  flex-direction: column;
`,As=h.label`
  color: ${({theme:e})=>e.colors.text};
  margin-bottom: 4px;
  font-weight: 500;
`,Ev=h.input`
  padding: 10px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 6px;
  font-size: 16px;
  background: ${({theme:e})=>e.colors.background};
  color: ${({theme:e})=>e.colors.text};

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.colors.borderFocus};
    box-shadow: ${({theme:e})=>e.shadows.focus};
  }

  &:disabled {
    background: ${({theme:e})=>e.colors.surfaceSoft};
    color: ${({theme:e})=>e.colors.textLight};
    cursor: not-allowed;
  }
`,Cv=h.select`
  padding: 10px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 6px;
  font-size: 16px;
  background: ${({theme:e})=>e.colors.background};
  color: ${({theme:e})=>e.colors.text};

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.colors.borderFocus};
    box-shadow: ${({theme:e})=>e.shadows.focus};
  }
`,Pv=h.div`
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: 12px;
  margin-top: 4px;
  font-style: italic;
`,uL=h.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`,Av=h.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  ${e=>e.variant==="primary"&&`
    background: ${e.theme.colors.primary};
    color: ${e.theme.colors.textInverse};

    &:hover {
      background: ${e.theme.colors.primaryDark};
    }

    &:disabled {
      background: ${e.theme.colors.borderDark};
      cursor: not-allowed;
    }
  `}

  ${e=>e.variant==="secondary"&&`
    background: ${e.theme.colors.surfaceSoft};
    color: ${e.theme.colors.text};

    &:hover {
      background: ${e.theme.colors.surfaceHover};
    }
  `}
`,Hj=({showHeader:e=!0})=>{const[t,r]=p.useState(0),[n,o]=p.useState(20),[a,s]=p.useState(0),[c,l]=p.useState({map:{},order:[]}),[u,d]=p.useState(!0),[f,m]=p.useState(null),[g,x]=p.useState(!1),[v,b]=p.useState(null),[E,w]=p.useState(""),[j,S]=p.useState(""),[y,k]=p.useState(""),$=p.useCallback(I=>I.order.map(T=>I.map[T]).filter(Boolean),[]),C=p.useCallback(I=>{const T={},B=[];return I.forEach(X=>{X?.idx&&!T[X.idx]&&(T[X.idx]=X,B.push(X.idx))}),{map:T,order:B}},[]),P=p.useCallback(async(I=0,T=n)=>{try{d(!0),m(null);const B={page:I,size:T};E&&(B.role=E),j!==""&&(B.deleted=j==="true"),y&&(B.q=y);const ie=(await bp.getAllUsersWithPaging(B)).data||{},Z=ie.users||[],q=C(Z);l(q),s(ie.totalCount||0),r(I)}catch(B){console.error("API 에러:",B),m(`API 호출 실패: ${B.response?.status||"Network Error"} - ${B.message}`)}finally{d(!1)}},[n,E,j,y,C]);p.useEffect(()=>{P(0)},[]);const z=I=>{b(I),x(!0)},_=async I=>{if(window.confirm(`정말로 이 계정을 탈퇴 처리하시겠습니까?
탈퇴 후에는 복구할 수 없으며, 아이디/닉네임/이메일은 다른 사용자가 재사용할 수 있게 됩니다.`))try{await bp.deleteUser(I),l(T=>T.map[I]?{...T,map:{...T.map,[I]:{...T.map[I],isDeleted:!0,deletedAt:new Date().toISOString()}}}:T),P(t),alert("계정이 삭제되었습니다.")}catch{alert("계정 삭제에 실패했습니다.")}},N=()=>{x(!1),b(null),P(t)},R=p.useCallback(I=>{const T=Math.max(1,Math.ceil(a/n));I>=0&&I<T&&P(I)},[a,n,P]),F=I=>{const T=parseInt(I.target.value);o(T),P(0,T)},O=p.useMemo(()=>$(c),[c,$]),D=p.useMemo(()=>O.filter(I=>{if(E&&I.role!==E||j==="true"&&!I.isDeleted||j==="false"&&I.isDeleted)return!1;if(y){const T=y.toLowerCase();if(!((I.username||"").toLowerCase().includes(T)||(I.id||"").toLowerCase().includes(T)||(I.email||"").toLowerCase().includes(T)||(I.nickname||"").toLowerCase().includes(T)))return!1}return!0}),[O,E,j,y]),A=I=>{if(!I)return"-";try{const T=new Date(I);return Number.isNaN(T.getTime())?"-":T.toLocaleString()}catch{return"-"}},M=[{value:"",label:"전체"},{value:"USER",label:"USER"},{value:"SERVICE_PROVIDER",label:"SERVICE_PROVIDER"},{value:"ADMIN",label:"ADMIN"},{value:"MASTER",label:"MASTER"}];return i.jsxs(hL,{children:[e&&i.jsxs(fL,{children:[i.jsx(pL,{children:"👥 사용자 관리"}),i.jsx(mL,{children:i.jsxs(Ov,{value:n,onChange:F,children:[i.jsx("option",{value:20,children:"20개씩"}),i.jsx("option",{value:50,children:"50개씩"}),i.jsx("option",{value:100,children:"100개씩"})]})})]}),i.jsxs(gL,{children:[!e&&i.jsxs(Qi,{children:[i.jsx(Os,{children:"페이지"}),i.jsxs(Ov,{value:n,onChange:F,children:[i.jsx("option",{value:20,children:"20개씩"}),i.jsx("option",{value:50,children:"50개씩"}),i.jsx("option",{value:100,children:"100개씩"})]})]}),i.jsxs(Qi,{children:[i.jsx(Os,{children:"역할"}),i.jsx(Rv,{value:E,onChange:I=>w(I.target.value),children:M.map(I=>i.jsx("option",{value:I.value,children:I.label},I.value))})]}),i.jsxs(Qi,{children:[i.jsx(Os,{children:"삭제여부"}),i.jsxs(Rv,{value:j,onChange:I=>S(I.target.value),children:[i.jsx("option",{value:"",children:"전체"}),i.jsx("option",{value:"false",children:"미삭제"}),i.jsx("option",{value:"true",children:"삭제됨"})]})]}),i.jsxs(Qi,{style:{flex:1},children:[i.jsx(Os,{children:"검색"}),i.jsx(xL,{placeholder:"아이디/이메일/닉네임",value:y,onChange:I=>k(I.target.value),onKeyDown:I=>I.key==="Enter"&&P(0)})]}),i.jsx(Qi,{children:i.jsx(vL,{onClick:()=>P(0),children:"새로고침"})})]}),a>0&&i.jsx(EL,{children:i.jsx(kr,{currentPage:t,totalCount:a,pageSize:n,onPageChange:R,loading:u})}),i.jsx(yL,{children:u&&c.order.length===0?i.jsx(Jd,{children:"로딩 중..."}):f?i.jsxs(Jd,{children:[f,i.jsx(wL,{onClick:()=>P(0),children:"다시 시도"})]}):D.length===0?i.jsx(Jd,{children:"등록된 유저가 없습니다."}):i.jsxs(bL,{children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx("th",{children:"ID"}),i.jsx("th",{children:"아이디"}),i.jsx("th",{children:"닉네임"}),i.jsx("th",{children:"이메일"}),i.jsx("th",{children:"역할"}),i.jsx("th",{children:"삭제됨"}),i.jsx("th",{children:"휴면"}),i.jsx("th",{children:"가입일"}),i.jsx("th",{children:"액션"})]})}),i.jsx("tbody",{children:D.map(I=>i.jsxs("tr",{children:[i.jsx("td",{children:I.idx}),i.jsx("td",{children:I.id||"-"}),i.jsx("td",{children:I.nickname||I.username||"-"}),i.jsx("td",{className:"ellipsis",children:I.email||"-"}),i.jsx("td",{children:i.jsx($L,{role:I.role,children:I.role})}),i.jsx("td",{children:I.isDeleted?"Y":"N"}),i.jsx("td",{children:I.isDormant?"Y":"N"}),i.jsx("td",{children:A(I.createdAt)}),i.jsx("td",{children:i.jsxs(SL,{children:[i.jsx(jL,{onClick:()=>z(I),children:"상태 관리"}),!I.isDeleted&&i.jsx(kL,{onClick:()=>_(I.idx),children:"삭제"})]})})]},I.idx))})]})}),g&&i.jsx(nL,{user:v,onClose:N})]})},hL=h.div``,fL=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing.lg};
`,pL=h.h1`
  font-size: ${e=>e.theme.typography.h2.fontSize};
  font-weight: ${e=>e.theme.typography.h2.fontWeight};
  margin: 0;
  color: ${e=>e.theme.colors.text};
`,mL=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.md};
`,Ov=h.select`
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.sm};
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.caption.fontSize};
  cursor: pointer;
`,gL=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.md};
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing.md};
  flex-wrap: wrap;
`,Qi=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
`,Os=h.span`
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.caption.fontSize};
`,Rv=h.select`
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.sm};
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};
`,xL=h.input`
  width: 200px;
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.sm};
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};
`,vL=h.button`
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  border-radius: ${e=>e.theme.borderRadius.sm};
  cursor: pointer;

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
  }
`,yL=h.div`
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  padding: ${e=>e.theme.spacing.lg};
  background: ${e=>e.theme.colors.surfaceSoft};
`,bL=h.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${e=>e.theme.typography.caption.fontSize};

  thead {
    background: ${e=>e.theme.colors.surface};
  }

  th, td {
    padding: 8px 10px;
    border-bottom: 1px solid ${e=>e.theme.colors.border};
    text-align: left;
    vertical-align: middle;
  }

  th {
    color: ${e=>e.theme.colors.textSecondary};
    font-weight: 600;
    white-space: nowrap;
  }

  td.ellipsis {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`,Jd=h.div`
  padding: ${e=>e.theme.spacing.lg};
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.spacing.md};
`,wL=h.button`
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.sm};
  cursor: pointer;
`,$L=h.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>{switch(e.role){case"ADMIN":return e.theme.colors.error||"#e74c3c";case"MASTER":return"#9b59b6";case"SERVICE_PROVIDER":return"#f39c12";default:return e.theme.colors.primary||"#2ecc71"}}};
`,SL=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.xs};
  align-items: center;
`,jL=h.button`
  padding: 6px 10px;
  border-radius: ${e=>e.theme.borderRadius.sm};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surface};
  cursor: pointer;
  font-size: ${e=>e.theme.typography.caption.fontSize};
  color: ${e=>e.theme.colors.text};

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
  }
`,kL=h.button`
  padding: 6px 10px;
  border: 1px solid ${e=>e.theme.colors.error};
  color: ${e=>e.theme.colors.error};
  background: transparent;
  border-radius: ${e=>e.theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${e=>e.theme.typography.caption.fontSize};

  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }
`,EL=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing.md} 0;
  margin-bottom: ${e=>e.theme.spacing.sm};
`,CL="http://localhost:8080/api/reports",PL="http://localhost:8080/api/admin/reports",AL=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),Vj=se.create({baseURL:CL,headers:{"Content-Type":"application/json"}}),ma=se.create({baseURL:PL,headers:{"Content-Type":"application/json"}}),Kj=e=>{const t=AL();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e};Vj.interceptors.request.use(Kj,e=>Promise.reject(e));ma.interceptors.request.use(Kj,e=>Promise.reject(e));const vr={submit:e=>Vj.post("",e),getReports:({targetType:e,status:t}={})=>{const r={};return e&&(r.targetType=e),t&&t!=="ALL"&&(r.status=t),ma.get("",{params:r})},getDetail:e=>ma.get(`/${e}`),getAssist:e=>ma.get(`/${e}/assist`),handle:(e,{status:t,actionTaken:r,adminNote:n})=>ma.post(`/${e}/handle`,{status:t,actionTaken:r,adminNote:n})},Ml=()=>{const{user:e,isAuthenticated:t}=dt(),r=p.useCallback(()=>t&&e!==null,[t,e]),n=p.useCallback(()=>e?e.role==="ADMIN"||e.role==="MASTER":!1,[e]),o=p.useCallback(c=>e?(Array.isArray(c)?c:[c]).includes(e.role):!1,[e]),a=p.useCallback(()=>{const c=r();return{isLoggedIn:c,requiresRedirect:!c}},[r]),s=p.useCallback(()=>{const c=n();return{isAdmin:c,requiresModal:!c}},[n]);return{checkLogin:r,checkAdmin:n,checkRole:o,requireLogin:a,requireAdmin:s,user:e,isAuthenticated:t}},OL=5*1024*1024,Qd={title:"",content:"",category:"일상",boardFilePath:""},wp=({isOpen:e,onClose:t,onSubmit:r,loading:n,currentUser:o,initialData:a,mode:s="create"})=>{const[c,l]=p.useState(Qd),[u,d]=p.useState(!1),[f,m]=p.useState("");if(p.useEffect(()=>{e?(l(a?{title:a.title||"",content:a.content||"",category:a.category||"일상",boardFilePath:a.boardFilePath||""}:Qd),m(""),d(!1)):(l(Qd),m(""),d(!1))},[e]),!e)return null;const g=w=>{const{name:j,value:S}=w.target;l(y=>({...y,[j]:S}))},x=async w=>{const j=w.target.files?.[0];if(j){if(j.size>OL){m("이미지 크기는 최대 5MB까지 가능합니다."),w.target.value="";return}m(""),d(!0);try{const S=await Xa.uploadImage(j,{category:"community",ownerType:o?"user":"guest",ownerId:o?.idx??void 0});l(y=>({...y,boardFilePath:S.url}))}catch(S){const y=S.response?.data?.error||S.message||"이미지 업로드 중 문제가 발생했습니다.";m(y)}finally{d(!1),w.target&&(w.target.value="")}}},v=()=>{l(w=>({...w,boardFilePath:""})),m("")},b=w=>{w.preventDefault(),r(c)},E=w=>{w.target===w.currentTarget&&t()};return i.jsx(RL,{onClick:E,children:i.jsxs(TL,{onClick:w=>w.stopPropagation(),children:[i.jsxs(IL,{children:[i.jsx(DL,{children:s==="edit"?"게시글 수정":"커뮤니티 글 작성"}),i.jsx(_L,{type:"button",onClick:t,children:"✕"})]}),i.jsx(LL,{children:i.jsxs(ML,{onSubmit:b,children:[i.jsxs(Rs,{children:[i.jsx(Ts,{children:"제목 *"}),i.jsx(zL,{name:"title",value:c.title,onChange:g,required:!0,placeholder:"제목을 입력하세요"})]}),i.jsxs(Rs,{children:[i.jsx(Ts,{children:"카테고리 *"}),i.jsxs(NL,{name:"category",value:c.category,onChange:g,children:[i.jsx("option",{value:"일상",children:"일상"}),i.jsx("option",{value:"자랑",children:"자랑"}),i.jsx("option",{value:"질문",children:"질문"}),i.jsx("option",{value:"정보",children:"정보"}),i.jsx("option",{value:"후기",children:"후기"}),i.jsx("option",{value:"공지",children:"공지"})]})]}),i.jsxs(Rs,{children:[i.jsx(Ts,{children:"내용 *"}),i.jsx(BL,{name:"content",value:c.content,onChange:g,required:!0,rows:6,placeholder:"내용을 입력하세요"})]}),i.jsxs(Rs,{children:[i.jsx(Ts,{children:"대표 이미지"}),i.jsxs(FL,{children:[i.jsx(qL,{id:"community-post-image",type:"file",accept:"image/*",onChange:x}),i.jsxs(UL,{children:[i.jsx(WL,{htmlFor:"community-post-image",$disabled:u,children:u?"업로드 중...":"이미지 선택"}),c.boardFilePath&&i.jsx(HL,{type:"button",onClick:v,children:"이미지 삭제"})]}),i.jsx(VL,{children:"JPG, PNG, GIF, WEBP 형식의 이미지를 최대 5MB까지 업로드할 수 있어요."}),f&&i.jsx(KL,{children:f})]}),c.boardFilePath&&i.jsx(GL,{children:i.jsx(YL,{src:c.boardFilePath,alt:"게시글 이미지 미리보기"})})]}),i.jsxs(XL,{children:[i.jsx(JL,{type:"button",onClick:t,children:"취소"}),i.jsx(ZL,{type:"submit",disabled:n||u,children:s==="edit"?n?"저장 중...":"수정 저장":n?"등록 중...":"등록"})]})]})})]})})},RL=h.div`
  position: fixed;
  inset: 0;
  background: ${e=>e.theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  z-index: 1100;
  padding: ${e=>e.theme.spacing["5xl"]} ${e=>e.theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.lg};
    align-items: flex-start;
  }
`,TL=h.div`
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.xl};
  max-width: 832px;
  width: 100%;
  box-shadow: ${e=>e.theme.shadows.xl};

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: ${e=>e.theme.borderRadius.lg};
    margin-top: ${e=>e.theme.spacing.lg};
  }
`,IL=h.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing.lg} ${e=>e.theme.spacing.xl};
  border-bottom: 1px solid ${e=>e.theme.colors.border};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.md};
  }
`,DL=h.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.h2.fontSize};
`,_L=h.button`
  border: none;
  background: transparent;
  font-size: ${e=>e.theme.typography.h2.fontSize};
  cursor: pointer;
  color: ${e=>e.theme.colors.textSecondary};

  &:hover {
    color: ${e=>e.theme.colors.text};
  }
`,LL=h.div`
  padding: ${e=>e.theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.md};
  }
`,ML=h.form`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.lg};
`,Rs=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xs};
`,Ts=h.label`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
`,zL=h.input`
  width: 100%;
  padding: ${e=>e.theme.spacing.md};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,NL=h.select`
  width: 100%;
  padding: ${e=>e.theme.spacing.md};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,BL=h.textarea`
  width: 100%;
  padding: ${e=>e.theme.spacing.md};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-family: inherit;
  resize: vertical;
  min-height: 160px;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,FL=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.sm};
`,UL=h.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing.sm};
`,qL=h.input`
  display: none;
`,WL=h.label.withConfig({shouldForwardProp:e=>e!=="$disabled"})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.md};
  background: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  font-weight: 600;
  cursor: ${e=>e.$disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.$disabled?.6:1};
  pointer-events: ${e=>e.$disabled?"none":"auto"};
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.primaryDark};
  }
`,HL=h.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surfaceElevated};
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${e=>e.theme.colors.error};
    color: ${e=>e.theme.colors.error};
  }
`,VL=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
`,KL=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.error};
`,GL=h.div`
  margin-top: ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.lg};
  overflow: hidden;
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surfaceElevated};
  max-width: 320px;
`,YL=h.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`,XL=h.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing.sm};
`,ZL=h.button`
  background: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,JL=h.button`
  background: ${e=>e.theme.colors.surfaceElevated};
  color: ${e=>e.theme.colors.textSecondary};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${e=>e.theme.colors.primary};
    border-color: ${e=>e.theme.colors.primary};
  }
`,QL="http://localhost:8080/api/boards",eM=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),tM=se.create({baseURL:QL,headers:{"Content-Type":"application/json"}});tM.interceptors.request.use(e=>{const t=eM();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const eu=e=>Promise.resolve({data:e}),tu={list:(e,t=0,r=20)=>eu({comments:[],totalCount:0,hasNext:!1}),create:(e,t)=>eu({idx:1,...t}),delete:(e,t)=>eu({})},rM=5*1024*1024,nM=({isOpen:e,boardId:t,onClose:r,onCommentAdded:n,onBoardReaction:o,onBoardViewUpdate:a,currentUser:s,onBoardDeleted:c,onBoardUpdated:l})=>{const{requireLogin:u}=Ml(),{user:d,redirectToLogin:f}=dt(),m=_j(),g=d?.idx,[x,v]=p.useState(null),[b,E]=p.useState(!1),[w,j]=p.useState(""),[S,y]=p.useState([]),[k,$]=p.useState(!1),[C,P]=p.useState(""),[z,_]=p.useState(!1),[N,R]=p.useState(""),[F,O]=p.useState(""),[D,A]=p.useState(!1),[M,I]=p.useState(""),[T,B]=p.useState(null),[X,ie]=p.useState(!1),[Z,q]=p.useState(!1),[W,J]=p.useState(!1),[L,G]=p.useState(0),[K]=p.useState(20),[ee,ne]=p.useState(0),we=p.useMemo(()=>{if(!x?.category)return null;const te={ALL:"all",일상:"daily",자랑:"pride",질문:"question",정보:"info",후기:"review",모임:"meetup",공지:"notice",TIP:"meetup",QUESTION:"question",INFO:"info",PRIDE:"pride",STORY:"daily"},ve={ALL:{label:"전체",icon:"📋"},일상:{label:"일상",icon:"📖"},자랑:{label:"자랑",icon:"🐾"},질문:{label:"질문",icon:"❓"},정보:{label:"정보",icon:"📢"},후기:{label:"후기",icon:"📝"},모임:{label:"모임",icon:"🤝"},공지:{label:"공지",icon:"📢"},TIP:{label:"꿀팁",icon:"💡"},QUESTION:{label:"질문",icon:"❓"},INFO:{label:"정보",icon:"📢"},PRIDE:{label:"자랑",icon:"🐾"},STORY:{label:"일상",icon:"📖"}},Q=x.category,ae=ve[Q]||{label:Q,icon:"📋"},be=te[Q]||"all",Ce=m.colors.category;return{...ae,color:Ce[be]||Ce.all}},[x,m]),je=p.useMemo(()=>{if(!x?.createdAt)return"";const te=new Date(x.createdAt);return Number.isNaN(te.getTime())?"":te.toLocaleString("ko-KR",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})},[x]),Ge=p.useCallback(()=>{v(null),E(!1),j(""),y([]),$(!1),P(""),_(!1),R(""),O(""),A(!1),I(""),G(0),ne(0)},[]),_e=p.useCallback(async()=>{if(t)try{E(!0),j("");const ve=(await nr.getBoard(t)).data||null;v(ve),ve&&a?.(t,ve.views??0)}catch(te){const ve=te.response?.data?.error||te.message||"게시글을 불러오지 못했습니다.";j(ve)}finally{E(!1)}},[t,g,a]),We=p.useCallback(async(te=0)=>{if(t)try{$(!0),P("");const Q=(await tu.list(t,te,K)).data||{},ae=Q.comments||[];y(ae),ne(Q.totalCount||0),G(te)}catch(ve){const Q=ve.response?.data?.error||ve.message||"댓글을 불러오지 못했습니다.";P(Q)}finally{$(!1)}},[t,K]),Rt=p.useCallback(te=>{const ve=Math.max(1,Math.ceil(ee/K));te>=0&&te<ve&&We(te)},[ee,K,We]);p.useEffect(()=>{if(!e){Ge();return}_e(),We(0)},[e,t,_e,We,Ge]);const St=p.useCallback(async(te,ve)=>{if(ve?.stopPropagation?.(),!t)return;const{requiresRedirect:Q}=u();if(Q){f();return}if(!d){f();return}try{j("");const be=(await nr.reactToBoard(t,{reactionType:te})).data;v(Ce=>Ce&&{...Ce,likes:be.likeCount,dislikes:be.dislikeCount,userReaction:be.userReaction}),o?.(t,be)}catch(ae){const be=ae.response?.data?.error||ae.message||"반응 처리에 실패했습니다.";j(be)}},[t,u,f,d,o]),Tt=p.useCallback(async()=>{const{requiresRedirect:te}=u();if(te){f();return}if(!d||!t||!window.confirm("이 게시글을 신고하시겠습니까?"))return;const ve=window.prompt("신고 사유를 입력해주세요.");if(!(!ve||!ve.trim()))try{await vr.submit({targetType:"BOARD",targetIdx:t,reason:ve.trim()}),alert("신고가 접수되었습니다.")}catch(Q){const ae=Q.response?.data?.error||Q.message||"신고 처리에 실패했습니다.";alert(ae)}},[u,f,d,t]),pt=p.useCallback(async te=>{const{requiresRedirect:ve}=u();if(ve){f();return}if(!d||!te||!window.confirm("해당 댓글을 신고하시겠습니까?"))return;const Q=window.prompt("신고 사유를 입력해주세요.");if(!(!Q||!Q.trim()))try{await vr.submit({targetType:"COMMENT",targetIdx:te,reason:Q.trim()}),alert("신고가 접수되었습니다.")}catch(ae){const be=ae.response?.data?.error||ae.message||"신고 처리에 실패했습니다.";alert(be)}},[u,f,d]),Be=async te=>{const ve=te.target.files?.[0];if(ve){if(ve.size>rM){I("이미지 크기는 최대 5MB까지 가능합니다."),te.target.value="";return}I(""),A(!0);try{const Q=await Xa.uploadImage(ve,{category:"community-comment",ownerType:d?"user":"guest",ownerId:d?.idx??void 0,entityId:t});O(Q.url)}catch(Q){const ae=Q.response?.data?.error||Q.message||"이미지 업로드 중 문제가 발생했습니다.";I(ae)}finally{A(!1),te.target.value=""}}},Hr=()=>{O(""),I("")},$e=async te=>{if(te.preventDefault(),!t)return;const{requiresRedirect:ve}=u();if(ve){f();return}if(!d){f();return}if(!N.trim()){P("댓글 내용을 입력해주세요.");return}try{_(!0),P("");const Q={content:N.trim(),userId:d.idx,commentFilePath:F||null};await tu.create(t,Q),await We(0),R(""),O(""),I(""),n&&n(t),window.dispatchEvent(new Event("notificationUpdate"))}catch(Q){const ae=Q.response?.data?.error||Q.message||"댓글 등록에 실패했습니다.";P(ae)}finally{_(!1)}},Nn=p.useCallback(async(te,ve)=>{if(!t)return;const{requiresRedirect:Q}=u();if(Q){f();return}if(!d){f();return}try{P("");const be=(await nr.reactToComment(t,te,{reactionType:ve})).data;y(Ce=>Ce.map(ke=>ke.idx===te?{...ke,likeCount:be.likeCount,dislikeCount:be.dislikeCount,userReaction:be.userReaction}:ke))}catch(ae){const be=ae.response?.data?.error||ae.message||"댓글 반응 처리에 실패했습니다.";P(be)}},[t,u,f,d]),Qe=p.useCallback(async()=>{if(!(!t||!s||x?.userId!==s.idx)&&window.confirm("이 게시글을 삭제하시겠습니까?"))try{await nr.deleteBoard(t),c?.(t),r?.()}catch(te){const ve=te.response?.data?.error||te.message||"게시글 삭제에 실패했습니다.";j(ve)}},[t,s,x,c,r]),Vr=async te=>{if(t)try{J(!0),await nr.updateBoard(t,{title:te.title,content:te.content,category:te.category,boardFilePath:te.boardFilePath||null}),q(!1),await _e(),l?.(t,{title:te.title,content:te.content,category:te.category,boardFilePath:te.boardFilePath||null})}catch(ve){const Q=ve.response?.data?.error||ve.message||"게시글 수정에 실패했습니다.";alert(Q)}finally{J(!1)}},er=p.useCallback(async te=>{if(!(!t||!s)&&window.confirm("이 댓글을 삭제하시겠습니까?"))try{await tu.delete(t,te),await We(0),n?.(t,!0)}catch(ve){const Q=ve.response?.data?.error||ve.message||"댓글 삭제에 실패했습니다.";P(Q)}},[t,s,We,n]),co=p.useCallback(te=>{B(te),ie(!0)},[]);if(!e)return null;const lo=te=>{te.target===te.currentTarget&&r?.()};return i.jsxs(i.Fragment,{children:[i.jsx(oM,{onClick:r}),i.jsx(iM,{onClick:lo,children:i.jsxs(aM,{onClick:te=>te.stopPropagation(),children:[i.jsxs(sM,{children:[i.jsxs(cM,{children:[i.jsx(lM,{type:"button",onClick:r,children:"← 목록으로"}),i.jsxs(dM,{children:[i.jsxs(ea,{type:"button",onClick:te=>St("LIKE",te),$active:x?.userReaction==="LIKE",children:["❤️ ",x?.likes??0]}),i.jsxs(ea,{type:"button",onClick:te=>St("DISLIKE",te),$active:x?.userReaction==="DISLIKE",children:["👎 ",x?.dislikes??0]}),s&&x?.userId===s.idx&&i.jsx(ea,{type:"button",onClick:()=>q(!0),children:"✏️ 수정"}),s&&x?.userId===s.idx&&i.jsx(ea,{type:"button",onClick:Qe,children:"🗑 삭제"}),i.jsx(ea,{type:"button",onClick:Tt,children:"🚨 신고"})]})]}),w?i.jsx(Mv,{children:w}):b?i.jsx(ZM,{}):i.jsxs(i.Fragment,{children:[i.jsxs(uM,{$color:we?.color,children:[i.jsx("span",{children:we?.icon}),we?.label]}),i.jsx(hM,{children:x?.title}),i.jsxs(fM,{children:[i.jsx(pM,{children:x?.username||"알 수 없음"}),i.jsx(Tv,{children:"•"}),i.jsx("span",{children:je}),x?.userLocation&&i.jsxs(i.Fragment,{children:[i.jsx(Tv,{children:"•"}),i.jsxs("span",{children:["📍 ",x.userLocation]})]})]})]})]}),b?i.jsx(JM,{}):w?null:i.jsxs(i.Fragment,{children:[x?.boardFilePath&&i.jsx(mM,{children:i.jsx("img",{src:x.boardFilePath,alt:x.title})}),i.jsx(gM,{children:i.jsx(xM,{children:x?.content})})]}),i.jsxs(vM,{children:[i.jsxs(yM,{children:[i.jsx(bM,{children:"댓글"}),i.jsx(wM,{children:ee>0?`${S.length} / ${ee}개`:`${S.length}개`})]}),k&&S.length===0?i.jsx($M,{children:"댓글을 불러오는 중..."}):C?i.jsx(Mv,{children:C}):S.length===0?i.jsxs(SM,{children:[i.jsx(jM,{children:"💬"}),i.jsx(kM,{children:"첫 댓글을 남겨보세요!"})]}):i.jsx(EM,{children:S.map(te=>i.jsxs(CM,{children:[i.jsxs(PM,{children:[i.jsx(AM,{children:te.username?te.username.charAt(0).toUpperCase():"U"}),i.jsxs(OM,{children:[i.jsx(RM,{onClick:()=>co(te.userId),style:{cursor:"pointer"},children:te.username||"알 수 없음"}),i.jsx(TM,{children:te.createdAt?new Date(te.createdAt).toLocaleString("ko-KR"):""})]})]}),i.jsx(IM,{children:te.content}),te.commentFilePath&&i.jsx(DM,{children:i.jsx("img",{src:te.commentFilePath,alt:"댓글 이미지"})}),i.jsxs(_M,{children:[i.jsxs(Iv,{type:"button",onClick:()=>Nn(te.idx,"LIKE"),$active:te.userReaction==="LIKE",children:[i.jsx(Dv,{children:"👍"}),i.jsx(_v,{children:te.likeCount??0})]}),i.jsxs(Iv,{type:"button",onClick:()=>Nn(te.idx,"DISLIKE"),$active:te.userReaction==="DISLIKE",children:[i.jsx(Dv,{children:"👎"}),i.jsx(_v,{children:te.dislikeCount??0})]}),s&&(te.userId===s.idx?i.jsx(LM,{type:"button",onClick:()=>er(te.idx),children:"삭제"}):i.jsx(MM,{type:"button",onClick:()=>pt(te.idx),children:"신고"}))]})]},te.idx))}),ee>0&&i.jsx(QM,{children:i.jsx(kr,{currentPage:L,totalCount:ee,pageSize:K,onPageChange:Rt,loading:k,showEdges:!0})}),i.jsx(zM,{children:d?i.jsxs(BM,{onSubmit:$e,children:[i.jsx(FM,{rows:4,placeholder:"댓글을 입력하세요",value:N,onChange:te=>R(te.target.value),disabled:z}),i.jsxs(UM,{children:[i.jsxs(qM,{children:[i.jsx(WM,{id:"community-detail-comment-image",type:"file",accept:"image/*",onChange:Be,disabled:D}),i.jsx(HM,{htmlFor:"community-detail-comment-image",$disabled:D,children:D?"업로드 중...":"이미지 첨부"}),F&&i.jsx(VM,{type:"button",onClick:Hr,children:"첨부 삭제"}),i.jsx(KM,{children:"최대 5MB까지 업로드할 수 있습니다."}),M&&i.jsx(Lv,{children:M})]}),i.jsx(GM,{type:"submit",disabled:z||D,children:z?"등록 중...":"댓글 등록"})]}),C&&!k&&i.jsx(Lv,{children:C}),F&&i.jsx(YM,{children:i.jsx(XM,{src:F,alt:"댓글 이미지 미리보기"})})]}):i.jsx(NM,{children:"댓글을 작성하려면 로그인이 필요합니다."})})]})]})}),i.jsx(Wm,{isOpen:X,userId:T,onClose:()=>{ie(!1),B(null)}}),i.jsx(wp,{isOpen:Z,onClose:()=>q(!1),onSubmit:Vr,loading:W,currentUser:s,initialData:x,mode:"edit"})]})},oM=h.div`
  position: fixed;
  inset: 0;
  background: ${e=>e.theme.colors.overlay};
  backdrop-filter: blur(4px);
  z-index: 1090;
`,iM=h.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing.xxl} ${e=>e.theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.md};
    align-items: stretch;
  }
`,aM=h.article`
  width: min(1000px, 100%);
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.xl};
  box-shadow: ${e=>e.theme.shadows.xl};
  border: 1px solid ${e=>e.theme.colors.border};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: ${e=>e.theme.borderRadius.lg};
    box-shadow: ${e=>e.theme.shadows.lg};
  }
`,sM=h.header`
  padding: ${e=>e.theme.spacing.xl} ${e=>e.theme.spacing.xl};
  border-bottom: 1px solid ${e=>e.theme.colors.borderLight};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.md};
  }
`,cM=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${e=>e.theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${e=>e.theme.spacing.sm};
  }
`,lM=h.button`
  display: inline-flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  border: none;
  background: transparent;
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: 600;
  cursor: pointer;
  font-size: ${e=>e.theme.typography.body1.fontSize};
  transition: color 0.2s ease;

  &:hover {
    color: ${e=>e.theme.colors.primary};
  }
`,dM=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`,ea=h.button.withConfig({shouldForwardProp:e=>e!=="$active"})`
  border: 1px solid
    ${e=>e.$active?e.theme.colors.primary:e.theme.colors.border};
  background: ${e=>e.$active?e.theme.colors.primary:e.theme.colors.surface};
  color: ${e=>e.$active?e.theme.colors.textInverse:e.theme.colors.textSecondary};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${e=>e.theme.colors.primary};
    color: ${e=>e.$active?e.theme.colors.textInverse:e.theme.colors.primary};
    transform: translateY(-1px);
    background: ${e=>e.$active?e.theme.colors.primary:e.theme.colors.surfaceHover};
  }
`,uM=h.span`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.lg};
  background: ${e=>`linear-gradient(135deg, ${e.$color} 0%, ${e.$color}dd 100%)`};
  color: ${e=>e.theme.colors.textInverse};
  font-weight: 600;
  font-size: ${e=>e.theme.typography.body2.fontSize};
  box-shadow: 0 6px 20px ${e=>`${e.$color}30`};
`,hM=h.h1`
  margin: 0;
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.h2.fontSize};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: ${e=>e.theme.typography.h3.fontSize};
  }
`,fM=h.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing.xs};
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  align-items: center;
`,Tv=h.span`
  color: ${e=>e.theme.colors.textLight};
`,pM=h.span`
  display: inline-flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  border-radius: ${e=>e.theme.borderRadius.full};
  background: ${e=>e.theme.colors.surfaceElevated};
  color: ${e=>e.theme.colors.text};
  font-weight: 600;
  font-size: ${e=>e.theme.typography.body2.fontSize};
`,mM=h.div`
  width: 100%;
  max-height: 420px;
  overflow: hidden;
  border-bottom: 1px solid ${e=>e.theme.colors.borderLight};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`,gM=h.section`
  padding: ${e=>e.theme.spacing.xl} ${e=>e.theme.spacing.xl};
  border-bottom: 1px solid ${e=>e.theme.colors.borderLight};
  background: ${e=>e.theme.colors.surface};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.md};
  }
`,xM=h.p`
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.8;
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.body1.fontSize};
`,vM=h.section`
  padding: ${e=>e.theme.spacing.xl};
  background: ${e=>e.theme.colors.surfaceElevated};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.md};
    gap: ${e=>e.theme.spacing.md};
  }
`,yM=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,bM=h.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.h3.fontSize};
  color: ${e=>e.theme.colors.text};
`,wM=h.span`
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: 600;
`,$M=h.div`
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
`,SM=h.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.spacing.sm};
  color: ${e=>e.theme.colors.textSecondary};
`,jM=h.div`
  font-size: ${e=>e.theme.typography.hero.fontSize};
`,kM=h.div`
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
`,EM=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};
`,CM=h.article`
  background: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.sm};
  box-shadow: 0 8px 24px ${e=>e.theme.colors.shadow};
`,PM=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.sm};
`,AM=h.div`
  width: 44px;
  height: 44px;
  border-radius: ${e=>e.theme.borderRadius.full};
  background: ${e=>e.theme.colors.gradient};
  color: ${e=>e.theme.colors.textInverse};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${e=>e.theme.typography.body1.fontSize};
`,OM=h.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,RM=h.span`
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
  transition: color 0.2s ease;

  &:hover {
    color: ${e=>e.theme.colors.primary};
  }
`,TM=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
`,IM=h.p`
  margin: 0;
  color: ${e=>e.theme.colors.text};
  white-space: pre-wrap;
  line-height: 1.6;
`,DM=h.div`
  border-radius: ${e=>e.theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${e=>e.theme.colors.borderLight};

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`,_M=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.md};
  margin-top: ${e=>e.theme.spacing.sm};
`,Iv=h.button.withConfig({shouldForwardProp:e=>e!=="$active"})`
  display: inline-flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid
    ${e=>e.$active?e.theme.colors.primary:e.theme.colors.border};
  background: ${e=>e.$active?e.theme.colors.surfaceHover:e.theme.colors.surface};
  color: ${e=>e.$active?e.theme.colors.primary:e.theme.colors.textSecondary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${e=>e.theme.colors.primary};
    color: ${e=>e.theme.colors.primary};
    transform: translateY(-1px);
  }
`,Dv=h.span`
  font-size: 1rem;
`,_v=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
`,LM=h.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.error};
  background: transparent;
  color: ${e=>e.theme.colors.error};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.errorSoft};
    transform: translateY(-1px);
  }
`,MM=h.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.warning};
  background: transparent;
  color: ${e=>e.theme.colors.warning};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.warningSoft};
    transform: translateY(-1px);
  }
`,zM=h.div`
  background: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};
`,NM=h.div`
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body1.fontSize};
`,BM=h.form`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};
`,FM=h.textarea`
  padding: ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surface};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  resize: vertical;
  min-height: 140px;
  color: ${e=>e.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
    box-shadow: ${e=>e.theme.shadows.focus};
  }
`,UM=h.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${e=>e.theme.spacing.md};
  flex-wrap: wrap;
`,qM=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xs};
`,WM=h.input`
  display: none;
`,HM=h.label.withConfig({shouldForwardProp:e=>e!=="$disabled"})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: 600;
  cursor: ${e=>e.$disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.$disabled?.6:1};
  pointer-events: ${e=>e.$disabled?"none":"auto"};
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
    color: ${e=>e.theme.colors.primary};
  }
`,VM=h.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${e=>e.theme.colors.error};
    color: ${e=>e.theme.colors.error};
  }
`,KM=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
`,Lv=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.error};
`,GM=h.button`
  align-self: flex-end;
  background: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,YM=h.div`
  border-radius: ${e=>e.theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid ${e=>e.theme.colors.border};
  max-width: 240px;
`,XM=h.img`
  width: 100%;
  height: auto;
  display: block;
`,Gj=h.div`
  background: ${e=>e.theme.colors.surfaceHover};
  border-radius: ${e=>e.theme.borderRadius.md};
  animation: shimmer 1.2s ease-in-out infinite alternate;

  @keyframes shimmer {
    from {
      opacity: 0.55;
    }
    to {
      opacity: 0.9;
    }
  }
`,ZM=h(Gj)`
  height: 28px;
  width: 70%;
`,JM=h(Gj)`
  margin: ${e=>e.theme.spacing.xl};
  height: 180px;
`,Mv=h.div`
  background: ${e=>e.theme.colors.errorSoft};
  color: ${e=>e.theme.colors.error};
  border: 1px solid ${e=>e.theme.colors.error}33;
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing.md};
  font-size: ${e=>e.theme.typography.body1.fontSize};
`,QM=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing.md} 0;
  margin-top: ${e=>e.theme.spacing.sm};
`,ez={ALL:"all",일상:"daily",자랑:"pride",PRIDE:"pride",질문:"question",정보공유:"info",정보:"info",후기:"review",모임:"meetup",공지:"notice"},tz={ALL:{label:"전체",icon:"📋"},일상:{label:"일상",icon:"📖"},자랑:{label:"자랑",icon:"🐾"},질문:{label:"질문",icon:"❓"},정보공유:{label:"정보공유",icon:"📢"},정보:{label:"정보공유",icon:"📢"},후기:{label:"후기",icon:"📝"},모임:{label:"모임",icon:"🤝"},공지:{label:"공지",icon:"📢"},PRIDE:{label:"자랑",icon:"🐾"}},rz=()=>{const{requireLogin:e}=Ml(),{user:t,redirectToLogin:r}=dt(),n=_j(),[o,a]=p.useState(!1),[s,c]=p.useState(""),[l,u]=p.useState("ALL"),[d,f]=p.useState(!1),[m,g]=p.useState(!1),[x,v]=p.useState(!1),[b,E]=p.useState(null),[w,j]=p.useState(!1),[S,y]=p.useState(null),[k,$]=p.useState(null),[C,P]=p.useState(!1),[z,_]=p.useState([]),[N,R]=p.useState(!1),[F,O]=p.useState(""),[D,A]=p.useState("WEEKLY"),[M,I]=p.useState(0),[T,B]=p.useState(20),[X,ie]=p.useState(0),[Z,q]=p.useState({map:{},order:[]}),[W,J]=p.useState(""),[L,G]=p.useState("TITLE_CONTENT"),[K,ee]=p.useState(!1),[ne,we]=p.useState(!1),[je,Ge]=p.useState(0),[_e,We]=p.useState(0),[Rt,St]=p.useState({map:{},order:[]}),Tt=p.useCallback(U=>U.order.map(re=>U.map[re]).filter(Boolean),[]),pt=p.useCallback(U=>{const re={},oe=[];return U.forEach(pe=>{pe?.idx&&!re[pe.idx]&&(re[pe.idx]=pe,oe.push(pe.idx))}),{map:re,order:oe}},[]),Be=n.colors.category,Hr=p.useMemo(()=>[{key:"ALL",label:"전체",icon:"📋",color:Be.all},{key:"일상",label:"일상",icon:"📖",color:Be.daily},{key:"자랑",label:"자랑",icon:"🐾",color:Be.pride},{key:"질문",label:"질문",icon:"❓",color:Be.question},{key:"정보공유",label:"정보공유",icon:"📢",color:Be.info},{key:"후기",label:"후기",icon:"📝",color:Be.review},{key:"공지",label:"공지",icon:"📢",color:Be.notice}],[Be]),$e=p.useCallback(U=>{const re=tz[U]||{label:U||"전체",icon:"📋"},oe=ez[U]||"all";return{...re,color:Be[oe]||Be.all}},[Be]),Nn=U=>{if(!U)return"-";const re=new Date(U);if(Number.isNaN(re.getTime()))return"-";const pe=new Date-re,Se=Math.floor(pe/6e4),Bt=Math.floor(pe/36e5),uo=Math.floor(pe/864e5);return Se<1?"방금 전":Se<60?`${Se}분 전`:Bt<24?`${Bt}시간 전`:uo<7?`${uo}일 전`:re.toLocaleDateString("ko-KR",{month:"short",day:"numeric"})};p.useEffect(()=>{const U=re=>{const{boardId:oe}=re.detail;oe&&(console.log("알림에서 게시글 열기:",oe),$(oe),P(!0))};return window.addEventListener("openBoardDetail",U),()=>{window.removeEventListener("openBoardDetail",U)}},[]);const Qe=p.useCallback(async(U=0)=>{try{a(!0),c("");const re={category:l==="ALL"?null:l,page:U,size:T},pe=(await nr.getAllBoards(re)).data||{},Se=pe.boards||[],Bt=pt(Se);q(Bt),ie(pe.totalCount||0),I(U)}catch(re){console.error("❌ [CommunityBoard] 게시글 조회 실패:",re),console.error("❌ [CommunityBoard] 에러 상세:",re.response?.data),alert(`[CommunityBoard] 게시글 조회 실패:
${JSON.stringify(re.response?.data||re.message,null,2)}`);const oe=re.response?.data?.error||re.message||"게시글을 불러오지 못했습니다.";c(oe)}finally{a(!1)}},[l,T,pt]),Vr=p.useCallback(async()=>{if(!(l!=="자랑"&&l!=="PRIDE"))try{R(!0),O("");const re=(await nr.getPopularBoards(D)).data||[];_(re)}catch(U){console.error(`❌ ${D} 인기 게시글 조회 실패:`,U),console.error("❌ 에러 상세:",U.response?.data);const re=U.response?.data?.error||U.response?.data?.message||U.message||"인기 게시글을 불러오지 못했습니다.";O(re)}finally{R(!1)}},[l,D]);p.useEffect(()=>{Qe(0)},[l,T]),p.useEffect(()=>{Vr()},[Vr]);const er=p.useMemo(()=>K?Tt(Rt).filter(pe=>!(pe.deleted===!0||pe.status==="DELETED"||pe.status==="BLINDED")):Tt(Z).filter(oe=>!(oe.deleted===!0||oe.status==="DELETED"||oe.status==="BLINDED")),[Z,K,Rt,Tt]),co=p.useMemo(()=>{if(er.length===0)return[];const U=er.find(re=>re.category==="공지");return U?[U,...er.filter(re=>re!==U)]:er},[er]),lo=p.useCallback(U=>{const re=Math.max(1,Math.ceil(X/T));U>=0&&U<re&&Qe(U)},[X,T,Qe]),te=p.useCallback(U=>{B(U),I(0),q({map:{},order:[]})},[]),ve=p.useCallback(U=>{J(U.target.value)},[]),Q=p.useCallback(U=>{G(U.target.value)},[]),ae=p.useCallback(async(U=0)=>{if(!W.trim()){alert("검색어를 입력하세요");return}try{we(!0),ee(!0);const oe=(await nr.searchBoards(W.trim(),L,U,T)).data||{},pe=oe.boards||[],Se=pt(pe);St(Se),We(oe.totalCount||0),Ge(U)}catch(re){console.error("❌ 검색 실패:",re),alert(`검색 실패: ${re.response?.data?.error||re.message}`),St({map:{},order:[]})}finally{we(!1)}},[W,L,T,pt]),be=p.useCallback(()=>{ee(!1),J(""),St({map:{},order:[]}),G("TITLE_CONTENT"),Ge(0),We(0)},[]),Ce=p.useCallback(U=>{const re=Math.max(1,Math.ceil(_e/T));U>=0&&U<re&&ae(U)},[_e,T,ae]),ke=p.useCallback(U=>{U.key==="Enter"&&ae(0)},[ae]),et=()=>{const{requiresRedirect:U}=e();if(U){r();return}f(!0)},he=async U=>{const{requiresRedirect:re}=e();if(re){r();return}if(!t){alert("로그인이 필요합니다.");return}try{g(!0);const oe={title:U.title,content:U.content,category:U.category,boardFilePath:U.boardFilePath||null,userId:t.idx};await nr.createBoard(oe),f(!1),await Qe(0)}catch(oe){console.error("❌ 게시글 생성 실패:",oe);const pe=oe.response?.data?.error||oe.message;alert(`게시글 등록에 실패했습니다: ${pe}`)}finally{g(!1)}},mt=()=>{P(!1),$(null),y(null)},dn=p.useCallback((U,re)=>{re?.stopPropagation?.(),E(U),v(!0)},[]),Kr=async U=>{if(b)try{j(!0),await nr.updateBoard(b.idx,{title:U.title,content:U.content,category:U.category,boardFilePath:U.boardFilePath||null}),v(!1);const re={title:U.title,content:U.content,category:U.category,boardFilePath:U.boardFilePath||b.boardFilePath};q(oe=>{const pe=oe.map[b.idx];return pe?{...oe,map:{...oe.map,[b.idx]:{...pe,...re}}}:oe}),E(null)}catch(re){const oe=re.response?.data?.error||re.message;alert(`게시글 수정에 실패했습니다: ${oe}`)}finally{j(!1)}},un=p.useCallback((U,re)=>{q(oe=>{const pe=oe.map[U];return pe?{...oe,map:{...oe.map,[U]:{...pe,...re}}}:oe})},[]),$d=U=>{U?.boardId&&($(U.boardId),P(!0))},Ho=(U,re)=>{re.stopPropagation(),U?.idx&&($(U.idx),P(!0))},Y=(U,re)=>{U?.idx&&($(U.idx),P(!0))},le=async U=>{const{requiresRedirect:re}=e();if(re){r();return}if(!t||!U||!window.confirm("이 게시글을 신고하시겠습니까?"))return;const oe=window.prompt("신고 사유를 입력해주세요.");if(!(!oe||!oe.trim()))try{await vr.submit({targetType:"BOARD",targetIdx:U,reason:oe.trim()}),alert("신고가 접수되었습니다.")}catch(pe){const Se=pe.response?.data?.error||pe.message||"신고 처리에 실패했습니다.";alert(Se)}},fe=(U,re)=>{re.stopPropagation(),xs(U,"LIKE")},Ee=()=>{y(null)},Me=p.useCallback((U,re=!1)=>{U&&q(oe=>{const pe=oe.map[U];return pe?{...oe,map:{...oe.map,[U]:{...pe,commentCount:Math.max(0,(pe.commentCount??0)+(re?-1:1))}}}:oe})},[]),st=async(U,re)=>{if(re?.stopPropagation?.(),!(!t||U==null||!window.confirm("해당 게시글을 삭제하시겠습니까?")))try{await nr.deleteBoard(U),q(pe=>{const{[U]:Se,...Bt}=pe.map;return{map:Bt,order:pe.order.filter(uo=>uo!==U)}}),S?.idx===U&&Ee(),k===U&&mt(),Qe(0)}catch(pe){const Se=pe.response?.data?.error||pe.message;alert(`게시글을 삭제하지 못했습니다: ${Se}`)}},Vo=p.useCallback(U=>{q(re=>{const{[U]:oe,...pe}=re.map;return{map:pe,order:re.order.filter(Se=>Se!==U)}}),S?.idx===U&&Ee(),k===U&&mt(),Qe(0)},[Qe,S,k]),xs=async(U,re)=>{const{requiresRedirect:oe}=e();if(oe){r();return}if(!t){r();return}try{const Se=(await nr.reactToBoard(U,{reactionType:re})).data;q(Bt=>{const uo=Bt.map[U];return uo?{...Bt,map:{...Bt.map,[U]:{...uo,likes:Se.likeCount,dislikes:Se.dislikeCount,userReaction:Se.userReaction}}}:Bt}),S?.idx===U&&y(Bt=>Bt&&{...Bt,likes:Se.likeCount,dislikes:Se.dislikeCount,userReaction:Se.userReaction})}catch(pe){const Se=pe.response?.data?.error||pe.message;alert(`반응 처리에 실패했습니다: ${Se}`)}},qi=p.useCallback((U,re)=>{q(oe=>{const pe=oe.map[U];return pe?{...oe,map:{...oe.map,[U]:{...pe,likes:re.likeCount,dislikes:re.dislikeCount,userReaction:re.userReaction}}}:oe}),y(oe=>oe&&oe.idx===U?{...oe,likes:re.likeCount,dislikes:re.dislikeCount,userReaction:re.userReaction}:oe)},[]),Sd=p.useCallback((U,re)=>{q(oe=>{const pe=oe.map[U];return pe?{...oe,map:{...oe.map,[U]:{...pe,views:re}}}:oe}),y(oe=>oe&&oe.idx===U?{...oe,views:re}:oe)},[]);return o&&Z.order.length===0?i.jsxs(Fv,{children:[i.jsx(Uv,{}),i.jsx(qv,{children:"커뮤니티 게시글을 불러오는 중..."})]}):i.jsxs(nz,{children:[i.jsxs(oz,{children:[i.jsxs(iz,{children:[i.jsx(az,{children:"💬"}),i.jsx(sz,{children:"커뮤니티"}),i.jsx(cz,{children:"반려동물과 함께하는 따뜻한 이야기"})]}),i.jsx(lz,{type:"button",onClick:et,children:"글쓰기"})]}),i.jsx(dz,{children:Hr.map(U=>i.jsxs(uz,{active:l===U.key,onClick:()=>u(U.key),$categoryColor:U.color,children:[i.jsx(hz,{children:U.icon}),U.label]},U.key))}),i.jsxs(Yz,{children:[i.jsxs(Xz,{children:[i.jsx(Zz,{type:"text",placeholder:"게시글 검색...",value:W,onChange:ve,onKeyPress:ke}),i.jsxs(Jz,{value:L,onChange:Q,children:[i.jsx("option",{value:"TITLE_CONTENT",children:"제목+내용"}),i.jsx("option",{value:"NICKNAME",children:"작성자"})]}),i.jsx(Qz,{onClick:()=>ae(0),disabled:ne,children:ne?"검색 중...":"🔍 검색"}),K&&i.jsx(eN,{onClick:be,children:"✕ 취소"})]}),K&&i.jsxs(tN,{children:["검색 결과: ",Rt.order.length," / ",_e,"개",W&&` (검색어: "${W}")`]})]}),i.jsxs(rN,{children:[i.jsx(nN,{children:"페이지당 게시글 수:"}),i.jsxs(oN,{children:[i.jsx(iu,{active:T===20,onClick:()=>te(20),children:"20"}),i.jsx(iu,{active:T===50,onClick:()=>te(50),children:"50"}),i.jsx(iu,{active:T===100,onClick:()=>te(100),children:"100"})]})]}),l==="자랑"&&i.jsxs(Tz,{children:[i.jsxs(Iz,{children:[i.jsx(Dz,{children:"인기 반려동물 자랑 TOP 30"}),i.jsxs(_z,{children:[i.jsx(Bv,{type:"button",active:D==="WEEKLY",onClick:()=>A("WEEKLY"),children:"주간"}),i.jsx(Bv,{type:"button",active:D==="MONTHLY",onClick:()=>A("MONTHLY"),children:"월간"})]})]}),F&&i.jsx(zv,{children:F}),N?i.jsxs(Fv,{children:[i.jsx(Uv,{}),i.jsxs(qv,{children:[D==="WEEKLY"?"주간":"월간"," 인기 게시글을 불러오는 중..."]})]}):i.jsx(Lz,{children:z.length===0?i.jsx(Wz,{children:D==="WEEKLY"?"아직 주간 인기 자랑글이 없어요.":"아직 월간 인기 자랑글이 없어요."}):i.jsx(Mz,{children:z.map(U=>i.jsxs(zz,{type:"button",onClick:()=>$d(U),children:[i.jsx(Nz,{children:U.ranking}),i.jsxs(Bz,{children:[i.jsx(Fz,{children:U.boardTitle||"제목 없음"}),i.jsxs(Uz,{children:[i.jsxs(ou,{children:["❤️ ",U.likeCount??0]}),i.jsxs(ou,{children:["💬 ",U.commentCount??0]}),i.jsxs(ou,{children:["👁️ ",U.viewCount??0]})]})]}),U.boardFilePath&&i.jsx(qz,{children:i.jsx("img",{src:U.boardFilePath,alt:U.boardTitle})})]},`${U.periodType}-${U.boardId}-${U.ranking}`))})})]}),s&&i.jsx(zv,{children:s}),er.length===0?i.jsxs(Hz,{children:[i.jsx(Vz,{children:"📭"}),i.jsx(Kz,{children:"아직 게시글이 없어요"}),i.jsx(Gz,{children:"첫 번째 게시글을 작성해보세요!"})]}):i.jsxs(i.Fragment,{children:[i.jsx(fz,{children:co.map(U=>{const re=$e(U.category),oe=U.category==="공지",pe=t&&t.idx===U.userId;return i.jsxs(pz,{$notice:oe,onClick:()=>Y(U),children:[i.jsx(mz,{children:U.boardFilePath?i.jsx("img",{src:U.boardFilePath,alt:U.title,loading:"lazy"}):i.jsx("span",{"aria-hidden":"true",children:re.icon})}),i.jsxs(gz,{children:[i.jsxs(xz,{children:[i.jsxs(jz,{$categoryColor:re.color,children:[i.jsx(kz,{children:re.icon}),re.label]}),i.jsx(Cz,{children:Nn(U.createdAt)}),i.jsxs(Sz,{children:["#",U.idx]})]}),i.jsx(vz,{children:U.title}),i.jsxs(yz,{children:[U.username||"알 수 없음",U.userLocation?` · 📍${U.userLocation}`:"",U.content?` · ${U.content}`:""]})]}),i.jsxs(bz,{onClick:Se=>Se.stopPropagation(),children:[i.jsxs(wz,{children:[i.jsxs(Nv,{type:"button",onClick:Se=>fe(U.idx,Se),children:[i.jsx(ru,{children:"❤️"}),i.jsx(nu,{children:U.likes??0})]}),i.jsxs(Nv,{type:"button",onClick:Se=>Ho(U,Se),children:[i.jsx(ru,{children:"💬"}),i.jsx(nu,{children:U.commentCount??0})]}),i.jsxs(Ez,{children:[i.jsx(ru,{children:"👁️"}),i.jsx(nu,{children:U.views??0})]})]}),i.jsxs($z,{children:[pe&&i.jsx(Az,{type:"button",onClick:Se=>dn(U,Se),children:"수정"}),pe&&i.jsx(Oz,{type:"button",onClick:Se=>st(U.idx,Se),children:"삭제"}),i.jsx(Pz,{type:"button",onClick:Se=>{Se.stopPropagation(),le(U.idx)},children:i.jsx(Rz,{children:"🚨"})})]})]})]},U.idx)})}),(K?_e:X)>0&&i.jsx(iN,{children:i.jsx(kr,{currentPage:K?je:M,totalCount:K?_e:X,pageSize:T,onPageChange:K?Ce:lo,loading:K?ne:o,showEdges:!0})})]}),i.jsx(wp,{isOpen:d,onClose:()=>f(!1),onSubmit:he,loading:m,currentUser:t}),i.jsx(nM,{isOpen:C,boardId:k,onClose:mt,onCommentAdded:Me,onBoardReaction:qi,onBoardViewUpdate:Sd,currentUser:t,onBoardDeleted:Vo,onBoardUpdated:un}),i.jsx(wp,{isOpen:x,onClose:()=>{v(!1),E(null)},onSubmit:Kr,loading:w,currentUser:t,initialData:b,mode:"edit"})]})},nz=h.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${e=>e.theme.spacing.xl} ${e=>e.theme.spacing.lg};
  min-height: 100vh;
`,oz=h.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${e=>e.theme.spacing.md};
  margin-bottom: ${e=>e.theme.spacing.xxl};
  padding-bottom: ${e=>e.theme.spacing.xl};
  border-bottom: 2px solid ${e=>e.theme.colors.borderLight};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,iz=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xs};
`,az=h.span`
  font-size: ${e=>e.theme.typography.h1.fontSize};
  margin-bottom: ${e=>e.theme.spacing.xs};
`,sz=h.h1`
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.h1.fontSize};
  font-weight: ${e=>e.theme.typography.h1.fontWeight};
  margin: 0;
  background: ${e=>e.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: ${e=>e.theme.typography.h2.fontSize};
  }
`,cz=h.p`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  margin: 0;
  margin-top: ${e=>e.theme.spacing.xs};
`,lz=h.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: ${e=>e.theme.spacing.xs};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.xl};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.full};
  background: linear-gradient(135deg, #e8714a 0%, #c9573a 100%);
  color: ${e=>e.theme.colors.textInverse};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${e=>e.theme.shadows.md};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${e=>e.theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    align-self: stretch;
    margin-top: 0;
    padding: ${e=>e.theme.spacing.md} ${e=>e.theme.spacing.lg};
    text-align: center;
    justify-content: center;
  }
`,dz=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.md};
  margin-bottom: ${e=>e.theme.spacing.xl};
  flex-wrap: wrap;
  padding-bottom: ${e=>e.theme.spacing.md};
`,uz=h.button`
  padding: 8px 16px;
  border-radius: 50px;
  border: 1.5px solid ${e=>e.active?e.theme.colors.primary:e.theme.colors.border};
  background: ${e=>e.active?e.theme.colors.primary:"transparent"};
  color: ${e=>e.active?"white":e.theme.colors.textSecondary};
  font-size: 13px;
  font-weight: ${e=>e.active?"600":"400"};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};

  &:hover {
    border-color: ${e=>e.theme.colors.primary};
    color: ${e=>e.theme.colors.primary};
  }
`,hz=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
`,fz=h.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 4px 20px 24px;

  @media (max-width: 768px) {
    padding: 4px 14px 24px;
  }
`,pz=h.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 6px;
  border-bottom: 1px solid ${e=>e.theme.colors.borderLight};
  cursor: pointer;
  transition: background 0.15s ease;
  background: ${e=>e.$notice?e.theme.colors.primary+"0F":"transparent"};

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
  }

  @media (max-width: 768px) {
    gap: 11px;
  }
`,mz=h.div`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  flex-shrink: 0;
  overflow: hidden;
  background: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.borderLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    font-size: 22px;
  }
`,gz=h.div`
  flex: 1;
  min-width: 0;
`,xz=h.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 5px;
`,vz=h.div`
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${e=>e.theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`,yz=h.div`
  font-size: 12.5px;
  color: ${e=>e.theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,bz=h.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 7px;
  flex-shrink: 0;
`,wz=h.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,$z=h.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    display: none;
  }
`,zv=h.div`
  background: ${e=>e.theme.colors.errorSoft};
  color: ${e=>e.theme.colors.error};
  border: 1px solid ${e=>e.theme.colors.error}33;
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing.md} ${e=>e.theme.spacing.lg};
  margin-bottom: ${e=>e.theme.spacing.lg};
  font-size: ${e=>e.theme.typography.body1.fontSize};
`,Sz=h.span`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.caption.fontSize};
  font-weight: 500;
  opacity: 0.7;
  white-space: nowrap;
`,jz=h.span`
  background: ${e=>`linear-gradient(135deg, ${e.$categoryColor} 0%, ${e.$categoryColor}dd 100%)`};
  color: ${e=>e.theme.colors.textInverse};
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.caption.fontSize};
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  width: fit-content;
  box-shadow: 0 2px 8px ${e=>`${e.$categoryColor}40`};
`,kz=h.span`
  font-size: ${e=>e.theme.typography.caption.fontSize};
`,Nv=h.button`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  background: none;
  border: 1px solid ${e=>e.theme.colors.border};
  color: ${e=>e.theme.colors.textSecondary};
  cursor: pointer;
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  border-radius: ${e=>e.theme.borderRadius.sm};
  transition: all 0.2s ease;
  min-width: fit-content;

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
    color: ${e=>e.theme.colors.primary};
    transform: scale(1.05);
  }
`,Ez=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  background: ${e=>e.theme.colors.surfaceElevated};
  border: 1px solid ${e=>e.theme.colors.border};
  color: ${e=>e.theme.colors.textSecondary};
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  border-radius: ${e=>e.theme.borderRadius.sm};
  min-width: fit-content;
`,ru=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
`,nu=h.span`
  font-weight: 600;
  font-size: ${e=>e.theme.typography.body2.fontSize};
`,Cz=h.span`
  color: ${e=>e.theme.colors.textLight};
  font-size: ${e=>e.theme.typography.caption.fontSize};
  white-space: nowrap;
  opacity: 0.85;
`,Pz=h.button`
  background: none;
  border: none;
  color: ${e=>e.theme.colors.textLight};
  cursor: pointer;
  padding: ${e=>e.theme.spacing.sm};
  border-radius: ${e=>e.theme.borderRadius.md};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${e=>e.theme.colors.error};
    background: ${e=>e.theme.colors.errorSoft};
    transform: scale(1.1);
  }
`,Az=h.button`
  background: none;
  border: 1px solid ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.primary};
  cursor: pointer;
  padding: ${e=>e.theme.spacing.sm};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
    transform: translateY(-1px);
  }
`,Oz=h.button`
  background: none;
  border: 1px solid ${e=>e.theme.colors.error};
  color: ${e=>e.theme.colors.error};
  cursor: pointer;
  padding: ${e=>e.theme.spacing.sm};
  border-radius: ${e=>e.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.errorSoft};
    transform: translateY(-1px);
  }
`,Rz=h.span`
  font-size: ${e=>e.theme.typography.body1.fontSize};
`,Tz=h.section`
  margin-bottom: ${e=>e.theme.spacing.xl};
  padding: ${e=>e.theme.spacing.lg};
  border: 1px solid ${e=>e.theme.colors.borderLight};
  border-radius: ${e=>e.theme.borderRadius.lg};
  background: ${e=>e.theme.colors.surfaceElevated};
`,Iz=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${e=>e.theme.spacing.md};
  margin-bottom: ${e=>e.theme.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`,Dz=h.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.h2.fontSize};
  color: ${e=>e.theme.colors.text};
`,_z=h.div`
  display: inline-flex;
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.full};
  border: 1px solid ${e=>e.theme.colors.borderLight};
  overflow: hidden;
`,Bv=h.button`
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  border: none;
  background: ${e=>e.active?e.theme.colors.primary:"transparent"};
  color: ${e=>e.active?e.theme.colors.textInverse:e.theme.colors.textSecondary};
  cursor: pointer;
  font-weight: 600;
  font-size: ${e=>e.theme.typography.body2.fontSize};
  transition: background 0.2s ease;

  &:hover {
    background: ${e=>e.active?e.theme.colors.primaryDark:e.theme.colors.surfaceHover};
  }
`,Lz=h.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: ${e=>e.theme.spacing.sm};
  
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${e=>e.theme.colors.surface};
    border-radius: ${e=>e.theme.borderRadius.md};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${e=>e.theme.colors.border};
    border-radius: ${e=>e.theme.borderRadius.md};
    
    &:hover {
      background: ${e=>e.theme.colors.textSecondary};
    }
  }
`,Mz=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.md};
  min-width: fit-content;
  padding: ${e=>e.theme.spacing.xs} 0;
`,zz=h.button`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.sm};
  padding: ${e=>e.theme.spacing.sm};
  border: 1px solid ${e=>e.theme.colors.borderLight};
  border-radius: ${e=>e.theme.borderRadius.md};
  background: ${e=>e.theme.colors.surface};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: left;
  flex-shrink: 0;
  width: 180px;
  min-width: 180px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${e=>e.theme.shadows.lg};
  }
`,Nz=h.span`
  font-size: ${e=>e.theme.typography.h2.fontSize};
  font-weight: 700;
  color: ${e=>e.theme.colors.primary};
  min-width: 20px;
`,Bz=h.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xs};
`,Fz=h.span`
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
  line-height: 1.3;
`,Uz=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.sm};
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  flex-wrap: wrap;
`,ou=h.span`
  display: inline-flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
`,qz=h.div`
  width: 48px;
  height: 48px;
  border-radius: ${e=>e.theme.borderRadius.sm};
  overflow: hidden;
  border: 1px solid ${e=>e.theme.colors.border};
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Wz=h.div`
  padding: ${e=>e.theme.spacing.lg};
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
`,Fv=h.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing.xxl};
  min-height: 400px;
  gap: ${e=>e.theme.spacing.lg};
`,Uv=h.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${e=>e.theme.colors.border};
  border-top-color: ${e=>e.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,qv=h.div`
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body1.fontSize};
`,Hz=h.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing.xxl};
  text-align: center;
  min-height: 400px;
  gap: ${e=>e.theme.spacing.md};
`,Vz=h.div`
  font-size: ${e=>e.theme.typography.hero.fontSize};
  margin-bottom: ${e=>e.theme.spacing.md};
`,Kz=h.div`
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.h3.fontSize};
  font-weight: 600;
`,Gz=h.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body1.fontSize};
`,Yz=h.div`
  margin-bottom: ${e=>e.theme.spacing.lg};
`,Xz=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.sm};
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing.sm};
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`,Zz=h.input`
  flex: 1;
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${e=>e.theme.colors.textLight};
  }
`,Jz=h.select`
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
  
  @media (max-width: 768px) {
    flex: 1;
    min-width: 120px;
  }
`,Qz=h.button`
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  background: ${e=>e.theme.colors.gradient};
  color: ${e=>e.theme.colors.textInverse};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${e=>e.theme.shadows.md};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,eN=h.button`
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
    color: ${e=>e.theme.colors.error};
  }
`,tN=h.div`
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
`,rN=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.md};
  padding: ${e=>e.theme.spacing.md} ${e=>e.theme.spacing.lg};
  margin-bottom: ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
`,nN=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: 500;
`,oN=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.xs};
`,iu=h.button`
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  background: ${e=>e.active?e.theme.colors.primary:"transparent"};
  color: ${e=>e.active?e.theme.colors.textInverse:e.theme.colors.text};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  font-weight: ${e=>e.active?600:400};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.active?e.theme.colors.primary:e.theme.colors.background};
    border-color: ${e=>e.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,iN=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing.xl} 0;
  margin-top: ${e=>e.theme.spacing.lg};
`;h.div`
  color-scheme: light;
  min-height: 100vh;
  display: flex;
  background: ${({theme:e})=>e.colors.background};

  @media (min-width: 1024px) {
    flex-direction: row;
  }

  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: max(40px, env(safe-area-inset-top, 40px)) 20px max(40px, env(safe-area-inset-bottom, 40px));
  }
`;h.aside`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex: 0 0 45%;
    flex-direction: column;
    justify-content: space-between;
    padding: 64px 56px;
    background: linear-gradient(135deg, #E8714A 0%, #C9573A 50%, #A8442C 100%);
    position: relative;
    overflow: hidden;
  }
`;const aN=h.div`
  font-size: 14px;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  position: relative;
  z-index: 1;
`,sN=h.div`
  position: relative;
  flex: 1;
  min-height: 320px;
`,Is=h.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  width: ${({$size:e=80})=>`${e}px`};
  height: ${({$size:e=80})=>`${e}px`};
  font-size: ${({$size:e=80})=>`${e*.5}px`};
  top: ${({$top:e})=>e??"auto"};
  left: ${({$left:e})=>e??"auto"};
  right: ${({$right:e})=>e??"auto"};
  bottom: ${({$bottom:e})=>e??"auto"};
  transform: rotate(${({$rotate:e=0})=>`${e}deg`});
`,cN=h.div`
  position: relative;
  z-index: 1;
`,lN=h.h2`
  font-size: 36px;
  font-weight: 700;
  line-height: 1.3;
  color: #ffffff;
  margin: 0;
  white-space: pre-line;
`;h.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: 1024px) {
    flex: 0 0 55%;
    padding: 64px 56px;
  }
`;const Wv=h.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`,Yj=h.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Xj=h.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 700;
  color: ${({theme:e})=>e.colors.primary};

  @media (min-width: 1024px) {
    display: none;
  }
`,Zj=h.h1`
  font-size: ${({theme:e})=>e.typography.h1.fontSize};
  font-weight: ${({theme:e})=>e.typography.h1.fontWeight};
  line-height: ${({theme:e})=>e.typography.h1.lineHeight};
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,Jj=h.p`
  font-size: 14px;
  color: ${({theme:e})=>e.colors.textSecondary};
  margin: 0;
`,Et=h.input`
  color-scheme: light;
  width: 100%;
  padding: 14px 20px;
  border: 1.5px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.pill};
  font-size: 15px;
  background: ${({theme:e})=>e.colors.background};
  color: ${({theme:e})=>e.colors.text};
  outline: none;
  transition: border-color ${({theme:e})=>e.duration.fast} ease,
              box-shadow ${({theme:e})=>e.duration.fast} ease;
  box-sizing: border-box;

  &:focus {
    border-color: ${({theme:e})=>e.colors.borderFocus};
    box-shadow: ${({theme:e})=>e.shadows.focus};
  }

  &::placeholder {
    color: ${({theme:e})=>e.colors.textMuted};
  }

  &:disabled {
    background: ${({theme:e})=>e.colors.surfaceSoft};
    color: ${({theme:e})=>e.colors.textLight};
    cursor: not-allowed;
  }
`,Ds=h.select`
  color-scheme: light;
  width: 100%;
  padding: 14px 20px;
  border: 1.5px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.pill};
  font-size: 15px;
  background: ${({theme:e})=>e.colors.background};
  color: ${({theme:e})=>e.colors.text};
  outline: none;
  cursor: pointer;
  transition: border-color ${({theme:e})=>e.duration.fast} ease;
  box-sizing: border-box;

  &:focus {
    border-color: ${({theme:e})=>e.colors.borderFocus};
  }

  &:disabled {
    background: ${({theme:e})=>e.colors.surfaceSoft};
    color: ${({theme:e})=>e.colors.textLight};
    cursor: not-allowed;
  }
`,$p=h.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #E8714A 0%, #C9573A 100%);
  color: #ffffff;
  border: none;
  border-radius: ${({theme:e})=>e.borderRadius.pill};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity ${({theme:e})=>e.duration.normal} ease,
              transform ${({theme:e})=>e.duration.fast} ease;

  &:hover:not(:disabled) {
    opacity: 0.92;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,au=h.button`
  width: 100%;
  padding: 14px;
  background: transparent;
  color: ${({theme:e})=>e.colors.primary};
  border: 1.5px solid ${({theme:e})=>e.colors.primary};
  border-radius: ${({theme:e})=>e.borderRadius.pill};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background ${({theme:e})=>e.duration.fast} ease;

  &:hover:not(:disabled) {
    background: ${({theme:e})=>e.colors.primarySoft};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;h.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
  background: ${({theme:e})=>e.colors.surfaceElevated};
  color: ${({theme:e})=>e.colors.text};
  border: 1.5px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.pill};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background ${({theme:e})=>e.duration.fast} ease;

  &:hover {
    background: ${({theme:e})=>e.colors.surfaceHover};
  }
`;h.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 800;
  color: #ffffff;
  background: ${({$provider:e,theme:t})=>t.colors.oauth[e]||t.colors.primary};
`;h.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 4px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({theme:e})=>e.colors.borderLight};
  }

  span {
    font-size: 13px;
    color: ${({theme:e})=>e.colors.textSecondary};
  }
`;const Qj=h.div`
  text-align: center;
  font-size: 14px;
  color: ${({theme:e})=>e.colors.textSecondary};

  button {
    background: none;
    border: none;
    color: ${({theme:e})=>e.colors.primary};
    font-weight: 600;
    cursor: pointer;
    padding: 0 4px;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`,dN=({onSwitchToRegister:e})=>{const{login:t}=dt(),[r,n]=p.useState({id:"",password:""}),[o,a]=p.useState(!1),[s,c]=p.useState(""),[l,u]=p.useState(""),[d,f]=p.useState(!1),[m,g]=p.useState(""),[x,v]=p.useState(!1),[b,E]=p.useState(""),[w,j]=p.useState(""),S=$=>{const{name:C,value:P}=$.target;n(z=>({...z,[C]:P})),s&&c("")},y=async $=>{$.preventDefault(),a(!0),c(""),u("");try{await t(r.id,r.password),u("로그인 성공!")}catch(C){if(C.response?.data?.errorCode==="USER_DORMANT"){if(window.confirm("장기간 미접속으로 휴면 처리된 계정입니다. 재활성화하시겠습니까?"))try{await t(r.id,r.password,!0),u("계정이 재활성화되었습니다. 로그인 성공!")}catch(z){console.error("재활성화 실패:",z),c(z.response?.data?.message||"재활성화 중 오류가 발생했습니다.")}a(!1);return}console.error("로그인 실패:",C),c(C.response?.data?.message||C.response?.data?.error||"로그인 중 오류가 발생했습니다.")}finally{a(!1)}},k=async $=>{if($.preventDefault(),!m||m.trim().length===0){E("이메일을 입력해주세요.");return}v(!0),E(""),j("");try{const C=await Zn.forgotPassword(m);C.success?(j(C.message||"비밀번호 재설정 링크가 이메일로 발송되었습니다. 이메일을 확인해주세요."),g("")):E(C.message||"비밀번호 재설정 이메일 발송에 실패했습니다.")}catch(C){console.error("비밀번호 찾기 실패:",C),E(C.response?.data?.message||"비밀번호 재설정 이메일 발송에 실패했습니다.")}finally{v(!1)}};return i.jsxs(i.Fragment,{children:[i.jsxs(Yj,{children:[i.jsx(Xj,{children:"🐾 Petory"}),i.jsx(Zj,{children:"로그인"}),i.jsx(Jj,{children:"반려동물과 함께하는 커뮤니티"})]}),i.jsx(uN,{children:"데모 모드: 아무 아이디/비밀번호로 로그인 가능"}),i.jsxs(hN,{onSubmit:y,children:[i.jsxs(su,{children:[i.jsx(cu,{htmlFor:"id",children:"아이디"}),i.jsx(Et,{type:"text",id:"id",name:"id",value:r.id,onChange:S,required:!0,disabled:o})]}),i.jsxs(su,{children:[i.jsx(cu,{htmlFor:"password",children:"비밀번호"}),i.jsx(Et,{type:"password",id:"password",name:"password",value:r.password,onChange:S,required:!0,disabled:o})]}),i.jsx(fN,{children:i.jsx("button",{type:"button",onClick:()=>f(!0),children:"비밀번호 찾기"})}),s&&i.jsx(Hv,{children:s}),l&&i.jsx(Vv,{children:l}),i.jsx($p,{type:"submit",disabled:o,children:o?"로그인 중...":"로그인"})]}),!1,i.jsxs(Qj,{children:["계정이 없으신가요?",i.jsx("button",{type:"button",onClick:()=>{e&&e()},children:"회원가입"})]}),d&&i.jsxs(pN,{children:[i.jsx(mN,{children:"비밀번호 찾기"}),i.jsxs(gN,{onSubmit:k,children:[i.jsxs(su,{children:[i.jsx(cu,{htmlFor:"forgotPasswordEmail",children:"이메일"}),i.jsx(Et,{type:"email",id:"forgotPasswordEmail",value:m,onChange:$=>{g($.target.value),E("")},placeholder:"가입하신 이메일을 입력하세요",required:!0,disabled:x})]}),b&&i.jsx(Hv,{children:b}),w&&i.jsx(Vv,{children:w}),i.jsxs(xN,{children:[i.jsx($p,{type:"submit",disabled:x,children:x?"발송 중...":"비밀번호 재설정 링크 보내기"}),i.jsx(vN,{type:"button",onClick:()=>{f(!1),g(""),E(""),j("")},disabled:x,children:"뒤로"})]})]})]})]})},uN=h.div`
  margin-bottom: 16px;
  padding: 10px 14px;
  background: #f0fdf4;
  color: #166534;
  border-radius: 8px;
  font-size: 13px;
`,hN=h.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,su=h.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,cu=h.label`
  font-size: 13px;
  font-weight: 600;
  color: #57534e;
`,Hv=h.div`
  color: #dc2626;
  font-size: 13px;
`,Vv=h.div`
  color: #16a34a;
  font-size: 13px;
`;h.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;const fN=h.div`
  text-align: right;

  button {
    background: none;
    border: none;
    color: #a8a29e;
    font-size: 13px;
    cursor: pointer;
    padding: 0;

    &:hover {
      color: #E8714A;
    }
  }
`,pN=h.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0efed;
`,mN=h.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1c1917;
  margin: 0 0 16px;
`,gN=h.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,xN=h.div`
  display: flex;
  gap: 10px;
`,vN=h.button`
  flex: 1;
  padding: 12px;
  background: #f5f5f4;
  color: #57534e;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover:not(:disabled) { background: #e7e5e4; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,yN=({onRegisterSuccess:e,onSwitchToLogin:t})=>{const{register:r}=dt(),[n,o]=p.useState({id:"",username:"",nickname:"",password:"",email:"",emailId:"",emailDomain:"gmail.com",customEmailDomain:"",role:"USER",location:"",petInfo:""}),[a,s]=p.useState([]),[c,l]=p.useState(!1),[u,d]=p.useState(""),[f,m]=p.useState(""),[g,x]=p.useState({checking:!1,available:null,message:""}),[v,b]=p.useState({checking:!1,available:null,message:""}),[E,w]=p.useState(!1),[j,S]=p.useState(!1),[y,k]=p.useState(!1),[$,C]=p.useState("");p.useEffect(()=>{const A=new URLSearchParams(window.location.search),M=A.get("emailVerified"),I=A.get("email");if(M==="true"&&I&&(w(!0),m("이메일 인증이 완료되었습니다. 회원가입을 진행해주세요."),window.history.replaceState({},"",window.location.pathname),I&&!n.emailId)){const T=I.split("@");T.length===2&&o(B=>({...B,emailId:T[0],emailDomain:T[1],email:I}))}},[]);const P=A=>{const{name:M,value:I}=A.target;o(T=>{const B={...T,[M]:I};if(M==="emailId"||M==="emailDomain"||M==="customEmailDomain"){const X=B.emailDomain==="custom"?B.emailId&&B.customEmailDomain?`${B.emailId}@${B.customEmailDomain}`:"":B.emailId&&B.emailDomain?`${B.emailId}@${B.emailDomain}`:"";B.email=X,(E||y)&&(w(!1),k(!1)),$&&C("")}return B}),u&&d(""),M==="nickname"&&x({checking:!1,available:null,message:""}),M==="id"&&b({checking:!1,available:null,message:""})},z=async()=>{if(!n.id||n.id.trim().length===0){b({checking:!1,available:!1,message:"아이디를 입력해주세요."});return}b({checking:!0,available:null,message:"확인 중..."});try{const A=await yr.checkIdAvailability(n.id);b({checking:!1,available:A.data.available,message:A.data.message})}catch(A){console.error("아이디 중복 검사 실패:",A),b({checking:!1,available:!1,message:"아이디 중복 검사 중 오류가 발생했습니다."})}},_=async()=>{if(!n.nickname||n.nickname.trim().length===0){x({checking:!1,available:!1,message:"닉네임을 입력해주세요."});return}if(n.nickname.length>50){x({checking:!1,available:!1,message:"닉네임은 50자 이하여야 합니다."});return}x({checking:!0,available:null,message:"확인 중..."});try{const A=await yr.checkNicknameAvailability(n.nickname);x({checking:!1,available:A.data.available,message:A.data.message})}catch(A){console.error("닉네임 중복 검사 실패:",A),x({checking:!1,available:!1,message:"닉네임 중복 검사 중 오류가 발생했습니다."})}},N=()=>{s([...a,{petName:"",petType:"DOG",customPetType:"",breed:"",gender:"UNKNOWN",age:"",color:"",weight:"",isNeutered:!1,birthDate:"",healthInfo:"",specialNotes:""}])},R=A=>{s(a.filter((M,I)=>I!==A))},F=(A,M,I)=>{const T=[...a];T[A]={...T[A],[M]:I},s(T)},O=async()=>{if(!n.emailId||n.emailId.trim().length===0){C("이메일 아이디를 입력해주세요.");return}if(!n.emailDomain||n.emailDomain.trim().length===0){C("이메일 도메인을 선택해주세요.");return}if(n.emailDomain==="custom"&&(!n.customEmailDomain||n.customEmailDomain.trim().length===0)){C("이메일 도메인을 입력해주세요.");return}const A=n.emailDomain==="custom"?`${n.emailId}@${n.customEmailDomain}`:`${n.emailId}@${n.emailDomain}`;S(!0),C(""),m("");try{const M=await yr.sendPreRegistrationVerificationEmail(A);M.data&&M.data.success===!1?(C(M.data.message||"이메일 발송에 실패했습니다."),k(!1)):(k(!0),C(""),m("이메일 인증 메일이 발송되었습니다. 이메일을 확인해주세요."))}catch(M){console.error("이메일 인증 메일 발송 실패:",M),C(M.response?.data?.message||"이메일 발송에 실패했습니다."),k(!1)}finally{S(!1)}};p.useEffect(()=>{if(!E&&y&&n.email){const M=setInterval(async()=>{try{(await yr.checkPreRegistrationVerification(n.email)).data.verified&&(w(!0),m("이메일 인증이 완료되었습니다. 회원가입을 진행해주세요."))}catch{}},3e3);return()=>clearInterval(M)}},[n.email,E,y]);const D=async A=>{if(A.preventDefault(),!n.id||n.id.trim().length===0){d("아이디를 입력해주세요.");return}if(v.available===null){d("아이디 중복 검사를 먼저 해주세요.");return}if(!v.available){d("사용할 수 없는 아이디입니다.");return}if(!n.emailId||n.emailId.trim().length===0){d("이메일 아이디를 입력해주세요.");return}if(!n.emailDomain||n.emailDomain.trim().length===0){d("이메일 도메인을 선택해주세요.");return}if(n.emailDomain==="custom"&&(!n.customEmailDomain||n.customEmailDomain.trim().length===0)){d("이메일 도메인을 입력해주세요.");return}const M=n.emailDomain==="custom"?`${n.emailId}@${n.customEmailDomain}`:`${n.emailId}@${n.emailDomain}`;if(!n.nickname||n.nickname.trim().length===0){d("닉네임은 필수입니다.");return}if(g.available===null){d("닉네임 중복 검사를 먼저 해주세요.");return}if(!g.available){d("사용할 수 없는 닉네임입니다.");return}if(!E){const X=`이메일 인증을 하지 않으면 다음 기능들이 제한됩니다:

${["게시글 수정/삭제","댓글 수정/삭제","펫케어 서비스 이용","모임 생성/참여","리뷰 작성","실종 제보 작성"].join(`
`)}

그래도 회원가입을 진행하시겠습니까?`;if(!window.confirm(X)){d("이메일 인증을 완료한 후 회원가입을 진행해주세요. 이메일 인증 버튼을 클릭하여 인증 메일을 받아주세요.");return}}for(let B=0;B<a.length;B++){const X=a[B];if(!X.petName||X.petName.trim().length===0){d(`반려동물 ${B+1}의 이름을 입력해주세요.`);return}if(!X.petType){d(`반려동물 ${B+1}의 종류를 선택해주세요.`);return}if(X.petType==="ETC"&&(!X.customPetType||X.customPetType.trim().length===0)){d(`반려동물 ${B+1}의 종류를 입력해주세요.`);return}}const I=a.length>0?a.map(B=>{const X={DOG:"강아지",CAT:"고양이",BIRD:"새",RABBIT:"토끼",HAMSTER:"햄스터",ETC:"기타"};return`${B.petName}(${X[B.petType]||"기타"})${B.breed?` - ${B.breed}`:""}`}).join(", "):"",T={...n,email:M,petInfo:I};l(!0),d(""),m("");try{const B=await r(T);m(E?"회원가입 성공! 이메일 인증이 완료되어 모든 기능을 이용하실 수 있습니다. 로그인해주세요.":"회원가입 성공! 입력하신 이메일로 인증 메일이 발송되었습니다. 이메일 인증을 완료하면 더 많은 기능을 이용할 수 있습니다."),e&&e(B.user||B)}catch(B){console.error("회원가입 실패:",B),d(B.response?.data?.error||"회원가입 중 오류가 발생했습니다.")}finally{l(!1)}};return i.jsxs(i.Fragment,{children:[i.jsxs(Yj,{children:[i.jsx(Xj,{children:"🐾 Petory"}),i.jsx(Zj,{children:"회원가입"}),i.jsx(Jj,{children:"몇 가지 정보만 입력하면 시작할 수 있어요"})]}),i.jsxs(bN,{onSubmit:D,children:[i.jsxs(Bn,{children:[i.jsx(Fn,{htmlFor:"id",children:"아이디 *"}),i.jsxs(Kv,{children:[i.jsx(Et,{type:"text",id:"id",name:"id",value:n.id,onChange:P,required:!0,disabled:c,placeholder:"아이디를 입력하세요"}),i.jsx(au,{type:"button",onClick:z,disabled:c||v.checking||!n.id,children:v.checking?"확인 중...":"중복 확인"})]}),v.message&&i.jsx(Gv,{available:v.available,children:v.message})]}),i.jsxs(Bn,{children:[i.jsx(Fn,{htmlFor:"username",children:"이름 *"}),i.jsx(Et,{type:"text",id:"username",name:"username",value:n.username,onChange:P,required:!0,disabled:c})]}),i.jsxs(Bn,{children:[i.jsx(Fn,{htmlFor:"nickname",children:"닉네임 *"}),i.jsxs(Kv,{children:[i.jsx(Et,{type:"text",id:"nickname",name:"nickname",value:n.nickname,onChange:P,required:!0,disabled:c,placeholder:"닉네임을 입력하세요",maxLength:50}),i.jsx(au,{type:"button",onClick:_,disabled:c||g.checking||!n.nickname,children:g.checking?"확인 중...":"중복 확인"})]}),g.message&&i.jsx(Gv,{available:g.available,children:g.message})]}),i.jsxs(Bn,{children:[i.jsx(Fn,{htmlFor:"password",children:"비밀번호 *"}),i.jsx(Et,{type:"password",id:"password",name:"password",value:n.password,onChange:P,required:!0,disabled:c})]}),i.jsxs(Bn,{children:[i.jsx(Fn,{htmlFor:"email",children:"이메일 *"}),i.jsxs(RN,{children:[i.jsx(Et,{type:"text",id:"emailId",name:"emailId",value:n.emailId,onChange:P,placeholder:"이메일 아이디",required:!0,disabled:c,style:{flex:1,minWidth:0}}),i.jsx(TN,{children:"@"}),i.jsxs(Ds,{id:"emailDomain",name:"emailDomain",value:n.emailDomain,onChange:P,disabled:c,required:!0,style:{flex:1,minWidth:0},children:[i.jsx("option",{value:"gmail.com",children:"gmail.com"}),i.jsx("option",{value:"naver.com",children:"naver.com"}),i.jsx("option",{value:"daum.net",children:"daum.net"}),i.jsx("option",{value:"kakao.com",children:"kakao.com"}),i.jsx("option",{value:"hanmail.net",children:"hanmail.net"}),i.jsx("option",{value:"nate.com",children:"nate.com"}),i.jsx("option",{value:"outlook.com",children:"outlook.com"}),i.jsx("option",{value:"yahoo.com",children:"yahoo.com"}),i.jsx("option",{value:"custom",children:"직접 입력"})]}),n.emailDomain==="custom"&&i.jsx(Et,{type:"text",name:"customEmailDomain",value:n.customEmailDomain||"",onChange:A=>{const M=A.target.value;o(I=>({...I,customEmailDomain:M,email:I.emailId&&M?`${I.emailId}@${M}`:""}))},placeholder:"도메인 입력 (예: example.com)",disabled:c,required:!0,style:{flex:1,minWidth:0}})]}),$&&i.jsx(IN,{children:$}),E?i.jsx(Xv,{verified:!0,children:"✓ 이메일 인증 완료"}):i.jsxs(i.Fragment,{children:[i.jsx(Xv,{verified:!1,children:"⚠ 이메일 인증을 완료하면 더 많은 기능을 이용할 수 있습니다"}),i.jsx(au,{type:"button",onClick:O,disabled:c||j||!n.emailId||!n.emailDomain,children:j?"발송 중...":y?"인증 메일 재발송":"이메일 인증 메일 발송"}),y&&!E&&i.jsxs(DN,{children:["이메일 인증 메일이 발송되었습니다. 이메일을 확인하여 인증을 완료해주세요.",i.jsx("br",{}),"인증 완료 후 자동으로 인증 상태가 업데이트됩니다."]})]})]}),i.jsxs(Bn,{children:[i.jsx(Fn,{htmlFor:"role",children:"역할 *"}),i.jsxs(Ds,{id:"role",name:"role",value:n.role,onChange:P,disabled:c,required:!0,children:[i.jsx("option",{value:"USER",children:"🐾 일반 사용자 (펫케어 서비스 이용)"}),i.jsx("option",{value:"SERVICE_PROVIDER",children:"🏥 서비스 제공자 (펫케어 서비스 제공)"})]})]}),i.jsxs(Bn,{children:[i.jsx(Fn,{htmlFor:"location",children:"지역"}),i.jsx(Et,{type:"text",id:"location",name:"location",value:n.location,onChange:P,placeholder:"예: 서울시 강남구",disabled:c})]}),i.jsxs(Bn,{children:[i.jsx(Fn,{children:"반려동물 정보"}),i.jsxs(SN,{children:[a.map((A,M)=>i.jsxs(jN,{children:[i.jsxs(kN,{children:[i.jsxs(EN,{children:["반려동물 ",M+1]}),i.jsx(CN,{type:"button",onClick:()=>R(M),disabled:c,children:"✕"})]}),i.jsxs(PN,{children:[i.jsxs(po,{children:[i.jsxs(Or,{children:[i.jsx(Rr,{children:"이름 *"}),i.jsx(Et,{type:"text",value:A.petName,onChange:I=>F(M,"petName",I.target.value),placeholder:"반려동물 이름",disabled:c,maxLength:50,required:!0})]}),i.jsxs(Or,{children:[i.jsx(Rr,{children:"종류 *"}),i.jsxs(Ds,{value:A.petType,onChange:I=>F(M,"petType",I.target.value),disabled:c,required:!0,children:[i.jsx("option",{value:"DOG",children:"강아지"}),i.jsx("option",{value:"CAT",children:"고양이"}),i.jsx("option",{value:"BIRD",children:"새"}),i.jsx("option",{value:"RABBIT",children:"토끼"}),i.jsx("option",{value:"HAMSTER",children:"햄스터"}),i.jsx("option",{value:"ETC",children:"기타"})]}),A.petType==="ETC"&&i.jsx(Et,{type:"text",value:A.customPetType,onChange:I=>F(M,"customPetType",I.target.value),placeholder:"어떤 펫인지 입력해주세요 (예: 햄스터, 토끼 등)",disabled:c,required:!0,style:{marginTop:"0.5rem"}})]})]}),i.jsxs(po,{children:[i.jsxs(Or,{children:[i.jsx(Rr,{children:"품종"}),i.jsx(Et,{type:"text",value:A.breed,onChange:I=>F(M,"breed",I.target.value),placeholder:"예: 골든 리트리버",disabled:c,maxLength:50})]}),i.jsxs(Or,{children:[i.jsx(Rr,{children:"성별"}),i.jsxs(Ds,{value:A.gender,onChange:I=>F(M,"gender",I.target.value),disabled:c,children:[i.jsx("option",{value:"UNKNOWN",children:"미확인"}),i.jsx("option",{value:"M",children:"수컷"}),i.jsx("option",{value:"F",children:"암컷"})]})]})]}),i.jsxs(po,{children:[i.jsxs(Or,{children:[i.jsx(Rr,{children:"나이"}),i.jsx(Et,{type:"text",value:A.age,onChange:I=>F(M,"age",I.target.value),placeholder:"예: 3살, 5개월",disabled:c,maxLength:30})]}),i.jsxs(Or,{children:[i.jsx(Rr,{children:"색상/털색"}),i.jsx(Et,{type:"text",value:A.color,onChange:I=>F(M,"color",I.target.value),placeholder:"예: 갈색, 흰색",disabled:c,maxLength:50})]})]}),i.jsxs(po,{children:[i.jsxs(Or,{children:[i.jsx(Rr,{children:"몸무게 (kg)"}),i.jsx(Et,{type:"number",step:"0.1",min:"0",value:A.weight,onChange:I=>F(M,"weight",I.target.value),placeholder:"예: 5.5",disabled:c})]}),i.jsxs(Or,{children:[i.jsx(Rr,{children:"생년월일"}),i.jsx(Et,{type:"date",value:A.birthDate,onChange:I=>F(M,"birthDate",I.target.value),disabled:c})]})]}),i.jsx(po,{children:i.jsx(Or,{children:i.jsxs(Rr,{children:[i.jsx(ON,{type:"checkbox",checked:A.isNeutered,onChange:I=>F(M,"isNeutered",I.target.checked),disabled:c}),"중성화 여부"]})})}),i.jsx(po,{children:i.jsxs(Or,{style:{flex:"1 1 100%"},children:[i.jsx(Rr,{children:"건강 정보"}),i.jsx(Yv,{value:A.healthInfo,onChange:I=>F(M,"healthInfo",I.target.value),placeholder:"질병, 알레르기, 특이사항 등",disabled:c,rows:2})]})}),i.jsx(po,{children:i.jsxs(Or,{style:{flex:"1 1 100%"},children:[i.jsx(Rr,{children:"특이사항"}),i.jsx(Yv,{value:A.specialNotes,onChange:I=>F(M,"specialNotes",I.target.value),placeholder:"성격, 주의사항 등",disabled:c,rows:2})]})})]})]},M)),i.jsx(AN,{type:"button",onClick:N,disabled:c,children:"+ 반려동물 추가"})]})]}),u&&i.jsx(wN,{children:u}),f&&i.jsx($N,{children:f}),i.jsx($p,{type:"submit",disabled:c,children:c?"회원가입 중...":"회원가입"})]}),i.jsxs(Qj,{children:["이미 계정이 있으신가요?",i.jsx("button",{type:"button",onClick:()=>{t&&t()},children:"로그인"})]})]})},bN=h.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,Bn=h.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
`,Fn=h.label`
  font-weight: 600;
  font-size: 13px;
  color: ${({theme:e})=>e.colors.text};
`,wN=h.div`
  color: ${({theme:e})=>e.colors.error};
  font-size: 13px;
  margin-top: 4px;
`,$N=h.div`
  color: ${({theme:e})=>e.colors.success};
  font-size: 13px;
  margin-top: 4px;
`,Kv=h.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.sm};
  align-items: flex-start;
`,Gv=h.div`
  font-size: 13px;
  margin-top: 4px;
  color: ${({theme:e,available:t})=>t?e.colors.success:e.colors.error};
`,SN=h.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,jN=h.div`
  border: 1.5px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.xl};
  padding: ${({theme:e})=>e.spacing.lg};
  background: ${({theme:e})=>e.colors.surface};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({theme:e})=>e.colors.primary};
    box-shadow: ${({theme:e})=>e.shadows.sm};
  }
`,kN=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({theme:e})=>e.spacing.md};
`,EN=h.h4`
  margin: 0;
  color: ${({theme:e})=>e.colors.text};
  font-size: 14px;
  font-weight: 600;
`,CN=h.button`
  background: ${({theme:e})=>e.colors.error};
  color: #fff;
  border: none;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({theme:e})=>e.colors.errorDark};
    transform: scale(1.1);
  }

  &:disabled {
    background: ${({theme:e})=>e.colors.textLight};
    cursor: not-allowed;
  }
`,PN=h.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.md};
`,po=h.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,Or=h.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.xs};
`,Rr=h.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,AN=h.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #E8714A 0%, #C9573A 100%);
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({theme:e})=>e.spacing.sm};

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ON=h.input`
  margin-right: ${({theme:e})=>e.spacing.sm};
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${({theme:e})=>e.colors.primary};

  &:disabled { cursor: not-allowed; }
`,Yv=h.textarea`
  padding: 8px 12px;
  border: 1.5px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  font-size: 13px;
  font-family: inherit;
  background: ${({theme:e})=>e.colors.background};
  color: ${({theme:e})=>e.colors.text};
  resize: vertical;
  transition: border-color 0.2s ease;
  outline: none;

  &:focus {
    border-color: ${({theme:e})=>e.colors.primary};
    box-shadow: 0 0 0 3px ${({theme:e})=>e.colors.primary}20;
  }

  &:disabled {
    background: ${({theme:e})=>e.colors.surfaceSoft};
    cursor: not-allowed;
  }
`,RN=h.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing.sm};
  flex-wrap: wrap;
`,TN=h.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textSecondary};
  white-space: nowrap;
`,IN=h.div`
  margin-top: ${({theme:e})=>e.spacing.sm};
  padding: ${({theme:e})=>e.spacing.sm};
  font-size: 13px;
  color: ${({theme:e})=>e.colors.error};
  font-weight: 500;
  background: ${({theme:e})=>e.colors.error}10;
  border-left: 3px solid ${({theme:e})=>e.colors.error};
  border-radius: ${({theme:e})=>e.borderRadius.sm};
`,Xv=h.div`
  margin-top: ${({theme:e})=>e.spacing.sm};
  padding: ${({theme:e})=>e.spacing.sm};
  font-size: 13px;
  color: ${({theme:e,verified:t})=>t?e.colors.success:e.colors.warning};
  font-weight: ${({verified:e})=>e?"600":"500"};
`,DN=h.div`
  margin-top: ${({theme:e})=>e.spacing.sm};
  padding: ${({theme:e})=>e.spacing.md};
  background: ${({theme:e})=>e.colors.info}15;
  border-left: 3px solid ${({theme:e})=>e.colors.info};
  border-radius: ${({theme:e})=>e.borderRadius.sm};
  font-size: 13px;
  color: ${({theme:e})=>e.colors.infoDark};
  line-height: 1.5;
`,_N=({mode:e,loginContent:t,registerContent:r})=>i.jsxs(LN,{children:[i.jsxs(MN,{$mode:e,children:[i.jsx(aN,{children:"PETORY"}),i.jsxs(sN,{children:[i.jsx(Is,{$size:80,$top:"10%",$left:"18%",$rotate:-8,children:"🐶"}),i.jsx(Is,{$size:68,$top:"38%",$right:"14%",$rotate:6,children:"🐱"}),i.jsx(Is,{$size:92,$top:"58%",$left:"8%",$rotate:-4,children:"🐾"}),i.jsx(Is,{$size:60,$bottom:"12%",$right:"22%",$rotate:10,children:"🦴"})]}),i.jsx(cN,{children:i.jsx(lN,{children:`반려동물과 함께하는
모든 순간`})})]}),i.jsx(zN,{$mode:e,children:i.jsxs(NN,{children:[i.jsx(Zv,{$active:e==="login","aria-hidden":e!=="login",children:i.jsx(Wv,{children:t})}),i.jsx(Zv,{$active:e==="register","aria-hidden":e!=="register",children:i.jsx(Wv,{children:r})})]})})]}),_c="cubic-bezier(0.4, 0, 0.2, 1)",Lc="0.6s",LN=h.div`
  color-scheme: light;
  min-height: 100vh;
  display: flex;
  background: ${({theme:e})=>e.colors.background};
  position: relative;
  overflow-x: hidden;

  @media (min-width: 1024px) {
    flex-direction: row;
  }

  @media (max-width: 1023px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: max(40px, env(safe-area-inset-top, 40px)) 20px max(40px, env(safe-area-inset-bottom, 40px));
  }
`,MN=h.aside`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex: 0 0 45%;
    flex-direction: column;
    justify-content: space-between;
    padding: 64px 56px;
    background: linear-gradient(135deg, #E8714A 0%, #C9573A 50%, #A8442C 100%);
    position: relative;
    overflow: hidden;
    transform: translateX(${({$mode:e})=>e==="login"?"0%":"122.222%"});
    transition: transform ${Lc} ${_c};
    will-change: transform;
  }
`,zN=h.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (min-width: 1024px) {
    flex: 0 0 55%;
    padding: 64px 56px;
    transform: translateX(${({$mode:e})=>e==="login"?"0%":"-81.818%"});
    transition: transform ${Lc} ${_c};
    will-change: transform;
  }

  @media (max-width: 1023px) {
    padding: 0;
  }
`,NN=h.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`,Zv=h.div`
  grid-column: 1;
  grid-row: 1;
  align-self: start;
  width: 100%;
  max-height: calc(100vh - 128px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
  opacity: ${({$active:e})=>e?1:0};
  pointer-events: ${({$active:e})=>e?"auto":"none"};
  transform: translateY(${({$active:e})=>e?"0":"8px"});
  transition: opacity ${Lc} ${_c},
              transform ${Lc} ${_c};
  will-change: opacity, transform;

  /* 얇은 스크롤바 (스크롤 필요 시에만 노출) */
  scrollbar-width: thin;
  scrollbar-color: ${({theme:e})=>e.colors.border} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({theme:e})=>e.colors.border};
    border-radius: 3px;
  }

  @media (max-width: 1023px) {
    max-height: none;
    overflow: visible;
    padding-right: 0;
  }
`,BN=({onComplete:e})=>{const{updateUserProfile:t}=dt(),[r,n]=p.useState(""),[o,a]=p.useState(!1),[s,c]=p.useState(""),[l,u]=p.useState({checking:!1,available:null,message:""}),d=g=>{const x=g.target.value;n(x),c(""),u({checking:!1,available:null,message:""})},f=async()=>{if(!r||r.trim().length===0){u({checking:!1,available:!1,message:"닉네임을 입력해주세요."});return}if(r.length>50){u({checking:!1,available:!1,message:"닉네임은 50자 이하여야 합니다."});return}u({checking:!0,available:null,message:"확인 중..."});try{const g=await yr.checkNicknameAvailability(r);u({checking:!1,available:g.data.available,message:g.data.message})}catch(g){console.error("닉네임 중복 검사 실패:",g),u({checking:!1,available:!1,message:"닉네임 중복 검사 중 오류가 발생했습니다."})}},m=async g=>{if(g.preventDefault(),!r||r.trim().length===0){c("닉네임을 입력해주세요.");return}if(l.available===null){c("닉네임 중복 검사를 먼저 해주세요.");return}if(!l.available){c("사용할 수 없는 닉네임입니다.");return}a(!0),c("");try{await yr.setNickname(r),t&&await t(),e&&e()}catch(x){console.error("닉네임 설정 실패:",x),c(x.response?.data?.error||"닉네임 설정 중 오류가 발생했습니다.")}finally{a(!1)}};return i.jsx(FN,{children:i.jsxs(UN,{children:[i.jsx(qN,{children:"닉네임 설정"}),i.jsx(WN,{children:"서비스를 이용하기 위해 닉네임을 설정해주세요."}),i.jsxs(HN,{onSubmit:m,children:[i.jsxs(VN,{children:[i.jsx(KN,{htmlFor:"nickname",children:"닉네임 *"}),i.jsxs(GN,{children:[i.jsx(YN,{type:"text",id:"nickname",value:r,onChange:d,placeholder:"닉네임을 입력하세요",maxLength:50,disabled:o,required:!0}),i.jsx(XN,{type:"button",onClick:f,disabled:o||l.checking||!r,children:l.checking?"확인 중...":"중복 확인"})]}),l.message&&i.jsx(ZN,{available:l.available,children:l.message})]}),s&&i.jsx(QN,{children:s}),i.jsx(JN,{type:"submit",disabled:o||!l.available,children:o?"설정 중...":"닉네임 설정 완료"})]})]})})},FN=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: ${({theme:e})=>e.colors.surfaceSoft};
`,UN=h.div`
  max-width: 500px;
  width: 100%;
  padding: 2.5rem;
  background: ${({theme:e})=>e.colors.background};
  border-radius: ${({theme:e})=>e.borderRadius.xl};
  box-shadow: ${({theme:e})=>e.shadows.lg};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`,qN=h.h2`
  text-align: center;
  margin-bottom: ${({theme:e})=>e.spacing.sm};
  color: ${({theme:e})=>e.colors.text};
  font-size: ${({theme:e})=>e.typography.h2.fontSize};
  font-weight: ${({theme:e})=>e.typography.h2.fontWeight};
`,WN=h.p`
  text-align: center;
  margin-bottom: 2rem;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: 14px;
`,HN=h.form`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.lg};
`,VN=h.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing.sm};
`,KN=h.label`
  font-weight: 600;
  font-size: 13px;
  color: ${({theme:e})=>e.colors.text};
`,GN=h.div`
  display: flex;
  gap: ${({theme:e})=>e.spacing.sm};
  align-items: flex-start;
`,YN=h.input`
  flex: 1;
  padding: 10px 14px;
  border: 1.5px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  font-size: 14px;
  background: ${({theme:e})=>e.colors.background};
  color: ${({theme:e})=>e.colors.text};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;

  &::placeholder { color: ${({theme:e})=>e.colors.textLight}; }

  &:focus {
    border-color: ${({theme:e})=>e.colors.primary};
    box-shadow: 0 0 0 3px ${({theme:e})=>e.colors.primary}25;
  }

  &:disabled {
    background: ${({theme:e})=>e.colors.surfaceSoft};
    cursor: not-allowed;
  }
`,XN=h.button`
  padding: 10px 14px;
  background: ${({theme:e})=>e.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({theme:e})=>e.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${({theme:e})=>e.colors.surfaceHover};
    color: ${({theme:e})=>e.colors.textLight};
    cursor: not-allowed;
    transform: none;
  }
`,ZN=h.div`
  font-size: 13px;
  margin-top: 4px;
  color: ${({theme:e,available:t})=>t?e.colors.success:e.colors.error};
`,JN=h.button`
  padding: 11px 20px;
  background: ${({theme:e})=>e.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: ${({theme:e})=>e.spacing.sm};

  &:hover:not(:disabled) {
    background: ${({theme:e})=>e.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({theme:e})=>e.colors.primary}40;
  }

  &:active:not(:disabled) { transform: translateY(0); }

  &:disabled {
    background: ${({theme:e})=>e.colors.surfaceHover};
    color: ${({theme:e})=>e.colors.textLight};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,QN=h.div`
  color: ${({theme:e})=>e.colors.error};
  font-size: 13px;
  margin-top: 4px;
`,eB=()=>{const{updateUserProfile:e}=dt(),[t,r]=p.useState("processing"),[n,o]=p.useState("로그인 처리 중...");p.useEffect(()=>{(async()=>{try{const c=new URLSearchParams(window.location.search),l=c.get("accessToken"),u=c.get("refreshToken"),d=c.get("success"),f=c.get("error"),m=c.get("needsNickname");if(f){r("error"),o(decodeURIComponent(f)),setTimeout(()=>{window.location.href="/"},3e3);return}if(d==="true"&&l&&u){if(Zn.setToken(l),Zn.setRefreshToken(u),m==="true"){r("nickname-setup");return}try{const g=await Zn.validateToken();if(g.valid&&g.user){if(!g.user.nickname||g.user.nickname.trim().length===0){r("nickname-setup");return}r("success"),o("로그인 성공! 잠시 후 메인 페이지로 이동합니다..."),setTimeout(()=>{window.location.href=window.location.origin},1500)}else throw new Error("사용자 정보를 가져올 수 없습니다.")}catch(g){console.error("사용자 정보 가져오기 실패:",g),r("error"),o("사용자 정보를 가져오는 중 오류가 발생했습니다."),setTimeout(()=>{window.location.href=window.location.origin},3e3)}}else r("error"),o("로그인 처리 중 오류가 발생했습니다."),setTimeout(()=>{window.location.href="/"},3e3)}catch(c){console.error("OAuth2 콜백 처리 실패:",c),r("error"),o("로그인 처리 중 오류가 발생했습니다."),setTimeout(()=>{window.location.href="/"},3e3)}})()},[e]);const a=()=>{r("success"),o("닉네임 설정 완료! 잠시 후 메인 페이지로 이동합니다..."),setTimeout(()=>{window.location.href=window.location.origin},1500)};return t==="nickname-setup"?i.jsx(BN,{onComplete:a}):i.jsx(tB,{children:i.jsxs(rB,{children:[t==="processing"&&i.jsxs(i.Fragment,{children:[i.jsx(nB,{}),i.jsx(lu,{children:n})]}),t==="success"&&i.jsxs(i.Fragment,{children:[i.jsx(oB,{children:"✓"}),i.jsx(lu,{success:!0,children:n})]}),t==="error"&&i.jsxs(i.Fragment,{children:[i.jsx(iB,{children:"✗"}),i.jsx(lu,{error:!0,children:n})]})]})})},tB=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`,rB=h.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem;
  background: ${({theme:e})=>e.colors.surfaceElevated};
  border-radius: 12px;
  box-shadow: ${({theme:e})=>e.shadows.lg};
  min-width: 300px;
`,nB=h.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${({theme:e})=>e.colors.border};
  border-top: 4px solid ${({theme:e})=>e.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,oB=h.div`
  width: 50px;
  height: 50px;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  background: ${({theme:e})=>e.colors.success};
  color: ${({theme:e})=>e.colors.textInverse};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`,iB=h.div`
  width: 50px;
  height: 50px;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  background: ${({theme:e})=>e.colors.error};
  color: ${({theme:e})=>e.colors.textInverse};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`,lu=h.p`
  font-size: 1rem;
  text-align: center;
  color: ${({theme:e,success:t,error:r})=>t?e.colors.success:r?e.colors.error:e.colors.text};
`,ek=({isOpen:e,onClose:t})=>e?i.jsx(aB,{onClick:t,"aria-hidden":"true",children:i.jsxs(sB,{role:"dialog","aria-modal":"true",onClick:r=>r.stopPropagation(),children:[i.jsxs(cB,{children:[i.jsx(lB,{children:"⚠️"}),i.jsx(dB,{children:"권한 없음"})]}),i.jsxs(uB,{children:[i.jsx(hB,{children:"당신 접근하면 안돼요!"}),i.jsx(fB,{children:"이 기능을 사용하려면 적절한 권한이 필요합니다."})]}),i.jsx(pB,{children:i.jsx(mB,{onClick:t,children:"확인"})})]})}):null,aB=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`,sB=h.div`
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.xl};
  padding: ${e=>e.theme.spacing.xl};
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,cB=h.div`
  text-align: center;
  margin-bottom: ${e=>e.theme.spacing.lg};
`,lB=h.div`
  font-size: 48px;
  margin-bottom: ${e=>e.theme.spacing.sm};
`,dB=h.h2`
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.h3.fontSize};
  font-weight: ${e=>e.theme.typography.h3.fontWeight};
  margin: 0;
`,uB=h.div`
  text-align: center;
  margin-bottom: ${e=>e.theme.spacing.lg};
`,hB=h.p`
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.h4.fontSize};
  font-weight: 600;
  margin-bottom: ${e=>e.theme.spacing.sm};
`,fB=h.p`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  margin: 0;
`,pB=h.div`
  display: flex;
  justify-content: center;
  gap: ${e=>e.theme.spacing.md};
`,mB=h.button`
  background: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  padding: ${e=>e.theme.spacing.md} ${e=>e.theme.spacing.xl};
  border-radius: ${e=>e.theme.borderRadius.lg};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  
  &:hover {
    background: ${e=>e.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 126, 54, 0.3);
  }
`,gB=({menuItems:e,activeKey:t,onChange:r,children:n})=>i.jsxs(xB,{children:[i.jsxs(vB,{children:[i.jsx(yB,{children:"관리자 메뉴"}),i.jsx(bB,{children:e.map(o=>i.jsxs(wB,{$active:o.key===t,onClick:()=>r(o.key),children:[i.jsx($B,{children:o.label}),o.description&&i.jsx(SB,{children:o.description})]},o.key))})]}),i.jsx(jB,{children:n})]}),xB=h.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: ${e=>e.theme.spacing.xl};
  padding: ${e=>e.theme.spacing.xl} 0;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`,vB=h.aside`
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  border: 1px solid ${e=>e.theme.colors.border};
  padding: ${e=>e.theme.spacing.lg};
  box-shadow: 0 4px 10px ${e=>e.theme.colors.shadow};
  position: sticky;
  top: 92px;

  @media (max-width: 960px) {
    position: static;
  }
`,yB=h.h2`
  font-size: ${e=>e.theme.typography.h4.fontSize};
  font-weight: ${e=>e.theme.typography.h4.fontWeight};
  margin-bottom: ${e=>e.theme.spacing.md};
  color: ${e=>e.theme.colors.text};
`,bB=h.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,wB=h.li`
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  margin-bottom: ${e=>e.theme.spacing.xs};
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease;
  background: ${e=>e.$active?e.theme.colors.primarySoft:"transparent"};
  color: ${e=>e.$active?e.theme.colors.primary:e.theme.colors.textSecondary};

  &:hover {
    background: ${e=>e.$active?e.theme.colors.primarySoft:e.theme.colors.surfaceHover};
    transform: translateY(-1px);
  }
`,$B=h.div`
  font-size: ${e=>e.theme.typography.body1.fontSize};
  font-weight: 600;
`,SB=h.div`
  font-size: ${e=>e.theme.typography.caption.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
  margin-top: 2px;
`,jB=h.section`
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  border: 1px solid ${e=>e.theme.colors.border};
  padding: ${e=>e.theme.spacing.xl};
  box-shadow: 0 4px 10px ${e=>e.theme.colors.shadow};
`,On=h.div`
  margin-bottom: ${e=>e.theme.spacing.lg};
`,Rn=h.h1`
  font-size: ${e=>e.theme.typography.h2.fontSize};
  font-weight: ${e=>e.theme.typography.h2.fontWeight};
  margin: 0 0 ${e=>e.theme.spacing.xs};
  color: ${e=>e.theme.colors.text};
`,Tn=h.p`
  margin: 0;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
`,Ai=h.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 14px;
`,Oi=h.div`
  flex: 1;
`,kB=h.div`
  display: inline-flex;
  background: ${e=>e.theme.colors.surfaceSoft};
  border-radius: 10px;
  padding: 3px;
  gap: 2px;
  flex-wrap: wrap;
`,EB=h.button`
  border: none;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 700;
  padding: 6px 13px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s ease, color 0.15s ease;
  color: ${e=>e.$active?e.theme.colors.text:e.theme.colors.textSecondary};
  background: ${e=>e.$active?e.theme.colors.surfaceElevated:"transparent"};
  box-shadow: ${e=>e.$active?e.theme.shadows.sm:"none"};

  &:hover {
    color: ${e=>e.theme.colors.text};
  }
`;h.span`
  font-size: 11px;
  font-weight: 800;
  color: ${e=>e.$active?e.theme.colors.primary:e.theme.colors.textMuted};
`;const To=h.input`
  background: ${e=>e.theme.colors.surfaceElevated};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 9px;
  padding: 8px 12px;
  font-size: 12.5px;
  font-family: inherit;
  color: ${e=>e.theme.colors.text};
  min-width: 200px;
  outline: none;

  &::placeholder {
    color: ${e=>e.theme.colors.textMuted};
  }
  &:focus {
    border-color: ${e=>e.theme.colors.primary};
  }
`,br=h.select`
  background: ${e=>e.theme.colors.surfaceElevated};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 9px;
  padding: 8px 12px;
  font-size: 12.5px;
  font-weight: 600;
  font-family: inherit;
  color: ${e=>e.theme.colors.text};
  cursor: pointer;
`,Io=h.div`
  overflow: auto;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 12px;
  background: ${e=>e.theme.colors.surfaceElevated};
`,Do=h.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;

  tbody tr:nth-child(even) {
    background: ${e=>e.theme.colors.surfaceSoft};
  }
  tbody tr:hover {
    background: ${e=>e.theme.colors.surfaceHover};
  }
`,me=h.th`
  position: sticky;
  top: 0;
  z-index: 1;
  background: ${e=>e.theme.colors.surface};
  text-align: ${e=>e.$align||"left"};
  padding: 9px 12px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${e=>e.theme.colors.textSecondary};
  white-space: nowrap;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,ge=h.td`
  text-align: ${e=>e.$align||"left"};
  padding: 7px 12px;
  border-bottom: 1px solid ${e=>e.theme.colors.borderLight};
  vertical-align: middle;
  white-space: nowrap;
  color: ${e=>e.$muted?e.theme.colors.textSecondary:e.theme.colors.text};
  font-weight: ${e=>e.$strong?700:400};
  font-variant-numeric: ${e=>e.$mono?"tabular-nums":"normal"};
  font-family: ${e=>e.$mono?"ui-monospace, SFMono-Regular, Menlo, monospace":"inherit"};

  ${e=>e.$ellipsis&&`
    max-width: ${typeof e.$ellipsis=="number"?e.$ellipsis+"px":"360px"};
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`,lt=h.div`
  padding: ${e=>e.theme.spacing.xl};
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
`,du=(e,t)=>{const r=t.colors,n=r.status||{};switch(e){case"pending":return n.open||"#3B82F6";case"progress":return r.primary;case"success":return n.found||"#10B981";case"warning":return n.closed||"#F59E0B";case"danger":return n.missing||"#EF4444";case"info":return n.resolved||"#6366F1";case"neutral":default:return r.textMuted||"#9CA3AF"}},_o=h.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 9px;
  border-radius: 999px;
  white-space: nowrap;
  color: ${e=>du(e.$tone,e.theme)};
  background: ${e=>du(e.$tone,e.theme)+"22"};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${e=>du(e.$tone,e.theme)};
  }
`,zt=h.button`
  font-size: 11.5px;
  font-weight: 700;
  padding: 5px 11px;
  border-radius: 7px;
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surfaceElevated};
  color: ${e=>e.theme.colors.textSecondary};
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: ${e=>e.theme.colors.primary};
    color: ${e=>e.theme.colors.primary};
  }
`,CB=h(zt)`
  background: ${e=>e.theme.colors.primary};
  border-color: ${e=>e.theme.colors.primary};
  color: #fff;

  &:hover {
    color: #fff;
    opacity: 0.92;
  }
`,bi=h(zt)`
  border-color: ${e=>e.theme.colors.error};
  color: ${e=>e.theme.colors.error};

  &:hover {
    border-color: ${e=>e.theme.colors.error};
    color: #fff;
    background: ${e=>e.theme.colors.error};
  }
`,Ri=h.div`
  display: inline-flex;
  gap: 6px;
`,wn=h.span`
  font-size: 11.5px;
  font-weight: 700;
  color: ${e=>e.theme.colors.textSecondary};
  margin-right: 6px;
`,Hm=h.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 18px;
`,Ft=h.div`
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 12px;
  padding: 14px 16px;
  background: ${e=>e.theme.colors.surfaceElevated};
`,Ut=h.div`
  font-size: 11.5px;
  font-weight: 700;
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: 6px;
`,qt=h.div`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${e=>e.$accent?e.theme.colors.primary:e.theme.colors.text};
  font-variant-numeric: tabular-nums;
`,PB=()=>i.jsxs(AB,{children:[i.jsxs(On,{children:[i.jsx(Rn,{children:"사용자 관리"}),i.jsx(Tn,{children:"전체 사용자 목록 및 권한/정지 관리를 수행합니다."})]}),i.jsx(OB,{children:i.jsx(Hj,{showHeader:!1})})]}),AB=h.div``,OB=h.div`
  margin-top: ${e=>e.theme.spacing.md};
`,RB="http://localhost:8080/api/admin",TB=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),pr=se.create({baseURL:RB,headers:{"Content-Type":"application/json"}});pr.interceptors.request.use(e=>{const t=TB();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e});const on={getBoard:e=>pr.get(`/boards/${e}`),listBoardsWithPaging:(e={})=>{const{page:t=0,size:r=20,...n}=e,o={page:t,size:r,...n,_t:Date.now()};return pr.get("/boards/paging",{params:o,headers:{"Cache-Control":"no-cache"}})},blindBoard:(e,t)=>pr.patch(`/boards/${e}/blind`,t||{}),unblindBoard:(e,t)=>pr.patch(`/boards/${e}/unblind`,t||{}),deleteBoard:(e,t)=>pr.post(`/boards/${e}/delete`,t||{}),restoreBoard:(e,t)=>pr.post(`/boards/${e}/restore`,t||{}),listComments:(e,t)=>pr.get(`/boards/${e}/comments`,{params:t}),blindComment:(e,t,r)=>pr.patch(`/boards/${e}/comments/${t}/blind`,r||{}),unblindComment:(e,t,r)=>pr.patch(`/boards/${e}/comments/${t}/unblind`,r||{}),deleteComment:(e,t,r)=>pr.post(`/boards/${e}/comments/${t}/delete`,r||{}),restoreComment:(e,t,r)=>pr.post(`/boards/${e}/comments/${t}/restore`,r||{})},IB="http://localhost:8080/api/admin/missing-pets",DB=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),Kn=se.create({baseURL:IB,headers:{"Content-Type":"application/json"}});Kn.interceptors.request.use(e=>{const t=DB();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e});const ui={listMissingPetsWithPaging:(e={})=>{const{page:t=0,size:r=20,...n}=e;return Kn.get("/paging",{params:{page:t,size:r,...n}})},getMissingPet:e=>Kn.get(`/${e}`),updateStatus:(e,t)=>Kn.patch(`/${e}/status`,{status:t}),deleteMissingPet:e=>Kn.post(`/${e}/delete`),restoreMissingPet:e=>Kn.post(`/${e}/restore`),listComments:(e,t)=>Kn.get(`/${e}/comments`,{params:t}),deleteComment:(e,t)=>Kn.post(`/${e}/comments/${t}/delete`)},_B={PENDING:{tone:"pending",label:"미처리"},RESOLVED:{tone:"success",label:"처리완료"},REJECTED:{tone:"neutral",label:"반려"}},LB=(e,t)=>t?{tone:"danger",label:"삭제됨"}:e==="BLINDED"?{tone:"warning",label:"블라인드"}:e==="ACTIVE"||e==="MISSING"||e==="FOUND"?{tone:"success",label:e==="ACTIVE"?"정상":e}:e?{tone:"neutral",label:e}:null,MB=({reportId:e,onClose:t,onHandled:r})=>{const[n,o]=p.useState(!0),[a,s]=p.useState(null),[c,l]=p.useState(null),[u,d]=p.useState("RESOLVED"),[f,m]=p.useState("NONE"),[g,x]=p.useState(""),[v,b]=p.useState(!1),[E,w]=p.useState(!1),[j,S]=p.useState(null),[y,k]=p.useState(!1),[$,C]=p.useState(!1);p.useEffect(()=>{e&&(async()=>{try{o(!0),s(null);const A=(await vr.getDetail(e)).data;l(A);const M=A?.report?.status&&A.report.status!=="PENDING";if(b(!!M),M&&(d(A.report.status),m(A.report.actionTaken||"NONE"),x(A.report.adminNote||"")),A?.report?.targetType==="BOARD"&&A?.target?.id)try{const T=(await on.getBoard(A.target.id)).data;T&&(S(T.status),k(T.deleted||!1))}catch(I){console.error("게시글 상태 확인 실패:",I)}else if(A?.report?.targetType==="MISSING_PET"&&A?.target?.id)try{const T=(await ui.getMissingPet(A.target.id)).data;T&&(S(T.status),k(T.deleted||!1))}catch(I){console.error("실종 제보 상태 확인 실패:",I)}}catch{s("신고 상세를 불러오지 못했습니다.")}finally{o(!1)}})()},[e]);const P=async()=>{try{w(!0),await vr.handle(e,{status:u,actionTaken:f,adminNote:g}),r?.(),t?.()}catch{alert("신고 처리에 실패했습니다.")}finally{w(!1)}},z=async()=>{if(!(!c?.target?.id||c?.report?.targetType!=="BOARD")&&window.confirm("이 게시글을 블라인드 처리하시겠습니까?"))try{C(!0),await on.blindBoard(c.target.id),S("BLINDED"),alert("블라인드 처리되었습니다.");const O=await vr.getDetail(e);l(O.data)}catch{alert("블라인드 처리에 실패했습니다.")}finally{C(!1)}},_=async()=>{if(!(!c?.target?.id||c?.report?.targetType!=="BOARD")&&window.confirm("이 게시글의 블라인드를 해제하시겠습니까?"))try{C(!0),await on.unblindBoard(c.target.id),S("ACTIVE"),alert("블라인드가 해제되었습니다.");const O=await vr.getDetail(e);l(O.data)}catch{alert("블라인드 해제에 실패했습니다.")}finally{C(!1)}},N=c?.report?.targetType==="BOARD"||c?.report?.targetType==="MISSING_PET",R=async()=>{if(!(!c?.target?.id||!N)&&window.confirm("이 콘텐츠를 삭제(소프트 삭제)하시겠습니까?"))try{C(!0),c.report.targetType==="BOARD"?await on.deleteBoard(c.target.id):await ui.deleteMissingPet(c.target.id),k(!0),alert("삭제되었습니다.");const O=await vr.getDetail(e);l(O.data)}catch{alert("삭제에 실패했습니다.")}finally{C(!1)}},F=async()=>{if(!(!c?.target?.id||!N)&&window.confirm("이 콘텐츠를 복구하시겠습니까?"))try{C(!0),c.report.targetType==="BOARD"?await on.restoreBoard(c.target.id):await ui.restoreMissingPet(c.target.id),k(!1),alert("복구되었습니다.");const O=await vr.getDetail(e);l(O.data)}catch{alert("복구에 실패했습니다.")}finally{C(!1)}};return e?i.jsx(zB,{children:i.jsxs(NB,{children:[i.jsxs(BB,{children:[i.jsx(FB,{children:"신고 상세"}),i.jsx(UB,{onClick:t,children:"✕"})]}),n?i.jsx(ey,{children:"로딩 중..."}):a?i.jsx(ey,{children:a}):i.jsxs(i.Fragment,{children:[i.jsxs(uu,{children:[i.jsx(hu,{children:"신고 정보"}),i.jsxs(ta,{children:[i.jsx(ra,{children:"ID"}),i.jsxs(na,{children:["#",c?.report?.idx]})]}),i.jsxs(ta,{children:[i.jsx(ra,{children:"대상"}),i.jsxs(na,{children:[c?.report?.targetType," #",c?.report?.targetIdx]})]}),i.jsxs(ta,{children:[i.jsx(ra,{children:"신고자"}),i.jsxs(na,{children:[c?.report?.reporterName||"-"," (#",c?.report?.reporterId,")"]})]}),i.jsxs(ta,{children:[i.jsx(ra,{children:"사유"}),i.jsx(na,{children:c?.report?.reason})]}),i.jsxs(ta,{children:[i.jsx(ra,{children:"상태"}),i.jsx(na,{children:(()=>{const O=_B[c?.report?.status];return O?i.jsx(_o,{$tone:O.tone,children:O.label}):c?.report?.status||"-"})()})]})]}),i.jsxs(uu,{children:[i.jsx(hu,{children:"대상 미리보기"}),i.jsxs(qB,{children:[i.jsx(WB,{children:c?.report?.targetType==="PET_CARE_PROVIDER"?i.jsxs(i.Fragment,{children:["유저: ",c?.target?.authorName||"(이름 없음)"," ",i.jsxs("small",{children:["(",c?.target?.type," #",c?.target?.id,")"]})]}):i.jsxs(i.Fragment,{children:["제목 : ",c?.target?.title||"(제목 없음)"," ",i.jsxs("small",{children:["(",c?.target?.type," #",c?.target?.id,")"]})]})}),c?.target?.summary&&i.jsxs(HB,{children:["내용 : ",c?.target?.summary]}),c?.target?.authorName&&i.jsxs(Jv,{children:["작성자: ",c?.target?.authorName]}),(()=>{const O=LB(j,y);return O?i.jsxs(Jv,{children:["상태: ",i.jsx(_o,{$tone:O.tone,children:O.label})]}):null})()]}),N&&c?.target?.id&&i.jsxs(XB,{children:[i.jsx(ZB,{children:"콘텐츠 조치"}),i.jsxs(JB,{children:[c?.report?.targetType==="BOARD"&&j!=="BLINDED"&&!y&&i.jsx(vc,{onClick:z,disabled:$,children:"블라인드"}),c?.report?.targetType==="BOARD"&&j==="BLINDED"&&!y&&i.jsx(vc,{onClick:_,disabled:$,children:"블라인드 해제"}),y?i.jsx(vc,{onClick:F,disabled:$,children:"복구"}):i.jsx(QB,{onClick:R,disabled:$,children:"삭제"})]})]})]}),i.jsxs(uu,{children:[i.jsx(hu,{children:"관리자 처리"}),i.jsxs(fu,{children:[i.jsx(pu,{children:"처리 상태"}),i.jsxs(Qv,{value:u,onChange:O=>d(O.target.value),disabled:v,children:[i.jsx("option",{value:"RESOLVED",children:"RESOLVED (처리완료)"}),i.jsx("option",{value:"REJECTED",children:"REJECTED (반려)"})]})]}),i.jsxs(fu,{children:[i.jsx(pu,{children:"조치"}),i.jsxs(Qv,{value:f,onChange:O=>m(O.target.value),disabled:v,children:[i.jsx("option",{value:"NONE",children:"조치 없음"}),i.jsx("option",{value:"DELETE_CONTENT",children:"콘텐츠 삭제"}),i.jsx("option",{value:"SUSPEND_USER",children:"유저 정지"}),i.jsx("option",{value:"WARN_USER",children:"유저 경고"}),i.jsx("option",{value:"BAN_USER",children:"유저 영구 차단"}),i.jsx("option",{value:"OTHER",children:"기타 조치"})]})]}),i.jsxs(fu,{children:[i.jsx(pu,{children:"관리자 메모"}),i.jsx(VB,{rows:4,value:g,onChange:O=>x(O.target.value),placeholder:"처리 사유나 메모를 입력하세요",disabled:v})]}),i.jsxs(KB,{children:[!v&&i.jsx(GB,{disabled:E,onClick:P,children:E?"처리 중...":"처리하기"}),i.jsx(YB,{onClick:t,children:"닫기"})]})]})]})]})}):null},zB=h.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`,NB=h.div`
  width: min(860px, 92vw);
  max-height: 88vh;
  overflow: auto;
  background: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.lg};
  box-shadow: 0 10px 28px ${e=>e.theme.colors.shadow};
  padding: ${e=>e.theme.spacing.lg};
`,BB=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing.md};
`,FB=h.h2`
  margin: 0;
`,UB=h.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 18px;
`,uu=h.div`
  margin-bottom: ${e=>e.theme.spacing.lg};
`,hu=h.h3`
  margin-bottom: ${e=>e.theme.spacing.sm};
`,ta=h.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: ${e=>e.theme.spacing.sm};
  padding: 6px 0;
  border-bottom: 1px dashed ${e=>e.theme.colors.border};
`,ra=h.div`
  color: ${e=>e.theme.colors.textSecondary};
`,na=h.div``,qB=h.div`
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.surfaceSoft};
`,WB=h.div`
  font-weight: 600;
`,Jv=h.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.caption.fontSize};
  margin-top: 4px;
`,HB=h.pre`
  white-space: pre-wrap;
  margin-top: ${e=>e.theme.spacing.sm};
  font-family: inherit;
`,fu=h.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: ${e=>e.theme.spacing.sm};
  margin-bottom: ${e=>e.theme.spacing.sm};
  align-items: center;
`,pu=h.label`
  color: ${e=>e.theme.colors.textSecondary};
`,Qv=h.select`
  padding: 8px 10px;
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};
`,VB=h.textarea`
  padding: 8px 10px;
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};
  resize: vertical;
`,KB=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.sm};
  margin-top: ${e=>e.theme.spacing.md};
`,GB=h.button`
  background: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: ${e=>e.theme.borderRadius.md};
  cursor: pointer;
`,YB=h.button`
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};
  border: 1px solid ${e=>e.theme.colors.border};
  padding: 10px 16px;
  border-radius: ${e=>e.theme.borderRadius.md};
  cursor: pointer;
`,ey=h.div`
  padding: ${e=>e.theme.spacing.lg};
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
`,XB=h.div`
  margin-top: ${e=>e.theme.spacing.md};
  padding-top: ${e=>e.theme.spacing.md};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,ZB=h.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.caption.fontSize};
  margin-bottom: ${e=>e.theme.spacing.xs};
`,JB=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.xs};
  flex-wrap: wrap;
`,vc=h.button`
  padding: 6px 12px;
  border-radius: ${e=>e.theme.borderRadius.sm};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  cursor: pointer;
  font-size: ${e=>e.theme.typography.caption.fontSize};
  
  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.surfaceHover};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,QB=h(vc)`
  border-color: ${e=>e.theme.colors.error};
  color: ${e=>e.theme.colors.error};
  background: transparent;
  
  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.error};
    color: white;
  }
`,ty=20,e6={PENDING:{tone:"pending",label:"미처리"},RESOLVED:{tone:"success",label:"처리완료"},REJECTED:{tone:"neutral",label:"반려"}},t6=()=>{const[e,t]=p.useState("BOARD"),[r,n]=p.useState("PENDING"),[o,a]=p.useState(!1),[s,c]=p.useState(null),[l,u]=p.useState([]),[d,f]=p.useState(0),[m,g]=p.useState(null),[x,v]=p.useState(0),b=[{key:"BOARD",label:"게시글 신고"},{key:"COMMENT",label:"댓글 신고"},{key:"MISSING_PET",label:"실종 제보 신고"},{key:"PET_CARE_PROVIDER",label:"유저 신고"}],E=[{key:"ALL",label:"전체"},{key:"PENDING",label:"미처리(PENDING)"},{key:"RESOLVED",label:"처리완료(RESOLVED)"},{key:"REJECTED",label:"반려(REJECTED)"}],w=async y=>{try{a(!0),c(null);const k=await vr.getReports({targetType:e,status:r,page:y,size:ty});u(k.data?.reports||[]),f(k.data?.totalCount||0)}catch(k){console.error("신고 목록 조회 실패:",k),c("신고 목록을 불러오지 못했습니다.")}finally{a(!1)}},j=y=>{v(y),w(y)};p.useEffect(()=>{v(0),w(0)},[e,r]);const S=y=>{if(!y)return"-";const k=new Date(y);if(Number.isNaN(k.getTime()))return String(y);const $=C=>String(C).padStart(2,"0");return`${k.getFullYear()}-${$(k.getMonth()+1)}-${$(k.getDate())} ${$(k.getHours())}:${$(k.getMinutes())}`};return i.jsxs(r6,{children:[i.jsxs(On,{children:[i.jsx(Rn,{children:"신고 관리"}),i.jsx(Tn,{children:"신고 대상(BOARD / COMMENT / MISSING_PET / PET_CARE_PROVIDER)과 상태(PENDING / RESOLVED / REJECTED)를 기준으로 신고를 관리합니다."})]}),i.jsxs(Ai,{children:[i.jsx(kB,{role:"tablist",children:b.map(y=>i.jsx(EB,{type:"button",$active:y.key===e,onClick:()=>t(y.key),children:y.label},y.key))}),i.jsx(Oi,{}),i.jsx(br,{value:r,onChange:y=>n(y.target.value),children:E.map(y=>i.jsx("option",{value:y.key,children:y.label},y.key))})]}),o?i.jsx(lt,{children:"로딩 중..."}):s?i.jsx(lt,{children:s}):l.length===0?i.jsx(lt,{children:"해당 조건에 맞는 신고가 없습니다."}):i.jsxs(i.Fragment,{children:[i.jsx(Io,{children:i.jsxs(Do,{children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx(me,{$align:"right",children:"ID"}),i.jsx(me,{$align:"right",children:"대상 ID"}),i.jsx(me,{children:"신고자"}),i.jsx(me,{children:"사유"}),i.jsx(me,{$align:"center",children:"상태"}),i.jsx(me,{children:"처리자"}),i.jsx(me,{children:"처리일시"}),i.jsx(me,{children:"생성일"}),i.jsx(me,{$align:"center",children:"처리"})]})}),i.jsx("tbody",{children:l.map(y=>{const k=e6[y.status]||{tone:"neutral",label:y.status},$=y.status==="RESOLVED"||y.status==="REJECTED";return i.jsxs("tr",{children:[i.jsxs(ge,{$align:"right",$mono:!0,$muted:!0,children:["#",y.idx]}),i.jsx(ge,{$align:"right",$mono:!0,children:y.targetIdx}),i.jsx(ge,{children:y.reporterName?`${y.reporterName} (#${y.reporterId})`:`#${y.reporterId}`}),i.jsx(ge,{children:y.reason}),i.jsx(ge,{$align:"center",children:i.jsx(_o,{$tone:k.tone,children:k.label})}),i.jsx(ge,{$muted:!0,children:y.handledByName||"-"}),i.jsx(ge,{$muted:!0,children:S(y.handledAt)}),i.jsx(ge,{$muted:!0,children:S(y.createdAt)}),i.jsx(ge,{$align:"center",children:i.jsxs(Ri,{children:[!$&&i.jsx(CB,{onClick:()=>g(y.idx),children:"처리"}),i.jsx(zt,{onClick:()=>g(y.idx),children:"보기"})]})})]},y.idx)})})]})}),i.jsx(n6,{children:i.jsx(kr,{currentPage:x,totalCount:d,pageSize:ty,onPageChange:j,loading:o,showEdges:!0})})]}),m&&i.jsx(MB,{reportId:m,onClose:()=>g(null),onHandled:()=>w(x)})]})},r6=h.div``,n6=h.div`
  margin-top: ${e=>e.theme.spacing.md};
`,o6=e=>e.deleted?{tone:"danger",label:"삭제됨"}:e.status==="BLINDED"?{tone:"warning",label:"블라인드"}:{tone:"success",label:"게시"},i6=()=>{const[e,t]=p.useState("ALL"),[r,n]=p.useState(""),[o,a]=p.useState("ALL"),[s,c]=p.useState(""),[l,u]=p.useState(0),[d,f]=p.useState(20),[m,g]=p.useState(0),[x,v]=p.useState({map:{},order:[]}),[b,E]=p.useState(!1),[w,j]=p.useState(null),S=p.useCallback(O=>O.order.map(D=>O.map[D]).filter(Boolean),[]),y=p.useCallback(O=>{const D={},A=[];return O.forEach(M=>{M?.idx&&!D[M.idx]&&(D[M.idx]=M,A.push(M.idx))}),{map:D,order:A}},[]),k=p.useCallback((O,D)=>{const A={...O.map},M=[...O.order];return D.forEach(I=>{I?.idx&&(A[I.idx]?A[I.idx]=I:(A[I.idx]=I,M.push(I.idx)))}),{map:A,order:M}},[]),$=p.useCallback(async(O=0,D=!1,A=d)=>{try{E(!0),j(null);const I=(await on.listBoardsWithPaging({status:e,deleted:r===""?void 0:r==="true",category:o==="ALL"?void 0:o,q:s||void 0,page:O,size:A})).data||{},T=I.boards||[];if(D){const B=y(T);v(B)}else v(B=>k(B,T));g(I.totalCount||0),u(O)}catch(M){console.error("게시글 목록 조회 실패:",M),j(M.response?.data?.message||"목록을 불러오지 못했습니다.")}finally{E(!1)}},[e,r,o,s,d,y,k]);p.useEffect(()=>{$(0,!0)},[e,r,o,s]);const C=p.useMemo(()=>S(x),[x,S]),P=async O=>{if(!O?.idx){alert("게시글 정보가 올바르지 않습니다.");return}try{await on.blindBoard(O.idx),v(D=>D.map[O.idx]?{...D,map:{...D.map,[O.idx]:{...D.map[O.idx],status:"BLINDED"}}}:D),$(0,!0)}catch(D){console.error("블라인드 처리 실패:",D),alert(D.response?.data?.message||"블라인드 처리 실패")}},z=async O=>{if(!O?.idx){alert("게시글 정보가 올바르지 않습니다.");return}try{await on.unblindBoard(O.idx),v(D=>D.map[O.idx]?{...D,map:{...D.map,[O.idx]:{...D.map[O.idx],status:"ACTIVE"}}}:D),$(0,!0)}catch(D){console.error("블라인드 해제 실패:",D),alert(D.response?.data?.message||"해제 실패")}},_=async O=>{if(!O?.idx){alert("게시글 정보가 올바르지 않습니다.");return}if(window.confirm("이 게시글을 삭제(소프트 삭제)하시겠습니까?"))try{await on.deleteBoard(O.idx),v(D=>{const{[O.idx]:A,...M}=D.map;return{map:M,order:D.order.filter(I=>I!==O.idx)}}),$(0,!0)}catch(D){console.error("삭제 실패:",D),alert(D.response?.data?.message||"삭제 실패")}},N=async O=>{if(!O?.idx){alert("게시글 정보가 올바르지 않습니다.");return}try{await on.restoreBoard(O.idx),v(D=>D.map[O.idx]?{...D,map:{...D.map,[O.idx]:{...D.map[O.idx],deleted:!1,status:"ACTIVE"}}}:D),$(0,!0)}catch(D){console.error("복구 실패:",D),alert(D.response?.data?.message||"복구 실패")}},R=p.useCallback(O=>{const D=Math.max(1,Math.ceil(m/d));O>=0&&O<D&&$(O,!0)},[m,d,$]),F=O=>{const D=parseInt(O.target.value);f(D),$(0,!0,D)};return i.jsxs(a6,{children:[i.jsxs(On,{children:[i.jsx(Rn,{children:"커뮤니티 관리"}),i.jsx(Tn,{children:"게시글 상태(블라인드/삭제)와 검색·필터를 지원합니다."})]}),i.jsxs(Ai,{children:[i.jsxs("div",{children:[i.jsx(wn,{children:"상태"}),i.jsxs(br,{value:e,onChange:O=>t(O.target.value),children:[i.jsx("option",{value:"ALL",children:"전체"}),i.jsx("option",{value:"ACTIVE",children:"게시"}),i.jsx("option",{value:"BLINDED",children:"블라인드"}),i.jsx("option",{value:"DELETED",children:"삭제됨"})]})]}),i.jsxs("div",{children:[i.jsx(wn,{children:"삭제"}),i.jsxs(br,{value:r,onChange:O=>n(O.target.value),children:[i.jsx("option",{value:"",children:"전체"}),i.jsx("option",{value:"false",children:"미삭제"}),i.jsx("option",{value:"true",children:"삭제됨"})]})]}),i.jsxs("div",{children:[i.jsx(wn,{children:"카테고리"}),i.jsxs(br,{value:o,onChange:O=>a(O.target.value),children:[i.jsx("option",{value:"ALL",children:"전체"}),i.jsx("option",{value:"일상",children:"일상"}),i.jsx("option",{value:"자랑",children:"자랑"}),i.jsx("option",{value:"질문",children:"질문"}),i.jsx("option",{value:"정보",children:"정보"}),i.jsx("option",{value:"후기",children:"후기"}),i.jsx("option",{value:"공지",children:"공지"})]})]}),i.jsx(To,{placeholder:"제목/내용/작성자 검색…",value:s,onChange:O=>c(O.target.value)}),i.jsx(Oi,{}),i.jsxs(br,{value:d,onChange:F,children:[i.jsx("option",{value:20,children:"20개씩"}),i.jsx("option",{value:50,children:"50개씩"}),i.jsx("option",{value:100,children:"100개씩"})]}),i.jsx(zt,{onClick:()=>$(0,!0),children:"새로고침"})]}),b&&x.order.length===0?i.jsx(lt,{children:"로딩 중..."}):w?i.jsx(lt,{children:w}):C.length===0?i.jsx(lt,{children:"데이터가 없습니다."}):i.jsxs(i.Fragment,{children:[i.jsx(Io,{children:i.jsxs(Do,{children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx(me,{$align:"right",children:"ID"}),i.jsx(me,{children:"작성자"}),i.jsx(me,{children:"제목"}),i.jsx(me,{children:"카테고리"}),i.jsx(me,{$align:"center",children:"상태"}),i.jsx(me,{children:"생성일"}),i.jsx(me,{$align:"center",children:"액션"})]})}),i.jsx("tbody",{children:C.map(O=>{const D=o6(O);return i.jsxs("tr",{children:[i.jsxs(ge,{$align:"right",$mono:!0,$muted:!0,children:["#",O.idx]}),i.jsx(ge,{children:O.username||"-"}),i.jsx(ge,{$ellipsis:!0,$strong:!0,children:O.title||"-"}),i.jsx(ge,{$muted:!0,children:O.category||"-"}),i.jsx(ge,{$align:"center",children:i.jsx(_o,{$tone:D.tone,children:D.label})}),i.jsx(ge,{$muted:!0,children:O.createdAt?new Date(O.createdAt).toLocaleString("ko-KR"):"-"}),i.jsx(ge,{$align:"center",children:i.jsxs(Ri,{children:[O.status!=="BLINDED"&&!O.deleted&&i.jsx(zt,{onClick:()=>P(O),children:"블라인드"}),O.status==="BLINDED"&&!O.deleted&&i.jsx(zt,{onClick:()=>z(O),children:"해제"}),O.deleted?i.jsx(zt,{onClick:()=>N(O),children:"복구"}):i.jsx(bi,{onClick:()=>_(O),children:"삭제"})]})})]},O.idx)})})]})}),m>0&&i.jsx(s6,{children:i.jsx(kr,{currentPage:l,totalCount:m,pageSize:d,onPageChange:R,loading:b,showEdges:!0})})]})]})},a6=h.div``,s6=h.div`
  margin-top: ${e=>e.theme.spacing.md};
`,c6=e=>e.deleted?{tone:"neutral",label:"삭제됨"}:e.status==="FOUND"?{tone:"success",label:"목격"}:e.status==="RESOLVED"?{tone:"info",label:"해결"}:{tone:"danger",label:"실종"},l6=()=>{const[e,t]=p.useState(""),[r,n]=p.useState(""),[o,a]=p.useState(""),[s,c]=p.useState(0),[l]=p.useState(20),[u,d]=p.useState(0),[f,m]=p.useState([]),[g,x]=p.useState(!1),[v,b]=p.useState(null),E=p.useCallback(async(k=0)=>{try{x(!0),b(null);const $={page:k,size:l};e&&($.status=e),r!==""&&($.deleted=r==="true"),o&&($.q=o);const P=(await ui.listMissingPetsWithPaging($)).data||{};m(P.boards||[]),d(P.totalCount||0),c(k)}catch($){console.error("실종 제보 목록 조회 실패:",$),b($.response?.data?.message||"목록을 불러오지 못했습니다.")}finally{x(!1)}},[e,r,o,l]);p.useEffect(()=>{E(0)},[E]);const w=k=>{const $=Math.max(1,Math.ceil(u/l));k>=0&&k<$&&E(k)},j=async(k,$)=>{try{await ui.updateStatus(k,$),E(s)}catch(C){alert(C.response?.data?.message||"상태 변경 실패")}},S=async k=>{if(window.confirm("이 실종 제보를 삭제하시겠습니까?"))try{await ui.deleteMissingPet(k),E(s)}catch($){alert($.response?.data?.message||"삭제 실패")}},y=[{value:"",label:"전체"},{value:"MISSING",label:"실종"},{value:"FOUND",label:"목격"},{value:"RESOLVED",label:"해결"}];return i.jsxs(d6,{children:[i.jsxs(On,{children:[i.jsx(Rn,{children:"실종/목격 관리"}),i.jsx(Tn,{children:"실종/목격 게시글과 댓글을 모니터링하고 상태를 관리합니다."})]}),i.jsxs(Ai,{children:[i.jsxs("div",{children:[i.jsx(wn,{children:"상태"}),i.jsx(br,{value:e,onChange:k=>t(k.target.value),children:y.map(k=>i.jsx("option",{value:k.value,children:k.label},k.value))})]}),i.jsxs("div",{children:[i.jsx(wn,{children:"삭제"}),i.jsxs(br,{value:r,onChange:k=>n(k.target.value),children:[i.jsx("option",{value:"",children:"전체"}),i.jsx("option",{value:"false",children:"미삭제"}),i.jsx("option",{value:"true",children:"삭제됨"})]})]}),i.jsx(To,{placeholder:"제목/내용/반려동물 이름/작성자 검색…",value:o,onChange:k=>a(k.target.value)}),i.jsx(Oi,{}),i.jsx(zt,{onClick:()=>E(s),children:"새로고침"})]}),g&&f.length===0?i.jsx(lt,{children:"로딩 중..."}):v?i.jsx(lt,{children:v}):f.length===0?i.jsx(lt,{children:"데이터가 없습니다."}):i.jsxs(i.Fragment,{children:[i.jsx(Io,{children:i.jsxs(Do,{children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx(me,{$align:"right",children:"ID"}),i.jsx(me,{children:"작성자"}),i.jsx(me,{children:"제목"}),i.jsx(me,{children:"반려동물"}),i.jsx(me,{$align:"center",children:"상태"}),i.jsx(me,{children:"생성일"}),i.jsx(me,{$align:"center",children:"액션"})]})}),i.jsx("tbody",{children:f.map(k=>{const $=c6(k);return i.jsxs("tr",{children:[i.jsxs(ge,{$align:"right",$mono:!0,$muted:!0,children:["#",k.idx]}),i.jsx(ge,{children:k.username||"-"}),i.jsx(ge,{$ellipsis:!0,$strong:!0,children:k.title||"-"}),i.jsx(ge,{children:k.petName||"-"}),i.jsx(ge,{$align:"center",children:i.jsx(_o,{$tone:$.tone,children:$.label})}),i.jsx(ge,{$muted:!0,children:k.createdAt?new Date(k.createdAt).toLocaleString("ko-KR"):"-"}),i.jsx(ge,{$align:"center",children:i.jsxs(Ri,{children:[k.status!=="RESOLVED"&&!k.deleted&&i.jsx(zt,{onClick:()=>j(k.idx,"RESOLVED"),children:"해결 처리"}),k.deleted?i.jsx(zt,{onClick:()=>alert("복구 기능은 아직 구현되지 않았습니다."),children:"복구"}):i.jsx(bi,{onClick:()=>S(k.idx),children:"삭제"})]})})]},k.idx)})})]})}),u>0&&i.jsx(u6,{children:i.jsx(kr,{currentPage:s,totalCount:u,pageSize:l,onPageChange:w,loading:g,showEdges:!0})})]})]})},d6=h.div``,u6=h.div`
  margin-top: ${e=>e.theme.spacing.md};
`,h6="http://localhost:8080/api/admin/care-requests",f6=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),ri=se.create({baseURL:h6,headers:{"Content-Type":"application/json"}});ri.interceptors.request.use(e=>{const t=f6();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e});const mu={listCareRequests:e=>ri.get("",{params:e}),getCareRequest:e=>ri.get(`/${e}`),updateStatus:(e,t)=>ri.patch(`/${e}/status`,null,{params:{status:t}}),deleteCareRequest:e=>ri.post(`/${e}/delete`),restoreCareRequest:e=>ri.post(`/${e}/restore`)},p6={OPEN:{tone:"pending",label:"모집중"},IN_PROGRESS:{tone:"progress",label:"진행중"},COMPLETED:{tone:"success",label:"완료"},CANCELLED:{tone:"neutral",label:"취소됨"}},m6=()=>{const[e,t]=p.useState(""),[r,n]=p.useState(""),[o,a]=p.useState(""),[s,c]=p.useState(""),[l,u]=p.useState([]),[d,f]=p.useState(!1),[m,g]=p.useState(null),[x,v]=p.useState(0),[b,E]=p.useState(0),w=20,j=p.useCallback(async()=>{try{f(!0),g(null);const $={page:x,size:w};e&&($.status=e),r&&($.location=r),o!==""&&($.deleted=o==="true"),s&&($.q=s);const C=await mu.listCareRequests($);u(C.data.content||[]),E(C.data.totalPages||0)}catch($){console.error("케어 요청 목록 조회 실패:",$),g($.response?.data?.message||"목록을 불러오지 못했습니다.")}finally{f(!1)}},[e,r,o,s,x]);p.useEffect(()=>{j()},[j]);const S=async($,C)=>{try{await mu.updateStatus($,C),j()}catch(P){alert(P.response?.data?.message||"상태 변경 실패")}},y=async $=>{if(window.confirm("이 케어 요청을 삭제하시겠습니까?"))try{await mu.deleteCareRequest($),j()}catch(C){alert(C.response?.data?.message||"삭제 실패")}},k=[{value:"",label:"전체"},{value:"OPEN",label:"모집중"},{value:"IN_PROGRESS",label:"진행중"},{value:"COMPLETED",label:"완료"},{value:"CANCELLED",label:"취소됨"}];return i.jsxs(g6,{children:[i.jsxs(On,{children:[i.jsx(Rn,{children:"케어 서비스 관리"}),i.jsx(Tn,{children:"케어 요청, 지원자, 후기, 댓글을 모니터링하고 관리합니다."})]}),i.jsxs(Ai,{children:[i.jsxs("div",{children:[i.jsx(wn,{children:"상태"}),i.jsx(br,{value:e,onChange:$=>{t($.target.value),v(0)},children:k.map($=>i.jsx("option",{value:$.value,children:$.label},$.value))})]}),i.jsx(To,{placeholder:"위치 검색",value:r,onChange:$=>{n($.target.value),v(0)},style:{minWidth:140}}),i.jsxs("div",{children:[i.jsx(wn,{children:"삭제"}),i.jsxs(br,{value:o,onChange:$=>{a($.target.value),v(0)},children:[i.jsx("option",{value:"",children:"전체"}),i.jsx("option",{value:"false",children:"미삭제"}),i.jsx("option",{value:"true",children:"삭제됨"})]})]}),i.jsx(To,{placeholder:"제목/내용/작성자 검색…",value:s,onChange:$=>{c($.target.value),v(0)}}),i.jsx(Oi,{}),i.jsx(zt,{onClick:j,children:"새로고침"})]}),d&&l.length===0?i.jsx(lt,{children:"로딩 중..."}):m?i.jsx(lt,{children:m}):l.length===0?i.jsx(lt,{children:"데이터가 없습니다."}):i.jsxs(i.Fragment,{children:[i.jsx(Io,{children:i.jsxs(Do,{children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx(me,{$align:"right",children:"ID"}),i.jsx(me,{children:"작성자"}),i.jsx(me,{children:"제목"}),i.jsx(me,{$align:"center",children:"상태"}),i.jsx(me,{children:"날짜"}),i.jsx(me,{children:"생성일"}),i.jsx(me,{$align:"center",children:"액션"})]})}),i.jsx("tbody",{children:l.map($=>{const C=$.deleted?{tone:"neutral",label:"삭제됨"}:p6[$.status]||{tone:"neutral",label:$.status||"-"};return i.jsxs("tr",{children:[i.jsxs(ge,{$align:"right",$mono:!0,$muted:!0,children:["#",$.idx]}),i.jsx(ge,{children:$.username||"-"}),i.jsx(ge,{$ellipsis:!0,$strong:!0,children:$.title||"-"}),i.jsx(ge,{$align:"center",children:i.jsx(_o,{$tone:C.tone,children:C.label})}),i.jsx(ge,{$muted:!0,children:$.date?new Date($.date).toLocaleDateString("ko-KR"):"-"}),i.jsx(ge,{$muted:!0,children:$.createdAt?new Date($.createdAt).toLocaleString("ko-KR"):"-"}),i.jsx(ge,{$align:"center",children:i.jsxs(Ri,{children:[i.jsx(br,{value:$.status||"",onChange:P=>S($.idx,P.target.value),style:{fontSize:"11.5px",padding:"4px 8px"},children:k.filter(P=>P.value).map(P=>i.jsx("option",{value:P.value,children:P.label},P.value))}),$.deleted?i.jsx(zt,{onClick:()=>alert("복구 기능은 아직 구현되지 않았습니다."),children:"복구"}):i.jsx(bi,{onClick:()=>y($.idx),children:"삭제"})]})})]},$.idx)})})]})}),b>1&&i.jsx(x6,{children:i.jsx(kr,{currentPage:x,totalCount:b*w,pageSize:w,onPageChange:v,loading:d,showEdges:!0,showTotal:!1})})]})]})},g6=h.div``,x6=h.div`
  margin-top: 12px;
`,v6=()=>{const[e,t]=p.useState(null),[r,n]=p.useState(!1),[o,a]=p.useState(null),[s,c]=p.useState(null),l=p.useRef(null),u=f=>{const m=f.target.files[0];if(m){if(!m.name.endsWith(".csv")){alert("CSV 파일만 업로드 가능합니다.");return}t(m),c(null),a(null)}},d=async()=>{if(!e){alert("CSV 파일을 선택해주세요.");return}n(!0),c(null),a(null);try{const f=await _l.importPublicData(e);a(f.data),t(null),l.current&&(l.current.value="")}catch(f){c(f?.response?.data?.message||f.message||"임포트 실패")}finally{n(!1)}};return i.jsxs(y6,{children:[i.jsxs(On,{children:[i.jsx(Rn,{children:"지역 서비스 관리"}),i.jsx(Tn,{children:"등록된 장소, 리뷰, 외부 API 캐시를 관리합니다."})]}),i.jsxs(b6,{children:[i.jsx(w6,{children:"공공데이터 CSV 임포트"}),i.jsxs($6,{children:["공공데이터 포털에서 제공하는 반려동물 관련 시설 정보 CSV 파일을 임포트합니다.",i.jsx("br",{}),"CSV 파일 형식: 시설명,카테고리1,카테고리2,카테고리3,시도명칭,시군구명칭,법정읍면동명칭,리명칭,번지,도로명이름,건물번호,위도,경도,우편번호,도로명주소,지번주소,전화번호,홈페이지,휴무일,운영시간,주차가능여부,입장가격정보,반려동물동반가능정보,반려동물전용정보,입장가능동물크기,반려동물제한사항,장소실내여부,장소실외여부,기본정보장소설명,애견동반추가요금,최종작성일"]}),i.jsxs(S6,{children:[i.jsx(j6,{children:"CSV 파일 선택"}),i.jsxs(k6,{children:[i.jsx(E6,{type:"file",accept:".csv",ref:l,onChange:u,disabled:r}),e&&i.jsxs(C6,{children:["선택된 파일: ",i.jsx("strong",{children:e.name})," (",(e.size/1024/1024).toFixed(2)," MB)"]})]})]}),i.jsx(P6,{children:i.jsx(A6,{onClick:d,disabled:r||!e,children:r?"임포트 중...":"CSV 파일 임포트"})}),s&&i.jsx(O6,{children:s}),o&&i.jsxs(i.Fragment,{children:[i.jsx(R6,{children:"임포트 결과"}),i.jsxs(Hm,{children:[i.jsxs(Ft,{children:[i.jsx(Ut,{children:"총 읽은 라인"}),i.jsx(qt,{children:Number(o.totalRead||0).toLocaleString()})]}),i.jsxs(Ft,{children:[i.jsx(Ut,{children:"저장"}),i.jsx(qt,{$accent:!0,children:Number(o.saved||0).toLocaleString()})]}),i.jsxs(Ft,{children:[i.jsx(Ut,{children:"중복 스킵"}),i.jsx(qt,{children:Number(o.duplicate||0).toLocaleString()})]}),i.jsxs(Ft,{children:[i.jsx(Ut,{children:"검증 실패"}),i.jsx(qt,{children:Number(o.skipped||0).toLocaleString()})]}),i.jsxs(Ft,{children:[i.jsx(Ut,{children:"에러"}),i.jsx(qt,{children:Number(o.error||0).toLocaleString()})]})]})]})]})]})},y6=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.lg};
`,b6=h.div`
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  padding: ${e=>e.theme.spacing.lg};
  background: ${e=>e.theme.colors.surface};
`,w6=h.h3`
  font-size: ${e=>e.theme.typography.h3.fontSize};
  font-weight: ${e=>e.theme.typography.h3.fontWeight};
  margin-bottom: ${e=>e.theme.spacing.sm};
  color: ${e=>e.theme.colors.text};
`,$6=h.p`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  line-height: 1.6;
  margin-bottom: ${e=>e.theme.spacing.lg};
`,S6=h.div`
  margin-bottom: ${e=>e.theme.spacing.md};
`,j6=h.label`
  display: block;
  margin-bottom: ${e=>e.theme.spacing.xs};
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
`,k6=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xs};
`,E6=h.input`
  padding: ${e=>e.theme.spacing.sm};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.sm};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  cursor: pointer;
  &:disabled { background: ${e=>e.theme.colors.surfaceSoft}; cursor: not-allowed; }
  &:focus { outline: none; border-color: ${e=>e.theme.colors.primary}; }
`,C6=h.div`
  padding: ${e=>e.theme.spacing.xs};
  background: ${e=>e.theme.colors.surfaceSoft};
  border-radius: ${e=>e.theme.borderRadius.sm};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
  strong { color: ${e=>e.theme.colors.text}; font-weight: 600; }
`,P6=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.sm};
  margin-bottom: ${e=>e.theme.spacing.md};
`,A6=h.button`
  background: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.sm};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover:enabled { background: ${e=>e.theme.colors.primaryDark||"#176dd1"}; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`,O6=h.div`
  color: #df3737;
  padding: ${e=>e.theme.spacing.sm};
  background: #fee;
  border-radius: ${e=>e.theme.borderRadius.sm};
  margin-bottom: ${e=>e.theme.spacing.md};
`,R6=h.h4`
  font-size: ${e=>e.theme.typography.h4.fontSize};
  font-weight: 600;
  margin-bottom: ${e=>e.theme.spacing.sm};
  color: ${e=>e.theme.colors.text};
`,T6="http://localhost:8080/api/admin/meetups",I6=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),ga=se.create({baseURL:T6,headers:{"Content-Type":"application/json"}});ga.interceptors.request.use(e=>{const t=I6();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e});const gu={listMeetups:e=>ga.get("",{params:e}),getMeetup:e=>ga.get(`/${e}`),deleteMeetup:e=>ga.delete(`/${e}`),getParticipants:e=>ga.get(`/${e}/participants`)},D6={RECRUITING:{tone:"pending",label:"모집중"},FULL:{tone:"warning",label:"마감"},ONGOING:{tone:"progress",label:"진행중"},COMPLETED:{tone:"success",label:"완료"},CANCELLED:{tone:"neutral",label:"취소됨"}},_6=()=>{const[e,t]=p.useState(""),[r,n]=p.useState(""),[o,a]=p.useState([]),[s,c]=p.useState(!1),[l,u]=p.useState(null),[d,f]=p.useState([]),[m,g]=p.useState(!1),[x,v]=p.useState(0),[b,E]=p.useState(0),w=20,j=p.useCallback(async()=>{try{c(!0),u(null);const $={page:x,size:w};e&&e!=="ALL"&&($.status=e),r&&($.q=r);const C=await gu.listMeetups($);a(C.data.content||[]),E(C.data.totalPages||0)}catch($){console.error("모임 목록 조회 실패:",$),u($.response?.data?.message||"목록을 불러오지 못했습니다.")}finally{c(!1)}},[e,r,x]);p.useEffect(()=>{j()},[j]);const S=async $=>{if(window.confirm("이 모임을 삭제하시겠습니까?"))try{await gu.deleteMeetup($),j()}catch(C){alert(C.response?.data?.message||"삭제 실패")}},y=async $=>{try{const C=await gu.getParticipants($);f(C.data||[]),g(!0)}catch(C){alert(C.response?.data?.message||"참가자 목록 조회 실패")}},k=[{value:"",label:"전체"},{value:"RECRUITING",label:"모집중"},{value:"FULL",label:"마감"},{value:"ONGOING",label:"진행중"},{value:"COMPLETED",label:"완료"},{value:"CANCELLED",label:"취소됨"}];return i.jsxs(L6,{children:[i.jsxs(On,{children:[i.jsx(Rn,{children:"산책 모임 관리"}),i.jsx(Tn,{children:"모임과 참여자를 조회하고 관리합니다."})]}),i.jsxs(Ai,{children:[i.jsxs("div",{children:[i.jsx(wn,{children:"상태"}),i.jsx(br,{value:e,onChange:$=>{t($.target.value),v(0)},children:k.map($=>i.jsx("option",{value:$.value,children:$.label},$.value))})]}),i.jsx(To,{placeholder:"제목/내용/위치/주최자 검색…",value:r,onChange:$=>{n($.target.value),v(0)}}),i.jsx(Oi,{}),i.jsx(zt,{onClick:j,children:"새로고침"})]}),s&&o.length===0?i.jsx(lt,{children:"로딩 중..."}):l?i.jsx(lt,{children:l}):o.length===0?i.jsx(lt,{children:"데이터가 없습니다."}):i.jsxs(i.Fragment,{children:[i.jsx(Io,{children:i.jsxs(Do,{children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx(me,{$align:"right",children:"ID"}),i.jsx(me,{children:"주최자"}),i.jsx(me,{children:"제목"}),i.jsx(me,{children:"위치"}),i.jsx(me,{children:"날짜"}),i.jsx(me,{$align:"right",children:"인원"}),i.jsx(me,{$align:"center",children:"상태"}),i.jsx(me,{children:"생성일"}),i.jsx(me,{$align:"center",children:"액션"})]})}),i.jsx("tbody",{children:o.map($=>{const C=D6[$.status]||{tone:"neutral",label:$.status||"-"};return i.jsxs("tr",{children:[i.jsxs(ge,{$align:"right",$mono:!0,$muted:!0,children:["#",$.idx]}),i.jsx(ge,{children:$.organizerName||"-"}),i.jsx(ge,{$ellipsis:!0,$strong:!0,children:$.title||"-"}),i.jsx(ge,{$ellipsis:220,$muted:!0,children:$.location||"-"}),i.jsx(ge,{$muted:!0,children:$.date?new Date($.date).toLocaleString("ko-KR"):"-"}),i.jsxs(ge,{$align:"right",$mono:!0,children:[$.currentParticipants||0," / ",$.maxParticipants||0]}),i.jsx(ge,{$align:"center",children:i.jsx(_o,{$tone:C.tone,children:C.label})}),i.jsx(ge,{$muted:!0,children:$.createdAt?new Date($.createdAt).toLocaleString("ko-KR"):"-"}),i.jsx(ge,{$align:"center",children:i.jsxs(Ri,{children:[i.jsx(zt,{onClick:()=>y($.idx),children:"참가자"}),i.jsx(bi,{onClick:()=>S($.idx),children:"삭제"})]})})]},$.idx)})})]})}),b>1&&i.jsx(q6,{children:i.jsx(kr,{currentPage:x,totalCount:b*w,pageSize:w,onPageChange:v,loading:s,showEdges:!0,showTotal:!1})})]}),m&&i.jsx(M6,{onClick:()=>g(!1),children:i.jsxs(z6,{onClick:$=>$.stopPropagation(),children:[i.jsxs(N6,{children:[i.jsx(B6,{children:"참가자 목록"}),i.jsx(F6,{onClick:()=>g(!1),children:"×"})]}),i.jsx(U6,{children:d.length===0?i.jsx(lt,{children:"참가자가 없습니다."}):i.jsx(Io,{children:i.jsxs(Do,{children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx(me,{children:"사용자명"}),i.jsx(me,{children:"참가일시"})]})}),i.jsx("tbody",{children:d.map(($,C)=>i.jsxs("tr",{children:[i.jsx(ge,{$strong:!0,children:$.username||"-"}),i.jsx(ge,{$muted:!0,children:$.joinedAt?new Date($.joinedAt).toLocaleString("ko-KR"):"-"})]},C))})]})})})]})})]})},L6=h.div``,M6=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,z6=h.div`
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.lg};
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`,N6=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing.md};
`,B6=h.h3`
  font-size: ${e=>e.theme.typography.h3.fontSize};
  font-weight: ${e=>e.theme.typography.h3.fontWeight};
`,F6=h.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${e=>e.theme.colors.textSecondary};
  
  &:hover {
    color: ${e=>e.theme.colors.text};
  }
`,U6=h.div`
  max-height: 60vh;
  overflow-y: auto;
`,q6=h.div`
  margin-top: 12px;
`,W6="http://localhost:8080/api/admin/files",H6=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),ni=se.create({baseURL:W6,headers:{"Content-Type":"application/json"}});ni.interceptors.request.use(e=>{const t=H6();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e});const _s={listFiles:e=>ni.get("",{params:e}),getFilesByTarget:(e,t)=>ni.get("/target",{params:{targetType:e,targetIdx:t}}),deleteFile:e=>ni.delete(`/${e}`),deleteFilesByTarget:(e,t)=>ni.delete("/target",{params:{targetType:e,targetIdx:t}}),getStatistics:()=>ni.get("/statistics")},V6=()=>{const[e,t]=p.useState(""),[r,n]=p.useState(""),[o,a]=p.useState(""),[s,c]=p.useState([]),[l,u]=p.useState(!1),[d,f]=p.useState(null),[m,g]=p.useState(null),x=p.useCallback(async()=>{try{u(!0),f(null);const j={};e&&(j.targetType=e),r&&(j.targetIdx=parseInt(r)),o&&(j.q=o);const S=await _s.listFiles(j);c(S.data||[])}catch(j){console.error("파일 목록 조회 실패:",j),f(j.response?.data?.message||"목록을 불러오지 못했습니다.")}finally{u(!1)}},[e,r,o]),v=p.useCallback(async()=>{try{const j=await _s.getStatistics();g(j.data)}catch(j){console.error("통계 조회 실패:",j)}},[]);p.useEffect(()=>{x(),v()},[x,v]);const b=async j=>{if(window.confirm("이 파일을 삭제하시겠습니까?"))try{await _s.deleteFile(j),x(),v()}catch(S){alert(S.response?.data?.message||"삭제 실패")}},E=async()=>{if(!e||!r){alert("타겟 타입과 ID를 입력해주세요.");return}if(window.confirm(`타겟(${e}:${r})의 모든 파일을 삭제하시겠습니까?`))try{await _s.deleteFilesByTarget(e,parseInt(r)),x(),v()}catch(j){alert(j.response?.data?.message||"삭제 실패")}},w=[{value:"",label:"전체"},{value:"BOARD",label:"게시글"},{value:"COMMENT",label:"댓글"},{value:"MISSING_PET",label:"실종 제보"},{value:"MISSING_PET_COMMENT",label:"실종 제보 댓글"},{value:"CARE_REQUEST",label:"케어 요청"},{value:"USER",label:"사용자"}];return i.jsxs(K6,{children:[i.jsxs(On,{children:[i.jsx(Rn,{children:"파일 관리"}),i.jsx(Tn,{children:"업로드된 파일들을 조회하고 관리합니다."})]}),m&&i.jsxs(Hm,{children:[i.jsxs(Ft,{children:[i.jsx(Ut,{children:"전체 파일"}),i.jsx(qt,{$accent:!0,children:(m.totalFiles||0).toLocaleString()})]}),m.filesByType&&Object.entries(m.filesByType).map(([j,S])=>i.jsxs(Ft,{children:[i.jsx(Ut,{children:j}),i.jsx(qt,{children:Number(S).toLocaleString()})]},j))]}),i.jsxs(Ai,{children:[i.jsxs("div",{children:[i.jsx(wn,{children:"타겟 타입"}),i.jsx(br,{value:e,onChange:j=>t(j.target.value),children:w.map(j=>i.jsx("option",{value:j.value,children:j.label},j.value))})]}),i.jsx(To,{type:"number",placeholder:"타겟 ID",value:r,onChange:j=>n(j.target.value),style:{minWidth:110}}),i.jsx(To,{placeholder:"파일 경로/타입 검색…",value:o,onChange:j=>a(j.target.value)}),i.jsx(Oi,{}),e&&r&&i.jsx(bi,{onClick:E,children:"타겟의 모든 파일 삭제"}),i.jsx(zt,{onClick:x,children:"새로고침"})]}),l&&s.length===0?i.jsx(lt,{children:"로딩 중..."}):d?i.jsx(lt,{children:d}):s.length===0?i.jsx(lt,{children:"데이터가 없습니다."}):i.jsx(Io,{children:i.jsxs(Do,{children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx(me,{$align:"right",children:"ID"}),i.jsx(me,{children:"타겟 타입"}),i.jsx(me,{$align:"right",children:"타겟 ID"}),i.jsx(me,{children:"파일 경로"}),i.jsx(me,{children:"파일 타입"}),i.jsx(me,{children:"생성일"}),i.jsx(me,{$align:"center",children:"액션"})]})}),i.jsx("tbody",{children:s.map(j=>i.jsxs("tr",{children:[i.jsxs(ge,{$align:"right",$mono:!0,$muted:!0,children:["#",j.idx]}),i.jsx(ge,{children:j.targetType||"-"}),i.jsx(ge,{$align:"right",$mono:!0,children:j.targetIdx||"-"}),i.jsx(ge,{$ellipsis:!0,$mono:!0,children:j.filePath||"-"}),i.jsx(ge,{$muted:!0,children:j.fileType||"-"}),i.jsx(ge,{$muted:!0,children:j.createdAt?new Date(j.createdAt).toLocaleString("ko-KR"):"-"}),i.jsx(ge,{$align:"center",children:i.jsxs(Ri,{children:[j.downloadUrl&&i.jsx(zt,{as:"a",href:j.downloadUrl,target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"보기"}),i.jsx(bi,{onClick:()=>b(j.idx),children:"삭제"})]})})]},j.idx))})]})})]})},K6=h.div``,G6="http://localhost:8080/api/admin",Y6=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),yc=se.create({baseURL:G6,headers:{"Content-Type":"application/json"}});yc.interceptors.request.use(e=>{const t=Y6();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const ry={loadInitialData:async(e="서울특별시",t=10,r=null)=>{let n=`/location-services/load-data?region=${encodeURIComponent(e)}&maxResultsPerKeyword=${t}`;return r&&(n+=`&customKeywords=${encodeURIComponent(r)}`),(await yc.post(n)).data},fetchDailyStatistics:async(e,t)=>{const r={};return e&&(r.startDate=e),t&&(r.endDate=t),(await yc.get("/statistics/daily",{params:r})).data},initStatistics:async(e=30)=>(await yc.post(`/statistics/init?days=${e}`)).data};function tk(e){var t,r,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(r=tk(e[t]))&&(n&&(n+=" "),n+=r)}else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function Te(){for(var e,t,r=0,n="",o=arguments.length;r<o;r++)(e=arguments[r])&&(t=tk(e))&&(n&&(n+=" "),n+=t);return n}var X6=["dangerouslySetInnerHTML","onCopy","onCopyCapture","onCut","onCutCapture","onPaste","onPasteCapture","onCompositionEnd","onCompositionEndCapture","onCompositionStart","onCompositionStartCapture","onCompositionUpdate","onCompositionUpdateCapture","onFocus","onFocusCapture","onBlur","onBlurCapture","onChange","onChangeCapture","onBeforeInput","onBeforeInputCapture","onInput","onInputCapture","onReset","onResetCapture","onSubmit","onSubmitCapture","onInvalid","onInvalidCapture","onLoad","onLoadCapture","onError","onErrorCapture","onKeyDown","onKeyDownCapture","onKeyPress","onKeyPressCapture","onKeyUp","onKeyUpCapture","onAbort","onAbortCapture","onCanPlay","onCanPlayCapture","onCanPlayThrough","onCanPlayThroughCapture","onDurationChange","onDurationChangeCapture","onEmptied","onEmptiedCapture","onEncrypted","onEncryptedCapture","onEnded","onEndedCapture","onLoadedData","onLoadedDataCapture","onLoadedMetadata","onLoadedMetadataCapture","onLoadStart","onLoadStartCapture","onPause","onPauseCapture","onPlay","onPlayCapture","onPlaying","onPlayingCapture","onProgress","onProgressCapture","onRateChange","onRateChangeCapture","onSeeked","onSeekedCapture","onSeeking","onSeekingCapture","onStalled","onStalledCapture","onSuspend","onSuspendCapture","onTimeUpdate","onTimeUpdateCapture","onVolumeChange","onVolumeChangeCapture","onWaiting","onWaitingCapture","onAuxClick","onAuxClickCapture","onClick","onClickCapture","onContextMenu","onContextMenuCapture","onDoubleClick","onDoubleClickCapture","onDrag","onDragCapture","onDragEnd","onDragEndCapture","onDragEnter","onDragEnterCapture","onDragExit","onDragExitCapture","onDragLeave","onDragLeaveCapture","onDragOver","onDragOverCapture","onDragStart","onDragStartCapture","onDrop","onDropCapture","onMouseDown","onMouseDownCapture","onMouseEnter","onMouseLeave","onMouseMove","onMouseMoveCapture","onMouseOut","onMouseOutCapture","onMouseOver","onMouseOverCapture","onMouseUp","onMouseUpCapture","onSelect","onSelectCapture","onTouchCancel","onTouchCancelCapture","onTouchEnd","onTouchEndCapture","onTouchMove","onTouchMoveCapture","onTouchStart","onTouchStartCapture","onPointerDown","onPointerDownCapture","onPointerMove","onPointerMoveCapture","onPointerUp","onPointerUpCapture","onPointerCancel","onPointerCancelCapture","onPointerEnter","onPointerEnterCapture","onPointerLeave","onPointerLeaveCapture","onPointerOver","onPointerOverCapture","onPointerOut","onPointerOutCapture","onGotPointerCapture","onGotPointerCaptureCapture","onLostPointerCapture","onLostPointerCaptureCapture","onScroll","onScrollCapture","onWheel","onWheelCapture","onAnimationStart","onAnimationStartCapture","onAnimationEnd","onAnimationEndCapture","onAnimationIteration","onAnimationIterationCapture","onTransitionEnd","onTransitionEndCapture"];function Vm(e){if(typeof e!="string")return!1;var t=X6;return t.includes(e)}var Z6=["aria-activedescendant","aria-atomic","aria-autocomplete","aria-busy","aria-checked","aria-colcount","aria-colindex","aria-colspan","aria-controls","aria-current","aria-describedby","aria-details","aria-disabled","aria-errormessage","aria-expanded","aria-flowto","aria-haspopup","aria-hidden","aria-invalid","aria-keyshortcuts","aria-label","aria-labelledby","aria-level","aria-live","aria-modal","aria-multiline","aria-multiselectable","aria-orientation","aria-owns","aria-placeholder","aria-posinset","aria-pressed","aria-readonly","aria-relevant","aria-required","aria-roledescription","aria-rowcount","aria-rowindex","aria-rowspan","aria-selected","aria-setsize","aria-sort","aria-valuemax","aria-valuemin","aria-valuenow","aria-valuetext","className","color","height","id","lang","max","media","method","min","name","style","target","width","role","tabIndex","accentHeight","accumulate","additive","alignmentBaseline","allowReorder","alphabetic","amplitude","arabicForm","ascent","attributeName","attributeType","autoReverse","azimuth","baseFrequency","baselineShift","baseProfile","bbox","begin","bias","by","calcMode","capHeight","clip","clipPath","clipPathUnits","clipRule","colorInterpolation","colorInterpolationFilters","colorProfile","colorRendering","contentScriptType","contentStyleType","cursor","cx","cy","d","decelerate","descent","diffuseConstant","direction","display","divisor","dominantBaseline","dur","dx","dy","edgeMode","elevation","enableBackground","end","exponent","externalResourcesRequired","fill","fillOpacity","fillRule","filter","filterRes","filterUnits","floodColor","floodOpacity","focusable","fontFamily","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontWeight","format","from","fx","fy","g1","g2","glyphName","glyphOrientationHorizontal","glyphOrientationVertical","glyphRef","gradientTransform","gradientUnits","hanging","horizAdvX","horizOriginX","href","ideographic","imageRendering","in2","in","intercept","k1","k2","k3","k4","k","kernelMatrix","kernelUnitLength","kerning","keyPoints","keySplines","keyTimes","lengthAdjust","letterSpacing","lightingColor","limitingConeAngle","local","markerEnd","markerHeight","markerMid","markerStart","markerUnits","markerWidth","mask","maskContentUnits","maskUnits","mathematical","mode","numOctaves","offset","opacity","operator","order","orient","orientation","origin","overflow","overlinePosition","overlineThickness","paintOrder","panose1","pathLength","patternContentUnits","patternTransform","patternUnits","pointerEvents","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","r","radius","refX","refY","renderingIntent","repeatCount","repeatDur","requiredExtensions","requiredFeatures","restart","result","rotate","rx","ry","seed","shapeRendering","slope","spacing","specularConstant","specularExponent","speed","spreadMethod","startOffset","stdDeviation","stemh","stemv","stitchTiles","stopColor","stopOpacity","strikethroughPosition","strikethroughThickness","string","stroke","strokeDasharray","strokeDashoffset","strokeLinecap","strokeLinejoin","strokeMiterlimit","strokeOpacity","strokeWidth","surfaceScale","systemLanguage","tableValues","targetX","targetY","textAnchor","textDecoration","textLength","textRendering","to","transform","u1","u2","underlinePosition","underlineThickness","unicode","unicodeBidi","unicodeRange","unitsPerEm","vAlphabetic","values","vectorEffect","version","vertAdvY","vertOriginX","vertOriginY","vHanging","vIdeographic","viewTarget","visibility","vMathematical","widths","wordSpacing","writingMode","x1","x2","x","xChannelSelector","xHeight","xlinkActuate","xlinkArcrole","xlinkHref","xlinkRole","xlinkShow","xlinkTitle","xlinkType","xmlBase","xmlLang","xmlns","xmlnsXlink","xmlSpace","y1","y2","y","yChannelSelector","z","zoomAndPan","ref","key","angle"],J6=new Set(Z6);function rk(e){return typeof e!="string"?!1:J6.has(e)}function nk(e){return typeof e=="string"&&e.startsWith("data-")}function zr(e){if(typeof e!="object"||e===null)return{};var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(rk(r)||nk(r))&&(t[r]=e[r]);return t}function Za(e){if(e==null)return null;if(p.isValidElement(e)&&typeof e.props=="object"&&e.props!==null){var t=e.props;return zr(t)}return typeof e=="object"&&!Array.isArray(e)?zr(e):null}function Ht(e){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(rk(r)||nk(r)||Vm(r))&&(t[r]=e[r]);return t}function Q6(e){return e==null?null:p.isValidElement(e)?Ht(e.props):typeof e=="object"&&!Array.isArray(e)?Ht(e):null}var e4=["children","width","height","viewBox","className","style","title","desc"];function Sp(){return Sp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Sp.apply(null,arguments)}function t4(e,t){if(e==null)return{};var r,n,o=r4(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function r4(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}var Km=p.forwardRef((e,t)=>{var{children:r,width:n,height:o,viewBox:a,className:s,style:c,title:l,desc:u}=e,d=t4(e,e4),f=a||{width:n,height:o,x:0,y:0},m=Te("recharts-surface",s);return p.createElement("svg",Sp({},Ht(d),{className:m,width:n,height:o,style:c,viewBox:"".concat(f.x," ").concat(f.y," ").concat(f.width," ").concat(f.height),ref:t}),p.createElement("title",null,l),p.createElement("desc",null,u),r)}),n4=["children","className"];function jp(){return jp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},jp.apply(null,arguments)}function o4(e,t){if(e==null)return{};var r,n,o=i4(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function i4(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}var $r=p.forwardRef((e,t)=>{var{children:r,className:n}=e,o=o4(e,n4),a=Te("recharts-layer",n);return p.createElement("g",jp({className:a},Ht(o),{ref:t}),r)}),ok=p.createContext(null),a4=()=>p.useContext(ok),xu={},vu={},ny;function s4(){return ny||(ny=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return r==="__proto__"}e.isUnsafeProperty=t})(vu)),vu}var yu={},oy;function ik(){return oy||(oy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){switch(typeof r){case"number":case"symbol":return!1;case"string":return r.includes(".")||r.includes("[")||r.includes("]")}}e.isDeepKey=t})(yu)),yu}var bu={},iy;function Gm(){return iy||(iy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return typeof r=="string"||typeof r=="symbol"?r:Object.is(r?.valueOf?.(),-0)?"-0":String(r)}e.toKey=t})(bu)),bu}var wu={},$u={},ay;function c4(){return ay||(ay=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){if(r==null)return"";if(typeof r=="string")return r;if(Array.isArray(r))return r.map(t).join(",");const n=String(r);return n==="0"&&Object.is(Number(r),-0)?"-0":n}e.toString=t})($u)),$u}var sy;function Ym(){return sy||(sy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=c4(),r=Gm();function n(o){if(Array.isArray(o))return o.map(r.toKey);if(typeof o=="symbol")return[o];o=t.toString(o);const a=[],s=o.length;if(s===0)return a;let c=0,l="",u="",d=!1;for(o.charCodeAt(0)===46&&(a.push(""),c++);c<s;){const f=o[c];u?f==="\\"&&c+1<s?(c++,l+=o[c]):f===u?u="":l+=f:d?f==='"'||f==="'"?u=f:f==="]"?(d=!1,a.push(l),l=""):l+=f:f==="["?(d=!0,l&&(a.push(l),l="")):f==="."?l&&(a.push(l),l=""):l+=f,c++}return l&&a.push(l),a}e.toPath=n})(wu)),wu}var cy;function Xm(){return cy||(cy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=s4(),r=ik(),n=Gm(),o=Ym();function a(c,l,u){if(c==null)return u;switch(typeof l){case"string":{if(t.isUnsafeProperty(l))return u;const d=c[l];return d===void 0?r.isDeepKey(l)?a(c,o.toPath(l),u):u:d}case"number":case"symbol":{typeof l=="number"&&(l=n.toKey(l));const d=c[l];return d===void 0?u:d}default:{if(Array.isArray(l))return s(c,l,u);if(Object.is(l?.valueOf(),-0)?l="-0":l=String(l),t.isUnsafeProperty(l))return u;const d=c[l];return d===void 0?u:d}}}function s(c,l,u){if(l.length===0)return u;let d=c;for(let f=0;f<l.length;f++){if(d==null||t.isUnsafeProperty(l[f]))return u;d=d[l[f]]}return d===void 0?u:d}e.get=a})(xu)),xu}var Su,ly;function l4(){return ly||(ly=1,Su=Xm().get),Su}var d4=l4();const wi=Pn(d4);var u4=4;function Jn(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:u4,r=10**t,n=Math.round(e*r)/r;return Object.is(n,-0)?0:n}function Ze(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return e.reduce((o,a,s)=>{var c=r[s-1];return typeof c=="string"?o+c+a:c!==void 0?o+Jn(c)+a:o+a},"")}var Xt=e=>e===0?0:e>0?1:-1,Nr=e=>typeof e=="number"&&e!=+e,jn=e=>typeof e=="string"&&e.indexOf("%")===e.length-1,de=e=>(typeof e=="number"||e instanceof Number)&&!Nr(e),sn=e=>de(e)||typeof e=="string",h4=0,Ta=e=>{var t=++h4;return"".concat(e||"").concat(t)},Br=function(t,r){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;if(!de(t)&&typeof t!="string")return n;var a;if(jn(t)){if(r==null)return n;var s=t.indexOf("%");a=r*parseFloat(t.slice(0,s))/100}else a=+t;return Nr(a)&&(a=n),o&&r!=null&&a>r&&(a=r),a},ak=e=>{if(!Array.isArray(e))return!1;for(var t=e.length,r={},n=0;n<t;n++)if(!r[String(e[n])])r[String(e[n])]=!0;else return!0;return!1};function Je(e,t,r){return de(e)&&de(t)?Jn(e+r*(t-e)):t}function sk(e,t,r){if(!(!e||!e.length))return e.find(n=>n&&(typeof t=="function"?t(n):wi(n,t))===r)}var Ke=e=>e===null||typeof e>"u",Ja=e=>Ke(e)?e:"".concat(e.charAt(0).toUpperCase()).concat(e.slice(1));function f4(e){return e!=null}function Qa(){}var p4=["type","size","sizeType"];function kp(){return kp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},kp.apply(null,arguments)}function dy(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function uy(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?dy(Object(r),!0).forEach(function(n){m4(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):dy(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function m4(e,t,r){return(t=g4(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function g4(e){var t=x4(e,"string");return typeof t=="symbol"?t:t+""}function x4(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function v4(e,t){if(e==null)return{};var r,n,o=y4(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function y4(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}var ck={symbolCircle:Rm,symbolCross:OO,symbolDiamond:TO,symbolSquare:IO,symbolStar:MO,symbolTriangle:zO,symbolWye:BO},b4=Math.PI/180,w4=e=>{var t="symbol".concat(Ja(e));return ck[t]||Rm},$4=(e,t,r)=>{if(t==="area")return e;switch(r){case"cross":return 5*e*e/9;case"diamond":return .5*e*e/Math.sqrt(3);case"square":return e*e;case"star":{var n=18*b4;return 1.25*e*e*(Math.tan(n)-Math.tan(n*2)*Math.tan(n)**2)}case"triangle":return Math.sqrt(3)*e*e/4;case"wye":return(21-10*Math.sqrt(3))*e*e/8;default:return Math.PI*e*e/4}},S4=(e,t)=>{ck["symbol".concat(Ja(e))]=t},Zm=e=>{var{type:t="circle",size:r=64,sizeType:n="area"}=e,o=v4(e,p4),a=uy(uy({},o),{},{type:t,size:r,sizeType:n}),s="circle";typeof t=="string"&&(s=t);var c=()=>{var m=w4(s),g=FO().type(m).size($4(r,n,s)),x=g();if(x!==null)return x},{className:l,cx:u,cy:d}=a,f=Ht(a);return de(u)&&de(d)&&de(r)?p.createElement("path",kp({},f,{className:Te("recharts-symbols",l),transform:"translate(".concat(u,", ").concat(d,")"),d:c()})):null};Zm.registerSymbol=S4;var lk=e=>"radius"in e&&"startAngle"in e&&"endAngle"in e,Jm=(e,t)=>{if(!e||typeof e=="function"||typeof e=="boolean")return null;var r=e;if(p.isValidElement(e)&&(r=e.props),typeof r!="object"&&typeof r!="function")return null;var n={};return Object.keys(r).forEach(o=>{Vm(o)&&(n[o]=(a=>r[o](r,a)))}),n},j4=(e,t,r)=>n=>(e(t,r,n),null),zl=(e,t,r)=>{if(e===null||typeof e!="object"&&typeof e!="function")return null;var n=null;return Object.keys(e).forEach(o=>{var a=e[o];Vm(o)&&typeof a=="function"&&(n||(n={}),n[o]=j4(a,t,r))}),n};function hy(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function k4(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?hy(Object(r),!0).forEach(function(n){E4(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):hy(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function E4(e,t,r){return(t=C4(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function C4(e){var t=P4(e,"string");return typeof t=="symbol"?t:t+""}function P4(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Ot(e,t){var r=k4({},e),n=t,o=Object.keys(t),a=o.reduce((s,c)=>(s[c]===void 0&&n[c]!==void 0&&(s[c]=n[c]),s),r);return a}function Mc(){return Mc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Mc.apply(null,arguments)}function fy(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function A4(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?fy(Object(r),!0).forEach(function(n){O4(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):fy(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function O4(e,t,r){return(t=R4(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function R4(e){var t=T4(e,"string");return typeof t=="symbol"?t:t+""}function T4(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var gr=32,I4={align:"center",iconSize:14,inactiveColor:"#ccc",layout:"horizontal",verticalAlign:"middle"};function D4(e){var{data:t,iconType:r,inactiveColor:n}=e,o=gr/2,a=gr/6,s=gr/3,c=t.inactive?n:t.color,l=r??t.type;if(l==="none")return null;if(l==="plainline"){var u;return p.createElement("line",{strokeWidth:4,fill:"none",stroke:c,strokeDasharray:(u=t.payload)===null||u===void 0?void 0:u.strokeDasharray,x1:0,y1:o,x2:gr,y2:o,className:"recharts-legend-icon"})}if(l==="line")return p.createElement("path",{strokeWidth:4,fill:"none",stroke:c,d:"M0,".concat(o,"h").concat(s,`
            A`).concat(a,",").concat(a,",0,1,1,").concat(2*s,",").concat(o,`
            H`).concat(gr,"M").concat(2*s,",").concat(o,`
            A`).concat(a,",").concat(a,",0,1,1,").concat(s,",").concat(o),className:"recharts-legend-icon"});if(l==="rect")return p.createElement("path",{stroke:"none",fill:c,d:"M0,".concat(gr/8,"h").concat(gr,"v").concat(gr*3/4,"h").concat(-gr,"z"),className:"recharts-legend-icon"});if(p.isValidElement(t.legendIcon)){var d=A4({},t);return delete d.legendIcon,p.cloneElement(t.legendIcon,d)}return p.createElement(Zm,{fill:c,cx:o,cy:o,size:gr,sizeType:"diameter",type:l})}function _4(e){var{payload:t,iconSize:r,layout:n,formatter:o,inactiveColor:a,iconType:s}=e,c={x:0,y:0,width:gr,height:gr},l={display:n==="horizontal"?"inline-block":"block",marginRight:10},u={display:"inline-block",verticalAlign:"middle",marginRight:4};return t.map((d,f)=>{var m=d.formatter||o,g=Te({"recharts-legend-item":!0,["legend-item-".concat(f)]:!0,inactive:d.inactive});if(d.type==="none")return null;var x=d.inactive?a:d.color,v=m?m(d.value,d,f):d.value;return p.createElement("li",Mc({className:g,style:l,key:"legend-item-".concat(f)},zl(e,d,f)),p.createElement(Km,{width:r,height:r,viewBox:c,style:u,"aria-label":"".concat(v," legend icon")},p.createElement(D4,{data:d,iconType:s,inactiveColor:a})),p.createElement("span",{className:"recharts-legend-item-text",style:{color:x}},v))})}var L4=e=>{var t=Ot(e,I4),{payload:r,layout:n,align:o}=t;if(!r||!r.length)return null;var a={padding:0,margin:0,textAlign:n==="horizontal"?o:"left"};return p.createElement("ul",{className:"recharts-default-legend",style:a},p.createElement(_4,Mc({},t,{payload:r})))},ju={},ku={},py;function M4(){return py||(py=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r,n){const o=new Map;for(let a=0;a<r.length;a++){const s=r[a],c=n(s);o.has(c)||o.set(c,s)}return Array.from(o.values())}e.uniqBy=t})(ku)),ku}var Eu={},my;function dk(){return my||(my=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return r}e.identity=t})(Eu)),Eu}var Cu={},Pu={},Au={},gy;function z4(){return gy||(gy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return Number.isSafeInteger(r)&&r>=0}e.isLength=t})(Au)),Au}var xy;function Qm(){return xy||(xy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=z4();function r(n){return n!=null&&typeof n!="function"&&t.isLength(n.length)}e.isArrayLike=r})(Pu)),Pu}var Ou={},vy;function N4(){return vy||(vy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return typeof r=="object"&&r!==null}e.isObjectLike=t})(Ou)),Ou}var yy;function B4(){return yy||(yy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=Qm(),r=N4();function n(o){return r.isObjectLike(o)&&t.isArrayLike(o)}e.isArrayLikeObject=n})(Cu)),Cu}var Ru={},Tu={},by;function F4(){return by||(by=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=Xm();function r(n){return function(o){return t.get(o,n)}}e.property=r})(Tu)),Tu}var Iu={},Du={},_u={},Lu={},wy;function uk(){return wy||(wy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return r!==null&&(typeof r=="object"||typeof r=="function")}e.isObject=t})(Lu)),Lu}var Mu={},$y;function hk(){return $y||($y=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return r==null||typeof r!="object"&&typeof r!="function"}e.isPrimitive=t})(Mu)),Mu}var zu={},Sy;function fk(){return Sy||(Sy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r,n){return r===n||Number.isNaN(r)&&Number.isNaN(n)}e.eq=t})(zu)),zu}var jy;function U4(){return jy||(jy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=uk(),r=hk(),n=fk();function o(d,f,m){return typeof m!="function"?o(d,f,()=>{}):a(d,f,function g(x,v,b,E,w,j){const S=m(x,v,b,E,w,j);return S!==void 0?!!S:a(x,v,g,j)},new Map)}function a(d,f,m,g){if(f===d)return!0;switch(typeof f){case"object":return s(d,f,m,g);case"function":return Object.keys(f).length>0?a(d,{...f},m,g):n.eq(d,f);default:return t.isObject(d)?typeof f=="string"?f==="":!0:n.eq(d,f)}}function s(d,f,m,g){if(f==null)return!0;if(Array.isArray(f))return l(d,f,m,g);if(f instanceof Map)return c(d,f,m,g);if(f instanceof Set)return u(d,f,m,g);const x=Object.keys(f);if(d==null||r.isPrimitive(d))return x.length===0;if(x.length===0)return!0;if(g?.has(f))return g.get(f)===d;g?.set(f,d);try{for(let v=0;v<x.length;v++){const b=x[v];if(!r.isPrimitive(d)&&!(b in d)||f[b]===void 0&&d[b]!==void 0||f[b]===null&&d[b]!==null||!m(d[b],f[b],b,d,f,g))return!1}return!0}finally{g?.delete(f)}}function c(d,f,m,g){if(f.size===0)return!0;if(!(d instanceof Map))return!1;for(const[x,v]of f.entries()){const b=d.get(x);if(m(b,v,x,d,f,g)===!1)return!1}return!0}function l(d,f,m,g){if(f.length===0)return!0;if(!Array.isArray(d))return!1;const x=new Set;for(let v=0;v<f.length;v++){const b=f[v];let E=!1;for(let w=0;w<d.length;w++){if(x.has(w))continue;const j=d[w];let S=!1;if(m(j,b,v,d,f,g)&&(S=!0),S){x.add(w),E=!0;break}}if(!E)return!1}return!0}function u(d,f,m,g){return f.size===0?!0:d instanceof Set?l([...d],[...f],m,g):!1}e.isMatchWith=o,e.isSetMatch=u})(_u)),_u}var ky;function pk(){return ky||(ky=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=U4();function r(n,o){return t.isMatchWith(n,o,()=>{})}e.isMatch=r})(Du)),Du}var Nu={},Bu={},Fu={},Ey;function q4(){return Ey||(Ey=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return Object.getOwnPropertySymbols(r).filter(n=>Object.prototype.propertyIsEnumerable.call(r,n))}e.getSymbols=t})(Fu)),Fu}var Uu={},Cy;function mk(){return Cy||(Cy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return r==null?r===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(r)}e.getTag=t})(Uu)),Uu}var qu={},Py;function gk(){return Py||(Py=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t="[object RegExp]",r="[object String]",n="[object Number]",o="[object Boolean]",a="[object Arguments]",s="[object Symbol]",c="[object Date]",l="[object Map]",u="[object Set]",d="[object Array]",f="[object Function]",m="[object ArrayBuffer]",g="[object Object]",x="[object Error]",v="[object DataView]",b="[object Uint8Array]",E="[object Uint8ClampedArray]",w="[object Uint16Array]",j="[object Uint32Array]",S="[object BigUint64Array]",y="[object Int8Array]",k="[object Int16Array]",$="[object Int32Array]",C="[object BigInt64Array]",P="[object Float32Array]",z="[object Float64Array]";e.argumentsTag=a,e.arrayBufferTag=m,e.arrayTag=d,e.bigInt64ArrayTag=C,e.bigUint64ArrayTag=S,e.booleanTag=o,e.dataViewTag=v,e.dateTag=c,e.errorTag=x,e.float32ArrayTag=P,e.float64ArrayTag=z,e.functionTag=f,e.int16ArrayTag=k,e.int32ArrayTag=$,e.int8ArrayTag=y,e.mapTag=l,e.numberTag=n,e.objectTag=g,e.regexpTag=t,e.setTag=u,e.stringTag=r,e.symbolTag=s,e.uint16ArrayTag=w,e.uint32ArrayTag=j,e.uint8ArrayTag=b,e.uint8ClampedArrayTag=E})(qu)),qu}var Wu={},Ay;function W4(){return Ay||(Ay=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}e.isTypedArray=t})(Wu)),Wu}var Oy;function xk(){return Oy||(Oy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=q4(),r=mk(),n=gk(),o=hk(),a=W4();function s(d,f){return c(d,void 0,d,new Map,f)}function c(d,f,m,g=new Map,x=void 0){const v=x?.(d,f,m,g);if(v!==void 0)return v;if(o.isPrimitive(d))return d;if(g.has(d))return g.get(d);if(Array.isArray(d)){const b=new Array(d.length);g.set(d,b);for(let E=0;E<d.length;E++)b[E]=c(d[E],E,m,g,x);return Object.hasOwn(d,"index")&&(b.index=d.index),Object.hasOwn(d,"input")&&(b.input=d.input),b}if(d instanceof Date)return new Date(d.getTime());if(d instanceof RegExp){const b=new RegExp(d.source,d.flags);return b.lastIndex=d.lastIndex,b}if(d instanceof Map){const b=new Map;g.set(d,b);for(const[E,w]of d)b.set(E,c(w,E,m,g,x));return b}if(d instanceof Set){const b=new Set;g.set(d,b);for(const E of d)b.add(c(E,void 0,m,g,x));return b}if(typeof Buffer<"u"&&Buffer.isBuffer(d))return d.subarray();if(a.isTypedArray(d)){const b=new(Object.getPrototypeOf(d)).constructor(d.length);g.set(d,b);for(let E=0;E<d.length;E++)b[E]=c(d[E],E,m,g,x);return b}if(d instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&d instanceof SharedArrayBuffer)return d.slice(0);if(d instanceof DataView){const b=new DataView(d.buffer.slice(0),d.byteOffset,d.byteLength);return g.set(d,b),l(b,d,m,g,x),b}if(typeof File<"u"&&d instanceof File){const b=new File([d],d.name,{type:d.type});return g.set(d,b),l(b,d,m,g,x),b}if(typeof Blob<"u"&&d instanceof Blob){const b=new Blob([d],{type:d.type});return g.set(d,b),l(b,d,m,g,x),b}if(d instanceof Error){const b=new d.constructor;return g.set(d,b),b.message=d.message,b.name=d.name,b.stack=d.stack,b.cause=d.cause,l(b,d,m,g,x),b}if(d instanceof Boolean){const b=new Boolean(d.valueOf());return g.set(d,b),l(b,d,m,g,x),b}if(d instanceof Number){const b=new Number(d.valueOf());return g.set(d,b),l(b,d,m,g,x),b}if(d instanceof String){const b=new String(d.valueOf());return g.set(d,b),l(b,d,m,g,x),b}if(typeof d=="object"&&u(d)){const b=Object.create(Object.getPrototypeOf(d));return g.set(d,b),l(b,d,m,g,x),b}return d}function l(d,f,m=d,g,x){const v=[...Object.keys(f),...t.getSymbols(f)];for(let b=0;b<v.length;b++){const E=v[b],w=Object.getOwnPropertyDescriptor(d,E);(w==null||w.writable)&&(d[E]=c(f[E],E,m,g,x))}}function u(d){switch(r.getTag(d)){case n.argumentsTag:case n.arrayTag:case n.arrayBufferTag:case n.dataViewTag:case n.booleanTag:case n.dateTag:case n.float32ArrayTag:case n.float64ArrayTag:case n.int8ArrayTag:case n.int16ArrayTag:case n.int32ArrayTag:case n.mapTag:case n.numberTag:case n.objectTag:case n.regexpTag:case n.setTag:case n.stringTag:case n.symbolTag:case n.uint8ArrayTag:case n.uint8ClampedArrayTag:case n.uint16ArrayTag:case n.uint32ArrayTag:return!0;default:return!1}}e.cloneDeepWith=s,e.cloneDeepWithImpl=c,e.copyProperties=l})(Bu)),Bu}var Ry;function H4(){return Ry||(Ry=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=xk();function r(n){return t.cloneDeepWithImpl(n,void 0,n,new Map,void 0)}e.cloneDeep=r})(Nu)),Nu}var Ty;function V4(){return Ty||(Ty=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=pk(),r=H4();function n(o){return o=r.cloneDeep(o),a=>t.isMatch(a,o)}e.matches=n})(Iu)),Iu}var Hu={},Vu={},Ku={},Iy;function K4(){return Iy||(Iy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=xk(),r=gk();function n(o,a){return t.cloneDeepWith(o,(s,c,l,u)=>{const d=a?.(s,c,l,u);if(d!==void 0)return d;if(typeof o=="object")switch(Object.prototype.toString.call(o)){case r.numberTag:case r.stringTag:case r.booleanTag:{const f=new o.constructor(o?.valueOf());return t.copyProperties(f,o),f}case r.argumentsTag:{const f={};return t.copyProperties(f,o),f.length=o.length,f[Symbol.iterator]=o[Symbol.iterator],f}default:return}})}e.cloneDeepWith=n})(Ku)),Ku}var Dy;function G4(){return Dy||(Dy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=K4();function r(n){return t.cloneDeepWith(n)}e.cloneDeep=r})(Vu)),Vu}var Gu={},Yu={},_y;function vk(){return _y||(_y=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=/^(?:0|[1-9]\d*)$/;function r(n,o=Number.MAX_SAFE_INTEGER){switch(typeof n){case"number":return Number.isInteger(n)&&n>=0&&n<o;case"symbol":return!1;case"string":return t.test(n)}}e.isIndex=r})(Yu)),Yu}var Xu={},Ly;function Y4(){return Ly||(Ly=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=mk();function r(n){return n!==null&&typeof n=="object"&&t.getTag(n)==="[object Arguments]"}e.isArguments=r})(Xu)),Xu}var My;function X4(){return My||(My=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=ik(),r=vk(),n=Y4(),o=Ym();function a(s,c){let l;if(Array.isArray(c)?l=c:typeof c=="string"&&t.isDeepKey(c)&&s?.[c]==null?l=o.toPath(c):l=[c],l.length===0)return!1;let u=s;for(let d=0;d<l.length;d++){const f=l[d];if((u==null||!Object.hasOwn(u,f))&&!((Array.isArray(u)||n.isArguments(u))&&r.isIndex(f)&&f<u.length))return!1;u=u[f]}return!0}e.has=a})(Gu)),Gu}var zy;function Z4(){return zy||(zy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=pk(),r=Gm(),n=G4(),o=Xm(),a=X4();function s(c,l){switch(typeof c){case"object":{Object.is(c?.valueOf(),-0)&&(c="-0");break}case"number":{c=r.toKey(c);break}}return l=n.cloneDeep(l),function(u){const d=o.get(u,c);return d===void 0?a.has(u,c):l===void 0?d===void 0:t.isMatch(d,l)}}e.matchesProperty=s})(Hu)),Hu}var Ny;function J4(){return Ny||(Ny=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=dk(),r=F4(),n=V4(),o=Z4();function a(s){if(s==null)return t.identity;switch(typeof s){case"function":return s;case"object":return Array.isArray(s)&&s.length===2?o.matchesProperty(s[0],s[1]):n.matches(s);case"string":case"symbol":case"number":return r.property(s)}}e.iteratee=a})(Ru)),Ru}var By;function Q4(){return By||(By=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=M4(),r=dk(),n=B4(),o=J4();function a(s,c=r.identity){return n.isArrayLikeObject(s)?t.uniqBy(Array.from(s),o.iteratee(c)):[]}e.uniqBy=a})(ju)),ju}var Zu,Fy;function e5(){return Fy||(Fy=1,Zu=Q4().uniqBy),Zu}var t5=e5();const Uy=Pn(t5);function yk(e,t,r){return t===!0?Uy(e,r):typeof t=="function"?Uy(e,t):e}var Ju={exports:{}},Qu={},eh={exports:{}},th={};var qy;function r5(){if(qy)return th;qy=1;var e=ym();function t(f,m){return f===m&&(f!==0||1/f===1/m)||f!==f&&m!==m}var r=typeof Object.is=="function"?Object.is:t,n=e.useState,o=e.useEffect,a=e.useLayoutEffect,s=e.useDebugValue;function c(f,m){var g=m(),x=n({inst:{value:g,getSnapshot:m}}),v=x[0].inst,b=x[1];return a(function(){v.value=g,v.getSnapshot=m,l(v)&&b({inst:v})},[f,g,m]),o(function(){return l(v)&&b({inst:v}),f(function(){l(v)&&b({inst:v})})},[f]),s(g),g}function l(f){var m=f.getSnapshot;f=f.value;try{var g=m();return!r(f,g)}catch{return!0}}function u(f,m){return m()}var d=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?u:c;return th.useSyncExternalStore=e.useSyncExternalStore!==void 0?e.useSyncExternalStore:d,th}var Wy;function n5(){return Wy||(Wy=1,eh.exports=r5()),eh.exports}var Hy;function o5(){if(Hy)return Qu;Hy=1;var e=ym(),t=n5();function r(u,d){return u===d&&(u!==0||1/u===1/d)||u!==u&&d!==d}var n=typeof Object.is=="function"?Object.is:r,o=t.useSyncExternalStore,a=e.useRef,s=e.useEffect,c=e.useMemo,l=e.useDebugValue;return Qu.useSyncExternalStoreWithSelector=function(u,d,f,m,g){var x=a(null);if(x.current===null){var v={hasValue:!1,value:null};x.current=v}else v=x.current;x=c(function(){function E(k){if(!w){if(w=!0,j=k,k=m(k),g!==void 0&&v.hasValue){var $=v.value;if(g($,k))return S=$}return S=k}if($=S,n(j,k))return $;var C=m(k);return g!==void 0&&g($,C)?(j=k,$):(j=k,S=C)}var w=!1,j,S,y=f===void 0?null:f;return[function(){return E(d())},y===null?void 0:function(){return E(y())}]},[d,f,m,g]);var b=o(u,x[0],x[1]);return s(function(){v.hasValue=!0,v.value=b},[b]),l(b),b},Qu}var Vy;function i5(){return Vy||(Vy=1,Ju.exports=o5()),Ju.exports}var a5=i5(),eg=p.createContext(null),s5=e=>e,Xe=()=>{var e=p.useContext(eg);return e?e.store.dispatch:s5},bc=()=>{},c5=()=>bc,l5=(e,t)=>e===t;function ue(e){var t=p.useContext(eg);return a5.useSyncExternalStoreWithSelector(t?t.subscription.addNestedSub:c5,t?t.store.getState:bc,t?t.store.getState:bc,t?e:bc,l5)}function d5(e,t=`expected a function, instead received ${typeof e}`){if(typeof e!="function")throw new TypeError(t)}function u5(e,t=`expected an object, instead received ${typeof e}`){if(typeof e!="object")throw new TypeError(t)}function h5(e,t="expected all items to be functions, instead received the following types: "){if(!e.every(r=>typeof r=="function")){const r=e.map(n=>typeof n=="function"?`function ${n.name||"unnamed"}()`:typeof n).join(", ");throw new TypeError(`${t}[${r}]`)}}var Ky=e=>Array.isArray(e)?e:[e];function f5(e){const t=Array.isArray(e[0])?e[0]:e;return h5(t,"createSelector expects all input-selectors to be functions, but received the following types: "),t}function p5(e,t){const r=[],{length:n}=e;for(let o=0;o<n;o++)r.push(e[o].apply(null,t));return r}var m5=class{constructor(e){this.value=e}deref(){return this.value}},g5=typeof WeakRef<"u"?WeakRef:m5,x5=0,Gy=1;function Ls(){return{s:x5,v:void 0,o:null,p:null}}function bk(e,t={}){let r=Ls();const{resultEqualityCheck:n}=t;let o,a=0;function s(){let c=r;const{length:l}=arguments;for(let f=0,m=l;f<m;f++){const g=arguments[f];if(typeof g=="function"||typeof g=="object"&&g!==null){let x=c.o;x===null&&(c.o=x=new WeakMap);const v=x.get(g);v===void 0?(c=Ls(),x.set(g,c)):c=v}else{let x=c.p;x===null&&(c.p=x=new Map);const v=x.get(g);v===void 0?(c=Ls(),x.set(g,c)):c=v}}const u=c;let d;if(c.s===Gy)d=c.v;else if(d=e.apply(null,arguments),a++,n){const f=o?.deref?.()??o;f!=null&&n(f,d)&&(d=f,a!==0&&a--),o=typeof d=="object"&&d!==null||typeof d=="function"?new g5(d):d}return u.s=Gy,u.v=d,d}return s.clearCache=()=>{r=Ls(),s.resetResultsCount()},s.resultsCount=()=>a,s.resetResultsCount=()=>{a=0},s}function v5(e,...t){const r=typeof e=="function"?{memoize:e,memoizeOptions:t}:e,n=(...o)=>{let a=0,s=0,c,l={},u=o.pop();typeof u=="object"&&(l=u,u=o.pop()),d5(u,`createSelector expects an output function after the inputs, but received: [${typeof u}]`);const d={...r,...l},{memoize:f,memoizeOptions:m=[],argsMemoize:g=bk,argsMemoizeOptions:x=[]}=d,v=Ky(m),b=Ky(x),E=f5(o),w=f(function(){return a++,u.apply(null,arguments)},...v),j=g(function(){s++;const y=p5(E,arguments);return c=w.apply(null,y),c},...b);return Object.assign(j,{resultFunc:u,memoizedResultFunc:w,dependencies:E,dependencyRecomputations:()=>s,resetDependencyRecomputations:()=>{s=0},lastResult:()=>c,recomputations:()=>a,resetRecomputations:()=>{a=0},memoize:f,argsMemoize:g})};return Object.assign(n,{withTypes:()=>n}),n}var V=v5(bk),y5=Object.assign((e,t=V)=>{u5(e,`createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`);const r=Object.keys(e),n=r.map(a=>e[a]);return t(n,(...a)=>a.reduce((s,c,l)=>(s[r[l]]=c,s),{}))},{withTypes:()=>y5}),rh={},nh={},oh={},Yy;function b5(){return Yy||(Yy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return typeof n=="symbol"?1:n===null?2:n===void 0?3:n!==n?4:0}const r=(n,o,a)=>{if(n!==o){const s=t(n),c=t(o);if(s===c&&s===0){if(n<o)return a==="desc"?1:-1;if(n>o)return a==="desc"?-1:1}return a==="desc"?c-s:s-c}return 0};e.compareValues=r})(oh)),oh}var ih={},ah={},Xy;function wk(){return Xy||(Xy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return typeof r=="symbol"||r instanceof Symbol}e.isSymbol=t})(ah)),ah}var Zy;function w5(){return Zy||(Zy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=wk(),r=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,n=/^\w*$/;function o(a,s){return Array.isArray(a)?!1:typeof a=="number"||typeof a=="boolean"||a==null||t.isSymbol(a)?!0:typeof a=="string"&&(n.test(a)||!r.test(a))||s!=null&&Object.hasOwn(s,a)}e.isKey=o})(ih)),ih}var Jy;function $5(){return Jy||(Jy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=b5(),r=w5(),n=Ym();function o(a,s,c,l){if(a==null)return[];c=l?void 0:c,Array.isArray(a)||(a=Object.values(a)),Array.isArray(s)||(s=s==null?[null]:[s]),s.length===0&&(s=[null]),Array.isArray(c)||(c=c==null?[]:[c]),c=c.map(g=>String(g));const u=(g,x)=>{let v=g;for(let b=0;b<x.length&&v!=null;++b)v=v[x[b]];return v},d=(g,x)=>x==null||g==null?x:typeof g=="object"&&"key"in g?Object.hasOwn(x,g.key)?x[g.key]:u(x,g.path):typeof g=="function"?g(x):Array.isArray(g)?u(x,g):typeof x=="object"?x[g]:x,f=s.map(g=>(Array.isArray(g)&&g.length===1&&(g=g[0]),g==null||typeof g=="function"||Array.isArray(g)||r.isKey(g)?g:{key:g,path:n.toPath(g)}));return a.map(g=>({original:g,criteria:f.map(x=>d(x,g))})).slice().sort((g,x)=>{for(let v=0;v<f.length;v++){const b=t.compareValues(g.criteria[v],x.criteria[v],c[v]);if(b!==0)return b}return 0}).map(g=>g.original)}e.orderBy=o})(nh)),nh}var sh={},Qy;function S5(){return Qy||(Qy=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r,n=1){const o=[],a=Math.floor(n),s=(c,l)=>{for(let u=0;u<c.length;u++){const d=c[u];Array.isArray(d)&&l<a?s(d,l+1):o.push(d)}};return s(r,0),o}e.flatten=t})(sh)),sh}var ch={},eb;function $k(){return eb||(eb=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=vk(),r=Qm(),n=uk(),o=fk();function a(s,c,l){return n.isObject(l)&&(typeof c=="number"&&r.isArrayLike(l)&&t.isIndex(c)&&c<l.length||typeof c=="string"&&c in l)?o.eq(l[c],s):!1}e.isIterateeCall=a})(ch)),ch}var tb;function j5(){return tb||(tb=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=$5(),r=S5(),n=$k();function o(a,...s){const c=s.length;return c>1&&n.isIterateeCall(a,s[0],s[1])?s=[]:c>2&&n.isIterateeCall(s[0],s[1],s[2])&&(s=[s[0]]),t.orderBy(a,r.flatten(s),["asc"])}e.sortBy=o})(rh)),rh}var lh,rb;function k5(){return rb||(rb=1,lh=j5().sortBy),lh}var E5=k5();const Nl=Pn(E5);var Sk=e=>e.legend.settings,C5=e=>e.legend.size,P5=e=>e.legend.payload,A5=V([P5,Sk],(e,t)=>{var{itemSorter:r}=t,n=e.flat(1);return r?Nl(n,r):n});function O5(){return ue(A5)}var Ms=1;function jk(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],[t,r]=p.useState({height:0,left:0,top:0,width:0}),n=p.useCallback(o=>{if(o!=null){var a=o.getBoundingClientRect(),s={height:a.height,left:a.left,top:a.top,width:a.width};(Math.abs(s.height-t.height)>Ms||Math.abs(s.left-t.left)>Ms||Math.abs(s.top-t.top)>Ms||Math.abs(s.width-t.width)>Ms)&&r({height:s.height,left:s.left,top:s.top,width:s.width})}},[t.width,t.height,t.top,t.left,...e]);return[t,n]}function Ct(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var R5=typeof Symbol=="function"&&Symbol.observable||"@@observable",nb=R5,dh=()=>Math.random().toString(36).substring(7).split("").join("."),T5={INIT:`@@redux/INIT${dh()}`,REPLACE:`@@redux/REPLACE${dh()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${dh()}`},zc=T5;function tg(e){if(typeof e!="object"||e===null)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function kk(e,t,r){if(typeof e!="function")throw new Error(Ct(2));if(typeof t=="function"&&typeof r=="function"||typeof r=="function"&&typeof arguments[3]=="function")throw new Error(Ct(0));if(typeof t=="function"&&typeof r>"u"&&(r=t,t=void 0),typeof r<"u"){if(typeof r!="function")throw new Error(Ct(1));return r(kk)(e,t)}let n=e,o=t,a=new Map,s=a,c=0,l=!1;function u(){s===a&&(s=new Map,a.forEach((b,E)=>{s.set(E,b)}))}function d(){if(l)throw new Error(Ct(3));return o}function f(b){if(typeof b!="function")throw new Error(Ct(4));if(l)throw new Error(Ct(5));let E=!0;u();const w=c++;return s.set(w,b),function(){if(E){if(l)throw new Error(Ct(6));E=!1,u(),s.delete(w),a=null}}}function m(b){if(!tg(b))throw new Error(Ct(7));if(typeof b.type>"u")throw new Error(Ct(8));if(typeof b.type!="string")throw new Error(Ct(17));if(l)throw new Error(Ct(9));try{l=!0,o=n(o,b)}finally{l=!1}return(a=s).forEach(w=>{w()}),b}function g(b){if(typeof b!="function")throw new Error(Ct(10));n=b,m({type:zc.REPLACE})}function x(){const b=f;return{subscribe(E){if(typeof E!="object"||E===null)throw new Error(Ct(11));function w(){const S=E;S.next&&S.next(d())}return w(),{unsubscribe:b(w)}},[nb](){return this}}}return m({type:zc.INIT}),{dispatch:m,subscribe:f,getState:d,replaceReducer:g,[nb]:x}}function I5(e){Object.keys(e).forEach(t=>{const r=e[t];if(typeof r(void 0,{type:zc.INIT})>"u")throw new Error(Ct(12));if(typeof r(void 0,{type:zc.PROBE_UNKNOWN_ACTION()})>"u")throw new Error(Ct(13))})}function Ek(e){const t=Object.keys(e),r={};for(let a=0;a<t.length;a++){const s=t[a];typeof e[s]=="function"&&(r[s]=e[s])}const n=Object.keys(r);let o;try{I5(r)}catch(a){o=a}return function(s={},c){if(o)throw o;let l=!1;const u={};for(let d=0;d<n.length;d++){const f=n[d],m=r[f],g=s[f],x=m(g,c);if(typeof x>"u")throw c&&c.type,new Error(Ct(14));u[f]=x,l=l||x!==g}return l=l||n.length!==Object.keys(s).length,l?u:s}}function Nc(...e){return e.length===0?t=>t:e.length===1?e[0]:e.reduce((t,r)=>(...n)=>t(r(...n)))}function D5(...e){return t=>(r,n)=>{const o=t(r,n);let a=()=>{throw new Error(Ct(15))};const s={getState:o.getState,dispatch:(l,...u)=>a(l,...u)},c=e.map(l=>l(s));return a=Nc(...c)(o.dispatch),{...o,dispatch:a}}}function Ck(e){return tg(e)&&"type"in e&&typeof e.type=="string"}var Pk=Symbol.for("immer-nothing"),ob=Symbol.for("immer-draftable"),Vt=Symbol.for("immer-state");function Dr(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var sr=Object,$i=sr.getPrototypeOf,Bc="constructor",Bl="prototype",Ep="configurable",Fc="enumerable",wc="writable",Ia="value",kn=e=>!!e&&!!e[Vt];function Fr(e){return e?Ak(e)||Fl(e)||!!e[ob]||!!e[Bc]?.[ob]||Ul(e)||ql(e):!1}var _5=sr[Bl][Bc].toString(),ib=new WeakMap;function Ak(e){if(!e||!rg(e))return!1;const t=$i(e);if(t===null||t===sr[Bl])return!0;const r=sr.hasOwnProperty.call(t,Bc)&&t[Bc];if(r===Object)return!0;if(!oi(r))return!1;let n=ib.get(r);return n===void 0&&(n=Function.toString.call(r),ib.set(r,n)),n===_5}function es(e,t,r=!0){ts(e)===0?(r?Reflect.ownKeys(e):sr.keys(e)).forEach(o=>{t(o,e[o],e)}):e.forEach((n,o)=>t(o,n,e))}function ts(e){const t=e[Vt];return t?t.type_:Fl(e)?1:Ul(e)?2:ql(e)?3:0}var ab=(e,t,r=ts(e))=>r===2?e.has(t):sr[Bl].hasOwnProperty.call(e,t),Cp=(e,t,r=ts(e))=>r===2?e.get(t):e[t],Uc=(e,t,r,n=ts(e))=>{n===2?e.set(t,r):n===3?e.add(r):e[t]=r};function L5(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}var Fl=Array.isArray,Ul=e=>e instanceof Map,ql=e=>e instanceof Set,rg=e=>typeof e=="object",oi=e=>typeof e=="function",uh=e=>typeof e=="boolean",xn=e=>e.copy_||e.base_,ng=e=>e.modified_?e.copy_:e.base_;function Pp(e,t){if(Ul(e))return new Map(e);if(ql(e))return new Set(e);if(Fl(e))return Array[Bl].slice.call(e);const r=Ak(e);if(t===!0||t==="class_only"&&!r){const n=sr.getOwnPropertyDescriptors(e);delete n[Vt];let o=Reflect.ownKeys(n);for(let a=0;a<o.length;a++){const s=o[a],c=n[s];c[wc]===!1&&(c[wc]=!0,c[Ep]=!0),(c.get||c.set)&&(n[s]={[Ep]:!0,[wc]:!0,[Fc]:c[Fc],[Ia]:e[s]})}return sr.create($i(e),n)}else{const n=$i(e);if(n!==null&&r)return{...e};const o=sr.create(n);return sr.assign(o,e)}}function og(e,t=!1){return Wl(e)||kn(e)||!Fr(e)||(ts(e)>1&&sr.defineProperties(e,{set:zs,add:zs,clear:zs,delete:zs}),sr.freeze(e),t&&es(e,(r,n)=>{og(n,!0)},!1)),e}function M5(){Dr(2)}var zs={[Ia]:M5};function Wl(e){return e===null||!rg(e)?!0:sr.isFrozen(e)}var qc="MapSet",Ap="Patches",Ok={};function Si(e){const t=Ok[e];return t||Dr(0,e),t}var z5=e=>!!Ok[e],Da,Rk=()=>Da,N5=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:z5(qc)?Si(qc):void 0});function sb(e,t){t&&(e.patchPlugin_=Si(Ap),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Op(e){Rp(e),e.drafts_.forEach(B5),e.drafts_=null}function Rp(e){e===Da&&(Da=e.parent_)}var cb=e=>Da=N5(Da,e);function B5(e){const t=e[Vt];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function lb(e,t){t.unfinalizedDrafts_=t.drafts_.length;const r=t.drafts_[0];if(e!==void 0&&e!==r){r[Vt].modified_&&(Op(t),Dr(4)),Fr(e)&&(e=db(t,e));const{patchPlugin_:o}=t;o&&o.generateReplacementPatches_(r[Vt].base_,e,t)}else e=db(t,r);return F5(t,e,!0),Op(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==Pk?e:void 0}function db(e,t){if(Wl(t))return t;const r=t[Vt];if(!r)return ig(t,e.handledSet_,e);if(!Hl(r,e))return t;if(!r.modified_)return r.base_;if(!r.finalized_){const{callbacks_:n}=r;if(n)for(;n.length>0;)n.pop()(e);Dk(r,e)}return r.copy_}function F5(e,t,r=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&og(t,r)}function Tk(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var Hl=(e,t)=>e.scope_===t,U5=[];function Ik(e,t,r,n){const o=xn(e),a=e.type_;if(n!==void 0&&Cp(o,n,a)===t){Uc(o,n,r,a);return}if(!e.draftLocations_){const c=e.draftLocations_=new Map;es(o,(l,u)=>{if(kn(u)){const d=c.get(u)||[];d.push(l),c.set(u,d)}})}const s=e.draftLocations_.get(t)??U5;for(const c of s)Uc(o,c,r,a)}function q5(e,t,r){e.callbacks_.push(function(o){const a=t;if(!a||!Hl(a,o))return;o.mapSetPlugin_?.fixSetContents(a);const s=ng(a);Ik(e,a.draft_??a,s,r),Dk(a,o)})}function Dk(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||(e.assigned_?.size??0)>0)){const{patchPlugin_:n}=t;if(n){const o=n.getPath(e);o&&n.generatePatches_(e,o,t)}Tk(e)}}function W5(e,t,r){const{scope_:n}=e;if(kn(r)){const o=r[Vt];Hl(o,n)&&o.callbacks_.push(function(){$c(e);const s=ng(o);Ik(e,r,s,t)})}else Fr(r)&&e.callbacks_.push(function(){const a=xn(e);Cp(a,t,e.type_)===r&&n.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&ig(Cp(e.copy_,t,e.type_),n.handledSet_,n)})}function ig(e,t,r){return!r.immer_.autoFreeze_&&r.unfinalizedDrafts_<1||kn(e)||t.has(e)||!Fr(e)||Wl(e)||(t.add(e),es(e,(n,o)=>{if(kn(o)){const a=o[Vt];if(Hl(a,r)){const s=ng(a);Uc(e,n,s,e.type_),Tk(a)}}else Fr(o)&&ig(o,t,r)})),e}function H5(e,t){const r=Fl(e),n={type_:r?1:0,scope_:t?t.scope_:Rk(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0};let o=n,a=ag;r&&(o=[n],a=_a);const{revoke:s,proxy:c}=Proxy.revocable(o,a);return n.draft_=c,n.revoke_=s,[c,n]}var ag={get(e,t){if(t===Vt)return e;const r=xn(e);if(!ab(r,t,e.type_))return V5(e,r,t);const n=r[t];if(e.finalized_||!Fr(n))return n;if(n===hh(e.base_,t)){$c(e);const o=e.type_===1?+t:t,a=Ip(e.scope_,n,e,o);return e.copy_[o]=a}return n},has(e,t){return t in xn(e)},ownKeys(e){return Reflect.ownKeys(xn(e))},set(e,t,r){const n=_k(xn(e),t);if(n?.set)return n.set.call(e.draft_,r),!0;if(!e.modified_){const o=hh(xn(e),t),a=o?.[Vt];if(a&&a.base_===r)return e.copy_[t]=r,e.assigned_.set(t,!1),!0;if(L5(r,o)&&(r!==void 0||ab(e.base_,t,e.type_)))return!0;$c(e),Tp(e)}return e.copy_[t]===r&&(r!==void 0||t in e.copy_)||Number.isNaN(r)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=r,e.assigned_.set(t,!0),W5(e,t,r)),!0},deleteProperty(e,t){return $c(e),hh(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),Tp(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const r=xn(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n&&{[wc]:!0,[Ep]:e.type_!==1||t!=="length",[Fc]:n[Fc],[Ia]:r[t]}},defineProperty(){Dr(11)},getPrototypeOf(e){return $i(e.base_)},setPrototypeOf(){Dr(12)}},_a={};es(ag,(e,t)=>{_a[e]=function(){const r=arguments;return r[0]=r[0][0],t.apply(this,r)}});_a.deleteProperty=function(e,t){return _a.set.call(this,e,t,void 0)};_a.set=function(e,t,r){return ag.set.call(this,e[0],t,r,e[0])};function hh(e,t){const r=e[Vt];return(r?xn(r):e)[t]}function V5(e,t,r){const n=_k(t,r);return n?Ia in n?n[Ia]:n.get?.call(e.draft_):void 0}function _k(e,t){if(!(t in e))return;let r=$i(e);for(;r;){const n=Object.getOwnPropertyDescriptor(r,t);if(n)return n;r=$i(r)}}function Tp(e){e.modified_||(e.modified_=!0,e.parent_&&Tp(e.parent_))}function $c(e){e.copy_||(e.assigned_=new Map,e.copy_=Pp(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var K5=class{constructor(t){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(r,n,o)=>{if(oi(r)&&!oi(n)){const s=n;n=r;const c=this;return function(u=s,...d){return c.produce(u,f=>n.call(this,f,...d))}}oi(n)||Dr(6),o!==void 0&&!oi(o)&&Dr(7);let a;if(Fr(r)){const s=cb(this),c=Ip(s,r,void 0);let l=!0;try{a=n(c),l=!1}finally{l?Op(s):Rp(s)}return sb(s,o),lb(a,s)}else if(!r||!rg(r)){if(a=n(r),a===void 0&&(a=r),a===Pk&&(a=void 0),this.autoFreeze_&&og(a,!0),o){const s=[],c=[];Si(Ap).generateReplacementPatches_(r,a,{patches_:s,inversePatches_:c}),o(s,c)}return a}else Dr(1,r)},this.produceWithPatches=(r,n)=>{if(oi(r))return(c,...l)=>this.produceWithPatches(c,u=>r(u,...l));let o,a;return[this.produce(r,n,(c,l)=>{o=c,a=l}),o,a]},uh(t?.autoFreeze)&&this.setAutoFreeze(t.autoFreeze),uh(t?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(t.useStrictShallowCopy),uh(t?.useStrictIteration)&&this.setUseStrictIteration(t.useStrictIteration)}createDraft(t){Fr(t)||Dr(8),kn(t)&&(t=Mr(t));const r=cb(this),n=Ip(r,t,void 0);return n[Vt].isManual_=!0,Rp(r),n}finishDraft(t,r){const n=t&&t[Vt];(!n||!n.isManual_)&&Dr(9);const{scope_:o}=n;return sb(o,r),lb(void 0,o)}setAutoFreeze(t){this.autoFreeze_=t}setUseStrictShallowCopy(t){this.useStrictShallowCopy_=t}setUseStrictIteration(t){this.useStrictIteration_=t}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(t,r){let n;for(n=r.length-1;n>=0;n--){const a=r[n];if(a.path.length===0&&a.op==="replace"){t=a.value;break}}n>-1&&(r=r.slice(n+1));const o=Si(Ap).applyPatches_;return kn(t)?o(t,r):this.produce(t,a=>o(a,r))}};function Ip(e,t,r,n){const[o,a]=Ul(t)?Si(qc).proxyMap_(t,r):ql(t)?Si(qc).proxySet_(t,r):H5(t,r);return(r?.scope_??Rk()).drafts_.push(o),a.callbacks_=r?.callbacks_??[],a.key_=n,r&&n!==void 0?q5(r,a,n):a.callbacks_.push(function(l){l.mapSetPlugin_?.fixSetContents(a);const{patchPlugin_:u}=l;a.modified_&&u&&u.generatePatches_(a,[],l)}),o}function Mr(e){return kn(e)||Dr(10,e),Lk(e)}function Lk(e){if(!Fr(e)||Wl(e))return e;const t=e[Vt];let r,n=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,r=Pp(e,t.scope_.immer_.useStrictShallowCopy_),n=t.scope_.immer_.shouldUseStrictIteration()}else r=Pp(e,!0);return es(r,(o,a)=>{Uc(r,o,Lk(a))},n),t&&(t.finalized_=!1),r}var G5=new K5,Mk=G5.produce;function zk(e){return({dispatch:r,getState:n})=>o=>a=>typeof a=="function"?a(r,n,e):o(a)}var Y5=zk(),X5=zk,Z5=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?Nc:Nc.apply(null,arguments)};function Sr(e,t){function r(...n){if(t){let o=t(...n);if(!o)throw new Error(cr(0));return{type:e,payload:o.payload,..."meta"in o&&{meta:o.meta},..."error"in o&&{error:o.error}}}return{type:e,payload:n[0]}}return r.toString=()=>`${e}`,r.type=e,r.match=n=>Ck(n)&&n.type===e,r}var Nk=class xa extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,xa.prototype)}static get[Symbol.species](){return xa}concat(...t){return super.concat.apply(this,t)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new xa(...t[0].concat(this)):new xa(...t.concat(this))}};function ub(e){return Fr(e)?Mk(e,()=>{}):e}function Ns(e,t,r){return e.has(t)?e.get(t):e.set(t,r(t)).get(t)}function J5(e){return typeof e=="boolean"}var Q5=()=>function(t){const{thunk:r=!0,immutableCheck:n=!0,serializableCheck:o=!0,actionCreatorCheck:a=!0}=t??{};let s=new Nk;return r&&(J5(r)?s.push(Y5):s.push(X5(r.extraArgument))),s},Bk="RTK_autoBatch",He=()=>e=>({payload:e,meta:{[Bk]:!0}}),hb=e=>t=>{setTimeout(t,e)},Fk=(e={type:"raf"})=>t=>(...r)=>{const n=t(...r);let o=!0,a=!1,s=!1;const c=new Set,l=e.type==="tick"?queueMicrotask:e.type==="raf"?typeof window<"u"&&window.requestAnimationFrame?window.requestAnimationFrame:hb(10):e.type==="callback"?e.queueNotification:hb(e.timeout),u=()=>{s=!1,a&&(a=!1,c.forEach(d=>d()))};return Object.assign({},n,{subscribe(d){const f=()=>o&&d(),m=n.subscribe(f);return c.add(d),()=>{m(),c.delete(d)}},dispatch(d){try{return o=!d?.meta?.[Bk],a=!o,a&&(s||(s=!0,l(u))),n.dispatch(d)}finally{o=!0}}})},eF=e=>function(r){const{autoBatch:n=!0}=r??{};let o=new Nk(e);return n&&o.push(Fk(typeof n=="object"?n:void 0)),o};function tF(e){const t=Q5(),{reducer:r=void 0,middleware:n,devTools:o=!0,preloadedState:a=void 0,enhancers:s=void 0}=e||{};let c;if(typeof r=="function")c=r;else if(tg(r))c=Ek(r);else throw new Error(cr(1));let l;typeof n=="function"?l=n(t):l=t();let u=Nc;o&&(u=Z5({trace:!1,...typeof o=="object"&&o}));const d=D5(...l),f=eF(d);let m=typeof s=="function"?s(f):f();const g=u(...m);return kk(c,a,g)}function Uk(e){const t={},r=[];let n;const o={addCase(a,s){const c=typeof a=="string"?a:a.type;if(!c)throw new Error(cr(28));if(c in t)throw new Error(cr(29));return t[c]=s,o},addAsyncThunk(a,s){return s.pending&&(t[a.pending.type]=s.pending),s.rejected&&(t[a.rejected.type]=s.rejected),s.fulfilled&&(t[a.fulfilled.type]=s.fulfilled),s.settled&&r.push({matcher:a.settled,reducer:s.settled}),o},addMatcher(a,s){return r.push({matcher:a,reducer:s}),o},addDefaultCase(a){return n=a,o}};return e(o),[t,r,n]}function rF(e){return typeof e=="function"}function nF(e,t){let[r,n,o]=Uk(t),a;if(rF(e))a=()=>ub(e());else{const c=ub(e);a=()=>c}function s(c=a(),l){let u=[r[l.type],...n.filter(({matcher:d})=>d(l)).map(({reducer:d})=>d)];return u.filter(d=>!!d).length===0&&(u=[o]),u.reduce((d,f)=>{if(f)if(kn(d)){const g=f(d,l);return g===void 0?d:g}else{if(Fr(d))return Mk(d,m=>f(m,l));{const m=f(d,l);if(m===void 0){if(d===null)return d;throw Error("A case reducer on a non-draftable value must not return undefined")}return m}}return d},c)}return s.getInitialState=a,s}var oF="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",iF=(e=21)=>{let t="",r=e;for(;r--;)t+=oF[Math.random()*64|0];return t},aF=Symbol.for("rtk-slice-createasyncthunk");function sF(e,t){return`${e}/${t}`}function cF({creators:e}={}){const t=e?.asyncThunk?.[aF];return function(n){const{name:o,reducerPath:a=o}=n;if(!o)throw new Error(cr(11));const s=(typeof n.reducers=="function"?n.reducers(dF()):n.reducers)||{},c=Object.keys(s),l={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},u={addCase(j,S){const y=typeof j=="string"?j:j.type;if(!y)throw new Error(cr(12));if(y in l.sliceCaseReducersByType)throw new Error(cr(13));return l.sliceCaseReducersByType[y]=S,u},addMatcher(j,S){return l.sliceMatchers.push({matcher:j,reducer:S}),u},exposeAction(j,S){return l.actionCreators[j]=S,u},exposeCaseReducer(j,S){return l.sliceCaseReducersByName[j]=S,u}};c.forEach(j=>{const S=s[j],y={reducerName:j,type:sF(o,j),createNotation:typeof n.reducers=="function"};hF(S)?pF(y,S,u,t):uF(y,S,u)});function d(){const[j={},S=[],y=void 0]=typeof n.extraReducers=="function"?Uk(n.extraReducers):[n.extraReducers],k={...j,...l.sliceCaseReducersByType};return nF(n.initialState,$=>{for(let C in k)$.addCase(C,k[C]);for(let C of l.sliceMatchers)$.addMatcher(C.matcher,C.reducer);for(let C of S)$.addMatcher(C.matcher,C.reducer);y&&$.addDefaultCase(y)})}const f=j=>j,m=new Map,g=new WeakMap;let x;function v(j,S){return x||(x=d()),x(j,S)}function b(){return x||(x=d()),x.getInitialState()}function E(j,S=!1){function y($){let C=$[j];return typeof C>"u"&&S&&(C=Ns(g,y,b)),C}function k($=f){const C=Ns(m,S,()=>new WeakMap);return Ns(C,$,()=>{const P={};for(const[z,_]of Object.entries(n.selectors??{}))P[z]=lF(_,$,()=>Ns(g,$,b),S);return P})}return{reducerPath:j,getSelectors:k,get selectors(){return k(y)},selectSlice:y}}const w={name:o,reducer:v,actions:l.actionCreators,caseReducers:l.sliceCaseReducersByName,getInitialState:b,...E(a),injectInto(j,{reducerPath:S,...y}={}){const k=S??a;return j.inject({reducerPath:k,reducer:v},y),{...w,...E(k,!0)}}};return w}}function lF(e,t,r,n){function o(a,...s){let c=t(a);return typeof c>"u"&&n&&(c=r()),e(c,...s)}return o.unwrapped=e,o}var Qt=cF();function dF(){function e(t,r){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...r}}return e.withTypes=()=>e,{reducer(t){return Object.assign({[t.name](...r){return t(...r)}}[t.name],{_reducerDefinitionType:"reducer"})},preparedReducer(t,r){return{_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:r}},asyncThunk:e}}function uF({type:e,reducerName:t,createNotation:r},n,o){let a,s;if("reducer"in n){if(r&&!fF(n))throw new Error(cr(17));a=n.reducer,s=n.prepare}else a=n;o.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,s?Sr(e,s):Sr(e))}function hF(e){return e._reducerDefinitionType==="asyncThunk"}function fF(e){return e._reducerDefinitionType==="reducerWithPrepare"}function pF({type:e,reducerName:t},r,n,o){if(!o)throw new Error(cr(18));const{payloadCreator:a,fulfilled:s,pending:c,rejected:l,settled:u,options:d}=r,f=o(e,a,d);n.exposeAction(t,f),s&&n.addCase(f.fulfilled,s),c&&n.addCase(f.pending,c),l&&n.addCase(f.rejected,l),u&&n.addMatcher(f.settled,u),n.exposeCaseReducer(t,{fulfilled:s||Bs,pending:c||Bs,rejected:l||Bs,settled:u||Bs})}function Bs(){}var mF="task",qk="listener",Wk="completed",sg="cancelled",gF=`task-${sg}`,xF=`task-${Wk}`,Dp=`${qk}-${sg}`,vF=`${qk}-${Wk}`,Vl=class{constructor(e){this.code=e,this.message=`${mF} ${sg} (reason: ${e})`}name="TaskAbortError";message},cg=(e,t)=>{if(typeof e!="function")throw new TypeError(cr(32))},Wc=()=>{},Hk=(e,t=Wc)=>(e.catch(t),e),Vk=(e,t)=>(e.addEventListener("abort",t,{once:!0}),()=>e.removeEventListener("abort",t)),Co=e=>{if(e.aborted)throw new Vl(e.reason)};function Kk(e,t){let r=Wc;return new Promise((n,o)=>{const a=()=>o(new Vl(e.reason));if(e.aborted){a();return}r=Vk(e,a),t.finally(()=>r()).then(n,o)}).finally(()=>{r=Wc})}var yF=async(e,t)=>{try{return await Promise.resolve(),{status:"ok",value:await e()}}catch(r){return{status:r instanceof Vl?"cancelled":"rejected",error:r}}finally{t?.()}},Hc=e=>t=>Hk(Kk(e,t).then(r=>(Co(e),r))),Gk=e=>{const t=Hc(e);return r=>t(new Promise(n=>setTimeout(n,r)))},{assign:hi}=Object,fb={},Kl="listenerMiddleware",bF=(e,t)=>{const r=n=>Vk(e,()=>n.abort(e.reason));return(n,o)=>{cg(n);const a=new AbortController;r(a);const s=yF(async()=>{Co(e),Co(a.signal);const c=await n({pause:Hc(a.signal),delay:Gk(a.signal),signal:a.signal});return Co(a.signal),c},()=>a.abort(xF));return o?.autoJoin&&t.push(s.catch(Wc)),{result:Hc(e)(s),cancel(){a.abort(gF)}}}},wF=(e,t)=>{const r=async(n,o)=>{Co(t);let a=()=>{};const c=[new Promise((l,u)=>{let d=e({predicate:n,effect:(f,m)=>{m.unsubscribe(),l([f,m.getState(),m.getOriginalState()])}});a=()=>{d(),u()}})];o!=null&&c.push(new Promise(l=>setTimeout(l,o,null)));try{const l=await Kk(t,Promise.race(c));return Co(t),l}finally{a()}};return(n,o)=>Hk(r(n,o))},Yk=e=>{let{type:t,actionCreator:r,matcher:n,predicate:o,effect:a}=e;if(t)o=Sr(t).match;else if(r)t=r.type,o=r.match;else if(n)o=n;else if(!o)throw new Error(cr(21));return cg(a),{predicate:o,type:t,effect:a}},Xk=hi(e=>{const{type:t,predicate:r,effect:n}=Yk(e);return{id:iF(),effect:n,type:t,predicate:r,pending:new Set,unsubscribe:()=>{throw new Error(cr(22))}}},{withTypes:()=>Xk}),pb=(e,t)=>{const{type:r,effect:n,predicate:o}=Yk(t);return Array.from(e.values()).find(a=>(typeof r=="string"?a.type===r:a.predicate===o)&&a.effect===n)},_p=e=>{e.pending.forEach(t=>{t.abort(Dp)})},$F=(e,t)=>()=>{for(const r of t.keys())_p(r);e.clear()},mb=(e,t,r)=>{try{e(t,r)}catch(n){setTimeout(()=>{throw n},0)}},Zk=hi(Sr(`${Kl}/add`),{withTypes:()=>Zk}),SF=Sr(`${Kl}/removeAll`),Jk=hi(Sr(`${Kl}/remove`),{withTypes:()=>Jk}),jF=(...e)=>{console.error(`${Kl}/error`,...e)},rs=(e={})=>{const t=new Map,r=new Map,n=g=>{const x=r.get(g)??0;r.set(g,x+1)},o=g=>{const x=r.get(g)??1;x===1?r.delete(g):r.set(g,x-1)},{extra:a,onError:s=jF}=e;cg(s);const c=g=>(g.unsubscribe=()=>t.delete(g.id),t.set(g.id,g),x=>{g.unsubscribe(),x?.cancelActive&&_p(g)}),l=g=>{const x=pb(t,g)??Xk(g);return c(x)};hi(l,{withTypes:()=>l});const u=g=>{const x=pb(t,g);return x&&(x.unsubscribe(),g.cancelActive&&_p(x)),!!x};hi(u,{withTypes:()=>u});const d=async(g,x,v,b)=>{const E=new AbortController,w=wF(l,E.signal),j=[];try{g.pending.add(E),n(g),await Promise.resolve(g.effect(x,hi({},v,{getOriginalState:b,condition:(S,y)=>w(S,y).then(Boolean),take:w,delay:Gk(E.signal),pause:Hc(E.signal),extra:a,signal:E.signal,fork:bF(E.signal,j),unsubscribe:g.unsubscribe,subscribe:()=>{t.set(g.id,g)},cancelActiveListeners:()=>{g.pending.forEach((S,y,k)=>{S!==E&&(S.abort(Dp),k.delete(S))})},cancel:()=>{E.abort(Dp),g.pending.delete(E)},throwIfCancelled:()=>{Co(E.signal)}})))}catch(S){S instanceof Vl||mb(s,S,{raisedBy:"effect"})}finally{await Promise.all(j),E.abort(vF),o(g),g.pending.delete(E)}},f=$F(t,r);return{middleware:g=>x=>v=>{if(!Ck(v))return x(v);if(Zk.match(v))return l(v.payload);if(SF.match(v)){f();return}if(Jk.match(v))return u(v.payload);let b=g.getState();const E=()=>{if(b===fb)throw new Error(cr(23));return b};let w;try{if(w=x(v),t.size>0){const j=g.getState(),S=Array.from(t.values());for(const y of S){let k=!1;try{k=y.predicate(v,j,b)}catch($){k=!1,mb(s,$,{raisedBy:"predicate"})}k&&d(y,v,g,E)}}}finally{b=fb}return w},startListening:l,stopListening:u,clearListeners:f}};function cr(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var kF={layoutType:"horizontal",width:0,height:0,margin:{top:5,right:5,bottom:5,left:5},scale:1},Qk=Qt({name:"chartLayout",initialState:kF,reducers:{setLayout(e,t){e.layoutType=t.payload},setChartSize(e,t){e.width=t.payload.width,e.height=t.payload.height},setMargin(e,t){var r,n,o,a;e.margin.top=(r=t.payload.top)!==null&&r!==void 0?r:0,e.margin.right=(n=t.payload.right)!==null&&n!==void 0?n:0,e.margin.bottom=(o=t.payload.bottom)!==null&&o!==void 0?o:0,e.margin.left=(a=t.payload.left)!==null&&a!==void 0?a:0},setScale(e,t){e.scale=t.payload}}}),{setMargin:EF,setLayout:CF,setChartSize:PF,setScale:AF}=Qk.actions,OF=Qk.reducer;function eE(e,t,r){return Array.isArray(e)&&e&&t+r!==0?e.slice(t,r+1):e}function Ye(e){return Number.isFinite(e)}function cn(e){return typeof e=="number"&&e>0&&Number.isFinite(e)}function gb(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function ci(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?gb(Object(r),!0).forEach(function(n){RF(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):gb(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function RF(e,t,r){return(t=TF(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function TF(e){var t=IF(e,"string");return typeof t=="symbol"?t:t+""}function IF(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function it(e,t,r){return Ke(e)||Ke(t)?r:sn(t)?wi(e,t,r):typeof t=="function"?t(e):r}var DF=(e,t,r)=>{if(t&&r){var{width:n,height:o}=r,{align:a,verticalAlign:s,layout:c}=t;if((c==="vertical"||c==="horizontal"&&s==="middle")&&a!=="center"&&de(e[a]))return ci(ci({},e),{},{[a]:e[a]+(n||0)});if((c==="horizontal"||c==="vertical"&&a==="center")&&s!=="middle"&&de(e[s]))return ci(ci({},e),{},{[s]:e[s]+(o||0)})}return e},ao=(e,t)=>e==="horizontal"&&t==="xAxis"||e==="vertical"&&t==="yAxis"||e==="centric"&&t==="angleAxis"||e==="radial"&&t==="radiusAxis",tE=(e,t,r,n)=>{if(n)return e.map(c=>c.coordinate);var o,a,s=e.map(c=>(c.coordinate===t&&(o=!0),c.coordinate===r&&(a=!0),c.coordinate));return o||s.push(t),a||s.push(r),s},rE=(e,t,r)=>{if(!e)return null;var{duplicateDomain:n,type:o,range:a,scale:s,realScaleType:c,isCategorical:l,categoricalDomain:u,tickCount:d,ticks:f,niceTicks:m,axisType:g}=e;if(!s)return null;var x=c==="scaleBand"&&s.bandwidth?s.bandwidth()/2:2,v=o==="category"&&s.bandwidth?s.bandwidth()/x:0;if(v=g==="angleAxis"&&a&&a.length>=2?Xt(a[0]-a[1])*2*v:v,f||m){var b=(f||m||[]).map((E,w)=>{var j=n?n.indexOf(E):E;return{coordinate:s(j)+v,value:E,offset:v,index:w}});return b.filter(E=>!Nr(E.coordinate))}return l&&u?u.map((E,w)=>({coordinate:s(E)+v,value:E,index:w,offset:v})):s.ticks&&d!=null?s.ticks(d).map((E,w)=>({coordinate:s(E)+v,value:E,offset:v,index:w})):s.domain().map((E,w)=>({coordinate:s(E)+v,value:n?n[E]:E,index:w,offset:v}))},xb=1e-4,_F=e=>{var t=e.domain();if(!(!t||t.length<=2)){var r=t.length,n=e.range(),o=Math.min(n[0],n[1])-xb,a=Math.max(n[0],n[1])+xb,s=e(t[0]),c=e(t[r-1]);(s<o||s>a||c<o||c>a)&&e.domain([t[0],t[r-1]])}},LF=(e,t)=>{if(!t||t.length!==2||!de(t[0])||!de(t[1]))return e;var r=Math.min(t[0],t[1]),n=Math.max(t[0],t[1]),o=[e[0],e[1]];return(!de(e[0])||e[0]<r)&&(o[0]=r),(!de(e[1])||e[1]>n)&&(o[1]=n),o[0]>n&&(o[0]=n),o[1]<r&&(o[1]=r),o},MF=e=>{var t,r=e.length;if(!(r<=0)){var n=(t=e[0])===null||t===void 0?void 0:t.length;if(!(n==null||n<=0))for(var o=0;o<n;++o)for(var a=0,s=0,c=0;c<r;++c){var l=e[c],u=l?.[o];if(u!=null){var d=u[1],f=u[0],m=Nr(d)?f:d;m>=0?(u[0]=a,u[1]=a+m,a=d):(u[0]=s,u[1]=s+m,s=d)}}}},zF=e=>{var t,r=e.length;if(!(r<=0)){var n=(t=e[0])===null||t===void 0?void 0:t.length;if(!(n==null||n<=0))for(var o=0;o<n;++o)for(var a=0,s=0;s<r;++s){var c=e[s],l=c?.[o];if(l!=null){var u=Nr(l[1])?l[0]:l[1];u>=0?(l[0]=a,l[1]=a+u,a=l[1]):(l[0]=0,l[1]=0)}}}},NF={sign:MF,expand:HO,none:Ao,silhouette:VO,wiggle:KO,positive:zF},BF=(e,t,r)=>{var n,o=(n=NF[r])!==null&&n!==void 0?n:Ao,a=WO().keys(t).value((c,l)=>Number(it(c,l,0))).order(op).offset(o),s=a(e);return s.forEach((c,l)=>{c.forEach((u,d)=>{var f=it(e[d],t[l],0);Array.isArray(f)&&f.length===2&&de(f[0])&&de(f[1])&&(u[0]=f[0],u[1]=f[1])})}),s};function FF(e){return e==null?void 0:String(e)}function vb(e){var{axis:t,ticks:r,bandSize:n,entry:o,index:a,dataKey:s}=e;if(t.type==="category"){if(!t.allowDuplicatedCategory&&t.dataKey&&!Ke(o[t.dataKey])){var c=sk(r,"value",o[t.dataKey]);if(c)return c.coordinate+n/2}return r[a]?r[a].coordinate+n/2:null}var l=it(o,Ke(s)?t.dataKey:s);return Ke(l)?null:t.scale(l)}var yb=e=>{var{axis:t,ticks:r,offset:n,bandSize:o,entry:a,index:s}=e;if(t.type==="category")return r[s]?r[s].coordinate+n:null;var c=it(a,t.dataKey,t.scale.domain()[s]);return Ke(c)?null:t.scale(c)-o/2+n},UF=e=>{var{numericAxis:t}=e,r=t.scale.domain();if(t.type==="number"){var n=Math.min(r[0],r[1]),o=Math.max(r[0],r[1]);return n<=0&&o>=0?0:o<0?o:n}return r[0]},qF=e=>{var t=e.flat(2).filter(de);return[Math.min(...t),Math.max(...t)]},WF=e=>[e[0]===1/0?0:e[0],e[1]===-1/0?0:e[1]],HF=(e,t,r)=>{if(e!=null)return WF(Object.keys(e).reduce((n,o)=>{var a=e[o];if(!a)return n;var{stackedData:s}=a,c=s.reduce((l,u)=>{var d=eE(u,t,r),f=qF(d);return!Ye(f[0])||!Ye(f[1])?l:[Math.min(l[0],f[0]),Math.max(l[1],f[1])]},[1/0,-1/0]);return[Math.min(c[0],n[0]),Math.max(c[1],n[1])]},[1/0,-1/0]))},bb=/^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,wb=/^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,ji=(e,t,r)=>{if(e&&e.scale&&e.scale.bandwidth){var n=e.scale.bandwidth();if(!r||n>0)return n}if(e&&t&&t.length>=2){for(var o=Nl(t,d=>d.coordinate),a=1/0,s=1,c=o.length;s<c;s++){var l=o[s],u=o[s-1];a=Math.min((l?.coordinate||0)-(u?.coordinate||0),a)}return a===1/0?0:a}return r?void 0:0};function $b(e){var{tooltipEntrySettings:t,dataKey:r,payload:n,value:o,name:a}=e;return ci(ci({},t),{},{dataKey:r,payload:n,value:o,name:a})}function Gl(e,t){if(e)return String(e);if(typeof t=="string")return t}var VF=(e,t)=>{if(t==="horizontal")return e.chartX;if(t==="vertical")return e.chartY},KF=(e,t)=>t==="centric"?e.angle:e.radius,In=e=>e.layout.width,Dn=e=>e.layout.height,GF=e=>e.layout.scale,nE=e=>e.layout.margin,Yl=V(e=>e.cartesianAxis.xAxis,e=>Object.values(e)),Xl=V(e=>e.cartesianAxis.yAxis,e=>Object.values(e)),YF="data-recharts-item-index",XF="data-recharts-item-id",ns=60;function Sb(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Fs(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Sb(Object(r),!0).forEach(function(n){ZF(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Sb(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function ZF(e,t,r){return(t=JF(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function JF(e){var t=QF(e,"string");return typeof t=="symbol"?t:t+""}function QF(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var e3=e=>e.brush.height;function t3(e){var t=Xl(e);return t.reduce((r,n)=>{if(n.orientation==="left"&&!n.mirror&&!n.hide){var o=typeof n.width=="number"?n.width:ns;return r+o}return r},0)}function r3(e){var t=Xl(e);return t.reduce((r,n)=>{if(n.orientation==="right"&&!n.mirror&&!n.hide){var o=typeof n.width=="number"?n.width:ns;return r+o}return r},0)}function n3(e){var t=Yl(e);return t.reduce((r,n)=>n.orientation==="top"&&!n.mirror&&!n.hide?r+n.height:r,0)}function o3(e){var t=Yl(e);return t.reduce((r,n)=>n.orientation==="bottom"&&!n.mirror&&!n.hide?r+n.height:r,0)}var $t=V([In,Dn,nE,e3,t3,r3,n3,o3,Sk,C5],(e,t,r,n,o,a,s,c,l,u)=>{var d={left:(r.left||0)+o,right:(r.right||0)+a},f={top:(r.top||0)+s,bottom:(r.bottom||0)+c},m=Fs(Fs({},f),d),g=m.bottom;m.bottom+=n,m=DF(m,l,u);var x=e-m.left-m.right,v=t-m.top-m.bottom;return Fs(Fs({brushBottom:g},m),{},{width:Math.max(x,0),height:Math.max(v,0)})}),i3=V($t,e=>({x:e.left,y:e.top,width:e.width,height:e.height})),lg=V(In,Dn,(e,t)=>({x:0,y:0,width:e,height:t})),a3=p.createContext(null),Nt=()=>p.useContext(a3)!=null,Zl=e=>e.brush,Jl=V([Zl,$t,nE],(e,t,r)=>({height:e.height,x:de(e.x)?e.x:t.left,y:de(e.y)?e.y:t.top+t.height+t.brushBottom-(r?.bottom||0),width:de(e.width)?e.width:t.width})),fh={},ph={},mh={},jb;function s3(){return jb||(jb=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r,n,{signal:o,edges:a}={}){let s,c=null;const l=a!=null&&a.includes("leading"),u=a==null||a.includes("trailing"),d=()=>{c!==null&&(r.apply(s,c),s=void 0,c=null)},f=()=>{u&&d(),v()};let m=null;const g=()=>{m!=null&&clearTimeout(m),m=setTimeout(()=>{m=null,f()},n)},x=()=>{m!==null&&(clearTimeout(m),m=null)},v=()=>{x(),s=void 0,c=null},b=()=>{d()},E=function(...w){if(o?.aborted)return;s=this,c=w;const j=m==null;g(),l&&j&&d()};return E.schedule=g,E.cancel=v,E.flush=b,o?.addEventListener("abort",v,{once:!0}),E}e.debounce=t})(mh)),mh}var kb;function c3(){return kb||(kb=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=s3();function r(n,o=0,a={}){typeof a!="object"&&(a={});const{leading:s=!1,trailing:c=!0,maxWait:l}=a,u=Array(2);s&&(u[0]="leading"),c&&(u[1]="trailing");let d,f=null;const m=t.debounce(function(...v){d=n.apply(this,v),f=null},o,{edges:u}),g=function(...v){return l!=null&&(f===null&&(f=Date.now()),Date.now()-f>=l)?(d=n.apply(this,v),f=Date.now(),m.cancel(),m.schedule(),d):(m.apply(this,v),d)},x=()=>(m.flush(),d);return g.cancel=m.cancel,g.flush=x,g}e.debounce=r})(ph)),ph}var Eb;function l3(){return Eb||(Eb=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=c3();function r(n,o=0,a={}){const{leading:s=!0,trailing:c=!0}=a;return t.debounce(n,o,{leading:s,maxWait:o,trailing:c})}e.throttle=r})(fh)),fh}var gh,Cb;function d3(){return Cb||(Cb=1,gh=l3().throttle),gh}var u3=d3();const h3=Pn(u3);var Vc=function(t,r){for(var n=arguments.length,o=new Array(n>2?n-2:0),a=2;a<n;a++)o[a-2]=arguments[a];if(typeof console<"u"&&console.warn&&(r===void 0&&console.warn("LogUtils requires an error message argument"),!t))if(r===void 0)console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var s=0;console.warn(r.replace(/%s/g,()=>o[s++]))}},oE=(e,t,r)=>{var{width:n="100%",height:o="100%",aspect:a,maxHeight:s}=r,c=jn(n)?e:Number(n),l=jn(o)?t:Number(o);return a&&a>0&&(c?l=c/a:l&&(c=l*a),s&&l!=null&&l>s&&(l=s)),{calculatedWidth:c,calculatedHeight:l}},f3={width:0,height:0,overflow:"visible"},p3={width:0,overflowX:"visible"},m3={height:0,overflowY:"visible"},g3={},x3=e=>{var{width:t,height:r}=e,n=jn(t),o=jn(r);return n&&o?f3:n?p3:o?m3:g3};function v3(e){var{width:t,height:r,aspect:n}=e,o=t,a=r;return o===void 0&&a===void 0?(o="100%",a="100%"):o===void 0?o=n&&n>0?void 0:"100%":a===void 0&&(a=n&&n>0?void 0:"100%"),{width:o,height:a}}function Lp(){return Lp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Lp.apply(null,arguments)}function Pb(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Ab(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Pb(Object(r),!0).forEach(function(n){y3(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Pb(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function y3(e,t,r){return(t=b3(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function b3(e){var t=w3(e,"string");return typeof t=="symbol"?t:t+""}function w3(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var iE=p.createContext({width:-1,height:-1});function $3(e){return cn(e.width)&&cn(e.height)}function aE(e){var{children:t,width:r,height:n}=e,o=p.useMemo(()=>({width:r,height:n}),[r,n]);return $3(o)?p.createElement(iE.Provider,{value:o},t):null}var dg=()=>p.useContext(iE),S3=p.forwardRef((e,t)=>{var{aspect:r,initialDimension:n={width:-1,height:-1},width:o,height:a,minWidth:s=0,minHeight:c,maxHeight:l,children:u,debounce:d=0,id:f,className:m,onResize:g,style:x={}}=e,v=p.useRef(null),b=p.useRef();b.current=g,p.useImperativeHandle(t,()=>v.current);var[E,w]=p.useState({containerWidth:n.width,containerHeight:n.height}),j=p.useCallback((C,P)=>{w(z=>{var _=Math.round(C),N=Math.round(P);return z.containerWidth===_&&z.containerHeight===N?z:{containerWidth:_,containerHeight:N}})},[]);p.useEffect(()=>{if(v.current==null||typeof ResizeObserver>"u")return Qa;var C=N=>{var R,{width:F,height:O}=N[0].contentRect;j(F,O),(R=b.current)===null||R===void 0||R.call(b,F,O)};d>0&&(C=h3(C,d,{trailing:!0,leading:!1}));var P=new ResizeObserver(C),{width:z,height:_}=v.current.getBoundingClientRect();return j(z,_),P.observe(v.current),()=>{P.disconnect()}},[j,d]);var{containerWidth:S,containerHeight:y}=E;Vc(!r||r>0,"The aspect(%s) must be greater than zero.",r);var{calculatedWidth:k,calculatedHeight:$}=oE(S,y,{width:o,height:a,aspect:r,maxHeight:l});return Vc(k!=null&&k>0||$!=null&&$>0,`The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`,k,$,o,a,s,c,r),p.createElement("div",{id:f?"".concat(f):void 0,className:Te("recharts-responsive-container",m),style:Ab(Ab({},x),{},{width:o,height:a,minWidth:s,minHeight:c,maxHeight:l}),ref:v},p.createElement("div",{style:x3({width:o,height:a})},p.createElement(aE,{width:k,height:$},u)))}),Ob=p.forwardRef((e,t)=>{var r=dg();if(cn(r.width)&&cn(r.height))return e.children;var{width:n,height:o}=v3({width:e.width,height:e.height,aspect:e.aspect}),{calculatedWidth:a,calculatedHeight:s}=oE(void 0,void 0,{width:n,height:o,aspect:e.aspect,maxHeight:e.maxHeight});return de(a)&&de(s)?p.createElement(aE,{width:a,height:s},e.children):p.createElement(S3,Lp({},e,{width:n,height:o,ref:t}))});function sE(e){if(e)return{x:e.x,y:e.y,upperWidth:"upperWidth"in e?e.upperWidth:e.width,lowerWidth:"lowerWidth"in e?e.lowerWidth:e.width,width:e.width,height:e.height}}var Ql=()=>{var e,t=Nt(),r=ue(i3),n=ue(Jl),o=(e=ue(Zl))===null||e===void 0?void 0:e.padding;return!t||!n||!o?r:{width:n.width-o.left-o.right,height:n.height-o.top-o.bottom,x:o.left,y:o.top}},j3={top:0,bottom:0,left:0,right:0,width:0,height:0,brushBottom:0},cE=()=>{var e;return(e=ue($t))!==null&&e!==void 0?e:j3},ug=()=>ue(In),hg=()=>ue(Dn),k3=()=>ue(e=>e.layout.margin),Pe=e=>e.layout.layoutType,Ti=()=>ue(Pe),E3=()=>{var e=Ti();return e!==void 0},ed=e=>{var t=Xe(),r=Nt(),{width:n,height:o}=e,a=dg(),s=n,c=o;return a&&(s=a.width>0?a.width:n,c=a.height>0?a.height:o),p.useEffect(()=>{!r&&cn(s)&&cn(c)&&t(PF({width:s,height:c}))},[t,r,s,c]),null},lE=Symbol.for("immer-nothing"),Rb=Symbol.for("immer-draftable"),lr=Symbol.for("immer-state");function _r(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var La=Object.getPrototypeOf;function ki(e){return!!e&&!!e[lr]}function Lo(e){return e?dE(e)||Array.isArray(e)||!!e[Rb]||!!e.constructor?.[Rb]||os(e)||rd(e):!1}var C3=Object.prototype.constructor.toString(),Tb=new WeakMap;function dE(e){if(!e||typeof e!="object")return!1;const t=Object.getPrototypeOf(e);if(t===null||t===Object.prototype)return!0;const r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;if(r===Object)return!0;if(typeof r!="function")return!1;let n=Tb.get(r);return n===void 0&&(n=Function.toString.call(r),Tb.set(r,n)),n===C3}function Kc(e,t,r=!0){td(e)===0?(r?Reflect.ownKeys(e):Object.keys(e)).forEach(o=>{t(o,e[o],e)}):e.forEach((n,o)=>t(o,n,e))}function td(e){const t=e[lr];return t?t.type_:Array.isArray(e)?1:os(e)?2:rd(e)?3:0}function Mp(e,t){return td(e)===2?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function uE(e,t,r){const n=td(e);n===2?e.set(t,r):n===3?e.add(r):e[t]=r}function P3(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}function os(e){return e instanceof Map}function rd(e){return e instanceof Set}function xo(e){return e.copy_||e.base_}function zp(e,t){if(os(e))return new Map(e);if(rd(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);const r=dE(e);if(t===!0||t==="class_only"&&!r){const n=Object.getOwnPropertyDescriptors(e);delete n[lr];let o=Reflect.ownKeys(n);for(let a=0;a<o.length;a++){const s=o[a],c=n[s];c.writable===!1&&(c.writable=!0,c.configurable=!0),(c.get||c.set)&&(n[s]={configurable:!0,writable:!0,enumerable:c.enumerable,value:e[s]})}return Object.create(La(e),n)}else{const n=La(e);if(n!==null&&r)return{...e};const o=Object.create(n);return Object.assign(o,e)}}function fg(e,t=!1){return nd(e)||ki(e)||!Lo(e)||(td(e)>1&&Object.defineProperties(e,{set:Us,add:Us,clear:Us,delete:Us}),Object.freeze(e),t&&Object.values(e).forEach(r=>fg(r,!0))),e}function A3(){_r(2)}var Us={value:A3};function nd(e){return e===null||typeof e!="object"?!0:Object.isFrozen(e)}var O3={};function Mo(e){const t=O3[e];return t||_r(0,e),t}var Ma;function hE(){return Ma}function R3(e,t){return{drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function Ib(e,t){t&&(Mo("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Np(e){Bp(e),e.drafts_.forEach(T3),e.drafts_=null}function Bp(e){e===Ma&&(Ma=e.parent_)}function Db(e){return Ma=R3(Ma,e)}function T3(e){const t=e[lr];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function _b(e,t){t.unfinalizedDrafts_=t.drafts_.length;const r=t.drafts_[0];return e!==void 0&&e!==r?(r[lr].modified_&&(Np(t),_r(4)),Lo(e)&&(e=Gc(t,e),t.parent_||Yc(t,e)),t.patches_&&Mo("Patches").generateReplacementPatches_(r[lr].base_,e,t.patches_,t.inversePatches_)):e=Gc(t,r,[]),Np(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==lE?e:void 0}function Gc(e,t,r){if(nd(t))return t;const n=e.immer_.shouldUseStrictIteration(),o=t[lr];if(!o)return Kc(t,(a,s)=>Lb(e,o,t,a,s,r),n),t;if(o.scope_!==e)return t;if(!o.modified_)return Yc(e,o.base_,!0),o.base_;if(!o.finalized_){o.finalized_=!0,o.scope_.unfinalizedDrafts_--;const a=o.copy_;let s=a,c=!1;o.type_===3&&(s=new Set(a),a.clear(),c=!0),Kc(s,(l,u)=>Lb(e,o,a,l,u,r,c),n),Yc(e,a,!1),r&&e.patches_&&Mo("Patches").generatePatches_(o,r,e.patches_,e.inversePatches_)}return o.copy_}function Lb(e,t,r,n,o,a,s){if(o==null||typeof o!="object"&&!s)return;const c=nd(o);if(!(c&&!s)){if(ki(o)){const l=a&&t&&t.type_!==3&&!Mp(t.assigned_,n)?a.concat(n):void 0,u=Gc(e,o,l);if(uE(r,n,u),ki(u))e.canAutoFreeze_=!1;else return}else s&&r.add(o);if(Lo(o)&&!c){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1||t&&t.base_&&t.base_[n]===o&&c)return;Gc(e,o),(!t||!t.scope_.parent_)&&typeof n!="symbol"&&(os(r)?r.has(n):Object.prototype.propertyIsEnumerable.call(r,n))&&Yc(e,o)}}}function Yc(e,t,r=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&fg(t,r)}function I3(e,t){const r=Array.isArray(e),n={type_:r?1:0,scope_:t?t.scope_:hE(),modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1};let o=n,a=pg;r&&(o=[n],a=za);const{revoke:s,proxy:c}=Proxy.revocable(o,a);return n.draft_=c,n.revoke_=s,c}var pg={get(e,t){if(t===lr)return e;const r=xo(e);if(!Mp(r,t))return D3(e,r,t);const n=r[t];return e.finalized_||!Lo(n)?n:n===xh(e.base_,t)?(vh(e),e.copy_[t]=Up(n,e)):n},has(e,t){return t in xo(e)},ownKeys(e){return Reflect.ownKeys(xo(e))},set(e,t,r){const n=fE(xo(e),t);if(n?.set)return n.set.call(e.draft_,r),!0;if(!e.modified_){const o=xh(xo(e),t),a=o?.[lr];if(a&&a.base_===r)return e.copy_[t]=r,e.assigned_[t]=!1,!0;if(P3(r,o)&&(r!==void 0||Mp(e.base_,t)))return!0;vh(e),Fp(e)}return e.copy_[t]===r&&(r!==void 0||t in e.copy_)||Number.isNaN(r)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=r,e.assigned_[t]=!0),!0},deleteProperty(e,t){return xh(e.base_,t)!==void 0||t in e.base_?(e.assigned_[t]=!1,vh(e),Fp(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const r=xo(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n&&{writable:!0,configurable:e.type_!==1||t!=="length",enumerable:n.enumerable,value:r[t]}},defineProperty(){_r(11)},getPrototypeOf(e){return La(e.base_)},setPrototypeOf(){_r(12)}},za={};Kc(pg,(e,t)=>{za[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}});za.deleteProperty=function(e,t){return za.set.call(this,e,t,void 0)};za.set=function(e,t,r){return pg.set.call(this,e[0],t,r,e[0])};function xh(e,t){const r=e[lr];return(r?xo(r):e)[t]}function D3(e,t,r){const n=fE(t,r);return n?"value"in n?n.value:n.get?.call(e.draft_):void 0}function fE(e,t){if(!(t in e))return;let r=La(e);for(;r;){const n=Object.getOwnPropertyDescriptor(r,t);if(n)return n;r=La(r)}}function Fp(e){e.modified_||(e.modified_=!0,e.parent_&&Fp(e.parent_))}function vh(e){e.copy_||(e.copy_=zp(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var _3=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!0,this.produce=(t,r,n)=>{if(typeof t=="function"&&typeof r!="function"){const a=r;r=t;const s=this;return function(l=a,...u){return s.produce(l,d=>r.call(this,d,...u))}}typeof r!="function"&&_r(6),n!==void 0&&typeof n!="function"&&_r(7);let o;if(Lo(t)){const a=Db(this),s=Up(t,void 0);let c=!0;try{o=r(s),c=!1}finally{c?Np(a):Bp(a)}return Ib(a,n),_b(o,a)}else if(!t||typeof t!="object"){if(o=r(t),o===void 0&&(o=t),o===lE&&(o=void 0),this.autoFreeze_&&fg(o,!0),n){const a=[],s=[];Mo("Patches").generateReplacementPatches_(t,o,a,s),n(a,s)}return o}else _r(1,t)},this.produceWithPatches=(t,r)=>{if(typeof t=="function")return(s,...c)=>this.produceWithPatches(s,l=>t(l,...c));let n,o;return[this.produce(t,r,(s,c)=>{n=s,o=c}),n,o]},typeof e?.autoFreeze=="boolean"&&this.setAutoFreeze(e.autoFreeze),typeof e?.useStrictShallowCopy=="boolean"&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),typeof e?.useStrictIteration=="boolean"&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){Lo(e)||_r(8),ki(e)&&(e=L3(e));const t=Db(this),r=Up(e,void 0);return r[lr].isManual_=!0,Bp(t),r}finishDraft(e,t){const r=e&&e[lr];(!r||!r.isManual_)&&_r(9);const{scope_:n}=r;return Ib(n,t),_b(void 0,n)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let r;for(r=t.length-1;r>=0;r--){const o=t[r];if(o.path.length===0&&o.op==="replace"){e=o.value;break}}r>-1&&(t=t.slice(r+1));const n=Mo("Patches").applyPatches_;return ki(e)?n(e,t):this.produce(e,o=>n(o,t))}};function Up(e,t){const r=os(e)?Mo("MapSet").proxyMap_(e,t):rd(e)?Mo("MapSet").proxySet_(e,t):I3(e,t);return(t?t.scope_:hE()).drafts_.push(r),r}function L3(e){return ki(e)||_r(10,e),pE(e)}function pE(e){if(!Lo(e)||nd(e))return e;const t=e[lr];let r,n=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,r=zp(e,t.scope_.immer_.useStrictShallowCopy_),n=t.scope_.immer_.shouldUseStrictIteration()}else r=zp(e,!0);return Kc(r,(o,a)=>{uE(r,o,pE(a))},n),t&&(t.finalized_=!1),r}var M3=new _3;M3.produce;var z3={settings:{layout:"horizontal",align:"center",verticalAlign:"middle",itemSorter:"value"},size:{width:0,height:0},payload:[]},mE=Qt({name:"legend",initialState:z3,reducers:{setLegendSize(e,t){e.size.width=t.payload.width,e.size.height=t.payload.height},setLegendSettings(e,t){e.settings.align=t.payload.align,e.settings.layout=t.payload.layout,e.settings.verticalAlign=t.payload.verticalAlign,e.settings.itemSorter=t.payload.itemSorter},addLegendPayload:{reducer(e,t){e.payload.push(t.payload)},prepare:He()},replaceLegendPayload:{reducer(e,t){var{prev:r,next:n}=t.payload,o=Mr(e).payload.indexOf(r);o>-1&&(e.payload[o]=n)},prepare:He()},removeLegendPayload:{reducer(e,t){var r=Mr(e).payload.indexOf(t.payload);r>-1&&e.payload.splice(r,1)},prepare:He()}}}),{setLegendSize:Mb,setLegendSettings:N3,addLegendPayload:B3,replaceLegendPayload:F3,removeLegendPayload:U3}=mE.actions,q3=mE.reducer,W3=["contextPayload"];function qp(){return qp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},qp.apply(null,arguments)}function zb(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Ei(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?zb(Object(r),!0).forEach(function(n){H3(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):zb(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function H3(e,t,r){return(t=V3(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function V3(e){var t=K3(e,"string");return typeof t=="symbol"?t:t+""}function K3(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function G3(e,t){if(e==null)return{};var r,n,o=Y3(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function Y3(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function X3(e){return e.value}function Z3(e){var{contextPayload:t}=e,r=G3(e,W3),n=yk(t,e.payloadUniqBy,X3),o=Ei(Ei({},r),{},{payload:n});return p.isValidElement(e.content)?p.cloneElement(e.content,o):typeof e.content=="function"?p.createElement(e.content,o):p.createElement(L4,o)}function J3(e,t,r,n,o,a){var{layout:s,align:c,verticalAlign:l}=t,u,d;return(!e||(e.left===void 0||e.left===null)&&(e.right===void 0||e.right===null))&&(c==="center"&&s==="vertical"?u={left:((n||0)-a.width)/2}:u=c==="right"?{right:r&&r.right||0}:{left:r&&r.left||0}),(!e||(e.top===void 0||e.top===null)&&(e.bottom===void 0||e.bottom===null))&&(l==="middle"?d={top:((o||0)-a.height)/2}:d=l==="bottom"?{bottom:r&&r.bottom||0}:{top:r&&r.top||0}),Ei(Ei({},u),d)}function Q3(e){var t=Xe();return p.useEffect(()=>{t(N3(e))},[t,e]),null}function e8(e){var t=Xe();return p.useEffect(()=>(t(Mb(e)),()=>{t(Mb({width:0,height:0}))}),[t,e]),null}function t8(e,t,r,n){return e==="vertical"&&de(t)?{height:t}:e==="horizontal"?{width:r||n}:null}var r8={align:"center",iconSize:14,itemSorter:"value",layout:"horizontal",verticalAlign:"bottom"};function Wp(e){var t=Ot(e,r8),r=O5(),n=a4(),o=k3(),{width:a,height:s,wrapperStyle:c,portal:l}=t,[u,d]=jk([r]),f=ug(),m=hg();if(f==null||m==null)return null;var g=f-(o?.left||0)-(o?.right||0),x=t8(t.layout,s,a,g),v=l?c:Ei(Ei({position:"absolute",width:x?.width||a||"auto",height:x?.height||s||"auto"},J3(c,t,o,f,m,u)),c),b=l??n;if(b==null||r==null)return null;var E=p.createElement("div",{className:"recharts-legend-wrapper",style:v,ref:d},p.createElement(Q3,{layout:t.layout,align:t.align,verticalAlign:t.verticalAlign,itemSorter:t.itemSorter}),!l&&p.createElement(e8,{width:u.width,height:u.height}),p.createElement(Z3,qp({},t,x,{margin:o,chartWidth:f,chartHeight:m,contextPayload:r})));return bm.createPortal(E,b)}Wp.displayName="Legend";function Hp(){return Hp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Hp.apply(null,arguments)}function Nb(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function yh(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Nb(Object(r),!0).forEach(function(n){n8(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Nb(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function n8(e,t,r){return(t=o8(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o8(e){var t=i8(e,"string");return typeof t=="symbol"?t:t+""}function i8(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function a8(e){return Array.isArray(e)&&sn(e[0])&&sn(e[1])?e.join(" ~ "):e}var s8=e=>{var{separator:t=" : ",contentStyle:r={},itemStyle:n={},labelStyle:o={},payload:a,formatter:s,itemSorter:c,wrapperClassName:l,labelClassName:u,label:d,labelFormatter:f,accessibilityLayer:m=!1}=e,g=()=>{if(a&&a.length){var y={padding:0,margin:0},k=(c?Nl(a,c):a).map(($,C)=>{if($.type==="none")return null;var P=$.formatter||s||a8,{value:z,name:_}=$,N=z,R=_;if(P){var F=P(z,_,$,C,a);if(Array.isArray(F))[N,R]=F;else if(F!=null)N=F;else return null}var O=yh({display:"block",paddingTop:4,paddingBottom:4,color:$.color||"#000"},n);return p.createElement("li",{className:"recharts-tooltip-item",key:"tooltip-item-".concat(C),style:O},sn(R)?p.createElement("span",{className:"recharts-tooltip-item-name"},R):null,sn(R)?p.createElement("span",{className:"recharts-tooltip-item-separator"},t):null,p.createElement("span",{className:"recharts-tooltip-item-value"},N),p.createElement("span",{className:"recharts-tooltip-item-unit"},$.unit||""))});return p.createElement("ul",{className:"recharts-tooltip-item-list",style:y},k)}return null},x=yh({margin:0,padding:10,backgroundColor:"#fff",border:"1px solid #ccc",whiteSpace:"nowrap"},r),v=yh({margin:0},o),b=!Ke(d),E=b?d:"",w=Te("recharts-default-tooltip",l),j=Te("recharts-tooltip-label",u);b&&f&&a!==void 0&&a!==null&&(E=f(d,a));var S=m?{role:"status","aria-live":"assertive"}:{};return p.createElement("div",Hp({className:w,style:x},S),p.createElement("p",{className:j,style:v},p.isValidElement(E)?E:"".concat(E)),g())},oa="recharts-tooltip-wrapper",c8={visibility:"hidden"};function l8(e){var{coordinate:t,translateX:r,translateY:n}=e;return Te(oa,{["".concat(oa,"-right")]:de(r)&&t&&de(t.x)&&r>=t.x,["".concat(oa,"-left")]:de(r)&&t&&de(t.x)&&r<t.x,["".concat(oa,"-bottom")]:de(n)&&t&&de(t.y)&&n>=t.y,["".concat(oa,"-top")]:de(n)&&t&&de(t.y)&&n<t.y})}function Bb(e){var{allowEscapeViewBox:t,coordinate:r,key:n,offsetTopLeft:o,position:a,reverseDirection:s,tooltipDimension:c,viewBox:l,viewBoxDimension:u}=e;if(a&&de(a[n]))return a[n];var d=r[n]-c-(o>0?o:0),f=r[n]+o;if(t[n])return s[n]?d:f;var m=l[n];if(m==null)return 0;if(s[n]){var g=d,x=m;return g<x?Math.max(f,m):Math.max(d,m)}if(u==null)return 0;var v=f+c,b=m+u;return v>b?Math.max(d,m):Math.max(f,m)}function d8(e){var{translateX:t,translateY:r,useTranslate3d:n}=e;return{transform:n?"translate3d(".concat(t,"px, ").concat(r,"px, 0)"):"translate(".concat(t,"px, ").concat(r,"px)")}}function u8(e){var{allowEscapeViewBox:t,coordinate:r,offsetTopLeft:n,position:o,reverseDirection:a,tooltipBox:s,useTranslate3d:c,viewBox:l}=e,u,d,f;return s.height>0&&s.width>0&&r?(d=Bb({allowEscapeViewBox:t,coordinate:r,key:"x",offsetTopLeft:n,position:o,reverseDirection:a,tooltipDimension:s.width,viewBox:l,viewBoxDimension:l.width}),f=Bb({allowEscapeViewBox:t,coordinate:r,key:"y",offsetTopLeft:n,position:o,reverseDirection:a,tooltipDimension:s.height,viewBox:l,viewBoxDimension:l.height}),u=d8({translateX:d,translateY:f,useTranslate3d:c})):u=c8,{cssProperties:u,cssClasses:l8({translateX:d,translateY:f,coordinate:r})}}function Fb(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function qs(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Fb(Object(r),!0).forEach(function(n){Vp(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Fb(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function Vp(e,t,r){return(t=h8(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function h8(e){var t=f8(e,"string");return typeof t=="symbol"?t:t+""}function f8(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}class p8 extends p.PureComponent{constructor(){super(...arguments),Vp(this,"state",{dismissed:!1,dismissedAtCoordinate:{x:0,y:0}}),Vp(this,"handleKeyDown",t=>{if(t.key==="Escape"){var r,n,o,a;this.setState({dismissed:!0,dismissedAtCoordinate:{x:(r=(n=this.props.coordinate)===null||n===void 0?void 0:n.x)!==null&&r!==void 0?r:0,y:(o=(a=this.props.coordinate)===null||a===void 0?void 0:a.y)!==null&&o!==void 0?o:0}})}})}componentDidMount(){document.addEventListener("keydown",this.handleKeyDown)}componentWillUnmount(){document.removeEventListener("keydown",this.handleKeyDown)}componentDidUpdate(){var t,r;this.state.dismissed&&(((t=this.props.coordinate)===null||t===void 0?void 0:t.x)!==this.state.dismissedAtCoordinate.x||((r=this.props.coordinate)===null||r===void 0?void 0:r.y)!==this.state.dismissedAtCoordinate.y)&&(this.state.dismissed=!1)}render(){var{active:t,allowEscapeViewBox:r,animationDuration:n,animationEasing:o,children:a,coordinate:s,hasPayload:c,isAnimationActive:l,offset:u,position:d,reverseDirection:f,useTranslate3d:m,viewBox:g,wrapperStyle:x,lastBoundingBox:v,innerRef:b,hasPortalFromProps:E}=this.props,{cssClasses:w,cssProperties:j}=u8({allowEscapeViewBox:r,coordinate:s,offsetTopLeft:u,position:d,reverseDirection:f,tooltipBox:{height:v.height,width:v.width},useTranslate3d:m,viewBox:g}),S=E?{}:qs(qs({transition:l&&t?"transform ".concat(n,"ms ").concat(o):void 0},j),{},{pointerEvents:"none",visibility:!this.state.dismissed&&t&&c?"visible":"hidden",position:"absolute",top:0,left:0}),y=qs(qs({},S),{},{visibility:!this.state.dismissed&&t&&c?"visible":"hidden"},x);return p.createElement("div",{xmlns:"http://www.w3.org/1999/xhtml",tabIndex:-1,className:w,style:y,ref:b},a)}}var gE=()=>{var e;return(e=ue(t=>t.rootProps.accessibilityLayer))!==null&&e!==void 0?e:!0};function Kp(){return Kp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Kp.apply(null,arguments)}function Ub(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function qb(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Ub(Object(r),!0).forEach(function(n){m8(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ub(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function m8(e,t,r){return(t=g8(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function g8(e){var t=x8(e,"string");return typeof t=="symbol"?t:t+""}function x8(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Wb={curveBasisClosed:uO,curveBasisOpen:dO,curveBasis:lO,curveBumpX:cO,curveBumpY:sO,curveLinearClosed:aO,curveLinear:jm,curveMonotoneX:iO,curveMonotoneY:oO,curveNatural:nO,curveStep:rO,curveStepAfter:tO,curveStepBefore:eO},Xc=e=>Ye(e.x)&&Ye(e.y),Hb=e=>e.base!=null&&Xc(e.base)&&Xc(e),ia=e=>e.x,aa=e=>e.y,v8=(e,t)=>{if(typeof e=="function")return e;var r="curve".concat(Ja(e));return(r==="curveMonotone"||r==="curveBump")&&t?Wb["".concat(r).concat(t==="vertical"?"Y":"X")]:Wb[r]||jm},y8=e=>{var{type:t="linear",points:r=[],baseLine:n,layout:o,connectNulls:a=!1}=e,s=v8(t,o),c=a?r.filter(Xc):r,l;if(Array.isArray(n)){var u=r.map((g,x)=>qb(qb({},g),{},{base:n[x]}));o==="vertical"?l=vs().y(aa).x1(ia).x0(g=>g.base.x):l=vs().x(ia).y1(aa).y0(g=>g.base.y);var d=l.defined(Hb).curve(s),f=a?u.filter(Hb):u;return d(f)}o==="vertical"&&de(n)?l=vs().y(aa).x1(ia).x0(n):de(n)?l=vs().x(ia).y1(aa).y0(n):l=jS().x(ia).y(aa);var m=l.defined(Xc).curve(s);return m(c)},xE=e=>{var{className:t,points:r,path:n,pathRef:o}=e,a=Ti();if((!r||!r.length)&&!n)return null;var s={type:e.type,points:e.points,baseLine:e.baseLine,layout:e.layout||a,connectNulls:e.connectNulls},c=r&&r.length?y8(s):n;return p.createElement("path",Kp({},zr(e),Jm(e),{className:Te("recharts-curve",t),d:c===null?void 0:c,ref:o}))},b8=["x","y","top","left","width","height","className"];function Gp(){return Gp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Gp.apply(null,arguments)}function Vb(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function w8(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Vb(Object(r),!0).forEach(function(n){$8(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Vb(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function $8(e,t,r){return(t=S8(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function S8(e){var t=j8(e,"string");return typeof t=="symbol"?t:t+""}function j8(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function k8(e,t){if(e==null)return{};var r,n,o=E8(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function E8(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}var C8=(e,t,r,n,o,a)=>"M".concat(e,",").concat(o,"v").concat(n,"M").concat(a,",").concat(t,"h").concat(r),P8=e=>{var{x:t=0,y:r=0,top:n=0,left:o=0,width:a=0,height:s=0,className:c}=e,l=k8(e,b8),u=w8({x:t,y:r,top:n,left:o,width:a,height:s},l);return!de(t)||!de(r)||!de(a)||!de(s)||!de(n)||!de(o)?null:p.createElement("path",Gp({},Ht(u),{className:Te("recharts-cross",c),d:C8(t,r,a,s,n,o)}))};function A8(e,t,r,n){var o=n/2;return{stroke:"none",fill:"#ccc",x:e==="horizontal"?t.x-o:r.left+.5,y:e==="horizontal"?r.top+.5:t.y-o,width:e==="horizontal"?n:r.width-1,height:e==="horizontal"?r.height-1:n}}function Kb(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Gb(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Kb(Object(r),!0).forEach(function(n){O8(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Kb(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function O8(e,t,r){return(t=R8(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function R8(e){var t=T8(e,"string");return typeof t=="symbol"?t:t+""}function T8(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var I8=e=>e.replace(/([A-Z])/g,t=>"-".concat(t.toLowerCase())),vE=(e,t,r)=>e.map(n=>"".concat(I8(n)," ").concat(t,"ms ").concat(r)).join(","),D8=(e,t)=>[Object.keys(e),Object.keys(t)].reduce((r,n)=>r.filter(o=>n.includes(o))),Na=(e,t)=>Object.keys(t).reduce((r,n)=>Gb(Gb({},r),{},{[n]:e(n,t[n])}),{});function Yb(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function ct(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Yb(Object(r),!0).forEach(function(n){_8(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Yb(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function _8(e,t,r){return(t=L8(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function L8(e){var t=M8(e,"string");return typeof t=="symbol"?t:t+""}function M8(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Zc=(e,t,r)=>e+(t-e)*r,Yp=e=>{var{from:t,to:r}=e;return t!==r},yE=(e,t,r)=>{var n=Na((o,a)=>{if(Yp(a)){var[s,c]=e(a.from,a.to,a.velocity);return ct(ct({},a),{},{from:s,velocity:c})}return a},t);return r<1?Na((o,a)=>Yp(a)&&n[o]!=null?ct(ct({},a),{},{velocity:Zc(a.velocity,n[o].velocity,r),from:Zc(a.from,n[o].from,r)}):a,t):yE(e,n,r-1)};function z8(e,t,r,n,o,a){var s,c=n.reduce((m,g)=>ct(ct({},m),{},{[g]:{from:e[g],velocity:0,to:t[g]}}),{}),l=()=>Na((m,g)=>g.from,c),u=()=>!Object.values(c).filter(Yp).length,d=null,f=m=>{s||(s=m);var g=m-s,x=g/r.dt;c=yE(r,c,x),o(ct(ct(ct({},e),t),l())),s=m,u()||(d=a.setTimeout(f))};return()=>(d=a.setTimeout(f),()=>{var m;(m=d)===null||m===void 0||m()})}function N8(e,t,r,n,o,a,s){var c=null,l=o.reduce((f,m)=>{var g=e[m],x=t[m];return g==null||x==null?f:ct(ct({},f),{},{[m]:[g,x]})},{}),u,d=f=>{u||(u=f);var m=(f-u)/n,g=Na((v,b)=>Zc(...b,r(m)),l);if(a(ct(ct(ct({},e),t),g)),m<1)c=s.setTimeout(d);else{var x=Na((v,b)=>Zc(...b,r(1)),l);a(ct(ct(ct({},e),t),x))}};return()=>(c=s.setTimeout(d),()=>{var f;(f=c)===null||f===void 0||f()})}const B8=(e,t,r,n,o,a)=>{var s=D8(e,t);return r==null?()=>(o(ct(ct({},e),t)),()=>{}):r.isStepper===!0?z8(e,t,r,s,o,a):N8(e,t,r,n,s,o,a)};var Jc=1e-4,bE=(e,t)=>[0,3*e,3*t-6*e,3*e-3*t+1],wE=(e,t)=>e.map((r,n)=>r*t**n).reduce((r,n)=>r+n),Xb=(e,t)=>r=>{var n=bE(e,t);return wE(n,r)},F8=(e,t)=>r=>{var n=bE(e,t),o=[...n.map((a,s)=>a*s).slice(1),0];return wE(o,r)},U8=e=>{var t,r=e.split("(");if(r.length!==2||r[0]!=="cubic-bezier")return null;var n=(t=r[1])===null||t===void 0||(t=t.split(")")[0])===null||t===void 0?void 0:t.split(",");if(n==null||n.length!==4)return null;var o=n.map(a=>parseFloat(a));return[o[0],o[1],o[2],o[3]]},q8=function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];if(r.length===1)switch(r[0]){case"linear":return[0,0,1,1];case"ease":return[.25,.1,.25,1];case"ease-in":return[.42,0,1,1];case"ease-out":return[.42,0,.58,1];case"ease-in-out":return[0,0,.58,1];default:{var o=U8(r[0]);if(o)return o}}return r.length===4?r:[0,0,1,1]},W8=(e,t,r,n)=>{var o=Xb(e,r),a=Xb(t,n),s=F8(e,r),c=u=>u>1?1:u<0?0:u,l=u=>{for(var d=u>1?1:u,f=d,m=0;m<8;++m){var g=o(f)-d,x=s(f);if(Math.abs(g-d)<Jc||x<Jc)return a(f);f=c(f-g/x)}return a(f)};return l.isStepper=!1,l},Zb=function(){return W8(...q8(...arguments))},H8=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},{stiff:r=100,damping:n=8,dt:o=17}=t,a=(s,c,l)=>{var u=-(s-c)*r,d=l*n,f=l+(u-d)*o/1e3,m=l*o/1e3+s;return Math.abs(m-c)<Jc&&Math.abs(f)<Jc?[c,0]:[m,f]};return a.isStepper=!0,a.dt=o,a},V8=e=>{if(typeof e=="string")switch(e){case"ease":case"ease-in-out":case"ease-out":case"ease-in":case"linear":return Zb(e);case"spring":return H8();default:if(e.split("(")[0]==="cubic-bezier")return Zb(e)}return typeof e=="function"?e:null};function K8(e){var t,r=()=>null,n=!1,o=null,a=s=>{if(!n){if(Array.isArray(s)){if(!s.length)return;var c=s,[l,...u]=c;if(typeof l=="number"){o=e.setTimeout(a.bind(null,u),l);return}a(l),o=e.setTimeout(a.bind(null,u));return}typeof s=="string"&&(t=s,r(t)),typeof s=="object"&&(t=s,r(t)),typeof s=="function"&&s()}};return{stop:()=>{n=!0},start:s=>{n=!1,o&&(o(),o=null),a(s)},subscribe:s=>(r=s,()=>{r=()=>null}),getTimeoutController:()=>e}}class G8{setTimeout(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,n=performance.now(),o=null,a=s=>{s-n>=r?t(s):typeof requestAnimationFrame=="function"&&(o=requestAnimationFrame(a))};return o=requestAnimationFrame(a),()=>{o!=null&&cancelAnimationFrame(o)}}}function Y8(){return K8(new G8)}var X8=p.createContext(Y8);function Z8(e,t){var r=p.useContext(X8);return p.useMemo(()=>t??r(e),[e,t,r])}var J8=()=>!(typeof window<"u"&&window.document&&window.document.createElement&&window.setTimeout),od={isSsr:J8()},Q8={begin:0,duration:1e3,easing:"ease",isActive:!0,canBegin:!0,onAnimationEnd:()=>{},onAnimationStart:()=>{}},Jb={t:0},bh={t:1};function id(e){var t=Ot(e,Q8),{isActive:r,canBegin:n,duration:o,easing:a,begin:s,onAnimationEnd:c,onAnimationStart:l,children:u}=t,d=r==="auto"?!od.isSsr:r,f=Z8(t.animationId,t.animationManager),[m,g]=p.useState(d?Jb:bh),x=p.useRef(null);return p.useEffect(()=>{d||g(bh)},[d]),p.useEffect(()=>{if(!d||!n)return Qa;var v=B8(Jb,bh,V8(a),o,g,f.getTimeoutController()),b=()=>{x.current=v()};return f.start([l,s,b,o,c]),()=>{f.stop(),x.current&&x.current(),c()}},[d,n,o,a,s,l,c,f]),u(m.t)}function ad(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"animation-",r=p.useRef(Ta(t)),n=p.useRef(e);return n.current!==e&&(r.current=Ta(t),n.current=e),r.current}var eU=["radius"],tU=["radius"],Qb,e0,t0,r0,n0,o0,i0,a0,s0,c0;function l0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function d0(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?l0(Object(r),!0).forEach(function(n){rU(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l0(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function rU(e,t,r){return(t=nU(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function nU(e){var t=oU(e,"string");return typeof t=="symbol"?t:t+""}function oU(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Qc(){return Qc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Qc.apply(null,arguments)}function u0(e,t){if(e==null)return{};var r,n,o=iU(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function iU(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function Yr(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var h0=(e,t,r,n,o)=>{var a=Jn(r),s=Jn(n),c=Math.min(Math.abs(a)/2,Math.abs(s)/2),l=s>=0?1:-1,u=a>=0?1:-1,d=s>=0&&a>=0||s<0&&a<0?1:0,f;if(c>0&&o instanceof Array){for(var m=[0,0,0,0],g=0,x=4;g<x;g++)m[g]=o[g]>c?c:o[g];f=Ze(Qb||(Qb=Yr(["M",",",""])),e,t+l*m[0]),m[0]>0&&(f+=Ze(e0||(e0=Yr(["A ",",",",0,0,",",",",",""])),m[0],m[0],d,e+u*m[0],t)),f+=Ze(t0||(t0=Yr(["L ",",",""])),e+r-u*m[1],t),m[1]>0&&(f+=Ze(r0||(r0=Yr(["A ",",",",0,0,",`,
        `,",",""])),m[1],m[1],d,e+r,t+l*m[1])),f+=Ze(n0||(n0=Yr(["L ",",",""])),e+r,t+n-l*m[2]),m[2]>0&&(f+=Ze(o0||(o0=Yr(["A ",",",",0,0,",`,
        `,",",""])),m[2],m[2],d,e+r-u*m[2],t+n)),f+=Ze(i0||(i0=Yr(["L ",",",""])),e+u*m[3],t+n),m[3]>0&&(f+=Ze(a0||(a0=Yr(["A ",",",",0,0,",`,
        `,",",""])),m[3],m[3],d,e,t+n-l*m[3])),f+="Z"}else if(c>0&&o===+o&&o>0){var v=Math.min(c,o);f=Ze(s0||(s0=Yr(["M ",",",`
            A `,",",",0,0,",",",",",`
            L `,",",`
            A `,",",",0,0,",",",",",`
            L `,",",`
            A `,",",",0,0,",",",",",`
            L `,",",`
            A `,",",",0,0,",",",","," Z"])),e,t+l*v,v,v,d,e+u*v,t,e+r-u*v,t,v,v,d,e+r,t+l*v,e+r,t+n-l*v,v,v,d,e+r-u*v,t+n,e+u*v,t+n,v,v,d,e,t+n-l*v)}else f=Ze(c0||(c0=Yr(["M ",","," h "," v "," h "," Z"])),e,t,r,n,-r);return f},f0={x:0,y:0,width:0,height:0,radius:0,isAnimationActive:!1,isUpdateAnimationActive:!1,animationBegin:0,animationDuration:1500,animationEasing:"ease"},$E=e=>{var t=Ot(e,f0),r=p.useRef(null),[n,o]=p.useState(-1);p.useEffect(()=>{if(r.current&&r.current.getTotalLength)try{var A=r.current.getTotalLength();A&&o(A)}catch{}},[]);var{x:a,y:s,width:c,height:l,radius:u,className:d}=t,{animationEasing:f,animationDuration:m,animationBegin:g,isAnimationActive:x,isUpdateAnimationActive:v}=t,b=p.useRef(c),E=p.useRef(l),w=p.useRef(a),j=p.useRef(s),S=p.useMemo(()=>({x:a,y:s,width:c,height:l,radius:u}),[a,s,c,l,u]),y=ad(S,"rectangle-");if(a!==+a||s!==+s||c!==+c||l!==+l||c===0||l===0)return null;var k=Te("recharts-rectangle",d);if(!v){var $=Ht(t),{radius:C}=$,P=u0($,eU);return p.createElement("path",Qc({},P,{x:Jn(a),y:Jn(s),width:Jn(c),height:Jn(l),radius:typeof u=="number"?u:void 0,className:k,d:h0(a,s,c,l,u)}))}var z=b.current,_=E.current,N=w.current,R=j.current,F="0px ".concat(n===-1?1:n,"px"),O="".concat(n,"px 0px"),D=vE(["strokeDasharray"],m,typeof f=="string"?f:f0.animationEasing);return p.createElement(id,{animationId:y,key:y,canBegin:n>0,duration:m,easing:f,isActive:v,begin:g},A=>{var M=Je(z,c,A),I=Je(_,l,A),T=Je(N,a,A),B=Je(R,s,A);r.current&&(b.current=M,E.current=I,w.current=T,j.current=B);var X;x?A>0?X={transition:D,strokeDasharray:O}:X={strokeDasharray:F}:X={strokeDasharray:O};var ie=Ht(t),{radius:Z}=ie,q=u0(ie,tU);return p.createElement("path",Qc({},q,{radius:typeof u=="number"?u:void 0,className:k,d:h0(T,B,M,I,u),ref:r,style:d0(d0({},X),t.style)}))})};function p0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function m0(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?p0(Object(r),!0).forEach(function(n){aU(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p0(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function aU(e,t,r){return(t=sU(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function sU(e){var t=cU(e,"string");return typeof t=="symbol"?t:t+""}function cU(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var el=Math.PI/180,lU=e=>e*180/Math.PI,At=(e,t,r,n)=>({x:e+Math.cos(-el*n)*r,y:t+Math.sin(-el*n)*r}),dU=function(t,r){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{top:0,right:0,bottom:0,left:0};return Math.min(Math.abs(t-(n.left||0)-(n.right||0)),Math.abs(r-(n.top||0)-(n.bottom||0)))/2},uU=(e,t)=>{var{x:r,y:n}=e,{x:o,y:a}=t;return Math.sqrt((r-o)**2+(n-a)**2)},hU=(e,t)=>{var{x:r,y:n}=e,{cx:o,cy:a}=t,s=uU({x:r,y:n},{x:o,y:a});if(s<=0)return{radius:s,angle:0};var c=(r-o)/s,l=Math.acos(c);return n>a&&(l=2*Math.PI-l),{radius:s,angle:lU(l),angleInRadian:l}},fU=e=>{var{startAngle:t,endAngle:r}=e,n=Math.floor(t/360),o=Math.floor(r/360),a=Math.min(n,o);return{startAngle:t-a*360,endAngle:r-a*360}},pU=(e,t)=>{var{startAngle:r,endAngle:n}=t,o=Math.floor(r/360),a=Math.floor(n/360),s=Math.min(o,a);return e+s*360},mU=(e,t)=>{var{chartX:r,chartY:n}=e,{radius:o,angle:a}=hU({x:r,y:n},t),{innerRadius:s,outerRadius:c}=t;if(o<s||o>c||o===0)return null;var{startAngle:l,endAngle:u}=fU(t),d=a,f;if(l<=u){for(;d>u;)d-=360;for(;d<l;)d+=360;f=d>=l&&d<=u}else{for(;d>l;)d-=360;for(;d<u;)d+=360;f=d>=u&&d<=l}return f?m0(m0({},t),{},{radius:o,angle:pU(d,t)}):null};function SE(e){var{cx:t,cy:r,radius:n,startAngle:o,endAngle:a}=e,s=At(t,r,n,o),c=At(t,r,n,a);return{points:[s,c],cx:t,cy:r,radius:n,startAngle:o,endAngle:a}}var g0,x0,v0,y0,b0,w0,$0;function Xp(){return Xp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Xp.apply(null,arguments)}function So(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var gU=(e,t)=>{var r=Xt(t-e),n=Math.min(Math.abs(t-e),359.999);return r*n},Ws=e=>{var{cx:t,cy:r,radius:n,angle:o,sign:a,isExternal:s,cornerRadius:c,cornerIsExternal:l}=e,u=c*(s?1:-1)+n,d=Math.asin(c/u)/el,f=l?o:o+a*d,m=At(t,r,u,f),g=At(t,r,n,f),x=l?o-a*d:o,v=At(t,r,u*Math.cos(d*el),x);return{center:m,circleTangency:g,lineTangency:v,theta:d}},jE=e=>{var{cx:t,cy:r,innerRadius:n,outerRadius:o,startAngle:a,endAngle:s}=e,c=gU(a,s),l=a+c,u=At(t,r,o,a),d=At(t,r,o,l),f=Ze(g0||(g0=So(["M ",",",`
    A `,",",`,0,
    `,",",`,
    `,",",`
  `])),u.x,u.y,o,o,+(Math.abs(c)>180),+(a>l),d.x,d.y);if(n>0){var m=At(t,r,n,a),g=At(t,r,n,l);f+=Ze(x0||(x0=So(["L ",",",`
            A `,",",`,0,
            `,",",`,
            `,","," Z"])),g.x,g.y,n,n,+(Math.abs(c)>180),+(a<=l),m.x,m.y)}else f+=Ze(v0||(v0=So(["L ",","," Z"])),t,r);return f},xU=e=>{var{cx:t,cy:r,innerRadius:n,outerRadius:o,cornerRadius:a,forceCornerRadius:s,cornerIsExternal:c,startAngle:l,endAngle:u}=e,d=Xt(u-l),{circleTangency:f,lineTangency:m,theta:g}=Ws({cx:t,cy:r,radius:o,angle:l,sign:d,cornerRadius:a,cornerIsExternal:c}),{circleTangency:x,lineTangency:v,theta:b}=Ws({cx:t,cy:r,radius:o,angle:u,sign:-d,cornerRadius:a,cornerIsExternal:c}),E=c?Math.abs(l-u):Math.abs(l-u)-g-b;if(E<0)return s?Ze(y0||(y0=So(["M ",",",`
        a`,",",",0,0,1,",`,0
        a`,",",",0,0,1,",`,0
      `])),m.x,m.y,a,a,a*2,a,a,-a*2):jE({cx:t,cy:r,innerRadius:n,outerRadius:o,startAngle:l,endAngle:u});var w=Ze(b0||(b0=So(["M ",",",`
    A`,",",",0,0,",",",",",`
    A`,",",",0,",",",",",",",`
    A`,",",",0,0,",",",",",`
  `])),m.x,m.y,a,a,+(d<0),f.x,f.y,o,o,+(E>180),+(d<0),x.x,x.y,a,a,+(d<0),v.x,v.y);if(n>0){var{circleTangency:j,lineTangency:S,theta:y}=Ws({cx:t,cy:r,radius:n,angle:l,sign:d,isExternal:!0,cornerRadius:a,cornerIsExternal:c}),{circleTangency:k,lineTangency:$,theta:C}=Ws({cx:t,cy:r,radius:n,angle:u,sign:-d,isExternal:!0,cornerRadius:a,cornerIsExternal:c}),P=c?Math.abs(l-u):Math.abs(l-u)-y-C;if(P<0&&a===0)return"".concat(w,"L").concat(t,",").concat(r,"Z");w+=Ze(w0||(w0=So(["L",",",`
      A`,",",",0,0,",",",",",`
      A`,",",",0,",",",",",",",`
      A`,",",",0,0,",",",",","Z"])),$.x,$.y,a,a,+(d<0),k.x,k.y,n,n,+(P>180),+(d>0),j.x,j.y,a,a,+(d<0),S.x,S.y)}else w+=Ze($0||($0=So(["L",",","Z"])),t,r);return w},vU={cx:0,cy:0,innerRadius:0,outerRadius:0,startAngle:0,endAngle:0,cornerRadius:0,forceCornerRadius:!1,cornerIsExternal:!1},kE=e=>{var t=Ot(e,vU),{cx:r,cy:n,innerRadius:o,outerRadius:a,cornerRadius:s,forceCornerRadius:c,cornerIsExternal:l,startAngle:u,endAngle:d,className:f}=t;if(a<o||u===d)return null;var m=Te("recharts-sector",f),g=a-o,x=Br(s,g,0,!0),v;return x>0&&Math.abs(u-d)<360?v=xU({cx:r,cy:n,innerRadius:o,outerRadius:a,cornerRadius:Math.min(x,g/2),forceCornerRadius:c,cornerIsExternal:l,startAngle:u,endAngle:d}):v=jE({cx:r,cy:n,innerRadius:o,outerRadius:a,startAngle:u,endAngle:d}),p.createElement("path",Xp({},Ht(t),{className:m,d:v}))};function yU(e,t,r){if(e==="horizontal")return[{x:t.x,y:r.top},{x:t.x,y:r.top+r.height}];if(e==="vertical")return[{x:r.left,y:t.y},{x:r.left+r.width,y:t.y}];if(lk(t)){if(e==="centric"){var{cx:n,cy:o,innerRadius:a,outerRadius:s,angle:c}=t,l=At(n,o,a,c),u=At(n,o,s,c);return[{x:l.x,y:l.y},{x:u.x,y:u.y}]}return SE(t)}}var wh={},$h={},Sh={},S0;function bU(){return S0||(S0=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=wk();function r(n){return t.isSymbol(n)?NaN:Number(n)}e.toNumber=r})(Sh)),Sh}var j0;function wU(){return j0||(j0=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=bU();function r(n){return n?(n=t.toNumber(n),n===1/0||n===-1/0?(n<0?-1:1)*Number.MAX_VALUE:n===n?n:0):n===0?n:0}e.toFinite=r})($h)),$h}var k0;function $U(){return k0||(k0=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=$k(),r=wU();function n(o,a,s){s&&typeof s!="number"&&t.isIterateeCall(o,a,s)&&(a=s=void 0),o=r.toFinite(o),a===void 0?(a=o,o=0):a=r.toFinite(a),s=s===void 0?o<a?1:-1:r.toFinite(s);const c=Math.max(Math.ceil((a-o)/(s||1)),0),l=new Array(c);for(let u=0;u<c;u++)l[u]=o,o+=s;return l}e.range=n})(wh)),wh}var jh,E0;function SU(){return E0||(E0=1,jh=$U().range),jh}var jU=SU();const EE=Pn(jU),va=Object.freeze(Object.defineProperty({__proto__:null,scaleBand:OA,scaleDiverging:zS,scaleDivergingLog:NS,scaleDivergingPow:Om,scaleDivergingSqrt:AO,scaleDivergingSymlog:BS,scaleIdentity:CS,scaleImplicit:JA,scaleLinear:MA,scaleLog:PS,scaleOrdinal:QA,scalePoint:RA,scalePow:Pm,scaleQuantile:RS,scaleQuantize:TS,scaleRadial:OS,scaleSequential:DS,scaleSequentialLog:_S,scaleSequentialPow:Am,scaleSequentialQuantile:MS,scaleSequentialSqrt:PO,scaleSequentialSymlog:LS,scaleSqrt:kO,scaleSymlog:AS,scaleThreshold:IS,scaleTime:ZA,scaleUtc:CO,tickFormat:zA},Symbol.toStringTag,{value:"Module"}));var _n=e=>e.chartData,CE=V([_n],e=>{var t=e.chartData!=null?e.chartData.length-1:0;return{chartData:e.chartData,computedData:e.computedData,dataEndIndex:t,dataStartIndex:0}}),mg=(e,t,r,n)=>n?CE(e):_n(e),kU=(e,t,r)=>r?CE(e):_n(e);function to(e){if(Array.isArray(e)&&e.length===2){var[t,r]=e;if(Ye(t)&&Ye(r))return!0}return!1}function C0(e,t,r){return r?e:[Math.min(e[0],t[0]),Math.max(e[1],t[1])]}function PE(e,t){if(t&&typeof e!="function"&&Array.isArray(e)&&e.length===2){var[r,n]=e,o,a;if(Ye(r))o=r;else if(typeof r=="function")return;if(Ye(n))a=n;else if(typeof n=="function")return;var s=[o,a];if(to(s))return s}}function EU(e,t,r){if(!(!r&&t==null)){if(typeof e=="function"&&t!=null)try{var n=e(t,r);if(to(n))return C0(n,t,r)}catch{}if(Array.isArray(e)&&e.length===2){var[o,a]=e,s,c;if(o==="auto")t!=null&&(s=Math.min(...t));else if(de(o))s=o;else if(typeof o=="function")try{t!=null&&(s=o(t?.[0]))}catch{}else if(typeof o=="string"&&bb.test(o)){var l=bb.exec(o);if(l==null||l[1]==null||t==null)s=void 0;else{var u=+l[1];s=t[0]-u}}else s=t?.[0];if(a==="auto")t!=null&&(c=Math.max(...t));else if(de(a))c=a;else if(typeof a=="function")try{t!=null&&(c=a(t?.[1]))}catch{}else if(typeof a=="string"&&wb.test(a)){var d=wb.exec(a);if(d==null||d[1]==null||t==null)c=void 0;else{var f=+d[1];c=t[1]+f}}else c=t?.[1];var m=[s,c];if(to(m))return t==null?m:C0(m,t,r)}}}var Ii=1e9,CU={precision:20,rounding:4,toExpNeg:-7,toExpPos:21,LN10:"2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"},xg,Ve=!0,jr="[DecimalError] ",Po=jr+"Invalid argument: ",gg=jr+"Exponent out of range: ",Di=Math.floor,vo=Math.pow,PU=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,ir,vt=1e7,qe=7,AE=9007199254740991,tl=Di(AE/qe),ce={};ce.absoluteValue=ce.abs=function(){var e=new this.constructor(this);return e.s&&(e.s=1),e};ce.comparedTo=ce.cmp=function(e){var t,r,n,o,a=this;if(e=new a.constructor(e),a.s!==e.s)return a.s||-e.s;if(a.e!==e.e)return a.e>e.e^a.s<0?1:-1;for(n=a.d.length,o=e.d.length,t=0,r=n<o?n:o;t<r;++t)if(a.d[t]!==e.d[t])return a.d[t]>e.d[t]^a.s<0?1:-1;return n===o?0:n>o^a.s<0?1:-1};ce.decimalPlaces=ce.dp=function(){var e=this,t=e.d.length-1,r=(t-e.e)*qe;if(t=e.d[t],t)for(;t%10==0;t/=10)r--;return r<0?0:r};ce.dividedBy=ce.div=function(e){return $n(this,new this.constructor(e))};ce.dividedToIntegerBy=ce.idiv=function(e){var t=this,r=t.constructor;return Le($n(t,new r(e),0,1),r.precision)};ce.equals=ce.eq=function(e){return!this.cmp(e)};ce.exponent=function(){return at(this)};ce.greaterThan=ce.gt=function(e){return this.cmp(e)>0};ce.greaterThanOrEqualTo=ce.gte=function(e){return this.cmp(e)>=0};ce.isInteger=ce.isint=function(){return this.e>this.d.length-2};ce.isNegative=ce.isneg=function(){return this.s<0};ce.isPositive=ce.ispos=function(){return this.s>0};ce.isZero=function(){return this.s===0};ce.lessThan=ce.lt=function(e){return this.cmp(e)<0};ce.lessThanOrEqualTo=ce.lte=function(e){return this.cmp(e)<1};ce.logarithm=ce.log=function(e){var t,r=this,n=r.constructor,o=n.precision,a=o+5;if(e===void 0)e=new n(10);else if(e=new n(e),e.s<1||e.eq(ir))throw Error(jr+"NaN");if(r.s<1)throw Error(jr+(r.s?"NaN":"-Infinity"));return r.eq(ir)?new n(0):(Ve=!1,t=$n(Ba(r,a),Ba(e,a),a),Ve=!0,Le(t,o))};ce.minus=ce.sub=function(e){var t=this;return e=new t.constructor(e),t.s==e.s?TE(t,e):OE(t,(e.s=-e.s,e))};ce.modulo=ce.mod=function(e){var t,r=this,n=r.constructor,o=n.precision;if(e=new n(e),!e.s)throw Error(jr+"NaN");return r.s?(Ve=!1,t=$n(r,e,0,1).times(e),Ve=!0,r.minus(t)):Le(new n(r),o)};ce.naturalExponential=ce.exp=function(){return RE(this)};ce.naturalLogarithm=ce.ln=function(){return Ba(this)};ce.negated=ce.neg=function(){var e=new this.constructor(this);return e.s=-e.s||0,e};ce.plus=ce.add=function(e){var t=this;return e=new t.constructor(e),t.s==e.s?OE(t,e):TE(t,(e.s=-e.s,e))};ce.precision=ce.sd=function(e){var t,r,n,o=this;if(e!==void 0&&e!==!!e&&e!==1&&e!==0)throw Error(Po+e);if(t=at(o)+1,n=o.d.length-1,r=n*qe+1,n=o.d[n],n){for(;n%10==0;n/=10)r--;for(n=o.d[0];n>=10;n/=10)r++}return e&&t>r?t:r};ce.squareRoot=ce.sqrt=function(){var e,t,r,n,o,a,s,c=this,l=c.constructor;if(c.s<1){if(!c.s)return new l(0);throw Error(jr+"NaN")}for(e=at(c),Ve=!1,o=Math.sqrt(+c),o==0||o==1/0?(t=an(c.d),(t.length+e)%2==0&&(t+="0"),o=Math.sqrt(t),e=Di((e+1)/2)-(e<0||e%2),o==1/0?t="5e"+e:(t=o.toExponential(),t=t.slice(0,t.indexOf("e")+1)+e),n=new l(t)):n=new l(o.toString()),r=l.precision,o=s=r+3;;)if(a=n,n=a.plus($n(c,a,s+2)).times(.5),an(a.d).slice(0,s)===(t=an(n.d)).slice(0,s)){if(t=t.slice(s-3,s+1),o==s&&t=="4999"){if(Le(a,r+1,0),a.times(a).eq(c)){n=a;break}}else if(t!="9999")break;s+=4}return Ve=!0,Le(n,r)};ce.times=ce.mul=function(e){var t,r,n,o,a,s,c,l,u,d=this,f=d.constructor,m=d.d,g=(e=new f(e)).d;if(!d.s||!e.s)return new f(0);for(e.s*=d.s,r=d.e+e.e,l=m.length,u=g.length,l<u&&(a=m,m=g,g=a,s=l,l=u,u=s),a=[],s=l+u,n=s;n--;)a.push(0);for(n=u;--n>=0;){for(t=0,o=l+n;o>n;)c=a[o]+g[n]*m[o-n-1]+t,a[o--]=c%vt|0,t=c/vt|0;a[o]=(a[o]+t)%vt|0}for(;!a[--s];)a.pop();return t?++r:a.shift(),e.d=a,e.e=r,Ve?Le(e,f.precision):e};ce.toDecimalPlaces=ce.todp=function(e,t){var r=this,n=r.constructor;return r=new n(r),e===void 0?r:(ln(e,0,Ii),t===void 0?t=n.rounding:ln(t,0,8),Le(r,e+at(r)+1,t))};ce.toExponential=function(e,t){var r,n=this,o=n.constructor;return e===void 0?r=zo(n,!0):(ln(e,0,Ii),t===void 0?t=o.rounding:ln(t,0,8),n=Le(new o(n),e+1,t),r=zo(n,!0,e+1)),r};ce.toFixed=function(e,t){var r,n,o=this,a=o.constructor;return e===void 0?zo(o):(ln(e,0,Ii),t===void 0?t=a.rounding:ln(t,0,8),n=Le(new a(o),e+at(o)+1,t),r=zo(n.abs(),!1,e+at(n)+1),o.isneg()&&!o.isZero()?"-"+r:r)};ce.toInteger=ce.toint=function(){var e=this,t=e.constructor;return Le(new t(e),at(e)+1,t.rounding)};ce.toNumber=function(){return+this};ce.toPower=ce.pow=function(e){var t,r,n,o,a,s,c=this,l=c.constructor,u=12,d=+(e=new l(e));if(!e.s)return new l(ir);if(c=new l(c),!c.s){if(e.s<1)throw Error(jr+"Infinity");return c}if(c.eq(ir))return c;if(n=l.precision,e.eq(ir))return Le(c,n);if(t=e.e,r=e.d.length-1,s=t>=r,a=c.s,s){if((r=d<0?-d:d)<=AE){for(o=new l(ir),t=Math.ceil(n/qe+4),Ve=!1;r%2&&(o=o.times(c),A0(o.d,t)),r=Di(r/2),r!==0;)c=c.times(c),A0(c.d,t);return Ve=!0,e.s<0?new l(ir).div(o):Le(o,n)}}else if(a<0)throw Error(jr+"NaN");return a=a<0&&e.d[Math.max(t,r)]&1?-1:1,c.s=1,Ve=!1,o=e.times(Ba(c,n+u)),Ve=!0,o=RE(o),o.s=a,o};ce.toPrecision=function(e,t){var r,n,o=this,a=o.constructor;return e===void 0?(r=at(o),n=zo(o,r<=a.toExpNeg||r>=a.toExpPos)):(ln(e,1,Ii),t===void 0?t=a.rounding:ln(t,0,8),o=Le(new a(o),e,t),r=at(o),n=zo(o,e<=r||r<=a.toExpNeg,e)),n};ce.toSignificantDigits=ce.tosd=function(e,t){var r=this,n=r.constructor;return e===void 0?(e=n.precision,t=n.rounding):(ln(e,1,Ii),t===void 0?t=n.rounding:ln(t,0,8)),Le(new n(r),e,t)};ce.toString=ce.valueOf=ce.val=ce.toJSON=ce[Symbol.for("nodejs.util.inspect.custom")]=function(){var e=this,t=at(e),r=e.constructor;return zo(e,t<=r.toExpNeg||t>=r.toExpPos)};function OE(e,t){var r,n,o,a,s,c,l,u,d=e.constructor,f=d.precision;if(!e.s||!t.s)return t.s||(t=new d(e)),Ve?Le(t,f):t;if(l=e.d,u=t.d,s=e.e,o=t.e,l=l.slice(),a=s-o,a){for(a<0?(n=l,a=-a,c=u.length):(n=u,o=s,c=l.length),s=Math.ceil(f/qe),c=s>c?s+1:c+1,a>c&&(a=c,n.length=1),n.reverse();a--;)n.push(0);n.reverse()}for(c=l.length,a=u.length,c-a<0&&(a=c,n=u,u=l,l=n),r=0;a;)r=(l[--a]=l[a]+u[a]+r)/vt|0,l[a]%=vt;for(r&&(l.unshift(r),++o),c=l.length;l[--c]==0;)l.pop();return t.d=l,t.e=o,Ve?Le(t,f):t}function ln(e,t,r){if(e!==~~e||e<t||e>r)throw Error(Po+e)}function an(e){var t,r,n,o=e.length-1,a="",s=e[0];if(o>0){for(a+=s,t=1;t<o;t++)n=e[t]+"",r=qe-n.length,r&&(a+=Gn(r)),a+=n;s=e[t],n=s+"",r=qe-n.length,r&&(a+=Gn(r))}else if(s===0)return"0";for(;s%10===0;)s/=10;return a+s}var $n=(function(){function e(n,o){var a,s=0,c=n.length;for(n=n.slice();c--;)a=n[c]*o+s,n[c]=a%vt|0,s=a/vt|0;return s&&n.unshift(s),n}function t(n,o,a,s){var c,l;if(a!=s)l=a>s?1:-1;else for(c=l=0;c<a;c++)if(n[c]!=o[c]){l=n[c]>o[c]?1:-1;break}return l}function r(n,o,a){for(var s=0;a--;)n[a]-=s,s=n[a]<o[a]?1:0,n[a]=s*vt+n[a]-o[a];for(;!n[0]&&n.length>1;)n.shift()}return function(n,o,a,s){var c,l,u,d,f,m,g,x,v,b,E,w,j,S,y,k,$,C,P=n.constructor,z=n.s==o.s?1:-1,_=n.d,N=o.d;if(!n.s)return new P(n);if(!o.s)throw Error(jr+"Division by zero");for(l=n.e-o.e,$=N.length,y=_.length,g=new P(z),x=g.d=[],u=0;N[u]==(_[u]||0);)++u;if(N[u]>(_[u]||0)&&--l,a==null?w=a=P.precision:s?w=a+(at(n)-at(o))+1:w=a,w<0)return new P(0);if(w=w/qe+2|0,u=0,$==1)for(d=0,N=N[0],w++;(u<y||d)&&w--;u++)j=d*vt+(_[u]||0),x[u]=j/N|0,d=j%N|0;else{for(d=vt/(N[0]+1)|0,d>1&&(N=e(N,d),_=e(_,d),$=N.length,y=_.length),S=$,v=_.slice(0,$),b=v.length;b<$;)v[b++]=0;C=N.slice(),C.unshift(0),k=N[0],N[1]>=vt/2&&++k;do d=0,c=t(N,v,$,b),c<0?(E=v[0],$!=b&&(E=E*vt+(v[1]||0)),d=E/k|0,d>1?(d>=vt&&(d=vt-1),f=e(N,d),m=f.length,b=v.length,c=t(f,v,m,b),c==1&&(d--,r(f,$<m?C:N,m))):(d==0&&(c=d=1),f=N.slice()),m=f.length,m<b&&f.unshift(0),r(v,f,b),c==-1&&(b=v.length,c=t(N,v,$,b),c<1&&(d++,r(v,$<b?C:N,b))),b=v.length):c===0&&(d++,v=[0]),x[u++]=d,c&&v[0]?v[b++]=_[S]||0:(v=[_[S]],b=1);while((S++<y||v[0]!==void 0)&&w--)}return x[0]||x.shift(),g.e=l,Le(g,s?a+at(g)+1:a)}})();function RE(e,t){var r,n,o,a,s,c,l=0,u=0,d=e.constructor,f=d.precision;if(at(e)>16)throw Error(gg+at(e));if(!e.s)return new d(ir);for(Ve=!1,c=f,s=new d(.03125);e.abs().gte(.1);)e=e.times(s),u+=5;for(n=Math.log(vo(2,u))/Math.LN10*2+5|0,c+=n,r=o=a=new d(ir),d.precision=c;;){if(o=Le(o.times(e),c),r=r.times(++l),s=a.plus($n(o,r,c)),an(s.d).slice(0,c)===an(a.d).slice(0,c)){for(;u--;)a=Le(a.times(a),c);return d.precision=f,t==null?(Ve=!0,Le(a,f)):a}a=s}}function at(e){for(var t=e.e*qe,r=e.d[0];r>=10;r/=10)t++;return t}function kh(e,t,r){if(t>e.LN10.sd())throw Ve=!0,r&&(e.precision=r),Error(jr+"LN10 precision limit exceeded");return Le(new e(e.LN10),t)}function Gn(e){for(var t="";e--;)t+="0";return t}function Ba(e,t){var r,n,o,a,s,c,l,u,d,f=1,m=10,g=e,x=g.d,v=g.constructor,b=v.precision;if(g.s<1)throw Error(jr+(g.s?"NaN":"-Infinity"));if(g.eq(ir))return new v(0);if(t==null?(Ve=!1,u=b):u=t,g.eq(10))return t==null&&(Ve=!0),kh(v,u);if(u+=m,v.precision=u,r=an(x),n=r.charAt(0),a=at(g),Math.abs(a)<15e14){for(;n<7&&n!=1||n==1&&r.charAt(1)>3;)g=g.times(e),r=an(g.d),n=r.charAt(0),f++;a=at(g),n>1?(g=new v("0."+r),a++):g=new v(n+"."+r.slice(1))}else return l=kh(v,u+2,b).times(a+""),g=Ba(new v(n+"."+r.slice(1)),u-m).plus(l),v.precision=b,t==null?(Ve=!0,Le(g,b)):g;for(c=s=g=$n(g.minus(ir),g.plus(ir),u),d=Le(g.times(g),u),o=3;;){if(s=Le(s.times(d),u),l=c.plus($n(s,new v(o),u)),an(l.d).slice(0,u)===an(c.d).slice(0,u))return c=c.times(2),a!==0&&(c=c.plus(kh(v,u+2,b).times(a+""))),c=$n(c,new v(f),u),v.precision=b,t==null?(Ve=!0,Le(c,b)):c;c=l,o+=2}}function P0(e,t){var r,n,o;for((r=t.indexOf("."))>-1&&(t=t.replace(".","")),(n=t.search(/e/i))>0?(r<0&&(r=n),r+=+t.slice(n+1),t=t.substring(0,n)):r<0&&(r=t.length),n=0;t.charCodeAt(n)===48;)++n;for(o=t.length;t.charCodeAt(o-1)===48;)--o;if(t=t.slice(n,o),t){if(o-=n,r=r-n-1,e.e=Di(r/qe),e.d=[],n=(r+1)%qe,r<0&&(n+=qe),n<o){for(n&&e.d.push(+t.slice(0,n)),o-=qe;n<o;)e.d.push(+t.slice(n,n+=qe));t=t.slice(n),n=qe-t.length}else n-=o;for(;n--;)t+="0";if(e.d.push(+t),Ve&&(e.e>tl||e.e<-tl))throw Error(gg+r)}else e.s=0,e.e=0,e.d=[0];return e}function Le(e,t,r){var n,o,a,s,c,l,u,d,f=e.d;for(s=1,a=f[0];a>=10;a/=10)s++;if(n=t-s,n<0)n+=qe,o=t,u=f[d=0];else{if(d=Math.ceil((n+1)/qe),a=f.length,d>=a)return e;for(u=a=f[d],s=1;a>=10;a/=10)s++;n%=qe,o=n-qe+s}if(r!==void 0&&(a=vo(10,s-o-1),c=u/a%10|0,l=t<0||f[d+1]!==void 0||u%a,l=r<4?(c||l)&&(r==0||r==(e.s<0?3:2)):c>5||c==5&&(r==4||l||r==6&&(n>0?o>0?u/vo(10,s-o):0:f[d-1])%10&1||r==(e.s<0?8:7))),t<1||!f[0])return l?(a=at(e),f.length=1,t=t-a-1,f[0]=vo(10,(qe-t%qe)%qe),e.e=Di(-t/qe)||0):(f.length=1,f[0]=e.e=e.s=0),e;if(n==0?(f.length=d,a=1,d--):(f.length=d+1,a=vo(10,qe-n),f[d]=o>0?(u/vo(10,s-o)%vo(10,o)|0)*a:0),l)for(;;)if(d==0){(f[0]+=a)==vt&&(f[0]=1,++e.e);break}else{if(f[d]+=a,f[d]!=vt)break;f[d--]=0,a=1}for(n=f.length;f[--n]===0;)f.pop();if(Ve&&(e.e>tl||e.e<-tl))throw Error(gg+at(e));return e}function TE(e,t){var r,n,o,a,s,c,l,u,d,f,m=e.constructor,g=m.precision;if(!e.s||!t.s)return t.s?t.s=-t.s:t=new m(e),Ve?Le(t,g):t;if(l=e.d,f=t.d,n=t.e,u=e.e,l=l.slice(),s=u-n,s){for(d=s<0,d?(r=l,s=-s,c=f.length):(r=f,n=u,c=l.length),o=Math.max(Math.ceil(g/qe),c)+2,s>o&&(s=o,r.length=1),r.reverse(),o=s;o--;)r.push(0);r.reverse()}else{for(o=l.length,c=f.length,d=o<c,d&&(c=o),o=0;o<c;o++)if(l[o]!=f[o]){d=l[o]<f[o];break}s=0}for(d&&(r=l,l=f,f=r,t.s=-t.s),c=l.length,o=f.length-c;o>0;--o)l[c++]=0;for(o=f.length;o>s;){if(l[--o]<f[o]){for(a=o;a&&l[--a]===0;)l[a]=vt-1;--l[a],l[o]+=vt}l[o]-=f[o]}for(;l[--c]===0;)l.pop();for(;l[0]===0;l.shift())--n;return l[0]?(t.d=l,t.e=n,Ve?Le(t,g):t):new m(0)}function zo(e,t,r){var n,o=at(e),a=an(e.d),s=a.length;return t?(r&&(n=r-s)>0?a=a.charAt(0)+"."+a.slice(1)+Gn(n):s>1&&(a=a.charAt(0)+"."+a.slice(1)),a=a+(o<0?"e":"e+")+o):o<0?(a="0."+Gn(-o-1)+a,r&&(n=r-s)>0&&(a+=Gn(n))):o>=s?(a+=Gn(o+1-s),r&&(n=r-o-1)>0&&(a=a+"."+Gn(n))):((n=o+1)<s&&(a=a.slice(0,n)+"."+a.slice(n)),r&&(n=r-s)>0&&(o+1===s&&(a+="."),a+=Gn(n))),e.s<0?"-"+a:a}function A0(e,t){if(e.length>t)return e.length=t,!0}function IE(e){var t,r,n;function o(a){var s=this;if(!(s instanceof o))return new o(a);if(s.constructor=o,a instanceof o){s.s=a.s,s.e=a.e,s.d=(a=a.d)?a.slice():a;return}if(typeof a=="number"){if(a*0!==0)throw Error(Po+a);if(a>0)s.s=1;else if(a<0)a=-a,s.s=-1;else{s.s=0,s.e=0,s.d=[0];return}if(a===~~a&&a<1e7){s.e=0,s.d=[a];return}return P0(s,a.toString())}else if(typeof a!="string")throw Error(Po+a);if(a.charCodeAt(0)===45?(a=a.slice(1),s.s=-1):s.s=1,PU.test(a))P0(s,a);else throw Error(Po+a)}if(o.prototype=ce,o.ROUND_UP=0,o.ROUND_DOWN=1,o.ROUND_CEIL=2,o.ROUND_FLOOR=3,o.ROUND_HALF_UP=4,o.ROUND_HALF_DOWN=5,o.ROUND_HALF_EVEN=6,o.ROUND_HALF_CEIL=7,o.ROUND_HALF_FLOOR=8,o.clone=IE,o.config=o.set=AU,e===void 0&&(e={}),e)for(n=["precision","rounding","toExpNeg","toExpPos","LN10"],t=0;t<n.length;)e.hasOwnProperty(r=n[t++])||(e[r]=this[r]);return o.config(e),o}function AU(e){if(!e||typeof e!="object")throw Error(jr+"Object expected");var t,r,n,o=["precision",1,Ii,"rounding",0,8,"toExpNeg",-1/0,0,"toExpPos",0,1/0];for(t=0;t<o.length;t+=3)if((n=e[r=o[t]])!==void 0)if(Di(n)===n&&n>=o[t+1]&&n<=o[t+2])this[r]=n;else throw Error(Po+r+": "+n);if((n=e[r="LN10"])!==void 0)if(n==Math.LN10)this[r]=new this(n);else throw Error(Po+r+": "+n);return this}var xg=IE(CU);ir=new xg(1);const Re=xg;var OU=e=>e,DE={},_E=e=>e===DE,O0=e=>function t(){return arguments.length===0||arguments.length===1&&_E(arguments.length<=0?void 0:arguments[0])?t:e(...arguments)},LE=(e,t)=>e===1?t:O0(function(){for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];var a=n.filter(s=>s!==DE).length;return a>=e?t(...n):LE(e-a,O0(function(){for(var s=arguments.length,c=new Array(s),l=0;l<s;l++)c[l]=arguments[l];var u=n.map(d=>_E(d)?c.shift():d);return t(...u,...c)}))}),RU=e=>LE(e.length,e),Zp=(e,t)=>{for(var r=[],n=e;n<t;++n)r[n-e]=n;return r},TU=RU((e,t)=>Array.isArray(t)?t.map(e):Object.keys(t).map(r=>t[r]).map(e)),IU=function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];if(!r.length)return OU;var o=r.reverse(),a=o[0],s=o.slice(1);return function(){return s.reduce((c,l)=>l(c),a(...arguments))}};function ME(e){var t;return e===0?t=1:t=Math.floor(new Re(e).abs().log(10).toNumber())+1,t}function zE(e,t,r){for(var n=new Re(e),o=0,a=[];n.lt(t)&&o<1e5;)a.push(n.toNumber()),n=n.add(r),o++;return a}var NE=e=>{var[t,r]=e,[n,o]=[t,r];return t>r&&([n,o]=[r,t]),[n,o]},BE=(e,t,r)=>{if(e.lte(0))return new Re(0);var n=ME(e.toNumber()),o=new Re(10).pow(n),a=e.div(o),s=n!==1?.05:.1,c=new Re(Math.ceil(a.div(s).toNumber())).add(r).mul(s),l=c.mul(o);return t?new Re(l.toNumber()):new Re(Math.ceil(l.toNumber()))},DU=(e,t,r)=>{var n=new Re(1),o=new Re(e);if(!o.isint()&&r){var a=Math.abs(e);a<1?(n=new Re(10).pow(ME(e)-1),o=new Re(Math.floor(o.div(n).toNumber())).mul(n)):a>1&&(o=new Re(Math.floor(e)))}else e===0?o=new Re(Math.floor((t-1)/2)):r||(o=new Re(Math.floor(e)));var s=Math.floor((t-1)/2),c=IU(TU(l=>o.add(new Re(l-s).mul(n)).toNumber()),Zp);return c(0,t)},FE=function(t,r,n,o){var a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:0;if(!Number.isFinite((r-t)/(n-1)))return{step:new Re(0),tickMin:new Re(0),tickMax:new Re(0)};var s=BE(new Re(r).sub(t).div(n-1),o,a),c;t<=0&&r>=0?c=new Re(0):(c=new Re(t).add(r).div(2),c=c.sub(new Re(c).mod(s)));var l=Math.ceil(c.sub(t).div(s).toNumber()),u=Math.ceil(new Re(r).sub(c).div(s).toNumber()),d=l+u+1;return d>n?FE(t,r,n,o,a+1):(d<n&&(u=r>0?u+(n-d):u,l=r>0?l:l+(n-d)),{step:s,tickMin:c.sub(new Re(l).mul(s)),tickMax:c.add(new Re(u).mul(s))})},_U=function(t){var[r,n]=t,o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:6,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,s=Math.max(o,2),[c,l]=NE([r,n]);if(c===-1/0||l===1/0){var u=l===1/0?[c,...Zp(0,o-1).map(()=>1/0)]:[...Zp(0,o-1).map(()=>-1/0),l];return r>n?u.reverse():u}if(c===l)return DU(c,o,a);var{step:d,tickMin:f,tickMax:m}=FE(c,l,s,a,0),g=zE(f,m.add(new Re(.1).mul(d)),d);return r>n?g.reverse():g},LU=function(t,r){var[n,o]=t,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,[s,c]=NE([n,o]);if(s===-1/0||c===1/0)return[n,o];if(s===c)return[s];var l=Math.max(r,2),u=BE(new Re(c).sub(s).div(l-1),a,0),d=[...zE(new Re(s),new Re(c),u),c];return a===!1&&(d=d.map(f=>Math.round(f))),n>o?d.reverse():d},UE=e=>e.rootProps.maxBarSize,MU=e=>e.rootProps.barGap,qE=e=>e.rootProps.barCategoryGap,zU=e=>e.rootProps.barSize,sd=e=>e.rootProps.stackOffset,WE=e=>e.rootProps.reverseStackOrder,vg=e=>e.options.chartName,yg=e=>e.rootProps.syncId,HE=e=>e.rootProps.syncMethod,bg=e=>e.options.eventEmitter,wt={grid:-100,barBackground:-50,area:100,cursorRectangle:200,bar:300,line:400,axis:500,scatter:600,activeBar:1e3,cursorLine:1100,activeDot:1200,label:2e3},vn={allowDuplicatedCategory:!0,angleAxisId:0,reversed:!1,scale:"auto",tick:!0,type:"category"},or={allowDataOverflow:!1,allowDuplicatedCategory:!0,radiusAxisId:0,scale:"auto",tick:!0,tickCount:5,type:"number"},cd=(e,t)=>{if(!(!e||!t))return e!=null&&e.reversed?[t[1],t[0]]:t},NU={allowDataOverflow:!1,allowDecimals:!1,allowDuplicatedCategory:!1,dataKey:void 0,domain:void 0,id:vn.angleAxisId,includeHidden:!1,name:void 0,reversed:vn.reversed,scale:vn.scale,tick:vn.tick,tickCount:void 0,ticks:void 0,type:vn.type,unit:void 0},BU={allowDataOverflow:or.allowDataOverflow,allowDecimals:!1,allowDuplicatedCategory:or.allowDuplicatedCategory,dataKey:void 0,domain:void 0,id:or.radiusAxisId,includeHidden:!1,name:void 0,reversed:!1,scale:or.scale,tick:or.tick,tickCount:or.tickCount,ticks:void 0,type:or.type,unit:void 0},FU={allowDataOverflow:!1,allowDecimals:!1,allowDuplicatedCategory:vn.allowDuplicatedCategory,dataKey:void 0,domain:void 0,id:vn.angleAxisId,includeHidden:!1,name:void 0,reversed:!1,scale:vn.scale,tick:vn.tick,tickCount:void 0,ticks:void 0,type:"number",unit:void 0},UU={allowDataOverflow:or.allowDataOverflow,allowDecimals:!1,allowDuplicatedCategory:or.allowDuplicatedCategory,dataKey:void 0,domain:void 0,id:or.radiusAxisId,includeHidden:!1,name:void 0,reversed:!1,scale:or.scale,tick:or.tick,tickCount:or.tickCount,ticks:void 0,type:"category",unit:void 0},wg=(e,t)=>e.polarAxis.angleAxis[t]!=null?e.polarAxis.angleAxis[t]:e.layout.layoutType==="radial"?FU:NU,$g=(e,t)=>e.polarAxis.radiusAxis[t]!=null?e.polarAxis.radiusAxis[t]:e.layout.layoutType==="radial"?UU:BU,ld=e=>e.polarOptions,Sg=V([In,Dn,$t],dU),VE=V([ld,Sg],(e,t)=>{if(e!=null)return Br(e.innerRadius,t,0)}),KE=V([ld,Sg],(e,t)=>{if(e!=null)return Br(e.outerRadius,t,t*.8)}),qU=e=>{if(e==null)return[0,0];var{startAngle:t,endAngle:r}=e;return[t,r]},GE=V([ld],qU);V([wg,GE],cd);var YE=V([Sg,VE,KE],(e,t,r)=>{if(!(e==null||t==null||r==null))return[t,r]});V([$g,YE],cd);var XE=V([Pe,ld,VE,KE,In,Dn],(e,t,r,n,o,a)=>{if(!(e!=="centric"&&e!=="radial"||t==null||r==null||n==null)){var{cx:s,cy:c,startAngle:l,endAngle:u}=t;return{cx:Br(s,o,o/2),cy:Br(c,a,a/2),innerRadius:r,outerRadius:n,startAngle:l,endAngle:u,clockWise:!1}}}),ut=(e,t)=>t,dd=(e,t,r)=>r;function jg(e){return e?.id}function ZE(e,t,r){var{chartData:n=[]}=t,{allowDuplicatedCategory:o,dataKey:a}=r,s=new Map;return e.forEach(c=>{var l,u=(l=c.data)!==null&&l!==void 0?l:n;if(!(u==null||u.length===0)){var d=jg(c);u.forEach((f,m)=>{var g=a==null||o?m:String(it(f,a,null)),x=it(f,c.dataKey,0),v;s.has(g)?v=s.get(g):v={},Object.assign(v,{[d]:x}),s.set(g,v)})}}),Array.from(s.values())}function ud(e){return"stackId"in e&&e.stackId!=null&&e.dataKey!=null}var hd=(e,t)=>e===t?!0:e==null||t==null?!1:e[0]===t[0]&&e[1]===t[1];function fd(e,t){return Array.isArray(e)&&Array.isArray(t)&&e.length===0&&t.length===0?!0:e===t}function WU(e,t){if(e.length===t.length){for(var r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}return!1}var ht=e=>{var t=Pe(e);return t==="horizontal"?"xAxis":t==="vertical"?"yAxis":t==="centric"?"angleAxis":"radiusAxis"},_i=e=>e.tooltip.settings.axisId;function R0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function rl(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?R0(Object(r),!0).forEach(function(n){HU(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):R0(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function HU(e,t,r){return(t=VU(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function VU(e){var t=KU(e,"string");return typeof t=="symbol"?t:t+""}function KU(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Jp=[0,"auto"],gt={allowDataOverflow:!1,allowDecimals:!0,allowDuplicatedCategory:!0,angle:0,dataKey:void 0,domain:void 0,height:30,hide:!0,id:0,includeHidden:!1,interval:"preserveEnd",minTickGap:5,mirror:!1,name:void 0,orientation:"bottom",padding:{left:0,right:0},reversed:!1,scale:"auto",tick:!0,tickCount:5,tickFormatter:void 0,ticks:void 0,type:"category",unit:void 0},JE=(e,t)=>e.cartesianAxis.xAxis[t],Ln=(e,t)=>{var r=JE(e,t);return r??gt},xt={allowDataOverflow:!1,allowDecimals:!0,allowDuplicatedCategory:!0,angle:0,dataKey:void 0,domain:Jp,hide:!0,id:0,includeHidden:!1,interval:"preserveEnd",minTickGap:5,mirror:!1,name:void 0,orientation:"left",padding:{top:0,bottom:0},reversed:!1,scale:"auto",tick:!0,tickCount:5,tickFormatter:void 0,ticks:void 0,type:"number",unit:void 0,width:ns},QE=(e,t)=>e.cartesianAxis.yAxis[t],Mn=(e,t)=>{var r=QE(e,t);return r??xt},GU={domain:[0,"auto"],includeHidden:!1,reversed:!1,allowDataOverflow:!1,allowDuplicatedCategory:!1,dataKey:void 0,id:0,name:"",range:[64,64],scale:"auto",type:"number",unit:""},kg=(e,t)=>{var r=e.cartesianAxis.zAxis[t];return r??GU},Kt=(e,t,r)=>{switch(t){case"xAxis":return Ln(e,r);case"yAxis":return Mn(e,r);case"zAxis":return kg(e,r);case"angleAxis":return wg(e,r);case"radiusAxis":return $g(e,r);default:throw new Error("Unexpected axis type: ".concat(t))}},YU=(e,t,r)=>{switch(t){case"xAxis":return Ln(e,r);case"yAxis":return Mn(e,r);default:throw new Error("Unexpected axis type: ".concat(t))}},is=(e,t,r)=>{switch(t){case"xAxis":return Ln(e,r);case"yAxis":return Mn(e,r);case"angleAxis":return wg(e,r);case"radiusAxis":return $g(e,r);default:throw new Error("Unexpected axis type: ".concat(t))}},eC=e=>e.graphicalItems.cartesianItems.some(t=>t.type==="bar")||e.graphicalItems.polarItems.some(t=>t.type==="radialBar");function tC(e,t){return r=>{switch(e){case"xAxis":return"xAxisId"in r&&r.xAxisId===t;case"yAxis":return"yAxisId"in r&&r.yAxisId===t;case"zAxis":return"zAxisId"in r&&r.zAxisId===t;case"angleAxis":return"angleAxisId"in r&&r.angleAxisId===t;case"radiusAxis":return"radiusAxisId"in r&&r.radiusAxisId===t;default:return!1}}}var pd=e=>e.graphicalItems.cartesianItems,XU=V([ut,dd],tC),rC=(e,t,r)=>e.filter(r).filter(n=>t?.includeHidden===!0?!0:!n.hide),as=V([pd,Kt,XU],rC,{memoizeOptions:{resultEqualityCheck:fd}}),nC=V([as],e=>e.filter(t=>t.type==="area"||t.type==="bar").filter(ud)),oC=e=>e.filter(t=>!("stackId"in t)||t.stackId===void 0),ZU=V([as],oC),iC=e=>e.map(t=>t.data).filter(Boolean).flat(1),JU=V([as],iC,{memoizeOptions:{resultEqualityCheck:fd}}),aC=(e,t)=>{var{chartData:r=[],dataStartIndex:n,dataEndIndex:o}=t;return e.length>0?e:r.slice(n,o+1)},Eg=V([JU,mg],aC),sC=(e,t,r)=>t?.dataKey!=null?e.map(n=>({value:it(n,t.dataKey)})):r.length>0?r.map(n=>n.dataKey).flatMap(n=>e.map(o=>({value:it(o,n)}))):e.map(n=>({value:n})),md=V([Eg,Kt,as],sC);function cC(e,t){switch(e){case"xAxis":return t.direction==="x";case"yAxis":return t.direction==="y";default:return!1}}function Sc(e){if(sn(e)||e instanceof Date){var t=Number(e);if(Ye(t))return t}}function T0(e){if(Array.isArray(e)){var t=[Sc(e[0]),Sc(e[1])];return to(t)?t:void 0}var r=Sc(e);if(r!=null)return[r,r]}function En(e){return e.map(Sc).filter(f4)}function QU(e,t,r){return!r||typeof t!="number"||Nr(t)?[]:r.length?En(r.flatMap(n=>{var o=it(e,n.dataKey),a,s;if(Array.isArray(o)?[a,s]=o:a=s=o,!(!Ye(a)||!Ye(s)))return[t-a,t+s]})):[]}var ft=e=>{var t=ht(e),r=_i(e);return is(e,t,r)},ss=V([ft],e=>e?.dataKey),eq=V([nC,mg,ft],ZE),lC=(e,t,r,n)=>{var o={},a=t.reduce((s,c)=>{if(c.stackId==null)return s;var l=s[c.stackId];return l==null&&(l=[]),l.push(c),s[c.stackId]=l,s},o);return Object.fromEntries(Object.entries(a).map(s=>{var[c,l]=s,u=n?[...l].reverse():l,d=u.map(jg);return[c,{stackedData:BF(e,d,r),graphicalItems:u}]}))},Qp=V([eq,nC,sd,WE],lC),dC=(e,t,r,n)=>{var{dataStartIndex:o,dataEndIndex:a}=t;if(n==null&&r!=="zAxis"){var s=HF(e,o,a);if(!(s!=null&&s[0]===0&&s[1]===0))return s}},tq=V([Kt],e=>e.allowDataOverflow),Cg=e=>{var t;if(e==null||!("domain"in e))return Jp;if(e.domain!=null)return e.domain;if("ticks"in e&&e.ticks!=null){if(e.type==="number"){var r=En(e.ticks);return[Math.min(...r),Math.max(...r)]}if(e.type==="category")return e.ticks.map(String)}return(t=e?.domain)!==null&&t!==void 0?t:Jp},uC=V([Kt],Cg),hC=V([uC,tq],PE),rq=V([Qp,_n,ut,hC],dC,{memoizeOptions:{resultEqualityCheck:hd}}),Pg=e=>e.errorBars,nq=(e,t,r)=>e.flatMap(n=>t[n.id]).filter(Boolean).filter(n=>cC(r,n)),nl=function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];var o=r.filter(Boolean);if(o.length!==0){var a=o.flat(),s=Math.min(...a),c=Math.max(...a);return[s,c]}},fC=(e,t,r,n,o)=>{var a,s;if(r.length>0&&e.forEach(c=>{r.forEach(l=>{var u,d,f=(u=n[l.id])===null||u===void 0?void 0:u.filter(E=>cC(o,E)),m=it(c,(d=t.dataKey)!==null&&d!==void 0?d:l.dataKey),g=QU(c,m,f);if(g.length>=2){var x=Math.min(...g),v=Math.max(...g);(a==null||x<a)&&(a=x),(s==null||v>s)&&(s=v)}var b=T0(m);b!=null&&(a=a==null?b[0]:Math.min(a,b[0]),s=s==null?b[1]:Math.max(s,b[1]))})}),t?.dataKey!=null&&e.forEach(c=>{var l=T0(it(c,t.dataKey));l!=null&&(a=a==null?l[0]:Math.min(a,l[0]),s=s==null?l[1]:Math.max(s,l[1]))}),Ye(a)&&Ye(s))return[a,s]},oq=V([Eg,Kt,ZU,Pg,ut],fC,{memoizeOptions:{resultEqualityCheck:hd}});function iq(e){var{value:t}=e;if(sn(t)||t instanceof Date)return t}var aq=(e,t,r)=>{var n=e.map(iq).filter(o=>o!=null);return r&&(t.dataKey==null||t.allowDuplicatedCategory&&ak(n))?EE(0,e.length):t.allowDuplicatedCategory?n:Array.from(new Set(n))},pC=e=>e.referenceElements.dots,Li=(e,t,r)=>e.filter(n=>n.ifOverflow==="extendDomain").filter(n=>t==="xAxis"?n.xAxisId===r:n.yAxisId===r),sq=V([pC,ut,dd],Li),mC=e=>e.referenceElements.areas,cq=V([mC,ut,dd],Li),gC=e=>e.referenceElements.lines,lq=V([gC,ut,dd],Li),xC=(e,t)=>{if(e!=null){var r=En(e.map(n=>t==="xAxis"?n.x:n.y));if(r.length!==0)return[Math.min(...r),Math.max(...r)]}},dq=V(sq,ut,xC),vC=(e,t)=>{if(e!=null){var r=En(e.flatMap(n=>[t==="xAxis"?n.x1:n.y1,t==="xAxis"?n.x2:n.y2]));if(r.length!==0)return[Math.min(...r),Math.max(...r)]}},uq=V([cq,ut],vC);function hq(e){var t;if(e.x!=null)return En([e.x]);var r=(t=e.segment)===null||t===void 0?void 0:t.map(n=>n.x);return r==null||r.length===0?[]:En(r)}function fq(e){var t;if(e.y!=null)return En([e.y]);var r=(t=e.segment)===null||t===void 0?void 0:t.map(n=>n.y);return r==null||r.length===0?[]:En(r)}var yC=(e,t)=>{if(e!=null){var r=e.flatMap(n=>t==="xAxis"?hq(n):fq(n));if(r.length!==0)return[Math.min(...r),Math.max(...r)]}},pq=V([lq,ut],yC),mq=V(dq,pq,uq,(e,t,r)=>nl(e,r,t)),bC=(e,t,r,n,o,a,s,c)=>{if(r!=null)return r;var l=s==="vertical"&&c==="xAxis"||s==="horizontal"&&c==="yAxis",u=l?nl(n,a,o):nl(a,o);return EU(t,u,e.allowDataOverflow)},gq=V([Kt,uC,hC,rq,oq,mq,Pe,ut],bC,{memoizeOptions:{resultEqualityCheck:hd}}),xq=[0,1],wC=(e,t,r,n,o,a,s)=>{if(!((e==null||r==null||r.length===0)&&s===void 0)){var{dataKey:c,type:l}=e,u=ao(t,a);if(u&&c==null){var d;return EE(0,(d=r?.length)!==null&&d!==void 0?d:0)}return l==="category"?aq(n,e,u):o==="expand"?xq:s}},Ag=V([Kt,Pe,Eg,md,sd,ut,gq],wC),$C=(e,t,r,n,o)=>{if(e!=null){var{scale:a,type:s}=e;if(a==="auto")return t==="radial"&&o==="radiusAxis"?"band":t==="radial"&&o==="angleAxis"?"linear":s==="category"&&n&&(n.indexOf("LineChart")>=0||n.indexOf("AreaChart")>=0||n.indexOf("ComposedChart")>=0&&!r)?"point":s==="category"?"band":"linear";if(typeof a=="string"){var c="scale".concat(Ja(a));return c in va?c:"point"}}},cs=V([Kt,Pe,eC,vg,ut],$C);function vq(e){if(e!=null){if(e in va)return va[e]();var t="scale".concat(Ja(e));if(t in va)return va[t]()}}function Og(e,t,r,n){if(!(r==null||n==null)){if(typeof e.scale=="function")return e.scale.copy().domain(r).range(n);var o=vq(t);if(o!=null){var a=o.domain(r).range(n);return _F(a),a}}}var SC=(e,t,r)=>{var n=Cg(t);if(!(r!=="auto"&&r!=="linear")){if(t!=null&&t.tickCount&&Array.isArray(n)&&(n[0]==="auto"||n[1]==="auto")&&to(e))return _U(e,t.tickCount,t.allowDecimals);if(t!=null&&t.tickCount&&t.type==="number"&&to(e))return LU(e,t.tickCount,t.allowDecimals)}},Rg=V([Ag,is,cs],SC),jC=(e,t,r,n)=>{if(n!=="angleAxis"&&e?.type==="number"&&to(t)&&Array.isArray(r)&&r.length>0){var o=t[0],a=r[0],s=t[1],c=r[r.length-1];return[Math.min(o,a),Math.max(s,c)]}return t},yq=V([Kt,Ag,Rg,ut],jC),bq=V(md,Kt,(e,t)=>{if(!(!t||t.type!=="number")){var r=1/0,n=Array.from(En(e.map(f=>f.value))).sort((f,m)=>f-m),o=n[0],a=n[n.length-1];if(o==null||a==null)return 1/0;var s=a-o;if(s===0)return 1/0;for(var c=0;c<n.length-1;c++){var l=n[c],u=n[c+1];if(!(l==null||u==null)){var d=u-l;r=Math.min(r,d)}}return r/s}}),kC=V(bq,Pe,qE,$t,(e,t,r,n,o)=>o,(e,t,r,n,o)=>{if(!Ye(e))return 0;var a=t==="vertical"?n.height:n.width;if(o==="gap")return e*a/2;if(o==="no-gap"){var s=Br(r,e*a),c=e*a/2;return c-s-(c-s)/a*s}return 0}),wq=(e,t,r)=>{var n=Ln(e,t);return n==null||typeof n.padding!="string"?0:kC(e,"xAxis",t,r,n.padding)},$q=(e,t,r)=>{var n=Mn(e,t);return n==null||typeof n.padding!="string"?0:kC(e,"yAxis",t,r,n.padding)},Sq=V(Ln,wq,(e,t)=>{var r,n;if(e==null)return{left:0,right:0};var{padding:o}=e;return typeof o=="string"?{left:t,right:t}:{left:((r=o.left)!==null&&r!==void 0?r:0)+t,right:((n=o.right)!==null&&n!==void 0?n:0)+t}}),jq=V(Mn,$q,(e,t)=>{var r,n;if(e==null)return{top:0,bottom:0};var{padding:o}=e;return typeof o=="string"?{top:t,bottom:t}:{top:((r=o.top)!==null&&r!==void 0?r:0)+t,bottom:((n=o.bottom)!==null&&n!==void 0?n:0)+t}}),kq=V([$t,Sq,Jl,Zl,(e,t,r)=>r],(e,t,r,n,o)=>{var{padding:a}=n;return o?[a.left,r.width-a.right]:[e.left+t.left,e.left+e.width-t.right]}),Eq=V([$t,Pe,jq,Jl,Zl,(e,t,r)=>r],(e,t,r,n,o,a)=>{var{padding:s}=o;return a?[n.height-s.bottom,s.top]:t==="horizontal"?[e.top+e.height-r.bottom,e.top+r.top]:[e.top+r.top,e.top+e.height-r.bottom]}),ls=(e,t,r,n)=>{var o;switch(t){case"xAxis":return kq(e,r,n);case"yAxis":return Eq(e,r,n);case"zAxis":return(o=kg(e,r))===null||o===void 0?void 0:o.range;case"angleAxis":return GE(e);case"radiusAxis":return YE(e,r);default:return}},EC=V([Kt,ls],cd),gd=V([Kt,cs,yq,EC],Og);V([as,Pg,ut],nq);function CC(e,t){return e.id<t.id?-1:e.id>t.id?1:0}var xd=(e,t)=>t,vd=(e,t,r)=>r,Cq=V(Yl,xd,vd,(e,t,r)=>e.filter(n=>n.orientation===t).filter(n=>n.mirror===r).sort(CC)),Pq=V(Xl,xd,vd,(e,t,r)=>e.filter(n=>n.orientation===t).filter(n=>n.mirror===r).sort(CC)),PC=(e,t)=>({width:e.width,height:t.height}),Aq=(e,t)=>{var r=typeof t.width=="number"?t.width:ns;return{width:r,height:e.height}},AC=V($t,Ln,PC),Oq=(e,t,r)=>{switch(t){case"top":return e.top;case"bottom":return r-e.bottom;default:return 0}},Rq=(e,t,r)=>{switch(t){case"left":return e.left;case"right":return r-e.right;default:return 0}},Tq=V(Dn,$t,Cq,xd,vd,(e,t,r,n,o)=>{var a={},s;return r.forEach(c=>{var l=PC(t,c);s==null&&(s=Oq(t,n,e));var u=n==="top"&&!o||n==="bottom"&&o;a[c.id]=s-Number(u)*l.height,s+=(u?-1:1)*l.height}),a}),Iq=V(In,$t,Pq,xd,vd,(e,t,r,n,o)=>{var a={},s;return r.forEach(c=>{var l=Aq(t,c);s==null&&(s=Rq(t,n,e));var u=n==="left"&&!o||n==="right"&&o;a[c.id]=s-Number(u)*l.width,s+=(u?-1:1)*l.width}),a}),Dq=(e,t)=>{var r=Ln(e,t);if(r!=null)return Tq(e,r.orientation,r.mirror)},_q=V([$t,Ln,Dq,(e,t)=>t],(e,t,r,n)=>{if(t!=null){var o=r?.[n];return o==null?{x:e.left,y:0}:{x:e.left,y:o}}}),Lq=(e,t)=>{var r=Mn(e,t);if(r!=null)return Iq(e,r.orientation,r.mirror)},Mq=V([$t,Mn,Lq,(e,t)=>t],(e,t,r,n)=>{if(t!=null){var o=r?.[n];return o==null?{x:0,y:e.top}:{x:o,y:e.top}}}),OC=V($t,Mn,(e,t)=>{var r=typeof t.width=="number"?t.width:ns;return{width:r,height:e.height}}),I0=(e,t,r)=>{switch(t){case"xAxis":return AC(e,r).width;case"yAxis":return OC(e,r).height;default:return}},RC=(e,t,r,n)=>{if(r!=null){var{allowDuplicatedCategory:o,type:a,dataKey:s}=r,c=ao(e,n),l=t.map(u=>u.value);if(s&&c&&a==="category"&&o&&ak(l))return l}},Tg=V([Pe,md,Kt,ut],RC),TC=(e,t,r,n)=>{if(!(r==null||r.dataKey==null)){var{type:o,scale:a}=r,s=ao(e,n);if(s&&(o==="number"||a!=="auto"))return t.map(c=>c.value)}},Ig=V([Pe,md,is,ut],TC),D0=V([Pe,YU,cs,gd,Tg,Ig,ls,Rg,ut],(e,t,r,n,o,a,s,c,l)=>{if(t!=null){var u=ao(e,l);return{angle:t.angle,interval:t.interval,minTickGap:t.minTickGap,orientation:t.orientation,tick:t.tick,tickCount:t.tickCount,tickFormatter:t.tickFormatter,ticks:t.ticks,type:t.type,unit:t.unit,axisType:l,categoricalDomain:a,duplicateDomain:o,isCategorical:u,niceTicks:c,range:s,realScaleType:r,scale:n}}}),zq=(e,t,r,n,o,a,s,c,l)=>{if(!(t==null||n==null)){var u=ao(e,l),{type:d,ticks:f,tickCount:m}=t,g=r==="scaleBand"&&typeof n.bandwidth=="function"?n.bandwidth()/2:2,x=d==="category"&&n.bandwidth?n.bandwidth()/g:0;x=l==="angleAxis"&&a!=null&&a.length>=2?Xt(a[0]-a[1])*2*x:x;var v=f||o;if(v){var b=v.map((E,w)=>{var j=s?s.indexOf(E):E;return{index:w,coordinate:n(j)+x,value:E,offset:x}});return b.filter(E=>Ye(E.coordinate))}return u&&c?c.map((E,w)=>({coordinate:n(E)+x,value:E,index:w,offset:x})).filter(E=>Ye(E.coordinate)):n.ticks?n.ticks(m).map(E=>({coordinate:n(E)+x,value:E,offset:x})):n.domain().map((E,w)=>({coordinate:n(E)+x,value:s?s[E]:E,index:w,offset:x}))}},IC=V([Pe,is,cs,gd,Rg,ls,Tg,Ig,ut],zq),Nq=(e,t,r,n,o,a,s)=>{if(!(t==null||r==null||n==null||n[0]===n[1])){var c=ao(e,s),{tickCount:l}=t,u=0;return u=s==="angleAxis"&&n?.length>=2?Xt(n[0]-n[1])*2*u:u,c&&a?a.map((d,f)=>({coordinate:r(d)+u,value:d,index:f,offset:u})):r.ticks?r.ticks(l).map(d=>({coordinate:r(d)+u,value:d,offset:u})):r.domain().map((d,f)=>({coordinate:r(d)+u,value:o?o[d]:d,index:f,offset:u}))}},ro=V([Pe,is,gd,ls,Tg,Ig,ut],Nq),no=V(Kt,gd,(e,t)=>{if(!(e==null||t==null))return rl(rl({},e),{},{scale:t})}),Bq=V([Kt,cs,Ag,EC],Og);V((e,t,r)=>kg(e,r),Bq,(e,t)=>{if(!(e==null||t==null))return rl(rl({},e),{},{scale:t})});var Fq=V([Pe,Yl,Xl],(e,t,r)=>{switch(e){case"horizontal":return t.some(n=>n.reversed)?"right-to-left":"left-to-right";case"vertical":return r.some(n=>n.reversed)?"bottom-to-top":"top-to-bottom";case"centric":case"radial":return"left-to-right";default:return}}),DC=e=>e.options.defaultTooltipEventType,_C=e=>e.options.validateTooltipEventTypes;function LC(e,t,r){if(e==null)return t;var n=e?"axis":"item";return r==null?t:r.includes(n)?n:t}function Dg(e,t){var r=DC(e),n=_C(e);return LC(t,r,n)}function Uq(e){return ue(t=>Dg(t,e))}var MC=(e,t)=>{var r,n=Number(t);if(!(Nr(n)||t==null))return n>=0?e==null||(r=e[n])===null||r===void 0?void 0:r.value:void 0},qq=e=>e.tooltip.settings,Xn={active:!1,index:null,dataKey:void 0,graphicalItemId:void 0,coordinate:void 0},Wq={itemInteraction:{click:Xn,hover:Xn},axisInteraction:{click:Xn,hover:Xn},keyboardInteraction:Xn,syncInteraction:{active:!1,index:null,dataKey:void 0,label:void 0,coordinate:void 0,sourceViewBox:void 0,graphicalItemId:void 0},tooltipItemPayloads:[],settings:{shared:void 0,trigger:"hover",axisId:0,active:!1,defaultIndex:void 0}},zC=Qt({name:"tooltip",initialState:Wq,reducers:{addTooltipEntrySettings:{reducer(e,t){e.tooltipItemPayloads.push(t.payload)},prepare:He()},replaceTooltipEntrySettings:{reducer(e,t){var{prev:r,next:n}=t.payload,o=Mr(e).tooltipItemPayloads.indexOf(r);o>-1&&(e.tooltipItemPayloads[o]=n)},prepare:He()},removeTooltipEntrySettings:{reducer(e,t){var r=Mr(e).tooltipItemPayloads.indexOf(t.payload);r>-1&&e.tooltipItemPayloads.splice(r,1)},prepare:He()},setTooltipSettingsState(e,t){e.settings=t.payload},setActiveMouseOverItemIndex(e,t){e.syncInteraction.active=!1,e.keyboardInteraction.active=!1,e.itemInteraction.hover.active=!0,e.itemInteraction.hover.index=t.payload.activeIndex,e.itemInteraction.hover.dataKey=t.payload.activeDataKey,e.itemInteraction.hover.graphicalItemId=t.payload.activeGraphicalItemId,e.itemInteraction.hover.coordinate=t.payload.activeCoordinate},mouseLeaveChart(e){e.itemInteraction.hover.active=!1,e.axisInteraction.hover.active=!1},mouseLeaveItem(e){e.itemInteraction.hover.active=!1},setActiveClickItemIndex(e,t){e.syncInteraction.active=!1,e.itemInteraction.click.active=!0,e.keyboardInteraction.active=!1,e.itemInteraction.click.index=t.payload.activeIndex,e.itemInteraction.click.dataKey=t.payload.activeDataKey,e.itemInteraction.click.graphicalItemId=t.payload.activeGraphicalItemId,e.itemInteraction.click.coordinate=t.payload.activeCoordinate},setMouseOverAxisIndex(e,t){e.syncInteraction.active=!1,e.axisInteraction.hover.active=!0,e.keyboardInteraction.active=!1,e.axisInteraction.hover.index=t.payload.activeIndex,e.axisInteraction.hover.dataKey=t.payload.activeDataKey,e.axisInteraction.hover.coordinate=t.payload.activeCoordinate},setMouseClickAxisIndex(e,t){e.syncInteraction.active=!1,e.keyboardInteraction.active=!1,e.axisInteraction.click.active=!0,e.axisInteraction.click.index=t.payload.activeIndex,e.axisInteraction.click.dataKey=t.payload.activeDataKey,e.axisInteraction.click.coordinate=t.payload.activeCoordinate},setSyncInteraction(e,t){e.syncInteraction=t.payload},setKeyboardInteraction(e,t){e.keyboardInteraction.active=t.payload.active,e.keyboardInteraction.index=t.payload.activeIndex,e.keyboardInteraction.coordinate=t.payload.activeCoordinate}}}),{addTooltipEntrySettings:Hq,replaceTooltipEntrySettings:Vq,removeTooltipEntrySettings:Kq,setTooltipSettingsState:Gq,setActiveMouseOverItemIndex:NC,mouseLeaveItem:Yq,mouseLeaveChart:BC,setActiveClickItemIndex:Xq,setMouseOverAxisIndex:FC,setMouseClickAxisIndex:Zq,setSyncInteraction:em,setKeyboardInteraction:tm}=zC.actions,Jq=zC.reducer;function _0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Hs(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?_0(Object(r),!0).forEach(function(n){Qq(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_0(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function Qq(e,t,r){return(t=eW(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function eW(e){var t=tW(e,"string");return typeof t=="symbol"?t:t+""}function tW(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function rW(e,t,r){return t==="axis"?r==="click"?e.axisInteraction.click:e.axisInteraction.hover:r==="click"?e.itemInteraction.click:e.itemInteraction.hover}function nW(e){return e.index!=null}var UC=(e,t,r,n)=>{if(t==null)return Xn;var o=rW(e,t,r);if(o==null)return Xn;if(o.active)return o;if(e.keyboardInteraction.active)return e.keyboardInteraction;if(e.syncInteraction.active&&e.syncInteraction.index!=null)return e.syncInteraction;var a=e.settings.active===!0;if(nW(o)){if(a)return Hs(Hs({},o),{},{active:!0})}else if(n!=null)return{active:!0,coordinate:void 0,dataKey:void 0,index:n,graphicalItemId:void 0};return Hs(Hs({},Xn),{},{coordinate:o.coordinate})};function oW(e){if(typeof e=="number")return Number.isFinite(e)?e:void 0;if(e instanceof Date){var t=e.valueOf();return Number.isFinite(t)?t:void 0}var r=Number(e);return Number.isFinite(r)?r:void 0}function iW(e,t){var r=oW(e),n=t[0],o=t[1];if(r===void 0)return!1;var a=Math.min(n,o),s=Math.max(n,o);return r>=a&&r<=s}function aW(e,t,r){if(r==null||t==null)return!0;var n=it(e,t);return n==null||!to(r)?!0:iW(n,r)}var _g=(e,t,r,n)=>{var o=e?.index;if(o==null)return null;var a=Number(o);if(!Ye(a))return o;var s=0,c=1/0;t.length>0&&(c=t.length-1);var l=Math.max(s,Math.min(a,c)),u=t[l];return u==null||aW(u,r,n)?String(l):null},qC=(e,t,r,n,o,a,s,c)=>{if(!(a==null||c==null)){var l=s[0],u=l==null?void 0:c(l.positions,a);if(u!=null)return u;var d=o?.[Number(a)];if(d)switch(r){case"horizontal":return{x:d.coordinate,y:(n.top+t)/2};default:return{x:(n.left+e)/2,y:d.coordinate}}}},WC=(e,t,r,n)=>{if(t==="axis")return e.tooltipItemPayloads;if(e.tooltipItemPayloads.length===0)return[];var o;if(r==="hover"?o=e.itemInteraction.hover.graphicalItemId:o=e.itemInteraction.click.graphicalItemId,o==null&&n!=null){var a=e.tooltipItemPayloads[0];return a!=null?[a]:[]}return e.tooltipItemPayloads.filter(s=>{var c;return((c=s.settings)===null||c===void 0?void 0:c.graphicalItemId)===o})},ds=e=>e.options.tooltipPayloadSearcher,Mi=e=>e.tooltip;function L0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function M0(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?L0(Object(r),!0).forEach(function(n){sW(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):L0(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function sW(e,t,r){return(t=cW(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function cW(e){var t=lW(e,"string");return typeof t=="symbol"?t:t+""}function lW(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function dW(e,t){return e??t}var HC=(e,t,r,n,o,a,s)=>{if(!(t==null||a==null)){var{chartData:c,computedData:l,dataStartIndex:u,dataEndIndex:d}=r,f=[];return e.reduce((m,g)=>{var x,{dataDefinedOnItem:v,settings:b}=g,E=dW(v,c),w=Array.isArray(E)?eE(E,u,d):E,j=(x=b?.dataKey)!==null&&x!==void 0?x:n,S=b?.nameKey,y;if(n&&Array.isArray(w)&&!Array.isArray(w[0])&&s==="axis"?y=sk(w,n,o):y=a(w,t,l,S),Array.isArray(y))y.forEach($=>{var C=M0(M0({},b),{},{name:$.name,unit:$.unit,color:void 0,fill:void 0});m.push($b({tooltipEntrySettings:C,dataKey:$.dataKey,payload:$.payload,value:it($.payload,$.dataKey),name:$.name}))});else{var k;m.push($b({tooltipEntrySettings:b,dataKey:j,payload:y,value:it(y,j),name:(k=it(y,S))!==null&&k!==void 0?k:b?.name}))}return m},f)}},Lg=V([ft,Pe,eC,vg,ht],$C),uW=V([e=>e.graphicalItems.cartesianItems,e=>e.graphicalItems.polarItems],(e,t)=>[...e,...t]),hW=V([ht,_i],tC),zi=V([uW,ft,hW],rC,{memoizeOptions:{resultEqualityCheck:fd}}),fW=V([zi],e=>e.filter(ud)),pW=V([zi],iC,{memoizeOptions:{resultEqualityCheck:fd}}),Ni=V([pW,_n],aC),mW=V([fW,_n,ft],ZE),Mg=V([Ni,ft,zi],sC),VC=V([ft],Cg),gW=V([ft],e=>e.allowDataOverflow),KC=V([VC,gW],PE),xW=V([zi],e=>e.filter(ud)),vW=V([mW,xW,sd,WE],lC),yW=V([vW,_n,ht,KC],dC),bW=V([zi],oC),wW=V([Ni,ft,bW,Pg,ht],fC,{memoizeOptions:{resultEqualityCheck:hd}}),$W=V([pC,ht,_i],Li),SW=V([$W,ht],xC),jW=V([mC,ht,_i],Li),kW=V([jW,ht],vC),EW=V([gC,ht,_i],Li),CW=V([EW,ht],yC),PW=V([SW,CW,kW],nl),AW=V([ft,VC,KC,yW,wW,PW,Pe,ht],bC),us=V([ft,Pe,Ni,Mg,sd,ht,AW],wC),OW=V([us,ft,Lg],SC),RW=V([ft,us,OW,ht],jC),GC=e=>{var t=ht(e),r=_i(e),n=!1;return ls(e,t,r,n)},YC=V([ft,GC],cd),XC=V([ft,Lg,RW,YC],Og),TW=V([Pe,Mg,ft,ht],RC),IW=V([Pe,Mg,ft,ht],TC),DW=(e,t,r,n,o,a,s,c)=>{if(t){var{type:l}=t,u=ao(e,c);if(n){var d=r==="scaleBand"&&n.bandwidth?n.bandwidth()/2:2,f=l==="category"&&n.bandwidth?n.bandwidth()/d:0;return f=c==="angleAxis"&&o!=null&&o?.length>=2?Xt(o[0]-o[1])*2*f:f,u&&s?s.map((m,g)=>({coordinate:n(m)+f,value:m,index:g,offset:f})):n.domain().map((m,g)=>({coordinate:n(m)+f,value:a?a[m]:m,index:g,offset:f}))}}},zn=V([Pe,ft,Lg,XC,GC,TW,IW,ht],DW),zg=V([DC,_C,qq],(e,t,r)=>LC(r.shared,e,t)),ZC=e=>e.tooltip.settings.trigger,Ng=e=>e.tooltip.settings.defaultIndex,hs=V([Mi,zg,ZC,Ng],UC),No=V([hs,Ni,ss,us],_g),JC=V([zn,No],MC),QC=V([hs],e=>{if(e)return e.dataKey});V([hs],e=>{if(e)return e.graphicalItemId});var eP=V([Mi,zg,ZC,Ng],WC),_W=V([In,Dn,Pe,$t,zn,Ng,eP,ds],qC),LW=V([hs,_W],(e,t)=>e!=null&&e.coordinate?e.coordinate:t),MW=V([hs],e=>{var t;return(t=e?.active)!==null&&t!==void 0?t:!1}),zW=V([eP,No,_n,ss,JC,ds,zg],HC),NW=V([zW],e=>{if(e!=null){var t=e.map(r=>r.payload).filter(r=>r!=null);return Array.from(new Set(t))}});function z0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function N0(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?z0(Object(r),!0).forEach(function(n){BW(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):z0(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function BW(e,t,r){return(t=FW(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function FW(e){var t=UW(e,"string");return typeof t=="symbol"?t:t+""}function UW(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var qW=()=>ue(ft),WW=()=>{var e=qW(),t=ue(zn),r=ue(XC);return ji(!e||!r?void 0:N0(N0({},e),{},{scale:r}),t)};function B0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Jo(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?B0(Object(r),!0).forEach(function(n){HW(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):B0(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function HW(e,t,r){return(t=VW(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function VW(e){var t=KW(e,"string");return typeof t=="symbol"?t:t+""}function KW(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var GW=(e,t,r,n)=>{var o=t.find(a=>a&&a.index===r);if(o){if(e==="horizontal")return{x:o.coordinate,y:n.chartY};if(e==="vertical")return{x:n.chartX,y:o.coordinate}}return{x:0,y:0}},YW=(e,t,r,n)=>{var o=t.find(u=>u&&u.index===r);if(o){if(e==="centric"){var a=o.coordinate,{radius:s}=n;return Jo(Jo(Jo({},n),At(n.cx,n.cy,s,a)),{},{angle:a,radius:s})}var c=o.coordinate,{angle:l}=n;return Jo(Jo(Jo({},n),At(n.cx,n.cy,c,l)),{},{angle:l,radius:c})}return{angle:0,clockWise:!1,cx:0,cy:0,endAngle:0,innerRadius:0,outerRadius:0,radius:0,startAngle:0,x:0,y:0}};function XW(e,t){var{chartX:r,chartY:n}=e;return r>=t.left&&r<=t.left+t.width&&n>=t.top&&n<=t.top+t.height}var tP=(e,t,r,n,o)=>{var a,s=(a=t?.length)!==null&&a!==void 0?a:0;if(s<=1||e==null)return 0;if(n==="angleAxis"&&o!=null&&Math.abs(Math.abs(o[1]-o[0])-360)<=1e-6)for(var c=0;c<s;c++){var l,u,d,f,m,g=c>0?(l=r[c-1])===null||l===void 0?void 0:l.coordinate:(u=r[s-1])===null||u===void 0?void 0:u.coordinate,x=(d=r[c])===null||d===void 0?void 0:d.coordinate,v=c>=s-1?(f=r[0])===null||f===void 0?void 0:f.coordinate:(m=r[c+1])===null||m===void 0?void 0:m.coordinate,b=void 0;if(!(g==null||x==null||v==null))if(Xt(x-g)!==Xt(v-x)){var E=[];if(Xt(v-x)===Xt(o[1]-o[0])){b=v;var w=x+o[1]-o[0];E[0]=Math.min(w,(w+g)/2),E[1]=Math.max(w,(w+g)/2)}else{b=g;var j=v+o[1]-o[0];E[0]=Math.min(x,(j+x)/2),E[1]=Math.max(x,(j+x)/2)}var S=[Math.min(x,(b+x)/2),Math.max(x,(b+x)/2)];if(e>S[0]&&e<=S[1]||e>=E[0]&&e<=E[1]){var y;return(y=r[c])===null||y===void 0?void 0:y.index}}else{var k=Math.min(g,v),$=Math.max(g,v);if(e>(k+x)/2&&e<=($+x)/2){var C;return(C=r[c])===null||C===void 0?void 0:C.index}}}else if(t)for(var P=0;P<s;P++){var z=t[P];if(z!=null){var _=t[P+1],N=t[P-1];if(P===0&&_!=null&&e<=(z.coordinate+_.coordinate)/2||P===s-1&&N!=null&&e>(z.coordinate+N.coordinate)/2||P>0&&P<s-1&&N!=null&&_!=null&&e>(z.coordinate+N.coordinate)/2&&e<=(z.coordinate+_.coordinate)/2)return z.index}}return-1},ZW=()=>ue(vg),Bg=(e,t)=>t,rP=(e,t,r)=>r,Fg=(e,t,r,n)=>n,JW=V(zn,e=>Nl(e,t=>t.coordinate)),Ug=V([Mi,Bg,rP,Fg],UC),qg=V([Ug,Ni,ss,us],_g),QW=(e,t,r)=>{if(t!=null){var n=Mi(e);return t==="axis"?r==="hover"?n.axisInteraction.hover.dataKey:n.axisInteraction.click.dataKey:r==="hover"?n.itemInteraction.hover.dataKey:n.itemInteraction.click.dataKey}},nP=V([Mi,Bg,rP,Fg],WC),ol=V([In,Dn,Pe,$t,zn,Fg,nP,ds],qC),eH=V([Ug,ol],(e,t)=>{var r;return(r=e.coordinate)!==null&&r!==void 0?r:t}),oP=V([zn,qg],MC),tH=V([nP,qg,_n,ss,oP,ds,Bg],HC),rH=V([Ug,qg],(e,t)=>({isActive:e.active&&t!=null,activeIndex:t})),nH=(e,t,r,n,o,a,s)=>{if(!(!e||!r||!n||!o)&&XW(e,s)){var c=VF(e,t),l=tP(c,a,o,r,n),u=GW(t,o,l,e);return{activeIndex:String(l),activeCoordinate:u}}},oH=(e,t,r,n,o,a,s)=>{if(!(!e||!n||!o||!a||!r)){var c=mU(e,r);if(c){var l=KF(c,t),u=tP(l,s,a,n,o),d=YW(t,a,u,c);return{activeIndex:String(u),activeCoordinate:d}}}},iH=(e,t,r,n,o,a,s,c)=>{if(!(!e||!t||!n||!o||!a))return t==="horizontal"||t==="vertical"?nH(e,t,n,o,a,s,c):oH(e,t,r,n,o,a,s)},aH=V(e=>e.zIndex.zIndexMap,(e,t)=>t,(e,t,r)=>r,(e,t,r)=>{if(t!=null){var n=e[t];if(n!=null)return r?n.panoramaElement:n.element}}),sH=V(e=>e.zIndex.zIndexMap,e=>{var t=Object.keys(e).map(n=>parseInt(n,10)).concat(Object.values(wt)),r=Array.from(new Set(t));return r.sort((n,o)=>n-o)},{memoizeOptions:{resultEqualityCheck:WU}});function F0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function U0(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?F0(Object(r),!0).forEach(function(n){cH(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):F0(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function cH(e,t,r){return(t=lH(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function lH(e){var t=dH(e,"string");return typeof t=="symbol"?t:t+""}function dH(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var uH={},hH={zIndexMap:Object.values(wt).reduce((e,t)=>U0(U0({},e),{},{[t]:{element:void 0,panoramaElement:void 0,consumers:0}}),uH)},fH=new Set(Object.values(wt));function pH(e){return fH.has(e)}var iP=Qt({name:"zIndex",initialState:hH,reducers:{registerZIndexPortal:{reducer:(e,t)=>{var{zIndex:r}=t.payload;e.zIndexMap[r]?e.zIndexMap[r].consumers+=1:e.zIndexMap[r]={consumers:1,element:void 0,panoramaElement:void 0}},prepare:He()},unregisterZIndexPortal:{reducer:(e,t)=>{var{zIndex:r}=t.payload;e.zIndexMap[r]&&(e.zIndexMap[r].consumers-=1,e.zIndexMap[r].consumers<=0&&!pH(r)&&delete e.zIndexMap[r])},prepare:He()},registerZIndexPortalElement:{reducer:(e,t)=>{var{zIndex:r,element:n,isPanorama:o}=t.payload;e.zIndexMap[r]?o?e.zIndexMap[r].panoramaElement=n:e.zIndexMap[r].element=n:e.zIndexMap[r]={consumers:0,element:o?void 0:n,panoramaElement:o?n:void 0}},prepare:He()},unregisterZIndexPortalElement:{reducer:(e,t)=>{var{zIndex:r}=t.payload;e.zIndexMap[r]&&(t.payload.isPanorama?e.zIndexMap[r].panoramaElement=void 0:e.zIndexMap[r].element=void 0)},prepare:He()}}}),{registerZIndexPortal:mH,unregisterZIndexPortal:gH,registerZIndexPortalElement:xH,unregisterZIndexPortalElement:vH}=iP.actions,yH=iP.reducer;function Er(e){var{zIndex:t,children:r}=e,n=E3(),o=n&&t!==void 0&&t!==0,a=Nt(),s=Xe();p.useLayoutEffect(()=>o?(s(mH({zIndex:t})),()=>{s(gH({zIndex:t}))}):Qa,[s,t,o]);var c=ue(l=>aH(l,t,a));return o?c?bm.createPortal(r,c):null:r}function rm(){return rm=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},rm.apply(null,arguments)}function q0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Vs(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?q0(Object(r),!0).forEach(function(n){bH(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):q0(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function bH(e,t,r){return(t=wH(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function wH(e){var t=$H(e,"string");return typeof t=="symbol"?t:t+""}function $H(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function SH(e){var{cursor:t,cursorComp:r,cursorProps:n}=e;return p.isValidElement(t)?p.cloneElement(t,n):p.createElement(r,n)}function jH(e){var t,{coordinate:r,payload:n,index:o,offset:a,tooltipAxisBandSize:s,layout:c,cursor:l,tooltipEventType:u,chartName:d}=e,f=r,m=n,g=o;if(!l||!f||d!=="ScatterChart"&&u!=="axis")return null;var x,v,b;if(d==="ScatterChart")x=f,v=P8,b=wt.cursorLine;else if(d==="BarChart")x=A8(c,f,a,s),v=$E,b=wt.cursorRectangle;else if(c==="radial"&&lk(f)){var{cx:E,cy:w,radius:j,startAngle:S,endAngle:y}=SE(f);x={cx:E,cy:w,startAngle:S,endAngle:y,innerRadius:j,outerRadius:j},v=kE,b=wt.cursorLine}else x={points:yU(c,f,a)},v=xE,b=wt.cursorLine;var k=typeof l=="object"&&"className"in l?l.className:void 0,$=Vs(Vs(Vs(Vs({stroke:"#ccc",pointerEvents:"none"},a),x),Za(l)),{},{payload:m,payloadIndex:g,className:Te("recharts-tooltip-cursor",k)});return p.createElement(Er,{zIndex:(t=e.zIndex)!==null&&t!==void 0?t:b},p.createElement(SH,{cursor:l,cursorComp:v,cursorProps:$}))}function kH(e){var t=WW(),r=cE(),n=Ti(),o=ZW();return t==null||r==null||n==null||o==null?null:p.createElement(jH,rm({},e,{offset:r,layout:n,tooltipAxisBandSize:t,chartName:o}))}var aP=p.createContext(null),EH=()=>p.useContext(aP),Eh={exports:{}},W0;function CH(){return W0||(W0=1,(function(e){var t=Object.prototype.hasOwnProperty,r="~";function n(){}Object.create&&(n.prototype=Object.create(null),new n().__proto__||(r=!1));function o(l,u,d){this.fn=l,this.context=u,this.once=d||!1}function a(l,u,d,f,m){if(typeof d!="function")throw new TypeError("The listener must be a function");var g=new o(d,f||l,m),x=r?r+u:u;return l._events[x]?l._events[x].fn?l._events[x]=[l._events[x],g]:l._events[x].push(g):(l._events[x]=g,l._eventsCount++),l}function s(l,u){--l._eventsCount===0?l._events=new n:delete l._events[u]}function c(){this._events=new n,this._eventsCount=0}c.prototype.eventNames=function(){var u=[],d,f;if(this._eventsCount===0)return u;for(f in d=this._events)t.call(d,f)&&u.push(r?f.slice(1):f);return Object.getOwnPropertySymbols?u.concat(Object.getOwnPropertySymbols(d)):u},c.prototype.listeners=function(u){var d=r?r+u:u,f=this._events[d];if(!f)return[];if(f.fn)return[f.fn];for(var m=0,g=f.length,x=new Array(g);m<g;m++)x[m]=f[m].fn;return x},c.prototype.listenerCount=function(u){var d=r?r+u:u,f=this._events[d];return f?f.fn?1:f.length:0},c.prototype.emit=function(u,d,f,m,g,x){var v=r?r+u:u;if(!this._events[v])return!1;var b=this._events[v],E=arguments.length,w,j;if(b.fn){switch(b.once&&this.removeListener(u,b.fn,void 0,!0),E){case 1:return b.fn.call(b.context),!0;case 2:return b.fn.call(b.context,d),!0;case 3:return b.fn.call(b.context,d,f),!0;case 4:return b.fn.call(b.context,d,f,m),!0;case 5:return b.fn.call(b.context,d,f,m,g),!0;case 6:return b.fn.call(b.context,d,f,m,g,x),!0}for(j=1,w=new Array(E-1);j<E;j++)w[j-1]=arguments[j];b.fn.apply(b.context,w)}else{var S=b.length,y;for(j=0;j<S;j++)switch(b[j].once&&this.removeListener(u,b[j].fn,void 0,!0),E){case 1:b[j].fn.call(b[j].context);break;case 2:b[j].fn.call(b[j].context,d);break;case 3:b[j].fn.call(b[j].context,d,f);break;case 4:b[j].fn.call(b[j].context,d,f,m);break;default:if(!w)for(y=1,w=new Array(E-1);y<E;y++)w[y-1]=arguments[y];b[j].fn.apply(b[j].context,w)}}return!0},c.prototype.on=function(u,d,f){return a(this,u,d,f,!1)},c.prototype.once=function(u,d,f){return a(this,u,d,f,!0)},c.prototype.removeListener=function(u,d,f,m){var g=r?r+u:u;if(!this._events[g])return this;if(!d)return s(this,g),this;var x=this._events[g];if(x.fn)x.fn===d&&(!m||x.once)&&(!f||x.context===f)&&s(this,g);else{for(var v=0,b=[],E=x.length;v<E;v++)(x[v].fn!==d||m&&!x[v].once||f&&x[v].context!==f)&&b.push(x[v]);b.length?this._events[g]=b.length===1?b[0]:b:s(this,g)}return this},c.prototype.removeAllListeners=function(u){var d;return u?(d=r?r+u:u,this._events[d]&&s(this,d)):(this._events=new n,this._eventsCount=0),this},c.prototype.off=c.prototype.removeListener,c.prototype.addListener=c.prototype.on,c.prefixed=r,c.EventEmitter=c,e.exports=c})(Eh)),Eh.exports}var PH=CH();const AH=Pn(PH);var Fa=new AH,nm="recharts.syncEvent.tooltip",H0="recharts.syncEvent.brush";function sP(e,t){if(t){var r=Number.parseInt(t,10);if(!Nr(r))return e?.[r]}}var OH={chartName:"",tooltipPayloadSearcher:void 0,eventEmitter:void 0,defaultTooltipEventType:"axis"},cP=Qt({name:"options",initialState:OH,reducers:{createEventEmitter:e=>{e.eventEmitter==null&&(e.eventEmitter=Symbol("rechartsEventEmitter"))}}}),RH=cP.reducer,{createEventEmitter:TH}=cP.actions;function IH(e){return e.tooltip.syncInteraction}var DH={chartData:void 0,computedData:void 0,dataStartIndex:0,dataEndIndex:0},lP=Qt({name:"chartData",initialState:DH,reducers:{setChartData(e,t){if(e.chartData=t.payload,t.payload==null){e.dataStartIndex=0,e.dataEndIndex=0;return}t.payload.length>0&&e.dataEndIndex!==t.payload.length-1&&(e.dataEndIndex=t.payload.length-1)},setComputedData(e,t){e.computedData=t.payload},setDataStartEndIndexes(e,t){var{startIndex:r,endIndex:n}=t.payload;r!=null&&(e.dataStartIndex=r),n!=null&&(e.dataEndIndex=n)}}}),{setChartData:V0,setDataStartEndIndexes:_H,setComputedData:Zse}=lP.actions,LH=lP.reducer,MH=["x","y"];function K0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Qo(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?K0(Object(r),!0).forEach(function(n){zH(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):K0(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function zH(e,t,r){return(t=NH(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function NH(e){var t=BH(e,"string");return typeof t=="symbol"?t:t+""}function BH(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function FH(e,t){if(e==null)return{};var r,n,o=UH(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function UH(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function qH(){var e=ue(yg),t=ue(bg),r=Xe(),n=ue(HE),o=ue(zn),a=Ti(),s=Ql(),c=ue(l=>l.rootProps.className);p.useEffect(()=>{if(e==null)return Qa;var l=(u,d,f)=>{if(t!==f&&e===u){if(n==="index"){var m;if(s&&d!==null&&d!==void 0&&(m=d.payload)!==null&&m!==void 0&&m.coordinate&&d.payload.sourceViewBox){var g=d.payload.coordinate,{x,y:v}=g,b=FH(g,MH),{x:E,y:w,width:j,height:S}=d.payload.sourceViewBox,y=Qo(Qo({},b),{},{x:s.x+(j?(x-E)/j:0)*s.width,y:s.y+(S?(v-w)/S:0)*s.height});r(Qo(Qo({},d),{},{payload:Qo(Qo({},d.payload),{},{coordinate:y})}))}else r(d);return}if(o!=null){var k;if(typeof n=="function"){var $={activeTooltipIndex:d.payload.index==null?void 0:Number(d.payload.index),isTooltipActive:d.payload.active,activeIndex:d.payload.index==null?void 0:Number(d.payload.index),activeLabel:d.payload.label,activeDataKey:d.payload.dataKey,activeCoordinate:d.payload.coordinate},C=n(o,$);k=o[C]}else n==="value"&&(k=o.find(D=>String(D.value)===d.payload.label));var{coordinate:P}=d.payload;if(k==null||d.payload.active===!1||P==null||s==null){r(em({active:!1,coordinate:void 0,dataKey:void 0,index:null,label:void 0,sourceViewBox:void 0,graphicalItemId:void 0}));return}var{x:z,y:_}=P,N=Math.min(z,s.x+s.width),R=Math.min(_,s.y+s.height),F={x:a==="horizontal"?k.coordinate:N,y:a==="horizontal"?R:k.coordinate},O=em({active:d.payload.active,coordinate:F,dataKey:d.payload.dataKey,index:String(k.index),label:d.payload.label,sourceViewBox:d.payload.sourceViewBox,graphicalItemId:d.payload.graphicalItemId});r(O)}}};return Fa.on(nm,l),()=>{Fa.off(nm,l)}},[c,r,t,e,n,o,a,s])}function WH(){var e=ue(yg),t=ue(bg),r=Xe();p.useEffect(()=>{if(e==null)return Qa;var n=(o,a,s)=>{t!==s&&e===o&&r(_H(a))};return Fa.on(H0,n),()=>{Fa.off(H0,n)}},[r,t,e])}function HH(){var e=Xe();p.useEffect(()=>{e(TH())},[e]),qH(),WH()}function VH(e,t,r,n,o,a){var s=ue(g=>QW(g,e,t)),c=ue(bg),l=ue(yg),u=ue(HE),d=ue(IH),f=d?.active,m=Ql();p.useEffect(()=>{if(!f&&l!=null&&c!=null){var g=em({active:a,coordinate:r,dataKey:s,index:o,label:typeof n=="number"?String(n):n,sourceViewBox:m,graphicalItemId:void 0});Fa.emit(nm,l,g,c)}},[f,r,s,o,n,c,l,u,a,m])}function G0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Y0(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?G0(Object(r),!0).forEach(function(n){KH(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):G0(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function KH(e,t,r){return(t=GH(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function GH(e){var t=YH(e,"string");return typeof t=="symbol"?t:t+""}function YH(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function XH(e){return e.dataKey}function ZH(e,t){return p.isValidElement(e)?p.cloneElement(e,t):typeof e=="function"?p.createElement(e,t):p.createElement(s8,t)}var X0=[],JH={allowEscapeViewBox:{x:!1,y:!1},animationDuration:400,animationEasing:"ease",axisId:0,contentStyle:{},cursor:!0,filterNull:!0,includeHidden:!1,isAnimationActive:"auto",itemSorter:"name",itemStyle:{},labelStyle:{},offset:10,reverseDirection:{x:!1,y:!1},separator:" : ",trigger:"hover",useTranslate3d:!1,wrapperStyle:{}};function Z0(e){var t,r,n=Ot(e,JH),{active:o,allowEscapeViewBox:a,animationDuration:s,animationEasing:c,content:l,filterNull:u,isAnimationActive:d,offset:f,payloadUniqBy:m,position:g,reverseDirection:x,useTranslate3d:v,wrapperStyle:b,cursor:E,shared:w,trigger:j,defaultIndex:S,portal:y,axisId:k}=n,$=Xe(),C=typeof S=="number"?String(S):S;p.useEffect(()=>{$(Gq({shared:w,trigger:j,axisId:k,active:o,defaultIndex:C}))},[$,w,j,k,o,C]);var P=Ql(),z=gE(),_=Uq(w),{activeIndex:N,isActive:R}=(t=ue(J=>rH(J,_,j,C)))!==null&&t!==void 0?t:{},F=ue(J=>tH(J,_,j,C)),O=ue(J=>oP(J,_,j,C)),D=ue(J=>eH(J,_,j,C)),A=F,M=EH(),I=(r=o??R)!==null&&r!==void 0?r:!1,[T,B]=jk([A,I]),X=_==="axis"?O:void 0;VH(_,j,D,X,N,I);var ie=y??M;if(ie==null||P==null||_==null)return null;var Z=A??X0;I||(Z=X0),u&&Z.length&&(Z=yk(Z.filter(J=>J.value!=null&&(J.hide!==!0||n.includeHidden)),m,XH));var q=Z.length>0,W=p.createElement(p8,{allowEscapeViewBox:a,animationDuration:s,animationEasing:c,isAnimationActive:d,active:I,coordinate:D,hasPayload:q,offset:f,position:g,reverseDirection:x,useTranslate3d:v,viewBox:P,wrapperStyle:b,lastBoundingBox:T,innerRef:B,hasPortalFromProps:!!y},ZH(l,Y0(Y0({},n),{},{payload:Z,label:X,active:I,activeIndex:N,coordinate:D,accessibilityLayer:z})));return p.createElement(p.Fragment,null,bm.createPortal(W,ie),I&&p.createElement(kH,{cursor:E,tooltipEventType:_,coordinate:D,payload:Z,index:N}))}var dP=e=>null;dP.displayName="Cell";function QH(e,t,r){return(t=e9(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function e9(e){var t=t9(e,"string");return typeof t=="symbol"?t:t+""}function t9(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}class r9{constructor(t){QH(this,"cache",new Map),this.maxSize=t}get(t){var r=this.cache.get(t);return r!==void 0&&(this.cache.delete(t),this.cache.set(t,r)),r}set(t,r){if(this.cache.has(t))this.cache.delete(t);else if(this.cache.size>=this.maxSize){var n=this.cache.keys().next().value;n!=null&&this.cache.delete(n)}this.cache.set(t,r)}clear(){this.cache.clear()}size(){return this.cache.size}}function J0(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function n9(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?J0(Object(r),!0).forEach(function(n){o9(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):J0(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function o9(e,t,r){return(t=i9(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i9(e){var t=a9(e,"string");return typeof t=="symbol"?t:t+""}function a9(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var s9={cacheSize:2e3,enableCache:!0},uP=n9({},s9),Q0=new r9(uP.cacheSize),c9={position:"absolute",top:"-20000px",left:0,padding:0,margin:0,border:"none",whiteSpace:"pre"},ew="recharts_measurement_span";function l9(e,t){var r=t.fontSize||"",n=t.fontFamily||"",o=t.fontWeight||"",a=t.fontStyle||"",s=t.letterSpacing||"",c=t.textTransform||"";return"".concat(e,"|").concat(r,"|").concat(n,"|").concat(o,"|").concat(a,"|").concat(s,"|").concat(c)}var tw=(e,t)=>{try{var r=document.getElementById(ew);r||(r=document.createElement("span"),r.setAttribute("id",ew),r.setAttribute("aria-hidden","true"),document.body.appendChild(r)),Object.assign(r.style,c9,t),r.textContent="".concat(e);var n=r.getBoundingClientRect();return{width:n.width,height:n.height}}catch{return{width:0,height:0}}},Ea=function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(t==null||od.isSsr)return{width:0,height:0};if(!uP.enableCache)return tw(t,r);var n=l9(t,r),o=Q0.get(n);if(o)return o;var a=tw(t,r);return Q0.set(n,a),a},hP;function d9(e,t,r){return(t=u9(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u9(e){var t=h9(e,"string");return typeof t=="symbol"?t:t+""}function h9(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var rw=/(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,nw=/(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,f9=/^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,p9=/(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,m9={cm:96/2.54,mm:96/25.4,pt:96/72,pc:96/6,in:96,Q:96/(2.54*40),px:1},g9=["cm","mm","pt","pc","in","Q","px"];function x9(e){return g9.includes(e)}var li="NaN";function v9(e,t){return e*m9[t]}class Pt{static parse(t){var r,[,n,o]=(r=p9.exec(t))!==null&&r!==void 0?r:[];return n==null?Pt.NaN:new Pt(parseFloat(n),o??"")}constructor(t,r){this.num=t,this.unit=r,this.num=t,this.unit=r,Nr(t)&&(this.unit=""),r!==""&&!f9.test(r)&&(this.num=NaN,this.unit=""),x9(r)&&(this.num=v9(t,r),this.unit="px")}add(t){return this.unit!==t.unit?new Pt(NaN,""):new Pt(this.num+t.num,this.unit)}subtract(t){return this.unit!==t.unit?new Pt(NaN,""):new Pt(this.num-t.num,this.unit)}multiply(t){return this.unit!==""&&t.unit!==""&&this.unit!==t.unit?new Pt(NaN,""):new Pt(this.num*t.num,this.unit||t.unit)}divide(t){return this.unit!==""&&t.unit!==""&&this.unit!==t.unit?new Pt(NaN,""):new Pt(this.num/t.num,this.unit||t.unit)}toString(){return"".concat(this.num).concat(this.unit)}isNaN(){return Nr(this.num)}}hP=Pt;d9(Pt,"NaN",new hP(NaN,""));function fP(e){if(e==null||e.includes(li))return li;for(var t=e;t.includes("*")||t.includes("/");){var r,[,n,o,a]=(r=rw.exec(t))!==null&&r!==void 0?r:[],s=Pt.parse(n??""),c=Pt.parse(a??""),l=o==="*"?s.multiply(c):s.divide(c);if(l.isNaN())return li;t=t.replace(rw,l.toString())}for(;t.includes("+")||/.-\d+(?:\.\d+)?/.test(t);){var u,[,d,f,m]=(u=nw.exec(t))!==null&&u!==void 0?u:[],g=Pt.parse(d??""),x=Pt.parse(m??""),v=f==="+"?g.add(x):g.subtract(x);if(v.isNaN())return li;t=t.replace(nw,v.toString())}return t}var ow=/\(([^()]*)\)/;function y9(e){for(var t=e,r;(r=ow.exec(t))!=null;){var[,n]=r;t=t.replace(ow,fP(n))}return t}function b9(e){var t=e.replace(/\s+/g,"");return t=y9(t),t=fP(t),t}function w9(e){try{return b9(e)}catch{return li}}function Ch(e){var t=w9(e.slice(5,-1));return t===li?"":t}var $9=["x","y","lineHeight","capHeight","fill","scaleToFit","textAnchor","verticalAnchor"],S9=["dx","dy","angle","className","breakAll"];function om(){return om=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},om.apply(null,arguments)}function iw(e,t){if(e==null)return{};var r,n,o=j9(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function j9(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}var pP=/[ \f\n\r\t\v\u2028\u2029]+/,mP=e=>{var{children:t,breakAll:r,style:n}=e;try{var o=[];Ke(t)||(r?o=t.toString().split(""):o=t.toString().split(pP));var a=o.map(c=>({word:c,width:Ea(c,n).width})),s=r?0:Ea(" ",n).width;return{wordsWithComputedWidth:a,spaceWidth:s}}catch{return null}};function k9(e){return e==="start"||e==="middle"||e==="end"||e==="inherit"}var gP=(e,t,r,n)=>e.reduce((o,a)=>{var{word:s,width:c}=a,l=o[o.length-1];if(l&&c!=null&&(t==null||n||l.width+c+r<Number(t)))l.words.push(s),l.width+=c+r;else{var u={words:[s],width:c};o.push(u)}return o},[]),xP=e=>e.reduce((t,r)=>t.width>r.width?t:r),E9="…",aw=(e,t,r,n,o,a,s,c)=>{var l=e.slice(0,t),u=mP({breakAll:r,style:n,children:l+E9});if(!u)return[!1,[]];var d=gP(u.wordsWithComputedWidth,a,s,c),f=d.length>o||xP(d).width>Number(a);return[f,d]},C9=(e,t,r,n,o)=>{var{maxLines:a,children:s,style:c,breakAll:l}=e,u=de(a),d=String(s),f=gP(t,n,r,o);if(!u||o)return f;var m=f.length>a||xP(f).width>Number(n);if(!m)return f;for(var g=0,x=d.length-1,v=0,b;g<=x&&v<=d.length-1;){var E=Math.floor((g+x)/2),w=E-1,[j,S]=aw(d,w,l,c,a,n,r,o),[y]=aw(d,E,l,c,a,n,r,o);if(!j&&!y&&(g=E+1),j&&y&&(x=E-1),!j&&y){b=S;break}v++}return b||f},sw=e=>{var t=Ke(e)?[]:e.toString().split(pP);return[{words:t,width:void 0}]},P9=e=>{var{width:t,scaleToFit:r,children:n,style:o,breakAll:a,maxLines:s}=e;if((t||r)&&!od.isSsr){var c,l,u=mP({breakAll:a,children:n,style:o});if(u){var{wordsWithComputedWidth:d,spaceWidth:f}=u;c=d,l=f}else return sw(n);return C9({breakAll:a,children:n,maxLines:s,style:o},c,l,t,!!r)}return sw(n)},vP="#808080",A9={angle:0,breakAll:!1,capHeight:"0.71em",fill:vP,lineHeight:"1em",scaleToFit:!1,textAnchor:"start",verticalAnchor:"end",x:0,y:0},Wg=p.forwardRef((e,t)=>{var r=Ot(e,A9),{x:n,y:o,lineHeight:a,capHeight:s,fill:c,scaleToFit:l,textAnchor:u,verticalAnchor:d}=r,f=iw(r,$9),m=p.useMemo(()=>P9({breakAll:f.breakAll,children:f.children,maxLines:f.maxLines,scaleToFit:l,style:f.style,width:f.width}),[f.breakAll,f.children,f.maxLines,l,f.style,f.width]),{dx:g,dy:x,angle:v,className:b,breakAll:E}=f,w=iw(f,S9);if(!sn(n)||!sn(o)||m.length===0)return null;var j=Number(n)+(de(g)?g:0),S=Number(o)+(de(x)?x:0);if(!Ye(j)||!Ye(S))return null;var y;switch(d){case"start":y=Ch("calc(".concat(s,")"));break;case"middle":y=Ch("calc(".concat((m.length-1)/2," * -").concat(a," + (").concat(s," / 2))"));break;default:y=Ch("calc(".concat(m.length-1," * -").concat(a,")"));break}var k=[];if(l){var $=m[0].width,{width:C}=f;k.push("scale(".concat(de(C)&&de($)?C/$:1,")"))}return v&&k.push("rotate(".concat(v,", ").concat(j,", ").concat(S,")")),k.length&&(w.transform=k.join(" ")),p.createElement("text",om({},Ht(w),{ref:t,x:j,y:S,className:Te("recharts-text",b),textAnchor:u,fill:c.includes("url")?vP:c}),m.map((P,z)=>{var _=P.words.join(E?"":" ");return p.createElement("tspan",{x:j,dy:z===0?y:a,key:"".concat(_,"-").concat(z)},_)}))});Wg.displayName="Text";var O9=["labelRef"],R9=["content"];function cw(e,t){if(e==null)return{};var r,n,o=T9(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function T9(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function lw(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function tt(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?lw(Object(r),!0).forEach(function(n){I9(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):lw(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function I9(e,t,r){return(t=D9(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function D9(e){var t=_9(e,"string");return typeof t=="symbol"?t:t+""}function _9(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function yn(){return yn=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},yn.apply(null,arguments)}var yP=p.createContext(null),L9=e=>{var{x:t,y:r,upperWidth:n,lowerWidth:o,width:a,height:s,children:c}=e,l=p.useMemo(()=>({x:t,y:r,upperWidth:n,lowerWidth:o,width:a,height:s}),[t,r,n,o,a,s]);return p.createElement(yP.Provider,{value:l},c)},bP=()=>{var e=p.useContext(yP),t=Ql();return e||sE(t)},M9=p.createContext(null),z9=()=>{var e=p.useContext(M9),t=ue(XE);return e||t},N9=e=>{var{value:t,formatter:r}=e,n=Ke(e.children)?t:e.children;return typeof r=="function"?r(n):n},Hg=e=>e!=null&&typeof e=="function",B9=(e,t)=>{var r=Xt(t-e),n=Math.min(Math.abs(t-e),360);return r*n},F9=(e,t,r,n,o)=>{var{offset:a,className:s}=e,{cx:c,cy:l,innerRadius:u,outerRadius:d,startAngle:f,endAngle:m,clockWise:g}=o,x=(u+d)/2,v=B9(f,m),b=v>=0?1:-1,E,w;switch(t){case"insideStart":E=f+b*a,w=g;break;case"insideEnd":E=m-b*a,w=!g;break;case"end":E=m+b*a,w=g;break;default:throw new Error("Unsupported position ".concat(t))}w=v<=0?w:!w;var j=At(c,l,x,E),S=At(c,l,x,E+(w?1:-1)*359),y="M".concat(j.x,",").concat(j.y,`
    A`).concat(x,",").concat(x,",0,1,").concat(w?0:1,`,
    `).concat(S.x,",").concat(S.y),k=Ke(e.id)?Ta("recharts-radial-line-"):e.id;return p.createElement("text",yn({},n,{dominantBaseline:"central",className:Te("recharts-radial-bar-label",s)}),p.createElement("defs",null,p.createElement("path",{id:k,d:y})),p.createElement("textPath",{xlinkHref:"#".concat(k)},r))},U9=(e,t,r)=>{var{cx:n,cy:o,innerRadius:a,outerRadius:s,startAngle:c,endAngle:l}=e,u=(c+l)/2;if(r==="outside"){var{x:d,y:f}=At(n,o,s+t,u);return{x:d,y:f,textAnchor:d>=n?"start":"end",verticalAnchor:"middle"}}if(r==="center")return{x:n,y:o,textAnchor:"middle",verticalAnchor:"middle"};if(r==="centerTop")return{x:n,y:o,textAnchor:"middle",verticalAnchor:"start"};if(r==="centerBottom")return{x:n,y:o,textAnchor:"middle",verticalAnchor:"end"};var m=(a+s)/2,{x:g,y:x}=At(n,o,m,u);return{x:g,y:x,textAnchor:"middle",verticalAnchor:"middle"}},im=e=>"cx"in e&&de(e.cx),q9=(e,t)=>{var{parentViewBox:r,offset:n,position:o}=e,a;r!=null&&!im(r)&&(a=r);var{x:s,y:c,upperWidth:l,lowerWidth:u,height:d}=t,f=s,m=s+(l-u)/2,g=(f+m)/2,x=(l+u)/2,v=f+l/2,b=d>=0?1:-1,E=b*n,w=b>0?"end":"start",j=b>0?"start":"end",S=l>=0?1:-1,y=S*n,k=S>0?"end":"start",$=S>0?"start":"end";if(o==="top"){var C={x:f+l/2,y:c-E,textAnchor:"middle",verticalAnchor:w};return tt(tt({},C),a?{height:Math.max(c-a.y,0),width:l}:{})}if(o==="bottom"){var P={x:m+u/2,y:c+d+E,textAnchor:"middle",verticalAnchor:j};return tt(tt({},P),a?{height:Math.max(a.y+a.height-(c+d),0),width:u}:{})}if(o==="left"){var z={x:g-y,y:c+d/2,textAnchor:k,verticalAnchor:"middle"};return tt(tt({},z),a?{width:Math.max(z.x-a.x,0),height:d}:{})}if(o==="right"){var _={x:g+x+y,y:c+d/2,textAnchor:$,verticalAnchor:"middle"};return tt(tt({},_),a?{width:Math.max(a.x+a.width-_.x,0),height:d}:{})}var N=a?{width:x,height:d}:{};return o==="insideLeft"?tt({x:g+y,y:c+d/2,textAnchor:$,verticalAnchor:"middle"},N):o==="insideRight"?tt({x:g+x-y,y:c+d/2,textAnchor:k,verticalAnchor:"middle"},N):o==="insideTop"?tt({x:f+l/2,y:c+E,textAnchor:"middle",verticalAnchor:j},N):o==="insideBottom"?tt({x:m+u/2,y:c+d-E,textAnchor:"middle",verticalAnchor:w},N):o==="insideTopLeft"?tt({x:f+y,y:c+E,textAnchor:$,verticalAnchor:j},N):o==="insideTopRight"?tt({x:f+l-y,y:c+E,textAnchor:k,verticalAnchor:j},N):o==="insideBottomLeft"?tt({x:m+y,y:c+d-E,textAnchor:$,verticalAnchor:w},N):o==="insideBottomRight"?tt({x:m+u-y,y:c+d-E,textAnchor:k,verticalAnchor:w},N):o&&typeof o=="object"&&(de(o.x)||jn(o.x))&&(de(o.y)||jn(o.y))?tt({x:s+Br(o.x,x),y:c+Br(o.y,d),textAnchor:"end",verticalAnchor:"end"},N):tt({x:v,y:c+d/2,textAnchor:"middle",verticalAnchor:"middle"},N)},W9={angle:0,offset:5,zIndex:wt.label,position:"middle",textBreakAll:!1};function Yn(e){var t=Ot(e,W9),{viewBox:r,position:n,value:o,children:a,content:s,className:c="",textBreakAll:l,labelRef:u}=t,d=z9(),f=bP(),m=n==="center"?f:d??f,g,x,v;if(r==null?g=m:im(r)?g=r:g=sE(r),!g||Ke(o)&&Ke(a)&&!p.isValidElement(s)&&typeof s!="function")return null;var b=tt(tt({},t),{},{viewBox:g});if(p.isValidElement(s)){var{labelRef:E}=b,w=cw(b,O9);return p.cloneElement(s,w)}if(typeof s=="function"){var{content:j}=b,S=cw(b,R9);if(x=p.createElement(s,S),p.isValidElement(x))return x}else x=N9(t);var y=Ht(t);if(im(g)){if(n==="insideStart"||n==="insideEnd"||n==="end")return F9(t,n,x,y,g);v=U9(g,t.offset,t.position)}else v=q9(t,g);return p.createElement(Er,{zIndex:t.zIndex},p.createElement(Wg,yn({ref:u,className:Te("recharts-label",c)},y,v,{textAnchor:k9(y.textAnchor)?y.textAnchor:v.textAnchor,breakAll:l}),x))}Yn.displayName="Label";var H9=(e,t,r)=>{if(!e)return null;var n={viewBox:t,labelRef:r};return e===!0?p.createElement(Yn,yn({key:"label-implicit"},n)):sn(e)?p.createElement(Yn,yn({key:"label-implicit",value:e},n)):p.isValidElement(e)?e.type===Yn?p.cloneElement(e,tt({key:"label-implicit"},n)):p.createElement(Yn,yn({key:"label-implicit",content:e},n)):Hg(e)?p.createElement(Yn,yn({key:"label-implicit",content:e},n)):e&&typeof e=="object"?p.createElement(Yn,yn({},e,{key:"label-implicit"},n)):null};function V9(e){var{label:t,labelRef:r}=e,n=bP();return H9(t,n,r)||null}var Ph={},Ah={},dw;function K9(){return dw||(dw=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return r[r.length-1]}e.last=t})(Ah)),Ah}var Oh={},uw;function G9(){return uw||(uw=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return Array.isArray(r)?r:Array.from(r)}e.toArray=t})(Oh)),Oh}var hw;function Y9(){return hw||(hw=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=K9(),r=G9(),n=Qm();function o(a){if(n.isArrayLike(a))return t.last(r.toArray(a))}e.last=o})(Ph)),Ph}var Rh,fw;function X9(){return fw||(fw=1,Rh=Y9().last),Rh}var Z9=X9();const J9=Pn(Z9);var Q9=["valueAccessor"],e7=["dataKey","clockWise","id","textBreakAll","zIndex"];function il(){return il=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},il.apply(null,arguments)}function pw(e,t){if(e==null)return{};var r,n,o=t7(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function t7(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}var r7=e=>Array.isArray(e.value)?J9(e.value):e.value,wP=p.createContext(void 0),$P=wP.Provider,SP=p.createContext(void 0);SP.Provider;function n7(){return p.useContext(wP)}function o7(){return p.useContext(SP)}function jc(e){var{valueAccessor:t=r7}=e,r=pw(e,Q9),{dataKey:n,clockWise:o,id:a,textBreakAll:s,zIndex:c}=r,l=pw(r,e7),u=n7(),d=o7(),f=u||d;return!f||!f.length?null:p.createElement(Er,{zIndex:c??wt.label},p.createElement($r,{className:"recharts-label-list"},f.map((m,g)=>{var x,v=Ke(n)?t(m,g):it(m&&m.payload,n),b=Ke(a)?{}:{id:"".concat(a,"-").concat(g)};return p.createElement(Yn,il({key:"label-".concat(g)},Ht(m),l,b,{fill:(x=r.fill)!==null&&x!==void 0?x:m.fill,parentViewBox:m.parentViewBox,value:v,textBreakAll:s,viewBox:m.viewBox,index:g,zIndex:0}))})))}jc.displayName="LabelList";function jP(e){var{label:t}=e;return t?t===!0?p.createElement(jc,{key:"labelList-implicit"}):p.isValidElement(t)||Hg(t)?p.createElement(jc,{key:"labelList-implicit",content:t}):typeof t=="object"?p.createElement(jc,il({key:"labelList-implicit"},t,{type:String(t.type)})):null:null}function am(){return am=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},am.apply(null,arguments)}var kP=e=>{var{cx:t,cy:r,r:n,className:o}=e,a=Te("recharts-dot",o);return de(t)&&de(r)&&de(n)?p.createElement("circle",am({},zr(e),Jm(e),{className:a,cx:t,cy:r,r:n})):null},i7={radiusAxis:{},angleAxis:{}},EP=Qt({name:"polarAxis",initialState:i7,reducers:{addRadiusAxis(e,t){e.radiusAxis[t.payload.id]=t.payload},removeRadiusAxis(e,t){delete e.radiusAxis[t.payload.id]},addAngleAxis(e,t){e.angleAxis[t.payload.id]=t.payload},removeAngleAxis(e,t){delete e.angleAxis[t.payload.id]}}}),{addRadiusAxis:Jse,removeRadiusAxis:Qse,addAngleAxis:ece,removeAngleAxis:tce}=EP.actions,a7=EP.reducer,Th={exports:{}},De={};var mw;function s7(){if(mw)return De;mw=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),a=Symbol.for("react.consumer"),s=Symbol.for("react.context"),c=Symbol.for("react.forward_ref"),l=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),d=Symbol.for("react.memo"),f=Symbol.for("react.lazy"),m=Symbol.for("react.view_transition"),g=Symbol.for("react.client.reference");function x(v){if(typeof v=="object"&&v!==null){var b=v.$$typeof;switch(b){case e:switch(v=v.type,v){case r:case o:case n:case l:case u:case m:return v;default:switch(v=v&&v.$$typeof,v){case s:case c:case f:case d:return v;case a:return v;default:return b}}case t:return b}}}return De.ContextConsumer=a,De.ContextProvider=s,De.Element=e,De.ForwardRef=c,De.Fragment=r,De.Lazy=f,De.Memo=d,De.Portal=t,De.Profiler=o,De.StrictMode=n,De.Suspense=l,De.SuspenseList=u,De.isContextConsumer=function(v){return x(v)===a},De.isContextProvider=function(v){return x(v)===s},De.isElement=function(v){return typeof v=="object"&&v!==null&&v.$$typeof===e},De.isForwardRef=function(v){return x(v)===c},De.isFragment=function(v){return x(v)===r},De.isLazy=function(v){return x(v)===f},De.isMemo=function(v){return x(v)===d},De.isPortal=function(v){return x(v)===t},De.isProfiler=function(v){return x(v)===o},De.isStrictMode=function(v){return x(v)===n},De.isSuspense=function(v){return x(v)===l},De.isSuspenseList=function(v){return x(v)===u},De.isValidElementType=function(v){return typeof v=="string"||typeof v=="function"||v===r||v===o||v===n||v===l||v===u||typeof v=="object"&&v!==null&&(v.$$typeof===f||v.$$typeof===d||v.$$typeof===s||v.$$typeof===a||v.$$typeof===c||v.$$typeof===g||v.getModuleId!==void 0)},De.typeOf=x,De}var gw;function c7(){return gw||(gw=1,Th.exports=s7()),Th.exports}var l7=c7(),xw=e=>typeof e=="string"?e:e?e.displayName||e.name||"Component":"",vw=null,Ih=null,CP=e=>{if(e===vw&&Array.isArray(Ih))return Ih;var t=[];return p.Children.forEach(e,r=>{Ke(r)||(l7.isFragment(r)?t=t.concat(CP(r.props.children)):t.push(r))}),Ih=t,vw=e,t};function d7(e,t){var r=[],n=[];return Array.isArray(t)?n=t.map(o=>xw(o)):n=[xw(t)],CP(e).forEach(o=>{var a=wi(o,"type.displayName")||wi(o,"type.name");a&&n.indexOf(a)!==-1&&r.push(o)}),r}var PP=e=>e&&typeof e=="object"&&"clipDot"in e?!!e.clipDot:!0,Dh={},yw;function u7(){return yw||(yw=1,(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){if(typeof r!="object"||r==null)return!1;if(Object.getPrototypeOf(r)===null)return!0;if(Object.prototype.toString.call(r)!=="[object Object]"){const o=r[Symbol.toStringTag];return o==null||!Object.getOwnPropertyDescriptor(r,Symbol.toStringTag)?.writable?!1:r.toString()===`[object ${o}]`}let n=r;for(;Object.getPrototypeOf(n)!==null;)n=Object.getPrototypeOf(n);return Object.getPrototypeOf(r)===n}e.isPlainObject=t})(Dh)),Dh}var _h,bw;function h7(){return bw||(bw=1,_h=u7().isPlainObject),_h}var f7=h7();const p7=Pn(f7);var ww,$w,Sw,jw,kw;function Ew(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Cw(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Ew(Object(r),!0).forEach(function(n){m7(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ew(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function m7(e,t,r){return(t=g7(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function g7(e){var t=x7(e,"string");return typeof t=="symbol"?t:t+""}function x7(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function al(){return al=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},al.apply(null,arguments)}function sa(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var Pw=(e,t,r,n,o)=>{var a=r-n,s;return s=Ze(ww||(ww=sa(["M ",",",""])),e,t),s+=Ze($w||($w=sa(["L ",",",""])),e+r,t),s+=Ze(Sw||(Sw=sa(["L ",",",""])),e+r-a/2,t+o),s+=Ze(jw||(jw=sa(["L ",",",""])),e+r-a/2-n,t+o),s+=Ze(kw||(kw=sa(["L ",","," Z"])),e,t),s},v7={x:0,y:0,upperWidth:0,lowerWidth:0,height:0,isUpdateAnimationActive:!1,animationBegin:0,animationDuration:1500,animationEasing:"ease"},y7=e=>{var t=Ot(e,v7),{x:r,y:n,upperWidth:o,lowerWidth:a,height:s,className:c}=t,{animationEasing:l,animationDuration:u,animationBegin:d,isUpdateAnimationActive:f}=t,m=p.useRef(null),[g,x]=p.useState(-1),v=p.useRef(o),b=p.useRef(a),E=p.useRef(s),w=p.useRef(r),j=p.useRef(n),S=ad(e,"trapezoid-");if(p.useEffect(()=>{if(m.current&&m.current.getTotalLength)try{var F=m.current.getTotalLength();F&&x(F)}catch{}},[]),r!==+r||n!==+n||o!==+o||a!==+a||s!==+s||o===0&&a===0||s===0)return null;var y=Te("recharts-trapezoid",c);if(!f)return p.createElement("g",null,p.createElement("path",al({},Ht(t),{className:y,d:Pw(r,n,o,a,s)})));var k=v.current,$=b.current,C=E.current,P=w.current,z=j.current,_="0px ".concat(g===-1?1:g,"px"),N="".concat(g,"px 0px"),R=vE(["strokeDasharray"],u,l);return p.createElement(id,{animationId:S,key:S,canBegin:g>0,duration:u,easing:l,isActive:f,begin:d},F=>{var O=Je(k,o,F),D=Je($,a,F),A=Je(C,s,F),M=Je(P,r,F),I=Je(z,n,F);m.current&&(v.current=O,b.current=D,E.current=A,w.current=M,j.current=I);var T=F>0?{transition:R,strokeDasharray:N}:{strokeDasharray:_};return p.createElement("path",al({},Ht(t),{className:y,d:Pw(M,I,O,D,A),ref:m,style:Cw(Cw({},T),t.style)}))})},b7=["option","shapeType","activeClassName"];function w7(e,t){if(e==null)return{};var r,n,o=$7(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function $7(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function Aw(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function sl(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Aw(Object(r),!0).forEach(function(n){S7(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Aw(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function S7(e,t,r){return(t=j7(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function j7(e){var t=k7(e,"string");return typeof t=="symbol"?t:t+""}function k7(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function E7(e,t){return sl(sl({},t),e)}function C7(e,t){return e==="symbols"}function Ow(e){var{shapeType:t,elementProps:r}=e;switch(t){case"rectangle":return p.createElement($E,r);case"trapezoid":return p.createElement(y7,r);case"sector":return p.createElement(kE,r);case"symbols":if(C7(t))return p.createElement(Zm,r);break;case"curve":return p.createElement(xE,r);default:return null}}function P7(e){return p.isValidElement(e)?e.props:e}function AP(e){var{option:t,shapeType:r,activeClassName:n="recharts-active-shape"}=e,o=w7(e,b7),a;if(p.isValidElement(t))a=p.cloneElement(t,sl(sl({},o),P7(t)));else if(typeof t=="function")a=t(o,o.index);else if(p7(t)&&typeof t!="boolean"){var s=E7(t,o);a=p.createElement(Ow,{shapeType:r,elementProps:s})}else{var c=o;a=p.createElement(Ow,{shapeType:r,elementProps:c})}return o.isActive?p.createElement($r,{className:n},a):a}var OP=(e,t,r)=>{var n=Xe();return(o,a)=>s=>{e?.(o,a,s),n(NC({activeIndex:String(a),activeDataKey:t,activeCoordinate:o.tooltipPosition,activeGraphicalItemId:r}))}},RP=e=>{var t=Xe();return(r,n)=>o=>{e?.(r,n,o),t(Yq())}},TP=(e,t,r)=>{var n=Xe();return(o,a)=>s=>{e?.(o,a,s),n(Xq({activeIndex:String(a),activeDataKey:t,activeCoordinate:o.tooltipPosition,activeGraphicalItemId:r}))}};function IP(e){var{tooltipEntrySettings:t}=e,r=Xe(),n=Nt(),o=p.useRef(null);return p.useLayoutEffect(()=>{n||(o.current===null?r(Hq(t)):o.current!==t&&r(Vq({prev:o.current,next:t})),o.current=t)},[t,r,n]),p.useLayoutEffect(()=>()=>{o.current&&(r(Kq(o.current)),o.current=null)},[r]),null}function DP(e){var{legendPayload:t}=e,r=Xe(),n=Nt(),o=p.useRef(null);return p.useLayoutEffect(()=>{n||(o.current===null?r(B3(t)):o.current!==t&&r(F3({prev:o.current,next:t})),o.current=t)},[r,n,t]),p.useLayoutEffect(()=>()=>{o.current&&(r(U3(o.current)),o.current=null)},[r]),null}var Lh,A7=()=>{var[e]=p.useState(()=>Ta("uid-"));return e},O7=(Lh=AA.useId)!==null&&Lh!==void 0?Lh:A7;function R7(e,t){var r=O7();return t||(e?"".concat(e,"-").concat(r):r)}var T7=p.createContext(void 0),_P=e=>{var{id:t,type:r,children:n}=e,o=R7("recharts-".concat(r),t);return p.createElement(T7.Provider,{value:o},n(o))},I7={cartesianItems:[],polarItems:[]},LP=Qt({name:"graphicalItems",initialState:I7,reducers:{addCartesianGraphicalItem:{reducer(e,t){e.cartesianItems.push(t.payload)},prepare:He()},replaceCartesianGraphicalItem:{reducer(e,t){var{prev:r,next:n}=t.payload,o=Mr(e).cartesianItems.indexOf(r);o>-1&&(e.cartesianItems[o]=n)},prepare:He()},removeCartesianGraphicalItem:{reducer(e,t){var r=Mr(e).cartesianItems.indexOf(t.payload);r>-1&&e.cartesianItems.splice(r,1)},prepare:He()},addPolarGraphicalItem:{reducer(e,t){e.polarItems.push(t.payload)},prepare:He()},removePolarGraphicalItem:{reducer(e,t){var r=Mr(e).polarItems.indexOf(t.payload);r>-1&&e.polarItems.splice(r,1)},prepare:He()}}}),{addCartesianGraphicalItem:D7,replaceCartesianGraphicalItem:_7,removeCartesianGraphicalItem:L7,addPolarGraphicalItem:rce,removePolarGraphicalItem:nce}=LP.actions,M7=LP.reducer,z7=e=>{var t=Xe(),r=p.useRef(null);return p.useLayoutEffect(()=>{r.current===null?t(D7(e)):r.current!==e&&t(_7({prev:r.current,next:e})),r.current=e},[t,e]),p.useLayoutEffect(()=>()=>{r.current&&(t(L7(r.current)),r.current=null)},[t]),null},MP=p.memo(z7),N7=["points"];function Rw(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Mh(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Rw(Object(r),!0).forEach(function(n){B7(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Rw(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function B7(e,t,r){return(t=F7(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function F7(e){var t=U7(e,"string");return typeof t=="symbol"?t:t+""}function U7(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function cl(){return cl=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},cl.apply(null,arguments)}function q7(e,t){if(e==null)return{};var r,n,o=W7(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function W7(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function H7(e){var{option:t,dotProps:r,className:n}=e;if(p.isValidElement(t))return p.cloneElement(t,r);if(typeof t=="function")return t(r);var o=Te(n,typeof t!="boolean"?t.className:""),a=r??{},{points:s}=a,c=q7(a,N7);return p.createElement(kP,cl({},c,{className:o}))}function V7(e,t){return e==null?!1:t?!0:e.length===1}function K7(e){var{points:t,dot:r,className:n,dotClassName:o,dataKey:a,baseProps:s,needClip:c,clipPathId:l,zIndex:u=wt.scatter}=e;if(!V7(t,r))return null;var d=PP(r),f=Q6(r),m=t.map((x,v)=>{var b,E,w=Mh(Mh(Mh({r:3},s),f),{},{index:v,cx:(b=x.x)!==null&&b!==void 0?b:void 0,cy:(E=x.y)!==null&&E!==void 0?E:void 0,dataKey:a,value:x.value,payload:x.payload,points:t});return p.createElement(H7,{key:"dot-".concat(v),option:r,dotProps:w,className:o})}),g={};return c&&l!=null&&(g.clipPath="url(#clipPath-".concat(d?"":"dots-").concat(l,")")),p.createElement(Er,{zIndex:u},p.createElement($r,cl({className:n},g),m))}function Tw(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Iw(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Tw(Object(r),!0).forEach(function(n){G7(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Tw(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function G7(e,t,r){return(t=Y7(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Y7(e){var t=X7(e,"string");return typeof t=="symbol"?t:t+""}function X7(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var zP=0,Z7={xAxis:{},yAxis:{},zAxis:{}},NP=Qt({name:"cartesianAxis",initialState:Z7,reducers:{addXAxis:{reducer(e,t){e.xAxis[t.payload.id]=t.payload},prepare:He()},replaceXAxis:{reducer(e,t){var{prev:r,next:n}=t.payload;e.xAxis[r.id]!==void 0&&(r.id!==n.id&&delete e.xAxis[r.id],e.xAxis[n.id]=n)},prepare:He()},removeXAxis:{reducer(e,t){delete e.xAxis[t.payload.id]},prepare:He()},addYAxis:{reducer(e,t){e.yAxis[t.payload.id]=t.payload},prepare:He()},replaceYAxis:{reducer(e,t){var{prev:r,next:n}=t.payload;e.yAxis[r.id]!==void 0&&(r.id!==n.id&&delete e.yAxis[r.id],e.yAxis[n.id]=n)},prepare:He()},removeYAxis:{reducer(e,t){delete e.yAxis[t.payload.id]},prepare:He()},addZAxis:{reducer(e,t){e.zAxis[t.payload.id]=t.payload},prepare:He()},replaceZAxis:{reducer(e,t){var{prev:r,next:n}=t.payload;e.zAxis[r.id]!==void 0&&(r.id!==n.id&&delete e.zAxis[r.id],e.zAxis[n.id]=n)},prepare:He()},removeZAxis:{reducer(e,t){delete e.zAxis[t.payload.id]},prepare:He()},updateYAxisWidth(e,t){var{id:r,width:n}=t.payload,o=e.yAxis[r];if(o){var a=o.widthHistory||[];if(a.length===3&&a[0]===a[2]&&n===a[1]&&n!==o.width&&Math.abs(n-a[0])<=1)return;var s=[...a,n].slice(-3);e.yAxis[r]=Iw(Iw({},e.yAxis[r]),{},{width:n,widthHistory:s})}}}}),{addXAxis:J7,replaceXAxis:Q7,removeXAxis:eV,addYAxis:tV,replaceYAxis:rV,removeYAxis:nV,addZAxis:oce,replaceZAxis:ice,removeZAxis:ace,updateYAxisWidth:oV}=NP.actions,iV=NP.reducer,aV=V([$t],e=>({top:e.top,bottom:e.bottom,left:e.left,right:e.right})),sV=V([aV,In,Dn],(e,t,r)=>{if(!(!e||t==null||r==null))return{x:e.left,y:e.top,width:Math.max(0,t-e.left-e.right),height:Math.max(0,r-e.top-e.bottom)}}),Vg=()=>ue(sV),cV=()=>ue(NW);function Dw(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function zh(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Dw(Object(r),!0).forEach(function(n){lV(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Dw(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function lV(e,t,r){return(t=dV(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function dV(e){var t=uV(e,"string");return typeof t=="symbol"?t:t+""}function uV(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var hV=e=>{var{point:t,childIndex:r,mainColor:n,activeDot:o,dataKey:a,clipPath:s}=e;if(o===!1||t.x==null||t.y==null)return null;var c={index:r,dataKey:a,cx:t.x,cy:t.y,r:4,fill:n??"none",strokeWidth:2,stroke:"#fff",payload:t.payload,value:t.value},l=zh(zh(zh({},c),Za(o)),Jm(o)),u;return p.isValidElement(o)?u=p.cloneElement(o,l):typeof o=="function"?u=o(l):u=p.createElement(kP,l),p.createElement($r,{className:"recharts-active-dot",clipPath:s},u)};function fV(e){var{points:t,mainColor:r,activeDot:n,itemDataKey:o,clipPath:a,zIndex:s=wt.activeDot}=e,c=ue(No),l=cV();if(t==null||l==null)return null;var u=t.find(d=>l.includes(d.payload));return Ke(u)?null:p.createElement(Er,{zIndex:s},p.createElement(hV,{point:u,childIndex:Number(c),mainColor:r,dataKey:o,activeDot:n,clipPath:a}))}var _w=(e,t,r)=>{var n=r??e;if(!Ke(n))return Br(n,t,0)},pV=(e,t,r)=>{var n={},o=e.filter(ud),a=e.filter(u=>u.stackId==null),s=o.reduce((u,d)=>(u[d.stackId]||(u[d.stackId]=[]),u[d.stackId].push(d),u),n),c=Object.entries(s).map(u=>{var[d,f]=u,m=f.map(x=>x.dataKey),g=_w(t,r,f[0].barSize);return{stackId:d,dataKeys:m,barSize:g}}),l=a.map(u=>{var d=[u.dataKey].filter(m=>m!=null),f=_w(t,r,u.barSize);return{stackId:void 0,dataKeys:d,barSize:f}});return[...c,...l]};function Lw(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Ks(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Lw(Object(r),!0).forEach(function(n){mV(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Lw(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function mV(e,t,r){return(t=gV(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function gV(e){var t=xV(e,"string");return typeof t=="symbol"?t:t+""}function xV(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function vV(e,t,r,n,o){var a=n.length;if(!(a<1)){var s=Br(e,r,0,!0),c,l=[];if(Ye(n[0].barSize)){var u=!1,d=r/a,f=n.reduce((E,w)=>E+(w.barSize||0),0);f+=(a-1)*s,f>=r&&(f-=(a-1)*s,s=0),f>=r&&d>0&&(u=!0,d*=.9,f=a*d);var m=(r-f)/2>>0,g={offset:m-s,size:0};c=n.reduce((E,w)=>{var j,S={stackId:w.stackId,dataKeys:w.dataKeys,position:{offset:g.offset+g.size+s,size:u?d:(j=w.barSize)!==null&&j!==void 0?j:0}},y=[...E,S];return g=y[y.length-1].position,y},l)}else{var x=Br(t,r,0,!0);r-2*x-(a-1)*s<=0&&(s=0);var v=(r-2*x-(a-1)*s)/a;v>1&&(v>>=0);var b=Ye(o)?Math.min(v,o):v;c=n.reduce((E,w,j)=>[...E,{stackId:w.stackId,dataKeys:w.dataKeys,position:{offset:x+(v+s)*j+(v-b)/2,size:b}}],l)}return c}}var yV=(e,t,r,n,o,a,s)=>{var c=Ke(s)?t:s,l=vV(r,n,o!==a?o:a,e,c);return o!==a&&l!=null&&(l=l.map(u=>Ks(Ks({},u),{},{position:Ks(Ks({},u.position),{},{offset:u.position.offset-o/2})}))),l},bV=(e,t)=>{var r=jg(t);if(!(!e||r==null||t==null)){var{stackId:n}=t;if(n!=null){var o=e[n];if(o){var{stackedData:a}=o;if(a)return a.find(s=>s.key===r)}}}};function wV(e,t){return e&&typeof e=="object"&&"zIndex"in e&&typeof e.zIndex=="number"&&Ye(e.zIndex)?e.zIndex:t}var $V=e=>{var{chartData:t}=e,r=Xe(),n=Nt();return p.useEffect(()=>n?()=>{}:(r(V0(t)),()=>{r(V0(void 0))}),[t,r,n]),null},Mw={x:0,y:0,width:0,height:0,padding:{top:0,right:0,bottom:0,left:0}},BP=Qt({name:"brush",initialState:Mw,reducers:{setBrushSettings(e,t){return t.payload==null?Mw:t.payload}}}),{setBrushSettings:sce}=BP.actions,SV=BP.reducer;function jV(e,t,r){return(t=kV(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function kV(e){var t=EV(e,"string");return typeof t=="symbol"?t:t+""}function EV(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}class Kg{static create(t){return new Kg(t)}constructor(t){this.scale=t}get domain(){return this.scale.domain}get range(){return this.scale.range}get rangeMin(){return this.range()[0]}get rangeMax(){return this.range()[1]}get bandwidth(){return this.scale.bandwidth}apply(t){var{bandAware:r,position:n}=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(t!==void 0){if(n)switch(n){case"start":return this.scale(t);case"middle":{var o=this.bandwidth?this.bandwidth()/2:0;return this.scale(t)+o}case"end":{var a=this.bandwidth?this.bandwidth():0;return this.scale(t)+a}default:return this.scale(t)}if(r){var s=this.bandwidth?this.bandwidth()/2:0;return this.scale(t)+s}return this.scale(t)}}isInRange(t){var r=this.range(),n=r[0],o=r[r.length-1];return n<=o?t>=n&&t<=o:t>=o&&t<=n}}jV(Kg,"EPS",1e-4);function CV(e){return(e%180+180)%180}var PV=function(t){var{width:r,height:n}=t,o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,a=CV(o),s=a*Math.PI/180,c=Math.atan(n/r),l=s>c&&s<Math.PI-c?n/Math.sin(s):r/Math.cos(s);return Math.abs(l)},AV={dots:[],areas:[],lines:[]},FP=Qt({name:"referenceElements",initialState:AV,reducers:{addDot:(e,t)=>{e.dots.push(t.payload)},removeDot:(e,t)=>{var r=Mr(e).dots.findIndex(n=>n===t.payload);r!==-1&&e.dots.splice(r,1)},addArea:(e,t)=>{e.areas.push(t.payload)},removeArea:(e,t)=>{var r=Mr(e).areas.findIndex(n=>n===t.payload);r!==-1&&e.areas.splice(r,1)},addLine:(e,t)=>{e.lines.push(t.payload)},removeLine:(e,t)=>{var r=Mr(e).lines.findIndex(n=>n===t.payload);r!==-1&&e.lines.splice(r,1)}}}),{addDot:cce,removeDot:lce,addArea:dce,removeArea:uce,addLine:hce,removeLine:fce}=FP.actions,OV=FP.reducer,RV=p.createContext(void 0),TV=e=>{var{children:t}=e,[r]=p.useState("".concat(Ta("recharts"),"-clip")),n=Vg();if(n==null)return null;var{x:o,y:a,width:s,height:c}=n;return p.createElement(RV.Provider,{value:r},p.createElement("defs",null,p.createElement("clipPath",{id:r},p.createElement("rect",{x:o,y:a,height:c,width:s}))),t)};function UP(e,t){if(t<1)return[];if(t===1)return e;for(var r=[],n=0;n<e.length;n+=t){var o=e[n];o!==void 0&&r.push(o)}return r}function IV(e,t,r){var n={width:e.width+t.width,height:e.height+t.height};return PV(n,r)}function DV(e,t,r){var n=r==="width",{x:o,y:a,width:s,height:c}=e;return t===1?{start:n?o:a,end:n?o+s:a+c}:{start:n?o+s:a+c,end:n?o:a}}function Ua(e,t,r,n,o){if(e*t<e*n||e*t>e*o)return!1;var a=r();return e*(t-e*a/2-n)>=0&&e*(t+e*a/2-o)<=0}function _V(e,t){return UP(e,t+1)}function LV(e,t,r,n,o){for(var a=(n||[]).slice(),{start:s,end:c}=t,l=0,u=1,d=s,f=function(){var x=n?.[l];if(x===void 0)return{v:UP(n,u)};var v=l,b,E=()=>(b===void 0&&(b=r(x,v)),b),w=x.coordinate,j=l===0||Ua(e,w,E,d,c);j||(l=0,d=s,u+=1),j&&(d=w+e*(E()/2+o),l+=u)},m;u<=a.length;)if(m=f(),m)return m.v;return[]}function MV(e,t,r,n,o){var a=(n||[]).slice(),s=a.length;if(s===0)return[];for(var{start:c,end:l}=t,u=1;u<=s;u++){for(var d=(s-1)%u,f=c,m=!0,g=function(){var w=n[x],j=x,S,y=()=>(S===void 0&&(S=r(w,j)),S),k=w.coordinate,$=x===d||Ua(e,k,y,f,l);if(!$)return m=!1,1;$&&(f=k+e*(y()/2+o))},x=d;x<s&&!g();x+=u);if(m){for(var v=[],b=d;b<s;b+=u)v.push(n[b]);return v}}return[]}function zw(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function It(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?zw(Object(r),!0).forEach(function(n){zV(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):zw(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function zV(e,t,r){return(t=NV(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function NV(e){var t=BV(e,"string");return typeof t=="symbol"?t:t+""}function BV(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function FV(e,t,r,n,o){for(var a=(n||[]).slice(),s=a.length,{start:c}=t,{end:l}=t,u=function(m){var g=a[m],x,v=()=>(x===void 0&&(x=r(g,m)),x);if(m===s-1){var b=e*(g.coordinate+e*v()/2-l);a[m]=g=It(It({},g),{},{tickCoord:b>0?g.coordinate-b*e:g.coordinate})}else a[m]=g=It(It({},g),{},{tickCoord:g.coordinate});if(g.tickCoord!=null){var E=Ua(e,g.tickCoord,v,c,l);E&&(l=g.tickCoord-e*(v()/2+o),a[m]=It(It({},g),{},{isShow:!0}))}},d=s-1;d>=0;d--)u(d);return a}function UV(e,t,r,n,o,a){var s=(n||[]).slice(),c=s.length,{start:l,end:u}=t;if(a){var d=n[c-1],f=r(d,c-1),m=e*(d.coordinate+e*f/2-u);if(s[c-1]=d=It(It({},d),{},{tickCoord:m>0?d.coordinate-m*e:d.coordinate}),d.tickCoord!=null){var g=Ua(e,d.tickCoord,()=>f,l,u);g&&(u=d.tickCoord-e*(f/2+o),s[c-1]=It(It({},d),{},{isShow:!0}))}}for(var x=a?c-1:c,v=function(w){var j=s[w],S,y=()=>(S===void 0&&(S=r(j,w)),S);if(w===0){var k=e*(j.coordinate-e*y()/2-l);s[w]=j=It(It({},j),{},{tickCoord:k<0?j.coordinate-k*e:j.coordinate})}else s[w]=j=It(It({},j),{},{tickCoord:j.coordinate});if(j.tickCoord!=null){var $=Ua(e,j.tickCoord,y,l,u);$&&(l=j.tickCoord+e*(y()/2+o),s[w]=It(It({},j),{},{isShow:!0}))}},b=0;b<x;b++)v(b);return s}function Gg(e,t,r){var{tick:n,ticks:o,viewBox:a,minTickGap:s,orientation:c,interval:l,tickFormatter:u,unit:d,angle:f}=e;if(!o||!o.length||!n)return[];if(de(l)||od.isSsr){var m;return(m=_V(o,de(l)?l:0))!==null&&m!==void 0?m:[]}var g=[],x=c==="top"||c==="bottom"?"width":"height",v=d&&x==="width"?Ea(d,{fontSize:t,letterSpacing:r}):{width:0,height:0},b=(j,S)=>{var y=typeof u=="function"?u(j.value,S):j.value;return x==="width"?IV(Ea(y,{fontSize:t,letterSpacing:r}),v,f):Ea(y,{fontSize:t,letterSpacing:r})[x]},E=o.length>=2?Xt(o[1].coordinate-o[0].coordinate):1,w=DV(a,E,x);return l==="equidistantPreserveStart"?LV(E,w,b,o,s):l==="equidistantPreserveEnd"?MV(E,w,b,o,s):(l==="preserveStart"||l==="preserveStartEnd"?g=UV(E,w,b,o,s,l==="preserveStartEnd"):g=FV(E,w,b,o,s),g.filter(j=>j.isShow))}var qV=e=>{var{ticks:t,label:r,labelGapWithTick:n=5,tickSize:o=0,tickMargin:a=0}=e,s=0;if(t){Array.from(t).forEach(d=>{if(d){var f=d.getBoundingClientRect();f.width>s&&(s=f.width)}});var c=r?r.getBoundingClientRect().width:0,l=o+a,u=s+l+c+(r?n:0);return Math.round(u)}return 0},WV=["axisLine","width","height","className","hide","ticks","axisType"];function HV(e,t){if(e==null)return{};var r,n,o=VV(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function VV(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function Bo(){return Bo=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Bo.apply(null,arguments)}function Nw(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function nt(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Nw(Object(r),!0).forEach(function(n){KV(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Nw(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function KV(e,t,r){return(t=GV(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function GV(e){var t=YV(e,"string");return typeof t=="symbol"?t:t+""}function YV(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Sn={x:0,y:0,width:0,height:0,viewBox:{x:0,y:0,width:0,height:0},orientation:"bottom",ticks:[],stroke:"#666",tickLine:!0,axisLine:!0,tick:!0,mirror:!1,minTickGap:5,tickSize:6,tickMargin:2,interval:"preserveEnd",zIndex:wt.axis};function XV(e){var{x:t,y:r,width:n,height:o,orientation:a,mirror:s,axisLine:c,otherSvgProps:l}=e;if(!c)return null;var u=nt(nt(nt({},l),zr(c)),{},{fill:"none"});if(a==="top"||a==="bottom"){var d=+(a==="top"&&!s||a==="bottom"&&s);u=nt(nt({},u),{},{x1:t,y1:r+d*o,x2:t+n,y2:r+d*o})}else{var f=+(a==="left"&&!s||a==="right"&&s);u=nt(nt({},u),{},{x1:t+f*n,y1:r,x2:t+f*n,y2:r+o})}return p.createElement("line",Bo({},u,{className:Te("recharts-cartesian-axis-line",wi(c,"className"))}))}function ZV(e,t,r,n,o,a,s,c,l){var u,d,f,m,g,x,v=c?-1:1,b=e.tickSize||s,E=de(e.tickCoord)?e.tickCoord:e.coordinate;switch(a){case"top":u=d=e.coordinate,m=r+ +!c*o,f=m-v*b,x=f-v*l,g=E;break;case"left":f=m=e.coordinate,d=t+ +!c*n,u=d-v*b,g=u-v*l,x=E;break;case"right":f=m=e.coordinate,d=t+ +c*n,u=d+v*b,g=u+v*l,x=E;break;default:u=d=e.coordinate,m=r+ +c*o,f=m+v*b,x=f+v*l,g=E;break}return{line:{x1:u,y1:f,x2:d,y2:m},tick:{x:g,y:x}}}function JV(e,t){switch(e){case"left":return t?"start":"end";case"right":return t?"end":"start";default:return"middle"}}function QV(e,t){switch(e){case"left":case"right":return"middle";case"top":return t?"start":"end";default:return t?"end":"start"}}function eK(e){var{option:t,tickProps:r,value:n}=e,o,a=Te(r.className,"recharts-cartesian-axis-tick-value");if(p.isValidElement(t))o=p.cloneElement(t,nt(nt({},r),{},{className:a}));else if(typeof t=="function")o=t(nt(nt({},r),{},{className:a}));else{var s="recharts-cartesian-axis-tick-value";typeof t!="boolean"&&(s=Te(s,t?.className)),o=p.createElement(Wg,Bo({},r,{className:s}),n)}return o}var tK=p.forwardRef((e,t)=>{var{ticks:r=[],tick:n,tickLine:o,stroke:a,tickFormatter:s,unit:c,padding:l,tickTextProps:u,orientation:d,mirror:f,x:m,y:g,width:x,height:v,tickSize:b,tickMargin:E,fontSize:w,letterSpacing:j,getTicksConfig:S,events:y,axisType:k}=e,$=Gg(nt(nt({},S),{},{ticks:r}),w,j),C=JV(d,f),P=QV(d,f),z=zr(S),_=Za(n),N={};typeof o=="object"&&(N=o);var R=nt(nt({},z),{},{fill:"none"},N),F=$.map(A=>nt({entry:A},ZV(A,m,g,x,v,d,b,f,E))),O=F.map(A=>{var{entry:M,line:I}=A;return p.createElement($r,{className:"recharts-cartesian-axis-tick",key:"tick-".concat(M.value,"-").concat(M.coordinate,"-").concat(M.tickCoord)},o&&p.createElement("line",Bo({},R,I,{className:Te("recharts-cartesian-axis-tick-line",wi(o,"className"))})))}),D=F.map((A,M)=>{var{entry:I,tick:T}=A,B=nt(nt(nt(nt({textAnchor:C,verticalAnchor:P},z),{},{stroke:"none",fill:a},_),T),{},{index:M,payload:I,visibleTicksCount:$.length,tickFormatter:s,padding:l},u);return p.createElement($r,Bo({className:"recharts-cartesian-axis-tick-label",key:"tick-label-".concat(I.value,"-").concat(I.coordinate,"-").concat(I.tickCoord)},zl(y,I,M)),n&&p.createElement(eK,{option:n,tickProps:B,value:"".concat(typeof s=="function"?s(I.value,M):I.value).concat(c||"")}))});return p.createElement("g",{className:"recharts-cartesian-axis-ticks recharts-".concat(k,"-ticks")},D.length>0&&p.createElement(Er,{zIndex:wt.label},p.createElement("g",{className:"recharts-cartesian-axis-tick-labels recharts-".concat(k,"-tick-labels"),ref:t},D)),O.length>0&&p.createElement("g",{className:"recharts-cartesian-axis-tick-lines recharts-".concat(k,"-tick-lines")},O))}),rK=p.forwardRef((e,t)=>{var{axisLine:r,width:n,height:o,className:a,hide:s,ticks:c,axisType:l}=e,u=HV(e,WV),[d,f]=p.useState(""),[m,g]=p.useState(""),x=p.useRef(null);p.useImperativeHandle(t,()=>({getCalculatedWidth:()=>{var b;return qV({ticks:x.current,label:(b=e.labelRef)===null||b===void 0?void 0:b.current,labelGapWithTick:5,tickSize:e.tickSize,tickMargin:e.tickMargin})}}));var v=p.useCallback(b=>{if(b){var E=b.getElementsByClassName("recharts-cartesian-axis-tick-value");x.current=E;var w=E[0];if(w){var j=window.getComputedStyle(w),S=j.fontSize,y=j.letterSpacing;(S!==d||y!==m)&&(f(S),g(y))}}},[d,m]);return s||n!=null&&n<=0||o!=null&&o<=0?null:p.createElement(Er,{zIndex:e.zIndex},p.createElement($r,{className:Te("recharts-cartesian-axis",a)},p.createElement(XV,{x:e.x,y:e.y,width:n,height:o,orientation:e.orientation,mirror:e.mirror,axisLine:r,otherSvgProps:zr(e)}),p.createElement(tK,{ref:v,axisType:l,events:u,fontSize:d,getTicksConfig:e,height:e.height,letterSpacing:m,mirror:e.mirror,orientation:e.orientation,padding:e.padding,stroke:e.stroke,tick:e.tick,tickFormatter:e.tickFormatter,tickLine:e.tickLine,tickMargin:e.tickMargin,tickSize:e.tickSize,tickTextProps:e.tickTextProps,ticks:c,unit:e.unit,width:e.width,x:e.x,y:e.y}),p.createElement(L9,{x:e.x,y:e.y,width:e.width,height:e.height,lowerWidth:e.width,upperWidth:e.width},p.createElement(V9,{label:e.label,labelRef:e.labelRef}),e.children)))}),Yg=p.forwardRef((e,t)=>{var r=Ot(e,Sn);return p.createElement(rK,Bo({},r,{ref:t}))});Yg.displayName="CartesianAxis";var nK=["x1","y1","x2","y2","key"],oK=["offset"],iK=["xAxisId","yAxisId"],aK=["xAxisId","yAxisId"];function Bw(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Dt(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Bw(Object(r),!0).forEach(function(n){sK(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Bw(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function sK(e,t,r){return(t=cK(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function cK(e){var t=lK(e,"string");return typeof t=="symbol"?t:t+""}function lK(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function jo(){return jo=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},jo.apply(null,arguments)}function ll(e,t){if(e==null)return{};var r,n,o=dK(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function dK(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}var uK=e=>{var{fill:t}=e;if(!t||t==="none")return null;var{fillOpacity:r,x:n,y:o,width:a,height:s,ry:c}=e;return p.createElement("rect",{x:n,y:o,ry:c,width:a,height:s,stroke:"none",fill:t,fillOpacity:r,className:"recharts-cartesian-grid-bg"})};function qP(e){var{option:t,lineItemProps:r}=e,n;if(p.isValidElement(t))n=p.cloneElement(t,r);else if(typeof t=="function")n=t(r);else{var o,{x1:a,y1:s,x2:c,y2:l,key:u}=r,d=ll(r,nK),f=(o=zr(d))!==null&&o!==void 0?o:{},{offset:m}=f,g=ll(f,oK);n=p.createElement("line",jo({},g,{x1:a,y1:s,x2:c,y2:l,fill:"none",key:u}))}return n}function hK(e){var{x:t,width:r,horizontal:n=!0,horizontalPoints:o}=e;if(!n||!o||!o.length)return null;var{xAxisId:a,yAxisId:s}=e,c=ll(e,iK),l=o.map((u,d)=>{var f=Dt(Dt({},c),{},{x1:t,y1:u,x2:t+r,y2:u,key:"line-".concat(d),index:d});return p.createElement(qP,{key:"line-".concat(d),option:n,lineItemProps:f})});return p.createElement("g",{className:"recharts-cartesian-grid-horizontal"},l)}function fK(e){var{y:t,height:r,vertical:n=!0,verticalPoints:o}=e;if(!n||!o||!o.length)return null;var{xAxisId:a,yAxisId:s}=e,c=ll(e,aK),l=o.map((u,d)=>{var f=Dt(Dt({},c),{},{x1:u,y1:t,x2:u,y2:t+r,key:"line-".concat(d),index:d});return p.createElement(qP,{option:n,lineItemProps:f,key:"line-".concat(d)})});return p.createElement("g",{className:"recharts-cartesian-grid-vertical"},l)}function pK(e){var{horizontalFill:t,fillOpacity:r,x:n,y:o,width:a,height:s,horizontalPoints:c,horizontal:l=!0}=e;if(!l||!t||!t.length||c==null)return null;var u=c.map(f=>Math.round(f+o-o)).sort((f,m)=>f-m);o!==u[0]&&u.unshift(0);var d=u.map((f,m)=>{var g=!u[m+1],x=g?o+s-f:u[m+1]-f;if(x<=0)return null;var v=m%t.length;return p.createElement("rect",{key:"react-".concat(m),y:f,x:n,height:x,width:a,stroke:"none",fill:t[v],fillOpacity:r,className:"recharts-cartesian-grid-bg"})});return p.createElement("g",{className:"recharts-cartesian-gridstripes-horizontal"},d)}function mK(e){var{vertical:t=!0,verticalFill:r,fillOpacity:n,x:o,y:a,width:s,height:c,verticalPoints:l}=e;if(!t||!r||!r.length)return null;var u=l.map(f=>Math.round(f+o-o)).sort((f,m)=>f-m);o!==u[0]&&u.unshift(0);var d=u.map((f,m)=>{var g=!u[m+1],x=g?o+s-f:u[m+1]-f;if(x<=0)return null;var v=m%r.length;return p.createElement("rect",{key:"react-".concat(m),x:f,y:a,width:x,height:c,stroke:"none",fill:r[v],fillOpacity:n,className:"recharts-cartesian-grid-bg"})});return p.createElement("g",{className:"recharts-cartesian-gridstripes-vertical"},d)}var gK=(e,t)=>{var{xAxis:r,width:n,height:o,offset:a}=e;return tE(Gg(Dt(Dt(Dt({},Sn),r),{},{ticks:rE(r),viewBox:{x:0,y:0,width:n,height:o}})),a.left,a.left+a.width,t)},xK=(e,t)=>{var{yAxis:r,width:n,height:o,offset:a}=e;return tE(Gg(Dt(Dt(Dt({},Sn),r),{},{ticks:rE(r),viewBox:{x:0,y:0,width:n,height:o}})),a.top,a.top+a.height,t)},vK={horizontal:!0,vertical:!0,horizontalPoints:[],verticalPoints:[],stroke:"#ccc",fill:"none",verticalFill:[],horizontalFill:[],xAxisId:0,yAxisId:0,syncWithTicks:!1,zIndex:wt.grid};function sm(e){var t=ug(),r=hg(),n=cE(),o=Dt(Dt({},Ot(e,vK)),{},{x:de(e.x)?e.x:n.left,y:de(e.y)?e.y:n.top,width:de(e.width)?e.width:n.width,height:de(e.height)?e.height:n.height}),{xAxisId:a,yAxisId:s,x:c,y:l,width:u,height:d,syncWithTicks:f,horizontalValues:m,verticalValues:g}=o,x=Nt(),v=ue(P=>D0(P,"xAxis",a,x)),b=ue(P=>D0(P,"yAxis",s,x));if(!cn(u)||!cn(d)||!de(c)||!de(l))return null;var E=o.verticalCoordinatesGenerator||gK,w=o.horizontalCoordinatesGenerator||xK,{horizontalPoints:j,verticalPoints:S}=o;if((!j||!j.length)&&typeof w=="function"){var y=m&&m.length,k=w({yAxis:b?Dt(Dt({},b),{},{ticks:y?m:b.ticks}):void 0,width:t??u,height:r??d,offset:n},y?!0:f);Vc(Array.isArray(k),"horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof k,"]")),Array.isArray(k)&&(j=k)}if((!S||!S.length)&&typeof E=="function"){var $=g&&g.length,C=E({xAxis:v?Dt(Dt({},v),{},{ticks:$?g:v.ticks}):void 0,width:t??u,height:r??d,offset:n},$?!0:f);Vc(Array.isArray(C),"verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof C,"]")),Array.isArray(C)&&(S=C)}return p.createElement(Er,{zIndex:o.zIndex},p.createElement("g",{className:"recharts-cartesian-grid"},p.createElement(uK,{fill:o.fill,fillOpacity:o.fillOpacity,x:o.x,y:o.y,width:o.width,height:o.height,ry:o.ry}),p.createElement(pK,jo({},o,{horizontalPoints:j})),p.createElement(mK,jo({},o,{verticalPoints:S})),p.createElement(hK,jo({},o,{offset:n,horizontalPoints:j,xAxis:v,yAxis:b})),p.createElement(fK,jo({},o,{offset:n,verticalPoints:S,xAxis:v,yAxis:b}))))}sm.displayName="CartesianGrid";var yK={},WP=Qt({name:"errorBars",initialState:yK,reducers:{addErrorBar:(e,t)=>{var{itemId:r,errorBar:n}=t.payload;e[r]||(e[r]=[]),e[r].push(n)},replaceErrorBar:(e,t)=>{var{itemId:r,prev:n,next:o}=t.payload;e[r]&&(e[r]=e[r].map(a=>a.dataKey===n.dataKey&&a.direction===n.direction?o:a))},removeErrorBar:(e,t)=>{var{itemId:r,errorBar:n}=t.payload;e[r]&&(e[r]=e[r].filter(o=>o.dataKey!==n.dataKey||o.direction!==n.direction))}}}),{addErrorBar:pce,replaceErrorBar:mce,removeErrorBar:gce}=WP.actions,bK=WP.reducer,wK=["children"];function $K(e,t){if(e==null)return{};var r,n,o=SK(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function SK(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}var jK={data:[],xAxisId:"xAxis-0",yAxisId:"yAxis-0",dataPointFormatter:()=>({x:0,y:0,value:0}),errorBarOffset:0},kK=p.createContext(jK);function HP(e){var{children:t}=e,r=$K(e,wK);return p.createElement(kK.Provider,{value:r},t)}function Xg(e,t){var r,n,o=ue(u=>Ln(u,e)),a=ue(u=>Mn(u,t)),s=(r=o?.allowDataOverflow)!==null&&r!==void 0?r:gt.allowDataOverflow,c=(n=a?.allowDataOverflow)!==null&&n!==void 0?n:xt.allowDataOverflow,l=s||c;return{needClip:l,needClipX:s,needClipY:c}}function VP(e){var{xAxisId:t,yAxisId:r,clipPathId:n}=e,o=Vg(),{needClipX:a,needClipY:s,needClip:c}=Xg(t,r);if(!c||!o)return null;var{x:l,y:u,width:d,height:f}=o;return p.createElement("clipPath",{id:"clipPath-".concat(n)},p.createElement("rect",{x:a?l:l-d/2,y:s?u:u-f/2,width:a?d:d*2,height:s?f:f*2}))}var KP=(e,t,r,n)=>no(e,"xAxis",t,n),GP=(e,t,r,n)=>ro(e,"xAxis",t,n),YP=(e,t,r,n)=>no(e,"yAxis",r,n),XP=(e,t,r,n)=>ro(e,"yAxis",r,n),EK=V([Pe,KP,YP,GP,XP],(e,t,r,n,o)=>ao(e,"xAxis")?ji(t,n,!1):ji(r,o,!1)),CK=(e,t,r,n,o)=>o;function PK(e){return e.type==="line"}var AK=V([pd,CK],(e,t)=>e.filter(PK).find(r=>r.id===t)),OK=V([Pe,KP,YP,GP,XP,AK,EK,mg],(e,t,r,n,o,a,s,c)=>{var{chartData:l,dataStartIndex:u,dataEndIndex:d}=c;if(!(a==null||t==null||r==null||n==null||o==null||n.length===0||o.length===0||s==null||e!=="horizontal"&&e!=="vertical")){var{dataKey:f,data:m}=a,g;if(m!=null&&m.length>0?g=m:g=l?.slice(u,d+1),g!=null)return xG({layout:e,xAxis:t,yAxis:r,xAxisTicks:n,yAxisTicks:o,dataKey:f,bandSize:s,displayedData:g})}});function RK(e){var t=Za(e),r=3,n=2;if(t!=null){var{r:o,strokeWidth:a}=t,s=Number(o),c=Number(a);return(Number.isNaN(s)||s<0)&&(s=r),(Number.isNaN(c)||c<0)&&(c=n),{r:s,strokeWidth:c}}return{r,strokeWidth:n}}var Nh={exports:{}},Bh={};var Fw;function TK(){if(Fw)return Bh;Fw=1;var e=ym();function t(l,u){return l===u&&(l!==0||1/l===1/u)||l!==l&&u!==u}var r=typeof Object.is=="function"?Object.is:t,n=e.useSyncExternalStore,o=e.useRef,a=e.useEffect,s=e.useMemo,c=e.useDebugValue;return Bh.useSyncExternalStoreWithSelector=function(l,u,d,f,m){var g=o(null);if(g.current===null){var x={hasValue:!1,value:null};g.current=x}else x=g.current;g=s(function(){function b(y){if(!E){if(E=!0,w=y,y=f(y),m!==void 0&&x.hasValue){var k=x.value;if(m(k,y))return j=k}return j=y}if(k=j,r(w,y))return k;var $=f(y);return m!==void 0&&m(k,$)?(w=y,k):(w=y,j=$)}var E=!1,w,j,S=d===void 0?null:d;return[function(){return b(u())},S===null?void 0:function(){return b(S())}]},[u,d,f,m]);var v=n(l,g[0],g[1]);return a(function(){x.hasValue=!0,x.value=v},[v]),c(v),v},Bh}var Uw;function IK(){return Uw||(Uw=1,Nh.exports=TK()),Nh.exports}IK();function DK(e){e()}function _K(){let e=null,t=null;return{clear(){e=null,t=null},notify(){DK(()=>{let r=e;for(;r;)r.callback(),r=r.next})},get(){const r=[];let n=e;for(;n;)r.push(n),n=n.next;return r},subscribe(r){let n=!0;const o=t={callback:r,next:null,prev:t};return o.prev?o.prev.next=o:e=o,function(){!n||e===null||(n=!1,o.next?o.next.prev=o.prev:t=o.prev,o.prev?o.prev.next=o.next:e=o.next)}}}}var qw={notify(){},get:()=>[]};function LK(e,t){let r,n=qw,o=0,a=!1;function s(v){d();const b=n.subscribe(v);let E=!1;return()=>{E||(E=!0,b(),f())}}function c(){n.notify()}function l(){x.onStateChange&&x.onStateChange()}function u(){return a}function d(){o++,r||(r=e.subscribe(l),n=_K())}function f(){o--,r&&o===0&&(r(),r=void 0,n.clear(),n=qw)}function m(){a||(a=!0,d())}function g(){a&&(a=!1,f())}const x={addNestedSub:s,notifyNestedSubs:c,handleChangeWrapper:l,isSubscribed:u,trySubscribe:m,tryUnsubscribe:g,getListeners:()=>n};return x}var MK=()=>typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",zK=MK(),NK=()=>typeof navigator<"u"&&navigator.product==="ReactNative",BK=NK(),FK=()=>zK||BK?p.useLayoutEffect:p.useEffect,UK=FK();function Ww(e,t){return e===t?e!==0||t!==0||1/e===1/t:e!==e&&t!==t}function qK(e,t){if(Ww(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;const r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(let o=0;o<r.length;o++)if(!Object.prototype.hasOwnProperty.call(t,r[o])||!Ww(e[r[o]],t[r[o]]))return!1;return!0}var WK=Symbol.for("react-redux-context"),HK=typeof globalThis<"u"?globalThis:{};function VK(){if(!p.createContext)return{};const e=HK[WK]??=new Map;let t=e.get(p.createContext);return t||(t=p.createContext(null),e.set(p.createContext,t)),t}var KK=VK();function GK(e){const{children:t,context:r,serverState:n,store:o}=e,a=p.useMemo(()=>{const l=LK(o);return{store:o,subscription:l,getServerState:n?()=>n:void 0}},[o,n]),s=p.useMemo(()=>o.getState(),[o]);UK(()=>{const{subscription:l}=a;return l.onStateChange=l.notifyNestedSubs,l.trySubscribe(),s!==o.getState()&&l.notifyNestedSubs(),()=>{l.tryUnsubscribe(),l.onStateChange=void 0}},[a,s]);const c=r||KK;return p.createElement(c.Provider,{value:a},t)}var YK=GK,XK=new Set(["axisLine","tickLine","activeBar","activeDot","activeLabel","activeShape","allowEscapeViewBox","background","cursor","dot","label","line","margin","padding","position","shape","style","tick","wrapperStyle","radius"]);function ZK(e,t){return e==null&&t==null?!0:typeof e=="number"&&typeof t=="number"?e===t||e!==e&&t!==t:e===t}function yd(e,t){var r=new Set([...Object.keys(e),...Object.keys(t)]);for(var n of r)if(XK.has(n)){if(e[n]==null&&t[n]==null)continue;if(!qK(e[n],t[n]))return!1}else if(!ZK(e[n],t[n]))return!1;return!0}var JK=["id"],QK=["type","layout","connectNulls","needClip","shape"],eG=["activeDot","animateNewValues","animationBegin","animationDuration","animationEasing","connectNulls","dot","hide","isAnimationActive","label","legendType","xAxisId","yAxisId","id"];function qa(){return qa=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},qa.apply(null,arguments)}function Hw(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function rn(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Hw(Object(r),!0).forEach(function(n){tG(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Hw(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function tG(e,t,r){return(t=rG(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function rG(e){var t=nG(e,"string");return typeof t=="symbol"?t:t+""}function nG(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Zg(e,t){if(e==null)return{};var r,n,o=oG(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function oG(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}var iG=e=>{var{dataKey:t,name:r,stroke:n,legendType:o,hide:a}=e;return[{inactive:a,dataKey:t,type:o,color:n,value:Gl(r,t),payload:e}]},aG=p.memo(e=>{var{dataKey:t,data:r,stroke:n,strokeWidth:o,fill:a,name:s,hide:c,unit:l,tooltipType:u,id:d}=e,f={dataDefinedOnItem:r,positions:void 0,settings:{stroke:n,strokeWidth:o,fill:a,dataKey:t,nameKey:void 0,name:Gl(s,t),hide:c,type:u,color:n,unit:l,graphicalItemId:d}};return p.createElement(IP,{tooltipEntrySettings:f})}),ZP=(e,t)=>"".concat(t,"px ").concat(e-t,"px");function sG(e,t){for(var r=e.length%2!==0?[...e,0]:e,n=[],o=0;o<t;++o)n=[...n,...r];return n}var cG=(e,t,r)=>{var n=r.reduce((f,m)=>f+m);if(!n)return ZP(t,e);for(var o=Math.floor(e/n),a=e%n,s=t-e,c=[],l=0,u=0;l<r.length;u+=r[l],++l)if(u+r[l]>a){c=[...r.slice(0,l),a-u];break}var d=c.length%2===0?[0,s]:[s];return[...sG(r,o),...c,...d].map(f=>"".concat(f,"px")).join(", ")};function lG(e){var{clipPathId:t,points:r,props:n}=e,{dot:o,dataKey:a,needClip:s}=n,{id:c}=n,l=Zg(n,JK),u=zr(l);return p.createElement(K7,{points:r,dot:o,className:"recharts-line-dots",dotClassName:"recharts-line-dot",dataKey:a,baseProps:u,needClip:s,clipPathId:t})}function dG(e){var{showLabels:t,children:r,points:n}=e,o=p.useMemo(()=>n?.map(a=>{var s,c,l={x:(s=a.x)!==null&&s!==void 0?s:0,y:(c=a.y)!==null&&c!==void 0?c:0,width:0,lowerWidth:0,upperWidth:0,height:0};return rn(rn({},l),{},{value:a.value,payload:a.payload,viewBox:l,parentViewBox:void 0,fill:void 0})}),[n]);return p.createElement($P,{value:t?o:void 0},r)}function Vw(e){var{clipPathId:t,pathRef:r,points:n,strokeDasharray:o,props:a}=e,{type:s,layout:c,connectNulls:l,needClip:u,shape:d}=a,f=Zg(a,QK),m=rn(rn({},Ht(f)),{},{fill:"none",className:"recharts-line-curve",clipPath:u?"url(#clipPath-".concat(t,")"):void 0,points:n,type:s,layout:c,connectNulls:l,strokeDasharray:o??a.strokeDasharray});return p.createElement(p.Fragment,null,n?.length>1&&p.createElement(AP,qa({shapeType:"curve",option:d},m,{pathRef:r})),p.createElement(lG,{points:n,clipPathId:t,props:a}))}function uG(e){try{return e&&e.getTotalLength&&e.getTotalLength()||0}catch{return 0}}function hG(e){var{clipPathId:t,props:r,pathRef:n,previousPointsRef:o,longestAnimatedLengthRef:a}=e,{points:s,strokeDasharray:c,isAnimationActive:l,animationBegin:u,animationDuration:d,animationEasing:f,animateNewValues:m,width:g,height:x,onAnimationEnd:v,onAnimationStart:b}=r,E=o.current,w=ad(s,"recharts-line-"),j=p.useRef(w),[S,y]=p.useState(!1),k=!S,$=p.useCallback(()=>{typeof v=="function"&&v(),y(!1)},[v]),C=p.useCallback(()=>{typeof b=="function"&&b(),y(!0)},[b]),P=uG(n.current),z=p.useRef(0);j.current!==w&&(z.current=a.current,j.current=w);var _=z.current;return p.createElement(dG,{points:s,showLabels:k},r.children,p.createElement(id,{animationId:w,begin:u,duration:d,isActive:l,easing:f,onAnimationEnd:$,onAnimationStart:C,key:w},N=>{var R=Je(_,P+_,N),F=Math.min(R,P),O;if(l)if(c){var D="".concat(c).split(/[,\s]+/gim).map(I=>parseFloat(I));O=cG(F,P,D)}else O=ZP(P,F);else O=c==null?void 0:String(c);if(N>0&&P>0&&(o.current=s,a.current=Math.max(a.current,F)),E){var A=E.length/s.length,M=N===1?s:s.map((I,T)=>{var B=Math.floor(T*A);if(E[B]){var X=E[B];return rn(rn({},I),{},{x:Je(X.x,I.x,N),y:Je(X.y,I.y,N)})}return m?rn(rn({},I),{},{x:Je(g*2,I.x,N),y:Je(x/2,I.y,N)}):rn(rn({},I),{},{x:I.x,y:I.y})});return o.current=M,p.createElement(Vw,{props:r,points:M,clipPathId:t,pathRef:n,strokeDasharray:O})}return p.createElement(Vw,{props:r,points:s,clipPathId:t,pathRef:n,strokeDasharray:O})}),p.createElement(jP,{label:r.label}))}function fG(e){var{clipPathId:t,props:r}=e,n=p.useRef(null),o=p.useRef(0),a=p.useRef(null);return p.createElement(hG,{props:r,clipPathId:t,previousPointsRef:n,longestAnimatedLengthRef:o,pathRef:a})}var pG=(e,t)=>{var r,n;return{x:(r=e.x)!==null&&r!==void 0?r:void 0,y:(n=e.y)!==null&&n!==void 0?n:void 0,value:e.value,errorVal:it(e.payload,t)}};class mG extends p.Component{render(){var{hide:t,dot:r,points:n,className:o,xAxisId:a,yAxisId:s,top:c,left:l,width:u,height:d,id:f,needClip:m,zIndex:g}=this.props;if(t)return null;var x=Te("recharts-line",o),v=f,{r:b,strokeWidth:E}=RK(r),w=PP(r),j=b*2+E,S=m?"url(#clipPath-".concat(w?"":"dots-").concat(v,")"):void 0;return p.createElement(Er,{zIndex:g},p.createElement($r,{className:x},m&&p.createElement("defs",null,p.createElement(VP,{clipPathId:v,xAxisId:a,yAxisId:s}),!w&&p.createElement("clipPath",{id:"clipPath-dots-".concat(v)},p.createElement("rect",{x:l-j/2,y:c-j/2,width:u+j,height:d+j}))),p.createElement(HP,{xAxisId:a,yAxisId:s,data:n,dataPointFormatter:pG,errorBarOffset:0},p.createElement(fG,{props:this.props,clipPathId:v}))),p.createElement(fV,{activeDot:this.props.activeDot,points:n,mainColor:this.props.stroke,itemDataKey:this.props.dataKey,clipPath:S}))}}var JP={activeDot:!0,animateNewValues:!0,animationBegin:0,animationDuration:1500,animationEasing:"ease",connectNulls:!1,dot:!0,fill:"#fff",hide:!1,isAnimationActive:"auto",label:!1,legendType:"line",stroke:"#3182bd",strokeWidth:1,xAxisId:0,yAxisId:0,zIndex:wt.line,type:"linear"};function gG(e){var t=Ot(e,JP),{activeDot:r,animateNewValues:n,animationBegin:o,animationDuration:a,animationEasing:s,connectNulls:c,dot:l,hide:u,isAnimationActive:d,label:f,legendType:m,xAxisId:g,yAxisId:x,id:v}=t,b=Zg(t,eG),{needClip:E}=Xg(g,x),w=Vg(),j=Ti(),S=Nt(),y=ue(z=>OK(z,g,x,S,v));if(j!=="horizontal"&&j!=="vertical"||y==null||w==null)return null;var{height:k,width:$,x:C,y:P}=w;return p.createElement(mG,qa({},b,{id:v,connectNulls:c,dot:l,activeDot:r,animateNewValues:n,animationBegin:o,animationDuration:a,animationEasing:s,isAnimationActive:d,hide:u,label:f,legendType:m,xAxisId:g,yAxisId:x,points:y,layout:j,height:k,width:$,left:C,top:P,needClip:E}))}function xG(e){var{layout:t,xAxis:r,yAxis:n,xAxisTicks:o,yAxisTicks:a,dataKey:s,bandSize:c,displayedData:l}=e;return l.map((u,d)=>{var f=it(u,s);if(t==="horizontal"){var m=vb({axis:r,ticks:o,bandSize:c,entry:u,index:d}),g=Ke(f)?null:n.scale(f);return{x:m,y:g,value:f,payload:u}}var x=Ke(f)?null:r.scale(f),v=vb({axis:n,ticks:a,bandSize:c,entry:u,index:d});return x==null||v==null?null:{x,y:v,value:f,payload:u}}).filter(Boolean)}function vG(e){var t=Ot(e,JP),r=Nt();return p.createElement(_P,{id:t.id,type:"line"},n=>p.createElement(p.Fragment,null,p.createElement(DP,{legendPayload:iG(t)}),p.createElement(aG,{dataKey:t.dataKey,data:t.data,stroke:t.stroke,strokeWidth:t.strokeWidth,fill:t.fill,name:t.name,hide:t.hide,unit:t.unit,tooltipType:t.tooltipType,id:n}),p.createElement(MP,{type:"line",id:n,data:t.data,xAxisId:t.xAxisId,yAxisId:t.yAxisId,zAxisId:0,dataKey:t.dataKey,hide:t.hide,isPanorama:r}),p.createElement(gG,qa({},t,{id:n}))))}var ya=p.memo(vG,yd);ya.displayName="Line";function qo(e,t){var r,n;return(r=(n=e.graphicalItems.cartesianItems.find(o=>o.id===t))===null||n===void 0?void 0:n.xAxisId)!==null&&r!==void 0?r:zP}function Wo(e,t){var r,n;return(r=(n=e.graphicalItems.cartesianItems.find(o=>o.id===t))===null||n===void 0?void 0:n.yAxisId)!==null&&r!==void 0?r:zP}var yG="Invariant failed";function bG(e,t){throw new Error(yG)}function cm(){return cm=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},cm.apply(null,arguments)}function dl(e){return p.createElement(AP,cm({shapeType:"rectangle",activeClassName:"recharts-active-bar"},e))}var wG=function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return(n,o)=>{if(de(t))return t;var a=de(n)||Ke(n);return a?t(n,o):(a||bG(),r)}},$G=(e,t,r)=>r,SG=(e,t)=>t,fs=V([pd,SG],(e,t)=>e.filter(r=>r.type==="bar").find(r=>r.id===t)),jG=V([fs],e=>e?.maxBarSize),kG=(e,t,r,n)=>n,EG=V([Pe,pd,qo,Wo,$G],(e,t,r,n,o)=>t.filter(a=>e==="horizontal"?a.xAxisId===r:a.yAxisId===n).filter(a=>a.isPanorama===o).filter(a=>a.hide===!1).filter(a=>a.type==="bar")),CG=(e,t,r)=>{var n=Pe(e),o=qo(e,t),a=Wo(e,t);if(!(o==null||a==null))return n==="horizontal"?Qp(e,"yAxis",a,r):Qp(e,"xAxis",o,r)},PG=(e,t)=>{var r=Pe(e),n=qo(e,t),o=Wo(e,t);if(!(n==null||o==null))return r==="horizontal"?I0(e,"xAxis",n):I0(e,"yAxis",o)},AG=V([EG,zU,PG],pV),OG=(e,t,r)=>{var n,o,a=fs(e,t);if(a!=null){var s=qo(e,t),c=Wo(e,t);if(!(s==null||c==null)){var l=Pe(e),u=UE(e),{maxBarSize:d}=a,f=Ke(d)?u:d,m,g;return l==="horizontal"?(m=no(e,"xAxis",s,r),g=ro(e,"xAxis",s,r)):(m=no(e,"yAxis",c,r),g=ro(e,"yAxis",c,r)),(n=(o=ji(m,g,!0))!==null&&o!==void 0?o:f)!==null&&n!==void 0?n:0}}},QP=(e,t,r)=>{var n=Pe(e),o=qo(e,t),a=Wo(e,t);if(!(o==null||a==null)){var s,c;return n==="horizontal"?(s=no(e,"xAxis",o,r),c=ro(e,"xAxis",o,r)):(s=no(e,"yAxis",a,r),c=ro(e,"yAxis",a,r)),ji(s,c)}},RG=V([AG,UE,MU,qE,OG,QP,jG],yV),TG=(e,t,r)=>{var n=qo(e,t);if(n!=null)return no(e,"xAxis",n,r)},IG=(e,t,r)=>{var n=Wo(e,t);if(n!=null)return no(e,"yAxis",n,r)},DG=(e,t,r)=>{var n=qo(e,t);if(n!=null)return ro(e,"xAxis",n,r)},_G=(e,t,r)=>{var n=Wo(e,t);if(n!=null)return ro(e,"yAxis",n,r)},LG=V([RG,fs],(e,t)=>{if(!(e==null||t==null)){var r=e.find(n=>n.stackId===t.stackId&&t.dataKey!=null&&n.dataKeys.includes(t.dataKey));if(r!=null)return r.position}}),MG=V([CG,fs],bV),zG=V([$t,lg,TG,IG,DG,_G,LG,Pe,kU,QP,MG,fs,kG],(e,t,r,n,o,a,s,c,l,u,d,f,m)=>{var{chartData:g,dataStartIndex:x,dataEndIndex:v}=l;if(!(f==null||s==null||t==null||c!=="horizontal"&&c!=="vertical"||r==null||n==null||o==null||a==null||u==null)){var{data:b}=f,E;if(b!=null&&b.length>0?E=b:E=g?.slice(x,v+1),E!=null)return fY({layout:c,barSettings:f,pos:s,parentViewBox:t,bandSize:u,xAxis:r,yAxis:n,xAxisTicks:o,yAxisTicks:a,stackedData:d,displayedData:E,offset:e,cells:m,dataStartIndex:x})}}),NG=["index"];function lm(){return lm=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},lm.apply(null,arguments)}function BG(e,t){if(e==null)return{};var r,n,o=FG(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function FG(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}var eA=p.createContext(void 0),UG=e=>{var t=p.useContext(eA);if(t!=null)return t.stackId;if(e!=null)return FF(e)},qG=(e,t)=>"recharts-bar-stack-clip-path-".concat(e,"-").concat(t),WG=e=>{var t=p.useContext(eA);if(t!=null){var{stackId:r}=t;return"url(#".concat(qG(r,e),")")}},HG=e=>{var{index:t}=e,r=BG(e,NG),n=WG(t);return p.createElement($r,lm({className:"recharts-bar-stack-layer",clipPath:n},r))},VG=["onMouseEnter","onMouseLeave","onClick"],KG=["value","background","tooltipPosition"],GG=["id"],YG=["onMouseEnter","onClick","onMouseLeave"];function Cn(){return Cn=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Cn.apply(null,arguments)}function Kw(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function Wt(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Kw(Object(r),!0).forEach(function(n){XG(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Kw(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function XG(e,t,r){return(t=ZG(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ZG(e){var t=JG(e,"string");return typeof t=="symbol"?t:t+""}function JG(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function ul(e,t){if(e==null)return{};var r,n,o=QG(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function QG(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}var eY=e=>{var{dataKey:t,name:r,fill:n,legendType:o,hide:a}=e;return[{inactive:a,dataKey:t,type:o,color:n,value:Gl(r,t),payload:e}]},tY=p.memo(e=>{var{dataKey:t,stroke:r,strokeWidth:n,fill:o,name:a,hide:s,unit:c,tooltipType:l,id:u}=e,d={dataDefinedOnItem:void 0,positions:void 0,settings:{stroke:r,strokeWidth:n,fill:o,dataKey:t,nameKey:void 0,name:Gl(a,t),hide:s,type:l,color:o,unit:c,graphicalItemId:u}};return p.createElement(IP,{tooltipEntrySettings:d})});function rY(e){var t=ue(No),{data:r,dataKey:n,background:o,allOtherBarProps:a}=e,{onMouseEnter:s,onMouseLeave:c,onClick:l}=a,u=ul(a,VG),d=OP(s,n,a.id),f=RP(c),m=TP(l,n,a.id);if(!o||r==null)return null;var g=Za(o);return p.createElement(Er,{zIndex:wV(o,wt.barBackground)},r.map((x,v)=>{var{value:b,background:E,tooltipPosition:w}=x,j=ul(x,KG);if(!E)return null;var S=d(x,v),y=f(x,v),k=m(x,v),$=Wt(Wt(Wt(Wt(Wt({option:o,isActive:String(v)===t},j),{},{fill:"#eee"},E),g),zl(u,x,v)),{},{onMouseEnter:S,onMouseLeave:y,onClick:k,dataKey:n,index:v,className:"recharts-bar-background-rectangle"});return p.createElement(dl,Cn({key:"background-bar-".concat(v)},$))}))}function nY(e){var{showLabels:t,children:r,rects:n}=e,o=n?.map(a=>{var s={x:a.x,y:a.y,width:a.width,lowerWidth:a.width,upperWidth:a.width,height:a.height};return Wt(Wt({},s),{},{value:a.value,payload:a.payload,parentViewBox:a.parentViewBox,viewBox:s,fill:a.fill})});return p.createElement($P,{value:t?o:void 0},r)}function oY(e){var{shape:t,activeBar:r,baseProps:n,entry:o,index:a,dataKey:s}=e,c=ue(No),l=ue(QC),u=r&&String(a)===c&&(l==null||s===l),d=u?r:t;return u?p.createElement(Er,{zIndex:wt.activeBar},p.createElement(dl,Cn({},n,{name:String(n.name)},o,{isActive:u,option:d,index:a,dataKey:s}))):p.createElement(dl,Cn({},n,{name:String(n.name)},o,{isActive:u,option:d,index:a,dataKey:s}))}function iY(e){var{shape:t,baseProps:r,entry:n,index:o,dataKey:a}=e;return p.createElement(dl,Cn({},r,{name:String(r.name)},n,{isActive:!1,option:t,index:o,dataKey:a}))}function aY(e){var t,{data:r,props:n}=e,o=(t=zr(n))!==null&&t!==void 0?t:{},{id:a}=o,s=ul(o,GG),{shape:c,dataKey:l,activeBar:u}=n,{onMouseEnter:d,onClick:f,onMouseLeave:m}=n,g=ul(n,YG),x=OP(d,l,a),v=RP(m),b=TP(f,l,a);return r?p.createElement(p.Fragment,null,r.map((E,w)=>p.createElement(HG,Cn({index:w,key:"rectangle-".concat(E?.x,"-").concat(E?.y,"-").concat(E?.value,"-").concat(w),className:"recharts-bar-rectangle"},zl(g,E,w),{onMouseEnter:x(E,w),onMouseLeave:v(E,w),onClick:b(E,w)}),u?p.createElement(oY,{shape:c,activeBar:u,baseProps:s,entry:E,index:w,dataKey:l}):p.createElement(iY,{shape:c,baseProps:s,entry:E,index:w,dataKey:l})))):null}function sY(e){var{props:t,previousRectanglesRef:r}=e,{data:n,layout:o,isAnimationActive:a,animationBegin:s,animationDuration:c,animationEasing:l,onAnimationEnd:u,onAnimationStart:d}=t,f=r.current,m=ad(t,"recharts-bar-"),[g,x]=p.useState(!1),v=!g,b=p.useCallback(()=>{typeof u=="function"&&u(),x(!1)},[u]),E=p.useCallback(()=>{typeof d=="function"&&d(),x(!0)},[d]);return p.createElement(nY,{showLabels:v,rects:n},p.createElement(id,{animationId:m,begin:s,duration:c,isActive:a,easing:l,onAnimationEnd:b,onAnimationStart:E,key:m},w=>{var j=w===1?n:n?.map((S,y)=>{var k=f&&f[y];if(k)return Wt(Wt({},S),{},{x:Je(k.x,S.x,w),y:Je(k.y,S.y,w),width:Je(k.width,S.width,w),height:Je(k.height,S.height,w)});if(o==="horizontal"){var $=Je(0,S.height,w),C=Je(S.stackedBarStart,S.y,w);return Wt(Wt({},S),{},{y:C,height:$})}var P=Je(0,S.width,w),z=Je(S.stackedBarStart,S.x,w);return Wt(Wt({},S),{},{width:P,x:z})});return w>0&&(r.current=j??null),j==null?null:p.createElement($r,null,p.createElement(aY,{props:t,data:j}))}),p.createElement(jP,{label:t.label}),t.children)}function cY(e){var t=p.useRef(null);return p.createElement(sY,{previousRectanglesRef:t,props:e})}var tA=0,lY=(e,t)=>{var r=Array.isArray(e.value)?e.value[1]:e.value;return{x:e.x,y:e.y,value:r,errorVal:it(e,t)}};class dY extends p.PureComponent{render(){var{hide:t,data:r,dataKey:n,className:o,xAxisId:a,yAxisId:s,needClip:c,background:l,id:u}=this.props;if(t||r==null)return null;var d=Te("recharts-bar",o),f=u;return p.createElement($r,{className:d,id:u},c&&p.createElement("defs",null,p.createElement(VP,{clipPathId:f,xAxisId:a,yAxisId:s})),p.createElement($r,{className:"recharts-bar-rectangles",clipPath:c?"url(#clipPath-".concat(f,")"):void 0},p.createElement(rY,{data:r,dataKey:n,background:l,allOtherBarProps:this.props}),p.createElement(cY,this.props)))}}var uY={activeBar:!1,animationBegin:0,animationDuration:400,animationEasing:"ease",background:!1,hide:!1,isAnimationActive:"auto",label:!1,legendType:"rect",minPointSize:tA,xAxisId:0,yAxisId:0,zIndex:wt.bar};function hY(e){var{xAxisId:t,yAxisId:r,hide:n,legendType:o,minPointSize:a,activeBar:s,animationBegin:c,animationDuration:l,animationEasing:u,isAnimationActive:d}=e,{needClip:f}=Xg(t,r),m=Ti(),g=Nt(),x=d7(e.children,dP),v=ue(w=>zG(w,e.id,g,x));if(m!=="vertical"&&m!=="horizontal")return null;var b,E=v?.[0];return E==null||E.height==null||E.width==null?b=0:b=m==="vertical"?E.height/2:E.width/2,p.createElement(HP,{xAxisId:t,yAxisId:r,data:v,dataPointFormatter:lY,errorBarOffset:b},p.createElement(dY,Cn({},e,{layout:m,needClip:f,data:v,xAxisId:t,yAxisId:r,hide:n,legendType:o,minPointSize:a,activeBar:s,animationBegin:c,animationDuration:l,animationEasing:u,isAnimationActive:d})))}function fY(e){var{layout:t,barSettings:{dataKey:r,minPointSize:n},pos:o,bandSize:a,xAxis:s,yAxis:c,xAxisTicks:l,yAxisTicks:u,stackedData:d,displayedData:f,offset:m,cells:g,parentViewBox:x,dataStartIndex:v}=e,b=t==="horizontal"?c:s,E=d?b.scale.domain():null,w=UF({numericAxis:b}),j=b.scale(w);return f.map((S,y)=>{var k,$,C,P,z,_;if(d){var N=d[y+v];if(N==null)return null;k=LF(N,E)}else k=it(S,r),Array.isArray(k)||(k=[w,k]);var R=wG(n,tA)(k[1],y);if(t==="horizontal"){var F,[O,D]=[c.scale(k[0]),c.scale(k[1])];$=yb({axis:s,ticks:l,bandSize:a,offset:o.offset,entry:S,index:y}),C=(F=D??O)!==null&&F!==void 0?F:void 0,P=o.size;var A=O-D;if(z=Nr(A)?0:A,_={x:$,y:m.top,width:P,height:m.height},Math.abs(R)>0&&Math.abs(z)<Math.abs(R)){var M=Xt(z||R)*(Math.abs(R)-Math.abs(z));C-=M,z+=M}}else{var[I,T]=[s.scale(k[0]),s.scale(k[1])];if($=I,C=yb({axis:c,ticks:u,bandSize:a,offset:o.offset,entry:S,index:y}),P=T-I,z=o.size,_={x:m.left,y:C,width:m.width,height:z},Math.abs(R)>0&&Math.abs(P)<Math.abs(R)){var B=Xt(P||R)*(Math.abs(R)-Math.abs(P));P+=B}}if($==null||C==null||P==null||z==null)return null;var X=Wt(Wt({},S),{},{stackedBarStart:j,x:$,y:C,width:P,height:z,value:d?k:k[1],payload:S,background:_,tooltipPosition:{x:$+P/2,y:C+z/2},parentViewBox:x},g&&g[y]&&g[y].props);return X}).filter(Boolean)}function pY(e){var t=Ot(e,uY),r=UG(t.stackId),n=Nt();return p.createElement(_P,{id:t.id,type:"bar"},o=>p.createElement(p.Fragment,null,p.createElement(DP,{legendPayload:eY(t)}),p.createElement(tY,{dataKey:t.dataKey,stroke:t.stroke,strokeWidth:t.strokeWidth,fill:t.fill,name:t.name,hide:t.hide,unit:t.unit,tooltipType:t.tooltipType,id:o}),p.createElement(MP,{type:"bar",id:o,data:void 0,xAxisId:t.xAxisId,yAxisId:t.yAxisId,zAxisId:0,dataKey:t.dataKey,stackId:r,hide:t.hide,barSize:t.barSize,minPointSize:t.minPointSize,maxBarSize:t.maxBarSize,isPanorama:n}),p.createElement(Er,{zIndex:t.zIndex},p.createElement(hY,Cn({},t,{id:o})))))}var ba=p.memo(pY,yd);ba.displayName="Bar";var mY=["domain","range"],gY=["domain","range"];function Gw(e,t){if(e==null)return{};var r,n,o=xY(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function xY(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function Yw(e,t){return e===t?!0:Array.isArray(e)&&e.length===2&&Array.isArray(t)&&t.length===2?e[0]===t[0]&&e[1]===t[1]:!1}function rA(e,t){if(e===t)return!0;var{domain:r,range:n}=e,o=Gw(e,mY),{domain:a,range:s}=t,c=Gw(t,gY);return!Yw(r,a)||!Yw(n,s)?!1:yd(o,c)}var vY=["dangerouslySetInnerHTML","ticks","scale"],yY=["id","scale"];function dm(){return dm=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},dm.apply(null,arguments)}function Xw(e,t){if(e==null)return{};var r,n,o=bY(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function bY(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function wY(e){var t=Xe(),r=p.useRef(null);return p.useLayoutEffect(()=>{r.current===null?t(J7(e)):r.current!==e&&t(Q7({prev:r.current,next:e})),r.current=e},[e,t]),p.useLayoutEffect(()=>()=>{r.current&&(t(eV(r.current)),r.current=null)},[t]),null}var $Y=e=>{var{xAxisId:t,className:r}=e,n=ue(lg),o=Nt(),a="xAxis",s=ue(E=>IC(E,a,t,o)),c=ue(E=>AC(E,t)),l=ue(E=>_q(E,t)),u=ue(E=>JE(E,t));if(c==null||l==null||u==null)return null;var{dangerouslySetInnerHTML:d,ticks:f,scale:m}=e,g=Xw(e,vY),{id:x,scale:v}=u,b=Xw(u,yY);return p.createElement(Yg,dm({},g,b,{x:l.x,y:l.y,width:c.width,height:c.height,className:Te("recharts-".concat(a," ").concat(a),r),viewBox:n,ticks:s,axisType:a}))},SY={allowDataOverflow:gt.allowDataOverflow,allowDecimals:gt.allowDecimals,allowDuplicatedCategory:gt.allowDuplicatedCategory,angle:gt.angle,axisLine:Sn.axisLine,height:gt.height,hide:!1,includeHidden:gt.includeHidden,interval:gt.interval,minTickGap:gt.minTickGap,mirror:gt.mirror,orientation:gt.orientation,padding:gt.padding,reversed:gt.reversed,scale:gt.scale,tick:gt.tick,tickCount:gt.tickCount,tickLine:Sn.tickLine,tickSize:Sn.tickSize,type:gt.type,xAxisId:0},jY=e=>{var t=Ot(e,SY);return p.createElement(p.Fragment,null,p.createElement(wY,{allowDataOverflow:t.allowDataOverflow,allowDecimals:t.allowDecimals,allowDuplicatedCategory:t.allowDuplicatedCategory,angle:t.angle,dataKey:t.dataKey,domain:t.domain,height:t.height,hide:t.hide,id:t.xAxisId,includeHidden:t.includeHidden,interval:t.interval,minTickGap:t.minTickGap,mirror:t.mirror,name:t.name,orientation:t.orientation,padding:t.padding,reversed:t.reversed,scale:t.scale,tick:t.tick,tickCount:t.tickCount,tickFormatter:t.tickFormatter,ticks:t.ticks,type:t.type,unit:t.unit}),p.createElement($Y,t))},um=p.memo(jY,rA);um.displayName="XAxis";var kY=["dangerouslySetInnerHTML","ticks","scale"],EY=["id","scale"];function hm(){return hm=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},hm.apply(null,arguments)}function Zw(e,t){if(e==null)return{};var r,n,o=CY(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function CY(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function PY(e){var t=Xe(),r=p.useRef(null);return p.useLayoutEffect(()=>{r.current===null?t(tV(e)):r.current!==e&&t(rV({prev:r.current,next:e})),r.current=e},[e,t]),p.useLayoutEffect(()=>()=>{r.current&&(t(nV(r.current)),r.current=null)},[t]),null}var AY=e=>{var{yAxisId:t,className:r,width:n,label:o}=e,a=p.useRef(null),s=p.useRef(null),c=ue(lg),l=Nt(),u=Xe(),d="yAxis",f=ue(k=>OC(k,t)),m=ue(k=>Mq(k,t)),g=ue(k=>IC(k,d,t,l)),x=ue(k=>QE(k,t));if(p.useLayoutEffect(()=>{if(!(n!=="auto"||!f||Hg(o)||p.isValidElement(o)||x==null)){var k=a.current;if(k){var $=k.getCalculatedWidth();Math.round(f.width)!==Math.round($)&&u(oV({id:t,width:$}))}}},[g,f,u,o,t,n,x]),f==null||m==null||x==null)return null;var{dangerouslySetInnerHTML:v,ticks:b,scale:E}=e,w=Zw(e,kY),{id:j,scale:S}=x,y=Zw(x,EY);return p.createElement(Yg,hm({},w,y,{ref:a,labelRef:s,x:m.x,y:m.y,tickTextProps:n==="auto"?{width:void 0}:{width:n},width:f.width,height:f.height,className:Te("recharts-".concat(d," ").concat(d),r),viewBox:c,ticks:g,axisType:d}))},OY={allowDataOverflow:xt.allowDataOverflow,allowDecimals:xt.allowDecimals,allowDuplicatedCategory:xt.allowDuplicatedCategory,angle:xt.angle,axisLine:Sn.axisLine,hide:!1,includeHidden:xt.includeHidden,interval:xt.interval,minTickGap:xt.minTickGap,mirror:xt.mirror,orientation:xt.orientation,padding:xt.padding,reversed:xt.reversed,scale:xt.scale,tick:xt.tick,tickCount:xt.tickCount,tickLine:Sn.tickLine,tickSize:Sn.tickSize,type:xt.type,width:xt.width,yAxisId:0},RY=e=>{var t=Ot(e,OY);return p.createElement(p.Fragment,null,p.createElement(PY,{interval:t.interval,id:t.yAxisId,scale:t.scale,type:t.type,domain:t.domain,allowDataOverflow:t.allowDataOverflow,dataKey:t.dataKey,allowDuplicatedCategory:t.allowDuplicatedCategory,allowDecimals:t.allowDecimals,tickCount:t.tickCount,padding:t.padding,includeHidden:t.includeHidden,reversed:t.reversed,ticks:t.ticks,width:t.width,orientation:t.orientation,mirror:t.mirror,hide:t.hide,unit:t.unit,name:t.name,angle:t.angle,minTickGap:t.minTickGap,tick:t.tick,tickFormatter:t.tickFormatter}),p.createElement(AY,t))},kc=p.memo(RY,rA);kc.displayName="YAxis";var TY=(e,t)=>t,Jg=V([TY,Pe,XE,ht,YC,zn,JW,$t],iH),Qg=e=>{var t=e.currentTarget.getBoundingClientRect(),r=t.width/e.currentTarget.offsetWidth,n=t.height/e.currentTarget.offsetHeight;return{chartX:Math.round((e.clientX-t.left)/r),chartY:Math.round((e.clientY-t.top)/n)}},nA=Sr("mouseClick"),oA=rs();oA.startListening({actionCreator:nA,effect:(e,t)=>{var r=e.payload,n=Jg(t.getState(),Qg(r));n?.activeIndex!=null&&t.dispatch(Zq({activeIndex:n.activeIndex,activeDataKey:void 0,activeCoordinate:n.activeCoordinate}))}});var fm=Sr("mouseMove"),iA=rs(),Gs=null;iA.startListening({actionCreator:fm,effect:(e,t)=>{var r=e.payload;Gs!==null&&cancelAnimationFrame(Gs);var n=Qg(r);Gs=requestAnimationFrame(()=>{var o=t.getState(),a=Dg(o,o.tooltip.settings.shared);if(a==="axis"){var s=Jg(o,n);s?.activeIndex!=null?t.dispatch(FC({activeIndex:s.activeIndex,activeDataKey:void 0,activeCoordinate:s.activeCoordinate})):t.dispatch(BC())}Gs=null})}});function IY(e,t){return t instanceof HTMLElement?"HTMLElement <".concat(t.tagName,' class="').concat(t.className,'">'):t===window?"global.window":e==="children"&&typeof t=="object"&&t!==null?"<<CHILDREN>>":t}var Jw={accessibilityLayer:!0,barCategoryGap:"10%",barGap:4,barSize:void 0,className:void 0,maxBarSize:void 0,stackOffset:"none",syncId:void 0,syncMethod:"index",baseValue:void 0,reverseStackOrder:!1},aA=Qt({name:"rootProps",initialState:Jw,reducers:{updateOptions:(e,t)=>{var r;e.accessibilityLayer=t.payload.accessibilityLayer,e.barCategoryGap=t.payload.barCategoryGap,e.barGap=(r=t.payload.barGap)!==null&&r!==void 0?r:Jw.barGap,e.barSize=t.payload.barSize,e.maxBarSize=t.payload.maxBarSize,e.stackOffset=t.payload.stackOffset,e.syncId=t.payload.syncId,e.syncMethod=t.payload.syncMethod,e.className=t.payload.className,e.baseValue=t.payload.baseValue,e.reverseStackOrder=t.payload.reverseStackOrder}}}),DY=aA.reducer,{updateOptions:_Y}=aA.actions,sA=Qt({name:"polarOptions",initialState:null,reducers:{updatePolarOptions:(e,t)=>t.payload}}),{updatePolarOptions:xce}=sA.actions,LY=sA.reducer,cA=Sr("keyDown"),lA=Sr("focus"),ex=rs();ex.startListening({actionCreator:cA,effect:(e,t)=>{var r=t.getState(),n=r.rootProps.accessibilityLayer!==!1;if(n){var{keyboardInteraction:o}=r.tooltip,a=e.payload;if(!(a!=="ArrowRight"&&a!=="ArrowLeft"&&a!=="Enter")){var s=_g(o,Ni(r),ss(r),us(r)),c=s==null?-1:Number(s);if(!(!Number.isFinite(c)||c<0)){var l=zn(r);if(a==="Enter"){var u=ol(r,"axis","hover",String(o.index));t.dispatch(tm({active:!o.active,activeIndex:o.index,activeCoordinate:u}));return}var d=Fq(r),f=d==="left-to-right"?1:-1,m=a==="ArrowRight"?1:-1,g=c+m*f;if(!(l==null||g>=l.length||g<0)){var x=ol(r,"axis","hover",String(g));t.dispatch(tm({active:!0,activeIndex:g.toString(),activeCoordinate:x}))}}}}}});ex.startListening({actionCreator:lA,effect:(e,t)=>{var r=t.getState(),n=r.rootProps.accessibilityLayer!==!1;if(n){var{keyboardInteraction:o}=r.tooltip;if(!o.active&&o.index==null){var a="0",s=ol(r,"axis","hover",String(a));t.dispatch(tm({active:!0,activeIndex:a,activeCoordinate:s}))}}}});var mr=Sr("externalEvent"),dA=rs(),Fh=new Map;dA.startListening({actionCreator:mr,effect:(e,t)=>{var{handler:r,reactEvent:n}=e.payload;if(r!=null){n.persist();var o=n.type,a=Fh.get(o);a!==void 0&&cancelAnimationFrame(a);var s=requestAnimationFrame(()=>{try{var c=t.getState(),l={activeCoordinate:LW(c),activeDataKey:QC(c),activeIndex:No(c),activeLabel:JC(c),activeTooltipIndex:No(c),isTooltipActive:MW(c)};r(l,n)}finally{Fh.delete(o)}});Fh.set(o,s)}}});var MY=V([Mi],e=>e.tooltipItemPayloads),zY=V([MY,ds,(e,t)=>t,(e,t,r)=>r],(e,t,r,n)=>{var o=e.find(c=>c.settings.graphicalItemId===n);if(o!=null){var{positions:a}=o;if(a!=null){var s=t(a,r);return s}}}),uA=Sr("touchMove"),hA=rs();hA.startListening({actionCreator:uA,effect:(e,t)=>{var r=e.payload;if(!(r.touches==null||r.touches.length===0)){var n=t.getState(),o=Dg(n,n.tooltip.settings.shared);if(o==="axis"){var a=r.touches[0];if(a==null)return;var s=Jg(n,Qg({clientX:a.clientX,clientY:a.clientY,currentTarget:r.currentTarget}));s?.activeIndex!=null&&t.dispatch(FC({activeIndex:s.activeIndex,activeDataKey:void 0,activeCoordinate:s.activeCoordinate}))}else if(o==="item"){var c,l=r.touches[0];if(document.elementFromPoint==null||l==null)return;var u=document.elementFromPoint(l.clientX,l.clientY);if(!u||!u.getAttribute)return;var d=u.getAttribute(YF),f=(c=u.getAttribute(XF))!==null&&c!==void 0?c:void 0,m=zi(n).find(v=>v.id===f);if(d==null||m==null||f==null)return;var{dataKey:g}=m,x=zY(n,d,f);t.dispatch(NC({activeDataKey:g,activeIndex:d,activeCoordinate:x,activeGraphicalItemId:f}))}}}});var NY=Ek({brush:SV,cartesianAxis:iV,chartData:LH,errorBars:bK,graphicalItems:M7,layout:OF,legend:q3,options:RH,polarAxis:a7,polarOptions:LY,referenceElements:OV,rootProps:DY,tooltip:Jq,zIndex:yH}),BY=function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"Chart";return tF({reducer:NY,preloadedState:t,middleware:n=>{var o;return n({serializableCheck:!1,immutableCheck:!["commonjs","es6","production"].includes((o="es6")!==null&&o!==void 0?o:"")}).concat([oA.middleware,iA.middleware,ex.middleware,dA.middleware,hA.middleware])},enhancers:n=>{var o=n;return typeof n=="function"&&(o=n()),o.concat(Fk({type:"raf"}))},devTools:{serialize:{replacer:IY},name:"recharts-".concat(r)}})};function FY(e){var{preloadedState:t,children:r,reduxStoreName:n}=e,o=Nt(),a=p.useRef(null);if(o)return r;a.current==null&&(a.current=BY(t,n));var s=eg;return p.createElement(YK,{context:s,store:a.current},r)}function UY(e){var{layout:t,margin:r}=e,n=Xe(),o=Nt();return p.useEffect(()=>{o||(n(CF(t)),n(EF(r)))},[n,o,t,r]),null}var qY=p.memo(UY,yd);function WY(e){var t=Xe();return p.useEffect(()=>{t(_Y(e))},[t,e]),null}function Qw(e){var{zIndex:t,isPanorama:r}=e,n=p.useRef(null),o=Xe();return p.useLayoutEffect(()=>(n.current&&o(xH({zIndex:t,element:n.current,isPanorama:r})),()=>{o(vH({zIndex:t,isPanorama:r}))}),[o,t,r]),p.createElement("g",{tabIndex:-1,ref:n})}function e$(e){var{children:t,isPanorama:r}=e,n=ue(sH);if(!n||n.length===0)return t;var o=n.filter(s=>s<0),a=n.filter(s=>s>0);return p.createElement(p.Fragment,null,o.map(s=>p.createElement(Qw,{key:s,zIndex:s,isPanorama:r})),t,a.map(s=>p.createElement(Qw,{key:s,zIndex:s,isPanorama:r})))}var HY=["children"];function VY(e,t){if(e==null)return{};var r,n,o=KY(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function KY(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}function hl(){return hl=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},hl.apply(null,arguments)}var GY={width:"100%",height:"100%",display:"block"},YY=p.forwardRef((e,t)=>{var r=ug(),n=hg(),o=gE();if(!cn(r)||!cn(n))return null;var{children:a,otherAttributes:s,title:c,desc:l}=e,u,d;return s!=null&&(typeof s.tabIndex=="number"?u=s.tabIndex:u=o?0:void 0,typeof s.role=="string"?d=s.role:d=o?"application":void 0),p.createElement(Km,hl({},s,{title:c,desc:l,role:d,tabIndex:u,width:r,height:n,style:GY,ref:t}),a)}),XY=e=>{var{children:t}=e,r=ue(Jl);if(!r)return null;var{width:n,height:o,y:a,x:s}=r;return p.createElement(Km,{width:n,height:o,x:s,y:a},t)},t$=p.forwardRef((e,t)=>{var{children:r}=e,n=VY(e,HY),o=Nt();return o?p.createElement(XY,null,p.createElement(e$,{isPanorama:!0},r)):p.createElement(YY,hl({ref:t},n),p.createElement(e$,{isPanorama:!1},r))});function ZY(){var e=Xe(),[t,r]=p.useState(null),n=ue(GF);return p.useEffect(()=>{if(t!=null){var o=t.getBoundingClientRect(),a=o.width/t.offsetWidth;Ye(a)&&a!==n&&e(AF(a))}},[t,e,n]),r}function r$(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function JY(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?r$(Object(r),!0).forEach(function(n){QY(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):r$(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function QY(e,t,r){return(t=eX(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function eX(e){var t=tX(e,"string");return typeof t=="symbol"?t:t+""}function tX(e,t){if(typeof e!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Fo(){return Fo=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Fo.apply(null,arguments)}var rX=()=>(HH(),null);function fl(e){if(typeof e=="number")return e;if(typeof e=="string"){var t=parseFloat(e);if(!Number.isNaN(t))return t}return 0}var nX=p.forwardRef((e,t)=>{var r,n,o=p.useRef(null),[a,s]=p.useState({containerWidth:fl((r=e.style)===null||r===void 0?void 0:r.width),containerHeight:fl((n=e.style)===null||n===void 0?void 0:n.height)}),c=p.useCallback((u,d)=>{s(f=>{var m=Math.round(u),g=Math.round(d);return f.containerWidth===m&&f.containerHeight===g?f:{containerWidth:m,containerHeight:g}})},[]),l=p.useCallback(u=>{if(typeof t=="function"&&t(u),u!=null&&typeof ResizeObserver<"u"){var{width:d,height:f}=u.getBoundingClientRect();c(d,f);var m=x=>{var{width:v,height:b}=x[0].contentRect;c(v,b)},g=new ResizeObserver(m);g.observe(u),o.current=g}},[t,c]);return p.useEffect(()=>()=>{var u=o.current;u?.disconnect()},[c]),p.createElement(p.Fragment,null,p.createElement(ed,{width:a.containerWidth,height:a.containerHeight}),p.createElement("div",Fo({ref:l},e)))}),oX=p.forwardRef((e,t)=>{var{width:r,height:n}=e,[o,a]=p.useState({containerWidth:fl(r),containerHeight:fl(n)}),s=p.useCallback((l,u)=>{a(d=>{var f=Math.round(l),m=Math.round(u);return d.containerWidth===f&&d.containerHeight===m?d:{containerWidth:f,containerHeight:m}})},[]),c=p.useCallback(l=>{if(typeof t=="function"&&t(l),l!=null){var{width:u,height:d}=l.getBoundingClientRect();s(u,d)}},[t,s]);return p.createElement(p.Fragment,null,p.createElement(ed,{width:o.containerWidth,height:o.containerHeight}),p.createElement("div",Fo({ref:c},e)))}),iX=p.forwardRef((e,t)=>{var{width:r,height:n}=e;return p.createElement(p.Fragment,null,p.createElement(ed,{width:r,height:n}),p.createElement("div",Fo({ref:t},e)))}),aX=p.forwardRef((e,t)=>{var{width:r,height:n}=e;return jn(r)||jn(n)?p.createElement(oX,Fo({},e,{ref:t})):p.createElement(iX,Fo({},e,{ref:t}))});function sX(e){return e===!0?nX:aX}var cX=p.forwardRef((e,t)=>{var{children:r,className:n,height:o,onClick:a,onContextMenu:s,onDoubleClick:c,onMouseDown:l,onMouseEnter:u,onMouseLeave:d,onMouseMove:f,onMouseUp:m,onTouchEnd:g,onTouchMove:x,onTouchStart:v,style:b,width:E,responsive:w,dispatchTouchEvents:j=!0}=e,S=p.useRef(null),y=Xe(),[k,$]=p.useState(null),[C,P]=p.useState(null),z=ZY(),_=dg(),N=_?.width>0?_.width:E,R=_?.height>0?_.height:o,F=p.useCallback(G=>{z(G),typeof t=="function"&&t(G),$(G),P(G),G!=null&&(S.current=G)},[z,t,$,P]),O=p.useCallback(G=>{y(nA(G)),y(mr({handler:a,reactEvent:G}))},[y,a]),D=p.useCallback(G=>{y(fm(G)),y(mr({handler:u,reactEvent:G}))},[y,u]),A=p.useCallback(G=>{y(BC()),y(mr({handler:d,reactEvent:G}))},[y,d]),M=p.useCallback(G=>{y(fm(G)),y(mr({handler:f,reactEvent:G}))},[y,f]),I=p.useCallback(()=>{y(lA())},[y]),T=p.useCallback(G=>{y(cA(G.key))},[y]),B=p.useCallback(G=>{y(mr({handler:s,reactEvent:G}))},[y,s]),X=p.useCallback(G=>{y(mr({handler:c,reactEvent:G}))},[y,c]),ie=p.useCallback(G=>{y(mr({handler:l,reactEvent:G}))},[y,l]),Z=p.useCallback(G=>{y(mr({handler:m,reactEvent:G}))},[y,m]),q=p.useCallback(G=>{y(mr({handler:v,reactEvent:G}))},[y,v]),W=p.useCallback(G=>{j&&y(uA(G)),y(mr({handler:x,reactEvent:G}))},[y,j,x]),J=p.useCallback(G=>{y(mr({handler:g,reactEvent:G}))},[y,g]),L=sX(w);return p.createElement(aP.Provider,{value:k},p.createElement(ok.Provider,{value:C},p.createElement(L,{width:N??b?.width,height:R??b?.height,className:Te("recharts-wrapper",n),style:JY({position:"relative",cursor:"default",width:N,height:R},b),onClick:O,onContextMenu:B,onDoubleClick:X,onFocus:I,onKeyDown:T,onMouseDown:ie,onMouseEnter:D,onMouseLeave:A,onMouseMove:M,onMouseUp:Z,onTouchEnd:J,onTouchMove:W,onTouchStart:q,ref:F},p.createElement(rX,null),r)))}),lX=["width","height","responsive","children","className","style","compact","title","desc"];function dX(e,t){if(e==null)return{};var r,n,o=uX(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)===-1&&{}.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function uX(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)!==-1)continue;r[n]=e[n]}return r}var hX=p.forwardRef((e,t)=>{var{width:r,height:n,responsive:o,children:a,className:s,style:c,compact:l,title:u,desc:d}=e,f=dX(e,lX),m=zr(f);return l?p.createElement(p.Fragment,null,p.createElement(ed,{width:r,height:n}),p.createElement(t$,{otherAttributes:m,title:u,desc:d},a)):p.createElement(cX,{className:s,style:c,width:r,height:n,responsive:o??!1,onClick:e.onClick,onMouseLeave:e.onMouseLeave,onMouseEnter:e.onMouseEnter,onMouseMove:e.onMouseMove,onMouseDown:e.onMouseDown,onMouseUp:e.onMouseUp,onContextMenu:e.onContextMenu,onDoubleClick:e.onDoubleClick,onTouchStart:e.onTouchStart,onTouchMove:e.onTouchMove,onTouchEnd:e.onTouchEnd},p.createElement(t$,{otherAttributes:m,title:u,desc:d,ref:t},p.createElement(TV,null,a)))});function pm(){return pm=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},pm.apply(null,arguments)}var fX={top:5,right:5,bottom:5,left:5},pX={accessibilityLayer:!0,barCategoryGap:"10%",barGap:4,layout:"horizontal",margin:fX,responsive:!1,reverseStackOrder:!1,stackOffset:"none",syncMethod:"index"},fA=p.forwardRef(function(t,r){var n,o=Ot(t.categoricalChartProps,pX),{chartName:a,defaultTooltipEventType:s,validateTooltipEventTypes:c,tooltipPayloadSearcher:l,categoricalChartProps:u}=t,d={chartName:a,defaultTooltipEventType:s,validateTooltipEventTypes:c,tooltipPayloadSearcher:l,eventEmitter:void 0};return p.createElement(FY,{preloadedState:{options:d},reduxStoreName:(n=u.id)!==null&&n!==void 0?n:a},p.createElement($V,{chartData:u.data}),p.createElement(qY,{layout:o.layout,margin:o.margin}),p.createElement(WY,{baseValue:o.baseValue,accessibilityLayer:o.accessibilityLayer,barCategoryGap:o.barCategoryGap,maxBarSize:o.maxBarSize,stackOffset:o.stackOffset,barGap:o.barGap,barSize:o.barSize,syncId:o.syncId,syncMethod:o.syncMethod,className:o.className,reverseStackOrder:o.reverseStackOrder}),p.createElement(hX,pm({},o,{ref:r})))}),mX=["axis"],gX=p.forwardRef((e,t)=>p.createElement(fA,{chartName:"LineChart",defaultTooltipEventType:"axis",validateTooltipEventTypes:mX,tooltipPayloadSearcher:sP,categoricalChartProps:e,ref:t})),xX=["axis","item"],vX=p.forwardRef((e,t)=>p.createElement(fA,{chartName:"BarChart",defaultTooltipEventType:"axis",validateTooltipEventTypes:xX,tooltipPayloadSearcher:sP,categoricalChartProps:e,ref:t}));const n$="#E8714A",o$="#3B82F6",i$="#10B981",a$="#EF4444",yX=()=>{const{checkRole:e}=Ml(),t=e("MASTER"),[r,n]=p.useState([]),[o,a]=p.useState(!0),[s,c]=p.useState(null),[l,u]=p.useState(!1),[d,f]=p.useState(null),[m,g]=p.useState({newUsers:0,newPosts:0,newCareRequests:0,newMeetups:0,meetupParticipants:0,newReports:0,activeUsers:0,totalRevenue:0});p.useEffect(()=>{x()},[]);const x=async()=>{try{a(!0);const b=await ry.fetchDailyStatistics();if(n(b),b.length>0){const E=b[b.length-1];g({newUsers:E.newUsers,newPosts:E.newPosts,newCareRequests:E.newCareRequests,newMeetups:E.newMeetups??0,meetupParticipants:E.meetupParticipants??0,newReports:E.newReports??0,activeUsers:E.activeUsers,totalRevenue:E.totalRevenue})}}catch(b){console.error("Failed to fetch dashboard stats:",b),c("통계 데이터를 불러오는데 실패했습니다.")}finally{a(!1)}},v=async()=>{if(t)try{u(!0),f(null);const b=await ry.initStatistics(30);f(b),await x()}catch(b){console.error("Failed to init statistics:",b),f(b?.response?.data?.message||"통계 집계에 실패했습니다.")}finally{u(!1)}};return o?i.jsx(kX,{children:"데이터를 불러오는 중..."}):s?i.jsx(EX,{children:s}):i.jsxs(bX,{children:[i.jsxs(On,{children:[i.jsxs(wX,{children:[i.jsxs("div",{children:[i.jsx(Rn,{children:"전체 시스템 대시보드"}),i.jsx(Tn,{children:"일/주/월 기준 주요 지표를 한눈에 확인합니다."})]}),t&&i.jsx($X,{onClick:v,disabled:l,children:l?"집계 중...":"통계 수동 집계"})]}),d&&i.jsx(SX,{$success:!d.includes("실패"),children:d})]}),i.jsxs(Hm,{children:[i.jsxs(Ft,{children:[i.jsx(Ut,{children:"신규 가입자 (오늘)"}),i.jsxs(qt,{$accent:!0,children:[m.newUsers,"명"]})]}),i.jsxs(Ft,{children:[i.jsx(Ut,{children:"활성 사용자 (DAU)"}),i.jsxs(qt,{$accent:!0,children:[m.activeUsers,"명"]})]}),i.jsxs(Ft,{children:[i.jsx(Ut,{children:"새 게시글"}),i.jsxs(qt,{children:[m.newPosts,"개"]})]}),i.jsxs(Ft,{children:[i.jsx(Ut,{children:"새 케어 요청"}),i.jsxs(qt,{children:[m.newCareRequests,"건"]})]}),i.jsxs(Ft,{children:[i.jsx(Ut,{children:"새 모임"}),i.jsxs(qt,{children:[m.newMeetups,"개"]})]}),i.jsxs(Ft,{children:[i.jsx(Ut,{children:"모임 참여"}),i.jsxs(qt,{children:[m.meetupParticipants,"명"]})]}),i.jsxs(Ft,{children:[i.jsx(Ut,{children:"신규 신고"}),i.jsxs(qt,{children:[m.newReports,"건"]})]}),i.jsxs(Ft,{children:[i.jsx(Ut,{children:"오늘 매출 (예상)"}),i.jsxs(qt,{children:["₩ ",(m.totalRevenue??0).toLocaleString()]})]})]}),i.jsxs(jX,{children:[i.jsxs(s$,{children:[i.jsx(c$,{children:"서비스 성장 추이 (최근 30일)"}),i.jsx(Ob,{width:"100%",height:300,children:i.jsxs(gX,{data:r,children:[i.jsx(sm,{strokeDasharray:"3 3"}),i.jsx(um,{dataKey:"statDate"}),i.jsx(kc,{yAxisId:"left"}),i.jsx(kc,{yAxisId:"right",orientation:"right"}),i.jsx(Z0,{}),i.jsx(Wp,{}),i.jsx(ya,{yAxisId:"left",type:"monotone",dataKey:"newUsers",name:"신규 가입",stroke:n$,activeDot:{r:8}}),i.jsx(ya,{yAxisId:"left",type:"monotone",dataKey:"newMeetups",name:"새 모임",stroke:o$}),i.jsx(ya,{yAxisId:"right",type:"monotone",dataKey:"activeUsers",name:"활성 유저",stroke:i$}),i.jsx(ya,{yAxisId:"right",type:"monotone",dataKey:"newReports",name:"신고",stroke:a$})]})})]}),i.jsxs(s$,{children:[i.jsx(c$,{children:"서비스 활성화 (최근 30일)"}),i.jsx(Ob,{width:"100%",height:300,children:i.jsxs(vX,{data:r,children:[i.jsx(sm,{strokeDasharray:"3 3"}),i.jsx(um,{dataKey:"statDate"}),i.jsx(kc,{}),i.jsx(Z0,{}),i.jsx(Wp,{}),i.jsx(ba,{dataKey:"newPosts",name:"게시글",stackId:"a",fill:n$}),i.jsx(ba,{dataKey:"newCareRequests",name:"케어 요청",stackId:"a",fill:o$}),i.jsx(ba,{dataKey:"newMeetups",name:"모임",stackId:"a",fill:i$}),i.jsx(ba,{dataKey:"newReports",name:"신고",stackId:"a",fill:a$})]})})]})]})]})},bX=h.div``,wX=h.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${e=>e.theme.spacing.md};
  flex-wrap: wrap;
`,$X=h.button`
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,SX=h.div`
  margin-top: ${e=>e.theme.spacing.sm};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.sm};
  font-size: ${e=>e.theme.typography.caption.fontSize};
  background: ${e=>e.$success?"rgba(34, 197, 94, 0.1)":"rgba(239, 68, 68, 0.1)"};
  color: ${e=>e.$success?e.theme.colors.success||"#16a34a":e.theme.colors.error};
`,jX=h.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${e=>e.theme.spacing.xl};
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`,s$=h.div`
  background: ${e=>e.theme.colors.surface};
  padding: ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.lg};
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`,c$=h.h3`
  font-size: ${e=>e.theme.typography.h4.fontSize};
  margin-bottom: ${e=>e.theme.spacing.lg};
  color: ${e=>e.theme.colors.text};
`,kX=h.div`
  padding: 2rem;
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
`,EX=h.div`
  padding: 2rem;
  text-align: center;
  color: ${e=>e.theme.colors.error};
`,CX=()=>{const{requireAdmin:e}=Ml(),[t,r]=p.useState(!1),[n,o]=p.useState("dashboard");p.useEffect(()=>{const{requiresModal:l}=e();l&&r(!0)},[e]);const{isAdmin:a}=e();if(!a)return i.jsxs(i.Fragment,{children:[i.jsx(ek,{isOpen:t,onClose:()=>r(!1)}),i.jsx(l$,{children:i.jsxs(d$,{children:[i.jsx(u$,{children:"🔧 관리자 패널"}),i.jsx(h$,{children:"접근 권한이 없습니다."})]})})]});const s=[{key:"dashboard",label:"전체 대시보드",description:"오늘/이번 주 시스템 주요 지표 요약"},{key:"users",label:"사용자 관리",description:"사용자 목록, 권한, 정지 관리"},{key:"reports",label:"신고 관리",description:"신고 처리 및 조치 기록 관리"},{key:"community",label:"커뮤니티 관리",description:"게시글/댓글/인기 게시글 모니터링"},{key:"missing-pets",label:"실종/목격 관리",description:"실종/목격 게시글 및 댓글 관리"},{key:"care",label:"케어 서비스 관리",description:"케어 요청/지원자/후기 관리"},{key:"location-services",label:"지역 서비스 관리",description:"장소, 리뷰, 캐시 관리"},{key:"meetups",label:"산책 모임 관리",description:"모임 및 참여자 관리"},{key:"files",label:"파일 관리",description:"업로드 파일 및 연결 정보 관리"}],c=()=>{switch(n){case"users":return i.jsx(PB,{});case"reports":return i.jsx(t6,{});case"community":return i.jsx(i6,{});case"missing-pets":return i.jsx(l6,{});case"care":return i.jsx(m6,{});case"location-services":return i.jsx(v6,{});case"meetups":return i.jsx(_6,{});case"files":return i.jsx(V6,{});case"dashboard":default:return i.jsx(yX,{})}};return i.jsx(i.Fragment,{children:i.jsxs(l$,{children:[i.jsxs(d$,{children:[i.jsx(u$,{children:"🔧 관리자 패널"}),i.jsx(h$,{children:"Petory 운영을 위한 관리자 도구 모음"})]}),i.jsx(gB,{menuItems:s,activeKey:n,onChange:o,children:c()})]})})},l$=h.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${e=>e.theme.spacing.xxl} ${e=>e.theme.spacing.lg};
`,d$=h.div`
  margin-bottom: ${e=>e.theme.spacing.xl};
  text-align: center;
`,u$=h.h1`
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.h1.fontSize};
  font-weight: ${e=>e.theme.typography.h1.fontWeight};
  margin-bottom: ${e=>e.theme.spacing.sm};
`,h$=h.p`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body1.fontSize};
`,PX=()=>{const[e,t]=p.useState(!1),[r,n]=p.useState(!1);p.useEffect(()=>{const s=()=>{const c=window.pageYOffset||document.documentElement.scrollTop,l=window.innerHeight,d=document.documentElement.scrollHeight-(c+l);t(c>300),n(d>300)};return window.addEventListener("scroll",s),s(),()=>{window.removeEventListener("scroll",s)}},[]);const o=()=>{window.scrollTo({top:0,behavior:"smooth"})},a=()=>{window.scrollTo({top:document.documentElement.scrollHeight,behavior:"smooth"})};return!e&&!r?null:i.jsxs(AX,{children:[e&&i.jsx(f$,{top:!0,onClick:o,"aria-label":"맨 위로",children:i.jsx(p$,{children:"↑"})}),r&&i.jsx(f$,{bottom:!0,onClick:a,"aria-label":"맨 아래로",children:i.jsx(p$,{children:"↓"})})]})},AX=h.div`
  position: fixed;
  bottom: calc(24px + 56px + 12px);
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 998;

  @media (max-width: 768px) {
    bottom: calc(60px + 16px + env(safe-area-inset-bottom, 0px));
    left: max(16px, env(safe-area-inset-left, 0px));
    right: auto;
    gap: 6px;
  }
`,f$=h.button`
  width: 44px;
  height: 44px;
  background: ${e=>e.theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.full};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    transform: translateY(${e=>e.top?"-2px":"2px"});
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
`,p$=h.span`
  display: flex;
  align-items: center;
  justify-content: center;
`,tx=e=>{const{user:t}=dt();return{checkAndRedirect:p.useCallback(()=>{if(!t)return!1;if(t.emailVerified===!0||t.email_verified===!0||t.verified===!0)return!0;const a=window.location.pathname+window.location.search,s=`/email-verification?redirect=${encodeURIComponent(a)}${e?`&purpose=${e}`:""}`;return window.location.href=s,!1},[t,e]),EmailVerificationPromptComponent:()=>null}},OX="http://localhost:8080/api",RX=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),TX=se.create({baseURL:OX,headers:{"Content-Type":"application/json"}});TX.interceptors.request.use(e=>{const t=RX();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const IX=37.5665,DX=126.978,Uh="서울특별시 중구 세종대로 110",Bi={addressToCoordinates:async e=>({success:!0,latitude:IX,longitude:DX,address:e||Uh}),coordinatesToAddress:async(e,t)=>({success:!0,address:Uh,roadAddress:Uh}),getDirections:async(e,t,r,n,o="traoptimal")=>({success:!0,data:null})},pA=({onAddressSelect:e,initialAddress:t,initialLat:r,initialLng:n})=>{const[o,a]=p.useState(t||""),[s,c]=p.useState(!1),l=async()=>{if(o.trim()){c(!0);try{const u=o.trim(),d=await Bi.addressToCoordinates(u);if(d.success&&d.latitude&&d.longitude){const f=d.latitude,m=d.longitude,g=d.address||u;a(g),e&&e({address:g,latitude:f,longitude:m})}else alert("주소를 찾을 수 없습니다. 더 구체적인 주소로 검색해주세요.")}catch(u){console.error("주소 검색 실패:",u),alert("주소를 찾을 수 없습니다.")}finally{c(!1)}}};return i.jsxs(_X,{children:[i.jsxs(LX,{children:[i.jsx(MX,{type:"text",value:o,onChange:u=>a(u.target.value),placeholder:"주소를 입력하세요",onKeyPress:u=>{u.key==="Enter"&&(u.preventDefault(),l())}}),i.jsx(zX,{type:"button",onClick:l,disabled:s,children:s?"검색 중...":"검색"})]}),s&&i.jsx(NX,{children:"주소를 검색하는 중..."}),o&&!s&&i.jsxs(BX,{children:[i.jsx(FX,{children:"선택된 위치:"}),i.jsx(UX,{children:o})]}),i.jsx(qX,{children:"주소를 입력하고 검색 버튼을 클릭하세요"})]})},_X=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};
`,LX=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.sm};
`,MX=h.input`
  flex: 1;
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surfaceElevated};
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 126, 54, 0.2);
  }
`,zX=h.button`
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.primary};
  background: ${e=>e.theme.colors.primary};
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,NX=h.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 0.9rem;
`,BX=h.div`
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.surfaceElevated};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 4px;
`,FX=h.span`
  font-size: 0.8rem;
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: 600;
`,UX=h.span`
  font-size: 0.95rem;
  color: ${e=>e.theme.colors.text};
  font-weight: 500;
`;h.div`
  width: 100%;
  height: 400px;
  border-radius: ${e=>e.theme.borderRadius.lg};
  overflow: hidden;
  border: 1px solid ${e=>e.theme.colors.border};
`;const qX=h.span`
  font-size: 0.85rem;
  color: ${e=>e.theme.colors.textSecondary};
`,qh={title:"",content:"",petName:"",species:"",breed:"",gender:"",age:"",color:"",lostDate:"",lostLocation:"",latitude:"",longitude:"",imageUrl:""},WX=({isOpen:e,onClose:t,onSubmit:r,initialData:n,loading:o,currentUser:a})=>{const[s,c]=p.useState(qh),[l,u]=p.useState(!1),[d,f]=p.useState(""),[m,g]=p.useState([]),[x,v]=p.useState(null),[b,E]=p.useState(!1),[w,j]=p.useState(!1),[S,y]=p.useState(null),[k,$]=p.useState({hour:"12",minute:"00"}),[C,P]=p.useState({top:0,left:0}),z=p.useRef(null);p.useEffect(()=>{a&&e&&(async()=>{try{E(!0);const B=await si.getMyPets();g(B.data||[])}catch(B){console.error("펫 목록 조회 실패:",B)}finally{E(!1)}})()},[a,e]),p.useEffect(()=>{n?c({...qh,...n,lostDate:n.lostDate||""}):(c(qh),v(null)),f(""),u(!1)},[n,e]),p.useEffect(()=>{if(s.lostDate){const T=new Date(s.lostDate);y(T),$({hour:String(T.getHours()).padStart(2,"0"),minute:String(T.getMinutes()).padStart(2,"0")})}else{const T=new Date;y(T),$({hour:String(T.getHours()).padStart(2,"0"),minute:String(T.getMinutes()).padStart(2,"0")})}},[s.lostDate]);const _=T=>{if(T&&(T.preventDefault(),T.stopPropagation()),!w){const Z=(window.innerWidth-320)/2+window.scrollX,q=(window.innerHeight-400)/2+window.scrollY-50;P({top:Math.max(8,q),left:Math.max(8,Z)})}j(!w)};p.useEffect(()=>{const T=B=>{w&&!B.target.closest(".date-picker-wrapper")&&!B.target.closest(".date-picker-dropdown")&&j(!1)};if(w)return document.addEventListener("mousedown",T),()=>{document.removeEventListener("mousedown",T)}},[w]);const N=T=>{if(!T)return"";const B=new Date(T);if(isNaN(B.getTime()))return"";const X=B.getFullYear(),ie=B.getMonth()+1,Z=B.getDate(),q=B.getHours(),W=B.getMinutes(),J=q>=12?"오후":"오전",L=q>12?q-12:q===0?12:q;return`${X}년 ${ie}월 ${Z}일 ${J} ${L}:${String(W).padStart(2,"0")}`},R=T=>{const B=T.getFullYear(),X=T.getMonth(),ie=new Date(B,X,1),Z=new Date(ie);Z.setDate(Z.getDate()-Z.getDay());const q=[],W=new Date(Z);for(let J=0;J<42;J++)q.push(new Date(W)),W.setDate(W.getDate()+1);return q},F=T=>{const B=parseInt(k.hour)||0,X=parseInt(k.minute)||0,ie=new Date(T.getFullYear(),T.getMonth(),T.getDate());ie.setHours(B,X,0,0),y(ie),$({hour:String(B).padStart(2,"0"),minute:String(X).padStart(2,"0")});const Z=`${ie.getFullYear()}-${String(ie.getMonth()+1).padStart(2,"0")}-${String(ie.getDate()).padStart(2,"0")}`;c(q=>({...q,lostDate:Z}))},O=(T,B)=>{let X=S;if(!X&&s.lostDate&&(X=new Date(s.lostDate)),!X){const L=new Date;y(L),$({hour:String(L.getHours()).padStart(2,"0"),minute:String(L.getMinutes()).padStart(2,"0")});return}const ie=new Date(X.getFullYear(),X.getMonth(),X.getDate());let Z=parseInt(k.hour)||0,q=parseInt(k.minute)||0;T==="hour"?Z=Math.max(0,Math.min(23,parseInt(B)||0)):T==="minute"&&(q=Math.max(0,Math.min(59,parseInt(B)||0)));const W=new Date(ie);W.setHours(Z,q,0,0),y(W),$({hour:String(Z).padStart(2,"0"),minute:String(q).padStart(2,"0")});const J=`${W.getFullYear()}-${String(W.getMonth()+1).padStart(2,"0")}-${String(W.getDate()).padStart(2,"0")}`;c(L=>({...L,lostDate:J}))};if(p.useEffect(()=>{if(x&&m.length>0){const T=m.find(B=>B.idx===x);T&&c(B=>({...B,petName:T.petName||B.petName,species:T.petType==="DOG"?"개":T.petType==="CAT"?"고양이":T.petType==="BIRD"?"새":T.petType==="RABBIT"?"토끼":T.petType==="HAMSTER"?"햄스터":T.petType||B.species,breed:T.breed||B.breed,gender:T.gender||B.gender,age:T.age||B.age,color:T.color||B.color,imageUrl:T.profileImageUrl||B.imageUrl}))}},[x,m]),!e)return null;const D=T=>{const{name:B,value:X}=T.target;c(ie=>({...ie,[B]:X})),B==="imageUrl"&&f("")},A=async T=>{const B=T.target.files?.[0];if(B){f(""),u(!0);try{const X=await Xa.uploadImage(B,{category:"missing-pets",ownerType:a?"user":"guest",ownerId:a?.idx??void 0,entityId:n?.idx??void 0});c(ie=>({...ie,imageUrl:X.url}))}catch(X){const ie=X.response?.data?.error||X.message||"이미지 업로드 중 문제가 발생했습니다.";f(ie)}finally{u(!1),T.target&&(T.target.value="")}}},M=()=>{c(T=>({...T,imageUrl:""})),f("")},I=T=>{T.preventDefault(),r(s)};return i.jsx(HX,{children:i.jsxs(VX,{children:[i.jsxs(KX,{children:[i.jsx(GX,{children:"실종 제보 등록"}),i.jsx(YX,{type:"button",onClick:t,children:"✕"})]}),i.jsx(XX,{children:i.jsxs(ZX,{children:[i.jsx(JX,{children:i.jsxs(uZ,{onSubmit:I,children:[i.jsxs(Wh,{children:[i.jsx(Hh,{children:"기본 정보"}),i.jsxs(m$,{columns:2,children:[i.jsxs(Xr,{children:[i.jsx(Zr,{children:"제목 *"}),i.jsx(yo,{name:"title",value:s.title,onChange:D,required:!0,placeholder:"제보 제목을 입력하세요"})]}),i.jsxs(Xr,{children:[i.jsx(Zr,{children:"실종일"}),i.jsx(CZ,{className:"date-picker-wrapper",children:i.jsxs(PZ,{ref:z,type:"button",onClick:_,hasValue:!!s.lostDate,children:[s.lostDate?N(s.lostDate+"T"+k.hour+":"+k.minute):"날짜와 시간을 선택해주세요",i.jsx(AZ,{children:"📅"})]})}),w&&i.jsx(OZ,{className:"date-picker-dropdown",style:{top:`${C.top}px`,left:`${C.left}px`},children:i.jsxs(RZ,{children:[i.jsxs(TZ,{children:[i.jsx(g$,{type:"button",onClick:T=>{T.preventDefault(),T.stopPropagation();const B=S||new Date,X=new Date(B.getFullYear(),B.getMonth()-1,1);y(X)},children:"‹"}),i.jsx(IZ,{children:S?`${S.getFullYear()}년 ${S.getMonth()+1}월`:`${new Date().getFullYear()}년 ${new Date().getMonth()+1}월`}),i.jsx(g$,{type:"button",onClick:T=>{T.preventDefault(),T.stopPropagation();const B=S||new Date,X=new Date(B.getFullYear(),B.getMonth()+1,1);y(X)},children:"›"})]}),i.jsxs(DZ,{children:[["일","월","화","수","목","금","토"].map(T=>i.jsx(_Z,{children:T},T)),R(S||new Date).map((T,B)=>{const X=new Date(T.getFullYear(),T.getMonth(),T.getDate()),ie=X.getTime()===new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime(),Z=S&&X.getTime()===new Date(S.getFullYear(),S.getMonth(),S.getDate()).getTime(),q=T.getMonth()===(S||new Date).getMonth();return i.jsx(LZ,{type:"button",isToday:ie,isSelected:Z,isCurrentMonth:q,onClick:W=>{W.preventDefault(),W.stopPropagation(),q&&F(T)},children:T.getDate()},B)})]}),i.jsxs(MZ,{children:[i.jsx(zZ,{children:"시간 선택:"}),i.jsxs(NZ,{children:[i.jsx(x$,{type:"number",min:"0",max:"23",value:k.hour,onChange:T=>{T.preventDefault(),T.stopPropagation(),O("hour",T.target.value)},onBlur:T=>{(T.target.value===""||parseInt(T.target.value)<0)&&O("hour","0")}}),i.jsx(BZ,{children:":"}),i.jsx(x$,{type:"number",min:"0",max:"59",value:k.minute,onChange:T=>{T.preventDefault(),T.stopPropagation(),O("minute",T.target.value)},onBlur:T=>{(T.target.value===""||parseInt(T.target.value)<0)&&O("minute","0")}})]})]}),i.jsx(FZ,{children:i.jsx(UZ,{onClick:()=>j(!1),children:"확인"})})]})})]}),i.jsxs(Xr,{children:[i.jsx(Zr,{children:"반려동물 이름"}),i.jsx(yo,{name:"petName",value:s.petName,onChange:D,placeholder:"예: 초코"})]}),i.jsxs(Xr,{children:[i.jsx(Zr,{children:"동물 종"}),i.jsx(yo,{name:"species",value:s.species,onChange:D,placeholder:"예: 개, 고양이"})]}),i.jsxs(Xr,{children:[i.jsx(Zr,{children:"품종"}),i.jsx(yo,{name:"breed",value:s.breed,onChange:D,placeholder:"예: 말티즈"})]}),i.jsxs(Xr,{children:[i.jsx(Zr,{children:"색상"}),i.jsx(yo,{name:"color",value:s.color,onChange:D,placeholder:"예: 크림색"})]}),i.jsxs(Xr,{children:[i.jsx(Zr,{children:"성별"}),i.jsxs(hZ,{name:"gender",value:s.gender,onChange:D,children:[i.jsx("option",{value:"",children:"선택"}),i.jsx("option",{value:"M",children:"수컷"}),i.jsx("option",{value:"F",children:"암컷"})]})]}),i.jsxs(Xr,{children:[i.jsx(Zr,{children:"나이"}),i.jsx(yo,{name:"age",value:s.age,onChange:D,placeholder:"예: 3살 추정"})]})]})]}),i.jsxs(Wh,{children:[i.jsx(Hh,{children:"실종 위치"}),i.jsxs(m$,{columns:1,children:[i.jsxs(Xr,{children:[i.jsx(Zr,{children:"실종 위치 (지도에서 선택)"}),i.jsx(pA,{onAddressSelect:T=>{c(B=>({...B,lostLocation:T.address,latitude:T.latitude,longitude:T.longitude}))},initialAddress:s.lostLocation,initialLat:s.latitude,initialLng:s.longitude})]}),i.jsxs(Xr,{children:[i.jsx(Zr,{children:"대표 이미지"}),i.jsxs(pZ,{children:[i.jsx(gZ,{id:"missing-pet-image-upload",type:"file",accept:"image/*",onChange:A}),i.jsxs(mZ,{children:[i.jsx(xZ,{htmlFor:"missing-pet-image-upload",$disabled:l,children:l?"업로드 중...":"이미지 선택"}),s.imageUrl&&i.jsx(vZ,{type:"button",onClick:M,children:"이미지 삭제"})]}),i.jsx(yZ,{children:"이미지 파일을 업로드하거나 직접 링크를 입력할 수 있어요. (JPG, PNG 등)"}),d&&i.jsx(bZ,{children:d}),i.jsx(wZ,{type:"url",name:"imageUrl",value:s.imageUrl,onChange:D,placeholder:"직접 이미지 링크 입력 (선택 사항)"})]}),s.imageUrl&&i.jsx($Z,{children:i.jsx(SZ,{src:s.imageUrl,alt:"대표 이미지 미리보기"})})]})]})]}),i.jsxs(Wh,{children:[i.jsx(Hh,{children:"상세 설명 *"}),i.jsx(fZ,{name:"content",value:s.content,onChange:D,placeholder:"실종 당시 상황, 특징, 목격 정보 등 상세 내용을 작성해주세요.",required:!0,rows:6})]}),i.jsxs(jZ,{children:[i.jsx(EZ,{type:"button",onClick:t,children:"취소"}),i.jsx(kZ,{type:"submit",disabled:o,children:o?"등록 중...":"등록"})]})]})}),i.jsxs(QX,{children:[i.jsx(eZ,{children:"반려동물 정보"}),b?i.jsx(lZ,{children:"펫 정보를 불러오는 중..."}):m.length===0?i.jsx(dZ,{children:"등록된 반려동물이 없습니다."}):i.jsxs(i.Fragment,{children:[i.jsxs(tZ,{value:x||"",onChange:T=>v(T.target.value?Number(T.target.value):null),children:[i.jsx("option",{value:"",children:"펫 선택 (선택사항)"}),m.map(T=>i.jsxs("option",{value:T.idx,children:[T.petName," (",T.petType==="DOG"?"강아지":T.petType==="CAT"?"고양이":T.petType,")"]},T.idx))]}),x&&m.find(T=>T.idx===x)&&i.jsx(rZ,{children:(()=>{const T=m.find(B=>B.idx===x);return i.jsxs(i.Fragment,{children:[i.jsx(nZ,{children:T.profileImageUrl?i.jsx(oZ,{src:T.profileImageUrl,alt:T.petName,onError:B=>{B.target.src='data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23e2e8f0"/%3E%3Ctext x="100" y="100" font-family="Arial" font-size="16" fill="%2394a3b8" text-anchor="middle" dominant-baseline="middle"%3E사진 없음%3C/text%3E%3C/svg%3E'}}):i.jsx(iZ,{children:i.jsx(aZ,{children:"사진 없음"})})}),i.jsxs(sZ,{children:[i.jsx(cZ,{children:T.petName}),i.jsxs(ca,{children:[T.petType==="DOG"?"강아지":T.petType==="CAT"?"고양이":T.petType==="BIRD"?"새":T.petType==="RABBIT"?"토끼":T.petType==="HAMSTER"?"햄스터":"기타"," · ",T.breed||"품종 미상"]}),T.age&&i.jsxs(ca,{children:["나이: ",T.age]}),T.gender&&i.jsxs(ca,{children:["성별: ",T.gender==="M"?"수컷":T.gender==="F"?"암컷":"미확인"]}),T.color&&i.jsxs(ca,{children:["색상: ",T.color]}),T.weight&&i.jsxs(ca,{children:["몸무게: ",T.weight,"kg"]})]})]})})()})]})]})]})})]})})},HX=h.div`
  position: fixed;
  inset: 0;
  background: ${e=>e.theme.colors.overlay};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  z-index: 1000;
  padding: ${e=>e.theme.spacing["5xl"]} ${e=>e.theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.lg};
  }
`,VX=h.div`
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.xl};
  max-width: 880px;
  width: 100%;
  box-shadow: ${e=>e.theme.shadows.xl};

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: ${e=>e.theme.borderRadius.lg};
  }
`,KX=h.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing.lg} ${e=>e.theme.spacing.xl};
  border-bottom: 1px solid ${e=>e.theme.colors.border};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.md};
  }
`,GX=h.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.h2.fontSize};
`,YX=h.button`
  border: none;
  background: transparent;
  font-size: ${e=>e.theme.typography.h2.fontSize};
  cursor: pointer;
  color: ${e=>e.theme.colors.textSecondary};

  &:hover {
    color: ${e=>e.theme.colors.text};
  }
`,XX=h.div`
  padding: ${e=>e.theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.md};
  }
`,ZX=h.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: ${e=>e.theme.spacing.xl};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,JX=h.div`
  display: flex;
  flex-direction: column;
`,QX=h.div`
  background: ${e=>e.theme.colors.surfaceElevated};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing.lg};
  height: fit-content;
  position: sticky;
  top: ${e=>e.theme.spacing.xl};

  @media (max-width: 1024px) {
    position: static;
  }
`,eZ=h.h3`
  margin: 0 0 ${e=>e.theme.spacing.md} 0;
  font-size: ${e=>e.theme.typography.h4.fontSize};
  color: ${e=>e.theme.colors.text};
`,tZ=h.select`
  width: 100%;
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surface};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  margin-bottom: ${e=>e.theme.spacing.md};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
    box-shadow: ${e=>e.theme.shadows.focus};
  }
`,rZ=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};
`,nZ=h.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${e=>e.theme.borderRadius.md};
  overflow: hidden;
  background: ${e=>e.theme.colors.borderLight};
  display: flex;
  align-items: center;
  justify-content: center;
`,oZ=h.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,iZ=h.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${e=>e.theme.colors.borderLight};
`,aZ=h.div`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
`,sZ=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xs};
`,cZ=h.div`
  font-size: ${e=>e.theme.typography.h4.fontSize};
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
`,ca=h.div`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
`,lZ=h.div`
  padding: ${e=>e.theme.spacing.lg};
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
`,dZ=h.div`
  padding: ${e=>e.theme.spacing.lg};
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
  font-style: italic;
`,uZ=h.form`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xl};
`,Wh=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.lg};
`,Hh=h.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.h3.fontSize};
  color: ${e=>e.theme.colors.text};
`,m$=h.div.withConfig({shouldForwardProp:e=>e!=="columns"})`
  display: grid;
  grid-template-columns: repeat(${e=>e.columns||1}, minmax(0, 1fr));
  gap: ${e=>e.theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Xr=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xs};
`,Zr=h.label`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
`,yo=h.input`
  width: 100%;
  padding: ${e=>e.theme.spacing.md};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,hZ=h.select`
  width: 100%;
  padding: ${e=>e.theme.spacing.md};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,fZ=h.textarea`
  width: 100%;
  padding: ${e=>e.theme.spacing.md};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,pZ=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.sm};
`,mZ=h.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing.sm};
`,gZ=h.input`
  display: none;
`,xZ=h.label.withConfig({shouldForwardProp:e=>e!=="$disabled"})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.md};
  background: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  font-weight: 600;
  cursor: ${e=>e.$disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.$disabled?.6:1};
  pointer-events: ${e=>e.$disabled?"none":"auto"};
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.primaryDark};
  }
`,vZ=h.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surfaceElevated};
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${e=>e.theme.colors.error};
    color: ${e=>e.theme.colors.error};
  }
`,yZ=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
`,bZ=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.error};
`,wZ=h(yo)`
  width: 100%;
`,$Z=h.div`
  margin-top: ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.lg};
  overflow: hidden;
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surfaceElevated};
  max-width: 320px;
`,SZ=h.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  max-height: 400px;
`,jZ=h.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing.sm};
`,kZ=h.button`
  background: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,EZ=h.button`
  background: ${e=>e.theme.colors.surfaceElevated};
  color: ${e=>e.theme.colors.textSecondary};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${e=>e.theme.colors.primary};
    border-color: ${e=>e.theme.colors.primary};
  }
`,CZ=h.div`
  position: relative;
`,PZ=h.button`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.hasValue?e.theme.colors.text:e.theme.colors.textSecondary};
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    border-color: ${e=>e.theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary}33;
  }
`,AZ=h.span`
  font-size: ${e=>e.theme.typography.h3.fontSize};
`,OZ=h.div`
  position: fixed;
  z-index: 2000;
  background: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.lg};
  box-shadow: ${e=>e.theme.shadows.xl};
  padding: ${e=>e.theme.spacing.lg};
  min-width: 320px;
  max-width: 90vw;
  animation: slideDown 0.2s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    min-width: 280px;
    max-width: 95vw;
    padding: ${e=>e.theme.spacing.md};
    left: 50% !important;
    transform: translateX(-50%);
    top: 50% !important;
    margin-top: -200px;
    max-width: 90vw;
  }
`,RZ=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.lg};
`,TZ=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`,g$=h.button`
  width: 32px;
  height: 32px;
  border: none;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  border-radius: ${e=>e.theme.borderRadius.md};
  cursor: pointer;
  font-size: ${e=>e.theme.typography.h3.fontSize};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.theme.colors.primary};
    color: ${e=>e.theme.colors.textInverse};
  }
`,IZ=h.div`
  font-weight: 600;
  font-size: ${e=>e.theme.typography.h4.fontSize};
  color: ${e=>e.theme.colors.text};
`,DZ=h.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`,_Z=h.div`
  text-align: center;
  font-weight: 600;
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
  padding: ${e=>e.theme.spacing.sm} 0;
`,LZ=h.button`
  aspect-ratio: 1;
  border: none;
  background: ${e=>e.isSelected?e.theme.colors.primary:e.isToday?e.theme.colors.primary+"20":"transparent"};
  color: ${e=>e.isSelected?e.theme.colors.textInverse:e.isCurrentMonth?e.theme.colors.text:e.theme.colors.textSecondary+"60"};
  border-radius: ${e=>e.theme.borderRadius.md};
  cursor: ${e=>e.isCurrentMonth?"pointer":"not-allowed"};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  font-weight: ${e=>e.isToday||e.isSelected?"600":"400"};
  transition: all 0.2s;
  opacity: ${e=>e.isCurrentMonth?1:.5};

  &:hover:not(:disabled) {
    background: ${e=>e.isSelected?e.theme.colors.primary:e.isCurrentMonth?e.theme.colors.primary+"20":"transparent"};
    transform: ${e=>e.isCurrentMonth?"scale(1.1)":"none"};
  }

  &:disabled {
    cursor: not-allowed;
  }
`,MZ=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.lg};
  padding: ${e=>e.theme.spacing.lg};
  background: ${e=>e.theme.colors.background};
  border-radius: ${e=>e.theme.borderRadius.md};
  border: 1px solid ${e=>e.theme.colors.border};
`,zZ=h.div`
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
`,NZ=h.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`,x$=h.input`
  width: 60px;
  padding: ${e=>e.theme.spacing.sm};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  text-align: center;
  font-size: ${e=>e.theme.typography.body1.fontSize};
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
  }
`,BZ=h.span`
  font-size: ${e=>e.theme.typography.h3.fontSize};
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
`,FZ=h.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`,UZ=h.button`
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.xl};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  background: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.theme.colors.primary}dd;
  }
`,qZ="http://localhost:8080/api/chat",Wr=se.create({baseURL:qZ,headers:{"Content-Type":"application/json"}}),WZ=()=>localStorage.getItem("accessToken")||localStorage.getItem("token");Wr.interceptors.request.use(e=>{const t=WZ();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));Wr.interceptors.response.use(e=>e,e=>(e.response?.status===401&&window.redirectToLogin&&window.redirectToLogin(),Promise.reject(e)));const HZ=async e=>(await Wr.get("/conversations",{params:{userId:e}})).data,VZ=async(e,t)=>(await Wr.get(`/conversations/${e}`,{params:{userId:t}})).data,Vh=async(e,t)=>(await Wr.post("/conversations/direct",null,{params:{user1Id:e,user2Id:t}})).data,KZ=async(e,t)=>{await Wr.post(`/conversations/${e}/leave`,null,{params:{userId:t}})},GZ=async(e,t)=>{await Wr.delete(`/conversations/${e}`,{params:{userId:t}})},v$=async(e,t,r,n="TEXT")=>(await Wr.post("/messages",{conversationIdx:e,content:r,messageType:n},{params:{senderIdx:t}})).data,YZ=async(e,t,r=0,n=50)=>(await Wr.get(`/messages/conversation/${e}`,{params:{userId:t,page:r,size:n}})).data,y$=async(e,t,r=null)=>{await Wr.post(`/messages/conversation/${e}/read`,null,{params:{userId:t,lastMessageIdx:r}})},XZ=async(e,t)=>(await Wr.get(`/messages/conversation/${e}/search`,{params:{keyword:t}})).data,ZZ=async(e,t)=>(await nn.startChat(e,t)).data,b$={},JZ={lat:36.5,lng:127.5},Un=1e-5,w$=b$?.VITE_NAVER_MAPS_KEY_ID||b$?.VITE_NAVER_MAPS_CLIENT_ID||"",rx=ar.forwardRef(({services:e=[],onServiceClick:t,userLocation:r,mapCenter:n,mapLevel:o,onMapDragStart:a,onMapIdle:s,hoverMarker:c=null,currentMapView:l="nation",selectedSido:u=null,selectedSigungu:d=null,selectedEupmyeondong:f=null,onRegionClick:m=null,onMapClick:g=null,selectedService:x=null,hoveredService:v=null},b)=>{const E=p.useRef(null),w=p.useRef(null),j=p.useRef([]),S=p.useRef(null),y=p.useRef(null),k=p.useRef(null),$=p.useRef(null),C=p.useRef(!1),[P,z]=p.useState(!1),_=p.useRef(!1),N=p.useCallback(Z=>({1:21,2:20,3:19,4:18,5:17,6:16,7:15,8:14,9:13,10:12,11:11,12:10,13:9,14:8})[Z]||7,[]),R=p.useCallback(Z=>({21:1,20:2,19:3,18:4,17:5,16:6,15:7,14:8,13:9,12:10,11:11,10:12,9:13,8:14})[Z]||3,[]),F=p.useCallback(()=>{if(w.current||!E.current||!window.naver?.maps){window.naver?.maps||console.error("네이버맵 API가 로드되지 않았습니다.");return}try{const Z=n||JZ;o||console.warn("MapContainer: mapLevel prop이 제공되지 않았습니다. 기본값(전국 뷰, level 14)을 사용합니다.");const q=N(o||14),W={center:new window.naver.maps.LatLng(Z.lat,Z.lng),zoom:q,minZoom:1,maxZoom:21,zoomControl:!1,logoControl:!1,mapDataControl:!1,scaleControl:!1,scrollWheel:!0,disableDoubleClickZoom:!1,disableDoubleClick:!1},J=new window.naver.maps.Map(E.current,W);w.current=J,$.current=Z,C.current=!0,z(!0),setTimeout(()=>{const G=E.current?.querySelectorAll('.nmap_copyright, .nmap_logo, [class*="nmap"][class*="copyright"], [class*="nmap"][class*="logo"]');G&&G.forEach(ee=>{ee instanceof HTMLElement&&(ee.style.display="none")}),document.querySelectorAll('iframe[src*="oapi.map.naver.com"], iframe[src*="auth"], a[href*="oapi.map.naver.com"], a[href*="auth"]').forEach(ee=>{ee instanceof HTMLElement&&(ee.style.display="none",ee.style.visibility="hidden",ee.style.opacity="0",ee.style.width="0",ee.style.height="0",ee.style.position="absolute",ee.style.left="-9999px")})},500),window.naver.maps.Event.addListener(J,"dragstart",()=>{$.current=null,a?.()}),window.naver.maps.Event.addListener(J,"zoom_changed",()=>{if($.current!==null){const G=J.getCenter(),K=$.current;K&&Math.abs(K.lat-G.lat())<Un&&Math.abs(K.lng-G.lng())<Un&&(_.current=!0)}else _.current=!0}),g&&window.naver.maps.Event.addListener(J,"click",G=>{const K=G.coord||G.latlng;g(K?{coord:K,latlng:K}:G)});let L=null;window.naver.maps.Event.addListener(J,"idle",()=>{clearTimeout(L),L=setTimeout(()=>{const G=J.getCenter(),K=J.getBounds(),ee=$.current;if(ee){const we=Math.abs(ee.lat-G.lat())<Un&&Math.abs(ee.lng-G.lng())<Un}const ne=$.current===null;s?.({lat:G.lat(),lng:G.lng(),level:R(J.getZoom()),bounds:{sw:{lat:K.getMin().lat(),lng:K.getMin().lng()},ne:{lat:K.getMax().lat(),lng:K.getMax().lng()}},isManualOperation:ne})},200)})}catch(Z){console.error("네이버맵 초기화 실패:",Z),console.error("에러 상세:",Z.message,Z.stack),console.error("가능한 원인:"),console.error("1. 네이버 클라우드 플랫폼에서 Maps API가 활성화되지 않았습니다."),console.error("2. Key ID가 잘못되었거나 도메인이 등록되지 않았습니다."),console.error("3. 네이버 클라우드 플랫폼 > Application > Web Service URL에 현재 URL을 등록하세요."),console.error("   현재 URL:",window.location.origin)}},[n,o,N,R,a,s]);p.useEffect(()=>{if(!w$){console.error("네이버맵 Key ID가 설정되지 않았습니다. .env 파일에 REACT_APP_NAVER_MAPS_KEY_ID를 확인하세요.");return}if(window.naver?.maps){w.current||F();return}if(document.querySelector('script[src*="map.naver.com"]')){let J=0;const L=setInterval(()=>{window.naver?.maps?(clearInterval(L),w.current||F()):J++>100&&(clearInterval(L),console.error("네이버맵 API 로드 타임아웃"))},100);return()=>clearInterval(L)}const q=document.createElement("script"),W=`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${w$}`;return q.src=W,q.async=!0,q.onload=()=>{setTimeout(()=>{window.naver?.maps&&!w.current&&F()},100)},q.onerror=J=>{console.error("네이버맵 API 스크립트 로드 실패:",J),console.error("가능한 원인:"),console.error("1. 네이버 클라우드 플랫폼에서 Maps API가 활성화되지 않았습니다."),console.error("2. Key ID가 잘못되었거나 불완전합니다."),console.error("3. 웹 서비스 URL이 등록되지 않았습니다."),console.error("4. 신규 Maps API 클라이언트 ID를 발급받아야 할 수 있습니다."),console.error("   - 네이버 클라우드 플랫폼 콘솔 > Services > AI·NAVER API > Application"),console.error('   - 클라이언트 ID 선택 > Web Service URL에 "http://localhost:3000" 추가')},document.head.appendChild(q),()=>{}},[F]);const O=p.useCallback(()=>{S.current&&(S.current.markers?S.current.markers.forEach(Z=>{Z.setMap&&Z.setMap(null)}):S.current.clear&&S.current.clear(),S.current=null),j.current.forEach(Z=>{Z.setMap&&Z.setMap(null)}),j.current=[]},[]),D=p.useRef(""),A=p.useRef(null),M=p.useRef(null),I=p.useRef(e),T=p.useRef(x);p.useEffect(()=>{I.current=e,T.current=x},[e,x]);const B=p.useCallback(()=>{if(!(!C.current||!w.current||!window.naver?.maps))try{const Z=I.current,q=T.current,W=w.current.getZoom(),J=w.current.getBounds(),L=Z.map(ne=>`${ne.latitude},${ne.longitude}`).join("|");D.current=L,A.current=W,M.current=J,O();const G=Z.filter(ne=>typeof ne.latitude=="number"&&typeof ne.longitude=="number");if(G.length===0)return;const K=(ne,we=null,je=null)=>{let Ge=we||"#03C75A",_e=1,We=100;ne==="missing"&&(Ge="#FF6B6B",We=150),ne==="selected"?(Ge="#028A48",_e=1.25,We=1e3):ne==="hovered"&&(_e=1.25,We=900);const Rt=26*_e,St=36*_e,pt=`
            <svg xmlns="http://www.w3.org/2000/svg" width="${Rt}" height="${St}" viewBox="0 0 24 34" fill="none">
              <path fill="${Ge}" d="M12 0C5.37258 0 0 5.37258 0 12C0 19 12 34 12 34C12 34 24 19 24 12C24 5.37258 18.6274 0 12 0Z"/>
              <circle cx="12" cy="12" r="5" fill="white"/>
            </svg>
          `,Be=je?je.length>8?je.slice(0,8)+"…":je:null,Hr=Be?`<div style="background:rgba(255,255,255,0.95);padding:2px 5px;border-radius:3px;font-size:10px;font-weight:600;white-space:nowrap;box-shadow:0 1px 3px rgba(0,0,0,0.2);color:#333;margin-top:2px;line-height:1.3;">${Be}</div>`:"";return{content:`<div style="cursor:pointer;display:flex;flex-direction:column;align-items:center;"><div style="filter:drop-shadow(0px 2px 4px rgba(0,0,0,0.25));">${pt}</div>${Hr}</div>`,anchor:new window.naver.maps.Point(Rt/2,St),zIndex:We}},ee=G.map(ne=>{const we=new window.naver.maps.LatLng(ne.latitude,ne.longitude),je=q&&(q.idx&&ne.idx===q.idx||q.externalId&&ne.idx===q.externalId||q.latitude&&q.latitude===ne.latitude&&q.longitude&&q.longitude===ne.longitude),Ge=v&&(v.idx&&ne.idx===v.idx||v.externalId&&ne.idx===v.externalId||v.key&&ne.key===v.key);let _e="normal";ne.type==="missingPet"&&(_e="missing"),je?_e="selected":Ge&&(_e="hovered");const We=K(_e,ne.markerColor||null,ne.name||null),Rt=new window.naver.maps.Marker({position:we,map:w.current,title:ne.name||"서비스",icon:We,zIndex:We.zIndex});return window.naver.maps.Event.addListener(Rt,"click",()=>{w.current&&w.current.panTo(we,{duration:300}),t?.(ne)}),Rt});if(j.current=ee,S.current=null,G.length===1&&n&&w.current&&j.current.length>0){const ne=j.current[0],we=ne.getPosition(),je=w.current.getCenter();je&&(Math.abs(je.lat()-we.lat())>Un||Math.abs(je.lng()-we.lng())>Un)&&setTimeout(()=>{w.current&&ne&&w.current.setCenter(we)},100)}}catch(Z){console.error("마커 업데이트 중 오류:",Z)}},[t,O,n,v]);p.useEffect(()=>{C.current&&w.current&&B()},[e,x,B]),p.useEffect(()=>{if(!C.current||!w.current||!window.naver?.maps)return;const Z=w.current;let q=null;const W=()=>{q&&clearTimeout(q),q=setTimeout(()=>{C.current&&w.current&&B()},300)};return window.naver.maps.Event.addListener(Z,"zoom_changed",W),window.naver.maps.Event.addListener(Z,"bounds_changed",W),()=>{q&&clearTimeout(q);try{window.naver.maps.Event.removeListener(Z,"zoom_changed",W),window.naver.maps.Event.removeListener(Z,"bounds_changed",W)}catch{}}},[P,B]),p.useEffect(()=>{if(!C.current||!w.current||!n||!o)return;const Z=w.current,q=Z.getCenter(),W=Z.getZoom(),J=q&&Math.abs(q.lat()-n.lat)<Un&&Math.abs(q.lng()-n.lng)<Un,L=N(o),G=Math.abs(W-L)<.5;if(_.current=!1,!G){Z.setZoom(L),$.current={...n},J||setTimeout(()=>{Z.setCenter(new window.naver.maps.LatLng(n.lat,n.lng)),$.current={...n}},300);return}J?$.current={...n}:($.current={...n},Z.setCenter(new window.naver.maps.LatLng(n.lat,n.lng)))},[n,o,N]),p.useEffect(()=>{if(!C.current||!w.current||!r||!window.naver?.maps)return;const Z=new window.naver.maps.LatLng(r.lat,r.lng);y.current?y.current.setPosition(Z):y.current=new window.naver.maps.Marker({position:Z,map:w.current,icon:{content:'<div style="width:12px;height:12px;background:#4285F4;border-radius:50%;border:2px solid #fff;"></div>',anchor:new window.naver.maps.Point(6,6)},title:"내 위치"})},[r]),p.useEffect(()=>{if(!(!C.current||!w.current||!window.naver?.maps)&&(k.current&&(k.current.setMap(null),k.current=null),c)){const Z=new window.naver.maps.LatLng(c.lat,c.lng);k.current=new window.naver.maps.Marker({position:Z,map:w.current,icon:{content:'<div style="width:16px;height:16px;background:#FF6B6B;border-radius:50%;border:2px solid #fff;"></div>',anchor:new window.naver.maps.Point(8,8)},title:c.title||"호버된 지역"})}},[c]),p.useEffect(()=>()=>{O(),y.current&&y.current.setMap(null),k.current&&k.current.setMap(null)},[O]);const X=p.useCallback(()=>{if(w.current){$.current=null,_.current=!0;const Z=w.current.getZoom();w.current.setZoom(Z+1)}},[]),ie=p.useCallback(()=>{if(w.current){$.current=null,_.current=!0;const Z=w.current.getZoom();w.current.setZoom(Z-1)}},[]);return P?i.jsx($$,{ref:E,children:i.jsxs(eJ,{children:[i.jsx(S$,{onClick:X,title:"확대",children:i.jsx(j$,{children:"+"})}),i.jsx(S$,{onClick:ie,title:"축소",children:i.jsx(j$,{children:"−"})})]})}):i.jsx($$,{ref:E,children:i.jsx(QZ,{children:"🗺️ 지도를 불러오는 중..."})})});rx.displayName="MapContainer";const $$=h.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
  background: #ffffff;
  overflow: hidden; /* 인증 URL 등이 밖으로 나오지 않도록 */

  /* 네이버맵 저작권 표시 숨기기 */
  .nmap_copyright,
  .nmap_logo,
  .nmap_control {
    display: none !important;
  }

  /* 네이버맵 로고 및 저작권 영역 숨기기 */
  div[class*="nmap"],
  div[class*="naver"] {
    &[class*="copyright"],
    &[class*="logo"],
    &[class*="control"] {
      display: none !important;
    }
  }

  /* 네이버맵 인증 관련 요소 숨기기 */
  iframe[src*="oapi.map.naver.com"],
  iframe[src*="auth"],
  script[src*="oapi.map.naver.com"],
  a[href*="oapi.map.naver.com"],
  a[href*="auth"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    position: absolute !important;
    left: -9999px !important;
  }
`,QZ=h.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem 1.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
  font-weight: 600;
  color: #2563eb;
`,eJ=h.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
`,S$=h.button`
  width: 36px;
  height: 36px;
  border: none;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s;
  padding: 0;

  &:hover { background: #f5f5f4; }
  &:active { background: #eae8e4; }
  &:first-child { border-bottom: 1px solid #e8e5e0; }
`,j$=h.span`
  font-size: 20px;
  font-weight: 300;
  color: #4b4743;
  line-height: 1;
  user-select: none;
`,tJ={MISSING:"실종",FOUND:"발견",RESOLVED:"완료"},rJ=e=>{if(!e)return null;const t=new Date(e);if(Number.isNaN(t.getTime()))return null;const n=new Date-t;if(n<0)return null;const o=Math.floor(n/36e5),a=Math.floor(n/864e5);return o<24?{text:`${o}시간 경과`,level:"critical"}:a<=3?{text:`${a}일 경과`,level:"critical"}:a<=7?{text:`${a}일 경과`,level:"urgent"}:a<=30?{text:`${a}일 경과`,level:"warning"}:{text:`${a}일 경과`,level:"cold"}},nJ=({board:e,onClose:t,onRefresh:r,currentUser:n,onDeleteComment:o,onDeleteBoard:a})=>{const[s,c]=p.useState(""),[l,u]=p.useState(""),[d,f]=p.useState(null),[m,g]=p.useState(null),[x,v]=p.useState(!1),[b,E]=p.useState(!1),[w,j]=p.useState(!1),[S,y]=p.useState(null),[k,$]=p.useState(!1),[C,P]=p.useState([]),[z,_]=p.useState(0),[N]=p.useState(20),[R,F]=p.useState(0),[O,D]=p.useState(!1),A=K=>{y(K),$(!0)},M=p.useCallback(async(K=0)=>{if(e?.idx)try{D(!0);const ne=(await nn.getComments(e.idx,K,N)).data||{},we=ne.comments||[];P(we),F(ne.totalCount||0),_(K)}catch(ee){console.error("댓글 조회 실패:",ee)}finally{D(!1)}},[e?.idx,N]),I=p.useCallback(K=>{const ee=Math.max(1,Math.ceil(R/N));K>=0&&K<ee&&M(K)},[R,N,M]);if(p.useEffect(()=>{e?.idx&&(e.comments&&Array.isArray(e.comments)?(P(e.comments),F(e.commentCount||e.comments.length)):M(0))},[e?.idx,e?.comments,e?.commentCount,M]),!e)return null;const T=async K=>{if(K.preventDefault(),!n){window.dispatchEvent(new Event("showPermissionModal"));return}if(!s.trim()&&!l){alert("댓글 내용 또는 목격 위치를 입력해주세요.");return}try{E(!0),await nn.addComment(e.idx,{boardId:e.idx,userId:n.idx,content:s.trim(),address:l||null,latitude:d||null,longitude:m||null}),c(""),u(""),f(null),g(null),v(!1),await M(0),r(),window.dispatchEvent(new Event("notificationUpdate"))}catch(ee){alert(ee.response?.data?.error||ee.message)}finally{E(!1)}},B=async K=>{if(e.status!==K)try{j(!0),await nn.updateStatus(e.idx,K),r()}catch(ee){alert(ee.response?.data?.error||ee.message)}finally{j(!1)}},X=async K=>{if(!n){window.dispatchEvent(new Event("showPermissionModal"));return}if(window.confirm("댓글을 삭제하시겠습니까?"))try{await nn.deleteComment(e.idx,K),o?.(K),await M(0),r()}catch(ee){alert(ee.response?.data?.error||ee.message)}},ie=n&&n.idx===e.userId,Z=n&&n.idx===e.userId,q=n&&n.idx===e.userId,W=async()=>{if(Z&&window.confirm("해당 실종 제보를 삭제하시겠습니까?"))try{await nn.delete(e.idx),a?.(e.idx),t?.()}catch(K){alert(K.response?.data?.error||K.message)}},J=async()=>{if(!n){window.dispatchEvent(new Event("showPermissionModal"));return}if(!window.confirm("이 실종 제보를 신고하시겠습니까?"))return;const K=window.prompt("신고 사유를 입력해주세요.");if(!(!K||!K.trim()))try{await vr.submit({targetType:"MISSING_PET",targetIdx:e.idx,reason:K.trim()}),alert("신고가 접수되었습니다.")}catch(ee){alert(ee.response?.data?.error||ee.message||"신고 처리에 실패했습니다.")}},L=async K=>{if(!n){window.dispatchEvent(new Event("showPermissionModal"));return}if(!window.confirm("해당 제보 댓글을 신고하시겠습니까?"))return;const ee=window.prompt("신고 사유를 입력해주세요.");if(!(!ee||!ee.trim()))try{await vr.submit({targetType:"COMMENT",targetIdx:K,reason:ee.trim()}),alert("신고가 접수되었습니다.")}catch(ne){alert(ne.response?.data?.error||ne.message||"신고 처리에 실패했습니다.")}},G=async()=>{if(!n){window.dispatchEvent(new Event("showPermissionModal"));return}if(q){alert("본인의 제보에는 채팅을 시작할 수 없습니다.");return}try{const K=await ZZ(e.idx);window.openChatWidget?window.openChatWidget(K.idx):alert("채팅방이 생성되었습니다. 채팅 목록에서 확인해주세요.")}catch(K){alert(K.response?.data?.error||K.message||"채팅 시작에 실패했습니다.")}};return i.jsxs(i.Fragment,{children:[i.jsx(oJ,{onClick:t}),i.jsx(iJ,{onClick:t,children:i.jsxs(aJ,{onClick:K=>K.stopPropagation(),children:[i.jsxs(sJ,{children:[i.jsxs(cJ,{children:[i.jsx(lJ,{type:"button",onClick:t,children:"← 목록으로"}),i.jsxs(dJ,{children:[Z&&i.jsx(fJ,{type:"button",onClick:W,children:"삭제"}),n&&n.idx!==e.userId&&i.jsx(pJ,{type:"button",onClick:J,children:"신고"})]})]}),i.jsxs(uJ,{children:[i.jsx($J,{status:e.status,children:tJ[e.status]||e.status}),e.status==="MISSING"&&(()=>{const K=rJ(e.lostDate);return K?K.level==="critical"?i.jsxs(bJ,{children:["⏱ 골든타임 · ",K.text]}):i.jsxs(wJ,{children:["실종 ",K.text.replace(" 경과","째")]}):null})(),i.jsx(hJ,{children:e.title})]})]}),i.jsxs(mJ,{children:[i.jsxs(gJ,{children:[i.jsxs(xJ,{children:[i.jsxs(k$,{children:[i.jsxs(Jr,{children:[i.jsx(Qr,{children:"제보자"}),i.jsx(en,{children:e.nickname||"알 수 없음"})]}),i.jsxs(Jr,{children:[i.jsx(Qr,{children:"실종일"}),i.jsx(en,{children:e.lostDate||"미등록"})]}),i.jsxs(Jr,{fullWidth:!0,children:[i.jsx(Qr,{children:"실종 위치"}),i.jsx(en,{children:e.lostLocation||"미등록"}),e.latitude&&e.longitude&&i.jsx(UJ,{children:i.jsx(rx,{mapCenter:{lat:typeof e.latitude=="object"?e.latitude.doubleValue?.()||e.latitude:Number(e.latitude),lng:typeof e.longitude=="object"?e.longitude.doubleValue?.()||e.longitude:Number(e.longitude)},mapLevel:7,services:[{idx:e.idx,name:e.petName||e.title||"실종신고",latitude:typeof e.latitude=="object"?e.latitude.doubleValue?.()||e.latitude:Number(e.latitude),longitude:typeof e.longitude=="object"?e.longitude.doubleValue?.()||e.longitude:Number(e.longitude),address:e.lostLocation||"",type:"missingPet"}],onServiceClick:K=>{}})})]}),i.jsxs(Jr,{children:[i.jsx(Qr,{children:"연락처"}),i.jsx(en,{children:e.phoneNumber?i.jsx("a",{href:`tel:${e.phoneNumber}`,style:{color:"inherit",textDecoration:"none"},children:e.phoneNumber}):"댓글로 제보해주세요"})]})]}),i.jsx(Kh,{}),i.jsxs(k$,{columns:2,children:[e.petName&&i.jsxs(Jr,{children:[i.jsx(Qr,{children:"반려동물 이름"}),i.jsx(en,{children:e.petName})]}),e.species&&i.jsxs(Jr,{children:[i.jsx(Qr,{children:"동물 종"}),i.jsx(en,{children:e.species})]}),e.breed&&i.jsxs(Jr,{children:[i.jsx(Qr,{children:"품종"}),i.jsx(en,{children:e.breed})]}),e.color&&i.jsxs(Jr,{children:[i.jsx(Qr,{children:"색상"}),i.jsx(en,{children:e.color})]}),e.gender&&i.jsxs(Jr,{children:[i.jsx(Qr,{children:"성별"}),i.jsx(en,{children:e.gender==="M"?"수컷":"암컷"})]}),e.age&&i.jsxs(Jr,{children:[i.jsx(Qr,{children:"나이"}),i.jsx(en,{children:e.age})]})]}),!q&&n&&i.jsxs(i.Fragment,{children:[i.jsx(Kh,{}),i.jsx(NJ,{children:i.jsx(BJ,{type:"button",onClick:G,children:"실종동물 목격했어요"})})]}),ie&&i.jsxs(i.Fragment,{children:[i.jsx(Kh,{}),i.jsxs(SJ,{children:[i.jsx(jJ,{children:"상태 변경"}),i.jsxs(kJ,{children:[i.jsx(Gh,{type:"button",active:e.status==="MISSING",onClick:()=>B("MISSING"),disabled:w,children:"실종"}),i.jsx(Gh,{type:"button",active:e.status==="FOUND",onClick:()=>B("FOUND"),disabled:w,children:"발견"}),i.jsx(Gh,{type:"button",active:e.status==="RESOLVED",onClick:()=>B("RESOLVED"),disabled:w,children:"완료"})]})]})]})]}),e.imageUrl&&i.jsx(vJ,{children:i.jsx("img",{src:e.imageUrl,alt:e.title})})]}),i.jsxs(E$,{children:[i.jsx(C$,{children:"상세 설명"}),i.jsx(yJ,{children:e.content||"상세 설명이 없습니다."})]}),i.jsxs(E$,{children:[i.jsxs(C$,{children:["댓글 및 제보 ",R>0&&`(${R}개)`]}),C.length>0?i.jsx(EJ,{children:C.map(K=>i.jsxs(CJ,{children:[i.jsxs(PJ,{children:[i.jsx(AJ,{onClick:()=>K.userId&&A(K.userId),style:{cursor:K.userId?"pointer":"default"},children:K.nickname||"익명"}),i.jsx(OJ,{children:K.createdAt?.replace("T"," ").substring(0,16)})]}),i.jsx(RJ,{children:K.content}),K.address&&i.jsxs(zJ,{children:["📍 목격 위치: ",K.address]}),n&&i.jsx(TJ,{children:n.idx===K.userId||n.idx===e.userId?i.jsx(IJ,{onClick:()=>X(K.idx),children:"삭제"}):i.jsx(DJ,{type:"button",onClick:()=>L(K.idx),children:"신고"})})]},K.idx))}):i.jsx(_J,{children:"아직 제보가 없습니다. 가장 먼저 댓글을 남겨보세요!"}),R>0&&i.jsx(HJ,{children:i.jsx(kr,{currentPage:z,totalCount:R,pageSize:N,onPageChange:I,loading:O,showEdges:!0})}),i.jsxs(LJ,{onSubmit:T,children:[i.jsx(MJ,{placeholder:n?"목격 정보나 도움이 될 만한 내용을 남겨주세요.":"로그인 후 댓글을 작성할 수 있습니다.",value:s,onChange:K=>c(K.target.value),rows:3,disabled:!n||b}),n&&i.jsxs(i.Fragment,{children:[i.jsx(FJ,{type:"button",onClick:()=>v(!x),disabled:b,children:x?"📍 주소 입력 숨기기":"📍 목격 위치 추가하기"}),x&&i.jsx(qJ,{children:i.jsx(pA,{onAddressSelect:K=>{u(K.address),f(K.latitude),g(K.longitude)},initialAddress:l,initialLat:d,initialLng:m})})]}),i.jsx(WJ,{type:"submit",disabled:!n||b||!s.trim()&&!l,children:b?"등록 중...":"댓글 등록"})]})]})]})]})}),i.jsx(Wm,{isOpen:k,userId:S,onClose:()=>{$(!1),y(null)}})]})},oJ=h.div`
  position: fixed;
  inset: 0;
  background: ${e=>e.theme.colors.overlay};
  backdrop-filter: blur(4px);
  z-index: 1090;
`,iJ=h.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing.xxl} ${e=>e.theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.md};
    align-items: stretch;
  }
`,aJ=h.article`
  width: min(1000px, 100%);
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.xl};
  box-shadow: ${e=>e.theme.shadows.xl};
  border: 1px solid ${e=>e.theme.colors.border};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: ${e=>e.theme.borderRadius.lg};
    box-shadow: ${e=>e.theme.shadows.lg};
  }
`,sJ=h.header`
  padding: ${e=>e.theme.spacing.xl} ${e=>e.theme.spacing.xl};
  border-bottom: 1px solid ${e=>e.theme.colors.borderLight};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.md};
  }
`,cJ=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${e=>e.theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${e=>e.theme.spacing.sm};
  }
`,lJ=h.button`
  display: inline-flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  background: none;
  border: none;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  cursor: pointer;
  transition: color 0.2s ease;
  padding: ${e=>e.theme.spacing.xs};

  &:hover {
    color: ${e=>e.theme.colors.text};
  }
`,dJ=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`,uJ=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.md};
  flex-wrap: wrap;
`,hJ=h.h2`
  margin: 0;
  font-size: ${e=>e.theme.typography.h2.fontSize};

  @media (max-width: 768px) {
    font-size: ${e=>e.theme.typography.h3.fontSize};
  }
  font-weight: ${e=>e.theme.typography.h2.fontWeight};
  color: ${e=>e.theme.colors.text};
  line-height: 1.4;
  flex: 1;
  min-width: 0;
`,fJ=h.button`
  border: 1px solid ${e=>e.theme.colors.error};
  background: transparent;
  color: ${e=>e.theme.colors.error};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.errorSoft};
    transform: translateY(-1px);
  }
`,pJ=h.button`
  border: 1px solid ${e=>e.theme.colors.warning};
  background: transparent;
  color: ${e=>e.theme.colors.warning};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.warningSoft};
    transform: translateY(-1px);
  }
`,mJ=h.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${e=>e.theme.spacing.md};
    gap: ${e=>e.theme.spacing.md};
  }
`,gJ=h.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  background: ${e=>e.theme.colors.surfaceElevated};
  border-radius: ${e=>e.theme.borderRadius.xl};
  border: 1px solid ${e=>e.theme.colors.border};

  @media (min-width: 720px) {
    grid-template-columns: minmax(0, 1fr) 220px;
  }
`,xJ=h.div`
  padding: ${e=>e.theme.spacing.lg} ${e=>e.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.lg};
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
`,k$=h.div.withConfig({shouldForwardProp:e=>e!=="columns"})`
  display: grid;
  gap: ${e=>e.theme.spacing.md};
  grid-template-columns: repeat(${e=>e.columns||1}, minmax(0, 1fr));
  width: 100%;
  box-sizing: border-box;
`,Jr=h.div.withConfig({shouldForwardProp:e=>e!=="fullWidth"})`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  width: 100%;
  ${e=>e.fullWidth&&`
    grid-column: 1 / -1;
  `}
`,Qr=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`,en=h.span`
  font-size: 1rem;
  color: ${e=>e.theme.colors.text};
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.5;
`,Kh=h.hr`
  border: none;
  border-top: 1px dashed ${e=>e.theme.colors.border};
  margin: ${e=>e.theme.spacing.sm} 0;
`,vJ=h.div`
  border-left: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surface};
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-height: 500px;
  }

  @media (max-width: 720px) {
    border-left: none;
    border-top: 1px solid ${e=>e.theme.colors.border};
    min-height: 250px;
  }
`,E$=h.section`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};
`,C$=h.h3`
  margin: 0;
  font-size: ${e=>e.theme.typography.body1.fontSize};
`,yJ=h.div`
  background: ${e=>e.theme.colors.surfaceElevated};
  border-radius: ${e=>e.theme.borderRadius.lg};
  border: 1px solid ${e=>e.theme.colors.border};
  padding: ${e=>e.theme.spacing.lg};
  line-height: 1.6;
  color: ${e=>e.theme.colors.textSecondary};
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  width: 100%;
  box-sizing: border-box;
`,bJ=h.span`
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.caption.fontSize};
  font-weight: 800;
  white-space: nowrap;
  color: ${e=>e.theme.colors.status.missing};
  background: ${e=>e.theme.colors.status.missing+"1F"};
`,wJ=h.span`
  font-size: ${e=>e.theme.typography.caption.fontSize};
  font-weight: 700;
  white-space: nowrap;
  color: ${e=>e.theme.colors.textSecondary};
`,$J=h.span.withConfig({shouldForwardProp:e=>e!=="status"})`
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.pill};
  font-weight: 700;
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textInverse};
  background: ${e=>{switch(e.status){case"FOUND":return e.theme.colors.status.found;case"RESOLVED":return e.theme.colors.status.resolved;case"MISSING":default:return e.theme.colors.status.missing}}};
`,SJ=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.sm};
`,jJ=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: 600;
`,kJ=h.div`
  display: inline-flex;
  gap: ${e=>e.theme.spacing.sm};
`,Gh=h.button.withConfig({shouldForwardProp:e=>e!=="active"})`
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  font-weight: 600;
  cursor: pointer;
  background: ${e=>e.active?e.theme.colors.primary:e.theme.colors.surface};
  color: ${e=>e.active?e.theme.colors.textInverse:e.theme.colors.text};
  border: 1px solid ${e=>e.active?e.theme.colors.primary:e.theme.colors.border};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${e=>e.active?e.theme.colors.primaryDark:e.theme.colors.surfaceHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,EJ=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.md};
`,CJ=h.div`
  background: ${e=>e.theme.colors.surfaceElevated};
  border-radius: ${e=>e.theme.borderRadius.lg};
  border: 1px solid ${e=>e.theme.colors.border};
  padding: ${e=>e.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.xs};
`,PJ=h.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,AJ=h.span`
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
  transition: color 0.2s ease;

  &:hover {
    color: ${e=>e.theme.colors.primary};
  }
`,OJ=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
`,RJ=h.p`
  margin: 0;
  color: ${e=>e.theme.colors.textSecondary};
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.6;
`,TJ=h.div`
  display: flex;
  justify-content: flex-end;
`,IJ=h.button`
  border: none;
  background: transparent;
  color: ${e=>e.theme.colors.error};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`,DJ=h.button`
  border: none;
  background: transparent;
  color: ${e=>e.theme.colors.warning};
  cursor: pointer;
  font-size: ${e=>e.theme.typography.body2.fontSize};
  font-weight: 600;
  padding: ${e=>e.theme.spacing.xs};
  border-radius: ${e=>e.theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.theme.colors.warningSoft};
  }
`,_J=h.div`
  border: 1px dashed ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing.lg};
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
`,LJ=h.form`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.sm};
  margin-top: ${e=>e.theme.spacing.md};
`,MJ=h.textarea`
  padding: ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.lg};
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surfaceElevated};
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary};
    box-shadow: ${e=>e.theme.shadows.focus};
  }
`,zJ=h.div`
  margin-top: ${e=>e.theme.spacing.xs};
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  background: ${e=>e.theme.colors.surfaceHover};
  border-radius: ${e=>e.theme.borderRadius.sm};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.text};
  font-weight: 500;
`,NJ=h.div`
  display: flex;
  justify-content: center;
  margin: ${e=>e.theme.spacing.md} 0;
`,BJ=h.button`
  background: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.md} ${e=>e.theme.spacing.xl};
  font-weight: 600;
  font-size: ${e=>e.theme.typography.body1.fontSize};
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 300px;

  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${e=>e.theme.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: ${e=>e.theme.shadows.sm};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,FJ=h.button`
  align-self: flex-start;
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};
  border: 1.5px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${e=>e.theme.typography.body2.fontSize};
  margin-top: ${e=>e.theme.spacing.xs};

  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.surfaceHover};
    border-color: ${e=>e.theme.colors.primary};
    color: ${e=>e.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${e=>e.theme.shadows.sm};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,UJ=h.div`
  width: 100%;
  height: 300px;
  border-radius: ${e=>e.theme.borderRadius.md};
  overflow: hidden;
  margin-top: ${e=>e.theme.spacing.md};
  border: 1px solid ${e=>e.theme.colors.border};
`,qJ=h.div`
  margin-top: ${e=>e.theme.spacing.md};
  padding: ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.surfaceElevated};
  border-radius: ${e=>e.theme.borderRadius.lg};
  border: 1px solid ${e=>e.theme.colors.border};
`,WJ=h.button`
  align-self: flex-end;
  background: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.primaryDark};
  }
`,HJ=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing.md} 0;
  margin-top: ${e=>e.theme.spacing.sm};
`,VJ=[{value:"ALL",label:"전체"},{value:"MISSING",label:"실종"},{value:"FOUND",label:"발견"},{value:"RESOLVED",label:"완료"}],KJ={MISSING:"실종",FOUND:"발견",RESOLVED:"완료"},GJ=e=>{if(!e)return null;const t=new Date(e);if(Number.isNaN(t.getTime()))return null;const n=new Date-t;if(n<0)return null;const o=Math.floor(n/36e5),a=Math.floor(n/864e5);return o<24?{text:`${o}시간 경과`,level:"critical"}:a<=3?{text:`${a}일 경과`,level:"critical"}:a<=7?{text:`${a}일 경과`,level:"urgent"}:a<=30?{text:`${a}일 경과`,level:"warning"}:{text:`${a}일 경과`,level:"cold"}},YJ=()=>{const{user:e}=dt(),{checkAndRedirect:t,EmailVerificationPromptComponent:r}=tx("MISSING_PET"),[n,o]=p.useState("ALL"),[a,s]=p.useState([]),[c,l]=p.useState(!1),[u,d]=p.useState(null),[f,m]=p.useState(null),[g,x]=p.useState(!1),[v,b]=p.useState(!1),[E,w]=p.useState(!1),[j,S]=p.useState(null),[y,k]=p.useState(null),[$,C]=p.useState(!1),[P,z]=p.useState(0),[_,N]=p.useState(20),[R,F]=p.useState(0),O=p.useCallback(async(q=0)=>{try{l(!0),d(null);const W={...n!=="ALL"?{status:n}:{},page:q,size:_},L=(await nn.list(W)).data||{},G=L.boards||[];s(G),F(L.totalCount||0),z(q),m(new Date)}catch(W){const J=W.response?.data?.error||W.message;d(`실종 신고 정보를 불러오지 못했습니다: ${J}`)}finally{l(!1)}},[n,_]);p.useEffect(()=>{O(0)},[n,_]);const D=p.useCallback(async q=>{if(q)try{C(!0);const W=performance.now(),J=performance.memory?performance.memory.usedJSHeapSize:null,L=await nn.get(q),G=performance.now(),K=performance.memory?performance.memory.usedJSHeapSize:null,ee=Math.round(G-W),ne=J&&K?Math.round((K-J)/1024/1024*100)/100:null,we=L.data,je=we.comments?we.comments.length:0;console.log("=== [성능 측정] 게시글 상세 조회 완료 ==="),console.log(`  - 게시글 ID: ${q}`),console.log(`  - 실행 시간: ${ee}ms`),je>0&&console.log(`  - 평균 댓글당 시간: ${Math.round(ee/je*100)/100}ms`),console.log(`  - 조회된 댓글 수: ${je}개`),ne!==null&&console.log(`  - 메모리 사용량: ${ne>0?"+":""}${ne}MB`),performance.memory&&(console.log(`  - 현재 메모리: ${Math.round(performance.memory.usedJSHeapSize/1024/1024)}MB`),console.log(`  - 최대 메모리: ${Math.round(performance.memory.jsHeapSizeLimit/1024/1024)}MB`)),k(we)}catch(W){alert(W.response?.data?.error||W.message)}finally{C(!1)}},[]);p.useEffect(()=>{const q=async W=>{const{boardId:J}=W.detail;J&&(console.log("알림에서 실종제보 게시글 열기:",J),S(J),w(!0),k(null),await D(J))};return window.addEventListener("openMissingPetDetail",q),()=>{window.removeEventListener("openMissingPetDetail",q)}},[D]);const A=p.useCallback(async()=>{await O(0),j&&await D(j)},[O,D,j]),M=()=>{if(!e){window.dispatchEvent(new Event("showPermissionModal"));return}x(!0)},I=async q=>{if(!e){window.dispatchEvent(new Event("showPermissionModal"));return}if(t())try{b(!0);const W={...q,userId:e.idx,lostDate:q.lostDate||null,latitude:q.latitude&&!Number.isNaN(Number.parseFloat(q.latitude))?Number.parseFloat(q.latitude):null,longitude:q.longitude&&!Number.isNaN(Number.parseFloat(q.longitude))?Number.parseFloat(q.longitude):null};Object.keys(W).forEach(L=>{(W[L]===""||W[L]===void 0)&&(W[L]=null)});const J=await nn.create(W);if(x(!1),await O(0),J?.data?.idx){const L=J.data.idx;S(L),w(!0),await D(L)}}catch(W){alert(W.response?.data?.error||W.message)}finally{b(!1)}},T=q=>{S(q.idx),w(!0),k(null),D(q.idx)},B=p.useCallback(q=>{const W=Math.max(1,Math.ceil(R/_));q>=0&&q<W&&O(q)},[R,_,O]),X=p.useCallback(q=>{N(q),z(0),s([])},[]),ie=p.useCallback(()=>{w(!1),S(null),k(null),C(!1)},[]),Z=p.useCallback(async()=>{await O(0),ie()},[O,ie]);return i.jsxs(i.Fragment,{children:[i.jsx(r,{}),i.jsxs(XJ,{children:[i.jsxs(ZJ,{children:[i.jsxs("div",{children:[i.jsx(JJ,{children:"실종 동물 제보"}),i.jsx(QJ,{children:"실시간으로 공유되는 우리 동네 실종 동물 정보를 확인하세요."})]}),i.jsxs(eQ,{children:[i.jsx(tQ,{children:VJ.map(q=>i.jsx(rQ,{type:"button",onClick:()=>o(q.value),active:n===q.value,children:q.label},q.value))}),i.jsxs(iQ,{children:[i.jsx(nQ,{type:"button",onClick:O,disabled:c,children:c?"불러오는 중...":"새로고침"}),i.jsx(oQ,{type:"button",onClick:M,children:"+ 실종 제보 등록"})]})]})]}),u&&i.jsx(aQ,{children:u}),f&&i.jsxs(sQ,{children:["마지막 업데이트:"," ",f.toLocaleString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})]}),i.jsxs(PQ,{children:[i.jsx(AQ,{children:"페이지당 게시글 수:"}),i.jsxs(OQ,{children:[i.jsx(Yh,{active:_===20,onClick:()=>X(20),children:"20"}),i.jsx(Yh,{active:_===50,onClick:()=>X(50),children:"50"}),i.jsx(Yh,{active:_===100,onClick:()=>X(100),children:"100"})]})]}),c&&a.length===0?i.jsxs(kQ,{children:[i.jsx(EQ,{}),i.jsx(CQ,{children:"실종 신고 정보를 불러오는 중..."})]}):a.length===0&&!u?i.jsxs(wQ,{children:[i.jsx("p",{children:"등록된 실종 신고가 없습니다."}),i.jsx("span",{children:"새로운 제보가 등록되면 이곳에서 확인하실 수 있습니다."}),i.jsx($Q,{type:"button",onClick:M,children:"첫 제보 등록하기"})]}):i.jsx(cQ,{children:a.map(q=>{const W=GJ(q.lostDate),J=q.status==="MISSING",L=J&&W&&W.level==="critical",G=[q.species,q.breed,q.color,q.gender&&(q.gender==="M"?"수컷":"암컷")].filter(Boolean).join(" · ");return i.jsxs(lQ,{onClick:()=>T(q),children:[i.jsx(dQ,{children:q.imageUrl?i.jsx("img",{src:q.imageUrl,alt:q.petName||q.title||"반려동물",onError:K=>{K.target.style.display="none"}}):i.jsx("span",{"aria-hidden":"true",children:"🐾"})}),i.jsxs(uQ,{children:[i.jsxs(hQ,{children:[i.jsx(fQ,{$status:q.status,children:KJ[q.status]||"실종"}),J&&W&&(L?i.jsxs(pQ,{children:["⏱ 골든타임 · ",W.text]}):i.jsxs(mQ,{children:["실종 ",W.text.replace(" 경과","째")]}))]}),i.jsxs(gQ,{children:[q.petName&&i.jsx(xQ,{children:q.petName}),q.title]}),i.jsxs(vQ,{children:[G,q.lostLocation?`${G?" · ":""}📍${q.lostLocation}`:""]})]}),i.jsx(yQ,{children:i.jsxs(bQ,{children:["💬 ",q.commentCount??0]})})]},q.idx)})}),R>0&&i.jsx(RQ,{children:i.jsx(kr,{currentPage:P,totalCount:R,pageSize:_,onPageChange:B,loading:c,showEdges:!0})})]}),i.jsx(WX,{isOpen:g,onClose:()=>x(!1),onSubmit:I,loading:v,currentUser:e}),E&&i.jsx(i.Fragment,{children:$&&!y?i.jsxs(i.Fragment,{children:[i.jsx(SQ,{onClick:ie}),i.jsx(jQ,{children:"상세 정보를 불러오는 중..."})]}):i.jsx(nJ,{board:y,onClose:ie,onRefresh:A,currentUser:e,onDeleteBoard:Z})})]})},XJ=h.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${e=>e.theme.spacing.xl} ${e=>e.theme.spacing.lg};
`,ZJ=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.lg};
  margin-bottom: ${e=>e.theme.spacing.xl};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`,JJ=h.h1`
  margin: 0;
  font-size: 2rem;
  color: ${e=>e.theme.colors.text};
`,QJ=h.p`
  margin-top: ${e=>e.theme.spacing.sm};
  color: ${e=>e.theme.colors.textSecondary};
`,eQ=h.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing.sm};

  @media (min-width: 768px) {
    align-items: flex-end;
  }
`,tQ=h.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing.xs};
  background: ${e=>e.theme.colors.surface};
  padding: ${e=>e.theme.spacing.xs};
  border-radius: ${e=>e.theme.borderRadius.lg};
  border: 1px solid ${e=>e.theme.colors.border};
`,rQ=h.button.withConfig({shouldForwardProp:e=>e!=="active"})`
  padding: 8px 16px;
  border-radius: 50px;
  border: 1.5px solid ${e=>e.active?"#EF4444":e.theme.colors.border};
  background: ${e=>e.active?"#EF4444":"transparent"};
  color: ${e=>e.active?"white":e.theme.colors.textSecondary};
  font-size: 13px;
  font-weight: ${e=>e.active?"600":"400"};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
`,nQ=h.button`
  border: none;
  background: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.border};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.md};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  color: ${e=>e.theme.colors.text};

  &:hover:not(:disabled) {
    background: ${e=>e.theme.colors.surfaceHover};
    color: ${e=>e.theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`,oQ=h.button`
  border: none;
  background: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;

  &:hover {
    background: ${e=>e.theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`,iQ=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.sm};
`,aQ=h.div`
  background: ${e=>e.theme.colors.error}12;
  color: ${e=>e.theme.colors.errorDark};
  border: 1px solid ${e=>e.theme.colors.error}40;
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.md} ${e=>e.theme.spacing.lg};
  margin-bottom: ${e=>e.theme.spacing.lg};
`,sQ=h.div`
  margin-bottom: ${e=>e.theme.spacing.md};
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
`,cQ=h.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 4px 20px 24px;

  @media (max-width: 768px) {
    padding: 4px 14px 24px;
  }
`,lQ=h.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 6px;
  border-bottom: 1px solid ${e=>e.theme.colors.borderLight};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
  }

  @media (max-width: 768px) {
    gap: 11px;
  }
`,dQ=h.div`
  width: 66px;
  height: 66px;
  border-radius: 12px;
  flex-shrink: 0;
  overflow: hidden;
  background: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.borderLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 58px;
    height: 58px;
    font-size: 24px;
  }
`,uQ=h.div`
  flex: 1;
  min-width: 0;
`,hQ=h.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 5px;
`,fQ=h.span`
  font-size: 11px;
  font-weight: 800;
  padding: 3px 9px;
  border-radius: 999px;
  color: #fff;
  background: ${e=>e.$status==="FOUND"?e.theme.colors.status.found:e.$status==="RESOLVED"?e.theme.colors.textMuted:e.theme.colors.status.missing};
`,pQ=h.span`
  font-size: 11px;
  font-weight: 800;
  padding: 3px 9px;
  border-radius: 8px;
  color: ${e=>e.theme.colors.status.missing};
  background: ${e=>e.theme.colors.status.missing+"1F"};
`,mQ=h.span`
  font-size: 11.5px;
  font-weight: 700;
  color: ${e=>e.theme.colors.textSecondary};
`,gQ=h.div`
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${e=>e.theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`,xQ=h.span`
  color: ${e=>e.theme.colors.status.missing};
  margin-right: 6px;
`,vQ=h.div`
  font-size: 12.5px;
  color: ${e=>e.theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,yQ=h.div`
  flex-shrink: 0;
  text-align: right;
`,bQ=h.span`
  font-size: 12px;
  font-weight: 600;
  color: ${e=>e.theme.colors.textSecondary};
`,wQ=h.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.xl};
  border: 1px dashed ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.lg};
  color: ${e=>e.theme.colors.textSecondary};

  p {
    margin-bottom: ${e=>e.theme.spacing.sm};
    font-weight: 600;
    color: ${e=>e.theme.colors.text};
  }
`,$Q=h.button`
  margin-top: ${e=>e.theme.spacing.lg};
  border: none;
  background: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  border-radius: ${e=>e.theme.borderRadius.md};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${e=>e.theme.colors.primaryDark};
  }
`,SQ=h.div`
  position: fixed;
  inset: 0;
  background: ${e=>e.theme.colors.overlay};
  backdrop-filter: blur(2px);
  z-index: 900;
`,jQ=h.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.lg};
  padding: ${e=>e.theme.spacing.lg} ${e=>e.theme.spacing.xl};
  box-shadow: ${e=>e.theme.shadows.xl};
  z-index: 1001;
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
`,kQ=h.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing.xxl};
  min-height: 400px;
  gap: ${e=>e.theme.spacing.lg};
`,EQ=h.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${e=>e.theme.colors.border};
  border-top-color: ${e=>e.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,CQ=h.div`
  text-align: center;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body1.fontSize};
`,PQ=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.md};
  padding: ${e=>e.theme.spacing.md} ${e=>e.theme.spacing.lg};
  margin-bottom: ${e=>e.theme.spacing.md};
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.md};
`,AQ=h.span`
  font-size: ${e=>e.theme.typography.body2.fontSize};
  color: ${e=>e.theme.colors.textSecondary};
  font-weight: 500;
`,OQ=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.xs};
`,Yh=h.button`
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.md};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.md};
  background: ${e=>e.active?e.theme.colors.primary:"transparent"};
  color: ${e=>e.active?e.theme.colors.textInverse:e.theme.colors.text};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  font-weight: ${e=>e.active?600:400};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.active?e.theme.colors.primary:e.theme.colors.background};
    border-color: ${e=>e.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,RQ=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing.xl} 0;
  margin-top: ${e=>e.theme.spacing.lg};
`,TQ="http://localhost:8080/api/activities",IQ=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),DQ=se.create({baseURL:TQ,headers:{"Content-Type":"application/json"}});DQ.interceptors.request.use(e=>{const t=IQ();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const P$=e=>Promise.resolve({data:e}),_Q={getMyActivities:e=>P$(js),getMyActivitiesWithPaging:(e={})=>{{const{page:t=0,size:r=20}=e,n=t*r,o=js.slice(n,n+r);return P$({activities:o,totalCount:js.length,hasNext:n+o.length<js.length})}}},LQ=()=>{const{user:e}=dt(),[t,r]=p.useState(0),[n]=p.useState(20),[o,a]=p.useState(0),[s,c]=p.useState({map:{},order:[]}),[l,u]=p.useState(!0),[d,f]=p.useState(null),[m,g]=p.useState("ALL"),[x,v]=p.useState({allCount:0,postsCount:0,commentsCount:0,reviewsCount:0}),b=p.useCallback(R=>R.order.map(F=>R.map[F]).filter(Boolean),[]),E=p.useCallback(R=>{const F={},O=[];return R.forEach(D=>{if(D?.idx&&!F[D.idx]){const A=`${D.type}-${D.idx}`;F[A]=D,O.push(A)}}),{map:F,order:O}},[]);p.useEffect(()=>{e&&e.idx&&w(0)},[e,m]);const w=p.useCallback(async(R=0)=>{if(!e||!e.idx){f("로그인이 필요합니다."),u(!1);return}try{u(!0),f(null);const O=(await _Q.getMyActivitiesWithPaging({userId:e.idx,filter:m,page:R,size:n})).data||{},D=O.activities||[],A=E(D);c(A),a(O.totalCount||0),r(R),v({allCount:O.allCount||0,postsCount:O.postsCount||0,commentsCount:O.commentsCount||0,reviewsCount:O.reviewsCount||0})}catch(F){console.error("활동 내역 로딩 실패:",F),f("활동 내역을 불러오는데 실패했습니다.")}finally{u(!1)}},[e,m,n,E]),j=R=>{switch(R){case"CARE_REQUEST":return"펫케어 요청";case"BOARD":return"커뮤니티 게시글";case"MISSING_PET":return"실종 제보";case"CARE_COMMENT":return"펫케어 댓글";case"COMMENT":return"커뮤니티 댓글";case"MISSING_COMMENT":return"실종 제보 댓글";case"LOCATION_REVIEW":return"주변서비스 리뷰";default:return R}},S=R=>{switch(R){case"CARE_REQUEST":return"🐾";case"BOARD":return"📝";case"MISSING_PET":return"🔍";case"CARE_COMMENT":return"💬";case"COMMENT":return"💬";case"MISSING_COMMENT":return"💬";case"LOCATION_REVIEW":return"⭐";default:return"📌"}},y=R=>{switch(R){case"CARE_REQUEST":return"#FF7E36";case"BOARD":return"#4A90E2";case"MISSING_PET":return"#E94B3C";case"CARE_COMMENT":return"#FF7E36";case"COMMENT":return"#4A90E2";case"MISSING_COMMENT":return"#E94B3C";case"LOCATION_REVIEW":return"#F5A623";default:return"#666"}},k=R=>{const F=new Date(R),D=new Date-F,A=Math.floor(D/6e4),M=Math.floor(D/36e5),I=Math.floor(D/864e5);return A<1?"방금 전":A<60?`${A}분 전`:M<24?`${M}시간 전`:I<7?`${I}일 전`:F.toLocaleDateString("ko-KR",{year:"numeric",month:"short",day:"numeric"})},$=p.useMemo(()=>b(s),[s,b]),C=[{key:"ALL",label:"전체",count:x.allCount},{key:"POSTS",label:"게시글",count:x.postsCount},{key:"COMMENTS",label:"댓글",count:x.commentsCount},{key:"REVIEWS",label:"리뷰",count:x.reviewsCount}],P=p.useCallback(R=>{const F=Math.max(1,Math.ceil(o/n));R>=0&&R<F&&w(R)},[o,n,w]),z=p.useCallback(R=>{if(!R)return;const{type:F,idx:O,relatedId:D}=R,A=D||O;switch(F){case"BOARD":case"COMMENT":window.setActiveTab&&window.setActiveTab("community"),setTimeout(()=>{window.dispatchEvent(new CustomEvent("openBoardDetail",{detail:{boardId:A}}))},100);break;case"CARE_REQUEST":case"CARE_COMMENT":window.setActiveTab&&window.setActiveTab("unified-map");break;case"MISSING_PET":case"MISSING_COMMENT":window.setActiveTab&&window.setActiveTab("missing-pets"),setTimeout(()=>{window.dispatchEvent(new CustomEvent("openMissingPetDetail",{detail:{boardId:A}}))},100);break;case"LOCATION_REVIEW":window.setActiveTab&&window.setActiveTab("unified-map"),setTimeout(()=>{window.dispatchEvent(new CustomEvent("openLocationReviewDetail",{detail:{reviewId:O,locationId:D}}))},100);break;default:console.warn("알 수 없는 활동 타입:",F)}},[]),_=R=>{const F=new Date(R),O=F.getFullYear(),D=String(F.getMonth()+1).padStart(2,"0"),A=String(F.getDate()).padStart(2,"0");return`${O}-${D}-${A}`},N=p.useMemo(()=>{const R={};return $.forEach(O=>{const D=_(O.createdAt);R[D]||(R[D]=[]),R[D].push(O)}),Object.keys(R).sort().reverse().map(O=>({dateKey:O,dateLabel:new Date(O).toLocaleDateString("ko-KR",{year:"numeric",month:"long",day:"numeric",weekday:"short"}),activities:R[O]}))},[$]);return e?l&&s.order.length===0?i.jsx(Ys,{children:i.jsxs(eee,{children:[i.jsx("div",{className:"spinner",children:"⏳"}),i.jsx("h3",{children:"활동 내역을 불러오는 중..."})]})}):d?i.jsx(Ys,{children:i.jsxs(tee,{children:[i.jsx("div",{className:"icon",children:"❌"}),i.jsx("h3",{children:d}),i.jsx("button",{onClick:()=>w(0,!0),children:"다시 시도"})]})}):i.jsxs(Ys,{children:[i.jsxs(MQ,{children:[i.jsx(zQ,{children:"📋 내 활동"}),i.jsx(NQ,{children:"내가 작성한 게시글, 댓글, 리뷰를 한눈에 확인하세요"})]}),i.jsx(BQ,{children:C.map(R=>i.jsxs(FQ,{active:m===R.key,onClick:()=>g(R.key),children:[R.label," (",R.count,")"]},R.key))}),i.jsx(UQ,{children:$.length===0?i.jsx(Oa,{icon:"📭",title:"활동 내역이 없어요",description:"게시글을 작성하거나 댓글을 남겨보세요!"}):i.jsxs(i.Fragment,{children:[N.map(R=>i.jsxs("div",{children:[i.jsx(WQ,{children:R.dateLabel}),R.activities.map(F=>{const O=`${F.type}-${F.idx}`;return i.jsxs(HQ,{onClick:()=>z(F),clickable:!0,children:[i.jsx(qQ,{children:S(F.type)}),i.jsxs(XQ,{children:[i.jsxs(VQ,{children:[i.jsx(KQ,{color:y(F.type),children:i.jsx("span",{className:"label",children:j(F.type)})}),i.jsx(GQ,{children:k(F.createdAt)})]}),F.title&&i.jsx(YQ,{children:F.title}),F.content&&i.jsx(ZQ,{children:F.content.length>150?`${F.content.substring(0,150)}...`:F.content}),F.relatedTitle&&i.jsxs(JQ,{children:[i.jsx("span",{className:"label",children:"관련:"}),i.jsx("span",{className:"title",children:F.relatedTitle})]}),F.status&&i.jsx(QQ,{status:F.status,children:F.status})]})]},O)})]},R.dateKey)),o>0&&i.jsx(ree,{children:i.jsx(kr,{currentPage:t,totalCount:o,pageSize:n,onPageChange:P,loading:l})})]})})]}):i.jsx(Ys,{children:i.jsx(Oa,{icon:"🔒",title:"로그인이 필요해요",description:"내 활동 내역을 보려면 로그인해주세요."})})},Ys=h.div`
  padding: 16px;
  min-height: 100vh;
  background: ${e=>e.theme.colors.background};

  @media (min-width: 769px) {
    max-width: 680px;
    margin: 0 auto;
    padding: 24px 16px;
  }
`,MQ=h.div`
  margin-bottom: ${e=>e.theme.spacing.xl};
`,zQ=h.h1`
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.h2.fontSize};
  font-weight: ${e=>e.theme.typography.h2.fontWeight};
  margin: 0 0 ${e=>e.theme.spacing.sm} 0;

  @media (max-width: 768px) {
    font-size: ${e=>e.theme.typography.h3.fontSize};
  }
`,NQ=h.p`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  margin: 0;
`,BQ=h.div`
  display: flex;
  gap: ${e=>e.theme.spacing.md};
  margin-bottom: ${e=>e.theme.spacing.xl};
  flex-wrap: wrap;
`,FQ=h.button`
  background: ${e=>e.active?e.theme.colors.primary:e.theme.colors.surface};
  color: ${e=>e.active?"white":e.theme.colors.text};
  border: 1px solid ${e=>e.active?e.theme.colors.primary:e.theme.colors.border};
  padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
  border-radius: ${e=>e.theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${e=>e.theme.typography.body2.fontSize};
  
  &:hover {
    background: ${e=>e.active?e.theme.colors.primaryDark:e.theme.colors.surfaceHover};
    transform: translateY(-1px);
  }
`,UQ=h.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,qQ=h.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${e=>e.theme.colors.primarySoft};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`,WQ=h.div`
  font-size: 12px;
  font-weight: 600;
  color: ${e=>e.theme.colors.textSecondary};
  padding: 8px 4px 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`,HQ=h.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background: ${e=>e.theme.colors.surfaceElevated};
  border-radius: 16px;
  border: 1px solid ${e=>e.theme.colors.borderLight};
  box-shadow: 0 2px 8px ${e=>e.theme.colors.shadow};
  transition: transform 0.15s ease;
  ${e=>e.clickable&&`
    cursor: pointer;
  `}

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`,VQ=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing.md};
  gap: ${e=>e.theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${e=>e.theme.spacing.sm};
  }
`,KQ=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  background: ${e=>e.color}15;
  color: ${e=>e.color};
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  border-radius: ${e=>e.theme.borderRadius.md};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  font-weight: 600;
  flex-shrink: 0;

  .label {
    font-weight: 600;
  }
`,GQ=h.span`
  color: ${e=>e.theme.colors.textLight};
  font-size: ${e=>e.theme.typography.caption.fontSize};
`,YQ=h.h3`
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.h4.fontSize};
  font-weight: ${e=>e.theme.typography.h4.fontWeight};
  margin: 0 0 ${e=>e.theme.spacing.sm} 0;
  line-height: 1.4;
`,XQ=h.div`
  flex: 1;
`,ZQ=h.p`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  line-height: 1.6;
  margin: 0 0 ${e=>e.theme.spacing.sm} 0;
`,JQ=h.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing.xs};
  margin-top: ${e=>e.theme.spacing.sm};
  padding-top: ${e=>e.theme.spacing.sm};
  border-top: 1px solid ${e=>e.theme.colors.borderLight};
  font-size: ${e=>e.theme.typography.body2.fontSize};

  .label {
    color: ${e=>e.theme.colors.textLight};
    font-weight: 500;
  }

  .title {
    color: ${e=>e.theme.colors.primary};
    font-weight: 500;
  }
`,QQ=h.span`
  display: inline-block;
  margin-top: ${e=>e.theme.spacing.sm};
  padding: ${e=>e.theme.spacing.xs} ${e=>e.theme.spacing.sm};
  background: ${e=>{switch(e.status){case"OPEN":case"ACTIVE":return e.theme.colors.success;case"IN_PROGRESS":return e.theme.colors.warning;case"COMPLETED":return e.theme.colors.textLight;default:return e.theme.colors.primary}}};
  color: white;
  border-radius: ${e=>e.theme.borderRadius.sm};
  font-size: ${e=>e.theme.typography.caption.fontSize};
  font-weight: 600;
  text-transform: uppercase;
`,eee=h.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.xxl};
  color: ${e=>e.theme.colors.textSecondary};
  
  .spinner {
    font-size: 3rem;
    margin-bottom: ${e=>e.theme.spacing.md};
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`,tee=h.div`
  text-align: center;
  padding: ${e=>e.theme.spacing.xxl};
  color: ${e=>e.theme.colors.error};
  
  .icon {
    font-size: 3rem;
    margin-bottom: ${e=>e.theme.spacing.md};
  }
  
  button {
    margin-top: ${e=>e.theme.spacing.md};
    padding: ${e=>e.theme.spacing.sm} ${e=>e.theme.spacing.md};
    background: ${e=>e.theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${e=>e.theme.borderRadius.md};
    cursor: pointer;
    
    &:hover {
      background: ${e=>e.theme.colors.primaryDark};
    }
  }
`,ree=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing.xl} 0;
  margin-top: ${e=>e.theme.spacing.lg};
`,nee="http://localhost:8080/api/care-requests",oee=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),iee=se.create({baseURL:nee,headers:{"Content-Type":"application/json"}});iee.interceptors.request.use(e=>{const t=oee();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const Tr=e=>Promise.resolve({data:e}),Ca={getAllCareRequests:(e={})=>{{const{page:t=0,size:r=20,status:n}=e;let o=[...ho];n&&n!=="ALL"&&(o=o.filter(c=>c.status===n));const a=t*r,s=o.slice(a,a+r);return Tr({careRequests:s,totalCount:o.length})}},getCareRequest:e=>{{const t=ho.find(r=>r.idx===Number(e));return Tr(t||ho[0])}},createCareRequest:e=>Tr({idx:99,...e}),updateCareRequest:(e,t)=>Tr({idx:e,...t}),deleteCareRequest:e=>Tr({}),getMyCareRequests:e=>Tr({careRequests:ho.filter(t=>t.userId===1),totalCount:1}),updateStatus:(e,t)=>Tr({}),getComments:e=>Tr([]),createComment:(e,t)=>Tr({idx:1,...t}),deleteComment:(e,t)=>Tr({}),searchCareRequests:(e,t=0,r=20)=>Tr({careRequests:e?ho.filter(n=>n.title&&n.title.includes(e)||n.description&&n.description.includes(e)):ho,totalCount:ho.length})},Ec={location:{color:"#4A90D9",icon:"🏥",label:"주변서비스",zIndex:100},meetup:{color:"#52C41A",icon:"🐾",label:"모임",zIndex:200},care:{color:"#FAAD14",icon:"💛",label:"펫케어",zIndex:300}},A$=(e,t)=>{const r=Ec[e],n={location:t.category||t.address||t.roadAddress||"",meetup:t.meetupDate?`${t.meetupDate.slice(0,10)} · ${t.currentParticipants??0}/${t.maxParticipants??0}명`:`${t.currentParticipants??0}/${t.maxParticipants??0}명`,care:t.date?`${String(t.date).slice(0,10)} · ${t.petName||""}`:t.petName||""}[e];return{idx:t.idx,name:t.name||t.title||"",latitude:t.latitude,longitude:t.longitude,markerColor:r.color,id:`${e}-${t.idx}`,type:e,title:t.name||t.title||"",subtitle:n||"",raw:t}},aee={location:{4:30,5:50,6:100,7:150,8:250,9:400,default:500},meetup:{4:30,5:50,6:100,7:200,8:350,9:500,default:800},care:{4:20,5:30,6:50,7:80,8:150,9:250,default:400}},O$=(e,t)=>{const r=aee[e],n=t<=4?4:t>=10?"default":t;return r[n]??r.default},see=async({type:e,lat:t,lng:r,radius:n,keyword:o,category:a,sort:s,mapLevel:c=7})=>{if(e==="location"){const l=typeof n=="number"&&Number.isFinite(n)?n:5;return((await _l.searchPlaces({latitude:t,longitude:r,radius:l*1e3,...o&&{keyword:o},...a&&{category:a},...s&&{sort:s},size:O$("location",c)}))?.data?.services??[]).map(f=>A$("location",f))}if(e==="meetup"){const l=await rr.getNearbyMeetups(t,r,n,O$("meetup",c));return(l?.data?.meetups??l?.data??[]).map(d=>A$("meetup",d))}return e==="care"?[]:[]},cee=[{id:"location",...Ec.location,disabled:!1},{id:"meetup",...Ec.meetup,disabled:!1},{id:"care",...Ec.care,disabled:!1}],lee=({activeLayer:e,onTabChange:t})=>i.jsx(dee,{role:"tablist",children:i.jsx(uee,{children:cee.map(r=>i.jsxs(hee,{role:"tab","aria-selected":e===r.id,$active:e===r.id,$domain:r.id,$disabled:r.disabled,onClick:()=>!r.disabled&&t(r.id),title:r.disabled?"준비 중":r.label,children:[i.jsx(fee,{"aria-hidden":"true",children:r.icon}),i.jsx(pee,{children:r.label}),r.disabled&&i.jsx(mee,{children:"준비중"})]},r.id))})}),dee=h.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: ${e=>e.theme.colors.surfaceElevated+"D9"};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 50px;
  box-shadow: ${e=>e.theme.shadows.md};
`,uee=h.div`
  display: flex;
  gap: 8px;
  align-items: center;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`,hee=h.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  border-radius: 50px;
  border: 1.5px solid ${e=>e.$active?e.theme.colors.domain[e.$domain]||e.theme.colors.primary:e.theme.colors.border};
  background: ${e=>e.$active?e.theme.colors.domain[e.$domain]||e.theme.colors.primary:e.theme.colors.surfaceElevated+"D9"};
  color: ${e=>e.$active?e.theme.colors.textInverse:e.theme.colors.textSecondary};
  font-size: 13px;
  font-weight: ${e=>e.$active?"600":"400"};
  cursor: ${e=>e.$disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.$disabled?.4:1};
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
  white-space: nowrap;

  &:hover:not([disabled]) {
    border-color: ${e=>e.theme.colors.domain[e.$domain]||e.theme.colors.primary};
  }
`,fee=h.span`
  font-size: 15px;
`,pee=h.span``,mee=h.span`
  font-size: 10px;
  background: ${e=>e.theme.colors.border};
  color: ${e=>e.theme.colors.textMuted};
  padding: 1px 5px;
  border-radius: 999px;
  margin-left: 2px;
`,gee=[1,3,5,10],xee=({radius:e,onRadiusChange:t})=>i.jsx(vee,{children:gee.map(r=>i.jsxs(yee,{$active:e===r,onClick:()=>t(r),children:[r,"km"]},r))}),vee=h.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 10px 8px 14px;
`,yee=h.button`
  padding: 6px 14px;
  border-radius: 50px;
  border: 1.5px solid ${e=>e.$active?e.theme.colors.primary:e.theme.colors.border};
  background: ${e=>e.$active?e.theme.colors.primarySoft:e.theme.colors.surfaceElevated+"D9"};
  color: ${e=>e.$active?e.theme.colors.primary:e.theme.colors.textSecondary};
  font-size: 12px;
  font-weight: ${e=>e.$active?"600":"400"};
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
  white-space: nowrap;

  &:hover {
    border-color: ${e=>e.theme.colors.primary};
    color: ${e=>e.theme.colors.primary};
  }
`,mm=[{id:"medical",label:"반려의료",apiValue:"반려의료",leaves:[{apiValue:"동물병원",label:"동물병원"},{apiValue:"동물약국",label:"동물약국"}]},{id:"travel",label:"반려동반여행",apiValue:"반려동반여행",leaves:[{apiValue:"미술관",label:"미술관"},{apiValue:"문예회관",label:"문예회관"},{apiValue:"펜션",label:"펜션"},{apiValue:"여행지",label:"여행지"},{apiValue:"박물관",label:"박물관"},{apiValue:"호텔",label:"호텔"},{apiValue:"숙박",label:"숙박"},{apiValue:"레포츠",label:"레포츠"},{apiValue:"문화시설",label:"문화시설"}]},{id:"dining",label:"식당·카페",apiValue:"반려동물식당카페",leaves:[{apiValue:"카페",label:"카페"},{apiValue:"식당",label:"식당"}]},{id:"service",label:"용품·서비스",apiValue:"반려동물 서비스",leaves:[{apiValue:"반려동물용품",label:"용품·펫샵"},{apiValue:"미용",label:"미용"},{apiValue:"위탁관리",label:"위탁관리"}]},{id:"culture",label:"반려문화시설",apiValue:"반려문화시설",leaves:[{apiValue:"미술관",label:"미술관"}]}],bee=["반려동반여행","반려동물식당카페"],wee={카페:"dining",미술관:"culture"};function $ee(e,t){if(t){const o=mm.find(a=>a.id===t);if(o)return o}if(!e)return null;const r=mm.filter(o=>o.apiValue===e||o.leaves.some(a=>a.apiValue===e));if(r.length===0)return null;if(r.length===1)return r[0];const n=wee[e];if(n){const o=r.find(a=>a.id===n);if(o)return o}return r[0]}const Xh=["stable","distance","rating","reviews"],R$={stable:"추천순",distance:"거리순",rating:"평점순",reviews:"리뷰순"},See=[1,3,5,10],jee=({keyword:e,category:t,intentSignals:r=[],activeGroupId:n=null,sort:o="distance",hasPendingAreaChange:a=!1,radius:s,onSearch:c,onCategoryPick:l,onSortChange:u,onSearchThisArea:d,onRadiusChange:f,onSignalPick:m})=>{const[g,x]=p.useState(e||""),[v,b]=p.useState(!1);p.useEffect(()=>{x(e||"")},[e]);const E=S=>{S.preventDefault(),c?.(g.trim())},w=()=>{const S=Xh.indexOf(o);u?.(Xh[(S+1)%Xh.length])},j=$ee(t,n);return i.jsxs(kee,{children:[i.jsxs(Eee,{children:[i.jsxs(Cee,{onSubmit:E,children:[i.jsx(Pee,{"aria-hidden":"true",children:"🔍"}),i.jsx(Aee,{value:g,onChange:S=>x(S.target.value),placeholder:"시설명, 주소 검색...","aria-label":"시설 검색"}),a?i.jsx(Ree,{type:"button",onClick:d,children:"이 지역"}):i.jsx(Oee,{type:"submit",children:"검색"})]}),i.jsxs(Tee,{type:"button",onClick:w,"aria-label":"정렬 변경",children:[R$[o]??R$.stable," ▾"]}),i.jsx(Iee,{type:"button",$active:v,onClick:()=>b(S=>!S),"aria-expanded":v,"aria-controls":"radius-filter-panel","aria-label":"반경 필터",children:"필터"})]}),i.jsx(T$,{children:"중분류"}),i.jsxs(zee,{role:"group","aria-label":"장소 유형 (중분류, API category2)",children:[i.jsx(I$,{type:"button",$active:!t,onClick:()=>l?.({category:"",groupId:null}),children:"전체"}),mm.map(S=>i.jsx(I$,{type:"button",$active:!!t&&j?.id===S.id,onClick:()=>{t===S.apiValue?l?.({category:"",groupId:null}):l?.({category:S.apiValue,groupId:S.id})},children:S.label},S.id))]}),j&&i.jsxs(i.Fragment,{children:[i.jsx(T$,{children:"소분류"}),i.jsx(Nee,{role:"group","aria-label":"세부 유형 (소분류, API category3)",children:j.leaves.map(S=>i.jsx(Bee,{type:"button",$active:t===S.apiValue,onClick:()=>{t===S.apiValue?l?.({category:j.apiValue,groupId:j.id}):l?.({category:S.apiValue,groupId:j.id})},children:S.label},`${j.id}-${S.apiValue}`))})]}),r.length>0&&i.jsx(Dee,{children:r.slice(0,2).map((S,y)=>{const k=S.targetCategory||S.recommendedCategories?.[0];return k?i.jsxs(_ee,{type:"button",onClick:()=>m?.(k),children:[i.jsx(Lee,{children:S.cardMessage||"최근 입력 기반 추천이 있어요."}),i.jsx(Mee,{children:S.actionLabel||`근처 ${k} 보기`})]},`${S.intent||"intent"}-${k}-${y}`):null})}),v&&f&&i.jsxs(Fee,{id:"radius-filter-panel",children:[i.jsx(Uee,{children:"반경"}),i.jsx(qee,{children:See.map(S=>i.jsxs(Wee,{type:"button",$active:s===S,onClick:()=>f(S),children:[S,"km"]},S))})]})]})},kee=h.div`
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Eee=h.div`
  display: flex;
  gap: 6px;
  align-items: center;
`,Cee=h.form`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  background: ${e=>e.theme.colors.background};
  border: 1.5px solid ${e=>e.theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: ${e=>e.theme.shadows.sm};
  &:focus-within {
    border-color: ${e=>e.theme.colors.primary};
    box-shadow: ${e=>e.theme.shadows.focus}, ${e=>e.theme.shadows.sm};
  }
`,Pee=h.span`
  padding: 0 4px 0 12px;
  font-size: 13px;
  flex-shrink: 0;
  opacity: 0.5;
`,Aee=h.input`
  flex: 1;
  height: 36px;
  padding: 0 4px;
  border: none;
  background: transparent;
  color: ${e=>e.theme.colors.text};
  font-size: 13px;
  outline: none;
  min-width: 0;
  &::placeholder { color: ${e=>e.theme.colors.textMuted}; }
`,Oee=h.button`
  height: 36px;
  padding: 0 12px;
  border: none;
  border-radius: 0 999px 999px 0;
  background: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s;
  &:hover { background: ${e=>e.theme.colors.primaryDark}; }
`,Ree=h.button`
  height: 36px;
  padding: 0 10px;
  border: none;
  border-radius: 0 999px 999px 0;
  background: ${e=>e.theme.colors.primary};
  color: ${e=>e.theme.colors.textInverse};
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  flex-shrink: 0;
  white-space: nowrap;
  transition: background 0.15s;
  &:hover { background: ${e=>e.theme.colors.primaryDark}; }
`,Tee=h.button`
  height: 36px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1.5px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s;
  &:hover {
    border-color: ${e=>e.theme.colors.primary};
    color: ${e=>e.theme.colors.primary};
  }
`,Iee=h.button`
  height: 36px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1.5px solid ${e=>e.$active?e.theme.colors.primary:e.theme.colors.border};
  background: ${e=>e.$active?e.theme.colors.primarySoft:e.theme.colors.surface};
  color: ${e=>e.$active?e.theme.colors.primary:e.theme.colors.textSecondary};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s;
  &:hover {
    border-color: ${e=>e.theme.colors.primary};
    color: ${e=>e.theme.colors.primary};
  }
`,Dee=h.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 2px 0;
`,_ee=h.button`
  min-width: 0;
  max-width: 100%;
  border: 1px solid ${e=>e.theme.colors.primary};
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.primary};
  border-radius: 8px;
  padding: 7px 9px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;
`,Lee=h.span`
  display: block;
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Mee=h.span`
  flex-shrink: 0;
  color: ${e=>e.theme.colors.textInverse};
  background: ${e=>e.theme.colors.primary};
  border-radius: 999px;
  padding: 3px 7px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
`,zee=h.div`
  display: flex;
  gap: 5px;
  overflow-x: auto;
  padding-bottom: 2px;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`,T$=h.div`
  font-size: 10px;
  font-weight: 700;
  color: ${e=>e.theme.colors.textMuted};
  padding: 0 2px;
  margin-top: 2px;
`,Nee=h.div`
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding-bottom: 2px;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`,I$=h.button`
  padding: 4px 12px;
  border-radius: 999px;
  border: 1.5px solid
    ${e=>e.$active?e.theme.colors.domain.location:e.theme.colors.border};
  background: ${e=>e.$active?e.theme.colors.domain.location+"22":"transparent"};
  color: ${e=>e.$active?e.theme.colors.domain.location:e.theme.colors.textSecondary};
  font-size: 12px;
  font-weight: ${e=>e.$active?600:400};
  white-space: nowrap;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s;
  &:hover {
    border-color: ${e=>e.theme.colors.domain.location};
    color: ${e=>e.theme.colors.domain.location};
    background: ${e=>e.theme.colors.domain.location+"14"};
  }
`,Bee=h.button`
  padding: 4px 12px;
  border-radius: 999px;
  border: 1.5px solid ${e=>e.$active?e.theme.colors.domain.location:e.theme.colors.border};
  background: ${e=>e.$active?e.theme.colors.domain.location+"22":"transparent"};
  color: ${e=>e.$active?e.theme.colors.domain.location:e.theme.colors.textSecondary};
  font-size: 12px;
  font-weight: ${e=>e.$active?600:400};
  white-space: nowrap;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s;
  &:hover {
    border-color: ${e=>e.theme.colors.domain.location};
    color: ${e=>e.theme.colors.domain.location};
    background: ${e=>e.theme.colors.domain.location+"14"};
  }
`,Fee=h.div`
  padding: 8px 10px;
  border: 1.5px solid ${e=>e.theme.colors.border};
  border-radius: 14px;
  background: ${e=>e.theme.colors.background};
  display: flex;
  align-items: center;
  gap: 10px;
`,Uee=h.span`
  font-size: 11px;
  font-weight: 700;
  color: ${e=>e.theme.colors.textSecondary};
  flex-shrink: 0;
`,qee=h.div`
  display: flex;
  gap: 5px;
`,Wee=h.button`
  padding: 4px 14px;
  border-radius: 999px;
  border: 1.5px solid ${e=>e.$active?e.theme.colors.primary:e.theme.colors.border};
  background: ${e=>e.$active?e.theme.colors.primary+"18":"transparent"};
  color: ${e=>e.$active?e.theme.colors.primary:e.theme.colors.textSecondary};
  font-size: 12px;
  font-weight: ${e=>e.$active?700:400};
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s;
  &:hover {
    border-color: ${e=>e.theme.colors.primary};
    color: ${e=>e.theme.colors.primary};
  }
`,Hee=({onCreateClick:e})=>i.jsx(Vee,{children:i.jsx(Kee,{onClick:e,children:"➕ 모임 만들기"})}),Vee=h.div`
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`,Kee=h.button`
  padding: 7px 16px;
  border-radius: 8px;
  border: none;
  background: ${e=>e.theme.colors.domain.meetup};
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover { opacity: 0.88; }
`,Gee=({onCreateClick:e})=>i.jsx(Yee,{children:i.jsx(Xee,{onClick:e,children:"➕ 케어 요청 등록"})}),Yee=h.div`
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`,Xee=h.button`
  padding: 7px 16px;
  border-radius: 8px;
  border: none;
  background: ${e=>e.theme.colors.domain.care};
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover { opacity: 0.88; }
`,D$={},_$={lat:37.5665,lng:126.978},L$=15,M$=D$?.VITE_NAVER_MAPS_KEY_ID||D$?.VITE_NAVER_MAPS_CLIENT_ID||"",mA=({lat:e,lng:t,selectedLabel:r,onSelect:n})=>{const o=p.useRef(null),a=p.useRef(null),s=p.useRef(null),[c,l]=p.useState(!1),[u,d]=p.useState(!1),[f,m]=p.useState("지도를 클릭하면 장소가 설정됩니다");p.useEffect(()=>{const x=()=>{if(!o.current||a.current||!window.naver?.maps)return;const E=e&&t?new window.naver.maps.LatLng(e,t):new window.naver.maps.LatLng(_$.lat,_$.lng),w=new window.naver.maps.Map(o.current,{center:E,zoom:L$,zoomControl:!1,logoControl:!1,mapDataControl:!1,scaleControl:!1});a.current=w,d(!0),e&&t&&g(new window.naver.maps.LatLng(e,t)),window.naver.maps.Event.addListener(w,"click",async j=>{const S=j.coord||j.latlng;if(S){g(S),l(!0),m("주소 가져오는 중...");try{const y=await Bi.coordinatesToAddress(S.lat(),S.lng()),k=y?.address||y?.roadAddress||y?.jibunAddress||"";n?.(S.lat(),S.lng(),k,y),m(k||"선택된 위치")}catch{n?.(S.lat(),S.lng(),""),m("선택된 위치")}finally{l(!1)}}})};if(window.naver?.maps){x();return}if(document.querySelector('script[src*="map.naver.com"]')){const E=setInterval(()=>{window.naver?.maps&&(clearInterval(E),x())},100);return()=>clearInterval(E)}if(!M$)return;const b=document.createElement("script");return b.src=`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${M$}`,b.async=!0,b.onload=x,document.head.appendChild(b),()=>{a.current&&(a.current=null)}},[]),p.useEffect(()=>{if(!a.current||!window.naver?.maps||!e||!t)return;const x=new window.naver.maps.LatLng(e,t);a.current.setCenter(x),a.current.setZoom(L$),g(x),m(r||"선택된 위치")},[e,t,r]),p.useEffect(()=>{!u||e||t||!navigator.geolocation||!a.current||navigator.geolocation.getCurrentPosition(x=>{const v=new window.naver.maps.LatLng(x.coords.latitude,x.coords.longitude);a.current?.setCenter(v),m("내 위치 주변에서 장소를 선택하세요")},()=>{m("지도를 클릭하면 장소가 설정됩니다")},{enableHighAccuracy:!0,timeout:8e3,maximumAge:6e4})},[u,e,t]);const g=x=>{!a.current||!window.naver?.maps||(s.current&&s.current.setMap(null),s.current=new window.naver.maps.Marker({position:x,map:a.current}))};return i.jsxs(Zee,{children:[i.jsx(Jee,{ref:o}),i.jsx(Qee,{$loading:c,children:c?"📍 주소 조회 중...":`📍 ${f}`})]})},Zee=h.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${e=>e.theme.colors.border};
`,Jee=h.div`
  width: 100%;
  height: 220px;
  background: ${e=>e.theme.colors.background};
`,Qee=h.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 11px;
  padding: 5px 10px;
  white-space: normal;
  line-height: 1.4;
  opacity: ${e=>e.$loading?.7:1};
`,ete=()=>({title:"",description:"",location:"",latitude:null,longitude:null,date:"",maxParticipants:10}),tte=({onClose:e,onSuccess:t})=>{const{checkAndRedirect:r,EmailVerificationPromptComponent:n}=tx("MEETUP"),[o,a]=p.useState(ete()),[s,c]=p.useState({}),[l,u]=p.useState(!1),[d,f]=p.useState(""),[m,g]=p.useState([]),[x,v]=p.useState(!1),[b,E]=p.useState(!1),[w,j]=p.useState(!1),[S,y]=p.useState(null),k=p.useRef(null),$=p.useRef(null);p.useEffect(()=>{if(!d||d.trim().length<2){g([]),v(!1);return}const O=setTimeout(async()=>{E(!0);try{const D=await Bi.searchPlaces(d);D&&D.success&&D.results&&D.results.length>0?(g(D.results),v(!0)):(g([]),v(!1))}catch{g([])}finally{E(!1)}},500);return()=>clearTimeout(O)},[d]),p.useEffect(()=>{const O=D=>{k.current&&!k.current.contains(D.target)&&$.current&&!$.current.contains(D.target)&&v(!1)};return document.addEventListener("mousedown",O),()=>document.removeEventListener("mousedown",O)},[]);const C=O=>{a(D=>({...D,location:O.address,latitude:O.latitude,longitude:O.longitude})),f(O.address),y({address:O.address,roadAddress:O.roadAddress||O.address,jibunAddress:O.jibunAddress||""}),v(!1),c(D=>{const A={...D};return delete A.location,A})},P=(O,D,A,M)=>{a(I=>({...I,location:A||I.location,latitude:O,longitude:D})),A&&f(A),y(M?{address:M.address||A||"",roadAddress:M.roadAddress||M.address||A||"",jibunAddress:M.jibunAddress||""}:null),c(I=>{const T={...I};return delete T.location,T})},z=O=>{const D=O.target.value;f(D),a(A=>!A.location||D===A.location?A:{...A,location:"",latitude:null,longitude:null}),y(null),s.location&&c(A=>{const M={...A};return delete M.location,M})},_=()=>{a(O=>({...O,location:"",latitude:null,longitude:null})),f(""),y(null),g([]),v(!1)},N=O=>{const{name:D,value:A}=O.target;a(M=>({...M,[D]:D==="maxParticipants"?Number(A):A})),s[D]&&c(M=>{const I={...M};return delete I[D],I})},R=()=>{const O={};return o.title.trim()||(O.title="제목을 입력해주세요."),o.location.trim()||(O.location="장소를 입력해주세요."),(!o.latitude||!o.longitude)&&(O.location="검색 결과를 누르거나 지도에서 위치를 찍어주세요."),o.date?new Date(o.date)<new Date&&(O.date="현재 이후 시간을 입력해주세요."):O.date="날짜/시간을 입력해주세요.",(!o.maxParticipants||o.maxParticipants<1)&&(O.maxParticipants="1명 이상이어야 합니다."),c(O),Object.keys(O).length===0},F=async O=>{if(O.preventDefault(),!!r()&&R()){u(!0);try{await rr.createMeetup({title:o.title,description:o.description,location:o.location,latitude:o.latitude,longitude:o.longitude,date:o.date,maxParticipants:o.maxParticipants}),t?.(),e()}catch(D){alert(D.response?.data?.error||"모임 등록에 실패했습니다.")}finally{u(!1)}}};return i.jsxs(rte,{onClick:O=>{O.target===O.currentTarget&&e()},children:[i.jsx(n,{}),i.jsxs(nte,{children:[i.jsxs(ote,{children:[i.jsx(ite,{children:"🐾 모임 만들기"}),i.jsx(ate,{onClick:e,children:"✕"})]}),i.jsxs(ste,{onSubmit:F,children:[i.jsxs(la,{children:[i.jsx(da,{children:"제목 *"}),i.jsx(Xs,{name:"title",value:o.title,onChange:N,placeholder:"모임 이름을 입력하세요"}),s.title&&i.jsx(Zs,{children:s.title})]}),i.jsxs(la,{children:[i.jsxs(mte,{children:[i.jsx(da,{children:"장소 *"}),i.jsx(gte,{type:"button",onClick:()=>j(O=>!O),children:w?"지도 숨기기":"지도 보기"})]}),i.jsxs(lte,{children:[i.jsx(Xs,{ref:k,value:d,onChange:z,placeholder:"모임 장소를 검색하세요",autoComplete:"off"}),b&&i.jsx(dte,{children:"검색 중..."}),x&&m.length>0&&i.jsx(z$,{ref:$,children:m.map((O,D)=>i.jsxs(ute,{onClick:()=>C(O),children:[i.jsx(hte,{children:O.address}),O.jibunAddress&&O.jibunAddress!==O.address&&i.jsx(fte,{children:O.jibunAddress})]},D))}),x&&!b&&d.trim().length>=2&&m.length===0&&i.jsx(z$,{ref:$,children:i.jsx(pte,{children:"검색 결과가 없습니다. 지도로 직접 선택해보세요."})})]}),i.jsx(xte,{children:"검색 결과를 눌러 위치를 확정하거나, 필요하면 지도에서 직접 찍어주세요."}),o.location&&o.latitude&&o.longitude&&i.jsxs(vte,{children:[i.jsx(yte,{children:"선택된 장소"}),i.jsx(bte,{children:S?.roadAddress||o.location}),S?.jibunAddress&&S.jibunAddress!==(S?.roadAddress||o.location)&&i.jsx(wte,{children:S.jibunAddress}),i.jsx($te,{type:"button",onClick:_,children:"다시 선택"})]}),s.location&&i.jsx(Zs,{children:s.location}),w&&i.jsx(mA,{lat:o.latitude,lng:o.longitude,selectedLabel:S?.roadAddress||o.location,onSelect:P})]}),i.jsxs(la,{children:[i.jsx(da,{children:"날짜 / 시간 *"}),i.jsx(Xs,{type:"datetime-local",name:"date",value:o.date,onChange:N,min:new Date().toISOString().slice(0,16)}),s.date&&i.jsx(Zs,{children:s.date})]}),i.jsxs(la,{children:[i.jsx(da,{children:"최대 인원 *"}),i.jsx(Xs,{type:"number",name:"maxParticipants",value:o.maxParticipants,onChange:N,min:"1",max:"100"}),s.maxParticipants&&i.jsx(Zs,{children:s.maxParticipants})]}),i.jsxs(la,{children:[i.jsx(da,{children:"설명"}),i.jsx(cte,{name:"description",value:o.description,onChange:N,placeholder:"모임 소개, 준비물, 주의사항 등을 입력하세요",rows:4})]}),i.jsxs(Ste,{children:[i.jsx(jte,{type:"button",onClick:e,children:"취소"}),i.jsx(kte,{type:"submit",disabled:l,children:l?"등록 중...":"모임 만들기"})]})]})]})]})},rte=h.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 16px;
`,nte=h.div`
  background: ${e=>e.theme.colors.surface};
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
`,ote=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px 12px;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  position: sticky;
  top: 0;
  background: ${e=>e.theme.colors.surface};
  z-index: 1;
`,ite=h.h2`
  font-size: 17px;
  font-weight: 700;
  color: ${e=>e.theme.colors.text};
  margin: 0;
`,ate=h.button`
  background: none;
  border: none;
  font-size: 16px;
  color: ${e=>e.theme.colors.textSecondary};
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
  }
`,ste=h.form`
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`,la=h.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,da=h.label`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.theme.colors.textSecondary};
`,Xs=h.input`
  padding: 9px 12px;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: 14px;
  outline: none;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: ${e=>e.theme.colors.primary};
  }
`,cte=h.textarea`
  padding: 9px 12px;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: 14px;
  outline: none;
  resize: none;
  line-height: 1.5;

  &:focus {
    border-color: ${e=>e.theme.colors.primary};
  }
`,lte=h.div`
  position: relative;
`,dte=h.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
`,z$=h.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 100;
  overflow: hidden;
`,ute=h.div`
  padding: 10px 12px;
  cursor: pointer;
  color: ${e=>e.theme.colors.text};

  &:hover {
    background: ${e=>e.theme.colors.surfaceHover};
  }
  & + & {
    border-top: 1px solid
      ${e=>e.theme.colors.borderLight||e.theme.colors.border};
  }
`,hte=h.div`
  font-size: 13px;
`,fte=h.div`
  font-size: 11px;
  color: ${e=>e.theme.colors.textSecondary};
  margin-top: 2px;
`,pte=h.div`
  padding: 10px 12px;
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
`,mte=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,gte=h.button`
  background: none;
  border: none;
  font-size: 12px;
  color: ${e=>e.theme.colors.primary};
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
`,xte=h.div`
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
  line-height: 1.4;
`,vte=h.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surfaceSoft||e.theme.colors.background};
`,yte=h.div`
  font-size: 11px;
  font-weight: 700;
  color: ${e=>e.theme.colors.primary};
`,bte=h.div`
  font-size: 13px;
  color: ${e=>e.theme.colors.text};
  line-height: 1.5;
`,wte=h.div`
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
  line-height: 1.4;
`,$te=h.button`
  align-self: flex-start;
  margin-top: 2px;
  border: none;
  background: none;
  padding: 0;
  font-size: 12px;
  color: ${e=>e.theme.colors.primary};
  cursor: pointer;
  text-decoration: underline;
`,Zs=h.span`
  font-size: 12px;
  color: ${e=>e.theme.colors.error||"#ef4444"};
`,Ste=h.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 4px;
`,jte=h.button`
  padding: 9px 18px;
  border-radius: 8px;
  border: 1px solid ${e=>e.theme.colors.border};
  background: none;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 14px;
  cursor: pointer;
`,kte=h.button`
  padding: 9px 20px;
  border-radius: 8px;
  border: none;
  background: ${e=>e.theme.colors.primary};
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`,Ete=()=>({title:"",description:"",address:"",latitude:null,longitude:null,date:"",scheduleMode:"FIXED",estimatedDurationMinutes:"",offeredCoins:"",petIdx:""}),Cte=({onClose:e,onSuccess:t})=>{const{checkAndRedirect:r,EmailVerificationPromptComponent:n}=tx("PET_CARE"),[o,a]=p.useState(Ete()),[s,c]=p.useState({}),[l,u]=p.useState(!1),[d,f]=p.useState(""),[m,g]=p.useState([]),[x,v]=p.useState(!1),[b,E]=p.useState(!1),[w,j]=p.useState(!0),[S,y]=p.useState([]),[k,$]=p.useState(null),[C,P]=p.useState(!1),z=p.useRef(null),_=p.useRef(null);p.useEffect(()=>{si.getMyPets().then(A=>y(A.data||[])).catch(()=>{}),Ra.getBalance().then(A=>$(A?.balance??0)).catch(()=>{})},[]),p.useEffect(()=>{if(!d||d.trim().length<2){g([]),v(!1);return}const A=setTimeout(async()=>{E(!0);try{const M=await Bi.searchPlaces(d);M&&M.success&&M.results&&M.results.length>0?(g(M.results),v(!0)):(g([]),v(!1))}catch{g([])}finally{E(!1)}},500);return()=>clearTimeout(A)},[d]),p.useEffect(()=>{const A=M=>{z.current&&!z.current.contains(M.target)&&_.current&&!_.current.contains(M.target)&&v(!1)};return document.addEventListener("mousedown",A),()=>document.removeEventListener("mousedown",A)},[]);const N=A=>{a(M=>({...M,address:A.address,latitude:A.latitude,longitude:A.longitude})),f(A.address),v(!1),c(M=>{const I={...M};return delete I.address,I})},R=(A,M,I)=>{a(T=>({...T,address:I||T.address,latitude:A,longitude:M})),I&&f(I),c(T=>{const B={...T};return delete B.address,B})},F=A=>{const{name:M,value:I}=A.target;a(T=>({...T,[M]:I})),s[M]&&c(T=>{const B={...T};return delete B[M],B})},O=()=>{const A={};if(o.title.trim()||(A.title="제목을 입력해주세요."),o.date?new Date(o.date)<new Date&&(A.date="현재 이후 시간을 입력해주세요."):A.date="날짜/시간을 입력해주세요.",o.offeredCoins!==""&&Number(o.offeredCoins)<0&&(A.offeredCoins="0 이상의 값을 입력해주세요."),o.estimatedDurationMinutes!==""){const M=Number(o.estimatedDurationMinutes);(!Number.isInteger(M)||M<15||M>1440)&&(A.estimatedDurationMinutes="15~1440분 사이 정수만 입력 가능합니다.")}return c(A),Object.keys(A).length===0},D=async A=>{if(A.preventDefault(),!!r()&&O()){u(!0);try{await Ca.createCareRequest({title:o.title,description:o.description,address:o.address||void 0,latitude:o.latitude||void 0,longitude:o.longitude||void 0,date:o.date,scheduleMode:o.scheduleMode||"FIXED",estimatedDurationMinutes:o.estimatedDurationMinutes!==""?Number(o.estimatedDurationMinutes):void 0,offeredCoins:o.offeredCoins!==""?Number(o.offeredCoins):void 0,petIdx:o.petIdx||void 0}),t?.(),e()}catch(M){alert(M.response?.data?.error||"케어 요청 등록에 실패했습니다.")}finally{u(!1)}}};return i.jsxs(Pte,{onClick:A=>{A.target===A.currentTarget&&e()},children:[i.jsx(n,{}),i.jsxs(Ate,{children:[i.jsxs(Ote,{children:[i.jsx(Rte,{children:"🐾 케어 요청 등록"}),i.jsx(Tte,{onClick:e,children:"✕"})]}),i.jsxs(Ite,{onSubmit:D,children:[i.jsxs(qn,{children:[i.jsx(Wn,{children:"제목 *"}),i.jsx(ua,{name:"title",value:o.title,onChange:F,placeholder:"케어 요청 제목을 입력하세요"}),s.title&&i.jsx(ha,{children:s.title})]}),i.jsxs(qn,{children:[i.jsx(Wn,{children:"날짜 / 시간 *"}),i.jsx(ua,{type:"datetime-local",name:"date",value:o.date,onChange:F,min:new Date().toISOString().slice(0,16)}),s.date&&i.jsx(ha,{children:s.date}),i.jsxs(Dte,{type:"button",onClick:()=>P(A=>!A),children:["위 날짜·시간이 어떤 의미인지 안내 ",C?"▼":"▶"]}),C&&i.jsxs(_te,{children:[i.jsx("strong",{children:"고정 일정:"})," 날짜·시간을 약속(또는 희망) 시작 시각으로 봅니다.",i.jsx("br",{}),i.jsx("strong",{children:"채팅 후 조율:"})," 날짜·시간은 참고용이며, 채팅으로 확정합니다."]})]}),i.jsxs(N$,{children:[i.jsxs(qn,{style:{flex:1},children:[i.jsx(Wn,{children:"일정 유형"}),i.jsxs(B$,{name:"scheduleMode",value:o.scheduleMode,onChange:F,children:[i.jsx("option",{value:"FIXED",children:"고정 일정"}),i.jsx("option",{value:"FLEXIBLE_CHAT",children:"채팅 후 조율"})]})]}),i.jsxs(qn,{style:{flex:1},children:[i.jsx(Wn,{children:"예상 소요(분)"}),i.jsx(ua,{type:"number",name:"estimatedDurationMinutes",value:o.estimatedDurationMinutes,onChange:F,placeholder:"선택 · 15~1440",min:"15",max:"1440",step:"1"}),s.estimatedDurationMinutes&&i.jsx(ha,{children:s.estimatedDurationMinutes})]})]}),i.jsxs(qn,{children:[i.jsxs(Ute,{children:[i.jsx(Wn,{children:"위치 (선택)"}),i.jsx(qte,{type:"button",onClick:()=>j(A=>!A),children:w?"지도 숨기기":"지도 보기"})]}),i.jsxs(zte,{children:[i.jsx(ua,{ref:z,value:d,onChange:A=>f(A.target.value),placeholder:"주소를 검색하거나 지도를 클릭하세요",autoComplete:"off"}),b&&i.jsx(Nte,{children:"검색 중..."}),x&&m.length>0&&i.jsx(Bte,{ref:_,children:m.map((A,M)=>i.jsxs(Fte,{onClick:()=>N(A),children:[i.jsx(Wte,{children:A.address}),A.jibunAddress&&A.jibunAddress!==A.address&&i.jsx(Hte,{children:A.jibunAddress})]},M))})]}),s.address&&i.jsx(ha,{children:s.address}),w&&i.jsx(mA,{lat:o.latitude,lng:o.longitude,onSelect:R})]}),i.jsxs(N$,{children:[i.jsxs(qn,{style:{flex:1},children:[i.jsxs(Wn,{children:["제공 코인 (선택)",k!=null&&i.jsxs(Lte,{children:[" · 보유 ",k.toLocaleString(),"C"]})]}),i.jsx(ua,{type:"number",name:"offeredCoins",value:o.offeredCoins,onChange:F,placeholder:"0",min:"0"}),s.offeredCoins&&i.jsx(ha,{children:s.offeredCoins})]}),S.length>0&&i.jsxs(qn,{style:{flex:1},children:[i.jsx(Wn,{children:"반려동물 (선택)"}),i.jsxs(B$,{name:"petIdx",value:o.petIdx,onChange:F,children:[i.jsx("option",{value:"",children:"선택 안함"}),S.map(A=>i.jsx("option",{value:A.idx,children:A.name},A.idx))]})]})]}),i.jsxs(qn,{children:[i.jsx(Wn,{children:"설명"}),i.jsx(Mte,{name:"description",value:o.description,onChange:F,placeholder:"케어 요청 내용, 반려동물 특이사항 등을 입력하세요",rows:4})]}),i.jsxs(Vte,{children:[i.jsx(Kte,{type:"button",onClick:e,children:"취소"}),i.jsx(Gte,{type:"submit",disabled:l,children:l?"등록 중...":"요청 등록"})]})]})]})]})},Pte=h.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 16px;
`,Ate=h.div`
  background: ${e=>e.theme.colors.surface};
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 40px rgba(0,0,0,0.2);
`,Ote=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px 12px;
  border-bottom: 1px solid ${e=>e.theme.colors.border};
  position: sticky;
  top: 0;
  background: ${e=>e.theme.colors.surface};
  z-index: 1;
`,Rte=h.h2`
  font-size: 17px;
  font-weight: 700;
  color: ${e=>e.theme.colors.text};
  margin: 0;
`,Tte=h.button`
  background: none;
  border: none;
  font-size: 16px;
  color: ${e=>e.theme.colors.textSecondary};
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  &:hover { background: ${e=>e.theme.colors.surfaceHover}; }
`,Ite=h.form`
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`,qn=h.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,N$=h.div`
  display: flex;
  gap: 12px;
`,Wn=h.label`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.theme.colors.textSecondary};
`,Dte=h.button`
  margin-top: 6px;
  align-self: flex-start;
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
  color: ${e=>e.theme.colors.domain?.care||e.theme.colors.primary};
  cursor: pointer;
  text-decoration: underline;
  text-align: left;
`,_te=h.p`
  margin: 6px 0 0;
  padding: 8px 10px;
  border-radius: 8px;
  background: ${e=>e.theme.colors.surfaceHover};
  font-size: 12px;
  line-height: 1.55;
  color: ${e=>e.theme.colors.textSecondary};
`,Lte=h.span`
  font-weight: 400;
  color: ${e=>e.theme.colors.textSecondary};
`,ua=h.input`
  padding: 9px 12px;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: 14px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  &:focus { border-color: ${e=>e.theme.colors.primary}; }
`,B$=h.select`
  padding: 9px 12px;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: 14px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  &:focus { border-color: ${e=>e.theme.colors.primary}; }
`,Mte=h.textarea`
  padding: 9px 12px;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: 14px;
  outline: none;
  resize: none;
  line-height: 1.5;
  &:focus { border-color: ${e=>e.theme.colors.primary}; }
`,zte=h.div`
  position: relative;
`,Nte=h.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
`,Bte=h.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  z-index: 100;
  overflow: hidden;
`,Fte=h.div`
  padding: 10px 12px;
  font-size: 13px;
  cursor: pointer;
  color: ${e=>e.theme.colors.text};
  &:hover { background: ${e=>e.theme.colors.surfaceHover}; }
  & + & { border-top: 1px solid ${e=>e.theme.colors.borderLight||e.theme.colors.border}; }
`,Ute=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,qte=h.button`
  background: none;
  border: none;
  font-size: 12px;
  color: ${e=>e.theme.colors.domain.care};
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
`,Wte=h.div`
  font-size: 13px;
`,Hte=h.div`
  font-size: 11px;
  color: ${e=>e.theme.colors.textSecondary};
  margin-top: 2px;
`,ha=h.span`
  font-size: 12px;
  color: ${e=>e.theme.colors.error||"#ef4444"};
`,Vte=h.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 4px;
`,Kte=h.button`
  padding: 9px 18px;
  border-radius: 8px;
  border: 1px solid ${e=>e.theme.colors.border};
  background: none;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 14px;
  cursor: pointer;
`,Gte=h.button`
  padding: 9px 20px;
  border-radius: 8px;
  border: none;
  background: ${e=>e.theme.colors.domain.care};
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:hover:not(:disabled) { opacity: 0.9; }
`,Yte="http://localhost:8080/api/location-service-reviews",Xte=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),Zte=se.create({baseURL:Yte,headers:{"Content-Type":"application/json"}});Zte.interceptors.request.use(e=>{const t=Xte();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const fa=e=>Promise.resolve({data:e}),Js={createReview:e=>fa({idx:1,...e}),updateReview:(e,t)=>fa({idx:e,...t}),deleteReview:e=>fa({}),getReviewsByService:e=>fa({reviews:[]}),getReviewsByUser:e=>fa({reviews:[]})},gm=se.create({baseURL:"http://localhost:8080/api/pet-recommend",headers:{"Content-Type":"application/json"}}),xm=()=>localStorage.getItem("accessToken")||localStorage.getItem("token");gm.interceptors.request.use(e=>{const t=xm();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e});const pl={getSignals:async()=>{if(!xm())return[];try{const e=await gm.get("/signals");return Array.isArray(e.data)?e.data:[]}catch{return[]}},interact:async(e,t)=>{if(!(!xm()||!e))try{await gm.post("/interact",null,{params:{locationIdx:e,type:t}})}catch{}}},Jte=Ya`
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
`,Qte=Ya`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`,nx=h.div`
  ${e=>e.$docked?Aa`
          position: relative;
          width: 100%;
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        `:Aa`
          position: absolute;
          bottom: 0;
          right: 0;
          width: ${e.$width||"300px"};
          max-height: ${e.$maxHeight||"65vh"};
          background: ${e.theme.colors.surfaceElevated+"EB"};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 500;
          border: 1px solid ${e.theme.colors.border};
          box-shadow: ${e.theme.shadows.xl};
          animation: ${Jte} 0.25s cubic-bezier(0, 0, 0.2, 1);

          @media (max-width: 600px) {
            width: 100%;
            border-radius: 20px;
            max-height: 60vh;
            animation: ${Qte} 0.25s cubic-bezier(0, 0, 0.2, 1);
          }
        `}
`,ox=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px 6px;
  flex-shrink: 0;
`,ml=h.button`
  background: none;
  border: none;
  color: ${e=>e.theme.colors.textSecondary};
  cursor: pointer;
  font-size: 15px;
  padding: 2px 6px;
  border-radius: 4px;
  &:hover { background: ${e=>e.theme.colors.surfaceHover}; }
`,ix=h.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${e=>e.theme.colors.text};
  margin: 0;
  padding: 0 14px 8px;
`,gl=h.hr`
  border: none;
  border-top: 1px solid ${e=>e.theme.colors.border};
  margin: 0;
  flex-shrink: 0;
`,ze=h.div`
  display: flex;
  gap: 8px;
  font-size: 13px;
  align-items: flex-start;
`,Ne=h.span`
  color: ${e=>e.theme.colors.textSecondary};
  min-width: ${e=>e.$minWidth||"48px"};
  flex-shrink: 0;
  font-size: 12px;
`,Ue=h.span`
  color: ${e=>e.theme.colors.text};
  word-break: break-word;

  a {
    color: ${e=>e.theme.colors.primary};
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`,ax=h.div`
  padding: ${e=>e.$padding||"0 14px"};
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;
`,gA=h.div`
  padding: 10px 14px;
  flex-shrink: 0;
`,ere=20,tre=({selectedItem:e,onClose:t,docked:r=!1})=>{const{user:n}=dt(),[o,a]=p.useState([]),[s,c]=p.useState(0),[l,u]=p.useState(null),[d,f]=p.useState(0),[m,g]=p.useState(!1),[x,v]=p.useState(!1),[b,E]=p.useState(!1),[w,j]=p.useState(""),[S,y]=p.useState(5),[k,$]=p.useState(null),[C,P]=p.useState(!1),z=(D,A,M)=>{D&&(M?E(!0):v(!0),Js.getReviewsByService(D,A,ere).then(I=>{const T=I.data||{},B=T.reviews||[];a(X=>M?[...X,...B]:B),c(T.count??B.length),u(T.averageRating??null),g(!!T.hasNext),f(A)}).catch(()=>{M||(a([]),c(0),u(null),g(!1))}).finally(()=>{M?E(!1):v(!1)}))};if(p.useEffect(()=>{if(!e)return;a([]),c(0),u(null),g(!1),$(null),j(""),y(5);const D=e.raw?.idx;D&&(z(D,0,!1),pl.interact(D,"VIEW"))},[e]),!e)return null;const _=e.raw,N=l!=null?Number(l).toFixed(1):null,R=async D=>{if(D.preventDefault(),!!w.trim()){P(!0);try{k?await Js.updateReview(k.idx,{rating:S,comment:w}):await Js.createReview({serviceIdx:_.idx,rating:S,comment:w}),z(_.idx,0,!1),j(""),y(5),$(null)}catch(A){console.error("리뷰 저장 실패:",A)}finally{P(!1)}}},F=async D=>{if(window.confirm("리뷰를 삭제할까요?"))try{await Js.deleteReview(D),z(_.idx,0,!1)}catch(A){console.error("리뷰 삭제 실패:",A)}},O=D=>{$(D),j(D.comment||""),y(D.rating||5)};return i.jsxs(rre,{$docked:r,$width:"320px",$maxHeight:"70vh",children:[i.jsxs(ox,{children:[i.jsxs(nre,{children:[r&&i.jsx(ore,{onClick:t,"aria-label":"목록으로 돌아가기",children:"←"}),i.jsxs(lre,{children:["🏥 ",_.category||"시설"]})]}),!r&&i.jsx(ml,{onClick:t,"aria-label":"닫기",children:"✕"})]}),i.jsx(ix,{children:e.title}),N&&i.jsxs(hre,{children:[i.jsx(F$,{value:Number(N)}),i.jsxs(fre,{children:[N," (",s,"개 리뷰)"]})]}),i.jsx(gl,{}),i.jsxs(pre,{children:[i.jsx(ire,{"aria-hidden":"true",children:"🏥"}),i.jsxs(ax,{$padding:"10px 14px",children:[_.address&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"주소"}),i.jsx(Ue,{children:_.address})]}),_.phone&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"전화"}),i.jsx(Ue,{children:i.jsx("a",{href:`tel:${_.phone}`,children:_.phone})})]}),_.website&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"웹사이트"}),i.jsx(Ue,{children:i.jsx("a",{href:_.website,target:"_blank",rel:"noopener noreferrer",children:"바로가기"})})]}),_.operatingHours&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"운영시간"}),i.jsx(Ue,{children:_.operatingHours})]}),_.closedDay&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"휴무일"}),i.jsx(Ue,{children:_.closedDay})]}),_.priceInfo&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"가격"}),i.jsx(Ue,{children:_.priceInfo})]}),_.parkingAvailable!=null&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"주차"}),i.jsx(Ue,{children:_.parkingAvailable?"가능":"불가능"})]}),(_.indoor!=null||_.outdoor!=null)&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"장소"}),i.jsx(Ue,{children:[_.indoor&&"실내",_.outdoor&&"실외"].filter(Boolean).join(" / ")})]}),_.petFriendly!=null&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"반려동물"}),i.jsx(Ue,{children:_.petFriendly?"✅ 동반 가능":"❌ 동반 불가"})]}),_.petZoneType&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"동반 구역"}),i.jsx(Ue,{children:_.petZoneType})]}),_.petSize&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"입장 크기"}),i.jsx(Ue,{children:_.petSize})]}),_.petRestrictions&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"제한사항"}),i.jsx(Ue,{children:_.petRestrictions})]}),_.petExtraFee&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"반려동물 추가요금"}),i.jsx(Ue,{children:_.petExtraFee})]}),_.description&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"70px",children:"설명"}),i.jsx(Ue,{children:_.description})]})]}),i.jsx(gl,{}),i.jsxs(mre,{children:[i.jsxs(gre,{children:["리뷰 (",s,")"]}),x?i.jsx(q$,{children:"불러오는 중..."}):o.length===0?i.jsx(q$,{children:"아직 리뷰가 없습니다."}):i.jsx(xre,{children:o.map(D=>i.jsxs(vre,{children:[i.jsxs(yre,{children:[i.jsx(bre,{children:D.nickname||D.username||"익명"}),i.jsx(wre,{children:i.jsx(F$,{value:D.rating||0,size:11})}),i.jsx($re,{children:D.createdAt?new Date(D.createdAt).toLocaleDateString("ko-KR"):""})]}),i.jsx(Sre,{children:D.comment}),n&&(n.idx===D.userIdx||n.id===D.userIdx)&&i.jsxs(jre,{children:[i.jsx(U$,{onClick:()=>O(D),children:"수정"}),i.jsx(U$,{onClick:()=>F(D.idx),children:"삭제"})]})]},D.idx))}),m&&i.jsx(kre,{type:"button",onClick:()=>z(_.idx,d+1,!0),disabled:b,children:b?"불러오는 중...":"더보기"}),n&&i.jsxs(Ere,{onSubmit:R,children:[i.jsx(Cre,{value:S,onChange:D=>y(Number(D.target.value)),children:[5,4,3,2,1].map(D=>i.jsxs("option",{value:D,children:["⭐".repeat(D)," ",D,"점"]},D))}),i.jsx(Pre,{value:w,onChange:D=>j(D.target.value),placeholder:"리뷰를 작성해주세요...",rows:2}),i.jsxs(Are,{children:[k&&i.jsx(Rre,{type:"button",onClick:()=>{$(null),j(""),y(5)},children:"취소"}),i.jsx(Ore,{type:"submit",disabled:C||!w.trim(),children:C?"저장 중...":k?"수정":"등록"})]})]})]})]}),i.jsxs(are,{children:[_.phone&&i.jsx(sre,{href:`tel:${_.phone}`,children:"📞 전화하기"}),i.jsx(cre,{href:`https://map.naver.com/p/search/${encodeURIComponent(e.title||"")}`,target:"_blank",rel:"noopener noreferrer",onClick:()=>pl.interact(_.idx,"NAVIGATE"),children:"🧭 길찾기"})]})]})},rre=h(nx)``,nre=h.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ore=h.button`
  border: none;
  background: ${e=>e.theme.colors.surface};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 16px;
  color: ${e=>e.theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &:hover { background: ${e=>e.theme.colors.surfaceHover}; }
`,ire=h.div`
  height: 96px;
  margin: 10px 14px 4px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    ${e=>e.theme.colors.surface},
    ${e=>e.theme.colors.background}
  );
  border: 1px solid ${e=>e.theme.colors.borderLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  flex-shrink: 0;
`,are=h.div`
  display: flex;
  gap: 8px;
  padding: 12px 14px;
  border-top: 1px solid ${e=>e.theme.colors.borderLight};
  flex-shrink: 0;
`,sre=h.a`
  flex: 1;
  text-align: center;
  padding: 11px;
  border-radius: 12px;
  background: ${e=>e.theme.colors.domain.location};
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
`,cre=h.a`
  flex: 1;
  text-align: center;
  padding: 11px;
  border-radius: 12px;
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};
  border: 1px solid ${e=>e.theme.colors.border};
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
`,lre=h.span`
  font-size: 12px;
  color: ${e=>e.theme.colors.domain.location};
  font-weight: 600;
`,F$=({value:e,max:t=5,size:r=13})=>{const n=Math.round(e);return i.jsx(dre,{"aria-label":`${e}점`,children:Array.from({length:t},(o,a)=>i.jsx(ure,{$filled:a<n,$size:r,children:"★"},a))})},dre=h.span`
  display: inline-flex;
  gap: 1px;
  vertical-align: middle;
`,ure=h.span`
  font-size: ${e=>e.$size}px;
  color: ${e=>e.$filled?"#F59E0B":e.theme.colors.border};
  line-height: 1;
`,hre=h.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px 8px;
`,fre=h.span`
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
`,pre=h.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`,mre=h.div`
  display: flex;
  flex-direction: column;
  padding: 10px 14px;
`,gre=h.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
  margin-bottom: 8px;
  flex-shrink: 0;
`,xre=h.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`,vre=h.div`
  background: ${e=>e.theme.colors.background};
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
`,yre=h.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`,bre=h.span`
  font-weight: 600;
  color: ${e=>e.theme.colors.text};
`,wre=h.span`
  font-size: 11px;
`,$re=h.span`
  color: ${e=>e.theme.colors.textSecondary};
  margin-left: auto;
  font-size: 11px;
`,Sre=h.p`
  margin: 0;
  color: ${e=>e.theme.colors.text};
  line-height: 1.4;
`,jre=h.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`,U$=h.button`
  background: none;
  border: none;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  &:hover { color: ${e=>e.theme.colors.primary}; }
`,q$=h.div`
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
  padding: 8px 0;
`,kre=h.button`
  width: 100%;
  margin-top: 8px;
  padding: 8px 0;
  background: none;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 12px;
  cursor: pointer;
  &:hover:not(:disabled) { color: ${e=>e.theme.colors.primary}; border-color: ${e=>e.theme.colors.primary}; }
  &:disabled { opacity: 0.6; cursor: default; }
`,Ere=h.form`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
  padding-top: 8px;
  border-top: 1px solid ${e=>e.theme.colors.border};
`,Cre=h.select`
  padding: 5px 8px;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 6px;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: 12px;
`,Pre=h.textarea`
  padding: 7px 10px;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 6px;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  font-size: 12px;
  resize: none;
  outline: none;
  line-height: 1.4;

  &:focus { border-color: ${e=>e.theme.colors.primary}; }
`,Are=h.div`
  display: flex;
  gap: 6px;
  justify-content: flex-end;
`,Ore=h.button`
  padding: 5px 14px;
  border-radius: 6px;
  border: none;
  background: ${e=>e.theme.colors.primary};
  color: white;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,Rre=h.button`
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid ${e=>e.theme.colors.border};
  background: none;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 12px;
  cursor: pointer;
`,Tre=({selectedItem:e,onClose:t,onRefresh:r})=>{const{user:n}=dt(),[o,a]=p.useState([]),[s,c]=p.useState(!1),[l,u]=p.useState(!1),[d,f]=p.useState(!1),[m,g]=p.useState(!1),[x,v]=p.useState(null),[b,E]=p.useState(null);if(p.useEffect(()=>{if(!e)return;const P=e.raw?.idx;P&&(f(!0),E(e.raw),Promise.all([rr.getParticipants(P).catch(()=>({data:{participants:[]}})),rr.checkParticipation(P).catch(()=>({data:{isParticipating:!1}}))]).then(([z,_])=>{a(z.data?.participants||[]),c(_.data?.isParticipating||!1),u(_.data?.liked||!1)}).finally(()=>f(!1)))},[e]),!e)return null;const w=b||e.raw,j=w.currentParticipants>=w.maxParticipants,S=n&&(n.idx===w.organizerIdx||n.id===w.organizerIdx),y=w.meetupDate||w.date?new Date(w.meetupDate||w.date).toLocaleString("ko-KR",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}):"",k=async()=>{g(!0);try{await rr.joinMeetup(w.idx),c(!0),u(!1),v(null);const[P,z]=await Promise.all([rr.getParticipants(w.idx),rr.getMeetupById(w.idx)]);a(P.data?.participants||[]),E(z.data?.meetup||w),r?.()}catch(P){v(P.response?.data?.error||"참가에 실패했습니다.")}finally{g(!1)}},$=async()=>{g(!0);try{await rr.cancelParticipation(w.idx),c(!1),u(!1),v(null);const[P,z]=await Promise.all([rr.getParticipants(w.idx),rr.getMeetupById(w.idx)]);a(P.data?.participants||[]),E(z.data?.meetup||w),r?.()}catch(P){v(P.response?.data?.error||"취소에 실패했습니다.")}finally{g(!1)}},C=async()=>{g(!0);try{const P=!l;await rr.updateHistoryLike(w.idx,P),u(P),v(null)}catch(P){v(P.response?.data?.error||"좋아요 변경에 실패했습니다.")}finally{g(!1)}};return i.jsxs(Ire,{children:[i.jsxs(ox,{children:[i.jsx(Dre,{children:"🐾 모임"}),i.jsx(ml,{onClick:t,"aria-label":"닫기",children:"✕"})]}),i.jsx(ix,{children:w.title}),i.jsxs(ax,{children:[y&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"36px",children:"일시"}),i.jsx(Ue,{children:y})]}),w.location&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"36px",children:"장소"}),i.jsx(Ue,{children:w.location})]}),i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"36px",children:"인원"}),i.jsx(Ue,{children:i.jsxs(_re,{$full:j,children:[w.currentParticipants??0," / ",w.maxParticipants??0,"명",j&&" (마감)"]})})]}),w.description&&i.jsxs(ze,{children:[i.jsx(Ne,{$minWidth:"36px",children:"소개"}),i.jsx(Ue,{children:i.jsx(Lre,{children:w.description})})]})]}),x&&i.jsx(Hre,{children:x}),n&&!S&&i.jsx(gA,{children:s?i.jsxs(i.Fragment,{children:[i.jsx(zre,{onClick:C,disabled:m,$liked:l,children:l?"❤️ 좋아요 기록됨":"🤍 좋아요로 기록"}),i.jsx(Nre,{onClick:$,disabled:m,children:m?"처리 중...":"참가 취소"})]}):i.jsx(Mre,{onClick:k,disabled:m||j,children:m?"처리 중...":j?"마감됨":"참가하기"})}),S&&i.jsx(Bre,{children:"✅ 내가 만든 모임"}),i.jsx(gl,{}),i.jsxs(Fre,{children:[i.jsxs(Ure,{children:["참가자 ",o.length,"명"]}),d?i.jsx(W$,{children:"불러오는 중..."}):o.length===0?i.jsx(W$,{children:"아직 참가자가 없습니다."}):i.jsx(qre,{children:o.map((P,z)=>i.jsxs(Wre,{children:["👤 ",P.nickname||P.username||"참가자"]},P.idx||z))})]})]})},Ire=h(nx)``,Dre=h.span`
  font-size: 12px;
  color: ${e=>e.theme.colors.domain.meetup};
  font-weight: 600;
`,_re=h.span`
  color: ${e=>e.$full?e.theme.colors.error||"#ef4444":"inherit"};
  font-weight: ${e=>e.$full?600:400};
`,Lre=h.span`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`,Mre=h.button`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  border: none;
  background: ${e=>e.theme.colors.domain.meetup};
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:hover:not(:disabled) { opacity: 0.9; }
`,zre=h.button`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  border: 1px solid ${e=>e.$liked?e.theme.colors.domain.meetup:e.theme.colors.border};
  background: ${e=>e.$liked?`${e.theme.colors.domain.meetup}18`:"none"};
  color: ${e=>e.$liked?e.theme.colors.domain.meetup:e.theme.colors.textSecondary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 8px;
  &:disabled { opacity: 0.5; }
  &:hover:not(:disabled) { background: ${e=>e.theme.colors.surfaceHover}; }
`,Nre=h.button`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  border: 1px solid ${e=>e.theme.colors.border};
  background: none;
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 14px;
  cursor: pointer;
  &:disabled { opacity: 0.5; }
  &:hover:not(:disabled) { background: ${e=>e.theme.colors.surfaceHover}; }
`,Bre=h.div`
  padding: 6px 14px;
  font-size: 12px;
  color: ${e=>e.theme.colors.domain.meetup};
  font-weight: 600;
`,Fre=h.div`
  padding: 10px 14px;
  flex: 1;
  overflow-y: auto;
`,Ure=h.div`
  font-size: 12px;
  font-weight: 600;
  color: ${e=>e.theme.colors.textSecondary};
  margin-bottom: 6px;
`,W$=h.div`
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
`,qre=h.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Wre=h.div`
  font-size: 13px;
  color: ${e=>e.theme.colors.text};
  padding: 3px 0;
`,Hre=h.div`
  margin: 0 14px 4px;
  padding: 6px 10px;
  background: ${e=>e.theme.colors.errorSoft};
  color: ${e=>e.theme.colors.error};
  border-radius: 6px;
  font-size: 12px;
`,ii=se.create({baseURL:"http://localhost:8080/api/care-offers",headers:{"Content-Type":"application/json"}});ii.interceptors.request.use(e=>{const t=localStorage.getItem("accessToken")||localStorage.getItem("token");return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e});const di={offer:(e,t)=>ii.post("",null,{params:{careRequestIdx:e,providerIdx:t}}),accept:e=>ii.post(`/${e}/accept`),reject:e=>ii.post(`/${e}/reject`),between:e=>ii.get("/between",{params:{otherUserIdx:e}}),candidates:e=>ii.get("/candidates",{params:{careRequestIdx:e}})},Zh=e=>{if(!e)return"활동 지역 미등록";const t=String(e).replace(/\s+/g," ").trim(),r=t.split(" ");return r.length>=2?`${r[0]}·${r[1]} 활동`:`${t} 활동`},Jh=e=>e==null?"-":Number(e).toFixed(1),Vre=({selectedItem:e,onClose:t})=>{const{user:r}=dt(),[n,o]=p.useState(!1),[a,s]=p.useState(null),[c,l]=p.useState([]),[u,d]=p.useState(null),[f,m]=p.useState(!1),[g,x]=p.useState(null),[v,b]=p.useState(null),[E,w]=p.useState([]),[j,S]=p.useState(!1),[y,k]=p.useState(null),[$,C]=p.useState({}),[P,z]=p.useState({}),[_,N]=p.useState(null),R=e?.raw,F=r&&R&&(r.idx===R.userIdx||r.idx===R.userId),O=R?.date||R?.careDate?new Date(R?.date||R?.careDate).toLocaleString("ko-KR",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}):"",A={FIXED:"고정 일정",FLEXIBLE_CHAT:"채팅 후 조율 (시각 참고)"}[R?.scheduleMode]||"",M=R?.estimatedDurationMinutes!=null?`${Number(R.estimatedDurationMinutes)}분 예상`:"",I={OPEN:"모집중",IN_PROGRESS:"진행중",COMPLETED:"완료",CANCELLED:"취소"}[R?.status]||R?.status,T=p.useCallback(async(W,J=()=>!1)=>{if(W.length===0)return;z(G=>{const K={...G};return W.forEach(ee=>{K[ee]=!0}),K});const L=await Promise.all(W.map(async G=>{try{const K=await yr.getUserProfile(G);return[G,K.data]}catch(K){return console.error("제공자 프로필 조회 실패:",K),[G,null]}}));J()||(C(G=>{const K={...G};return L.forEach(([ee,ne])=>{K[ee]=ne}),K}),z(G=>{const K={...G};return W.forEach(ee=>{delete K[ee]}),K}))},[]);p.useEffect(()=>{if(!R?.idx){w([]),k(null),N(null);return}let W=!1;return(async()=>{S(!0),k(null),w([]),N(null);try{const L=await Ca.getComments(R.idx);if(W)return;const G=L.data||[];w(G);const K=[...new Set(G.map(ee=>ee.userId).filter(Boolean))];await T(K,()=>W)}catch(L){if(W)return;console.error("케어 댓글 조회 실패:",L),k("제공자 댓글을 불러오지 못했습니다.")}finally{W||S(!1)}})(),()=>{W=!0}},[R.idx,T]),p.useEffect(()=>{if(!F||!R?.idx||R.status!=="OPEN"){l([]);return}let W=!1;return(async()=>{m(!0),x(null);try{const{data:L}=await di.candidates(R.idx);W||(l(L?.providers||[]),d({scope:L?.scope,areaLabel:L?.areaLabel,total:L?.total??0}))}catch{W||x("제공자 목록을 불러오지 못했습니다.")}finally{W||m(!1)}})(),()=>{W=!0}},[F,R?.idx,R?.status]);const B=async W=>{if(!(!R?.idx||!W||v)&&window.confirm(`이 제공자에게 케어를 맡기시겠습니까?
수락하면 바로 케어가 시작됩니다.`)){b(W),x(null);try{await di.offer(R.idx,W),l(L=>L.map(G=>G.idx===W?{...G,alreadyOffered:!0}:G));const J=await Vh(W);window.openChatWidget&&window.openChatWidget(J.idx)}catch(J){x(J.response?.data?.error||J.response?.data?.message||"제안에 실패했습니다.")}finally{b(null)}}},X=async()=>{const W=R.userIdx||R.userId;if(!(!r||!W||r.idx===W)){o(!0);try{const J=await Vh(W);window.openChatWidget&&window.openChatWidget(J.idx)}catch{s("채팅 연결에 실패했습니다.")}finally{o(!1)}}},ie=async W=>{if(!(!r||!W||r.idx===W)){o(!0),s(null);try{const J=await Vh(W);window.openChatWidget&&window.openChatWidget(J.idx)}catch(J){console.error("제공자 채팅 연결 실패:",J),s("제공자와 채팅 연결에 실패했습니다.")}finally{o(!1)}}},Z=async W=>{W&&(N(W),$[W]===void 0&&!P[W]&&await T([W]))},q=_?$[_]:null;return!e||!R?null:i.jsxs(i.Fragment,{children:[i.jsxs(Kre,{$width:"380px",$maxHeight:"82vh",children:[i.jsxs(ox,{children:[i.jsx(Gre,{children:"💛 펫케어"}),i.jsx(ml,{onClick:t,"aria-label":"닫기",children:"✕"})]}),i.jsx(ix,{children:e.title}),i.jsxs(ax,{children:[R.status&&i.jsxs(ze,{children:[i.jsx(Ne,{children:"상태"}),i.jsx(Yre,{$status:R.status,children:I})]}),O&&i.jsxs(ze,{children:[i.jsx(Ne,{children:"일시"}),i.jsx(Ue,{children:O})]}),A&&i.jsxs(ze,{children:[i.jsx(Ne,{children:"일정 유형"}),i.jsx(Ue,{children:A})]}),M&&i.jsxs(ze,{children:[i.jsx(Ne,{children:"예상 소요"}),i.jsx(Ue,{children:M})]}),R.address&&i.jsxs(ze,{children:[i.jsx(Ne,{children:"위치"}),i.jsx(Ue,{children:R.address})]}),R.petName&&i.jsxs(ze,{children:[i.jsx(Ne,{children:"반려동물"}),i.jsx(Ue,{children:R.petName})]}),R.offeredCoins!=null&&i.jsxs(ze,{children:[i.jsx(Ne,{children:"보상"}),i.jsx(Ue,{children:i.jsxs(Xre,{children:["💰 ",Number(R.offeredCoins).toLocaleString()," 코인"]})})]}),R.description&&i.jsxs(ze,{children:[i.jsx(Ne,{children:"내용"}),i.jsx(Ue,{children:i.jsx(Zre,{children:R.description})})]}),i.jsx(gl,{}),i.jsxs(H$,{children:[i.jsx(V$,{children:"제공자 댓글"}),i.jsxs(K$,{children:[R.commentCount??E.length,"개"]})]}),j?i.jsx(ei,{children:"댓글을 불러오는 중입니다."}):y?i.jsx(ei,{children:y}):E.length===0?i.jsx(ei,{children:"아직 제공자 댓글이 없습니다."}):i.jsx(Jre,{children:E.map(W=>{const J=$[W.userId],L=J?.user?.nickname||W.nickname||J?.user?.username||W.username||"제공자",G=Zh(J?.user?.location||W.userLocation),K=J?.reviewCount??0,ee=J?.completedCareCount??0;return i.jsxs(Qre,{children:[i.jsxs(ene,{children:[i.jsxs(tne,{children:[i.jsx(rne,{children:L.charAt(0)}),i.jsxs(nne,{children:[i.jsx(one,{children:L}),i.jsxs(ine,{children:["⭐ ",Jh(J?.averageRating)," (후기 ",K,") · 케어 완료 ",ee,"건 · ",G]})]})]}),i.jsx(ane,{children:W.createdAt?new Date(W.createdAt).toLocaleDateString("ko-KR"):""})]}),i.jsx(sne,{children:W.content}),i.jsxs(cne,{children:[i.jsx(dne,{type:"button",onClick:()=>Z(W.userId),children:"후기 보기"}),F&&r?.idx!==W.userId&&i.jsx(G$,{type:"button",onClick:()=>ie(W.userId),disabled:n,children:n?"연결 중...":"채팅하기"})]})]},W.idx)})})]}),a&&i.jsx(yne,{children:a}),r&&!F&&R.status==="OPEN"&&i.jsx(gA,{children:i.jsx(lne,{onClick:()=>{s(null),X()},disabled:n,children:n?"연결 중...":"💬 채팅으로 문의하기"})}),F&&i.jsx(vne,{children:"✅ 내가 등록한 케어 요청"}),F&&R.status==="OPEN"&&i.jsxs(hne,{children:[i.jsxs(H$,{children:[i.jsx(V$,{children:u?.scope==="WIDE"?`${u.areaLabel} 제공자`:u?.areaLabel?`${u.areaLabel} 제공자`:"이 지역 제공자"}),i.jsx(K$,{children:u?.total>c.length?`${c.length} / ${u.total}명`:`${c.length}명`})]}),u?.scope==="WIDE"&&c.length>0&&i.jsxs(une,{children:["가까운 구에 활동 중인 제공자가 없어 ",u.areaLabel," 전체에서 찾았습니다."]}),f?i.jsx(ei,{children:"불러오는 중..."}):g?i.jsx(ei,{children:g}):c.length===0?i.jsx(ei,{children:u?.areaLabel?`${u.areaLabel} 주변에 활동 중인 제공자가 아직 없습니다.`:"활동 중인 제공자가 아직 없습니다."}):i.jsx(fne,{children:c.map(W=>i.jsxs(pne,{children:[i.jsxs(mne,{children:[i.jsx(gne,{children:W.nickname||W.username}),i.jsxs(xne,{children:[Zh(W.location)," · ","⭐ ",Jh(W.averageRating)," (",W.reviewCount,")"," · ","완료 ",W.completedCareCount,"건"]})]}),i.jsx(G$,{type:"button",onClick:()=>B(W.idx),disabled:W.alreadyOffered||v===W.idx,children:W.alreadyOffered?"제안함":v===W.idx?"보내는 중...":"제안하기"})]},W.idx))})]})]}),_&&i.jsx(bne,{onClick:()=>N(null),children:i.jsxs(wne,{onClick:W=>W.stopPropagation(),children:[i.jsxs($ne,{children:[i.jsxs("div",{children:[i.jsxs(Sne,{children:[q?.user?.nickname||q?.user?.username||"제공자"," 후기"]}),i.jsxs(jne,{children:["⭐ ",Jh(q?.averageRating)," · 후기 ",q?.reviewCount??0,"개 · 케어 완료 ",q?.completedCareCount??0,"건"]})]}),i.jsx(ml,{onClick:()=>N(null),"aria-label":"후기 닫기",children:"✕"})]}),i.jsx(kne,{children:Zh(q?.user?.location)}),P[_]?i.jsx(Y$,{children:"후기를 불러오는 중입니다."}):q?.reviews?.length>0?i.jsx(Ene,{children:q.reviews.slice(0,3).map(W=>i.jsxs(Cne,{children:[i.jsxs(Pne,{children:[i.jsx(Ane,{children:W.reviewerName||"요청자"}),i.jsx(One,{children:"⭐".repeat(W.rating)})]}),i.jsx(Rne,{children:W.comment||"등록된 코멘트가 없습니다."}),i.jsx(Tne,{children:W.createdAt?new Date(W.createdAt).toLocaleDateString("ko-KR"):""})]},W.idx))}):i.jsx(Y$,{children:"아직 등록된 펫케어 후기가 없습니다."})]})})]})},Kre=h(nx)``,Gre=h.span`
  font-size: 12px;
  color: ${e=>e.theme.colors.domain.care};
  font-weight: 600;
`,Yre=h.span`
  font-size: 12px;
  font-weight: 600;
  padding: 1px 8px;
  border-radius: 8px;
  background: ${e=>e.$status==="OPEN"?e.theme.colors.infoSoft:e.$status==="IN_PROGRESS"?e.theme.colors.warningSoft:e.$status==="COMPLETED"?e.theme.colors.successSoft:e.$status==="CANCELLED"?e.theme.colors.errorSoft:e.theme.colors.surfaceSoft};
  color: ${e=>e.$status==="OPEN"?e.theme.colors.status.open:e.$status==="IN_PROGRESS"?e.theme.colors.status.inProgress:e.$status==="COMPLETED"?e.theme.colors.status.completed:e.$status==="CANCELLED"?e.theme.colors.status.cancelled:e.theme.colors.textMuted};
`,Xre=h.span`
  color: ${e=>e.theme.colors.ai.text};
  font-weight: 600;
`,Zre=h.span`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
`,H$=h.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`,V$=h.h4`
  font-size: 13px;
  font-weight: 700;
  color: ${e=>e.theme.colors.text};
  margin: 0;
`,K$=h.span`
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
`,Jre=h.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 8px;
`,Qre=h.div`
  padding: 12px;
  border-radius: 12px;
  background: ${e=>e.theme.colors.surfaceSoft};
  border: 1px solid ${e=>e.theme.colors.border};
`,ene=h.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
`,tne=h.div`
  display: flex;
  gap: 10px;
  min-width: 0;
`,rne=h.div`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: ${e=>e.theme.colors.domain.care};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
`,nne=h.div`
  min-width: 0;
`,one=h.div`
  font-size: 13px;
  font-weight: 700;
  color: ${e=>e.theme.colors.text};
`,ine=h.div`
  margin-top: 3px;
  font-size: 12px;
  line-height: 1.5;
  color: ${e=>e.theme.colors.textSecondary};
`,ane=h.div`
  font-size: 11px;
  color: ${e=>e.theme.colors.textSecondary};
  flex-shrink: 0;
`,sne=h.p`
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: ${e=>e.theme.colors.text};
  white-space: pre-wrap;
  word-break: break-word;
`,cne=h.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`,lne=h.button`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  border: none;
  background: ${e=>e.theme.colors.domain.care};
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:hover:not(:disabled) { opacity: 0.9; }
`,dne=h.button`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid ${e=>e.theme.colors.border};
  background: ${e=>e.theme.colors.surface};
  color: ${e=>e.theme.colors.text};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`,G$=h.button`
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  background: ${e=>e.theme.colors.domain.care};
  color: white;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,une=h.div`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
  padding: 2px 0;
`,hne=h.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,fne=h.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 240px;
  overflow-y: auto;
`,pne=h.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
`,mne=h.div`
  min-width: 0;
`,gne=h.div`
  font-weight: 600;
  font-size: 13px;
  color: ${({theme:e})=>e.colors.textPrimary};
`,xne=h.div`
  font-size: 11px;
  color: ${({theme:e})=>e.colors.textSecondary};
`,vne=h.div`
  padding: 6px 14px;
  font-size: 12px;
  color: ${e=>e.theme.colors.domain.care};
  font-weight: 600;
`,ei=h.div`
  padding: 12px 0 4px;
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
`,yne=h.div`
  margin: 0 14px 4px;
  padding: 6px 10px;
  background: ${e=>e.theme.colors.errorSoft};
  color: ${e=>e.theme.colors.error};
  border-radius: 6px;
  font-size: 12px;
`,bne=h.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.48);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 20px;
`,wne=h.div`
  width: min(520px, 100%);
  max-height: min(78vh, 720px);
  overflow-y: auto;
  border-radius: 18px;
  background: ${e=>e.theme.colors.surface};
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.18);
  padding: 20px;
`,$ne=h.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`,Sne=h.h3`
  margin: 0;
  font-size: 18px;
  color: ${e=>e.theme.colors.text};
`,jne=h.div`
  margin-top: 6px;
  font-size: 13px;
  color: ${e=>e.theme.colors.textSecondary};
`,kne=h.div`
  margin-top: 10px;
  font-size: 13px;
  color: ${e=>e.theme.colors.textSecondary};
`,Ene=h.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
`,Cne=h.div`
  padding: 14px;
  border-radius: 12px;
  background: ${e=>e.theme.colors.surfaceSoft};
  border: 1px solid ${e=>e.theme.colors.border};
`,Pne=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`,Ane=h.div`
  font-size: 13px;
  font-weight: 700;
  color: ${e=>e.theme.colors.text};
`,One=h.div`
  font-size: 12px;
`,Rne=h.p`
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: ${e=>e.theme.colors.text};
  white-space: pre-wrap;
`,Tne=h.div`
  margin-top: 10px;
  font-size: 11px;
  color: ${e=>e.theme.colors.textSecondary};
`,Y$=h.div`
  margin-top: 16px;
  padding: 16px 0 4px;
  font-size: 13px;
  color: ${e=>e.theme.colors.textSecondary};
`,xA=se.create({baseURL:"http://localhost:8080/api/pet-news",headers:{"Content-Type":"application/json"}});xA.interceptors.request.use(e=>{const t=localStorage.getItem("accessToken")||localStorage.getItem("token");return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e});const Ine={get:e=>xA.get(`/${e}`)};function Dne(){const[e,t]=p.useState(null),[r,n]=p.useState(null);if(p.useEffect(()=>{let a=!1;return(async()=>{try{const l=((await bo.getUnreadNotifications()).data||[]).find(u=>u.type==="PET_NEWS");if(!l||a)return;if(t(l),l.relatedId){const u=await Ine.get(l.relatedId);a||n(u.data)}}catch{}})(),()=>{a=!0}},[]),!e)return null;const o=async()=>{t(null);try{await bo.markAsRead(e.idx)}catch{}};return i.jsxs(_ne,{children:[i.jsxs(Lne,{children:[i.jsx(Mne,{children:"서울 반려동물 소식"}),i.jsx(zne,{children:r?.title||e.content||e.title}),r?.sourceUrl&&i.jsx(Nne,{href:r.sourceUrl,target:"_blank",rel:"noopener noreferrer",children:"원문 보기 ↗"})]}),i.jsx(Bne,{type:"button",onClick:o,"aria-label":"소식 닫기",children:"×"})]})}const _ne=h.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 0 0 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: ${({theme:e})=>e?.colors?.surface||"#f4f7ff"};
  border: 1px solid ${({theme:e})=>e?.colors?.border||"#d9e2ff"};
`,Lne=h.div`
  flex: 1;
  min-width: 0;
`,Mne=h.div`
  font-size: 12px;
  font-weight: 700;
  color: ${({theme:e})=>e?.colors?.primary||"#3b5bdb"};
  margin-bottom: 4px;
`,zne=h.div`
  font-size: 14px;
  line-height: 1.4;
  color: ${({theme:e})=>e?.colors?.text||"#222"};
`,Nne=h.a`
  display: inline-block;
  margin-top: 6px;
  font-size: 13px;
  color: ${({theme:e})=>e?.colors?.primary||"#3b5bdb"};
`,Bne=h.button`
  border: 0;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  color: ${({theme:e})=>e?.colors?.textSecondary||"#888"};
`,X$=[{id:"goodPlaces",label:"갈 만한 곳",title:"반려동물과 갈 만한 곳"},{id:"all",label:"전체",title:"주변 시설"}],Z$={stable:"추천순",distance:"거리순",rating:"평점순",reviews:"리뷰순"},J$={lat:37.5665,lng:126.978},vm=5,Fne=6371e3,Une=e=>{const t=e.trim();return/(특별시|광역시|자치시|자치도)$/.test(t)?{sido:t}:/^.{2,}도$/.test(t)?{sido:t}:/[구군]$/.test(t)?{sigungu:t}:/시$/.test(t)?{sigungu:t}:null},qne=300,Q$=e=>e<=1?5:e<=3?6:e<=5?7:e<=10?8:9,Ir=e=>Number.isFinite(e?.lat)&&Number.isFinite(e?.lng),Wne=(e,t)=>{const r=(t.lat-e.lat)*Math.PI/180,n=(t.lng-e.lng)*Math.PI/180,o=e.lat*Math.PI/180,a=t.lat*Math.PI/180,s=Math.sin(r/2)**2+Math.cos(o)*Math.cos(a)*Math.sin(n/2)**2;return Fne*2*Math.asin(Math.sqrt(s))},e1=(e,t,r)=>{if(!Ir(e)||!Ir(t))return!1;const n=typeof r=="number"&&Number.isFinite(r)?r*1e3:vm*1e3,o=Math.max(qne,n*.1);return Wne(e,t)<o},Hne=e=>Number.isFinite(e?.latitude)&&Number.isFinite(e?.longitude),Vne=()=>{const[e,t]=p.useState("location"),[r,n]=p.useState(null),[o,a]=p.useState(null),[s,c]=p.useState(null),[l,u]=p.useState(vm),[d,f]=p.useState(Q$(vm)),[m,g]=p.useState([]),[x,v]=p.useState(!1),[b,E]=p.useState(null),[w,j]=p.useState(null),[S,y]=p.useState(null),[k,$]=p.useState(""),[C,P]=p.useState(""),[z,_]=p.useState(null),[N,R]=p.useState("distance"),[F,O]=p.useState(!1),[D,A]=p.useState("initial"),[M,I]=p.useState("goodPlaces"),[T,B]=p.useState([]),[X,ie]=p.useState(!1),[Z,q]=p.useState(!1),[W,J]=p.useState(!1),L=p.useRef({}),G=p.useRef(null),K=p.useRef(null),ee=p.useCallback((Q,ae="user-triggered")=>{Ir(Q)&&(a({...Q}),O(!1),A(ae))},[]),ne=p.useCallback(()=>{pl.getSignals().then(Q=>B(Q)).catch(()=>B([]))},[]);p.useEffect(()=>{let Q=!1;const ae=()=>{Q||(n(ke=>Ir(ke)?ke:J$),a(ke=>Ir(ke)?ke:J$))},Ce=window.setTimeout(ae,1e4);return navigator.geolocation?(navigator.geolocation.getCurrentPosition(ke=>{if(window.clearTimeout(Ce),Q)return;const et={lat:ke.coords.latitude,lng:ke.coords.longitude};c(et),n(et),a(et)},()=>{window.clearTimeout(Ce),ae()},{enableHighAccuracy:!0,timeout:15e3,maximumAge:6e4}),()=>{Q=!0,window.clearTimeout(Ce)}):(window.clearTimeout(Ce),ae(),()=>{Q=!0,window.clearTimeout(Ce)})},[]);const we=p.useCallback((Q,ae,be,Ce,ke,et)=>{Ir(ae)&&(clearTimeout(G.current),G.current=setTimeout(async()=>{const he=[Q,ae.lat.toFixed(4),ae.lng.toFixed(4),be,Ce,ke,et].join("-");if(L.current[he]){g(L.current[he]);return}v(!0),E(null),j(null);try{const mt=await see({type:Q,lat:ae.lat,lng:ae.lng,radius:be,keyword:Q==="location"?Ce:void 0,category:Q==="location"?ke:void 0,sort:Q==="location"?et:void 0});L.current[he]=mt,g(mt)}catch(mt){console.error("[UnifiedPetMap] 조회 실패:",mt),E("데이터를 불러오지 못했습니다."),g([])}finally{v(!1)}},300))},[]),je=e==="location"?o:r,Ge=M==="goodPlaces"&&!C&&!k,_e=Ge?bee:C;p.useEffect(()=>{je&&we(e,je,l,k,_e,N)},[e,je,l,k,_e,N,we]),p.useEffect(()=>{if(e!=="location")return;let Q=!1;return pl.getSignals().then(ae=>{Q||B(ae)}).catch(()=>{Q||B([])}),()=>{Q=!0}},[e,k,C]),p.useEffect(()=>{if(!(e!=="location"||!k.trim()))return window.clearTimeout(K.current),K.current=window.setTimeout(ne,1500),()=>window.clearTimeout(K.current)},[e,k,ne]),p.useEffect(()=>{const Q=ae=>{const{category:be,groupId:Ce}=ae.detail||{};t("location"),P(be||"동물병원"),_(Ce||"medical")};return window.addEventListener("navigateToHealthAlert",Q),()=>window.removeEventListener("navigateToHealthAlert",Q)},[]);const We=Q=>{t(Q),j(null),y(null),Q!=="location"&&($(""),P(""),_(null),R("stable")),Q==="location"&&Ir(r)&&!Ir(o)&&a({...r}),Q==="location"&&Ir(r)&&Ir(o)&&O(!e1(r,o,l)),Q!=="location"&&O(!1)},Rt=Q=>{u(Q),f(Q$(Q)),j(null),L.current={}},St=p.useCallback(()=>{ee(r,"user-triggered")},[ee,r]),Tt=()=>{if(s){n({...s}),ee(s,"user-triggered"),j(null);return}if(!navigator.geolocation){E("이 브라우저는 위치 서비스를 지원하지 않습니다.");return}J(!0),navigator.geolocation.getCurrentPosition(Q=>{const ae={lat:Q.coords.latitude,lng:Q.coords.longitude};c(ae),n(ae),ee(ae,"user-triggered"),j(null),J(!1)},Q=>{J(!1),Q.code===Q.PERMISSION_DENIED?E("위치 권한이 거부되었습니다. 브라우저 설정에서 위치를 허용해주세요."):E("현재 위치를 가져올 수 없습니다. 잠시 후 다시 시도해주세요.")},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})},pt=p.useCallback(({lat:Q,lng:ae,level:be,isManualOperation:Ce})=>{const ke={lat:Q,lng:ae};n(ke),be&&f(be),e==="location"&&Ce&&Ir(o)&&O(!e1(ke,o,l))},[e,l,o]),Be=()=>{L.current={},we("meetup",r,l,"","",void 0)},Hr=()=>{L.current={},we("care",r,l,"","",void 0)},$e=m,Nn=m,[Qe,Vr]=p.useState(!1);p.useEffect(()=>{if(!(!x&&!b&&!!r&&$e.length===0)){Vr(!1);return}Vr(!0);const ae=setTimeout(()=>Vr(!1),3e3);return()=>clearTimeout(ae)},[x,b,$e.length]);const er=p.useCallback(Q=>{j(Q),y(Q),Hne(Q)&&n({lat:Q.latitude,lng:Q.longitude})},[]),co=()=>{if(e==="location"&&w?.type==="location")return i.jsx(t1,{$expanded:!0,children:i.jsx(tre,{docked:!0,selectedItem:w,onClose:()=>j(null)})});if(e!=="location"&&e!=="meetup"&&e!=="care")return null;const Q=e==="location"?$e:m,ae=e==="location"&&!C&&!k,be=X$.find(he=>he.id===(Ge?"goodPlaces":"all")).title,Ce=Ge?`카페·식당·여행지·숙박 등 · 반경 ${l}km · ${Z$[N]}`:`${D==="initial"?"초기 검색":"현재 검색 기준"} · 반경 ${l}km · ${Z$[N]}`,ke=e==="meetup"?"주변 모임":"주변 펫케어",et=`반경 ${l}km · 지도 보는 위치 기준`;return x||b||Q.length===0&&!Ge?null:i.jsxs(t1,{children:[i.jsx(aoe,{"aria-hidden":"true"}),i.jsxs(ioe,{children:[i.jsxs("div",{children:[i.jsx(soe,{children:e==="location"?be:ke}),i.jsx(coe,{children:e==="location"?Ce:et})]}),i.jsxs(doe,{children:[i.jsxs(loe,{children:[Q.length,"개"]}),ae&&i.jsx(uoe,{role:"group","aria-label":"목록 기준",children:X$.map(he=>i.jsx(hoe,{type:"button",$active:M===he.id,"aria-pressed":M===he.id,onClick:()=>{I(he.id),j(null)},children:he.label},he.id))})]})]}),i.jsxs(poe,{onWheel:he=>{const mt=he.currentTarget;mt.scrollWidth<=mt.clientWidth||Math.abs(he.deltaY)>Math.abs(he.deltaX)&&(mt.scrollLeft+=he.deltaY)},children:[Q.length===0&&i.jsxs(foe,{children:["반경 ",l,"km 안에 갈 만한 곳이 없어요. 「전체」로 보거나 반경을 넓혀 보세요."]}),Q.map((he,mt)=>{const dn=w?.id===he.id;return i.jsxs(moe,{type:"button",$selected:dn,onClick:()=>{er(he)},onMouseEnter:()=>y(he),onMouseLeave:()=>y(Kr=>Kr?.id===he.id?null:Kr),children:[i.jsxs(goe,{children:[i.jsx(xoe,{children:he.title||he.name||`${e==="meetup"?"모임":e==="care"?"케어":"항목"} ${mt+1}`}),he.distanceM!=null?i.jsxs(r1,{children:[he.distanceM,"m"]}):he.raw?.distance!=null&&i.jsxs(r1,{children:[Math.round(he.raw.distance),"m"]})]}),i.jsx(voe,{children:e==="location"?he.subtitle||he.raw?.address||"주소 정보 없음":he.subtitle||he.raw?.address||(he.raw?.description?String(he.raw.description).slice(0,100).trim():"상세는 항목을 눌러 확인")})]},he.id)})]})]})},lo=()=>co(),te=(Q=!1)=>e==="location"?i.jsx(jee,{keyword:k,category:C,intentSignals:T,activeGroupId:z,sort:N,hasPendingAreaChange:F,radius:Q?l:void 0,onSearch:async ae=>{if(!ae){$(""),L.current={},ee(r,"user-triggered");return}try{const ke=(await Bi.searchPlaces(ae))?.results?.[0];if(ke?.latitude&&ke?.longitude){const et={lat:ke.latitude,lng:ke.longitude};n(et),$(""),L.current={},ee(et,"geocoding");return}}catch{}const be=Une(ae);if(be){v(!0),E(null),j(null);try{const ke=(await _l.searchPlaces({...be,...C&&{category:C},size:300}))?.data?.services??[];g(ke.map(he=>({idx:he.idx,name:he.name||"",latitude:he.latitude,longitude:he.longitude,markerColor:"#4A90D9",id:`location-${he.idx}`,type:"location",title:he.name||"",subtitle:he.category||he.address||he.roadAddress||"",raw:he})));const et=ke.filter(he=>he.latitude&&he.longitude);if(et.length>0){const he=et.reduce((dn,Kr)=>dn+Kr.latitude,0)/et.length,mt=et.reduce((dn,Kr)=>dn+Kr.longitude,0)/et.length;n({lat:he,lng:mt})}}catch{g([])}finally{v(!1)}return}$(ae),L.current={},ee(r,"keyword"),window.clearTimeout(K.current),K.current=window.setTimeout(ne,1500)},onCategoryPick:({category:ae,groupId:be})=>{P(ae||""),_(ae?be??null:null),L.current={},ee(r,ae?"category":"user-triggered")},onSignalPick:ae=>{$(""),P(ae||""),_(null),L.current={},ee(r,"intent-signal")},onSortChange:ae=>{R(ae),L.current={},ee(r,"user-triggered")},onSearchThisArea:St,onRadiusChange:Q?Rt:void 0}):e==="meetup"?i.jsx(Hee,{onCreateClick:()=>ie(!0)}):e==="care"?i.jsx(Gee,{onCreateClick:()=>q(!0)}):null,ve=()=>{if(!w)return null;const Q={selectedItem:w,onClose:()=>j(null)};return w.type==="meetup"?i.jsx(Tre,{...Q,onRefresh:Be}):w.type==="care"?i.jsx(Vre,{...Q}):null};return i.jsxs(Gne,{children:[i.jsx(yoe,{children:i.jsxs(Yne,{children:[r?i.jsx(rx,{services:Nn,onServiceClick:Q=>er(Q),userLocation:s,mapCenter:r,mapLevel:d,selectedService:w,hoveredService:S,onMapIdle:pt}):i.jsx(Xne,{children:"🗺️ 위치 정보를 가져오는 중..."}),i.jsxs(Zne,{children:[i.jsx(Dne,{}),i.jsx(lee,{activeLayer:e,onTabChange:We}),i.jsxs(Jne,{children:[e!=="location"&&i.jsx(xee,{radius:l,onRadiusChange:Rt}),te(!0)]})]}),w?.type!=="location"&&i.jsx(Qne,{onClick:Tt,disabled:W,title:"내 위치로 이동","aria-label":"내 위치로 이동",children:i.jsx("span",{"aria-hidden":"true",children:W?"⏳":"📍"})}),x&&i.jsx(eoe,{"aria-label":"데이터 조회 중"}),!x&&r&&e!=="location"&&i.jsxs(toe,{children:["반경 ",i.jsxs("strong",{children:[l,"km"]})," · ",i.jsx("strong",{children:m.length}),"개"]}),b&&!x&&i.jsxs(roe,{onClick:()=>E(null),children:[b," ✕"]}),Qe&&!Ge&&i.jsxs(ooe,{children:["반경 ",l,"km 내 결과가 없습니다."]}),ve(),lo()]})}),X&&i.jsx(tte,{onClose:()=>ie(!1),onSuccess:Be}),Z&&i.jsx(Cte,{onClose:()=>q(!1),onSuccess:Hr})]})},Kne=Ya`
  0%   { left: -40%; width: 40%; }
  50%  { left: 30%;  width: 60%; }
  100% { left: 100%; width: 40%; }
`,Gne=h.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${e=>e.theme.colors.background};

  @media (max-width: 768px) {
    height: calc(100vh - 60px);
  }
`,Yne=h.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`,Xne=h.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.textSecondary};
  font-size: 15px;
  z-index: 10;
`,Zne=h.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 16px 0;
  pointer-events: none;
  > * {
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    padding: 12px 12px 0;
    gap: 8px;
  }
`,Jne=h.div`
  width: 100%;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 24px;
  background: ${e=>e.theme.colors.surface+"F2"};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: ${e=>e.theme.shadows.xl};

  @media (max-width: 768px) {
    padding: 12px 12px;
    border-radius: 20px;
  }
`,Qne=h.button`
  position: absolute;
  right: 20px;
  bottom: 248px; /* 데스크톱 하단 결과 시트(약 220px) 위로 */
  z-index: 300;
  width: 52px;
  height: 52px;
  border-radius: 18px;
  border: none;
  background: ${e=>e.theme.colors.surface};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: ${e=>e.theme.shadows.lg};
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s, box-shadow 0.15s, background 0.15s;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${e=>e.theme.shadows.xl};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    right: 12px;
    bottom: calc(60px + 84px + env(safe-area-inset-bottom, 0px));
    height: 48px;
    width: 48px;
    border-radius: 16px;
  }
`,eoe=h.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  overflow: hidden;
  z-index: 600;
  background: transparent;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    background: ${e=>e.theme.colors.primary};
    animation: ${Kne} 1.2s ease-in-out infinite;
  }
`,toe=h.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${e=>e.theme.colors.overlay};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: ${e=>e.theme.colors.textInverse};
  padding: 5px 16px;
  border-radius: 999px;
  font-size: 12px;
  box-shadow: ${e=>e.theme.shadows.md};
  z-index: 200;
  white-space: nowrap;
  pointer-events: none;
  strong {
    color: ${e=>e.theme.colors.textInverse};
    font-weight: 600;
  }

  @media (max-width: 768px) {
    bottom: calc(72px + env(safe-area-inset-bottom, 0px));
    font-size: 11px;
    padding: 5px 14px;
  }
`,roe=h.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: ${e=>e.theme.colors.error};
  color: ${e=>e.theme.colors.textInverse};
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  z-index: 400;
  cursor: pointer;
  white-space: nowrap;
`,noe=Ya`
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.94); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`,ooe=h.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${e=>e.theme.colors.surfaceElevated+"F2"};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: ${e=>e.theme.colors.text};
  border: 1px solid ${e=>e.theme.colors.border};
  padding: 13px 24px;
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 600;
  z-index: 400;
  white-space: nowrap;
  box-shadow: ${e=>e.theme.shadows.xl};
  pointer-events: none;
  animation: ${noe} 0.2s cubic-bezier(0, 0, 0.2, 1);
`,t1=h.section`
  /* A형 몰입 레이아웃: 데스크톱은 하단 풀폭 시트(가로 카드), 모바일은 하단 도킹 시트 */
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  /* 상세 확장 시 위로 커져 상세를 표시 */
  top: ${e=>e.$expanded?"150px":"auto"};
  height: ${e=>e.$expanded?"auto":"220px"};
  z-index: 230;
  border-radius: 24px;
  background: ${e=>e.theme.colors.surface+"F2"};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: ${e=>e.theme.shadows.xl};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    left: 12px;
    right: 12px;
    top: ${e=>e.$expanded?"150px":"auto"};
    height: auto;
    bottom: calc(72px + env(safe-area-inset-bottom, 0px));
    min-height: ${e=>e.$expanded?"0":"272px"};
    max-height: ${e=>e.$expanded?"none":"calc(100dvh - 220px)"};
    border-radius: 24px 24px 18px 18px;
  }
`,ioe=h.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 18px 12px;
  border-bottom: 1px solid ${e=>e.theme.colors.borderLight};
`,aoe=h.div`
  width: 52px;
  height: 5px;
  border-radius: 999px;
  background: ${e=>e.theme.colors.border};
  margin: 10px auto 2px;

  @media (min-width: 769px) {
    display: none;
  }
`,soe=h.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${e=>e.theme.colors.text};
`,coe=h.p`
  margin: 6px 0 0;
  font-size: 12px;
  color: ${e=>e.theme.colors.textSecondary};
`,loe=h.span`
  font-size: 12px;
  font-weight: 700;
  color: ${e=>e.theme.colors.textSecondary};
`,doe=h.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
`,uoe=h.div`
  display: flex;
  gap: 6px;
`,hoe=h.button`
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid
    ${e=>e.$active?e.theme.colors.domain.location:e.theme.colors.border};
  background: ${e=>e.$active?e.theme.colors.domain.location:e.theme.colors.background};
  color: ${e=>e.$active?"#fff":e.theme.colors.textSecondary};
`,foe=h.p`
  margin: 0;
  padding: 4px 2px;
  font-size: 13px;
  color: ${e=>e.theme.colors.textSecondary};
`,poe=h.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 14px 16px 18px;

  @media (max-width: 768px) {
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    gap: 10px;
    padding-bottom: 22px;
  }
`,moe=h.button`
  width: 280px;
  flex-shrink: 0;
  text-align: left;

  @media (max-width: 768px) {
    width: 100%;
  }
  border: 1px solid
    ${e=>e.$selected?e.theme.colors.domain.location:e.theme.colors.border};
  background: ${e=>e.$selected?e.theme.colors.domain.location+"1A":e.theme.colors.background};
  border-radius: 18px;
  padding: 14px 14px 13px;
  cursor: pointer;
  transition: border-color 0.15s ease, transform 0.15s ease,
    box-shadow 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${e=>e.theme.colors.domain.location};
    transform: translateY(-1px);
    box-shadow: ${e=>e.theme.shadows.lg};
  }
`,goe=h.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`,xoe=h.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${e=>e.theme.colors.text};
`,voe=h.div`
  margin-top: 7px;
  font-size: 12px;
  line-height: 1.45;
  color: ${e=>e.theme.colors.textSecondary};
`,r1=h.span`
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 700;
  color: ${e=>e.theme.colors.domain.location};
  background: ${e=>e.theme.colors.domain.location+"1A"};
  padding: 4px 8px;
  border-radius: 999px;
`,yoe=h.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,boe=({onClick:e,unreadCount:t=0})=>i.jsxs(woe,{type:"button",onClick:e,children:[i.jsx($oe,{children:"💬"}),t>0&&i.jsx(Soe,{children:t>99?"99+":t})]}),woe=h.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({theme:e})=>e.colors.primary};
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    bottom: calc(60px + 16px + env(safe-area-inset-bottom, 0px));
    right: max(16px, env(safe-area-inset-right, 0px));
    width: 52px;
    height: 52px;
  }
`,$oe=h.span`
  font-size: 24px;
  line-height: 1;
`,Soe=h.span`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background: ${({theme:e})=>e.colors.error};
  color: white;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`,joe={CARE_REQUEST:{label:"펫케어",colorKey:"care"},MISSING_PET:{label:"실종",colorKey:"missing"},DIRECT:{label:"개인간",colorKey:"personal"},GROUP:{label:"단체간",colorKey:"group"},ADMIN_SUPPORT:{label:"관리자",colorKey:"admin"}},koe=({conversation:e,onClick:t})=>{const{conversationType:r,title:n,lastMessagePreview:o,lastMessageAt:a,unreadCount:s=0,participants:c=[]}=e,l=c.find(x=>x.status==="ACTIVE")||c[0],u=n||l?.username||"알 수 없음",d=l?.profileImageUrl||null,f=joe[r]||{label:"채팅",colorKey:"default"},m={label:f.label,colorKey:f.colorKey},g=x=>{if(!x)return"";const v=new Date(x),E=new Date-v,w=Math.floor(E/(1e3*60*60*24));return w===0?v.toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):w===1?"어제":w<7?`${w}일 전`:v.toLocaleDateString("ko-KR",{month:"short",day:"numeric"})};return i.jsxs(Eoe,{onClick:t,children:[i.jsxs(Coe,{children:[i.jsx(Poe,{colorKey:m.colorKey,children:m.label}),i.jsx(Aoe,{children:d?i.jsx("img",{src:d,alt:u}):i.jsx(Ooe,{children:u.charAt(0)})})]}),i.jsxs(Roe,{children:[i.jsx(Toe,{children:u}),i.jsx(Ioe,{children:o||"메시지가 없습니다"})]}),i.jsxs(Doe,{children:[i.jsx(_oe,{children:g(a)}),s>0&&i.jsx(Loe,{children:s>99?"99+":s})]})]})},Eoe=h.div`
  display: flex;
  align-items: center;
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  cursor: pointer;
  transition: background 200ms ease;
  border-bottom: 1px solid ${({theme:e})=>e.colors.borderLight};

  &:hover {
    background: ${({theme:e})=>e.colors.surfaceHover};
  }

  &:last-child {
    border-bottom: none;
  }
`,Coe=h.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-right: 12px;
`,Poe=h.span`
  padding: 2px 6px;
  border-radius: ${({theme:e})=>e.borderRadius.sm};
  background: ${({theme:e,colorKey:t})=>{switch(t){case"care":return e.colors.domain.care;case"missing":return e.colors.domain.missing;case"personal":return e.colors.success;case"group":return e.colors.secondary;case"admin":return e.colors.info;default:return e.colors.textMuted}}};
  color: white;
  font-size: ${({theme:e})=>e.typography.tiny.fontSize};
  font-weight: 600;
  white-space: nowrap;
`,Aoe=h.div`
  width: 44px;
  height: 44px;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  overflow: hidden;
  background: ${({theme:e})=>e.colors.surfaceSoft};
  border: 1.5px solid ${({theme:e})=>e.colors.border};
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Ooe=h.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({theme:e})=>e.colors.primary};
  color: ${({theme:e})=>e.colors.textInverse};
  font-size: 18px;
  font-weight: 600;
`,Roe=h.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Toe=h.div`
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Ioe=h.div`
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  color: ${({theme:e})=>e.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Doe=h.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  margin-left: 8px;
`,_oe=h.div`
  font-size: ${({theme:e})=>e.typography.caption.fontSize};
  color: ${({theme:e})=>e.colors.textLight};
  white-space: nowrap;
`,Loe=h.span`
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: ${({theme:e})=>e.borderRadius.pill};
  background: ${({theme:e})=>e.colors.primary};
  color: ${({theme:e})=>e.colors.textInverse};
  font-size: ${({theme:e})=>e.typography.caption.fontSize};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`,xr={ALL:"ALL",MEETUP:"MEETUP",CARE_REQUEST:"CARE_REQUEST",MISSING_PET:"MISSING_PET",DIRECT:"DIRECT",GROUP:"GROUP",ADMIN_SUPPORT:"ADMIN_SUPPORT"},Moe={[xr.ALL]:"전체",[xr.MEETUP]:"모임",[xr.CARE_REQUEST]:"펫케어",[xr.MISSING_PET]:"실종",[xr.DIRECT]:"개인간",[xr.GROUP]:"단체간",[xr.ADMIN_SUPPORT]:"관리자"},zoe=({activeTab:e,onTabChange:t})=>i.jsx(Noe,{children:Object.values(xr).map(r=>i.jsx(Boe,{active:e===r,onClick:()=>t(r),children:Moe[r]},r))}),Noe=h.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: ${({theme:e})=>e.colors.surface};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  overflow-x: auto;
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`,Boe=h.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: ${({active:e,theme:t})=>e?t.colors.primary:t.colors.background};
  color: ${({active:e,theme:t})=>e?"white":t.colors.textSecondary};
  font-size: 13px;
  font-weight: ${({active:e})=>e?600:400};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({active:e,theme:t})=>e?t.colors.primaryDark:t.colors.surfaceHover};
  }
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`,Foe=({conversations:e=[],activeTab:t,onTabChange:r,onConversationClick:n,loading:o=!1})=>{const a=t===xr.ALL?e:e.filter(s=>s.conversationType===t);return i.jsxs(Uoe,{children:[i.jsx(zoe,{activeTab:t,onTabChange:r}),i.jsx(qoe,{children:o?i.jsx(Woe,{children:"로딩 중..."}):a.length===0?i.jsx(Oa,{icon:"💬",title:t===xr.ALL?"아직 대화가 없어요":"해당 카테고리의 채팅방이 없어요",description:t===xr.ALL?"케어 요청이나 모임에 참여하면 채팅방이 생겨요":void 0}):a.map(s=>i.jsx(koe,{conversation:s,onClick:()=>n(s)},s.idx))})]})},Uoe=h.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: ${({theme:e})=>e.colors.background};
  overflow: hidden;
`,qoe=h.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({theme:e})=>e.colors.surface};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({theme:e})=>e.colors.border};
    border-radius: 3px;
    
    &:hover {
      background: ${({theme:e})=>e.colors.textLight};
    }
  }
`,Woe=h.div`
  padding: 40px 20px;
  text-align: center;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: 14px;
`,Hoe=({isOpen:e,onClose:t,conversations:r,onConversationClick:n,loading:o})=>{const[a,s]=ar.useState(xr.ALL);return p.useEffect(()=>{const c=l=>{l.key==="Escape"&&e&&t()};return e&&(document.addEventListener("keydown",c),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",c),document.body.style.overflow="unset"}},[e,t]),e?i.jsxs(i.Fragment,{children:[i.jsx(Voe,{onClick:t}),i.jsxs(Koe,{isOpen:e,children:[i.jsxs(Goe,{children:[i.jsx(Yoe,{children:"채팅"}),i.jsx(Xoe,{onClick:t,children:"✕"})]}),i.jsx(Zoe,{children:i.jsx(Foe,{conversations:r,activeTab:a,onTabChange:s,onConversationClick:n,loading:o})})]})]}):null},Voe=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`,Koe=h.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80vh;
  max-height: 800px;
  min-height: 0;
  background: ${({theme:e})=>e.colors.background};
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  z-index: 999;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;

  @media (max-width: 768px) {
    /* 하단 탭바(60px) 위에 붙여 입력창·탭과 겹침 방지 */
    bottom: calc(60px + env(safe-area-inset-bottom, 0px));
    height: min(85vh, calc(100vh - 120px));
    height: min(
      85vh,
      calc(100dvh - 60px - env(safe-area-inset-bottom, 0px) - env(safe-area-inset-top, 0px))
    );
    max-height: calc(100vh - 68px - env(safe-area-inset-bottom, 0px));
    max-height: calc(100dvh - 68px - env(safe-area-inset-bottom, 0px));
    overflow: hidden;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  
  @media (min-width: 769px) {
    /* 데스크톱: 중앙 정렬 */
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    width: 480px;
    max-width: 90vw;
    height: 600px;
    max-height: 90vh;
    border-radius: 16px;
    animation: slideUpDesktop 0.3s ease;
    
    @keyframes slideUpDesktop {
      from {
        transform: translate(-50%, -40%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, -50%);
        opacity: 1;
      }
    }
  }
`,Goe=h.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  border-radius: 16px 16px 0 0;
`,Yoe=h.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
  margin: 0;
`,Xoe=h.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({theme:e})=>e.colors.surfaceHover};
    color: ${({theme:e})=>e.colors.text};
  }
`,Zoe=h.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;var wa={exports:{}},Joe=wa.exports,n1;function Qoe(){return n1||(n1=1,(function(e,t){(function(r,n){n(t)})(Joe,(function(r){function n(S,y){S.terminate=function(){const k=()=>{};this.onerror=k,this.onmessage=k,this.onopen=k;const $=new Date,C=Math.random().toString().substring(2,8),P=this.onclose;this.onclose=z=>{const _=new Date().getTime()-$.getTime();y(`Discarded socket (#${C})  closed after ${_}ms, with code/reason: ${z.code}/${z.reason}`)},this.close(),P?.call(S,{code:4001,reason:`Quick discarding socket (#${C}) without waiting for the shutdown sequence.`,wasClean:!1})}}const o={LF:`
`,NULL:"\0"};class a{get body(){return!this._body&&this.isBinaryBody&&(this._body=new TextDecoder().decode(this._binaryBody)),this._body||""}get binaryBody(){return!this._binaryBody&&!this.isBinaryBody&&(this._binaryBody=new TextEncoder().encode(this._body)),this._binaryBody}constructor(y){const{command:k,headers:$,body:C,binaryBody:P,escapeHeaderValues:z,skipContentLengthHeader:_}=y;this.command=k,this.headers=Object.assign({},$||{}),P?(this._binaryBody=P,this.isBinaryBody=!0):(this._body=C||"",this.isBinaryBody=!1),this.escapeHeaderValues=z||!1,this.skipContentLengthHeader=_||!1}static fromRawFrame(y,k){const $={},C=P=>P.replace(/^\s+|\s+$/g,"");for(const P of y.headers.reverse()){P.indexOf(":");const z=C(P[0]);let _=C(P[1]);k&&y.command!=="CONNECT"&&y.command!=="CONNECTED"&&(_=a.hdrValueUnEscape(_)),$[z]=_}return new a({command:y.command,headers:$,binaryBody:y.binaryBody,escapeHeaderValues:k})}toString(){return this.serializeCmdAndHeaders()}serialize(){const y=this.serializeCmdAndHeaders();return this.isBinaryBody?a.toUnit8Array(y,this._binaryBody).buffer:y+this._body+o.NULL}serializeCmdAndHeaders(){const y=[this.command];this.skipContentLengthHeader&&delete this.headers["content-length"];for(const k of Object.keys(this.headers||{})){const $=this.headers[k];this.escapeHeaderValues&&this.command!=="CONNECT"&&this.command!=="CONNECTED"?y.push(`${k}:${a.hdrValueEscape(`${$}`)}`):y.push(`${k}:${$}`)}return(this.isBinaryBody||!this.isBodyEmpty()&&!this.skipContentLengthHeader)&&y.push(`content-length:${this.bodyLength()}`),y.join(o.LF)+o.LF+o.LF}isBodyEmpty(){return this.bodyLength()===0}bodyLength(){const y=this.binaryBody;return y?y.length:0}static sizeOfUTF8(y){return y?new TextEncoder().encode(y).length:0}static toUnit8Array(y,k){const $=new TextEncoder().encode(y),C=new Uint8Array([0]),P=new Uint8Array($.length+k.length+C.length);return P.set($),P.set(k,$.length),P.set(C,$.length+k.length),P}static marshall(y){return new a(y).serialize()}static hdrValueEscape(y){return y.replace(/\\/g,"\\\\").replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/:/g,"\\c")}static hdrValueUnEscape(y){return y.replace(/\\r/g,"\r").replace(/\\n/g,`
`).replace(/\\c/g,":").replace(/\\\\/g,"\\")}}const s=0,c=10,l=13,u=58;class d{constructor(y,k){this.onFrame=y,this.onIncomingPing=k,this._encoder=new TextEncoder,this._decoder=new TextDecoder,this._token=[],this._initState()}parseChunk(y,k=!1){let $;if(typeof y=="string"?$=this._encoder.encode(y):$=new Uint8Array(y),k&&$[$.length-1]!==0){const C=new Uint8Array($.length+1);C.set($,0),C[$.length]=0,$=C}for(let C=0;C<$.length;C++){const P=$[C];this._onByte(P)}}_collectFrame(y){if(y!==s&&y!==l){if(y===c){this.onIncomingPing();return}this._onByte=this._collectCommand,this._reinjectByte(y)}}_collectCommand(y){if(y!==l){if(y===c){this._results.command=this._consumeTokenAsUTF8(),this._onByte=this._collectHeaders;return}this._consumeByte(y)}}_collectHeaders(y){if(y!==l){if(y===c){this._setupCollectBody();return}this._onByte=this._collectHeaderKey,this._reinjectByte(y)}}_reinjectByte(y){this._onByte(y)}_collectHeaderKey(y){if(y===u){this._headerKey=this._consumeTokenAsUTF8(),this._onByte=this._collectHeaderValue;return}this._consumeByte(y)}_collectHeaderValue(y){if(y!==l){if(y===c){this._results.headers.push([this._headerKey,this._consumeTokenAsUTF8()]),this._headerKey=void 0,this._onByte=this._collectHeaders;return}this._consumeByte(y)}}_setupCollectBody(){const y=this._results.headers.filter(k=>k[0]==="content-length")[0];y?(this._bodyBytesRemaining=parseInt(y[1],10),this._onByte=this._collectBodyFixedSize):this._onByte=this._collectBodyNullTerminated}_collectBodyNullTerminated(y){if(y===s){this._retrievedBody();return}this._consumeByte(y)}_collectBodyFixedSize(y){if(this._bodyBytesRemaining--===0){this._retrievedBody();return}this._consumeByte(y)}_retrievedBody(){this._results.binaryBody=this._consumeTokenAsRaw();try{this.onFrame(this._results)}catch(y){console.log("Ignoring an exception thrown by a frame handler. Original exception: ",y)}this._initState()}_consumeByte(y){this._token.push(y)}_consumeTokenAsUTF8(){return this._decoder.decode(this._consumeTokenAsRaw())}_consumeTokenAsRaw(){const y=new Uint8Array(this._token);return this._token=[],y}_initState(){this._results={command:void 0,headers:[],binaryBody:void 0},this._token=[],this._headerKey=void 0,this._onByte=this._collectFrame}}r.StompSocketState=void 0,(function(S){S[S.CONNECTING=0]="CONNECTING",S[S.OPEN=1]="OPEN",S[S.CLOSING=2]="CLOSING",S[S.CLOSED=3]="CLOSED"})(r.StompSocketState||(r.StompSocketState={})),r.ActivationState=void 0,(function(S){S[S.ACTIVE=0]="ACTIVE",S[S.DEACTIVATING=1]="DEACTIVATING",S[S.INACTIVE=2]="INACTIVE"})(r.ActivationState||(r.ActivationState={})),r.ReconnectionTimeMode=void 0,(function(S){S[S.LINEAR=0]="LINEAR",S[S.EXPONENTIAL=1]="EXPONENTIAL"})(r.ReconnectionTimeMode||(r.ReconnectionTimeMode={})),r.TickerStrategy=void 0,(function(S){S.Interval="interval",S.Worker="worker"})(r.TickerStrategy||(r.TickerStrategy={}));class f{constructor(y,k=r.TickerStrategy.Interval,$){this._interval=y,this._strategy=k,this._debug=$,this._workerScript=`
    var startTime = Date.now();
    setInterval(function() {
        self.postMessage(Date.now() - startTime);
    }, ${this._interval});
  `}start(y){this.stop(),this.shouldUseWorker()?this.runWorker(y):this.runInterval(y)}stop(){this.disposeWorker(),this.disposeInterval()}shouldUseWorker(){return typeof Worker<"u"&&this._strategy===r.TickerStrategy.Worker}runWorker(y){this._debug("Using runWorker for outgoing pings"),this._worker||(this._worker=new Worker(URL.createObjectURL(new Blob([this._workerScript],{type:"text/javascript"}))),this._worker.onmessage=k=>y(k.data))}runInterval(y){if(this._debug("Using runInterval for outgoing pings"),!this._timer){const k=Date.now();this._timer=setInterval(()=>{y(Date.now()-k)},this._interval)}}disposeWorker(){this._worker&&(this._worker.terminate(),delete this._worker,this._debug("Outgoing ping disposeWorker"))}disposeInterval(){this._timer&&(clearInterval(this._timer),delete this._timer,this._debug("Outgoing ping disposeInterval"))}}class m{constructor(y){this.versions=y}supportedVersions(){return this.versions.join(",")}protocolVersions(){return this.versions.map(y=>`v${y.replace(".","")}.stomp`)}}m.V1_0="1.0",m.V1_1="1.1",m.V1_2="1.2",m.default=new m([m.V1_2,m.V1_1,m.V1_0]);class g{get connectedVersion(){return this._connectedVersion}get connected(){return this._connected}constructor(y,k,$){this._client=y,this._webSocket=k,this._connected=!1,this._serverFrameHandlers={CONNECTED:C=>{this.debug(`connected to server ${C.headers.server}`),this._connected=!0,this._connectedVersion=C.headers.version,this._connectedVersion===m.V1_2&&(this._escapeHeaderValues=!0),this._setupHeartbeat(C.headers),this.onConnect(C)},MESSAGE:C=>{const P=C.headers.subscription,z=this._subscriptions[P]||this.onUnhandledMessage,_=C,N=this,R=this._connectedVersion===m.V1_2?_.headers.ack:_.headers["message-id"];_.ack=(F={})=>N.ack(R,P,F),_.nack=(F={})=>N.nack(R,P,F),z(_)},RECEIPT:C=>{const P=this._receiptWatchers[C.headers["receipt-id"]];P?(P(C),delete this._receiptWatchers[C.headers["receipt-id"]]):this.onUnhandledReceipt(C)},ERROR:C=>{this.onStompError(C)}},this._counter=0,this._subscriptions={},this._receiptWatchers={},this._partialData="",this._escapeHeaderValues=!1,this._lastServerActivityTS=Date.now(),this.debug=$.debug,this.stompVersions=$.stompVersions,this.connectHeaders=$.connectHeaders,this.disconnectHeaders=$.disconnectHeaders,this.heartbeatIncoming=$.heartbeatIncoming,this.heartbeatToleranceMultiplier=$.heartbeatGracePeriods,this.heartbeatOutgoing=$.heartbeatOutgoing,this.splitLargeFrames=$.splitLargeFrames,this.maxWebSocketChunkSize=$.maxWebSocketChunkSize,this.forceBinaryWSFrames=$.forceBinaryWSFrames,this.logRawCommunication=$.logRawCommunication,this.appendMissingNULLonIncoming=$.appendMissingNULLonIncoming,this.discardWebsocketOnCommFailure=$.discardWebsocketOnCommFailure,this.onConnect=$.onConnect,this.onDisconnect=$.onDisconnect,this.onStompError=$.onStompError,this.onWebSocketClose=$.onWebSocketClose,this.onWebSocketError=$.onWebSocketError,this.onUnhandledMessage=$.onUnhandledMessage,this.onUnhandledReceipt=$.onUnhandledReceipt,this.onUnhandledFrame=$.onUnhandledFrame,this.onHeartbeatReceived=$.onHeartbeatReceived,this.onHeartbeatLost=$.onHeartbeatLost}start(){const y=new d($=>{const C=a.fromRawFrame($,this._escapeHeaderValues);this.logRawCommunication||this.debug(`<<< ${C}`),(this._serverFrameHandlers[C.command]||this.onUnhandledFrame)(C)},()=>{this.debug("<<< PONG"),this.onHeartbeatReceived()});this._webSocket.onmessage=$=>{if(this.debug("Received data"),this._lastServerActivityTS=Date.now(),this.logRawCommunication){const C=$.data instanceof ArrayBuffer?new TextDecoder().decode($.data):$.data;this.debug(`<<< ${C}`)}y.parseChunk($.data,this.appendMissingNULLonIncoming)},this._webSocket.onclose=$=>{this.debug(`Connection closed to ${this._webSocket.url}`),this._cleanUp(),this.onWebSocketClose($)},this._webSocket.onerror=$=>{this.onWebSocketError($)};const k=()=>{const $=Object.assign({},this.connectHeaders);this.debug("Web Socket Opened..."),$["accept-version"]=this.stompVersions.supportedVersions(),$["heart-beat"]=[this.heartbeatOutgoing,this.heartbeatIncoming].join(","),this._transmit({command:"CONNECT",headers:$})};this._webSocket.readyState===r.StompSocketState.OPEN?k():this._webSocket.onopen=k}_setupHeartbeat(y){if(y.version!==m.V1_1&&y.version!==m.V1_2||!y["heart-beat"])return;const[k,$]=y["heart-beat"].split(",").map(C=>parseInt(C,10));if(this.heartbeatOutgoing!==0&&$!==0){const C=Math.max(this.heartbeatOutgoing,$);this.debug(`send PING every ${C}ms`),this._pinger=new f(C,this._client.heartbeatStrategy,this.debug),this._pinger.start(()=>{this._webSocket.readyState===r.StompSocketState.OPEN&&(this._webSocket.send(o.LF),this.debug(">>> PING"))})}if(this.heartbeatIncoming!==0&&k!==0){const C=Math.max(this.heartbeatIncoming,k);this.debug(`check PONG every ${C}ms`),this._ponger=setInterval(()=>{const P=Date.now()-this._lastServerActivityTS;P>C*this.heartbeatToleranceMultiplier&&(this.debug(`did not receive server activity for the last ${P}ms`),this.onHeartbeatLost(),this._closeOrDiscardWebsocket())},C)}}_closeOrDiscardWebsocket(){this.discardWebsocketOnCommFailure?(this.debug("Discarding websocket, the underlying socket may linger for a while"),this.discardWebsocket()):(this.debug("Issuing close on the websocket"),this._closeWebsocket())}forceDisconnect(){this._webSocket&&(this._webSocket.readyState===r.StompSocketState.CONNECTING||this._webSocket.readyState===r.StompSocketState.OPEN)&&this._closeOrDiscardWebsocket()}_closeWebsocket(){this._webSocket.onmessage=()=>{},this._webSocket.close()}discardWebsocket(){typeof this._webSocket.terminate!="function"&&n(this._webSocket,y=>this.debug(y)),this._webSocket.terminate()}_transmit(y){const{command:k,headers:$,body:C,binaryBody:P,skipContentLengthHeader:z}=y,_=new a({command:k,headers:$,body:C,binaryBody:P,escapeHeaderValues:this._escapeHeaderValues,skipContentLengthHeader:z});let N=_.serialize();if(this.logRawCommunication?this.debug(`>>> ${N}`):this.debug(`>>> ${_}`),this.forceBinaryWSFrames&&typeof N=="string"&&(N=new TextEncoder().encode(N)),typeof N!="string"||!this.splitLargeFrames)this._webSocket.send(N);else{let R=N;for(;R.length>0;){const F=R.substring(0,this.maxWebSocketChunkSize);R=R.substring(this.maxWebSocketChunkSize),this._webSocket.send(F),this.debug(`chunk sent = ${F.length}, remaining = ${R.length}`)}}}dispose(){if(this.connected)try{const y=Object.assign({},this.disconnectHeaders);y.receipt||(y.receipt=`close-${this._counter++}`),this.watchForReceipt(y.receipt,k=>{this._closeWebsocket(),this._cleanUp(),this.onDisconnect(k)}),this._transmit({command:"DISCONNECT",headers:y})}catch(y){this.debug(`Ignoring error during disconnect ${y}`)}else(this._webSocket.readyState===r.StompSocketState.CONNECTING||this._webSocket.readyState===r.StompSocketState.OPEN)&&this._closeWebsocket()}_cleanUp(){this._connected=!1,this._pinger&&(this._pinger.stop(),this._pinger=void 0),this._ponger&&(clearInterval(this._ponger),this._ponger=void 0)}publish(y){const{destination:k,headers:$,body:C,binaryBody:P,skipContentLengthHeader:z}=y,_=Object.assign({destination:k},$);this._transmit({command:"SEND",headers:_,body:C,binaryBody:P,skipContentLengthHeader:z})}watchForReceipt(y,k){this._receiptWatchers[y]=k}subscribe(y,k,$={}){$=Object.assign({},$),$.id||($.id=`sub-${this._counter++}`),$.destination=y,this._subscriptions[$.id]=k,this._transmit({command:"SUBSCRIBE",headers:$});const C=this;return{id:$.id,unsubscribe(P){return C.unsubscribe($.id,P)}}}unsubscribe(y,k={}){k=Object.assign({},k),delete this._subscriptions[y],k.id=y,this._transmit({command:"UNSUBSCRIBE",headers:k})}begin(y){const k=y||`tx-${this._counter++}`;this._transmit({command:"BEGIN",headers:{transaction:k}});const $=this;return{id:k,commit(){$.commit(k)},abort(){$.abort(k)}}}commit(y){this._transmit({command:"COMMIT",headers:{transaction:y}})}abort(y){this._transmit({command:"ABORT",headers:{transaction:y}})}ack(y,k,$={}){$=Object.assign({},$),this._connectedVersion===m.V1_2?$.id=y:$["message-id"]=y,$.subscription=k,this._transmit({command:"ACK",headers:$})}nack(y,k,$={}){return $=Object.assign({},$),this._connectedVersion===m.V1_2?$.id=y:$["message-id"]=y,$.subscription=k,this._transmit({command:"NACK",headers:$})}}class x{get webSocket(){return this._stompHandler?._webSocket}get disconnectHeaders(){return this._disconnectHeaders}set disconnectHeaders(y){this._disconnectHeaders=y,this._stompHandler&&(this._stompHandler.disconnectHeaders=this._disconnectHeaders)}get connected(){return!!this._stompHandler&&this._stompHandler.connected}get connectedVersion(){return this._stompHandler?this._stompHandler.connectedVersion:void 0}get active(){return this.state===r.ActivationState.ACTIVE}_changeState(y){this.state=y,this.onChangeState(y)}constructor(y={}){this.stompVersions=m.default,this.connectionTimeout=0,this.reconnectDelay=5e3,this._nextReconnectDelay=0,this.maxReconnectDelay=900*1e3,this.reconnectTimeMode=r.ReconnectionTimeMode.LINEAR,this.heartbeatIncoming=1e4,this.heartbeatToleranceMultiplier=2,this.heartbeatOutgoing=1e4,this.heartbeatStrategy=r.TickerStrategy.Interval,this.splitLargeFrames=!1,this.maxWebSocketChunkSize=8*1024,this.forceBinaryWSFrames=!1,this.appendMissingNULLonIncoming=!1,this.discardWebsocketOnCommFailure=!1,this.state=r.ActivationState.INACTIVE;const k=()=>{};this.debug=k,this.beforeConnect=k,this.onConnect=k,this.onDisconnect=k,this.onUnhandledMessage=k,this.onUnhandledReceipt=k,this.onUnhandledFrame=k,this.onHeartbeatReceived=k,this.onHeartbeatLost=k,this.onStompError=k,this.onWebSocketClose=k,this.onWebSocketError=k,this.logRawCommunication=!1,this.onChangeState=k,this.connectHeaders={},this._disconnectHeaders={},this.configure(y)}configure(y){Object.assign(this,y),this.maxReconnectDelay>0&&this.maxReconnectDelay<this.reconnectDelay&&(this.debug(`Warning: maxReconnectDelay (${this.maxReconnectDelay}ms) is less than reconnectDelay (${this.reconnectDelay}ms). Using reconnectDelay as the maxReconnectDelay delay.`),this.maxReconnectDelay=this.reconnectDelay)}activate(){const y=()=>{if(this.active){this.debug("Already ACTIVE, ignoring request to activate");return}this._changeState(r.ActivationState.ACTIVE),this._nextReconnectDelay=this.reconnectDelay,this._connect()};this.state===r.ActivationState.DEACTIVATING?(this.debug("Waiting for deactivation to finish before activating"),this.deactivate().then(()=>{y()})):y()}async _connect(){if(await this.beforeConnect(this),this._stompHandler){this.debug("There is already a stompHandler, skipping the call to connect");return}if(!this.active){this.debug("Client has been marked inactive, will not attempt to connect");return}this.connectionTimeout>0&&(this._connectionWatcher&&clearTimeout(this._connectionWatcher),this._connectionWatcher=setTimeout(()=>{this.connected||(this.debug(`Connection not established in ${this.connectionTimeout}ms, closing socket`),this.forceDisconnect())},this.connectionTimeout)),this.debug("Opening Web Socket...");const y=this._createWebSocket();this._stompHandler=new g(this,y,{debug:this.debug,stompVersions:this.stompVersions,connectHeaders:this.connectHeaders,disconnectHeaders:this._disconnectHeaders,heartbeatIncoming:this.heartbeatIncoming,heartbeatGracePeriods:this.heartbeatToleranceMultiplier,heartbeatOutgoing:this.heartbeatOutgoing,heartbeatStrategy:this.heartbeatStrategy,splitLargeFrames:this.splitLargeFrames,maxWebSocketChunkSize:this.maxWebSocketChunkSize,forceBinaryWSFrames:this.forceBinaryWSFrames,logRawCommunication:this.logRawCommunication,appendMissingNULLonIncoming:this.appendMissingNULLonIncoming,discardWebsocketOnCommFailure:this.discardWebsocketOnCommFailure,onConnect:k=>{if(this._connectionWatcher&&(clearTimeout(this._connectionWatcher),this._connectionWatcher=void 0),this._nextReconnectDelay=this.reconnectDelay,!this.active){this.debug("STOMP got connected while deactivate was issued, will disconnect now"),this._disposeStompHandler();return}this.onConnect(k)},onDisconnect:k=>{this.onDisconnect(k)},onStompError:k=>{this.onStompError(k)},onWebSocketClose:k=>{this._stompHandler=void 0,this.state===r.ActivationState.DEACTIVATING&&this._changeState(r.ActivationState.INACTIVE),this.onWebSocketClose(k),this.active&&this._schedule_reconnect()},onWebSocketError:k=>{this.onWebSocketError(k)},onUnhandledMessage:k=>{this.onUnhandledMessage(k)},onUnhandledReceipt:k=>{this.onUnhandledReceipt(k)},onUnhandledFrame:k=>{this.onUnhandledFrame(k)},onHeartbeatReceived:()=>{this.onHeartbeatReceived()},onHeartbeatLost:()=>{this.onHeartbeatLost()}}),this._stompHandler.start()}_createWebSocket(){let y;if(this.webSocketFactory)y=this.webSocketFactory();else if(this.brokerURL)y=new WebSocket(this.brokerURL,this.stompVersions.protocolVersions());else throw new Error("Either brokerURL or webSocketFactory must be provided");return y.binaryType="arraybuffer",y}_schedule_reconnect(){this._nextReconnectDelay>0&&(this.debug(`STOMP: scheduling reconnection in ${this._nextReconnectDelay}ms`),this._reconnector=setTimeout(()=>{this.reconnectTimeMode===r.ReconnectionTimeMode.EXPONENTIAL&&(this._nextReconnectDelay=this._nextReconnectDelay*2,this.maxReconnectDelay!==0&&(this._nextReconnectDelay=Math.min(this._nextReconnectDelay,this.maxReconnectDelay))),this._connect()},this._nextReconnectDelay))}async deactivate(y={}){const k=y.force||!1,$=this.active;let C;if(this.state===r.ActivationState.INACTIVE)return this.debug("Already INACTIVE, nothing more to do"),Promise.resolve();if(this._changeState(r.ActivationState.DEACTIVATING),this._nextReconnectDelay=0,this._reconnector&&(clearTimeout(this._reconnector),this._reconnector=void 0),this._stompHandler&&this.webSocket.readyState!==r.StompSocketState.CLOSED){const P=this._stompHandler.onWebSocketClose;C=new Promise((z,_)=>{this._stompHandler.onWebSocketClose=N=>{P(N),z()}})}else return this._changeState(r.ActivationState.INACTIVE),Promise.resolve();return k?this._stompHandler?.discardWebsocket():$&&this._disposeStompHandler(),C}forceDisconnect(){this._stompHandler&&this._stompHandler.forceDisconnect()}_disposeStompHandler(){this._stompHandler&&this._stompHandler.dispose()}publish(y){this._checkConnection(),this._stompHandler.publish(y)}_checkConnection(){if(!this.connected)throw new TypeError("There is no underlying STOMP connection")}watchForReceipt(y,k){this._checkConnection(),this._stompHandler.watchForReceipt(y,k)}subscribe(y,k,$={}){return this._checkConnection(),this._stompHandler.subscribe(y,k,$)}unsubscribe(y,k={}){this._checkConnection(),this._stompHandler.unsubscribe(y,k)}begin(y){return this._checkConnection(),this._stompHandler.begin(y)}commit(y){this._checkConnection(),this._stompHandler.commit(y)}abort(y){this._checkConnection(),this._stompHandler.abort(y)}ack(y,k,$={}){this._checkConnection(),this._stompHandler.ack(y,k,$)}nack(y,k,$={}){this._checkConnection(),this._stompHandler.nack(y,k,$)}}class v{}class b{}class E{constructor(y){this.client=y}get outgoing(){return this.client.heartbeatOutgoing}set outgoing(y){this.client.heartbeatOutgoing=y}get incoming(){return this.client.heartbeatIncoming}set incoming(y){this.client.heartbeatIncoming=y}}class w extends x{constructor(y){super(),this.maxWebSocketFrameSize=16*1024,this._heartbeatInfo=new E(this),this.reconnect_delay=0,this.webSocketFactory=y,this.debug=(...k)=>{console.log(...k)}}_parseConnect(...y){let k,$,C,P={};if(y.length<2)throw new Error("Connect requires at least 2 arguments");if(typeof y[1]=="function")[P,$,C,k]=y;else switch(y.length){case 6:[P.login,P.passcode,$,C,k,P.host]=y;break;default:[P.login,P.passcode,$,C,k]=y}return[P,$,C,k]}connect(...y){const k=this._parseConnect(...y);k[0]&&(this.connectHeaders=k[0]),k[1]&&(this.onConnect=k[1]),k[2]&&(this.onStompError=k[2]),k[3]&&(this.onWebSocketClose=k[3]),super.activate()}disconnect(y,k={}){y&&(this.onDisconnect=y),this.disconnectHeaders=k,super.deactivate()}send(y,k={},$=""){k=Object.assign({},k);const C=k["content-length"]===!1;C&&delete k["content-length"],this.publish({destination:y,headers:k,body:$,skipContentLengthHeader:C})}set reconnect_delay(y){this.reconnectDelay=y}get ws(){return this.webSocket}get version(){return this.connectedVersion}get onreceive(){return this.onUnhandledMessage}set onreceive(y){this.onUnhandledMessage=y}get onreceipt(){return this.onUnhandledReceipt}set onreceipt(y){this.onUnhandledReceipt=y}get heartbeat(){return this._heartbeatInfo}set heartbeat(y){this.heartbeatIncoming=y.incoming,this.heartbeatOutgoing=y.outgoing}}class j{static client(y,k){k==null&&(k=m.default.protocolVersions());const $=()=>{const C=j.WebSocketClass||WebSocket;return new C(y,k)};return new w($)}static over(y){let k;return typeof y=="function"?k=y:(console.warn("Stomp.over did not receive a factory, auto reconnect will not work. Please see https://stomp-js.github.io/api-docs/latest/classes/Stomp.html#over"),k=()=>y),new w(k)}}j.WebSocketClass=null,r.Client=x,r.CompatClient=w,r.FrameImpl=a,r.Parser=d,r.Stomp=j,r.StompConfig=v,r.StompHeaders=b,r.Versions=m}))})(wa,wa.exports)),wa.exports}var eie=Qoe(),Qh={exports:{}},Qs={},o1;function tie(){return o1||(o1=1,globalThis.crypto&&globalThis.crypto.getRandomValues?Qs.randomBytes=function(e){var t=new Uint8Array(e);return globalThis.crypto.getRandomValues(t),t}:Qs.randomBytes=function(e){for(var t=new Array(e),r=0;r<e;r++)t[r]=Math.floor(Math.random()*256);return t}),Qs}var ef,i1;function Fi(){if(i1)return ef;i1=1;var e=tie(),t="abcdefghijklmnopqrstuvwxyz012345";return ef={string:function(r){for(var n=t.length,o=e.randomBytes(r),a=[],s=0;s<r;s++)a.push(t.substr(o[s]%n,1));return a.join("")},number:function(r){return Math.floor(Math.random()*r)},numberString:function(r){var n=(""+(r-1)).length,o=new Array(n+1).join("0");return(o+this.number(r)).slice(-n)}},ef}var a1;function so(){return a1||(a1=1,(function(e){var t=Fi(),r={},n=!1,o=globalThis.chrome&&globalThis.chrome.app&&globalThis.chrome.app.runtime;e.exports={attachEvent:function(s,c){typeof globalThis.addEventListener<"u"?globalThis.addEventListener(s,c,!1):globalThis.document&&globalThis.attachEvent&&(globalThis.document.attachEvent("on"+s,c),globalThis.attachEvent("on"+s,c))},detachEvent:function(s,c){typeof globalThis.addEventListener<"u"?globalThis.removeEventListener(s,c,!1):globalThis.document&&globalThis.detachEvent&&(globalThis.document.detachEvent("on"+s,c),globalThis.detachEvent("on"+s,c))},unloadAdd:function(s){if(o)return null;var c=t.string(8);return r[c]=s,n&&setTimeout(this.triggerUnloadCallbacks,0),c},unloadDel:function(s){s in r&&delete r[s]},triggerUnloadCallbacks:function(){for(var s in r)r[s](),delete r[s]}};var a=function(){n||(n=!0,e.exports.triggerUnloadCallbacks())};o||e.exports.attachEvent("unload",a)})(Qh)),Qh.exports}var tf,s1;function rie(){return s1||(s1=1,tf=function(t,r){if(r=r.split(":")[0],t=+t,!t)return!1;switch(r){case"http":case"ws":return t!==80;case"https":case"wss":return t!==443;case"ftp":return t!==21;case"gopher":return t!==70;case"file":return!1}return t!==0}),tf}var ec={},c1;function nie(){if(c1)return ec;c1=1;var e=Object.prototype.hasOwnProperty,t;function r(s){try{return decodeURIComponent(s.replace(/\+/g," "))}catch{return null}}function n(s){try{return encodeURIComponent(s)}catch{return null}}function o(s){for(var c=/([^=?#&]+)=?([^&]*)/g,l={},u;u=c.exec(s);){var d=r(u[1]),f=r(u[2]);d===null||f===null||d in l||(l[d]=f)}return l}function a(s,c){c=c||"";var l=[],u,d;typeof c!="string"&&(c="?");for(d in s)if(e.call(s,d)){if(u=s[d],!u&&(u===null||u===t||isNaN(u))&&(u=""),d=n(d),u=n(u),d===null||u===null)continue;l.push(d+"="+u)}return l.length?c+l.join("&"):""}return ec.stringify=a,ec.parse=o,ec}var rf,l1;function vA(){if(l1)return rf;l1=1;var e=rie(),t=nie(),r=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,n=/[\n\r\t]/g,o=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,a=/:\d+$/,s=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,c=/^[a-zA-Z]:/;function l(w){return(w||"").toString().replace(r,"")}var u=[["#","hash"],["?","query"],function(j,S){return m(S.protocol)?j.replace(/\\/g,"/"):j},["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d*)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],d={hash:1,query:1};function f(w){var j;typeof window<"u"?j=window:typeof globalThis<"u"?j=globalThis:typeof self<"u"?j=self:j={};var S=j.location||{};w=w||S;var y={},k=typeof w,$;if(w.protocol==="blob:")y=new v(unescape(w.pathname),{});else if(k==="string"){y=new v(w,{});for($ in d)delete y[$]}else if(k==="object"){for($ in w)$ in d||(y[$]=w[$]);y.slashes===void 0&&(y.slashes=o.test(w.href))}return y}function m(w){return w==="file:"||w==="ftp:"||w==="http:"||w==="https:"||w==="ws:"||w==="wss:"}function g(w,j){w=l(w),w=w.replace(n,""),j=j||{};var S=s.exec(w),y=S[1]?S[1].toLowerCase():"",k=!!S[2],$=!!S[3],C=0,P;return k?$?(P=S[2]+S[3]+S[4],C=S[2].length+S[3].length):(P=S[2]+S[4],C=S[2].length):$?(P=S[3]+S[4],C=S[3].length):P=S[4],y==="file:"?C>=2&&(P=P.slice(2)):m(y)?P=S[4]:y?k&&(P=P.slice(2)):C>=2&&m(j.protocol)&&(P=S[4]),{protocol:y,slashes:k||m(y),slashesCount:C,rest:P}}function x(w,j){if(w==="")return j;for(var S=(j||"/").split("/").slice(0,-1).concat(w.split("/")),y=S.length,k=S[y-1],$=!1,C=0;y--;)S[y]==="."?S.splice(y,1):S[y]===".."?(S.splice(y,1),C++):C&&(y===0&&($=!0),S.splice(y,1),C--);return $&&S.unshift(""),(k==="."||k==="..")&&S.push(""),S.join("/")}function v(w,j,S){if(w=l(w),w=w.replace(n,""),!(this instanceof v))return new v(w,j,S);var y,k,$,C,P,z,_=u.slice(),N=typeof j,R=this,F=0;for(N!=="object"&&N!=="string"&&(S=j,j=null),S&&typeof S!="function"&&(S=t.parse),j=f(j),k=g(w||"",j),y=!k.protocol&&!k.slashes,R.slashes=k.slashes||y&&j.slashes,R.protocol=k.protocol||j.protocol||"",w=k.rest,(k.protocol==="file:"&&(k.slashesCount!==2||c.test(w))||!k.slashes&&(k.protocol||k.slashesCount<2||!m(R.protocol)))&&(_[3]=[/(.*)/,"pathname"]);F<_.length;F++){if(C=_[F],typeof C=="function"){w=C(w,R);continue}$=C[0],z=C[1],$!==$?R[z]=w:typeof $=="string"?(P=$==="@"?w.lastIndexOf($):w.indexOf($),~P&&(typeof C[2]=="number"?(R[z]=w.slice(0,P),w=w.slice(P+C[2])):(R[z]=w.slice(P),w=w.slice(0,P)))):(P=$.exec(w))&&(R[z]=P[1],w=w.slice(0,P.index)),R[z]=R[z]||y&&C[3]&&j[z]||"",C[4]&&(R[z]=R[z].toLowerCase())}S&&(R.query=S(R.query)),y&&j.slashes&&R.pathname.charAt(0)!=="/"&&(R.pathname!==""||j.pathname!=="")&&(R.pathname=x(R.pathname,j.pathname)),R.pathname.charAt(0)!=="/"&&m(R.protocol)&&(R.pathname="/"+R.pathname),e(R.port,R.protocol)||(R.host=R.hostname,R.port=""),R.username=R.password="",R.auth&&(P=R.auth.indexOf(":"),~P?(R.username=R.auth.slice(0,P),R.username=encodeURIComponent(decodeURIComponent(R.username)),R.password=R.auth.slice(P+1),R.password=encodeURIComponent(decodeURIComponent(R.password))):R.username=encodeURIComponent(decodeURIComponent(R.auth)),R.auth=R.password?R.username+":"+R.password:R.username),R.origin=R.protocol!=="file:"&&m(R.protocol)&&R.host?R.protocol+"//"+R.host:"null",R.href=R.toString()}function b(w,j,S){var y=this;switch(w){case"query":typeof j=="string"&&j.length&&(j=(S||t.parse)(j)),y[w]=j;break;case"port":y[w]=j,e(j,y.protocol)?j&&(y.host=y.hostname+":"+j):(y.host=y.hostname,y[w]="");break;case"hostname":y[w]=j,y.port&&(j+=":"+y.port),y.host=j;break;case"host":y[w]=j,a.test(j)?(j=j.split(":"),y.port=j.pop(),y.hostname=j.join(":")):(y.hostname=j,y.port="");break;case"protocol":y.protocol=j.toLowerCase(),y.slashes=!S;break;case"pathname":case"hash":if(j){var k=w==="pathname"?"/":"#";y[w]=j.charAt(0)!==k?k+j:j}else y[w]=j;break;case"username":case"password":y[w]=encodeURIComponent(j);break;case"auth":var $=j.indexOf(":");~$?(y.username=j.slice(0,$),y.username=encodeURIComponent(decodeURIComponent(y.username)),y.password=j.slice($+1),y.password=encodeURIComponent(decodeURIComponent(y.password))):y.username=encodeURIComponent(decodeURIComponent(j))}for(var C=0;C<u.length;C++){var P=u[C];P[4]&&(y[P[1]]=y[P[1]].toLowerCase())}return y.auth=y.password?y.username+":"+y.password:y.username,y.origin=y.protocol!=="file:"&&m(y.protocol)&&y.host?y.protocol+"//"+y.host:"null",y.href=y.toString(),y}function E(w){(!w||typeof w!="function")&&(w=t.stringify);var j,S=this,y=S.host,k=S.protocol;k&&k.charAt(k.length-1)!==":"&&(k+=":");var $=k+(S.protocol&&S.slashes||m(S.protocol)?"//":"");return S.username?($+=S.username,S.password&&($+=":"+S.password),$+="@"):S.password?($+=":"+S.password,$+="@"):S.protocol!=="file:"&&m(S.protocol)&&!y&&S.pathname!=="/"&&($+="@"),(y[y.length-1]===":"||a.test(S.hostname)&&!S.port)&&(y+=":"),$+=y+S.pathname,j=typeof S.query=="object"?w(S.query):S.query,j&&($+=j.charAt(0)!=="?"?"?"+j:j),S.hash&&($+=S.hash),$}return v.prototype={set:b,toString:E},v.extractProtocol=g,v.location=f,v.trimLeft=l,v.qs=t,rf=v,rf}var nf,d1;function Cr(){if(d1)return nf;d1=1;var e=vA();return nf={getOrigin:function(t){if(!t)return null;var r=new e(t);if(r.protocol==="file:")return null;var n=r.port;return n||(n=r.protocol==="https:"?"443":"80"),r.protocol+"//"+r.hostname+":"+n},isOriginEqual:function(t,r){var n=this.getOrigin(t)===this.getOrigin(r);return n},isSchemeEqual:function(t,r){return t.split(":")[0]===r.split(":")[0]},addPath:function(t,r){var n=t.split("?");return n[0]+r+(n[1]?"?"+n[1]:"")},addQuery:function(t,r){return t+(t.indexOf("?")===-1?"?"+r:"&"+r)},isLoopbackAddr:function(t){return/^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(t)||/^\[::1\]$/.test(t)}},nf}var tc={exports:{}},u1;function Ae(){return u1||(u1=1,typeof Object.create=="function"?tc.exports=function(t,r){r&&(t.super_=r,t.prototype=Object.create(r.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:tc.exports=function(t,r){if(r){t.super_=r;var n=function(){};n.prototype=r.prototype,t.prototype=new n,t.prototype.constructor=t}}),tc.exports}var of={},af,h1;function yA(){if(h1)return af;h1=1;function e(){this._listeners={}}return e.prototype.addEventListener=function(t,r){t in this._listeners||(this._listeners[t]=[]);var n=this._listeners[t];n.indexOf(r)===-1&&(n=n.concat([r])),this._listeners[t]=n},e.prototype.removeEventListener=function(t,r){var n=this._listeners[t];if(n){var o=n.indexOf(r);if(o!==-1){n.length>1?this._listeners[t]=n.slice(0,o).concat(n.slice(o+1)):delete this._listeners[t];return}}},e.prototype.dispatchEvent=function(){var t=arguments[0],r=t.type,n=arguments.length===1?[t]:Array.apply(null,arguments);if(this["on"+r]&&this["on"+r].apply(this,n),r in this._listeners)for(var o=this._listeners[r],a=0;a<o.length;a++)o[a].apply(this,n)},af=e,af}var f1;function Gt(){if(f1)return of;f1=1;var e=Ae(),t=yA();function r(){t.call(this)}return e(r,t),r.prototype.removeAllListeners=function(n){n?delete this._listeners[n]:this._listeners={}},r.prototype.once=function(n,o){var a=this,s=!1;function c(){a.removeListener(n,c),s||(s=!0,o.apply(this,arguments))}this.on(n,c)},r.prototype.emit=function(){var n=arguments[0],o=this._listeners[n];if(o){for(var a=arguments.length,s=new Array(a-1),c=1;c<a;c++)s[c-1]=arguments[c];for(var l=0;l<o.length;l++)o[l].apply(this,s)}},r.prototype.on=r.prototype.addListener=t.prototype.addEventListener,r.prototype.removeListener=t.prototype.removeEventListener,of.EventEmitter=r,of}var rc={exports:{}},p1;function oie(){if(p1)return rc.exports;p1=1;var e=globalThis.WebSocket||globalThis.MozWebSocket;return e?rc.exports=function(r){return new e(r)}:rc.exports=void 0,rc.exports}var sf,m1;function iie(){if(m1)return sf;m1=1;var e=so(),t=Cr(),r=Ae(),n=Gt().EventEmitter,o=oie(),a=function(){};function s(c,l,u){if(!s.enabled())throw new Error("Transport created when disabled");n.call(this);var d=this,f=t.addPath(c,"/websocket");f.slice(0,5)==="https"?f="wss"+f.slice(5):f="ws"+f.slice(4),this.url=f,this.ws=new o(this.url,[],u),this.ws.onmessage=function(m){a("message event",m.data),d.emit("message",m.data)},this.unloadRef=e.unloadAdd(function(){d.ws.close()}),this.ws.onclose=function(m){a("close event",m.code,m.reason),d.emit("close",m.code,m.reason),d._cleanup()},this.ws.onerror=function(m){d.emit("close",1006,"WebSocket connection broken"),d._cleanup()}}return r(s,n),s.prototype.send=function(c){var l="["+c+"]";this.ws.send(l)},s.prototype.close=function(){var c=this.ws;this._cleanup(),c&&c.close()},s.prototype._cleanup=function(){var c=this.ws;c&&(c.onmessage=c.onclose=c.onerror=null),e.unloadDel(this.unloadRef),this.unloadRef=this.ws=null,this.removeAllListeners()},s.enabled=function(){return!!o},s.transportName="websocket",s.roundTrips=2,sf=s,sf}var cf,g1;function aie(){if(g1)return cf;g1=1;var e=Ae(),t=Gt().EventEmitter,r=function(){};function n(o,a){t.call(this),this.sendBuffer=[],this.sender=a,this.url=o}return e(n,t),n.prototype.send=function(o){this.sendBuffer.push(o),this.sendStop||this.sendSchedule()},n.prototype.sendScheduleWait=function(){var o=this,a;this.sendStop=function(){o.sendStop=null,clearTimeout(a)},a=setTimeout(function(){o.sendStop=null,o.sendSchedule()},25)},n.prototype.sendSchedule=function(){r("sendSchedule",this.sendBuffer.length);var o=this;if(this.sendBuffer.length>0){var a="["+this.sendBuffer.join(",")+"]";this.sendStop=this.sender(this.url,a,function(s){o.sendStop=null,s?(o.emit("close",s.code||1006,"Sending error: "+s),o.close()):o.sendScheduleWait()}),this.sendBuffer=[]}},n.prototype._cleanup=function(){this.removeAllListeners()},n.prototype.close=function(){this._cleanup(),this.sendStop&&(this.sendStop(),this.sendStop=null)},cf=n,cf}var lf,x1;function sie(){if(x1)return lf;x1=1;var e=Ae(),t=Gt().EventEmitter,r=function(){};function n(o,a,s){t.call(this),this.Receiver=o,this.receiveUrl=a,this.AjaxObject=s,this._scheduleReceiver()}return e(n,t),n.prototype._scheduleReceiver=function(){var o=this,a=this.poll=new this.Receiver(this.receiveUrl,this.AjaxObject);a.on("message",function(s){o.emit("message",s)}),a.once("close",function(s,c){r("close",s,c,o.pollIsClosing),o.poll=a=null,o.pollIsClosing||(c==="network"?o._scheduleReceiver():(o.emit("close",s||1006,c),o.removeAllListeners()))})},n.prototype.abort=function(){this.removeAllListeners(),this.pollIsClosing=!0,this.poll&&this.poll.abort()},lf=n,lf}var df,v1;function bA(){if(v1)return df;v1=1;var e=Ae(),t=Cr(),r=aie(),n=sie();function o(a,s,c,l,u){var d=t.addPath(a,s),f=this;r.call(this,a,c),this.poll=new n(l,d,u),this.poll.on("message",function(m){f.emit("message",m)}),this.poll.once("close",function(m,g){f.poll=null,f.emit("close",m,g),f.close()})}return e(o,r),o.prototype.close=function(){r.prototype.close.call(this),this.removeAllListeners(),this.poll&&(this.poll.abort(),this.poll=null)},df=o,df}var uf,y1;function Ui(){if(y1)return uf;y1=1;var e=Ae(),t=Cr(),r=bA();function n(a){return function(s,c,l){var u={};typeof c=="string"&&(u.headers={"Content-type":"text/plain"});var d=t.addPath(s,"/xhr_send"),f=new a("POST",d,c,u);return f.once("finish",function(m){if(f=null,m!==200&&m!==204)return l(new Error("http status "+m));l()}),function(){f.close(),f=null;var m=new Error("Aborted");m.code=1e3,l(m)}}}function o(a,s,c,l){r.call(this,a,s,n(l),c,l)}return e(o,r),uf=o,uf}var hf,b1;function bd(){if(b1)return hf;b1=1;var e=Ae(),t=Gt().EventEmitter;function r(n,o){t.call(this);var a=this;this.bufferPosition=0,this.xo=new o("POST",n,null),this.xo.on("chunk",this._chunkHandler.bind(this)),this.xo.once("finish",function(s,c){a._chunkHandler(s,c),a.xo=null;var l=s===200?"network":"permanent";a.emit("close",null,l),a._cleanup()})}return e(r,t),r.prototype._chunkHandler=function(n,o){if(!(n!==200||!o))for(var a=-1;;this.bufferPosition+=a+1){var s=o.slice(this.bufferPosition);if(a=s.indexOf(`
`),a===-1)break;var c=s.slice(0,a);c&&this.emit("message",c)}},r.prototype._cleanup=function(){this.removeAllListeners()},r.prototype.abort=function(){this.xo&&(this.xo.close(),this.emit("close",null,"user"),this.xo=null),this._cleanup()},hf=r,hf}var ff,w1;function wA(){if(w1)return ff;w1=1;var e=Gt().EventEmitter,t=Ae(),r=so(),n=Cr(),o=globalThis.XMLHttpRequest,a=function(){};function s(u,d,f,m){var g=this;e.call(this),setTimeout(function(){g._start(u,d,f,m)},0)}t(s,e),s.prototype._start=function(u,d,f,m){var g=this;try{this.xhr=new o}catch{}if(!this.xhr){this.emit("finish",0,"no xhr support"),this._cleanup();return}d=n.addQuery(d,"t="+ +new Date),this.unloadRef=r.unloadAdd(function(){g._cleanup(!0)});try{this.xhr.open(u,d,!0),this.timeout&&"timeout"in this.xhr&&(this.xhr.timeout=this.timeout,this.xhr.ontimeout=function(){a("xhr timeout"),g.emit("finish",0,""),g._cleanup(!1)})}catch{this.emit("finish",0,""),this._cleanup(!1);return}if((!m||!m.noCredentials)&&s.supportsCORS&&(this.xhr.withCredentials=!0),m&&m.headers)for(var x in m.headers)this.xhr.setRequestHeader(x,m.headers[x]);this.xhr.onreadystatechange=function(){if(g.xhr){var v=g.xhr,b,E;switch(a("readyState",v.readyState),v.readyState){case 3:try{E=v.status,b=v.responseText}catch{}E===1223&&(E=204),E===200&&b&&b.length>0&&g.emit("chunk",E,b);break;case 4:E=v.status,E===1223&&(E=204),(E===12005||E===12029)&&(E=0),a("finish",E,v.responseText),g.emit("finish",E,v.responseText),g._cleanup(!1);break}}};try{g.xhr.send(f)}catch{g.emit("finish",0,""),g._cleanup(!1)}},s.prototype._cleanup=function(u){if(this.xhr){if(this.removeAllListeners(),r.unloadDel(this.unloadRef),this.xhr.onreadystatechange=function(){},this.xhr.ontimeout&&(this.xhr.ontimeout=null),u)try{this.xhr.abort()}catch{}this.unloadRef=this.xhr=null}},s.prototype.close=function(){this._cleanup(!0)},s.enabled=!!o;var c=["Active"].concat("Object").join("X");!s.enabled&&c in globalThis&&(o=function(){try{return new globalThis[c]("Microsoft.XMLHTTP")}catch{return null}},s.enabled=!!new o);var l=!1;try{l="withCredentials"in new o}catch{}return s.supportsCORS=l,ff=s,ff}var pf,$1;function wd(){if($1)return pf;$1=1;var e=Ae(),t=wA();function r(n,o,a,s){t.call(this,n,o,a,s)}return e(r,t),r.enabled=t.enabled&&t.supportsCORS,pf=r,pf}var mf,S1;function ps(){if(S1)return mf;S1=1;var e=Ae(),t=wA();function r(n,o,a){t.call(this,n,o,a,{noCredentials:!0})}return e(r,t),r.enabled=t.enabled,mf=r,mf}var gf,j1;function ms(){return j1||(j1=1,gf={isOpera:function(){return globalThis.navigator&&/opera/i.test(globalThis.navigator.userAgent)},isKonqueror:function(){return globalThis.navigator&&/konqueror/i.test(globalThis.navigator.userAgent)},hasDomain:function(){if(!globalThis.document)return!0;try{return!!globalThis.document.domain}catch{return!1}}}),gf}var xf,k1;function cie(){if(k1)return xf;k1=1;var e=Ae(),t=Ui(),r=bd(),n=wd(),o=ps(),a=ms();function s(c){if(!o.enabled&&!n.enabled)throw new Error("Transport created when disabled");t.call(this,c,"/xhr_streaming",r,n)}return e(s,t),s.enabled=function(c){return c.nullOrigin||a.isOpera()?!1:n.enabled},s.transportName="xhr-streaming",s.roundTrips=2,s.needBody=!!globalThis.document,xf=s,xf}var vf,E1;function sx(){if(E1)return vf;E1=1;var e=Gt().EventEmitter,t=Ae(),r=so(),n=ms(),o=Cr(),a=function(){};function s(c,l,u){var d=this;e.call(this),setTimeout(function(){d._start(c,l,u)},0)}return t(s,e),s.prototype._start=function(c,l,u){var d=this,f=new globalThis.XDomainRequest;l=o.addQuery(l,"t="+ +new Date),f.onerror=function(){d._error()},f.ontimeout=function(){d._error()},f.onprogress=function(){a("progress",f.responseText),d.emit("chunk",200,f.responseText)},f.onload=function(){d.emit("finish",200,f.responseText),d._cleanup(!1)},this.xdr=f,this.unloadRef=r.unloadAdd(function(){d._cleanup(!0)});try{this.xdr.open(c,l),this.timeout&&(this.xdr.timeout=this.timeout),this.xdr.send(u)}catch{this._error()}},s.prototype._error=function(){this.emit("finish",0,""),this._cleanup(!1)},s.prototype._cleanup=function(c){if(this.xdr){if(this.removeAllListeners(),r.unloadDel(this.unloadRef),this.xdr.ontimeout=this.xdr.onerror=this.xdr.onprogress=this.xdr.onload=null,c)try{this.xdr.abort()}catch{}this.unloadRef=this.xdr=null}},s.prototype.close=function(){this._cleanup(!0)},s.enabled=!!(globalThis.XDomainRequest&&n.hasDomain()),vf=s,vf}var yf,C1;function $A(){if(C1)return yf;C1=1;var e=Ae(),t=Ui(),r=bd(),n=sx();function o(a){if(!n.enabled)throw new Error("Transport created when disabled");t.call(this,a,"/xhr_streaming",r,n)}return e(o,t),o.enabled=function(a){return a.cookie_needed||a.nullOrigin?!1:n.enabled&&a.sameScheme},o.transportName="xdr-streaming",o.roundTrips=2,yf=o,yf}var bf,P1;function SA(){return P1||(P1=1,bf=globalThis.EventSource),bf}var wf,A1;function lie(){if(A1)return wf;A1=1;var e=Ae(),t=Gt().EventEmitter,r=SA(),n=function(){};function o(a){t.call(this);var s=this,c=this.es=new r(a);c.onmessage=function(l){n("message",l.data),s.emit("message",decodeURI(l.data))},c.onerror=function(l){n("error",c.readyState);var u=c.readyState!==2?"network":"permanent";s._cleanup(),s._close(u)}}return e(o,t),o.prototype.abort=function(){this._cleanup(),this._close("user")},o.prototype._cleanup=function(){var a=this.es;a&&(a.onmessage=a.onerror=null,a.close(),this.es=null)},o.prototype._close=function(a){var s=this;setTimeout(function(){s.emit("close",null,a),s.removeAllListeners()},200)},wf=o,wf}var $f,O1;function R1(){if(O1)return $f;O1=1;var e=Ae(),t=Ui(),r=lie(),n=wd(),o=SA();function a(s){if(!a.enabled())throw new Error("Transport created when disabled");t.call(this,s,"/eventsource",r,n)}return e(a,t),a.enabled=function(){return!!o},a.transportName="eventsource",a.roundTrips=2,$f=a,$f}var Sf,T1;function jA(){return T1||(T1=1,Sf="1.6.1"),Sf}var jf={exports:{}},I1;function gs(){return I1||(I1=1,(function(e){var t=so(),r=ms();e.exports={WPrefix:"_jp",currentWindowId:null,polluteGlobalNamespace:function(){e.exports.WPrefix in globalThis||(globalThis[e.exports.WPrefix]={})},postMessage:function(n,o){globalThis.parent!==globalThis&&globalThis.parent.postMessage(JSON.stringify({windowId:e.exports.currentWindowId,type:n,data:o||""}),"*")},createIframe:function(n,o){var a=globalThis.document.createElement("iframe"),s,c,l=function(){clearTimeout(s);try{a.onload=null}catch{}a.onerror=null},u=function(){a&&(l(),setTimeout(function(){a&&a.parentNode.removeChild(a),a=null},0),t.unloadDel(c))},d=function(m){a&&(u(),o(m))},f=function(m,g){setTimeout(function(){try{a&&a.contentWindow&&a.contentWindow.postMessage(m,g)}catch{}},0)};return a.src=n,a.style.display="none",a.style.position="absolute",a.onerror=function(){d("onerror")},a.onload=function(){clearTimeout(s),s=setTimeout(function(){d("onload timeout")},2e3)},globalThis.document.body.appendChild(a),s=setTimeout(function(){d("timeout")},15e3),c=t.unloadAdd(u),{post:f,cleanup:u,loaded:l}},createHtmlfile:function(n,o){var a=["Active"].concat("Object").join("X"),s=new globalThis[a]("htmlfile"),c,l,u,d=function(){clearTimeout(c),u.onerror=null},f=function(){s&&(d(),t.unloadDel(l),u.parentNode.removeChild(u),u=s=null,CollectGarbage())},m=function(v){s&&(f(),o(v))},g=function(v,b){try{setTimeout(function(){u&&u.contentWindow&&u.contentWindow.postMessage(v,b)},0)}catch{}};s.open(),s.write('<html><script>document.domain="'+globalThis.document.domain+'";<\/script></html>'),s.close(),s.parentWindow[e.exports.WPrefix]=globalThis[e.exports.WPrefix];var x=s.createElement("div");return s.body.appendChild(x),u=s.createElement("iframe"),x.appendChild(u),u.src=n,u.onerror=function(){m("onerror")},c=setTimeout(function(){m("timeout")},15e3),l=t.unloadAdd(f),{post:g,cleanup:f,loaded:d}}},e.exports.iframeEnabled=!1,globalThis.document&&(e.exports.iframeEnabled=(typeof globalThis.postMessage=="function"||typeof globalThis.postMessage=="object")&&!r.isKonqueror())})(jf)),jf.exports}var kf,D1;function kA(){if(D1)return kf;D1=1;var e=Ae(),t=Gt().EventEmitter,r=jA(),n=Cr(),o=gs(),a=so(),s=Fi(),c=function(){};function l(u,d,f){if(!l.enabled())throw new Error("Transport created when disabled");t.call(this);var m=this;this.origin=n.getOrigin(f),this.baseUrl=f,this.transUrl=d,this.transport=u,this.windowId=s.string(8);var g=n.addPath(f,"/iframe.html")+"#"+this.windowId;this.iframeObj=o.createIframe(g,function(x){m.emit("close",1006,"Unable to load an iframe ("+x+")"),m.close()}),this.onmessageCallback=this._message.bind(this),a.attachEvent("message",this.onmessageCallback)}return e(l,t),l.prototype.close=function(){if(this.removeAllListeners(),this.iframeObj){a.detachEvent("message",this.onmessageCallback);try{this.postMessage("c")}catch{}this.iframeObj.cleanup(),this.iframeObj=null,this.onmessageCallback=this.iframeObj=null}},l.prototype._message=function(u){if(c("message",u.data),!n.isOriginEqual(u.origin,this.origin)){c("not same origin",u.origin,this.origin);return}var d;try{d=JSON.parse(u.data)}catch{c("bad json",u.data);return}if(d.windowId!==this.windowId){c("mismatched window id",d.windowId,this.windowId);return}switch(d.type){case"s":this.iframeObj.loaded(),this.postMessage("s",JSON.stringify([r,this.transport,this.transUrl,this.baseUrl]));break;case"t":this.emit("message",d.data);break;case"c":var f;try{f=JSON.parse(d.data)}catch{c("bad json",d.data);return}this.emit("close",f[0],f[1]),this.close();break}},l.prototype.postMessage=function(u,d){this.iframeObj.post(JSON.stringify({windowId:this.windowId,type:u,data:d||""}),this.origin)},l.prototype.send=function(u){this.postMessage("m",u)},l.enabled=function(){return o.iframeEnabled},l.transportName="iframe",l.roundTrips=2,kf=l,kf}var Ef,_1;function cx(){return _1||(_1=1,Ef={isObject:function(e){var t=typeof e;return t==="function"||t==="object"&&!!e},extend:function(e){if(!this.isObject(e))return e;for(var t,r,n=1,o=arguments.length;n<o;n++){t=arguments[n];for(r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}}),Ef}var Cf,L1;function Pf(){if(L1)return Cf;L1=1;var e=Ae(),t=kA(),r=cx();return Cf=function(n){function o(a,s){t.call(this,n.transportName,a,s)}return e(o,t),o.enabled=function(a,s){if(!globalThis.document)return!1;var c=r.extend({},s);return c.sameOrigin=!0,n.enabled(c)&&t.enabled()},o.transportName="iframe-"+n.transportName,o.needBody=!0,o.roundTrips=t.roundTrips+n.roundTrips-1,o.facadeTransport=n,o},Cf}var Af,M1;function die(){if(M1)return Af;M1=1;var e=Ae(),t=gs(),r=Cr(),n=Gt().EventEmitter,o=Fi(),a=function(){};function s(l){n.call(this);var u=this;t.polluteGlobalNamespace(),this.id="a"+o.string(6),l=r.addQuery(l,"c="+decodeURIComponent(t.WPrefix+"."+this.id)),a("using htmlfile",s.htmlfileEnabled);var d=s.htmlfileEnabled?t.createHtmlfile:t.createIframe;globalThis[t.WPrefix][this.id]={start:function(){u.iframeObj.loaded()},message:function(f){u.emit("message",f)},stop:function(){u._cleanup(),u._close("network")}},this.iframeObj=d(l,function(){u._cleanup(),u._close("permanent")})}e(s,n),s.prototype.abort=function(){this._cleanup(),this._close("user")},s.prototype._cleanup=function(){this.iframeObj&&(this.iframeObj.cleanup(),this.iframeObj=null),delete globalThis[t.WPrefix][this.id]},s.prototype._close=function(l){this.emit("close",null,l),this.removeAllListeners()},s.htmlfileEnabled=!1;var c=["Active"].concat("Object").join("X");if(c in globalThis)try{s.htmlfileEnabled=!!new globalThis[c]("htmlfile")}catch{}return s.enabled=s.htmlfileEnabled||t.iframeEnabled,Af=s,Af}var Of,z1;function N1(){if(z1)return Of;z1=1;var e=Ae(),t=die(),r=ps(),n=Ui();function o(a){if(!t.enabled)throw new Error("Transport created when disabled");n.call(this,a,"/htmlfile",t,r)}return e(o,n),o.enabled=function(a){return t.enabled&&a.sameOrigin},o.transportName="htmlfile",o.roundTrips=2,Of=o,Of}var Rf,B1;function F1(){if(B1)return Rf;B1=1;var e=Ae(),t=Ui(),r=bd(),n=wd(),o=ps();function a(s){if(!o.enabled&&!n.enabled)throw new Error("Transport created when disabled");t.call(this,s,"/xhr",r,n)}return e(a,t),a.enabled=function(s){return s.nullOrigin?!1:o.enabled&&s.sameOrigin?!0:n.enabled},a.transportName="xhr-polling",a.roundTrips=2,Rf=a,Rf}var Tf,U1;function uie(){if(U1)return Tf;U1=1;var e=Ae(),t=Ui(),r=$A(),n=bd(),o=sx();function a(s){if(!o.enabled)throw new Error("Transport created when disabled");t.call(this,s,"/xhr",n,o)}return e(a,t),a.enabled=r.enabled,a.transportName="xdr-polling",a.roundTrips=2,Tf=a,Tf}var If,q1;function hie(){if(q1)return If;q1=1;var e=gs(),t=Fi(),r=ms(),n=Cr(),o=Ae(),a=Gt().EventEmitter,s=function(){};function c(l){var u=this;a.call(this),e.polluteGlobalNamespace(),this.id="a"+t.string(6);var d=n.addQuery(l,"c="+encodeURIComponent(e.WPrefix+"."+this.id));globalThis[e.WPrefix][this.id]=this._callback.bind(this),this._createScript(d),this.timeoutId=setTimeout(function(){u._abort(new Error("JSONP script loaded abnormally (timeout)"))},c.timeout)}return o(c,a),c.prototype.abort=function(){if(globalThis[e.WPrefix][this.id]){var l=new Error("JSONP user aborted read");l.code=1e3,this._abort(l)}},c.timeout=35e3,c.scriptErrorTimeout=1e3,c.prototype._callback=function(l){this._cleanup(),!this.aborting&&(l&&this.emit("message",l),this.emit("close",null,"network"),this.removeAllListeners())},c.prototype._abort=function(l){this._cleanup(),this.aborting=!0,this.emit("close",l.code,l.message),this.removeAllListeners()},c.prototype._cleanup=function(){if(clearTimeout(this.timeoutId),this.script2&&(this.script2.parentNode.removeChild(this.script2),this.script2=null),this.script){var l=this.script;l.parentNode.removeChild(l),l.onreadystatechange=l.onerror=l.onload=l.onclick=null,this.script=null}delete globalThis[e.WPrefix][this.id]},c.prototype._scriptError=function(){var l=this;this.errorTimer||(this.errorTimer=setTimeout(function(){l.loadedOkay||l._abort(new Error("JSONP script loaded abnormally (onerror)"))},c.scriptErrorTimeout))},c.prototype._createScript=function(l){var u=this,d=this.script=globalThis.document.createElement("script"),f;if(d.id="a"+t.string(8),d.src=l,d.type="text/javascript",d.charset="UTF-8",d.onerror=this._scriptError.bind(this),d.onload=function(){u._abort(new Error("JSONP script loaded abnormally (onload)"))},d.onreadystatechange=function(){if(s("onreadystatechange",d.readyState),/loaded|closed/.test(d.readyState)){if(d&&d.htmlFor&&d.onclick){u.loadedOkay=!0;try{d.onclick()}catch{}}d&&u._abort(new Error("JSONP script loaded abnormally (onreadystatechange)"))}},typeof d.async>"u"&&globalThis.document.attachEvent)if(r.isOpera())f=this.script2=globalThis.document.createElement("script"),f.text="try{var a = document.getElementById('"+d.id+"'); if(a)a.onerror();}catch(x){};",d.async=f.async=!1;else{try{d.htmlFor=d.id,d.event="onclick"}catch{}d.async=!0}typeof d.async<"u"&&(d.async=!0);var m=globalThis.document.getElementsByTagName("head")[0];m.insertBefore(d,m.firstChild),f&&m.insertBefore(f,m.firstChild)},If=c,If}var Df,W1;function fie(){if(W1)return Df;W1=1;var e=Fi(),t=Cr(),r=function(){},n,o;function a(c){try{return globalThis.document.createElement('<iframe name="'+c+'">')}catch{var l=globalThis.document.createElement("iframe");return l.name=c,l}}function s(){n=globalThis.document.createElement("form"),n.style.display="none",n.style.position="absolute",n.method="POST",n.enctype="application/x-www-form-urlencoded",n.acceptCharset="UTF-8",o=globalThis.document.createElement("textarea"),o.name="d",n.appendChild(o),globalThis.document.body.appendChild(n)}return Df=function(c,l,u){n||s();var d="a"+e.string(8);n.target=d,n.action=t.addQuery(t.addPath(c,"/jsonp_send"),"i="+d);var f=a(d);f.id=d,f.style.display="none",n.appendChild(f);try{o.value=l}catch{}n.submit();var m=function(g){f.onerror&&(f.onreadystatechange=f.onerror=f.onload=null,setTimeout(function(){f.parentNode.removeChild(f),f=null},500),o.value="",u(g))};return f.onerror=function(){m()},f.onload=function(){m()},f.onreadystatechange=function(g){r("onreadystatechange",d,f.readyState),f.readyState==="complete"&&m()},function(){m(new Error("Aborted"))}},Df}var _f,H1;function pie(){if(H1)return _f;H1=1;var e=Ae(),t=bA(),r=hie(),n=fie();function o(a){if(!o.enabled())throw new Error("Transport created when disabled");t.call(this,a,"/jsonp",n,r)}return e(o,t),o.enabled=function(){return!!globalThis.document},o.transportName="jsonp-polling",o.roundTrips=1,o.needBody=!0,_f=o,_f}var Lf,V1;function mie(){return V1||(V1=1,Lf=[iie(),cie(),$A(),R1(),Pf()(R1()),N1(),Pf()(N1()),F1(),uie(),Pf()(F1()),pie()]),Lf}var K1={},G1;function gie(){if(G1)return K1;G1=1;var e=Array.prototype,t=Object.prototype,r=Function.prototype,n=String.prototype,o=e.slice,a=t.toString,s=function($){return t.toString.call($)==="[object Function]"},c=function(C){return a.call(C)==="[object Array]"},l=function(C){return a.call(C)==="[object String]"},u=Object.defineProperty&&(function(){try{return Object.defineProperty({},"x",{}),!0}catch{return!1}})(),d;u?d=function($,C,P,z){!z&&C in $||Object.defineProperty($,C,{configurable:!0,enumerable:!1,writable:!0,value:P})}:d=function($,C,P,z){!z&&C in $||($[C]=P)};var f=function($,C,P){for(var z in C)t.hasOwnProperty.call(C,z)&&d($,z,C[z],P)},m=function($){if($==null)throw new TypeError("can't convert "+$+" to object");return Object($)};function g($){var C=+$;return C!==C?C=0:C!==0&&C!==1/0&&C!==-1/0&&(C=(C>0||-1)*Math.floor(Math.abs(C))),C}function x($){return $>>>0}function v(){}f(r,{bind:function(C){var P=this;if(!s(P))throw new TypeError("Function.prototype.bind called on incompatible "+P);for(var z=o.call(arguments,1),_=function(){if(this instanceof O){var D=P.apply(this,z.concat(o.call(arguments)));return Object(D)===D?D:this}else return P.apply(C,z.concat(o.call(arguments)))},N=Math.max(0,P.length-z.length),R=[],F=0;F<N;F++)R.push("$"+F);var O=Function("binder","return function ("+R.join(",")+"){ return binder.apply(this, arguments); }")(_);return P.prototype&&(v.prototype=P.prototype,O.prototype=new v,v.prototype=null),O}}),f(Array,{isArray:c});var b=Object("a"),E=b[0]!=="a"||!(0 in b),w=function(C){var P=!0,z=!0;return C&&(C.call("foo",function(_,N,R){typeof R!="object"&&(P=!1)}),C.call([1],function(){z=typeof this=="string"},"x")),!!C&&P&&z};f(e,{forEach:function(C){var P=m(this),z=E&&l(this)?this.split(""):P,_=arguments[1],N=-1,R=z.length>>>0;if(!s(C))throw new TypeError;for(;++N<R;)N in z&&C.call(_,z[N],N,P)}},!w(e.forEach));var j=Array.prototype.indexOf&&[0,1].indexOf(1,2)!==-1;f(e,{indexOf:function(C){var P=E&&l(this)?this.split(""):m(this),z=P.length>>>0;if(!z)return-1;var _=0;for(arguments.length>1&&(_=g(arguments[1])),_=_>=0?_:Math.max(0,z+_);_<z;_++)if(_ in P&&P[_]===C)return _;return-1}},j);var S=n.split;"ab".split(/(?:ab)*/).length!==2||".".split(/(.?)(.?)/).length!==4||"tesst".split(/(s)*/)[1]==="t"||"test".split(/(?:)/,-1).length!==4||"".split(/.?/).length||".".split(/()()/).length>1?(function(){var $=/()??/.exec("")[1]===void 0;n.split=function(C,P){var z=this;if(C===void 0&&P===0)return[];if(a.call(C)!=="[object RegExp]")return S.call(this,C,P);var _=[],N=(C.ignoreCase?"i":"")+(C.multiline?"m":"")+(C.extended?"x":"")+(C.sticky?"y":""),R=0,F,O,D,A;for(C=new RegExp(C.source,N+"g"),z+="",$||(F=new RegExp("^"+C.source+"$(?!\\s)",N)),P=P===void 0?-1>>>0:x(P);(O=C.exec(z))&&(D=O.index+O[0].length,!(D>R&&(_.push(z.slice(R,O.index)),!$&&O.length>1&&O[0].replace(F,function(){for(var M=1;M<arguments.length-2;M++)arguments[M]===void 0&&(O[M]=void 0)}),O.length>1&&O.index<z.length&&e.push.apply(_,O.slice(1)),A=O[0].length,R=D,_.length>=P)));)C.lastIndex===O.index&&C.lastIndex++;return R===z.length?(A||!C.test(""))&&_.push(""):_.push(z.slice(R)),_.length>P?_.slice(0,P):_}})():"0".split(void 0,0).length&&(n.split=function(C,P){return C===void 0&&P===0?[]:S.call(this,C,P)});var y=n.substr,k="".substr&&"0b".substr(-1)!=="b";return f(n,{substr:function(C,P){return y.call(this,C<0&&(C=this.length+C)<0?0:C,P)}},k),K1}var Mf,Y1;function xie(){if(Y1)return Mf;Y1=1;var e=/[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,t,r=function(n){var o,a={},s=[];for(o=0;o<65536;o++)s.push(String.fromCharCode(o));return n.lastIndex=0,s.join("").replace(n,function(c){return a[c]="\\u"+("0000"+c.charCodeAt(0).toString(16)).slice(-4),""}),n.lastIndex=0,a};return Mf={quote:function(n){var o=JSON.stringify(n);return e.lastIndex=0,e.test(o)?(t||(t=r(e)),o.replace(e,function(a){return t[a]})):o}},Mf}var zf,X1;function vie(){if(X1)return zf;X1=1;var e=function(){};return zf=function(t){return{filterToEnabled:function(r,n){var o={main:[],facade:[]};return r?typeof r=="string"&&(r=[r]):r=[],t.forEach(function(a){if(a&&!(a.transportName==="websocket"&&n.websocket===!1)){if(r.length&&r.indexOf(a.transportName)===-1){e("not in whitelist",a.transportName);return}a.enabled(n)?(e("enabled",a.transportName),o.main.push(a),a.facadeTransport&&o.facade.push(a.facadeTransport)):e("disabled",a.transportName)}}),o}}},zf}var Nf,Z1;function yie(){if(Z1)return Nf;Z1=1;var e={};return["log","debug","warn"].forEach(function(t){var r;try{r=globalThis.console&&globalThis.console[t]&&globalThis.console[t].apply}catch{}e[t]=r?function(){return globalThis.console[t].apply(globalThis.console,arguments)}:t==="log"?function(){}:e.log}),Nf=e,Nf}var Bf,J1;function lx(){if(J1)return Bf;J1=1;function e(t){this.type=t}return e.prototype.initEvent=function(t,r,n){return this.type=t,this.bubbles=r,this.cancelable=n,this.timeStamp=+new Date,this},e.prototype.stopPropagation=function(){},e.prototype.preventDefault=function(){},e.CAPTURING_PHASE=1,e.AT_TARGET=2,e.BUBBLING_PHASE=3,Bf=e,Bf}var Ff,Q1;function EA(){return Q1||(Q1=1,Ff=globalThis.location||{origin:"http://localhost:80",protocol:"http:",host:"localhost",port:80,href:"http://localhost/",hash:""}),Ff}var Uf,eS;function bie(){if(eS)return Uf;eS=1;var e=Ae(),t=lx();function r(){t.call(this),this.initEvent("close",!1,!1),this.wasClean=!1,this.code=0,this.reason=""}return e(r,t),Uf=r,Uf}var qf,tS;function wie(){if(tS)return qf;tS=1;var e=Ae(),t=lx();function r(n){t.call(this),this.initEvent("message",!1,!1),this.data=n}return e(r,t),qf=r,qf}var Wf,rS;function $ie(){if(rS)return Wf;rS=1;var e=Gt().EventEmitter,t=Ae();function r(){var n=this;e.call(this),this.to=setTimeout(function(){n.emit("finish",200,"{}")},r.timeout)}return t(r,e),r.prototype.close=function(){clearTimeout(this.to)},r.timeout=2e3,Wf=r,Wf}var Hf,nS;function CA(){if(nS)return Hf;nS=1;var e=Gt().EventEmitter,t=Ae(),r=cx();function n(o,a){e.call(this);var s=this,c=+new Date;this.xo=new a("GET",o),this.xo.once("finish",function(l,u){var d,f;if(l===200){if(f=+new Date-c,u)try{d=JSON.parse(u)}catch{}r.isObject(d)||(d={})}s.emit("finish",d,f),s.removeAllListeners()})}return t(n,e),n.prototype.close=function(){this.removeAllListeners(),this.xo.close()},Hf=n,Hf}var Vf,oS;function PA(){if(oS)return Vf;oS=1;var e=Ae(),t=Gt().EventEmitter,r=ps(),n=CA();function o(a){var s=this;t.call(this),this.ir=new n(a,r),this.ir.once("finish",function(c,l){s.ir=null,s.emit("message",JSON.stringify([c,l]))})}return e(o,t),o.transportName="iframe-info-receiver",o.prototype.close=function(){this.ir&&(this.ir.close(),this.ir=null),this.removeAllListeners()},Vf=o,Vf}var Kf,iS;function Sie(){if(iS)return Kf;iS=1;var e=Gt().EventEmitter,t=Ae(),r=so(),n=kA(),o=PA();function a(s,c){var l=this;e.call(this);var u=function(){var d=l.ifr=new n(o.transportName,c,s);d.once("message",function(f){if(f){var m;try{m=JSON.parse(f)}catch{l.emit("finish"),l.close();return}var g=m[0],x=m[1];l.emit("finish",g,x)}l.close()}),d.once("close",function(){l.emit("finish"),l.close()})};globalThis.document.body?u():r.attachEvent("load",u)}return t(a,e),a.enabled=function(){return n.enabled()},a.prototype.close=function(){this.ifr&&this.ifr.close(),this.removeAllListeners(),this.ifr=null},Kf=a,Kf}var Gf,aS;function jie(){if(aS)return Gf;aS=1;var e=Gt().EventEmitter,t=Ae(),r=Cr(),n=sx(),o=wd(),a=ps(),s=$ie(),c=Sie(),l=CA();function u(d,f){var m=this;e.call(this),setTimeout(function(){m.doXhr(d,f)},0)}return t(u,e),u._getReceiver=function(d,f,m){return m.sameOrigin?new l(f,a):o.enabled?new l(f,o):n.enabled&&m.sameScheme?new l(f,n):c.enabled()?new c(d,f):new l(f,s)},u.prototype.doXhr=function(d,f){var m=this,g=r.addPath(d,"/info");this.xo=u._getReceiver(d,g,f),this.timeoutRef=setTimeout(function(){m._cleanup(!1),m.emit("finish")},u.timeout),this.xo.once("finish",function(x,v){m._cleanup(!0),m.emit("finish",x,v)})},u.prototype._cleanup=function(d){clearTimeout(this.timeoutRef),this.timeoutRef=null,!d&&this.xo&&this.xo.close(),this.xo=null},u.prototype.close=function(){this.removeAllListeners(),this._cleanup(!1)},u.timeout=8e3,Gf=u,Gf}var Yf,sS;function kie(){if(sS)return Yf;sS=1;var e=gs();function t(r){this._transport=r,r.on("message",this._transportMessage.bind(this)),r.on("close",this._transportClose.bind(this))}return t.prototype._transportClose=function(r,n){e.postMessage("c",JSON.stringify([r,n]))},t.prototype._transportMessage=function(r){e.postMessage("t",r)},t.prototype._send=function(r){this._transport.send(r)},t.prototype._close=function(){this._transport.close(),this._transport.removeAllListeners()},Yf=t,Yf}var Xf,cS;function Eie(){if(cS)return Xf;cS=1;var e=Cr(),t=so(),r=kie(),n=PA(),o=gs(),a=EA(),s=function(){};return Xf=function(c,l){var u={};l.forEach(function(f){f.facadeTransport&&(u[f.facadeTransport.transportName]=f.facadeTransport)}),u[n.transportName]=n;var d;c.bootstrap_iframe=function(){var f;o.currentWindowId=a.hash.slice(1);var m=function(g){if(g.source===parent&&(typeof d>"u"&&(d=g.origin),g.origin===d)){var x;try{x=JSON.parse(g.data)}catch{s("bad json",g.data);return}if(x.windowId===o.currentWindowId)switch(x.type){case"s":var v;try{v=JSON.parse(x.data)}catch{s("bad json",x.data);break}var b=v[0],E=v[1],w=v[2],j=v[3];if(b!==c.version)throw new Error('Incompatible SockJS! Main site uses: "'+b+'", the iframe: "'+c.version+'".');if(!e.isOriginEqual(w,a.href)||!e.isOriginEqual(j,a.href))throw new Error("Can't connect to different domain from within an iframe. ("+a.href+", "+w+", "+j+")");f=new r(new u[E](w,j));break;case"m":f._send(x.data);break;case"c":f&&f._close(),f=null;break}}};t.attachEvent("message",m),o.postMessage("s")}},Xf}var Zf,lS;function Cie(){if(lS)return Zf;lS=1,gie();var e=vA(),t=Ae(),r=Fi(),n=xie(),o=Cr(),a=so(),s=vie(),c=cx(),l=ms(),u=yie(),d=lx(),f=yA(),m=EA(),g=bie(),x=wie(),v=jie(),b=function(){},E;function w(S,y,k){if(!(this instanceof w))return new w(S,y,k);if(arguments.length<1)throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");f.call(this),this.readyState=w.CONNECTING,this.extensions="",this.protocol="",k=k||{},k.protocols_whitelist&&u.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead."),this._transportsWhitelist=k.transports,this._transportOptions=k.transportOptions||{},this._timeout=k.timeout||0;var $=k.sessionId||8;if(typeof $=="function")this._generateSessionId=$;else if(typeof $=="number")this._generateSessionId=function(){return r.string($)};else throw new TypeError("If sessionId is used in the options, it needs to be a number or a function.");this._server=k.server||r.numberString(1e3);var C=new e(S);if(!C.host||!C.protocol)throw new SyntaxError("The URL '"+S+"' is invalid");if(C.hash)throw new SyntaxError("The URL must not contain a fragment");if(C.protocol!=="http:"&&C.protocol!=="https:")throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '"+C.protocol+"' is not allowed.");var P=C.protocol==="https:";if(m.protocol==="https:"&&!P&&!o.isLoopbackAddr(C.hostname))throw new Error("SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS");y?Array.isArray(y)||(y=[y]):y=[];var z=y.sort();z.forEach(function(N,R){if(!N)throw new SyntaxError("The protocols entry '"+N+"' is invalid.");if(R<z.length-1&&N===z[R+1])throw new SyntaxError("The protocols entry '"+N+"' is duplicated.")});var _=o.getOrigin(m.href);this._origin=_?_.toLowerCase():null,C.set("pathname",C.pathname.replace(/\/+$/,"")),this.url=C.href,b("using url",this.url),this._urlInfo={nullOrigin:!l.hasDomain(),sameOrigin:o.isOriginEqual(this.url,m.href),sameScheme:o.isSchemeEqual(this.url,m.href)},this._ir=new v(this.url,this._urlInfo),this._ir.once("finish",this._receiveInfo.bind(this))}t(w,f);function j(S){return S===1e3||S>=3e3&&S<=4999}return w.prototype.close=function(S,y){if(S&&!j(S))throw new Error("InvalidAccessError: Invalid code");if(y&&y.length>123)throw new SyntaxError("reason argument has an invalid length");if(!(this.readyState===w.CLOSING||this.readyState===w.CLOSED)){var k=!0;this._close(S||1e3,y||"Normal closure",k)}},w.prototype.send=function(S){if(typeof S!="string"&&(S=""+S),this.readyState===w.CONNECTING)throw new Error("InvalidStateError: The connection has not been established yet");this.readyState===w.OPEN&&this._transport.send(n.quote(S))},w.version=jA(),w.CONNECTING=0,w.OPEN=1,w.CLOSING=2,w.CLOSED=3,w.prototype._receiveInfo=function(S,y){if(this._ir=null,!S){this._close(1002,"Cannot connect to server");return}this._rto=this.countRTO(y),this._transUrl=S.base_url?S.base_url:this.url,S=c.extend(S,this._urlInfo);var k=E.filterToEnabled(this._transportsWhitelist,S);this._transports=k.main,b(this._transports.length+" enabled transports"),this._connect()},w.prototype._connect=function(){for(var S=this._transports.shift();S;S=this._transports.shift()){if(b("attempt",S.transportName),S.needBody&&(!globalThis.document.body||typeof globalThis.document.readyState<"u"&&globalThis.document.readyState!=="complete"&&globalThis.document.readyState!=="interactive")){this._transports.unshift(S),a.attachEvent("load",this._connect.bind(this));return}var y=Math.max(this._timeout,this._rto*S.roundTrips||5e3);this._transportTimeoutId=setTimeout(this._transportTimeout.bind(this),y);var k=o.addPath(this._transUrl,"/"+this._server+"/"+this._generateSessionId()),$=this._transportOptions[S.transportName],C=new S(k,this._transUrl,$);C.on("message",this._transportMessage.bind(this)),C.once("close",this._transportClose.bind(this)),C.transportName=S.transportName,this._transport=C;return}this._close(2e3,"All transports failed",!1)},w.prototype._transportTimeout=function(){this.readyState===w.CONNECTING&&(this._transport&&this._transport.close(),this._transportClose(2007,"Transport timed out"))},w.prototype._transportMessage=function(S){var y=this,k=S.slice(0,1),$=S.slice(1),C;switch(k){case"o":this._open();return;case"h":this.dispatchEvent(new d("heartbeat")),b("heartbeat",this.transport);return}if($)try{C=JSON.parse($)}catch{}if(!(typeof C>"u"))switch(k){case"a":Array.isArray(C)&&C.forEach(function(P){b("message",y.transport),y.dispatchEvent(new x(P))});break;case"m":b("message",this.transport),this.dispatchEvent(new x(C));break;case"c":Array.isArray(C)&&C.length===2&&this._close(C[0],C[1],!0);break}},w.prototype._transportClose=function(S,y){if(b("_transportClose",this.transport),this._transport&&(this._transport.removeAllListeners(),this._transport=null,this.transport=null),!j(S)&&S!==2e3&&this.readyState===w.CONNECTING){this._connect();return}this._close(S,y)},w.prototype._open=function(){b("_open",this._transport&&this._transport.transportName,this.readyState),this.readyState===w.CONNECTING?(this._transportTimeoutId&&(clearTimeout(this._transportTimeoutId),this._transportTimeoutId=null),this.readyState=w.OPEN,this.transport=this._transport.transportName,this.dispatchEvent(new d("open")),b("connected",this.transport)):this._close(1006,"Server lost session")},w.prototype._close=function(S,y,k){b("_close",this.transport,S,y,k,this.readyState);var $=!1;if(this._ir&&($=!0,this._ir.close(),this._ir=null),this._transport&&(this._transport.close(),this._transport=null,this.transport=null),this.readyState===w.CLOSED)throw new Error("InvalidStateError: SockJS has already been closed");this.readyState=w.CLOSING,setTimeout((function(){this.readyState=w.CLOSED,$&&this.dispatchEvent(new d("error"));var C=new g("close");C.wasClean=k||!1,C.code=S||1e3,C.reason=y,this.dispatchEvent(C),this.onmessage=this.onclose=this.onerror=null}).bind(this),0)},w.prototype.countRTO=function(S){return S>100?4*S:300+S},Zf=function(S){return E=s(S),Eie()(w,S),w},Zf}var Jf,dS;function Pie(){if(dS)return Jf;dS=1;var e=mie();return Jf=Cie()(e),"_sockjs_onload"in globalThis&&setTimeout(globalThis._sockjs_onload,1),Jf}var Aie=Pie();const Oie=Pn(Aie),Rie="http://localhost:8080/api/care-reviews",Tie=()=>localStorage.getItem("accessToken")||localStorage.getItem("token"),$a=se.create({baseURL:Rie,headers:{"Content-Type":"application/json"}});$a.interceptors.request.use(e=>{const t=Tie();return t&&!e.headers.Authorization&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));const Iie={createReview:e=>$a.post("",e),getReviewsByReviewee:e=>$a.get(`/reviewee/${e}`),getReviewsByReviewer:e=>$a.get(`/reviewer/${e}`),getAverageRating:e=>$a.get(`/average-rating/${e}`)},Die=2,_ie=e=>{if(!e)return"";const t=new Date(e),r=t.getHours().toString().padStart(2,"0"),n=t.getMinutes().toString().padStart(2,"0");return`${t.getMonth()+1}월 ${t.getDate()}일 ${r}:${n}`},Lie=(e,t)=>{if(!t)return e;const r=e.toLowerCase(),n=t.toLowerCase(),o=[];let a=0;for(;;){const s=r.indexOf(n,a);if(s===-1)break;s>a&&o.push(e.slice(a,s)),o.push(i.jsx("mark",{children:e.slice(s,s+t.length)},s)),a=s+t.length}return a<e.length&&o.push(e.slice(a)),o},Mie=({conversationIdx:e,onClose:t})=>{const[r,n]=p.useState(""),[o,a]=p.useState(null),[s,c]=p.useState(""),[l,u]=p.useState(!1),[d,f]=p.useState(""),m=p.useRef(0);p.useEffect(()=>()=>{m.current+=1},[]);const g=async v=>{v.preventDefault();const b=r.trim();if(b.length<Die){a(null),f("2글자 이상 입력해주세요.");return}const E=m.current+1;m.current=E,f(""),u(!0);try{const w=await XZ(e,b);if(m.current!==E)return;a(Array.isArray(w)?w:[]),c(b)}catch(w){if(m.current!==E)return;console.error("메시지 검색 실패:",w),a(null),f("검색에 실패했습니다. 다시 시도해주세요.")}finally{m.current===E&&u(!1)}},x=v=>{v.key==="Escape"&&t()};return i.jsxs(zie,{children:[i.jsxs(Nie,{role:"search",onSubmit:g,children:[i.jsx(Bie,{type:"submit","aria-label":"검색",children:"🔍"}),i.jsx(Fie,{autoFocus:!0,value:r,placeholder:"메시지 검색",onChange:v=>n(v.target.value),onKeyDown:x}),i.jsx(Uie,{type:"button",onClick:t,"aria-label":"검색 닫기",children:"✕"})]}),i.jsxs(qie,{children:[l&&i.jsx(Qf,{children:"검색 중..."}),!l&&d&&i.jsx(Qf,{children:d}),!l&&!d&&o!==null&&o.length===0&&i.jsx(Qf,{children:"검색 결과가 없습니다."}),!l&&!d&&o!==null&&o.length>0&&i.jsxs(i.Fragment,{children:[i.jsxs(Wie,{children:[o.length,"건"]}),o.map(v=>i.jsxs(Hie,{children:[i.jsxs(Vie,{children:[i.jsx(Kie,{children:v.senderUsername||"알 수 없음"}),i.jsx(Gie,{children:_ie(v.createdAt)})]}),i.jsx(Yie,{children:v.messageType==="IMAGE"?"(이미지)":Lie(v.content||"",s)})]},v.idx))]})]})]})},zie=h.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: ${({theme:e})=>e.colors.background};
`,Nie=h.form`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  gap: 8px;
  flex-shrink: 0;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
`,Bie=h.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  flex-shrink: 0;
`,Fie=h.input`
  flex: 1;
  min-width: 0;
  height: 36px;
  padding: 0 12px;
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  background: ${({theme:e})=>e.colors.surfaceElevated};
  color: ${({theme:e})=>e.colors.text};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.colors.borderFocus};
  }
`,Uie=h.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${({theme:e})=>e.colors.text};
  font-size: 16px;
  cursor: pointer;
  flex-shrink: 0;
`,qie=h.div`
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  padding: 8px 0;
`,Qf=h.div`
  padding: 24px 16px;
  text-align: center;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: 14px;
`,Wie=h.div`
  padding: 4px 16px 8px;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: 12px;
`,Hie=h.div`
  padding: 10px 16px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.borderLight};
`,Vie=h.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
`,Kie=h.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,Gie=h.span`
  font-size: 12px;
  color: ${({theme:e})=>e.colors.textLight};
  flex-shrink: 0;
`,Yie=h.div`
  font-size: 14px;
  color: ${({theme:e})=>e.colors.text};
  word-break: break-word;

  mark {
    background: ${({theme:e})=>e.colors.primarySoft};
    color: ${({theme:e})=>e.colors.primaryDark};
    border-radius: ${({theme:e})=>e.borderRadius.xs};
  }
`,Xie=({conversationIdx:e,onClose:t,onBack:r,onAction:n})=>{const{user:o}=dt(),[a,s]=p.useState([]),[c,l]=p.useState(null),[u,d]=p.useState(""),[f,m]=p.useState(!1),[g,x]=p.useState(!1),[v,b]=p.useState(!1),[E,w]=p.useState(!1),[j,S]=p.useState(null),[y,k]=p.useState(!1),[$,C]=p.useState(!1),[P,z]=p.useState([]),[_,N]=p.useState(null),[R,F]=p.useState([]),[O,D]=p.useState(null),[A,M]=p.useState(null),[I,T]=p.useState(!1),[B,X]=p.useState(5),[ie,Z]=p.useState(""),[q,W]=p.useState(!1),[J,L]=p.useState(!1),[G,K]=p.useState(null),ee=p.useRef(null),ne=p.useRef(null),we=p.useRef(null),je=p.useRef(null),Ge=p.useRef(null),_e=p.useRef(null),We=p.useRef(null),Rt=500,St=p.useRef(null),Tt=p.useRef(null),pt=p.useCallback(()=>{St.current&&(clearTimeout(St.current),St.current=null)},[]),Be=p.useCallback(async Y=>{if(pt(),Tt.current=null,!!e)try{await y$(e,Y)}catch(le){console.error("읽음 처리 실패:",le)}},[e,pt]),Hr=p.useCallback(Y=>{if(!e||Y==null)return;const le=Tt.current;Tt.current=le==null?Y:Math.max(le,Y),pt(),St.current=setTimeout(()=>{St.current=null;const fe=Tt.current;Tt.current=null,fe!=null&&y$(e,fe).catch(Ee=>{console.error("읽음 처리 실패:",Ee)})},Rt)},[e,pt]),$e=(Y,le="error")=>{ee.current&&clearTimeout(ee.current),K({message:Y,type:le}),ee.current=setTimeout(()=>K(null),3500)},Nn=async()=>{if(!(!e||!o?.idx)){pt(),Tt.current=null,m(!0);try{const Y=await YZ(e,0,100),fe=[...Y.content||Y||[]].reverse();if(s(fe),fe.length>0){const Ee=fe[fe.length-1];await Be(Ee.idx)}}catch(Y){console.error("메시지 조회 실패:",Y),$e("메시지를 불러오는데 실패했습니다.")}finally{m(!1)}}},Qe=async()=>{if(!(!e||!o?.idx))try{const Y=await VZ(e);l(Y);const le=Y?.participants?.find(fe=>fe.userIdx!==o.idx);if(!le?.userIdx){z([]),F([]);return}try{const{data:fe}=await di.between(le.userIdx),Ee=Array.isArray(fe)?fe:[];z(Ee);try{const{data:Me}=await Ca.getMyCareRequests(),st=Array.isArray(Me)?Me:Me?.careRequests||[];F(st.filter(Vo=>Vo.status==="OPEN"))}catch{F([])}}catch(fe){console.error("케어 제안 조회 실패:",fe)}}catch(Y){console.error("채팅방 정보 조회 실패:",Y)}};p.useEffect(()=>{e&&o?.idx&&(Qe(),Nn())},[e,o?.idx]),p.useEffect(()=>{if(!e||!o?.idx)return;const Y=localStorage.getItem("accessToken")||localStorage.getItem("token");if(!Y){console.error("WebSocket 연결 실패: 토큰이 없습니다.");return}const le=new Oie(`http://localhost:8080/ws?token=${encodeURIComponent(Y)}`),fe=new eie.Client({webSocketFactory:()=>le,connectHeaders:{Authorization:`Bearer ${Y}`},reconnectDelay:5e3,heartbeatIncoming:4e3,heartbeatOutgoing:4e3,onConnect:()=>{console.log("WebSocket 연결 성공"),b(!0),fe.subscribe(`/topic/conversation/${e}`,Ee=>{try{const Me=JSON.parse(Ee.body);console.log("새 메시지 수신:",Me),s(st=>st.some(qi=>qi.idx===Me.idx)?st:[...st,Me].sort((qi,Sd)=>{const U=new Date(qi.createdAt).getTime(),re=new Date(Sd.createdAt).getTime();return U-re})),Me.senderIdx!==o.idx&&Hr(Me.idx)}catch(Me){console.error("메시지 파싱 실패:",Me)}},{Authorization:`Bearer ${Y}`})},onStompError:Ee=>{console.error("STOMP 오류:",Ee),b(!1)},onDisconnect:()=>{console.log("WebSocket 연결 해제"),b(!1)}});return fe.activate(),je.current=fe,()=>{pt(),Tt.current=null,je.current&&(je.current.deactivate(),je.current=null)}},[e,o?.idx,pt,Hr]);const Vr=async Y=>{const le=Y.target.files?.[0];if(!(!le||!e||!o?.idx||E)){if(!le.type.startsWith("image/")){$e("이미지 파일만 업로드할 수 있습니다.");return}w(!0);try{const Ee=(await Xa.uploadImage(le,{category:"chat",ownerType:"user",ownerId:o.idx,entityId:e})).url;if(je.current&&je.current.connected)je.current.publish({destination:"/app/chat.send",body:JSON.stringify({conversationIdx:e,content:Ee,messageType:"IMAGE"}),headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")||localStorage.getItem("token")}`}}),await Be(null);else{const Me=await v$(e,Ee,"IMAGE");s(st=>[...st,Me]),await Be(Me.idx)}}catch(fe){console.error("이미지 업로드 실패:",fe),$e(fe.response?.data?.error||"이미지 업로드에 실패했습니다.")}finally{w(!1),_e.current&&(_e.current.value="")}}},er=async Y=>{if(Y.preventDefault(),!u.trim()||g||!e||!o?.idx||!v)return;const le=u.trim();d(""),x(!0);try{if(je.current&&je.current.connected)je.current.publish({destination:"/app/chat.send",body:JSON.stringify({conversationIdx:e,content:le,messageType:"TEXT"}),headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")||localStorage.getItem("token")}`}}),await Be(null);else{const fe=await v$(e,le);s(Ee=>[...Ee,fe]),await Be(fe.idx)}}catch(fe){console.error("메시지 전송 실패:",fe),$e(fe.response?.data?.error||"메시지 전송에 실패했습니다."),d(le)}finally{x(!1),Ge.current?.focus()}},co=()=>{setTimeout(()=>{we.current&&(we.current.scrollTop=we.current.scrollHeight),ne.current&&ne.current.scrollIntoView({behavior:"auto"})},100)};p.useEffect(()=>{co()},[a]),p.useEffect(()=>{Ge.current&&!f&&Ge.current.focus()},[e,f]);const lo=Y=>{if(!Y)return"";const le=new Date(Y),fe=le.getHours(),Ee=le.getMinutes();return`${fe.toString().padStart(2,"0")}:${Ee.toString().padStart(2,"0")}`},te=()=>c?.participants?c.participants.find(Y=>Y.userIdx!==o?.idx):null,ve=async()=>{if(!(!e||!o?.idx)&&window.confirm("정말 채팅방을 나가시겠습니까?"))try{await KZ(e),$e("채팅방에서 나갔습니다.","success"),n?n():t&&t()}catch(Y){console.error("채팅방 나가기 실패:",Y),$e("채팅방 나가기에 실패했습니다.")}},Q=async()=>{if(!(!e||!o?.idx)&&window.confirm("정말 채팅방을 삭제하시겠습니까? 삭제된 채팅방은 복구할 수 없습니다."))try{await GZ(e),$e("채팅방이 삭제되었습니다.","success"),n?n():t&&t()}catch(Y){console.error("채팅방 삭제 실패:",Y),$e("채팅방 삭제에 실패했습니다.")}},ae=async()=>{const Y=te()?.userIdx;if(!Y||un.length===0||_)return;let le=un[0];if(un.length>1){const Ee=un.map((Vo,xs)=>`${xs+1}. ${Vo.title}`).join(`
`),Me=window.prompt(`어느 케어를 맡기시겠습니까?
${Ee}

번호 입력:`,"1"),st=Number(Me);if(!st||st<1||st>un.length)return;le=un[st-1]}const fe=le.offeredCoins!=null?`${le.offeredCoins.toLocaleString()} 코인으로 `:"";if(window.confirm(`"${le.title}"을(를) ${fe}이 분께 맡기시겠습니까?
제공자가 수락하면 케어가 시작됩니다.`)){N("new");try{await di.offer(le.idx,Y),await Qe(),$e("제안을 보냈습니다. 제공자가 수락하면 케어가 시작됩니다.","success")}catch(Ee){console.error("케어 제안 실패:",Ee),$e(Ee.response?.data?.error||Ee.response?.data?.message||"제안에 실패했습니다.")}finally{N(null)}}},be=async Y=>{if(!Y?.idx||_)return;const le=Y.offeredCoins!=null?`${Y.offeredCoins.toLocaleString()} 코인으로 `:"";if(window.confirm(`"${Y.careRequestTitle}" 케어를 ${le}맡으시겠습니까?
수락하면 바로 케어가 시작됩니다.`)){N(Y.idx);try{await di.accept(Y.idx),await Qe(),$e("제안을 수락했습니다. 케어가 시작되었습니다.","success")}catch(fe){console.error("제안 수락 실패:",fe),fe.response?.status===409&&await Qe(),$e(fe.response?.data?.error||fe.response?.data?.message||"수락에 실패했습니다.")}finally{N(null)}}},Ce=async Y=>{if(!(!Y?.idx||_)&&window.confirm(`"${Y.careRequestTitle}" 제안을 거절하시겠습니까?`)){N(Y.idx);try{await di.reject(Y.idx),await Qe(),$e("제안을 거절했습니다.","success")}catch(le){console.error("제안 거절 실패:",le),$e(le.response?.data?.error||le.response?.data?.message||"거절에 실패했습니다.")}finally{N(null)}}},ke=async Y=>{if(!Y?.careRequestId||!o?.idx||A)return;const le=Y.providerId===o?.idx,fe=(Y.offeredCoins??0).toLocaleString(),Ee=le?`"${Y.careRequestTitle}" 이행을 마쳤다고 알릴까요?
요청자가 확인하면 ${fe} 코인을 받습니다.`:`"${Y.careRequestTitle}" 이행을 확인하시겠습니까?

${Y.providerName||"제공자"}님에게 ${fe} 코인이 지금 지급됩니다.
이 작업은 되돌릴 수 없습니다.`;if(window.confirm(Ee)){M(Y.idx);try{const st=(await Ca.confirmCompletion(Y.careRequestId))?.data;await Qe(),$e(st?.status==="COMPLETED"?"양쪽 확인이 끝나 펫케어 서비스가 완료되었습니다.":"완료 확인했습니다. 상대방 확인을 기다리는 중입니다.","success")}catch(Me){console.error("완료 확인 실패:",Me),$e(Me.response?.data?.error||"완료 확인에 실패했습니다.")}finally{M(null)}}},et=async Y=>{if(!(!Y?.careRequestId||A)&&window.confirm("이행 완료 알림을 취소하시겠습니까?")){M(Y.idx);try{await Ca.cancelCompletion(Y.careRequestId),await Qe(),$e("이행 완료 알림을 취소했습니다.","success")}catch(le){console.error("확인 취소 실패:",le),$e(le.response?.data?.error||"취소에 실패했습니다.")}finally{M(null)}}},he=Y=>{D(Y),T(!0)},mt=async()=>{if(!O||!o?.idx){$e("리뷰 작성에 필요한 정보가 없습니다.");return}if(!ie.trim()){$e("리뷰 내용을 입력해주세요.");return}W(!0);try{await Iie.createReview({careApplicationId:O.idx,reviewerId:o.idx,revieweeId:O.providerId,rating:B,comment:ie.trim()}),$e("리뷰가 작성되었습니다.","success"),T(!1),D(null),X(5),Z(""),await Qe()}catch(Y){console.error("리뷰 작성 실패:",Y);const le=Y.response?.data?.error||Y.response?.data?.message||"";Y.response?.status===409||typeof le=="string"&&le.includes("이미 해당 서비스에 리뷰")?(T(!1),await Qe(),$e(typeof le=="string"?le:"이미 해당 서비스에 리뷰를 작성하셨습니다.")):$e(le||"리뷰 작성에 실패했습니다.")}finally{W(!1)}},dn=async()=>{if(!navigator.geolocation){$e("브라우저가 위치 정보를 지원하지 않습니다.");return}L(!0),navigator.geolocation.getCurrentPosition(async Y=>{try{const{latitude:le,longitude:fe}=Y.coords,Ee=await Bi.coordinatesToAddress(le,fe);if(Ee&&Ee.address){const Me=`📍 내 위치: ${Ee.address}`;d(st=>st?`${st}
${Me}`:Me),Ge.current?.focus()}else $e("주소 정보를 가져오는데 실패했습니다.")}catch(le){console.error("위치 변환 실패:",le),$e("위치 정보를 변환하는데 실패했습니다.")}finally{L(!1)}},Y=>{console.error("위치 권한 에러:",Y),$e("위치 정보를 가져올 수 없습니다. 권한을 확인해주세요."),L(!1)})},Kr=new Set(P.map(Y=>Y.careRequestId)),un=R.filter(Y=>!Kr.has(Y.idx)),$d=un.length>0&&c?.conversationType==="DIRECT";p.useEffect(()=>{const Y=le=>{We.current&&!We.current.contains(le.target)&&k(!1)};return y&&document.addEventListener("mousedown",Y),()=>{document.removeEventListener("mousedown",Y)}},[y]);const Ho=te();return i.jsxs(Zie,{children:[G&&i.jsx(Kae,{type:G.type,children:G.message}),i.jsxs(Qie,{children:[r&&i.jsx(eae,{onClick:r,children:"←"}),i.jsxs(tae,{children:[i.jsx(rae,{children:c?.conversationType==="MISSING_PET"?"실종제보 채팅":c?.conversationType==="CARE_REQUEST"?"케어 요청 채팅":c?.conversationType==="MEETUP"?"산책모임 채팅":Ho?.username||"채팅방"}),i.jsxs(nae,{children:[Ho&&`${Ho.username} • `,i.jsx(oae,{$connected:v}),v?"연결됨":"연결 중..."]})]}),i.jsxs(iae,{children:[i.jsx(uS,{onClick:()=>C(!0),"aria-label":"메시지 검색",children:"🔍"}),i.jsx(uS,{onClick:()=>k(!y),children:"⋮"}),y&&i.jsxs(aae,{ref:We,children:[i.jsx(hS,{onClick:ve,children:"나가기"}),i.jsx(hS,{onClick:Q,danger:!0,children:"삭제"})]}),t&&i.jsx(sae,{onClick:t,children:"✕"})]})]}),$&&i.jsx(Mie,{conversationIdx:e,onClose:()=>C(!1)}),i.jsxs(Jie,{children:[i.jsxs(cae,{ref:we,children:[f?i.jsx(wae,{children:"메시지를 불러오는 중..."}):a.length===0?i.jsx($ae,{children:"메시지가 없습니다. 첫 메시지를 보내보세요!"}):a.map((Y,le)=>{const fe=Y.senderIdx===o?.idx,Ee=le===0||new Date(Y.createdAt).getTime()-new Date(a[le-1].createdAt).getTime()>6e4;return i.jsxs(lae,{isMyMessage:fe,children:[!fe&&i.jsx(dae,{children:Y.senderUsername||Ho?.username||"알 수 없음"}),i.jsxs(uae,{isMyMessage:fe,children:[Y.messageType==="IMAGE"?i.jsx(fae,{src:Y.content,alt:"이미지",onClick:()=>S(Y.content)}):i.jsx(hae,{children:Y.content}),Ee&&i.jsx(pae,{isMyMessage:fe,children:lo(Y.createdAt)})]})]},Y.idx||le)}),i.jsx("div",{ref:ne})]}),$d&&i.jsx(Cae,{children:i.jsx(pS,{onClick:ae,disabled:!!_,children:_==="new"?"보내는 중...":"🤝 이 분께 케어 맡기기"})}),P.map(Y=>{const le=Y.providerId===o?.idx,fe=_===Y.idx;return i.jsxs(Pae,{children:[i.jsxs(Aae,{children:[Y.careRequestTitle,Y.offeredCoins!=null&&` · ${Y.offeredCoins.toLocaleString()} 코인`]}),Y.status==="PENDING"&&le&&i.jsxs(nc,{children:[i.jsx(pS,{onClick:()=>be(Y),disabled:fe,children:fe?"처리 중...":"✅ 이 케어 맡기"}),i.jsx(mS,{onClick:()=>Ce(Y),disabled:fe,children:"거절"})]}),Y.status==="PENDING"&&!le&&i.jsx(ep,{children:"✓ 제안을 보냈습니다 (제공자 수락 대기 중)"}),Y.status==="ACCEPTED"&&Y.careRequestStatus==="IN_PROGRESS"&&le&&i.jsx(nc,{children:Y.providerCompletedAt?i.jsxs(i.Fragment,{children:[i.jsx(ep,{children:"⏳ 요청자 확인 대기 중"}),i.jsx(mS,{onClick:()=>et(Y),disabled:A===Y.idx,children:"취소"})]}):i.jsx(gS,{onClick:()=>ke(Y),disabled:A===Y.idx,children:A===Y.idx?"알리는 중...":"✅ 이행 완료 알리기"})}),Y.status==="ACCEPTED"&&Y.careRequestStatus==="IN_PROGRESS"&&!le&&i.jsx(nc,{children:Y.providerCompletedAt?i.jsx(gS,{onClick:()=>ke(Y),disabled:A===Y.idx,children:A===Y.idx?"확인 중...":`✅ 이행 확인하고 ${(Y.offeredCoins??0).toLocaleString()} 코인 지급`}):i.jsx(ep,{children:"제공자의 이행 완료를 기다리는 중입니다"})}),Y.careRequestStatus==="COMPLETED"&&i.jsxs(i.Fragment,{children:[i.jsx(Oae,{children:"✓ 펫케어 서비스가 완료되었습니다."}),i.jsx(nc,{children:i.jsx(Rae,{onClick:()=>he(Y),children:"⭐ 리뷰 작성하기"})})]})]},Y.idx)})]}),i.jsx(mae,{children:i.jsxs(gae,{onSubmit:er,children:[i.jsx(xae,{ref:_e,type:"file",accept:"image/*",onChange:Vr,disabled:E}),i.jsxs(vae,{children:[i.jsx(fS,{type:"button",onClick:()=>_e.current?.click(),disabled:E,title:"이미지 업로드",children:E?"📤":"📷"}),i.jsx(fS,{type:"button",onClick:dn,disabled:J||g,title:"내 위치 전송",children:J?"📡":"📍"}),i.jsx(yae,{ref:Ge,type:"text",value:u,onChange:Y=>d(Y.target.value),placeholder:"메시지를 입력하세요...",disabled:g||E}),i.jsx(bae,{type:"submit",disabled:g||E||!u.trim(),children:g?"전송 중...":"전송"})]})]})}),j&&i.jsx(Sae,{onClick:()=>S(null),children:i.jsxs(jae,{onClick:Y=>Y.stopPropagation(),children:[i.jsx(kae,{onClick:()=>S(null),children:"✕"}),i.jsx(Eae,{src:j,alt:"확대 이미지"})]})}),I&&i.jsx(Tae,{onClick:()=>T(!1),children:i.jsxs(Iae,{onClick:Y=>Y.stopPropagation(),children:[i.jsxs(Dae,{children:[i.jsx(_ae,{children:"리뷰 작성"}),i.jsx(Lae,{onClick:()=>T(!1),children:"✕"})]}),i.jsxs(Mae,{children:[i.jsxs(zae,{children:[i.jsx(xS,{children:"평점"}),i.jsxs(Bae,{children:[[1,2,3,4,5].map(Y=>i.jsx(Fae,{type:"button",onClick:()=>X(Y),active:Y<=B,children:"⭐"},Y)),i.jsxs(Uae,{children:[B,"점"]})]})]}),i.jsxs(Nae,{children:[i.jsx(xS,{children:"리뷰 내용"}),i.jsx(qae,{value:ie,onChange:Y=>Z(Y.target.value),placeholder:"서비스에 대한 리뷰를 작성해주세요...",rows:5})]})]}),i.jsxs(Wae,{children:[i.jsx(Hae,{onClick:()=>T(!1),children:"취소"}),i.jsx(Vae,{onClick:mt,disabled:q||!ie.trim(),children:q?"작성 중...":"리뷰 작성"})]})]})})]})},Zie=h.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  min-width: 0;
  position: relative;
  background: ${({theme:e})=>e.colors.background};
`,Jie=h.div`
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,Qie=h.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  gap: 12px;
  flex-shrink: 0;
`,eae=h.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${({theme:e})=>e.colors.text};
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover {
    background: ${({theme:e})=>e.colors.surfaceHover};
  }
`,tae=h.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`,rae=h.div`
  font-size: ${({theme:e})=>e.typography.h3.fontSize};
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,nae=h.div`
  font-size: ${({theme:e})=>e.typography.caption.fontSize};
  color: ${({theme:e})=>e.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 6px;
`,oae=h.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  background: ${({$connected:e,theme:t})=>e?t.colors.success:t.colors.error};
  flex-shrink: 0;
`,iae=h.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`,uS=h.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${({theme:e})=>e.colors.text};
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover {
    background: ${({theme:e})=>e.colors.surfaceHover};
  }
`,aae=h.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: ${({theme:e})=>e.colors.surface};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  box-shadow: ${({theme:e})=>e.shadows.md};
  z-index: 1000;
  min-width: 120px;
  overflow: hidden;
`,hS=h.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: ${({theme:e,danger:t})=>t?e.colors.error:e.colors.text};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  text-align: left;
  cursor: pointer;
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover {
    background: ${({theme:e})=>e.colors.surfaceHover};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({theme:e})=>e.colors.border};
  }
`,sae=h.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover {
    background: ${({theme:e})=>e.colors.surfaceHover};
    color: ${({theme:e})=>e.colors.text};
  }
`,cae=h.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({theme:e})=>e.colors.surface};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({theme:e})=>e.colors.border};
    border-radius: 3px;
    
    &:hover {
      background: ${({theme:e})=>e.colors.textLight};
    }
  }
`,lae=h.div`
  display: flex;
  flex-direction: column;
  align-items: ${({isMyMessage:e})=>e?"flex-end":"flex-start"};
  gap: 4px;
`,dae=h.div`
  font-size: ${({theme:e})=>e.typography.caption.fontSize};
  color: ${({theme:e})=>e.colors.textMuted};
  padding: 0 8px;
`,uae=h.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: ${({isMyMessage:e,theme:t})=>e?`${t.borderRadius.lg} 0 ${t.borderRadius.lg} ${t.borderRadius.lg}`:`0 ${t.borderRadius.lg} ${t.borderRadius.lg} ${t.borderRadius.lg}`};
  background: ${({theme:e,isMyMessage:t})=>t?e.colors.primary:e.colors.surfaceSoft};
  color: ${({theme:e,isMyMessage:t})=>t?e.colors.textInverse:e.colors.text};
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: ${({theme:e})=>e.shadows.sm};
  border: ${({theme:e,isMyMessage:t})=>t?"none":`1px solid ${e.colors.border}`};
  position: relative;
`,hae=h.div`
  font-size: ${({theme:e})=>e.typography.body1.fontSize};
  line-height: 1.5;
  word-wrap: break-word;
  font-weight: 400;
  letter-spacing: 0.01em;
`,fae=h.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: ${({theme:e})=>e.borderRadius.md};
  object-fit: contain;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`,pae=h.div`
  font-size: ${({theme:e})=>e.typography.caption.fontSize};
  color: ${({theme:e,isMyMessage:t})=>t?"rgba(255,255,255,0.7)":e.colors.textMuted};
  align-self: flex-end;
`,mae=h.div`
  padding: ${({theme:e})=>e.spacing.md} ${({theme:e})=>e.spacing.lg};
  padding-bottom: max(
    ${({theme:e})=>e.spacing.md},
    env(safe-area-inset-bottom, 0px)
  );
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  background: ${({theme:e})=>e.colors.surface};
  flex-shrink: 0;
`,gae=h.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,xae=h.input`
  display: none;
`,vae=h.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,fS=h.button`
  width: 40px;
  height: 40px;
  border: none;
  background: ${({theme:e})=>e.colors.surfaceElevated};
  color: ${({theme:e})=>e.colors.text};
  font-size: 20px;
  cursor: pointer;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: ${({theme:e})=>e.colors.surfaceHover};
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,yae=h.input`
  flex: 1;
  padding: 10px 14px;
  border: 1.5px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  background: ${({theme:e})=>e.colors.background};
  color: ${({theme:e})=>e.colors.text};
  transition: border-color ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &::placeholder {
    color: ${({theme:e})=>e.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,bae=h.button`
  padding: 10px 20px;
  border: none;
  border-radius: ${({theme:e})=>e.borderRadius.md};
  background: ${({theme:e})=>e.colors.primary};
  color: ${({theme:e})=>e.colors.textInverse};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover:not(:disabled) {
    background: ${({theme:e})=>e.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,wae=h.div`
  padding: 40px 20px;
  text-align: center;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
`,$ae=h.div`
  padding: 60px 20px;
  text-align: center;
  color: ${({theme:e})=>e.colors.textLight};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
`,Sae=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
`,jae=h.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`,kae=h.button`
  position: absolute;
  top: -40px;
  right: 0;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 20px;
  cursor: pointer;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`,Eae=h.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: ${({theme:e})=>e.borderRadius.md};
`,Cae=h.div`
  padding: 12px 16px;
  background: ${({theme:e})=>e.colors.surface};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`,pS=h.button`
  padding: 10px 20px;
  background: ${({theme:e})=>e.colors.primary};
  color: ${({theme:e})=>e.colors.textInverse};
  border: none;
  border-radius: ${({theme:e})=>e.borderRadius.md};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover:not(:disabled) {
    background: ${({theme:e})=>e.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,Pae=h.div`
  padding: 12px 16px;
  background: ${({theme:e})=>e.colors.surface};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Aae=h.div`
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textPrimary};
`,nc=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`,mS=h.button`
  padding: 10px 16px;
  background: transparent;
  color: ${({theme:e})=>e.colors.textSecondary};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({theme:e})=>e.colors.surfaceElevated};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,ep=h.div`
  margin: 12px 16px;
  text-align: center;
  padding: 10px 20px;
  background: ${({theme:e})=>e.colors.surfaceElevated};
  color: ${({theme:e})=>e.colors.primary};
  border: 1px solid ${({theme:e})=>e.colors.primary};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-weight: 600;
`,gS=h.button`
  padding: 10px 20px;
  background: ${({theme:e})=>e.colors.success};
  color: ${({theme:e})=>e.colors.textInverse};
  border: none;
  border-radius: ${({theme:e})=>e.borderRadius.md};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover:not(:disabled) {
    background: ${({theme:e})=>e.colors.successDark};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,Oae=h.div`
  padding: 12px 16px;
  background: ${({theme:e})=>e.colors.successSoft};
  color: ${({theme:e})=>e.colors.success};
  border-top: 1px solid ${({theme:e})=>e.colors.border};
  text-align: center;
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-weight: 600;
`,Rae=h.button`
  padding: 10px 20px;
  background: ${({theme:e})=>e.colors.warning};
  color: ${({theme:e})=>e.colors.textInverse};
  border: none;
  border-radius: ${({theme:e})=>e.borderRadius.md};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover:not(:disabled) {
    background: ${({theme:e})=>e.colors.warningDark};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,Tae=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({theme:e})=>e.colors.overlay};
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,Iae=h.div`
  background: ${({theme:e})=>e.colors.surface};
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({theme:e})=>e.shadows.xl};
`,Dae=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid ${({theme:e})=>e.colors.border};
`,_ae=h.h2`
  margin: 0;
  font-size: ${({theme:e})=>e.typography.h3.fontSize};
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,Lae=h.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${({theme:e})=>e.colors.textSecondary};
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover {
    background: ${({theme:e})=>e.colors.surfaceHover};
  }
`,Mae=h.div`
  padding: 20px;
`,zae=h.div`
  margin-bottom: 20px;
`,Nae=h.div`
  margin-bottom: 20px;
`,xS=h.label`
  display: block;
  margin-bottom: 8px;
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,Bae=h.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Fae=h.button`
  background: transparent;
  border: none;
  font-size: 28px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  filter: ${({active:e})=>e?"none":"grayscale(100%) opacity(0.3)"};
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover {
    transform: scale(1.1);
  }
`,Uae=h.span`
  margin-left: 8px;
  font-size: ${({theme:e})=>e.typography.h3.fontSize};
  font-weight: 600;
  color: ${({theme:e})=>e.colors.text};
`,qae=h.textarea`
  width: 100%;
  padding: 12px;
  border: 1.5px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-family: inherit;
  resize: vertical;
  color: ${({theme:e})=>e.colors.text};
  background: ${({theme:e})=>e.colors.background};
  transition: border-color ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.colors.primary};
  }
`,Wae=h.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid ${({theme:e})=>e.colors.border};
`,Hae=h.button`
  padding: 10px 20px;
  background: ${({theme:e})=>e.colors.surface};
  color: ${({theme:e})=>e.colors.text};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover {
    background: ${({theme:e})=>e.colors.surfaceHover};
  }
`,Vae=h.button`
  padding: 10px 20px;
  background: ${({theme:e})=>e.colors.primary};
  color: ${({theme:e})=>e.colors.textInverse};
  border: none;
  border-radius: ${({theme:e})=>e.borderRadius.md};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({theme:e})=>e.duration?.normal||"200ms"} ${({theme:e})=>e.easing?.easeOut||"ease"};

  &:hover:not(:disabled) {
    background: ${({theme:e})=>e.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,Kae=h.div`
  position: absolute;
  top: calc(56px + 8px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  padding: 10px 20px;
  border-radius: ${({theme:e})=>e.borderRadius.lg};
  font-size: ${({theme:e})=>e.typography.body2.fontSize};
  font-weight: 500;
  white-space: nowrap;
  box-shadow: ${({theme:e})=>e.shadows.md};
  background: ${({theme:e,type:t})=>t==="success"?e.colors.success:e.colors.error};
  color: ${({theme:e})=>e.colors.textInverse};
  animation: fadeInDown ${({theme:e})=>e.duration?.normal||"200ms"} ease;

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`,Gae=()=>{const{user:e,isAuthenticated:t}=dt(),[r,n]=p.useState(!1),[o,a]=p.useState([]),[s,c]=p.useState(!1),[l,u]=p.useState(0),[d,f]=p.useState(null),m=async()=>{if(!(!t||!e?.idx)){c(!0);try{const b=await HZ();a(b||[]);const E=(b||[]).reduce((w,j)=>w+(j.unreadCount||0),0);u(E)}catch(b){b.response?.status!==401&&console.error("채팅방 목록 조회 실패:",b)}finally{c(!1)}}};p.useEffect(()=>{if(!t||!e?.idx)return;m();const b=setInterval(()=>{m()},3e4);return()=>clearInterval(b)},[t,e?.idx]);const g=b=>{f(b.idx),n(!1)},x=()=>{f(null),t&&e?.idx&&m()},v=()=>{f(null),t&&e?.idx&&m()};return p.useEffect(()=>(window.openChatWidget=b=>{f(b),n(!1)},()=>{delete window.openChatWidget}),[]),!t||!e?null:i.jsxs(i.Fragment,{children:[i.jsx(boe,{onClick:()=>n(!0),unreadCount:l}),d?i.jsxs(i.Fragment,{children:[i.jsx(Yae,{onClick:x}),i.jsx(Xae,{children:i.jsx(Xie,{conversationIdx:d,onClose:x,onBack:x,onAction:v})})]}):i.jsx(Hoe,{isOpen:r,onClose:()=>n(!1),conversations:o,onConversationClick:g,loading:s})]})},Yae=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`,Xae=h.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80vh;
  max-height: 800px;
  min-height: 0;
  background: ${({theme:e})=>e.colors.background};
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  z-index: 999;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;

  > * {
    flex: 1 1 0;
    min-height: 0;
    min-width: 0;
  }

  @media (max-width: 768px) {
    bottom: calc(60px + env(safe-area-inset-bottom, 0px));
    height: min(85vh, calc(100vh - 120px));
    height: min(
      85vh,
      calc(100dvh - 60px - env(safe-area-inset-bottom, 0px) - env(safe-area-inset-top, 0px))
    );
    max-height: calc(100vh - 68px - env(safe-area-inset-bottom, 0px));
    max-height: calc(100dvh - 68px - env(safe-area-inset-bottom, 0px));
    overflow: hidden;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  
  @media (min-width: 769px) {
    /* 데스크톱: 중앙 정렬 */
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    width: 480px;
    max-width: 90vw;
    height: 600px;
    max-height: 90vh;
    border-radius: 16px;
    animation: slideUpDesktop 0.3s ease;
    
    @keyframes slideUpDesktop {
      from {
        transform: translate(-50%, -40%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, -50%);
        opacity: 1;
      }
    }
  }
`,Zae=()=>{const[e,t]=p.useState(null),[r,n]=p.useState(!1),[o,a]=p.useState("verifying"),[s,c]=p.useState(""),[l,u]=p.useState("/");return p.useEffect(()=>{const d=new URLSearchParams(window.location.search),f=d.get("token"),m=d.get("purpose"),g=d.get("redirect");t(m);let x="/";if(g)x=decodeURIComponent(g),sessionStorage.setItem("emailVerificationRedirect",x);else{const v=sessionStorage.getItem("emailVerificationRedirect");v&&(x=v)}if(u(x),!f){a("no-token"),c("이메일 인증이 필요합니다. 아래 버튼을 클릭하여 인증 메일을 발송해주세요.");return}yr.verifyEmail(f).then(v=>{if(v.data.success)if(a("success"),c(v.data.message||"이메일 인증이 완료되었습니다."),v.data.email&&v.data.redirectUrl&&v.data.redirectUrl.includes("/register")){const b=v.data.redirectUrl;u(b),setTimeout(()=>{window.location.href=b},2e3)}else{let b="/";if(g)b=decodeURIComponent(g);else{const E=sessionStorage.getItem("emailVerificationRedirect");E?b=E:b=v.data.redirectUrl||"/"}u(b),sessionStorage.removeItem("emailVerificationRedirect"),setTimeout(()=>{window.location.href=b},3e3)}else a("error"),c(v.data.message||"이메일 인증에 실패했습니다.")}).catch(v=>{a("error");const b=v.response?.data?.message||v.message||"이메일 인증 처리 중 오류가 발생했습니다.";c(b)})},[]),i.jsx(Jae,{children:i.jsxs(Qae,{children:[o==="verifying"&&i.jsxs(i.Fragment,{children:[i.jsx(xl,{children:"✉️"}),i.jsx(oc,{children:"이메일 인증 중..."}),i.jsx(ic,{children:"잠시만 기다려주세요."}),i.jsx(nse,{})]}),o==="success"&&i.jsxs(i.Fragment,{children:[i.jsx(ese,{children:"✅"}),i.jsx(oc,{children:"인증 완료!"}),i.jsx(ic,{children:s}),i.jsxs(rse,{children:[l,"로 이동합니다..."]}),i.jsx(ac,{onClick:()=>window.location.href=l,children:"바로 이동하기"})]}),o==="no-token"&&i.jsxs(i.Fragment,{children:[i.jsx(xl,{children:"✉️"}),i.jsx(oc,{children:"이메일 인증이 필요합니다"}),i.jsx(ic,{children:s}),i.jsx(ac,{onClick:async()=>{n(!0);try{l&&l!=="/"&&sessionStorage.setItem("emailVerificationRedirect",l),await yr.sendVerificationEmail(e||"MEETUP"),a("success"),c("이메일 인증 메일이 발송되었습니다. 이메일을 확인해주세요.")}catch(d){a("error"),c(d.response?.data?.message||"이메일 발송에 실패했습니다. 다시 시도해주세요.")}finally{n(!1)}},disabled:r,children:r?"발송 중...":"인증 메일 발송"}),i.jsx(ac,{onClick:()=>window.location.href=l||"/",style:{marginTop:"10px",background:"#ccc"},children:"나중에 하기"})]}),o==="error"&&i.jsxs(i.Fragment,{children:[i.jsx(tse,{children:"❌"}),i.jsx(oc,{children:"인증 실패"}),i.jsx(ic,{children:s}),i.jsx(ac,{onClick:()=>window.location.href=l||"/",children:l?"이전 페이지로":"홈으로 이동"})]})]})})},Jae=h.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing.xl};
  background: ${e=>e.theme.colors.background};
`,Qae=h.div`
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.xl};
  padding: ${e=>e.theme.spacing.xl};
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.3s ease;
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,xl=h.div`
  font-size: 64px;
  margin-bottom: ${e=>e.theme.spacing.lg};
`,ese=h(xl)`
  color: #4caf50;
`,tse=h(xl)`
  color: #f44336;
`,oc=h.h1`
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.h2.fontSize};
  font-weight: ${e=>e.theme.typography.h2.fontWeight};
  margin-bottom: ${e=>e.theme.spacing.md};
`,ic=h.p`
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  margin-bottom: ${e=>e.theme.spacing.sm};
`,rse=h.p`
  color: ${e=>e.theme.colors.textSecondary};
  font-size: ${e=>e.theme.typography.body2.fontSize};
  margin-bottom: ${e=>e.theme.spacing.lg};
`,nse=h.div`
  border: 4px solid ${e=>e.theme.colors.border};
  border-top: 4px solid ${e=>e.theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: ${e=>e.theme.spacing.lg} auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,ac=h.button`
  background: ${e=>e.theme.colors.primary};
  color: white;
  border: none;
  padding: ${e=>e.theme.spacing.md} ${e=>e.theme.spacing.xl};
  border-radius: ${e=>e.theme.borderRadius.lg};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: ${e=>e.theme.spacing.md};
  
  &:hover {
    background: ${e=>e.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 126, 54, 0.3);
  }
`,vS={REGISTRATION:"회원가입 완료",PASSWORD_RESET:"비밀번호 변경",PET_CARE:"펫케어 서비스 이용",MEETUP:"모임 서비스 이용",LOCATION_REVIEW:"리뷰 작성",BOARD_EDIT:"게시글 수정/삭제",COMMENT_EDIT:"댓글 수정/삭제",MISSING_PET:"실종 제보 작성"},ose=({isOpen:e,onConfirm:t,onCancel:r,purpose:n})=>{if(!e)return null;const o=n&&vS[n]?vS[n]:"이 기능을 이용";return i.jsx(ise,{onClick:r,children:i.jsxs(ase,{onClick:a=>a.stopPropagation(),children:[i.jsxs(sse,{children:[i.jsx(cse,{children:"✉️"}),i.jsx(lse,{children:"이메일 인증이 필요합니다"})]}),i.jsx(dse,{children:i.jsxs(use,{children:[o,"하려면 이메일 인증이 필요합니다.",i.jsx("br",{}),"이메일 인증 페이지로 이동하시겠습니까?"]})}),i.jsxs(hse,{children:[i.jsx(yS,{onClick:r,variant:"secondary",children:"취소"}),i.jsx(yS,{onClick:t,variant:"primary",children:"이동하기"})]})]})})},ise=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`,ase=h.div`
  background: ${e=>e.theme.colors.surface};
  border-radius: ${e=>e.theme.borderRadius.xl};
  padding: ${e=>e.theme.spacing.xl};
  max-width: 500px;
  width: 90%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,sse=h.div`
  text-align: center;
  margin-bottom: ${e=>e.theme.spacing.lg};
`,cse=h.div`
  font-size: 48px;
  margin-bottom: ${e=>e.theme.spacing.sm};
`,lse=h.h2`
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.h3.fontSize};
  font-weight: ${e=>e.theme.typography.h3.fontWeight};
  margin: 0;
`,dse=h.div`
  text-align: center;
  margin-bottom: ${e=>e.theme.spacing.lg};
`,use=h.p`
  color: ${e=>e.theme.colors.text};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  margin-bottom: ${e=>e.theme.spacing.md};
  line-height: 1.6;
`,hse=h.div`
  display: flex;
  justify-content: center;
  gap: ${e=>e.theme.spacing.md};
`,yS=h.button`
  background: ${e=>e.variant==="secondary"?e.theme.colors.border:e.theme.colors.primary};
  color: ${e=>e.variant==="secondary"?e.theme.colors.text:"white"};
  border: none;
  padding: ${e=>e.theme.spacing.md} ${e=>e.theme.spacing.xl};
  border-radius: ${e=>e.theme.borderRadius.lg};
  font-size: ${e=>e.theme.typography.body1.fontSize};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  
  &:hover {
    background: ${e=>e.variant==="secondary"?e.theme.colors.borderDark:e.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 126, 54, 0.3);
  }
`;function fse(){const{user:e,loading:t,isAuthenticated:r}=dt(),[n,o]=p.useState("home"),[a,s]=p.useState("login"),[c,l]=p.useState(!1),[u,d]=p.useState(!1),[f,m]=p.useState(!1),[g,x]=p.useState(null);p.useEffect(()=>{c&&!r&&(s("login"),l(!1))},[c,r]),p.useEffect(()=>(window.redirectToLogin=()=>{l(!0)},()=>{delete window.redirectToLogin}),[]),p.useEffect(()=>{const S=()=>d(!0);return window.addEventListener("showPermissionModal",S),()=>window.removeEventListener("showPermissionModal",S)},[]),p.useEffect(()=>{const S=y=>{const{purpose:k}=y.detail;x(k),m(!0)};return window.addEventListener("emailVerificationRequired",S),()=>window.removeEventListener("emailVerificationRequired",S)},[]);const v=()=>{const S=window.location.pathname+window.location.search,y=`/email-verification?redirect=${encodeURIComponent(S)}${g?`&purpose=${g}`:""}`;window.location.href=y},b=()=>{m(!1),x(null)};p.useEffect(()=>(window.setActiveTab=S=>o(S),()=>{delete window.setActiveTab}),[]);const[E]=p.useState(()=>{if(typeof window>"u")return!1;const S=new URLSearchParams(window.location.search);return window.location.pathname.includes("oauth2/callback")||S.has("accessToken")||S.has("error")}),[w]=p.useState(()=>{if(typeof window>"u")return!1;const S=new URLSearchParams(window.location.search);return window.location.pathname.includes("email-verification")||window.location.pathname.includes("email-verify")||S.has("token")});if(t)return i.jsx(bse,{children:"로딩 중..."});if(w)return i.jsx(Zae,{});if(E)return i.jsx(eB,{});if(!r)return i.jsx(yse,{children:i.jsx(_N,{mode:a,loginContent:i.jsx(dN,{onSwitchToRegister:()=>s("register")}),registerContent:i.jsx(yN,{onRegisterSuccess:()=>s("login"),onSwitchToLogin:()=>s("login")})})});const j=()=>{switch(n){case"community":return i.jsx(rz,{});case"missing-pets":return i.jsx(YJ,{});case"unified-map":return i.jsx(Vne,{});case"users":return i.jsx(Hj,{});case"admin":return i.jsx(CX,{});case"activity":return i.jsx(LQ,{});case"home":default:return i.jsx(_2,{setActiveTab:o,user:e})}};return i.jsxs(gse,{children:[i.jsx(ek,{isOpen:u,onClose:()=>d(!1)}),i.jsx(ose,{isOpen:f,onConfirm:v,onCancel:b,purpose:g}),i.jsxs(xse,{children:[i.jsx(Z_,{activeTab:n,setActiveTab:o,user:e}),i.jsx(vse,{children:j()})]}),i.jsx(PX,{}),i.jsx(Gae,{})]})}function pse(){return i.jsx(RI,{children:i.jsxs(_I,{children:[i.jsx(mse,{}),i.jsx(fse,{})]})})}const mse=PI`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: ${e=>e.theme?.colors?.surface||"#f1f1f1"}; }
  ::-webkit-scrollbar-thumb { background: ${e=>e.theme?.colors?.border||"#c1c1c1"}; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: ${e=>e.theme?.colors?.primary||"#FF7E36"}; }
`,gse=h.div`
  min-height: 100vh;
  background: ${e=>e.theme.colors.background};
  color: ${e=>e.theme.colors.text};
  transition: all 0.3s ease;
`,xse=h.div`
  display: flex;
  min-height: 100vh;
`,vse=h.main`
  flex: 1;
  min-height: 100vh;
  background: ${e=>e.theme.colors.background};
  @media (min-width: 769px) {
    margin-left: 240px;
    min-height: 100vh;
  }
  @media (max-width: 768px) {
    padding-top: env(safe-area-inset-top, 0px);
    padding-bottom: calc(60px + env(safe-area-inset-bottom, 0px));
    min-height: 100dvh;
  }
`,yse=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`,bse=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.2rem;
  color: ${e=>e.theme.colors.text};
`;CT();function vce(){return i.jsxs(i.Fragment,{children:[i.jsx(GO,{}),i.jsx(pse,{})]})}export{vce as default};
