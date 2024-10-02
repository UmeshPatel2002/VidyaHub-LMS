import nodemailer from "nodemailer";

const sendEmail = async function (email, subject, message) {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465', // true for 465 (SSL), false for other ports (TLS)
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL, // sender address
      to: email, // recipient email
      subject: subject, // Subject line
      html: message, // html body
    });

    console.log(`Email sent successfully to ${email}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    throw new Error('Email could not be sent'); // rethrow to handle it at a higher level if needed
  }
};

export default sendEmail;
