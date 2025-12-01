import { Request, Response } from "express";

interface IBook {
  id: number;
  title: string;
  author: string;
}

const books: IBook[] = [
  { id: 1, title: "Beginning Node.js", author: "Basarat Ali Syed" },
  { id: 2, title: "Node.JS Web Development", author: "David Herron" },
  { id: 3, title: "Node.js Design Patterns", author: "Mario Casciaro" },
];

export function getAllBooks(request: Request, response: Response) {
  response.status(200).json({
    message: "Get All Books.",
    data: books,
  });
}

export function getBookById(request: Request, response: Response) {
  const id = Number(request.params.id);
  if (!id) {
    response.status(400).json({
      message: `Book Id ${id} is incorrect`,
    });
  }

  const book = books.find(
    (element: { id: number; title: string; author: string }) =>
      element.id === id
  );
  if (!book) {
    response.status(404).json({ message: `Book of ID: ${id} not found.` });
  }

  response.status(200).json({ message: `Book found.`, data: book });
}

export function addNewBook(request: Request, response: Response) {
  const { title, author } = request.body;
  if (!title || !author) {
    response.status(400).json({ message: "Title or Author is required." });
  }

  const newBook: IBook = {
    id: books.length + 1,
    title: title,
    author: author,
  };

  books.push(newBook);

  response.status(200).json({ message: "New Book Added", data: newBook });
}

export function deleteBook(request: Request, response: Response) {
  const id = Number(request.params.id);
  if (!id) {
    response.status(400).json({ message: `Book Id ${id} is incorrect.` });
  }

  const indexOf: number = books.findIndex(
    (element: { id: number; title: string; author: string }) =>
      element.id === id
  );
  if (indexOf === -1) {
    response.status(404).json({ message: `Book of Id ${id} not found.` });
  }

  books.splice(indexOf, 1);

  response.status(200).json({
    message: `Book with Id: ${id} deleted.`,
    data: books,
  });
}

export function updateBook(request: Request, response: Response) {
  const id: number = Number(request.params.id);
  if (!id) {
    response.status(400).json({ message: `Book ID ${id} is incorrect.` });
  }

  const { title, author } = request.body;
  if (!title || !author) {
    response.status(400).json({ message: "Title or Author is required." });
  }

  const indexOf: number = books.findIndex((element) => element.id === id);
  if (indexOf === -1) {
    response.status(400).json({ message: `Book of ID ${id} not found.` });
  }

  const newBook = {
    id: id,
    title: title,
    author: author,
  };

  books[indexOf] = newBook;

  response
    .status(200)
    .json({ message: "Book Updated Successfully", data: books });
}
