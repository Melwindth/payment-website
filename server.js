const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

app.post('/send-receipt', async (req, res) => {
    const { email } = req.body;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password', // Use an app password
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Payment Receipt',
        text: 'Thank you for your payment of ₹100.',
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Receipt sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to send email.' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
