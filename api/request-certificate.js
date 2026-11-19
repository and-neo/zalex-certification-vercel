import process from "node:process";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/request-certificate?subscription-key=${encodeURIComponent(process.env.API_SUBSCRIPTION_KEY)}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req.body),
            },
        );

        if (!response.ok) {
            throw new Error(`External API returned ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Failed to submit certificate request:", error);
        return res.status(502).json({
            error: "Unable to submit certificate request.",
        });
    }
}
