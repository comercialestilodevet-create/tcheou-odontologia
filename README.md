# TCHEOU ODONTOLOGIA

Landing page institucional premium para a Tcheou Odontologia — Tijuca, Rio de Janeiro.

> **Excelência não é detalhe. É o padrão.**

## Visualizar o site

**Prévia publicada pelo GitHub Pages:** https://comercialestilodevet-create.github.io/tcheou-odontologia/

A hospedagem e a publicação deste projeto são feitas pelo GitHub Pages. A branch `main` é a fonte do site e as atualizações são publicadas pelo fluxo do próprio GitHub Pages. Não há configuração de hospedagem externa necessária.

A prévia mantém `noindex,follow` enquanto a clínica conclui a aprovação de conteúdo; isso não impede o acesso direto pelo link acima.

## Visão do projeto

A experiência posiciona o consultório como uma operação odontológica boutique: editorial, acolhedora e focada numa jornada curta até o agendamento pelo WhatsApp.

### Direção de design

- Identidade baseada na marca fornecida: dente em traço turquesa, wordmark cinza e azul-neblina.
- Turquesa `#10B6CE`, cinza `#73787B` e superfícies azuladas claras.
- Tipografia contemporânea, composição editorial e espaços generosos.
- Animações discretas com suporte a `prefers-reduced-motion`.
- Layout responsivo e imagens WebP com variantes para diferentes densidades de tela.

### Jornada de conversão

**Descobrir → confiar → entender → localizar → conversar → agendar**

O WhatsApp é o canal de agendamento. O telefone para ligação e o WhatsApp de agendamento são mantidos como destinos separados, conforme os dados fornecidos para o projeto.

## Arquitetura

```text
.
├── .github/workflows/quality.yml
├── assets/
│   ├── favicon.svg
│   ├── logo-tcheou-dark.svg
│   ├── logo-tcheou-light.svg
│   └── images/
├── css/
│   ├── style.css
│   ├── premium.css
│   └── image-quality.css
├── docs/
│   ├── BRAND_SYSTEM.md
│   ├── IMAGE_QUALITY.md
│   └── LAUNCH_CHECKLIST.md
├── js/script.js
├── scripts/validate.mjs
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

## Qualidade

O workflow **Quality Gate** roda em atualizações da branch principal e valida estrutura HTML, âncoras, arquivos locais, CSS, JavaScript, dados estruturados e manifest.

## Conteúdo e compliance

Não inventar CRO, títulos, certificações, horários, equipe, equipamentos, preços, resultados clínicos ou promessas. As credenciais profissionais, dados de contato e demais informações devem ser confirmados pela clínica antes da divulgação definitiva.

## Imagens

As variantes `*-4k.webp` têm dimensões de saída grandes, mas foram ampliadas a partir de fontes menores. O redimensionamento não recria detalhe nativo; ver `docs/IMAGE_QUALITY.md`.

## Status atual

- **Código:** branch `main` do GitHub.
- **Hospedagem:** GitHub Pages.
- **Prévia:** [abrir Tcheou Odontologia](https://comercialestilodevet-create.github.io/tcheou-odontologia/).
- **Validação:** ver os workflows mais recentes na aba [Actions](https://github.com/comercialestilodevet-create/tcheou-odontologia/actions).
- **Indexação:** desativada na prévia até aprovação do conteúdo pela clínica.

## Próximas validações da clínica

1. Aprovar foto e identidade visual.
2. Confirmar credenciais profissionais e CRO em fonte oficial.
3. Confirmar telefone, WhatsApp, Instagram, endereço e horário.
4. Fazer conferência visual final em celular e desktop.
5. Remover o `noindex` somente depois da aprovação expressa da divulgação pública.
