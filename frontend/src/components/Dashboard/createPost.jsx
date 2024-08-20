import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../store/action/postAction";
import categories from "../../utils/staticData";

export default function CreatePost() {
  const { user } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({
    userId: user._id,
    userName: user.username,
    title: "",
    category: "",
    content: "",
    photo: "",
  });
  const [publishError, setPublishError] = useState(null);

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    for (const key in formData) {
      fd.append(key, formData[key]);
    }
    if (imageFile) {
      fd.append("file", imageFile);
    }

    try {
      const res = await dispatch(createPost(fd));
      const result = res.payload;
      console.log("CreatePost result:", JSON.stringify(result));

      if (result.status !== "success") {
        setPublishError(result.message);
        return;
      }

      if (result.status === "success") {
        setPublishError(null);
        navigate(`/post/${result.data.data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 w-[50%] mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={handleChange}
          />
          <Select onChange={handleChange} id="category">
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 ">
          <FileInput
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Upload image
          </Button>
        </div>
        {imageFile && (
          <img
            src={imageFileUrl}
            alt="cover image"
            className="w-full h-full border-2 border-[lightgray] object-cover "
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          id="content"
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
      {publishError && <p className="text-red-500">{publishError}</p>}
    </div>
  );
}
