/**
 * Dados do perfil. Este é o único arquivo que precisa ser editado para
 * atualizar o conteúdo do site. Os campos marcados com "AJUSTE" são
 * rascunhos e devem ser revisados com informações reais.
 */
window.PROFILE = {
  name: "Emanoel Belchior",
  role: {
    pt: "Engenheiro de Software",
    en: "Software Engineer"
  },
  status: {
    pt: "Disponível para novas oportunidades (remoto ou híbrido)",
    en: "Open to new opportunities (remote or hybrid)"
  },
  location: { pt: "Brasília, Brasil", en: "Brasília, Brazil" },
  email: "belchior.emanoel@gmail.com",
  github: "https://github.com/nukdown",
  linkedin: "https://www.linkedin.com/in/", // AJUSTE: url completa do LinkedIn
  summary: {
    pt: "Engenheiro de software formado pela Universidade de Brasília (FGA), com experiência em desenvolvimento web, automação de testes e dados. Gosto de sistemas bem testados, código legível e entregas contínuas.",
    en: "Software engineer graduated at Universidade de Brasília (FGA), experienced in web development, test automation and data. I care about well-tested systems, readable code and continuous delivery."
  },
  skills: [
    { group: { pt: "Linguagens", en: "Languages" }, items: ["Ruby", "Python", "JavaScript", "Java", "SQL"] },
    { group: { pt: "Frameworks", en: "Frameworks" }, items: ["Ruby on Rails", "Django", "Node.js", "RSpec", "pytest"] },
    { group: { pt: "Dados & ML", en: "Data & ML" }, items: ["pandas", "scikit-learn", "Jupyter", "PostgreSQL"] },
    { group: { pt: "Práticas", en: "Practices" }, items: ["TDD", "Mutation testing", "CI/CD", "Code review", "Scrum"] }
  ],
  experience: [
    {
      company: "AJUSTE: Empresa atual",
      title: { pt: "Engenheiro de Software", en: "Software Engineer" },
      period: "2021 — 2025",
      bullets: {
        pt: [
          "Desenvolvimento e manutenção de aplicações web em Ruby on Rails.",
          "Cobertura de testes automatizados e revisão de código em pipelines de CI.",
          "Integrações com serviços de pagamento e APIs de terceiros."
        ],
        en: [
          "Built and maintained Ruby on Rails web applications.",
          "Automated test coverage and code review inside CI pipelines.",
          "Integrations with payment services and third-party APIs."
        ]
      }
    },
    {
      company: "Universidade de Brasília — FGA",
      title: { pt: "Bacharelado em Engenharia de Software", en: "B.Sc. in Software Engineering" },
      period: "2016 — 2021",
      bullets: {
        pt: [
          "Projetos acadêmicos em Rails, Django e Java, com foco em qualidade de software.",
          "Pesquisa sobre qualidade de suítes de teste usando mutation testing."
        ],
        en: [
          "Academic projects in Rails, Django and Java focused on software quality.",
          "Research on test suite quality using mutation testing."
        ]
      }
    }
  ],
  projects: [
    {
      name: "diaspora-suite-test-evaluation",
      url: "https://github.com/nukdown/diaspora-suite-test-evaluation",
      tech: "Ruby, mutation testing",
      description: {
        pt: "Avaliação da qualidade da suíte de testes da rede social open source Diaspora.",
        en: "Evaluation of the test suite quality of the Diaspora open source social network."
      }
    },
    {
      name: "TBL",
      url: "https://github.com/nukdown/TBL",
      tech: "Python, Django",
      description: {
        pt: "Plataforma gerenciadora de Team-Based Learning usada em disciplinas da UnB.",
        en: "Team-Based Learning management platform used in UnB courses."
      }
    },
    {
      name: "Mushroom_ML",
      url: "https://github.com/nukdown/Mushroom_ML",
      tech: "Python, scikit-learn",
      description: {
        pt: "Classificação de cogumelos comestíveis x venenosos com modelos de machine learning.",
        en: "Classifying edible vs. poisonous mushrooms with machine learning models."
      }
    },
    {
      name: "controleatletas",
      url: "https://github.com/nukdown/controleatletas",
      tech: "Java",
      description: {
        pt: "Sistema de cadastro e controle de atletas.",
        en: "Athlete registration and management system."
      }
    }
  ]
};
