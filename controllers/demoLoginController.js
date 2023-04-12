const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user");

exports.login = async (req, res) => {
  try {
    const demoAdmin = await User.findOne({ email: "admin@example.com" });

    if (!demoAdmin) {
      return res.status(404).json({ message: "Demo admin not found" });
    }

    const demoAdminData = {
      userId: demoAdmin._id.toString(),
      isAdmin: demoAdmin.isAdmin,
    };

    const token = jwt.sign(demoAdminData, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      userId: demoAdminData.userId,
      isAdmin: demoAdminData.isAdmin,
    });
  } catch (error) {
    console.error("Error in demo login:", error);
    res.status(500).json({ message: "Error in demo login" });
  }
};
