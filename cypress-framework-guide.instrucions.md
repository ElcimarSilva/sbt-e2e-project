# Cypress Framework Guide

Este documento apresenta as diretrizes do projeto de testes end-to-end utilizando Cypress. Ele busca consolidar a arquitetura, padrões, convenções e pipelines que sustentam a automação de testes.

## Architecture Overview
Neste projeto, a automação é estruturada em uma hierarquia clara de pastas, separando testes por domínio (home, news, teams etc.) e por tipo (web e mobile). A base do framework é o Cypress com JavaScript/Node.js, utilizando comandos personalizados, páginas e elementos para manter o código organizado e reutilizável.

## Key Components
- **`cypress/e2e` e `cypress/mobile`**: Localização dos testes por categorias e device.
- **`cypress/support`**: Contém comandos customizados (`commands.js`, `api-commands.js`), configurações (`e2e.js`), constantes e utilitários.
- **`pages` & `elements`**: Implementação do Page Object Model para abstrair interações com a interface.
- **Config files**: `cypress.config.js`, `mobile.config.js` e variáveis de ambiente em `cypress.env.json`.

## Critical Development Patterns
- Uso extensivo de comandos customizados para encapsular fluxos repetitivos.
- Page Object Model para separar lógica de localização de elementos da lógica de teste.
- Estrutura de pastas refletindo a aplicação para facilitar navegação.
- Versionamento e revisões com Git, integração contínua e pipelines automatizados para qualidade.

## Page Object Model Implementation
Cada página da aplicação possui um arquivo em `cypress/support/pages` que expõe funções para ações e validações. Os seletores estão definidos em `cypress/support/elements`. Os testes importam as classes de página para realizar passos legíveis e manuteníveis.

## API Testing Architecture
Os testes de API estão localizados em `cypress/e2e/api` e usam comandos personalizados definidos em `cypress/support/api/api-commands.js` para enviar requisições. A estrutura permite reutilizar configurações e cabeçalhos comuns.

## Test Organization Conventions
- Nomenclatura `smoke-*.cy.js` para testes de fumaça.
- Pastas por recurso (`home`, `news`, `teams`, etc.).
- Uso de subpastas `api` para testes de serviço.
- Separação entre `e2e` e `mobile` para distintos targets.

## Running the Complete Test Suite
Execute `npx cypress run` ou use o script descrito no `package.json`. Para mobile, utilize `npx cypress run --config-file mobile.config.js`.

## Framework Setup (for new projects)
1. Instalar Cypress (`npm install cypress --save-dev`).
2. Estruturar pastas conforme exemplo do projeto.
3. Criar `commands.js`, `e2e.js`, páginas e elementos base.
4. Configurar `cypress.config.js` e `cypress.env.json` com variáveis de ambiente.
5. Adicionar dependências de relatório e qualidade no `package.json`.

## Configuration Architecture
Configurações são centralizadas em `cypress.config.js` e `mobile.config.js`, com sobreposição de variáveis via `cypress.env.json`. As credenciais sensíveis são mantidas fora do repositório e injetadas via ambiente.

## Reporting Pipeline
O pipeline coleta relatórios do Mochawesome (`mochawesome-report/`) e exporta para `reports/`. Scripts no `package.json` podem gerar `xunit.xml` para integração com CI/CD.

## Code Quality Pipeline
Integração com linters (ESLint) e formatação (Prettier) definida no `package.json`. Executar pré-commit hooks (`husky`, `lint-staged`) para garantir padrões antes de commits.

## Utility Functions
Funções utilitárias são armazenadas em `cypress/support/constants/utils.js`. Exemplos incluem geração de dados aleatórios e manipulação de datas.
