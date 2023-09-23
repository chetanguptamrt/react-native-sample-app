const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    }
})

const sendEmail = async ({ to, subject, body }) => {
    try {
        transport.sendMail({
            from: process.env.SMTP_EMAIL,
            to: to,
            subject: subject,
            text: body,
        })
    } catch (err) {
        console.log('Error while sending mail: ', err)
    }
}

module.exports = {
    sendEmail,
}