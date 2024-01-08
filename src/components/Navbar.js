import { useEffect, useState } from "react";
import { useUser } from "./UserContext";

function NavBar() {
    const [user, setUser] = useState(null);
    const { userRole, setUserRole } = useUser();

    useEffect(() => {
        async function fetchUser() {
            // console.log("nav = ", userRole)
            const role = localStorage.getItem("role");
            const res = await fetch(`http://127.0.0.1:3000/${role}`, {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                return;
            }

            const data = await res.json();

            console.log("data = ", data);
            if (data[role]) {
                setUser(data[role]);
            }
        }
        fetchUser();

        // console.log(user)
    }, []);

    async function handleLogout() {
        const role = localStorage.getItem("role");
        const res = await fetch(`http://127.0.0.1:3000/${role}/logout`, {
            method: "GET",
            credentials: "include",
        });

        if (res.ok) {
            window.location = "/login"
        }
        // if (res.ok) {
        //     setUser(null);
        //     window.location = "/login";
        // }
    }

    return (
        <nav>
            <div className="container">
                <div className="nav-content">
                    <div className="nav__left">
                        <h2 className="brand">XYZ Co.</h2>
                    </div>
                    <div className="nav__right">
                        {!user ? (
                            <>
                                <button
                                    className="primary"
                                    onClick={() => {
                                        window.location = "/login";
                                    }}
                                >
                                    Login
                                </button>
                                <button
                                    className="secondary"
                                    onClick={() => {
                                        window.location = "/signup";
                                    }}
                                >
                                    Signup
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="primary"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                                <div className="user-login" onClick={() => window.location = "/about"}>
                                    {user?.name[0]}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
