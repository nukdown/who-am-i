# my-website

Portfólio pessoal de **Emanoel Belchior** — engenheiro de software em busca de novas oportunidades.

A interface é uma "área de trabalho" no estilo Windows: ícones no desktop, janelas arrastáveis,
barra de tarefas e menu Iniciar. Cada seção do portfólio (currículo, projetos, contato) é um
"programa" que abre em uma janela.

## Stack

HTML, CSS e JavaScript puros — sem build, sem dependências. Basta abrir `index.html`.

## Rodando localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Estrutura

```
index.html        # desktop, barra de tarefas e menu Iniciar
css/desktop.css   # papel de parede, ícones, taskbar
css/window.css    # janelas e conteúdo dos "programas"
js/wm.js          # gerenciador de janelas (abrir, arrastar, minimizar, fechar)
js/apps.js        # conteúdo de cada programa
js/data.js        # dados do perfil (edite aqui para atualizar o currículo)
assets/           # ícones e currículo em PDF
```

## Publicação

O site é publicado no GitHub Pages a cada push na branch `main`
(`.github/workflows/pages.yml`). Ative em **Settings → Pages → Source: GitHub Actions**.

URL: https://nukdown.github.io/my-website/

## Funcionalidades pensadas para recrutadores

- **Currículo imprimível**: botão "Baixar PDF / Imprimir" gera uma versão limpa em uma página.
- **SEO**: JSON-LD `Person`, Open Graph, `sitemap.xml`, `robots.txt` e conteúdo em `<noscript>`.
- **PT-BR / EN**: alternância de idioma na barra de tarefas, com preferência salva.
- **Contato de um clique**: e-mail pré-preenchido com assunto de vaga e cópia rápida do endereço.
- **Terminal**: comandos `whoami`, `skills`, `projects`, `hire` para quem gosta de explorar.
