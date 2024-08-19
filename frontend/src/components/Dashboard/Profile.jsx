import {
  Alert,
  Button,
  Modal,
  TextInput,
  Textarea,
  Select,
} from "flowbite-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../store/reducers/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { logout } from "../../store/action/authAction";
import { deleteUser, updateDetails } from "../../store/action/userAction";
import categories from "../../utils/staticData";

export default function Profile() {
  const { user, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    _id: user._id,
    username: user.username,
    email: user.email,
    description: user.description || "",
    category: user.category || "",
  });
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

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

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handelDelete = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteUser(user));
    console.log(res);
  };

  const handleSignout = () => {
    dispatch(logout());
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    const fd = new FormData();
    for (const key in formData) {
      fd.append(key, formData[key]);
    }
    if (imageFile) {
      fd.append("file", imageFile);
    }
    console.log(...fd);

    try {
      dispatch(updateStart());
      const res = await dispatch(updateDetails(fd));
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(updateSuccess(res.payload.user));
        setUpdateUserSuccess("Profile updated successfully.");
      } else {
        setUpdateUserError(res.error.message);
        dispatch(updateFailure(res.error.message));
      }
    } catch (error) {
      setUpdateUserError(error.message);
      dispatch(updateFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto  w-full">
      <h1 className="my-7 text-center font-bold text-3xl ">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdateDetails}>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />
        <div
          className="w-32 h-32 self-center cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={imageFileUrl || `${user.photo}`}
            alt="user"
            className="rounded-full w-full h-full border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={user.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={user.email}
          onChange={handleChange}
        />

        {/* Show additional fields if user is a care provider */}
        {user.isCareProvider && (
          <>
            <Textarea
              id="description"
              placeholder="description"
              defaultValue={user.description}
              onChange={handleChange}
            />
            <Select onChange={handleChange} id="category">
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Select>
          </>
        )}

        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          {loading ? "Loading..." : "Update"}
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignout} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handelDelete}>
                Yes, Im sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
