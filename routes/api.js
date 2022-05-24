var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer')

router.post('/contacto', async function (req, res, next) {

    const mail = {
        to: 'damianzampini@gmail.com',
        subject: 'prueba',
        html: ''
    }
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail(mail)

    res.status(201).json({
        error: false,
        message: 'Mensaje Enviado'
    });
});

    
module.exports = router;