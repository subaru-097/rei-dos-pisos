/* ===== painel ===== */
const plural=(n,s,p)=>n+' '+(n===1?s:p);
const A=S.a;
const isV=()=>A.role==='vendedor';
const ME_V='v3';
const NAV_ADMIN=[['Visão geral',[['inicio','home','Início'],['pedidos','receipt','Pedidos e orçamentos'],['agenda','calendar','Agenda'],['entregas','truck','Entregas']]],['Loja',[['produtos','box','Produtos e estoque'],['stories','stories','Stories'],['clientes','users','Clientes']]],['Gestão',[['vendedores','chart','Vendedores'],['caixa','cash','Caixa'],['boletos','file','Boletos'],['config','settings','Configurações']]]];
const NAV_VEND=[['Meu dia',[['inicio','home','Minhas vendas'],['pedidos','receipt','Pedidos e orçamentos'],['agenda','calendar','Agenda'],['entregas','truck','Entregas']]],['Consulta',[['produtos','box','Estoque'],['clientes','users','Clientes']]]];
const TITLES={inicio:isV=>isV?'Olá, Ingrid':'Bom dia, Rei',pedidos:()=>'Pedidos e orçamentos',agenda:()=>'Agenda',entregas:()=>'Entregas',produtos:isV=>isV?'Estoque':'Produtos e estoque',stories:()=>'Stories',clientes:()=>'Clientes',vendedores:()=>'Desempenho dos vendedores',caixa:()=>'Caixa',boletos:()=>'Boletos a pagar',config:()=>'Configurações'};
const stCls=s=>({'Pago':'ok','Entregue':'ok','Separando':'info','Orçamento':'mute','Aguardando pagamento':'warn','Cancelado':'bad'}[s]||'mute');

function lineChart(data,{h=220,fmt=brl0}={}){
 const W=760,pl=52,pr=12,pt=18,pb=26,max=Math.ceil(Math.max(...data.map(d=>d.v))/5000)*5000||1;
 const x=i=>pl+i*(W-pl-pr)/(data.length-1),y=v=>pt+(h-pt-pb)*(1-v/max);
 const P=data.map((d,i)=>[x(i),y(d.v)]);let path='M'+P[0][0].toFixed(1)+' '+P[0][1].toFixed(1);
 for(let i=0;i<P.length-1;i++){const p0=P[i-1]||P[i],p1=P[i],p2=P[i+1],p3=P[i+2]||p2,t=.18;path+=` C${(p1[0]+(p2[0]-p0[0])*t).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])*t).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])*t).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])*t).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`}
 const ticks=[0,max/2,max];
 const last=data.length-1;
 return `<div class="chart" data-chart='${JSON.stringify(data.map(d=>[fmtD(d.d)+' '+WD[d.d.getDay()].toLowerCase(),d.v]))}' data-w="${W}" data-pl="${pl}" data-pr="${pr}" data-ys="${P.map(p=>p[1].toFixed(1)).join(',')}">
 <svg viewBox="0 0 ${W} ${h}" role="img" aria-label="Vendas por dia nos últimos 30 dias, de ${brl0(data[0].v)} a ${brl0(data[last].v)} hoje">
 <g class="grid">${ticks.map(t=>`<line x1="${pl}" x2="${W-pr}" y1="${y(t)}" y2="${y(t)}"/>`).join('')}</g>
 <g class="axis">${ticks.map(t=>`<text x="${pl-10}" y="${y(t)+4}" text-anchor="end">${t>=1000?'R$ '+(t/1000)+' mil':'R$ 0'}</text>`).join('')}
 ${data.map((d,i)=>i%5===4||i===0?`<text x="${x(i)}" y="${h-6}" text-anchor="middle">${fmtD(d.d)}</text>`:'').join('')}</g>
 <defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent-fill)" stop-opacity=".32"/><stop offset="1" stop-color="var(--accent-fill)" stop-opacity="0"/></linearGradient></defs>
 <path d="${path} L${x(last)} ${h-pb} L${pl} ${h-pb} Z" fill="url(#ga)"/>
 <defs><filter id="lglow" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="5"/></filter></defs>
 <path d="${path}" fill="none" stroke="var(--accent-fill)" stroke-width="6" opacity=".55" filter="url(#lglow)"/>
 <path d="${path}" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
 <circle cx="${x(last)}" cy="${y(data[last].v)}" r="5" fill="var(--accent)" stroke="var(--surface)" stroke-width="2"/>
 <text x="${x(last)-10}" y="${y(data[last].v)-12}" text-anchor="end" style="fill:var(--ink);font-size:12px;font-weight:700;font-family:var(--f-text)">Hoje ${fmt(data[last].v)}</text>
 <line class="cross" x1="0" x2="0" y1="${pt}" y2="${h-pb}" stroke="var(--line-2)" stroke-width="1" style="opacity:0"/>
 <circle class="dotc" r="5" fill="var(--accent)" stroke="var(--surface)" stroke-width="2" style="opacity:0"/>
 <rect x="${pl}" y="0" width="${W-pl-pr}" height="${h}" fill="transparent" class="hit"/>
 </svg><div class="tip"></div></div>`;
}
function hbars(rows,fmt=brl0){const m=Math.max(...rows.map(r=>r[1]));return rows.map(([l,v,sub])=>`<div class="hbar" title="${esc(l)}: ${fmt(v)}"><span>${l}</span><div class="tr"><i style="width:${(v/m*100).toFixed(1)}%"></i></div><span class="v tnum">${fmt(v)}${sub?`<small style="display:block;font-weight:600;color:var(--ink-3);font-size:11.5px">${sub}</small>`:''}</span></div>`).join('')}

