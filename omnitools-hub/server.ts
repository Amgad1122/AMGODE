import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Force robots.txt, sitemap.xml, and google-verification file to serve with explicit headers
  app.get("/sitemap.xml", (req, res) => {
    res.header("Content-Type", "application/xml; charset=utf-8");
    res.sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
  });

  app.get("/robots.txt", (req, res) => {
    res.header("Content-Type", "text/plain; charset=utf-8");
    res.sendFile(path.join(process.cwd(), "public", "robots.txt"));
  });

  app.get("/googleaf1892afb5f586cd.html", (req, res) => {
    res.header("Content-Type", "text/html; charset=utf-8");
    res.sendFile(path.join(process.cwd(), "public", "googleaf1892afb5f586cd.html"));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
