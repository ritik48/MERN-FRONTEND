import { useEffect, useState } from "react";
import "../sample.css";
import Spinner from "../images/infinite-spinner.svg";

function User({ id, name, email, phone }) {
    return (
        <div className="row">
            <div class="cell" data-title="Name">
                {name}
            </div>
            <div class="cell" data-title="Email">
                {email || "NA"}
            </div>
            <div class="cell" data-title="Phone">
                {phone || "NA"}
            </div>
            <div class="cell" data-title="Location">
                <button
                    className="primary"
                    onClick={() => (window.location = `/user/${id}`)}
                >
                    view
                </button>
            </div>
        </div>
    );
}

export default function UserList() {
    const [users, setUser] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            setIsLoading(true);

            try {
                const res = await fetch(
                    "https://mern-backend-bbv2.onrender.com/admin/user-list",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    return (window.location = "/");
                }

                const data = await res.json();
                setUser(data["user-list"]);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserData();
    }, []);

    return (
        <section className="user-list">
            <div className="container">
                <div className="table-wrapper">
                    {isLoading ? (
                        <img src={Spinner} alt="spin" className="spinner" />
                    ) : users.length > 0 ? (
                            <div class="wrapper">
                                <h1 style={{ color: "wheat", marginBlock: "30px" }}>
                        Employee details
                    </h1>
                            <div class="table">
                                <div class="row header">
                                    <div className="cell odd">Name</div>
                                    <div className="cell even">Email</div>
                                    <div className="cell odd">Phone</div>
                                    <div className="cell even">View</div>
                                </div>

                                {users.map(user => <User id = {user._id} name={user.name} email={user.email} phone={user.phone} key={user._id}/>)}
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: "white", fontSize: "2rem" }}>
                            No employees to display
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}
