const jwt  = require('jsonwebtoken');
const User = require('../models/userModel');


const verifyToken = async (req, res, next) => {
    try {
      const authenticateHeader = req.headers.authorization;
      if (authenticateHeader) {
        const headerSplit = authenticateHeader.split(" ");
        if (/^Bearer$/i.test(headerSplit[0])) {
          const decodeToken = jwt.verify(headerSplit[1], process.env.JWT_SECRET);
          const user = await User.findById(decodeToken._id);
          if (!user) {
            res.status(404).send('User not found');
          }
          req.user = user;
          return next();
        }
        res.status(401).send("Invalid Authentication Format");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

module.exports = verifyToken;