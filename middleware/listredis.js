const client = require("../utility/redisstore");
const listredis = async (req, res, next) => {
  const userId = { userId: req.query.userId };
  const projectKey = `project:${userId}`;
  const redisData = JSON.parse(await client.get(projectKey));
  if (redisData) {
    console.log(redisData);
    res.send(redisData);
  } else {
    next();
  }
};

const detailsredis = async (req, res, next) => {
  const uuid = req.query;
  const projectKey = `project:${uuid}`;
  const redisData = JSON.parse(await client.get(projectKey));
  if (redisData) {
    console.log(redisData);
    res.send(redisData);
  } else {
    next();
  }
};
(module.exports = listredis), detailsredis;
