/* ===== ícones ===== */
const P={
home:'<path d="M5 12l-2 0l9 -9l9 9l-2 0"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>',
grid:'<path d="M4 4h6v6h-6z"/><path d="M14 4h6v6h-6z"/><path d="M4 14h6v6h-6z"/><path d="M14 14h6v6h-6z"/>',
receipt:'<path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h4"/>',
calendar:'<path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M4 11h16"/>',
help:'<path d="M8 9h8"/><path d="M8 13h6"/><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"/>',
search:'<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M21 21l-6 -6"/>',
filter:'<path d="M4 6h16"/><path d="M7 12h10"/><path d="M10 18h4"/>',
back:'<path d="M15 6l-6 6l6 6"/>',
right:'<path d="M9 6l6 6l-6 6"/>',
x:'<path d="M18 6l-12 12"/><path d="M6 6l12 12"/>',
heart:'<path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>',
camera:'<path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2"/><path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/>',
wand:'<path d="M6 21l15 -15l-3 -3l-15 15l3 3"/><path d="M15 6l3 3"/><path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"/><path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"/>',
check:'<path d="M5 12l5 5l10 -10"/>',
wa:'<path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"/><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"/>',
pix:'<path d="M12 3l4 4l-4 4l-4 -4z"/><path d="M12 13l4 4l-4 4l-4 -4z"/><path d="M3 12l4 -4l4 4l-4 4z" opacity=".55"/><path d="M13 12l4 -4l4 4l-4 4z" opacity=".55"/>',
card:'<path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"/><path d="M3 10l18 0"/><path d="M7 15l.01 0"/><path d="M11 15l2 0"/>',
store:'<path d="M3 21l18 0"/><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"/><path d="M5 21l0 -10.15"/><path d="M19 21l0 -10.15"/><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"/>',
ruler:'<path d="M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-7a1 1 0 0 0 -1 1v7a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1"/><path d="M4 8l2 0"/><path d="M4 12l3 0"/><path d="M4 16l2 0"/><path d="M8 4l0 2"/><path d="M12 4l0 3"/><path d="M16 4l0 2"/>',
sun:'<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"/>',
moon:'<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>',
chart:'<path d="M3 3v18h18"/><path d="M7 15l4 -4l3 3l5 -6"/>',
box:'<path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"/><path d="M12 12l8 -4.5"/><path d="M12 12l0 9"/><path d="M12 12l-8 -4.5"/>',
users:'<path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0 -3 -3.85"/>',
cash:'<path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"/><path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"/>',
file:'<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/><path d="M9 13h1v4h-1z"/><path d="M12 13v4"/><path d="M14 13h1v4h-1z"/>',
play:'<path d="M7 4v16l13 -8z"/>',
pause:'<path d="M6 5h4v14h-4z"/><path d="M14 5h4v14h-4z"/>',
stories:'<path d="M4 6a2 2 0 0 1 2 -2h3v16h-3a2 2 0 0 1 -2 -2z"/><path d="M12 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-6z"/><path d="M15 10l2 2l-2 2"/>',
settings:'<path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/>',
user:'<path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>',
bell:'<path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"/><path d="M9 17v1a3 3 0 0 0 6 0v-1"/>',
plus:'<path d="M12 5l0 14"/><path d="M5 12l14 0"/>',
lock:'<path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"/><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"/><path d="M8 11v-4a4 4 0 1 1 8 0v4"/>',
edit:'<path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"/><path d="M13.5 6.5l4 4"/>',
trash:'<path d="M4 7l16 0"/><path d="M10 11l0 6"/><path d="M14 11l0 6"/><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>',
clock:'<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/><path d="M12 7v5l3 3"/>',
truck:'<path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"/>',
upload:'<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/><path d="M7 9l5 -5l5 5"/><path d="M12 4l0 12"/>',
photo:'<path d="M15 8h.01"/><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"/><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"/><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"/>',
pin:'<path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"/>',
logout:'<path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"/><path d="M9 12h12l-3 -3"/><path d="M18 15l3 -3"/>',
star:'<path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>',
alert:'<path d="M12 9v4"/><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z"/><path d="M12 16h.01"/>',
};
const ic=(n,w)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w||1.8}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]||''}</svg>`;
const brl=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const brl0=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const num=(v,d=2)=>v.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const bg=k=>`background-image:url(${IMG[k]||k})`;
const $=s=>document.querySelector(s);
const WA_NUM='5519994286112';
const waLink=t=>'https://wa.me/'+WA_NUM+'?text='+encodeURIComponent(t);
const SIL='<svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true" style="border-radius:50%"><circle cx="20" cy="16" r="7" fill="rgba(255,255,255,.85)"/><path d="M7 36c1.5-7 6.5-10 13-10s11.5 3 13 10" fill="rgba(255,255,255,.85)"/></svg>';
const avatar=(p,sz)=>`<div class="av" style="background:${p.cor}${sz?';width:'+sz+'px;height:'+sz+'px':''}" aria-hidden="true">${SIL}</div>`;

/* ===== dados de exemplo ===== */
const PRODUTOS=[
 {id:'p1',nome:'Porcelanato Calacata Gold',tipo:'Porcelanato',cor:'Branco',tam:'90×90',acab:'Polido',preco:119.9,cx:1.62,un:'m2',tex:'calacata',est:420,apl:'Chão e parede',tile:180,tag:'Novo',desc:'Mármore branco com veios cinza. Peça grande, poucas juntas, cara de projeto.'},
 {id:'p2',nome:'Porcelanato Cimento Urbano',tipo:'Porcelanato',cor:'Cinza',tam:'60×60',acab:'Acetinado',preco:54.9,cx:2.16,un:'m2',tex:'cimento',est:1280,apl:'Chão e parede',tile:120,desc:'Efeito cimento queimado sem trinca e sem manutenção. Antiderrapante leve.'},
 {id:'p3',nome:'Vinílico Carvalho Natural',tipo:'Vinílico',cor:'Madeira',tam:'20×120',acab:'Fosco',preco:79.9,cx:2.4,un:'m2',tex:'carvalho',est:610,apl:'Chão',tile:220,desc:'Clicado, instala sobre o piso antigo. Silencioso e confortável para quarto e sala.'},
 {id:'p4',nome:'Laminado Freijó Claro',tipo:'Laminado',cor:'Bege',tam:'19×136',acab:'Fosco',preco:64.9,cx:2.58,un:'m2',tex:'freijo',est:340,apl:'Chão',tile:220,desc:'Madeira clara com textura sincronizada. Para áreas secas.'},
 {id:'p5',nome:'Porcelanato Nero Marquina',tipo:'Porcelanato',cor:'Preto',tam:'60×120',acab:'Polido',preco:139.9,cx:1.44,un:'m2',tex:'nero',est:96,apl:'Chão e parede',tile:170,tag:'-15%',old:164.6,desc:'Preto profundo com veios dourados. Fica bonito em lavabo e bancada.'},
 {id:'p6',nome:'Porcelanato Travertino Romano',tipo:'Porcelanato',cor:'Bege',tam:'60×120',acab:'Acetinado',preco:89.9,cx:1.44,un:'m2',tex:'travertino',est:510,apl:'Chão e parede',tile:170,desc:'Tom de pedra natural, quente e claro. Combina com madeira.'},
 {id:'p7',nome:'Granilite Piracicaba',tipo:'Porcelanato',cor:'Branco',tam:'60×60',acab:'Acetinado',preco:72.9,cx:2.16,un:'m2',tex:'granilite',est:220,apl:'Chão',tile:130,desc:'Fundo claro com pedrinhas coloridas. Divertido para cozinha e área.'},
 {id:'p8',nome:'Ladrilho Hidráulico Anil',tipo:'Revestimento',cor:'Azul',tam:'20×20',acab:'Fosco',preco:149.9,cx:1,un:'m2',tex:'hidraulico',est:84,apl:'Chão e parede',tile:110,desc:'Desenho geométrico em azul anil. Ótimo para faixa de cozinha ou varanda.'},
 {id:'p9',nome:'Revestimento Ripado 3D',tipo:'Revestimento',cor:'Branco',tam:'30×60',acab:'Fosco',preco:99.9,cx:1.08,un:'m2',tex:'ripado3d',est:190,apl:'Parede',tile:120,desc:'Relevo em ripas que cria sombra na parede da TV ou da cabeceira.'},
 {id:'p10',nome:'Metrô Azul Névoa',tipo:'Revestimento',cor:'Azul',tam:'7,5×15',acab:'Brilhante',preco:69.9,cx:1,un:'m2',tex:'metro',est:150,apl:'Parede',tile:130,desc:'Tijolinho esmaltado azul bem claro. Clássico de cozinha e banheiro.'},
 {id:'p11',nome:'Vinílico Imbuia Escura',tipo:'Vinílico',cor:'Madeira',tam:'18×122',acab:'Fosco',preco:84.9,cx:2.23,un:'m2',tex:'imbuia',est:12,apl:'Chão',tile:220,desc:'Madeira escura e elegante. Estoque baixo: confira antes de fechar.'},
 {id:'p12',nome:'Nicho em porcelanato Calacata',tipo:'Nicho',cor:'Branco',tam:'30×60',acab:'Polido',preco:189.9,cx:1,un:'un',tex:'nicho',est:38,apl:'Parede',tile:0,desc:'Nicho pronto para embutir no box, com prateleira. Acabamento em meia-esquadria.'},
];
const COR_HEX={Branco:'#EDEBE6',Cinza:'#8E8E8C',Bege:'#CDB896',Madeira:'#9A6C45',Preto:'#232326',Azul:'#3B4CB0'};
const VEND=[
 {id:'v1',nome:'Wesley',esp:'Porcelanato e áreas grandes',on:true,cor:'#3F51C4',vendas:86420,qtd:41,conv:38,nota:4.9,cancel:1,ag:18,meta:90000},
 {id:'v2',nome:'Paulo',esp:'Vinílico e laminado',on:false,cor:'#2A8A6A',vendas:61180,qtd:33,conv:31,nota:4.7,cancel:3,ag:12,meta:90000},
 {id:'v3',nome:'Ingrid',esp:'Revestimentos e nichos',on:true,cor:'#B5527A',vendas:94760,qtd:46,conv:42,nota:4.9,cancel:0,ag:22,meta:90000},
];
const AVAL=[
 {nome:'Carla M.',bairro:'Nova América',txt:'Fiz a sala e a cozinha. O Wesley calculou tudo certinho e não sobrou caixa.',n:5},
 {nome:'Rogério T.',bairro:'Paulista',txt:'Preço bem melhor que no shopping e a entrega veio no dia marcado.',n:5},
 {nome:'Juliana S.',bairro:'Vila Rezende',txt:'Usei o ver na minha casa e mostrei pro meu marido antes de comprar. Ajudou muito.',n:5},
 {nome:'Marcos A.',bairro:'Piracicamirim',txt:'Atendimento rápido pelo WhatsApp. A Ingrid achou o nicho no tamanho que eu precisava.',n:4},
];
const today=new Date(2026,10,9);
const dOff=n=>{const d=new Date(today);d.setDate(d.getDate()+n);return d};
const fmtD=d=>d.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'});
const WD=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

const S={
 mode:'cliente',theme:'dark',
 c:{screen:'inicio',hist:[],tipo:'Todos',cores:[],tams:[],max:200,q:'',prod:null,calc:{modo:'medidas',l:3.5,c:4.2,a:14.7,perda:10,un:1},
    cart:[{id:'p2',q:7},{id:'p12',q:1}],pay:'pix',parc:3,ag:{tipo:'loja',dia:1,hora:null,vend:'',nome:'',fone:''},
    ar:{photo:null,sample:true,target:'chao',prod:'p1',state:'idle',cut:50},seenStories:{}},
 a:{page:'inicio',role:'admin',boletoMode:'simples',filtroPed:'Todos',caixaPer:'Hoje'},
 stories:[
  {id:'s1',titulo:'Chegou o Calacata Gold',txt:'Peça 90×90 polida, pronta entrega no pátio.',img:'calacata',label:'Novidade',dur:5,sched:'sempre',hora:'',dias:[],ativo:true},
  {id:'s2',titulo:'O pátio está cheio',txt:'Venha ver as peças de perto. Estacione aqui dentro.',img:'fachada',label:'Loja',dur:5,sched:'diario',hora:'08:00',dias:[],ativo:true},
  {id:'s3',titulo:'Nero Marquina com 15% de desconto',txt:'Até sábado, pagando no Pix.',img:'nero',label:'Oferta',dur:5,sched:'semana',hora:'12:00',dias:[1,3,5],ativo:true},
  {id:'s4',titulo:'Quanto piso comprar?',txt:'Some 10% para recortes e quebras. A calculadora do app já faz a conta.',img:'hidraulico',label:'Dica',dur:6,sched:'sempre',hora:'',dias:[],ativo:true},
  {id:'s5',titulo:'Vinílico que instala em um dia',txt:'Sem quebra-quebra, por cima do piso antigo.',img:'carvalho',label:'Vinílico',dur:5,sched:'diario',hora:'18:00',dias:[],ativo:false},
 ],
 orders:[
  {id:1052,cli:'Fernanda Lopes',vend:'v3',itens:'Revestimento Ripado 3D, 6,48 m²',valor:647.35,forma:'Pix',status:'Pago',quando:'Hoje, 10:42'},
  {id:1051,cli:'Antônio Ribeiro',vend:'v1',itens:'Calacata Gold, 38,88 m²',valor:4661.71,forma:'Cartão 6x',status:'Separando',quando:'Hoje, 09:15'},
  {id:1050,cli:'Beatriz Nunes',vend:'v2',itens:'Vinílico Carvalho, 24 m²',valor:1917.6,forma:'Orçamento',status:'Orçamento',quando:'Hoje, 08:30'},
  {id:1049,cli:'Construtora Monte Alegre',vend:'v1',itens:'Cimento Urbano, 162 m²',valor:8893.8,forma:'Boleto 28 dias',status:'Aguardando pagamento',quando:'Ontem, 17:20'},
  {id:1048,cli:'Lucas Pereira',vend:'v3',itens:'Nicho Calacata, 2 un',valor:379.8,forma:'Dinheiro',status:'Entregue',quando:'Ontem, 14:02'},
  {id:1047,cli:'Patrícia Gomes',vend:'v2',itens:'Laminado Freijó, 30,96 m²',valor:2009.3,forma:'Cartão 3x',status:'Cancelado',quando:'07/11, 11:40'},
  {id:1046,cli:'Rafael Souza',vend:'v1',itens:'Travertino Romano, 20,16 m²',valor:1812.38,forma:'Pix',status:'Entregue',quando:'07/11, 09:05'},
 ],
 entregas:[
  {id:'e1',dia:0,hora:'10:30',cli:'Antônio Ribeiro',fone:'(19) 98877-1203',end:'Rua Moraes Barros, 1250',bairro:'Centro',ped:1051,itens:'Calacata Gold, 24 caixas',obs:'Portão azul. Ligar antes de chegar.',vend:'v1',status:'Saiu para entrega'},
  {id:'e2',dia:0,hora:'14:00',cli:'Fernanda Lopes',fone:'(19) 99701-5522',end:'Avenida Independência, 2100',bairro:'Alto',ped:1052,itens:'Ripado 3D, 6 caixas',obs:'Apartamento 52, deixar na portaria.',vend:'v3',status:'Programada'},
  {id:'e3',dia:0,hora:'16:00',cli:'Construtora Monte Alegre',fone:'(19) 99812-4410',end:'Rua do Rosário, 890',bairro:'Santa Terezinha',ped:1049,itens:'Cimento Urbano, 75 caixas',obs:'Obra. Precisa de ajudante para descarregar.',vend:'v1',status:'Programada'},
  {id:'e4',dia:1,hora:'09:00',cli:'Rafael Souza',fone:'(19) 99654-0098',end:'Rua Governador Pedro de Toledo, 455',bairro:'Paulista',ped:1046,itens:'Travertino Romano, 14 caixas',obs:'',vend:'v1',status:'Programada'},
  {id:'e5',dia:1,hora:'11:00',cli:'Lucas Pereira',fone:'(19) 98120-3344',end:'Avenida Armando de Salles Oliveira, 300',bairro:'Nova América',ped:1048,itens:'Nicho Calacata, 2 un',obs:'Entregar só depois das 10h.',vend:'v3',status:'Programada'},
 ],
 appts:[
  {dia:0,hora:'14:00',cli:'Sílvia Andrade',tipo:'Medição em casa',vend:'v1',bairro:'Jardim Europa'},
  {dia:0,hora:'16:30',cli:'Eduardo Mattos',tipo:'Visita à loja',vend:'v3',bairro:''},
  {dia:1,hora:'09:00',cli:'Construtora Monte Alegre',tipo:'Medição em casa',vend:'v1',bairro:'Santa Terezinha'},
  {dia:1,hora:'10:30',cli:'Camila Freitas',tipo:'Visita à loja',vend:'v2',bairro:''},
  {dia:2,hora:'15:00',cli:'Henrique Dias',tipo:'Visita à loja',vend:'v3',bairro:''},
 ],
 clients:[
  {nome:'Construtora Monte Alegre',fone:'(19) 99812-4410',ult:'Ontem',tot:38420,vend:'v1',ped:9},
  {nome:'Antônio Ribeiro',fone:'(19) 98877-1203',ult:'Hoje',tot:4661.71,vend:'v1',ped:1},
  {nome:'Fernanda Lopes',fone:'(19) 99701-5522',ult:'Hoje',tot:3120.4,vend:'v3',ped:3},
  {nome:'Rafael Souza',fone:'(19) 99654-0098',ult:'07/11',tot:1812.38,vend:'v1',ped:1},
  {nome:'Lucas Pereira',fone:'(19) 98120-3344',ult:'Ontem',tot:1290.6,vend:'v3',ped:2},
  {nome:'Beatriz Nunes',fone:'(19) 99233-7781',ult:'Hoje',tot:0,vend:'v2',ped:0},
  {nome:'Patrícia Gomes',fone:'(19) 98444-2109',ult:'07/11',tot:0,vend:'v2',ped:1},
 ],
 boletos:[
  {id:'b1',emp:'Argamassas Piracicaba Ltda',valor:3840,venc:0,status:'aberto',cat:'Fornecedor',doc:'NF 2231'},
  {id:'b2',emp:'Transportadora Rota 304',valor:1260,venc:2,status:'aberto',cat:'Frete',doc:''},
  {id:'b3',emp:'Cerâmica Vale do Corumbataí',valor:18950,venc:5,status:'aberto',cat:'Fornecedor',doc:'NF 88710'},
  {id:'b4',emp:'Aluguel do galpão',valor:7500,venc:11,status:'aberto',cat:'Fixo',doc:''},
  {id:'b5',emp:'Conta de energia',valor:1184.5,venc:-3,status:'pago',cat:'Fixo',doc:''},
 ],
 caixa:[
  {h:'10:42',d:'Pedido #1052, Fernanda Lopes',f:'Pix',v:647.35},
  {h:'09:58',d:'Pedido #1044, sinal de 50%',f:'Cartão de crédito',v:2150},
  {h:'09:15',d:'Pedido #1051, Antônio Ribeiro',f:'Cartão de crédito',v:4661.71},
  {h:'09:02',d:'Retirada no balcão, rejunte e argamassa',f:'Dinheiro',v:318},
  {h:'08:40',d:'Combustível do caminhão',f:'Dinheiro',v:-260},
  {h:'08:10',d:'Abertura de caixa',f:'Dinheiro',v:500,abertura:true},
 ],
 notif:[],
};
const vById=id=>VEND.find(v=>v.id===id)||{nome:'Sem vendedor',cor:'#666'};
const pById=id=>PRODUTOS.find(p=>p.id===id);
let seed=42;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
const VENDAS30=(()=>{const a=[];for(let i=0;a.length<30;i++){const d=dOff(-i);const wd=d.getDay();if(wd===0)continue;const base=wd===6?5200:8200;a.unshift({d,v:Math.round(base*(0.65+rnd()*0.8)+(40-i)*90)})}return a})();
