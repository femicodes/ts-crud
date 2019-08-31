import { Router } from 'express';
import BookController from '../controllers/bookController';

const router: Router = Router();

router.get('/books', BookController.allBooks);
router.get('/book/:id', BookController.getBook);
router.post('/book', BookController.addBook);
/* router.patch('/book/:id', BookController.updateBook);
router.delete('/book/:id', BookController.deleteBook); */

export default router;