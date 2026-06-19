---
title: Hotkey Combo Maker
description: Sistema de atalhos AutoHotkey v2 com acumulação de modificadores. Combo mode ativado por gesto — sem conflito com atalhos do sistema.
createdAt: 2024-01-15
updatedAt: 2026-03-23
status: beta
type: project
github: https://github.com/Yuri-Machado-Luz/tool.autohotkey-macros
featured: false
draft: false
order: 2
tags: [autohotkey, windows, automacao, produtividade]
---

Scripts AutoHotkey v2 para Windows, organizados em módulos plug-and-play. O projeto principal é o **Hotkey Combo Maker** — um sistema de atalhos com acumulação de modificadores.

## Requisitos

- Windows 10 ou superior
- [AutoHotkey v2.0.18+](https://www.autohotkey.com/download/)

## Estrutura

```text
plug-n-play/        → Scripts estáveis, prontos para executar
active-development/ → Playground experimental (não recomendado para uso)
tests/              → Testes de modularidade e conceitos
```

## Hotkey Combo Maker

O script `better-remap.ahk` reimagina como atalhos de teclado funcionam no Windows. Em vez de memorizar combinações fixas (`Ctrl+Alt+F5`), o sistema usa um modo de acumulação de modificadores ativado por gesto.

### Fluxo de uso

1. **Duplo clique em Shift** — ativa o combo mode
2. **Acumular modificadores** — `Space → Shift`, `Ctrl → Ctrl`, `Alt → Alt`
3. **Pressionar letra ou número** — envia o combo acumulado via teclas virtuais F13–F23
4. **Auto-encerramento** — por timeout ou triplo Shift

O resultado é um espaço de atalhos praticamente ilimitado sem conflito com atalhos do sistema ou de aplicativos.

### Arquivos disponíveis

- `better-remap.ahk` — versão otimizada, recomendada para uso diário
- `better-remap-documented.ahk` — versão com comentários explicando cada bloco

## Como usar

Copie qualquer arquivo `.ahk` de `plug-n-play/` e execute com o AutoHotkey instalado. Os scripts são independentes — sem dependências externas ou configuração adicional.

Para personalização, a documentação oficial do AutoHotkey v2 é o melhor ponto de partida: [autohotkey.com/docs/v2](https://www.autohotkey.com/docs/v2/)
