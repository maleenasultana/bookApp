const express = require("express");
const router = express.Router();

const bookControllers = require("../controllers/bookControllers");

router.get("/books", bookControllers.checkToken, bookControllers.getBooks);
router.post(
  "/books/create",
  bookControllers.checkToken,
  bookControllers.createBook
);
router.post(
  "/books",
  bookControllers.checkToken,
  bookControllers.bookOperations
);

router.post("/rented/:userId", bookControllers.getRentedBooks);

module.exports = router;
