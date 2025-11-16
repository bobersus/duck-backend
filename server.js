import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

// Хелпер: прокси GET запроса
async function proxy(url, res) {
  try {
    const r = await fetch(url);
    const body = await r.text();
    res.status(r.status);
    res.set("Content-Type", r.headers.get("content-type") || "application/json");
    res.send(body);
  } catch (e) {
    console.error("Proxy error:", url, e);
    res.status(500).json({ error: "Proxy error" });
  }
}

// Прокси на Roblox API
app.get("/api/games", async (req, res) => {
  const ids = req.query.universeIds;
  if (!ids) return res.status(400).json({ error: "Missing universeIds" });
  await proxy(
    `https://games.roblox.com/v1/games?universeIds=${ids}`, 
    res
  );
});

app.get("/api/game-icons", async (req, res) => {
  const ids = req.query.universeIds;
  if (!ids) return res.status(400).json({ error: "Missing universeIds" });
  await proxy(
    `https://thumbnails.roblox.com/v1/games/icons?universeIds=${ids}&size=256x256&format=Png&isCircular=false`,
    res
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

document.getElementById("copyDiscord").addEventListener("click", () => {
  const tag = document.getElementById("discordTag").textContent;
  navigator.clipboard.writeText(tag);

  const feedback = document.getElementById("copyFeedback");
  feedback.classList.add("visible");

  setTimeout(() => {
    feedback.classList.remove("visible");
  }, 1200);
});