# Desafio GreenAcesso

Olá! Estou muito feliz em participar do processo seletivo da empresa e este é minha resolução do problema que foi proposto: https://jumbled-smoke-7ef.notion.site/Desafio-T-cnico-Backend-NodeJS-fd6b6af685a5460794ffd45622f27dad

Procurei utilizar os conceitos de **código limpo**, **arquitetura limpa** e respeitar os conceitos **SOLID**. Por isso, os schemas do *Sequelize* foram usados como estruturas do *DAO*, não misturando o *model* com esta biblioteca, e as operações com banco de dados foram separadas em *casos de uso*. Foram criadas exceções personalizadas para todos os casos. Utilizei o *yarn*, mas creio que tudo funcionará com *npm* também.

Testei meu projeto em todos os tópicos do desafio e está funcionando. Caso meu projeto não execute, ou vocês tenham algum problema em testar qualquer parte dele, peço que vocês entrem em contato comigo a hora que for:
 - Celular/Whatsapp: (16) 99123-9505;
 - E-mail: juniorbocelli@gmail.com;
 - LinkedIn: https://www.linkedin.com/in/jose-bocelli/

# Arquivos

Em primeiro lugar, vou passar alguns arquivos importantes:
 - APIs do Postman: https://drive.google.com/file/d/1JlJJtwUNgMSnuWMfMKBd1bpI4CGT09_G/view?usp=sharing
 - Arquivo CSV usado: https://drive.google.com/file/d/1NIViGz6ZEanONGK75wKrYvA6FMh2IfU0/view?usp=sharing
 - PDF usado: https://drive.google.com/file/d/1lyehjfvbRjz7rfxGaY_9KBOwggLX2evp/view?usp=sharing

# Banco de Dados

Utilizei o **PostgreSQL** junto com o ORM **Sequelize**. Os dados de conexão estão no arquivo *.env.dev*. Para facilitar eu criei um arquivo (*_start_postgres_container.sh*) que, quando executado, ele faz o download do container em **Docker** e inicia a execução.

# Execução

Havia feito uma imagem em container em Docker para rodar o servidor também, mas como não tive tempo de testar exaustivamente, achei melhor remover os arquivos. Portanto, para executar o projeto em modo desenvolvedor, basta usar `yarn dev` para iniciar (claro que também funciona com *npm*.

> Por ser uma versão de desenvolvimento, toda a vez que o banco de dados
> e o projeto são iniciados, **as tabelas do banco são recriadas** e **todos
> os arquivos PDF enviados são deletados**!

# Atividades

Vamos passar rapidamente pelas as atividades propostas, para que eu explique alguma particularidade quando houver. Procurei usar o **nome das variáveis em inglês sempre que possível** (somente o cabeçalho da tabela CSV foi mantida em português).

## Atividade 1 e 2

O arquivo enviado só é aceito quando tem a extensão correta, as colunas corretas e o número de boletos (linhas) igual ao número de lotes cadastrados no sistema. 

É possível enviar vários arquivos e enviar várias vezes. Então, quando é requisitado o relatório (Atividade 5), esses envios de boletos aparecem separados de acordo com a variável do relatório (report=0, report=1 e etc).


## Atividade 3

Há verificações quando envia o arquivo PDF:

 - Verifica se existem boletos cadastrados;
 - Verifica se o número de páginas é igual ao número de lotes;
 - Verifica se existem boletos no banco de dados que ainda não possuem PDF.

## Atividade 4

Quando são usados os filtros, eles são criados de acordo com os parâmetros enviados, portanto é possível enviar filtro nenhum `GET /invoice` , todos os filtros GET `/invoice?name=JOS&initial_value=0&final_value=500&id_lot=1` e filtros parciais com qualquer combinação por exemplo, `GET /invoice?name=JOS&&final_value=500`. Repare que **todos os parâmetros do filtro estão em inglês**!

## Atividade 5

O PDF baixado vem estilizado usando CSS em uma folha A4 com algumas estilizações também na tabela. Não deu para caprichar muito por falta de tempo.

Como já foi citado anteriormente, o parâmetro relatório (report), manda os dados de determinado envio de CSV. Por exemplo, `POST / invoice/upload_pdf?report=0` monta o PDF com o primeiro envio, **POST / invoice/upload_pdf?report=1** o segundo e assim por diante.