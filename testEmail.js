import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "./config.env" });

const sendTestEmail = async () => {
    try {
        console.log("📨 Starting test email...");

        // ✅ Create transporter
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // true for 465, false for 587
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // ✅ Send test email
        let info = await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: "your-email@example.com", // Change to your email
            subject: "✅ Test Email from Nodemailer",
            text: "Hello! This is a test email from your Node.js app.",
        });

        console.log("✅ Test email sent successfully:", info.messageId);
    } catch (error) {
        console.error("❌ Error sending test email:", error);
    }
};

// Run the function
sendTestEmail();
