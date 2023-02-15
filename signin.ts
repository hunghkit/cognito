require("dotenv").config();

const AWS = require("./aws");

// create a new instance of the Cognito Identity service
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

// function to log in a user
const logIn = async (username, password) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.AWS_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const data = await cognitoIdentityServiceProvider.initiateAuth(params).promise();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// call the logIn function
logIn("tester1@yopmail.com", "Password#1");
