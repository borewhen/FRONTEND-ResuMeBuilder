import type { NextApiRequest, NextApiResponse } from "next";

// This creates a frontend endpoint that calls the backend login endpoint, so the cookie is on the same domain as the frontend

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Allow only POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    // Forward the login request to your backend login endpoint
    const apiRes = await fetch(
      "https://backend-resumebuilder-production.up.railway.app/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
        credentials: "include",
      }
    );

    // Capture the Set‑Cookie header from the backend
    const setCookie = apiRes.headers.get("set-cookie");
    if (setCookie) {
      // Stream the Set‑Cookie header back in the response
      res.setHeader("Set-Cookie", setCookie);
    }

    // Stream the backend response back to the client
    const json = await apiRes.json();
    res.status(apiRes.status).json(json);
  } catch (error: any) {
    console.error("Error in login API proxy:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
} 