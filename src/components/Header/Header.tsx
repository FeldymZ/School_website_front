import React from "react";
import Topbar from "../TopBar/TopBar";
import MainNavbar from "../MainNavbar/MainNavbar";
export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <Topbar />
      <MainNavbar />
    </header>
  );
}
