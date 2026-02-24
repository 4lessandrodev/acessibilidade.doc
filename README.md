# Exemplo Acessível — Fluxo de Login (CPF + Senha) | HTML + JS (GitHub Pages)

Este repositório contém um **site estático** (GitHub Pages) com um fluxo simples de login:

**Home → CPF → Senha → Sucesso**

O foco é demonstrar **HTML semântico**, **navegação por teclado**, **compatibilidade com leitores de tela** e boas práticas de **validação acessível** com JavaScript puro.

---

## Sumário

- [1. Estrutura do projeto](#1-estrutura-do-projeto)
- [2. Como executar (GitHub Pages)](#2-como-executar-github-pages)
- [3. Regras de acessibilidade aplicadas](#3-regras-de-acessibilidade-aplicadas)
- [4. Comportamento por página](#4-comportamento-por-página)
  - [4.1 Home](#41-home)
  - [4.2 CPF](#42-cpf)
  - [4.3 Senha](#43-senha)
  - [4.4 Sucesso](#44-sucesso)
  - [4.5 Index (documentação)](#45-index-documentação)
- [5. JavaScript: validação incremental e Enter](#5-javascript-validação-incremental-e-enter)
- [6. Padrões e exemplos de código](#6-padrões-e-exemplos-de-código)
  - [6.1 Skip link acessível](#61-skip-link-acessível)
  - [6.2 Mensagens dinâmicas (status)](#62-mensagens-dinâmicas-status)
  - [6.3 Erro de campo (alert + aria-invalid)](#63-erro-de-campo-alert--aria-invalid)
  - [6.4 Mostrar/ocultar senha (button + aria-pressed)](#64-mostrarocultar-senha-button--aria-pressed)
  - [6.5 CPF como identificador (máscara)](#65-cpf-como-identificador-máscara)
- [7. Checklist de testes](#7-checklist-de-testes)
- [8. Referências oficiais](#8-referências-oficiais)

---

## 1. Estrutura do projeto

Arquivos na raiz (compatível com GitHub Pages):

- `index.html` — documentação + links/atalhos
- `home.html` — home do exemplo
- `cpf.html` — etapa CPF
- `senha.html` — etapa Senha
- `sucesso.html` — confirmação
- `script.js` — lógica compartilhada (sem duplicação)

---

## 2. Como executar (GitHub Pages)

1. Suba os arquivos na raiz do repositório (branch `main`).
2. No GitHub: **Settings → Pages**
3. Em **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
4. A página inicial será `index.html`.

---

## 3. Regras de acessibilidade aplicadas

### 3.1 Semântica antes de ARIA
- Usamos **landmarks**: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`.
- ARIA entra apenas para:
  - rotular regiões (`aria-label`)
  - descrever relações (`aria-describedby`, `aria-labelledby`)
  - estados e mensagens (`aria-invalid`, `role="status"`, `role="alert"`, `aria-live`)

### 3.2 Não “sequestrar” o foco no carregamento
**Não aplicamos `focus()` automaticamente no load**, porque isso pode:
- tirar o usuário do **browse mode** (NVDA/JAWS)
- prejudicar a navegação por atalhos (H, T, U, etc.)

Foco é aplicado **apenas como consequência de ação** (ex.: submit com erro).

### 3.3 Navegação por teclado
- Tab / Shift+Tab percorrem elementos focáveis naturalmente.
- **Enter**:
  - no CPF: tenta avançar
  - na Senha: tenta entrar
- Botões e links são elementos reais (`<button>`, `<a>`), sem “div clicável”.

### 3.4 Validação acessível e incremental
- O erro **não aparece “cedo demais”** enquanto o usuário digita.
- O erro passa a ser exibido quando:
  - o usuário “tocou” no campo (blur)
  - ou tentou avançar (submit/Enter)
- Ao corrigir o valor, o erro some.

### 3.5 Mensagens para leitor de tela realmente audíveis
- Mensagens em `role="status"` podem não ser lidas se houver redirect imediato.
- Por isso, ao navegar de página, usamos um **delay curto** (ex.: 250ms) para permitir anúncio antes da troca.

---

## 4. Comportamento por página

### 4.1 Home
**Objetivo:** oferecer um único caminho (Login) e link para documentação.

Acessibilidade:
- Skip link para `#conteudo-principal`.
- `main` com `aria-labelledby` apontando para o `h1`.

Comportamento:
- Clique em **Login** → vai para `cpf.html`.
- Ao entrar na Home, o `script.js` limpa `sessionStorage` do demo.

### 4.2 CPF
**Objetivo:** coletar CPF como identificador, com máscara e validação.

Acessibilidade:
- `<label for="cpf">` obrigatório.
- Texto de ajuda ligado via `aria-describedby="cpf-ajuda cpf-erro"`.
- Erro usa `role="alert"` e `aria-invalid="true"` quando inválido.
- Região de mensagens globais `#mensagens` usa `role="status"` + `aria-live="polite"`.

Comportamento:
- Digitar CPF e pressionar **Enter** tenta avançar.
- Se tiver menos de 11 dígitos → erro anunciável.
- Ao completar 11 dígitos, o erro desaparece.
- CPF é formatado: `000.000.000-00` (evita leitura como “bilhões”).

### 4.3 Senha
**Objetivo:** coletar senha e permitir “mostrar/ocultar”.

Acessibilidade:
- `<input type="password">` com label explícito.
- Botão toggle é `<button>` real.
- `aria-pressed` indica estado (mostrar/ocultar).
- Erro usa `role="alert"` + `aria-invalid`.

Observação:
- Leitores de tela podem verbalizar “necessário editar texto” porque:
  - `required` → “necessário/obrigatório”
  - input → “campo de edição”

### 4.4 Sucesso
**Objetivo:** confirmar conclusão do fluxo e permitir retorno.

Acessibilidade:
- `#status` com `role="status"` e `aria-live="polite"` (mensagem curta).
- Botão `#voltar-home` com texto claro.

Comportamento:
- Se não houver sessão `demo.logged`, redireciona para Home.
- Caso contrário, anuncia mensagem e permite voltar.

### 4.5 Index (documentação)
**Objetivo:** explicar o fluxo e oferecer referências oficiais.

Acessibilidade:
- Sem dependência de JS.
- Landmarks e headings bem estruturados.
- Links externos com `rel="noopener noreferrer"`.

---

## 5. JavaScript: validação incremental e Enter

### 5.1 Enter para avançar
No CPF e na Senha:

- `keydown` captura Enter
- evita submit “cego”
- chama `tryNext()` / `tryLogin()`

Exemplo (CPF):

```js
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    tryNext();
  }
});
````

### 5.2 Validação incremental (touched/submitted)

A lógica segue a regra:

* enquanto o usuário digita (antes de blur/submit) → não “grita erro”
* após blur ou tentativa de submit → valida em tempo real

Pseudo:

```text
showError = touched || submitted
validate(showError)
```

### 5.3 Mensagem “status” antes do redirect

Para garantir que o leitor de tela ouça:

* escreve em `role="status"`
* aguarda `NAV_DELAY_MS` antes de trocar a página

---

## 6. Padrões e exemplos de código

### 6.1 Skip link acessível

```html
<a class="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
```

CSS mínimo:

* escondido fora da tela
* aparece quando recebe foco

### 6.2 Mensagens dinâmicas (status)

```html
<div id="mensagens" role="status" aria-live="polite" aria-atomic="true"></div>
```

Uso:

* mensagens informativas, sem urgência
* exemplo: “Indo para a próxima etapa”

### 6.3 Erro de campo (alert + aria-invalid)

HTML:

```html
<input aria-invalid="false" aria-describedby="cpf-ajuda cpf-erro" />
<p id="cpf-erro" role="alert"></p>
```

JS (quando inválido):

* `aria-invalid="true"`
* escreve texto no `role="alert"`

Isso faz o leitor de tela anunciar imediatamente o erro.

### 6.4 Mostrar/ocultar senha (button + aria-pressed)

```html
<button
  type="button"
  aria-controls="password"
  aria-pressed="false"
  aria-label="Mostrar senha"
>
  <span aria-hidden="true">👁</span>
</button>
```

JS:

* alterna `aria-pressed`
* alterna `aria-label` (Mostrar/Ocultar)
* alterna `input.type` (password/text)

### 6.5 CPF como identificador (máscara)

Problema real:

* sequência longa de dígitos pode ser interpretada como “número grande” (“93 bilhões…”)

Solução:

* formatar como `000.000.000-00`
* isso melhora leitura e entendimento do usuário

---

## 7. Checklist de testes

### 7.1 Teclado (sem mouse)

* Tab/Shift+Tab percorrem itens corretamente
* Enter:

  * CPF: avança se válido
  * Senha: entra se válido
* Sem “armadilhas de foco”

### 7.2 Leitor de tela (mínimo)

* NVDA (Windows)
* VoiceOver (macOS/iOS)
* TalkBack (Android)

Valide:

* headings navegáveis
* labels lidos corretamente
* erros anunciados imediatamente
* status anunciados antes do redirect

### 7.3 Ferramentas automáticas

* Axe DevTools
* Lighthouse
* WAVE

Automação não substitui teste manual.

---

## 8. Referências oficiais

# 📚 Referências Oficiais de Acessibilidade

## 🌍 WCAG — Diretrizes Oficiais

### 🔹 WCAG 2.2 (Recomendação Atual)

Diretrizes internacionais de acessibilidade para conteúdo web.
[https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)

### 🔹 WCAG 2.1 (Amplamente adotada em políticas públicas)

[https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)

### 🔹 Understanding WCAG

Explicação prática de cada critério:
[https://www.w3.org/WAI/WCAG22/Understanding/](https://www.w3.org/WAI/WCAG22/Understanding/)

---

## 🏛 WAI — Web Accessibility Initiative (W3C)

[https://www.w3.org/WAI/](https://www.w3.org/WAI/)

---

## 🧠 ARIA — Accessible Rich Internet Applications

### 🔹 Especificação ARIA

[https://www.w3.org/TR/wai-aria-1.2/](https://www.w3.org/TR/wai-aria-1.2/)

### 🔹 ARIA Authoring Practices Guide (APG)

[https://www.w3.org/WAI/ARIA/apg/](https://www.w3.org/WAI/ARIA/apg/)

---

## 🏷 HTML Semântico (Base da Acessibilidade)

### 🔹 HTML Living Standard

[https://html.spec.whatwg.org/](https://html.spec.whatwg.org/)

### 🔹 MDN Web Docs (referência prática)

[https://developer.mozilla.org/pt-BR/docs/Web/Accessibility](https://developer.mozilla.org/pt-BR/docs/Web/Accessibility)

---

## ♿ Leitores de Tela (Testes Recomendados)

### 🔹 NVDA (Windows)

[https://www.nvaccess.org/](https://www.nvaccess.org/)

### 🔹 JAWS (Windows)

[https://www.freedomscientific.com/products/software/jaws/](https://www.freedomscientific.com/products/software/jaws/)

### 🔹 VoiceOver (macOS / iOS)

[https://support.apple.com/pt-br/guide/voiceover/welcome/mac](https://support.apple.com/pt-br/guide/voiceover/welcome/mac)

### 🔹 TalkBack (Android)

[https://support.google.com/accessibility/android/answer/6283677](https://support.google.com/accessibility/android/answer/6283677)

---

## 🇧🇷 Legislação Brasileira

### 🔹 Lei Brasileira de Inclusão (LBI) — Lei nº 13.146/2015

[http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm)

### 🔹 eMAG — Modelo de Acessibilidade em Governo Eletrônico

[https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/emag](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/emag)

---

## 🧪 Ferramentas de Teste

### 🔹 WAVE (WebAIM)

[https://wave.webaim.org/](https://wave.webaim.org/)

### 🔹 Axe DevTools (Deque)

[https://www.deque.com/axe/](https://www.deque.com/axe/)

### 🔹 Lighthouse (Chrome DevTools)

[https://developer.chrome.com/docs/lighthouse/](https://developer.chrome.com/docs/lighthouse/)

---

## 🎯 Observação importante

WCAG não é uma ferramenta.
É um conjunto de critérios técnicos.

A validação correta combina:

1. Teste com teclado
2. Teste com leitor de tela
3. Ferramentas automáticas
4. Revisão manual com checklist WCAG

