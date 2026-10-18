import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Pill, ShieldAlert, CheckCircle2, ArrowRightLeft, Sparkles, Activity } from 'lucide-react';
import { drugDockingData } from '../data/researchData';

export const ChemotherapyDocking: React.FC = () => {
  const [selectedDrug, setSelectedDrug] = useState<string>('Paclitaxel');

  const activeDrug = drugDockingData.find((d) => d.name === selectedDrug) || drugDockingData[0];

  return (
    <div className="space-y-6">
      {/* Overview Header Bento Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-rose-700 font-extrabold text-[10px] uppercase tracking-widest">
          <Pill className="w-4 h-4 text-rose-600" />
          Farmacogenômica & Docking Proteína-Ligante (AutoDock Vina)
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
          Impacto das Mutações E542K/E545K na Via PIK3CA Frente a 11 Quimioterápicos
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Avaliou-se o impacto de mutações no gene PIK3CA frente a 11 fármacos quimioterápicos utilizando o algoritmo
          AutoDock Vina. A estrutura cristalográfica de referência (PDB ID: 8EXL) foi comparada entre a forma selvagem e
          incorporando as mutações substitutivas de glutamato por lisina nas posições 542 e 545 (E542K e E545K).
        </p>
      </div>

      {/* Main Interactive Comparison Chart Bento Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-emerald-700 text-[10px] font-extrabold uppercase tracking-widest">Afinidades Computacionais</span>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              Afinidade de Ligação Proteína-Ligante (kcal/mol) - AutoDock Vina
            </h3>
            <p className="text-xs text-slate-500">
              Valores mais negativos indicam acoplamento e afinidade mais fortes com o receptor PIK3CA
            </p>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full font-mono font-bold">
            Selvagem vs Mutação E542K/E545K
          </span>
        </div>

        {/* Recharts Bar Chart */}
        <div className="h-[340px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={drugDockingData} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" angle={-25} textAnchor="end" interval={0} fontSize={11} />
              <YAxis stroke="#64748b" unit=" kcal/mol" domain={[-12, 0]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '12px' }}
                formatter={(val: any) => [`${val} kcal/mol`, 'Energia de Ligação']}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar
                dataKey="wildTypeAffinity"
                name="PIK3CA Selvagem (Wild-Type)"
                fill="#059669"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="mutantAffinity"
                name="PIK3CA Mutante (E542K e E545K)"
                fill="#e11d48"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Drug Deep Dive Selection Grid Bento Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest">Fármaco e Interações</span>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
              Análise Detalhada por Fármaco
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Selecione um quimioterápico para examinar:</span>
        </div>

        {/* Drug Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {drugDockingData.map((d) => {
            const isSelected = d.name === selectedDrug;
            return (
              <button
                key={d.name}
                onClick={() => setSelectedDrug(d.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                  isSelected
                    ? 'bg-indigo-700 text-white border-indigo-700 shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {d.name}
              </button>
            );
          })}
        </div>

        {/* Active Drug Card Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Metrics Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <span className="text-lg font-black text-slate-900">{activeDrug.name}</span>
                <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 px-2.5 py-1 rounded-lg">
                  $\Delta\Delta G$: +{activeDrug.delta.toFixed(3)} kcal/mol
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-500 font-medium">Selvagem (Wild-Type)</span>
                  <div className="text-lg font-bold font-mono text-emerald-700">{activeDrug.wildTypeAffinity} kcal/mol</div>
                  <div className="text-[11px] text-slate-500">{activeDrug.hbondsWildType} Ligações H</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-500 font-medium">Mutante E542K/E545K</span>
                  <div className="text-lg font-bold font-mono text-rose-700">{activeDrug.mutantAffinity} kcal/mol</div>
                  <div className="text-[11px] text-slate-500">{activeDrug.hbondsMutant} Ligações H</div>
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed pt-1">
                <strong className="text-slate-900">Relevância Clínica:</strong> {activeDrug.clinicalRelevance}
              </div>
            </div>
          </div>

          {/* 2D Interaction Diagram Display (Paclitaxel Focus or Generic) */}
          <div className="lg:col-span-7 bg-slate-900 text-white border border-slate-800 p-5 rounded-2xl space-y-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Diagrama de Interações Químicas: {activeDrug.name} com PIK3CA
              </span>
              <span className="text-[11px] text-slate-400 font-mono">AutoDock Tools v1.5.7</span>
            </div>

            {activeDrug.name === 'Paclitaxel' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Wild Type Paclitaxel Box */}
                <div className="bg-slate-950 border border-emerald-500/40 p-4 rounded-xl space-y-2">
                  <div className="font-bold text-emerald-400 text-sm border-b border-slate-800 pb-1">
                    Conformação Selvagem (-9.187 kcal/mol)
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Estabilizado por <strong>4 ligações de hidrogênio</strong> com os aminoácidos-chave do sítio ativo:
                  </p>
                  <ul className="list-disc list-inside space-y-1 font-mono text-emerald-300">
                    <li>Asp290</li>
                    <li>Arg186</li>
                    <li>Asn36</li>
                    <li>Arg35</li>
                  </ul>
                  <div className="bg-emerald-500/10 p-2 rounded-lg text-[10px] text-emerald-300 mt-2">
                    ✓ Ancoragem forte e estável no bolso helicoidal.
                  </div>
                </div>

                {/* Mutated Paclitaxel Box */}
                <div className="bg-slate-950 border border-rose-500/40 p-4 rounded-xl space-y-2">
                  <div className="font-bold text-rose-400 text-sm border-b border-slate-800 pb-1">
                    Conformação Mutada (-8.105 kcal/mol)
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Número de pontes de H <strong>reduzido pela metade (apenas 2)</strong> com resíduos alterados:
                  </p>
                  <ul className="list-disc list-inside space-y-1 font-mono text-rose-300">
                    <li>Asn533</li>
                    <li>Arg664</li>
                  </ul>
                  <div className="bg-rose-500/10 p-2 rounded-lg text-[10px] text-rose-300 mt-2">
                    ⚠ Perda de contatos estabilizadores indica potencial perda de eficácia terapêutica.
                  </div>
                </div>
              </div>
            ) : activeDrug.name === 'Cisplatina' ? (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <div className="font-bold text-slate-200 border-b border-slate-800 pb-1">
                  Cisplatina (-3.470 kcal/mol selvagem vs -3.248 kcal/mol mutante)
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Diferente do Paclitaxel, a Cisplatina exibiu alteração apenas marginal de afinidade
                  (&Delta;&Delta;G = 0.222 kcal/mol). Isso sugere que a estabilidade do complexo Cisplatina-PIK3CA
                  sofre pouca influência das mutações pontuais E542K e E545K.
                </p>
              </div>
            ) : (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 text-xs text-slate-300">
                <div className="font-bold text-slate-200">
                  {activeDrug.name}: {activeDrug.wildTypeAffinity} kcal/mol (WT) vs {activeDrug.mutantAffinity} kcal/mol (MUT)
                </div>
                <p className="leading-relaxed">{activeDrug.clinicalRelevance}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