function ordersTable(list,compact){
 return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Pedido</th><th>Cliente</th>${compact?'':'<th>Itens</th>'}${isV()?'':'<th>Vendedor</th>'}<th>Pagamento</th><th>Status</th><th class="r">Valor</th>${compact?'':'<th></th>'}</tr></thead><tbody>
 ${list.map(o=>`<tr><td><b>#${o.id}</b>${o.novo?' <span class="st warn">Novo</span>':''}<div style="font-size:12px;color:var(--ink-3)">${o.quando}</div></td><td>${esc(o.cli)}</td>${compact?'':`<td style="max-width:240px;color:var(--ink-2)">${esc(o.itens)}</td>`}${isV()?'':`<td>${vById(o.vend).nome}</td>`}<td>${o.forma}</td><td><span class="st ${stCls(o.status)}">${o.status}</span></td><td class="r tnum"><b>${brl(o.valor)}</b></td>
 ${compact?'':`<td class="r">${o.status!=='Cancelado'&&o.status!=='Entregue'?`<button class="abtn sm sec" data-a="cancel" data-id="${o.id}">Cancelar</button>`:''}</td>`}</tr>`).join('')}</tbody></table></div>`;
}

const spark=(vals)=>{const w=96,h=38,mx=Math.max(...vals),mn=Math.min(...vals);const pts=vals.map((v,i)=>[(i/(vals.length-1)*w).toFixed(1),(h-4-(v-mn)/((mx-mn)||1)*(h-8)).toFixed(1)]);return `<svg class="spark" viewBox="0 0 ${w} ${h}" aria-hidden="true"><path d="M${pts.map(p=>p.join(' ')).join(' L')}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${pts[pts.length-1][0]}" cy="${pts[pts.length-1][1]}" r="3" fill="var(--accent)"/></svg>`};
function pgInicio(){
 if(isV())return pgInicioV();
 const hoje=S.caixa.filter(c=>c.v>0&&!c.abertura).reduce((s,c)=>s+c.v,0);
 const pedHoje=S.orders.filter(o=>/Hoje|Agora/.test(o.quando));
 const agHoje=S.appts.filter(a=>a.dia===0);
 const low=PRODUTOS.filter(p=>p.est<30&&p.un==='m2')[0];
 const serie=VENDAS30.map((d,i)=>i===29?{d:d.d,v:Math.round(hoje)}:d);
 return `<div class="kpis">
  <section class="hero-card" style="${bg('fachada')}"><span class="pill"><i></i>Caixa aberto desde 08:10</span><span>Vendido hoje</span><b class="tnum">${brl0(hoje)}</b><small>+18% sobre a última segunda</small>
   <div class="acts"><button class="abtn y" data-a="novavenda">${ic('plus')}Nova venda</button></div></section>
  <div class="kpi"><div class="ic">${ic('receipt')}</div><span>Pedidos hoje</span><b class="tnum">${pedHoje.length}</b><small>${plural(pedHoje.filter(o=>o.status==='Pago').length,'pago','pagos')}</small>${spark([2,4,3,5,4,6,pedHoje.length+3])}</div>
  <div class="kpi"><div class="ic">${ic('calendar')}</div><span>Visitas hoje</span><b class="tnum">${agHoje.length}</b><small>Próxima às ${agHoje[0]?agHoje[0].hora:'—'}</small>${spark([1,3,2,2,4,3,agHoje.length+2])}</div>
 </div>
 <div class="cols"><section class="panel"><div class="panel-h"><div><h2>${ic('chart')}Vendas</h2><p>Últimos 30 dias de loja aberta</p></div><div class="seg" role="group" aria-label="Período"><button aria-pressed="false">7 dias</button><button aria-pressed="true">30 dias</button><button aria-pressed="false">90 dias</button></div></div>
  <div style="display:flex;align-items:baseline;gap:12px;margin:-4px 0 14px"><span class="bignum tnum">${brl0(serie.reduce((s,d)=>s+d.v,0))}</span><small class="up" style="font-weight:700;font-size:13px">+12% sobre os 30 dias anteriores</small></div>
  ${lineChart(serie)}</section>
 <section class="panel"><div class="panel-h"><h2>${ic('wand')}Ações rápidas</h2></div><div class="qa">
  <button data-a="novavenda">${ic('cash')}<b>Nova venda</b><span>Vender no balcão</span></button>
  <button data-a="editprod" data-id="new">${ic('box')}<b>Novo produto</b><span>Piso, revestimento ou nicho</span></button>
  <button data-a="novoag">${ic('calendar')}<b>Agendar visita</b><span>Loja ou medição</span></button>
  <button data-a="novobol">${ic('file')}<b>Novo boleto</b><span>Lembrete de pagamento</span></button></div></section></div>
 <div class="cols"><section class="panel"><div class="panel-h"><h2>${ic('clock')}Pedidos recentes</h2><button class="abtn sm sec" data-a="page" data-p="pedidos">Ver todos</button></div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Pedido</th><th>Cliente</th><th class="r">Valor</th><th>Status</th><th class="r">Horário</th></tr></thead><tbody>
  ${S.orders.slice(0,6).map(o=>`<tr><td><b>#${o.id}</b>${o.novo?' <span class="st warn">Novo</span>':''}</td><td>${esc(o.cli)}</td><td class="r tnum"><b>${brl(o.valor)}</b></td><td><span class="st ${stCls(o.status)}">${o.status}</span></td><td class="r" style="color:var(--ink-3);white-space:nowrap">${o.quando.replace('Hoje, ','')}</td></tr>`).join('')}</tbody></table></div></section>
 <section class="alert-card" style="${bg(low.tex)}"><span class="tag">${ic('alert',2.2).replace('<svg','<svg width="14" height="14"')}Estoque baixo</span><h3>${low.nome} com ${low.est} m²</h3><p>Dá para uma sala pequena. Peça ao fornecedor antes do próximo orçamento grande.</p><button class="abtn y" data-a="editprod" data-id="${low.id}" style="align-self:flex-start">Ajustar estoque</button></section></div>`;
}
function pgInicioV(){
 const v=vById(ME_V);const mine=S.orders.filter(o=>o.vend===ME_V);const ag=S.appts.filter(a=>a.vend===ME_V);
 return `<div class="lock-banner">${ic('lock')}<span>Você entrou como <b>vendedora</b>. Pode vender, cancelar pedidos e agendar visitas. Caixa, boletos e relatórios ficam com o administrador.</span></div>
 <div class="kpis"><div class="kpi"><div class="ic">${ic('cash')}</div><span>Vendido no mês</span><b class="tnum">${brl0(v.vendas)}</b><small>${Math.round(v.vendas/v.meta*100)}% da meta de ${brl0(v.meta)}</small><div class="meta-bar"><i style="width:${Math.min(100,v.vendas/v.meta*100)}%"></i></div></div>
 <div class="kpi"><div class="ic">${ic('receipt')}</div><span>Vendas no mês</span><b class="tnum">${v.qtd}</b><small>Ticket médio ${brl0(v.vendas/v.qtd)}</small></div>
 <div class="kpi"><div class="ic">${ic('star')}</div><span>Nota dos clientes</span><b class="tnum">${num(v.nota,1)}</b><small>Média das últimas 30 avaliações</small></div>
 <div class="kpi"><div class="ic">${ic('calendar')}</div><span>Minhas visitas</span><b class="tnum">${ag.length}</b><small>${ag.filter(a=>a.dia===0).length} hoje</small></div></div>
 <div class="cols"><section class="panel"><div class="panel-h"><h2>Meus pedidos</h2><button class="abtn pri sm" data-a="novavenda">${ic('plus')}Nova venda</button></div>${ordersTable(mine,false)}</section>
 <section class="panel"><div class="panel-h"><h2>Minha agenda</h2></div>${ag.map(a=>`<div class="list-row"><div class="when"><b>${dOff(a.dia).getDate()}</b><span style="display:block">${a.dia===0?'Hoje':WD[dOff(a.dia).getDay()]}</span></div><div class="tx"><b>${esc(a.cli)}</b><span>${a.hora}, ${a.tipo}</span></div></div>`).join('')}</section></div>`;
}
function pgPedidos(){
 const fs=['Todos','Orçamento','Aguardando pagamento','Pago','Separando','Entregue','Cancelado'];
 let list=S.orders.filter(o=>A.filtroPed==='Todos'||o.status===A.filtroPed);if(isV())list=list.filter(o=>o.vend===ME_V);
 return `<div class="tools"><div class="seg" role="group" aria-label="Filtrar por status">${fs.map(f=>`<button aria-pressed="${A.filtroPed===f}" data-a="fped" data-v="${f}">${f}</button>`).join('')}</div><span style="flex:1"></span><button class="abtn pri" data-a="novavenda">${ic('plus')}Nova venda</button></div>
 <section class="panel">${list.length?ordersTable(list,false):'<p style="color:var(--ink-2);padding:20px 0">Nenhum pedido com esse status.</p>'}</section>`;
}
function pgAgenda(){
 let ap=S.appts;if(isV())ap=ap.filter(a=>a.vend===ME_V);
 const days=[0,1,2,3,4,5].map(i=>({i,d:dOff(i),l:ap.filter(a=>a.dia===i).sort((a,b)=>a.hora.localeCompare(b.hora))}));
 return `<div class="tools"><span style="color:var(--ink-2);font-size:14px">Agendamentos feitos pelo app aparecem aqui na hora.</span><span style="flex:1"></span><button class="abtn pri" data-a="novoag">${ic('plus')}Agendar visita</button></div>
 <div class="cols three">${days.filter(x=>x.d.getDay()!==0).map(x=>`<section class="panel"><div class="panel-h"><h2>${x.i===0?'Hoje':x.i===1?'Amanhã':WD[x.d.getDay()]+', '+x.d.getDate()}</h2><p>${x.l.length} ${x.l.length===1?'visita':'visitas'}</p></div>
 ${x.l.length?x.l.map(a=>`<div class="list-row"><div class="when"><b style="font-size:14px">${a.hora}</b></div><div class="tx"><b>${esc(a.cli)}${a.novo?' <span class="st warn">Novo</span>':''}</b><span>${a.tipo}${a.bairro?', '+a.bairro:''}</span></div>${avatar(vById(a.vend),32)}</div>`).join(''):'<p style="color:var(--ink-3);font-size:14px">Dia livre.</p>'}</section>`).join('')}</div>`;
}
const mapsLink=e=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(e.end+', '+e.bairro+', Piracicaba, SP');
const ENT_ST={'Programada':'info','Saiu para entrega':'warn','Entregue':'ok','Cancelada':'bad'};
function pgEntregas(){
 const dia=A.entDia??0;const list=S.entregas.filter(e=>e.dia===dia).sort((a,b)=>a.hora.localeCompare(b.hora));
 const ativos=list.filter(e=>e.status!=='Entregue'&&e.status!=='Cancelada');
 const rota=ativos.length?'https://www.google.com/maps/dir/?api=1&travelmode=driving&destination='+encodeURIComponent(ativos[ativos.length-1].end+', '+ativos[ativos.length-1].bairro+', Piracicaba, SP')+(ativos.length>1?'&waypoints='+encodeURIComponent(ativos.slice(0,-1).map(e=>e.end+', '+e.bairro+', Piracicaba, SP').join('|')):''):'';
 const lbl=['Hoje','Amanhã'].concat([2,3,4,5].map(i=>WD[dOff(i).getDay()]+' '+dOff(i).getDate()));
 return `<div class="tools"><div class="seg" role="group" aria-label="Dia">${lbl.map((l,i)=>dOff(i).getDay()===0?'':`<button aria-pressed="${dia===i}" data-a="entdia" data-v="${i}">${l}${S.entregas.filter(e=>e.dia===i).length?` <span style="opacity:.6">${S.entregas.filter(e=>e.dia===i).length}</span>`:''}</button>`).join('')}</div><span style="flex:1"></span>
 ${rota?`<a class="abtn sec" href="${rota}" target="_blank" rel="noopener">${ic('pin')}Abrir rota do dia</a>`:''}<button class="abtn pri" data-a="novaent">${ic('plus')}Programar entrega</button></div>
 <div class="kpis" style="grid-template-columns:repeat(3,minmax(0,1fr))"><div class="kpi"><span>Entregas ${dia===0?'hoje':dia===1?'amanhã':'no dia'}</span><b class="tnum">${list.length}</b><small>${ativos.length} a fazer</small></div><div class="kpi"><span>Saíram</span><b class="tnum">${list.filter(e=>e.status==='Saiu para entrega').length}</b><small>A caminho do cliente</small></div><div class="kpi"><span>Entregues</span><b class="tnum">${list.filter(e=>e.status==='Entregue').length}</b><small>Confirmadas no dia</small></div></div>
 <section class="panel" style="margin-top:14px">${list.length?list.map(e=>`<article class="ent">
  <div class="eh"><b class="tnum">${e.hora}</b><span class="st ${ENT_ST[e.status]}">${e.status}</span></div>
  <div class="eb"><div class="en"><b>${esc(e.cli)}</b>${e.ped?`<span>Pedido #${e.ped}, ${esc(e.itens)}</span>`:e.itens?`<span>${esc(e.itens)}</span>`:''}</div>
   <a class="eaddr" href="${mapsLink(e)}" target="_blank" rel="noopener" title="Abrir no Google Maps">${ic('pin')}<span>${esc(e.end)}, ${esc(e.bairro)}</span><small>Abrir no Maps</small></a>
   <div class="emeta"><a href="${'https://wa.me/55'+e.fone.replace(/\D/g,'')}" target="_blank" rel="noopener">${ic('wa')}${e.fone}</a><span>${avatar(vById(e.vend),22)}${vById(e.vend).nome}</span></div>
   ${e.obs?`<p class="eobs">${esc(e.obs)}</p>`:''}</div>
  <div class="ea">${e.status==='Programada'?`<button class="abtn sm pri" data-a="entst" data-id="${e.id}" data-v="Saiu para entrega">${ic('truck')}Saiu</button>`:e.status==='Saiu para entrega'?`<button class="abtn sm pri" data-a="entst" data-id="${e.id}" data-v="Entregue">${ic('check')}Entregue</button>`:''}<button class="abtn sm sec" data-a="editent" data-id="${e.id}" aria-label="Editar entrega de ${esc(e.cli)}">${ic('edit')}</button></div>
 </article>`).join(''):`<div class="empty" style="padding:40px 10px"><h3>Nenhuma entrega neste dia</h3><p>Programe a primeira e ela aparece aqui para todos os vendedores.</p></div>`}</section>`;
}
function modalEnt(id){
 const e=S.entregas.find(x=>x.id===id)||{dia:A.entDia??0,hora:'',cli:'',fone:'',end:'',bairro:'',itens:'',obs:'',vend:isV()?ME_V:'v1',status:'Programada'};
 const dt=dOff(e.dia);const iso=dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');
 return `<h2>${id?'Editar entrega':'Programar entrega'}</h2><p class="sub">Todos os vendedores e o dono veem esta entrega na lista do dia.</p>
 <div class="form"><label><span>Cliente</span><input class="txt" id="ecli" list="eclis" value="${esc(e.cli)}" placeholder="Nome do cliente" autocomplete="off"><datalist id="eclis">${S.clients.map(c=>`<option value="${esc(c.nome)}">`).join('')}</datalist></label>
 <div class="two"><label><span>WhatsApp</span><input class="txt" id="efone" type="tel" inputmode="tel" value="${esc(e.fone)}" placeholder="(19) 99999-0000"></label><label><span>Vendedor</span><select class="txt" id="evend">${VEND.map(v=>`<option value="${v.id}" ${e.vend===v.id?'selected':''}>${v.nome}</option>`).join('')}</select></label></div>
 <div class="two"><label><span>Endereço</span><input class="txt" id="eend" value="${esc(e.end)}" placeholder="Rua do Rosário, 890" autocomplete="street-address"></label><label><span>Bairro</span><input class="txt" id="ebai" value="${esc(e.bairro)}" placeholder="Centro"></label></div>
 <div class="two"><label><span>Dia</span><input class="txt" id="edia" type="date" value="${iso}"></label><label><span>Horário</span><input class="txt" id="ehora" type="time" value="${e.hora}"></label></div>
 <label><span>O que vai na entrega</span><input class="txt" id="eitens" value="${esc(e.itens)}" placeholder="Cimento Urbano, 20 caixas"></label>
 <label><span>Observações</span><textarea class="txt" id="eobs" placeholder="Portão azul. Ligar antes de chegar.">${esc(e.obs)}</textarea></label>
 <p id="eerr" style="color:var(--bad);font-size:13px" aria-live="polite"></p></div>
 <div class="acts">${id?`<button class="abtn danger" data-a="entst" data-id="${id}" data-v="Cancelada" style="margin-right:auto">Cancelar entrega</button>`:''}<button class="abtn sec" data-a="closemodal">Voltar</button><button class="abtn pri" data-a="saveent" data-id="${id||''}">${id?'Salvar':'Programar entrega'}</button></div>`;
}
function pgProdutos(){
 return `<div class="tools"><label class="field" style="max-width:320px;background:var(--surface)">${ic('search')}<span class="sr">Buscar produto</span><input placeholder="Buscar produto"></label><span style="flex:1"></span>${isV()?'':`<button class="abtn pri" data-a="editprod" data-id="new">${ic('plus')}Novo produto</button>`}</div>
 <section class="panel"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Produto</th><th>Tipo</th><th>Tamanho</th><th class="r">Preço</th><th class="r">Estoque</th><th>Ver na minha casa</th>${isV()?'':'<th></th>'}</tr></thead><tbody>
 ${PRODUTOS.map(p=>`<tr><td><div class="cell-p"><div class="thumb" style="${bg(p.tex)}"></div><div><b>${p.nome}</b><span>${p.acab}</span></div></div></td><td>${p.tipo}</td><td>${p.tam}</td><td class="r tnum">${brl(p.preco)}<span style="color:var(--ink-3);font-size:12px">${p.un==='un'?'/un':'/m²'}</span></td>
 <td class="r tnum">${p.est<30?`<span class="st bad">${p.est} ${p.un==='un'?'un':'m²'}</span>`:p.est+(p.un==='un'?' un':' m²')}</td><td>${p.tile?`<span class="st ok">Configurado</span>`:`<span class="st mute">Não se aplica</span>`}</td>${isV()?'':`<td class="r"><button class="abtn sm sec" data-a="editprod" data-id="${p.id}">${ic('edit')}Editar</button></td>`}</tr>`).join('')}</tbody></table></div></section>`;
}
function drawerProd(id,tab='dados'){
 const p=id==='new'?{id:'new',nome:'',tipo:'Porcelanato',cor:'Branco',tam:'',acab:'Acetinado',preco:0,cx:0,un:'m2',tex:'calacata',est:0,apl:'Chão e parede',tile:150,desc:''}:pById(id);
 const tabs=[['dados','Dados'],['fotos','Fotos'],['estoque','Estoque'],['ia','Ver na minha casa (IA)']];
 return `<div class="hd"><h2>${p.nome||'Novo produto'}</h2><button class="iconbtn" data-a="closedrawer" aria-label="Fechar">${ic('x',2)}</button></div>
 <div class="tabs" role="tablist">${tabs.map(([k,l])=>`<button role="tab" aria-selected="${tab===k}" data-a="ptab" data-v="${k}" data-id="${id}">${l}</button>`).join('')}</div>
 ${tab==='dados'?`<div class="form" style="margin-top:0"><label><span>Nome na vitrine</span><input class="txt" value="${esc(p.nome)}" placeholder="Porcelanato Calacata Gold"></label>
  <div class="two"><label><span>Tipo</span><select class="txt">${['Porcelanato','Vinílico','Laminado','Revestimento','Nicho'].map(t=>`<option ${t===p.tipo?'selected':''}>${t}</option>`).join('')}</select></label><label><span>Cor para o filtro</span><select class="txt">${Object.keys(COR_HEX).map(t=>`<option ${t===p.cor?'selected':''}>${t}</option>`).join('')}</select></label></div>
  <div class="two"><label><span>Tamanho da peça (cm)</span><input class="txt" value="${esc(p.tam)}" placeholder="60×120"></label><label><span>Acabamento</span><select class="txt">${['Polido','Acetinado','Fosco','Brilhante'].map(t=>`<option ${t===p.acab?'selected':''}>${t}</option>`).join('')}</select></label></div>
  <div class="two"><label><span>Preço ${p.un==='un'?'por unidade':'por m²'}</span><input class="txt" inputmode="decimal" value="${p.preco?num(p.preco):''}" placeholder="89,90"></label><label><span>m² por caixa</span><input class="txt" inputmode="decimal" value="${p.cx?num(p.cx):''}" placeholder="1,44"></label></div>
  <label><span>Descrição curta</span><textarea class="txt">${esc(p.desc)}</textarea></label></div>`:''}
 ${tab==='fotos'?`<div class="note" style="margin-bottom:14px">Fotos do piso instalado em casas e obras. Aparecem no app quando o cliente desliza a foto do produto. Vale foto do celular ou PNG.</div>
  <div class="fotogrid">${(p.fotos||[]).map((u,k)=>`<div class="ft" style="background-image:url(${u})"><button class="iconbtn" data-a="rmfoto" data-id="${id}" data-k="${k}" aria-label="Remover foto">${ic('x',2)}</button></div>`).join('')}<label class="ft add" style="cursor:pointer">${ic('upload')}<span>Adicionar fotos</span><input type="file" accept="image/*" multiple class="sr" id="pfotos" data-id="${id}"></label></div>`:''}
 ${tab==='estoque'?`<div class="form" style="margin-top:0"><div class="two"><label><span>Estoque atual</span><input class="txt" value="${p.est}"></label><label><span>Avisar quando ficar abaixo de</span><input class="txt" value="30"></label></div>
  <label><span>Lote em estoque</span><input class="txt" value="L-2611 B"></label><div class="note">Clientes veem <b>Pronta entrega</b> quando há estoque e <b>Últimas unidades</b> abaixo do aviso.</div></div>`:''}
 ${tab==='ia'?`<div class="note" style="margin-bottom:16px">Estas informações ensinam a IA a desenhar <b>este</b> piso na foto do cliente, no tamanho e na cor certos.</div>
  <div class="aiprev"><div class="t" style="${bg(p.tex)}"></div><div><b>Foto da textura</b><p style="font-size:13px;color:var(--ink-2);margin:4px 0 10px">Foto de cima, sem reflexo, mostrando pelo menos uma peça inteira.</p><label class="abtn sm sec" style="cursor:pointer">${ic('upload')}Trocar foto<input type="file" accept="image/*" class="sr"></label></div></div>
  <div class="form"><label><span>Onde pode ser aplicado</span><select class="txt">${['Chão e parede','Chão','Parede'].map(t=>`<option ${t===p.apl?'selected':''}>${t}</option>`).join('')}</select></label>
  <div class="two"><label><span>Largura real da peça (cm)</span><input class="txt" value="${(p.tam||'').split('×')[0]||''}"></label><label><span>Altura real da peça (cm)</span><input class="txt" value="${(p.tam||'').split('×')[1]||''}"></label></div>
  <div class="two"><label><span>Cor do rejunte</span><select class="txt"><option>Cinza platina</option><option>Branco</option><option>Grafite</option><option>Bege</option></select></label><label><span>Largura do rejunte</span><select class="txt"><option>1 mm</option><option selected>2 mm</option><option>3 mm</option></select></label></div>
  <div class="two"><label><span>Paginação</span><select class="txt"><option>Reto</option><option>Amarração 1/2</option><option>Amarração 1/3</option><option>Espinha de peixe</option><option>Diagonal</option></select></label><label><span>Brilho na foto</span><select class="txt"><option ${p.acab==='Polido'?'selected':''}>Reflete bastante</option><option ${p.acab==='Acetinado'?'selected':''}>Reflete pouco</option><option ${p.acab==='Fosco'?'selected':''}>Sem reflexo</option></select></label></div>
  <label><span>Instrução extra para a IA (opcional)</span><textarea class="txt" placeholder="Veios na diagonal. Não repetir a mesma peça lado a lado."></textarea></label></div>`:''}
 <div class="acts" style="justify-content:space-between"><button class="abtn sec" data-a="closedrawer">Cancelar</button><button class="abtn pri" data-a="saveprod">Salvar produto</button></div>`;
}
function pgVendedores(){
 const tot=VEND.reduce((s,v)=>s+v.vendas,0);const rank=[...VEND].sort((a,b)=>b.vendas-a.vendas);
 return `<div class="tools"><div class="seg" role="group" aria-label="Período"><button aria-pressed="false">Semana</button><button aria-pressed="true">Novembro</button><button aria-pressed="false">Trimestre</button></div><span style="flex:1"></span><button class="abtn pri" data-a="novovend">${ic('plus')}Criar conta de vendedor</button></div>
 <div class="sellers">${rank.map((v,i)=>`<article class="scard ${i===0?'rank-1':''}"><div class="top">${avatar(v)}<div style="flex:1"><b>${v.nome}</b><span>${v.esp}</span></div>${i===0?'<span class="st" style="background:var(--brand-yellow);color:var(--on-yellow)">1º do mês</span>':`<span class="st mute">${i+1}º</span>`}</div>
 <span style="font-size:13px;color:var(--ink-2);font-weight:600">Vendido no mês</span><div class="big tnum">${brl0(v.vendas)}</div><div class="meta-bar" role="progressbar" aria-valuenow="${Math.round(v.vendas/v.meta*100)}" aria-valuemin="0" aria-valuemax="100" aria-label="Meta de ${v.nome}"><i style="width:${Math.min(100,v.vendas/v.meta*100)}%"></i></div><span style="font-size:12.5px;color:var(--ink-3);font-weight:600">${Math.round(v.vendas/v.meta*100)}% da meta de ${brl0(v.meta)}</span>
 <div class="mini"><div><span>Vendas</span><b class="tnum">${v.qtd}</b></div><div><span>Ticket médio</span><b class="tnum">${brl0(v.vendas/v.qtd)}</b></div><div><span>Conversão</span><b class="tnum">${v.conv}%</b></div><div><span>Nota clientes</span><b class="tnum">${num(v.nota,1)} ★</b></div><div><span>Cancelamentos</span><b class="tnum ${v.cancel>2?'down':''}">${v.cancel}</b></div><div><span>Visitas</span><b class="tnum">${v.ag}</b></div></div>
 <button class="abtn sm sec" style="margin-top:14px;width:100%;justify-content:center" data-a="avaliar" data-id="${v.id}">${ic('star')}Avaliar ${v.nome}</button></article>`).join('')}</div>
 <div class="cols eq"><section class="panel"><div class="panel-h"><div><h2>Vendido por vendedor</h2><p>${brl0(tot)} no mês</p></div></div>${hbars(rank.map(v=>[v.nome,v.vendas,Math.round(v.vendas/tot*100)+'% do total']))}</section>
 <section class="panel"><div class="panel-h"><div><h2>Conversão de orçamento em venda</h2><p>Quantos orçamentos viraram pedido</p></div></div>${hbars([...VEND].sort((a,b)=>b.conv-a.conv).map(v=>[v.nome,v.conv]),x=>x+'%')}</section></div>`;
}
function pgCaixa(){
 const ent=S.caixa.filter(c=>c.v>0&&!c.abertura),sai=S.caixa.filter(c=>c.v<0);const ab=S.caixa.find(c=>c.abertura);
 const te=ent.reduce((s,c)=>s+c.v,0),ts=sai.reduce((s,c)=>s-c.v,0);
 const fm={};ent.forEach(c=>fm[c.f]=(fm[c.f]||0)+c.v);
 return `<div class="tools"><div class="seg" role="group" aria-label="Período">${['Hoje','7 dias','Novembro'].map(p=>`<button aria-pressed="${A.caixaPer===p}" data-a="cper" data-v="${p}">${p}</button>`).join('')}</div><span style="flex:1"></span><button class="abtn sec" data-a="lanc">${ic('plus')}Lançar saída</button><button class="abtn pri" data-a="fechar">Fechar caixa</button></div>
 <div class="kpis"><div class="kpi"><span>Abertura</span><b class="tnum">${brl(ab.v)}</b><small>Aberto às ${ab.h} por Rei</small></div><div class="kpi"><span>Entradas</span><b class="tnum up">${brl(te)}</b><small>${ent.length} lançamentos</small></div><div class="kpi"><span>Saídas</span><b class="tnum down">${brl(ts)}</b><small>${sai.length} lançamento${sai.length>1?'s':''}</small></div><div class="kpi"><span>Saldo em caixa</span><b class="tnum">${brl(ab.v+te-ts)}</b><small>Dinheiro na gaveta: ${brl(ab.v+(fm['Dinheiro']||0)-ts)}</small></div></div>
 <div class="cols"><section class="panel"><div class="panel-h"><h2>Lançamentos de hoje</h2><button class="abtn sm sec" data-a="export">Copiar relatório</button></div>
 <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Hora</th><th>Descrição</th><th>Forma</th><th class="r">Valor</th></tr></thead><tbody>${S.caixa.map(c=>`<tr><td class="tnum">${c.h}</td><td>${esc(c.d)}</td><td>${c.f}</td><td class="r tnum"><b class="${c.v<0?'down':''}">${c.v<0?'− '+brl(-c.v):brl(c.v)}</b></td></tr>`).join('')}</tbody></table></div></section>
 <section class="panel"><div class="panel-h"><div><h2>Entradas por forma de pagamento</h2><p>Hoje, sem a abertura</p></div></div>${hbars(Object.entries(fm).sort((a,b)=>b[1]-a[1]).map(([f,v])=>[f,v,Math.round(v/te*100)+'%']))}
 <div class="note" style="margin-top:16px">Pix e cartão pelo app entram aqui sozinhos. Dinheiro e maquininha do balcão o vendedor lança na venda.</div></section></div>`;
}
function pgBoletos(){
 const ab=S.boletos.filter(b=>b.status==='aberto');const sem=ab.filter(b=>b.venc<=7);
 return `<div class="tools"><span style="flex:1"></span><button class="abtn pri" data-a="novobol">${ic('plus')}Novo boleto</button></div>
 <div class="kpis"><div class="kpi"><span>Vence hoje</span><b class="tnum">${brl(ab.filter(b=>b.venc===0).reduce((s,b)=>s+b.valor,0))}</b><small>${ab.filter(b=>b.venc===0).length} boleto</small></div><div class="kpi"><span>Próximos 7 dias</span><b class="tnum">${brl(sem.reduce((s,b)=>s+b.valor,0))}</b><small>${sem.length} boletos</small></div><div class="kpi"><span>No mês</span><b class="tnum">${brl(ab.reduce((s,b)=>s+b.valor,0))}</b><small>${ab.length} em aberto</small></div><div class="kpi"><span>Atrasados</span><b class="tnum">${S.boletos.filter(b=>b.status==='aberto'&&b.venc<0).length}</b><small>Tudo em dia</small></div></div>
 <section class="panel" style="margin-top:14px"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Vencimento</th><th>Empresa</th><th>Categoria</th><th>Documento</th><th>Status</th><th class="r">Valor</th><th></th></tr></thead><tbody>
 ${[...S.boletos].sort((a,b)=>a.venc-b.venc).map(b=>`<tr><td class="tnum"><b>${fmtD(dOff(b.venc))}</b> <span style="color:var(--ink-3);font-size:12.5px">${WD[dOff(b.venc).getDay()]}</span></td><td>${esc(b.emp)}</td><td>${b.cat}</td><td style="color:var(--ink-3)">${b.doc||'—'}</td>
 <td>${b.status==='pago'?'<span class="st ok">Pago</span>':b.venc===0?'<span class="st warn">Vence hoje</span>':b.venc<0?'<span class="st bad">Atrasado</span>':`<span class="st info">Em ${b.venc} dias</span>`}</td><td class="r tnum"><b>${brl(b.valor)}</b></td><td class="r">${b.status!=='pago'?`<button class="abtn sm sec" data-a="pagobol" data-id="${b.id}">${ic('check')}Marcar como pago</button>`:''}</td></tr>`).join('')}</tbody></table></div></section>`;
}
function modalBoleto(){
 const d=A.boletoMode==='detalhado';
 return `<h2>Novo boleto</h2><p class="sub">Você recebe um aviso no painel e no WhatsApp antes do vencimento.</p>
 <div class="mode" role="group" aria-label="Tipo de cadastro" style="margin-top:16px"><button aria-pressed="${!d}" data-a="bmode" data-v="simples">Simples</button><button aria-pressed="${d}" data-a="bmode" data-v="detalhado">Detalhado</button></div>
 <div class="form"><label><span>Empresa</span><input class="txt" id="bemp" placeholder="Cerâmica Vale do Corumbataí"></label>
 <div class="two"><label><span>Valor</span><input class="txt" id="bval" inputmode="decimal" placeholder="1.250,00"></label><label><span>Vencimento</span><input class="txt" id="bven" type="date" value="2026-11-16"></label></div>
 ${d?`<div class="two"><label><span>Categoria</span><select class="txt" id="bcat"><option>Fornecedor</option><option>Frete</option><option>Fixo</option><option>Imposto</option><option>Outro</option></select></label><label><span>Número da nota ou documento</span><input class="txt" id="bdoc" placeholder="NF 88710"></label></div>
 <label><span>Código de barras</span><input class="txt" inputmode="numeric" placeholder="34191.79001 01043.510047 91020.150008 1 97410000125000"></label>
 <div class="two"><label><span>Repetir</span><select class="txt"><option>Não repetir</option><option>Todo mês</option><option>A cada 15 dias</option></select></label><label><span>Avisar</span><select class="txt"><option>1 dia antes</option><option selected>3 dias antes</option><option>7 dias antes</option></select></label></div>
 <label><span>Observação</span><textarea class="txt" placeholder="Pagar só depois de conferir a carga."></textarea></label>`:''}
 <p id="berr" style="color:var(--bad);font-size:13px" aria-live="polite"></p></div>
 <div class="acts"><button class="abtn sec" data-a="closemodal">Cancelar</button><button class="abtn pri" data-a="savebol">Salvar boleto</button></div>`;
}
const SCHED_TXT=s=>s.sched==='sempre'?'Sempre no ar':s.sched==='diario'?'Todo dia às '+s.hora:s.sched==='semana'?s.dias.map(d=>WD[d]).join(', ')+' às '+s.hora:'Em '+s.data;
function pgStories(){
 const wk=[1,2,3,4,5,6,0];
 return `<div class="tools"><span style="color:var(--ink-2);font-size:14px">Suba vídeos já editados e escolha quando cada um aparece no app.</span><span style="flex:1"></span><label class="abtn pri" style="cursor:pointer">${ic('upload')}Adicionar vídeos<input type="file" accept="video/*,image/*" multiple class="sr" id="stfile"></label></div>
 <div class="stgrid">${S.stories.map(s=>`<article class="stc"><div class="v" style="${s.video?'':bg(s.img)}">${s.video?`<video src="${s.video}" muted playsinline loop autoplay></video>`:''}<span class="st ${s.ativo?'ok':'mute'}">${s.ativo?(s.sched==='sempre'?'No ar':'Programado'):'Pausado'}</span><span class="dur">${s.dur}s</span></div>
 <div class="in"><b>${esc(s.titulo)}</b><span>${SCHED_TXT(s)}</span><div class="row"><button class="abtn sm sec" style="flex:1;justify-content:center" data-a="editst" data-id="${s.id}">${ic('clock')}Programar</button><button class="switch" role="switch" aria-checked="${s.ativo}" aria-label="${s.ativo?'Pausar':'Ativar'} ${esc(s.titulo)}" data-a="togst" data-id="${s.id}"><span class="knob"></span></button></div></div></article>`).join('')}
 <label class="stc add" style="cursor:pointer">${ic('upload')}Arraste os vídeos aqui<span style="font-weight:500;font-size:13px">MP4 vertical, até 60 segundos</span><input type="file" accept="video/*,image/*" multiple class="sr" id="stfile2"></label></div>
 <section class="panel" style="margin-top:14px"><div class="panel-h"><div><h2>Esta semana no app</h2><p>O que cada dia mostra, pela programação acima</p></div></div>
 <div class="week">${wk.map(d=>`<div class="d"><b>${WD[d]}</b>${S.stories.filter(s=>s.ativo&&(s.sched==='sempre'||s.sched==='diario'||(s.sched==='semana'&&s.dias.includes(d)))).map(s=>`<i title="${esc(s.titulo)}">${s.sched==='sempre'?'O dia todo':s.hora} ${esc(s.label)}</i>`).join('')}</div>`).join('')}</div></section>`;
}
function modalStory(id){
 const s=S.stories.find(x=>x.id===id);
 return `<h2>Programar story</h2><p class="sub">${esc(s.titulo)}</p>
 <div class="form"><label><span>Título no app</span><input class="txt" id="sttit" value="${esc(s.titulo)}"></label><label><span>Etiqueta da bolinha</span><input class="txt" id="stlab" value="${esc(s.label)}" maxlength="12"></label>
 <fieldset style="border:0"><legend style="font-size:13px;font-weight:700;color:var(--ink-2);margin-bottom:6px">Quando aparece</legend>
 ${[['sempre','Sempre no ar, até eu trocar'],['diario','Todos os dias, a partir de um horário'],['semana','Só em alguns dias da semana']].map(([k,l])=>`<label class="check"><input type="radio" name="sched" value="${k}" ${s.sched===k?'checked':''} data-a="stsched">${l}</label>`).join('')}</fieldset>
 <div id="stdias" style="${s.sched==='semana'?'':'display:none'}"><span style="font-size:13px;font-weight:700;color:var(--ink-2);display:block;margin-bottom:6px">Dias</span><div class="wrap">${[1,2,3,4,5,6,0].map(d=>`<label class="chip" style="cursor:pointer"><input type="checkbox" value="${d}" ${s.dias.includes(d)?'checked':''} style="accent-color:var(--accent-fill)" class="stdia"> ${WD[d]}</label>`).join('')}</div></div>
 <div class="two" id="sthora" style="${s.sched==='sempre'?'display:none':''}"><label><span>Horário de entrada</span><input class="txt" type="time" id="sth" value="${s.hora||'09:00'}"></label><label><span>Fica no ar por</span><select class="txt"><option>24 horas</option><option>12 horas</option><option>Até o fim do dia</option></select></label></div></div>
 <div class="acts"><button class="abtn sec" data-a="closemodal">Cancelar</button><button class="abtn pri" data-a="savest" data-id="${id}">Salvar programação</button></div>`;
}
function pgClientes(){
 let l=S.clients;if(isV())l=l.filter(c=>c.vend===ME_V);
 return `<section class="panel"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Cliente</th><th>WhatsApp</th><th>Vendedor</th><th class="r">Pedidos</th><th class="r">Total comprado</th><th>Última compra</th><th></th></tr></thead><tbody>
 ${l.map(c=>`<tr><td><b>${esc(c.nome)}</b></td><td class="tnum">${c.fone}</td><td>${vById(c.vend).nome}</td><td class="r tnum">${c.ped}</td><td class="r tnum">${brl(c.tot)}</td><td>${c.ult}</td><td class="r"><a class="abtn sm sec" href="${'https://wa.me/55'+c.fone.replace(/\D/g,'')}" target="_blank" rel="noopener">${ic('wa')}Chamar</a></td></tr>`).join('')}</tbody></table></div></section>`;
}
function pgConfig(){
 const perms=[['Vender e criar orçamentos',1,1],['Cancelar pedidos',1,1],['Agendar visitas',1,1],['Ver estoque',1,1],['Editar produtos e preços',1,0],['Ver caixa e relatórios',1,0],['Boletos',1,0],['Stories',1,0],['Criar contas de vendedor',1,0]];
 return `<div class="cols eq"><section class="panel"><div class="panel-h"><h2>Dados da loja</h2></div><div class="form" style="margin-top:0">
 <label><span>Nome</span><input class="txt" value="O Rei do Piso"></label><div class="two"><label><span>Telefone</span><input class="txt" value="(19) 3302-8205"></label><label><span>WhatsApp principal</span><input class="txt" value="(19) 99428-6112"></label></div>
 <div class="two"><label><span>Instagram</span><input class="txt" value="@oreidopisopiracicaba"></label><label><span>Cidade</span><input class="txt" value="Piracicaba, SP"></label></div>
 <label><span>Frase da loja</span><input class="txt" value="Garante o menor preço!"></label></div></section>
 <section class="panel"><div class="panel-h"><div><h2>Acessos</h2><p>O que cada perfil pode fazer no sistema</p></div></div>
 <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Permissão</th><th>Administrador</th><th>Vendedor</th></tr></thead><tbody>${perms.map(([l,a,v])=>`<tr><td>${l}</td><td>${a?`<span class="st ok">Sim</span>`:''}</td><td>${v?`<span class="st ok">Sim</span>`:`<span class="st mute">Não</span>`}</td></tr>`).join('')}</tbody></table></div></section></div>
 <div class="cols eq"><section class="panel"><div class="panel-h"><h2>Vendedores no WhatsApp</h2></div>${VEND.map(v=>`<div class="list-row">${avatar(v)}<div class="tx"><b>${v.nome}</b><span>${v.esp}</span></div><span class="tnum" style="font-size:14px">(19) 99428-6112</span></div>`).join('')}<div class="note" style="margin-top:14px">No mostruário todos usam o número da loja. Na versão final cada vendedor recebe no próprio WhatsApp.</div></section>
 <section class="panel"><div class="panel-h"><h2>Ver na minha casa (IA)</h2></div><div class="form" style="margin-top:0"><label class="check"><input type="checkbox" checked> Mostrar o botão nos produtos com textura cadastrada</label><label class="check"><input type="checkbox" checked> Pedir o WhatsApp do cliente depois da 3ª prévia</label><label class="check"><input type="checkbox"> Enviar a prévia para o vendedor junto com o orçamento</label><label><span>Limite de prévias por cliente por dia</span><select class="txt"><option>5</option><option selected>10</option><option>Sem limite</option></select></label></div></section></div>`;
}
function modalVend(){return `<h2>Criar conta de vendedor</h2><p class="sub">O vendedor entra no mesmo painel, só com o que precisa para vender.</p>
 <div class="form"><label><span>Nome</span><input class="txt" placeholder="Wesley Santos"></label><div class="two"><label><span>E-mail de acesso</span><input class="txt" type="email" placeholder="wesley@reidopiso.com.br"></label><label><span>WhatsApp</span><input class="txt" type="tel" placeholder="(19) 99999-0000"></label></div>
 <div class="two"><label><span>Especialidade</span><input class="txt" placeholder="Porcelanato e áreas grandes"></label><label><span>Meta do mês</span><input class="txt" inputmode="decimal" value="90.000,00"></label></div>
 <div><span style="font-size:13px;font-weight:700;color:var(--ink-2);display:block;margin-bottom:4px">Pode</span>
 ${['Vender e criar orçamentos','Cancelar pedidos','Agendar visitas','Ver estoque'].map(l=>`<label class="check"><input type="checkbox" checked> ${l}</label>`).join('')}
 ${['Ver caixa e relatórios','Boletos','Editar produtos e preços'].map(l=>`<label class="check locked"><input type="checkbox" disabled> ${l} (só administrador)</label>`).join('')}</div></div>
 <div class="acts"><button class="abtn sec" data-a="closemodal">Cancelar</button><button class="abtn pri" data-a="savevend">Criar conta e enviar convite</button></div>`}
function modalAval(id){const v=vById(id);return `<h2>Avaliar ${v.nome}</h2><p class="sub">Só você vê esta avaliação. Ela soma com a nota que os clientes dão.</p>
 <div class="form">${['Atendimento','Conhecimento dos produtos','Agilidade no WhatsApp','Organização da agenda'].map(l=>`<div><span style="font-size:13px;font-weight:700;color:var(--ink-2)">${l}</span><div class="wrap" style="margin-top:6px" role="radiogroup" aria-label="${l}">${[1,2,3,4,5].map(n=>`<button class="chip" data-a="star" aria-pressed="${n<=4}">${n} ★</button>`).join('')}</div></div>`).join('')}
 <label><span>Comentário</span><textarea class="txt" placeholder="Fechou bem as obras grandes deste mês."></textarea></label></div>
 <div class="acts"><button class="abtn sec" data-a="closemodal">Cancelar</button><button class="abtn pri" data-a="saveaval" data-n="${v.nome}">Salvar avaliação</button></div>`}
function modalVenda(){return `<h2>Nova venda</h2><p class="sub">Monte o pedido no balcão ou pelo telefone.</p>
 <div class="form"><label><span>Cliente</span><input class="txt" placeholder="Nome ou WhatsApp"></label><label><span>Produto</span><select class="txt">${PRODUTOS.map(p=>`<option>${p.nome} ${p.tam}</option>`).join('')}</select></label>
 <div class="two"><label><span>Quantidade (m² ou unidades)</span><input class="txt" inputmode="decimal" placeholder="24"></label><label><span>Pagamento</span><select class="txt"><option>Pix</option><option>Cartão de crédito</option><option>Cartão de débito</option><option>Dinheiro</option><option>Boleto</option><option>Só orçamento</option></select></label></div></div>
 <div class="acts"><button class="abtn sec" data-a="closemodal">Cancelar</button><button class="abtn pri" data-a="savevenda">Registrar venda</button></div>`}
function modalAg(){return `<h2>Agendar visita</h2><div class="form"><label><span>Cliente</span><input class="txt" placeholder="Nome do cliente"></label><div class="two"><label><span>Tipo</span><select class="txt"><option>Visita à loja</option><option>Medição em casa</option></select></label><label><span>Vendedor</span><select class="txt">${VEND.map(v=>`<option ${isV()&&v.id===ME_V?'selected':''}>${v.nome}</option>`).join('')}</select></label></div>
 <div class="two"><label><span>Dia</span><input class="txt" type="date" value="2026-11-10"></label><label><span>Horário</span><input class="txt" type="time" value="11:30"></label></div></div>
 <div class="acts"><button class="abtn sec" data-a="closemodal">Cancelar</button><button class="abtn pri" data-a="saveag">Agendar</button></div>`}

let lastFocus=null;
function openModal(html){lastFocus=document.activeElement;$('#modal').innerHTML=html;const h=$('#modal h2');if(h){h.id='mtitle';$('#modal').setAttribute('aria-labelledby','mtitle')}$('#mw').classList.add('on');setTimeout(()=>{const f=$('#modal input,#modal select,#modal button');f&&f.focus()},30)}
function closeModal(){if(!$('#mw').classList.contains('on'))return;$('#mw').classList.remove('on');lastFocus&&lastFocus.focus&&document.contains(lastFocus)&&lastFocus.focus()}
function openDrawer(html){lastFocus=document.activeElement;setTimeout(()=>{const f=$('#drawer button');f&&f.focus()},40);$('#drawer').innerHTML=html;$('#drawer').classList.add('on');$('#mw2').classList.add('on')}
function closeDrawer(){if(!$('#drawer').classList.contains('on'))return;$('#drawer').classList.remove('on');$('#mw2').classList.remove('on');lastFocus&&document.contains(lastFocus)&&lastFocus.focus()}
function toastA(t,s){const el=$('#atoast');el.innerHTML=`<span class="dot"></span><div><b>${t}</b>${s?`<span style="color:var(--ink-2)">${s}</span>`:''}</div>`;el.classList.add('on');LG.apply(el.parentElement);clearTimeout(el._h);el._h=setTimeout(()=>el.classList.remove('on'),4200)}

const SUBS={entregas:()=>'Entregas programadas por dia. Toque no endereço para abrir no Google Maps.',inicio:v=>v?'Suas vendas e visitas de hoje.':'Segunda, 9 de novembro. Bom movimento até agora.',pedidos:()=>'Tudo que entrou pelo app, pelo balcão e pelo WhatsApp.',agenda:()=>'Visitas à loja e medições em casa.',produtos:v=>v?'Consulte estoque e preços.':'Vitrine do app, estoque e dados para a IA.',stories:()=>'Suba vídeos e programe quando aparecem.',clientes:()=>'Quem já comprou ou pediu orçamento.',vendedores:()=>'Novembro, até hoje.',caixa:()=>'Hoje, segunda-feira.',boletos:()=>'Contas da loja com lembrete.',config:()=>'Loja, acessos e IA.'};
function renderAdmin(){
 const nav=isV()?NAV_VEND:NAV_ADMIN;const allowed=nav.flatMap(g=>g[1].map(i=>i[0]));if(!allowed.includes(A.page))A.page='inicio';
 const pg={inicio:pgInicio,pedidos:pgPedidos,agenda:pgAgenda,entregas:pgEntregas,produtos:pgProdutos,stories:pgStories,clientes:pgClientes,vendedores:pgVendedores,caixa:pgCaixa,boletos:pgBoletos,config:pgConfig}[A.page]();
 const me=isV()?vById(ME_V):{nome:'Rei',cor:'#2E3A93'};
 const novos=S.orders.filter(o=>o.novo).length;
 $('#aapp').innerHTML=`<div class="adm"><aside class="side" aria-label="Menu do painel"><div class="brand"><span class="mark" aria-hidden="true"></span><div><b>O Rei do Piso</b><span>${isV()?'Painel do vendedor':'Painel do dono'}</span></div></div>
 ${nav.flatMap(g=>g[1]).map(([k,i,l])=>`<button class="nav-i" data-a="page" data-p="${k}" ${A.page===k?'aria-current="page"':''}>${ic(i,2)}${l}${k==='pedidos'&&novos?`<span class="cnt">${novos}</span>`:''}</button>`).join('')}
 <div class="open"><div class="row">Loja aberta<button class="switch" role="switch" aria-checked="${A.open!==false}" aria-label="Loja aberta para pedidos" data-a="togopen"><span class="knob"></span></button></div><p>${A.open===false?'O app mostra a loja fechada e não recebe pedidos.':'O app recebe pedidos e agendamentos.'}</p></div></aside>
 <main class="main" id="amain"><div class="mtop"><div class="ttl"><h1>${TITLES[A.page](isV())}</h1><p>${SUBS[A.page](isV())}</p></div><button class="iconbtn lg press" aria-label="Avisos" data-a="page" data-p="pedidos">${ic('bell',2)}</button><div class="me">${avatar(me,44)}</div></div>${pg}</main>
 <nav class="mob-nav lg bar" data-blur="8" aria-label="Menu do painel">${nav.flatMap(g=>g[1]).map(([k,i,l])=>`<button data-a="page" data-p="${k}" ${A.page===k?'aria-current="page"':''}>${ic(i,2)}${l.split(' ')[0]}</button>`).join('')}</nav></div>`;
 bindCharts();bindSwitches($('#aapp'));LG.apply($('#aapp'));
 if(S.notif.length){const n=S.notif.splice(0);setTimeout(()=>toastA(n[n.length-1].t,n[n.length-1].s),350)}
}
function bindSwitches(root){root.querySelectorAll('.switch').forEach(sw=>{const k=sw.querySelector('.knob');if(!k)return;
 const on=()=>{sw.classList.add('pressing');k.classList.add('lg','lg-lens');LG.apply(sw)};const off=()=>{setTimeout(()=>{sw.classList.remove('pressing');k.classList.remove('lg','lg-lens');const fx=k.querySelector('.lg-fx');fx&&fx.remove()},180)};
 sw.addEventListener('pointerdown',on);sw.addEventListener('pointerup',off);sw.addEventListener('pointerleave',off);sw.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){on();off()}})})}
