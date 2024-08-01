import express, { Express, Request, Response, Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import disciplineRoutes from "./routes/disciplineRoutes.js";
import markRoutes from "./routes/markRoutes.js";
import studentDisciplineRoutes from "./routes/studentDisciplineRoutes.js"
import { protect } from "./middleware/authMiddleware.js";


const port = 5000;

const app: Application = express();


const allowedOrigins = ['http://localhost:3000', 'https://catalog-studenti-1.onrender.com', 'https://catalog-studenti-uskl.onrender.com'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],

};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use('/api/students', studentRoutes);
app.use("/api/disciplines", disciplineRoutes);
app.use("/api/marks", markRoutes);
app.use("/api/student-discipline", studentDisciplineRoutes);

app.get("/", (req, res) => {
  res.json({ message: "running" });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})



