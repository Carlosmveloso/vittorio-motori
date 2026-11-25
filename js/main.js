// =============================================================
// Vittorio Motori - Código compartilhado
// -------------------------------------------------------------
// Funções que mais de uma página pode usar.
// Este arquivo precisa ser carregado ANTES dos outros scripts:
//   <script src="js/main.js"></script>
//   <script src="js/dados.js"></script>
//   <script src="js/veiculo.js"></script>
// =============================================================

// Imagem usada quando a foto do carro não carrega
const IMG_PADRAO = 'img/carro-placeholder.svg';

// Número do WhatsApp da loja (só números, com DDI e DDD)
const WHATSAPP = '5585000000000';


// Atalho: pega um elemento do HTML pelo id
function pegar(id) {
  return document.getElementById(id);
}


// Transforma 219900 em "R$ 219.900"
function formatarPreco(valor) {
  return 'R$ ' + valor.toLocaleString('pt-BR');
}


// Transforma 38000 em "38.000 km"
function formatarKm(km) {
  return km.toLocaleString('pt-BR') + ' km';
}


// Responde true se o carro estiver disponível
function estaDisponivel(veiculo) {
  if (veiculo.status == 'Disponível') {
    return true;
  } else {
    return false;
  }
}


// Monta o nome do carro, por exemplo "BMW 320i 2022"
function nomeCompleto(veiculo) {
  return veiculo.marca + ' ' + veiculo.modelo + ' ' + veiculo.ano;
}


// Monta o link do WhatsApp já com a mensagem escrita
function linkWhatsApp(mensagem) {
  return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensagem);
}


// Coloca o ano atual no rodapé
// No HTML: <span class="ano-atual">2026</span>
function atualizarAnoRodape() {
  const anos = document.getElementsByClassName('ano-atual');
  const anoAtual = new Date().getFullYear();

  for (let i = 0; i < anos.length; i++) {
    anos[i].textContent = anoAtual;
  }
}

atualizarAnoRodape();
