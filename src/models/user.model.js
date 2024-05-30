import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

userSchema.statics.signup = async function (email, password, name) {
  // Validation
  if (!email || !password || !name) {
    throw new Error("Please provide all fields");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please provide a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please provide a strong password");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already exists");
  }
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPassword, name });

  return user;
};

userSchema.statics.login = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw new Error("Please provide all fields");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
