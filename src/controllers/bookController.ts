import { Request, Response } from 'express';
import Book from '../models/Book';


class BookController {
  static async allBooks(req: Request, res: Response) {
    try {
      const books = await Book.find();
      if (books.length === 0) return res.status(200).json({ message: 'No books found' });
      return res.status(200).json({ data: books });
    } catch (error) {
      res.status(400).json({ message: 'An error occured' });
    }
  }

  static async getBook(req: Request, res: Response) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      return res.status(200).json({ data: book });
    } catch (error) {
      res.status(400).json({ message: 'An error occured' });
    }
  }

  /* static async deleteBook(req: Request, res: Response) {
    return res.status(204).json({ message: 'Delete one book' });
  }

  static async updateBook(req: Request, res: Response) {
    res.status(201).json({ message: 'Update one book' });
  } */

  static async addBook(req: Request, res: Response) {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ data: book });
  }
}

export default BookController;
