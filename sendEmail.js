import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" }); // Load environment variables

export const sendEmail = async ({ email, subject, message }) => {
    try {
        // ✅ Debugging: Log SMTP credentials
        console.log("🔍 SMTP_EMAIL:", process.env.SMTP_EMAIL);
        console.log("🔍 SMTP_PASSWORD:", process.env.SMTP_PASSWORD ? "✅ Loaded" : "❌ Not Found");
        console.log("🔍 SMTP_HOST:", process.env.SMTP_HOST);
        console.log("🔍 SMTP_PORT:", process.env.SMTP_PORT);

        // ✅ Ensure credentials are loaded
        if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
            throw new Error("❌ Missing SMTP credentials. Check your config.env file!");
        }

        // ✅ Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT), // Ensure it's a number
            secure: false, // TLS
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // ✅ Email options
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: subject,
            text: message,
        };

        console.log("📨 Sending email...");
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email Sent Successfully! Message ID:", info.messageId);

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw new Error("Failed to send email: " + error.message);
    }
};
