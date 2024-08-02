import { Footer } from "flowbite-react";
import Logo from "../General/Logo";
import FooterLinks from "./FooterLinks";
import Copyright from "./Copyright";
import SocialMediaIcons from "./SocialMediaIcons";

function FooterCom() {
  return (
    <Footer className="border border-t-4 border-teal-500">
      <div className="w-full max-w-7xl mx-auto px-4 mt-4">
        <div className="grid w-full justify-between sm:flex md:grid-cols-2">
          <Logo />
          <FooterLinks />
        </div>
        <Footer.Divider />

        <div className="grid w-full justify-between sm:flex  md:grid-cols-1 py-4">
          <Copyright />
          <SocialMediaIcons />
        </div>
      </div>
      
    </Footer>
  );
}

export default FooterCom;
