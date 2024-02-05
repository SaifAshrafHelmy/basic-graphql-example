import db from './_db.js';

export const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },

    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },

    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },

    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id);
    },
  },

  Mutation: {
    addGame(_, args) {
      const newGame = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(newGame);
      return newGame;
    },
    updateGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          console.log(game);
          console.log({ ...args.edits });
          const editedGame = {
            ...game,
            ...args.edits,
          };
          console.log(editedGame);
          return editedGame;
        }
        return game;
      });
      return db.games.find((game) => game.id === args.id);
    },
    deleteGame(_, args) {
      db.games = db.games.filter((g) => g.id !== args.id);
      return db.games;
    },
  },
};
