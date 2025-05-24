import React, { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { io } from 'socket.io-client';
import { Bell, User, CheckSquare, Menu, X, LogOut, Users, Clipboard } from 'lucide-react';
import Volunteers from './VolunteersNew';
import Executives from './ExecutivesNew';
import Allocations from '../AllocationsNew';
import Tasks from '../TasksNew';
import Notifications from '../NotificationsNew';

const NonCoreDashboard = () => {
    const { role, department, _id } = useParams();
    const [user, setUser] = useState();
    const [error, setError] = useState('');
    const [unreadCount, setUnreadCount] = useState(0);
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showPage, setShowPage] = useState('tasks');
    const [showNotificationPopup, setShowNotificationPopup] = useState(false);


    // UNCOMMENT THIS WHEN TESTING & WHEN WANT DUMMY DATA
    // useEffect(() => {
    //     // Simulating data fetch
    //     setUser({
    //         name: 'Tanmay Makode',
    //         email: 'randomemail@gmail.com',
    //         phone: '1234567890',
    //         department: 'hospitality',
    //         userType: 'non_core',
    //         role: 'volunteer',
    //         createdAt: '2023-10-01T00:00:00Z',
    //         photo: '/api/placeholder/150/150'
    //     });
    // }, []);


    useEffect(() => {
        const socket = io('http://localhost:5000', { transports: ['websocket'] });
        socket.emit('joinRoom', _id);  // Join the user-specific room

        const fetchUserData = async () => {
            try {
                const { data } = await axiosInstance.get(
                    `/user/non_core/${role}/${department}/dashboard/${_id}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
                );
                setUser(data.user);
            } catch (err) {
                setError('Failed to fetch user data.');
                console.error(err);
            }
        };

        const fetchUnreadNotifications = async () => {
            try {
                const { data } = await axiosInstance.get(`/user/notifications/${_id}`);
                setUnreadCount(data.unreadNotifications.length);
            } catch (err) {
                console.error('Failed to fetch unread notifications count:', err);
            }
        };

        fetchUserData();
        fetchUnreadNotifications();

        socket.on('unreadCount', () => {
            setUnreadCount(prevCount => prevCount + 1);
        });

        return () => {
            socket.disconnect();
        };
    }, [role, department, _id]);

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/auth/logout', {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });

            localStorage.removeItem('accessToken');
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
            setError('Logout failed. Please try again.');
        }
    };

    const renderNavLinks = () => (
        <>
            {role !== 'volunteer' && (
                <>
                    <button onClick={() => setShowPage('volunteers')} className="flex w-full items-center px-4 py-3 mb-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                        <Users size={20} className="mr-3" />
                        <span>Volunteers</span>
                    </button>
                    <button onClick={() => setShowPage('allocations')} className="flex w-full items-center px-4 py-3 mb-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                        <Clipboard size={20} className="mr-3" />
                        <span>Allocations</span>
                    </button>
                </>
            )}
            {role !== 'executive' && role !== 'volunteer' && (
                <button onClick={() => setShowPage('executives')} className="flex w-full items-center px-4 py-3 mb-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                    <Users size={20} className="mr-3" />
                    <span>Executives</span>
                </button>
            )}
        </>
    );

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-red-600">Error</h2>
                    <p className="mt-2 text-gray-700">{error}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
                    <div className="w-16 h-16 mt-4 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar - Desktop */}
            <div className="hidden md:flex md:flex-col md:w-64 bg-gray-900 text-white">
                <div className="flex items-center justify-center h-20 border-b border-gray-800">
                    <div className="text-center">
                        <h1 className="text-xl font-bold">Event Dashboard</h1>
                        <p className="text-sm text-gray-400 capitalize">{department} Department</p>
                    </div>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <nav className="px-2 py-4">
                        <div className="mb-8">
                            <div className="flex items-center px-4 py-2">
                                <div className="relative">
                                    <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full" />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium">{user.name}</p>
                                    <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                                </div>
                            </div>
                        </div>
                        <a href={`/user/profile/${_id}`} className="flex items-center px-4 py-3 mb-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                            <User size={20} className="mr-3" />
                            <span>Profile</span>
                        </a>
                        <a onClick={() => setShowPage('tasks')} className="cursor-pointer flex items-center px-4 py-3 mb-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                            <CheckSquare size={20} className="mr-3" />
                            <span>Tasks</span>
                        </a>
                        {renderNavLinks()}
                        <div className="mt-8 pt-4 border-t border-gray-800">
                            <button onClick={handleLogout} className="flex w-full items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                                <LogOut size={20} className="mr-3" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile menu overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={toggleMenu}></div>
                    <div className="fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white">
                        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-800">
                            <div>
                                <h1 className="text-xl font-bold">Event Dashboard</h1>
                                <p className="text-sm text-gray-400 capitalize">{department} Department</p>
                            </div>
                            <button onClick={toggleMenu} className="p-1 rounded-md text-gray-300 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="px-2 py-4">
                            <div className="mb-8">
                                <div className="flex items-center px-4 py-2">
                                    <div className="relative">
                                        <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full" />
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                                    </div>
                                </div>
                            </div>
                            <a href={`/user/profile/${_id}`} className="flex items-center px-4 py-3 mb-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                                <User size={20} className="mr-3" />
                                <span>Profile</span>
                            </a>
                            <a href={`/user/tasks/${_id}`} className="flex items-center px-4 py-3 mb-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                                <CheckSquare size={20} className="mr-3" />
                                <span>Tasks</span>
                            </a>
                            <a href={`/user/notifications/${_id}`} className="flex items-center px-4 py-3 mb-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white relative">
                                <Bell size={20} className="mr-3" />
                                <span>Notifications</span>
                                {unreadCount > 0 && (
                                    <span className="absolute right-4 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                                        {unreadCount}
                                    </span>
                                )}
                            </a>
                            {renderNavLinks()}
                            <div className="mt-8 pt-4 border-t border-gray-800">
                                <button onClick={handleLogout} className="flex w-full items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                                    <LogOut size={20} className="mr-3" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                {/* Top Navigation */}
                <header className="bg-white shadow">
                    <div className="flex items-center justify-between px-4 py-4 md:px-6">
                        <div className="flex items-center">
                            <button onClick={toggleMenu} className="p-1 mr-3 rounded-md md:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                                <Menu size={24} />
                            </button>
                            <div>
                                <h2 className="text-lg font-medium text-gray-900 capitalize">{role} Dashboard</h2>
                                <p className="text-sm text-gray-500 capitalize">{department} Department</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className='mr-4 h-fit relative w-fit'>
                                <button onClick={() => setShowNotificationPopup(!showNotificationPopup)} className="p-2.5 text-gray-500 rounded-full hover:bg-gray-100 relative">
                                    <Bell size={20} />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                {showNotificationPopup && (
                                    <div className='absolute w-[400px] max-md:w-[300px] top-10 -right-14 bg-white p-3 rounded-xl'>
                                        <Notifications _id={_id} />
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}!</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard | Member since {formatDate(user.createdAt)}
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                                    <CheckSquare size={24} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Tasks</p>
                                    <p className="text-lg font-semibold text-gray-900">7</p>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="w-full h-2 bg-gray-200 rounded-full">
                                    <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">75% complete</p>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-green-100 text-green-500">
                                    <Users size={24} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Team Size</p>
                                    <p className="text-lg font-semibold text-gray-900">8</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                                    <Bell size={24} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Notifications</p>
                                    <p className="text-lg font-semibold text-gray-900">{unreadCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
                                    <Clipboard size={24} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Allocations</p>
                                    <p className="text-lg font-semibold text-gray-900">4</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        {showPage === 'tasks' && (
                            <Tasks _id={_id} />
                        )}
                        {showPage === 'volunteers' && (
                            <Volunteers _id={_id} department={department} />
                        )}
                        {showPage === 'executives' && (
                            <Executives _id={_id} department={department} />
                        )}
                        {showPage === 'allocations' && (
                            <Allocations _id={_id} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NonCoreDashboard;
