%% Customizacoes do abnTeX2 (http://www.abntex.net.br) para
%% o Instituto de Matematica, Estatistica e Computacao Cientifica
%% da Universidade Estadual de Campinas (IMECC-UNICAMP)
%%
%% This work may be distributed and/or modified under the conditions of
%% the LaTeX Project Public License, either version 1.3 of this license
%% or (at your option) any later version. The latest version of this
%% license is in http://www.latex-project.org/lppl.txt and version 1.3
%% or later is part of all distributions of LaTeX version 2005/12/01
%% or later.
%%
%% This work has the LPPL maintenance status `maintained'.
%% 
%% The Current Maintainer of this work is Fabio Rodrigues Silva,
%% silvafr@ime.unicamp.br and gfabinhomat@gmail.com
%%
%% Further information about abnTeX2 are available on http://www.abntex.net.br

\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{imecc-unicamp}[2017/01/01 v1.0 Modelo do Instituto de%
Matematica, Estatistica e Computacao Cientifica da Universidade %
Estadual de Campinas baseado em abnTeX2]

% Repassa todos os parametros para a classe abntex2
\DeclareOption*{%
  \PassOptionsToClass{\CurrentOption}{abntex2}%
}
\ProcessOptions\relax
\LoadClass{abntex2}

% ----------------------------------------------------
% INICIO DAS ALTERAÇÕES PARA O IMECC -- UNICAMP
% ----------------------------------------------------
% ---
% Pacotes requeridos
% ---
\RequirePackage[utf8]{inputenc}
\RequirePackage{tikz}
% ---

% ---
% Dados Gerais
% ---
\renewcommand{\orientadorname}{Orientador}
\renewcommand{\coorientadorname}{Coorientador}
\newcommand{\primeirafolhaname}{Primeira folha}
\newcommand{\fichacatalograficaname}{Ficha catalográfica}
% ---
\addto\captionsenglish{
    \renewcommand{\orientadorname}{Supervisor}
    \renewcommand{\coorientadorname}{Co-supervisor}
    \renewcommand{\primeirafolhaname}{First page}
    \renewcommand{\fichacatalograficaname}{Catalographic data}
}
% ---

% ---
% Instruções de bookmark para Primeira Folha
% ---
\newenvironment{primeirafolha}[1][]{%
    \PRIVATEbookmarkthis{\primeirafolhaname}
}{\PRIVATEclearpageifneeded}
% ---

% ---
% Instruções de bookmark para Ficha Catalográfica
% ---
\renewenvironment{fichacatalografica}[1][]{%
    \thispagestyle{empty}
    \PRIVATEbookmarkthis{\fichacatalograficaname}
    \begin{SingleSpacing}
      \ABNTEXfontereduzida
}{\end{SingleSpacing}}
% ---

% ----------------------------------
% COMANDOS DE DADOS
% ----------------------------------
% Comandos de dados - título em outra língua
\providecommand{\imprimirtitulootherlang}{}
\newcommand{\titulootherlang}[1]{%
    \renewcommand{\imprimirtitulootherlang}{#1}}
%
% Comandos de dados - titulação em outra língua
\providecommand{\imprimirtitulation}{}
\newcommand{\titulation}[1]{%
    \renewcommand{\imprimirtitulation}{#1}}
%
% Comandos de dados - curso em outra língua
\providecommand{\imprimircursootherlang}{}
\newcommand{\cursootherlang}[1]{%
    \renewcommand{\imprimircursootherlang}{#1}}
%
% Comandos de dados - trabalho em outra língua
\providecommand{\imprimirtypework}{}
\newcommand{\typework}[1]{%
    \renewcommand{\imprimirtypework}{#1}}
%
\providecommand{\imprimiruniversidadecotutela}{}
\newcommand{\universidadecotutela}[1]{%
    \renewcommand{\imprimiruniversidadecotutela}{#1}}
%
\providecommand{\imprimirpaiscotutela}{}
\newcommand{\paiscotutela}[1]{%
    \renewcommand{\imprimirpaiscotutela}{#1}}
% Comandos de dados - titulação
\providecommand{\imprimirtitulacao}{}
\newcommand{\titulacao}[1]{%
    \renewcommand{\imprimirtitulacao}{#1}}
%
% Comandos de dados - curso
\providecommand{\imprimircurso}{}
\newcommand{\curso}[1]{\renewcommand{\imprimircurso}{#1}}
%
% Comandos de dados - autor (use \and para multiplos autores)
\providecommand{\sexo}{}
\renewcommand{\autor}[2][\theauthor]{
  \author{#2}%
  \renewcommand{\sexo}{#1}}
%
\newboolean{ABNTEXotherlanguage}
\newboolean{ABNTEXcotutela}
\setboolean{ABNTEXotherlanguage}{false}
\setboolean{ABNTEXcotutela}{false}
%
\definecolor{unicampred}{cmyk}{0,1,1,0}
% ----------------------------------

% ---
% Definicoes compartilhadas entre Apendices e Anexos
% ---
\renewcommand{\PRIVATEapendiceconfig}[2]{%
 \setboolean{abntex@apendiceousecao}{true}%
 \renewcommand{\appendixname}{#1}
 \ifthenelse{\boolean{ABNTEXsumario-abnt-6027-2012}}{
   \renewcommand{\appendixtocname}{\texorpdfstring{\uppercase{#2}}{#2}}
  }{%
  \renewcommand{\appendixtocname}{#2}} 
 \renewcommand{\appendixpagename}{#2}
 \switchchapname{#1}% Corrected from \switchapname -> \switchchapname
 \renewcommand*{\cftappendixname}{#1 \space}
}
% ---

% ---
% Ajusta entrada Referencias
% ---
\renewcommand{\bibsection}{%
   \chapter*{\bibname}
   \bibmark
   \ifnobibintoc\else
   \phantomsection
   \addcontentsline{toc}{chapter}{\texorpdfstring{\uppercase{\bibname}}{\bibname}}
   \fi
   \prebibhook
}
% ---

% ---
% Configuracoes para uso de algoritmos com 'algorithm2e'
% ---
\AtBeginDocument{%
    \@ifpackageloaded{algorithm2e}{%
	\SetAlgoCaptionSeparator{\space\textendash}%
	\setlength{\AlCapSkip}{0.5em}
	\renewcommand{\@algocf@capt@plain}{above}%
	\renewcommand{\algocf@caption@plain}{\box\algocf@capbox\vskip\AlCapSkip}%
	\renewcommand{\algorithmautorefname}{\algorithmcfname}%
	\renewcommand\l@algocf{\@dottedtocline{1}{0em}{7em}}%
	\long\def\algocf@latexcaption#1[#2]#3{% original definition of caption
	    \par%
	    \addcontentsline{\csname ext@#1\endcsname}{#1}%
	    {\protect\numberline{\algorithmcfname\space\csname the#1\endcsname\hfill\textendash\hfill}{\ignorespaces #2}}%
	    \begingroup%
		\@parboxrestore%
		\if@minipage%
		    \@setminipage%
		\fi%
		\normalsize%
		\@makecaption{\csname fnum@#1\endcsname}{\ignorespaces #3}\par%
	    \endgroup%
	}%
	\renewcommand{\algocf@makecaption}[2]{%
	    \addtolength{\hsize}{\algomargin}%
	    \sbox\@tempboxa{\algocf@captiontext{#1}{#2}}%
	    \ifdim\wd\@tempboxa >\hsize%     % if caption is longer than a line
		\parbox[t]{0.21\hsize}{\algocf@captiontext{#1}{}}%     %\fnum@algocf
		\parbox[t]{0.8\hsize}{#2}%
	    \else%
		\global\@minipagefalse%
		\hbox to\hsize{\hfil\box\@tempboxa\hfil}% else caption is centered
	    \fi%
	    \addtolength{\hsize}{-\algomargin}%
	}%
    }{}%
}%
% ---

% ---
% Configuracoes para uso de codigos-fonte com 'listings'
% ---
\AtBeginDocument{%
  \@ifpackageloaded{listings}{%
    \renewcommand{\lstlistingname}{Código-fonte}%
    \renewcommand{\lstlistlistingname}{Lista de Códigos-fonte}%
    \addto\captionsenglish{%
      \renewcommand{\lstlistingname}{Source code}%
      \renewcommand{\lstlistlistingname}{List of Source Codes}%
    }%
    \lstset{numberbychapter=false,captionpos=t,xleftmargin=0pt}%
    \def\fnum@lstlisting{%
      \bfseries\lstlistingname
      \ifx\lst@@caption\@empty\else~\thelstlisting\fi
    }%
    \def\lst@MakeCaption#1{%
      \lst@ifdisplaystyle
        \ifx #1t%
          \ifx\lst@@caption\@empty\expandafter\lst@HRefStepCounter
          \else\expandafter\refstepcounter
          \fi {lstlisting}%
          \ifx\lst@label\@empty\else \label{\lst@label}\fi
          \let\lst@arg\lst@intname \lst@ReplaceIn\lst@arg\lst@filenamerpl
          \global\let\lst@name\lst@arg \global\let\lstname\lst@name
          \lst@ifnolol
          \else
            \ifx\lst@@caption\@empty
              \ifx\lst@caption\@empty
                \ifx\lst@intname\@empty
                \else
                  \def\lst@temp{ }%
                  \ifx\lst@intname\lst@temp
                  \else\addcontentsline{lol}{lstlisting}\lst@name
                  \fi
                \fi
              \fi
            \else
              \addcontentsline{lol}{lstlisting}{%
                \protect\numberline{{\fontfamily{lmr}\selectfont\lstlistingname\space\thelstlisting\hfill\textendash\hfill}}%
                {\fontfamily{lmr}\selectfont\lst@@caption}%
              }%
            \fi
          \fi
        \fi
        \ifx\lst@caption\@empty
        \else
          \lst@IfSubstring #1\lst@captionpos{
            \begingroup
              \let\@@vskip\vskip
              \def\vskip{\afterassignment\lst@vskip \@tempskipa}%
              \def\lst@vskip{\nobreak\@@vskip\@tempskipa\nobreak}%
              \par\@parboxrestore\normalsize\normalfont % \noindent (AS)
              \ifx #1t\allowbreak \fi
              \ifx\lst@title\@empty
                \lst@makecaption\fnum@lstlisting{\ignorespaces \lst@caption}
              \else
                \lst@maketitle\lst@title % (AS)
              \fi
              \ifx #1b\allowbreak \fi
            \endgroup
          }{}%
        \fi
      \fi
    }
    \renewcommand{\l@lstlisting}{\@dottedtocline{1}{0em}{8.3em}}%
  }{}%
}%
% ---

% ----------------------------------
% COMANDO PARA PRIMEIRA FOLHA
% ----------------------------------
\newcommand{\imprimirprimeirafolha}{%
  \begin{primeirafolha}%    
    \noindent%

    \center{\includegraphics[width=2.5cm]{Figuras/Brasao_ufam_2011.jpg}} \\ \medskip % Picture
            
    \center{\ABNTEXchapterfont\LARGE Universidade Federal do Amazonas}
    
    \vspace*{0.7cm}
    
    {\ABNTEXchapterfont\Large Programa de Desenvolvimento Tecnológico e Inovação (PIBIT 2025-2026)}
    
    \vspace*{2cm}

    {\ABNTEXchapterfont\large\MakeUppercase{\imprimirautor}}

    \vfill
    
    \begin{center}
	\ifthenelse{\boolean{ABNTEXotherlanguage}}{%
	    {\ABNTEXchapterfont\bfseries\LARGE\imprimirtitulootherlang}
	    
	    \vspace*{\fill}
	    
	    {\ABNTEXchapterfont\bfseries\LARGE\imprimirtitulo}
	}{%
	    {\ABNTEXchapterfont\bfseries\LARGE\imprimirtitulo}
	}
    \end{center}
    \vfill

    {\large Manaus - AM}

    {\large\imprimirdata}

    \vspace*{1cm}
  \end{primeirafolha}
}
% ----------------------------------

% ----------------------------------
% COMANDO PARA FOLHA DE ROSTO
% ----------------------------------
\makeatletter
\renewcommand{\folhaderostocontent}{
    \begin{center}
	{\ABNTEXchapterfont\large\imprimirautor}
        
        \vspace*{\fill}
        
        \ifthenelse{\boolean{ABNTEXotherlanguage}}{%
	    \ABNTEXchapterfont\bfseries\Large\imprimirtitulootherlang
	    
	    \vspace*{\fill}
	    
	    \ABNTEXchapterfont\bfseries\Large\imprimirtitulo
	}{\ABNTEXchapterfont\bfseries\Large\imprimirtitulo}
    \end{center}
    
    \vspace*{\fill}
    
    \begin{flushright}
        \begin{minipage}[c]{.5\textwidth}
            \SingleSpacing
	    \ifthenelse{\boolean{ABNTEXotherlanguage}}{%
		\imprimirtipotrabalho\ apresentada ao Instituto de Matemática, Estatística %
		e Computação Científica da Universidade Estadual de Campinas como parte dos %
		requisitos exigidos para a obtenção do título de %
		\ifthenelse{\equal{\imprimircurso}{\empty}}%
		    {\imprimirtitulacao}%
		    {\imprimirtitulacao\ em \imprimircurso}%
		\ifthenelse{\boolean{ABNTEXcotutela}}%
		    { no âmbito do Acordo de Cotutela Internacional de Tese firmado entre a %
		    UNICAMP e a \imprimiruniversidadecotutela\ (\imprimirpaiscotutela).}%
		    {.}
		
		\vspace{1em}%\hspace{\fill} e \hspace{\fill}
		
		\imprimirtypework\ presented to the Institute of Mathematics, Statistics %
		and Scientific Computing of the University of Campinas in partial fulfillment %
		of the requirements for the degree of %
		\ifthenelse{\equal{\imprimircurso}{\empty}}%
		    {\imprimirtitulation}%
		    {\imprimirtitulation\ in \imprimircursootherlang}%
		\ifthenelse{\boolean{ABNTEXcotutela}}%
		    { under the Agreement for the International Joint Supervision of Thesis %
		    signed between UNICAMP and the \imprimiruniversidadecotutela\ (\imprimirpaiscotutela).}%
		    {.}
	    }{%
		\imprimirtipotrabalho\ apresentada  como parte dos requisitos exigidos para o Programa de Desenvolvimento Tecnológico e Inovação 2025 (PIBIT 2025-2026).
	    }
        \end{minipage}%
    \end{flushright}
    \vspace*{\fill}
    \ifthenelse{\boolean{ABNTEXotherlanguage}}{
	\noindent
	{\large\orientadorname:~\imprimirorientador\par}
	\noindent
	\abntex@ifnotempty{\imprimircoorientador}{%
	    {\large\coorientadorname:~\imprimircoorientador}%
	}
    }{
	\noindent
	{\large\imprimirorientadorRotulo:~\imprimirorientador\par}
	\noindent
	\abntex@ifnotempty{\imprimircoorientador}{%
	    {\large\imprimircoorientadorRotulo:~\imprimircoorientador}%
	}
    }
    \vspace*{\fill}
    \begin{flushleft}
	\begin{minipage}[c]{.5\textwidth}
	    \SingleSpacing
	    {\large{Este exemplar corresponde à versão final da %
	    \imprimirtipotrabalho\ defendida
	    \ifthenelse{\equal{\sexo}{autora}}%
		{pela aluna \imprimirautor~}%
		{pelo aluno \imprimirautor~}%
	    e orientada %
	    \ifthenelse{\equal{\imprimirorientadorRotulo}{Orientadora}}%
		{pelo Prof. Dr.}%
		{pelo Prof. Dr.}
	    \imprimirorientador.}}
	\end{minipage}
    \end{flushleft}
    
    \vspace*{\fill}
    
    \begin{center}
        {\large Manaus - AM}
        \par
        {\large\imprimirdata}
    \end{center}
}
\makeatother
% ----------------------------------

% ----------------------------------------------------
% FIM DAS ALTERAÇÕES PARA O IMECC -- UNICAMP
% ----------------------------------------------------