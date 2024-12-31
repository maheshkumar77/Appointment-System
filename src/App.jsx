import {  Routes, Route } from "react-router-dom";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";

function App() {
    return (
       
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-8">Appointment System</h1>
                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="/create" element={<UserForm />} />
                    <Route path="/user/:userId" element={<UserProfile />} />
                </Routes>
            </div>
       
    );
}

export default App;