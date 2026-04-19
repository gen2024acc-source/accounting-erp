const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const signup = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.createUser(email, hashedPassword);

  return user;
};

const login = async (email, password) => {
  const user = await userModel.findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { userId: user.id },
    "SECRET_KEY",
    { expiresIn: "1h" }
  );

  return { token };
};

module.exports = {
  signup,
  login,
};