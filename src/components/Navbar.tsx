import React from "react";
import { Navbar, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";

interface NavbarProps {
  onSelect: (section: "new" | "old" | "login") => void; // Fonction déclenchée au clic
}

const NavbarMenu: React.FC<NavbarProps> = ({ onSelect }) => {
  return (
    <Navbar position="static">
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            aria-current="page"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelect("new"); // Appelle onSelect avec "new"
            }}
          >
            Nouveau
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            aria-current="page"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelect("old"); // Appelle onSelect avec "old"
            }}
          >
            Ancien
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            onClick={(e) => {
              e.preventDefault();
              onSelect("login"); // Appelle onSelect avec "login"
            }}
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarMenu;
