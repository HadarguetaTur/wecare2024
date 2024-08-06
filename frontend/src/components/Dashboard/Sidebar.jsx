import { Button, Sidebar } from "flowbite-react";
import { HiArrowCircleRight, HiUser } from "react-icons/hi";
import PropTypes from "prop-types";

export default function DashSidebar({ tab }) {
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/dashboard?tab=profile"
            icon={HiUser}
            active={tab === "profile"}
          >
            Profile
          </Sidebar.Item>

          <Button
            href="/dashboard?tab=createPost"
            active={tab === "createPost"}
            outline
          >
            Create Post
          </Button>

          <Sidebar.Item href="#" icon={HiArrowCircleRight}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

DashSidebar.propTypes = {
  tab: PropTypes.node.isRequired,
};
