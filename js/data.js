/**
 * Dados do perfil. Este é o único arquivo que precisa ser editado para
 * atualizar o conteúdo do site.
 */
window.PROFILE = {
  name: "Emanoel Belchior Elias de França",
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
  phone: "+55 (61) 9 9416-7322",
  github: "https://github.com/nukdown",
  linkedin: "https://www.linkedin.com/in/emanoel-belchior/",
  summary: {
    pt: "Engenheiro de software formado pela Universidade de Brasília (FGA), com mais de quatro anos construindo sistemas corporativos em Oracle APEX, PL/SQL e JavaScript no TCU e na Compware. Trabalho com desenvolvimento assistido por IA no dia a dia — agentes de código, revisão automatizada e RAG — para entregar mais rápido sem abrir mão de testes e código legível.",
    en: "Software engineer graduated at Universidade de Brasília (FGA), with 4+ years building enterprise systems in Oracle APEX, PL/SQL and JavaScript at TCU and Compware. I work with AI-assisted development day to day — coding agents, automated review and RAG — to ship faster without giving up tests and readable code."
  },
  skills: [
    {
      group: { pt: "IA para desenvolvimento", en: "AI for development" },
      items: ["Devin", "GitHub Copilot", "Cursor", "Claude Code", "Prompt engineering", "RAG", "LLM APIs (OpenAI/Anthropic)", "Code review com IA"]
    },
    { group: { pt: "Linguagens", en: "Languages" }, items: ["PL/SQL", "SQL", "JavaScript", "Python", "Ruby", "Java", "C/C++", "HTML/CSS"] },
    { group: { pt: "Frameworks & plataformas", en: "Frameworks & platforms" }, items: ["Oracle APEX", "Ruby on Rails", "Django", "Node.js", "React", "Oracle DB", "MySQL"] },
    { group: { pt: "Engenharia", en: "Engineering" }, items: ["Padrões de projeto", "Microsserviços", "Modelagem de dados", "UML", "Docker", "CI/CD", "Git"] },
    { group: { pt: "Qualidade & processo", en: "Quality & process" }, items: ["TDD", "Mutation testing", "Code review", "Scrum", "SAFe", "XP"] }
  ],
  experience: [
    {
      company: "Compware",
      title: { pt: "Engenheiro de Software", en: "Software Engineer" },
      period: "01/2022 — 08/2024",
      bullets: {
        pt: [
          "Análise e modelagem de requisitos junto às áreas de negócio.",
          "Desenvolvimento e manutenção de sistemas em Oracle APEX, PL/SQL, JavaScript e HTML/CSS.",
          "Garantia de qualidade e suporte aos usuários das aplicações em produção."
        ],
        en: [
          "Requirements analysis and modeling together with business areas.",
          "Development and maintenance of systems in Oracle APEX, PL/SQL, JavaScript and HTML/CSS.",
          "Quality assurance and user support for applications in production."
        ]
      }
    },
    {
      company: "TCU — Tribunal de Contas da União",
      title: { pt: "Desenvolvedor de Software", en: "Software Developer" },
      period: "01/2020 — 01/2022",
      bullets: {
        pt: [
          "Desenvolvimento de software e modelagem de dados em Oracle APEX, PL/SQL e SQL.",
          "Testes e validação de regras de negócio de sistemas de controle externo.",
          "Suporte técnico aos usuários internos."
        ],
        en: [
          "Software development and data modeling in Oracle APEX, PL/SQL and SQL.",
          "Testing and validation of business rules for public-audit systems.",
          "Technical support for internal users."
        ]
      }
    }
  ],
  education: [
    {
      school: "Universidade de Brasília — FGA/UnB",
      title: { pt: "Bacharelado em Engenharia de Software", en: "B.Sc. in Software Engineering" },
      period: "2014 — 2021",
      bullets: {
        pt: [
          "Projetos em Rails, Django e Java com foco em qualidade de software.",
          "Pesquisa sobre qualidade de suítes de teste usando mutation testing."
        ],
        en: [
          "Projects in Rails, Django and Java focused on software quality.",
          "Research on test suite quality using mutation testing."
        ]
      }
    },
    {
      school: "Instituto Federal de Goiás — IFG",
      title: {
        pt: "Técnico em Informática para Internet (integrado ao ensino médio)",
        en: "Technical degree in Internet Computing (integrated with high school)"
      },
      period: "2011 — 2014",
      bullets: { pt: [], en: [] }
    }
  ],
  /**
   * Stack de IA aplicada ao desenvolvimento: o que já uso no dia a dia e o
   * que está em estudo. Alimenta o app "IA no Dev" da área de trabalho.
   */
  aiStack: [
    {
      level: { pt: "Uso no dia a dia", en: "Daily use" },
      items: [
        {
          name: { pt: "Agentes de código (Devin, Claude Code, Cursor)", en: "Coding agents (Devin, Claude Code, Cursor)" },
          note: {
            pt: "Delego tarefas fechadas — refatorações, testes, migrações — e reviso o diff como faria em um code review.",
            en: "I delegate scoped tasks — refactors, tests, migrations — and review the diff like any code review."
          }
        },
        {
          name: "GitHub Copilot",
          note: {
            pt: "Autocomplete e geração de testes direto no editor, com validação manual das regras de negócio.",
            en: "Inline completion and test generation in the editor, with manual validation of business rules."
          }
        },
        {
          name: { pt: "Engenharia de prompt", en: "Prompt engineering" },
          note: {
            pt: "Contexto explícito, exemplos e critérios de aceite; prompts versionados junto com o código.",
            en: "Explicit context, examples and acceptance criteria; prompts versioned alongside the code."
          }
        },
        {
          name: { pt: "Revisão de código assistida por IA", en: "AI-assisted code review" },
          note: {
            pt: "Análise automática de PRs para pegar regressões e riscos antes do revisor humano.",
            en: "Automated PR analysis to catch regressions and risks before the human reviewer."
          }
        }
      ]
    },
    {
      level: { pt: "Em aprofundamento", en: "Deepening" },
      items: [
        {
          name: "LLM APIs (OpenAI, Anthropic)",
          note: {
            pt: "Function calling, saídas estruturadas e controle de custo/latência em produção.",
            en: "Function calling, structured outputs and cost/latency control in production."
          }
        },
        {
          name: { pt: "RAG e embeddings", en: "RAG and embeddings" },
          note: {
            pt: "Busca vetorial (pgvector) sobre bases internas para respostas fundamentadas em documentos.",
            en: "Vector search (pgvector) over internal data for document-grounded answers."
          }
        },
        {
          name: { pt: "Avaliação de modelos e prompts", en: "Model and prompt evaluation" },
          note: {
            pt: "Datasets de avaliação e testes de regressão para prompts — a mesma lógica de mutation testing aplicada a IA.",
            en: "Evaluation datasets and regression tests for prompts — mutation-testing thinking applied to AI."
          }
        },
        {
          name: { pt: "MCP e automação de agentes", en: "MCP and agent automation" },
          note: {
            pt: "Conectar agentes a ferramentas internas (banco, CI, tickets) com permissões controladas.",
            en: "Connecting agents to internal tools (database, CI, tickets) with controlled permissions."
          }
        }
      ]
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
      name: "TreinoSTI",
      url: "https://github.com/nukdown/TreinoSTI",
      tech: "Ruby on Rails",
      description: {
        pt: "Estudo de modelagem com tabela única de herança (STI) em Rails.",
        en: "Study of single-table inheritance (STI) modeling in Rails."
      }
    },
    {
      name: "eng_req_twitch",
      url: "https://github.com/nukdown/eng_req_twitch",
      tech: { pt: "Engenharia de requisitos", en: "Requirements engineering" },
      description: {
        pt: "Elicitação e modelagem de requisitos da plataforma Twitch (UnB/FGA).",
        en: "Requirements elicitation and modeling for the Twitch platform (UnB/FGA)."
      }
    },
    {
      name: "who-am-i",
      url: "https://github.com/nukdown/who-am-i",
      tech: "HTML, CSS, JavaScript",
      description: {
        pt: "Este portfólio: área de trabalho interativa em JavaScript puro, publicada via GitHub Actions.",
        en: "This portfolio: an interactive desktop in vanilla JavaScript, deployed with GitHub Actions."
      }
    }
  ]
};
