require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const chatRoutes = require("./routes/api/chat");
const emailRoutes = require("./routes/api/email");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const db = process.env.MONGODB_URI;

// mongoose
//   .connect(db)
//   .then(() => console.log("MongoDB Connected..."))
//   .catch((err) => console.log(err));

app.use("/chat", chatRoutes);
app.use("/email", emailRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
