import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import uploadImage from "../images/upload2.png";
// import "../sample.css"

function About() {
    // const [user, setUser] = useState(null);
    // const { userRole, setUserRole } = useUser();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [profile, setProfile] = useState();

    const [tempName, setTempName] = useState("");

    const { id } = useParams();
    console.log("idddd = ", id);
    // const [password, setPassword] = useState("raj123");

    const nameElement = useRef();
    const [edit, setEdit] = useState(false);

    function resetData() {
        setName(tempName);
    }

    function handleEdit() {
        if (edit) {
            resetData();
        }

        setEdit((e) => !e);
    }

    async function updateImage(file) {
        try {
            const formaData = new FormData();
            formaData.append("profile", file);

            const res = await fetch(
                `https://mern-backend-bbv2.onrender.com/admin/image/${id}`,
                {
                    method: "POST",
                    body: formaData,
                    credentials: "include",
                }
            );

            if (!res.ok) {
                return setError("Error updating image");
            }

            window.location = `/user/${id}`;
        } catch (err) {
            setError(err);
        }
    }

    async function editDetails() {
        if (!email && !phone) {
            return setError("Email/phone cannot be empty");
        }

        // const role = localStorage.getItem("role");
        const res = await fetch(
            `https://mern-backend-bbv2.onrender.com/admin/edit/${id}`,
            {
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
            }
        );

        if (!res.ok) {
            setEdit(false);
            return setError("Something went wrong. Try again.");
        }
        const d = await res.json();
        window.location = "/user-data";
    }

    // load the user details
    useEffect(() => {
        async function fetchUser() {
            const res = await fetch(
                `https://mern-backend-bbv2.onrender.com/admin/user/${id}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!res.ok) {
                window.location = "/user-data";
                return;
            }

            const data = await res.json();
            if (data["user"]) {
                // setUser(data.user);

                setName(data["user"].name);
                setEmail(data["user"].email || "");
                setPhone(data["user"].phone || "");
                setProfile(
                    `https://mern-backend-bbv2.onrender.com/images/${data["user"].image}`
                );

                setTempName(data["user"].name);
            }
        }
        fetchUser();

        // console.log(user)
    }, [id]);

    //focus the input when edit is on
    useEffect(
        function () {
            if (edit) {
                nameElement.current.focus();
            }
        },
        [edit]
    );

    //delete user
    async function handleDeleteUser() {
        try {
            const res = await fetch(
                `https://mern-backend-bbv2.onrender.com/admin/delete/${id}`,
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
                            <div className="image-container">
                                <img
                                    className="img"
                                    src={`${profile}`}
                                    alt="profile"
                                />
                                <img
                                    className="overlay-image"
                                    src={uploadImage}
                                    alt="overlay"
                                    onClick={() => {
                                        document
                                            .querySelector("#inptag")
                                            .click();
                                    }}
                                />
                                <input
                                    type="file"
                                    id="inptag"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        updateImage(e.target.files[0]);
                                    }}
                                />
                            </div>
                            <input
                                className="label-data"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!edit}
                                ref={nameElement}
                            />
                        </div>
                        <div className="about__right">
                            <div className="about__data">
                                <span className="label">Email</span>
                                <input
                                    className="label-data"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="about__data">
                                <span className="label">Phone</span>
                                <input
                                    className="label-data"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled
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
