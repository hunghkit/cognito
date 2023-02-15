require("dotenv").config();

const AWS = require("./aws");

// create a new instance of the Cognito Identity service
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

// function to confirm a new user
const resendConfirmationCode = async (username) => {
  const params = {
    ClientId: process.env.AWS_CLIENT_ID,
    Username: username,
  };

  try {
    const data = await cognitoIdentityServiceProvider
      .resendConfirmationCode(params)
      .promise();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// call the resendConfirmationCode function
resendConfirmationCode("tester2@yopmail.com");
