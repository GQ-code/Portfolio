import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
    console.log("Received POST request to /send-email");

    const { name, email, message } = req.body;
    console.log("Request Body:", req.body);

    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "g_quezada3@yahoo.com",
            subject: `New Message from ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`
        });

        console.log("Resend API Response:", data);
        res.status(200).json({ success: true, message: "Email sent successfully", data });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));