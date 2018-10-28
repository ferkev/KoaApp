const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

//data
const customers = [
  {id: '1', name: 'John Doe', age: 45},
  {id: '2', name: 'Sarah Truc', age: 28}
]

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
  })
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer:{
      type: CustomerType,
      args: {
        id:{type: GraphQLString}
      },
      resolve( parentValue, args ){
        for(let i = 0; i< customers.length; i++){
          if(customers[i].id === args.id){
            return customers[i]
          }
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});