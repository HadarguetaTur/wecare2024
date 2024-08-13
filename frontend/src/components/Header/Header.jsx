import Logo from "../General/Logo";
import NavigationMenu from "./NavigationMenu";
import { Button, Navbar } from "flowbite-react";
import SearchBar from "./SearchBar";
import AvatarCom from "./Avatar";
import { Link } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";


function Header() {
  const { user } = useSelector((state) => state.user);


  return (
    <div className="border-b border-teal-500">
      <Navbar className=" bg-white bg-opacity-90 backdrop-blur-md  w-full mx-auto max-w-7xl">
        <Logo />
        <SearchBar />
        <div className="flex gap-2 md:order-2">
          <Button
            className="w-12 h-10 hidden sm:inline"
            color="gray"
            pill
            onClick={() => {}}
          >
            <FaMoon />
          </Button>
          {user ? (
            <AvatarCom user={user} />
          ) : (
            <Link to="/auth?mode=login">
              <Button gradientDuoTone="purpleToBlue">Sign In</Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <NavigationMenu />
      </Navbar>

    </div>
  );
}

export default Header;
