form.telefone.addEventListener("input", () => {
  const d = form.telefone.value.replace(/\D/g, "").slice(0, 11);
  const cut = d.length > 10 ? 7 : 6;
  let out = d;
  if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2, cut)}`;
  if (d.length > cut) out += `-${d.slice(cut)}`;
  form.telefone.value = out;
});

const rules = {
  nome: v => v.trim().length >= 3 || "Digite seu nome completo.",
  telefone: v => v.replace(/\D/g, "").length >= 10 || "Digite o telefone com DDD.",
  email: v => emailRe.test(v.trim()) || "Digite um e-mail válido.",
  veiculo: v => v !== "" || "Escolha um veículo.",
  data: v => {
    if (!v) return "Escolha uma data.";
    if (v < hoje) return "Escolha uma data futura.";
    if (new Date(v + "T00:00:00").getDay() === 0) return "Atendemos de segunda a sábado.";
    return true;
  },
  horario: v => v !== "" || "Escolha um horário.",
};