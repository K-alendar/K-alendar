const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const resolvers = require("./resolvers");

async function start() {
  const typeDefs = await importSchema("gql/**/*.graphql");

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({ typeDefs, resolvers });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

start();
