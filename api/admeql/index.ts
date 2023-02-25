import { CosmosDataSource } from 'apollo-datasource-cosmosdb';
import { CosmosClient } from "@azure/cosmos";
import { ApolloServer } from "apollo-server-azure-functions";
import { typeDefs } from "./well";
import { Well } from "./data-sources/wells.js";

const buildCosmosDataSource = <TData extends { id: string }>(
  containerId: string
) => {
  const client = new CosmosClient(
    process.env.COSMOS_CONNECTION_STRING
  );
  const container = client
    .database(process.env.COSMOS_DATABASE_NAME)
    .container(containerId);
      
  return new CosmosDataSource<TData, unknown>(container);
}

// Resolver map.
const resolvers = {
    Query: {
      well: async (_, params, context) => {
        const query = `SELECT w.id,w.kind,w.data.NameLegal,w.data.field,w.data.wellLocation.latitude.latitude,w.data.wellLocation.longitude.longitude FROM wellContainer AS w WHERE w.id=@well_id`;
        const results = await context.dataSources.well.findManyByQuery(
            {
              query,
              parameters: [{ name: "@well_id", value: params.id }]
            }
          );
        return results.resources[0];
      },
    },
  };

// Create our server.
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    dataSources: () => ({
      well: buildCosmosDataSource<Well>('wellContainer')
    }) 
  });
  export const run = server.createHandler();
