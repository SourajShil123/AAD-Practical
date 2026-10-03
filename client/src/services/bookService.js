import { initialBooks } from '../data/mockData';

/**
 * Service resource for managing library book catalog
 */
export const bookService = {
  getAllBooks: () => Promise.resolve([...initialBooks]),
  getBookById: (id) => Promise.resolve(initialBooks.find((b) => b.id === id)),
  searchBooks: (query) => {
    const q = query.toLowerCase();
    return Promise.resolve(
      initialBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      )
    );
  },
};

export default bookService;
