require("dotenv").config();

const AWS = require("./aws");

// create a new instance of the Cognito Identity service
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

// function to change a user's email address
const changeEmail = async (username, newEmail ) => {
  const params = {
    UserPoolId: process.env.AWS_CLIENT_USER_POOL,
    Username: username,
    UserAttributes: [
      { Name: "email", Value: newEmail, },
      { Name: "email_verified", Value: "true"},
    ],
  };

  try {
    const data = await cognitoIdentityServiceProvider
      .adminUpdateUserAttributes(params)
      .promise();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// call the changeEmail function
changeEmail("tester1@yopmail.com", "tester2@yopmail.com");
