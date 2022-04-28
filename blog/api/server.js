import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import db from "./models/index.js";

(async () => {
  const app = express();
  db.sequelize.sync();

  app.use(express.json());
  app.use(cors({ origin: "*" }));

  await routes(app);

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`[SERVER]: On Your local network: http://localhost:${PORT}`);
  });
})();
