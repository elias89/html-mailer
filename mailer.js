/**
 * TODO: So far for testing this just support Outlook accounts as email sender service.
 * E.G: Gmail is far more secure and does not allow password only based access by default which is great
 * but as I mentioned this is just for personal use, will probably add more services in the future. Feel
 * free to contribute here.
 * Receiver can be any email client of course.
 */

const nodemailer = require("nodemailer");
const config = require('./config.json');

module.exports = async function sendMail(html, emailTo) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
        user: config.emailFrom,
        pass: config.password
    },
    tls: {
        ciphers:'SSLv3'
    }

  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${config.subject} <${config.emailFrom}>`, // sender address
    to: emailTo, // list of receivers
    subject: config.subject, // Subject line
    text: "Text part", // plain text body
    html: html, // html body
  });

  console.log("Message sent to:", emailTo);
};
