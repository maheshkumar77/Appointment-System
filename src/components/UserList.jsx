import  { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-4">Users List</h2>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="p-2 border-b">Name</th>
                        <th className="p-2 border-b">Email</th>
                        <th className="p-2 border-b">Phone</th>
                        <th className="p-2 border-b">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="p-2 border-b">{user.name}</td>
                            <td className="p-2 border-b">{user.email}</td>
                            <td className="p-2 border-b">{user.phoneNumber}</td>
                            <td className="p-2 border-b">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
