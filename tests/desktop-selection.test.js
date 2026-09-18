import "../js/desktop-selection.js";

function pointerEvent(type, options = {}) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.entries(options).forEach(([key, value]) => {
    Object.defineProperty(event, key, { value, configurable: true });
  });
  return event;
}

function setRect(element, rect) {
  element.getBoundingClientRect = () => ({
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  });
}

function createDesktop() {
  document.body.innerHTML = '<main id="desktop"><ul id="desktop-icons"></ul></main>';

  const desktop = document.getElementById("desktop");
  const list = document.getElementById("desktop-icons");

  setRect(desktop, { left: 100, top: 50, right: 900, bottom: 650 });
  desktop.setPointerCapture = vi.fn();

  [
    ["about", { left: 120, top: 70, right: 216, bottom: 150 }],
    ["projects", { left: 240, top: 70, right: 336, bottom: 150 }],
    ["contact", { left: 500, top: 300, right: 596, bottom: 380 }]
  ].forEach(([id, rect]) => {
    const item = document.createElement("li");
    const icon = document.createElement("button");
    icon.className = "desktop-icon";
    icon.dataset.appId = id;
    icon.setAttribute("aria-selected", "false");
    setRect(icon, rect);
    item.appendChild(icon);
    list.appendChild(item);
  });

  return desktop;
}

function pointer(desktop, type, x, y, options = {}, target = desktop) {
  target.dispatchEvent(pointerEvent(type, {
    button: 0,
    clientX: x,
    clientY: y,
    pointerId: 1,
    ...options
  }));
}

describe("DesktopSelection", () => {
  let desktop;

  beforeEach(() => {
    desktop = createDesktop();
    window.DesktopSelection.init(desktop);
  });

  afterEach(() => {
    window.DesktopSelection.destroy();
    document.body.innerHTML = "";
  });

  it("normalizes selection rectangles regardless of drag direction", () => {
    expect(window.DesktopSelection.normalizeRect(40, 90, 10, 20)).toEqual({
      left: 10,
      top: 20,
      right: 40,
      bottom: 90
    });
  });

  it("detects rectangle intersections", () => {
    expect(window.DesktopSelection.intersects(
      { left: 0, top: 0, right: 20, bottom: 20 },
      { left: 15, top: 15, right: 30, bottom: 30 }
    )).toBe(true);

    expect(window.DesktopSelection.intersects(
      { left: 0, top: 0, right: 10, bottom: 10 },
      { left: 11, top: 11, right: 20, bottom: 20 }
    )).toBe(false);
  });

  it("selects every icon intersecting the marquee", () => {
    pointer(desktop, "pointerdown", 105, 55);
    pointer(desktop, "pointermove", 350, 180);
    expect(window.DesktopSelection.selectedIds()).toEqual(["about", "projects"]);

    pointer(desktop, "pointerup", 350, 180);
    expect(desktop.querySelector(".desktop-selection-box")).toBeNull();
  });

  it("supports dragging in any direction", () => {
    pointer(desktop, "pointerdown", 350, 180);
    pointer(desktop, "pointermove", 105, 55);
    pointer(desktop, "pointerup", 105, 55);

    expect(window.DesktopSelection.selectedIds()).toEqual(["about", "projects"]);
  });

  it("clears the current selection when clicking empty desktop", () => {
    const first = desktop.querySelector('[data-app-id="about"]');
    first.classList.add("selected");

    pointer(desktop, "pointerdown", 400, 200);
    pointer(desktop, "pointerup", 400, 200);

    expect(window.DesktopSelection.selectedIds()).toEqual([]);
  });

  it("keeps existing selection when Ctrl-dragging", () => {
    desktop.querySelector('[data-app-id="contact"]').classList.add("selected");

    pointer(desktop, "pointerdown", 105, 55, { ctrlKey: true });
    pointer(desktop, "pointermove", 350, 180, { ctrlKey: true });
    pointer(desktop, "pointerup", 350, 180, { ctrlKey: true });

    expect(window.DesktopSelection.selectedIds()).toEqual([
      "about",
      "projects",
      "contact"
    ]);
  });

  it("drags all selected icons together without opening them", () => {
    pointer(desktop, "pointerdown", 105, 55);
    pointer(desktop, "pointermove", 350, 180);
    pointer(desktop, "pointerup", 350, 180);

    const about = desktop.querySelector('[data-app-id="about"]');
    const projects = desktop.querySelector('[data-app-id="projects"]');

    pointer(desktop, "pointerdown", 150, 100, {}, about);
    pointer(desktop, "pointermove", 180, 130);
    pointer(desktop, "pointerup", 180, 130);

    expect(about.style.transform).toBe("translate(30px, 30px)");
    expect(projects.style.transform).toBe("translate(30px, 30px)");
  });

  it("selects and drags an unselected icon", () => {
    const contact = desktop.querySelector('[data-app-id="contact"]');

    pointer(desktop, "pointerdown", 550, 340, {}, contact);
    pointer(desktop, "pointermove", 575, 365);
    pointer(desktop, "pointerup", 575, 365);

    expect(window.DesktopSelection.selectedIds()).toEqual(["contact"]);
    expect(contact.style.transform).toBe("translate(25px, 25px)");
  });

  it("clears selection with the public clear method", () => {
    desktop.querySelector('[data-app-id="about"]').classList.add("selected");
    desktop.querySelector('[data-app-id="projects"]').classList.add("selected");

    window.DesktopSelection.clear();

    expect(window.DesktopSelection.selectedIds()).toEqual([]);
  });
});
