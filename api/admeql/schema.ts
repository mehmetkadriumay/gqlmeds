import { gql } from "apollo-server-azure-functions";

export const typeDefs = gql `
    type Query {
        well(id: String!): Well
    }

    type Well {
        id: String,
        kind: String,
        NameLegal: String,
        field: String,
        latitude: Float,
        longitude: Float
    }
`;