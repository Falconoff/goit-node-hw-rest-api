const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  const email = { ...data, from: "sokolov@meta.ua" };
  try {
    await sgMail.send(email);
  } catch (error) {
    throw error;
  }
};

// const email = {
//   to: "jolid37009@hekarro.com",
//   from: "sokolov@meta.ua",
//   subject: "New letter",
//   html: "<h1>Hello!</h1><h2>How are you?</h2><p>We have a new contact!</p><p><b>It's amazing!!!</b></p>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email send success"))
//   .catch(error => console.log(error.message));

module.exports = sendEmail;
