import { gql } from "apollo-server-azure-functions";

export const typeDefs = gql `
    type Query {
        user(id: String!): User
    }

    type User {
        id: String
        firstName: String
        lastName: String
        age: Int
    }
`;