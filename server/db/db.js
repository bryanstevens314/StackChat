const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL ||
  'postgres://qiwmdbxvaumfcf:77f65e9fd4eecdf4e953afbcc68ae59ed40068611b38c0c217b39facb42ba439@ec2-107-20-173-2.compute-1.amazonaws.com:5432/d6pth6ebaf7lc8', {
    logging: false
  }
);
module.exports = db;
