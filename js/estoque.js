/* =============================================================
   Página de estoque
   -------------------------------------------------------------
   Como funciona, em três passos que se repetem a cada mudança:
     1. Lê o que a pessoa escolheu nos filtros.
     2. Separa os carros que combinam e coloca em ordem de preço.
     3. Redesenha os cards na tela.
   Os carros vêm do js/dados.js, que precisa carregar antes deste.
   ============================================================= */

const IMG_PADRAO = 'img/carro-placeholder.svg';

// Paradas da barra de preço. Se ela fosse de real em real, a Ferrari de
// 3,8 milhões esticaria tanto a escala que todos os outros carros ficariam
// espremidos no comecinho. Com paradas, cada uma ocupa o mesmo espaço.
// A primeira e a última não limitam nada: valem como "sem mínimo" e
// "sem máximo".
const DEGRAUS_PRECO = [
  50000, 75000, 100000, 125000, 150000, 200000, 250000,
  300000, 400000, 500000, 1000000, 2000000, 4000000,
];
const ULTIMO_DEGRAU = DEGRAUS_PRECO.length - 1;

const $ = (id) => document.getElementById(id);

const formulario = $('filtros');
const precoMin = $('preco-min');
const precoMax = $('preco-max');


/* ---------- Deixando os textos bonitos ---------- */

// Transforma o número cru em preço do jeito que a gente lê no Brasil.
// 219900 → "R$ 219.900" (sem centavos, porque carro não precisa).
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}

// Versão curtinha, para caber nas caixas do filtro.
// 50000 → "R$ 50 mil" | 4000000 → "R$ 4 mi"
function formatarPrecoCurto(valor) {
  return valor >= 1000000 ? `R$ ${valor / 1000000} mi` : `R$ ${valor / 1000} mil`;
}

// Coloca o ponto de milhar na quilometragem.
// 38000 → "38.000 km" | 0 → "0 km"
function formatarKm(km) {
  return `${km.toLocaleString('pt-BR')} km`;
}

// O card é pequeno, então cortamos o que vem entre parênteses.
// "Flex (gasolina e etanol)" vira só "Flex".
function combustivelCurto(combustivel) {
  return combustivel.split(' (')[0];
}

// Mesma ideia para o câmbio: só a primeira palavra já diz o que importa.
// "Automático de 9 marchas" vira "Automático".
function cambioCurto(cambio) {
  return cambio.split(' ')[0];
}

// Deixa tudo minúsculo e sem acento, para a busca não ser chata.
// Quem digita "automatico" também encontra "Automático".
// O normalize separa a letra do acento, e o replace joga o acento fora.
function simplificar(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}


/* ---------- Perguntas sobre um carro ---------- */

// O toLowerCase() é uma precaução: se alguém escrever "DISPONÍVEL"
// ou "disponível" no dados.js, continua funcionando.
function estaDisponivel(v) {
  return v.status.toLowerCase() === 'disponível';
}

// Carro novo é o que nunca rodou.
function condicao(v) {
  return v.km === 0 ? 'Novo' : 'Seminovo';
}


/* ---------- Montando os cards dos carros ---------- */

// Um atalho para criar um elemento HTML já com classe e texto.
function criarElemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

// Monta o card de um carro: a foto em cima e as informações embaixo.
function criarCard(v) {
  const disponivel = estaDisponivel(v);
  const card = criarElemento('article', 'card');
  card.classList.toggle('is-indisponivel', !disponivel);

  // --- Parte de cima: a foto e as etiquetas ---
  const midia = criarElemento('div', 'card-midia');
  const img = document.createElement('img');
  img.loading = 'lazy'; // só carrega a foto quando ela estiver chegando na tela
  img.alt = `${v.marca} ${v.modelo}`;
  // Se a foto quebrar, colocamos a imagem padrão no lugar.
  img.onerror = () => {
    img.onerror = null;
    img.src = IMG_PADRAO;
  };
  img.src = v.fotos?.[0] || IMG_PADRAO; // usa a primeira foto; se não tiver, a padrão

  // Etiqueta de km no canto esquerdo. Carro 0 km ganha um destaque.
  const km = criarElemento('span', 'card-tag card-tag-km', formatarKm(v.km));
  km.classList.toggle('is-novo', condicao(v) === 'Novo');
  // Etiqueta de status no canto direito: "Disponível", "Vendido"...
  const status = criarElemento('span', 'card-tag card-tag-status', v.status);
  midia.append(img, km, status);

  // --- Parte de baixo: as informações do carro ---
  const corpo = criarElemento('div', 'card-corpo');
  // Aquela linha de resumo, tipo "2022 · Automático · Gasolina".
  const resumo = [v.ano, cambioCurto(v.cambio), combustivelCurto(v.combustivel)].join(' · ');

  // Rodapé com o preço de um lado e o botão do outro. O botão leva
  // para a página do carro, passando o id dele na URL.
  const rodape = criarElemento('div', 'card-rodape');
  const link = criarElemento('a', 'card-botao', 'Ver detalhes');
  link.href = `veiculo.html?id=${v.id}`;
  // Pensando em quem usa leitor de tela: em vez de ouvir vários
  // "Ver detalhes" iguais, a pessoa ouve "Ver detalhes do BMW 320i".
  link.setAttribute('aria-label', `Ver detalhes do ${v.marca} ${v.modelo}`);
  rodape.append(criarElemento('p', 'card-preco', formatarPreco(v.preco)), link);

  corpo.append(
    criarElemento('p', 'card-marca', v.marca),
    criarElemento('h3', 'card-nome', `${v.marca} ${v.modelo}`),
    criarElemento('p', 'card-resumo', resumo),
    rodape,
  );

  card.append(midia, corpo);
  return card;
}


