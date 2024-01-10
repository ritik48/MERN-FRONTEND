import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "./images/infinite-spinner.svg";
import GithubIcon from "./images/github.svg";

import NavBar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import About from "./components/About";
import UserList from "./components/UserData";
import AboutOther from "./components/AboutOther";

import { UserProvider } from "./components/UserContext";

function Home() {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const role = localStorage.getItem("role");
    // const { userRole, setUserRole } = useUser();

    useEffect(() => {
        async function fetchUser() {
            try {
                const role = localStorage.getItem("role");
                const res = await fetch(`/${role}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) {
                    window.location = "/login";
                    console.log("yesss");
                    return;
                }

                const data = await res.json();

                console.log("data = ", data);
                if (data[role]) {
                    setUser(data[role]);
                }
            } catch (err) {
                console.log("error in home = ", err);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    return (
        <section className="home">
            <div className="container">
                <div className="home__content">
                    {isLoading ? (
                        <img src={Spinner} alt="spin" className="spinner" />
                    ) : (
                        <>
                            <h1>
                                Welcome 🖐️, <u>{user?.name}</u>
                            </h1>
                            {role === "admin" && (
                                <button
                                    style={{ marginTop: "20px" }}
                                    onClick={() => {
                                        window.location = "/user-data";
                                    }}
                                >
                                    Employee Data
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <section className="footer">
            <div className="container">
                <a className="footer-content" href="https://github.com/ritik48" target="blank">
                    <div>Made by <u>Ritik</u></div>
                    <img src={ GithubIcon } alt="github" className="gicon"/>
                </a>
            </div>
        </section>
    )
}

function App() {
    if (!localStorage.getItem("role")) {
        localStorage.setItem("role", "user");
    }
    return (
        <>
            <UserProvider>
                <NavBar />
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/admin" element={<AdminLogin />} /> */}
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/user-data" element={<UserList />} />
                        <Route path="/user/:id" element={<AboutOther />} />
                    </Routes>
                </Router>
                <Footer />
            </UserProvider>
        </>
    );
}

export default App;
