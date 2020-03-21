# Kalendar

## How to run

Install nodemon (`npm install nodemon -g`) and run `yarn start` in the project directory. Nodemon enables hot reloading and recompiles whenever you make a change. It watches certain file extensions. If you want to add an extension, check `nodemonConfig` in package.json.

## Database and ORM

### Sequelize

Sequelize is an ORM, meaning it handles migrations, as well as interpreting database results into JavaScript objects. It's also the interface between JS and the database. The models can be found in `database/models`.

This is what it looks like to generate the company model. It will create a migration for you:
```
sequelize model:generate --name Company --attributes name:string
```

The attributes are comma sepatated (no spaces!):
`--attributes name:string,foreign_key:integer`

This will create a migration and model file for you. Note that you have to add references yourself. See `artist.js` in models and the create artist migration for examples on how to create references.

See the sequelize documentation for more help.

## GraphQL

### Schema:

Type definitions are found in `schema.graphql`, and the mutation and query definitions are found in `queries.graphql`

### Resolvers:

Resolvers are found in `resolvers/<type>.js`. Queries are reads, and mutations are writes. `index.js` aggregates all the different types. Each type resolver file looks like this:

```js
// Requires the model from the ORM
const { Model } = require("../database/models");

module.exports = {
    // Type resolvers
    // Returns the actual type of an Interface or a Union (see artist.js for an example)
    types: {},

    // Read only requests
    queries: {},

    // Write only requests
    mutations: {}
};
```

Then in `index.js`, these are all combines into the same object:

```js
const ArtistResolvers = require("./artist");
const CompanyResolvers = require("./company");

module.exports = {
    ...ArtistResolvers.types,
    ...CompanyResolvers.types,

    Query: {
        ...ArtistResolvers.queries,
        ...CompanyResolvers.queries
    },

    Mutation: {
        ...ArtistResolvers.mutations,
        ...CompanyResolvers.mutations
    }
};
```
