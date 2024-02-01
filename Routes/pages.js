const router = require("express").Router();
const Pages = require("../Models/pages");

const listredis = require("../middleware/listredis");
const detailsredis = require("../middleware/listredis");
const client = require("../utility/redisstore");

const { v4: uuidv4 } = require("uuid");
uuidv4();

//Router - creating new page entry
//userId - testing : 65ba1f8e97edb3d7eb764e6e
//uuid - testing :5ef80239-63cf-4cd0-afd1-8b88197017ce
router.post("/", async (req, res) => {
  const { userId, name } = req.body;
  const projectKey = `project:${userId}`;

  try {
    const PageData = new Pages({
      name: name,
      userId: userId,
      uuid: uuidv4(),
    });
    const savePages = await PageData.save();
    await client.set(projectKey, JSON.stringify(PageData));
    client.expire(projectKey, 10);
    res.status(200).send({ user: savePages });
  } catch (error) {
    res.send({ error });
  }
});
//update details
router.patch("/", async (req, res) => {
  const uuid = { uuid: req.query.uuid };
  const name = req.query.name;
  const projectKey = `project:${uuid}`;
  if (uuid) {
    try {
      const result = await Pages.findOneAndUpdate(
        uuid,
        { name: name },
        { upsert: true, new: true }
      );
      // console.log(result);
      await client.set(projectKey, JSON.stringify(result));
      client.expire(projectKey, 10);
      res.status(200).send({ result });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } else {
    console.log("No id ");
    res.send({ message: "wrong uuid" });
  }
});

//delete- single page
router.delete("/", async (req, res) => {
  const uuid = req.body;
  try {
    const response = await Pages.deleteOne(uuid);
    res.status(200).send({ message: "deleted" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//List - all pages
router.get("/list", listredis, async (req, res) => {
  const userId = { userId: req.query.userId };
  const projectKey = `project:${userId}`;

  try {
    const response = await Pages.find(userId);
    await client.set(projectKey, JSON.stringify(response));
    client.expire(projectKey, 10);
    console.log(response);
    res.status(200).send({ response });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

//details - page
router.get("/details", detailsredis, async (req, res) => {
  const uuid = req.query;
  const projectKey = `project:${uuid}`;

  try {
    const response = await Pages.find(uuid);
    await client.set(projectKey, JSON.stringify(response));
    client.expire(projectKey, 10);
    console.log(response);
    res.status(200).send({ response });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//Storage Manager

router.get("/storage/:id", (req, res) => {});

router.patch("/storage/:id", (req, res) => {});

module.exports = router;
