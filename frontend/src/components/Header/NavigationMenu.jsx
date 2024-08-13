import { Navbar } from "flowbite-react";

function NavigationMenu() {
  return (
    <Navbar.Collapse>
      <Navbar.Link href="/">Home</Navbar.Link>
      <Navbar.Link href="/articles">Articles</Navbar.Link>
      <Navbar.Link href="/articles">Terapists</Navbar.Link>
    </Navbar.Collapse>
  );
}

export default NavigationMenu;
