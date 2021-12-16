/**
 * CreatedBy:Pravesh
 * Created Date:15-12-2021
 */

// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// database connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to the database successfully..."))
  .catch((err) => console.log(err));

// routes prefix
app.use("/api/post", require("./routes/routes"));

// for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/dist/"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
}

// start server
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
