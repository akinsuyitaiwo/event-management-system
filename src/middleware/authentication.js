const jwt  = require('jsonwebtoken');
const models = require('../models/index.js');


const verifyToken = async (req, res, next) => {
    try {
      const authenticateHeader = req.headers.authorization;
      if (authenticateHeader) {
        const headerSplit = authenticateHeader.split(" ");
        if (/^Bearer$/i.test(headerSplit[0])) {
          const decodeToken = jwt.verify(headerSplit[1], process.env.JWT_SECRET);
          const user = await models.User.findById(decodeToken._id);
          if (!user) {
            return res.status(404).send('User not found');
          }
          req.user = user;
          return next();
        }
        return res.status(401).send("Invalid Authentication Format");
      }
      return res.status(404).send('No Authentication found');
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

const verifyAdmin = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const admin = await models.User.findOne({ _id, role: "admin" });
    if (!admin) return res.status(401).send('Unauthorized Access');
    return next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
module.exports = { verifyToken, verifyAdmin };