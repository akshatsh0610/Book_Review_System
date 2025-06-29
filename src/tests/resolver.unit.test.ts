import { root } from '../resolver';
import { AppDataSource } from '../ormconfig';
import { redis } from '../redis';

jest.mock('../ormconfig');
jest.mock('../redis');

describe('Unit Tests: resolvers', () => {
  afterEach(() => jest.clearAllMocks());

  it('fetches books from cache', async () => {
    (redis.get as jest.Mock).mockResolvedValueOnce(JSON.stringify([{ id: 1, title: 'Test Book', author: 'Neha' }]));

    const books = await root.books();
    expect(books).toEqual([{ id: 1, title: 'Test Book', author: 'Neha' }]);
    expect(redis.get).toHaveBeenCalledWith('books');
  });

  it('creates a new book and clears cache', async () => {
    const mockSave = jest.fn().mockResolvedValue({ id: 2, title: 'New Book', author: 'Author' });
    const mockRepo = { create: jest.fn().mockReturnValue({ title: 'New Book', author: 'Author' }), save: mockSave };

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepo);
    (redis.del as jest.Mock).mockResolvedValueOnce(1);

    const book = await root.addBook({ title: 'New Book', author: 'Author' });
    expect(book.title).toBe('New Book');
    expect(redis.del).toHaveBeenCalledWith('books');
  });
});
