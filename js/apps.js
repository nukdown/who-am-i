/**
 * Programas da área de trabalho. Cada app descreve seu ícone, título e
 * uma função render() que devolve o HTML mostrado dentro da janela.
 */
window.APPS = (function () {
  "use strict";

  var profile = window.PROFILE;

  function lang() {
    return window.I18N ? window.I18N.current() : "pt";
  }

  function t(value) {
    if (value && typeof value === "object") return value[lang()] || value.pt;
    return value;
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"]/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char];
    });
  }

  function aboutApp() {
    var skills = profile.skills.map(function (group) {
      return (
        '<li><strong>' + escapeHtml(t(group.group)) + ':</strong> ' +
        group.items.map(escapeHtml).join(" · ") +
        "</li>"
      );
    }).join("");

    return (
      '<article class="doc">' +
      '<div class="profile-header">' +
      '<img class="avatar" src="assets/icons/user.svg" alt="" />' +
      "<div><h1>" + escapeHtml(profile.name) + "</h1>" +
      "<p class=\"role\">" + escapeHtml(t(profile.role)) + " · " + escapeHtml(t(profile.location)) + "</p>" +
      '<p class="badge available">' + escapeHtml(t(profile.status)) + "</p></div>" +
      "</div>" +
      "<p>" + escapeHtml(t(profile.summary)) + "</p>" +
      "<h2>" + (lang() === "en" ? "Skills" : "Habilidades") + "</h2>" +
      '<ul class="skills">' + skills + "</ul>" +
      "</article>"
    );
  }

  function resumeApp() {
    var jobs = profile.experience.map(function (job) {
      var bullets = t(job.bullets).map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      }).join("");
      return (
        '<section class="job">' +
        "<h3>" + escapeHtml(t(job.title)) + " — " + escapeHtml(job.company) + "</h3>" +
        '<p class="period">' + escapeHtml(job.period) + "</p>" +
        "<ul>" + bullets + "</ul>" +
        "</section>"
      );
    }).join("");

    return (
      '<article class="notepad" id="curriculum">' +
      "<h1>" + escapeHtml(profile.name) + "</h1>" +
      "<p>" + escapeHtml(t(profile.role)) + " · " + escapeHtml(profile.email) + "</p>" +
      "<h2>" + (lang() === "en" ? "Experience & Education" : "Experiência e Formação") + "</h2>" +
      jobs +
      "</article>"
    );
  }

  var registry = [
    {
      id: "curriculum",
      icon: "assets/icons/notepad.svg",
      title: { pt: "Meu Currículo", en: "My Resume" },
      width: 660,
      height: 520,
      render: resumeApp
    },
    {
      id: "about",
      icon: "assets/icons/user.svg",
      title: { pt: "Sobre Mim", en: "About Me" },
      width: 620,
      height: 460,
      render: aboutApp
    }
  ];

  function list() { return registry; }

  function openById(id) {
    var app = registry.filter(function (item) { return item.id === id; })[0];
    if (!app) return;
    window.WM.open({
      id: app.id,
      title: t(app.title),
      icon: app.icon,
      width: app.width,
      height: app.height,
      content: app.render()
    });
  }

  return { list: list, openById: openById, t: t, escapeHtml: escapeHtml, lang: lang };
})();
