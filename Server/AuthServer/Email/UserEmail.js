require('dotenv').config();
const nodemailer = require("nodemailer");

async function generateEmail(otp,email) {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.USER_ID,
      pass: process.env.USER_PASS,
    },
  });
  


  transporter.sendMail({
    from: '"Book App" sharma.amit20111@gmail.com', // sender address
    to: `${email}`, // list of receivers
    subject: "Reset Your Password ", // Subject line
    text: `Book App This is Your One Time Password (OTP)  ${otp} to reset your account password. The OTP is only valid foe next 5min`, 
    html: `<b>Book App This is Your One Time Password (OTP) : <mark>${otp}</mark> to reset your account password. The OTP is only valid for next 5min</b>`,
  }).then(info => {
    console.log('Email Send Success');
  }).catch(console.error);
}


module.exports = { generateEmail };