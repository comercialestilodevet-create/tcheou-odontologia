# TCHEOU ODONTOLOGIA

Landing page institucional premium para a Tcheou Odontologia — Tijuca, Rio de Janeiro.

> **Excelência não é detalhe. É o padrão.**

## Visão do projeto

A experiência foi desenhada para posicionar o consultório como uma operação odontológica boutique: mais editorial, menos “site de dentista”. O conteúdo combina confiança, acolhimento, precisão e uma jornada de conversão curta até o WhatsApp.

### Direção de design

- Off-white como base, madeira como elemento de sofisticação e turquesa como assinatura.
- Tipografia contemporânea com contraste editorial.
- Ritmo de espaçamento amplo, bordas generosas e sombras discretas.
- Microinterações que reforçam profundidade sem deixar o site “barulhento”.
- Mobile-first e suporte a `prefers-reduced-motion`.

### Jornada de conversão

**Descobrir → confiar → entender → localizar → conversar → agendar**

O WhatsApp é o canal principal. O formulário não possui backend: ele apenas compõe uma mensagem e abre o canal oficial de atendimento.

## Arquitetura

```text
.
├── .github/workflows/quality.yml
├── assets/
│   ├── favicon.svg
│   └── tcheou-portrait.svg
├── css/style.css
├── js/script.js
├── docs/
│   ├── BRAND_SYSTEM.md
│   └── LAUNCH_CHECKLIST.md
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json
└── RESEARCH_NOTES.md
```

## Qualidade

A qualidade é tratada como parte do produto, não como etapa final. O workflow do GitHub valida a integridade básica do HTML, verifica a sintaxe JavaScript e procura referências locais quebradas.

## Conteúdo e compliance

O projeto não deve inventar CRO, títulos, certificações, preços, horários, equipe, equipamentos, resultados clínicos ou promessas. Dados profissionais e ativos visuais devem ser confirmados pela clínica antes do lançamento público.

## Deploy

O projeto é estático e pode ser importado diretamente na Vercel. Não há necessidade de backend ou etapa de build.

## Próximos gates

1. Aprovar foto profissional definitiva.
2. Confirmar credenciais profissionais e CRO.
3. Confirmar domínio/canonical definitivo.
4. Fazer QA final em 360, 768, 1024 e desktop.
5. Só então publicar na Vercel.

## Status

**GitHub:** código em `main`  
**Vercel:** ainda não publicado  
**Design:** em refinamento final  
**Release público:** aguardando gates da clínica
