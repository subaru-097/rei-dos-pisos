/* ===== app do cliente ===== */
const C=S.c;
const cartCount=()=>C.cart.length;
const itemCalc=(p,q)=>p.un==='un'?{m2:0,tot:p.preco*q,lbl:q+(q>1?' unidades':' unidade')}:{m2:q*p.cx,tot:q*p.cx*p.preco,lbl:q+(q>1?' caixas':' caixa')+', '+num(q*p.cx)+' m²'};
const cartTotal=()=>C.cart.reduce((s,i)=>s+itemCalc(pById(i.id),i.q).tot,0);
const activeStories=()=>S.stories.filter(s=>s.ativo);

function go(scr,opts){if(C.screen!==scr)C.hist.push(C.screen);C.screen=scr;Object.assign(C,opts||{});renderClient(true)}
function back(){C.screen=C.hist.pop()||'inicio';renderClient(true)}
function tab(scr){C.hist=[];C.screen=scr;renderClient(true)}

const topbar=(t,b=true,right='')=>`<header class="topbar">${b?`<button class="iconbtn lg press" data-c="back" aria-label="Voltar">${ic('back',2.2)}</button>`:''}<h1>${t}</h1>${right}</header>`;
const bigtitle=(t,sub)=>`<div class="topbar" style="padding-bottom:0;background:none;backdrop-filter:none;-webkit-backdrop-filter:none;position:relative"></div><div class="bigtitle"><h1>${t}</h1>${sub?`<p>${sub}</p>`:''}</div>`;

function pcard(p){return `<button class="pcard" data-c="prod" data-id="${p.id}">
 <div class="ph" style="${bg(p.tex)}" role="img" aria-label="Amostra do ${esc(p.nome)}">${p.tag?`<span class="tag">${p.tag}</span>`:''}</div>
 <div class="nm">${p.nome}</div><div class="meta">${p.tipo} ${p.tam}</div>
 <div class="pr tnum">${brl(p.preco)}<small> ${p.un==='un'?'/un':'/m²'}</small></div></button>`}

/* peça flutuante: o formato sai da medida cadastrada (ex.: 20×120 fica estreita e comprida) */
const slabDims=p=>{const [a,b]=String(p.tam).replace(/,/g,'.').split('×').map(Number);const L=Math.max(a,b)||1,s=Math.min(a,b)||1;const M=214;return {w:M,h:Math.max(34,Math.round(M*s/L))}};
const pieceTex=p=>IMG['p_'+p.tex]?'p_'+p.tex:p.tex;
const nicheHTML=p=>{const W=132,H=212,D=60,t=12,tx=bg(pieceTex(p));
 const f=(w,h,tr,sh,cls='')=>`<i class="nf ${cls}" style="width:${w}px;height:${h}px;margin:${-h/2}px 0 0 ${-w/2}px;transform:${tr};${tx};filter:brightness(${sh})"></i>`;
 const iw=W-2*t,ih=H-2*t;
 return `<div class="beam"></div><div class="slab-wrap" aria-hidden="true"><div class="niche" id="slab">
 ${f(D,H,`translateX(${W/2}px) rotateY(90deg)`,.62)}${f(W,D,`translateY(${-H/2}px) rotateX(90deg)`,1.08)}${f(D,H,`translateX(${-W/2}px) rotateY(-90deg)`,.5)}${f(W,D,`translateY(${H/2}px) rotateX(-90deg)`,.38)}
 ${f(iw,ih,`translateZ(${-D/2+1}px)`,.5,'in')}${f(D-2,ih,`translateX(${-W/2+t}px) rotateY(90deg)`,.74,'in')}${f(D-2,ih,`translateX(${W/2-t}px) rotateY(-90deg)`,.46,'in')}
 ${f(iw,D-2,`translateY(${-H/2+t}px) rotateX(-90deg)`,.34,'in')}${f(iw,D-2,`translateY(${H/2-t}px) rotateX(90deg)`,.86,'in')}
 ${f(iw,D-2,`rotateX(90deg)`,.95)}${f(iw,6,`translateY(3px) translateZ(${D/2-1}px)`,.78)}
 ${f(W,t,`translateY(${-H/2+t/2}px) translateZ(${D/2}px)`,1)}${f(W,t,`translateY(${H/2-t/2}px) translateZ(${D/2}px)`,.92)}${f(t,ih,`translateX(${-W/2+t/2}px) translateZ(${D/2}px)`,.96)}${f(t,ih,`translateX(${W/2-t/2}px) translateZ(${D/2}px)`,.9)}
 <i class="nled" style="width:${iw-10}px;margin-left:${-(iw-10)/2}px;transform:translateY(${-H/2+t+2}px) translateZ(${D/2-8}px)"></i>
 </div></div><div class="platform" aria-hidden="true"></div>`};
const slabHTML=p=>{if(p.tipo==='Nicho')return nicheHTML(p);const d=slabDims(p),t=pieceTex(p);return `<div class="beam"></div><div class="slab-wrap" aria-hidden="true"><div class="slab" id="slab" style="width:${d.w}px;height:${d.h}px"><div class="shadow"></div><div class="top" style="${bg(t)}"></div><div class="s1" style="${bg(t)}"></div><div class="s2" style="${bg(t)}"></div></div></div><div class="platform" aria-hidden="true"></div>`};
const FEAT=['p1','p5','p6','p3'];
function swapSlab(p){const s=$('#slab');if(!s)return;const d=slabDims(p),t=pieceTex(p);s.classList.remove('spin');void s.offsetWidth;s.classList.add('spin');setTimeout(()=>{s.style.width=d.w+'px';s.style.height=d.h+'px';s.querySelectorAll('.top,.s1,.s2').forEach(f=>f.style.backgroundImage=`url(${IMG[t]})`)},200);setTimeout(()=>s.classList.remove('spin'),780)}

