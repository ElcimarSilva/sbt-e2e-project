# Testes E2E com Cypress

## Instalação
```bash
npm install
```

## Configuração de Variáveis de Ambiente

### Desenvolvimento Local

1. Copie o arquivo de exemplo:
```bash
cp cypress.env.json.example cypress.env.json
```

2. Edite o arquivo `cypress.env.json` com suas credenciais:
```json
{
  "DISCORD_WEBHOOK_URL": "seu-webhook-aqui",
  "CYPRESS_CMS_API_TOKEN": "seu-token-cms-aqui",
  "CYPRESS_CMS_BASE_URL": "",
  "CYPRESS_AUTH_BASE_URL": "",
  "CYPRESS_THE_VOICE_BASE_URL": ""
}
```

**⚠️ Importante:** O arquivo `cypress.env.json` está no `.gitignore` e não deve ser commitado no repositório.

### GitHub Actions (CI/CD)

No GitHub Actions, as variáveis de ambiente devem ser configuradas como **Secrets** do repositório e passadas com o prefixo `CYPRESS_`.

#### Configuração dos Secrets no GitHub

1. Vá em **Settings** → **Secrets and variables** → **Actions**
2. Adicione os seguintes secrets:
   - `CYPRESS_DISCORD_WEBHOOK_URL`
   - `CYPRESS_CYPRESS_CMS_API_TOKEN`
   - `CYPRESS_CYPRESS_CMS_BASE_URL`
   - `CYPRESS_CYPRESS_AUTH_BASE_URL`

#### Exemplo de Workflow do GitHub Actions

```yaml
name: Cypress Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run Cypress tests
        run: npm run cy:run
        env:
          CYPRESS_DISCORD_WEBHOOK_URL: ${{ secrets.CYPRESS_DISCORD_WEBHOOK_URL }}
          CYPRESS_CYPRESS_CMS_API_TOKEN: ${{ secrets.CYPRESS_CYPRESS_CMS_API_TOKEN }}
          CYPRESS_CYPRESS_CMS_BASE_URL: ${{ secrets.CYPRESS_CYPRESS_CMS_BASE_URL }}
          CYPRESS_CYPRESS_AUTH_BASE_URL: ${{ secrets.CYPRESS_CYPRESS_AUTH_BASE_URL }}
          CYPRESS_CYPRESS_THE_VOICE_BASE_URL: ${{ secrets.CYPRESS_CYPRESS_THE_VOICE_BASE_URL }}
```

#### Como Funciona

- **Desenvolvimento:** As variáveis são carregadas do arquivo `cypress.env.json`
- **GitHub Actions:** As variáveis são carregadas das variáveis de ambiente do sistema (com prefixo `CYPRESS_`)
- **Prioridade:** Variáveis de ambiente do sistema têm prioridade sobre o arquivo `cypress.env.json`
- **Validação:** O sistema valida se as variáveis obrigatórias estão configuradas e exibe mensagens de erro claras caso não estejam

## Scripts
- `npm run cy:open`: abre o Cypress em modo interativo
- `npm run cy:run`: executa headless
- `npm run cy:run:headed`: executa no Chrome com UI
- `npm run cy:run:desktop`: executa com viewport 1366x768
- `npm run cy:run:mobile`: executa com viewport 390x844 e userAgent mobile

## Relatórios
- Relatórios `mochawesome` em `reports/mocha`. Ao final da execução, é gerado um `mochawesome.json` mesclado.
- Vídeos em `reports/videos` e screenshots em `reports/screenshots`.


## Estrutura
```
cypress/
  e2e/
    exemplo_desktop.cy.js
    exemplo_mobile.cy.js
  fixtures/
  support/
    commands.js
    /pages
    /elements
    e2e.js
cypress.config.js
```

## Boas práticas incluídas
- Separação de testes por contexto/pasta (desktop/mobile)
- Cada teste identificado por pagina e tipo
- `viewport` configurável por config
- Reporter consolidado (mochawesome) + vídeos/prints habilitados
- Escrita de código em inglês e escrita apenas dos casos de testes em PT-BR

## Dicas
- Use `data-*` selectors para estabilidade dos testes.
- Utilize `cy.session` para autenticações repetíveis (Cypress 12+).
- Evite `wait` fixo; prefira asserções encadeadas.
EOF

## Old Scripts
- "report:merge": "mochawesome-merge reports/mocha/*.json > reports/mocha/mochawesome.json",
- "report:html": "marge reports/mocha/mochawesome.json -f index -o reports/mocha",
- "report:all": "npm run report:merge && npm run report:html"