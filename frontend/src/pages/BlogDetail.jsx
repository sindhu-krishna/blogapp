import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostBySlug, likePost } from '../store/slices/blogSlice';

const BlogDetail = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { currentPost, isLoading } = useSelector((state) => state.blog);

    useEffect(() => {
        if (slug) {
            dispatch(fetchPostBySlug(slug));
        }
    }, [dispatch, slug]);

    const handleLike = () => {
        if (currentPost) {
            dispatch(likePost(currentPost.id));
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            </div>
        );
    }

    if (!currentPost) {
        return (
            <div className="max-w-4xl mx-auto py-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Post not found</h2>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto py-8">
            {currentPost.image && (
                <img
                    src={currentPost.image}
                    alt={currentPost.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
                />
            )}
            <header className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-blue-500">{currentPost.category}</span>
                    <span className="text-gray-500">
                        {new Date(currentPost.created_at).toLocaleDateString()}
                    </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{currentPost.title}</h1>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={currentPost.author.avatar || '/default-avatar.png'}
                            alt={currentPost.author.username}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="text-gray-700">{currentPost.author.username}</span>
                    </div>
                    <button
                        onClick={handleLike}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
                    >
                        <span>{currentPost.likes} likes</span>
                    </button>
                </div>
            </header>
            <div className="prose prose-lg max-w-none">
                {currentPost.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                        {paragraph}
                    </p>
                ))}
            </div>
        </article>
    );
};

export default BlogDetail;