function scrInicio(){
 const st=activeStories();const f=pById(FEAT[C.feat||0]);
 return `<section class="showcase">
  <div class="home-top"><div class="wordmark"><span class="mark" aria-hidden="true"></span><div>O Rei do Piso<small>Piracicaba</small></div></div>
   <button class="iconbtn lg press" data-c="tab" data-s="vitrine" aria-label="Buscar na vitrine">${ic('search',2)}</button>
   <button class="iconbtn lg press" data-c="tab" data-s="orcamento" aria-label="Orçamento, ${cartCount()} itens">${ic('receipt',2)}${cartCount()?`<span class="dot">${cartCount()}</span>`:''}</button></div>
  <div class="stxt"><span class="kick">${ic('star',2).replace('<svg','<svg width="14" height="14"')}Destaque da semana</span><h1 id="fnm">${f.nome}</h1><div class="price tnum" id="fpr">${brl(f.preco)} <small>/m², ${f.tam}</small></div></div>
  ${slabHTML(f)}
  <div class="varname" id="fvn">Toque para trocar a peça</div>
  <div class="variants" role="group" aria-label="Trocar peça em destaque">${FEAT.map((id,i)=>`<button aria-pressed="${(C.feat||0)===i}" data-c="feat" data-i="${i}" aria-label="${pById(id).nome}"><i style="${bg(pById(id).tex)}"></i></button>`).join('')}</div>
  <div class="show-cta"><button class="btn btn-y" data-c="casa" data-id="${f.id}" id="fcasa">${ic('camera')}Ver na minha casa</button><button class="iconbtn lg press" data-c="prod" data-id="${f.id}" id="fver" aria-label="Ver detalhes do piso">${ic('right',2.2)}</button></div>
 </section>
 <div class="proofs"><div><b class="tnum">4,9</b><span class="stars" aria-hidden="true">★★★★★</span><span style="display:block">312 avaliações</span></div><div><b class="tnum">2.480</b><span>entregas feitas</span></div><div><b class="tnum">48h</b><span>entrega em Piracicaba</span></div></div>
 <div class="stories" role="list" aria-label="Stories da loja" style="margin-top:22px">
  <button class="story ${C.seenStories.brand?'seen':''}" role="listitem" data-c="story" data-i="-1"><div class="ring"><div class="logo-in"><span class="mark"></span></div></div><span>Rei do Piso</span></button>
  ${st.map((s,i)=>`<button class="story ${C.seenStories[s.id]?'seen':''}" role="listitem" data-c="story" data-i="${i}"><div class="ring"><div style="${s.video?'background:#222':bg(s.img)}"></div></div><span>${esc(s.label)}</span></button>`).join('')}
 </div>
 <section class="sec"><div class="sec-h"><h2>Veja na sua casa</h2></div></section>
 <div class="sec" style="margin-top:0"><button class="camcard wide" data-c="casacam"><span class="camico">${ic('camera',1.6)}</span><span class="cx"><b>Veja como o piso vai ficar na sua casa</b><span>Tire uma foto do cômodo e escolha o piso.</span><span class="go">${ic('camera',2)}Tirar foto</span></span></button></div>
 <section class="sec"><div class="sec-h"><h2>Categorias</h2><button class="linkbtn" data-c="tab" data-s="vitrine">Ver tudo</button></div></section>
 <div class="catgrid">${[['Porcelanato','calacata'],['Vinílico','carvalho'],['Revestimento','hidraulico'],['Laminado','freijo'],['Nicho','nicho','wide']].map(([t,x,w])=>`<button class="cat ${w||''}" style="${bg(x)}" data-c="cat" data-t="${t}"><b>${t}</b><span>${PRODUTOS.filter(p=>p.tipo===t).length} opções</span></button>`).join('')}</div>
 <section class="sec"><div class="sec-h"><h2>Mais vendidos</h2></div></section>
 <div class="hscroll">${['p2','p3','p9','p7','p10'].map(id=>pcard(pById(id))).join('')}</div>
 <section class="sec"><div class="sec-h"><h2>Quem comprou, conta</h2></div></section>
 ${quoteHTML()}
 <section class="visit" style="${bg('fachada')}"><div class="in"><h2>Venha ver no pátio</h2><p>Piracicaba, SP. Seg. a sex. 8h às 18h, sáb. 8h às 13h.</p>
  <div class="row"><button class="btn btn-y" data-c="tab" data-s="agenda">${ic('calendar')}Agendar visita</button><a class="btn btn-w lg press" href="${waLink('Olá! Vim pelo app do Rei do Piso.')}" target="_blank" rel="noopener">${ic('wa')}WhatsApp</a></div></div></section>
 <p class="foot">O Rei do Piso, Piracicaba. Mostruário de demonstração.</p>`;
}
const quoteHTML=()=>{const a=AVAL[C.rev||0];return `<article class="quote" id="quote"><span class="stars" aria-label="${a.n} de 5 estrelas">${'★'.repeat(a.n)}${'☆'.repeat(5-a.n)}</span><p>“${a.txt}”</p><div class="by">${avatar({cor:'#4A5168'})}<div><b>${a.nome}</b>${a.bairro}</div><div class="dots">${AVAL.map((_,i)=>`<button data-c="rev" data-i="${i}" aria-pressed="${(C.rev||0)===i}" aria-label="Avaliação ${i+1}"><i></i></button>`).join('')}</div></div></article>`};

function filtered(){return PRODUTOS.filter(p=>(C.tipo==='Todos'||p.tipo===C.tipo)&&(!C.cores.length||C.cores.includes(p.cor))&&(!C.tams.length||C.tams.includes(p.tam))&&p.preco<=C.max&&(!C.q||(p.nome+' '+p.tipo+' '+p.cor).toLowerCase().includes(C.q.toLowerCase())))}
function nFilt(){return C.cores.length+C.tams.length+(C.max<200?1:0)}
function scrVitrine(){
 const list=filtered();
 return `${bigtitle('Vitrine',PRODUTOS.length+' pisos, revestimentos e nichos')}
 <div class="search"><label class="field">${ic('search')}<span class="sr">Buscar piso</span><input id="q" type="search" placeholder="Porcelanato, madeira, 60×60" value="${esc(C.q)}"></label>
 <button class="filtbtn lg press" data-c="filtros" aria-label="Filtros">${ic('filter')}Filtros${nFilt()?`<span class="n">${nFilt()}</span>`:''}</button></div>
 <div class="cats" style="margin-top:14px">${['Todos','Porcelanato','Vinílico','Laminado','Revestimento','Nicho'].map(t=>`<button class="chip" aria-pressed="${C.tipo===t}" data-c="tipo" data-t="${t}">${t}</button>`).join('')}</div>
 <p class="count" aria-live="polite">${list.length} ${list.length===1?'produto':'produtos'}</p>
 ${list.length?`<div class="grid2">${list.map(pcard).join('')}</div>`:`<div class="empty"><h3>Nenhum piso com esses filtros</h3><p>Tire um filtro ou aumente o preço máximo.</p><button class="btn btn-ghost btn-sm" style="margin-top:14px" data-c="limpar">Limpar filtros</button></div>`}`;
}
function sheetFiltros(){
 const tams=[...new Set(PRODUTOS.map(p=>p.tam))];
 return `<div class="grab"></div><h2>Filtros</h2>
 <div class="fgroup"><span class="lbl">Cor</span><div class="wrap">${Object.keys(COR_HEX).map(c=>`<button class="colorchip" aria-pressed="${C.cores.includes(c)}" data-c="fcor" data-v="${c}"><span class="sw" style="background:${COR_HEX[c]}"></span>${c}</button>`).join('')}</div></div>
 <div class="fgroup"><span class="lbl">Tamanho da peça (cm)</span><div class="wrap">${tams.map(t=>`<button class="chip" aria-pressed="${C.tams.includes(t)}" data-c="ftam" data-v="${t}">${t}</button>`).join('')}</div></div>
 <div class="fgroup"><label for="fmax">Preço até</label><input id="fmax" type="range" min="50" max="200" step="5" value="${C.max}"><div class="rangeval"><span>R$ 50</span><b id="fmaxv">${C.max>=200?'Qualquer preço':brl0(C.max)+' /m²'}</b></div></div>
 <div class="sheet-actions"><button class="btn btn-ghost" data-c="limpar">Limpar</button><button class="btn btn-a btn-block" data-c="fechar">Mostrar ${filtered().length} produtos</button></div>`;
}

