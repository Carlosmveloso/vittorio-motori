const IMG_PADRAO = 'img/carro-placeholder.svg';

const $ = (id) => document.getElementById(id);


// Transforma o número cru em preço do jeito que a gente lê no Brasil.
// 219900 → "R$ 219.900" (sem centavos, porque carro não precisa).
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}

// Coloca o ponto de milhar na quilometragem.
// 38000 → "38.000 km" | 0 → "0 km"
function formatarKm(km) {
  return km === 0 ? '0 km' : `${km.toLocaleString('pt-BR')} km`;
}

// O card é pequeno, então cortamos o que vem entre parênteses.
// "Flex (Gasolina/Etanol)" vira só "Flex".
function combustivelCurto(combustivel) {
  return combustivel.split(' (')[0];
}

// O toLowerCase() é uma precaução: se alguém escrever "DISPONÍVEL"
// ou "disponível" no dados.js, continua funcionando.
function estaDisponivel(v) {
  return v.status.toLowerCase() === 'disponível';
}


/* ---------- Montando os cards dos carros ---------- */

// Um atalho para criar um elemento HTML já com classe e texto.
function criarElemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

// Monta o card de um carro. O resultado fica mais ou menos assim:
function criarCard(v) {
  const disponivel = estaDisponivel(v);
  const card = criarElemento('article', 'card');
  card.classList.toggle('is-indisponivel', !disponivel);

  // --- Parte de cima: a foto e as etiquetas ---
  const midia = criarElemento('div', 'card-midia');
  const img = document.createElement('img');
  img.src = v.fotos?.[0] || IMG_PADRAO; // usa a primeira foto; se não tiver, a padrão
  img.alt = `${v.marca} ${v.modelo}`;
  img.loading = 'lazy'; // só carrega a foto quando ela estiver chegando na tela
  // Se a foto quebrar, colocamos a imagem padrão no lugar.
  img.onerror = () => {
    img.onerror = null;
    img.src = IMG_PADRAO;
  };
  // Etiqueta de km no canto esquerdo. Carro 0 km ganha um destaque.
  const km = criarElemento('span', 'card-tag card-tag-km', formatarKm(v.km));
  km.classList.toggle('is-novo', v.km === 0);
  // Etiqueta de status no canto direito: "Disponível", "Vendido"...
  const status = criarElemento('span', 'card-tag card-tag-status', v.status);
  midia.append(img, km, status);

  // --- Parte de baixo: as informações do carro ---
  const corpo = criarElemento('div', 'card-corpo');
  // Aquela linha de resumo, tipo "2022 · Automático · Gasolina".
  const resumo = [v.ano, v.cambio, combustivelCurto(v.combustivel)].join(' · ');

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


/* ---------- Colocando a lista na tela ---------- */
// Pega todos os carros, transforma cada um em card e coloca na página.
function listarVeiculos() {
  $('listagem-carros').replaceChildren(...veiculos.map(criarCard));

  // Se o dados.js estiver vazio, mostra o aviso "Nenhum veículo disponível".
  $('listagem-vazia').hidden = veiculos.length > 0;

  // Contador, com o plural certinho:
  // "1 veículo encontrado" ou "11 veículos encontrados".
  const n = veiculos.length;
  $('listagem-total').textContent =
    `${n} ${n === 1 ? 'veículo encontrado' : 'veículos encontrados'}`;
}


/* ---------- Quando a página abre ---------- */

listarVeiculos();
