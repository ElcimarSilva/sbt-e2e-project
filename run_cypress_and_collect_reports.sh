#!/bin/bash

# ========================================
# Script: run_cypress_and_collect_reports.sh
# Descrição: Executa testes Cypress, copia relatórios e limpa a pasta original,
# mesmo em caso de falha na execução dos testes.
# ========================================

# Configurações iniciais
PROJECT_DIR="$HOME/Desktop/dev/sbt-e2e-project"
REPORTS_DIR="$PROJECT_DIR/reports"
DEST_DIR="$HOME/Desktop/dev/cy-reports/reports_backup_$(date +'%Y%m%d_%H%M%S')"
LOG_FILE="$HOME/Desktop/dev/cy-reports/cypress_run.log"

# Função de log
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Função para registrar erros sem interromper o fluxo
warn() {
    log "⚠️ AVISO: $1"
}

# Início do script
log "=========================================="
log "🚀 Iniciando execução do script Cypress..."
log "=========================================="

# Verifica se o diretório do projeto existe
if [ ! -d "$PROJECT_DIR" ]; then
    log "❌ ERRO: Diretório do projeto não encontrado em $PROJECT_DIR"
    exit 1
fi

# Navega até o diretório do projeto
cd "$PROJECT_DIR" || {
    log "❌ ERRO: Falha ao acessar diretório $PROJECT_DIR"
    exit 1
}

# Executa o comando npm run cy:run (sem interromper o script em caso de falha)
log "▶️ Executando testes Cypress..."
if ! npm run cy:run >> "$LOG_FILE" 2>&1; then
    warn "Falha ao executar 'npm run cy:run'. Verifique o log em $LOG_FILE"
else
    log "✅ Testes Cypress concluídos com sucesso."
fi

# Verifica se a pasta de reports existe
if [ ! -d "$REPORTS_DIR" ]; then
    warn "Pasta de relatórios não encontrada em $REPORTS_DIR — nada a copiar."
else
    # Cria diretório de destino para os relatórios
    log "📁 Criando pasta de backup em: $DEST_DIR"
    mkdir -p "$DEST_DIR" || {
        log "❌ ERRO: Falha ao criar diretório de destino."
        exit 1
    }

    # Copia os relatórios mesmo que contenham falhas
    log "📦 Copiando relatórios para $DEST_DIR..."
    if cp -r "$REPORTS_DIR"/* "$DEST_DIR"/ 2>>"$LOG_FILE"; then
        log "✅ Relatórios copiados com sucesso."
    else
        warn "Erro ao copiar alguns relatórios. Verifique permissões ou logs."
    fi

    # Limpa a pasta de relatórios original
    log "🧹 Limpando pasta de relatórios original..."
    if rm -rf "$REPORTS_DIR"/* 2>>"$LOG_FILE"; then
        log "✅ Pasta de relatórios limpa."
    else
        warn "Falha ao limpar a pasta de relatórios."
    fi
fi

# Fim do script
log "🎉 Processo concluído (com ou sem falhas nos testes)."
log "Relatórios disponíveis em: $DEST_DIR"
log "=========================================="

