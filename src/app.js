import express from "express";
import cors from "cors";
import helmet from "helmet";
import { publicLimiter } from "./middleware/rateLimit.js";
import { waitlistRouter } from "./routes/waitlist.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
      credentials: true
    })
  );

  app.use(express.json({ limit: "200kb" }));

  // Public rate limit (covers /api)
  app.use("/api", publicLimiter);

  app.get("/", (req, res) => res.json({ ok: true, name: "waitlist-api-starter" }));
  app.use("/api/waitlist", waitlistRouter);

  // 404
  app.use((req, res) => res.status(404).json({ ok: false, error: "Not found" }));

  return app;
}
