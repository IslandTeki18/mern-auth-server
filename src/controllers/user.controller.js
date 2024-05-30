// Desc: User controller
// Import User model
import User from "../models/user.model.js";

// Login User
const loginUser = async (req, res) => {
  try {
    res.json({ message: "Login User" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Signup User
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(email, password, name);

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { loginUser, signupUser };
