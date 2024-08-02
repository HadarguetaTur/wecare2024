import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import FooterCom from "../Footer/Footer";

const PaddingContainer = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen px-4 w-full mx-auto max-w-7xl">
        <Outlet />
      </div>
      <FooterCom />
    </>
  );
};

export default PaddingContainer;
