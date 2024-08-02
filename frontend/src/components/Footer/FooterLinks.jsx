import { Footer } from "flowbite-react";

function FooterLinks() {
  return (
    <div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-2 sm:gap-6">
      <div>
        <Footer.Title title="About" />
        <Footer.LinkGroup col>
          <Footer.Link href="/about" target="_blank" rel="noopener noreferrer">
            wecare
          </Footer.Link>
        </Footer.LinkGroup>
      </div>
      <div>
        <Footer.Title title="Legal" />
        <Footer.LinkGroup col>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
        </Footer.LinkGroup>
      </div>
    </div>
  );
}

export default FooterLinks;
