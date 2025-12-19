import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app.js";
import { connectDB } from "./db.js";

const PORT = process.env.PORT || 3001;

async function main() {
  await connectDB(process.env.MONGODB_URI);

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
