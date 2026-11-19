import process from "node:process";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/request-list?subscription-key=${encodeURIComponent(process.env.API_SUBSCRIPTION_KEY)}`,
        );

        if (!response.ok) {
            throw new Error(`External API returned ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Failed to fetch certificate requests:", error);
        return res.status(502).json({
            error: "Unable to fetch certificate requests.",
        });
    }
}
