(function () {
  "use strict";

  function startClock() {
    var clock = document.getElementById("clock");
    if (!clock) return;
    function tick() {
      var locale = window.I18N.current() === "en" ? "en-US" : "pt-BR";
      clock.textContent = new Date().toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    tick();
    setInterval(tick, 15000);
  }

  function renderDesktopIcons() {
    var list = document.getElementById("desktop-icons");
    if (!list) return;
    list.innerHTML = "";
    window.APPS.list().forEach(function (app) {
      var item = document.createElement("li");
      var button = document.createElement("button");
      button.className = "desktop-icon";
      button.innerHTML =
        '<img src="' + app.icon + '" alt="" /><span>' +
        window.APPS.escapeHtml(window.APPS.t(app.title)) +
        "</span>";
      button.addEventListener("click", function () { window.APPS.openById(app.id); });
      item.appendChild(button);
      list.appendChild(item);
    });
  }

  function renderStartMenu() {
    var menu = document.getElementById("start-menu");
    if (!menu) return;
    menu.innerHTML = '<div class="start-menu-header">' +
      window.APPS.escapeHtml(window.PROFILE.name) + "</div>";
    window.APPS.list().forEach(function (app) {
      var button = document.createElement("button");
      button.className = "start-menu-item";
      button.setAttribute("role", "menuitem");
      button.innerHTML =
        '<img src="' + app.icon + '" alt="" /><span>' +
        window.APPS.escapeHtml(window.APPS.t(app.title)) +
        "</span>";
      button.addEventListener("click", function () {
        window.APPS.openById(app.id);
        menu.hidden = true;
      });
      menu.appendChild(button);
    });
  }

  function setupStartMenu() {
    var button = document.getElementById("start-button");
    var menu = document.getElementById("start-menu");
    if (!button || !menu) return;

    function setOpen(open) {
      menu.hidden = !open;
      button.setAttribute("aria-expanded", String(open));
    }

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      setOpen(menu.hidden);
    });

    document.addEventListener("click", function (event) {
      if (!menu.hidden && !menu.contains(event.target)) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function setupLanguageToggle() {
    var button = document.getElementById("lang-toggle");
    if (!button) return;
    function label() { button.textContent = window.I18N.ui("switchTo"); }
    label();
    button.addEventListener("click", function () { window.I18N.toggle(); });
    window.I18N.onChange(label);
  }

  function applyLanguage() {
    var startLabel = document.querySelector("#start-button span:last-child");
    if (startLabel) startLabel.textContent = window.I18N.ui("start");
    var desktop = document.getElementById("desktop");
    if (desktop) desktop.setAttribute("aria-label", window.I18N.ui("desktop"));
    renderDesktopIcons();
    renderStartMenu();

    var openIds = window.WM.openIds();
    openIds.forEach(function (id) { window.WM.close(id); });
    openIds.forEach(function (id) { window.APPS.openById(id); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    window.I18N.init();
    window.WM.init();
    renderDesktopIcons();
    renderStartMenu();
    startClock();
    setupStartMenu();
    setupLanguageToggle();
    applyLanguage();
    window.I18N.onChange(applyLanguage);
    window.APPS.openById("about");
  });
})();