function calcRes(p){
 const c=C.calc;
 if(p.un==='un')return {q:Math.max(1,c.un|0),tot:p.preco*Math.max(1,c.un|0)};
 const area=c.modo==='medidas'?(+c.l||0)*(+c.c||0):(+c.a||0);
 const ap=area*(1+c.perda/100);const q=Math.max(1,Math.ceil(ap/p.cx));
 return {area,ap,q,m2:q*p.cx,tot:q*p.cx*p.preco};
}
function calcHTML(p){
 const c=C.calc,r=calcRes(p);
 if(p.un==='un')return `<section class="calc"><h2>Quantidade</h2><p class="hint">Preço por unidade.</p>
 <div class="inrow" style="grid-template-columns:1fr"><label class="num"><span>Unidades</span><input data-k="un" inputmode="numeric" type="number" min="1" value="${c.un}"></label></div>
 <div class="result"><div class="tot"><span>Total</span><b class="tnum" id="ctot">${brl(r.tot)}</b></div></div></section>`;
 return `<section class="calc"><h2>Calculadora de metragem</h2><p class="hint">Informe o tamanho do cômodo. A margem cobre recortes e quebras.</p>
 <div class="mode" role="group" aria-label="Como informar"><button aria-pressed="${c.modo==='medidas'}" data-c="cmodo" data-v="medidas">Largura e comprimento</button><button aria-pressed="${c.modo==='area'}" data-c="cmodo" data-v="area">Já sei os m²</button></div>
 ${c.modo==='medidas'?`<div class="inrow"><label class="num"><span>Largura (m)</span><input data-k="l" inputmode="decimal" type="number" step="0.1" min="0" value="${c.l}"></label><label class="num"><span>Comprimento (m)</span><input data-k="c" inputmode="decimal" type="number" step="0.1" min="0" value="${c.c}"></label></div>`
 :`<div class="inrow" style="grid-template-columns:1fr"><label class="num"><span>Área total (m²)</span><input data-k="a" inputmode="decimal" type="number" step="0.1" min="0" value="${c.a}"></label></div>`}
 <div class="inrow" style="grid-template-columns:1fr"><label class="num"><span>Margem de perda</span><select data-k="perda">${[5,10,15].map(v=>`<option value="${v}" ${c.perda==v?'selected':''}>${v}%${v===10?' (recomendado)':v===15?' (piso na diagonal)':' (peças pequenas, reto)'}</option>`).join('')}</select></label></div>
 <div class="result" id="cres">${calcResHTML(p,r)}</div></section>`;
}
const calcResHTML=(p,r)=>`<div class="ln"><span>Área do cômodo</span><b class="tnum">${num(r.area)} m²</b></div><div class="ln"><span>Com ${C.calc.perda}% de margem</span><b class="tnum">${num(r.ap)} m²</b></div><div class="ln"><span>Caixas de ${num(p.cx)} m²</span><b class="tnum">${r.q} ${r.q>1?'caixas':'caixa'} (${num(r.m2)} m²)</b></div><div class="tot"><span>Total</span><b class="tnum">${brl(r.tot)}</b></div>`;

