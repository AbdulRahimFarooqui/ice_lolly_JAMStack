const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb');
const q = faunadb.query;
const shortid = require('shortid')

require('events').EventEmitter.defaultMaxListeners = 400;

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Lolly {
    reciepentName: String!
    message: String!
    sendersName:String!
    colorTop: String!
    colorMid: String!
    colorBottom: String!
    path: String!
  }

  type Mutation{
    createLolly(reciepentName: String!,message: String!,sendersName:String!,colorTop: String!,colorMid: String!,colorBottom: String!):Lolly
  }
`

const resolvers = {
  Query: {
    hello: () => {
    return 'hello world'
  }},
  Mutation: {
    createLolly: async(_, args) => {
      const client = new faunadb.Client({ secret: 'fnAEPn8cZrACC_5HPUn5DbIjIAXsxndG3QZEniZL' })
      const id = shortid.generate();
      args.path = id;

      const result = await client.query(
        q.Create(q.Collection('lolly'),{
          data:args
        })
      );

      console.log("result: ",result);
      return result.data
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
