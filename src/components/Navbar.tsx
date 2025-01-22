// components/Navbar.tsx
import React from "react";

interface NavbarProps {
  onSelect: (section: "new" | "old") => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSelect }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-around">
        <button
          className="hover:bg-gray-700 p-2 rounded"
          onClick={() => onSelect("new")}
        >
          Nouveau
        </button>
        <button
          className="hover:bg-gray-700 p-2 rounded"
          onClick={() => onSelect("old")}
        >
          Ancien
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
