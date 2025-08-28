import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Parse the incoming JSON payload
      const payload = req.body;

      // Validate the payload structure (optional, based on your requirements)
      if (!payload || !payload.run_id || !payload.result) {
        return res.status(400).json({ error: "Invalid payload structure" });
      }

      // Process the payload (if needed) and send it to the UI
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ message: "Payload received successfully", data: payload });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
