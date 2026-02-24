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

