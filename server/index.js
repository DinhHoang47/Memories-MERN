import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import { auth } from "./middlewares/auth.js";
import { getLikedPosts, getMyPosts } from "./controllers/post.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to memories api");
});
app.use("/posts", postRouter);
app.get("/myposts", auth, getMyPosts);
app.get("/likedposts", auth, getLikedPosts);
app.use("/user", userRouter);

// connect app to mongodb

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port:${PORT}`))
  )
  .catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false);
