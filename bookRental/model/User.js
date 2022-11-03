module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
  
    const User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM,
        values: ["user", "admin"],
        defaultValue: "user",
      },
      location: {
        type: DataTypes.STRING,
        defaultValue: "India",
      },
      rentedBooks: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        default: [],
      },
    });
  
    return User;
  };
  
  // create table users(username varchar(50), email varchar(100), password varchar(200), role varchar(20), location varchar(50), rentedBooks JSON, id int auto_increment
  // , primary key(id), createdAt date, updatedAt date);
  