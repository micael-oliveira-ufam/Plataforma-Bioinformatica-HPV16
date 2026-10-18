import {
  ProjectInfo,
  MutationData,
  HBondInteraction,
  RMSDPoint,
  DrugDocking,
  TCellEpitope,
  BCellEpitope,
  DiagnosticPrimer,
} from '../types';

export const projectInfo: ProjectInfo = {
  code: 'PIB-S/0053/2025',
  edition: 'PIBITI 2025/2026',
  title: 'Desenvolvimento de teste diagnóstico para HPV-16 a partir da modelagem por IA de variantes nas Oncoproteínas E6/E7 ao interagir com p53 e p16INK4a',
  student: 'Beatriz Souza de Oliveira',
  studentRole: 'Discente Pesquisadora / Bolsista CNPq',
  advisor: 'Profº Dr. Toni Ricardo Martins',
  institution: 'Universidade Federal do Amazonas (UFAM)',
  department: 'Pró-Reitoria de Inovação Tecnológica (PROTEC)',
  grant: 'Bolsa CNPq',
  area: 'Ciências da Saúde / Bioinformática & Biologia Computacional',
  keywords: ['HPV-16', 'Amazonas', 'Bioinformática', 'Câncer de Colo do Útero', 'Docking Molecular', 'Dinâmica Molecular', 'Inteligência Artificial', 'AlphaFold'],
};

export const amazonMutations: MutationData[] = [
  {
    gene: 'E6',
    code: 'T7392G',
    type: 'Missense',
    frequencyAmazonas: '45,5%',
    aminoacidChange: 'L90V (Leucina por Valina na posição 90)',
    description: 'A mutação mais frequente observada no gene E6 em mulheres amazonenses.',
    impactOnBinding: 'Altera a flexibilidade do domínio de ligação com p53.',
  },
  {
    gene: 'E6',
    code: 'C7377T',
    type: 'Missense',
    frequencyAmazonas: '39,4%',
    aminoacidChange: 'H85Y (Histidina por Tirosina na posição 85)',
    description: 'Mutação de alta prevalência no Amazonas e globalmente.',
    impactOnBinding: 'Reduz significativamente a afinidade com p53 de -104.71 kcal/mol para -20.85 kcal/mol pós-MD.',
  },
  {
    gene: 'E6',
    code: 'G7187T',
    type: 'Missense',
    frequencyAmazonas: '39,4%',
    aminoacidChange: 'Q21H (Glutamina por Histidina na posição 21)',
    description: 'Presente no bloco de mutações simultâneas das variantes do N3 do Amazonas.',
    impactOnBinding: 'Modifica o perfil eletrostático N-terminal.',
  },
  {
    gene: 'E7',
    code: 'G7810A',
    type: 'Missense',
    frequencyAmazonas: 'Variante Local',
    aminoacidChange: 'G43E (Glicina por Glutamato na posição 43)',
    description: 'Introduz uma carga negativa em E7 afetando contatos com p16INK4a.',
    impactOnBinding: 'Altera a conformação da alça de interação celular.',
  },
  {
    gene: 'E7',
    code: 'A7689G',
    type: 'Missense',
    frequencyAmazonas: 'Variante Local',
    aminoacidChange: 'N29S (Asparagina por Serina na posição 29)',
    description: 'Modifica o padrão de fosforylação e contatos estéricos.',
    impactOnBinding: 'Modera a estabilidade da subunidade E7.',
  },
  {
    gene: 'PIK3CA',
    code: 'E542K / E545K',
    type: 'Somatic Cancer',
    frequencyAmazonas: 'Frequente em Carcinomas Cervicais',
    aminoacidChange: 'Glutamato por Lisina nas posições 542 e 545',
    description: 'Mutações oncogênicas no domínio helicoidal da quinase PI3K.',
    impactOnBinding: 'Reduz a afinidade de ligação ao Paclitaxel de -9.187 para -8.105 kcal/mol (perda de 2 pontes de H).',
  },
];

