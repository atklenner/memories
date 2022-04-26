const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SESSION_SECRET } = require("../config/config");

exports.signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      SESSION_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (!userExists)
      return res.status(400).json({ message: "User does not exist" });

    const correctPassword = await bcrypt.compare(password, userExists.password);

    if (correctPassword) {
      const token = jwt.sign(
        { email: userExists.email, id: userExists._id },
        SESSION_SECRET,
        { expiresIn: "1h" }
      );
    } else {
      res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// exports.logout = () => {};
