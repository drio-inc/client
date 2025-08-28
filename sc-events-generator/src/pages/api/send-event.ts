import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { eventName, eventData } = req.body;

    if (!eventName || !eventData) {
      return res.status(400).json({ error: "Missing eventName or eventData" });
    }

    // Here you would typically send the event to your server or an external service
    // For demonstration, we'll just log it
    console.log(`Event Name: ${eventName}`, `Event Data:`, eventData);

    return res.status(200).json({ message: "Event sent successfully" });
  }
}
