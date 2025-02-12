const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('@resend/client');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

const resend = new Resend(process.env.RESEND_API_KEY);

// Endpoint to handle form submission
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  

  const emailContent = `
    Name: ${name}
    Email: ${email}
    Message: ${message}
  `;

  try {
    const response = await resend.emails.send({
      from: email,
      to: 'g.quezada03@gmail.com',
      subject: 'New Contact Form Submission',
      text: emailContent
    });
    

    if (response.status === 'sent') {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});