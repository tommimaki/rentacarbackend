const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
};

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  const secret = process.env.JWT_SECRET || "your_jwt_secret";
  const options = {
    expiresIn: "1h",
  };

  try {
    return jwt.sign(payload, secret, options);
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

module.exports = {
  verifyPassword,
  generateToken,
};
