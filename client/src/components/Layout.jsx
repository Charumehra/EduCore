import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar setIsOpen={setIsOpen} />

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="pt-14 ">{children}</div>
    </div>
  );
};

export default Layout;
