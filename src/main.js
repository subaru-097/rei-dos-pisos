function setMode(m){S.mode=m==='vendedor'?'admin':m;if(m==='vendedor')A.role='vendedor';else if(m==='admin')A.role='admin';S.modeKey=m;try{localStorage.setItem('rp-mode',m)}catch(_){}}
function setTheme(t){S.theme=t;document.documentElement.dataset.theme=t;try{localStorage.setItem('rp-theme',t)}catch(_){}renderDemo();setTimeout(()=>LG.apply(),30)}
function renderDemo(){
 const m=S.modeKey||'cliente';
 $('#demo').innerHTML=`<div class="who"><b>O Rei do Piso</b>mostruário com dados de exemplo</div>
 <div class="seg" role="group" aria-label="Ver como">${[['cliente','Cliente'],['vendedor','Vendedor'],['admin','Dono']].map(([k,l])=>`<button aria-pressed="${m===k}" data-m="${k}">${l}</button>`).join('')}</div>
 <button class="iconbtn theme" data-t aria-label="${S.theme==='dark'?'Usar modo claro':'Usar modo escuro'}">${ic(S.theme==='dark'?'sun':'moon')}</button>`;
}
function renderAll(){
 renderDemo();
 const cl=S.mode==='cliente';
 $('#stage').hidden=!cl;$('#aapp').hidden=cl;
 if(cl)renderClient(true);else renderAdmin();
}
document.addEventListener('keydown',e=>{if(e.key==='Tab'||e.key==='Enter'||e.key===' ')window.__kbd=true},true);
document.addEventListener('pointerdown',()=>{window.__kbd=false},true);
function fitPhone(){const ph=document.querySelector('.phone');if(!ph)return;if(innerWidth<=520){ph.style.transform='';ph.style.margin='';return}const z=Math.min(1,(innerHeight-52-36)/852);if(z<1){ph.style.transform=`scale(${z.toFixed(3)})`;ph.style.transformOrigin='center center';ph.style.margin=`${(-(1-z)*830/2).toFixed(0)}px ${(-(1-z)*392/2).toFixed(0)}px`}else{ph.style.transform='';ph.style.margin=''}}
addEventListener('resize',fitPhone);
/* no computador: rolagem lateral com a roda do mouse e arrastando */
document.addEventListener('wheel',e=>{const r=e.target.closest&&e.target.closest('.stories,.amb,.hscroll,.cats,.days,.pick,.reviews,.gal');if(!r||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;if(r.scrollWidth<=r.clientWidth)return;const before=r.scrollLeft;r.scrollLeft+=e.deltaY;if(r.scrollLeft!==before)e.preventDefault()},{passive:false});
let drag=null;document.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;const r=e.target.closest&&e.target.closest('.stories,.amb,.hscroll,.cats,.days,.pick,.gal');if(r)drag={r,x:e.clientX,s:r.scrollLeft,moved:false}});
document.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>6){drag.moved=true;drag.r.scrollLeft=drag.s-dx;drag.r.style.scrollSnapType='none'}});
document.addEventListener('pointerup',()=>{if(drag){drag.r.style.scrollSnapType='';if(drag.moved){const r=drag.r;r.addEventListener('click',ev=>{ev.stopPropagation();ev.preventDefault()},{capture:true,once:true})}drag=null}});
document.addEventListener('scroll',e=>{const g=e.target;if(!g||g.id!=='gal')return;const i=Math.round(g.scrollLeft/g.clientWidth);document.querySelectorAll('.gdots i').forEach((d,k)=>d.classList.toggle('on',k===i));const h=document.querySelector('.pd-stage .stock');if(h)h.style.opacity=i?0:1},true);
document.addEventListener('DOMContentLoaded',()=>{setTimeout(fitPhone,0);
 let t='dark',m='cliente';try{t=localStorage.getItem('rp-theme')||t;m=localStorage.getItem('rp-mode')||m}catch(_){}
 const h=location.hash.slice(1);if(['cliente','vendedor','admin'].includes(h))m=h;
 document.documentElement.dataset.theme=t;S.theme=t;setMode(m);renderAll();
 $('#demo').addEventListener('click',e=>{const b=e.target.closest('[data-m]');if(b){setMode(b.dataset.m);renderAll();window.scrollTo(0,0);return}if(e.target.closest('[data-t]'))setTheme(S.theme==='dark'?'light':'dark')});
 $('#capp').addEventListener('click',clientClick);$('#capp').addEventListener('input',clientInput);$('#capp').addEventListener('change',clientChange);
 document.addEventListener('click',e=>{if(e.target.closest('#aapp,#mw,#mw2,#drawer'))adminClick(e)});
 $('#aapp').addEventListener('change',adminChange);
 $('#mw').addEventListener('click',e=>{if(e.target.id==='mw')closeModal()});
 $('#mw2').addEventListener('click',e=>{if(e.target.id==='mw2')closeDrawer()});
 document.addEventListener('keydown',e=>{
  if(e.key==='Tab'){const box=$('#mw.on #modal')||($('#drawer.on')&&$('#drawer'))||($('#sv.on')&&$('#sv'))||($('#sheet.on')&&$('#sheet'));if(box){const f=[...box.querySelectorAll('button,a,input,select,textarea,label.abtn')].filter(x=>!x.disabled&&x.offsetParent!==null);if(f.length){const i=f.indexOf(document.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}else if(i<0){e.preventDefault();f[0].focus()}}}}if(e.key==='Escape'){closeModal();closeDrawer();if(SV.on){SV.on=false;renderSV();renderClient()}if($('#sheet')&&$('#sheet').classList.contains('on')){closeSheet()}}
  if(SV.on&&e.key==='ArrowRight')svGo(1);if(SV.on&&e.key==='ArrowLeft')svGo(-1)});
});
