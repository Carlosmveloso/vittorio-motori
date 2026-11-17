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
      motor: '2.0 TwinPower Turbo, 4 cilindros, 184 cv, câmbio automático ZF de 8 marchas',
      torque: '30,6 kgfm',
      aceleracao: '7,1 s (0-100 km/h)',
      velocidade_maxima: '235 km/h',
      consumo_cidade: '11,2 km/l',
      consumo_estrada: '14,5 km/l',
      consumo_medio: '13,5 km/l (combinado cidade/estrada)',
      dimensoes: '4.709 x 1.827 x 1.442 mm',
      peso: '1.515 kg',
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
      motor: '2.0 TFSI turbo, 4 cilindros, injeção direta, 249 cv, câmbio S tronic',
      torque: '37,7 kgfm',
      aceleracao: '6,3 s (0-100 km/h)',
      velocidade_maxima: '237 km/h',
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
  {
    id: 3,
    marca: 'Hyundai',
    modelo: 'Elantra',
    ano: 2020,
    km: 45000,
    preco: 82353,
    cambio: 'Automático',
    combustivel: 'Flex (gasolina e etanol)',
    cor: 'Branco',
    categoria: 'Sedan',
    status: 'Disponível',
    detalhes: {
      motor: '2.0 Nu MPI, 4 cilindros, 16 válvulas, Flex, até 167 cv (etanol)',
      torque: '20,6 kgfm',
      aceleracao: '9,5 s (0-100 km/h)',
      velocidade_maxima: '200 km/h',
      consumo_cidade: '9,3 km/l (gasolina)',
      consumo_estrada: '11,8 km/l (gasolina)',
      consumo_medio: '10,5 km/l (gasolina, combinado cidade/estrada)',
      dimensoes: '4.620 x 1.800 x 1.450 mm',
      peso: '1.194 kg',
      tanque: '50 litros',
      porta_malas: '420 litros',
      airbags: '6 airbags (frontais, laterais e de cortina)',
      freios: 'Discos ventilados na frente e sólidos atrás',
      suspensao:
        'Dianteira McPherson e traseira de eixo de torção (CTBA)',
      tracao: 'Dianteira (FWD)',
      direcao: 'Elétrica com assistência variável',
      multimidia: 'Tela touch de 8", Bluetooth, USB, Android Auto e Apple CarPlay',
      som: 'Sistema de som com 6 alto-falantes',
      ar_condicionado: 'Automático de duas zonas',
      bancos: 'Couro com ajuste elétrico para o motorista',
      teto_solar: 'Teto solar elétrico',
      assistencia:
        'Alerta de colisão frontal, alerta de ponto cego e câmera de ré',
      garantia: '5 anos (sem limite de quilometragem)',
      revisoes: 'A cada 10.000 km ou 12 meses, o que ocorrer primeiro',
    },
    fotos: [
      'img/veiculos/hyundai-elantra-1.jpg',
      'img/veiculos/hyundai-elantra-2.jpg',
      'img/veiculos/hyundai-elantra-3.jpg',
    ],
  },
  {
    id: 4,
    marca: 'Toyota',
    modelo: 'Corolla',
    ano: 2023,
    km: 0,
    preco: 120000,
    cambio: 'Automático',
    combustivel: 'Flex (gasolina e etanol)',
    cor: 'Branco Perolizado e interior em couro creme',
    categoria: 'Sedan',
    status: 'Disponível',
    detalhes: {
      motor: '2.0 Dynamic Force, 4 cilindros, 16 válvulas, Flex, até 177 cv (etanol)',
      torque: '21,4 kgfm (etanol) / 20,7 kgfm (gasolina)',
      cambio_detalhe: 'CVT Direct Shift com 10 marchas simuladas',
      dimensoes: '4.630 x 1.780 x 1.455 mm',
      tanque: '50 litros',
      porta_malas: '470 litros',
      airbags: '7 airbags (frontais, laterais e de cortina)',
      freios: 'Discos ventilados na frente e sólidos atrás',
    },
    fotos: [
      'img/veiculos/toyota-corolla-1.jpg',
      'img/veiculos/toyota-corolla-2.jpg',
      'img/veiculos/toyota-corolla-3.jpg',
    ],
  },
  {
    id: 5,
    marca: 'Chevrolet',
    modelo: 'Onix',
    ano: 2024,
    km: 0,
    preco: 85000,
    cambio: 'Automático',
    combustivel: 'Flex (gasolina e etanol)',
    cor: 'Preto',
    categoria: 'Hatch',
    status: 'Disponível',
    detalhes: {
      motor: '1.0 turbo, 3 cilindros, Flex, até 116 cv (etanol)',
      torque: '16,8 kgfm (etanol) / 15,5 kgfm (gasolina)',
      aceleracao: '10,5 s (0-100 km/h)',
      velocidade_maxima: '190 km/h',
      consumo_cidade: '12,5 km/l (gasolina)',
      consumo_estrada: '15,0 km/l (gasolina)',
      consumo_medio: '13,8 km/l (gasolina, combinado cidade/estrada)',
      dimensoes: '4.163 x 1.735 x 1.480 mm',
      tanque: '44 litros',
      porta_malas: '275 litros',
      airbags: '6 airbags (frontais, laterais e de cortina)',
      freios: 'Discos ventilados na frente e tambores atrás',
      suspensao: 'Dianteira McPherson e traseira de eixo de torção (CTBA)',
      tracao: 'Dianteira (FWD)',
      direcao: 'Elétrica com assistência variável',
      multimidia: 'Tela touch de 8", Bluetooth, USB, Android Auto e Apple CarPlay',
      som: 'Sistema de som com 6 alto-falantes',
      assistencia: 'Alerta de colisão frontal, alerta de ponto cego e câmera de ré',
      garantia: '3 anos ou 100.000 km (o que ocorrer primeiro)',
      revisoes: 'A cada 10.000 km ou 12 meses, o que ocorrer primeiro',
    },
    fotos: [
      'img/veiculos/chevrolet-onix-1.jpg',
      'img/veiculos/chevrolet-onix-2.jpg',
      'img/veiculos/chevrolet-onix-3.jpg',
    ],
  },
  {
    id: 6,
    marca: 'Honda',
    modelo: 'Civic Touring',
    ano: 2021,
    km: 72000,
    preco: 104509,
    cambio: 'Automático CVT',
    combustivel: 'Gasolina',
    cor: 'Cinza',
    categoria: 'Sedan',
    status: 'Disponível',
    detalhes: {
      motor: '1.5 turbo, 4 cilindros, 16 válvulas, 173 cv',
      torque: '22,4 kgfm',
      dimensoes: '4.637 x 1.799 x 1.433 mm',
      tanque: '56 litros',
      porta_malas: '525 litros',
      airbags: '6 airbags (frontais, laterais e de cortina)',
      freios: 'Discos nas quatro rodas (ventilados na frente)',
      suspensao: 'Dianteira McPherson e traseira multilink, ambas independentes',
      tracao: 'Dianteira (FWD)',
      direcao: 'Elétrica com assistência variável',
      multimidia: 'Tela touch de 7", Bluetooth, USB, Android Auto e Apple CarPlay',
      ar_condicionado: 'Automático de duas zonas',
      bancos: 'Couro com ajuste elétrico para o motorista',
      teto_solar: 'Teto solar elétrico',
      assistencia: 'Câmera LaneWatch no retrovisor direito e câmera de ré',
      garantia: '3 anos sem limite de quilometragem',
      revisoes: 'A cada 10.000 km ou 12 meses, o que ocorrer primeiro',
    },
    fotos: [
      'img/veiculos/honda-civic-1.jpg',
      'img/veiculos/honda-civic-2.jpg',
      'img/veiculos/honda-civic-3.jpg',
    ],
  },
  {
    id: 7,
    marca: 'BYD',
    modelo: 'Dolphin Mini',
    ano: 2027,
    km: 0,
    preco: 126000,
    cambio: 'Automático (redução única)',
    combustivel: 'Elétrico',
    cor: 'Branco',
    categoria: 'Hatch',
    status: 'Disponível',
    detalhes: {
      motor: 'Elétrico síncrono, 75 cv (55 kW)',
      torque: '13,8 kgfm',
      velocidade_maxima: '130 km/h',
      bateria: '38 kWh, tecnologia Blade (LFP)',
      autonomia: '280 km (ciclo Inmetro)',
      recarga: 'Corrente alternada até 6,6 kW e rápida (DC) até 40 kW',
      dimensoes: '3.780 x 1.715 x 1.580 mm',
      porta_malas: '230 litros',
      airbags: '6 airbags (frontais, laterais e de cortina)',
      freios: 'Discos nas quatro rodas',
      suspensao: 'Dianteira McPherson e traseira de eixo de torção',
      tracao: 'Dianteira (FWD)',
      direcao: 'Elétrica',
      multimidia: 'Tela touch giratória de 10,1", Bluetooth, Android Auto e Apple CarPlay',
      ar_condicionado: 'Automático',
      garantia: '6 anos para o veículo e 8 anos para a bateria',
    },
    fotos: [
      'img/veiculos/byd-dolphin-mini-1.jpg',
      'img/veiculos/byd-dolphin-mini-2.jpg',
      'img/veiculos/byd-dolphin-mini-3.jpg',
    ],
  },
  {
    id: 8,
    marca: 'Haval',
    modelo: 'H9',
    ano: '2026/2027',
    km: 0,
    preco: 350000,
    cambio: 'Automático de 9 marchas',
    combustivel: 'Diesel',
    cor: 'Preto',
    categoria: 'SUV',
    status: 'Disponível',
    detalhes: {
      motor: '2.4 turbodiesel, 4 cilindros, 184 cv',
      torque: '48,9 kgfm',
      dimensoes: '4.950 x 1.976 x 1.929 mm',
      tanque: '80 litros',
      lugares: '7 lugares',
      suspensao: 'Dianteira independente com braços duplos e traseira de eixo rígido',
      tracao: 'Integral 4x4 com reduzida e bloqueios de diferencial',
      direcao: 'Elétrica',
      multimidia: 'Tela touch de 14,6", Android Auto e Apple CarPlay',
      ar_condicionado: 'Automático de três zonas',
      bancos: 'Couro com ajustes elétricos',
      teto_solar: 'Teto solar panorâmico',
      assistencia: 'Piloto adaptativo, frenagem autônoma, manutenção de faixa e câmeras 360°',
    },
    fotos: [
      'img/veiculos/haval-h9-1.jpg',
      'img/veiculos/haval-h9-2.jpg',
      'img/veiculos/haval-h9-3.jpg',
    ],
  },
  {
    id: 9,
    marca: 'Hyundai',
    modelo: 'HB20',
    ano: 2025,
    km: 36856,
    preco: 73482,
    cambio: 'Manual de 5 marchas',
    combustivel: 'Flex (gasolina e etanol)',
    cor: 'Prata',
    categoria: 'Hatch',
    status: 'Disponível',
    detalhes: {
      motor: '1.0 MPI, 3 cilindros, 12 válvulas, Flex, até 80 cv (etanol)',
      dimensoes: '4.015 x 1.720 x 1.470 mm',
      tanque: '50 litros',
      porta_malas: '300 litros',
      airbags: '6 airbags (frontais, laterais e de cortina)',
      freios: 'Discos na frente e tambores atrás',
      suspensao: 'Dianteira McPherson e traseira de eixo de torção',
      tracao: 'Dianteira (FWD)',
      direcao: 'Elétrica',
      multimidia: 'Tela touch de 8", Bluetooth, Android Auto e Apple CarPlay',
      ar_condicionado: 'Manual',
      bancos: 'Tecido',
      garantia: '5 anos sem limite de quilometragem',
    },
    fotos: [
      'img/veiculos/hyundai-hb20-1.jpg',
      'img/veiculos/hyundai-hb20-2.jpg',
      'img/veiculos/hyundai-hb20-3.jpg',
    ],
  },
  {
    id: 10,
    marca: 'Renault',
    modelo: 'Duster',
    ano: 2024,
    km: 79000,
    preco: 85000,
    cambio: 'Automático CVT',
    combustivel: 'Flex (gasolina e etanol)',
    cor: 'Prata',
    categoria: 'SUV',
    status: 'Disponível',
    detalhes: {
      motor: '1.6 SCe, 4 cilindros, 16 válvulas, Flex, até 120 cv (etanol)',
      torque: '16,2 kgfm (etanol)',
      dimensoes: '4.376 x 1.832 x 1.693 mm',
      tanque: '50 litros',
      porta_malas: '475 litros',
      freios: 'Discos na frente e tambores atrás',
      suspensao: 'Dianteira McPherson e traseira de eixo de torção',
      tracao: 'Dianteira (FWD)',
      direcao: 'Elétrica',
      multimidia: 'Tela touch de 8", Android Auto e Apple CarPlay',
      ar_condicionado: 'Automático digital',
      garantia: '3 anos sem limite de quilometragem',
    },
    fotos: [
      'img/veiculos/renault-duster-1.jpg',
      'img/veiculos/renault-duster-2.jpg',
      'img/veiculos/renault-duster-3.jpg',
    ],
  },
  {
    id: 11,
    marca: 'Ferrari',
    modelo: 'Roma Spider',
    ano: 2024,
    km: 23000,
    preco: 3831500,
    cambio: 'Automático de dupla embreagem, 8 marchas',
    combustivel: 'Gasolina',
    cor: 'Vermelho',
    categoria: 'Conversível',
    status: 'Indisponível',
    detalhes: {
      motor: '3.9 V8 biturbo, 8 cilindros, 620 cv',
      torque: '77,5 kgfm',
      aceleracao: '3,4 s (0-100 km/h)',
      velocidade_maxima: 'Acima de 320 km/h',
      dimensoes: '4.656 x 1.974 x 1.306 mm',
      peso: '1.556 kg (a seco)',
      tanque: '80 litros',
      porta_malas: '255 litros (capota fechada)',
      capota: 'Capota de tecido com abertura elétrica em 13,5 s, até 60 km/h',
      freios: 'Discos de carbono-cerâmica nas quatro rodas',
      suspensao: 'Dianteira com braços duplos e traseira multilink',
      tracao: 'Traseira (RWD)',
      multimidia: 'Tela central de 8,4" e painel digital de 16"',
      garantia: '3 anos sem limite de quilometragem, com 7 anos de manutenção programada',
    },
    fotos: [
      'img/veiculos/ferrari-roma-spider-1.jpg',
      'img/veiculos/ferrari-roma-spider-2.jpg',
      'img/veiculos/ferrari-roma-spider-3.jpg',
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
  bateria: 'Bateria',
  autonomia: 'Autonomia',
  recarga: 'Recarga',
  lugares: 'Lugares',
  capota: 'Capota',
  cambio_detalhe: 'Câmbio',
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
  const status = $('veiculo-status');
  status.textContent = v.status;
  const disponivel = v.status.toLowerCase() === 'disponível';
  status.classList.toggle('is-disponivel', disponivel);
  status.classList.toggle('is-indisponivel', !disponivel);
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
    .filter(([, val]) => val)
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
  // A foto principal não se repete nas miniaturas: ao clicar numa miniatura,
  // ela troca de lugar com a principal.
  const fotos = v.fotos.slice(0, 3);
  principal.src = fotos[0] || IMG_PADRAO;

  const thumbs = $('veiculo-thumbs');
  thumbs.innerHTML = '';
  fotos.slice(1).forEach((src, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'veiculo-thumb';
    btn.setAttribute('aria-label', `Ver foto ${i + 2}`);
    const img = document.createElement('img');
    img.alt = '';
    img.onerror = () => {
      img.onerror = null;
      img.src = IMG_PADRAO;
    };
    img.src = src;
    btn.append(img);
    btn.addEventListener('click', () => {
      const atual = principal.src;
      principal.src = img.src;
      img.src = atual;
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
