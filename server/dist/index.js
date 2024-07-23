import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import disciplineRoutes from "./routes/disciplineRoutes.js";
const port = 5000;
const app = express();
const allowedOrigins = ['http://localhost:3000', 'https://catalog-studenti-1.onrender.com', 'https://catalog-studenti-uskl.onrender.com'];
const options = {
    origin: allowedOrigins
};
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use('/api/students', studentRoutes);
app.use("/api/disciplines", disciplineRoutes);
app.get("/", (req, res) => {
    res.json({ message: "message" });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
