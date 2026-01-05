/**
 * winui_3.js - Framework de Comportamento Nativo Windows 11
 */

const WinUI = {
    init() {
        this.setupTheme();
        this.setupKeyboard();
        console.log("WinUI 3 Framework: Ativo");
    },

    // 1. Sincroniza o tema escuro/claro com o sistema
    setupTheme() {
        const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const apply = (isDark) => {
            document.body.classList.toggle('win-dark', isDark);
            document.body.classList.toggle('win-light', !isDark);
        };
        darkQuery.addEventListener('change', e => apply(e.matches));
        apply(darkQuery.matches);
    },

    // 2. Escuta o Teclado (Incluindo Teclado Numérico)
    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;

            // Mapeamento de Teclas para funções da Calculadora
            // Se as funções existirem no escopo global, ele as executa
            
            // Números e Operadores básicos
            if (/[0-9+\-*/().,]/.test(key)) {
                // Converte vírgula do teclado para ponto ou vice-versa se necessário
                const char = (key === ',') ? '.' : key;
                if (typeof window.add === "function") window.add(char);
                this._visualFeedback(key);
            }

            // Enter ou Teclado Numérico Enter = Calcular
            if (key === 'Enter') {
                e.preventDefault();
                if (typeof window.calculate === "function") window.calculate();
                this._visualFeedback('=');
            }

            // Escape ou 'c' = Limpar
            if (key === 'Escape' || key.toLowerCase() === 'c') {
                if (typeof window.clearAll === "function") window.clearAll();
                this._visualFeedback('C');
            }

            // Backspace = Apagar último caractere
            if (key === 'Backspace') {
                if (window.currentExpr) {
                    window.currentExpr = window.currentExpr.slice(0, -1);
                    const exprDiv = document.getElementById('expr');
                    if (exprDiv) exprDiv.innerText = window.currentExpr;
                }
            }
        });
    },

    // 3. Efeito visual ao pressionar tecla (opcional)
    // Procura um botão que tenha o mesmo texto da tecla e simula o clique
    _visualFeedback(key) {
        const buttons = Array.from(document.querySelectorAll('button'));
        const target = buttons.find(b => b.innerText === key || b.innerText.includes(key));
        if (target) {
            target.style.transform = "scale(0.95)";
            target.style.backgroundColor = "rgba(128, 128, 128, 0.2)";
            setTimeout(() => {
                target.style.transform = "";
                target.style.backgroundColor = "";
            }, 100);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => WinUI.init());