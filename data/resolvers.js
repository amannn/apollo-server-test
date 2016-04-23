import casual from 'casual';
import { FortuneCookie } from './connectors';

function generateArray(numElements, cb) {
  const arr = [];
  for (let i = 0; i < numElements; i++) {
    arr[i] = cb();
  }
  return arr;
}

function createAuthor(firstName, lastName) {
  return {
    id: casual.integer(1, 9999999),
    firstName: firstName || casual.first_name,
    lastName: lastName || casual.last_name,
  };
}

function addPost(authorId) {
  return {
    id: casual.integer(1, 9999999),
    authorId,
    title: casual.title,
    text: casual.sentences(3),
    tags: generateArray(2, () => casual.word)
  };
}

let authors = generateArray(2, createAuthor);

const posts = generateArray(5, () =>
  addPost(Math.random() < 0.5 ? authors[0].id : authors[1].id)
);

const resolvers = {
  RootQuery: {
    authors() {
      return authors;
    },

    posts() {
      return posts;
    },

    post(_, args) {
      return posts.filter(post => post.id === args.postId)[0];
    },

    getFortuneCookie() {
      return FortuneCookie.getOne();
    }
  },
  RootMutation: {
    createAuthor(_, args) {
      authors.push(createAuthor(args.firstName, args.lastName));
      return authors[authors.length - 1];
    },

    createPost(_, args) {
      posts.push(addPost(args.authorId));
      return posts[authors.length - 1];
    },

    deleteAuthors() {
      authors = [];
      return authors;
    },

    updatePost(_, args) {
      const post = posts.filter(cur => cur.id === args.id)[0];
      post.title = args.title;
      return post;
    }
  },
  Author: {
    posts(author) {
      return posts.filter(post => post.authorId === author.id);
    }
  },
  Post: {
    author(post) {
      return authors.filter(author => author.id === post.authorId)[0];
    }
  }
};

export default resolvers;
