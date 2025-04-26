const User = require("../models/User_model");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const userExit = await User.findOne({ email });
    if (userExit) {
      res.status(400).send(`massege:email exit already`);
    }
    const hash_pass = await bcrypt.hash(password, 10);

    const CreatedUser = await User.create({
      username,
      email,
      password: hash_pass,
      phone,
    });
    if (CreatedUser) {
      res
        .status(200)
        .json({
          massage: CreatedUser,
          token: await CreatedUser.generateToken(),
        });
    }
  } catch (error) {
    res.status(400).json(`massege:page not here`, err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(401).json({ message: "Invalid Email", field: "email" });
    }

    const isPassword = await bcrypt.compare(password, isUser.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = await isUser.generateToken();

    return res
      .status(200)
      .json({ message: "Login successful", user: isUser, token });
  } catch (error) {
    next(error);
  }
};

const home = async (req, res) => {
  try {
    console.log({ message: req.body });

    res.status(200).send({ message: req.body });
  } catch (error) {
    res.status(400).send(`massege:page not here`);
  }
};
const user = async (req, res) => {
  const userData = req.user;

  try {
    return res.status(200).json({ message: userData });
  } catch (error) {
    console.log("backend error from user");
  }
};

module.exports = { home, register, login, user };
