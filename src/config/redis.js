// src/config/redis.js
const Redis = require('redis');

let redisClient;

const connectRedis = async () => {
  try {
    redisClient = Redis.createClient({
      url: process.env.REDIS_URI
    });

    await redisClient.connect();
    
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    redisClient.on('connect', () => console.log('Redis Connected'));
    
    return redisClient;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };