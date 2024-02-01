
const redis = require("redis");
const client = redis.createClient();
const connectredis=()=>{
    client
    .connect()
    .then(() => {
      console.log("connected-redis");
    })
    .catch((e) => console.error(e));
}
module.exports =  connectredis ;  