const redis = require("redis");
const client = redis.createClient();
const connectredis =require('../utility/redisstore');
connectredis();
const listredis = async(req,res,next)=>{
    const userId = { userId: req.query.userId };
  const projectKey = `project:${userId}`;
  const redisData = JSON.parse(await client.get(projectKey));
  if (redisData) {
    console.log(redisData);
    res.send(redisData);
  }
  else{
    next();
  }
}