import express from 'express';
import { apolloServer } from 'graphql-tools';
import cors from 'express-cors';
import Schema from './data/schema';
import Resolvers from './data/resolvers';
// import Mocks from './data/mocks';

const GRAPHQL_PORT = 8085;

const graphQLServer = express();

graphQLServer.use(cors({
  allowedOrigins: [
    'localhost', 'localhost:8080'
  ]
}));

graphQLServer.use('/', apolloServer({
  graphiql: true,
  pretty: true,
  schema: Schema,
  resolvers: Resolvers,
  // mocks: Mocks
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
