require("dotenv").config();

const AWS = require("./aws");
// create a new instance of the Cognito Identity service
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

// sign up a new user
const signUp = async (password, email) => {
  const params = {
    ClientId: process.env.AWS_CLIENT_ID,
    Password: password,
    Username: email,
    UserAttributes: [{ Name: "email", Value: email }],
  };

  try {
    const data = await cognitoIdentityServiceProvider.signUp(params).promise();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// call the signUp function
signUp("Password#1", "htester2@yopmail.com");
