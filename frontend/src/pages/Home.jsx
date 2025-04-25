import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../store/slices/blogSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto">
            <section className="text-center py-12">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                    Welcome to BlogFusion
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Your go-to platform for insightful articles and engaging content
                </p>
                <Link
                    to="/blog"
                    className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors"
                >
                    Explore Posts
                </Link>
            </section>

            <section className="py-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Posts</h2>
                {isLoading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.slice(0, 6).map((post) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {post.excerpt || post.content.slice(0, 150)}...
                                    </p>
                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="text-blue-500 hover:text-blue-600 font-medium"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;