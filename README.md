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
