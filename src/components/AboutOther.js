import { useEffect, useState, useRef } from "react";
import { useUser } from "./UserContext";
import { useParams } from "react-router-dom";

// import "../sample.css"

function About() {
    // const [user, setUser] = useState(null);
    // const { userRole, setUserRole } = useUser();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const [tempEmail, setTempEmail] = useState("");
    const [tempPhone, setTempPhone] = useState("");

    const { id } = useParams();
    console.log("idddd = ", id);
    // const [password, setPassword] = useState("raj123");

    const emailElement = useRef();
    const [edit, setEdit] = useState(false);

    function resetData() {
        setEmail(tempEmail);
        setPhone(tempPhone);
    }

    function handleEdit() {
        if (edit) {
            resetData();
        }

        setEdit((e) => !e);
    }

    async function editDetails() {
        if (!email && !phone) {
            return setError("Email/phone cannot be empty");
        }

        // const role = localStorage.getItem("role");
        const res = await fetch(`http://127.0.0.1:3000/admin/edit/${id}`, {
            method: "POST",
            body: JSON.stringify({
                email,
                name,
                phone,
            }),
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });

        if (!res.ok) {
            setEdit(false);
            return setError("Something went wrong. Try again.");
        }
        const d = await res.json();
        console.log("edit ========= ", d);
        window.location = "/user-data";
    }

    // load the user details
    useEffect(() => {
        async function fetchUser() {
            // const role = localStorage.getItem("role");
            const res = await fetch(`http://127.0.0.1:3000/admin/user/${id}`, {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                window.location = "/user-data";
                return;
            }

            const data = await res.json();

            console.log("data = ", data);
            if (data["user"]) {
                // setUser(data.user);

                setName(data["user"].name);
                setEmail(data["user"].email || "");
                setPhone(data["user"].phone || "");

                setTempEmail(data["user"].email || "");
                setTempPhone(data["user"].phone || "");
            }
        }
        fetchUser();

        // console.log(user)
    }, [id]);

    //focus the input when edit is on
    useEffect(
        function () {
            if (edit) {
                emailElement.current.focus();
            }
        },
        [edit]
    );

    //delete user
    async function handleDeleteUser() {
        try {
            const res = await fetch(
                `http://127.0.0.1:3000/admin/delete/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (!res.ok) {
                setError(data.message);
                return;
            }
            window.location = "/user-data";
        } catch (err) {
            setError(err);
        }
    }

    return (
        <section className="about">
            <div className="container">
                <div className="about-data">
                    <h1>User Info</h1>
                    <div className="about-content">
                        <div className="about__left">
                            <div className="img"></div>
                            <p>{name}</p>
                        </div>
                        <div className="about__right">
                            <div className="about__data">
                                <span className="label">Email</span>
                                <input
                                    className="label-data"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={!edit}
                                    ref={emailElement}
                                />
                            </div>
                            <div className="about__data">
                                <span className="label">Phone</span>
                                <input
                                    className="label-data"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={!edit}
                                />
                            </div>
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
                            {/* <div className="about__data">
                                <span className="label">Password</span>
                                <input
                                    className="label-data"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    disabled={!edit}
                                />
                            </div> */}
                        </div>
                    </div>

                    <div className="btn-control">
                        {!edit ? (
                            <button
                                className=""
                                style={{
                                    backgroundColor: "rgb(25, 100, 205)",
                                    color: "white",
                                    paddingInline: "25px",
                                    paddingBlock: "8px",
                                }}
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                        ) : (
                            <>
                                <button
                                    className="primary"
                                    style={{
                                        paddingInline: "25px",
                                        paddingBlock: "8px",
                                    }}
                                    onClick={handleEdit}
                                >
                                    Cancel
                                </button>
                                <button
                                    className=""
                                    style={{
                                        backgroundColor: "rgb(25, 100, 205)",
                                        color: "white",
                                        paddingInline: "25px",
                                        paddingBlock: "8px",
                                    }}
                                    onClick={editDetails}
                                    // onClick={handleEdit}
                                >
                                    Submit
                                </button>
                            </>
                        )}
                        <button onClick={handleDeleteUser}>Delete</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
