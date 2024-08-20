/* eslint-disable react/prop-types */
import { Textarea, Button } from "flowbite-react";
import { useSelector } from "react-redux";

function ReplyForm({ reply, setReply, onSubmit }) {
    const { user } = useSelector((state) => state.user);
  return (
    <div className="flex items-start border-b border-gray-200 p-3">
      <img
        className="h-8 w-8 object-cover rounded-full mr-3"
        src={user.photo}
        alt="Profile"
      />
      <div className="w-full">
        <Textarea
          placeholder="Tweet your reply..."
          rows="2"
          maxLength="200"
          onChange={(e) => setReply(e.target.value)}
          value={reply}
          className="w-full resize-none border-none focus:ring-0 text-sm"
        />
        <div className="flex justify-between items-center mt-2">
          <Button
            onClick={onSubmit}
            className="bg-blue-500 text-white text-xs font-bold py-1 px-4 rounded-full"
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReplyForm;
