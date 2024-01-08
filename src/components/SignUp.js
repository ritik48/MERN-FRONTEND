import { useState, useEffect } from "react";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSignup() {
        if (!email && !phone) {
            return setError("Email/Phone cannot be empty");
        }

        if (!password) {
            return setError("Password cannot be empty");
        }
        localStorage.setItem("role", "user");
        const res = await fetch("http://127.0.0.1:3000/user/signup", {
            method: "POST",
            body: JSON.stringify(
                email
                    ? {
                          name,
                          email,
                          password,
                      }
                    : { name, phone, password }
            ),
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });

        const data = await res.json();
        if (!res.ok) {
            return setError(data.message);
        }
        console.log("create = ", data);
        window.location = "/about";
    }

    return (
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <h2>Create account</h2>
                    <input
                        placeholder="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Phone"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <p style={{ color: "#02fa02", fontSize: "1.2rem" }}>
                            {error}
                        </p>
                    )}
                    <button className="primary" onClick={handleSignup}>
                        Signup
                    </button>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
