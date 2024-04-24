import express from "express";
import { join } from "path";

const app = express();
app.use(express.static(join(process.cwd(), "dist", "public")));

app.get("/", async (req, res) => {
  try {
    // res.sendFile(join(process.cwd(), "public", "index.html"));
    const html = res.render(join(process.cwd(), "public", "index.html"))
    res.send(html)
  } catch (error: unknown) {}
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
