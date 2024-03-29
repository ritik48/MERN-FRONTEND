import { useState } from "react";
import Spinner from "../images/infinite-spinner.svg";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [image, setImage] = useState();

    const [file, setFile] = useState();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSignup() {
        try {
            setIsLoading(true);
            if (!email && !phone) {
                return setError("Email/Phone cannot be empty");
            }

            if (!password) {
                return setError("Password cannot be empty");
            }
            localStorage.setItem("role", "user");

            const formData = new FormData();
            formData.append("profile", file);

            if (email) {
                formData.append("email", email);
            }
            if (phone) {
                formData.append("phone", phone);
            }

            formData.append("name", name);
            formData.append("password", password);

            const res = await fetch("https://mern-backend-bbv2.onrender.com/user/signup", {
                method: "POST",
                body: formData,
                credentials: "include",
                // headers: {
                //     "Content-type": "application/json",
                // },
            });

            const data = await res.json();
            if (!res.ok) {
                return setError(data.message);
            }
            // console.log("create = ", data);
            setImage(`https://mern-backend-bbv2.onrender.com/images/${data.user.image}`);
            window.location = "/about";
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="signup">
            <div className="container">
                <div className="signup-content">
                    {isLoading ? (
                        <img className="spinner" src={Spinner} alt="loading" />
                    ) : (
                        <>
                            <h2>Create account</h2>
                            {image && (
                                <img
                                    style={{
                                        width: "80px",
                                        borderRadius: "50%",
                                    }}
                                    src={`${image}`}
                                    alt="profile"
                                />
                            )}
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
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
                                <p
                                    style={{
                                        color: "#02fa02",
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    {error}
                                </p>
                            )}
                            <button className="primary" onClick={handleSignup}>
                                Signup
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default SignUp;
