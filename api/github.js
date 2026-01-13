export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  // 1. Security Check: Ensure Token exists in Vercel Settings
  if (!GITHUB_TOKEN) {
    return res
      .status(500)
      .json({ error: "Server Error: GITHUB_TOKEN is not configured." });
  }

  // 2. Get the requested path from the frontend (e.g., "users/rootLocalGhost")
  const { path } = req.query;

  if (!path) {
    return res
      .status(400)
      .json({ error: "Bad Request: No API path provided." });
  }

  const url = `https://api.github.com/${path}`;

  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${GITHUB_TOKEN}`, // This is where the magic happens
  };

  try {
    const response = await fetch(url, { headers });

    // 3. Handle GitHub API Errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: `GitHub API Error: ${response.status}`,
        details: errorData,
      });
    }

    const data = await response.json();

    // 4. Cache Strategy (Important for Serverless)
    // Cache successfully for 1 hour (3600s) to prevent hitting GitHub rate limits
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error: Failed to fetch data." });
  }
}
