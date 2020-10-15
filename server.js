//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

//Set up Express
const app = express();
const PORT = process.env.PORT || 3500;
//MiddleWare

//API Routes

//HTML routes

//Start server listening
app.listen(PORT, () => {
  console.log("App is listening on PORT:" + PORT);
});