/* ---------- Montando as opções dos filtros ---------- */

// Lista os valores que existem de verdade no estoque, sem repetir e em
// ordem alfabética. Chegou um carro de marca nova no dados.js? O filtro
// dela aparece sozinho.
function valoresUnicos(campo) {
  // O Set é uma lista que não aceita repetidos.
  const valores = new Set(veiculos.map((v) => v[campo]));
  return [...valores].sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

// Cria um checkbox com o texto do lado. A classe decide se ele
// aparece como caixinha ("opcao") ou como botão redondo ("chip").
function criarOpcao(classe, nome, valor) {
  const label = criarElemento('label', classe);
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.name = nome;
  input.value = valor;
  label.append(input, criarElemento('span', '', valor));
  return label;
}

function montarFiltros() {
  $('filtro-marcas').replaceChildren(
    ...valoresUnicos('marca').map((marca) => criarOpcao('opcao', 'marca', marca)),
  );
  $('filtro-categorias').replaceChildren(
    ...valoresUnicos('categoria').map((cat) => criarOpcao('chip', 'categoria', cat)),
  );

  // A barra começa toda aberta. Usamos defaultValue (e não só value) porque
  // é para ele que o formulário volta quando a pessoa clica em "Limpar".
  precoMin.max = ULTIMO_DEGRAU;
  precoMax.max = ULTIMO_DEGRAU;
  precoMin.defaultValue = 0;
  precoMax.defaultValue = ULTIMO_DEGRAU;
}


/* ---------- Passo 1: lendo o que a pessoa escolheu ---------- */

function lerFiltros() {
  // O FormData junta todos os campos do formulário. O getAll devolve
  // uma lista, porque dá para marcar várias marcas ao mesmo tempo.
  const dados = new FormData(formulario);
  const min = Number(dados.get('precoMin'));
  const max = Number(dados.get('precoMax'));

  return {
    busca: simplificar(dados.get('busca')),
    marcas: dados.getAll('marca'),
    categorias: dados.getAll('categoria'),
    condicoes: dados.getAll('condicao'),
    // Nas pontas da barra não tem limite (Infinity é "infinito").
    precoMin: min === 0 ? 0 : DEGRAUS_PRECO[min],
    precoMax: max === ULTIMO_DEGRAU ? Infinity : DEGRAUS_PRECO[max],
  };
}

// Diz se tem algum filtro da lateral ligado (a busca não conta).
function temFiltroLateral(f) {
  return f.marcas.length > 0
    || f.categorias.length > 0
    || f.condicoes.length > 0
    || f.precoMin > 0
    || f.precoMax < Infinity;
}


/* ---------- Passo 2: filtrando e ordenando ---------- */

// Se nada foi marcado no grupo, qualquer carro serve.
// Se algo foi marcado, o carro precisa ser um dos escolhidos.
function combina(escolhidos, valor) {
  return escolhidos.length === 0 || escolhidos.includes(valor);
}

// O carro só aparece se passar em todos os filtros. Dentro do mesmo grupo
// é "ou" (BMW ou Audi); entre grupos diferentes é "e" (BMW e Sedan).
function passaNosFiltros(v, f) {
  return simplificar(`${v.marca} ${v.modelo}`).includes(f.busca)
    && combina(f.marcas, v.marca)
    && combina(f.categorias, v.categoria)
    && combina(f.condicoes, condicao(v))
    && v.preco >= f.precoMin
    && v.preco <= f.precoMax;
}

// O sort espera um número: negativo coloca o "a" na frente, positivo o "b".
// Por isso a subtração resolve, e inverter a conta inverte a ordem.
function compararPreco(a, b) {
  return $('ordenar').value === 'maior' ? b.preco - a.preco : a.preco - b.preco;
}


/* ---------- Passo 3: colocando na tela ---------- */

// Atualiza a parte colorida da barra e os dois preços escritos acima dela.
function mostrarFaixaDePreco() {
  const min = Number(precoMin.value);
  const max = Number(precoMax.value);
  const textoMin = formatarPrecoCurto(DEGRAUS_PRECO[min]);
  const textoMax = formatarPrecoCurto(DEGRAUS_PRECO[max]);

  $('preco-min-texto').textContent = textoMin;
  $('preco-max-texto').textContent = textoMax;

  // Sem isso, o leitor de tela falaria "3" em vez de "R$ 125 mil".
  precoMin.setAttribute('aria-valuetext', textoMin);
  precoMax.setAttribute('aria-valuetext', textoMax);

  $('faixa').style.setProperty('--de', min / ULTIMO_DEGRAU);
  $('faixa').style.setProperty('--ate', max / ULTIMO_DEGRAU);
}

function mostrarResultados(carros, filtros) {
  const vazio = carros.length === 0;
  const n = carros.length;

  $('listagem-carros').replaceChildren(...carros.map(criarCard));

  // Contador, com o plural certinho:
  // "1 veículo encontrado" ou "11 veículos encontrados".
  $('listagem-total').textContent =
    `${n} ${n === 1 ? 'veículo encontrado' : 'veículos encontrados'}`;
  $('listagem-ordem').textContent =
    `Ordenado por: ${$('ordenar').value === 'maior' ? 'maior' : 'menor'} preço`;

  $('listagem-topo').hidden = vazio;
  $('listagem-vazia').hidden = !vazio;

  // Se foi só a busca que não achou nada, a lateral some e o aviso ocupa a
  // tela toda, como no Figma. Mas se tem filtro marcado, ela continua ali:
  // senão a pessoa não teria como desmarcar só um deles.
  const esconderLateral = vazio && !temFiltroLateral(filtros);
  formulario.hidden = esconderLateral;
  $('estoque-grade').classList.toggle('sem-filtros', esconderLateral);
}

// Junta os três passos. É chamada toda vez que alguma coisa muda.
function atualizar() {
  const filtros = lerFiltros();
  // O filter cria uma lista nova, então o sort não bagunça a original.
  const carros = veiculos.filter((v) => passaNosFiltros(v, filtros)).sort(compararPreco);

  mostrarFaixaDePreco();
  mostrarResultados(carros, filtros);
}


/* ---------- Reagindo a quem está usando ---------- */

// Não deixa uma bolinha passar por cima da outra: a que está sendo
// arrastada para um degrau antes.
function segurarBolinhas(evento) {
  const min = Number(precoMin.value);
  const max = Number(precoMax.value);
  if (min < max) return;

  if (evento.target === precoMin) precoMin.value = max - 1;
  if (evento.target === precoMax) precoMax.value = min + 1;
}

// Um "input" só, no formulário, já escuta todos os campos que estão
// ligados a ele. A busca fica fora do formulário no HTML, então o aviso
// dela não passa por aqui e precisa do próprio ouvinte.
formulario.addEventListener('input', (evento) => {
  segurarBolinhas(evento);
  atualizar();
});
formulario.elements.busca.addEventListener('input', atualizar);
$('ordenar').addEventListener('change', atualizar);

// Apertar Enter na busca recarregaria a página. Aqui a gente impede.
formulario.addEventListener('submit', (evento) => evento.preventDefault());

// Vale para o "Limpar" da lateral e para o "Limpar filtros" do aviso.
document.querySelectorAll('[data-limpar]').forEach((botao) => {
  botao.addEventListener('click', () => {
    formulario.reset();
    atualizar();
    // O botão do aviso some junto com ele, então o foco do teclado vai
    // para a busca em vez de se perder na página.
    if ($('listagem-vazia').contains(botao)) formulario.elements.busca.focus();
  });
});

// Abre e fecha os filtros no celular.
$('filtros-abrir').addEventListener('click', () => {
  const aberto = formulario.classList.toggle('is-aberto');
  $('filtros-abrir').setAttribute('aria-expanded', aberto);
  $('filtros-abrir').textContent = aberto ? 'Esconder filtros' : 'Mostrar filtros';
});


/* ---------- Quando a página abre ---------- */

montarFiltros();
atualizar();
