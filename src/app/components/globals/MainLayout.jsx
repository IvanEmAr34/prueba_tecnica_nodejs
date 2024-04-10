import React from "react";
import Navbar from "./Navbar";

const MainLayout = ({ children, ...props }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MainLayout;
