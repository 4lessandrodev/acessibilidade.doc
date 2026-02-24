/* script.js — demo acessível (GitHub Pages) */
(function () {
  function byId(id) {
    return document.getElementById(id);
  }

  function firstId(...ids) {
    for (const id of ids) {
      const el = byId(id);
      if (el) return el;
    }
    return null;
  }

  function onlyDigits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function maskCpf(digits) {
    const d = onlyDigits(digits);
    if (d.length < 11) return "";
    return `${d.slice(0, 3)}.***.***-${d.slice(-2)}`;
  }

  function setText(el, text) {
    if (!el) return;
    el.textContent = text || "";
  }

  // Anuncia numa região aria-live. Se houver navegação em seguida, use delay.
  function announce(statusEl, text) {
    if (!statusEl) return;
    // garante foco possível via JS, sem auto-focus no load
    if (!statusEl.hasAttribute("tabindex")) statusEl.setAttribute("tabindex", "-1");
    statusEl.textContent = text || "";
  }

  function setFieldInvalid(inputEl, errorEl, message) {
    if (inputEl) inputEl.setAttribute("aria-invalid", "true");
    if (errorEl) errorEl.textContent = message || "";
  }

  function clearFieldInvalid(inputEl, errorEl) {
    if (inputEl) inputEl.setAttribute("aria-invalid", "false");
    if (errorEl) errorEl.textContent = "";
  }

  function bindBackButton(buttonId) {
    const btn = byId(buttonId);
    if (!btn) return;
    btn.addEventListener("click", () => history.back());
  }

  function go(url) {
    window.location.href = url;
  }

  // ===== CPF máscara (com caret estável) =====
  function formatCpf(digits) {
    const d = (digits || "").replace(/\D/g, "").slice(0, 11);
    let out = "";
    for (let i = 0; i < d.length; i++) {
      out += d[i];
      if (i === 2 || i === 5) out += ".";
      if (i === 8) out += "-";
    }
    return out;
  }

  function applyCpfMaskKeepCaret(inputEl) {
    if (!inputEl) return;

    const prev = inputEl.value || "";
    // selectionStart pode ser null em alguns browsers/estados
    const prevPos = typeof inputEl.selectionStart === "number" ? inputEl.selectionStart : prev.length;

    const digitsBefore = prev.slice(0, prevPos).replace(/\D/g, "").length;
    const digits = prev.replace(/\D/g, "").slice(0, 11);
    const formatted = formatCpf(digits);

    if (formatted === prev) return;

    inputEl.value = formatted;

    // Só tenta reposicionar caret se suportado
    if (typeof inputEl.setSelectionRange !== "function") return;

    let newPos = 0;
    let seenDigits = 0;
    while (newPos < formatted.length && seenDigits < digitsBefore) {
      if (/\d/.test(formatted[newPos])) seenDigits++;
      newPos++;
    }
    inputEl.setSelectionRange(newPos, newPos);
  }

  // ---- Page: Home -----------------------------------------------------------
  function initHome() {
    sessionStorage.removeItem("demo.cpf");
    sessionStorage.removeItem("demo.logged");

    const btn = byId("btn-login");
    if (btn) btn.addEventListener("click", () => go("cpf.html"));
  }

  // ---- Page: CPF ------------------------------------------------------------
  function initCpf() {
    bindBackButton("back");

    const form = byId("cpf-form");
    const input = byId("cpf");
    const error = byId("cpf-erro");
    const status = byId("mensagens");

    if (!form || !input) return;

    let touched = false;
    let submitted = false;

    function validate(showError) {
      const digits = onlyDigits(input.value);
      const ok = digits.length >= 11;

      if (ok) {
        clearFieldInvalid(input, error);
        return { ok: true, digits };
      }

      if (showError) {
        setFieldInvalid(input, error, "CPF inválido: digite 11 números.");
        setText(status, "");
      } else {
        clearFieldInvalid(input, error);
      }

      return { ok: false, digits };
    }

    function tryNext() {
      submitted = true;
      const { ok, digits } = validate(true);

      if (!ok) {
        // foco só como consequência de ação do usuário
        if (document.activeElement !== input) input.focus();
        return;
      }

      sessionStorage.setItem("demo.cpf", digits);

      // Se você quer que o leitor de tela OUÇA a mensagem, não navegue instantâneo.
      announce(status, "CPF validado. Indo para a etapa de senha.");

      // Delay curto para permitir anúncio (sem “auto-focus” e sem quebrar UX)
      setTimeout(() => go("senha.html"), 200);
    }

    input.addEventListener("blur", () => {
      touched = true;
      validate(true);
    });

    input.addEventListener("input", () => {
      applyCpfMaskKeepCaret(input);
      validate(touched || submitted);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        tryNext();
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      tryNext();
    });

    // ✅ Sem focus automático no load
  }

  // ---- Page: Senha ----------------------------------------------------------
  function initSenha() {
    bindBackButton("back");

    const cpf = sessionStorage.getItem("demo.cpf");
    if (!cpf) {
      go("cpf.html");
      return;
    }

    const cpfContexto = byId("cpf-contexto");
    setText(cpfContexto, `CPF informado: ${maskCpf(cpf)} (exibição mascarada)`);

    // Compatível com os dois HTMLs:
    const form = firstId("form-senha", "senha-form");
    const input = byId("password");
    const error = byId("password-erro");
    const status = byId("mensagens");
    const toggle = byId("toggle-password");

    if (!form || !input) return;

    let touched = false;
    let submitted = false;

    function validate(showError) {
      const value = String(input.value || "").trim();
      const ok = value.length > 0;

      if (ok) {
        clearFieldInvalid(input, error);
        return { ok: true };
      }

      if (showError) {
        setFieldInvalid(input, error, "Informe sua senha para continuar.");
        setText(status, "");
      } else {
        clearFieldInvalid(input, error);
      }
      return { ok: false };
    }

    function tryLogin() {
      submitted = true;
      const { ok } = validate(true);

      if (!ok) {
        if (document.activeElement !== input) input.focus();
        return;
      }

      sessionStorage.setItem("demo.logged", "true");

      announce(status, "Autenticação concluída. Indo para a tela de sucesso.");
      setTimeout(() => go("sucesso.html"), 200);
    }

    input.addEventListener("blur", () => {
      touched = true;
      validate(true);
    });

    input.addEventListener("input", () => {
      validate(touched || submitted);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        tryLogin();
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      tryLogin();
    });

    if (toggle) {
      toggle.addEventListener("click", () => {
        const pressed = toggle.getAttribute("aria-pressed") === "true";
        const next = !pressed;

        toggle.setAttribute("aria-pressed", String(next));
        toggle.setAttribute("aria-label", next ? "Ocultar senha" : "Mostrar senha");
        input.type = next ? "text" : "password";
      });
    }

    // ✅ Sem focus automático no load
  }

  // ---- Page: Sucesso --------------------------------------------------------
  function initSucesso() {
    const logged = sessionStorage.getItem("demo.logged");
    const status = byId("status");
    const btn = byId("voltar-home");

    if (btn) btn.addEventListener("click", () => go("home.html"));

    if (!logged) {
      announce(status, "Sessão não encontrada. Redirecionando para Home.");
      setTimeout(() => go("home.html"), 200);
      return;
    }

    announce(status, "Sucesso. Esta mensagem é anunciada por leitores de tela.");
  }

  // ---- Auto init por data-page ---------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body && document.body.getAttribute("data-page");
    switch (page) {
      case "home":
        initHome();
        break;
      case "cpf":
        initCpf();
        break;
      case "senha":
        initSenha();
        break;
      case "sucesso":
        initSucesso();
        break;
      default:
        break;
    }
  });
})();
