const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.from = `Perfume Store <${process.env.EMAIL_FROM}>`;
  }
  
  async send(template, subject) {
    // Send email logic
  }
};