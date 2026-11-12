// Dados dos veículos. Para adicionar outro carro, copie um objeto, mude o id
// e coloque-o dentro do array "veiculos" (um único array para todos).
const veiculos = [
  {
    id: 1,
    marca: 'BMW',
    modelo: '320i',
    ano: 2022,
    km: 38000, // 0 para carros novos
    preco: 219900,
    cambio: 'Automático',
    combustivel: 'Gasolina',
    cor: 'Preto Safira Metálico e interior em couro marrom',
    categoria: 'Sedan',
    status: 'Disponível',
    detalhes: {
      motor: '2.0 TwinPower Turbo, 4 cilindros, 16 válvulas, 184 cv',
      torque: '30,6 kgfm',
      aceleracao: '7,2 s (0-100 km/h)',
      velocidade_maxima: '235 km/h',
      consumo_cidade: '11,2 km/l',
      consumo_estrada: '14,5 km/l',
      consumo_medio: '13,5 km/l (combinado cidade/estrada)',
      dimensoes: '4.709 x 1.827 x 1.442 mm',
      peso: '1.505 kg',
      tanque: '59 litros',
      porta_malas: '480 litros',
      airbags: '6 airbags (frontais, laterais e de cortina)',
      freios: 'Discos ventilados na frente e sólidos atrás',
      suspensao:
        'Dianteira McPherson e traseira multilink, ambas independentes',
      tracao: 'Traseira (RWD)',
      direcao: 'Elétrica com assistência variável',
      multimidia: 'Navegação, tela touch de 8,8", Bluetooth e USB',
      som: 'Harman Kardon com 12 alto-falantes',
      ar_condicionado: 'Automático de duas zonas',
      bancos: 'Couro com ajustes elétricos e memória para o motorista',
      teto_solar: 'Teto solar panorâmico',
      assistencia:
        'Piloto adaptativo, alerta de colisão frontal, manutenção de faixa e ponto cego',
      garantia: '3 anos ou 100.000 km (o que ocorrer primeiro)',
      revisoes: 'A cada 10.000 km ou 12 meses, o que ocorrer primeiro',
    },
    fotos: [
      'img/veiculos/bmw-320i-1.jpg',
      'img/veiculos/bmw-320i-2.jpg',
      'img/veiculos/bmw-320i-3.jpg',
    ],
  },
  {
    id: 2,
    marca: 'Audi',
    modelo: 'Q5',
    ano: 2021,
    km: 61000,
    preco: 190900,
    cambio: 'Automático',
    combustivel: 'Gasolina',
    cor: 'Azul Navarra',
    categoria: 'SUV',
    status: 'Disponível',
    detalhes: {
      motor: '2.0 TFSI, 4 cilindros, 16 válvulas, 272 cv',
      torque: '37,7 kgfm',
      aceleracao: '6,3 s (0-100 km/h)',
      velocidade_maxima: '240 km/h',
      consumo_cidade: '10,5 km/l',
      consumo_estrada: '13,5 km/l',
      consumo_medio: '12,0 km/l (combinado cidade/estrada)',
      dimensoes: '4.682 x 1.893 x 1.659 mm',
      peso: '1.905 kg',
      tanque: '70 litros',
      porta_malas: '550 litros',
      airbags: '7 airbags (frontais, laterais e de cortina)',
      freios: 'Discos ventilados na frente e sólidos atrás',
      suspensao:
        'Dianteira McPherson e traseira multilink, ambas independentes',
      tracao: 'Integral Quattro (AWD)',
      direcao: 'Elétrica com assistência variável',
      multimidia: 'Navegação, tela touch de 10,1", Bluetooth e USB',
      som: 'Bang & Olufsen com 19 alto-falantes',
      ar_condicionado: 'Automático de três zonas',
      bancos: 'Couro preto com ajustes elétricos e memória para o motorista',
      teto_solar: 'Teto solar panorâmico',
      assistencia:
        'Piloto adaptativo, alerta de colisão frontal, manutenção de faixa e ponto cego',
      garantia: '3 anos ou 100.000 km (o que ocorrer primeiro)',
      revisoes: 'A cada 10.000 km ou 12 meses, o que ocorrer primeiro',
    },
    fotos: [
      'img/veiculos/audi-q5-1.jpg',
      'img/veiculos/audi-q5-2.jpg',
      'img/veiculos/audi-q5-3.jpg',
    ],
  },
];

