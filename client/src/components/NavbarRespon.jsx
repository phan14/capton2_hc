import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
//import router-dom
import { Link } from "react-router-dom";
//import icons
import { BiArrowBack } from "react-icons/bi";
const NavbarRespon = () => {
  const { isActive, CloseResponsive } = useContext(SidebarContext);
  return (
    <div
      className={`${
        isActive ? "left-0" : "-left-full"
      } w-full h-full  bg-gray-200
        fixed top-0 md:max-w-[55vw] xl:max-w-[30vw] lg:max-w-[40vw] px-4 z-20
        transision-all duration-300 shadow-2xl`}
    >
      <div className="flex justify-around">
        <div
          onClick={() => {
            console.log(123);
          }}
        >
          <div className="flex flex-col gap-y-5 w-[350px]  items-center py-10">
            <div className=" hover:bg-slate-500 w-[300px] flex justify-center items-center p-2 rounded-md">
              <Link to={"/link"}>Link</Link>
            </div>
            <div className=" hover:bg-slate-500 w-[300px] flex justify-center items-center p-2 rounded-md">
              <Link to={"/qrcode"}>Qrcode</Link>
            </div>
            <div className=" hover:bg-slate-500 w-[300px] flex justify-center items-center p-2 rounded-md">
              <Link to={"/login"}>Login</Link>
            </div>
            <div className=" hover:bg-slate-500 w-[300px] flex justify-center items-center p-2 rounded-md">
              <Link to={"/register"}>Register</Link>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            CloseResponsive();
          }}
        >
          <BiArrowBack className="text-xl flex justify-center items-center w-8 h-8 mt-2 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default NavbarRespon;
