import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = ({ children }) => {
  return (
    <>
      <div className=" h-screen ">
        <div className="header ">
          <Header />
        </div>
        <div>{children}</div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
