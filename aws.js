require("dotenv").config();

const AWS = require("aws-sdk");

// configure the AWS SDK with your AWS credentials
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

module.exports = AWS;
