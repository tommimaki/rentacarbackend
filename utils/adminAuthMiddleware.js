const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuthMiddleware = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    req.user = decoded;

    const user = await User.findById(req.user.id);
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ msg: "Access denied, you are not an admin" });
    }

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = adminAuthMiddleware;
