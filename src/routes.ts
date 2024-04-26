import { join } from "path";
import { Router } from "express";

const mainRoutes = Router();

mainRoutes.get("/", async (req, res) => {
  try {
    const html = res.render(join(process.cwd(), "public", "index.html"));
    res.send(html);
  } catch (error: unknown) {}
});

export default mainRoutes;
