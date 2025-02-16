import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; 
import "../styles.css";
export default function Layout() {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

