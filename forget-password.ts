require("dotenv").config();

const AWS = require("./aws");

// create a new instance of the Cognito Identity service
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

// function to confirm a new user
const forgotPassword = async (username) => {
  const params = {
    ClientId: process.env.AWS_CLIENT_ID,
    Username: username,
  };

  try {
    const data = await cognitoIdentityServiceProvider
      .forgotPassword(params)
      .promise();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// call the forgotPassword function
forgotPassword("htester3@yopmail.com");
