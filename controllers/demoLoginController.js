// controllers/demoLoginController.js

const jwt = require("jsonwebtoken");
const config = require("../utils/config");

exports.login = async (req, res) => {
  try {
    // Replace the values below with your demo admin user's actual data
    const demoAdmin = {
      userId: "demo-admin-id",
      isAdmin: true,
    };

    const token = jwt.sign(demoAdmin, config.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      userId: demoAdmin.userId,
      isAdmin: demoAdmin.isAdmin,
    });
  } catch (error) {
    console.error("Error in demo login:", error);
    res.status(500).json({ message: "Error in demo login" });
  }
};
