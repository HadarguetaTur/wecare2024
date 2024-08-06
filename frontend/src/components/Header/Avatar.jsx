/* eslint-disable react/prop-types */
import { Avatar, Dropdown } from "flowbite-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/action/authAction";
import { setCurrentUser } from "../../store/reducers/userSlice";

export default function AvatarCom({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user.photo);

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(setCurrentUser(null));
    navigate("/");
  };

  const getAvatarContent = () => {
    if (user?.photo) {
      return (
        <div className="w-10 h-10 self-center curser-pointer">
          <img
            alt="user"
            src={user.photo}
            className="rounded-full w-full h-full"
          />
        </div>
      );
    } else {
      return <Avatar alt="user" rounded />;
    }
  };

  return (
    <Dropdown arrowIcon={false} inline label={getAvatarContent()}>
      <Dropdown.Header>
        <span className="block text-sm">@{user.username}</span>
        <span className="block text-sm font-medium truncate">{user.email}</span>
      </Dropdown.Header>
      <Link to={"/dashboard?tab=profile"}>
        <Dropdown.Item>Profile</Dropdown.Item>
      </Link>
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}
