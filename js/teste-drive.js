
const form = document.getElementById("agendamento-form");
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hoje = new Date().toLocaleDateString("sv-SE");

form.data.min = hoje;


form.telefone.addEventListener("input", () => {
  const d = form.telefone.value.replace(/\D/g, "").slice(0, 11);
  const cut = d.length > 10 ? 7 : 6;

  let out = d;

  if (d.length > 2) {
    out = `(${d.slice(0, 2)}) ${d.slice(2, cut)}`;
  }

  if (d.length > cut) {
    out += `-${d.slice(cut)}`;
  }

  form.telefone.value = out;
});


const rules = {
  nome: v =>
    v.trim().length >= 3 ||
    "Digite seu nome completo.",

  telefone: v =>
    v.replace(/\D/g, "").length >= 10 ||
    "Digite o telefone com DDD.",

  email: v =>
    emailRe.test(v.trim()) ||
    "Digite um e-mail válido.",

  veiculo: v =>
    v !== "" ||
    "Escolha um veículo.",

  data: v => {
    if (!v) {
      return "Escolha uma data.";
    }

    if (v < hoje) {
      return "Escolha hoje ou uma data futura.";
    }

    const dia = new Date(v + "T00:00:00").getDay();

    if (dia === 0) {
      return "Atendemos de segunda a sábado.";
    }

    return true;
  },

  horario: v =>
    v !== "" ||
    "Escolha um horário."
};


function validate(name) {
  const field = form.elements.namedItem(name);

  if (!field || !rules[name]) {
    return false;
  }

  const result = rules[name](field.value);
  const wrap = field.closest(".field");

  wrap.classList.toggle("invalid", result !== true);

  wrap.querySelector(".error").textContent =
    result === true ? "" : result;

  field.setAttribute(
    "aria-invalid",
    result !== true ? "false" : "true"
  );

  return result === true;
}


Object.keys(rules).forEach(name => {
  const field = form.elements.namedItem(name);

  field.addEventListener("blur", () => {
    validate(name);
  });

  field.addEventListener("input", () => {
    if (field.closest(".field").classList.contains("invalid")) {
      validate(name);
    }
  });

  field.addEventListener("change", () => {
    validate(name);
  });
});


form.addEventListener("submit", e => {
  e.preventDefault();

  sucesso.hidden = true;

  const valid = Object.keys(rules)
    .map(validate)
    .every(Boolean);

  if (!valid) {
    form.querySelector(
      ".invalid input, .invalid select, .invalid textarea"
    )?.focus();

    return;
  }

  const dados = Object.fromEntries(new FormData(form));

  console.log("Agendamento pronto para envio:", dados);

  form.reset();

  Object.keys(rules).forEach(name => {
    const field = form.elements.namedItem(name);
    const wrap = field.closest(".field");

    wrap.classList.remove("invalid");
    wrap.querySelector(".error").textContent = "";

    field.setAttribute("aria-invalid", "false");
  });

  sucesso.hidden = false;

  setTimeout(() => {
    sucesso.hidden = true;
  }, 8000);
});
