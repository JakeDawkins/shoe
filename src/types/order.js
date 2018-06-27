const { gql } = require('apollo-server');

const typeDefs = gql`
  extend type Query {
    order(id: ID!): Order
    orders: [Order]!
  }

  type Order {
    id: ID!
    description: String
    customerNotes: String
    finished: Boolean
    dateFinished: String
    estimatedFinish: String
    status: String
    photoBefore: String
    photoAfter: String
    notes: String
    customerEmail: String
    queuePosition: Int
  }
`;

const resolvers = {
  Query: {
    order: async (_, { id }, { dataSources }) => {
      return dataSources.ordersAPI.getOrderById(id);
    },
    orders: async (_, __, { dataSources }) => {
      return dataSources.ordersAPI.getAllOrders();
    }
  },
  Order: {
    queuePosition: (order, __, { dataSources }) => {
      return dataSources.ordersAPI.getQueuePosition(order.id);
    }
  }
}; 

module.exports = { resolvers, typeDefs };