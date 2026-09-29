<p align="center">
  <img src="docs/public/favicon.svg" alt="Wafer de silício com o entalhe de orientação" width="88" height="88">
</p>

<h1 align="center">chipmaking</h1>

<p align="center">A cadeia de produção do silício, do quartzo ao chip e à célula solar.</p>

## Sobre

Documentação estática e bilíngue, em português (`docs/`) e inglês (`docs/en/`), gerada com [VitePress](https://vitepress.dev/) e [Bun](https://bun.sh/). Os dois idiomas têm o mesmo conteúdo, arquivo por arquivo, e cada afirmação factual cita a fonte primária de onde saiu.

Documento de origem: `Resumo Chipmaking.pdf`. Busca local no site com **Ctrl+K** ou `/`, em cada idioma.

## O que a documentação cobre

A ordem do site é a ordem da cadeia.

| Etapa | Capítulos |
| --- | --- |
| Visão geral | [Introdução](docs/introducao.md) · [O elemento silício](docs/o-elemento-silicio.md) · [Linha do tempo](docs/linha-do-tempo.md) · [Glossário](docs/glossario.md) |
| 1. Matéria-prima | [Mineração e MG-Si](docs/mineracao-mg-si.md) |
| 2. Refino | [Polissilício](docs/polissilicio.md) |
| 3. Wafer | [Fabricação de wafers](docs/fabricacao-wafers.md) · [Estrutura e tipos](docs/estrutura-wafers.md) |
| 4. Na fab | [Na fab: do wafer ao chip](docs/na-fab.md) · [Fotolitografia](docs/fotolitografia.md) · [História da fotolitografia](docs/historia-fotolitografia.md) · [Os insumos da fab](docs/insumos-fab.md) |
| 5. Dispositivos | [Evolução dos transistores](docs/transistores.md) · [Confiabilidade](docs/confiabilidade.md) |
| 6. Depois da fab | [Empacotamento e teste](docs/empacotamento.md) |
| Fotovoltaica | [Células e módulos solares](docs/celulas-solares.md) |
| Panorama | [Preços e valor](docs/precos-e-valor.md) · [Além do silício](docs/alem-do-silicio.md) · [O mapa dos gargalos](docs/gargalos.md) · [Dados e números](docs/dados.md) |
| Fontes | [Referências](docs/referencias.md) |

Os capítulos do Panorama amarram o resto: a escada de preços, os semicondutores vizinhos (SiC e GaN), uma tabela única de gargalos por etapa e país, e o hub de séries de dados em CSV.

## Glossário rápido

| Termo | O que é |
| --- | --- |
| HPQ | Quartzo de alta pureza; a carga dos cadinhos de Czochralski |
| MG-Si | Silício grau metalúrgico, cerca de 98 a 99,5 % de silício; sai do forno de arco |
| TCS | Triclorossilano (SiHCl₃), o gás intermediário do refino |
| SoG-Si / EG-Si | Polissilício grau solar (7N a 9N) e grau eletrônico (10N a 11N) |
| CZ | Crescimento Czochralski; o lingote monocristalino de que saem os wafers |
| DWS | Corte por fio diamantado, que fatia o lingote em wafers |
| CMP | Polimento químico-mecânico; achata cada camada antes da seguinte |
| DUV / EUV | Luz de 248 ou 193 nm e de 13,5 nm, as duas eras da litografia óptica |
| FinFET | Transistor de aleta, com a porta cobrindo três lados do canal |
| TSV | Via de silício passante, que liga pastilhas empilhadas |
| FIT | Uma falha por 10⁹ horas-dispositivo; a unidade da confiabilidade |
| SiC / GaN | Carbeto de silício e nitreto de gálio, os semicondutores de potência vizinhos |

O glossário completo, com 63 entradas e filtro, é gerado de `docs/.vitepress/glossary.ts` e aparece no site em `/glossario` e `/en/glossario`.

## Como rodar

```bash
bun install
bun run dev       # http://localhost:5173/chipmaking/
bun run build     # gera docs/.vitepress/dist
bun run preview   # serve o build
```

A cada push em `main`, o workflow em `.github/workflows/deploy-pages.yml` builda e publica no GitHub Pages.

## Contribuir

Pull requests são bem-vindos. Quatro regras:

1. **Cite a fonte de tudo que é factual.** Toda afirmação numérica ou factual entra com um `<Cite id="…" />` e uma entrada em `docs/.vitepress/theme/citations.ts`. PR sem fonte não entra, e fonte inventada é motivo para fechar. Quando nenhuma fonte primária tabula o dado, a entrada diz que é uma **compilação** e nomeia quem agregou, em vez de emprestar a autoridade de um paper a um número que ele não publica.
2. **Espelhe os dois idiomas.** Toda mudança em `docs/<slug>.md` vai no mesmo commit que `docs/en/<slug>.md`. Traduza a frase, não a translitera.
3. **Uma mudança por PR.** Capítulo novo, correção de dados e troca de layout vão em PRs separados, para a revisão conseguir olhar cada um.
4. **Rode as verificações.** `bun run build`, `python scripts/audit-glossary.py`, `python scripts/audit-svgs.py` e `python scripts/audit-math.py`; as quatro têm de passar antes de abrir o PR.

Imagem de terceiro entra só com licença livre (domínio público, CC BY ou CC BY-SA) e crédito completo de autor, arquivo original e licença na legenda.

As convenções de escrita e de estrutura estão em [`AGENTS.md`](AGENTS.md); as de prosa vêm do skill [`no-ai-slop`](https://github.com/petergyang/no-ai-slop).

## Estrutura do repositório

```
docs/                     capítulos em português
docs/en/                  os mesmos capítulos em inglês
docs/.vitepress/          config, tema, glossário, citações, specs de gráfico
docs/public/assets/       esquemas SVG e fotos
docs/public/data/         CSV gerado das séries
docs/public/pdf-images/   figuras extraídas do PDF
scripts/                  audits, exportação de dados, geradores de SVG
audit/                    prompt de auditoria e achados da revisão de conteúdo
```
