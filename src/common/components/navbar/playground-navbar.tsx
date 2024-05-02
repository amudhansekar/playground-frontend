import getPlaygroundServerSession from "@/common/auth/get-playground-server-session";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import Link from "next/link";
import UserNavbarSelection from "./user-navbar-selection";

async function PlaygroundNavbar(): Promise<JSX.Element> {
  const session = await getPlaygroundServerSession();
  return (
    <Navbar className="py-2 border-4">
      <NavbarBrand>
        <Link href="/" color="foreground">
          {/* <PlaygroundLogo /> */}
        </Link>
        <Link href="/" color="foreground">
          <p className="font-bold text-inherit">Playground</p>
        </Link>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">
        <UserNavbarSelection session={session} />
      </NavbarContent>
    </Navbar>
  );
}

export default PlaygroundNavbar;
