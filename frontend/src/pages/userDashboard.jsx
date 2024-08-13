import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/Dashboard/Sidebar";
import Profile from "../components/Dashboard/Profile";
import CreatePost from "../components/Dashboard/createPost";
import Posts from "../components/Dashboard/posts";
import UpdatePost from "../components/Article/editArticle";


 function UserDashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [postSlug, setPostSlug] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
      if (tabFromUrl.startsWith("update-post/")) {
        const slug = tabFromUrl.split("/")[1];
        setPostSlug(slug);
      }
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar tab={tab}/>
      </div>
      {tab === "profile" && <Profile />}
      {tab === "createPost" && <CreatePost />}
      {tab === "posts" && <Posts />}
      {tab.startsWith("update-post/") && <UpdatePost slug={postSlug} />}
    </div>
  );
}

export default UserDashboard

