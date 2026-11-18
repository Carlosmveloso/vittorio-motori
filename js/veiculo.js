const MAX_FOTOS = 3;

// ---------- Busca do veículo ----------------------------------

function buscarVeiculo() {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id')) || veiculos[0].id;
  return veiculos.find((item) => item.id === id);
}


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
  )
}
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



const IMG_PADRAO = 'img/carro-placeholder.svg';
const WHATSAPP = '5585000000000';

const $ = (id) => document.getElementById(id);



function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}


function formatarKm(km) {
  return km === 0 ? '0 km' : `${km.toLocaleString('pt-BR')} km`;
}



function estaDisponivel(veiculo) {
  return veiculo.status.toLowerCase() === 'disponível';
}

function nomeCompleto(veiculo) {
  return `${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}`;
}

function linkWhatsApp(mensagem) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

function usarImagemPadraoSeFalhar(img) {
  img.onerror = () => {
    img.onerror = null;
    img.src = IMG_PADRAO;
  };
}


document.querySelectorAll('.ano-atual').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
