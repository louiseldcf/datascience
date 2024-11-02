const { scrapeQuotes } = require("./services/scraper");
const { sendEmail } = require("./services/emailService");

async function main() {
  try {
    const quotes = await scrapeQuotes();
    const formattedContent = quotes
      .map((quote) => `"${quote.text}" - ${quote.author}`)
      .join("\n");

    await sendEmail("destinatario@example.com", "Citações do Dia", formattedContent);
  } catch (error) {
    console.error("Erro no processo:", error);
  }
}

main();
