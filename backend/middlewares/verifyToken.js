const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(400).json({ msg: "Invalid authorization" });
      }
    } else {
      return res.status(404).json({ msg: "no authorization" });
    }
  } else {
    return res.status(404).json({ msg: "provid authorization" });
  }
};

module.exports = verifyToken;
