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

//________API Routes______________________

//global array that reads JSON and returns our db.json
let globalSavedNotes = util.promisify(fs.readFile);
function retrieveSavedNotes() {
  console.log("Saved Notes", globalSavedNotes("./db/db.json", "utf8"));
  return (savedNotes = globalSavedNotes("./db/db.json", "utf8"));
}

//get route for the db.json file
app.get("/api/notes", (req, res) => {
  retrieveSavedNotes()
    .then((savedNotes) => {
      // sends to the front end
      res.send(JSON.parse(savedNotes));
    })
    .catch((err) => res.status(500).json(err));
});

//post request that recieves new note, and adds it db.json file
app.post("/api/notes", (req, res) => {
  // reads db.json file
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  //generates a random ID for each note
  let id = crypto.randomBytes(16).toString("hex");
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: id,
  };

  console.log("newNote", newNote);

  savedNotes.push(newNote);

  //write new note to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes), (err) => {
    if (err) throw err;
    console.log("error");
  });

  console.log("A new note has been created!");
  return res.json(savedNotes);
});

//Deletes notes
app.delete("/api/notes/:id", (req, res) => {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  //returns all notes except the one to be deleted
  let noteID = savedNotes.filter((x) => x.id != req.params.id);
  console.log("Note ID", noteID);
  console.log("REQ.PARAMS.ID", req.params.id);

  fs.writeFileSync("./db/db.json", JSON.stringify(noteID), (err) => {
    if (err) throw err;
    console.log("error");
  });
  console.log("Your note has been deleted!");
  return res.json(savedNotes);
});

//______________HTML routes________________

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Start server listening
app.listen(PORT, () => {
  console.log("App is listening on PORT:" + PORT);
});