function scrProduto(){
 const p=pById(C.prod);
 const fotos=(p.fotos||[]).map(u=>({img:u,lbl:'Foto da loja'})).concat(p.tile?[{scene:arStatic(p.id,p.apl==='Parede'?'parede':'chao'),lbl:'Ambiente de exemplo'}].concat(p.apl==='Chão e parede'?[{scene:arStatic(p.id,'parede'),lbl:'Na parede, exemplo'}]:[]):[]);
 const n=fotos.length+1;
 return `<section class="pd-stage"><div class="gal" id="gal" aria-roledescription="carrossel" aria-label="Fotos do produto"><div class="gslide">${slabHTML(p)}</div>${fotos.map((f,k)=>`<div class="gslide photo" role="group" aria-label="Foto ${k+2} de ${n}">${f.img?`<img src="${f.img}" alt="${esc(p.nome)} instalado">`:`<div class="sbox">${f.scene}</div>`}<span class="glbl">${f.lbl}</span></div>`).join('')}</div>
 ${n>1?`<button class="garr l iconbtn lg press" data-c="gal" data-d="-1" aria-label="Foto anterior">${ic('back',2.2)}</button><button class="garr r iconbtn lg press" data-c="gal" data-d="1" aria-label="Próxima foto">${ic('right',2.2)}</button><div class="gdots" aria-hidden="true">${Array.from({length:n},(_,k)=>`<i class="${k?'':'on'}"></i>`).join('')}</div>`:''}
 <div class="topbtns"><button class="iconbtn lg press" data-c="back" aria-label="Voltar">${ic('back',2.2)}</button><button class="iconbtn lg press" aria-label="Salvar nos favoritos" data-c="fav">${ic('heart',2)}</button></div>
 <div class="stock"><span class="st ${p.est<30?'warn':'ok'}" style="backdrop-filter:blur(8px)">${p.est<30?'Últimas '+p.est+(p.un==='un'?' unidades':' m²'):'Pronta entrega'}</span>${n>1?`<span class="ghint">Deslize para ver ${n-1} ${n-1>1?'fotos':'foto'} em ambientes</span>`:''}</div></section>
 <div class="pd-body"><h1>${p.nome}</h1><p class="desc">${p.desc}</p>
 <div class="pd-price"><b class="tnum">${brl(p.preco)}</b><span>${p.un==='un'?'por unidade':'por m²'}</span>${p.old?`<s style="color:var(--ink-3);font-size:14px">${brl(p.old)}</s>`:''}</div>
 <div class="specs"><div><span>Peça</span><b>${p.tam} cm</b></div><div><span>Acabamento</span><b>${p.acab}</b></div>${p.un==='un'?'':`<div><span>Caixa</span><b>${num(p.cx)} m²</b></div>`}<div><span>Uso</span><b>${p.apl}</b></div></div>
 ${p.tile?`<button class="camrow" data-c="casacam" data-id="${p.id}"><span class="ci">${ic('camera',1.8)}</span><span class="tx"><b>Ver como fica na minha casa</b><span>Tire uma foto do cômodo e veja este piso aplicado</span></span>${ic('right',2)}</button>`:''}
 ${calcHTML(p)}
 <button class="btn btn-ghost btn-block" style="margin-top:12px" data-c="tab" data-s="agenda">${ic('calendar')}Agendar visita para ver este piso</button>
 </div>
 <div class="pd-actions lg bar" data-blur="8"><div style="flex:1;padding:0 14px;min-width:0"><span style="font-size:11.5px;font-weight:700;color:var(--ink-2);display:block">Total</span><b class="tnum" id="barTot" style="font-family:var(--f-display);font-weight:600;font-size:17px">${brl(calcRes(p).tot)}</b></div><button class="btn btn-y" data-c="add">Adicionar</button></div>`;
}
/* ver na minha casa */
const SALA={floor:[[15.28,58.33],[84.72,58.33],[100,82],[100,100],[0,100],[0,82]],wall:[[15.28,8.33],[84.72,8.33],[84.72,58.33],[15.28,58.33]]};
const DEF={floor:[[0,60],[100,60],[100,100],[0,100]],wall:[[0,0],[100,0],[100,60],[0,60]]};
const poly=a=>'polygon('+a.map(p=>p[0]+'% '+p[1]+'%').join(',')+')';
function arStatic(pid,target,photo,sample=true){
 const p=pById(pid);const pl=(sample?SALA:DEF)[target==='chao'?'floor':'wall'];const top=Math.min(...pl.map(x=>x[1]));
 const src=photo||IMG.sala;const fg=sample?`<img src="${IMG.sala_fg}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">`:'';
 const plane=target==='chao'
  ?`<div style="position:absolute;inset:0;perspective:420px;perspective-origin:50% ${top}%"><div class="ar-plane" style="top:${top}%;background-image:url(${IMG[p.tex]});background-size:${p.tile}px;transform:rotateX(64deg)"></div></div>`
  :`<div style="position:absolute;inset:0;background-image:url(${IMG[p.tex]});background-size:${Math.round(p.tile*.6)}px"></div>`;
 return `<img src="${src}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"><div class="ar-layer" style="clip-path:${poly(pl)}">${plane}<div class="ar-shade"><img src="${src}" alt=""></div></div>${target==='parede'?fg:''}`;
}
function scrCasa(){
 const a=C.ar;const p=pById(a.prod);const src=a.photo||IMG.sala;
 const opts=PRODUTOS.filter(x=>x.tile&&(a.target==='chao'?x.apl!=='Parede':x.apl!=='Chão'));
 return `${topbar('Ver na minha casa')}
 <div class="ar-wrap" id="arw" style="--cut:${a.cut}%">
  <img src="${src}" alt="Foto do cômodo">
  ${a.state==='done'?`<div class="ar-after">${arStatic(a.prod,a.target,a.photo,a.sample)}</div><div class="ar-handle"></div><div class="ar-knob lg lg-lens">${ic('back',2.4).replace('<svg','<svg style="width:14px;margin-right:-4px"')}${ic('right',2.4).replace('<svg','<svg style="width:14px"')}</div><span class="ar-lbl lg" style="left:14px">Antes</span><span class="ar-lbl lg" style="right:14px">Depois</span><input class="ar-range" id="arcut" type="range" min="0" max="100" value="${a.cut}" aria-label="Comparar antes e depois">`:''}
  <div class="ar-ctrl lg" role="group" aria-label="Onde aplicar"><button aria-pressed="${a.target==='chao'}" data-c="artarget" data-v="chao">No chão</button><button aria-pressed="${a.target==='parede'}" data-c="artarget" data-v="parede">Na parede</button></div>
  ${a.state==='loading'?`<div class="ar-loading" role="status"><div class="scan"></div><div>${ic('wand')}<br>Aplicando ${esc(p.nome)}<br><small style="font-weight:500;opacity:.8">A IA está medindo o ${a.target==='chao'?'chão':'parede'}</small></div></div>`:''}
 </div>
 <section class="sec" style="margin-top:22px"><div class="sec-h"><h2 style="font-size:17px">Escolha o piso</h2></div></section>
 <div class="pick">${opts.map(x=>`<button aria-pressed="${x.id===a.prod}" data-c="arprod" data-id="${x.id}"><div class="t" style="${bg(x.tex)}"></div>${x.nome.replace(/^(Porcelanato|Vinílico|Laminado|Revestimento|Ladrilho) /,'')}</button>`).join('')}</div>
 <div class="sec stack">
  <button class="btn btn-y btn-block" data-c="argen">${ic('wand')}${a.state==='done'?'Gerar de novo':'Gerar prévia'}</button>
  <label class="btn btn-ghost btn-block" style="cursor:pointer">${ic('camera')}${a.sample?'Usar foto do meu cômodo':'Trocar foto'}<input type="file" accept="image/*" capture="environment" id="arfile" class="sr"></label>
  ${a.state==='done'?`<button class="btn btn-g btn-block" data-c="prod" data-id="${a.prod}">Ver ${esc(p.nome)}</button>`:''}
 </div>
 <p class="foot" style="padding-top:16px">${a.sample?'Foto de exemplo. ':''}No mostruário a prévia é simulada. Na versão final, a IA usa a foto e as medidas cadastradas pelo lojista.</p>`;
}

function scrOrcamento(){
 if(!C.cart.length)return `${bigtitle('Orçamento')}<div class="empty" style="padding-top:80px"><h3>Seu orçamento está vazio</h3><p>Escolha um piso na vitrine e use a calculadora para saber quantas caixas levar.</p><button class="btn btn-y" style="margin-top:18px" data-c="tab" data-s="vitrine">Ver vitrine</button></div>`;
 const t=cartTotal();
 return `${bigtitle('Orçamento',C.cart.length+(C.cart.length>1?' itens':' item'))}<div class="sec" style="margin-top:16px">
 ${C.cart.map((i,k)=>{const p=pById(i.id),r=itemCalc(p,i.q);return `<div class="citem"><div class="t" style="${bg(p.tex)}"></div><div><div class="nm">${p.nome}</div><div class="meta">${p.tam}, ${r.lbl}</div>
  <div class="row"><div class="stepper"><button data-c="q" data-k="${k}" data-d="-1" aria-label="Diminuir">−</button><span class="tnum">${i.q} ${p.un==='un'?'un':'cx'}</span><button data-c="q" data-k="${k}" data-d="1" aria-label="Aumentar">+</button></div><b class="tnum">${brl(r.tot)}</b></div></div></div>`}).join('')}
 <div class="summary"><div class="ln"><span>Produtos</span><span class="tnum">${brl(t)}</span></div><div class="ln"><span>Entrega em Piracicaba</span><span>${t>1500?'Grátis':brl(80)}</span></div>
 <div class="ln"><span>No Pix</span><span class="tnum up">5% de desconto</span></div>
 <div class="tot"><span>Total</span><b class="tnum">${brl(t+(t>1500?0:80))}</b></div></div>
 <div class="stack"><button class="btn btn-y btn-block" data-c="go" data-s="pagar">Pagar pelo app</button>
 <a class="btn btn-ghost btn-block" href="${waLink(waOrc())}" target="_blank" rel="noopener" data-c="waorc">${ic('wa')}Enviar orçamento pelo WhatsApp</a></div>
 <p style="font-size:13px;color:var(--ink-2);margin-top:12px;text-align:center">Quer ajuda para fechar? <button class="linkbtn" data-c="tab" data-s="ajuda">Fale com um vendedor</button></p></div>`;
}
function waOrc(){return 'Olá! Quero este orçamento do app:\n'+C.cart.map(i=>{const p=pById(i.id),r=itemCalc(p,i.q);return '• '+p.nome+' '+p.tam+': '+r.lbl+' = '+brl(r.tot)}).join('\n')+'\nTotal: '+brl(cartTotal())}

