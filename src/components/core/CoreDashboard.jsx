import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom'; // Import NavLink for navigation
import axiosInstance from '../../api/axiosInstance'; 
// import '../../styles/dashboard.css'; // Add CSS for styling

const CoreDashboard = () => {
    const {  role, department, _id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axiosInstance.get(
                    `/user/core/${role}/${department}/dashboard/${_id}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
                );
                setUser(data.user);
            } catch (err) {
                setError('Failed to fetch user data.');
                console.error(err); // For debugging
            }
        };

        // fetchUserData();

        // TESTING
        setUser({
            name: 'Tanmay Makode',
            email: 'randomemail@gmail.com',
            phone: '1234567890',
            department: 'hospitality',
            userType: 'core',
            role: 'student',
            createdAt: '2023-10-01T00:00:00Z',
            photo: 'https://via.placeholder.com/150'
        });
    }, [ role, department, _id]);

    return (
        <div className="dashboard-container">
            <h2>{role.toUpperCase()} </h2>

            {/* Navbar with links to profile and tasks */}
            <nav className="navbar">
                <NavLink to={`/user/profile/${_id}`} activeClassName="active">Profile</NavLink>
                <NavLink to={`/user/tasks/${_id}`} activeClassName="active">Tasks</NavLink>
                <NavLink to={`/user/notifications/${_id}`} activeClassName="active">Notifications</NavLink>
            </nav>

            <div className="content">
                {error ? (
                    <p>{error}</p>
                ) : user ? (
                    <p>Welcome, {user.name}!</p> // Display welcome message
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </div>
    );
};

export default CoreDashboard;
