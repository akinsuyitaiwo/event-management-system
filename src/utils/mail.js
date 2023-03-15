const nodemailer = require('nodemailer');
let transporter;
const sendEmail = async (email, subject, message) => {
  //1. create a transporter
  transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: subject,
    text: message,
  };
  
  return transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error.message, '>>>>');
        } else {
      console.log('Message Sent' + info.response);
    }
  });
};
module.exports = sendEmail;