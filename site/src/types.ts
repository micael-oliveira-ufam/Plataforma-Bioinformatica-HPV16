export interface ProjectInfo {
  code: string;
  edition: string;
  title: string;
  student: string;
  studentRole: string;
  advisor: string;
  institution: string;
  department: string;
  grant: string;
  area: string;
  keywords: string[];
}

export interface MutationData {
  gene: 'E6' | 'E7' | 'PIK3CA';
  code: string;
  type: string;
  frequencyAmazonas: string;
  aminoacidChange: string;
  description: string;
  impactOnBinding: string;
}

export interface HBondInteraction {
  donorAcceptor: string;
  type: 'HBond' | 'SaltBridge';
  wildTypeState: boolean;
  mutantState: boolean;
  notes?: string;
}

export interface RMSDPoint {
  timeNs: number;
  wildTypeRMSD: number;
  mutantRMSD: number;
}

export interface DrugDocking {
  name: string;
  wildTypeAffinity: number; // kcal/mol
  mutantAffinity: number;   // kcal/mol
  delta: number;
  hbondsWildType: number;
  hbondsMutant: number;
  clinicalRelevance: string;
}

export interface TCellEpitope {
  epitope: string;
  hlaAllele: string;
  score: number;
  brazilianFrequency: number; // percentage
  prevalenceTier: 'Alta' | 'Moderada' | 'Baixa';
  dockingAffinityMMGBSA?: number; // kcal/mol
}

export interface BCellEpitope {
  epitope: string;
  score: number;
  length: number;
  tlr4Affinity?: string; // kcal/mol range
}

export interface DiagnosticPrimer {
  name: string;
  targetGene: string;
  sequence: string;
  type: 'Forward' | 'Reverse' | 'Probe' | 'Peptide';
  length: number;
  notes: string;
}
