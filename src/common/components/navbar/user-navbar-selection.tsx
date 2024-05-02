"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface Props {
  session: Session | null;
}

function UserNavbarSelection(props: Props) {
  const { session } = props;
  const userName = session?.user.name === null ? undefined : session?.user.name;
  return session !== null ? (
    <NavbarItem className="hidden lg:flex">
      <Dropdown>
        <DropdownTrigger>
          <Avatar showFallback name={userName} />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions">
          <DropdownItem key="player">
            <Link href={"/profile"}>Profile</Link>
          </DropdownItem>
          <DropdownItem key="signout">
            <Button color="primary" variant="flat" onPress={() => signOut()}>
              Sign Out
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarItem>
  ) : (
    <NavbarItem className="hidden lg:flex">
      <Link href="/api/auth/signin">
        <Button color="primary" variant="flat">
          Sign Up
        </Button>
      </Link>
    </NavbarItem>
  );
}

export default UserNavbarSelection;
