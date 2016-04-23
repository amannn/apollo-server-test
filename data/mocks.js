import casual from 'casual';
import { MockList } from 'graphql-tools';

const mocks = {
  String: () => casual.sentence,
  Int: () => casual.integer(1, 1000),
  Query: () => ({
    author: (root, args) => ({
      firstName: args.firstName,
      lastName: args.lastName,
      posts: () => new MockList([1, 6]),
    }),
  }),
  Author: () => ({
    firstName: () => casual.first_name,
    lastName: () => casual.last_name,
  }),
  Post: () => ({
    tags: () => new MockList([1, 3], () => casual.word),
    title: casual.title,
    text: casual.sentences(3)
  }),
};

export default mocks;
