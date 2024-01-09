import { useEffect, useState } from "react";

function NavBar() {
    const [user, setUser] = useState(null);

    const currentPage = window.location.pathname;

    useEffect(() => {
        async function fetchUser() {
            // console.log("nav = ", userRole)
            try {
                const role = localStorage.getItem("role");
                const res = await fetch(`/${role}`, {
                    method: "GET",
                    credentials: "include",
                });
    
                const data = await res.json();
    
                console.log("data = ", data);
                if (!res.ok) {
                    return;
                }
    
                if (data[role]) {
                    setUser(data[role]);
                }
            } catch (error) {
                console.log(localStorage.getItem("role"))
                console.log("Nav bar error = ",error)
            }
           
        }
        fetchUser();

        // console.log(user)
    }, []);

    async function handleLogout() {
        const role = localStorage.getItem("role");
        const res = await fetch(`/${role}/logout`, {
            method: "GET",
            credentials: "include",
        });

        if (res.ok) {
            window.location = "/login";
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
                        <h2
                            className="brand"
                            onClick={() => {
                                window.location = "/";
                            }}
                        >
                            XYZ Co.
                        </h2>

                        {user?.role === "Admin" && (
                            <button
                                className={`nav-link ${currentPage === '/user-data' ? 'selected' : ''}`}
                                onClick={() => {
                                    window.location = "/user-data";
                                }}
                            >
                                User List
                            </button>
                        )}
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
                                <div
                                    className="user-login"
                                    onClick={() => (window.location = "/about")}
                                >
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
