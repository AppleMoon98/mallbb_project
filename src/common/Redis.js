const redis = require('redis');
const client = redis.createClient();

client.on('error',(err)=>console.log('Redis Client Error',err));

await client.connect();

await client.set(`auth:${telNum}`,authCode,{EX:300});

const savedCode = await client.get(`auth:${telNum}`);
if (savedCode == userInputCode){
    console.log('인증 성공');
    await client.del(`auth:${telNum}`);
}