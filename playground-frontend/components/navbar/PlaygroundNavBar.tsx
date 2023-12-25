import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import Link from 'next/link';
import SearchInput from '../search/SearchInput';

function PlaygroundNavbar(): JSX.Element {
  const isLoggedIn = false;
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" color="foreground">
          {/* <PlaygroundLogo /> */}
        </Link>
        <Link href="/" color="foreground">
          <p className="font-bold text-inherit">Playground</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <SearchInput />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {isLoggedIn ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Dropdown>
                <DropdownTrigger>
                  <Avatar name="Current User" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="profile">
                    <Link href="/profile">Profile</Link>
                  </DropdownItem>
                  <DropdownItem key="signout">Sign Out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/api/auth/signin">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" href="/api/auth/signin" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default PlaygroundNavbar;
