import { configs } from '@/config';
import { createClient } from 'redis';

class Redis {
  protected static async connection() {
    const client = createClient({
      url: configs.redis.url,
    });
    await client.connect();
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.on('connect', () => console.log('connected to redis successfully'));
    return client;
  }

  /**
   * TODO: update the any to the RedisCommandArgument specified in `@redis/client/dist/lib/commands`
   */
  static async addToRedis(key: any, value: any, expiresIn: any) {
    try {
      const redisClient = await this.connection();
      return await redisClient.set(key, value, 'Ex', expiresIn || 60 * 60 * 24);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteFromRedis(key: any) {
    try {
      const redisClient = await this.connection();
      return redisClient.del(key);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getGromRedis(key: any) {
    try {
      const redisClient = await this.connection();
      return redisClient.get(key);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Redis;
