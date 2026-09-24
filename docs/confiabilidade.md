---
title: Confiabilidade e envelhecimento
description: Por que um chip deixa de funcionar — a curva da banheira, os mecanismos de desgaste, FIT, erros suaves e a qualificação automotiva.
dataAsOf: 2026
---

# Confiabilidade e envelhecimento

Os capítulos anteriores contam como um chip é feito. A [fábrica](/na-fab) constrói o transistor camada por camada, a [evolução dos transistores](/transistores) mostra o que ficou dentro do die e o [empacotamento](/empacotamento) o veda numa carcaça. Falta a pergunta que decide se o produto existe de verdade: **por quanto tempo ele continua funcionando?**

Confiabilidade não é uma medida isolada. É a **distribuição das falhas ao longo do tempo** — e essa distribuição quase nunca é uniforme. Entendê-la é o que separa "o chip funciona" de "o chip pode ser vendido".

## A curva da banheira

Plote a taxa de falhas de uma população contra o tempo e o desenho que reaparece, em componentes mecânicos e eletrônicos dos mais variados, é sempre o mesmo: uma **curva em forma de banheira** <Cite id="rel-nist-bathtub" />.

- **Mortalidade infantil.** No começo a taxa é alta e cai depressa. Dura de algumas semanas a poucos meses, e corresponde a defeitos que já nasceram no lote <Cite id="rel-nist-bathtub" />.
- **Vida útil.** A taxa se estabiliza num patamar aproximadamente constante — é aqui que a maioria dos sistemas passa a maior parte da vida <Cite id="rel-nist-bathtub" />.
- **Desgaste.** Se o produto viver o suficiente, a taxa volta a subir, porque os materiais se degradam <Cite id="rel-nist-bathtub" />.

O gráfico abaixo é um **esquema**, não um conjunto de dados: ele existe para fixar as três regiões na cabeça, não para ser medido.

<ClientOnly>
  <DataChart chart="bathtub" />
</ClientOnly>

### Onde a queima age

A [queima](/empacotamento) existe para atacar a primeira região. Os componentes são submetidos a condições **no nível ou acima do máximo especificado**, com o objetivo de **estressar os defeitos para fora** antes do embarque <Cite id="mil-std-883" />; na produção, isso acontece no componente já montado, tipicamente por **24 a 48 horas** <Cite id="semieng-burnin" />. É uma troca explícita: a queima **reduz o custo de garantia ao custo de algum rendimento** <Cite id="ieee-burnin" />, e ela mesma pode **danificar** dispositivos por fuga térmica, descarga eletrostática ou sobretensão <Cite id="semieng-burnin" />.

O ponto que importa aqui: a queima mexe na **mortalidade infantil**. Ela não faz nada pela região plana nem pela região de desgaste — quem decide a vida longa de um produto é a física que vem a seguir.

## Mecanismos de desgaste

O desgaste de um chip não é fadiga mecânica: é química e física de interface, ocorrendo devagar e de forma **acumulativa**. Cada mecanismo tem um motor físico e uma assinatura que o delata.

| Mecanismo | Motor físico | Assinatura observável | Tecnologia mais afetada |
| --- | --- | --- | --- |
| NBTI / PBTI | Armadilhas de interface geradas sob polarização de porta e temperatura | Deslocamento da tensão de limiar, com recuperação parcial | CMOS de óxido fino (porta) |
| HCI | Portadores quentes perto do dreno, injetados no óxido | Degradação do ganho e da corrente de saturação | nMOS de canal curto |
| TDDB | Acúmulo de defeitos no dielétrico sob campo elétrico | Fuga crescente até a ruptura súbita | Óxido de porta e dielétricos finos |
| Eletromigração | Transferência de momento dos elétrons para os átomos do metal | Vazio (*open*) e montículo (*short*) no fio | Interconexão do BEOL, vias e *bumps* |
| Erros suaves | Deposição de carga por uma partícula energética | Bit invertido de forma transitória, não destrutiva | SRAM, DRAM e lógica |
| ESD / EOS | Descarga eletrostática ou sobretensão elétrica | Ruptura súbita de óxido ou de junção | Entradas e saídas (*I/O*) |

