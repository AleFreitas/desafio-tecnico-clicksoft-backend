# Desafio Técnico ClickSoft Backend

Bem-vindo ao repositório da minha solução para o desafio técnico da vaga de estágio em desenvolvimento backend da ClickSoft. Aqui você encontrará minha implementação dos requisitos funcionais e regras de negócio definidos para o projeto.

## Preparando o Ambiente

Antes de iniciar o teste da minha solução, é importante garantir que o ambiente esteja configurado corretamente. Siga os passos abaixo para preparar o ambiente:

### Pré-requisitos

1. **Node.js:** Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo e instalá-lo a partir do [site oficial](https://nodejs.org/).

2. **Banco de Dados PostgreSQL:** Tenha uma instância do PostgreSQL configurada e executando. Você pode baixar e instalar o PostgreSQL a partir do [site oficial](https://www.postgresql.org/).

### Configuração do Projeto

1. **Clone o repositório:** Abra o terminal e execute o seguinte comando para clonar o repositório:

   ```sh
   git clone https://github.com/AleFreitas/desafio-tecnico-clicksoft-backend.git
   ```

2. **Acesse o diretório:** Navegue para o diretório do projeto:

   ```sh
   cd desafio-tecnico-clicksoft-backend
   ```

3. **Instale as dependências:** Instale as dependências do projeto executando:

   ```sh
   npm install
   ```

   ou

   ```sh
   yarn install
   ```

4. **Configuração do Banco de Dados:** Edite o arquivo `.env` na raiz do projeto com as configurações do seu banco de dados PostgreSQL conforme o exemplo:

   ```plaintext
   PORT=3333
   HOST=0.0.0.0
   NODE_ENV=development
   APP_KEY=pns6W2FZRecQtlZ1WTvrvRYZHj39sqJj
   DRIVE_DISK=local
   DB_CONNECTION=pg
   PG_HOST=localhost
   PG_PORT=5432
   PG_USER=lucid
   PG_PASSWORD=
   PG_DB_NAME=lucid
   ```

### Executando o Servidor

Com o ambiente configurado, você está pronto para executar o servidor e testar a API. Siga os passos abaixo:

1. **Execute as migrations:** No diretório do projeto e com o .env configurado execute o seguinte comando para executar as migrations:

   ```sh
   node ace migration:run
   ```
   
3. **Execute o servidor:** No diretório do projeto, execute o seguinte comando para iniciar o servidor:

   ```sh
   node ace serve --watch
   ```

4. **Acesse a API:** Abra o navegador ou um cliente de API e acesse `http://localhost:3333/api` para interagir com os endpoints.

Agora você está pronto para testar minha solução e explorar os recursos implementados!

## Testes Automatizados

Implementei alguns testes automatizados utilizando a ferramenta japa do AdonisJs que verificam as funcionalidades do código.

para iniciá-los, crie um .env.test na raiz do projeto e o configure como no .env.example mas com ```NODE_ENV=test```. Depois é só executar o seguinte comando
   ```sh
   node ace test --watch
   ```

o retorno deve ser como o da imagem a seguir

![image](https://github.com/AleFreitas/desafio-tecnico-clicksoft-backend/assets/83618808/16918c27-6172-4c7d-88f5-1911fded8bd9)

## Arquitetura
A arquitetura implementada neste projeto foi a arquitetura de tres camadas adaptada ao contexto do desafio que era de uma api.
Uma camada extra de ORM foi adicionada para desacoplar ainda mais o sistema e isolar as regras de negócio

Uma visão mais geral da arquitetura pode ser encontrada na imagem abaixo:
![image](https://github.com/AleFreitas/desafio-tecnico-clicksoft-backend/assets/83618808/0419a0b2-e7df-4536-a18a-fd9c862ff4a8)

## Banco de Dados

A estrutura do banco de dados utilizada no projeto pode ser visualizada na imagem abaixo:
![image](https://github.com/AleFreitas/desafio-tecnico-clicksoft-backend/assets/83618808/bc114391-e45b-40bd-884e-332e37379542)

## Requisitos Funcionais

Aqui estão os principais requisitos funcionais abordados na minha solução:

- **RF01 - RF08:** Permite o cadastro, edição, exclusão e consulta de alunos e professores, com informações como nome, e-mail, matrícula e data de nascimento.
- **RF09 - RF12:** Permite o cadastro, edição, exclusão e consulta de salas, incluindo número, capacidade de alunos e disponibilidade.
- **RF13:** Permite que professores aloquem alunos em salas, seguindo regras que garantem a integridade e capacidade das salas.
- **RF14:** Permite que professores removam alunos de salas de forma controlada.
- **RF15:** Permite que professores consultem a lista de alunos presentes em uma sala.
- **RF16:** Permite que alunos consultem as salas às quais devem comparecer, incluindo informações dos professores.

## Regras de Negócio

Minha implementação também considerou as seguintes regras de negócio:

- **RN01** : Deve ser coletado do aluno os seguintes dados: Nome, e-mail, matrícula,data de nascimento.
- **RN02** : Deve ser coletado do professor os seguintes dados: Nome, e-mail, matrícula,data de nascimento.
- **RN03** : Deve ser coletado da sala: Número da sala, capacidade de alunos,disponibilidade (Se pode alocar aluno ou não).
- **RN03** : A sala não pode possuir o mesmo aluno mais de uma vez.
- **RN04** : A sala não pode exceder sua capacidade de alunos.
- **RN05** : O professor não poderá alocar um aluno para uma sala que não tenhasido criada por ele.
- **RN06** : Deverá ser retornado: Nome do aluno, array de objetos com nome do professor e o número da sala

## Tecnologias Utilizadas

- Node.js e AdonisJS para o desenvolvimento backend.
- Banco de Dados PostgreSQL para armazenamento persistente.
- Autenticação por API Tokens para controle de acesso seguro.

Estou empolgado em compartilhar minha solução com você e estou aberto a qualquer feedback ou discussão sobre a implementação. Sinta-se à vontade para explorar o código e os endpoints da API!

---

Agradeço a oportunidade de participar deste desafio e estou ansioso para colaborar com a equipe ClickSoft!
