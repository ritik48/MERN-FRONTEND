import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

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
                        <h2>Loading...</h2>
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

function App() {
    // const [role, setRole] = useState("user");
    // if (!localStorage.getItem("role")) {
    //     localStorage.setItem("role", "user");
    // }
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
            </UserProvider>
        </>
    );
}

export default App;
