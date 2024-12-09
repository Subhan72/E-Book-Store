import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", formData);
            console.log("SignIn Response:", response.data);
            alert("Login successful!");
            navigate(`/home`);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.error("SignIn Error:", error.response?.data);
            alert(error.response?.data?.message || "Login failed.");
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Sign In</button>
            </form>
            <a onClick={() => navigate("/signup")}>Go to Sign Up</a>
        </div>
    );
};

export default SignIn;
