export interface TrajectoryPoint {
  timeNs: number;
  rmsdWT: number;
  rmsdMutant: number;
  rmsdP53: number;
  rgChain1: number;
  rgChain2: number;
  rgComplex: number;
  sasaComplex: number;
  sasaChain1: number;
  sasaChain2: number;
  wtDG: number;
  mutDG: number;
}

export interface RMSFPoint {
  residue: number;
  wtRMSF: number;
  mutantRMSF: number;
}

export interface MMGBSADecomp {
  frame: number;
  dGBind: number;
  coulomb: number;
  covalent: number;
  hbond: number;
  lipo: number;
  packing: number;
  selfCont: number;
  solvGB: number;
  vdW: number;
}

export interface EnergyTermComparison {
  component: string;
  wildType: number;
  mutantH85Y: number;
  description: string;
}

// 1. Trajectory Data (0 - 200 ns)
export const h85yTrajectory200ns: TrajectoryPoint[] = Array.from({ length: 101 }, (_, i) => {
  const timeNs = i * 2;
  // Realistic simulation curves with fluctuations
  const tNorm = timeNs / 200;
  
  // RMSD WT converges around 7.24 Å with fluctuations
  const rmsdWT = parseFloat((7.24 + Math.sin(timeNs * 0.1) * 0.8 + Math.cos(timeNs * 0.23) * 0.4 - Math.exp(-timeNs / 15) * 4).toFixed(2));
  // RMSD Mutant converges lower (~5.73 Å), tighter/more rigid
  const rmsdMutant = parseFloat((5.73 + Math.sin(timeNs * 0.12) * 0.5 + Math.cos(timeNs * 0.19) * 0.3 - Math.exp(-timeNs / 10) * 3).toFixed(2));
  // p53 chain RMSD
  const rmsdP53 = parseFloat((3.4 + Math.sin(timeNs * 0.08) * 0.4 + Math.cos(timeNs * 0.15) * 0.3).toFixed(2));

  // Radius of gyration
  const rgChain1 = parseFloat((18.2 + Math.sin(timeNs * 0.05) * 0.3).toFixed(2));
  const rgChain2 = parseFloat((21.4 + Math.cos(timeNs * 0.06) * 0.4).toFixed(2));
  const rgComplex = parseFloat((28.6 + Math.sin(timeNs * 0.04) * 0.2).toFixed(2));

  // SASA
  const sasaComplex = Math.round(24500 + Math.sin(timeNs * 0.07) * 600 + Math.cos(timeNs * 0.11) * 400);
  const sasaChain1 = Math.round(11200 + Math.sin(timeNs * 0.09) * 300);
  const sasaChain2 = Math.round(14800 + Math.cos(timeNs * 0.08) * 350);

  // Delta G binding over trajectory
  const wtDG = parseFloat((-104.71 + Math.sin(timeNs * 0.11) * 8 + Math.cos(timeNs * 0.2) * 5).toFixed(2));
  const mutDG = parseFloat((-20.85 + Math.sin(timeNs * 0.13) * 12 + Math.cos(timeNs * 0.17) * 7).toFixed(2));

  return {
    timeNs,
    rmsdWT: Math.max(0.5, rmsdWT),
    rmsdMutant: Math.max(0.5, rmsdMutant),
    rmsdP53: Math.max(0.5, rmsdP53),
    rgChain1,
    rgChain2,
    rgComplex,
    sasaComplex,
    sasaChain1,
    sasaChain2,
    wtDG,
    mutDG,
  };
});

// 2. RMSF Chain A (E6 Protein - 158 residues)
export const h85yRMSFChainA: RMSFPoint[] = Array.from({ length: 158 }, (_, i) => {
  const res = i + 1;
  // Baseline fluctuation ~0.8 to 1.5 Å
  let wt = 0.9 + Math.abs(Math.sin(res * 0.3)) * 0.6;
  let mut = 0.9 + Math.abs(Math.sin(res * 0.3)) * 0.6;

  // Loops and flexible N/C termini
  if (res < 10 || res > 148) {
    wt += 1.2;
    mut += 1.1;
  }

  // Key Mutation Peak around residue 85 (H85Y)
  if (res >= 78 && res <= 92) {
    const dist = Math.abs(res - 85);
    const peak = Math.max(0, 1.6 - dist * 0.2);
    mut += peak; // H85Y mutation causes local instability/fluctuation spike
  }

  return {
    residue: res,
    wtRMSF: parseFloat(wt.toFixed(2)),
    mutantRMSF: parseFloat(mut.toFixed(2)),
  };
});

// 3. RMSF Chain D (p53 Core Domain - 198 residues)
export const h85yRMSFChainD: RMSFPoint[] = Array.from({ length: 198 }, (_, i) => {
  const res = i + 1;
  let wt = 0.8 + Math.abs(Math.cos(res * 0.25)) * 0.7;
  let mut = 0.85 + Math.abs(Math.cos(res * 0.25)) * 0.7;

  // p53 Loop L2 / L3 binding region (residues 80-120)
  if (res >= 95 && res <= 115) {
    wt += 0.4;
    mut += 0.8; // Mutant E6 causes loosening of p53 loop interaction
  }

  return {
    residue: res,
    wtRMSF: parseFloat(wt.toFixed(2)),
    mutantRMSF: parseFloat(mut.toFixed(2)),
  };
});

// 4. MM/GBSA Decomposition List
export const h85yMMGBSADecompList: MMGBSADecomp[] = [
  { frame: 1, dGBind: -20.85, coulomb: 52.26, covalent: 13.23, hbond: -3.61, lipo: -6.60, packing: -2.09, selfCont: 0.10, solvGB: -12.40, vdW: -31.75 },
  { frame: 2, dGBind: -18.50, coulomb: 48.91, covalent: 9.25, hbond: -4.10, lipo: -5.80, packing: -1.90, selfCont: -0.15, solvGB: -10.20, vdW: -28.90 },
  { frame: 3, dGBind: -22.10, coulomb: 55.40, covalent: 11.50, hbond: -3.20, lipo: -7.10, packing: -2.30, selfCont: 0.20, solvGB: -14.10, vdW: -34.60 },
];

// 5. Energy Term Comparison
export const h85yEnergyTermComparison: EnergyTermComparison[] = [
  {
    component: 'ΔG_bind Total',
    wildType: -104.71,
    mutantH85Y: -20.85,
    description: 'Energia livre de ligação global do complexo E6-p53',
  },
  {
    component: 'Van der Waals (ΔG_vdW)',
    wildType: -68.42,
    mutantH85Y: -31.75,
    description: 'Interações de empacotamento hidrofóbico e contatos de dispersão',
  },
  {
    component: 'Eletrostática (ΔG_Coulomb)',
    wildType: -112.50,
    mutantH85Y: 52.26,
    description: 'Atração/repulsão eletrostática atômica e pontes salinas',
  },
  {
    component: 'Solvatação Polar (ΔG_SolvGB)',
    wildType: 85.30,
    mutantH85Y: -12.40,
    description: 'Penalidade de energia para dessolvatação no modelo Generalized Born',
  },
  {
    component: 'Solvatação Apolar (ΔG_Lipo)',
    wildType: -14.20,
    mutantH85Y: -6.60,
    description: 'Contribuição lipofílica proporcional à área de superfície enterrada',
  },
  {
    component: 'Ligações de Hidrogênio (ΔG_HBond)',
    wildType: -8.90,
    mutantH85Y: -3.61,
    description: 'Energia favorável das redes de pontes de hidrogênio direcionadas',
  },
];
