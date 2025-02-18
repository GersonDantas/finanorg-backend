# Finanorg API

### Descrição

Uma api para uma aplicação web onde usuários podem cadastrar receitas e despesas, organizá-las em categorias e exportar os dados para análise.

### Fluxos de usuário

- usuário faz login
- usuário criar cadastro
- usuário cadastra uma despesa
- usuário cadastra uma receita
- usuário faz o download para uma planilha
- usuário cria uma categoria de gastos
- usuário cria uma categoria de receita
- usuário cadastra uma descrição do gasto
- usuário cadastra uma descrição do receita

### Requisitos da aplicação

Requisitos da aplicação
Must Have (Obrigatório)
✅ Usuário pode criar um cadastro
✅ Usuário pode fazer login
✅ Usuário pode cadastrar receitas e despesas
✅ Usuário pode organizar receitas e despesas em categorias
✅ Usuário pode exportar os dados para uma planilha

Should Have (Importante, mas não essencial agora)
🔹 Usuário pode cadastrar descrições detalhadas para receitas e despesas
🔹 Usuário pode editar ou excluir lançamentos de receitas e despesas

Could Have (Desejável)
✨ Relatórios visuais com gráficos
✨ Sugestões automáticas de categorias baseadas no histórico do usuário

Won't Have (Fora do escopo por agora)
🚫 Integração com contas bancárias para importar transações automaticamente
🚫 Aplicativo móvel (focaremos primeiro na versão web)


# Estrutura de Pastas - Finanorg API

## src/
### data/
- protocols/
- usecases/

### domain/
- models/
- usecases/

### infra/
- cryptography/
- db/
- validators/

### main/
- adapters/
- config/
- decorators/
- docs/
- factories/
- graphql/
- middlewares/
- routes/
- server.ts

### presentation/
- controllers/
- errors/
- helpers/
- middlewares/
- protocols/

### validation/
- protocols/
- validators/

## tests/
- data/
- domain/
- infra/
- main/
- presentation/
- validation/

## Arquivos na Raiz
- .eslintignore


### REGRA DE NEGOCIO

- Usuário pode criar um cadastro
  - O usuário deve fornecer um nome, email e senha
    - O nome deve ser obrigatório
    - O email deve ser obrigatório
    - O email deve ser único
    - A senha deve ser obrigatória
    - A senha deve ter pelo menos 8 caracteres
    - A senha deve ter pelo menos uma letra maiúscula
    - A senha deve ter pelo menos um número
  - O usuário pode criar um cadastro com email do google
- Usuário pode fazer login
  - O usuário deve fornecer um email e senha
    - O email deve ser obrigatório
    - A senha deve ser obrigatória
    - A senha deve ter pelo menos 8 caracteres
    - A senha deve ter pelo menos uma letra maiúscula
    - A senha deve ter pelo menos um número
  - O usuário pode fazer login com email do google
- Usuário pode cadastrar receitas e despesas
- Usuário pode organizar receitas e despesas em categorias
- Usuário pode exportar os dados para uma planilha

### REGRAS DA IMPLEMENTAÇÃO

- Deve haver uma criptografia de dados
- Todas as entradas de dados devem ser validadas
- Todas as entradas de dados devem ser sanitizadas
- Todas as entradas de dados devem ser normalizadas
- Todas as entradas de dados devem ser formatadas
- Todas as entradas de dados devem ser validadas
- Deve haver testes para todas as entradas de dados
- Deve haver testes para todas as regras de negócio
- Deve haver testes para todas as rotas da API
- Deve haver testes para todas as funcionalidades da aplicação
- Deve haver testes para todas as mensagens de erro da aplicação
- Deve haver testes para todas as mensagens de sucesso da aplicação
- Deve ser implementado a clean architecture com base no arquivo de estrutura de pastas
- Deve ser implementado o SOLID
- Deve ser implementado o DRY
- Deve ser implementado o KISS
- Deve ser implementado o YAGNI
- Deve ser implementado o Single Responsibility Principle
- Deve ser implementado o Open/Closed Principle
- Deve ser implementado o Liskov Substitution Principle
- Deve ser implementado o Interface Segregation Principle
