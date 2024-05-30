// Desc: User controller
// Import User model
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ user, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Signup User
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(email, password, name);
    const token = createToken(user._id);

    res.status(201).json({ user, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { loginUser, signupUser };
