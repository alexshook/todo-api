const expect = require('expect');
const request = require('supertest');
const ObjectId = require("mongoose").Types.ObjectId;

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todoSeeds = [
  { text: "hi", _id: new ObjectId(), completed: true, completedAT: 183290 },
  { text: "hi number two", _id: new ObjectId() },
  { text: "hi number three", _id: new ObjectId() }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todoSeeds);
  }).then(() => done());
})


describe("POST /todos", () => {
  it("should create a new todo given valid data", () => {
    let text = "Text here!";
    request(app)
      .post("/todos")
      .send({text})
      .expect(201)
      .expect('Context-Type', /json/)
      .expect((res) => {
        expect(res.body.text)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(todoSeeds.length + 1);
          expect(todos[3].text).toBe(text);
        }).catch((e) => done());
    })
   })
})

describe("GET /todos", () => {
  it("should return all the todos in the db", (done) => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.todos.length).toBe(todoSeeds.length);
      })
    .end(done);
  })
})
