import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import movieRoute from "./routes/movie.js";
import tvRoute from "./routes/tv.js";

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movie", movieRoute);
app.use("/api/tv", tvRoute);

app.listen(5000, () => {
    console.log("Server is running");
});