<Cite id="rel-schroder-2003" /> <Cite id="rel-hu-1985" /> <Cite id="rel-mcpherson-2012" /> <Cite id="rel-black-1969" /> <Cite id="rel-baumann-2001" /> <Cite id="voldman-esd" />

### NBTI e PBTI

A instabilidade por temperatura e polarização de porta (*bias temperature instability*) é o desgaste que a indústria passou a medir em cada nó. Sob polarização e temperatura elevadas, formam-se **armadilhas na interface** óxido–silício; elas capturam carga e deslocam a **tensão de limiar**, degradando o transistor <Cite id="rel-schroder-2003" />.

O caso clássico é o do **pMOS** sob porta negativa (NBTI); o espelho no nMOS é o **PBTI**, e os dois entram na qualificação "conforme apropriado" <Cite id="rel-aec-q100" />. A complicação que faz o NBTI ser tão discutido é a **recuperação**: parte do deslocamento desaparece quando o estresse é removido, o que faz o número medido depender de quão rápido se mede <Cite id="rel-schroder-2003" />.

### Portadores quentes

Perto do dreno, o campo elétrico acelera os portadores do canal até energias altas o bastante para **saltarem para dentro do óxido de porta**. Lá eles criam armadilhas, e o transistor perde ganho e corrente aos poucos <Cite id="rel-hu-1985" />. É um mecanismo de **canal curto**, pior em tensões de dreno altas, e é justamente por isso que a qualificação o exige "para todas as tecnologias MOS abaixo de 1 µm" <Cite id="rel-aec-q100" />.

### Ruptura do óxido de porta

O dielétrico de porta não falha de uma vez. Ele **acumula defeitos** sob o campo elétrico até que um **caminho condutor** atravesse a camada de óxido e a porta entre em curto com o canal — a ruptura dielétrica dependente do tempo (*time-dependent dielectric breakdown*, TDDB) <Cite id="rel-mcpherson-2012" />. Como o campo acelera a taxa de geração de defeitos, a vida depende da **tensão**, e a extrapolação de tensão é tão central quanto a de temperatura <Cite id="rel-mcpherson-2012" />.

Foi esse muro que, décadas atrás, forçou o fim do SiO₂ puro como isolante de porta: quando o óxido chegou à casa de **1,2 nm**, a fuga por tunelamento passou a ser inaceitável, e o dielétrico de alta constante (*high-k*) entrou no lugar <Cite id="ecs-sio2-limits" />. É a mesma fronteira que a [fábrica](/na-fab) descreve pelo lado do processo.

### Eletromigração

Nos fios metálicos, os elétrons em movimento transferem momento para os átomos do metal. Com corrente alta e temperatura alta, esse empurrão faz o metal **migrar**: abre-se um **vazio** onde os átomos saíram e cresce um **montículo** onde eles se acumularam. Um vazio vira um fio aberto, um montículo vira um curto com o vizinho <Cite id="rel-black-1969" />.

O tempo até a falha segue a **equação de Black**:

\[ \mathrm{MTTF} = A \cdot J^{-n} \cdot \exp\!\left(\frac{E_a}{k_B T}\right) \]

onde \(J\) é a densidade de corrente e \(T\) é a temperatura <Cite id="rel-black-1969" />. O expoente \(n\) fica tipicamente perto de **2** para o alumínio, e a energia de ativação \(E_a\) depende do metal e do caminho de difusão, na casa de **0,5 a 0,7 eV** para o alumínio e **0,8 a 1,0 eV** para o cobre <Cite id="rel-jep122" />.

