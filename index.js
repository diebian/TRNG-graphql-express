const express = require("express");
const app = express();

const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

const { technologies } = require("./data.json");
// console.log("technologies", technologies);

const schema = buildSchema(`
type Query {
    technology(id: Int!): Technology
    technologies( author: String): [Technology]
}

type Mutation {
    updateTechnologyAuthor(id: Int!, author: String! ): Technology
}

type Technology {
    id: Int
    name: String
    author: String
    repository_url: String
}

`);

let getTechnology = args => {
  let id = args.id;
  console.log("ID: ", id);
  // console.log("ALL: ", technologies);
  return technologies.filter(technology => {
    return technology.id == id;
  })[0];
};

let getTechnologies = args => {
  console.log("AUTHOR: ", args);
  if (args.author) {
    let author = args.author;
    return technologies.filter(technology => technology.author === author);
  } else {
    return technologies;
  }
};

let updateTechnologyAuthor = ({ id, author }) => {
  technologies.map(technology => {
    if (technology.id == id) {
      technology.author = author;
      return technology;
    }
  });
  return technologies.filter(technology => technology.id == id)[0];
};

const root = {
  technology: getTechnology,
  technologies: getTechnologies,
  updateTechnologyAuthor
};

app.use(
  "/graphql",
  express_graphql({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4500, () => console.log("SERVER on port 4500"));
