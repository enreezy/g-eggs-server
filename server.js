const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const chatRoutes = require("./routes/api/chat");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/chat", chatRoutes);

const PORT = process.env.SERVER_PORT || 8085;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
