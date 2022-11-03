const User = require("../model").user;
const Book = require("../model").book;
const helper = require("../util/helper");
const jwt = require("jsonwebtoken");
const config = require("../config/db.config");

const bookControllers = {};

bookControllers.checkToken = (req, res, next) => {
  try {
    var token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "User not logged in!" });
    }
    token = token.replace("Bearer ", "");
    jwt.verify(token, config.JWT_SECRET, async function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: "User not logged in!" });
      }
      console.log("DECODED MIDDLEWARE");
      console.log(decoded);
      const user = await User.findOne({ where: { id: decoded.id } });
      if (!user)
        return res.status(401).json({ message: "User not logged in!" });

      req.userId = decoded.id;
      req.role = decoded.role;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

bookControllers.getBooks = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(401).json({ message: "Invalid access! please login." });

    const books = await Book.findAll();

    return res
      .status(200)
      .json({ message: "Fetched books successfully!", books });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

bookControllers.createBook = async (req, res) => {
  try {
    console.log(req.userId);
    console.log(req.role);
    if (!req.userId)
      return res.status(401).json({ message: "Invalid access! please login." });

    if (req.role != "admin")
      return res
        .status(401)
        .json({ message: "Invalid access, create book needs admin access!" });

    if (!req.body.title) {
      return res.status(404).json({ message: "title is a required field!" });
    }
    if (!req.body.isbn) {
      return res.status(404).json({ message: "isbn is a required field!" });
    }
    if (!req.body.author) {
      return res.status(404).json({ message: "author is a required field!" });
    }
    if (!req.body.price) {
      return res.status(404).json({ message: "price is a required field!" });
    }

    const newBook = await Book.create(req.body);

    return res
      .status(201)
      .json({ message: "Book created successfully!", newBook });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

bookControllers.bookOperations = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(401).json({ message: "Invalid access! please login." });

    if (!req.query)
      return res.status(404).json({ message: "No query operation found!" });

    if (!req.body.bookId)
      return res.status(404).json({ message: "bookId is a required field!" });

    if (req.query.delete) {
      // only for admin, add delete login.
      const book = await Book.findOne({ where: { id: req.body.bookId } });
      if (!book)
        return res
          .status(404)
          .json({ message: "Book with given id not found!" });

      const user = await User.findOne({ where: { id: req.userId } });

      console.log("LINE 110");
      console.log(user);

      if (user.role != "admin")
        return res
          .status(401)
          .json({ message: "delete operation is restricted to admin!" });

      await Book.destroy({
        where: {
          id: req.body.bookId,
        },
      });

      return res
        .status(200)
        .json({ message: "Book record deleted successfully!" });
    } else if (req.query.rent) {
      const book = await Book.findOne({ where: { id: req.body.bookId } });
      if (!book)
        return res
          .status(404)
          .json({ message: "Book with given id not found!" });

      const user = await User.findOne({ where: { id: req.userId } });

      console.log("ADnhmm! LINE 111");
      console.log(user);
      console.log(user.rentedBooks);

      let userRentedbooks = [];
      if (user.rentedBooks != null) {
        userRentedbooks = [...user.rentedBooks];
      }

      if (userRentedbooks.length >= 2)
        return res
          .status(401)
          .json({ message: "User cannot rent more then 2 books!" });

      if (userRentedbooks.includes(req.body.bookId))
        return res.status(401).json({ message: "Book already rented!" });

      userRentedbooks.push(req.body.bookId);

      await User.update(
        {
          rentedBooks: userRentedbooks,
        },
        {
          where: { id: req.userId },
        }
      );

      return res.status(200).json({ message: "book rented successfully!" });
    } else if (req.query.return) {
      const book = await Book.findOne({ where: { id: req.body.bookId } });
      if (!book)
        return res
          .status(404)
          .json({ message: "Book with given id not found!" });

      const user = await User.findOne({
        where: { id: req.userId, role: req.role },
      });

      console.log("ADnhmm! LINE 144");
      console.log(req.userId);
      console.log(req.role);
      console.log(user.dataValues);
      console.log(user.dataValues.rentedBooks);

      let userRentedbooks = [];
      if (user.dataValues.rentedBooks != null) {
        userRentedbooks = [...user.dataValues.rentedBooks];
      }

      console.log("ADnhmm line 153!");
      console.log(userRentedbooks);

      if (!userRentedbooks.includes(req.body.bookId))
        return res.status(401).json({ message: "Book not yet rented!" });

      userRentedbooks.splice(userRentedbooks.indexOf(1), 1);

      await User.update(
        {
          rentedBooks: userRentedbooks,
        },
        {
          where: { id: req.userId },
        }
      );

      return res.status(200).json({ message: "book returned successfully!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

bookControllers.getRentedBooks = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });

    console.log("LINE 209!");
    console.log(user.rentedBooks);

    const aBooks = [];
    for (const i of user.rentedBooks) {
      let bookId = i;
      const oBook = await Book.findOne({ where: { id: bookId } });
      console.log("LINE 216!");
      console.log(oBook);
      aBooks.push(oBook);
    }

    console.log("AD 223");
    console.log(aBooks);

    return res
      .status(200)
      .json({ message: "rented books retrived successfully!", aBooks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = bookControllers;
