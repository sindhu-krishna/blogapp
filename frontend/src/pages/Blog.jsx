import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, fetchCategories } from '../store/slices/blogSlice';

const Blog = () => {
    const dispatch = useDispatch();
    const { posts, categories, isLoading } = useSelector((state) => state.blog);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchCategories());
    }, [dispatch]);

    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-1/3">
                    <select
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-blue-500">{post.category}</span>
                                    <span className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {post.excerpt || post.content.slice(0, 150)}...
                                </p>
                                <div className="flex items-center justify-between">
                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="text-blue-500 hover:text-blue-600 font-medium"
                                    >
                                        Read More →
                                    </Link>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-500">{post.likes} likes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blog;