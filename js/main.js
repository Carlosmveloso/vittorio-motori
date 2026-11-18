// =============================================================
// Vittorio Motori · Código compartilhado
// -------------------------------------------------------------
// Funções usadas por mais de uma página. Carregue este arquivo
// antes dos scripts de cada página:
//   <script src="js/main.js"></script>
//   <script src="js/dados.js"></script>      (se a página usa os carros)
//   <script src="js/veiculo.js"></script>    (script da página)
// =============================================================

const IMG_PADRAO = 'img/carro-placeholder.svg';
const WHATSAPP = '5585000000000';

// Atalho para document.getElementById.
const $ = (id) => document.getElementById(id);

// ---------- Formatação ----------------------------------------

// 219900 → "R$ 219.900"
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}

// 38000 → "38.000 km" · 0 → "0 km"
function formatarKm(km) {
  return km === 0 ? '0 km' : `${km.toLocaleString('pt-BR')} km`;
}

// ---------- Veículos ------------------------------------------

function estaDisponivel(veiculo) {
  return veiculo.status.toLowerCase() === 'disponível';
}

// "BMW 320i 2022"
function nomeCompleto(veiculo) {
  return `${veiculo.marca} ${veiculo.modelo} ${veiculo.ano}`;
}

// Link do WhatsApp com uma mensagem pronta.
function linkWhatsApp(mensagem) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

// Troca a imagem pela padrão se o arquivo não carregar.
function usarImagemPadraoSeFalhar(img) {
  img.onerror = () => {
    img.onerror = null;
    img.src = IMG_PADRAO;
  };
}

// ---------- Todas as páginas ----------------------------------

// Mantém o ano do rodapé sempre atualizado.
// No HTML: <span class="ano-atual">2026</span>
document.querySelectorAll('.ano-atual').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
