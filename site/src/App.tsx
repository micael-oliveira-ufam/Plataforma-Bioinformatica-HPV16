import React, { useState } from 'react';
import { Header } from './components/Header';
import { OverviewSection } from './components/OverviewSection';
import { MutationViewer } from './components/MutationViewer';
import { MolecularDynamicsLab } from './components/MolecularDynamicsLab';
import { ChemotherapyDocking } from './components/ChemotherapyDocking';
import { ImmunoinformaticsExplorer } from './components/ImmunoinformaticsExplorer';
import { ConclusionsSection } from './components/ConclusionsSection';
import { AiAssistantModal } from './components/AiAssistantModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiChat={() => setIsAiModalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'overview' && <OverviewSection onNavigate={setActiveTab} />}
        {activeTab === 'mutations' && <MutationViewer />}
        {activeTab === 'dynamics' && <MolecularDynamicsLab />}
        {activeTab === 'chemo' && <ChemotherapyDocking />}
        {activeTab === 'epitopes' && <ImmunoinformaticsExplorer />}
        {activeTab === 'conclusions' && <ConclusionsSection />}
      </main>

      {/* Institutional Bento Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-3">
            <a
              href="https://edoc.ufam.edu.br/handle/123456789/4819"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition h-14 w-auto px-3"
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
                className="h-11 w-auto object-contain"
              />
            </a>

            <div className="hidden sm:block h-8 w-px bg-slate-200" />

            <a
              href="https://protec.ufam.edu.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition h-14 w-auto px-3"
              title="PROTEC - Pró-Reitoria de Inovação Tecnológica / UFAM"
            >
              <img
                src={`${import.meta.env.BASE_URL}protec-logo.svg`}
                alt="Logo PROTEC UFAM"
                className="h-11 w-auto object-contain"
              />
            </a>

            <div className="hidden sm:block h-8 w-px bg-slate-200" />

            <div className="flex items-center justify-center p-1 bg-slate-50 rounded-xl border border-slate-200 h-12 w-auto px-3">
              <img
                src="https://sites.ufpe.br/gepifhri/wp-content/uploads/sites/86/2020/12/cnpq-logo.png"
                onError={(e) => {
                  if ((e.target as HTMLImageElement).dataset.fb) return; // evita loop se o fallback também falhar
                  (e.target as HTMLImageElement).dataset.fb = '1';
                  (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/CNPq_logo.png/320px-CNPq_logo.png';
                }}
                alt="Logo CNPq"
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>

          <div className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Iniciação Tecnológica • PIBITI 2025/2026
          </div>
          <p className="font-medium text-slate-700">
            Universidade Federal do Amazonas (UFAM) • Pró-Reitoria de Inovação Tecnológica (PROTEC)
          </p>
          <p className="text-slate-500">
            Programa Institucional de Bolsas de Iniciação em Desenvolvimento Tecnológico e Inovação — Projeto PIB-S/0053/2025
          </p>
          <p className="text-[11px] text-slate-400">
            Orientador: Profº Dr. Toni Ricardo Martins • Discente: Beatriz Souza de Oliveira (Bolsista CNPq)
          </p>
        </div>
      </footer>

      <AiAssistantModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </div>
  );
}
