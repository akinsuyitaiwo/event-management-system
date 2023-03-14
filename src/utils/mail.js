let transporter;
const sendEmail = async (email, subject, message) => {
  //1. create a transporter
  transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: config.MAILTRAP_USER,
    pass: config.MAILTRAP_PASS
  }
  });

  const mailOptions = {
    from: config.SMTP_EMAIL,
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error.message, '>>>>');
    } else {
      console.log('Message Sent>>>');
    }
  });
};
module.exports = sendEmail;