import { useEffect, useState } from "react";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin() {
        if (!phone && !email) {
            setError("Email/phone is required");
            return;
        }
        if (!password) {
            setError("password is required");
            return;
        }

        const res = await fetch("http://127.0.0.1:3000/admin/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(
                email
                    ? {
                          email: email,
                          password: password,
                      }
                    : { phone, password }
            ),
            headers: {
                "Content-type": "application/json",
            },
        });

        const data = await res.json();
        if (!res.ok) {
            return setError(data.message);
        }

        window.location = "/";
    }

    return (
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <h2>Login as Admin</h2>
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
                        <p
                            style={{ color: "#02fa02", fontSize: "1.2rem" }}
                            className="error"
                        >
                            {error}
                        </p>
                    )}
                    <button className="primary" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </section>
    );
}

export default AdminLogin;
