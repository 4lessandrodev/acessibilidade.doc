# 📚 Referências Oficiais de Acessibilidade

## 🌍 WCAG — Diretrizes Oficiais

### 🔹 WCAG 2.2 (Recomendação Atual)

Diretrizes internacionais de acessibilidade para conteúdo web.

[https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)

### 🔹 WCAG 2.1 (Amplamente adotada em políticas públicas)

[https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)

### 🔹 Versão resumida e explicada (Understanding WCAG)

Explicação prática de cada critério:
[https://www.w3.org/WAI/WCAG22/Understanding/](https://www.w3.org/WAI/WCAG22/Understanding/)

---

## 🏛 WAI — Web Accessibility Initiative (W3C)

Página oficial sobre acessibilidade web:
[https://www.w3.org/WAI/](https://www.w3.org/WAI/)

---

## 🧠 ARIA — Accessible Rich Internet Applications

### 🔹 Especificação ARIA

[https://www.w3.org/TR/wai-aria-1.2/](https://www.w3.org/TR/wai-aria-1.2/)

### 🔹 Authoring Practices Guide (APG)

Guia prático de como implementar componentes acessíveis:
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

### 🔹 Lei Brasileira de Inclusão (LBI)

Lei nº 13.146/2015

[http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm)

### 🔹 eMAG — Modelo de Acessibilidade em Governo Eletrônico

Baseado na WCAG, adaptado ao Brasil.

[https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/emag](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/emag)

---

## 🧪 Ferramentas de Teste de Acessibilidade

### 🔹 WAVE (WebAIM)

[https://wave.webaim.org/](https://wave.webaim.org/)

### 🔹 Axe DevTools

[https://www.deque.com/axe/](https://www.deque.com/axe/)

### 🔹 Lighthouse (Chrome DevTools)

[https://developer.chrome.com/docs/lighthouse/](https://developer.chrome.com/docs/lighthouse/)

---

# 🎯 Observação Importante

WCAG não é uma ferramenta.
É um conjunto de critérios técnicos.

A melhor forma de validar acessibilidade é:

     1. Testar com teclado
     2. Testar com leitor de tela
     3. Usar ferramentas automáticas
     4. Validar manualmente com checklist WCAG


---


# README — Documentação de Acessibilidade  

## Página: Login — Identificação por CPF

Este documento explica de forma clara e acessível por que essa tela é acessível, quais elementos semânticos foram utilizados, como leitores de tela interpretam cada parte e quais boas práticas estão sendo aplicadas.

O objetivo é que qualquer pessoa — mesmo sem conhecimento técnico profundo — compreenda como essa página atende aos princípios de acessibilidade.

---

# 1. Visão Geral de Acessibilidade

Esta página é acessível porque:

- Usa **HTML semântico**
- Permite navegação por **teclado**
- Comunica corretamente **erros e mensagens**
- É compreensível para **leitores de tela**
- Não depende apenas de elementos visuais

Ela segue os princípios da WCAG:

- **Perceptível**
- **Operável**
- **Compreensível**
- **Robusta**

---

# 2. Estrutura Semântica da Página

## `<html lang="pt-BR">`

### O que faz:
Define o idioma principal da página.

### Como o leitor de tela reage:
O leitor pronuncia corretamente em português.

### Boa prática:
Sempre definir o idioma da página.

---

## Skip Link

```html
<a href="#conteudo-principal">Pular para o conteúdo principal</a>
````

### O que resolve:

Usuários de teclado podem pular a navegação repetitiva.

### Comportamento do leitor:

O primeiro foco ao pressionar TAB será esse link.

### Boa prática:

Sempre incluir skip link em páginas com navegação.

---

## `<header>` e `<nav>`

```html
<nav aria-label="Navegação superior">
```

### Por que usar `aria-label`?

Leitores de tela anunciam:

> "Navegação superior, região"

Isso ajuda a diferenciar essa navegação de outras.

---

## Botão Voltar

```html
<a href="javascript:history.back()" aria-label="Voltar para a tela anterior">
```

### Por que `aria-label`?

O ícone visual é apenas uma seta.
Sem `aria-label`, o leitor poderia anunciar apenas:

> "Link"

Com `aria-label`, ele anuncia:

> "Voltar para a tela anterior, link"

---

## `<main>`

Define o conteúdo principal.

Leitores de tela permitem navegar diretamente para o `<main>`.

Boa prática: usar apenas um `<main>` por página.

---

## `<section>`

Agrupa o conteúdo relacionado ao CPF.

Associado com:

```html
aria-labelledby="titulo-secao"
```

Isso conecta a seção ao `<h1>`.

---

## `<h1>`

```html
<h1 id="titulo-secao">Qual o seu CPF?</h1>
```

### Importância:

Leitores de tela permitem navegação por títulos.

Usuários podem pressionar a tecla para navegar apenas entre headings.

Boa prática: um único `<h1>` por página.

---

# 3. Região de Mensagens Dinâmicas

```html
<div id="mensagens"
     role="status"
     aria-live="polite"
     aria-atomic="true"></div>
```

## O que isso faz?

Permite que mensagens sejam anunciadas automaticamente.

### `role="status"`

Mensagem informativa.

### `aria-live="polite"`

O leitor aguarda terminar a fala atual antes de anunciar.

### `aria-atomic="true"`

Lê a mensagem inteira, não apenas parte alterada.

### Exemplos de uso:

* "CPF inválido"
* "Usuário não encontrado"

---

# 4. Estrutura do Formulário

## `<form>`

```html
<form novalidate>
```

### Por que `novalidate`?

Permite validação personalizada e acessível.

---

## `<fieldset>` e `<legend>`

```html
<fieldset>
  <legend>Identificação</legend>
```

### O que fazem:

Agrupam campos relacionados.

### Como o leitor anuncia:

> "Identificação, grupo"

Isso fornece contexto.

Boa prática: sempre usar para agrupar campos relacionados.

---

# 5. Campo CPF

## Label

```html
<label for="cpf">Digite seu CPF</label>
```

### Por que é essencial?

O leitor anuncia o label ao focar no input.

Sem label, o campo ficaria ambíguo.

Boa prática: nunca substituir label por placeholder.

---

## Texto de Ajuda

```html
<p id="cpf-ajuda">Formato: 000.000.000-00</p>
```

Associado via:

```html
aria-describedby="cpf-ajuda cpf-erro"
```

### Comportamento:

Ao focar no campo, o leitor pode anunciar também o formato esperado.

---

## Input

```html
<input
  inputmode="numeric"
  autocomplete="username"
  required
  aria-invalid="false"
/>
```

### Atributos importantes:

#### `inputmode="numeric"`

Sugere teclado numérico em dispositivos móveis.

#### `autocomplete="username"`

Ajuda tecnologias assistivas e preenchimento automático.

#### `required`

Indica que o campo é obrigatório.

#### `aria-invalid`

Indica estado de erro.

Se houver erro:

```html
aria-invalid="true"
```

O leitor anunciará:

> "Inválido"

---

# 6. Mensagem de Erro

```html
<p id="cpf-erro" role="alert">Mensagem</p>
```

## `role="alert"`

### O que faz:

Mensagem urgente.

### Comportamento:

Leitor interrompe a leitura atual e anuncia imediatamente.

Usado para:

* CPF inválido
* Campo obrigatório não preenchido

---

# 7. Link Alternativo — Não possui CPF

```html
<a href="/login/documento">
```

É um link real (não botão disfarçado).

Leitor anuncia:

> "Não possui CPF? link"

Boa prática:
Nunca usar `<div>` clicável.

---

# 8. Botão Próximo

```html
<button type="submit">Próximo</button>
```

### Por que é acessível?

     * É focável
     * Funciona com Enter e Espaço
     * É semanticamente correto

Leitor anuncia:

> "Próximo, botão"

---

# 9. Link Cadastrar

Link real para outra página.

Leitor anuncia:

> "Cadastrar, link"

---

# 10. `<aside>` — Área de Suporte

```html
<aside aria-label="Ajuda e suporte">
```

### O que faz:

Define conteúdo complementar.

Leitor anuncia:

> "Ajuda e suporte, região"

Usuários podem navegar diretamente até ela.

---

# 11. Navegação por Teclado

A ordem natural de foco:

     1. Pular para conteúdo
     2. Voltar
     3. Campo CPF
     4. Link "Não possui CPF?"
     5. Botão Próximo
     6. Link Cadastrar
     7. Link Suporte

Nenhum elemento depende apenas do mouse.

---

# 12. Comportamento dos Leitores de Tela

Usuários podem navegar por:

     * Títulos
     * Regiões
     * Formulários
     * Botões
     * Links

Leitores compatíveis:

     * NVDA
     * JAWS
     * VoiceOver
     * TalkBack

---

# 13. Boas Práticas Aplicadas

     ✔ HTML semântico
     ✔ ARIA apenas quando necessário
     ✔ Labels explícitos
     ✔ Mensagens dinâmicas anunciadas
     ✔ Erros anunciados imediatamente
     ✔ Navegação por teclado
     ✔ Estrutura hierárquica correta
     ✔ Regiões identificadas

---

# 14. O que NÃO foi feito (intencionalmente)

     ❌ Não usar placeholder como label
     ❌ Não usar div como botão
     ❌ Não usar apenas cor para indicar erro
     ❌ Não usar JavaScript que quebre navegação por teclado

---

# 15. Conclusão

Essa página é acessível porque:

     * É estruturada corretamente
     * Comunica estados claramente
     * Funciona com teclado
     * Funciona com leitores de tela
     * Segue WCAG 2.1

Acessibilidade não é adicionar ARIA.
É escrever HTML correto e complementar apenas quando necessário.

Essa página faz exatamente isso.


---

# README — Documentação de Acessibilidade  

## Página: Login — Informe sua senha

Este documento explica, de forma simples e objetiva, por que essa página é acessível, quais tags foram utilizadas, como leitores de tela se comportam e quais boas práticas estão sendo aplicadas.

O objetivo é que qualquer pessoa — mesmo sem experiência técnica em acessibilidade — consiga entender o que torna essa página utilizável por pessoas com deficiência visual ou que navegam apenas por teclado.

---

# 1. O que torna essa página acessível?

Uma página acessível precisa:

- Ter **estrutura semântica clara**
- Ser **navegável por teclado**
- Ser compreensível por **leitores de tela**
- Comunicar corretamente **erros e estados**
- Não depender apenas de elementos visuais

Essa página atende a esses pontos utilizando:

- HTML semântico
- Associação correta de labels com inputs
- Atributos ARIA quando necessário
- Regiões dinâmicas para mensagens
- Controle adequado do botão “mostrar senha”

---

# 2. Estrutura Semântica (HTML correto)

A base da acessibilidade é o HTML bem estruturado.

## `<html lang="pt-BR">`

### O que faz:
Define o idioma da página.

### Como o leitor de tela se comporta:
O leitor usa a pronúncia correta em português.

### Boa prática:
Sempre definir o idioma correto da página.

---

## `<header>`

### O que faz:
Representa o cabeçalho da página.

### Como o leitor de tela se comporta:
Leitores permitem navegação por regiões. Usuários podem pular direto para o header.

---

## `<nav aria-label="Navegação superior">`

### O que faz:
Define uma área de navegação.

### Por que `aria-label`?
Existem várias possíveis navegações. O rótulo ajuda o leitor de tela a dizer:

> "Navegação superior"

### Boa prática:
Sempre rotular regiões quando houver mais de uma navegação.

---

## `<main>`

### O que faz:
Define o conteúdo principal da página.

### Comportamento do leitor:
Usuários podem pressionar atalhos para ir direto ao conteúdo principal.

### Boa prática:
Sempre usar `<main>` apenas uma vez por página.

---

## `<section>`

### O que faz:
Agrupa conteúdo relacionado.

### Por que usar `aria-labelledby` e `aria-describedby`?

- `aria-labelledby="titulo-secao"` → O leitor usa o `<h1>` como título da seção.
- `aria-describedby="descricao-secao"` → Lê também a descrição associada.

Isso melhora a compreensão do contexto.

---

## `<h1>`

### O que faz:
Define o título principal da página.

### Comportamento:
Leitores de tela permitem navegação por títulos.
Usuários podem pressionar tecla para navegar apenas entre headings.

### Boa prática:
Sempre ter um único `<h1>` por página.

---

# 3. Acessibilidade no Formulário

Formulários são críticos para acessibilidade.

---

## `<form>`

### O que faz:
Define o formulário.

### `novalidate`
Evita que apenas o navegador controle a validação.
Permite validação acessível personalizada.

---

## `<fieldset>` e `<legend>`

### O que fazem:
Agrupam campos relacionados.

### Como o leitor de tela anuncia:
> "Autenticação, grupo"

Isso dá contexto ao usuário.

### Boa prática:
Sempre usar `fieldset` para grupos lógicos.

---

## `<label for="password">`

### O que faz:
Associa texto ao campo de senha.

### Comportamento do leitor:
Ao focar no input, o leitor anuncia:

> "Digite sua senha, campo de edição protegido"

### Boa prática:
Nunca usar placeholder como substituto de label.

---

## `<input type="password">`

### Atributos importantes:

#### `autocomplete="current-password"`
Ajuda tecnologias assistivas e gerenciadores de senha.

#### `required`
Indica que o campo é obrigatório.

#### `aria-describedby`
Conecta o campo às mensagens auxiliares e de erro.

#### `aria-invalid="false"`
Indica estado de validação.

Se houver erro:
```html
aria-invalid="true"
````

### Como o leitor reage:

Anuncia:

> "Inválido"
> quando `aria-invalid="true"` estiver presente.

---

# 4. Região de Mensagens Dinâmicas

```html
<div role="status" aria-live="polite" aria-atomic="true">
```

## O que faz:

Cria uma área onde mensagens aparecem dinamicamente.

### `role="status"`

Indica mensagem informativa.

### `aria-live="polite"`

O leitor aguarda terminar de falar antes de anunciar a nova mensagem.

### `aria-atomic="true"`

Lê o conteúdo inteiro da região quando atualiza.

### Exemplo de uso:

* "Senha incorreta"
* "Conta bloqueada"

---

# 5. Mensagem de Erro do Campo

```html
<p id="password-erro" role="alert"></p>
```

## `role="alert"`

### O que faz:

Mensagem urgente.

### Comportamento:

Leitor interrompe a leitura atual e anuncia imediatamente.

Usado para:

* Erro de validação
* Problema crítico

---

# 6. Botão Mostrar Senha

```html
<button type="button"
        aria-controls="password"
        aria-pressed="false"
        aria-label="Mostrar senha">
```

## Por que é acessível?

* É um `<button>` real (não div clicável)
* É focável por teclado
* Funciona com Enter e Espaço

### `aria-controls="password"`

Indica qual elemento é afetado.

### `aria-pressed`

Indica estado:

* `false` → senha oculta
* `true` → senha visível

### `aria-label`

Define claramente a ação.

O ícone 👁 tem:

```html
aria-hidden="true"
```

Isso evita que o leitor anuncie:

> "Emoji olho"

---

# 7. Links

Todos os links são `<a>` reais.

Exemplo:

```html
<a href="/recuperar-senha">Esqueci minha senha</a>
```

### Comportamento:

Leitor anuncia:

> "Esqueci minha senha, link"

### Boa prática:

Nunca usar `<div>` ou `<span>` como botão ou link.

---

# 8. `<aside>`

Define conteúdo complementar.

Leitores de tela anunciam como:

> "Região: Ajuda e suporte"

Usuário pode navegar diretamente até ela.

---

# 9. Skip Link

```html
<a href="#conteudo-principal">Pular para o conteúdo principal</a>
```

## O que resolve?

Usuários de teclado não precisam tabular pelo menu toda vez.

### Boa prática:

Sempre incluir skip link em aplicações com navegação repetitiva.

---

# 10. Como leitores de tela navegam nessa página

Usuários podem:

     * Navegar por títulos (H)
     * Navegar por regiões (R)
     * Navegar por formulários (F)
     * Navegar por botões (B)
     * Navegar por links (L)

A estrutura foi feita para funcionar bem em:

     * NVDA
     * JAWS
     * VoiceOver
     * TalkBack

---

# 11. Boas Práticas Aplicadas

     ✔ HTML semântico antes de ARIA
     ✔ ARIA apenas quando necessário
     ✔ Labels explícitos
     ✔ Estados de erro comunicados
     ✔ Botões reais para ações
     ✔ Navegação por teclado garantida
     ✔ Mensagens dinâmicas acessíveis
     ✔ Estrutura hierárquica correta

---

# 12. O que NÃO foi feito (intencionalmente)

     ❌ Não usar div como botão
     ❌ Não depender apenas de cor para erro
     ❌ Não usar placeholder como label
     ❌ Não usar onclick em span

---

# 13. Conclusão

Essa página é acessível porque:

     * É semanticamente estruturada
     * Comunica corretamente estados
     * Funciona 100% por teclado
     * Funciona com leitores de tela
     * Segue as recomendações WCAG 2.1

A acessibilidade começa com HTML correto.
ARIA é complemento, não substituto.

