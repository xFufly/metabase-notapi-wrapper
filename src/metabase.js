import config from "../config.json" with { type: "json" };

const url = config["dashboard-url"] + '/api/dataset';

export default async function executeQuery(query) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/json',
                'origin': 'https://dashboard.wikicampers.fr',
                'referer': 'https://dashboard.wikicampers.fr/question',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
                // auth cookies (Metabase & Cloudflare)
                'cookie': config["cookie"]
            },
            body: JSON.stringify({
                database: 2,
                type: "native",
                native: {
                    "template-tags": {},
                    query: query
                },
                parameters: []
            })
        };
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de l\'appel API :', error);
    }
}