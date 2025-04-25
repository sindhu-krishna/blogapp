import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Dashboard Components
const DashboardHome = () => (
    <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">My Posts</h3>
                <p className="text-gray-600">Manage your blog posts</p>
                <Link to="/dashboard/posts" className="text-blue-500 hover:text-blue-600 mt-2 inline-block">
                    View Posts →
                </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Profile</h3>
                <p className="text-gray-600">Update your account information</p>
                <Link to="/dashboard/profile" className="text-blue-500 hover:text-blue-600 mt-2 inline-block">
                    Edit Profile →
                </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                <p className="text-gray-600">View your post statistics</p>
                <Link to="/dashboard/analytics" className="text-blue-500 hover:text-blue-600 mt-2 inline-block">
                    View Stats →
                </Link>
            </div>
        </div>
    </div>
);

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Posts</h2>
                <Link
                    to="/dashboard/posts/new"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Create New Post
                </Link>
            </div>
            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : posts.length === 0 ? (
                <div className="text-center text-gray-600">
                    <p>You haven't created any posts yet.</p>
                    <Link
                        to="/dashboard/posts/new"
                        className="text-blue-500 hover:text-blue-600 mt-2 inline-block"
                    >
                        Create your first post
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    Published: {new Date(post.created_at).toLocaleDateString()}
                                </span>
                                <div className="space-x-2">
                                    <Link
                                        to={`/dashboard/posts/edit/${post.id}`}
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDeletePost(post.id)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        bio: user?.bio || '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle profile update logic
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
            <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        rows="4"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

const Analytics = () => (
    <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Views</h3>
                <p className="text-3xl font-bold">0</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Posts</h3>
                <p className="text-3xl font-bold">0</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Total Comments</h3>
                <p className="text-3xl font-bold">0</p>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    // Redirect if not authenticated
    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 bg-white shadow-sm py-4 px-2">
                        <nav className="space-y-1">
                            <Link
                                to="/dashboard"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-500"
                            >
                                Overview
                            </Link>
                            <Link
                                to="/dashboard/posts"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-500"
                            >
                                Posts
                            </Link>
                            <Link
                                to="/dashboard/profile"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-500"
                            >
                                Profile
                            </Link>
                            <Link
                                to="/dashboard/analytics"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-blue-500"
                            >
                                Analytics
                            </Link>
                        </nav>
                    </div>
                    <div className="flex-1">
                        <Routes>
                            <Route index element={<DashboardHome />} />
                            <Route path="posts" element={<Posts />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="analytics" element={<Analytics />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;