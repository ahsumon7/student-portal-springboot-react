import React, { useState } from "react";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        // Validate email and phone number (basic validation)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const phoneRegex = /^[0-9]{11}$/;

        if (!emailRegex.test(email)) {
            setMessage("Please enter a valid email.");
            return;
        }

        if (!phoneRegex.test(mobileNumber)) {
            setMessage("Please enter a valid 10-digit mobile number.");
            return;
        }

        try {
            const requestData = { username, password, email, mobileNumber, address };
            console.log("Sending data:", requestData); // Debugging line

            // Send registration request to the backend
            const response = await axios.post(
                "http://localhost:9192/api/register",
                requestData,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Response data:", response.data); // Debugging line
            setMessage("User registered successfully!"); // Success message
        } catch (error) {
            console.error("Error:", error); // Log full error for debugging

            // Check if error response exists and extract message
            if (error.response) {
                const errorMessage = error.response.data || "User registration failed. Please try again.";

                // Specific case for "Username already exists"
                if (error.response.data === "Username already exists!") {
                    setMessage("Username already exists! Please choose a different username.");
                } else {
                    setMessage(errorMessage); // Display other backend error messages
                }
            } else {
                // Handle network or other errors
                setMessage("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>} {/* Display error/success message */}
        </div>
    );
}

export default Register;
