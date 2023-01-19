const bookController = require('../controllers/book.controller')

module.exports = function(app) {
    app.get("/book-rental/books", bookController.findAll)
    app.get("/book-rental/books/:id", bookController.findById)
    app.post("/book-rental/books", bookController.create)
    app.patch("/book-rental/books/:id",bookController.update)
    app.delete("/book-rental/books/:id", bookController.remove)
}