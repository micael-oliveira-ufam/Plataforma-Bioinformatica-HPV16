import React from 'react';
import { Dna, ShieldCheck, Sparkles, BookOpen, MessageSquare, Download, Github } from 'lucide-react';
import { projectInfo } from '../data/researchData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenAiChat }) => {
  const tabs = [
    { id: 'overview', label: 'Visão Geral & Epidemiologia' },
    { id: 'mutations', label: 'Estruturas & Mutações IA' },
    { id: 'dynamics', label: 'Dinâmica Molecular (200 ns)' },
    { id: 'chemo', label: 'Quimioterapia & PIK3CA' },
    { id: 'epitopes', label: 'Imunoinformática & Diagnóstico' },
    { id: 'conclusions', label: 'Conclusões & Perspectivas' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 text-slate-900 sticky top-0 z-40 shadow-sm">
      {/* Top Academic Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold px-2.5 py-0.5 rounded-md text-[11px] uppercase tracking-wider">
              {projectInfo.institution}
            </span>
            <span className="text-slate-300 font-medium hidden sm:inline text-[11px]">
              {projectInfo.department} • {projectInfo.edition}
            </span>
            <span className="bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-0.5 rounded-md text-[11px] font-mono">
              Código: {projectInfo.code}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/micael-oliveira-ufam/Plataforma-Bioinformatica-HPV16/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-medium px-3 py-1 rounded-md text-xs transition flex items-center gap-1.5 shadow-sm"
              title="Acessar Repositório no GitHub"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Dados no GitHub</span>
            </a>
            <button
              onClick={onOpenAiChat}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1 rounded-md text-xs transition flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Perguntar à IA do Relatório
            </button>
          </div>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* UFAM and PROTEC Logos Container */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-2 rounded-2xl shrink-0 shadow-sm">
              <a
                href="https://edoc.ufam.edu.br/handle/123456789/4819"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition h-14 sm:h-16 w-auto shrink-0 px-2"
                title="UFAM - Universidade Federal do Amazonas"
              >
                <img
                  src="https://edoc.ufam.edu.br/bitstream/123456789/4819/7/marca_ufam_vetor_positivo.png"
                  onError={(e) => {
                  if ((e.target as HTMLImageElement).dataset.fb) return; // evita loop se o fallback também falhar
                  (e.target as HTMLImageElement).dataset.fb = '1';
                    (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}ufam-logo.svg`;
                  }}
                  alt="Logo UFAM"
                  className="h-11 sm:h-13 w-auto object-contain"
                />
              </a>
              <div className="h-8 w-px bg-slate-200" />
              <a
                href="https://protec.ufam.edu.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition h-14 sm:h-16 w-auto shrink-0 px-2"
                title="PROTEC - Pró-Reitoria de Inovação Tecnológica / UFAM"
              >
                <img
                  src={`${import.meta.env.BASE_URL}protec-logo.svg`}
                  alt="Logo PROTEC UFAM"
                  className="h-11 sm:h-13 w-auto object-contain"
                />
              </a>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 text-[10px] font-extrabold uppercase tracking-widest">
                  Iniciação Tecnológica • PIBITI 2025/2026
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-snug">
                Plataforma de Bioinformática & Diagnóstico HPV-16 no Amazonas
              </h1>
              <p className="text-slate-600 text-xs max-w-4xl leading-relaxed">
                {projectInfo.title}
              </p>
            </div>
          </div>

          {/* Authors Bento Card */}
          <div className="bg-slate-100 border border-slate-200 p-3 rounded-2xl text-xs space-y-1 shrink-0">
            <div className="text-slate-500">
              Discente:{' '}
              <strong className="text-slate-900 font-semibold">{projectInfo.student}</strong>
            </div>
            <div className="text-slate-500">
              Orientador:{' '}
              <strong className="text-emerald-800 font-semibold">{projectInfo.advisor}</strong>
            </div>
          </div>
        </div>

        {/* Bento Pill Tab Navigation */}
        <nav className="mt-4 pt-3 border-t border-slate-200">
          <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 inline-flex gap-1 overflow-x-auto max-w-full no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-150 uppercase tracking-wider ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};
