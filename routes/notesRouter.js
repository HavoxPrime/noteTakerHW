const notes = require('express').Router();
var fs = require('fs');

// GET Route
notes.get('/', (req, res) => {
  fs.readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route
notes.post('/', (req, res) => {
  const { username, topic, note } = req.body;

  if (req.body) {
    const newNote = {
      username,
      note,
      topic,
      note_id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
    };

    fs.readAppend(newNote, './db/notes.json');
    res.json(`Note added`);
  } else {
    res.error('Error in adding Note');
  }
});

module.exports = notes;