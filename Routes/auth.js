const router = require("express").Router();

const User = require("../Models/user");
const { v4: uuidv4 } = require("uuid");
uuidv4();

router.get("/login", async (req, res) => {
  const email = req.query.email;
  const password = req.query.password.toLowerCase();

  try {
    const response = await User.findOne({ email: email, password: password });
    res.status(200).send(response);
  } catch (error) {
    res.send(error);
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userData = new User({
      name: name,
      email: email,
      password: password,
      uuid: uuidv4(),
    });
    const response = await userData.save();
    console.log(response);
    res.status(200).send({response});
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
