import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const guid = uuidv4();
  const cookieValue = uuidv4();
  res.setHeader("Custom-Header", `value=${cookieValue}`);
  res.setHeader("Set-Cookie", `token=${cookieValue}; Path=/`);
  res.status(200).json({ guid, message: "Login successful" });
}
