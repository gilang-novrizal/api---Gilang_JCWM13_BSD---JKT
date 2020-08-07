const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Ujian Backend API");
});

const database = require("./database");
database.connect((err) => {
  if (err) {
    return console.error("error connecting : " + err.stack);
  }
  console.log("connected as id : " + database.threadId);
});

const { userRouter, prodCatRouter, productRouter } = require("./router");
app.use("/api", userRouter);
app.use("/api", prodCatRouter);
app.use("/api", productRouter);

const PORT = 2000;
app.listen(PORT, () => console.log(`Server is running at port : ${PORT}`));
