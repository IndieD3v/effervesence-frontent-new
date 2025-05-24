import React, { useEffect, useState } from 'react';
import { Bell, User, CheckSquare, Users, Calendar, Settings, Menu, X, PieChart, BarChart, FileText, UserPlus } from 'lucide-react';

const CoreDashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const role = 'student';
    const department = 'hospitality';
    const _id = '123456';

    useEffect(() => {
        // Simulating data fetch
        setUser({
            name: 'Tanmay Makode',
            email: 'randomemail@gmail.com',
            phone: '1234567890',
            department: 'hospitality',
            userType: 'core',
            role: 'student',
            createdAt: '2023-10-01T00:00:00Z',
            photo: '/api/placeholder/150/150'
        });
    }, []);

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
                    <div className="w-16 h-16 mt-4 border-4 border-t-gray-600 border-gray-200 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    // Mock data for demonstration
    const teamMembers = [
        { id: 1, name: 'Alex Johnson', role: 'Designer', photo: '/api/placeholder/32/32', status: 'active' },
        { id: 2, name: 'Sam Wilson', role: 'Developer', photo: '/api/placeholder/32/32', status: 'busy' },
        { id: 3, name: 'Jamie Lee', role: 'Marketing', photo: '/api/placeholder/32/32', status: 'offline' },
        { id: 4, name: 'Robin Singh', role: 'Content', photo: '/api/placeholder/32/32', status: 'active' }
    ];

    const tasks = [
        { id: 1, title: 'Update team roster', priority: 'High', status: 'In Progress', dueDate: '2025-05-25' },
        { id: 2, title: 'Review event schedule', priority: 'Medium', status: 'Pending', dueDate: '2025-05-27' },
        { id: 3, title: 'Coordinate with vendors', priority: 'High', status: 'Completed', dueDate: '2025-05-15' },
        { id: 4, title: 'Finalize budget', priority: 'High', status: 'In Progress', dueDate: '2025-05-30' }
    ];

    const upcomingEvents = [
        { id: 1, title: 'Team Planning Meeting', date: '2025-05-22', time: '10:00 AM', location: 'Conference Room A' },
        { id: 2, title: 'Vendor Check-in', date: '2025-05-24', time: '2:00 PM', location: 'Online (Zoom)' }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar - Desktop */}
            <div className="hidden md:flex md:flex-col md:w-64 bg-gray-900 text-white">
                <div className="flex items-center justify-center h-20 border-b border-gray-800">
                    <h1 className="text-xl font-bold">Core Dashboard</h1>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <div className="px-4 py-6">
                        <div className="flex items-center">
                            <div className="relative">
                                <img src={user.photo} alt={user.name} className="w-12 h-12 rounded-full" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                            </div>
                            <div className="ml-3">
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-xs text-gray-300 capitalize">{user.userType} • {user.department}</p>
                            </div>
                        </div>
                    </div>
                    <nav className="mt-2 px-2">
                        <a href="#" onClick={() => setActiveTab('overview')} className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                            <PieChart size={20} className="mr-3" />
                            <span>Overview</span>
                        </a>
                        <a href="#" onClick={() => setActiveTab('team')} className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${activeTab === 'team' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                            <Users size={20} className="mr-3" />
                            <span>Team Management</span>
                        </a>
                        <a href="#" onClick={() => setActiveTab('tasks')} className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${activeTab === 'tasks' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                            <CheckSquare size={20} className="mr-3" />
                            <span>Task Management</span>
                        </a>
                        <a href="#" onClick={() => setActiveTab('events')} className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${activeTab === 'events' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                            <Calendar size={20} className="mr-3" />
                            <span>Event Schedule</span>
                        </a>
                        <a href="#" onClick={() => setActiveTab('reports')} className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${activeTab === 'reports' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                            <BarChart size={20} className="mr-3" />
                            <span>Reports</span>
                        </a>
                        <div className="mt-6 pt-6 border-t border-gray-800">
                            <a href={`/user/profile/${_id}`} className="flex items-center px-4 py-3 mb-1 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                                <User size={20} className="mr-3" />
                                <span>Profile</span>
                            </a>
                            <a href="#" className="flex items-center px-4 py-3 mb-1 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                                <Settings size={20} className="mr-3" />
                                <span>Settings</span>
                            </a>
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
                            <h1 className="text-xl font-bold">Core Dashboard</h1>
                            <button onClick={toggleMenu} className="p-1 rounded-md text-gray-300 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="px-4 py-6">
                            <div className="flex items-center">
                                <div className="relative">
                                    <img src={user.photo} alt={user.name} className="w-12 h-12 rounded-full" />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                                </div>
                                <div className="ml-3">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-xs text-gray-300 capitalize">{user.userType} • {user.department}</p>
                                </div>
                            </div>
                        </div>
                        <nav className="mt-2 px-2">
                            <a href="#" onClick={() => { setActiveTab('overview'); toggleMenu(); }} className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                                <PieChart size={20} className="mr-3" />
                                <span>Overview</span>
                            </a>
                            <a href="#" onClick={() => { setActiveTab('team'); toggleMenu(); }} className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${activeTab === 'team' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                                <Users size={20} className="mr-3" />
                                <span>Team Management</span>
                            </a>
                            <a href="#" onClick={() => { setActiveTab('tasks'); toggleMenu(); }} className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${activeTab === 'tasks' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                                <CheckSquare size={20} className="mr-3" />
                                <span>Task Management</span>
                            </a>
                            <a href="#" onClick={() => { setActiveTab('events'); toggleMenu(); }} className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${activeTab === 'events' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                                <Calendar size={20} className="mr-3" />
                                <span>Event Schedule</span>
                            </a>
                            <a href="#" onClick={() => { setActiveTab('reports'); toggleMenu(); }} className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${activeTab === 'reports' ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                                <BarChart size={20} className="mr-3" />
                                <span>Reports</span>
                            </a>
                            <div className="mt-6 pt-6 border-t border-gray-800">
                                <a href={`/user/profile/${_id}`} className="flex items-center px-4 py-3 mb-1 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                                    <User size={20} className="mr-3" />
                                    <span>Profile</span>
                                </a>
                                <a href="#" className="flex items-center px-4 py-3 mb-1 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                                    <Settings size={20} className="mr-3" />
                                    <span>Settings</span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                {/* Top Navigation */}
                <header className="bg-white shadow">
                    <div className="flex items-center justify-between px-4 py-4 md:px-6">
                        <div className="flex items-center">
                            <button onClick={toggleMenu} className="p-1 mr-3 rounded-md md:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                                <Menu size={24} />
                            </button>
                            <h2 className="text-lg font-medium text-gray-900">
                                {activeTab === 'overview' && 'Dashboard Overview'}
                                {activeTab === 'team' && 'Team Management'}
                                {activeTab === 'tasks' && 'Task Management'}
                                {activeTab === 'events' && 'Event Schedule'}
                                {activeTab === 'reports' && 'Reports & Analytics'}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="relative p-1 text-gray-500 rounded-full hover:bg-gray-100">
                                <Bell size={20} />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="relative">
                                <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 md:p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <>
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold text-gray-900">Welcome to your Core Dashboard, {user.name.split(' ')[0]}!</h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    You have 3 pending tasks and 2 upcoming events this week.
                                </p>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="p-4 bg-white rounded-lg shadow">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-gray-100 text-gray-600">
                                            <Users size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Team Size</p>
                                            <p className="text-lg font-semibold text-gray-900">12</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-white rounded-lg shadow">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                                            <CheckSquare size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Tasks</p>
                                            <p className="text-lg font-semibold text-gray-900">5/8</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="w-full h-2 bg-gray-200 rounded-full">
                                            <div className="w-5/8 h-2 bg-green-500 rounded-full"></div>
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">62.5% complete</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-white rounded-lg shadow">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                            <Calendar size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
                                            <p className="text-lg font-semibold text-gray-900">2</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-white rounded-lg shadow">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-red-100 text-red-600">
                                            <Bell size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-500">Notifications</p>
                                            <p className="text-lg font-semibold text-gray-900">4</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Two column layout for tasks and team */}
                            <div className="grid grid-cols-1 gap-4 mb-6 lg:grid-cols-2">
                                {/* Recent Tasks */}
                                <div className="bg-white rounded-lg shadow">
                                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                        <h3 className="text-lg font-medium text-gray-900">Recent Tasks</h3>
                                    </div>
                                    <ul className="divide-y divide-gray-200">
                                        {tasks.slice(0, 3).map(task => (
                                            <li key={task.id} className="px-4 py-4 hover:bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className={`p-2 rounded-full ${task.status === 'Completed' ? 'bg-green-100 text-green-600' :
                                                                task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-600' :
                                                                    'bg-gray-100 text-gray-600'
                                                            }`}>
                                                            <CheckSquare size={16} />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">{task.title}</p>
                                                            <p className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-800' :
                                                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-green-100 text-green-800'
                                                        }`}>
                                                        {task.priority}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="px-4 py-3 bg-gray-50 text-right rounded-b-lg">
                                        <a href="#" onClick={() => setActiveTab('tasks')} className="text-sm font-medium text-gray-600 hover:text-gray-500">View all tasks</a>
                                    </div>
                                </div>

                                {/* Team Members */}
                                <div className="bg-white rounded-lg shadow">
                                    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                        <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
                                    </div>
                                    <ul className="divide-y divide-gray-200">
                                        {teamMembers.map(member => (
                                            <li key={member.id} className="px-4 py-4 hover:bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="relative">
                                                            <img src={member.photo} alt={member.name} className="w-8 h-8 rounded-full" />
                                                            <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${member.status === 'active' ? 'bg-green-500' :
                                                                    member.status === 'busy' ? 'bg-yellow-500' :
                                                                        'bg-gray-400'
                                                                }`}></span>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                                            <p className="text-xs text-gray-500">{member.role}</p>
                                                        </div>
                                                    </div>
                                                    <button className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500">
                                                        <Settings size={16} />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="px-4 py-3 bg-gray-50 text-right rounded-b-lg">
                                        <a href="#" onClick={() => setActiveTab('team')} className="text-sm font-medium text-gray-600 hover:text-gray-500">Manage team</a>
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming Events */}
                            <div className="bg-white rounded-lg shadow">
                                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                    <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
                                </div>
                                <ul className="divide-y divide-gray-200">
                                    {upcomingEvents.map(event => (
                                        <li key={event.id} className="px-4 py-4 hover:bg-gray-50">
                                            <div className="sm:flex sm:items-center sm:justify-between">
                                                <div className="flex items-center">
                                                    <div className="p-2 rounded-full bg-gray-100 text-gray-600">
                                                        <Calendar size={20} />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                                        <div className="flex items-center mt-1">
                                                            <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                                                            <span className="mx-2 text-xs text-gray-300">•</span>
                                                            <p className="text-xs text-gray-500">{event.location}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:mt-0">
                                                    <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">View Details</button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="px-4 py-3 bg-gray-50 text-right rounded-b-lg">
                                    <a href="#" onClick={() => setActiveTab('events')} className="text-sm font-medium text-gray-600 hover:text-gray-500">View calendar</a>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Team Management Tab */}
                    {activeTab === 'team' && (
            <>
                            <div className="mb-6 flex justify-between items-center">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Manage your team members and their roles
                                    </p>
                                </div>
                                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700">
                                    <UserPlus size={16} className="mr-2" />
                                    Add Member
                                </button>
                            </div>

                            {/* Team Members Table */}
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Role
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tasks
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {[...teamMembers,
                                            { id: 5, name: 'Taylor Kim', role: 'Event Coordinator', photo: '/api/placeholder/32/32', status: 'active' },
                                            { id: 6, name: 'Jordan Brown', role: 'Tech Support', photo: '/api/placeholder/32/32', status: 'offline' }
                                            ].map(member => (
                                                <tr key={member.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="relative flex-shrink-0">
                                                                <img src={member.photo} alt={member.name} className="w-8 h-8 rounded-full" />
                                                                <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${member.status === 'active' ? 'bg-green-500' :
                                                                        member.status === 'busy' ? 'bg-yellow-500' :
                                                                            'bg-gray-400'
                                                                    }`}></span>
                                                            </div>
                                                            <div className="ml-4">
                                                                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                                                <p className="text-xs text-gray-500">member{member.id}@example.com</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{member.role}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${member.status === 'active' ? 'bg-green-100 text-green-800' :
                                                                member.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {Math.floor(Math.random() * 5)} active tasks
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button className="text-gray-600 hover:text-gray-900 mr-3">Edit</button>
                                                        <button className="text-red-600 hover:text-red-900">Remove</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-700">
                                            Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">12</span> team members
                                        </div>
                                        <div className="flex-1 flex justify-end">
                                            <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                                Previous
                                            </button>
                                            <button className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700">
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Task Management Tab */}
                    {activeTab === 'tasks' && (
                        <>
                            <div className="mb-6 flex justify-between items-center">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Track and manage your team's tasks and projects
                                    </p>
                                </div>
                                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700">
                                    <CheckSquare size={16} className="mr-2" />
                                    New Task
                                </button>
                            </div>

                            {/* Task Filters */}
                            <div className="mb-6 bg-white p-4 rounded-lg shadow">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div>
                                        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select id="status-filter" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md">
                                            <option value="all">All</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                        <select id="priority-filter" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md">
                                            <option value="all">All</option>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="due-date-filter" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                        <select id="due-date-filter" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md">
                                            <option value="all">All</option>
                                            <option value="today">Today</option>
                                            <option value="this-week">This Week</option>
                                            <option value="this-month">This Month</option>
                                        </select>
                                    </div>
                                    <div className="ml-auto flex items-end">
                                        <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
                                            Apply Filters
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Tasks Table */}
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Task
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Assigned To
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Priority
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Due Date
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {[...tasks,
                                            { id: 5, title: 'Create marketing materials', priority: 'Medium', status: 'Pending', dueDate: '2025-06-05' },
                                            { id: 6, title: 'Schedule team meeting', priority: 'Low', status: 'Completed', dueDate: '2025-05-10' }
                                            ].map(task => (
                                                <tr key={task.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className={`p-2 rounded-full mr-3 ${task.status === 'Completed' ? 'bg-green-100 text-green-600' :
                                                                    task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-600' :
                                                                        'bg-gray-100 text-gray-600'
                                                                }`}>
                                                                <CheckSquare size={16} />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                                                                <p className="text-xs text-gray-500">Created on {new Date().toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <img src="/api/placeholder/32/32" alt="User" className="w-6 h-6 rounded-full" />
                                                            <span className="ml-2 text-sm text-gray-900">
                                                                {teamMembers[task.id % teamMembers.length].name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                                task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {task.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-800' :
                                                                task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-green-100 text-green-800'
                                                            }`}>
                                                            {task.priority}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(task.dueDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button className="text-gray-600 hover:text-gray-900 mr-3">Edit</button>
                                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-700">
                                            Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">8</span> tasks
                                        </div>
                                        <div className="flex-1 flex justify-end">
                                            <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                                Previous
                                            </button>
                                            <button className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700">
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Event Schedule Tab */}
                    {activeTab === 'events' && (
                        <>
                            <div className="mb-6 flex justify-between items-center">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Event Schedule</h1>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Manage your upcoming events and schedules
                                    </p>
                                </div>
                                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700">
                                    <Calendar size={16} className="mr-2" />
                                    Add Event
                                </button>
                            </div>

                            {/* Calendar View */}
                            <div className="mb-6 bg-white p-4 rounded-lg shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-medium text-gray-900">May 2025</h2>
                                    <div className="flex items-center space-x-2">
                                        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Simple Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1 text-center">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="p-2 text-sm font-medium text-gray-500">
                                            {day}
                                        </div>
                                    ))}

                                    {/* Generate days (first week has blank days) */}
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={`blank-${i}`} className="p-2 text-sm text-gray-400"></div>
                                    ))}

                                    {/* Calendar days */}
                                    {Array.from({ length: 27 }).map((_, i) => {
                                        const day = i + 1;
                                        const hasEvent = upcomingEvents.some(event =>
                                            new Date(event.date).getDate() === day &&
                                            new Date(event.date).getMonth() === 4 // May is 4 (0-indexed)
                                        );

                                        return (
                                            <div key={day} className={`p-2 text-sm ${day === 20 ? 'bg-gray-100 text-gray-900 font-medium rounded-full' :
                                                    hasEvent ? 'font-medium' : ''
                                                }`}>
                                                {day}
                                                {hasEvent && (
                                                    <div className="w-1 h-1 mx-auto mt-1 rounded-full bg-gray-600"></div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Event List */}
                            <div className="bg-white rounded-lg shadow">
                                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                    <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
                                </div>
                                <ul className="divide-y divide-gray-200">
                                    {[...upcomingEvents,
                                    { id: 3, title: 'Budget Review Meeting', date: '2025-05-30', time: '9:00 AM', location: 'Conference Room B' },
                                    { id: 4, title: 'Team Building Activity', date: '2025-06-05', time: '1:00 PM', location: 'City Park' }
                                    ].map(event => (
                                        <li key={event.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                            <div className="sm:flex sm:items-center sm:justify-between">
                                                <div className="flex items-center">
                                                    <div className="p-2 rounded-full bg-gray-100 text-gray-600">
                                                        <Calendar size={20} />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                                        <div className="flex items-center mt-1">
                                                            <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                                                            <span className="mx-2 text-xs text-gray-300">•</span>
                                                            <p className="text-xs text-gray-500">{event.location}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:mt-0 sm:flex sm:items-center">
                                                    <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 mr-2">
                                                        Edit
                                                    </button>
                                                    <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                    {/* Reports Tab */}
                    {activeTab === 'reports' && (
                        <>
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    View performance metrics and analytics
                                </p>
                            </div>

                            {/* Report Cards */}
                            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4">Task Completion Rate</h2>
                                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                                        {/* Placeholder for chart */}
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-gray-600">78%</div>
                                            <p className="text-sm text-gray-500">Tasks completed on time</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4">Team Performance</h2>
                                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                                        {/* Placeholder for chart */}
                                        <div className="text-center">
                                            <div className="mb-2 text-3xl font-bold text-green-600">92%</div>
                                            <p className="text-sm text-gray-500">Overall performance rating</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Reports */}
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                                    <h3 className="text-lg font-medium text-gray-900">Available Reports</h3>
                                </div>
                                <ul className="divide-y divide-gray-200">
                                    {[
                                        { id: 1, title: 'Monthly Performance Summary', icon: <BarChart size={20} /> },
                                        { id: 2, title: 'Task Completion Analysis', icon: <CheckSquare size={20} /> },
                                        { id: 3, title: 'Event Attendance Report', icon: <Calendar size={20} /> },
                                        { id: 4, title: 'Team Member Activity Log', icon: <Users size={20} /> },
                                        { id: 5, title: 'Budget Allocation Report', icon: <FileText size={20} /> }
                                    ].map(report => (
                                        <li key={report.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="p-2 rounded-full bg-gray-100 text-gray-600">
                                                        {report.icon}
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">{report.title}</p>
                                                        <p className="text-xs text-gray-500">Updated {Math.floor(Math.random() * 10) + 1} days ago</p>
                                                    </div>
                                                </div>
                                                <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                                                    View Report
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 p-4 md:p-6">
                    <div className="text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Core Dashboard. All rights reserved.
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default CoreDashboard;