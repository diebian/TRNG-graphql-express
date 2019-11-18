const express = require("express");
const app = express();

const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
type Query {
    message: String
}`);

const root = {
  message: () => "WTF!"
};

app.use(
  "/graphql",
  express_graphql({
    schema,
    root,
    graphiql: true
  })
);

app.listen(4500, () => console.log("SERVER on port 4500"));