function qrSVG(){let s='';const n=25;seed=99;for(let y=0;y<n;y++)for(let x=0;x<n;x++){const f=(x<7&&y<7)||(x>17&&y<7)||(x<7&&y>17);const on=f?((x%6===0||y%6===0||(x>1&&x<5&&y>1&&y<5)||(x>19&&x<23&&y>1&&y<5)||(x>1&&x<5&&y>19&&y<23))&&!(x===6&&y>6)&&!(y===6&&x>6)):rnd()>.5;if(f){const lx=x>17?x-18:x,ly=y>17?y-18:y;if(!(lx===0||ly===0||lx===6||ly===6||(lx>1&&lx<5&&ly>1&&ly<5)))continue}else if(!on)continue;s+=`<rect x="${x}" y="${y}" width="1" height="1"/>`}return `<svg viewBox="0 0 25 25" fill="#111" shape-rendering="crispEdges" role="img" aria-label="QR code Pix de exemplo">${s}</svg>`}
function scrPagar(){
 const t=cartTotal()+(cartTotal()>1500?0:80);const pix=t*.95;
 return `${topbar('Pagamento')}<div class="sec" style="margin-top:12px"><div class="paym" role="radiogroup" aria-label="Forma de pagamento">
 <button class="payopt" role="radio" aria-pressed="${C.pay==='pix'}" aria-checked="${C.pay==='pix'}" data-c="pay" data-v="pix"><div class="ic">${ic('pix')}</div><div><b>Pix</b><span>${brl(pix)} com 5% de desconto</span></div></button>
 <button class="payopt" role="radio" aria-pressed="${C.pay==='cartao'}" aria-checked="${C.pay==='cartao'}" data-c="pay" data-v="cartao"><div class="ic">${ic('card')}</div><div><b>Cartão de crédito</b><span>Até 10x de ${brl(t/10)} sem juros</span></div></button>
 <button class="payopt" role="radio" aria-pressed="${C.pay==='loja'}" aria-checked="${C.pay==='loja'}" data-c="pay" data-v="loja"><div class="ic">${ic('store')}</div><div><b>Pagar na retirada</b><span>Reservamos o material por 48 horas</span></div></button></div>
 ${C.pay==='pix'?`<div class="qr">${qrSVG()}</div><p style="text-align:center;font-size:13px;color:var(--ink-2)">QR de exemplo. Na versão final ele é gerado pelo banco da loja.</p><button class="btn btn-ghost btn-block" style="margin-top:12px" data-c="copiar">Copiar código Pix</button>`:''}
 ${C.pay==='cartao'?`<div class="calc" style="margin-top:16px"><label class="num"><span>Parcelas</span><select id="parc">${[1,2,3,4,5,6,8,10].map(n=>`<option value="${n}" ${C.parc==n?'selected':''}>${n}x de ${brl(t/n)}</option>`).join('')}</select></label><p class="hint" style="margin-top:10px">Os dados do cartão são pedidos na tela segura da maquininha online, que entra na versão final.</p></div>`:''}
 <div class="summary"><div class="tot"><span>Você paga</span><b class="tnum">${brl(C.pay==='pix'?pix:t)}</b></div></div>
 <div class="stack"><button class="btn btn-y btn-block" data-c="pagar">${C.pay==='pix'?'Já paguei':C.pay==='cartao'?'Pagar '+brl(t):'Reservar material'}</button></div></div>`;
}
function scrPago(){const o=S.orders[0];return `<div class="done"><div class="ok">${ic('check',2.4)}</div><h1>${C.pay==='loja'?'Material reservado':'Pedido confirmado'}</h1><p>O pedido #${o.id} chegou na loja agora. ${vById(o.vend).nome} vai te chamar no WhatsApp para combinar a entrega.</p></div>
 <div class="receipt"><div class="ln"><span>Pedido</span><b>#${o.id}</b></div><div class="ln"><span>Itens</span><b style="text-align:right;max-width:60%">${o.itens}</b></div><div class="ln"><span>Pagamento</span><b>${o.forma}</b></div><div class="ln"><span>Total</span><b class="tnum">${brl(o.valor)}</b></div></div>
 <div class="sec stack"><button class="btn btn-ghost btn-block" data-c="tab" data-s="inicio">Voltar ao início</button><button class="btn btn-g btn-block" data-c="demo-admin">Ver o pedido no painel</button></div>`}

function scrAgenda(){
 const g=C.ag;const days=[];for(let i=0,k=0;days.length<12;i++){const d=dOff(i);if(d.getDay()!==0)days.push({i,d})}
 const taken=S.appts.filter(a=>a.dia===g.dia).map(a=>a.hora);
 const hrs=(dOff(g.dia).getDay()===6?['08:00','09:00','10:00','11:00','12:00']:['08:00','09:00','10:30','11:30','13:30','14:00','15:00','16:30']);
 return `${bigtitle('Agendar visita','Escolha como, quando e com quem.')}<div class="sec" style="margin-top:16px"><div class="stack" style="margin-top:0" role="radiogroup" aria-label="Tipo de visita">
 <button class="optcard" role="radio" aria-pressed="${g.tipo==='loja'}" aria-checked="${g.tipo==='loja'}" data-c="agtipo" data-v="loja"><div class="thumb" style="${bg('fachada')}"></div><div><b>Visita à loja</b><span>Um vendedor separa as peças para você ver no pátio.</span></div></button>
 <button class="optcard" role="radio" aria-pressed="${g.tipo==='casa'}" aria-checked="${g.tipo==='casa'}" data-c="agtipo" data-v="casa"><div class="thumb" style="${bg('sala')}"></div><div><b>Medição em casa</b><span>Vamos até você, medimos e levamos amostras. Grátis em Piracicaba.</span></div></button></div></div>
 <section class="sec"><div class="sec-h"><h2 style="font-size:17px">Dia</h2><span style="font-size:13px;color:var(--ink-3)">${dOff(g.dia).toLocaleDateString('pt-BR',{month:'long'})}</span></div></section>
 <div class="days">${days.map(({i,d})=>`<button class="day" aria-pressed="${g.dia===i}" data-c="agdia" data-v="${i}" aria-label="${d.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric'})}"><span>${i===0?'Hoje':WD[d.getDay()]}</span><b class="tnum">${d.getDate()}</b></button>`).join('')}</div>
 <section class="sec"><div class="sec-h"><h2 style="font-size:17px">Horário</h2></div></section>
 <div class="hours">${hrs.map(h=>`<button class="hour tnum" aria-pressed="${g.hora===h}" data-c="aghora" data-v="${h}" ${taken.includes(h)?'disabled aria-label="'+h+' ocupado"':''}>${h}</button>`).join('')}</div>
 <div class="sec"><div class="form" style="margin-top:0">
  <label><span>Vendedor (opcional)</span><select class="txt" id="agvend"><option value="">Quem estiver disponível</option>${VEND.map(v=>`<option value="${v.id}" ${g.vend===v.id?'selected':''}>${v.nome}, ${v.esp.toLowerCase()}</option>`).join('')}</select></label>
  <label><span>Seu nome</span><input class="txt" id="agnome" autocomplete="name" placeholder="Maria Souza" value="${esc(g.nome)}"></label>
  <label><span>WhatsApp</span><input class="txt" id="agfone" type="tel" autocomplete="tel" inputmode="tel" placeholder="(19) 99999-0000" value="${esc(g.fone)}"></label>
  <p id="agerr" style="color:var(--bad);font-size:13px;min-height:1em" aria-live="polite"></p>
 </div><button class="btn btn-y btn-block" data-c="agok">Confirmar agendamento</button></div>`;
}
function scrAgendado(){const a=S.appts[S.appts.length-1];const d=dOff(a.dia);return `<div class="done"><div class="ok">${ic('calendar',2.2)}</div><h1>Visita agendada</h1><p>${a.tipo} ${d.toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long'})}, às ${a.hora}. Você recebe a confirmação no WhatsApp.</p></div>
 <div class="receipt"><div class="ln"><span>Quem atende</span><b>${vById(a.vend).nome}</b></div><div class="ln"><span>Endereço</span><b>${a.tipo==='Visita à loja'?'Pátio do Rei do Piso':'O seu, combinado no WhatsApp'}</b></div></div>
 <div class="sec stack"><button class="btn btn-ghost btn-block" data-c="tab" data-s="inicio">Voltar ao início</button><button class="btn btn-g btn-block" data-c="demo-admin">Ver na agenda do painel</button></div>`}

