//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const util = require("util");

//Set up Express
const app = express();
const PORT = process.env.PORT || 3500;
//MiddleWare - handles parsing data and file readability
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
//API Routes

//HTML routes

//Start server listening
app.listen(PORT, () => {
  console.log("App is listening on PORT:" + PORT);
});
