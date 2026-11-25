// js/contato.js | validação do formulário de contato

const form = document.getElementById('contato-form');
const dica = document.getElementById('contato-dica');
const textoPadrao = dica.textContent;

dica.setAttribute('aria-live', 'polite'); // leitor de tela avisa quando o texto muda

const campos = {
  nome: document.getElementById('nome'),
  email: document.getElementById('email'),
  telefone: document.getElementById('telefone'),
  mensagem: document.getElementById('mensagem')
};

// Cada regra devolve '' se está ok, ou o texto do erro
const regras = {
  nome: valor => valor.length >= 3 ? '' : 'Digite seu nome (mínimo 3 letras).',
  email: valor => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
    ? '' : 'Digite um e-mail válido, como nome@email.com.',
  telefone: valor => {
    if (valor === '') return ''; // telefone é opcional
    const digitos = valor.replace(/\D/g, '');
    return digitos.length === 10 || digitos.length === 11
      ? '' : 'Telefone com DDD: 10 ou 11 números.';
  },
  mensagem: valor => valor.length >= 10
    ? '' : 'Escreva uma mensagem com pelo menos 10 caracteres.'
};

function marcar(campo, invalido) {
  campo.classList.toggle('invalido', invalido);
  campo.setAttribute('aria-invalid', invalido ? 'true' : 'false');
}

form.addEventListener('submit', function (evento) {
  evento.preventDefault(); // impede o envio padrão (que jogava os dados na URL)

  let primeiroErro = '';
  let primeiroCampo = null;

  for (const nome in regras) {
    const campo = campos[nome];
    const erro = regras[nome](campo.value.trim());
    marcar(campo, erro !== '');
    if (erro && !primeiroErro) {
      primeiroErro = erro;
      primeiroCampo = campo;
    }
  }

  if (primeiroErro) {
    dica.textContent = primeiroErro;
    dica.classList.add('erro');
    primeiroCampo.focus();
    return;
  }

  dica.classList.remove('erro');
  dica.textContent = 'Mensagem enviada! Em breve a equipe entra em contato.';
  form.reset();
});

// Quando o usuário corrige um campo, o erro some na hora
form.addEventListener('input', function (evento) {
  const campo = evento.target;
  if (!campo.classList.contains('invalido')) return;

  marcar(campo, regras[campo.name](campo.value.trim()) !== '');

  if (!form.querySelector('.invalido')) {
    dica.classList.remove('erro');
    dica.textContent = textoPadrao;
  }
});