function bindCharts(){
 document.querySelectorAll('#aapp .chart').forEach(ch=>{
  const data=JSON.parse(ch.dataset.chart),svg=ch.querySelector('svg'),tip=ch.querySelector('.tip'),W=+ch.dataset.w,pl=+ch.dataset.pl,pr=+ch.dataset.pr;
  const hit=svg.querySelector('.hit'),cr=svg.querySelector('.cross'),dot=svg.querySelector('.dotc');
  const move=e=>{const r=svg.getBoundingClientRect();const sx=(e.clientX-r.left)/r.width*W;const i=Math.max(0,Math.min(data.length-1,Math.round((sx-pl)/((W-pl-pr)/(data.length-1)))));
   const x=pl+i*(W-pl-pr)/(data.length-1);const y=+ch.dataset.ys.split(',')[i];
   cr.setAttribute('x1',x);cr.setAttribute('x2',x);cr.style.opacity=1;dot.setAttribute('cx',x);dot.setAttribute('cy',y);dot.style.opacity=1;
   tip.innerHTML=`<b>${brl0(data[i][1])}</b>${data[i][0]}`;tip.style.left=(x/W*100)+'%';tip.style.top=(y/svg.viewBox.baseVal.height*r.height)+'px';tip.style.opacity=1};
  hit.addEventListener('pointermove',move);hit.addEventListener('pointerleave',()=>{tip.style.opacity=0;cr.style.opacity=0;dot.style.opacity=0});
 });
}

