const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authenticate = (req, res) => {
  let jwtsecretkey = process.env.JWT_SECRET_KEY;

  
  try {
   
    const token = req.headers;
    console.log("ghghghg", "Bearer "+token[jwtsecretkey]);
    const verified = jwt.verify(token[jwtsecretkey], jwtsecretkey);
    if (verified) {
      return res.send({ message: "successfully verified " });
    } else {
      return res.status(401).send({
        message: "access Denied",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error);
  }
};

module.exports = Authenticate;
