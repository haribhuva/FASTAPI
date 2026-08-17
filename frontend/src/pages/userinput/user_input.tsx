import "./user_input.css";
import HomePage from "../homepage/homepage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { greetUser } from "../../api/api";

function UserInput() {
    const [name, setName] = useState("");
    const [greeting, setGreeting] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!name.trim()) {
            return;
        }

        try {
            const response = await greetUser(name);
            setGreeting(response.message);
        } catch (error) {
            console.error("Error fetching greeting:", error);
        }
    };

    return (
        <div className="user-input-page">
            <nav className="navbar">
                <h2 className="logo">FastAPI Testing Input</h2>

                <div className="nav-links">
                    <button onClick={() => navigate("/")}>
                        Home
                    </button>

                    <button onClick={() => navigate("/user-input")}>
                        Testing Inputs
                    </button>
                </div>
            </nav>

            <main id="testing" className="user-input-content">
                <h1>Testing Inputs</h1>
                <p>Enter your input below:</p>

                <input
                    type="text"
                    placeholder="Type something..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button onClick={handleSubmit}>
                    Submit
                </button>

                {greeting && (
                    <p className="greeting">
                        {greeting}
                    </p>
                )}
            </main>
        </div>
    );
}

export default UserInput;