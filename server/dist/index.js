import express from "express";
import cors from "cors";
import users from "./users.js";
const port = 5000;
const app = express();
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins
};
app.use(cors(options));
app.get("/", (req, res) => {
    res.json(users);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map