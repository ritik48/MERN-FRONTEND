import { useEffect, useState, useRef } from "react";
import uploadImage from "../images/upload2.png";
// import "../sample.css"

function About() {
    // const [user, setUser] = useState(null);
    // const { userRole, setUserRole } = useUser();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [profile, setProfile] = useState();

    const [error, setError] = useState("");
    // const [password, setPassword] = useState("raj123");

    const [tempName, setTempName] = useState("");

    const nameElement = useRef();
    const [edit, setEdit] = useState(false);

    function handleEdit() {
        if (edit) {
            setName(tempName);
        }

        setEdit((e) => !e);
    }

    // useEffect(() => {
    //     console.log("Files = ", file);
    // }, [file]);

    async function updateImage(file) {
        try {
            const role = localStorage.getItem("role");
            const formData = new FormData();
            formData.append("profile", file);
            const res = await fetch(`https://mern-backend-bbv2.onrender.com/${role}/image`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            if (!res.ok) {
                return setError(
                    "Something wentr wrong, while uploading the image."
                );
            }
            window.location = "/about";
        } catch (err) {
            setError("Something went wrong.");
        }
    }

    async function handleDeleteUser() {
        try {
            const role = localStorage.getItem("role");
            const res = await fetch(`https://mern-backend-bbv2.onrender.com/${role}/delete`, {
                method: "DELETE",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) {
                return setError(data.message);
            }
            window.location = "/";
        } catch (err) {
            return setError(err);
        }
    }

    async function editDetails() {
        if (!email && !phone) {
            return setError("Email/phone cannot be empty");
        }

        const role = localStorage.getItem("role");
        const res = await fetch(`https://mern-backend-bbv2.onrender.com/${role}/edit`, {
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
        window.location = "/";
    }

    // load the user details
    useEffect(() => {
        async function fetchUser() {
            const role = localStorage.getItem("role");
            const res = await fetch(`https://mern-backend-bbv2.onrender.com/${role}`, {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                window.location = "/login";
                return;
            }

            const data = await res.json();

            console.log("data = ", data);
            if (data[role]) {
                // setUser(data.user);

                setName(data[role].name);
                setEmail(data[role].email || "");
                setPhone(data[role].phone || "");
                setProfile(`https://mern-frontend-vert-one.vercel.app/images/${data[role].image}`);

                setTempName(data[role].name);
            }
        }
        fetchUser();

        // console.log(user)
    }, []);

    //focus the input when edit is on
    useEffect(
        function () {
            if (edit) {
                nameElement.current.focus();
            }
        },
        [edit]
    );

    return (
        <section className="about">
            <div className="container">
                <div className="about-data">
                    <h1>Personal Info</h1>
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
                                className="label-data name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!edit}
                                ref={nameElement}
                                style={{ width: "200px" }}
                            />
                        </div>
                        <div className="about__right">
                            <div className="about__data">
                                <span className="label">Email</span>
                                <input
                                    className="label-data"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="about__data">
                                <span className="label">Phone</span>
                                <input
                                    className="label-data"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
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
