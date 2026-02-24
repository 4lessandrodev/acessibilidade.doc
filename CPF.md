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
