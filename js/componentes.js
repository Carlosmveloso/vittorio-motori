/* =============================================================
   Header e footer compartilhados
   -------------------------------------------------------------
   A ideia: em vez de copiar o mesmo menu e o mesmo rodapé em toda
   página, cada um mora em um arquivo só (pasta componentes/) e este
   script busca e encaixa os dois na página.

   Para usar em outra página, são só três coisas:

     1. No lugar do menu:    <div data-componente="header"></div>
     2. No lugar do rodapé:  <div data-componente="footer"></div>
     3. Antes de fechar o body: <script src="js/componentes.js"></script>

   Importante: precisa abrir o site com o Live Server. Com dois
   cliques no arquivo (endereço file://), o navegador bloqueia o
   fetch por segurança e o menu não aparece.
   ============================================================= */


// Busca o arquivo do componente e coloca o HTML dele dentro do espaço
// reservado. O "await" faz o código esperar o arquivo chegar.
async function carregarComponente(espaco) {
  const nome = espaco.dataset.componente; // "header" ou "footer"

  try {
    const resposta = await fetch(`componentes/${nome}.html`);

    // O fetch não reclama sozinho de arquivo que não existe (erro 404),
    // então a gente confere se deu tudo certo.
    if (!resposta.ok) throw new Error(`resposta ${resposta.status}`);

    espaco.innerHTML = await resposta.text();
  } catch (erro) {
    console.error(`Não deu para carregar o ${nome}:`, erro);

    // Se alguém abriu o arquivo com dois cliques, explica o motivo na
    // própria página, em vez de deixar só um buraco no lugar do menu.
    if (location.protocol === 'file:') {
      espaco.textContent = `O ${nome} não carregou: abra o site com o Live Server.`;
    }
  }
}

// Pega só o nome da página, sem pasta, sem ".html" e sem "?id=3".
// "/vittorio-motori/sobre.html" → "sobre"
// Quando o endereço termina em "/", quem está aberto é o index.
function nomeDaPagina(caminho) {
  const arquivo = caminho.split('/').pop();
  return arquivo.replace('.html', '') || 'index';
}

// Deixa destacado no menu o link da página em que a pessoa está.
// Tem página que não aparece no menu, como a de detalhes do carro.
// Nela dá para avisar qual link destacar: <body data-pagina="estoque">
function marcarPaginaAtual() {
  const atual = document.body.dataset.pagina || nomeDaPagina(location.pathname);

  document.querySelectorAll('.nav-list a').forEach((link) => {
    if (nomeDaPagina(link.pathname) === atual) {
      // O leitor de tela usa isso para dizer "página atual", e o CSS usa
      // para colocar o risquinho embaixo do link.
      link.setAttribute('aria-current', 'page');
    }
  });
}

// Deixa o ano do rodapé sempre em dia.
function atualizarAno() {
  document.querySelectorAll('.ano-atual').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

// Carrega o header e o footer ao mesmo tempo e só depois mexe neles.
// A ordem importa: não dá para destacar um link que ainda não chegou.
async function montarPagina() {
  const espacos = document.querySelectorAll('[data-componente]');
  await Promise.all([...espacos].map(carregarComponente));

  marcarPaginaAtual();
  atualizarAno();
}

montarPagina();
