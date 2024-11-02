const axios = require('axios'); 
const cheerio = require('cheerio'); 

async function scrapeQuotes() {
    try {
        const { data } = await axios.get('URL_DA_PAGINA_DE_CITACOES'); 
        const $ = cheerio.load(data);
        const quotes = [];

        $('.seletor-de-citacoes').each((index, element) => { 
            const quoteText = $(element).find('.seletor-do-texto').text().trim();
            const quoteAuthor = $(element).find('.seletor-do-autor').text().trim();
            quotes.push({ text: quoteText, author: quoteAuthor });
        });

        return quotes;
    } catch (error) {
        console.error('Erro ao fazer scraping:', error);
        throw error;
    }
}


module.exports = { scrapeQuotes };
