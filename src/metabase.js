import path from 'path';
const configPath = path.join(process.cwd(), 'config.json');

const { default: config } = await import(`file://${configPath}`, {
  with: { type: "json" }
});

const queryUrl = config["dashboard-url"] + "/api/dataset";

export async function executeQuery(query) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/json',
                'origin': config["dashboard-url"],
                'referer': config["dashboard-url"] + '/question',
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
        const response = await fetch(queryUrl, options);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de l\'appel API :', error);
    }
}

/*
 * id : Use dev tools to get id (url/api/database/THIS_NUMBER/metadata) when learning from data, selecting a db.
 */
export async function getDBStructure(dbid) {
    const structUrl = config["dashboard-url"] + "/api/database/" + dbid + "/metadata";
    console.log(structUrl);

    try {
        const options = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/json',
                'origin': config["dashboard-url"],
                'referer': config["dashboard-url"] + "/reference/databases/" + dbid,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
                // auth cookies (Metabase & Cloudflare)
                'cookie': config["cookie"]
            }
        };
        const response = await fetch(structUrl, options);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de l\'appel API :', error);
    }
}

export default {
    executeQuery,
    getDBStructure
}