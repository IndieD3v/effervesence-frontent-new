import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { CheckIcon, Trash } from 'lucide-react';
import { io } from 'socket.io-client';

const Notifications = ({ _id }) => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // UNCOMMENT THIS WHEN TESTING & WHEN WANT DUMMY DATA
        // setNotifications([
        //     {
        //         _id: 'dummy1',
        //         message: 'Dummy notification 1 asjdfio jasoidjf oiasdjhfo ijadsof joiadsj oifjdoasjf oiasdj ofijoasd jfoij asdoifj oasdjoif joiasdj fojasdo fjoaids jfoijasdof i ',
        //         read: false,
        //         createdAt: new Date().toISOString(),
        //     },
        //     {
        //         _id: 'dummy2',
        //         message: 'Dummy notification 2',
        //         read: false,
        //         createdAt: new Date().toISOString(),
        //     },
        // ]);

        // Create the socket connection only once
        const socket = io('http://localhost:5000', { transports: ['websocket'] });
        socket.emit('joinRoom', _id);  // Join the user-specific room
        // Fetch notifications from the server
        const fetchNotifications = async () => {
            try {
                const { data } = await axiosInstance.get(`/user/notifications/${_id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                });
                setNotifications(data.allNotifications);

            } catch (err) {
                setError('Failed to fetch notifications.');
                console.error(err);
            }
        };
        fetchNotifications();

        // Listen for new notifications
        socket.on('receiveNotification', (newNotification) => {
            console.log(newNotification) ;
            setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
        });


        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, [_id]); // Only re-run when _id changes, avoiding unnecessary re-renders

    // Mark notification as read
    const handleMarkAsRead = async (notificationId) => {
        try {
            await axiosInstance.patch(`/user/notifications/${notificationId}/markAsRead`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });
            setNotifications((prev) =>
                prev.map((notif) => notif._id === notificationId ? { ...notif, read: true } : notif)
            );
        } catch (err) {
            console.error('Failed to mark notification as read:', err);
        }
    };

    // Delete notification
    const handleDeleteNotification = async (notificationId) => {
        try {
            await axiosInstance.delete(`/user/notifications/${notificationId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });
            setNotifications((prev) => prev.filter((notif) => notif._id !== notificationId));
        } catch (err) {
            console.error('Failed to delete notification:', err);
        }
    };

    return (
        <div>
            {error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <p className="text-sm text-red-700 mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            ) : notifications.length > 0 ? (
                <div className="space-y-4">
                    {notifications.map((notif) => (
                        <div
                            key={notif._id}
                            className={`bg-white rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${notif.read
                                ? 'border-gray-200 opacity-75'
                                : 'border-blue-200 border-l-4 border-l-blue-500'
                                }`}
                        >
                            <div className="p-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            {!notif.read && (
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                                            )}
                                            <p className={`text-xs ${notif.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                                                {notif.message}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500 flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {new Date(notif.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleMarkAsRead(notif._id)}
                                        disabled={notif.read}
                                        className={`inline-flex gap-2 items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${notif.read
                                            ? 'bg-green-100 text-green-800 cursor-default'
                                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                            }`}
                                    >
                                        <CheckIcon size={16} />
                                        {notif.read ? 'Read' : 'Mark as Read'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteNotification(notif._id)}
                                        className="inline-flex gap-2 i items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                                    >
                                        <Trash size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM9 7l-5-5v5h5zm5 0l5-5v5h-5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                    <p className="text-gray-600 max-w-sm mx-auto">
                        When you receive notifications, they'll appear here. Check back later!
                    </p>
                </div>
            )}
        </div>
    );
};

export default Notifications;
