import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// === API: получить info про игры ===
app.get("/api/games", async (req, res) => {
  try {
    const ids = req.query.universeIds;
    if (!ids) return res.json({ data: [] });

    const url =
      "https://games.roblox.com/v1/games?universeIds=" + ids;

    const r = await fetch(url);
    const data = await r.json();
    res.json({ data: data.data });
  } catch (err) {
    res.status(500).json({ error: "API error" });
  }
});

// === API: получить иконки игр ===
app.get("/api/game-icons", async (req, res) => {
  try {
    const ids = req.query.universeIds;
    if (!ids) return res.json({ data: [] });

    const url =
      "https://thumbnails.roblox.com/v1/games/icons?universeIds=" +
      ids +
      "&size=256x256&format=Png&isCircular=false";

    const r = await fetch(url);
    const data = await r.json();
    res.json({ data: data.data });
  } catch (err) {
    res.status(500).json({ error: "API error" });
  }
});

app.get("/", (req, res) => {
  res.send("Duck Places Backend OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend running on port", PORT));
