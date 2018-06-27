const { merge } = require('lodash');
const { gql } = require('apollo-server');

const order = require('./order');

const baseResolvers = { Query: {} };

// base query type to extend
// this has to have an _empty field because it can't be empty
// https://dev-blog.apollodata.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
const baseTypeDefs = gql`
  type Query {
    _empty: String @deprecated(reason: "doesn't do anything")
  }
`;

const resolvers = merge(baseResolvers, order.resolvers);
const typeDefs = [ baseTypeDefs, order.typeDefs ];

module.exports = { typeDefs, resolvers };