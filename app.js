import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sendEmail } from "./units/sendEmail.js"; // Ensure the correct path

dotenv.config({ path: "./config.env" }); // ✅ Load environment variables

// ✅ Debugging: Check if .env file is loaded correctly
console.log("🔍 Loaded Environment Variables:");
console.log("🔹 SMTP_EMAIL:", process.env.SMTP_EMAIL || "❌ Not Found");
console.log("🔹 SMTP_PASSWORD:", process.env.SMTP_PASSWORD ? "✅ Loaded" : "❌ Not Found");
console.log("🔹 SMTP_HOST:", process.env.SMTP_HOST || "❌ Not Found");
console.log("🔹 SMTP_PORT:", process.env.SMTP_PORT || "❌ Not Found");
console.log("🔹 FRONTEND_URL:", process.env.FRONTEND_URL || "❌ Not Found");

const app = express();

// ✅ Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["POST"],
    credentials: true,
}));
app.use(express.json());  // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data

// ✅ Debugging Middleware (Log Incoming Requests)
app.use((req, res, next) => {
    console.log(`📩 Incoming Request: ${req.method} ${req.url}`);
    console.log("📩 Request Body:", req.body);
    next();
});

// 📌 **Email Sending Route**
app.post("/send/mail", async (req, res) => {
    try {
        console.log("📩 /send/mail route hit! Request received.");
        console.log("📨 Request Body:", req.body); // Log request data

        const { name, email, message } = req.body;

        // ✅ Validate request body
        if (!name || !email || !message) {
            console.log("❌ Missing fields in request body!");
            return res.status(400).json({
                success: false,
                message: "Please provide all details: name, email, and message.",
            });
        }

        // ✅ Debugging: Check if SMTP credentials are loaded before sending email
        console.log("🔍 Checking SMTP Credentials:");
        console.log("SMTP_EMAIL:", process.env.SMTP_EMAIL || "❌ Not Found");
        console.log("SMTP_PASSWORD:", process.env.SMTP_PASSWORD ? "✅ Loaded" : "❌ Not Found");
        console.log("SMTP_HOST:", process.env.SMTP_HOST || "❌ Not Found");
        console.log("SMTP_PORT:", process.env.SMTP_PORT || "❌ Not Found");

        if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
            console.error("❌ SMTP credentials missing! Check your config.env file.");
            return res.status(500).json({
                success: false,
                message: "Server error: SMTP credentials are missing. Contact support.",
            });
        }

        console.log("📨 Calling sendEmail function...");
        await sendEmail({
            email: "varshinisingh328@gmail.com", // Your receiving email
            subject: "GYM WEBSITE CONTACT",
            message: `📩 Contact Form Submission\n\n👤 Name: ${name}\n📧 Email: ${email}\n\n📝 Message:\n${message}`,
        });

        console.log("✅ Email Sent Successfully!");
        return res.status(200).json({
            success: true,
            message: "Email sent successfully!",
        });

    } catch (error) {
        console.error("❌ Email sending error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send email. Please try again later.",
            error: error.message || "Unknown error",
        });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
