"use client";

import Navbar from "./Navbar";

export default function NavbarWrapper({ children }) {
  return (
    <div>
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Add padding so content is below navbar */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
