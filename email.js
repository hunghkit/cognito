require("dotenv").config();
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

const AWS = require("./aws");

// create a new instance of the Cognito Identity service
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const ses = new AWS.SES({ apiVersion: "2010-12-01" });
const templateDataPath = path.join(
  __dirname,
  "email-templates",
  "inviation",
  "index.html"
);

const email = 'srmtester1@yopmail.com';
const confirmationUrl = "https://supplyz-fashion-dev.com";
const emailData = {
  email,
  url: confirmationUrl,
};

const source = fs.readFileSync(templateDataPath, {
  encoding: "utf-8",
});
const template = handlebars.compile(source);
const html = template(emailData);

const fromEmailAddress = process.env.FROM_EMAIL;
const smtpHost = process.env.STMP_HOST ?? "";
const smtpPort = parseInt(process.env.STMP_PORT ?? "587", 10);
const smtpUser = process.env.STMP_USER ?? "";
const smtpPassword = process.env.STMP_PASSWORD ?? "";

const smtpTransport = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});

  const updatedData = {
    to: email,
    html,
    from: fromEmailAddress,
    subject: "[SRM] Invitation to Tenant - Save the Date!",
  };

  smtpTransport
    .sendMail(updatedData)
    .then((result) => {
      console.log("Email sent:", result);
    })
    .catch((err) => {
      console.log(err, err.stack);
    });

    // const params = {
//   Destination: {
//     ToAddresses: ["srmtester1@yopmail.com", "supplyz.delivery@gmail.com"],
//   },
//   Message: {
//     Body: {
//       Text: {
//         Data: html,
//       },
//     },
//     Subject: {
//       Data: "[SRM] Invitation to Tenant - Save the Date!",
//     },
//   },
//   Source: "supplyz.delivery@gmail.com",
// };

// ses.sendEmail(params, function (err, data) {
//   if (err) {
//     console.log(err, err.stack);
//   } else {
//     console.log("Email sent:", data);
//   }
// });

// // function to change a user's email address
// const changeEmail = async (username, newEmail) => {
//   const params = {
//     UserPoolId: process.env.AWS_CLIENT_USER_POOL,
//     Username: username,
//     UserAttributes: [
//       { Name: "email", Value: newEmail },
//       { Name: "email_verified", Value: "true" },
//     ],
//   };

//   try {
//     const data = await cognitoIdentityServiceProvider
//       .adminUpdateUserAttributes(params)
//       .promise();
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// };
