import { Router } from "express";
import fs from "fs";

const basePath = "./routes";

export default async (app) => {
  await Promise.all(
    fs
      .readdirSync(basePath)
      .filter((routeName) => routeName !== "index.js")
      .map(async (routeName) => {
        try {
          const router = Router();
          const { default: route } = await import(`./${routeName}`);
          route(router);
          app.use(`/${routeName.split(".")[0]}`, router);
        } catch (e) {
          console.log(e);
        }
      })
  );
};
