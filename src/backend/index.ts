import { Server } from 'azle';
import express from 'express';

type Book = {
    id: number,
    title: string,
    author: string
}

let books: Book[] = [{
    id: 1,
    title: "La ",
    author: "Homero"
}];

export default Server(() => {
    const app = express();
    
    /*
     * Method: POST
     * URL: /books
     */
    app.get("/books", (req, res) => {
        res.json(books);
    });

    /*
     * Method: POST
     * URL: /books
     * Body example:
     * {
     *    "id": 2,
     *    "title": "Dracula"
     * }
     */
    app.post("/books", (req, res) => {
        books = [...books, req.body]
        res.send("Ok");
    });

     /*
     * Method: PUT
     * URL: /books/2
     * Body example:
     * {
     *    "author": "Bram Stoker"
     * }
     */
    app.put("/books/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const book = books.find((book) => book.id === id);

        if (!book) {
            res.status(404).send("Not found");
            return;
        }

        const updatedBook = { ...book, ...req.body };
        
        books = books.map((b) => b.id === updatedBook.id ? updatedBook : b);

        res.send("Ok");
    });

    /*
     * Method: DELETE
     * URL: /books/1
     */
    app.delete("/books/:id", (req, res) => {
        const id = parseInt(req.params.id);
        books = books.filter((book) => book.id !== id);
        res.send("Ok");
    });
    
    return app.listen();
});