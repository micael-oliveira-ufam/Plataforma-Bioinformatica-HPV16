import React, { useState } from 'react';
import { X, Send, Sparkles, Bot, User, Loader2, BookOpen } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

// No GitHub Pages não existe backend (o endpoint /api/ask-research do server.ts precisa
// de Node + GEMINI_API_KEY, que nunca deve ir para o navegador). Se VITE_API_URL estiver
// definida no build, o chat consulta esse backend; caso contrário, entra em "modo estático",
// com respostas pré-redigidas que reproduzem SOMENTE os dados do relatório final.
const API_URL: string = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';
const STATIC_MODE = API_URL === '';

const STATIC_ANSWERS: Record<string, string> = {
  'Qual o impacto da mutação H85Y na energia livre com a p53?':
    'Relatório PIB-S/0053/2025 — interação E6–p53 (docking + dinâmica molecular de 200 ns):\n\n' +
    '• Forma selvagem: 10 ligações de hidrogênio, 0 pontes salinas, RMSD médio de 7,24 Å e energia livre MM-GBSA pós-MD de -104,71 kcal/mol.\n' +
    '• Variante H85Y isolada: 4 ligações de hidrogênio (Tyr88→Ser2, Tyr99→Thr77, Arg136→Arg81, Arg136→Asp114), 1 ponte salina (Arg138→Glu87), RMSD médio de 5,73 Å e energia livre MM-GBSA pós-MD de -20,85 kcal/mol.\n\n' +
    'Interpretação do relatório: a afinidade E6–p53 é menor nas variantes, o que reduziria a capacidade viral teórica de degradar a p53.',
  'Como as mutações no PIK3CA afetam o Paclitaxel?':
    'Relatório PIB-S/0053/2025 — docking com PIK3CA (selvagem vs. mutante E542K/E545K):\n\n' +
    '• Selvagem: -9,187 kcal/mol, com 4 ligações de hidrogênio (Asp290, Arg186, Asn36, Arg35).\n' +
    '• Mutante: -8,105 kcal/mol, com apenas 2 ligações de hidrogênio (Asn533, Arg664).\n\n' +
    'Há queda expressiva de afinidade, sugerindo potencial resistência terapêutica. Para comparação, a Cisplatina variou pouco (-3,470 kcal/mol no selvagem vs. -3,248 kcal/mol no mutante). Outros 11 fármacos foram avaliados no PIK3CA.',
  'Quais são os epítopos T mais prevalentes no Brasil (REDOME)?':
    'Relatório PIB-S/0053/2025 — epítopos de células T:\n\n' +
    '• Maior prevalência no Brasil (25,90%): KLPQLCTEL com HLA-A*02:01 (MM-GBSA de docking: -37,24 kcal/mol).\n' +
    '• Maior afinidade MM-GBSA: KFYSKISEY com HLA-A*30:02 (-72,90 kcal/mol).',
  'Por que a alta mortalidade no Amazonas tem relação social?':
    'Conclusão do relatório PIB-S/0053/2025: as variantes do Amazonas apresentaram menor afinidade E6–p53 (o que reduz a capacidade viral teórica de degradar a p53). ' +
    'Por isso, o estudo sugere que a alta mortalidade no Amazonas decorre de desigualdades sociais/geográficas e de barreiras de diagnóstico, e não de um maior oncogenismo intrínseco das variantes.',
};

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: STATIC_MODE
        ? 'Olá! Esta versão publicada (GitHub Pages) não possui servidor de IA. Escolha uma das perguntas frequentes abaixo para ver as respostas extraídas do relatório final do Projeto PIB-S/0053/2025 da UFAM.'
        : 'Olá! Sou o assistente científico virtual do Projeto PIB-S/0053/2025 da UFAM. Como posso ajudar com dúvidas sobre as simulações do AlphaFold, dinâmica molecular de 200 ns, docking com a p53 e diagnósticos de HPV-16?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const sampleQuestions = [
    'Qual o impacto da mutação H85Y na energia livre com a p53?',
    'Como as mutações no PIK3CA afetam o Paclitaxel?',
    'Quais são os epítopos T mais prevalentes no Brasil (REDOME)?',
    'Por que a alta mortalidade no Amazonas tem relação social?',
  ];

  const handleSend = async (questionText?: string) => {
    const q = questionText || input;
    if (!q.trim() || loading) return;

    setMessages((prev) => [...prev, { sender: 'user', text: q }]);
    if (!questionText) setInput('');
    setLoading(true);

    if (STATIC_MODE) {
      const answer = STATIC_ANSWERS[q];
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text:
            answer ??
            'Perguntas livres exigem o servidor de IA, indisponível nesta versão estática. Use as perguntas frequentes abaixo ou consulte o relatório completo.',
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/ask-research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();
      if (data.answer) {
        setMessages((prev) => [...prev, { sender: 'ai', text: data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: 'Desculpe, ocorreu um problema ao consultar a IA. Verifique as configurações da API Key ou tente novamente.',
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Erro ao conectar com o servidor da aplicação. Tente novamente em instantes.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl">
              <Sparkles className="w-5 h-5 text-emerald-700 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Assistente de IA - Relatório PIBITI/UFAM
              </h3>
              <p className="text-xs text-slate-500">Respostas geradas com base no relatório final PIB-S/0053/2025</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 text-xs sm:text-sm ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-emerald-800 text-white font-medium rounded-tr-none shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-indigo-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono font-bold bg-emerald-50 p-3 rounded-xl border border-emerald-200 w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
              Sintetizando resposta científica...
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
          <div className="text-[11px] text-slate-500 font-bold mb-1.5 flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-emerald-600" />
            Perguntas Frequentes do Relatório:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sq)}
                className="text-[11px] bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-full transition text-left font-medium"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={STATIC_MODE}
              placeholder={STATIC_MODE ? 'Perguntas livres indisponíveis nesta versão estática' : 'Digite sua dúvida sobre o projeto da UFAM...'}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
            />
            <button
              type="submit"
              disabled={STATIC_MODE || loading || !input.trim()}
              className="bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-bold transition flex items-center justify-center shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
