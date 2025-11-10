# Testes E2E com Cypress

## Instalação
```bash
npm install
```

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