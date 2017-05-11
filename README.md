REST

Representational State Transfer — coined by Roy Fielding. It is not a protocol, but a convention. Fielding simply identified a pattern that works. He went "I've noticed this pattern and it would be nice to stick to it because it makes sense and it is quite scalable."

[original paper](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)

Basics: 

### Resource-Based

REST involves sending *representations* of a resource. Those representations could be exactly as they are in a Mongo or SQL database, could be serialized as JSON, XML, CSV, or another MIME type. The resource is not the same as data. 

REST deals with nouns, not verbs

BAD (not rest): 

GET [http://api.example.com/update_customer/12345](http://api.example.com/update_customer/12345)

GET [http://api.example.com/create_customer/12345](http://api.example.com/create_customer/12345)

GOOD:

PATCH [http://api.example.com/customers/12345/update](http://api.example.com/customers/12345/update)

POST [http://api.example.com/customers/12345/create](http://api.example.com/customers/12345/create)

Generally, we use the plural in URLs.

The server should know EVERYTHING it needs to respond appropriately from the HTTP request. Verb, Url, Body, and MIME type (mostly). In this sense, the request is stateless. The URI identifies the resource(s), the verb determines what to do with it and how to respond. After the server is done with that, it responds with the appropriate state in kind. State such as sessions across requests are not held on the server for the most part. The server should not have to worry about that stuff. This also means that the server doesn't know or care what order you do stuff. Each request is basically the beginning and end of itself.

## Idempotence

TL;DR you can do the same request a million times and it shouldn't affect other requests.

GET is always idempotent

You can do a get to any route forever and it will never change state on the server.

GET is "safe": never used to alter data

PUT is idempotent because if you sent the same edit, it will always make the same change.

DELETE is not really idempotent but it is in the HTTP spec. Don't worry about it. 

POST is not idempotent, obvs

You can have a ton of kids, but you can't get more born than you were before.



## What makes an API RESTful?

- Statelessness: Client state should not be stored on the server between requests. Said another way, each individual request should have no context of the requests that came before it.
- Resource identification per request: Each request should uniquely identify a single resource. Said differently, each request that modifies the database should act on one and only one row of one and only one table.Requests that only fetch information should get zero or more rows from one table.
- Representational state transfer: The resource endpoints should return representations of the resource as data, usually XML or JSON. The returned information should be sufficient for the client to uniquely identify and manipulate the database row(s) in question.

While there are other criteria which need to be fulfilled for a theoretically pure REST API, these suffice in practice.

Restful routes a la Rails Resourceful routes map well to CRUD actions on data:



| Route  | Action                      | Traditional, logical Route |
| ------ | --------------------------- | -------------------------- |
| Index  | Read                        | GET /things                |
| Show   | Read                        | GET /things/:key           |
| New    | Read (not relevant in APIs) | GET /things/new            |
| Create | Create                      | POST /things               |
| Edit   | Read (not relevant in APIs) | GET /things/:key/edit      |
| Update | Update                      | PUT \|PATCH  /things/:key  |
| Delete | Delete                      | DELETE /things/:key        |


-----------------

`$ mongod --dbpath ~/mongo-data`

`$ git clone git@github.com:trivett/express-todo-api-starter.git`

`$ mv	express-todo-api-starter/ todo-api/`

`$ cd todo-api`

`$ npm run test-watch`

`$ nodemon app/server.js`



Install Postman

Pathfinder

Body Parser

Mongoose & object ID

Code along and make a simple rest api for one type of resource.

