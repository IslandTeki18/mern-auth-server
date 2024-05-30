import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization Token Required." });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne(_id).select("_id");
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ error: "Invalid Token" });
  }
};

export { requireAuth };
