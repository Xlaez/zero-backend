import { config } from 'dotenv';
import path from 'path';
import Joi from 'joi';

config({ path: path.join(__dirname, '../../.env') });

const envSchema = Joi.object()
  .keys({
    MONGO_URI: Joi.string().required().description("MongoDB's URI"),
    REDIS_URI: Joi.string().required().description("Redis' URI"),
    CLOUDINARY_NAME: Joi.string().required().description('the name of cloudinary folder'),
    CLOUDINARY_API_KEY: Joi.string().required().description('cloudinary api key'),
    CLOUDINARY_SECRET_KEY: Joi.string().required().description('cloudinary secret key'),
    JWT_SECRET: Joi.string().default('00000000000000000-JWT-00000000000000000-SECRET').description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30000).description('minutes after which access tokens expire'),
  })
  .unknown();

const { value: envVars, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) throw new Error(`DolphApp cofig validation error: ${error.message}`);

const configs = {
  mongoose: {
    url: envVars.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    },
  },
  redis: {
    url: envVars.REDIS_URI,
  },
  cloudinary: {
    cloud_name: envVars.CLOUDINARY_NAME,
    api_key: envVars.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY_SECRET_KEY,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    duration: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },
};

export { configs };

export const { PORT, ENV } = process.env;
