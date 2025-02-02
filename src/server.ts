import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
