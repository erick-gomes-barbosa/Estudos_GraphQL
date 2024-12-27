const {ApolloServer} = require("apollo-server")
const { schema } = require("./src/graphql")

const server = new ApolloServer({ schema })

server.listen().then(({ url}) => console.log(url));