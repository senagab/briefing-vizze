(function(){
  // ---------- Lighting presets ----------
  var LIGHT_STANDARD = ["Spot","Trilho eletrificado","Pendente","Fita de LED","Luminária de piso/mesa"];
  var LIGHT_WET = ["Spot","Trilho eletrificado","Pendente","Fita de LED"];
  var LIGHT_WET_PLAFON = LIGHT_WET.concat(["Plafon"]);
  var LIGHT_TASK = ["Spot","Trilho eletrificado","Pendente","Fita de LED","Luminária de mesa (task light)"];

  // ---------- Shared WC item list ----------
  var WC_BASE_ITEMS = ["Ducha higiênica","Ducha higiênica aquecida","Misturador","Monocomando","Box até o teto","Box convencional","Metais cromados","Metais coloridos","Cabideiro convencional","Cabideiro aquecido","Espelheira","Banco no box"];
  var WC_MASTER_EXTRA_ITEMS = ["Banheira de hidromassagem ou imersão","Bancada dupla (dois lavatórios)"];

  var QUARTO_CATS = [
    { name:"Mobília", items:["Tapete","Cortina","Poltrona","Cadeira de escritório","Cadeira gamer","Poltrona de leitura","Recamier","Espelho de corpo","Espelho de maquiagem","Cama solteiro","Cama viúvo","Cama casal","Cama queen","Cama king","Cama beliche","Cama montessoriana","Berço"] },
    { name:"Marcenaria", items:["Mesa de estudo","Penteadeira","Cabeceira estofada","Cabeceira em MDF","Mesa de cabeceira","Mesa lateral","Painel de TV","Rack de TV"] },
    { name:"Roupeiro", items:["Aberto","Fechado","Sapateiro","Cabideiro","Nicho","Gaveteiro de longos","Gaveteiro de terno","Calceiro","Gaveta com divisória"] },
    { name:"Eletro", items:["Televisão","Desktop","Vídeo game","Frigobar","Ar condicionado split","Ar condicionado cassete"] },
    { name:"Iluminação", items:LIGHT_STANDARD }
  ];

  var SUITEMASTER_CATS = [
    { name:"Mobília", items:["Tapete","Cortina","Poltrona","Cadeira de escritório","Poltrona de leitura","Recamier","Espelho de corpo","Espelho de maquiagem","Cama casal","Cama queen","Cama king"] },
    { name:"Marcenaria", items:["Mesa de trabalho","Penteadeira","Cabeceira estofada","Cabeceira em MDF","Mesa de cabeceira","Mesa lateral","Painel de TV","Rack de TV","Cofre"] },
    { name:"Closet", items:["Aberto","Fechado","Sapateiro","Cabideiro","Nicho","Gaveteiro de longos","Gaveteiro de terno","Calceiro","Gaveta com divisória","Closet walk-in","Ilha central","Espelho no closet","Cofre"] },
    { name:"Eletro", items:["Televisão","Desktop","Frigobar","Ar condicionado split"] },
    { name:"Iluminação", items:LIGHT_STANDARD }
  ];

  var ROOM_DEFS = {
    hall: { label:"Hall", cats:[
      { name:"Mobília", items:["Espelho","Aparador","Assento","Sapateira","Pendurador para bolsas / mochilas / casacos","Tapete de entrada","Guarda-volumes","Bandeja para chaves e correspondência"] }
    ]},
    lavabo: { label:"Lavabo", cats:[
      { name:"Bancada", items:["Cuba esculpida","Cuba de sobrepor","Cuba embutida","Pedra clara","Pedra escura"] },
      { name:"Hidráulica", items:["Ducha higiênica","Ducha higiênica aquecida","Misturador","Monocomando","Metais cromados","Metais coloridos","Cabideiro convencional","Cabideiro aquecido","Espelheira"] },
      { name:"Iluminação", items:LIGHT_WET }
    ], extra:[
      { type:"twooption", label:"Vaso sanitário", a:"Convencional", b:"Suspenso" },
      { type:"twooption", label:"Descarga", a:"Válvula de descarga", b:"Caixa acoplada" }
    ]},
    living: { label:"Sala de estar / Living", cats:[
      { name:"Mobília", items:["Tapete","Cortina","Sofá curvo","Sofá modular","Sofá retrátil","Mesa de centro","Mesa lateral","Poltrona","Estante","Rack/aparador","Adega/bar"] },
      { name:"Eletro", items:["Som embutido","Televisão","Ar condicionado split","Ar condicionado cassete","Home theater","Cafeteira"] },
      { name:"Iluminação", items:LIGHT_STANDARD }
    ], extra:[
      { type:"twooption", label:"Lareira", a:"A gás", b:"A álcool" },
      { type:"textbox", label:"Possui obras de arte / objetos para incorporar ao projeto?" }
    ]},
    hometv: { label:"Home TV", cats:[
      { name:"Mobília", items:["Tapete","Cortina","Sofá curvo","Sofá modular","Sofá retrátil","Mesa de centro","Mesa lateral","Poltrona","Estante","Rack/aparador","Adega/bar"] },
      { name:"Eletro", items:["Som embutido","Televisão","Ar condicionado split","Ar condicionado cassete","Home theater"] },
      { name:"Iluminação", items:LIGHT_STANDARD }
    ], extra:[
      { type:"twooption", label:"Lareira", a:"A gás", b:"A álcool" },
      { type:"textbox", label:"Possui obras de arte / objetos para incorporar ao projeto?" }
    ]},
    cozinha: { label:"Cozinha", cats:[
      { name:"Eletro", items:["CookTop","Fogão convencional","Coifa","Torre quente","Forno elétrico de embutir","Micro-ondas convencional","Filtro","Lava-louças","Tomada de torre","Refrigerador side by side","Geladeira uma porta","Televisão","Som embutido","Ar condicionado split","Ar condicionado cassete","Máquina de gelo","Cafeteira"] },
      { name:"Bancada", items:["Cuba dupla","Cuba funda","Calha úmida","Triturador de alimentos","Pedra clara","Pedra escura","Lixeira embutida na pedra"] },
      { name:"Marcenaria", items:["Cristaleira","Despenseiro","Porta-latas","Lixeira deslizante","Porta pano de prato","Gaveta metálica","Ilha"] },
      { name:"Iluminação", items:LIGHT_WET },
      { name:"Mobília", items:["Banqueta","Cadeira","Mesa de refeições rápidas","Canto de matinais","Fruteira"] }
    ], extra:[
      { type:"text", label:"Torneira — alguma preferência? (gourmet/filtrada, bica alta...)" }
    ]},
    gourmet: { label:"Área gourmet / Churrasqueira", cats:[
      { name:"Eletro", items:["CookTop","Coifa","Freezer","Cervejeira","Chopeira","Adega refrigerada","Frigobar","Geladeira uma porta","Refrigerador side by side","Filtro","Tomada de torre","Televisão","Ar condicionado split","Ar condicionado cassete","Som embutido","Máquina de gelo"] },
      { name:"Bancada", items:["Cuba dupla","Cuba funda","Calha úmida","Triturador de alimentos","Pedra clara","Pedra escura","Lixeira embutida"] },
      { name:"Marcenaria", items:["Porta-latas","Lixeira deslizante","Porta pano de prato","Gaveta metálica"] },
      { name:"Iluminação", items:LIGHT_WET },
      { name:"Churrasqueira", items:["Convencional","Aberta lateral","Parrilha","A gás"] },
      { name:"Mobília", items:["Banqueta","Cadeira","Mesa","Poltrona","Sofá modular","Sofá curvo"] },
      { name:"Extra", items:["Forno de pizza","Fogão a lenha"] }
    ]},
    externa: { label:"Área externa", cats:[
      { name:"Mobília", items:["Ombrelone","Mesa externa","Cadeira externa","Sofá externo","Espreguiçadeira","Pergolado","Vasos / jardineiras"] },
      { name:"Eletro", items:["Projetor"] },
      { name:"Iluminação", items:LIGHT_WET }
    ], extra:[
      { type:"twooption", label:"Lareira", a:"A gás", b:"A álcool" }
    ]},
    wcexterno: { label:"WC externo", cats:[
      { name:"Bancada", items:["Cuba esculpida","Cuba de sobrepor","Cuba embutida","Cuba de apoio","Pedra clara","Pedra escura"] },
      { name:"Hidráulica", items:["Ducha higiênica","Ducha higiênica aquecida","Misturador","Monocomando","Box até o teto","Box convencional","Metais cromados","Metais coloridos","Cabideiro convencional","Cabideiro aquecido","Espelho","Espelheira","Gancho de toalha","Banco no box"] },
      { name:"Iluminação", items:LIGHT_WET }
    ], extra:[
      { type:"twooption", label:"Descarga", a:"Válvula de descarga", b:"Caixa acoplada" },
      { type:"twooption", label:"Registro", a:"Embaixo da bancada", b:"Ao lado do chuveiro" },
      { type:"twooption", label:"Chuveiro elétrico", a:"Sim", b:"Não" },
      { type:"twooption", label:"Nicho", a:"Porcelanato", b:"Pedra" },
      { type:"twooption", label:"Armário do banheiro", a:"Armário", b:"Prateleira apenas" },
      { type:"twooption", label:"Tipo de ralo", a:"Linear", b:"Convencional" },
      { type:"twooption", label:"Ventilação", a:"Janela", b:"Exaustor" }
    ]},
    lavanderia: { label:"Lavanderia", cats:[
      { name:"Bancada", items:["Pedra clara","Pedra escura"] },
      { name:"Eletro", items:["Lava e seca","Lava-roupas convencional","Secadora","Tanquinho"] },
      { name:"Marcenaria", items:["Armário vertical","Armário aéreo","Tábua embutida","Nichos","Cabideiro","Varal","Tulha"] },
      { name:"Iluminação", items:LIGHT_WET_PLAFON }
    ], extra:[
      { type:"twooption", label:"Tanque", a:"Inox", b:"Louça" },
      { type:"multioption", label:"Varal", options:[{val:"teto",label:"Teto"},{val:"parede",label:"Parede"},{val:"piso",label:"Piso"}] }
    ]},
    despensa: { label:"Despensa", cats:[
      { name:"Marcenaria", items:["Armário fechado","Prateleiras em pedra","Prateleiras em MDF","Bancada de trabalho","Cristaleira","Despenseiro"] },
      { name:"Eletro", items:["Freezer vertical","Freezer horizontal"] },
      { name:"Iluminação", items:LIGHT_WET }
    ]},
    deposito: { label:"Depósito", cats:[
      { name:"Marcenaria", items:["Armário fechado","Prateleiras em pedra","Prateleiras em MDF","Bancada de trabalho","Cristaleira"] },
      { name:"Eletro", items:["Freezer vertical","Freezer horizontal"] },
      { name:"Iluminação", items:LIGHT_WET_PLAFON }
    ]},
    roupeirocopa: { label:"Roupeiro / Copa", cats:[
      { name:"Marcenaria", items:["Cristaleira","Cabideiro","Sapateira","Bancada de matinais"] },
      { name:"Eletro", items:["Micro-ondas","Frigobar","Cafeteira","Filtro"] },
      { name:"Hidráulica", items:["Cuba","Água quente","Água fria"] },
      { name:"Iluminação", items:LIGHT_WET }
    ], extra:[
      { type:"text", label:"Torneira — alguma preferência? (gourmet/filtrada, bica alta...)" }
    ]},
    adega: { label:"Adega", cats:[
      { name:"Mobília", items:["Tapete","Poltrona","Banqueta","Mesa bistrô redonda","Mesa bistrô quadrada","Cadeira","Mesa"] },
      { name:"Marcenaria", items:["Bancada","Mostruário aberto","Mostruário fechado","Mostruário refrigerado","Gavetas para acessórios","Cristaleira"] },
      { name:"Eletro", items:["Televisão","Adega refrigerada","Frigobar","Ar condicionado split"] },
      { name:"Iluminação", items:LIGHT_STANDARD }
    ]},
    brinquedoteca: { label:"Brinquedoteca", cats:[
      { name:"Mobília", items:["Tapete","Cortina","Poltrona","Puff","Cadeira gamer","Mesa infantil","Cadeira infantil"] },
      { name:"Marcenaria", items:["Bancada","Painel de TV","Rack de TV","Casinha","Porta-brinquedos","Lousa"] },
      { name:"Eletro", items:["Televisão","Desktop","Vídeo game","Ar condicionado split"] },
      { name:"Iluminação", items:LIGHT_WET }
    ], wc:"base" },
    escritorio: { label:"Escritório", cats:[
      { name:"Mobília", items:["Tapete","Cortina","Poltrona","Cadeira de escritório","Cadeira gamer","Poltrona de leitura","Mesa de trabalho (avulsa)","Estante de livros / nicho aberto"] },
      { name:"Marcenaria", items:["Bancada","Armário vertical","Gaveta de arquivos","Gaveteiro organizador","Gavetas para acessórios","Cofre embutido","Espaço para filtro","Espaço para cafeteira"] },
      { name:"Eletro", items:["Televisão","Desktop","CPU","Monitor / tela","Notebook","Vídeo game","Frigobar","Ar condicionado split"] },
      { name:"Iluminação", items:LIGHT_TASK }
    ]},
    academia: { label:"Academia", cats:[
      { name:"Mobília", items:["Espelho de parede","Rack de peso","Suporte para halteres","Banco","Piso emborrachado"] },
      { name:"Marcenaria", items:["Armário para acessórios","Nicho","Bancada"] },
      { name:"Eletro", items:["Ar condicionado","Som embutido","Televisão","Ventilador","Ponto elétrico para esteira/bike","Bebedouro / ponto de água"] },
      { name:"Iluminação", items:LIGHT_WET }
    ], extra:[
      { type:"twooption", label:"Fita de LED", a:"Branca", b:"Colorida" }
    ]}
  };

  ROOM_DEFS.cozinhagourmet = {
    label: "Cozinha + gourmet (ambiente único)",
    cats: ROOM_DEFS.cozinha.cats.map(function(c){ return { name:"Cozinha — "+c.name, items:c.items }; })
      .concat(ROOM_DEFS.gourmet.cats.map(function(c){ return { name:"Gourmet — "+c.name, items:c.items }; })),
    extra: ROOM_DEFS.cozinha.extra
  };

  var PICKER_GROUPS = [
    { name:"Áreas sociais", rooms:["hall","lavabo","living","hometv","escritorio","brinquedoteca","academia"] },
    { name:"Cozinha e serviço", rooms:["cozinha","gourmet","cozinhagourmet","lavanderia","despensa","deposito","roupeirocopa","adega"] },
    { name:"Área externa", rooms:["externa","wcexterno"] }
  ];

  var ROOM_ORDER_LIST = [];
  PICKER_GROUPS.forEach(function(g){ g.rooms.forEach(function(r){ ROOM_ORDER_LIST.push(r); }); });

  function insertOrderedPanel(panel, id){
    var order = ROOM_ORDER_LIST.indexOf(id);
    var siblings = Array.prototype.slice.call(panelsEl.children);
    var insertBefore = null;
    for(var i=0;i<siblings.length;i++){
      var sib = siblings[i];
      var sibId = sib.dataset.roomOrder;
      if(sibId === undefined) continue;
      var sibOrder = ROOM_ORDER_LIST.indexOf(sibId);
      if(sibOrder > order){ insertBefore = sib; break; }
    }
    if(insertBefore) panelsEl.insertBefore(panel, insertBefore); else panelsEl.appendChild(panel);
  }

  var picker = document.getElementById('picker');
  var panelsEl = document.getElementById('panels');
  var emptyNote = document.getElementById('empty-note');
  var selected = {};
  var quartoSeq = 0;

  function el(tag, cls, html){ var e=document.createElement(tag); if(cls) e.className=cls; if(html!==undefined) e.innerHTML=html; return e; }

  function catGroup(cat, keyPrefix){
    var wrap = el('div','catgroup');
    wrap.appendChild(el('span','cap', cat.name));
    var opts = el('div','opts');
    cat.items.forEach(function(item, i){
      var label = el('label','opt');
      var key = keyPrefix+'-'+cat.name.toLowerCase().replace(/[^a-z0-9]+/g,'')+'-'+i;
      label.innerHTML = '<input type="checkbox" data-key="'+key+'"><span class="opt-mark"></span><span>'+item+'</span>';
      opts.appendChild(label);
    });
    wrap.appendChild(opts);
    if(/Iluminação/.test(cat.name)){
      var acabWrap = el('div','field', null);
      acabWrap.style.marginTop = '12px';
      var acabKey = keyPrefix+'-'+cat.name.toLowerCase().replace(/[^a-z0-9]+/g,'')+'-acabamento';
      acabWrap.innerHTML = '<label>Acabamento</label><div class="toggle" data-key="'+acabKey+'"><button type="button" class="toggle-btn" data-val="redondo">Redondo</button><button type="button" class="toggle-btn" data-val="quadrado">Quadrado</button></div>';
      wrap.appendChild(acabWrap);
    }
    return wrap;
  }

  function twoOption(label, key, aLabel, bLabel){
    var wrap = el('div','field');
    wrap.innerHTML = '<label>'+label+'</label><div class="toggle" data-key="'+key+'"><button type="button" class="toggle-btn" data-val="a">'+aLabel+'</button><button type="button" class="toggle-btn" data-val="b">'+bLabel+'</button></div>';
    return wrap;
  }

  function multiOption(label, key, options){
    var wrap = el('div','field');
    var btns = options.map(function(o){ return '<button type="button" class="toggle-btn" data-val="'+o.val+'">'+o.label+'</button>'; }).join('');
    wrap.innerHTML = '<label>'+label+'</label><div class="toggle" data-key="'+key+'">'+btns+'</div>';
    return wrap;
  }

  function financeScale(keyPrefix){
    var wrap = el('div','field');
    wrap.style.marginTop = '4px';
    var btns = '';
    for(var i=0;i<=10;i++){ btns += '<button type="button" class="toggle-btn" data-val="'+i+'">'+i+'</button>'; }
    wrap.innerHTML = '<label>Quanto o cliente se importa financeiramente em investir neste ambiente (0 a 10)</label><div class="toggle toggle-scale" data-key="'+keyPrefix+'-prioridade-financeira">'+btns+'</div>';
    return wrap;
  }

  function fieldText(label, key, multiline){
    var wrap = el('div','field');
    var cls = multiline ? 'fill fill-box' : 'fill fill-line';
    wrap.innerHTML = '<label>'+label+'</label><div class="'+cls+'" contenteditable="true" data-placeholder="" data-key="'+key+'"></div>';
    return wrap;
  }

  function obsField(keyPrefix){
    var wrap = el('div','panel-obs');
    wrap.innerHTML = '<div class="field"><label>Observações deste ambiente</label><div class="fill fill-box" contenteditable="true" data-placeholder="Anotações específicas deste ambiente…" data-key="'+keyPrefix+'-obs"></div></div>';
    return wrap;
  }

  function renderExtra(panel, extraDefs, keyPrefix){
    if(!extraDefs || !extraDefs.length) return;
    var wrap = el('div','catgroup');
    wrap.appendChild(el('span','cap','Detalhes complementares'));
    var grid = el('div','grid grid-2');
    extraDefs.forEach(function(f, i){
      var key = keyPrefix+'-extra'+i;
      if(f.type==='twooption') grid.appendChild(twoOption(f.label, key, f.a, f.b));
      else if(f.type==='multioption') grid.appendChild(multiOption(f.label, key, f.options));
      else grid.appendChild(fieldText(f.label, key, f.type==='textbox'));
    });
    wrap.appendChild(grid);
    panel.appendChild(wrap);
  }

  function wcContent(keyPrefix, master, hiddenBlock){
    var container = el('div', hiddenBlock ? 'wc-block' : null);
    if(hiddenBlock) container.setAttribute('hidden','');
    var items = WC_BASE_ITEMS.slice();
    if(master) items = items.concat(WC_MASTER_EXTRA_ITEMS);
    container.appendChild(catGroup({ name:"WC da suíte", items:items }, keyPrefix));
    var extraWrap = el('div','catgroup');
    extraWrap.appendChild(el('span','cap','Complementos hidráulicos'));
    var grid = el('div','grid grid-2');
    grid.appendChild(twoOption('Descarga', keyPrefix+'-descarga', 'Válvula de descarga', 'Caixa acoplada'));
    grid.appendChild(twoOption('Tipo de ralo', keyPrefix+'-ralo', 'Linear', 'Convencional'));
    if(master) grid.appendChild(twoOption('Ar condicionado', keyPrefix+'-ac', 'Split', 'Cassete de uma via'));
    extraWrap.appendChild(grid);
    container.appendChild(extraWrap);
    return container;
  }

  // ---------- Fixed rooms (chip toggle) ----------
  PICKER_GROUPS.forEach(function(group){
    var block = el('div','picker-cat');
    block.appendChild(el('span','cap', group.name));
    var chips = el('div','chips');
    group.rooms.forEach(function(id){
      var def = ROOM_DEFS[id];
      var chip = el('button','chip');
      chip.type='button'; chip.dataset.room=id;
      chip.innerHTML = '<span class="dot"></span>'+def.label;
      chip.addEventListener('click', function(){ toggleFixedRoom(id, chip); });
      chips.appendChild(chip);
    });
    block.appendChild(chips);
    picker.appendChild(block);
  });

  function buildFixedPanel(id){
    var def = ROOM_DEFS[id];
    var panel = el('div','panel'); panel.id = 'panel-'+id;
    var head = el('div','panel-head');
    head.innerHTML = '<h3>'+def.label+'</h3><span class="cap">Ambiente</span>';
    panel.appendChild(head);
    def.cats.forEach(function(cat){ panel.appendChild(catGroup(cat, 'room-'+id)); });
    if(def.wc) panel.appendChild(wcContent('room-'+id, def.wc==='master', false));
    renderExtra(panel, def.extra, 'room-'+id);
    panel.appendChild(financeScale('room-'+id));
    panel.appendChild(obsField('room-'+id));
    panel.dataset.roomOrder = id;
    insertOrderedPanel(panel, id);
    restoreScope(panel);
  }

  function toggleFixedRoom(id, chip){
    if(selected[id]){ delete selected[id]; chip.classList.remove('is-on'); var p=document.getElementById('panel-'+id); if(p) p.remove(); }
    else { selected[id]=true; chip.classList.add('is-on'); buildFixedPanel(id); }
    updateEmptyNote(); save();
  }

  // ---------- Suíte master (fixed, single) ----------
  var chipMaster = document.getElementById('chip-suitemaster');
  function buildSuiteMasterPanel(){
    var panel = el('div','panel'); panel.id='panel-suitemaster';
    var head = el('div','panel-head'); head.innerHTML = '<h3>Suíte máster</h3><span class="cap">Ambiente</span>';
    panel.appendChild(head);
    SUITEMASTER_CATS.forEach(function(cat){ panel.appendChild(catGroup(cat, 'room-suitemaster')); });
    panel.appendChild(wcContent('room-suitemaster', true, false));
    panel.appendChild(financeScale('room-suitemaster'));
    panel.appendChild(obsField('room-suitemaster'));
    panelsEl.appendChild(panel);
    restoreScope(panel);
  }
  chipMaster.addEventListener('click', function(){
    if(selected.suitemaster){
      delete selected.suitemaster; chipMaster.classList.remove('is-on');
      var p=document.getElementById('panel-suitemaster'); if(p) p.remove();
    } else {
      selected.suitemaster=true; chipMaster.classList.add('is-on');
      buildSuiteMasterPanel();
    }
    updateEmptyNote(); save();
  });

  // ---------- Dynamic quartos ----------
  function addQuartoPanel(id, isSuite, restoring){
    quartoSeq = Math.max(quartoSeq, id);
    var panel = el('div','panel quarto-panel'); panel.id = 'panel-quarto-'+id; panel.dataset.quartoId = id;

    var head = el('div','panel-head');
    var headRight = el('div','panel-head-right');
    var toggle = el('div','toggle'); toggle.dataset.key = 'room-quarto'+id+'-suite';
    toggle.innerHTML = '<button type="button" class="toggle-btn" data-val="nao">Não é suíte</button><button type="button" class="toggle-btn" data-val="sim">É suíte</button>';
    var removeBtn = el('button','btn-remove no-print'); removeBtn.type='button'; removeBtn.innerHTML='&times;'; removeBtn.title='Remover quarto';
    removeBtn.addEventListener('click', function(){ panel.remove(); renumberQuartos(); updateEmptyNote(); save(); });
    headRight.appendChild(toggle); headRight.appendChild(removeBtn);
    var titleH = el('h3',null,'Quarto');
    head.appendChild(titleH); head.appendChild(headRight);
    panel.appendChild(head);

    QUARTO_CATS.forEach(function(cat){ panel.appendChild(catGroup(cat, 'room-quarto'+id)); });
    var wc = wcContent('room-quarto'+id, false, true);
    panel.appendChild(wc);
    panel.appendChild(financeScale('room-quarto'+id));
    panel.appendChild(obsField('room-quarto'+id));

    panelsEl.appendChild(panel);

    toggle.addEventListener('click', function(ev){
      var btn = ev.target.closest('.toggle-btn'); if(!btn) return;
      var isSim = btn.dataset.val === 'sim';
      if(isSim) wc.removeAttribute('hidden'); else wc.setAttribute('hidden','');
    });

    if(isSuite){
      toggle.querySelector('.toggle-btn[data-val="sim"]').classList.add('is-active');
      wc.removeAttribute('hidden');
    } else {
      toggle.querySelector('.toggle-btn[data-val="nao"]').classList.add('is-active');
    }

    renumberQuartos();
    if(!restoring) save();
    restoreScope(panel);
  }

  function renumberQuartos(){
    var panels = panelsEl.querySelectorAll('.quarto-panel');
    panels.forEach(function(p, i){ p.querySelector('h3').textContent = 'Quarto '+(i+1); });
  }

  document.getElementById('btn-add-quarto').addEventListener('click', function(){
    quartoSeq += 1;
    addQuartoPanel(quartoSeq, false, false);
    updateEmptyNote(); save();
  });

  function updateEmptyNote(){
    var any = Object.keys(selected).length > 0 || panelsEl.querySelector('.quarto-panel');
    emptyNote.style.display = any ? 'none' : 'block';
  }

  // ---------- Toggle button behaviour (event delegation) ----------
  document.body.addEventListener('click', function(ev){
    var btn = ev.target.closest('.toggle-btn');
    if(!btn) return;
    var group = btn.closest('.toggle');
    group.querySelectorAll('.toggle-btn').forEach(function(b){ b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    save();
  });

  // ---------- Autosave ----------
  var STORE_KEY = 'vizze-briefing-draft-v3';
  var saveTimer = null;
  function save(){
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function(){
      try{
        var data = { selected: selected, fields:{}, toggles:{}, checks:{}, quartos:[] };
        document.querySelectorAll('[contenteditable][data-key]').forEach(function(node){ data.fields[node.dataset.key]=node.innerText; });
        document.querySelectorAll('.toggle[data-key]').forEach(function(t){
          var active = t.querySelector('.toggle-btn.is-active');
          data.toggles[t.dataset.key] = active ? active.dataset.val : null;
        });
        document.querySelectorAll('input[type=checkbox][data-key]').forEach(function(c){ data.checks[c.dataset.key] = c.checked; });
        panelsEl.querySelectorAll('.quarto-panel').forEach(function(p){
          var toggle = p.querySelector('.toggle');
          var active = toggle.querySelector('.toggle-btn.is-active');
          data.quartos.push({ id: parseInt(p.dataset.quartoId,10), suite: active && active.dataset.val==='sim' });
        });
        localStorage.setItem(STORE_KEY, JSON.stringify(data));
      }catch(e){ /* storage unavailable */ }
    }, 250);
  }

  function restoreScope(scope){
    try{
      var raw = localStorage.getItem(STORE_KEY); if(!raw) return;
      var data = JSON.parse(raw);
      scope.querySelectorAll('[contenteditable][data-key]').forEach(function(node){ var v=data.fields&&data.fields[node.dataset.key]; if(v) node.innerText=v; });
      scope.querySelectorAll('.toggle[data-key]').forEach(function(t){
        var v = data.toggles && data.toggles[t.dataset.key];
        if(v){ var b=t.querySelector('.toggle-btn[data-val="'+v+'"]'); if(b){ t.querySelectorAll('.toggle-btn').forEach(function(x){x.classList.remove('is-active');}); b.classList.add('is-active'); } }
      });
      scope.querySelectorAll('input[type=checkbox][data-key]').forEach(function(c){ var v=data.checks&&data.checks[c.dataset.key]; if(v) c.checked=true; });
    }catch(e){}
  }

  function restoreAll(){
    try{
      var raw = localStorage.getItem(STORE_KEY); if(!raw) return;
      var data = JSON.parse(raw);
      if(data.selected){
        Object.keys(data.selected).forEach(function(id){
          if(id === 'suitemaster'){ chipMaster.classList.add('is-on'); selected.suitemaster=true; buildSuiteMasterPanel(); }
          else if(ROOM_DEFS[id]){
            var chip = picker.querySelector('.chip[data-room="'+id+'"]');
            if(chip){ selected[id]=true; chip.classList.add('is-on'); buildFixedPanel(id); }
          }
        });
      }
      if(data.quartos && data.quartos.length){
        data.quartos.forEach(function(q){ addQuartoPanel(q.id, q.suite, true); });
      }
      restoreScope(document);
      updateEmptyNote();
    }catch(e){}
  }
  restoreAll();

  document.body.addEventListener('input', function(ev){ if(ev.target.matches && ev.target.matches('[contenteditable]')) save(); });
  document.body.addEventListener('change', function(ev){ if(ev.target.matches && ev.target.matches('input[type=checkbox]')) save(); });

  document.getElementById('btn-print').addEventListener('click', function(){ window.print(); });
  document.getElementById('btn-clear').addEventListener('click', function(){
    if(!confirm('Limpar todos os campos e começar um novo briefing?')) return;
    try{ localStorage.removeItem(STORE_KEY); }catch(e){}
    location.reload();
  });
})();