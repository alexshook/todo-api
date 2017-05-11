require('./config.js');

const _ = require("lodash");
const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require("mongoose").Types.ObjectId;
const pathfinderUI = require('pathfinder-ui')

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');

const app = express();

/////////////////////////////////
/////////MIDDLEWARE//////////////
////////////////////////////////

app.use(bodyParser.json());

////////////////////////////////
////////////ROUTES//////////////
////////////////////////////////

// CREATE

app.post("/todos", (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((document) => {
    res.status(201).send(document);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//INDEX

app.get("/todos", (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }), (e) => {
    res.status(400).send(e);
  }
});

//SHOW

app.get("/todos/:id", (req, res) => {
  let id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    } else {
      return res.status(200).send({todo});
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

//UPDATE

//DELETE

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
