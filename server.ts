import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import express from "express";


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  input MessageInput {
   text: String
  }

  type Response {
    text: String
  }

  type Query {
    hello: String
  }

  type Mutation {
    createMessage(input: MessageInput): Response
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return "Hello world!";
  },
  oaks: () => {
    return "We build startups!";
  },
  createMessage: ({ input }: { input: { text: string } }) => {
    return {text:"Success"};
  },
};

const app = express();

app.set("trust proxy", true);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.all("/", (req, res) => {
  res.send("This route is only for 3rd party services.");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
console.log("Running a GraphQL API server at http://localhost:8080/graphql");
