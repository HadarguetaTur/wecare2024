import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ArticleCard from "../components/Article/ArticleCard";
import { selectPostById } from "../store/reducers/postSlice";
import { Button } from "flowbite-react";

function DisplayProfile() {
  const { id } = useParams();

  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === id)
  );
  console.log(user,id);

  const posts = useSelector((state) => selectPostById(state, id));

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 lg:p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center">
          <img
            src={user.photo}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-teal-500 mr-4"
          />
          <div>
            <h1 className="text-2xl font-semibold">{user.username}</h1>
            <p className="text-gray-600">{user.description}</p>
            <Link
        to={`/search?category=${user?.category}`}
        className="self-center mb-5"
      >
        <Button color="gray" pill size="xs">
          {user?.category}
        </Button>
      </Link>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => <ArticleCard key={post.slug} post={post} />)
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayProfile;
