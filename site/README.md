# Plataforma de Bioinformática & Diagnóstico HPV-16 — site

Site interativo (React + Vite + Tailwind + Recharts) com os resultados do projeto PIBITI/UFAM PIB-S/0053/2025.

**Publicado em:** https://micael-oliveira-ufam.github.io/Plataforma-Bioinformatica-HPV16/

## Desenvolvimento local

```bash
cd site
npm install
npm run dev          # servidor Express + Vite em http://localhost:3000 (assistente de IA exige GEMINI_API_KEY em .env.local)
npm run build:pages  # build estático para o GitHub Pages (saída em site/dist)
```

## Deploy

O workflow `.github/workflows/pages.yml` publica o site a cada push em `main` que altere `site/`.
O base path (`/Plataforma-Bioinformatica-HPV16/`) está em `vite.config.ts` (variável `VITE_BASE` o sobrescreve).

## Assistente de IA

O GitHub Pages só serve arquivos estáticos; o endpoint `/api/ask-research` (`server.ts`) não existe lá, e a `GEMINI_API_KEY` nunca deve ser embutida no front-end.
Na versão publicada, o chat roda em modo estático (perguntas frequentes com respostas extraídas do relatório). Para IA ao vivo, hospede o `server.ts` e defina `VITE_API_URL` no build.
