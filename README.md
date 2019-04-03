# Installation

In both root and server folders:

```
npm install
```

# Configuration

Configured for local env

```
/graphqlconfig.yml

projects:
  database:
    schemaPath: src/generated/prisma.graphql
    extensions:
      endpoints: 
        dev: "http://localhost:4466/"
      prisma: database/prisma.yml

```


```
/prisma.yml

endpoint: http://localhost:4466

```


```
/index.js --> /server

const fetch = createApolloFetch({
  uri: 'http:/localhost:4466',
});

```

```
/index.js --> /src/components/App

const client = new ApolloClient({
  uri: "http://localhost:4466",
  clientState: {
    defaults: initialState,
    resolvers,
  },
});

```


# Run

In root folder:

```
docker-compose up -d
```

```
prisma deploy
```

```
npm start
```

In /server folder:

```
 node index
```
# Test

To test the endpoiunt, in the console run
curl -X POST -F 'image=@{full_path_to_image}' http://localhost:4000/imageHooks