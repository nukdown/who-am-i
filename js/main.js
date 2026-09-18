(function () {
  "use strict";

  function startClock() {
    var clock = document.getElementById("clock");
    if (!clock) return;
    function tick() {
      clock.textContent = new Date().toLocaleTimeString("pt-BR", {
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

  document.addEventListener("DOMContentLoaded", function () {
    window.WM.init();
    renderDesktopIcons();
    renderStartMenu();
    startClock();
    setupStartMenu();
    window.APPS.openById("about");
  });
})();
