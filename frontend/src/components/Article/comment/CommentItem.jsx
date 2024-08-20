/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Button, Textarea } from "flowbite-react";
import moment from "moment";
import { commentService } from "../../../services/comment.service";

function CommentItem({ comment, user, onLike, onDislike, onReplyChange, onDelete }) {
  const [reply, setReply] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.comment);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = async () => {
    if (reply.trim() === "") {
      console.log("Reply is empty");
      return;
    }

    await onReplyChange({
      post: comment.post,
      user: user._id,
      parentComment: comment._id,
      comment: reply,
    });

    setReply("");
    setShowReplyForm(false);
  };

  const handleSave = async () => {
    try {
      const res = await commentService.updateComment(comment._id, { comment: editedContent });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      onDelete(comment._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      await onLike();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    try {
      await onDislike();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.comment);
  };

  return (
    <div className='flex flex-col pl-4 border-l border-gray-300'>
      <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
        <div className='flex-shrink-0 mr-3'>
          <img
            className='w-10 h-10 rounded-full bg-gray-200'
            src={user.photo}
            alt={user.username}
          />
        </div>
        <div className='flex-1'>
          <div className='flex items-center mb-1'>
            <span className='font-bold mr-1 text-xs truncate'>
              {user ? `@${user.username}` : 'anonymous user'}
            </span>
            <span className='text-gray-500 text-xs'>
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
          {isEditing ? (
            <>
              <Textarea
                className='mb-2'
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <div className='flex justify-end gap-2 text-xs'>
                <Button
                  type='button'
                  size='sm'
                  gradientDuoTone='purpleToBlue'
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  type='button'
                  size='sm'
                  gradientDuoTone='purpleToBlue'
                  outline
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className='text-gray-500 pb-2'>{comment.comment}</p>
              <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-4'>
                <div className='flex items-center gap-1'>
                  <button
                    type='button'
                    onClick={handleLike}
                    className={`text-gray-400 hover:text-blue-500 ${
                      user && comment.likes.includes(user._id) && '!text-blue-500'
                    }`}
                  >
                    <FaThumbsUp className='text-sm' />
                  </button>
                  <span>{comment.likes.length}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <button
                    type='button'
                    onClick={handleDislike}
                    className={`text-gray-400 hover:text-red-500 ${
                      user && comment.dislikes.includes(user._id) && '!text-red-500'
                    }`}
                  >
                    <FaThumbsDown className='text-sm' />
                  </button>
                  <span>{comment.dislikes.length}</span>
                </div>
                {user &&
                  (user._id === comment.user._id || user.isAdmin) && (
                    <>
                      <button
                        type='button'
                        onClick={handleEdit}
                        className='text-gray-400 hover:text-blue-500'
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        onClick={handleDelete}
                        className='text-gray-400 hover:text-red-500'
                      >
                        Delete
                      </button>
                    </>
                  )}
                <button
                  type='button'
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className='text-gray-400 hover:text-blue-500'
                >
                  Reply
                </button>
              </div>
            </>
          )}
          {showReplyForm && (
            <div className="mt-4">
              <Textarea
                className="mb-2"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <div className='flex justify-end gap-2 text-xs'>
                <Button
                  type='button'
                  size='sm'
                  gradientDuoTone='purpleToBlue'
                  onClick={handleReplySubmit}
                >
                  Submit
                </Button>
                <Button
                  type='button'
                  size='sm'
                  gradientDuoTone='purpleToBlue'
                  outline
                  onClick={() => setShowReplyForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              user={user}
              onLike={() => onLike(reply._id)}
              onDislike={() => onDislike(reply._id)}
              onReplyChange={onReplyChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
