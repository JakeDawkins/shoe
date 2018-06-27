const { ApolloServer, gql } = require('apollo-server');
const { merge } = require('lodash.merge');

// import types
const { typeDefs, resolvers } = require('./types');

// import connectors
const sqlite = require('./connectors/sqlite');

// import models
const OrdersAPI = require('./models/order');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ordersAPI: new OrdersAPI(),
  }),
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
