import React from 'react';
import { BookOpen, CheckCircle2, ShieldAlert, Github, ExternalLink, Award, Heart } from 'lucide-react';
import { projectInfo } from '../data/researchData';

export const ConclusionsSection: React.FC = () => {
  const references = [
    { num: 1, text: 'INSTITUTO NACIONAL DE CÂNCER (Brasil). Conceito e magnitude. Rio de Janeiro: Ministério da Saúde, 2022.' },
    { num: 2, text: 'Arbyn M, Weiderpass E, Bruni L, et al. Estimates of incidence and mortality of cervical cancer in 2018: a worldwide analysis. Lancet Glob Health. 2020;8(2):e191–203.' },
    { num: 3, text: 'WHO Global Cervical Cancer Elimination Initiative. Lancet Glob Health. 2023;11(2):e197–206.' },
    { num: 4, text: 'Torres KL, Rondon HH de MF, Martins TR, et al. Moving towards a strategy to accelerate cervical cancer elimination in a high-burden city—Lessons learned from the Amazon city of Manaus, Brazil. PLoS One. 2021;16(10):e0258539.' },
    { num: 5, text: 'Torres KL, Mariño JM, Pires Rocha DA, et al. Self-sampling coupled to the detection of HPV 16 and 18 E6 protein: A promising option for detection of cervical malignancies in remote areas. PLoS One. 2018;13(7):e0201262.' },
    { num: 6, text: 'Rondon HH de MF. Variantes e mutações do HPV 16 e o perfil clínico e histopatológico de mulheres amazônidas com câncer de colo do útero. Manaus: Universidade Federal do Amazonas, 2024.' },
    { num: 8, text: 'Abramson J, Adler J, Dunger J, et al. Accurate structure prediction of biomolecular interactions with AlphaFold 3. Nature. 2024;630(8016):493–500.' },
    { num: 9, text: 'Jumper J, Evans R, Pritzel A, et al. Highly accurate protein structure prediction with AlphaFold. Nature. 2021;596(7873):583–9.' },
    { num: 10, text: 'Martinez-Zapien D, Ruiz FX, Poirson J, et al. Structure of the E6/E6AP/p53 complex required for HPV-mediated degradation of p53. Nature. 2016;529(7587):541–5.' },
    { num: 12, text: 'D. E. Shaw Research. Schrödinger Release 2021-2: Desmond Molecular Dynamics System, New York, NY, 2021.' },
    { num: 15, text: 'Torres L, Da Silva Bouzas LF, Almada A, et al. Distribution of HLA-A, -B and -DRB1 antigenic groups and haplotypes from the Brazilian bone marrow donor registry (REDOME). Human Immunology. 2017;78(10):602–609.' },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Header Bento Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-[10px] uppercase tracking-widest">
          <Award className="w-4 h-4 text-emerald-600" />
          Conclusões PIBITI 2025/2026 - UFAM
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
          Síntese Científica, Implicações para a Saúde Pública do Amazonas e Perspectivas Futuras
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Os dados obtidos in silico fornecem uma base biofísica consistente para compreender a interação de variantes
          do HPV-16 no Amazonas, sinalizando caminhos estratégicos para imunoterapia e diagnóstico rápido.
        </p>
      </div>

      {/* Main Scientific Findings & Hypotheses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Main Findings Bento Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Principais Conclusões do Projeto</h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900">1. Enfraquecimento da Interação E6-p53:</strong> Sem mutações, a oncoproteína E6 apresenta maior afinidade
              pela p53 (-104,71 kcal/mol), o que levaria a uma degradação mais eficiente e maior potencial oncogênico direto.
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900">2. Fator Socioambiental do Amazonas:</strong> A menor afinidade observada na variante mutante (H85Y e simultâneas)
              sugere que as altas taxas de mortalidade por câncer de colo do útero em Manaus e interior estão mais fortemente
              relacionadas a barreiras sociais e falhas de rastreamento do que a um hiper-oncogenismo das cepas locais.
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900">3. Sensibilidade Quimioterápica (PIK3CA):</strong> As mutações E542K/E545K alteram a conformação do receptor,
              reduzindo a afinidade com o Paclitaxel (-9,187 para -8,105 kcal/mol) enquanto mantêm resposta estável para a Cisplatina.
            </div>
          </div>
        </div>

        {/* Limitations & Future Perspectives Bento Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-slate-900">Limitações e Perspectivas Futuras</h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                <strong className="text-slate-900">Limitações do Estudo:</strong> Amostragem inicial de pacientes no Amazonas proveniente de tese de doutorado local.
                Para simplificação computacional da dinâmica molecular, o complexo ubiquitina-proteassoma completo foi omitido nos cálculos in silico.
              </p>

              <div className="bg-emerald-900 text-white p-4 rounded-xl space-y-2 border border-emerald-800 shadow-md">
                <div className="font-bold flex items-center justify-between text-white">
                  <span>Disponibilização Pública dos Dados (Open Science)</span>
                  <a
                    href="https://github.com/micael-oliveira-ufam/Plataforma-Bioinformatica-HPV16/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-200 px-2.5 py-1 rounded-lg text-xs font-semibold border border-emerald-700 transition"
                  >
                    <Github className="w-4 h-4 text-emerald-300" />
                    Acessar GitHub
                  </a>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  As sequências de proteínas, epítopos preditos, coordenadas de docking e primers desenhados estão disponibilizados publicamente no
                  GitHub do projeto, permitindo a síntese, purificação e validação prática de kits diagnósticos de baixo custo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agradecimentos e Agências de Fomento Bento Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Heart className="w-5 h-5 text-rose-600" />
          <h3 className="text-base font-bold text-slate-900">Agradecimentos e Fomento Institucional</h3>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm shrink-0 flex items-center justify-center h-20 w-48">
            <img
              src="https://sites.ufpe.br/gepifhri/wp-content/uploads/sites/86/2020/12/cnpq-logo.png"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/CNPq_logo.png/320px-CNPq_logo.png';
              }}
              alt="Logo CNPq - Conselho Nacional de Desenvolvimento Científico e Tecnológico"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="space-y-2 text-xs text-slate-700 leading-relaxed text-center md:text-left">
            <p className="font-bold text-slate-900 text-sm">
              Conselho Nacional de Desenvolvimento Científico e Tecnológico (CNPq)
            </p>
            <p>
              Agradecemos o fomento financeiro concedido através da <strong>Bolsa de Iniciação em Desenvolvimento Tecnológico e Inovação (PIBITI/CNPq)</strong> para a realização desta pesquisa (Projeto <strong>PIB-S/0053/2025</strong>). Expressamos também nosso reconhecimento à <strong>Universidade Federal do Amazonas (UFAM)</strong> e à <strong>Pró-Reitoria de Inovação Tecnológica (PROTEC)</strong> pelo suporte institucional e infraestrutura.
            </p>
            <p className="text-slate-500 font-medium">
              Discente Bolsista: <strong>Beatriz Souza de Oliveira</strong> • Orientador: <strong>Profº Dr. Toni Ricardo Martins</strong>
            </p>
          </div>
        </div>
      </div>

      {/* References Bento Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <BookOpen className="w-5 h-5 text-slate-600" />
          <h3 className="text-base font-bold text-slate-900">Referências Bibliográficas Citadas no Relatório</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 font-mono">
          {references.map((r) => (
            <div key={r.num} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed">
              <span className="text-emerald-700 font-bold mr-1.5">[{r.num}]</span>
              {r.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
