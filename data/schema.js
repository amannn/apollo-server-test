const typeDefinitions = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    text: String
    authorId: Int
    author: Author
    tags: [String]
  }

  type RootQuery {
    authors: [Author]
    getFortuneCookie: String
    posts: [Post]
    post(postId: Int!): Post
  }

  type RootMutation {
    createAuthor(
      firstName: String
      lastName: String
    ): Author

    updatePost(id: Int!, title: String): Post
    createPost(authorId: Int!): Post
    deleteAuthors: [Author]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [typeDefinitions];