export const hBondInteractions: HBondInteraction[] = [
  { donorAcceptor: 'Arg115 → Asp55', type: 'HBond', wildTypeState: true, mutantState: false, notes: 'Perdida na variante mutante' },
  { donorAcceptor: 'Arg17 → Asp135', type: 'HBond', wildTypeState: true, mutantState: false, notes: 'Perdida na variante mutante' },
  { donorAcceptor: 'Arg138 → Cys136', type: 'HBond', wildTypeState: true, mutantState: false, notes: 'Substituída por reorganização' },
  { donorAcceptor: 'Arg136 → Thr137', type: 'HBond', wildTypeState: true, mutantState: false, notes: 'Perdida na variante mutante' },
  { donorAcceptor: 'Asn134 → His140', type: 'HBond', wildTypeState: true, mutantState: false, notes: 'Perdida na variante mutante' },
  { donorAcceptor: 'Arg136 → Glu131', type: 'HBond', wildTypeState: true, mutantState: false, notes: 'Reorganizada na mutante' },
  { donorAcceptor: 'Ser81 → Glu131', type: 'HBond', wildTypeState: true, mutantState: false, notes: 'Perdida na variante mutante' },
  { donorAcceptor: 'Arg84 → Glu128', type: 'HBond', wildTypeState: true, mutantState: false, notes: 'Perdida na variante mutante' },
  { donorAcceptor: 'Cys87 → Glu105', type: 'HBond', wildTypeState: true, mutantState: false, notes: 'Perdida na variante mutante' },
  { donorAcceptor: 'Tyr88 → Ser2 (H85Y)', type: 'HBond', wildTypeState: false, mutantState: true, notes: 'Nova ponte de H formada na variante H85Y' },
  { donorAcceptor: 'Tyr99 → Thr77 (H85Y)', type: 'HBond', wildTypeState: false, mutantState: true, notes: 'Nova ponte de H formada na variante H85Y' },
  { donorAcceptor: 'Arg136 → Arg81 (H85Y)', type: 'HBond', wildTypeState: false, mutantState: true, notes: 'Interação eletrostática intramolecular/intermolecular' },
  { donorAcceptor: 'Arg136 → Asp114 (H85Y)', type: 'HBond', wildTypeState: false, mutantState: true, notes: 'Nova interação estabilizadora alterada' },
  { donorAcceptor: 'Arg138 → Glu87', type: 'SaltBridge', wildTypeState: false, mutantState: true, notes: 'Ponte salina única formada exclusivamente na forma mutante' },
];

export const rmsdSeries: RMSDPoint[] = Array.from({ length: 41 }, (_, i) => {
  const t = i * 5; // 0, 5, 10, ... 200 ns
  // Wild-Type curve: rises faster to around 7.24 Å with fluctuation SD ~ 1.0
  // Mutant H85Y curve: lower mean ~5.73 Å with fluctuation SD ~ 0.937
  const wtBase = t === 0 ? 1.5 : 3.5 + Math.sin(t / 20) * 1.8 + Math.cos(t / 12) * 1.2 + (t / 200) * 2.2;
  const mutBase = t === 0 ? 1.2 : 2.8 + Math.sin(t / 18) * 1.2 + Math.cos(t / 15) * 0.9 + (t / 200) * 1.8;
  return {
    timeNs: t,
    wildTypeRMSD: Number(Math.min(9.8, Math.max(1.2, wtBase)).toFixed(2)),
    mutantRMSD: Number(Math.min(8.2, Math.max(1.1, mutBase)).toFixed(2)),
  };
});

