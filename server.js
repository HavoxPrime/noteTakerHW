const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid');
const DB = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get("/api/notes", (req, res) => {
  res.status(200).json(DB);
});

// Post
app.post('/api/notes', (req ,res) =>{
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      review_id: uuid(),
    };
    const response = {
      status: 'success',
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);

  //adding in note
    let stringy = JSON.stringify(newNote);
    let curentNotesGet = fs.readFileSync('./db/db.json', 'utf-8');
    let curentNotes = curentNotesGet.substring(1, curentNotesGet.length-1);
    //console.log(stringy);
    //console.log(curentNotes);
    //console.log("--------------------");
    let newNotes ="["+curentNotes+","+stringy+"]";
    //console.log(newNotes);
    fs.writeFile('./db/db.json',newNotes,(err)=>{
      if(err){
         console.log(err);
      }
    });
    
  } else {
    res.status(500).json('Error in posting Note');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
