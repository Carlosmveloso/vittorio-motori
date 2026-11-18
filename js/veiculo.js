// =============================================================
// Vittorio Motori - Página de um veículo (veiculo.html)
// -------------------------------------------------------------
// Pega o carro escolhido no link (ex.: veiculo.html?id=3),
// procura ele na lista "veiculos" (js/dados.js) e preenche a
// página. Usa as funções do js/main.js.
// =============================================================

// Quantas fotos aparecem no máximo (1 principal + 2 miniaturas)
const MAX_FOTOS = 3;


// Lê o id que está no link e devolve o carro com esse id.
// Se não tiver id no link, mostra o primeiro carro da lista.
// Se o id não existir, devolve null.
function buscarVeiculo() {
  const parametros = new URLSearchParams(location.search);
  let id = Number(parametros.get('id'));

  if (id == 0) {
    id = veiculos[0].id;
  }

  for (let i = 0; i < veiculos.length; i++) {
    if (veiculos[i].id == id) {
      return veiculos[i];
    }
  }

  return null;
}


// Monta uma linha da ficha:  Rótulo ........ valor
function criarLinha(rotulo, valor) {
  return '<div class="veiculo-ficha-linha">' +
           '<dt>' + rotulo + '</dt>' +
           '<dd>' + valor + '</dd>' +
         '</div>';
}


// Título, selos, resumo e preço (parte de cima da página)
function mostrarCabecalho(carro) {
  document.title = nomeCompleto(carro) + ' | Vittorio Motori';
  pegar('veiculo-crumb').textContent = nomeCompleto(carro);

  // Selo de novo ou seminovo
  if (carro.km == 0) {
    pegar('veiculo-selo').textContent = 'Novo · 0 km';
  } else {
    pegar('veiculo-selo').textContent = 'Seminovo · ' + formatarKm(carro.km);
  }

  // Selo de status: verde se disponível, vermelho se não
  const status = pegar('veiculo-status');
  status.textContent = carro.status;

  if (estaDisponivel(carro)) {
    status.className = 'veiculo-selo veiculo-selo-status is-disponivel';
  } else {
    status.className = 'veiculo-selo veiculo-selo-status is-indisponivel';
  }

  pegar('veiculo-titulo').innerHTML = carro.marca + ' <em>' + carro.modelo + '</em>';

  pegar('veiculo-resumo').textContent =
    carro.ano + ' · ' + carro.categoria + ' · ' + carro.cambio + ' · ' + carro.combustivel;

  pegar('veiculo-preco').textContent = formatarPreco(carro.preco);
}


// Caixa "Ficha técnica"
function mostrarFicha(carro) {
  let html = '';

  html += criarLinha('Marca', carro.marca);
  html += criarLinha('Modelo', carro.modelo);
  html += criarLinha('Ano', carro.ano);
  html += criarLinha('Quilometragem', formatarKm(carro.km));
  html += criarLinha('Câmbio', carro.cambio);
  html += criarLinha('Combustível', carro.combustivel);
  html += criarLinha('Cor', carro.cor);
  html += criarLinha('Categoria', carro.categoria);
  html += criarLinha('Status', carro.status);

  pegar('veiculo-ficha').innerHTML = html;
}


// Seção "Especificações completas"
// Percorre cada campo de carro.detalhes e usa o nome bonito
// que está em ROTULOS (js/dados.js).
function mostrarDetalhes(carro) {
  let html = '';

  for (let campo in carro.detalhes) {
    const valor = carro.detalhes[campo];

    // Pula campos vazios (null)
    if (valor) {
      let rotulo = ROTULOS[campo];

      // Se o campo não tiver nome em ROTULOS, usa o próprio nome
      if (!rotulo) {
        rotulo = campo;
      }

      html += criarLinha(rotulo, valor);
    }
  }

  pegar('veiculo-detalhes').innerHTML = html;
}


// Foto grande + miniaturas.
// Ao clicar numa miniatura, ela troca de lugar com a foto grande.
function mostrarGaleria(carro) {
  const fotoGrande = pegar('veiculo-foto');
  fotoGrande.alt = nomeCompleto(carro);

  // Se o carro não tiver fotos, usa a imagem padrão
  if (carro.fotos.length == 0) {
    fotoGrande.src = IMG_PADRAO;
    return;
  }

  fotoGrande.src = carro.fotos[0];

  // Miniaturas: da 2ª até a 3ª foto
  let html = '';
  for (let i = 1; i < carro.fotos.length && i < MAX_FOTOS; i++) {
    html += '<button type="button" class="veiculo-thumb" aria-label="Ver foto ' + (i + 1) + '">' +
              '<img src="' + carro.fotos[i] + '" alt="">' +
            '</button>';
  }
  pegar('veiculo-thumbs').innerHTML = html;

  // Faz cada miniatura trocar de lugar com a foto grande ao clicar
  const botoes = document.getElementsByClassName('veiculo-thumb');
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].onclick = function () {
      const miniatura = this.getElementsByTagName('img')[0];
      const fotoAntiga = fotoGrande.src;

      fotoGrande.src = miniatura.src;
      miniatura.src = fotoAntiga;
    };
  }
}


// Links dos botões "Agendar test drive" e "Falar no WhatsApp"
function mostrarContato(carro) {
  pegar('veiculo-testdrive').href = 'teste-drive.html?id=' + carro.id;
  pegar('veiculo-whats').href = linkWhatsApp('Olá! Tenho interesse no ' + nomeCompleto(carro) + '.');
}


// Começa tudo
function iniciar() {
  const carro = buscarVeiculo();

  // Carro não encontrado: esconde a página e mostra o aviso
  if (carro == null) {
    pegar('veiculo-conteudo').hidden = true;
    pegar('veiculo-erro').hidden = false;
    return;
  }

  mostrarCabecalho(carro);
  mostrarFicha(carro);
  mostrarDetalhes(carro);
  mostrarGaleria(carro);
  mostrarContato(carro);
}

iniciar();
