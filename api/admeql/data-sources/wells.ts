import { CosmosDataSource, FindArgs } from "apollo-datasource-cosmosdb";
import { ApolloServer } from "apollo-server-azure-functions";
import { BaseContext } from "apollo-server-types";
import { log } from "debug";

export interface Well {
    "id": string,
    "kind": string,
    "NameLegal": string,
    "field": string,
    "latitude": number,
    "longitude": number
}



