import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

const apiKey = '5be9fbee42c89b202cdf33883e5efe31ebf549adb2a1f5e47ee06a9aa0619695';

app.use(cors()); // Adicione esta linha para permitir solicitações de qualquer origem
app.use(express.json());

app.get('/search', async (req, res) => {
    const searchTerm = req.query.q;
    const numResults = req.query.num || 10;

    try {
        const response = await fetch(`https://serpapi.com/search?engine=google_scholar&q=${encodeURIComponent(searchTerm)}&num=${numResults}&api_key=${apiKey}&lr=lang_pt`);
        const data = await response.json();
        console.log('Resposta da API do Google Scholar:', data);
        res.json(data);
    } catch (error) {
        console.error('Erro ao realizar pesquisa no Google Scholar:', error);
        res.status(500).send('Erro interno ao realizar pesquisa no Google Scholar');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});