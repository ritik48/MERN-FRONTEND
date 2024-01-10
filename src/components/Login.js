import { useState } from "react";
import Spinner from "../images/infinite-spinner.svg";

function Login() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    // const { userRole, setUserRole } = useUser();

    async function handleAdminLogin() {
        // localStorage.setItem("role", "admin");
        try {
            setIsLoading(true);
            if (!phone && !email) {
                setError("Email/phone is required");
                return;
            }
            if (!password) {
                setError("password is required");
                return;
            }

            const res = await fetch(`https://mern-backend-bbv2.onrender.com/admin/login`, {
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
            // setUserRole("admin");
            localStorage.setItem("role", "admin");
            window.location = "/";
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleLogin() {
        try {
            setIsLoading(true);
            if (!phone && !email) {
                setError("Email/phone is required");
                return;
            }
            if (!password) {
                setError("password is required");
                return;
            }

            const res = await fetch(`https://mern-backend-bbv2.onrender.com/user/login`, {
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

            localStorage.setItem("role", "user");
            window.location = "/";
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    // async function handleAdminLogin() {
    //     if (!phone && !email) {
    //         console.log("yesssssssss");
    //         setError("Email/phone is required");
    //         return;
    //     }
    //     if (!password) {
    //         setError("password is required");
    //         return;
    //     }

    //     const res = await fetch("http://127.0.0.1:3000/admin/login", {
    //         method: "POST",
    //         credentials: "include",
    //         body: JSON.stringify(
    //             email
    //                 ? {
    //                       email: email,
    //                       password: password,
    //                   }
    //                 : { phone, password }
    //         ),
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //     });

    //     const data = await res.json();
    //     if (!res.ok) {
    //         return setError(data.message);
    //     }

    //     window.location = "/";
    // }

    return (
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    {isLoading ? (
                        <img src={Spinner} alt="spin" className="spinner" />
                    ) : (
                        <>
                            <h2>Login</h2>
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
                                    style={{
                                        color: "#02fa02",
                                        fontSize: "1.2rem",
                                    }}
                                    className="error"
                                >
                                    {error}
                                </p>
                            )}
                            <button className="primary" onClick={handleLogin}>
                                Login
                            </button>
                            <button
                                className="primary"
                                onClick={() => {
                                    handleAdminLogin(); // call via useEffect
                                }}
                            >
                                Login as Admin
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Login;