function scrAjuda(){return `${bigtitle('Fale com um vendedor','Escolha quem vai te atender. A conversa abre no WhatsApp.')}<div class="sec" style="margin-top:16px">
 <div class="stack">${VEND.map(v=>`<div class="seller"><div class="av" style="background:${v.cor}">${SIL}<i class="${v.on?'':'away'}"></i></div><div class="tx"><b>${v.nome}</b><span>${v.esp}</span><span style="color:${v.on?'var(--ok)':'var(--warn)'};font-weight:700;font-size:12.5px">${v.on?'Online agora':'Responde em até 15 min'}</span></div>
 <a class="wa" href="${waLink('Olá, '+v.nome+'! Vim pelo app do Rei do Piso e quero ajuda.')}" target="_blank" rel="noopener" aria-label="Chamar ${v.nome} no WhatsApp">${ic('wa',2)}</a></div>`).join('')}</div></div>
 <section class="sec faq"><div class="sec-h"><h2>Dúvidas comuns</h2></div>
 <details><summary>Vocês entregam fora de Piracicaba?</summary><p>Sim, em toda a região. O frete é calculado pelo vendedor no WhatsApp.</p></details>
 <details><summary>Quanto tempo demora a entrega?</summary><p>Material em estoque sai em até 2 dias úteis. Encomendas, de 7 a 15 dias.</p></details>
 <details><summary>Posso trocar caixa que sobrou?</summary><p>Caixas fechadas e do mesmo lote podem ser trocadas em até 30 dias, com nota fiscal.</p></details>
 <details><summary>A prévia da IA é exata?</summary><p>Ela mostra o efeito do piso no seu cômodo. Cor e brilho podem variar com a luz; venha ver a peça no pátio antes de fechar.</p></details></section>`}

/* stories viewer */
let SV={on:false,list:[],i:0,t0:0,raf:0,paused:false,el:0};
function openStories(start){
 const st=activeStories();
 SV.list=start<0?[{brand:true},...st]:st;SV.i=start<0?0:start;SV.on=true;
 if(start<0)C.seenStories.brand=true;
 renderSV();tickSV(true);setTimeout(()=>{const x=$('#sv .x');x&&x.focus()},50);
}
function renderSV(){
 const el=$('#sv');if(!el)return;
 el.className='sv'+(SV.on?' on':'');
 if(!SV.on){el.innerHTML='';return}
 el.innerHTML=`<div class="bars">${SV.list.map((_,k)=>`<i><b style="width:${k<SV.i?100:0}%"></b></i>`).join('')}</div>
 <div class="svtop"><span class="mark" aria-hidden="true"></span><div style="flex:1">O Rei do Piso<br><small id="svlbl"></small></div><button class="x" data-c="svpause" aria-label="Pausar" id="svp" style="margin-left:auto">${ic('pause')}</button><button class="x" style="margin-left:0" data-c="svx" aria-label="Fechar stories">${ic('x',2.2)}</button></div>
 <div class="track" id="svtrack" style="transform:translateX(${-SV.i*100}%)">${SV.list.map(s=>s.brand?`<div class="slide brand"><div class="bigmark"></div><h2>O Rei do Piso</h2><p>Garante o menor preço</p><div class="swipe">Novidades da semana ${ic('right',2.4).replace('<svg','<svg width="16" height="16"')}</div></div>`
  :`<div class="slide" style="${s.video?'':bg(s.img)}">${s.video?`<video src="${s.video}" muted playsinline autoplay loop style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>`:''}<div class="cap"><span class="st" style="background:var(--brand-yellow);color:var(--on-yellow)">${esc(s.label)}</span><h2 style="margin-top:12px">${esc(s.titulo)}</h2><p>${esc(s.txt)}</p></div></div>`).join('')}</div>
 <button class="nav l" data-c="svprev" aria-label="Story anterior"></button><button class="nav r" data-c="svnext" aria-label="Próximo story"></button>
 <div class="svbot"><button class="btn btn-y" data-c="svvitrine">Ver na vitrine</button><a class="btn btn-w lg press" href="${waLink('Olá! Vi o story no app e quero saber mais.')}" target="_blank" rel="noopener">${ic('wa')}Perguntar</a></div>`;
 setSVlabel();LG.apply(el);
}
function setSVlabel(){const s=SV.list[SV.i];const l=$('#svlbl');if(l)l.textContent=s&&!s.brand?s.label:'Toque para avançar';if(s&&s.id)C.seenStories[s.id]=true}
function tickSV(reset){
 cancelAnimationFrame(SV.raf);if(!SV.on)return;if(reset)SV.t0=performance.now();
 const cur=SV.list[SV.i];const dur=(cur.brand?2.6:cur.dur||5)*1000;
 const step=t=>{if(!SV.on)return;if(SV.paused){SV.t0=t-SV.el;SV.raf=requestAnimationFrame(step);return}SV.el=t-SV.t0;const p=Math.min(1,(t-SV.t0)/dur);const bars=document.querySelectorAll('#sv .bars i b');if(bars[SV.i])bars[SV.i].style.width=(p*100)+'%';
  if(p>=1){svGo(1)}else SV.raf=requestAnimationFrame(step)};
 SV.raf=requestAnimationFrame(step);
}
function svGo(d){
 const n=SV.i+d;if(n<0){SV.t0=performance.now();return tickSV()}
 if(n>=SV.list.length){SV.on=false;renderSV();renderClient();return}
 SV.i=n;const tr=$('#svtrack');if(tr)tr.style.transform=`translateX(${-n*100}%)`;
 document.querySelectorAll('#sv .bars i b').forEach((b,k)=>b.style.width=(k<n?100:0)+'%');setSVlabel();tickSV(true);
}

