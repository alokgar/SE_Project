const express = require("express");
const connectDB = require("./config/db");
const config = require("config");
const path = require("path");
let mongoose = require("mongoose");
const app = express();
let morgan = require("morgan");
let port = 5000;

//connect Database
//db options

let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
};

//db connection
connectDB();

if (process.env.NODE_ENV === "production") {
  // Set Static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

//don't show the log when it is test
if (config.util.getEnv("NODE_ENV") !== "test") {
  //use morgan to log at command line
  app.use(morgan("combined")); //'combined' outputs the Apache style LOGs
}

//Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/products", require("./routes/api/product"));
app.use("/api/category", require("./routes/api/category"));
app.use("/api/supplier", require("./routes/api/supplier"));
app.use("/api/raw_material", require("./routes/api/raw_material"));
app.use("/api/size", require("./routes/api/size"));
app.use("/api/stock", require("./routes/api/stock"));
app.use("/api/customer", require("./routes/api/customer"));
app.use("/api/order", require("./routes/api/order"));
app.use("/api/feedback", require("./routes/api/feedback"));
app.use("/api/payment", require("./routes/api/payment"));
app.use("/api/production_details", require("./routes/api/production_details"));
app.use("/api/sales", require("./routes/api/sales"));

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;
