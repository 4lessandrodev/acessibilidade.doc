(function () {
  const NAV_DELAY_MS = 4000;

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

  function setLiveText(el, text) {
    if (!el) return;
    const next = text || "";
    el.textContent = "";
    requestAnimationFrame(() => {
      el.textContent = next;
    });
  }

  function ensureProgrammaticFocusable(el) {
    if (!el) return;
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  }

  function announce(statusEl, text) {
    if (!statusEl) return;
    ensureProgrammaticFocusable(statusEl);
    setLiveText(statusEl, text);
  }

  function announceAndGo(statusEl, text, url) {
    announce(statusEl, text);
    setTimeout(() => (window.location.href = url), NAV_DELAY_MS);
  }

  function setFieldInvalid(inputEl, errorEl, message) {
    if (inputEl) {
      inputEl.setAttribute("aria-invalid", "true");
      if (errorEl && errorEl.id) inputEl.setAttribute("aria-errormessage", errorEl.id);
    }
    if (errorEl) setLiveText(errorEl, message || "");
  }

  function clearFieldInvalid(inputEl, errorEl) {
    if (inputEl) {
      inputEl.setAttribute("aria-invalid", "false");
      inputEl.removeAttribute("aria-errormessage");
    }
    if (errorEl) errorEl.textContent = "";
  }

  function bindBackButton(buttonId) {
    const btn = byId(buttonId);
    if (!btn) return;
    btn.addEventListener("click", () => history.back());
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
    const prevPos = typeof inputEl.selectionStart === "number" ? inputEl.selectionStart : prev.length;

    const digitsBefore = prev.slice(0, prevPos).replace(/\D/g, "").length;
    const digits = prev.replace(/\D/g, "").slice(0, 11);
    const formatted = formatCpf(digits);

    if (formatted === prev) return;

    inputEl.value = formatted;

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
    if (btn) btn.addEventListener("click", () => (window.location.href = "cpf.html"));
  }

  // ---- Page: CPF ------------------------------------------------------------
  function initCpf() {
    bindBackButton("back");

    // Compatível com HTML antigo e o novo (“máximo”)
    const form = firstId("form-cpf", "cpf-form");
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

      // Mensagem + delay para permitir anúncio antes do redirect
      announceAndGo(status, "Indo para a próxima etapa.", "senha.html");
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

  }

  // ---- Page: Senha ----------------------------------------------------------
  function initSenha() {
    bindBackButton("back");

    const cpf = sessionStorage.getItem("demo.cpf");
    if (!cpf) {
      window.location.href = "cpf.html";
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
        setFieldInvalid(input, error, "Informe sua senha.");
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

      announceAndGo(status, "Indo para a próxima tela", "sucesso.html");
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
  }

  // ---- Page: Sucesso --------------------------------------------------------
  function initSucesso() {
    const logged = sessionStorage.getItem("demo.logged");
    const status = byId("status");
    const btn = byId("voltar-home");

    if (btn) btn.addEventListener("click", () => (window.location.href = "home.html"));

    if (!logged) {
      announceAndGo(status, "Erro. Redirecionando para Home.", "home.html");
      return;
    }

    announce(status, "Sucesso.");
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
