(function () {
  "use strict";

  var DRAG_THRESHOLD = 4;

  var state = {
    root: null,
    box: null,
    startX: 0,
    startY: 0,
    additive: false,
    dragging: false,
    suppressClick: false,
    pointerId: null,
    draggingIcons: false,
    dragIcon: null,
    dragStartX: 0,
    dragStartY: 0,
    iconOffsets: []
  };

  function normalizeRect(x1, y1, x2, y2) {
    return {
      left: Math.min(x1, x2),
      top: Math.min(y1, y2),
      right: Math.max(x1, x2),
      bottom: Math.max(y1, y2)
    };
  }

  function intersects(a, b) {
    return !(
      a.right < b.left ||
      a.left > b.right ||
      a.bottom < b.top ||
      a.top > b.bottom
    );
  }

  function clear() {
    if (!state.root) return;
    state.root.querySelectorAll(".desktop-icon.selected").forEach(function (icon) {
      icon.classList.remove("selected");
      icon.setAttribute("aria-selected", "false");
    });
  }

  function getIcons() {
    if (!state.root) return [];
    return Array.from(state.root.querySelectorAll(".desktop-icon"));
  }

  function getSelectedIcons() {
    return getIcons().filter(function (icon) {
      return icon.classList.contains("selected");
    });
  }

  function getRect(element) {
    var rootRect = state.root.getBoundingClientRect();
    var rect = element.getBoundingClientRect();
    return {
      left: rect.left - rootRect.left,
      top: rect.top - rootRect.top,
      right: rect.right - rootRect.left,
      bottom: rect.bottom - rootRect.top
    };
  }

  function setSelected(element, selected) {
    element.classList.toggle("selected", selected);
    element.setAttribute("aria-selected", String(selected));
  }

  function selectAtRect(selectionRect, additive) {
    if (!additive) clear();

    getIcons().forEach(function (icon) {
      if (intersects(selectionRect, getRect(icon))) {
        setSelected(icon, true);
      }
    });
  }

  function createBox() {
    var box = document.createElement("div");
    box.className = "desktop-selection-box";
    box.setAttribute("aria-hidden", "true");
    state.root.appendChild(box);
    return box;
  }

  function updateBox(currentX, currentY) {
    var rect = normalizeRect(
      state.startX,
      state.startY,
      currentX,
      currentY
    );

    state.box.style.left = rect.left + "px";
    state.box.style.top = rect.top + "px";
    state.box.style.width = rect.right - rect.left + "px";
    state.box.style.height = rect.bottom - rect.top + "px";

    selectAtRect(rect, state.additive);
  }

  function isIgnoredTarget(event) {
    var target = event.target;
    if (!target || !target.closest) return false;

    return !!target.closest(
      ".window, .taskbar, .start-menu, .desktop-selection-box"
    );
  }

  function beginIconDrag(icon, event) {
    var rootRect = state.root.getBoundingClientRect();

    state.draggingIcons = true;
    state.dragIcon = icon;
    state.dragStartX = event.clientX;
    state.dragStartY = event.clientY;
    state.pointerId = event.pointerId;
    state.suppressClick = false;
    state.iconOffsets = getSelectedIcons().map(function (selectedIcon) {
      return {
        icon: selectedIcon,
        x: Number(selectedIcon.dataset.dragX || 0),
        y: Number(selectedIcon.dataset.dragY || 0),
        rect: getRect(selectedIcon)
      };
    });

    if (!icon.classList.contains("selected")) {
      if (!event.ctrlKey && !event.metaKey) clear();
      setSelected(icon, true);
      state.iconOffsets = [{
        icon: icon,
        x: Number(icon.dataset.dragX || 0),
        y: Number(icon.dataset.dragY || 0),
        rect: getRect(icon)
      }];
    }

    state.dragStartRootX = event.clientX - rootRect.left;
    state.dragStartRootY = event.clientY - rootRect.top;

    if (typeof state.root.setPointerCapture === "function") {
      state.root.setPointerCapture(event.pointerId);
    }
  }

  function updateIconDrag(event) {
    var dx = event.clientX - state.dragStartX;
    var dy = event.clientY - state.dragStartY;

    if (!state.dragging) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < DRAG_THRESHOLD) return;
      state.dragging = true;
      state.suppressClick = true;
    }

    state.iconOffsets.forEach(function (entry) {
      var nextX = entry.x + dx;
      var nextY = entry.y + dy;
      entry.icon.dataset.dragX = String(nextX);
      entry.icon.dataset.dragY = String(nextY);
      entry.icon.style.transform = "translate(" + nextX + "px, " + nextY + "px)";
    });
  }

  function finishIconDrag(event) {
    if (state.dragging) {
      updateIconDrag(event);
    }

    state.draggingIcons = false;
    state.dragIcon = null;
    state.iconOffsets = [];
    state.pointerId = null;

    if (state.suppressClick) {
      window.setTimeout(function () {
        state.suppressClick = false;
      }, 0);
    }
  }

  function onPointerDown(event) {
    if (event.button !== 0 || !state.root || isIgnoredTarget(event)) return;

    var icon = event.target && event.target.closest
      ? event.target.closest(".desktop-icon")
      : null;

    if (icon && state.root.contains(icon)) {
      beginIconDrag(icon, event);
      return;
    }

    var rootRect = state.root.getBoundingClientRect();

    state.startX = event.clientX - rootRect.left;
    state.startY = event.clientY - rootRect.top;
    state.additive = event.ctrlKey || event.metaKey;
    state.dragging = false;
    state.draggingIcons = false;
    state.suppressClick = false;
    state.pointerId = event.pointerId;

    state.box = createBox();

    if (typeof state.root.setPointerCapture === "function") {
      state.root.setPointerCapture(event.pointerId);
    }
  }

  function onPointerMove(event) {
    if (state.pointerId !== null && event.pointerId !== state.pointerId) return;

    if (state.draggingIcons) {
      updateIconDrag(event);
      return;
    }

    if (!state.box) return;

    var rootRect = state.root.getBoundingClientRect();
    var currentX = event.clientX - rootRect.left;
    var currentY = event.clientY - rootRect.top;
    var distance = Math.max(
      Math.abs(currentX - state.startX),
      Math.abs(currentY - state.startY)
    );

    if (distance < DRAG_THRESHOLD) return;

    state.dragging = true;
    state.suppressClick = true;
    updateBox(currentX, currentY);
  }

  function finishPointer(event) {
    if (state.pointerId !== null && event.pointerId !== state.pointerId) return;

    if (state.draggingIcons) {
      finishIconDrag(event);
      return;
    }

    if (!state.box) return;

    if (state.dragging) {
      var rootRect = state.root.getBoundingClientRect();
      updateBox(
        event.clientX - rootRect.left,
        event.clientY - rootRect.top
      );
    } else if (!state.additive) {
      clear();
    }

    state.box.remove();
    state.box = null;
    state.dragging = false;
    state.pointerId = null;

    if (state.suppressClick) {
      window.setTimeout(function () {
        state.suppressClick = false;
      }, 0);
    }
  }

  function onClickCapture(event) {
    if (!state.suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    state.suppressClick = false;
  }

  function init(root) {
    if (!root) return;
    destroy();

    state.root = root;
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", finishPointer);
    root.addEventListener("pointercancel", finishPointer);
    root.addEventListener("click", onClickCapture, true);
  }

  function destroy() {
    if (!state.root) return;

    state.root.removeEventListener("pointerdown", onPointerDown);
    state.root.removeEventListener("pointermove", onPointerMove);
    state.root.removeEventListener("pointerup", finishPointer);
    state.root.removeEventListener("pointercancel", finishPointer);
    state.root.removeEventListener("click", onClickCapture, true);

    if (state.box) state.box.remove();

    state.root = null;
    state.box = null;
    state.pointerId = null;
    state.suppressClick = false;
    state.dragging = false;
    state.draggingIcons = false;
    state.dragIcon = null;
    state.iconOffsets = [];
  }

  function selectedIds() {
    return getSelectedIcons().map(function (icon) {
      return icon.dataset.appId;
    });
  }

  window.DesktopSelection = {
    init: init,
    destroy: destroy,
    clear: clear,
    selectedIds: selectedIds,
    normalizeRect: normalizeRect,
    intersects: intersects
  };
})();
