import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  addNewBook,
  deleteBook,
  updateBook,
} from "../controllers/books-controllers";

const router: Router = Router();

router.get("/books", getAllBooks);
router.get("/book/:id", getBookById);

router.post("/create", addNewBook);

router.delete("/delete/:id", deleteBook);

router.put("/update/:id", updateBook);

export default router;
