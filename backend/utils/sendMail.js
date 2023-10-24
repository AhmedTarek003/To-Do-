const nodemailer = require("nodemailer");

const sendMail = async (email, subject, Html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GOOGLE_KEY,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject: subject,
      html: Html,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("nodemailer error");
  }
};

module.exports = sendMail;
