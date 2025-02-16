import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // ✅ Ensure Navbar is correctly imported
import "../styles.css";
export default function Layout() {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <Outlet /> {/* ✅ This ensures pages like Dashboard, Login, etc., are displayed */}
      </main>
    </div>
  );
}

