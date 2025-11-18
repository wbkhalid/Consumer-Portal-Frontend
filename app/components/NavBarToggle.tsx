"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import NavBar from "./NavBar";

const NavbarToggle = ({ children }: PropsWithChildren) => {
  const currentPath = usePathname();

  // Pages jahan Navbar show karna hai

  if (currentPath === "/login") {
    return <main>{children}</main>;
  }

  return (
    <>
      <NavBar />
      <main className="p-2! bg-[#f3f4f9]">{children}</main>
    </>
  );
};

export default NavbarToggle;