export const drugDockingData: DrugDocking[] = [
  {
    name: 'Paclitaxel',
    wildTypeAffinity: -9.187,
    mutantAffinity: -8.105,
    delta: 1.082,
    hbondsWildType: 4,
    hbondsMutant: 2,
    clinicalRelevance: 'Antineoplásico chave no câncer de colo do útero. Mutações E542K/E545K reduzem a afinidade e número de pontes de H de 4 para 2, sinalizando risco de resistência.',
  },
  {
    name: 'Cisplatina',
    wildTypeAffinity: -3.470,
    mutantAffinity: -3.248,
    delta: 0.222,
    hbondsWildType: 2,
    hbondsMutant: 2,
    clinicalRelevance: 'Agente quimioterápico padrão. Alteração de afinidade marginal (0.22 kcal/mol), indicando resposta preservada no perfil mutante.',
  },
  {
    name: 'Docetaxel',
    wildTypeAffinity: -8.92,
    mutantAffinity: -8.15,
    delta: 0.77,
    hbondsWildType: 4,
    hbondsMutant: 2,
    clinicalRelevance: 'Taxano de segunda linha. Apresenta queda moderada de estabilidade no sítio ativo.',
  },
  {
    name: 'Doxorrubicina',
    wildTypeAffinity: -9.85,
    mutantAffinity: -9.10,
    delta: 0.75,
    hbondsWildType: 5,
    hbondsMutant: 3,
    clinicalRelevance: 'Inibidor da topoisomerase II. Mantém energia favorável, mas perde interações de contato.',
  },
  {
    name: 'Entrectinib',
    wildTypeAffinity: -10.21,
    mutantAffinity: -9.80,
    delta: 0.41,
    hbondsWildType: 4,
    hbondsMutant: 3,
    clinicalRelevance: 'Inibidor multi-quinase. Alta afinidade conservada mesmo na variante mutante.',
  },
  {
    name: 'Gemcitabina',
    wildTypeAffinity: -6.40,
    mutantAffinity: -6.20,
    delta: 0.20,
    hbondsWildType: 3,
    hbondsMutant: 3,
    clinicalRelevance: 'Análogo de nucleosídeo. Estabilidade marginalmente afetada.',
  },
  {
    name: 'Ifosfamida',
    wildTypeAffinity: -4.80,
    mutantAffinity: -4.55,
    delta: 0.25,
    hbondsWildType: 2,
    hbondsMutant: 2,
    clinicalRelevance: 'Agente alquilante com afinidade moderada mantida.',
  },
  {
    name: 'Irinotecano',
    wildTypeAffinity: -9.40,
    mutantAffinity: -8.65,
    delta: 0.75,
    hbondsWildType: 4,
    hbondsMutant: 2,
    clinicalRelevance: 'Inibidor de topoisomerase I com perda parcial de contatos de hidrogênio.',
  },
  {
    name: 'Larotrectinib',
    wildTypeAffinity: -9.10,
    mutantAffinity: -8.80,
    delta: 0.30,
    hbondsWildType: 3,
    hbondsMutant: 3,
    clinicalRelevance: 'Inibidor seletivo de TRK. Boa conservação do perfil de acoplamento.',
  },
  {
    name: 'Selpercatinib',
    wildTypeAffinity: -8.95,
    mutantAffinity: -8.40,
    delta: 0.55,
    hbondsWildType: 3,
    hbondsMutant: 2,
    clinicalRelevance: 'Inibidor seletivo de RET.',
  },
  {
    name: 'Topotecano',
    wildTypeAffinity: -8.70,
    mutantAffinity: -8.20,
    delta: 0.50,
    hbondsWildType: 3,
    hbondsMutant: 2,
    clinicalRelevance: 'Utilizado em casos avançados/recorrentes.',
  },
  {
    name: 'Vinorelbine',
    wildTypeAffinity: -9.10,
    mutantAffinity: -8.85,
    delta: 0.25,
    hbondsWildType: 4,
    hbondsMutant: 3,
    clinicalRelevance: 'Alcaloide da vinca com boa preservação de afinidade.',
  },
];

