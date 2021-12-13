import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLBoolean } from 'graphql'


const users = [
    {
        id: 1,
        name: "Budha",
        email: "budha@tyk.io"
    },
    {
        id: 2,
        name: "James",
        email: "james@gmail.com"
    }
]

const todos = [
    {
        id: 1,
        userId: 1,
        task: "Book flight tickets",
        completed: true
    },
    {
        id: 2,
        userId: 1,
        task: "Wash dishes",
        completed: false
    },
    {
        id: 3,
        userId: 2,
        task: "Visit the Botanic gardens",
        completed: false
    }
]

const TodoType = new GraphQLObjectType({
    name: "Todos",
    description: "This a list of todos for a user",
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        userId: {
            type: GraphQLNonNull(GraphQLInt)
        },
        task: { type: GraphQLString},
        completed: {
            type: GraphQLBoolean
        }
    })
    

})
const UserType = new GraphQLObjectType({
    name:"User",
    description: "This represents a user",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLString},
        email: { type: GraphQLString},
        todos: {
            type: new GraphQLList (TodoType),
            resolve: (user)=> {
                return todos.filter(todo => todo.userId === user.id)
            }
        }
    })
})


const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "This is the root query",
    fields: () => ({
        hello: {
            type: GraphQLString,
            description: "Just saying hello",
            resolve: () => "Hello World!"
        },
        getUsers: {
            type: new GraphQLList(UserType),
            description: "List of all users",
            resolve: () => users
        },
        getUser: {
            type: UserType,
            description: "Requesting a single user",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => users.find(user => user.id === args.id)
        }
    })
})

const RootMutationType = new GraphQLObjectType ({
    name: "Mutation",
    description: "This is the root mutation",
    fields: () => ({
        addUser: {
            type: new GraphQLList(UserType),
            description: "Add a new user",
            args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                email: { type: GraphQLNonNull(GraphQLString)}
            },
            resolve:(parent, args) => {
                const user = { 
                    id: users.length+1,
                    name: args.name,
                    email: args.email
                }
                users.push(user)
                return users
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

const app = express()

app.use('/graphql', graphqlHTTP ({
    schema: schema,
    graphiql: true
}))

app.listen(4001, ()=> console.log("Server running on localhost:4001/graphql"))