// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');

// interface MailOptions {
//   from: string;
//   to: string;
//   subject: string;
//   text: string;
//   html?: string;
// }

const sendMail = async (mailOptions: any) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.MY_GMAIL_HOST || 'smtp.gmail.com',
			port: process.env.MY_GMAIL_PORT || 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: process.env.MY_GMAIL,
				pass: process.env.MY_GMAIL_PASSWORD,
			},
		});

		const info = await transporter.sendMail(mailOptions);
		console.log('Message sent: %s', info.messageId);
	} catch (error) {
		console.error('Error sending email:', error);
	}
};

module.exports = sendMail;
