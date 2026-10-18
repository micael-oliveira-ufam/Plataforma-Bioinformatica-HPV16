import React from 'react';
import { Target, Activity, Globe, MapPin, AlertTriangle, ShieldCheck, Microscope, Cpu, ArrowRight } from 'lucide-react';
import { projectInfo, amazonMutations } from '../data/researchData';

interface OverviewSectionProps {
  onNavigate: (tabId: string) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Bento Top Banner Context */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
          <Microscope className="w-80 h-80 text-emerald-400" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">
              Apresentação Executiva PIBITI/UFAM
            </span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              Estado do Amazonas & População Ribeirinha
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Enfrentando a Incidência de Câncer de Colo do Útero no Amazonas com IA e Bioinformática
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl">
            O câncer de colo de útero permanece como um dos maiores desafios de saúde pública no estado do Amazonas,
            onde barreiras geográficas fluviais e restrições logísticas dificultam o diagnóstico precoce. Este projeto do
            <strong> PIBITI UFAM/PROTEC/CNPq</strong> investiga como mutações específicas do vírus <strong>HPV-16</strong>
            circulantes na população amazonense alteram a estrutura 3D de suas oncoproteínas (E6 e E7), sua interação com
            a proteína supressora de tumor p53 e o impacto no design de diagnósticos de rápida resposta.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('mutations')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shadow-sm uppercase tracking-wider"
            >
              Explorar Estruturas & Mutações IA
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('dynamics')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2 uppercase tracking-wider"
            >
              Ver Dinâmica Molecular 200 ns
            </button>
          </div>
        </div>
      </div>

      {/* Bento Grid Epidemiology & Public Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-rose-600 uppercase tracking-widest">Desafio Local</span>
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">Manaus & Amazonas</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mesmo com exames citológicos gratuitos desde 1990 e vacinação contra HPV desde 2013, Manaus mantém uma das
              maiores incidências do mundo devido à vasta extensão territorial e entraves de colposcopia.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
            Fator Crítico: Logística Fluvial
          </div>
        </div>

        <div className="md:col-span-4 bg-emerald-900 rounded-2xl p-6 text-white shadow-lg space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-emerald-300 uppercase tracking-widest">Causalidade Oncogênica</span>
              <Activity className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="text-3xl font-black text-white">99% dos Casos</div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              A infecção persistente por papilomavírus oncogênico (com destaque para o HPV-16) é responsável por 99% dos
              casos de câncer cervical, sendo o carcinoma epidermoide o subtipo responsável por 90%.
            </p>
          </div>
          <div className="pt-2 border-t border-emerald-800/80 text-[11px] font-semibold text-emerald-200">
            Subtipo Oncogênico Dominante
          </div>
        </div>

        <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest">Meta OMS 2030</span>
              <Globe className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">&lt; 4 por 100.000</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Iniciativa Global da OMS visa reduzir a incidência para &lt;4 casos/100 mil mulheres-ano através dos pilares:
              90% vacinadas, 70% rastreadas com teste de alta performance e 90% tratadas.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
            Meta Global Erradicação
          </div>
        </div>
      </div>

      {/* Bento Objectives Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* General Objective Bento Card */}
        <div className="md:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-9 h-9 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-emerald-700 text-[10px] font-extrabold uppercase tracking-widest">Objetivo Geral</span>
              <h3 className="text-base font-bold text-slate-900">Projeto PIB-S/0053/2025</h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Investigar como mutações identificadas no estado do Amazonas e no mundo para o HPV-16 podem interferir no
            reconhecimento de proteínas supressoras de tumor (p53 e p16INK4a), aplicando simulações de biofísica computacional,
            previsões por IA e imunoinformática para o desenvolvimento de diagnósticos e vacinas personalizadas.
          </p>
        </div>

        {/* OncoE6 & Riverine Innovation Bento Card */}
        <div className="md:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-9 h-9 bg-indigo-100 text-indigo-800 rounded-xl flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest">Inovação Tecnológica</span>
              <h3 className="text-base font-bold text-slate-900">Teste OncoE6™ em Populações Isoladas</h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Avanços recentes no Amazonas demonstraram a viabilidade da aplicação de testes como o OncoE6™ em populações
            ribeirinhas e de difícil acesso, permitindo a identificação da proteína viral ativa e contornando obstáculos
            logísticos de transporte de amostras convencionais.
          </p>
        </div>
      </div>

      {/* Bento Regional Mutations Overview Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-emerald-700 text-[10px] font-extrabold uppercase tracking-widest">Genômica Regional</span>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-700" />
              Mutações Genéticas Mapeadas na População do Amazonas
            </h3>
            <p className="text-xs text-slate-500">
              Mutações missense identificadas em estudos genômicos locais (Rondon et al., 2024; Torres et al., 2021)
            </p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-mono font-bold">
            Modeladas no AlphaFold / Geneious
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-700 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Gene</th>
                <th className="py-3 px-4">Código Nucleotídico</th>
                <th className="py-3 px-4">Alteração Aminoacídica</th>
                <th className="py-3 px-4">Prevalência / Frequência Local</th>
                <th className="py-3 px-4">Impacto Estrutural Predito</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {amazonMutations.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-extrabold text-emerald-700 font-mono">{m.gene}</td>
                  <td className="py-3 px-4 font-mono text-slate-800">{m.code}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{m.aminoacidChange}</td>
                  <td className="py-3 px-4">
                    <span className="bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-md font-mono font-bold text-[11px]">
                      {m.frequencyAmazonas}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{m.impactOnBinding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
