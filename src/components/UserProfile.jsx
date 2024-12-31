import  { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [userId]);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phoneNumber}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
    );
};

export default UserProfile;
