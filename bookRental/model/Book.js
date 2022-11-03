module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
  
    const Book = sequelize.define("Book", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      publishedOn: {
        type: DataTypes.DATE,
        default: Date.now(),
      },
      addedOn: {
        type: DataTypes.DATE,
        default: Date.now(),
      },
    });
  
    return Book;
  };
  
  // create table books(title varchar(100), isbn varchar(50), author varchar(100), price int, publishedOn date, addedOn date, id int auto_increment, primary key(id),
  // createdAt date, updatedAt date);