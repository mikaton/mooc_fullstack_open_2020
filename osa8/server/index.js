require('dotenv').config();
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tämä on salaisuus';
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set('useFindAndModify', false);
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
  }
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String]
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author');
      } else if (args.author && !args.genre) {
        const books = await Book.find({}).populate('author');
        return books.filter(book => book.author.name === args.author);
      } else if (!args.author && args.genre) {
        const books = await Book.find({ genres: args.genre });
        return books;
      }
      const books = await Book.find({}).populate('author');

      return books
        .filter(book => book.author.name === args.author)
        .filter(book => book.genres.includes(args.genre));
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }
      let book;
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        try {
          author = new Author({ name: args.author, born: null });
          await author.save();
          book = new Book({ ...args, author });
          await book.save();
          return book;
        } catch (error) {
          throw new UserInputError(error.message);
        }
      }
      try {
        book = new Book({ ...args, author });
        await book.save();
        return book;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      author.born = args.setBornTo;
      await author.save();
      return author;
    },
    createUser: (root, args) => {
      const user = new User({ ...args });
      return user.save().catch(error => {
        throw new UserInputError(error.message);
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
