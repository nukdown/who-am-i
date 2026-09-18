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
    startClock();
    setupStartMenu();
  });
})();
