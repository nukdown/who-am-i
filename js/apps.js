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

    var en = lang() === "en";
    return (
      '<article class="notepad" id="curriculum">' +
      '<div class="toolbar no-print">' +
      '<button class="button primary" data-action="print-resume">' +
      (en ? "Download PDF / Print" : "Baixar PDF / Imprimir") + "</button>" +
      '<a class="button" href="mailto:' + escapeHtml(profile.email) + '">' +
      (en ? "E-mail me" : "Falar comigo") + "</a>" +
      "</div>" +
      "<h1>" + escapeHtml(profile.name) + "</h1>" +
      "<p>" + escapeHtml(t(profile.role)) + " · " + escapeHtml(profile.email) + "</p>" +
      '<p class="badge available">' + escapeHtml(t(profile.status)) + "</p>" +
      "<h2>" + (en ? "Summary" : "Resumo") + "</h2>" +
      "<p>" + escapeHtml(t(profile.summary)) + "</p>" +
      "<h2>" + (en ? "Experience & Education" : "Experiência e Formação") + "</h2>" +
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

  function terminalApp() {
    var en = lang() === "en";
    var root = document.createElement("div");
    root.className = "terminal";
    var output = document.createElement("pre");
    output.className = "terminal-output";
    var form = document.createElement("form");
    form.className = "terminal-prompt";
    form.innerHTML = '<span>visitante@portfolio:~$</span>';
    var input = document.createElement("input");
    input.setAttribute("aria-label", en ? "Terminal command" : "Comando do terminal");
    input.autocomplete = "off";
    form.appendChild(input);
    root.append(output, form);

    var commands = {
      help: function () {
        return en
          ? "Available commands: help, whoami, skills, projects, hire, contact, clear"
          : "Comandos: help, whoami, skills, projects, hire, contact, clear";
      },
      whoami: function () {
        return profile.name + " - " + t(profile.role) + "\n" + t(profile.summary);
      },
      skills: function () {
        return profile.skills.map(function (group) {
          return t(group.group) + ": " + group.items.join(", ");
        }).join("\n");
      },
      projects: function () {
        return profile.projects.map(function (project) {
          return "- " + project.name + " (" + project.tech + ") " + project.url;
        }).join("\n");
      },
      contact: function () {
        return "email: " + profile.email + "\ngithub: " + profile.github;
      },
      hire: function () {
        return en
          ? "Status: " + t(profile.status) + "\nRun 'contact' to reach me."
          : "Status: " + t(profile.status) + "\nUse 'contact' para falar comigo.";
      },
      clear: function () { output.textContent = ""; return ""; }
    };

    function print(text) {
      if (text) output.textContent += text + "\n";
      output.scrollTop = output.scrollHeight;
    }

    print((en ? "Portfolio shell - type 'help' to start." : "Shell do portfolio - digite 'help' para comecar.") + "\n");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var value = input.value.trim();
      input.value = "";
      if (!value) return;
      print("visitante@portfolio:~$ " + value);
      var handler = commands[value.toLowerCase()];
      print(handler ? handler() : (en ? "command not found: " : "comando nao encontrado: ") + value);
    });

    setTimeout(function () { input.focus(); }, 50);
    return root;
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
    },
    {
      id: "terminal",
      icon: "assets/icons/terminal.svg",
      title: { pt: "Terminal", en: "Terminal" },
      width: 620,
      height: 380,
      render: terminalApp
    }
  ];

  document.addEventListener("click", function (event) {
    if (event.target.closest('[data-action="print-resume"]')) {
      var resume = document.getElementById("curriculum");
      if (!resume) return;
      var area = document.getElementById("print-area");
      area.innerHTML = resume.innerHTML;
      window.print();
      return;
    }

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
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + app.id);
    }
  }

  function openFromHash() {
    var id = (window.location.hash || "").replace("#", "");
    var known = registry.some(function (app) { return app.id === id; });
    openById(known ? id : "about");
  }

  return { list: list, openById: openById, openFromHash: openFromHash, t: t, escapeHtml: escapeHtml, lang: lang };
})();
