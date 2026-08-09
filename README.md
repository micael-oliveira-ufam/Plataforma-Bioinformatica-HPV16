# PIB-S/0053/2025 — HPV-16: modelagem por IA, docking molecular e dinâmica molecular

Repositório de **dados, modelos estruturais, resultados brutos, análises computacionais e materiais de apoio** do projeto PIBITI 2025/2026:

> **Desenvolvimento de teste diagnóstico para HPV-16 a partir da modelagem por IA de variantes nas Oncoproteínas E6/E7 ao interagir com p53 e p16INK4a**

O projeto investiga, por abordagens *in silico*, como variantes do HPV-16 podem modificar a estrutura e as interações moleculares das oncoproteínas E6/E7, com ênfase na interação E6–p53, na identificação de epítopos antigênicos, na avaliação de candidatos para desenvolvimento diagnóstico e na análise exploratória de mutações em PIK3CA frente a quimioterápicos.

## 🌐 Plataforma Web Interativa

A visualização integrada dos principais resultados está disponível em:

**[Acessar a Plataforma Web](https://plataforma-pib-s-0053-2025-bioinform-tica-diagn-s-348970347034.us-west1.run.app/)**

A plataforma reúne os resultados apresentados no relatório final e foi desenvolvida como interface pública para consulta dos dados e análises do projeto.

---

## Identificação do projeto

| Item | Informação |
|---|---|
| Programa | Programa Institucional de Bolsas de Iniciação em Desenvolvimento Tecnológico e Inovação — PIBITI 2025/2026 |
| Código | **PIB-S/0053/2025** |
| Instituição | Universidade Federal do Amazonas — UFAM |
| Unidade institucional | Pró-Reitoria de Inovação Tecnológica |
| Bolsista | **Beatriz Medeiros de Souza Oliveira Andrade** |
| Orientador | **Prof. Dr. Toni Ricardo Martins** |
| Modalidade | Bolsa CNPq |
| Área | Saúde |
| Organismo de interesse | *Human papillomavirus* 16 — HPV-16 |
| Oncoproteínas principais | E6 e E7 |

---

## Objetivo

Investigar como mutações identificadas no Amazonas e em outras populações podem interferir nas propriedades estruturais e moleculares das oncoproteínas E6 e E7 do HPV-16, especialmente em suas interações com proteínas humanas relacionadas à carcinogênese cervical.

O projeto também avaliou:

- modelagem estrutural de variantes de E6/E7;
- interação E6–p53 e E7–p16INK4a;
- dinâmica molecular de complexos selecionados;
- predição de epítopos de células T e B;
- interação de peptídeos candidatos com HLA-A*02:01 e TLR4;
- candidatos a primers e componentes para futuros testes diagnósticos;
- impacto das mutações E542K/E545K de PIK3CA sobre a interação com quimioterápicos;
- disponibilização pública dos resultados e dados brutos.

---

## Fluxo computacional

```text
Sequências de HPV-16
        │
        ├── Alinhamento e identificação de variantes
        │
        ├── Modelagem estrutural por IA
        │      └── AlphaFold / AlphaFold 3
        │
        ├── Validação estrutural
        │      ├── pLDDT
        │      └── MolProbity / Ramachandran
        │
        ├── Docking molecular
        │      ├── E6 × p53
        │      ├── Epítopos T × HLA-A*02:01
        │      ├── Epítopos B × TLR4
        │      └── PIK3CA × quimioterápicos
        │
        ├── Dinâmica molecular
        │      ├── E6 × p53: 200 ns
        │      └── Complexos peptídeo–receptor: 400 ns
        │
        ├── MM-GBSA e métricas estruturais
        │
        └── Plataforma Web + depósito dos dados brutos
```

---

## Sequências e variantes analisadas

A sequência de referência do HPV-16 foi obtida no NCBI a partir do acesso:

- **NC_001526**

Entre as variantes de E6 consideradas no projeto estão:

- T6P
- R17I
- L19V
- Q21H
- I80L
- H85Y
- L90V

As mutações foram avaliadas tanto em conjunto quanto, para a variante **H85Y**, de forma isolada.

Também foram consideradas as variantes **G43E** e **N29S** em E7 e as mutações **E542K/E545K** em PIK3CA na análise de interação com fármacos.

---

## Principais ferramentas

| Etapa | Ferramenta / base |
|---|---|
| Sequência de referência | NCBI |
| Edição/alinhamento de sequências | Geneious |
| Modelagem estrutural | AlphaFold / AlphaFold 3 |
| Validação estrutural | pLDDT e MolProbity |
| Predição de epítopos T | IEDB / NetMHCpan 4 |
| Predição de epítopos B | IEDB / BepiPred 3 |
| Docking proteína–proteína / proteína–peptídeo | PIPER — Schrödinger Maestro |
| Energia de ligação | MM-GBSA |
| Dinâmica molecular | Desmond — Schrödinger Maestro |
| Campo de força | OPLS4 |
| Modelo de água | TIP3P |
| Docking proteína–ligante | AutoDock Vina 1.2.7 |
| Preparação para AutoDock | AutoDockTools 1.5.7 |
| Estruturas de ligantes | PubChem |
| Estruturas experimentais | Protein Data Bank — PDB |

### Estruturas PDB empregadas

- **4XR8** — complexo E6/E6AP/p53, utilizado como referência estrutural;
- **4U6Y** — HLA-A*02:01;
- **8WO1** — TLR4;
- **8EXL** — PIK3CA.

---

# Resultados principais

## 1. Interação E6–p53

O docking molecular indicou redução da afinidade do complexo E6–p53 após a introdução simultânea das mutações analisadas.

| Complexo | MM-GBSA |
|---|---:|
| E6 wild-type × p53 | **−51,91 kcal/mol** |
| E6 com mutações simultâneas × p53 | **−39,10 kcal/mol** |

A análise das interações intermoleculares também mostrou redução do número de ligações de hidrogênio no complexo mutado.

| Condição | Ligações de hidrogênio |
|---|---:|
| Wild-type | 10 |
| Mutante | 5 |

O complexo mutante apresentou ainda uma ponte salina envolvendo **Arg138–Glu87**.

---

## 2. Mutação H85Y e dinâmica molecular de E6–p53

Os complexos foram submetidos a **200 ns de dinâmica molecular**.

### RMSD médio

| Sistema | RMSD médio |
|---|---:|
| E6 wild-type × p53 | **7,24 Å** |
| E6-H85Y × p53 | **5,73 Å** |

### MM-GBSA dos últimos 20 ns

| Sistema | Energia média |
|---|---:|
| E6 wild-type × p53 | **−104,71 kcal/mol** |
| E6-H85Y × p53 | **−20,85 kcal/mol** |

A diferença entre os grupos foi estatisticamente significativa no conjunto analisado (**teste t de Student, p < 2,2 × 10⁻¹⁶**).

Apesar do menor RMSD médio observado para H85Y, a decomposição de energia indicou uma interação E6–p53 muito mais favorável para a forma wild-type.

---

## 3. Predição de epítopos de células T

A predição de epítopos foi realizada a partir do alinhamento de **702 sequências de HPV-16** obtidas no GenBank.

Entre os candidatos reportados pelo NetMHCpan 4 estão:

| Epítopo | HLA priorizado na predição | Score | Frequência brasileira reportada |
|---|---|---:|---:|
| TTLEQQYNK | HLA-A*11:01 | 0,9483 | 5,32% |
| KFYSKISEY | HLA-A*30:02 | 0,9255 | 5,24% |
| TTLEQQYNK | HLA-A*68:01 | 0,8748 | 6,14% |
| QQLLRREVY | HLA-B*15:01 | 0,8061 | 9,10% |
| IVYRDGNPY | HLA-B*15:01 | 0,7979 | 9,10% |
| ISEYRHYCY | HLA-A*01:01 | 0,7899 | 9,18% |
| RPRKLPQLC | HLA-B*07:02 | 0,7786 | 6,91% |
| FYSKISEYR | HLA-A*33:01 | 0,7383 | 3,03% |
| KLPQLCTEL | HLA-A*02:01 | 0,3702 | 25,90% |
| KLPQLCTEL | HLA-A*02:03 | 0,3474 | 25,90% |

O grupo **HLA-A*02** foi priorizado nas análises estruturais por sua elevada frequência na população analisada.

---

## 4. Docking de epítopos T com HLA-A*02:01

As conformações selecionadas no docking com **HLA-A*02:01 (PDB 4U6Y)** apresentaram:

| Epítopo | Afinidade no docking |
|---|---:|
| KFYSKISEY | **−72,90 kcal/mol** |
| RPRKLPQLC | **−63,96 kcal/mol** |
| QQLLRREVY | **−52,94 kcal/mol** |
| FYSKISEYR | **−44,68 kcal/mol** |
| TTLEQQYNK | **−44,56 kcal/mol** |
| KLPQLCTEL | **−37,24 kcal/mol** |

Os três complexos priorizados foram posteriormente avaliados por dinâmica molecular de **400 ns**.

### MM-GBSA após dinâmica molecular

| Epítopo | MM-GBSA médio ± DP |
|---|---:|
| **RPRKLPQLC** | **−55,55 ± 8,75 kcal/mol** |
| KFYSKISEY | −39,14 ± 9,64 kcal/mol |
| QQLLRREVY | −34,14 ± 12,20 kcal/mol |

### RMSD médio do receptor HLA-A*02:01

| Epítopo | RMSD médio ± DP |
|---|---:|
| KFYSKISEY | 5,37 ± 0,85 Å |
| QQLLRREVY | 4,79 ± 1,09 Å |
| RPRKLPQLC | 10,63 ± 3,11 Å |

**RPRKLPQLC** apresentou a energia média de interação mais favorável após a dinâmica molecular e menor variabilidade do raio de giro do peptídeo. O complexo, entretanto, apresentou uma transição conformacional pronunciada do receptor aproximadamente entre **90–100 ns**, refletida pelo maior RMSD.

---

## 5. Predição de epítopos de células B

Os principais segmentos preditos pelo BepiPred 3 foram:

| Epítopo | Score | Tamanho |
|---|---:|---:|
| HQKRTAMFQDPQERPRKLPQLCT | 0,235 | 23 aa |
| CRSSRTRRETQ | 0,212 | 11 aa |
| SKISEYRHYCYSVYGTTLEQQYNKPL | 0,188 | 26 aa |
| HLDKKQRFHNIRG | 0,172 | 13 aa |
| LCIVY | 0,166 | 5 aa |

Dois candidatos foram priorizados para dinâmica molecular com **TLR4 (PDB 8WO1)** durante **400 ns**.

### MM-GBSA dos últimos 20 ns

| Epítopo | Energia média ± DP |
|---|---:|
| HQKRTAMFQDPQERPRKLPQLCT | **−107,75 ± 6,78 kcal/mol** |
| SKISEYRHYCYSVYGTTLEQQYNKPL | **−79,38 ± 14,16 kcal/mol** |

---

## 6. PIK3CA e quimioterápicos

A proteína PIK3CA foi analisada em sua forma wild-type e contendo as mutações **E542K/E545K**.

Foram avaliados 11 quimioterápicos:

- Docetaxel
- Doxorrubicina
- Entrectinib
- Gemcitabina
- Ifosfamida
- Irinotecano
- Larotrectinib
- Paclitaxel
- Selpercatinib
- Topotecano
- Vinorelbina

### Paclitaxel

| PIK3CA | Afinidade |
|---|---:|
| Wild-type | **−9,187 kcal/mol** |
| E542K/E545K | **−8,105 kcal/mol** |

No modelo wild-type foram observadas quatro ligações de hidrogênio associadas a **Asp290, Arg186, Asn36 e Arg35**. No modelo mutado foram observadas duas interações principais, envolvendo **Asn533 e Arg664**.

### Cisplatina

| PIK3CA | Afinidade |
|---|---:|
| Wild-type | −3,470 kcal/mol |
| E542K/E545K | −3,248 kcal/mol |

A diferença observada para cisplatina foi pequena quando comparada às alterações encontradas para outros ligantes.

---

# Dados brutos

Este repositório foi planejado para permitir acesso aos arquivos que sustentam as análises apresentadas no relatório e na plataforma web.

Os conjuntos de dados podem incluir:

- sequências de referência e variantes;
- alinhamentos de sequências;
- modelos tridimensionais;
- arquivos de entrada e saída do docking;
- poses e conformações selecionadas;
- tabelas de energia de ligação;
- trajetórias de dinâmica molecular;
- arquivos de topologia e estruturas dos sistemas;
- séries temporais de RMSD, RMSF e raio de giro;
- resultados de MM-GBSA;
- predições de epítopos;
- frequências de HLA;
- resultados de docking proteína–ligante;
- candidatos a primers;
- tabelas utilizadas para geração dos gráficos;
- figuras finais do projeto.

> **Nota sobre arquivos grandes:** trajetórias completas de dinâmica molecular podem ser mantidas em um repositório de dados como o **Zenodo**, enquanto este GitHub funciona como índice, documentação, código e ponto de acesso aos resultados. O relatório final informa que as trajetórias e resultados brutos de docking foram depositados no Zenodo.

### Zenodo

**DOI/URL:** `ADICIONAR_DOI_OU_LINK_DO_ZENODO`

---

## Estrutura recomendada do repositório

```text
.
├── README.md
│
├── data/
│   ├── sequences/
│   │   ├── reference/
│   │   ├── alignments/
│   │   └── variants/
│   │
│   ├── epitopes/
│   │   ├── t_cell/
│   │   ├── b_cell/
│   │   └── hla_frequencies/
│   │
│   ├── primers/
│   └── drugs/
│
├── structures/
│   ├── alphafold/
│   ├── pdb_reference/
│   └── prepared_systems/
│
├── docking/
│   ├── e6_p53/
│   ├── epitopes_hla/
│   ├── epitopes_tlr4/
│   └── pik3ca_drugs/
│
├── molecular_dynamics/
│   ├── e6_p53_200ns/
│   ├── hla_epitopes_400ns/
│   └── tlr4_epitopes_400ns/
│
├── analysis/
│   ├── rmsd/
│   ├── rmsf/
│   ├── radius_of_gyration/
│   ├── mmgbsa/
│   └── interaction_maps/
│
├── results/
│   ├── tables/
│   └── summary/
│
├── figures/
│
├── web/
│   └── source_code/
│
└── docs/
    └── final_report/
```

A estrutura pode ser adaptada à organização real dos arquivos antes da publicação definitiva.

---

# Reprodutibilidade

## Docking proteína–peptídeo

- algoritmo: **PIPER**;
- até **70.000 rotações**;
- até **30 conformações** retornadas;
- seleção da melhor conformação por **MM-GBSA**;
- HLA-A*02:01: **PDB 4U6Y**;
- TLR4: **PDB 8WO1**.

## Dinâmica molecular

### E6–p53

- tempo: **200 ns**;
- software: **Desmond / Schrödinger Maestro 2022-1**;
- campo de força: **OPLS4**;
- ensemble: **NPT**;
- temperatura: **300 K**;
- pressão: **1 atm**;
- solvente: **TIP3P**;
- ambiente computacional reportado: **Linux Mint 22.2**;
- GPU reportada: **NVIDIA RTX 5060 Ti 16 GB**.

### Epítopos

Os complexos de epítopos selecionados com HLA-A*02:01 e TLR4 foram analisados ao longo de **400 ns**, com decomposição MM-GBSA dos **últimos 20 ns** nas comparações apresentadas no relatório.

---

# Como utilizar os dados

1. Consulte a **Plataforma Web** para uma visão geral dos resultados.
2. Utilize as pastas de `data/`, `structures/` e `docking/` para acessar os dados de entrada e modelos.
3. Consulte `molecular_dynamics/` para os arquivos e resultados derivados das simulações.
4. Utilize `analysis/` para séries temporais, métricas estruturais e cálculos energéticos.
5. Para arquivos brutos de grande porte, consulte o depósito no **Zenodo** após a inclusão do DOI/link definitivo.
6. Verifique `docs/` para o relatório final e documentação metodológica.

---

# Limitações

Os resultados deste projeto são predominantemente **computacionais (*in silico*)** e devem ser interpretados como hipóteses estruturais e moleculares.

Entre as limitações descritas no relatório estão:

- necessidade de validação **in vitro** e clínica;
- número limitado de amostras regionais que fundamentaram parte das variantes estudadas;
- avaliação isolada de H85Y como estratégia complementar;
- simplificação do sistema E6–p53 pela retirada do complexo ubiquitina–proteassoma para reduzir o custo computacional.

Assim, diferenças de energia, conformação ou estabilidade não devem ser interpretadas isoladamente como evidência clínica de maior ou menor oncogenicidade.

---

# Perspectivas

Os resultados podem subsidiar:

- validação experimental das variantes de HPV-16;
- desenvolvimento de ensaios diagnósticos;
- seleção de epítopos para estudos imunológicos;
- avaliação de anticorpos e reagentes de reconhecimento;
- otimização de primers;
- estudos de interação proteína–proteína e proteína–peptídeo;
- análises farmacogenômicas relacionadas a PIK3CA;
- estudos translacionais voltados ao câncer do colo do útero na Amazônia.

---

# Plataforma e disponibilidade

- **Plataforma Web:**  
  https://plataforma-pib-s-0053-2025-bioinform-tica-diagn-s-348970347034.us-west1.run.app/

- **Dados brutos / Zenodo:**  
  `ADICIONAR_DOI_OU_LINK_DO_ZENODO`

- **Código-fonte da plataforma:**  
  incluir na pasta `web/` ou indicar aqui o repositório correspondente.

---

# Citação

Ao utilizar dados ou resultados deste repositório, recomenda-se citar o projeto:

> **Andrade, Beatriz Medeiros de Souza Oliveira; Martins, Toni Ricardo.** Desenvolvimento de teste diagnóstico para HPV-16 a partir da modelagem por IA de variantes nas Oncoproteínas E6/E7 ao interagir com p53 e p16INK4a. Relatório Final PIBITI 2025/2026. Universidade Federal do Amazonas. Projeto PIB-S/0053/2025.

Quando o depósito no Zenodo receber DOI definitivo, recomenda-se utilizar o DOI na citação dos dados.

---

# Licença

A licença do repositório e dos dados deve ser definida antes da publicação.

Sugestão para dados e documentação científica aberta: **CC BY 4.0**.  
Sugestão para código-fonte: **MIT License**.

> A escolha da licença deve ser confirmada pelos responsáveis pelo projeto e pela instituição antes da publicação.

---

## Responsáveis

**Bolsista:** Beatriz Medeiros de Souza Oliveira Andrade  
**Orientador:** Prof. Dr. Toni Ricardo Martins  
**Instituição:** Universidade Federal do Amazonas — UFAM  
**Programa:** PIBITI 2025/2026  
**Projeto:** PIB-S/0053/2025
