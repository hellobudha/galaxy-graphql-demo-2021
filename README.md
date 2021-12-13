# GraphQL Galaxy 2021 workshop: From curious to confident

In this demo, we use express-graphql to create a graphql service and secure it using Tyk's API management platform. We further use Tyk's Universal Data Graph to recreate the demo in a  no-code way.

## GraphQL schema used in this example:

type Mutation {
  addUser(name: String!, email: String!): [User]
}

type Query {
  hello: String
  getUsers: [User]
  getUser(id: Int!): User
}

type Todos {
  id: Int!
  userId: Int!
  task: String
  completed: Boolean
}

type User {
  id: Int!
  name: String
  email: String
  todos: [Todos]
}


We used Tyk cloud for the API management segment. YOu can sign up for a free trial here - https://account.cloud-ara.tyk.io/signup.

Here are the links to the sample REST APIs used in the Universal Data Graph segment:
1. Main site: https://jsonplaceholder.typicode.com/
2. User data: https://jsonplaceholder.typicode.com/users
3. Sepcific user: https://jsonplaceholder.typicode.com/users/1 (for user id = 1)
4. User todos: https://jsonplaceholder.typicode.com/users/1/todos (for user id = 1)
5. User posts: https://jsonplaceholder.typicode.com/users/1/posts (for user id = 1)
