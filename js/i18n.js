/**
 * Alternância de idioma PT-BR / EN. Recrutadores internacionais leem o
 * mesmo conteúdo em inglês sem sair da página.
 */
window.I18N = (function () {
  "use strict";

  var STORAGE_KEY = "portfolio-lang";
  var listeners = [];
  var lang = "pt";

  var UI = {
    pt: { start: "Iniciar", switchTo: "English", desktop: "Área de trabalho" },
    en: { start: "Start", switchTo: "Português", desktop: "Desktop" }
  };

  function detect() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (error) { stored = null; }
    if (stored === "pt" || stored === "en") return stored;
    return (navigator.language || "pt").toLowerCase().indexOf("pt") === 0 ? "pt" : "en";
  }

  function current() { return lang; }

  function ui(key) { return UI[lang][key]; }

  function set(next) {
    lang = next === "en" ? "en" : "pt";
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (error) { /* ignore */ }
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    listeners.forEach(function (fn) { fn(lang); });
  }

  function toggle() { set(lang === "pt" ? "en" : "pt"); }

  function onChange(fn) { listeners.push(fn); }

  function init() { lang = detect(); set(lang); }

  return { init: init, current: current, set: set, toggle: toggle, onChange: onChange, ui: ui };
})();