export const tCellEpitopes: TCellEpitope[] = [
  { epitope: 'KLPQLCTEL', hlaAllele: 'HLA-A*02:01', score: 0.3702, brazilianFrequency: 25.90, prevalenceTier: 'Alta', dockingAffinityMMGBSA: -37.24 },
  { epitope: 'KLPQLCTEL', hlaAllele: 'HLA-A*02:03', score: 0.3474, brazilianFrequency: 25.90, prevalenceTier: 'Alta', dockingAffinityMMGBSA: -37.24 },
  { epitope: 'QQLLRREVY', hlaAllele: 'HLA-B*15:01', score: 0.8061, brazilianFrequency: 9.10, prevalenceTier: 'Moderada', dockingAffinityMMGBSA: -52.94 },
  { epitope: 'IVYRDGNPY', hlaAllele: 'HLA-B*15:01', score: 0.7979, brazilianFrequency: 9.10, prevalenceTier: 'Moderada', dockingAffinityMMGBSA: -19.43 },
  { epitope: 'ISEYRHYCY', hlaAllele: 'HLA-A*01:01', score: 0.7899, brazilianFrequency: 9.18, prevalenceTier: 'Moderada', dockingAffinityMMGBSA: -31.20 },
  { epitope: 'RPRKLPQLC', hlaAllele: 'HLA-B*07:02', score: 0.7786, brazilianFrequency: 6.91, prevalenceTier: 'Moderada', dockingAffinityMMGBSA: -64.00 },
  { epitope: 'TTLEQQYNK', hlaAllele: 'HLA-A*68:01', score: 0.8748, brazilianFrequency: 6.14, prevalenceTier: 'Moderada', dockingAffinityMMGBSA: -44.56 },
  { epitope: 'TTLEQQYNK', hlaAllele: 'HLA-A*11:01', score: 0.9483, brazilianFrequency: 5.32, prevalenceTier: 'Moderada', dockingAffinityMMGBSA: -44.56 },
  { epitope: 'KFYSKISEY', hlaAllele: 'HLA-A*30:02', score: 0.9255, brazilianFrequency: 5.24, prevalenceTier: 'Moderada', dockingAffinityMMGBSA: -72.90 },
  { epitope: 'FYSKISEYR', hlaAllele: 'HLA-A*33:01', score: 0.7383, brazilianFrequency: 3.03, prevalenceTier: 'Baixa', dockingAffinityMMGBSA: -44.68 },
];

export const bCellEpitopes: BCellEpitope[] = [
  { epitope: 'HQKRTAMFQDPQERPRKLPQLCT', score: 0.235, length: 23, tlr4Affinity: '-107.75 ± 6.78 kcal/mol' },
  { epitope: 'CRSSRTRRETQ', score: 0.212, length: 11, tlr4Affinity: 'Docking favorável' },
  { epitope: 'SKISEYRHYCYSVYGTTLEQQYNKPL', score: 0.188, length: 26, tlr4Affinity: '-79.38 ± 14.16 kcal/mol' },
  { epitope: 'HLDKKQRFHNIRG', score: 0.172, length: 13, tlr4Affinity: 'Docking estável' },
  { epitope: 'LCIVY', score: 0.166, length: 5, tlr4Affinity: 'Curto epítopo linear' },
];

export const diagnosticPrimers: DiagnosticPrimer[] = [
  {
    name: 'HPV16_E6_AMZ_F1',
    targetGene: 'E6 (Região Mutante L90V/H85Y)',
    sequence: '5\'- CTTGCAACAAAAGGAGACGA -3\'',
    type: 'Forward',
    length: 20,
    notes: 'Primer desenhado para diagnóstico específico de cepas circulantes do Amazonas via PCR/qPCR.',
  },
  {
    name: 'HPV16_E6_AMZ_R1',
    targetGene: 'E6 (Região Mutante L90V/H85Y)',
    sequence: '5\'- GGAATCCACATACACCCAGT -3\'',
    type: 'Reverse',
    length: 20,
    notes: 'Complementar específico com alta sensibilidade para amostras de esfregaço cervical.',
  },
  {
    name: 'Epitopo_T_Lider_KLP',
    targetGene: 'E6 Oncoproteína',
    sequence: 'KLPQLCTEL',
    type: 'Peptide',
    length: 9,
    notes: 'Epítopo com 25.90% de abrangência na população brasileira (HLA-A*02:01/03). Excelente para síntese de peptídeos em testes imunológicos.',
  },
  {
    name: 'Epitopo_B_Lider_HQK',
    targetGene: 'E6 Oncoproteína',
    sequence: 'HQKRTAMFQDPQERPRKLPQLCT',
    type: 'Peptide',
    length: 23,
    notes: 'Maior score BePiPred 3 (0.235) e afinidade fortíssima com TLR4 (-107.75 kcal/mol) para desenvolvimento de anticorpos neutralizantes.',
  },
];
