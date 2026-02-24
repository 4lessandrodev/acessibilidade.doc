(function () {
    function byId(id) {
        return document.getElementById(id);
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
      const prev = inputEl.value || "";
      const prevPos = inputEl.selectionStart ?? prev.length;
    
      // Quantos dígitos existiam antes do cursor
      const digitsBefore = prev.slice(0, prevPos).replace(/\D/g, "").length;
    
      const digits = prev.replace(/\D/g, "").slice(0, 11);
      const formatted = formatCpf(digits);
    
      // Só atualiza se mudou (evita flicker)
      if (formatted === prev) return;
    
      inputEl.value = formatted;
    
      // Reposiciona o cursor depois do mesmo número de dígitos
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
        // Reset do demo
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
                // não mostra erro cedo (incremental)
                clearFieldInvalid(input, error);
            }

            return { ok: false, digits };
        }

        function tryNext() {
            submitted = true;
            const { ok, digits } = validate(true);
            if (!ok) {
                input.focus();
                return;
            }

            sessionStorage.setItem("demo.cpf", digits);
            setText(status, "CPF validado. Indo para a etapa de senha.");
            go("senha.html");
        }

        input.addEventListener("blur", () => {
            touched = true;
            validate(true); // após “tocar”, pode mostrar
        });

        input.addEventListener("input", () => {
            // incremental: se já tocou ou já tentou avançar, valida em tempo real
            validate(touched || submitted);
        });

        // Enter no input: tenta avançar (sem precisar tabular até o botão)
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

        input.focus();
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

        const form = byId("senha-form");
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
                input.focus();
                return;
            }

            sessionStorage.setItem("demo.logged", "true");
            setText(status, "Autenticação concluída. Indo para a tela de sucesso.");
            go("sucesso.html");
        }

        input.addEventListener("blur", () => {
            touched = true;
            validate(true);
        });

        input.addEventListener("input", () => {
            validate(touched || submitted);
        });

        // Enter no input já submete, mas garantimos o comportamento consistente
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
                // Não muda foco (boa prática)
            });
        }

        input.focus();
    }

    // ---- Page: Sucesso --------------------------------------------------------
    function initSucesso() {
        const logged = sessionStorage.getItem("demo.logged");
        const status = byId("status");
        const btn = byId("voltar-home");

        if (btn) btn.addEventListener("click", () => go("home.html"));

        if (!logged) {
            setText(status, "Sessão não encontrada. Redirecionando para Home.");
            go("home.html");
            return;
        }

        setText(status, "Sucesso. Esta mensagem é anunciada por leitores de tela.");
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
                // index.html não precisa de JS
                break;
        }
    });
})();
