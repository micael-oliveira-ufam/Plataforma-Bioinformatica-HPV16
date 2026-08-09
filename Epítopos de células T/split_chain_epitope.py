def processar_cadeias_pdb(arquivo_entrada, arquivo_saida):
    """
    Lê um arquivo PDB e reatribui as cadeias:
    - Resíduos 1 a 26: Cadeia B (Peptídeo)
    - Resíduos > 26: Cadeia A (Proteína)
    """
    try:
        with open(arquivo_entrada, 'r') as f_in, open(arquivo_saida, 'w') as f_out:
            for linha in f_in:
                # Processa apenas as linhas que contêm coordenadas atômicas
                if linha.startswith("ATOM") or linha.startswith("HETATM"):
                    try:
                        # Extrai o número do resíduo (índices 22 a 25 no Python equivalem às colunas 23 a 26)
                        numero_residuo = int(linha[22:26].strip())
                        
                        # Define a cadeia com base na posição
                        if numero_residuo <= 26:
                            nova_cadeia = 'B'
                        else:
                            nova_cadeia = 'A'
                            
                        # Reconstrói a linha substituindo apenas a coluna da cadeia (índice 21)
                        nova_linha = linha[:21] + nova_cadeia + linha[22:]
                        f_out.write(nova_linha)
                        
                    except ValueError:
                        # Caso a numeração não seja um inteiro válido, mantém a linha original
                        f_out.write(linha)
                else:
                    # Mantém os cabeçalhos, TER, END e outras marcações intactas
                    f_out.write(linha)
                    
        print(f"Processamento concluído! Arquivo salvo como: {arquivo_saida}")
        
    except FileNotFoundError:
        print(f"Erro: O arquivo '{arquivo_entrada}' não foi encontrado.")

# --- Como usar ---
# Substitua 'seu_arquivo.pdb' pelo nome do seu arquivo original
# Substitua 'complexo_A_B.pdb' pelo nome que deseja dar ao arquivo gerado

arquivo_input = 'complexo_pose22_docking_8WO1_TLR4_with_fold_peptide3_hpv16_e6_bcell_epitope.pdb'
arquivo_output = 'complexo_A_B_epitope3_8WO1_TLR4.pdb'

processar_cadeias_pdb(arquivo_input, arquivo_output)
