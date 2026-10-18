import React, { useState } from 'react';
import { ShieldCheck, Dna, Download, Copy, Check, Filter, Sparkles, Database } from 'lucide-react';
import { tCellEpitopes, bCellEpitopes, diagnosticPrimers } from '../data/researchData';

export const ImmunoinformaticsExplorer: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [filterTier, setFilterTier] = useState<string>('todos');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleExportFASTA = () => {
    let fasta = '; Epítopos e Primers Preditos - Projeto PIBITI UFAM (PIB-S/0053/2025)\n';
    tCellEpitopes.forEach((e) => {
      fasta += `>T_Cell_${e.epitope}_${e.hlaAllele}_Score_${e.score}\n${e.epitope}\n`;
    });
    bCellEpitopes.forEach((e, idx) => {
      fasta += `>B_Cell_Epitope_${idx + 1}_BePiPred3_${e.score}\n${e.epitope}\n`;
    });
    diagnosticPrimers.forEach((p) => {
      fasta += `>${p.name}_${p.type}\n${p.sequence}\n`;
    });

    const blob = new Blob([fasta], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'HPV16_Epitopos_Primers_UFAM.fasta';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredTCell = tCellEpitopes.filter((item) => {
    if (filterTier === 'alta') return item.prevalenceTier === 'Alta';
    if (filterTier === 'moderada') return item.prevalenceTier === 'Moderada';
    if (filterTier === 'baixa') return item.prevalenceTier === 'Baixa';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Overview Header Bento Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-[10px] uppercase tracking-widest">
              <Dna className="w-4 h-4 text-emerald-600" />
              Imunoinformática & Design de Diagnósticos Rápidos
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              Predição de Epítopos Antigênicos (IEDB / BePiPred 3) e Frequência HLA no Brasil
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              Alinhamento de 702 sequências de HPV-16 do GenBank via Geneious para predição de epítopos de linfócitos T
              (NetMHCpan 4) e B (BePiPred 3) priorizando alelos HLA mais frequentes na população brasileira (banco REDOME com &gt;3M doadores).
            </p>
          </div>

          <button
            onClick={handleExportFASTA}
            className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center gap-2 shrink-0 shadow-sm uppercase tracking-wider text-[11px]"
          >
            <Download className="w-4 h-4" />
            Exportar FASTA
          </button>
        </div>
      </div>

      {/* T-Cell Epitopes Table Bento Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-emerald-700 text-[10px] font-extrabold uppercase tracking-widest">Epítopos T</span>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Epítopos Preditos para Linfócitos T e Frequência Populacional Brasileira
            </h3>
            <p className="text-xs text-slate-500">
              Ordenados por probabilidade NETMHCpan 4 e cruzados com o banco do INCA/REDOME
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => setFilterTier('todos')}
              className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                filterTier === 'todos'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos ({tCellEpitopes.length})
            </button>
            <button
              onClick={() => setFilterTier('alta')}
              className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                filterTier === 'alta'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Alta Freq (25.9%)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-700 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Epítopo Predito</th>
                <th className="py-3 px-4">Alelo Humano MHC-I</th>
                <th className="py-3 px-4 text-center">Score (NETMHCpan 4)</th>
                <th className="py-3 px-4 text-center">Frequência Brasil (REDOME)</th>
                <th className="py-3 px-4 text-center">Docking MM-GBSA (HLA-A*02:01)</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTCell.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-black text-emerald-800 font-mono text-sm">{item.epitope}</td>
                  <td className="py-3 px-4 font-mono text-slate-700 font-semibold">{item.hlaAllele}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">{item.score}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-lg font-mono font-bold ${
                        item.prevalenceTier === 'Alta'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : item.prevalenceTier === 'Moderada'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {item.brazilianFrequency.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-indigo-700">
                    {item.dockingAffinityMMGBSA ? `${item.dockingAffinityMMGBSA} kcal/mol` : '---'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleCopy(item.epitope)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg transition"
                      title="Copiar Sequência"
                    >
                      {copiedText === item.epitope ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* B-Cell Epitopes & Diagnostic Primers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* B-Cell Epitopes Bento Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-indigo-700 text-[10px] font-extrabold uppercase tracking-widest">Resposta Humoral</span>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              Epítopos de Linfócitos B (BePiPred 3)
            </h3>
            <p className="text-xs text-slate-500">Predição de epítopos lineares para anticorpos neutralizantes</p>
          </div>

          <div className="space-y-3">
            {bCellEpitopes.map((b, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="space-y-1">
                  <div className="font-mono font-black text-indigo-800 text-sm">{b.epitope}</div>
                  <div className="text-slate-600">
                    Tamanho: <strong>{b.length} aa</strong> | Docking TLR4:{' '}
                    <strong className="text-emerald-700 font-mono">{b.tlr4Affinity}</strong>
                  </div>
                </div>
                <span className="bg-indigo-100 text-indigo-800 border border-indigo-200 px-2.5 py-1 rounded-lg font-mono font-bold">
                  Score: {b.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Primers Bento Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-amber-800 text-[10px] font-extrabold uppercase tracking-widest">Diagnóstico</span>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Sequências de Primers & Peptídeos Diagnósticos
            </h3>
            <p className="text-xs text-slate-500">Desenhados no Primer3 / Geneious para síntese e testes de campo</p>
          </div>

          <div className="space-y-3">
            {diagnosticPrimers.map((p, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{p.name}</span>
                  <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold">
                    {p.type} ({p.length} nt/aa)
                  </span>
                </div>
                <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-mono text-emerald-400 text-xs font-bold tracking-wider">{p.sequence}</span>
                  <button
                    onClick={() => handleCopy(p.sequence)}
                    className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition"
                  >
                    {copiedText === p.sequence ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-600">{p.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
