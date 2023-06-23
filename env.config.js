import dotenv from 'dotenv';

dotenv.config();
export const {
  PORT = 3000,
  DB_URI = 'mongodb://localhost:27017/mestodb',
} = process.env;
