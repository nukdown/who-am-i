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

  function projectsApp() {
    var cards = profile.projects.map(function (project) {
      return (
        '<li class="project-card">' +
        '<h3><a href="' + escapeHtml(project.url) + '" target="_blank" rel="noopener">' +
        escapeHtml(project.name) + "</a></h3>" +
        '<p class="tech">' + escapeHtml(project.tech) + "</p>" +
        "<p>" + escapeHtml(t(project.description)) + "</p>" +
        "</li>"
      );
    }).join("");

    return (
      '<div class="doc">' +
      "<h1>" + (lang() === "en" ? "Projects" : "Projetos") + "</h1>" +
      "<p>" + (lang() === "en"
        ? "A selection of public repositories. Full list on GitHub."
        : "Uma seleção de repositórios públicos. Lista completa no GitHub.") + "</p>" +
      '<ul class="project-grid">' + cards + "</ul>" +
      '<p><a class="button" href="' + escapeHtml(profile.github) + '" target="_blank" rel="noopener">GitHub</a></p>' +
      "</div>"
    );
  }

  function contactApp() {
    var en = lang() === "en";
    var subject = encodeURIComponent(en
      ? "Opportunity for " + profile.name
      : "Oportunidade para " + profile.name);
    var body = encodeURIComponent(en
      ? "Hi Emanoel,\n\nWe have an opening that might fit your profile.\n\nRole:\nCompany:\nStack:\n"
      : "Olá Emanoel,\n\nTemos uma vaga que pode combinar com o seu perfil.\n\nVaga:\nEmpresa:\nStack:\n");

    return (
      '<div class="doc">' +
      "<h1>" + (en ? "Contact" : "Contato") + "</h1>" +
      "<p>" + (en
        ? "The fastest way to reach me is e-mail — I usually reply within 24h."
        : "O caminho mais rápido é o e-mail — costumo responder em até 24h.") + "</p>" +
      '<div class="toolbar">' +
      '<a class="button primary" href="mailto:' + escapeHtml(profile.email) +
      "?subject=" + subject + "&body=" + body + '">' +
      (en ? "Send e-mail" : "Enviar e-mail") + "</a>" +
      '<button class="button" data-action="copy-email" data-value="' + escapeHtml(profile.email) + '">' +
      (en ? "Copy e-mail" : "Copiar e-mail") + "</button>" +
      '<a class="button" href="' + escapeHtml(profile.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' +
      '<a class="button" href="' + escapeHtml(profile.github) + '" target="_blank" rel="noopener">GitHub</a>' +
      "</div>" +
      '<ul class="contact-list">' +
      "<li><strong>E-mail:</strong> " + escapeHtml(profile.email) + "</li>" +
      "<li><strong>" + (en ? "Location" : "Local") + ":</strong> " + escapeHtml(t(profile.location)) + "</li>" +
      "<li><strong>Status:</strong> " + escapeHtml(t(profile.status)) + "</li>" +
      "</ul>" +
      "</div>"
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
    },
    {
      id: "projects",
      icon: "assets/icons/folder.svg",
      title: { pt: "Projetos", en: "Projects" },
      width: 700,
      height: 500,
      render: projectsApp
    },
    {
      id: "contact",
      icon: "assets/icons/mail.svg",
      title: { pt: "Contato", en: "Contact" },
      width: 560,
      height: 400,
      render: contactApp
    }
  ];

  document.addEventListener("click", function (event) {
    var button = event.target.closest('[data-action="copy-email"]');
    if (!button || !navigator.clipboard) return;
    navigator.clipboard.writeText(button.dataset.value).then(function () {
      var original = button.textContent;
      button.textContent = lang() === "en" ? "Copied!" : "Copiado!";
      setTimeout(function () { button.textContent = original; }, 1800);
    });
  });

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
