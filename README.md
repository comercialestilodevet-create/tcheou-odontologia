# Tcheou Odontologia

Landing page institucional premium da Tcheou Odontologia, Tijuca — Rio de Janeiro.

## Direção

Projeto pensado para elevar percepção de valor, confiança e conversão, com uma experiência editorial e contemporânea em vez de um catálogo genérico de procedimentos.

A arquitetura prioriza:

- narrativa de marca e posicionamento;
- conversão por WhatsApp;
- experiência mobile-first;
- prova social sem promessas clínicas indevidas;
- SEO local e dados estruturados;
- acessibilidade e suporte a reduced motion;
- publicação estática, sem backend e pronta para Vercel.

## Stack

HTML semântico + CSS moderno + JavaScript vanilla.

A solução é propositalmente leve: não depende de framework ou biblioteca externa para o funcionamento principal da experiência.

## Estrutura

```text
.
├── assets/
│   ├── favicon.svg
│   └── tcheou-portrait.svg
├── css/
│   └── style.css
├── js/
│   └── script.js
├── index.html
├── robots.txt
├── sitemap.xml
└── vercel.json
```

## Conversão

O CTA principal abre um modal de agendamento com poucos campos e prepara uma mensagem para o WhatsApp da clínica. Não existe backend próprio e o formulário não armazena dados.

## Antes do lançamento

Confirmar os dados profissionais oficiais, CRO, especialidades e qualificações, horários e domínio definitivo com a clínica. A seção visual da profissional também deve receber uma fotografia aprovada quando esse ativo estiver disponível.

## Deploy

O repositório pode ser importado diretamente na Vercel como site estático, sem etapa de build adicional.