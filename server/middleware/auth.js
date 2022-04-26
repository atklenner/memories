const { SESSION_SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, SESSION_SECRET);
      req.userID = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userID = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = auth;
