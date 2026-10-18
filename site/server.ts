import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

const REPORT_CONTEXT = `
RELATÓRIO FINAL - PIBITI 2025/2026 - UFAM / PROTEC / CNPq
Código do Projeto: PIB-S/0053/2025
Título: Desenvolvimento de teste diagnóstico para HPV-16 a partir da modelagem por IA de variantes nas Oncoproteínas E6/E7 ao interagir com p53 e p16INK4a
Orientador: Profº Dr. Toni Ricardo Martins
Discente: Beatriz Souza de Oliveira (Bolsista CNPq)
Instituição: Universidade Federal do Amazonas (UFAM) - Pró-Reitoria de Inovação Tecnológica (PROTEC)

RESUMO & CONTEXTO:
- Investigação in silico da agressividade de variantes do Papilomavírus Humano tipo 16 (HPV-16) circulantes no Amazonas.
- Uso de Inteligência Artificial (AlphaFold/AlphaFold3) para modelagem tridimensional das oncoproteínas E6 e E7 (selvagem e variantes do Amazonas/mundiais).
- Simulações de docking molecular (PIPER no Schrödinger Maestro, AutoDock Vina) e dinâmica molecular (Desmond, 200 ns em GPU RTX 5060 Ti 16GB, campo OPLS4).
- Predição de epítopos (IEDB, NetMHCpan 4, BePiPred 3) e identificação de alvos para testes diagnósticos rápidos e anticorpos neutralizantes.

DADOS PRINCIPAIS E RESULTADOS QUANTITATIVOS:
1. Mutações Locais no Amazonas:
   - Gene E6: T7392G (L90V - 45.5%), C7377T (H85Y - 39.4%), G7187T (Q21H - 39.4%). Conjunto simultâneo estudado: T6P, R17I, L19V, I80L, Q21H, H85Y, L90V.
   - Gene E7: G7810A (G43E), A7689G (N29S).

2. Interação E6-p53 (Docking e Dinâmica Molecular 200 ns):
   - Forma Selvagem (Wild-Type): 10 ligações de hidrogênio (Arg115->Asp55, Arg17->Asp135, Arg138->Cys136, Arg136->Thr137, Asn134->His140, Arg136->Glu131, Ser81->Glu131, Arg84->Glu128, Cys87->Glu105), 0 pontes salinas. RMSD médio de 7.24 Å. Energia livre MM-GBSA pós-MD: -104.71 kcal/mol.
   - Mutações Simultâneas: Apenas 5 pontes de hidrogênio, 1 ponte salina (Arg138->Glu87). Energia livre de docking MM-GBSA: -39.10 kcal/mol (vs -51.91 kcal/mol selvagem).
   - Variante H85Y isolada: 4 pontes de hidrogênio (Tyr88->Ser2, Tyr99->Thr77, Arg136->Arg81, Arg136->Asp114), 1 ponte salina (Arg138->Glu87). RMSD médio de 5.73 Å. Energia livre MM-GBSA pós-MD: -20.85 kcal/mol.
   - Conclusão Biológica: A menor afinidade E6-p53 nas mutantes reduz a capacidade viral teórica de degradar p53. Sugere que a alta mortalidade no Amazonas decorre de desigualdades sociais/geográficas e barreiras de diagnóstico, e não de um maior oncogenismo intrinsico.

3. Fármacos Quimioterápicos e Docking com PIK3CA (Wild-Type vs Mutante E542K/E545K):
   - Paclitaxel: Queda expressiva de afinidade. Selvagem = -9.187 kcal/mol (4 pontes H: Asp290, Arg186, Asn36, Arg35) vs Mutante = -8.105 kcal/mol (apenas 2 pontes H: Asn533, Arg664), sugerindo potencial resistência terapêutica.
   - Cisplatina: Mudança marginal (-3.470 kcal/mol selvagem vs -3.248 kcal/mol mutante), pouco afetada.
   - Outros 11 fármacos avaliados no receptor PIK3CA.

4. Imunoinformática & Epítopos Preditos:
   - T-Cell Epítopo de alta prevalência no Brasil (25.90%): KLPQLCTEL com HLA-A*02:01 (Afins docking MM-GBSA: -37.24 kcal/mol).
   - T-Cell Epítopo de maior afinidade MM-GBSA: KFYSKISEY com HLA-A*30:02 (-72.90 kcal/mol).
   - B-Cell Epítopo líder no BePiPred 3: HQKRTAMFQDPQERPRKLPQLCT (score 0.235, 23 aa) com docking TLR4 em -107.75 ± 6.78 kcal/mol.
`;

app.post("/api/ask-research", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Pergunta inválida" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Chave GEMINI_API_KEY não configurada no ambiente."
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Você é o assistente virtual especializado da pesquisa da UFAM (Projeto PIB-S/0053/2025 - Orientador Prof. Dr. Toni Ricardo Martins, Discente Beatriz Souza de Oliveira).\n\nBase de conhecimento científica do relatório:\n${REPORT_CONTEXT}\n\nPergunta do usuário: "${question}"\n\nResponda em português de forma clara, didática, cientificamente rigorosa e entusiasmada, destacando os números e significados dos achados do projeto.`
            }
          ]
        }
      ]
    });

    return res.json({ answer: response.text });
  } catch (err: any) {
    console.error("Erro no endpoint /api/ask-research:", err);
    return res.status(500).json({ error: "Erro ao processar consulta com IA: " + err.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
