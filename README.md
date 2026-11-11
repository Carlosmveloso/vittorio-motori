# Vittorio Motori

Site de uma concessionária fictícia de carros novos e seminovos, desenvolvido como Projeto Final da disciplina usando apenas **HTML, CSS e JavaScript**.

🔗 **Site:** https://usuario.github.io/vittorio-motori
🎨 **Design (Figma):** https://www.figma.com/design/oIA2ZBjJT8ayKzNfuWPYIw

---

## Páginas

| Página | Arquivo | Conteúdo |
|---|---|---|
| Início | `index.html` | Banner, apresentação da loja e chamada para o estoque |
| Estoque | `estoque.html` | Lista de veículos com busca e filtros |
| Financiamento | `financiamento.html` | Formas de pagamento e financiamento |
| Test Drive | `test-drive.html` | Formulário de agendamento |
| Sobre | `sobre.html` | História, endereço e horário de funcionamento |
| Contato | `contato.html` | Formulário de contato e botão de WhatsApp |
| Detalhes do Veículo | `veiculo.html` | Foto e ficha técnica do carro (fora do menu) |

## Funcionalidades

- Busca pelo nome do modelo
- Filtros por marca, categoria, condição (novo/seminovo) e faixa de preço
- Ordenação por menor ou maior preço
- Mensagem "Nenhum veículo encontrado" quando não há resultados
- Selo "0 km" para carros novos e quilometragem para seminovos
- Agendamento de test drive com validação (campos obrigatórios, sem datas passadas, segunda a sábado das 8h às 18h)
- Formulário de contato com validação de e-mail
- Layout responsivo

## Tecnologias

- HTML5 semântico
- CSS3 (Flexbox, Grid, variáveis CSS e media queries)
- JavaScript puro (ES6+)
- Google Fonts: DM Sans e Instrument Serif
- Git e GitHub
- GitHub Pages (deploy)

## Estrutura de pastas

```
vittorio-motori/
├── index.html
├── estoque.html
├── veiculo.html
├── financiamento.html
├── test-drive.html
├── sobre.html
├── contato.html
├── css/
│   ├── style.css         # estilo global (cores, fontes, header e footer)
│   ├── inicio.css
│   ├── estoque.css
│   ├── veiculo.css
│   ├── financiamento.css
│   ├── test-drive.css
│   ├── sobre.css
│   └── contato.css
├── js/
│   ├── main.js           # menu e funções comuns
│   ├── dados.js          # lista de veículos
│   ├── estoque.js
│   ├── veiculo.js
│   ├── test-drive.js
│   └── contato.js
└── img/
    ├── logo.svg
    └── veiculos/
```

## Identidade visual

| Uso | Cor | Variável |
|---|---|---|
| Fundo principal | `#0B0F0E` | `--bg` |
| Fundo das seções | `#111715` | `--bg-section` |
| Cards | `#161D1B` | `--surface` |
| Bordas | `#262E2B` | `--border` |
| Texto principal | `#F2F0EA` | `--text` |
| Texto secundário | `#9AA09C` | `--text-muted` |
| Destaque | `#C8D1BA` | `--accent` |
| Botão primário | `#F3F1EA` | `--btn-primary` |

## Como rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/vittorio-motori.git
   ```
2. Abra a pasta no VS Code.
3. Clique com o botão direito no `index.html` e escolha **Open with Live Server**.

## Como contribuir

Cada integrante trabalha na sua própria branch e edita só os arquivos da página que estiver fazendo.

```bash
git checkout -b pagina-estoque     # cria a branch
git pull origin main               # atualiza com a main
git add .
git commit -m "Adiciona filtro por marca no estoque"
git push origin pagina-estoque     # envia e abre um pull request
```

## Equipe

- Carlos Eduardo Marques Veloso
- Arthur George Azevedo Colaco
- Rafael Ricardo de Queiroz Farias
- Gabriele Garrisi
- Gabriel Uchôa
- Caiã Araujo

---

Projeto acadêmico. Os veículos, preços e dados de contato são fictícios.    