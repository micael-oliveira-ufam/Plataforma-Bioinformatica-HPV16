import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  Scatter,
} from 'recharts';
import {
  Activity,
  Zap,
  Layers,
  Sparkles,
  BarChart3,
  ShieldAlert,
  ArrowRightLeft,
  Flame,
  Maximize2,
  Info,
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  h85yTrajectory200ns,
  h85yRMSFChainA,
  h85yRMSFChainD,
  h85yMMGBSADecompList,
  h85yEnergyTermComparison,
} from '../data/h85yDataset';
import { hBondInteractions } from '../data/researchData';

export const H85yvsWildTypeCharts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rmsd' | 'rg' | 'sasa' | 'rmsf' | 'mmgbsa' | 'distribution' | 'hbonds'>('rmsd');
  const [selectedChain, setSelectedChain] = useState<'chainA' | 'chainD'>('chainA');
  const [timeRange, setTimeRange] = useState<number>(200);

  // Filter trajectory points up to current time range selection
  const filteredTrajectory = h85yTrajectory200ns.filter((p) => p.timeNs <= timeRange);

  // Active RMSF dataset based on selected chain
  const activeRMSFData = selectedChain === 'chainA' ? h85yRMSFChainA : h85yRMSFChainD;

  return (
    <div className="space-y-6">
      {/* Header Bento Box */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full text-rose-300 font-extrabold text-[11px] uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            Análise Comparativa de Dinâmica Molecular (200 ns)
          </div>

          <div className="text-xs font-mono text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-lg border border-indigo-800/50">
            Variante C7377T / H85Y vs Tipo Selvagem (Wild-Type)
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
          Efeito Conformacional e Termodinâmico da Mutação H85Y na Oncoproteína E6 do HPV-16
        </h2>

        <p className="text-slate-300 text-sm max-w-4xl leading-relaxed">
          Substituição da Histidina por Tirosina no resíduo 85 (C7377T) altera drasticamente a rede de contatos na interface
          de ligação com o supressor tumoral p53. Abaixo estão os gráficos extraídos das trajetórias de 200 ns de simulação
          no software Desmond / OPLS4 em ambiente aquoso explícito.
        </p>

        {/* Top Metric Cards Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Média RMSD (Wild-Type)</span>
            <span className="text-xl font-black text-emerald-400">7,24 Å</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Desvio Padrão: 1,00 Å</span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Média RMSD (H85Y)</span>
            <span className="text-xl font-black text-rose-400">5,73 Å</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Maior rigidez (-20,8% RMSD)</span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">ΔG Bind Wild-Type</span>
            <span className="text-xl font-black text-emerald-400">-104,71</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">kcal/mol (Alta Afinidade)</span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">ΔG Bind Mutante H85Y</span>
            <span className="text-xl font-black text-rose-400">-20,85</span>
            <span className="text-[10px] text-rose-300 font-bold block mt-0.5">Perda de -83,86 kcal/mol!</span>
          </div>
        </div>
      </div>

      {/* Interactive Tabs Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveTab('rmsd')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'rmsd'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          1. RMSD (Desvio Estrutural)
        </button>

        <button
          onClick={() => setActiveTab('rg')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'rg'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Maximize2 className="w-4 h-4" />
          2. Raio de Giração (Rg)
        </button>

        <button
          onClick={() => setActiveTab('sasa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'sasa'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          3. SASA (Área Superficial)
        </button>

        <button
          onClick={() => setActiveTab('rmsf')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'rmsf'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          4. RMSF (Flexibilidade)
        </button>

        <button
          onClick={() => setActiveTab('mmgbsa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'mmgbsa'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Zap className="w-4 h-4" />
          5. Decomposição MM/GBSA
        </button>

        <button
          onClick={() => setActiveTab('distribution')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'distribution'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <TrendingDown className="w-4 h-4" />
          6. Trajetória ΔG (200 ns)
        </button>

        <button
          onClick={() => setActiveTab('hbonds')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'hbonds'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          7. Matriz de Ligações H
        </button>
      </div>

      {/* TAB 1: RMSD (Root Mean Square Deviation) */}
      {activeTab === 'rmsd' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-indigo-600 text-[10px] font-extrabold uppercase tracking-widest">Estabilidade Estrutural</span>
              <h3 className="text-lg font-bold text-slate-900">
                Trajetória de RMSD (Root-Mean Square Deviation) - 0 a {timeRange} ns
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Mede o desvio médio dos átomos Cα em relação à estrutura inicial do docking.
              </p>
            </div>

            {/* Time Filter Controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Tempo:</span>
              {[50, 100, 150, 200].map((ns) => (
                <button
                  key={ns}
                  onClick={() => setTimeRange(ns)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    timeRange === ns ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {ns} ns
                </button>
              ))}
            </div>
          </div>

          <div className="h-[360px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredTrajectory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="timeNs" stroke="#64748b" unit=" ns" label={{ value: 'Tempo (ns)', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#64748b" domain={[0, 10]} unit=" Å" label={{ value: 'RMSD (Å)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '12px' }}
                  formatter={(val: any) => [`${val} Å`, '']}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="rmsdWT" name="Tipo Selvagem (Wild-Type)" stroke="#0284c7" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="rmsdMutant" name="Mutação H85Y (E6)" stroke="#e11d48" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="rmsdP53" name="Cadeia p53 (L3)" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Comportamento do Tipo Selvagem (WT)
              </span>
              <p>
                Atinge equilíbrio hidrodinâmico por volta de 40 ns com RMSD médio estabilizado em <strong>7,24 Å</strong>.
                Esta flexibilidade acomoda o encaixe ótimo das alças de p53 na fenda hidrofóbica de E6.
              </p>
            </div>

            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-rose-800">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> Comportamento da Mutação H85Y
              </span>
              <p>
                Apresenta menor RMSD médio (<strong>5,73 Å</strong>), indicando um enrijecimento conformacional precoce.
                Contudo, esse travamento rigidez impede a reorientação e encaixe plástico necessário para o binding forte com p53.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Raio de Giração (Rg) */}
      {activeTab === 'rg' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-indigo-600 text-[10px] font-extrabold uppercase tracking-widest">Compactação Macromolecular</span>
              <h3 className="text-lg font-bold text-slate-900">Raio de Giração (Rg) das Subunidades ao Longo do Tempo</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Mede a distribuição de massa em torno do centro de gravidade (indica expansão ou compactação).
              </p>
            </div>
          </div>

          <div className="h-[360px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredTrajectory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="timeNs" stroke="#64748b" unit=" ns" />
                <YAxis stroke="#64748b" domain={[15, 32]} unit=" Å" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '12px' }}
                  formatter={(val: any) => [`${val} Å`, '']}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="rgChain1" name="Subunidade E6 (2662 átomos)" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="rgChain2" name="Subunidade p53 (3098 átomos)" stroke="#06b6d4" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="rgComplex" name="Complexo E6-p53 Total (5760 átomos)" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600" /> Interpretação Biofísica do Raio de Giração (Rg)
            </div>
            <p className="leading-relaxed">
              O valor de Rg do complexo total manteve-se altamente estável em torno de <strong>28,6 Å</strong> durante os 200 ns de simulação,
              demonstrando que a proteína não sofreu desdobramento (unfolding) global após a mutação H85Y, mas sim um rearranjo dos contatos da interface.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: SASA (Solvent Accessible Surface Area) */}
      {activeTab === 'sasa' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-indigo-600 text-[10px] font-extrabold uppercase tracking-widest">Exposição ao Solvente Aquoso</span>
              <h3 className="text-lg font-bold text-slate-900">SASA (Solvent Accessible Surface Area em Å²)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Área de superfície da proteína em contato direto com as moléculas de água do solvente explícito.
              </p>
            </div>
          </div>

          <div className="h-[360px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredTrajectory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSasaComplex" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="timeNs" stroke="#64748b" unit=" ns" />
                <YAxis stroke="#64748b" domain={[10000, 30000]} unit=" Å²" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '12px' }}
                  formatter={(val: any) => [`${val.toLocaleString()} Å²`, 'SASA']}
                />
                <Legend verticalAlign="top" height={36} />
                <Area type="monotone" dataKey="sasaComplex" name="Complexo E6-p53 Total" stroke="#2563eb" fillOpacity={1} fill="url(#colorSasaComplex)" strokeWidth={2} />
                <Line type="monotone" dataKey="sasaChain1" name="Subunidade E6" stroke="#ec4899" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="sasaChain2" name="Subunidade p53" stroke="#10b981" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs text-indigo-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-indigo-900">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Alteração do Núcleo Hidrofóbico no Resíduo 85
            </span>
            <p>
              A troca da Histidina (polar/ionizável) pela Tirosina (anel aromático voluminoso e hidrofóbico) reduz a SASA local
              do resíduo 85, mas força a expulsão de moléculas de água da interface, prejudicando as redes de pontes de hidrogênio mediadas por água.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: RMSF (Flexibilidade Residuo por Residuo) */}
      {activeTab === 'rmsf' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-indigo-600 text-[10px] font-extrabold uppercase tracking-widest">Flexibilidade Local Atômica</span>
              <h3 className="text-lg font-bold text-slate-900">RMSF (Root-Mean Square Fluctuation) por Resíduo</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Flutuação atômica de cada aminoácido ao longo da trajetória de 200 ns.
              </p>
            </div>

            {/* Chain Selector Toggle */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setSelectedChain('chainA')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  selectedChain === 'chainA' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cadeia A: Oncoproteína E6 (158 resíduos)
              </button>
              <button
                onClick={() => setSelectedChain('chainD')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  selectedChain === 'chainD' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cadeia D: Proteína p53 (198 resíduos)
              </button>
            </div>
          </div>

          <div className="h-[360px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={activeRMSFData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="residue" stroke="#64748b" tick={{ fontSize: 10 }} interval={5} />
                <YAxis stroke="#64748b" domain={[0, 4]} unit=" Å" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '12px' }}
                  formatter={(val: any) => [`${val} Å`, 'RMSF']}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="wtRMSF" name="Tipo Selvagem (WT)" stroke="#0284c7" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="mutantRMSF" name="Mutação H85Y" stroke="#e11d48" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {selectedChain === 'chainA' && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-950 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-900 block mb-0.5">Pico de Flutuação Local no Resíduo H85Y (Posição 85)</span>
                <p>
                  No gráfico da Cadeia A (E6), observa-se um aumento acentuado no RMSF em torno da posição 85 na variante mutante H85Y (aproximadamente 2,4 Å vs 1,2 Å no selvagem),
                  refletindo a instabilidade da alça e desestabilização dos contatos com o domínio core de p53.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: Decomposição MM/GBSA */}
      {activeTab === 'mmgbsa' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-indigo-600 text-[10px] font-extrabold uppercase tracking-widest">Energia Livre de Ligação</span>
              <h3 className="text-lg font-bold text-slate-900">Decomposição Termodinâmica MM/GBSA (ΔG_bind)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comparação das contribuições energéticas individuais entre o Tipo Selvagem (-104,71 kcal/mol) e o Mutante H85Y (-20,85 kcal/mol).
              </p>
            </div>
          </div>

          <div className="h-[380px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={h85yEnergyTermComparison} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="component" stroke="#64748b" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748b" unit=" kcal/mol" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '12px' }}
                  formatter={(val: any) => [`${val} kcal/mol`, 'Energia']}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="wildType" name="Tipo Selvagem (WT)" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="mutantH85Y" name="Mutação H85Y" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Terms Grid Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Componente Energético</th>
                  <th className="p-3">Tipo Selvagem (WT)</th>
                  <th className="p-3">Mutação H85Y</th>
                  <th className="p-3 font-bold">Variação (ΔΔG)</th>
                  <th className="p-3">Descrição Mecanística</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {h85yEnergyTermComparison.map((term, idx) => {
                  const diff = term.mutantH85Y - term.wildType;
                  const isLoss = diff > 0 && term.component.includes('ΔG');
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-bold text-slate-900">{term.component}</td>
                      <td className="p-3 font-mono text-emerald-700 font-bold">{term.wildType} kcal/mol</td>
                      <td className="p-3 font-mono text-rose-700 font-bold">{term.mutantH85Y} kcal/mol</td>
                      <td className={`p-3 font-mono font-bold ${diff > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {diff > 0 ? `+${diff.toFixed(2)}` : diff.toFixed(2)} kcal/mol
                      </td>
                      <td className="p-3 text-slate-500">{term.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: Distribuição Histograma & Trajetória ΔG */}
      {activeTab === 'distribution' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-indigo-600 text-[10px] font-extrabold uppercase tracking-widest">Afinidade ao Longo da Trajetória</span>
              <h3 className="text-lg font-bold text-slate-900">Evolução do ΔG de Ligação ao Longo dos 200 ns</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Flutuação da energia livre de binding calculada em cada frame do ensaios de dinâmica molecular.
              </p>
            </div>
          </div>

          <div className="h-[360px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredTrajectory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="timeNs" stroke="#64748b" unit=" ns" />
                <YAxis stroke="#64748b" domain={[-130, 10]} unit=" kcal/mol" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#0f172a', borderRadius: '12px' }}
                  formatter={(val: any) => [`${val} kcal/mol`, 'ΔG Bind']}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="wtDG" name="Tipo Selvagem (-104,71 kcal/mol)" stroke="#10b981" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="mutDG" name="Mutante H85Y (-20,85 kcal/mol)" stroke="#f43f5e" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-rose-900">
              <TrendingUp className="w-4 h-4 text-rose-600" /> Perda Maciça de Afinidade Termodinâmica
            </span>
            <p>
              A diferença de energia livre (ΔΔG = +83,86 kcal/mol) comprova que a substituição C7377T / H85Y desestabiliza enfaticamente a interação direta entre a oncoproteína E6 e a p53, reduzindo a capacidade da variante viral de promover a degradação ubiquitina-dependente da p53 por esta via.
            </p>
          </div>
        </div>
      )}

      {/* TAB 7: Matriz de Ligações de Hidrogênio */}
      {activeTab === 'hbonds' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-indigo-600 text-[10px] font-extrabold uppercase tracking-widest">Remodelamento Atômico de Interface</span>
              <h3 className="text-lg font-bold text-slate-900">Rede de Pontes de Hidrogênio e Pontes Salinas</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Mapeamento das interações atômicas perdidas versus interações recém-formadas na variante H85Y.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lost Interactions */}
            <div className="p-5 bg-rose-50/70 rounded-2xl border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                Interações Perdidas na Variante Mutante H85Y (9 Pares)
              </div>
              <div className="space-y-2 text-xs">
                {hBondInteractions
                  .filter((h) => h.wildTypeState && !h.mutantState)
                  .map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-xl border border-rose-100 flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-800">{item.donorAcceptor}</span>
                      <span className="text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                        {item.type} (Perdida)
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Formed / Reorganized Interactions */}
            <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Novas Interações Formadas na Variante H85Y (5 Pares)
              </div>
              <div className="space-y-2 text-xs">
                {hBondInteractions
                  .filter((h) => h.mutantState)
                  .map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-xl border border-emerald-100 flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-800">{item.donorAcceptor}</span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {item.type} (Nova)
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