Vale desconfiar de qualquer \(n\) ou \(E_a\) apresentado como constante universal: o próprio material de qualificação registra que energias de ativação medidas variam de valores negativos até **1,4 eV**, com **0,7 eV** como valor "típico" apenas por convenção <Cite id="rel-aec-q100" />. O que é robusto é a **direção**: dobrar \(J\) encolhe a vida muito mais que dobrar a temperatura ambiente — e é por isso que a troca do alumínio pelo cobre, em **1997**, foi tão importante <Cite id="ibm-copper" />. A vida útil contra eletromigração do cobre é **mais de duas ordens de grandeza maior** <Cite id="ibm-cu-electroplating" />.

## Quantificar a falha

Para comparar componentes, a indústria precisou de uma unidade comum. É o **FIT** — *failure in time* —, definido como **uma falha por 10⁹ horas-dispositivo**, e cujo cálculo é padronizado pela JEDEC na JESD85A <Cite id="rel-jesd85a" />.

A aritmética é o que torna o número utilizável. Como 10⁹ dividido pela taxa em FIT dá o **MTTF** em horas, um componente de 10 FIT tem MTTF de 10⁸ h <Cite id="rel-jesd85a" />. Convertendo: **100.000 h** são cerca de **11 anos** de operação contínua, e dez anos de calendário somam **87.600 h** (10 × 8.760 h). Escrever a meta em horas e a falha em FIT é o que permite comparar um chip de 1.000 unidades com o parque inteiro de um cliente.

Essas metas variam por mercado. A AEC-Q100 demonstra o método com um perfil automotivo de **15 anos** — **12.000 h** de operação dentro de **131.400 h** de calendário <Cite id="rel-aec-q100" />. O horizonte de vida útil que se assume para um componente costuma ser contado em **uma década** <Cite id="rel-jep122" />; os dois números convivem porque medem coisas diferentes, tempo ligado de um lado e tempo de calendário do outro.

### Teste acelerado

Ninguém pode esperar dez anos. O jeito de medir uma vida longa é **acelerar** o mecanismo e extrapolar de volta com um modelo. Para os mecanismos ativados termicamente, o modelo é **Arrhenius**, com fator de aceleração que depende de \(\exp[-(E_a/k_B)(1/T_u - 1/T_t)]\), onde os índices \(u\) e \(t\) são uso e teste <Cite id="rel-aec-q100" />.

A AEC-Q100 fixa as constantes do exemplo: \(E_a = 0{,}7\) eV e \(k_B = 8{,}61733 \times 10^{-5}\) eV/K, chegando a uma duração de teste de **1.393 h** para o caso demonstrado <Cite id="rel-aec-q100" />. O aviso que acompanha a conta é o que importa: forçar condições além do razoável pode **induzir mecanismos de falha irreais** e destruir a extrapolação <Cite id="rel-aec-q100" />. Acelerar não é exagerar — é escolher um regime onde o *mesmo* mecanismo ainda governa.

## Erros suaves

Há uma classe de falha que não deixa cicatriz. No fim da década de 1970, ficou claro que **partículas alfa** — vindas de traços radioativos nos próprios materiais do encapsulamento — depositavam carga suficiente para **inverter um bit** de uma memória DRAM. O bit voltava a funcionar na próxima escrita: daí o nome **erro suave** (*soft error*) <Cite id="rel-may-woods-1979" />.

Logo depois veio a generalização desconfortável: não era só o encapsulamento. **Nêutrons de raios cósmicos** fazem o mesmo em nível do mar, e a taxa de erro **cresce com a altitude** — o que transformou um problema de material num problema de ambiente <Cite id="rel-ziegler-1979" />. As fontes de radiação relevantes ficaram conhecidas como um conjunto de três <Cite id="rel-baumann-2001" />.

