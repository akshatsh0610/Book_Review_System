import express from 'express';
import "reflect-metadata";
import { AppDataSource } from './ormconfig';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
import { root } from './resolver';

const app = express();
const PORT = 4000;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

AppDataSource.initialize()
  .then(() => {
    console.log("PostgreSQL Connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/graphql`);
    });
  })
  .catch(error => console.error("Error connecting to DB:", error));

