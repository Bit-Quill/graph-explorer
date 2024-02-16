
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    if (!req.body.query) {
        return res.status(400).json({ error: "[Proxy]SPARQL: Query not provided" });
    }

    const rawUrl = `${req.headers["graph-db-connection-url"]}/sparql`;
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `query=${encodeURIComponent(req.body.query)}`,
    };
    const isIamEnabled = !!req.headers["aws-neptune-region"];
    const region = isIamEnabled ? req.headers["aws-neptune-region"] : "";

    await fetchData(req, res, rawUrl, requestOptions, isIamEnabled, region);
}