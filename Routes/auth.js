const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Models/user");
const { v4: uuidv4 } = require("uuid");
uuidv4();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Encode = require("../utility/encoder");
const Authenticate = require("../middleware/jwtauth");

router.get("/login", async (req, res) => {
  console.log(req.query.password);
  const email = req.query.email;
  const password = req.query.password.toLowerCase();

  try {
    const response = await User.findOne({ email: email });
    if (await bcrypt.compare(password, response.password)) {
      const data = {
        _id: response._id,
        name: response.name,
        email: response.email,
        useruid: response.uuid,
      };

      let jwtsecretkey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign(data, jwtsecretkey);

      res.status(200).send(token);
    } else {
      res.send({ message: "False password" });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/signup", async (req, res) => {
  const { name, email } = req.body;
  const password = req.body.password.toLowerCase();
  const passwordhashed = await Encode(password);

  try {
    const userData = new User({
      name: name,
      email: email,
      password: passwordhashed,
      uuid: uuidv4(),
    });
    const response = await userData.save();

    console.log(response);
    res.status(200).send({ response });
  } catch (error) {
    res.send(error);
  }
});
router.get("/validate", Authenticate);

module.exports = router;
