/* ===== Liquid Glass para web =====
   Refração real de borda: um mapa de deslocamento gerado pelo formato do elemento (SDF de retângulo arredondado)
   alimenta um feDisplacementMap usado como backdrop-filter (Chromium). Safari/Firefox caem para desfoque fosco. */
const LG={cache:{},defs:null,n:0,chromium:/Chrome\//.test(navigator.userAgent),
 init(){if(this.defs)return;const ns='http://www.w3.org/2000/svg';const s=document.createElementNS(ns,'svg');s.setAttribute('width','0');s.setAttribute('height','0');s.setAttribute('aria-hidden','true');s.style.position='absolute';this.defs=document.createElementNS(ns,'defs');s.appendChild(this.defs);document.body.appendChild(s)},
 map(w,h,r,band){
  const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');const im=ctx.createImageData(w,h),d=im.data;
  const hw=w/2,hh=h/2,rr=Math.min(r,hw,hh);
  const sdf=(x,y)=>{const qx=Math.abs(x-hw)-(hw-rr),qy=Math.abs(y-hh)-(hh-rr);return Math.hypot(Math.max(qx,0),Math.max(qy,0))+Math.min(Math.max(qx,qy),0)-rr};
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const px=x+.5,py=y+.5,s=sdf(px,py);let dx=0,dy=0;
   if(s<0&&-s<band){const t=1+s/band;const m=t*t*(3-2*t);const gx=sdf(px+1,py)-sdf(px-1,py),gy=sdf(px,py+1)-sdf(px,py-1);const gl=Math.hypot(gx,gy)||1;dx=gx/gl*m;dy=gy/gl*m}
   const i=(y*w+x)*4;d[i]=128+dx*127;d[i+1]=128+dy*127;d[i+2]=128;d[i+3]=255}
  ctx.putImageData(im,0,0);return c.toDataURL();
 },
 filter(w,h,r,band,scale){
  const k=[w,h,r,band,scale].join('_');if(this.cache[k])return this.cache[k];
  this.init();const ns='http://www.w3.org/2000/svg';const id='lg'+(++this.n);
  const f=document.createElementNS(ns,'filter');f.setAttribute('id',id);['x','y'].forEach(a=>f.setAttribute(a,'0'));f.setAttribute('width',w);f.setAttribute('height',h);
  f.setAttribute('filterUnits','userSpaceOnUse');f.setAttribute('primitiveUnits','userSpaceOnUse');f.setAttribute('color-interpolation-filters','sRGB');
  const fi=document.createElementNS(ns,'feImage');fi.setAttribute('href',this.map(w,h,r,band));['x','y'].forEach(a=>fi.setAttribute(a,'0'));fi.setAttribute('width',w);fi.setAttribute('height',h);fi.setAttribute('preserveAspectRatio','none');fi.setAttribute('result','m');
  const dm=document.createElementNS(ns,'feDisplacementMap');dm.setAttribute('in','SourceGraphic');dm.setAttribute('in2','m');dm.setAttribute('scale',scale);dm.setAttribute('xChannelSelector','R');dm.setAttribute('yChannelSelector','G');
  f.appendChild(fi);f.appendChild(dm);this.defs.appendChild(f);this.cache[k]=id;return id;
 },
 apply(root){
  (root||document).querySelectorAll('.lg').forEach(el=>{
   let fx=el.querySelector(':scope>.lg-fx');if(!fx){fx=document.createElement('span');fx.className='lg-fx';fx.setAttribute('aria-hidden','true');el.prepend(fx)}
   const w=Math.round(el.offsetWidth),h=Math.round(el.offsetHeight);if(!w||!h)return;
   const cs=getComputedStyle(el);const r=Math.min(parseFloat(cs.borderTopLeftRadius)||0,h/2,w/2);
   const lens=el.classList.contains('lg-lens');const band=Math.min(lens?Math.max(10,h*.42):Math.max(8,h*.32),w/2,h/2);
   const blur=lens?0.3:(+el.dataset.blur||2.4);
   if(this.chromium){const id=this.filter(w,h,Math.round(r),Math.round(band),lens?-64:-30);fx.style.backdropFilter=fx.style.webkitBackdropFilter=`url(#${id}) blur(${blur}px) saturate(${lens?1.5:1.8}) brightness(${lens?(el.classList.contains('tab-lens')?.96:1.08):1.04})`}
   else fx.style.backdropFilter=fx.style.webkitBackdropFilter=`blur(${lens?4:16}px) saturate(1.8)`;
  });
 },
};
let lgRaf=0;const lgRefresh=root=>{cancelAnimationFrame(lgRaf);lgRaf=requestAnimationFrame(()=>LG.apply(root))};
window.addEventListener('resize',()=>lgRefresh());

/* barra de abas: lente que desliza até a aba ativa */
function placeLens(bar,animate){
 if(!bar)return;const cur=bar.querySelector('[aria-current="page"]'),lens=bar.querySelector('.tab-lens');if(!cur||!lens)return;
 const x=cur.offsetLeft,w=cur.offsetWidth;
 if(!animate){lens.style.transition='none';lens.style.transform=`translateX(${x}px)`;lens.style.width=w+'px';lens.offsetWidth;lens.style.transition='';return}
 lens.classList.add('moving');lens.style.transform=`translateX(${x}px) scale(1.12,1.18)`;lens.style.width=w+'px';
 clearTimeout(lens._t);lens._t=setTimeout(()=>{lens.style.transform=`translateX(${x}px)`;lens.classList.remove('moving')},260);
}
