import { useEffect, useState } from "react";
import "../sample.css";

function User({ id, name, email, phone }) {
    // return (
    //     <div className="user-item">
    //         <p>{id}</p>
    //         <p>{name}</p>
    //         <p>{email}</p>
    //         <p>{phone || "NA"}</p>
    //     </div>
    // );

    return (
        <tr>
            {/* <td>{id}</td> */}
            <td>{name}</td>
            <td>{email || "NA"}</td>
            <td>{phone || "NA"}</td>
            <td>
                <button
                    className="primary"
                    onClick={() => (window.location = `/user/${id}`)}
                >
                    view
                </button>
            </td>
        </tr>
    );
}

export default function UserList() {
    const [users, setUser] = useState([]);

    useEffect(() => {
        async function fetchUserData() {
            const res = await fetch("http://127.0.0.1:3000/admin/user-list", {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                return (window.location = "/");
            }

            const data = await res.json();
            setUser(data["user-list"]);
        }
        fetchUserData();
    }, []);

    return (
        <section className="user-list">
            <div className="container">
                <div className="table-wrapper">
                    <h1 style={{ color: "wheat", marginBlock: "30px" }}>
                        Employee details
                    </h1>
                    {users.length > 0 ? (
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    {/* <th>Id</th> */}
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>View</th>
                                    {/* <th>Header 5</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <User
                                        name={user.name}
                                        email={user.email}
                                        phone={user.phone}
                                        id={user._id}
                                        key={user._id}
                                    />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ color: "white", fontSize: "2rem" }}>
                            No employees to display
                        </p>
                    )}
                </div>

                {/* <div className="userlist-content"> */}
            </div>
        </section>
    );
}
