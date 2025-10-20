@echo off
:: ========================================
:: Script: run_cypress_and_collect_reports.bat
:: Descrição: Executa testes Cypress, copia relatórios e limpa a pasta original,
:: mesmo em caso de falha na execução dos testes.
:: ========================================

setlocal enabledelayedexpansion

:: === Configurações iniciais ===
set "C:\Users\elcim\Área de Trabalho\dev\sbt-e2e-project"
set "C:\Users\elcim\Área de Trabalho\dev\sbt-e2e-project\reports"
set "C:\Users\elcim\Área de Trabalho\dev\cy-reports\reports_backup_%DATE:~10,4%%DATE:~7,2%%DATE:~4,2%_%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%"
set "C:\Users\elcim\Área de Trabalho\dev\\dev\cy-reports\cypress_run.log"

:: === Função de log ===
echo ========================================== >> "%LOG_FILE%"
echo [%date% %time%] 🚀 Iniciando execução do script Cypress... >> "%LOG_FILE%"
echo ========================================== >> "%LOG_FILE%"

echo.
echo Executando script Cypress...

:: Verifica se diretório existe
if not exist "%PROJECT_DIR%" (
    echo [%date% %time%] ❌ ERRO: Diretório do projeto não encontrado em %PROJECT_DIR% >> "%LOG_FILE%"
    echo ❌ ERRO: Diretório não encontrado.
    exit /b 1
)

:: Vai até o diretório
cd /d "%PROJECT_DIR%" || (
    echo [%date% %time%] ❌ ERRO: Falha ao acessar diretório %PROJECT_DIR% >> "%LOG_FILE%"
    exit /b 1
)

:: Executa o comando npm run cy:run
echo [%date% %time%] ▶️ Executando testes Cypress... >> "%LOG_FILE%"
call npm run cy:run >> "%LOG_FILE%" 2>&1
if errorlevel 1 (
    echo [%date% %time%] ⚠️ AVISO: Falha ao executar 'npm run cy:run'. Verifique o log. >> "%LOG_FILE%"
    echo ⚠️ Testes Cypress falharam. Continuando o fluxo...
) else (
    echo [%date% %time%] ✅ Testes Cypress concluídos com sucesso. >> "%LOG_FILE%"
)

:: Cria pasta de destino
if not exist "%REPORTS_DIR%" (
    echo [%date% %time%] ⚠️ AVISO: Pasta de relatórios não encontrada em %REPORTS_DIR%. >> "%LOG_FILE%"
    echo ⚠️ Nenhum relatório encontrado.
    exit /b 0
)

echo [%date% %time%] 📁 Criando pasta de backup em: %DEST_DIR% >> "%LOG_FILE%"
mkdir "%DEST_DIR%" >nul 2>&1

:: Copia relatórios
echo [%date% %time%] 📦 Copiando relatórios... >> "%LOG_FILE%"
xcopy "%REPORTS_DIR%\*" "%DEST_DIR%\" /E /I /Y >nul
if errorlevel 1 (
    echo [%date% %time%] ⚠️ AVISO: Erro ao copiar relatórios. >> "%LOG_FILE%"
) else (
    echo [%date% %time%] ✅ Relatórios copiados com sucesso. >> "%LOG_FILE%"
)

:: Limpa pasta de relatórios original
echo [%date% %time%] 🧹 Limpando pasta de relatórios original... >> "%LOG_FILE%"
del /q "%REPORTS_DIR%\*" >nul 2>&1
for /d %%i in ("%REPORTS_DIR%\*") do rd /s /q "%%i"

echo [%date% %time%] ✅ Pasta de relatórios limpa. >> "%LOG_FILE%"

:: Fim
echo [%date% %time%] 🎉 Processo concluído (com ou sem falhas nos testes). >> "%LOG_FILE%"
echo [%date% %time%] Relatórios disponíveis em: %DEST_DIR% >> "%LOG_FILE%"
echo ========================================== >> "%LOG_FILE%"

echo.
echo ✅ Processo finalizado. Relatórios em:
echo %DEST_DIR%

pause
endlocal
