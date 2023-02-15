require("dotenv").config();

const AWS = require("./aws");

// create a new instance of the Cognito Identity service
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

// function to confirm a new user
const confirmForgotPassword = async (username, password, confirmationCode) => {
  const params = {
    ClientId: process.env.AWS_CLIENT_ID,
    Username: username,
    Password: password,
    ConfirmationCode: confirmationCode,
  };

  try {
    const data = await cognitoIdentityServiceProvider
      .confirmForgotPassword(params)
      .promise();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// call the confirmForgotPassword function
confirmForgotPassword("tester1@yopmail.com", "Password#2", "758615");
