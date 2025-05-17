require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");


const PORT = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URI;

const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("MongoDB connected..");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error", err);
  });

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.listen(PORT, (req, res) => {
  console.log(`app is running at ${PORT}`);
});
