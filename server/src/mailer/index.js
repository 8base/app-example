var nodemailer = require('nodemailer');

const GMAIL_USER = '8base.app.example@gmail.com';
const GMAIL_PASSWORD = 'oBiiQicRJmUDMXY>VdtW^6M';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASSWORD,
  },
});

const sendMail = async(mailOptions) => new Promise((resolve, reject) => {
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

module.exports = {
  sendMail,
  GMAIL_USER,
};