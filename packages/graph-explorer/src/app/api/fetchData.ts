'use server';

export default async function handler(req, res) {
    try {
        const data = await fetchFromServer(); // Replace with your actual fetch logic
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}