const IMG_PADRAO = 'img/carro-placeholder.svg';
const $ = (id) => document.getElementById(id);

const ROTULOS = {
  motor: 'Motor',
  torque: 'Torque',
  aceleracao: 'Aceleração',
  velocidade_maxima: 'Velocidade máxima',
  consumo_cidade: 'Consumo na cidade',
  consumo_estrada: 'Consumo na estrada',
  consumo_medio: 'Consumo médio',
  dimensoes: 'Dimensões',
  peso: 'Peso',
  tanque: 'Tanque',
  porta_malas: 'Porta-malas',
  airbags: 'Airbags',
  freios: 'Freios',
  suspensao: 'Suspensão',
  tracao: 'Tração',
  direcao: 'Direção',
  multimidia: 'Multimídia',
  som: 'Som',
  ar_condicionado: 'Ar-condicionado',
  bancos: 'Bancos',
  teto_solar: 'Teto solar',
  assistencia: 'Assistência ao motorista',
  garantia: 'Garantia',
  revisoes: 'Revisões',
};

const params = new URLSearchParams(location.search);
const id = Number(params.get('id')) || veiculos[0].id;
const v = veiculos.find((item) => item.id === id);

function preencher() {
  if (!v) {
    $('veiculo-conteudo').hidden = true;
    $('veiculo-erro').hidden = false;
    return;
  }

  const novo = v.km === 0;
  const kmTexto = novo ? '0 km' : v.km.toLocaleString('pt-BR') + ' km';
  const preco = v.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });

  document.title = `${v.marca} ${v.modelo} ${v.ano} | Vittorio Motori`;
  $('veiculo-crumb').textContent = `${v.marca} ${v.modelo} ${v.ano}`;
  $('veiculo-selo').textContent = novo
    ? 'Novo · 0 km'
    : `Seminovo · ${kmTexto}`;
  $('veiculo-status').textContent = v.status;
  $('veiculo-titulo').innerHTML = `${v.marca} <em>${v.modelo}</em>`;
  $('veiculo-resumo').textContent = [
    v.ano,
    v.categoria,
    v.cambio,
    v.combustivel,
  ].join(' · ');
  $('veiculo-preco').textContent = preco;

  const ficha = {
    Marca: v.marca,
    Modelo: v.modelo,
    Ano: v.ano,
    Quilometragem: kmTexto,
    Câmbio: v.cambio,
    Combustível: v.combustivel,
    Cor: v.cor,
    Categoria: v.categoria,
    Status: v.status,
  };
  $('veiculo-ficha').innerHTML = Object.entries(ficha)
    .map(
      ([k, val]) =>
        `<div class="veiculo-ficha-linha"><dt>${k}</dt><dd>${val}</dd></div>`,
    )
    .join('');

  $('veiculo-detalhes').innerHTML = Object.entries(v.detalhes || {})
    .map(
      ([k, val]) =>
        `<div class="veiculo-ficha-linha"><dt>${ROTULOS[k] || k}</dt><dd>${val}</dd></div>`,
    )
    .join('');

  const principal = $('veiculo-foto');
  principal.alt = `${v.marca} ${v.modelo} ${v.ano}`;
  principal.onerror = () => {
    principal.onerror = null;
    principal.src = IMG_PADRAO;
  };
  principal.src = v.fotos[0] || IMG_PADRAO;

  const thumbs = $('veiculo-thumbs');
  thumbs.innerHTML = '';
  v.fotos.forEach((src, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'veiculo-thumb';
    btn.setAttribute('aria-label', `Ver foto ${i + 1}`);
    const img = document.createElement('img');
    img.alt = '';
    img.onerror = () => {
      img.onerror = null;
      img.src = IMG_PADRAO;
    };
    img.src = src;
    btn.append(img);
    btn.addEventListener('click', () => {
      principal.src = img.src;
    });
    thumbs.append(btn);
  });

  $('veiculo-testdrive').href = `teste-drive.html?id=${v.id}`;
  $('veiculo-whats').href =
    'https://wa.me/5585000000000?text=' +
    encodeURIComponent(
      `Olá! Tenho interesse no ${v.marca} ${v.modelo} ${v.ano}.`,
    );
}

preencher();
