//Paquets
const _ = require('lodash');
const { 
  GraphQLID,
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLInt, 
  GraphQLSchema,
  GraphQLBoolean, 
  GraphQLList, 
  GraphQLNonNull } = require('graphql');

//models
const customers = require('./models/Customers');

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
})

//===============//
// avec lodash   //
//===============//

// const AuthorType = new GraphQLObjectType({
//   name: "Author",
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     age: { type: GraphQLInt },
//     books: {
//       type: GraphQLList(BookType),
//       resolve(parent, args){
//         return _.filter(books, {
//           authorId: parent.id
//         })
//       }
//     }
//   })
// })

//Mutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomers: {
      type: CustomerType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args){

          let customer = new customers({
            firstName: args.firstName,
            lastName: args.lastName,
            age: args.age,
            email: args.email,
            password:  args.password
          });

          return customer.save() 
      }
    }
  }
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return customers.findById(args.id);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args){
        return customers.find()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});