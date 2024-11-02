const express = require("express");
const bodyParser = require("body-parser");
const { scrapeQuotes } = require("./scraper"); 
const { sendEmail } = require("./emailService"); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/scrape-and-send", async (req, res) => {
    try {
        const quotes = await scrapeQuotes();
        const formattedContent = quotes
            .map((quote) => `"${quote.text}" - ${quote.author}`)
            .join("\n");

        await sendEmail("destinatario@example.com", "Citações do Dia", formattedContent);
        res.status(200).send("Citações enviadas por e-mail com sucesso!");
    } catch (error) {
        console.error("Erro ao processar:", error);
        res.status(500).send("Erro ao fazer o scraping e enviar o e-mail.");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