Como a probabilidade cresce com o número de bits expostos, a métrica natural é **FIT por megabit**, não FIT por componente <Cite id="rel-baumann-2001" />. Foi a existência desse piso irredutível de erro que empurrou os códigos corretores de erro (**ECC**, *error-correcting code*) para dentro das memórias e dos controladores: não se pode impedir a partícula, mas se pode detectar e corrigir o bit que ela virou <Cite id="rel-baumann-2001" />.

## Qualificação

"Confiável" não é uma opinião; é um conjunto de ensaios que o fornecedor precisa passar antes de vender. A JEDEC publica os métodos — inclusive como calcular e declarar a taxa de falhas em FIT, na JESD85A <Cite id="rel-jesd85a" /> <Cite id="rel-jep122" />.

O regime **automotivo** é mais duro que o de consumo, e a AEC-Q100 é o documento que o define: componentes que atendem às suas especificações são considerados adequados ao ambiente automotivo severo **sem qualificação adicional em nível de componente** <Cite id="rel-aec-q100" />. O eixo da dureza é a **temperatura de operação**, dividida em graus:

| Grau | Faixa de temperatura ambiente |
| --- | --- |
| **Grau 0** | **−40 °C a +150 °C** |
| Grau 1 | −40 °C a +125 °C |
| Grau 2 | −40 °C a +105 °C |
| Grau 3 | −40 °C a +85 °C |

<Cite id="rel-aec-q100" />

Um teste de vida em operação (**HTOL**) no grau 0 estressa o dispositivo a **+150 °C** por **1.000 h** <Cite id="rel-aec-q100" />. É por isso que o automotivo é outro regime: ele exige que o silício sobreviva a uma janela térmica e a um tempo de missão que o consumidor nunca vê, e a qualificação lista explicitamente os mecanismos que precisam ser cobertos — **eletromigração, TDDB, injeção de portadores quentes, instabilidade de polarização e temperatura e migração por tensão** <Cite id="rel-aec-q100" />.

## Por que isso é uma história de materiais

Vale fechar com o que este capítulo tem em comum com o resto do site: **confiabilidade começa no material, não no desenho**.

- A ruptura do óxido é governada pela **densidade de defeitos** no dielétrico, não pela geometria do circuito <Cite id="rel-mcpherson-2012" />.
- A qualidade da **interface** óxido–silício é o que fez o silício funcionar como semicondutor — e o que o germânio não conseguiu entregar <Cite id="ecs-sio2-limits" />.
- A vida contra eletromigração depende da **pureza e da estrutura** do metal e da barreira que o confina; por isso o cobre só substituiu o alumínio quando veio com uma barreira <Cite id="ibm-cu-electroplating" />.

Um bom projeto **administra** esses mecanismos — escolhe margens, adiciona ECC, dimensiona fios. Mas não os elimina: os materiais é que decidem quais mecanismos existem e a que velocidade eles andam. Do mesmo jeito que o [rendimento](/na-fab) é uma medida de defeitos do processo, a confiabilidade é a medida de como esses mesmos defeitos envelhecem.

<SourceNote :ids="['rel-nist-bathtub', 'mil-std-883', 'semieng-burnin', 'ieee-burnin', 'rel-schroder-2003', 'rel-hu-1985', 'rel-mcpherson-2012', 'rel-black-1969', 'rel-jep122', 'rel-aec-q100', 'rel-jesd85a', 'rel-may-woods-1979', 'rel-ziegler-1979', 'rel-baumann-2001', 'voldman-esd', 'ecs-sio2-limits', 'ibm-cu-electroplating', 'ibm-copper']" />

<SeeAlso :links="[
  { text: 'Empacotamento e teste', href: '/empacotamento', note: 'a queima e o teste final' },
  { text: 'Evolução dos transistores', href: '/transistores', note: 'o que envelhece dentro do die' },
  { text: 'Na fab', href: '/na-fab', note: 'óxido de porta e interconexão de cobre' },
  { text: 'Referências', href: '/referencias', note: 'lista numerada' },
]" />
