/* eslint-disable react/prop-types */
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postService } from "../../services/post.service";
import categories from "../../utils/staticData";
import { updatePost } from "../../store/action/postAction";

export default function UpdatePost({ slug }) {
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    category: "",
    content: "",
    photo: "",
    slug: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [publishError, setPublishError] = useState(null);

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPostBySlug(encodeURIComponent(slug));
        if (data.status === "success") {
          setFormData({
            _id: data.data.data._id,
            title: data.data.data.title,
            category: data.data.data.category || categories[0].value,
            content: data.data.data.content,
            photo: data.data.data.photo || "",
            slug: data.data.data.slug,
          });
        } else {
          setPublishError(data.message);
        }
      } catch (error) {
        setPublishError("Failed to fetch post data");
      }
    };

    fetchPost();
  }, [slug]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleContentChange = (content) => {
    setFormData((prevData) => ({ ...prevData, content }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData((prevData) => ({
        ...prevData,
        photo: URL.createObjectURL(file),
      }));
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
      const res = await dispatch(
        updatePost({ postId: formData._id, postData: fd })
      );
      const result = res.payload;

      if (result.status !== "success") {
        setPublishError(result.message);
      } else {
        navigate(`/post/${result.data.data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong during the update.");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="flex-1"
          />
          <Select
            id="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={() => fileInputRef.current.click()}
          >
            Upload Image
          </Button>
        </div>
        {formData.photo && (
          <img
            src={formData.photo}
            alt="upload"
            className="w-full h-72 object-cover mt-4"
          />
        )}
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          id="content"
          onChange={handleContentChange}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update Post
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
