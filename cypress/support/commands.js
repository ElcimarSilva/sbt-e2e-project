import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";

// ======= Função para enviar HTML ao Discord =======
async function sendHtmlReportToDiscord(filePath, message = "📊 Relatório de testes Cypress", DISCORD_WEBHOOK_URL) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Arquivo não encontrado: ${filePath}`);
      return;
    }

    const form = new FormData();
    form.append("content", message);
    form.append("file", fs.createReadStream(filePath), "report.html");

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      body: form,
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar: ${response.status} ${response.statusText}`);
    }

    console.log("✅ Relatório HTML enviado com sucesso ao Discord!");
  } catch (err) {
    console.error("❌ Falha ao enviar relatório:", err);
  }
}

module.exports = { sendHtmlReportToDiscord };