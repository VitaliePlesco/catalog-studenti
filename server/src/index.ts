import express, { Express, Request, Response, Application } from "express";
import cors from "cors";
import users from "./users.js";

const port = 5000;

const app: Application = express();


const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

app.get("/", (req: Request, res: Response) => {
  res.json(users);
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})