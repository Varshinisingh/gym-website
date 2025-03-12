import axios from "axios";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMail = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(
                "http://localhost:5000/send/mail", // 🔹 Ensure this matches your backend
                { name, email, message },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            toast.success(data.message);
            setName("");
            setEmail("");
            setMessage("");
        } catch (error) {
            console.error("❌ Email Sending Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact">
            <form onSubmit={sendMail}>
                <h1>CONTACT US</h1>
                <div>
                    <label>Name</label>
                    <input 
                        type="text"  
                        value={name}  
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Message</label>
                    <textarea 
                        value={message}  
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px" }}>
                    {loading && <ClipLoader size={20} color="white" />}  
                    Send Message
                </button>
            </form>
        </section>
    );
};

export default Contact;
