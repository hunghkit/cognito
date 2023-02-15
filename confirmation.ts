require("dotenv").config();

const AWS = require("./aws");

// create a new instance of the Cognito Identity service
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

// function to confirm a new user
const confirmUser = async (username, confirmationCode) => {
  const params = {
    ClientId: process.env.AWS_CLIENT_ID,
    ConfirmationCode: confirmationCode,
    Username: username,
  };

  try {
    const data = await cognitoIdentityServiceProvider.confirmSignUp(params).promise();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// call the confirmUser function
confirmUser("tester2@yopmail.com", "156575");
