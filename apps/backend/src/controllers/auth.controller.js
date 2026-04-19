const authService = require("../services/auth.service");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.signup(email, password);

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

module.exports = {
  signup,
  login,
};