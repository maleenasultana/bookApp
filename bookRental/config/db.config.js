module.exports = {
    HOST: "localhost",
    port: 3306,
    USER: "root",
    PASSWORD: "rootpassword", // update the db password here
    DB: "book_rental_system", //add database name here
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    JWT_SECRET: "book-rental-secret",
  };
  