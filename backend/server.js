import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "*", // Allow any origin for now, but this can be tightened.
    methods: ["GET", "POST", "OPTIONS"], // Ensure OPTIONS method is allowed (preflight request)
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const EBAY_TOKEN = process.env.EBAY_TOKEN;

app.get("/api/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await fetch(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
        query
      )}&limit=8`,
      {
        headers: {
          Authorization: `Bearer ${EBAY_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // Log the detailed error from eBay's response
      const errorData = await response.json();
      console.error("eBay API Error:", errorData);
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from eBay API:", error);
    res.status(500).json({ error: "Failed to fetch from eBay" });
  }
});

app.listen(5000, () => console.log("✅ Sandbox proxy running on port 5000"));
