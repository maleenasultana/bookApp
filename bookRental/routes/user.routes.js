const userController = require('../controllers/user.controller')


module.exports = function(app) {
    app.get("/book-rental/users", userController.findAll)
    app.get("/book-rental/users/:id", userController.findById)
    app.post("/book-rental/users", userController.create)
    app.patch("/book-rental/users/:id",userController.update)
    app.delete("/book-rental/users/:id", userController.remove)
   
}