import React, { useState, useEffect, useRef } from 'react';
import { Cpu, CheckCircle2, RotateCw, Layers, ShieldAlert, Sparkles, ZoomIn, Info } from 'lucide-react';
import { hBondInteractions, amazonMutations } from '../data/researchData';

export const MutationViewer: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<'wildType' | 'h85y' | 'simultaneous'>('wildType');
  const [highlightResidue, setHighlightResidue] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D canvas animation simulating E6-p53 protein complex rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    // Synthetic 3D node representation of E6 chain (A) and p53 chain (B)
    const generateNodes = () => {
      const nodes: { x: number; y: number; z: number; chain: 'E6' | 'p53'; label: string; isMutated?: boolean }[] = [];

      // E6 chain nodes
      const e6Residues = [
        { label: 'Arg17', mut: false },
        { label: 'Q21H', mut: selectedVariant !== 'wildType' },
        { label: 'Ser81', mut: false },
        { label: 'Arg84', mut: false },
        { label: 'H85Y', mut: selectedVariant === 'h85y' || selectedVariant === 'simultaneous' },
        { label: 'Cys87', mut: false },
        { label: 'Tyr88', mut: false },
        { label: 'L90V', mut: selectedVariant === 'simultaneous' },
        { label: 'Arg115', mut: false },
        { label: 'Arg136', mut: false },
        { label: 'Arg138', mut: false },
      ];

      e6Residues.forEach((r, idx) => {
        const phi = (idx / e6Residues.length) * Math.PI * 2;
        nodes.push({
          x: Math.sin(phi * 2) * 70,
          y: Math.cos(phi * 2) * 50 + (idx - 5) * 10,
          z: Math.cos(phi) * 60,
          chain: 'E6',
          label: r.label,
          isMutated: r.mut,
        });
      });

      // p53 chain nodes
      const p53Residues = [
        { label: 'Ser2' }, { label: 'Asp55' }, { label: 'Thr77' }, { label: 'Arg81' },
        { label: 'Glu87' }, { label: 'Glu105' }, { label: 'Asp114' }, { label: 'Glu128' },
        { label: 'Glu131' }, { label: 'Asn134' }, { label: 'Asp135' }, { label: 'Cys136' },
      ];

      p53Residues.forEach((r, idx) => {
        const phi = (idx / p53Residues.length) * Math.PI * 2;
        nodes.push({
          x: Math.cos(phi * 1.5) * 60 + 80,
          y: Math.sin(phi * 1.5) * 60 + (idx - 6) * 8,
          z: Math.sin(phi) * 50,
          chain: 'p53',
          label: r.label,
        });
      });

      return nodes;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (isRotating) {
        angle += 0.012;
      }

      const nodes = generateNodes();

      // Transform nodes with 3D rotation
      const projected = nodes.map((node) => {
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const xRot = node.x * cosA - node.z * sinA;
        const zRot = node.x * sinA + node.z * cosA;

        const scale = (zRot + 250) / 250 * zoomLevel;
        const px = centerX + xRot * scale;
        const py = centerY + node.y * scale;

        return { ...node, px, py, scale, zRot };
      });

      // Sort by depth for correct 3D rendering order
      projected.sort((a, b) => a.zRot - b.zRot);

      // Draw backbone connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const n1 = projected[i];
          const n2 = projected[j];

          const dx = n1.px - n2.px;
          const dy = n1.py - n2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect same chain
          if (n1.chain === n2.chain && dist < 65) {
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            ctx.strokeStyle = n1.chain === 'E6' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(99, 102, 241, 0.4)';
            ctx.lineWidth = 1.8 * n1.scale;
            ctx.stroke();
          }

          // Inter-chain Hydrogen Bonds or Salt Bridges (E6 - p53)
          if (n1.chain !== n2.chain && dist < 85) {
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            ctx.setLineDash([4, 4]);

            if (selectedVariant === 'wildType') {
              ctx.strokeStyle = '#38bdf8'; // Strong blue H-bonds
              ctx.lineWidth = 2 * n1.scale;
            } else if (n1.label === 'Arg138' || n2.label === 'Arg138') {
              ctx.strokeStyle = '#f43f5e'; // Red Salt bridge
              ctx.lineWidth = 2.5 * n1.scale;
            } else {
              ctx.strokeStyle = 'rgba(251, 146, 60, 0.8)'; // Weaker orange
              ctx.lineWidth = 1.2 * n1.scale;
            }

            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // Draw residue spheres
      projected.forEach((n) => {
        ctx.beginPath();
        const radius = (n.isMutated ? 8 : 5.5) * n.scale;
        ctx.arc(n.px, n.py, radius, 0, Math.PI * 2);

        if (highlightResidue === n.label) {
          ctx.fillStyle = '#f59e0b'; // Amber highlight
        } else if (n.isMutated) {
          ctx.fillStyle = '#ef4444'; // Red for mutation
        } else if (n.chain === 'E6') {
          ctx.fillStyle = '#10b981'; // Emerald for E6
        } else {
          ctx.fillStyle = '#6366f1'; // Indigo for p53
        }

        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Residue Label
        ctx.fillStyle = '#f8fafc';
        ctx.font = `${Math.max(9, Math.round(10 * n.scale))}px monospace`;
        ctx.fillText(n.label, n.px + radius + 2, n.py + 3);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedVariant, isRotating, zoomLevel, highlightResidue]);

  return (
    <div className="space-y-6">
      {/* Intro Header Bento Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-[10px] uppercase tracking-widest">
          <Cpu className="w-4 h-4 text-emerald-600" />
          Modelagem Preditiva por Inteligência Artificial
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
          Modelagem Estrutural Tridimensional (AlphaFold3 & MolProbity)
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          As estruturas tridimensionais das oncoproteínas virais E6 e E7 foram preditas via servidor AlphaFold3
          utilizando o algoritmo de aprendizado profundo (deep learning), tanto para a forma selvagem (wild-type NCBI NC_001526)
          quanto incorporando as variantes missense locais do Amazonas e mundiais (T6P, R17I, L19V, I80L, Q21H, H85Y, L90V).
        </p>
      </div>

      {/* Interactive 3D Viewer + Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Canvas Render Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                Visualizador de Complexo 3D: E6 (Verde) / p53 (Azul)
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`p-1.5 rounded-lg border transition flex items-center gap-1 font-semibold ${
                  isRotating
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
                title="Pausar/Ativar Rotação"
              >
                <RotateCw className="w-3.5 h-3.5" />
                {isRotating ? 'Giro Ativo' : 'Pausado'}
              </button>

              <button
                onClick={() => setZoomLevel((z) => (z >= 1.4 ? 0.8 : z + 0.2))}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-700 transition font-semibold flex items-center gap-1"
                title="Ajustar Zoom"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                {(zoomLevel * 100).toFixed(0)}%
              </button>
            </div>
          </div>

          {/* Variant Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
            <button
              onClick={() => setSelectedVariant('wildType')}
              className={`py-2 px-3 rounded-lg transition text-center uppercase tracking-wider text-[10px] ${
                selectedVariant === 'wildType'
                  ? 'bg-emerald-700 text-white font-black shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              Forma Selvagem (10 Pontes H)
            </button>
            <button
              onClick={() => setSelectedVariant('h85y')}
              className={`py-2 px-3 rounded-lg transition text-center uppercase tracking-wider text-[10px] ${
                selectedVariant === 'h85y'
                  ? 'bg-amber-600 text-white font-black shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              Mutante Isolada H85Y
            </button>
            <button
              onClick={() => setSelectedVariant('simultaneous')}
              className={`py-2 px-3 rounded-lg transition text-center uppercase tracking-wider text-[10px] ${
                selectedVariant === 'simultaneous'
                  ? 'bg-rose-600 text-white font-black shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              Mutações Simultâneas
            </button>
          </div>

          {/* Canvas Box */}
          <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center min-h-[360px]">
            <canvas ref={canvasRef} width={560} height={360} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Legend Overlay */}
            <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 p-2.5 rounded-lg text-[11px] space-y-1 backdrop-blur-sm shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-200 font-medium">Cadeia A: Oncoproteína E6</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                <span className="text-slate-200 font-medium">Cadeia B: Proteína Supressora p53</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="text-slate-200 font-medium">Aminoácidos Mutados (Vermelho)</span>
              </div>
              <div className="flex items-center gap-2 border-t border-slate-800 pt-1 mt-1">
                <span className="w-3 border-t-2 border-dashed border-sky-400"></span>
                <span className="text-slate-200 font-medium">Ligações Hidrogênio / Ponte Salina</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 italic flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            Passe o mouse na tabela abaixo para destacar os resíduos envolvidos na simulação 3D.
          </div>
        </div>

        {/* Structural Findings & Validation Column */}
        <div className="lg:col-span-5 space-y-4">
          {/* Bento Dark Parameter Summary Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-4 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest">Análise Biofísica</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>

            {selectedVariant === 'wildType' && (
              <div className="space-y-3">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-xl text-xs space-y-1 text-emerald-300">
                  <div className="font-bold text-sm text-emerald-200">Estado Selvagem (Não Mutado)</div>
                  <div>Estabilizado por <strong>10 Ligações de Hidrogênio</strong> e <strong>0 Pontes Salinas</strong>.</div>
                  <div>Energia Livre MM-GBSA (Docking): <strong>-51,91 kcal/mol</strong>.</div>
                  <div>Energia Livre Pós-MD (200 ns): <strong>-104,71 kcal/mol</strong>.</div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A forma selvagem da E6 interage fortemente com a p53, facilitando o recrutamento do complexo E6AP
                  e a consequente inativação/degradação proteassomal da p53.
                </p>
              </div>
            )}

            {selectedVariant === 'h85y' && (
              <div className="space-y-3">
                <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl text-xs space-y-1 text-amber-300">
                  <div className="font-bold text-sm text-amber-200">Variante Isolada H85Y (Histidina → Tirosina 85)</div>
                  <div>Apenas <strong>4 Ligações de Hidrogênio</strong> e <strong>1 Ponte Salina (Arg138→Glu87)</strong>.</div>
                  <div>Energia Livre Pós-MD (200 ns): <strong>-20,85 kcal/mol</strong>.</div>
                  <div>RMSD Médio: <strong>5,73 Å</strong> (SD: 0,937 Å).</div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A substituição da histidina por tirosina cria impedimento estérico e altera a distribuição de cargas,
                  reduzindo drasticamente a afinidade de ligação com p53 (p &lt; 2.2 × 10⁻¹⁶).
                </p>
              </div>
            )}

            {selectedVariant === 'simultaneous' && (
              <div className="space-y-3">
                <div className="bg-rose-500/10 border border-rose-500/30 p-3.5 rounded-xl text-xs space-y-1 text-rose-300">
                  <div className="font-bold text-sm text-rose-200">Mutações Simultâneas do Amazonas</div>
                  <div>Redução para <strong>5 Ligações de Hidrogênio</strong> e <strong>1 Ponte Salina (Arg138→Glu87)</strong>.</div>
                  <div>Energia Livre MM-GBSA (Docking): <strong>-39,10 kcal/mol</strong>.</div>
                  <div>Aplicações em conjunto: T6P, R17I, L19V, I80L, Q21H, H85Y, L90V.</div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Demonstra drástica perda de contatos moleculares em comparação com a forma selvagem, resultando em uma
                  interface de contato fragilizada.
                </p>
              </div>
            )}
          </div>

          {/* Validation Quality Metrics Bento Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Validação Geométrica & Estereoquímica
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-slate-600 font-medium">Validação Interna (AlphaFold)</span>
                <span className="font-mono text-emerald-700 font-bold">pLDDT &gt; 85 (Alta)</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-slate-600 font-medium">Validação Externa (MolProbity)</span>
                <span className="font-mono text-indigo-700 font-bold">Ramachandran &gt; 96%</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-slate-600 font-medium">Controle de Referência</span>
                <span className="font-mono text-amber-800 font-bold">PDB ID: 4XR8</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Intermolecular Contacts Breakdown Table Bento Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-emerald-700 text-[10px] font-extrabold uppercase tracking-widest">Relatório Técnico</span>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700" />
              Mapeamento de Ligações de Hidrogênio e Pontes Salinas (Tabela 1)
            </h3>
            <p className="text-xs text-slate-500">
              Comparação detalhada das interações intermoleculares do complexo E6-p53 entre as formas selvagem e mutantes
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-700 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Interação (Doador → Aceito)</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4 text-center">Forma Selvagem</th>
                <th className="py-3 px-4 text-center">Forma Mutante (H85Y/Simultânea)</th>
                <th className="py-3 px-4">Observações Biofísicas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hBondInteractions.map((item, idx) => (
                <tr
                  key={idx}
                  onMouseEnter={() => setHighlightResidue(item.donorAcceptor.split(' ')[0])}
                  onMouseLeave={() => setHighlightResidue(null)}
                  className="hover:bg-slate-50 transition cursor-pointer"
                >
                  <td className="py-3 px-4 font-extrabold text-slate-900 font-mono">{item.donorAcceptor}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        item.type === 'SaltBridge'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-sky-100 text-sky-800 border border-sky-200'
                      }`}
                    >
                      {item.type === 'SaltBridge' ? 'Ponte Salina' : 'Liaç. Hidrogênio'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.wildTypeState ? (
                      <span className="text-emerald-700 font-bold text-sm">✓ Presente</span>
                    ) : (
                      <span className="text-slate-400 font-mono">---</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.mutantState ? (
                      <span className="text-rose-600 font-bold text-sm">✓ Presente</span>
                    ) : (
                      <span className="text-slate-400 font-mono">---</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
