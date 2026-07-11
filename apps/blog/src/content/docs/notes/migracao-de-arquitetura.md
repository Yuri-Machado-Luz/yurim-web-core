---
title: Migração de Arquitetura
draft: false
description: Reflexões sobre a decisão de abandonar Quartz e migrar para sistema próprio. Motivações, desafios técnicos e o que realmente está envolvido nesse processo.
updatedAt: 2026-07-10
tags: [devlog, reflexao, arquitetura]
---

## O panorama

Vamos aos fatos: hoje, esse blog poderia continuar funcionando perfeitamente com Quartz. Afinal, já é uma V2 da arquitetura anterior — aquela baseada só em React. A estrutura atual é "perfeita" pra integrar meu workflow de notas do Obsidian e transformar tudo num SSR coeso.

Pois é. Mas aí eu olho pra isso e penso: "E se eu jogasse tudo pro alto e construísse meu próprio sistema?"

Não seria exatamente jogar tudo fora, claro. Mas... no mínimo, é refazer do zero. Até porque esse blog deveria servir também como exemplo técnico — e um exemplo técnico com um sistema que eu acoplei na minha base de dados e configurei uns YAMLs não é exatamente o que se pode chamar de "uau".

Então a ideia é: abandonar a base pronta e construir uma arquitetura própria. A voz da razão, claro, já veio com aquele questionamento: "Você tem certeza que vai gastar semanas debugando plugin de remark quando podia só escrever texto?"

E a resposta curta é: sim, vou. A justificativa é simples, e é o que eu quero compartilhar aqui — até porque pode ser que isso ajude alguém ou, sei lá. É um blog, certo? Discorrer sobre a própria jornada faz parte disso.

## Por que não continuar com Quartz

Olha, se seu único objetivo é escrever conteúdo e ter um site bonitinho com zero dor de cabeça, não tem motivo pra não usá-lo. Mas, no meu caso, o objetivo é outro: conhecimento. Quero controle sobre todas as etapas do que produzo aqui. O processamento de markdown, a resolução dos wikilinks, otimização de imagens, estrutura de URLs. Mais do que isso, quero mostrar que consigo desenvolver um gerador do zero.

E sim, é masoquismo puro.

## Escolhas técnicas

Ainda não bati o martelo, mas: por que TypeScript + Vite (e não React, Vue, Svelte ou outras bibliotecas populares)?

Antes de tomar essa decisão, veio um questionamento que quase me fez desistir: "Se eu for usar alguma biblioteca, não seria a mesma coisa que continuar com Quartz?"

É, pode ser parecido. Mas, de forma resumida, Quartz é o carro pronto, enquanto as bibliotecas são como comprar um motor e as rodas e construir o resto. Você ainda tem liberdade pra fazer o que quiser, mas com uma base sólida.

Eu — e é aqui que entra o masoquismo — decidi ir além. Em vez de usar um framework, resolvi construir o pipeline do zero. Por quê? Simples: quero aprender de verdade. Varredura de arquivos, compilação, toda essa lógica que a gente só usa no dia a dia sem entender a complexidade por trás.

Então a ideia é essa: usar o Vite só como empacotador e servidor de desenvolvimento e escrever o resto na mão.

## O que realmente está envolvido (ou: a lista que eu não queria ver)

Vou listar aqui o rascunho que já tenho — e que, se você quiser fazer algo parecido, provavelmente vai precisar fazer também.

> Dividido em: fluxo + ferramentas projetadas.
> Totalmente sujeito a mudanças! Mas o blog vai ser atualizado durante o processo, então não se preocupe.

**Um pipeline de build**: necessário pra fazer scan recursivo dos arquivos markdown do CMS, extrair o frontmatter e converter .md > .html.

- Tools: Gray-matter + Remark + Rehype

**Wikilinks**: a parte chata. A lógica pra transformar `[[nome-do-arquivo]]` em link funcional, respeitando estrutura de alias `[[arquivo|texto]]` e tratando caminhos relativos. Provavelmente vou precisar escrever um plugin pro Remark. Vai demorar? Muito.

**Roteamento**: lógica pra que `/sessão/post-da-sessão` sirva `dist/content/sessão/post-da-sessão/index.html`. Vou tentar não sofrer antecipadamente, porque tenho quase certeza que só *parece* simples.

**Outras coisas que preciso pensar a respeito**:

- Backlinks
- Servidor de desenvolvimento com hot-reload
- Templates

E isso é só o essencial. Não vou nem pensar agora em otimização de imagens, feed RSS, sitemap, assets etc. Oh céus.

## Vale a pena? (depende do masoquismo)

Acho que, considerando que quero demonstrar domínio de ecossistema de build, parsing de AST, TypeScript e arquitetura de sistemas, sim, vale.

Agora, se você quer só escrever conteúdo — e ter tempo de sobra pra isso — não entre na minha onda. Já imagino a dor de cabeça que vem por aí.

## Uma dica, para quem está no meio do caminho

Faz igual eu estou fazendo (ainda bem que fiz isso, sinceramente): mantenha um blog ou CMS simples rodando enquanto desenvolve o sistema paralelo. Quando eu estava no meu portfólio anterior, deixei tudo parado, com uma build online completamente parada. Não faça isso. Assim você não fica sem publicar nada e não tem aquela pressão de terminar rápido.

## E o framework?

Olha, ainda não sei. Mas estou pensando em ir de Preact e JSX na camada de template. Ainda não decidi se quero me autoflagelar nesse nível fazendo todo o pipeline, então talvez eu use Next.js no modo SSG. Atualizações virão HAHAHA

Enfim, essa é minha jornada até agora. Espero que, se você estiver nessa mesma dúvida, essas reflexões te ajudem a decidir. E se decidir ir pelo caminho da loucura total (tipo eu), pelo menos agora você já sabe o buraco onde tá entrando.

## **Atualização (junho 2026)**

A migração foi concluída com Astro 6. O pipeline de build customizado ficou no papel — o Astro resolve processamento de Markdown, roteamento e bundling de forma muito mais sólida do que qualquer coisa que eu construiria do zero. A decisão final foi: Astro como base, React islands onde necessário, Tailwind CSS v4 com design tokens nativos. O masoquismo teve um limite razoável.

## **Atualização (julho 2026)**

O monólito portfólio+blog no Astro foi separado: o portfólio migrou para Next.js; o blog permanece em Astro com as content collections. Tokens de marca, cookie de tema e favicon ficam alinhados entre `www` e `blog`. Continua valendo a regra: documentar a decisão quando ela muda — não fingir que o plano original sobreviveu intacto.
