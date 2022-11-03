const User = require("../model").user;
const helper = require("../util/helper");

const authControllers = {};

authControllers.register = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.email) {
      return res.status(404).json({ message: "email is a required field!" });
    }
    if (!req.body.username) {
      return res.status(404).json({ message: "username is a required field!" });
    }
    if (!req.body.password) {
      return res.status(404).json({ message: "password is a required field!" });
    }

    if (!helper.isValidEmail(req.body.email)) {
      return res.status(400).json({ message: "Invalid email!" });
    }
    if (!helper.isValidName(req.body.username)) {
      return res.status(400).json({ message: "Invalid username!" });
    }
    if (!helper.isValidPassword(req.body.password)) {
      // 1 uppercase, 1 lowercase 1 special char, 1 int and min length 8 is valid pass.
      return res.status(400).json({ message: "Invalid password!" });
    }

    let userWithName = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    let userWithEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userWithEmail || userWithName) {
      return res
        .status(400)
        .json({ message: "User with same email or password already exists!" });
    }

    const encryptedPass = helper.encryptPassword(req.body.password);
    req.body.password = encryptedPass;

    console.log("ADnhmm line 51");
    console.log(req.body);

    const newUser = await User.create(req.body);

    const authToken = helper.encodeToken({
      id: newUser.id,
      role: newUser.role,
    });

    return res.status(201).json({
      message: "User Created!",
      token: authToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

authControllers.login = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.email) {
      return res.status(404).json({ message: "email is a required field!" });
    }
    if (!req.body.password) {
      return res.status(404).json({ message: "password is a required field!" });
    }

    if (!helper.isValidEmail(req.body.email)) {
      return res.status(400).json({ message: "Invalid email!" });
    }
    if (!helper.isValidPassword(req.body.password)) {
      // 1 uppercase, 1 lowercase 1 special char, 1 int and min length 8 is valid pass.
      return res.status(400).json({ message: "Invalid password!" });
    }

    const encryptedPass = helper.encryptPassword(req.body.password);

    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: encryptedPass,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password!" });
    }

    console.log("Line 102");
    console.log(user.id);
    console.log(user.role);
    const authToken = await helper.encodeToken({
      id: user.id,
      role: user.role,
    });

    console.log("ADnhmm token line 98!");
    console.log(authToken);

    return res.status(201).json({
      message: "User Loggedin!",
      token: authToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = authControllers;
