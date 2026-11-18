// =============================================================
// Vittorio Motori · Página de veículo
// -------------------------------------------------------------
// Monta a página veiculo.html a partir dos dados de js/dados.js.
// Usa as funções de js/main.js (formatarPreco, nomeCompleto...).
// Ordem no HTML: main.js → dados.js → veiculo.js
// O carro é escolhido pelo id no link: veiculo.html?id=3
// =============================================================

const MAX_FOTOS = 3;

// ---------- Busca do veículo ----------------------------------

function buscarVeiculo() {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id')) || veiculos[0].id;
  return veiculos.find((item) => item.id === id);
}

// ---------- Partes da página ----------------------------------

// Cria as linhas <dt>/<dd> de uma lista de pares [rótulo, valor].
function preencherLista(elemento, pares) {
  elemento.replaceChildren(
    ...pares.map(([rotulo, valor]) => {
      const linha = document.createElement('div');
      linha.className = 'veiculo-ficha-linha';
      const dt = document.createElement('dt');
      dt.textContent = rotulo;
      const dd = document.createElement('dd');
      dd.textContent = valor;
      linha.append(dt, dd);
      return linha;
    }),
  );
}

function mostrarCabecalho(v) {
  document.title = `${nomeCompleto(v)} | Vittorio Motori`;
  $('veiculo-crumb').textContent = nomeCompleto(v);

  $('veiculo-selo').textContent =
    v.km === 0 ? 'Novo · 0 km' : `Seminovo · ${formatarKm(v.km)}`;

  const status = $('veiculo-status');
  const disponivel = estaDisponivel(v);
  status.textContent = v.status;
  status.classList.toggle('is-disponivel', disponivel);
  status.classList.toggle('is-indisponivel', !disponivel);

  const titulo = $('veiculo-titulo');
  const modelo = document.createElement('em');
  modelo.textContent = v.modelo;
  titulo.replaceChildren(`${v.marca} `, modelo);

  $('veiculo-resumo').textContent = [
    v.ano,
    v.categoria,
    v.cambio,
    v.combustivel,
  ].join(' · ');
  $('veiculo-preco').textContent = formatarPreco(v.preco);
}

function mostrarFicha(v) {
  preencherLista($('veiculo-ficha'), [
    ['Marca', v.marca],
    ['Modelo', v.modelo],
    ['Ano', v.ano],
    ['Quilometragem', formatarKm(v.km)],
    ['Câmbio', v.cambio],
    ['Combustível', v.combustivel],
    ['Cor', v.cor],
    ['Categoria', v.categoria],
    ['Status', v.status],
  ]);
}

function mostrarDetalhes(v) {
  const pares = Object.entries(v.detalhes || {})
    .filter(([, valor]) => valor) // ignora campos vazios ou null
    .map(([campo, valor]) => [ROTULOS[campo] || campo, valor]);
  preencherLista($('veiculo-detalhes'), pares);
}

// A foto principal não se repete nas miniaturas: ao clicar numa
// miniatura, ela troca de lugar com a principal.
function mostrarGaleria(v) {
  const fotos = v.fotos.slice(0, MAX_FOTOS);

  const principal = $('veiculo-foto');
  principal.alt = nomeCompleto(v);
  usarImagemPadraoSeFalhar(principal);
  principal.src = fotos[0] || IMG_PADRAO;

  const miniaturas = fotos.slice(1).map((src, i) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'veiculo-thumb';
    botao.setAttribute('aria-label', `Ver foto ${i + 2}`);

    const img = document.createElement('img');
    img.alt = '';
    usarImagemPadraoSeFalhar(img);
    img.src = src;
    botao.append(img);

    botao.addEventListener('click', () => {
      const atual = principal.src;
      principal.src = img.src;
      img.src = atual;
    });
    return botao;
  });

  $('veiculo-thumbs').replaceChildren(...miniaturas);
}

function mostrarContato(v) {
  $('veiculo-testdrive').href = `teste-drive.html?id=${v.id}`;
  $('veiculo-whats').href = linkWhatsApp(
    `Olá! Tenho interesse no ${nomeCompleto(v)}.`,
  );
}

// ---------- Início --------------------------------------------

function iniciar() {
  const v = buscarVeiculo();

  if (!v) {
    $('veiculo-conteudo').hidden = true;
    $('veiculo-erro').hidden = false;
    return;
  }

  mostrarCabecalho(v);
  mostrarFicha(v);
  mostrarDetalhes(v);
  mostrarGaleria(v);
  mostrarContato(v);
}

iniciar();
