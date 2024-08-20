/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Textarea } from "flowbite-react";
import { FaStar } from "react-icons/fa";

function CommentForm({ postID, user, onCommentChange }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [commentError, setCommentError] = useState(null);

  const handleRating = (star) => {
    setRating(star);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      setCommentError("Comment cannot be empty.");
      return;
    }

    await onCommentChange({
      post: postID,
      user: user._id,
      comment,
      rating,
    });

    setComment("");
    setRating(0);
    setCommentError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
      <Textarea
        placeholder="Add a comment..."
        rows="3"
        maxLength="200"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <div className="flex items-center mt-3">
        <p className="text-gray-500 text-xs mr-2">Rating:</p>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => handleRating(star)}
              className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
              size={24}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-5">
        <p className="text-gray-500 text-xs">
          {200 - comment.length} characters remaining
        </p>
        <Button type="submit">Submit</Button>
      </div>
      {commentError && <p className="text-red-500 text-xs mt-2">{commentError}</p>}
    </form>
  );
}

export default CommentForm;
