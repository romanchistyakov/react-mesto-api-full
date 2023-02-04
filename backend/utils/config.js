require('dotenv').config();

const {
  JWT_SECRET,
  MONGO_URL,
  NODE_ENV,
} = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
  MONGO_URL: NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/mestodb',
};