function adminClick(e){
 const b=e.target.closest('[data-a]');if(!b)return;const k=b.dataset.a,d=b.dataset;
 switch(k){
  case 'page':A.page=d.p;S.orders.forEach(o=>{if(d.p==='pedidos')setTimeout(()=>o.novo=false,4000)});renderAdmin();window.scrollTo(0,0);break;
  case 'fped':A.filtroPed=d.v;renderAdmin();break;
  case 'cper':A.caixaPer=d.v;renderAdmin();toastA('Mostrando '+d.v.toLowerCase(),'No mostruário os lançamentos são os de hoje.');break;
  case 'cancel':{const o=S.orders.find(x=>x.id==d.id);o.status='Cancelado';renderAdmin();toastA('Pedido #'+o.id+' cancelado','O cliente recebe o aviso no WhatsApp.');break}
  case 'editprod':openDrawer(drawerProd(d.id));break;
  case 'ptab':$('#drawer').innerHTML=drawerProd(d.id,d.v);break;
  case 'closedrawer':closeDrawer();break;
  case 'saveprod':closeDrawer();toastA('Produto salvo','A vitrine do app já mostra a mudança.');break;
  case 'novobol':openModal(modalBoleto());break;
  case 'bmode':A.boletoMode=d.v;const keep={e:$('#bemp').value,v:$('#bval').value};openModal(modalBoleto());$('#bemp').value=keep.e;$('#bval').value=keep.v;break;
  case 'savebol':{const emp=$('#bemp').value.trim(),val=parseFloat(($('#bval').value||'').replace(/\./g,'').replace(',','.'));
   if(!emp||!val){$('#berr').textContent=!emp?'Informe a empresa.':'Informe o valor.';return}
   const dt=new Date($('#bven').value+'T12:00');const off=Math.round((dt-today)/864e5);
   S.boletos.push({id:'b'+Date.now(),emp,valor:val,venc:off,status:'aberto',cat:$('#bcat')?$('#bcat').value:'Outro',doc:$('#bdoc')?$('#bdoc').value:''});closeModal();renderAdmin();toastA('Boleto salvo',emp+', vence em '+fmtD(dt));break}
  case 'pagobol':{const bo=S.boletos.find(x=>x.id===d.id);bo.status='pago';S.caixa.unshift({h:'Agora',d:'Boleto '+bo.emp,f:'Pix',v:-bo.valor});renderAdmin();toastA('Boleto pago',bo.emp+' saiu do caixa.');break}
  case 'closemodal':closeModal();break;
  case 'rmfoto':{const p=pById(d.id);p.fotos.splice(+d.k,1);$('#drawer').innerHTML=drawerProd(d.id,'fotos');break}
  case 'entdia':A.entDia=+d.v;renderAdmin();break;
  case 'novaent':openModal(modalEnt(''));break;
  case 'editent':openModal(modalEnt(d.id));break;
  case 'entst':{const e=S.entregas.find(x=>x.id===d.id);e.status=d.v;closeModal();renderAdmin();toastA(d.v==='Entregue'?'Entrega confirmada':d.v==='Cancelada'?'Entrega cancelada':'Saiu para entrega',e.cli+(d.v==='Saiu para entrega'?'. O cliente recebe o aviso no WhatsApp.':''));break}
  case 'saveent':{const g=id=>$('#'+id).value.trim();const cli=g('ecli'),end=g('eend'),hora=g('ehora'),fone=g('efone');
   const err=!cli?'Informe o cliente.':!end?'Informe o endereço.':!hora?'Informe o horário.':fone.replace(/\D/g,'').length<10?'Informe o WhatsApp com DDD.':'';if(err){$('#eerr').textContent=err;return}
   const dia=Math.round((new Date(g('edia')+'T12:00')-today)/864e5);const v={cli,fone,end,bairro:g('ebai'),hora,dia,itens:g('eitens'),obs:g('eobs'),vend:$('#evend').value};
   if(d.id)Object.assign(S.entregas.find(x=>x.id===d.id),v);else S.entregas.push({id:'e'+Date.now(),status:'Programada',...v});
   A.entDia=dia;closeModal();renderAdmin();toastA(d.id?'Entrega atualizada':'Entrega programada',cli+', '+(dia===0?'hoje':fmtD(dOff(dia)))+' às '+hora);break}
  case 'togopen':A.open=A.open===false;b.setAttribute('aria-checked',A.open);setTimeout(()=>{renderAdmin();toastA(A.open?'Loja aberta':'Loja fechada',A.open?'O app voltou a receber pedidos.':'O app mostra a loja fechada.')},420);break;
  case 'togst':{const s=S.stories.find(x=>x.id===d.id);s.ativo=!s.ativo;b.setAttribute('aria-checked',s.ativo);setTimeout(()=>renderAdmin(),440);toastA(s.ativo?'Story ativado':'Story pausado',s.ativo?'Já aparece no app do cliente.':'Saiu do app do cliente.');break}
  case 'editst':openModal(modalStory(d.id));break;
  case 'stsched':{const v=b.value;$('#stdias').style.display=v==='semana'?'':'none';$('#sthora').style.display=v==='sempre'?'none':'';break}
  case 'savest':{const s=S.stories.find(x=>x.id===d.id);s.titulo=$('#sttit').value;s.label=$('#stlab').value;s.sched=document.querySelector('input[name=sched]:checked').value;s.hora=$('#sth').value;s.dias=[...document.querySelectorAll('.stdia:checked')].map(x=>+x.value);if(s.sched==='semana'&&!s.dias.length)s.dias=[1];closeModal();renderAdmin();toastA('Programação salva',SCHED_TXT(s));break}
  case 'novovend':openModal(modalVend());break;
  case 'savevend':closeModal();toastA('Convite enviado','O vendedor recebe o link de acesso no e-mail.');break;
  case 'avaliar':openModal(modalAval(d.id));break;
  case 'star':{const g=b.parentElement;const bs=[...g.children];const n=bs.indexOf(b);bs.forEach((x,i)=>x.setAttribute('aria-pressed',i<=n));break}
  case 'saveaval':closeModal();toastA('Avaliação salva','Entra no desempenho de '+d.n+'.');break;
  case 'novavenda':openModal(modalVenda());break;
  case 'savevenda':closeModal();toastA('Venda registrada','Ela entra no caixa e na meta do vendedor.');break;
  case 'novoag':openModal(modalAg());break;
  case 'saveag':closeModal();toastA('Visita agendada','O cliente recebe a confirmação no WhatsApp.');break;
  case 'lanc':openModal(`<h2>Lançar saída</h2><div class="form"><label><span>Descrição</span><input class="txt" placeholder="Combustível do caminhão"></label><div class="two"><label><span>Valor</span><input class="txt" inputmode="decimal" placeholder="120,00"></label><label><span>Forma</span><select class="txt"><option>Dinheiro</option><option>Pix</option></select></label></div></div><div class="acts"><button class="abtn sec" data-a="closemodal">Cancelar</button><button class="abtn pri" data-a="closemodal">Lançar</button></div>`);break;
  case 'fechar':openModal(`<h2>Fechar o caixa de hoje?</h2><p class="sub">Confira o dinheiro da gaveta antes. Depois de fechado, novos lançamentos vão para amanhã.</p><div class="acts"><button class="abtn sec" data-a="closemodal">Voltar</button><button class="abtn pri" data-a="closemodal">Fechar caixa</button></div>`);break;
  case 'export':{const t=S.caixa.map(c=>c.h+'  '+c.d+'  '+c.f+'  '+brl(c.v)).join('\n');try{navigator.clipboard.writeText(t)}catch(_){}toastA('Relatório copiado','Cole no WhatsApp ou numa planilha.');break}
 }
}
function adminChange(e){
 const t=e.target;
 if(t.id==='stfile'||t.id==='stfile2'){[...t.files].forEach((f,i)=>{const url=URL.createObjectURL(f);const isV=f.type.startsWith('video');S.stories.push({id:'s'+Date.now()+i,titulo:f.name.replace(/\.[^.]+$/,'').slice(0,40),txt:'',img:isV?'':url,video:isV?url:'',label:'Novo',dur:isV?15:5,sched:'sempre',hora:'',dias:[],ativo:true})});renderAdmin();toastA(t.files.length+(t.files.length>1?' vídeos adicionados':' vídeo adicionado'),'Já estão no ar. Toque em Programar para escolher o horário.')}
}

document.addEventListener('change',e=>{if(e.target.id==='ecli'){const c=S.clients.find(x=>x.nome===e.target.value);if(c&&!$('#efone').value)$('#efone').value=c.fone}});

document.addEventListener('change',e=>{if(e.target.id==='pfotos'){const p=pById(e.target.dataset.id);if(!p)return;p.fotos=p.fotos||[];[...e.target.files].forEach(f=>p.fotos.push(URL.createObjectURL(f)));$('#drawer').innerHTML=drawerProd(p.id,'fotos');toastA('Fotos adicionadas','Já aparecem na galeria do produto no app.')}});
