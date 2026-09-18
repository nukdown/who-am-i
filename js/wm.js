/**
 * Gerenciador de janelas: abre, foca, arrasta, redimensiona, minimiza,
 * maximiza e fecha janelas, mantendo a barra de tarefas em sincronia.
 */
window.WM = (function () {
  "use strict";

  var container = null;
  var taskList = null;
  var windows = new Map();
  var topZ = 10;
  var cascade = 0;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function focus(id) {
    windows.forEach(function (win, key) {
      var active = key === id;
      win.root.classList.toggle("is-active", active);
      win.taskButton.setAttribute("aria-pressed", String(active));
    });
    var target = windows.get(id);
    if (!target) return;
    topZ += 1;
    target.root.style.zIndex = String(topZ);
    target.root.hidden = false;
  }

  function close(id) {
    var win = windows.get(id);
    if (!win) return;
    win.root.remove();
    win.taskButton.remove();
    windows.delete(id);
  }

  function toggleMinimize(id) {
    var win = windows.get(id);
    if (!win) return;
    if (win.root.hidden) {
      focus(id);
    } else {
      win.root.hidden = true;
      win.taskButton.setAttribute("aria-pressed", "false");
    }
  }

  function makeDraggable(win) {
    var handle = win.titlebar;
    handle.addEventListener("pointerdown", function (event) {
      if (event.target.closest(".window-control")) return;
      if (win.root.classList.contains("is-maximized")) return;
      var rect = win.root.getBoundingClientRect();
      var offsetX = event.clientX - rect.left;
      var offsetY = event.clientY - rect.top;
      handle.setPointerCapture(event.pointerId);
      focus(win.id);

      function onMove(moveEvent) {
        var maxX = window.innerWidth - 80;
        var maxY = window.innerHeight - 90;
        win.root.style.left = Math.min(Math.max(moveEvent.clientX - offsetX, -40), maxX) + "px";
        win.root.style.top = Math.min(Math.max(moveEvent.clientY - offsetY, 0), maxY) + "px";
      }
      function onUp() {
        handle.removeEventListener("pointermove", onMove);
        handle.removeEventListener("pointerup", onUp);
      }
      handle.addEventListener("pointermove", onMove);
      handle.addEventListener("pointerup", onUp);
    });
  }

  function makeResizable(win) {
    var grip = win.resize;
    grip.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      grip.setPointerCapture(event.pointerId);
      var rect = win.root.getBoundingClientRect();
      var startX = event.clientX;
      var startY = event.clientY;

      function onMove(moveEvent) {
        win.root.style.width = Math.max(280, rect.width + moveEvent.clientX - startX) + "px";
        win.root.style.height = Math.max(160, rect.height + moveEvent.clientY - startY) + "px";
      }
      function onUp() {
        grip.removeEventListener("pointermove", onMove);
        grip.removeEventListener("pointerup", onUp);
      }
      grip.addEventListener("pointermove", onMove);
      grip.addEventListener("pointerup", onUp);
    });
  }

  function open(options) {
    var id = options.id;
    if (windows.has(id)) {
      focus(id);
      return windows.get(id);
    }

    var root = el("section", "window is-active");
    root.id = "window-" + id;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-label", options.title);

    var titlebar = el("header", "window-titlebar");
    if (options.icon) {
      var icon = new Image();
      icon.src = options.icon;
      icon.alt = "";
      titlebar.appendChild(icon);
    }
    titlebar.appendChild(el("span", "window-title", options.title));

    var controls = el("div", "window-controls");
    var minimizeBtn = el("button", "window-control minimize", "–");
    minimizeBtn.title = "Minimizar";
    var maximizeBtn = el("button", "window-control maximize", "▢");
    maximizeBtn.title = "Maximizar";
    var closeBtn = el("button", "window-control close", "✕");
    closeBtn.title = "Fechar";
    controls.append(minimizeBtn, maximizeBtn, closeBtn);
    titlebar.appendChild(controls);

    var body = el("div", "window-body");
    if (typeof options.content === "string") {
      body.innerHTML = options.content;
    } else if (options.content) {
      body.appendChild(options.content);
    }

    var resize = el("div", "window-resize");
    root.append(titlebar, body, resize);

    var width = options.width || 620;
    var height = options.height || 440;
    var offset = (cascade % 6) * 26;
    cascade += 1;
    root.style.width = width + "px";
    root.style.height = height + "px";
    root.style.left = Math.max(12, (window.innerWidth - width) / 2 + offset - 60) + "px";
    root.style.top = Math.max(12, (window.innerHeight - height) / 2 + offset - 80) + "px";

    container.appendChild(root);

    var taskButton = el("button", "task-button", options.title);
    taskButton.setAttribute("aria-pressed", "true");
    taskList.appendChild(taskButton);

    var win = { id: id, root: root, titlebar: titlebar, body: body, resize: resize, taskButton: taskButton };
    windows.set(id, win);

    minimizeBtn.addEventListener("click", function () { toggleMinimize(id); });
    maximizeBtn.addEventListener("click", function () {
      root.classList.toggle("is-maximized");
      focus(id);
    });
    closeBtn.addEventListener("click", function () { close(id); });
    root.addEventListener("pointerdown", function () { focus(id); });
    taskButton.addEventListener("click", function () { toggleMinimize(id); });

    makeDraggable(win);
    makeResizable(win);
    focus(id);
    return win;
  }

  function openIds() {
    return Array.from(windows.keys());
  }

  function init() {
    container = document.getElementById("windows");
    taskList = document.getElementById("task-list");
  }

  return { init: init, open: open, close: close, focus: focus, openIds: openIds };
})();