function toastC(msg){const t=$('#ctoast');if(!t)return;t.innerHTML=`<span class="dot"></span>${msg}`;t.classList.add('on');LG.apply(t.parentElement);clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),2600)}

const TABS=[['inicio','home','Início'],['vitrine','grid','Vitrine'],['orcamento','receipt','Orçamento'],['agenda','calendar','Agenda'],['ajuda','help','Ajuda']];
const TABOF={produto:'vitrine',casa:'vitrine',pagar:'orcamento',pago:'orcamento',agendado:'agenda'};
function focusSig(){const a=document.activeElement;if(!a||!a.closest||!a.closest('#capp'))return null;return ['c','s','id','v','t','i','k','d'].map(k=>a.dataset&&a.dataset[k]?`[data-${k}="${a.dataset[k]}"]`:'').join('')||(a.id?'#'+a.id:null)}
const SB=`<span class="tnum">9:41</span><span style="display:flex;gap:6px;align-items:center"><svg viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><svg viewBox="0 0 27 12"><rect x=".5" y=".5" width="23" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".5"/><rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor"/><rect x="25" y="4" width="1.6" height="4" rx=".8" fill="currentColor" opacity=".5"/></svg></span>`;
const DARKTOP={inicio:420,produto:380};
function sbTone(){const sb=$('#sb');const sc=$('#cscroll');if(!sb||!sc)return;const lim=DARKTOP[C.screen];sb.classList.toggle('light',!!lim&&sc.scrollTop<lim)}
let lastTabX=null,lastScreen=null;
function renderClient(scrollTop){const fs=window.__kbd?focusSig():null;
 const scr={inicio:scrInicio,vitrine:scrVitrine,produto:scrProduto,casa:scrCasa,orcamento:scrOrcamento,pagar:scrPagar,pago:scrPago,agenda:scrAgenda,agendado:scrAgendado,ajuda:scrAjuda}[C.screen]();
 const curTab=TABOF[C.screen]||C.screen;
 const box=$('#capp');const prev=box.querySelector('.app-scroll');const y=prev&&!scrollTop?prev.scrollTop:0;
 const oldLens=box.querySelector('.tab-lens');if(oldLens)lastTabX=oldLens.style.transform;
 const changed=lastScreen!==C.screen;const isPush=changed&&!!TABOF[C.screen]&&!TABOF[lastScreen];
 box.innerHTML=`<div class="island" aria-hidden="true"></div><div class="statusbar" id="sb" aria-hidden="true">${SB}</div>
 <div class="app-scroll ${changed?(isPush?'enter-push':'enter-tab'):''} ${["produto","casa","pagar"].includes(C.screen)?"nopad":""}" id="cscroll">${scr}</div>
 <nav data-blur="7" class="tabbar bar lg ${["produto","casa","pagar"].includes(C.screen)?"hide":""}" aria-label="Menu do app" ${["produto","casa","pagar"].includes(C.screen)?"aria-hidden=\"true\" inert":""}><span class="tab-lens lg lg-lens" aria-hidden="true"></span>${TABS.map(([k,i,l])=>`<button data-c="tab" data-s="${k}" ${curTab===k?'aria-current="page"':''}>${ic(i,2)}${l}${k==='orcamento'&&cartCount()?`<span class="badge">${cartCount()}</span>`:''}</button>`).join('')}</nav>
 <div class="scrim" id="scrim" data-c="fechar"></div><div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="Filtros"></div>
 <div class="sv" id="sv" role="dialog" aria-label="Stories"></div><div class="toast lg bar" data-blur="8" id="ctoast" role="status"></div>`;
 const sc=$('#cscroll');sc.scrollTop=y;sc.addEventListener('scroll',sbTone,{passive:true});sbTone();
 const bar=box.querySelector('.tabbar'),lens=bar.querySelector('.tab-lens');
 if(lastTabX&&changed){lens.style.transition='none';lens.style.transform=lastTabX;const cur=bar.querySelector('[aria-current="page"]');lens.style.width=(cur?cur.offsetWidth:70)+'px';lens.offsetWidth;lens.style.transition='';requestAnimationFrame(()=>placeLens(bar,true))}else placeLens(bar,false);
 lastScreen=C.screen;
 LG.apply(box);
 if(fs&&!scrollTop){const n=box.querySelector(fs);if(n)n.focus({preventScroll:true})}
 if(scrollTop&&fs){const h=box.querySelector('.topbar h1,.bigtitle h1,.done h1,.pd-body h1,.showcase h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}
}
function openSheet(){$('#sheet').innerHTML=sheetFiltros();$('#sheet').classList.add('on');$('#scrim').classList.add('on');setTimeout(()=>{const f=$('#sheet button');f&&f.focus()},60)}
const reSheet=sel=>{$('#sheet').innerHTML=sheetFiltros();const n=$('#sheet '+sel);n&&n.focus()};
function closeSheet(){$('#sheet').classList.remove('on');$('#scrim').classList.remove('on')}

function clientClick(e){
 const b=e.target.closest('[data-c]');if(!b)return;const k=b.dataset.c,d=b.dataset;
 switch(k){
  case 'back':back();break;
  case 'tab':tab(d.s);break;
  case 'go':go(d.s);break;
  case 'prod':C.prod=d.id;C.calc.un=1;go('produto');break;
  case 'cat':C.tipo=d.t;tab('vitrine');break;
  case 'tipo':C.tipo=d.t;renderClient();break;
  case 'filtros':openSheet();break;
  case 'fechar':closeSheet();renderClient();{const f=$('[data-c=filtros]');f&&f.focus()}break;
  case 'limpar':C.cores=[];C.tams=[];C.max=200;C.tipo='Todos';C.q='';closeSheet();renderClient();break;
  case 'fcor':{const a=C.cores;a.includes(d.v)?a.splice(a.indexOf(d.v),1):a.push(d.v);reSheet(`[data-c=fcor][data-v="${d.v}"]`);break}
  case 'ftam':{const a=C.tams;a.includes(d.v)?a.splice(a.indexOf(d.v),1):a.push(d.v);reSheet(`[data-c=ftam][data-v="${d.v}"]`);break}
  case 'cmodo':C.calc.modo=d.v;renderClient();break;
  case 'add':{const p=pById(C.prod),r=calcRes(p);const ex=C.cart.find(i=>i.id===p.id);ex?ex.q=r.q:C.cart.push({id:p.id,q:r.q});renderClient();toastC(`${p.nome} no orçamento: ${p.un==='un'?r.q+' un':r.q+' caixas'}`);break}
  case 'fav':toastC('Salvo nos favoritos');break;
  case 'q':{const i=C.cart[+d.k];i.q+=+d.d;if(i.q<1)C.cart.splice(+d.k,1);renderClient();break}
  case 'gal':{const g=$('#gal');g.scrollBy({left:+d.d*g.clientWidth,behavior:'smooth'});break}
  case 'casacam':{const pid=d.id||FEAT[C.feat||0]||'p1';C.ar.prod=pById(pid).tile?pid:'p1';C.ar.target=pById(C.ar.prod).apl==='Parede'?'parede':'chao';C.ar.state='idle';go('casa');const f=$('#arfile');f&&f.click();break}
  case 'casa':{C.ar.prod=d.id;const p=pById(d.id);C.ar.target=d.t||(p.apl==='Parede'?'parede':'chao');C.ar.state=d.t?'done':'idle';C.ar.cut=50;go('casa');break}
  case 'artarget':C.ar.target=d.v;const ok=pById(C.ar.prod).apl;if((d.v==='chao'&&ok==='Parede')||(d.v==='parede'&&ok==='Chão'))C.ar.prod=PRODUTOS.find(x=>x.tile&&x.apl==='Chão e parede').id;if(C.ar.state==='done')C.ar.state='idle';renderClient();break;
  case 'arprod':C.ar.prod=d.id;if(C.ar.state==='done'){C.ar.state='loading';renderClient();setTimeout(()=>{C.ar.state='done';renderClient()},1300)}else renderClient();break;
  case 'argen':C.ar.state='loading';C.ar.cut=50;renderClient();setTimeout(()=>{C.ar.state='done';if(C.screen==='casa')renderClient()},2200);break;
  case 'pay':C.pay=d.v;renderClient();break;
  case 'copiar':try{navigator.clipboard.writeText('00020126580014br.gov.bcb.pix-EXEMPLO-REIDOPISO')}catch(_){}toastC('Código Pix copiado');break;
  case 'pagar':{const t=cartTotal()+(cartTotal()>1500?0:80);const id=S.orders[0].id+1;
   S.orders.unshift({id,cli:'Cliente do app',vend:'v3',itens:C.cart.map(i=>{const p=pById(i.id);return p.nome.split(' ').slice(1,3).join(' ')+', '+(p.un==='un'?i.q+' un':num(i.q*p.cx)+' m²')}).join(' + '),valor:C.pay==='pix'?t*.95:t,forma:C.pay==='pix'?'Pix':C.pay==='cartao'?'Cartão '+C.parc+'x':'Pagar na retirada',status:C.pay==='loja'?'Aguardando pagamento':'Pago',quando:'Agora',novo:true});
   if(C.pay!=='loja')S.caixa.unshift({h:'Agora',d:'Pedido #'+id+', pelo app',f:C.pay==='pix'?'Pix':'Cartão de crédito',v:C.pay==='pix'?t*.95:t});
   S.notif.push({t:'Novo pedido #'+id,s:brl(C.pay==='pix'?t*.95:t)+' pelo app, '+(C.pay==='loja'?'para pagar na retirada':'pago')});C.cart=[];C.hist=[];C.screen='pago';renderClient(true);break}
  case 'agtipo':C.ag.tipo=d.v;renderClient();break;
  case 'agdia':C.ag.dia=+d.v;C.ag.hora=null;renderClient();break;
  case 'aghora':C.ag.hora=d.v;renderClient();break;
  case 'agok':{const g=C.ag;g.nome=$('#agnome').value.trim();g.fone=$('#agfone').value.trim();g.vend=$('#agvend').value;
   const err=!g.hora?'Escolha um horário.':!g.nome?'Informe seu nome.':g.fone.replace(/\D/g,'').length<10?'Informe um WhatsApp com DDD.':'';
   if(err){$('#agerr').textContent=err;return}
   const v=g.vend||(g.tipo==='casa'?'v1':'v3');S.appts.push({dia:g.dia,hora:g.hora,cli:g.nome,tipo:g.tipo==='casa'?'Medição em casa':'Visita à loja',vend:v,bairro:'',novo:true});
   S.notif.push({t:'Novo agendamento',s:g.nome+', '+(g.dia===0?'hoje':fmtD(dOff(g.dia)))+' às '+g.hora+' com '+vById(v).nome});
   C.hist=[];C.screen='agendado';renderClient(true);break}
  case 'story':openStories(+d.i);break;
  case 'feat':{C.feat=+d.i;const f=pById(FEAT[C.feat]);document.querySelectorAll('.variants button').forEach((x,i)=>x.setAttribute('aria-pressed',i===C.feat));swapSlab(f);
   setTimeout(()=>{$('#fnm').textContent=f.nome;$('#fpr').innerHTML=brl(f.preco)+' <small>/m², '+f.tam+'</small>';$('#fver').dataset.id=f.id;$('#fcasa').dataset.id=f.id;$('#fvn').textContent=f.acab+', '+f.apl.toLowerCase()},200);break}
  case 'rev':C.rev=+d.i;$('#quote').outerHTML=quoteHTML();{const n=$(`[data-c=rev][data-i="${d.i}"]`);n&&n.focus()}break;
  case 'svpause':SV.paused=!SV.paused;b.setAttribute('aria-label',SV.paused?'Continuar':'Pausar');b.innerHTML=ic(SV.paused?'play':'pause');break;
  case 'svx':SV.on=false;renderSV();renderClient();break;
  case 'svnext':svGo(1);break;
  case 'svprev':svGo(-1);break;
  case 'svvitrine':SV.on=false;renderSV();tab('vitrine');break;
  case 'demo-admin':setMode('admin');S.a.page=C.screen==='agendado'?'agenda':'pedidos';renderAll();break;
 }
}
function clientInput(e){
 const t=e.target;
 if(t.id==='q'){C.q=t.value;const pos=t.selectionStart;renderClient();const n=$('#q');n.focus();n.setSelectionRange(pos,pos);return}
 if(t.id==='fmax'){C.max=+t.value;$('#fmaxv').textContent=C.max>=200?'Qualquer preço':brl0(C.max)+' /m²';$('#sheet .btn-block').textContent='Mostrar '+filtered().length+' produtos';return}
 if(t.id==='arcut'){C.ar.cut=+t.value;$('#arw').style.setProperty('--cut',t.value+'%');return}
 if(t.dataset.k){C.calc[t.dataset.k]=t.tagName==='SELECT'?+t.value:t.value;const p=pById(C.prod),r=calcRes(p);
  if(p.un==='un'){$('#ctot').textContent=brl(r.tot)}else $('#cres').innerHTML=calcResHTML(p,r);if($('#barTot'))$('#barTot').textContent=brl(r.tot);return}
 if(t.id==='parc'){C.parc=+t.value;renderClient()}
}
function clientChange(e){
 const t=e.target;
 if(t.id==='arfile'&&t.files[0]){const fr=new FileReader();fr.onload=()=>{C.ar.photo=fr.result;C.ar.sample=false;C.ar.state='idle';renderClient()};fr.readAsDataURL(t.files[0])}
 if(t.id==='parc'){C.parc=+t.value;renderClient()}
}
