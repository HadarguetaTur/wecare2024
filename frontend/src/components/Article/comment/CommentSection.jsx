/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import ErrorAlert from "./ErrorAlert";
import { commentService } from "../../../services/comment.service";

function CommentSection({ postID }) {
  const { user } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await commentService.getPostComments(postID);
        if (response.status === "success") {
          setComments(response.data.comments);
        } else {
          setCommentError(response.message);
        }
      } catch (error) {
        setCommentError("Something went wrong while fetching comments.");
      }
    };

    fetchComments();
  }, [postID]);

  const handleCommentChange = async (commentData) => {
    try {
      const response = await commentService.addComment(commentData);
      if (response.status === "success") {
        const updatedResponse = await commentService.getPostComments(postID);
        setComments(updatedResponse.data.comments);
      } else {
        setCommentError(response.message);
      }
    } catch (error) {
      setCommentError("Something went wrong.");
    }
  };

  const handleReplyChange = async (replyData) => {
    try {
      console.log(replyData, "replayData");
      const response = await commentService.addReply(replyData);
      console.log(response);
      if (response.status === "success") {
        const updatedResponse = await commentService.getPostComments(postID);
        setComments(updatedResponse.data.comments);
      } else {
        setCommentError(response.message);
      }
    } catch (error) {
      setCommentError("Something went wrong.");
    }
  };

  const handleLikeDislike = async (commentId, action) => {
    try {
      console.log(commentId,action);
      const response = action === 'like' ? 
        await commentService.likeComment(commentId) : 
        await commentService.dislikeComment(commentId);
      if (response.status === "success") {
        const updatedResponse = await commentService.getPostComments(postID);
        setComments(updatedResponse.data.comments);
      }
    } catch (error) {
      console.error(`Error ${action}ing comment:`, error);
    }
  };

  const onDelete = async (_id) => {
    try {
    const response=  await commentService.deleteComment(_id);
      if (response.status === "success") {
        const updatedResponse = await commentService.getPostComments(postID);
        setComments(updatedResponse.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>{user.username}</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={user.photo}
            alt={user.username}
          />
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/auth"}>
            Sign In
          </Link>
        </div>
      )}
      {user && (
        <CommentForm postID={postID} user={user} onCommentChange={handleCommentChange} />
      )}
      {commentError && <ErrorAlert message={commentError} />}
      {comments.map((c) => (
        <CommentItem
          key={c._id}
          comment={c}
          user={user}
          onLike={() => handleLikeDislike(c._id, 'like')}
          onDislike={() => handleLikeDislike(c._id, 'dislike')}
          onReplyChange={handleReplyChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default CommentSection;
