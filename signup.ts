import * as AWS from "aws-sdk";

// configure the AWS SDK with your AWS credentials
AWS.config.update({
  region: "us-west-2",
  accessKeyId: "your_access_key_id",
  secretAccessKey: "your_secret_access_key",
});

// create a new instance of the Cognito Identity service
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

// sign up a new user
const signUp = async (username: string, password: string, email: string) => {
  const params = {
    ClientId: "your_client_id",
    Password: password,
    Username: username,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  try {
    const data = await cognitoIdentityServiceProvider.signUp(params).promise();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// call the signUp function
signUp("user1", "password1", "user1@example.com");
