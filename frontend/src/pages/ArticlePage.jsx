import { Button, Spinner } from "flowbite-react";
import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import HTMLParserComponent from "../components/Article/HTMLParserComponent.jsx";
import ArticleCard from "../components/Article/ArticleCard.jsx";
import {
  selectPostBySlug,
  selectPostsByCategory,
} from "../store/reducers/postSlice.js";

function ArticlePage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch the post from Redux store
  const post = useSelector((state) => selectPostBySlug(state, postSlug));
  const recentPosts = useSelector((state) =>
    selectPostsByCategory(state, post?.category)
  );

  const fetchPost = useCallback(() => {
    if (post) {
      setLoading(false);
      setError(false);
    } else {
      setError(true);
      setLoading(false);
    }
  }, [post]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spinner size="xl" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg font-semibold">
          Failed to load post. Please try again later.
        </p>
      </div>
    );

  return (
    <main className="p-4 lg:p-8 flex flex-col max-w-6xl mx-auto min-h-screen bg-white">
      <h1
        className="text-center mb-4"
        style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
      >
        {post?.title}
      </h1>
      <Link
        to={`/search?category=${post?.category}`}
        className="self-center mb-5"
      >
        <Button color="gray" pill size="xs">
          {post?.category}
        </Button>
      </Link>
      {post?.photo && (
        <img
          src={post.photo}
          alt={post.title}
          className="mb-6 max-w-full h-auto object-cover rounded-lg shadow-lg"
        />
      )}
      <div className="flex justify-between items-center text-xs text-gray-500 mb-6">
        <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {((post?.content.length || 0) / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div className="prose lg:prose-lg mx-auto">
        <HTMLParserComponent htmlText={post?.content} />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-center mb-5">
          Recent Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentPosts.map((recentPost) => (
            <ArticleCard key={recentPost._id} post={recentPost} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default ArticlePage;
