import React from "react";
import hero from "../assets/images/hero.png";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

const Container = () => {
  return (
    <div className="lg:h-screen h-full w-full  ">
      <div className=" flex flex-col justify-center items-center lg:flex-row px-4 lg:px-0 pt-20">
        <div className="flex flex-1 flex-col gap-y-6 ">
          <div className="text-[60px] font-bold">Best SCIS For You</div>
          <div className="text-xl w-[60%] flex justify-center items-center text-[#575757]">
            Add more SCSS to your Instagram or Tiktok Bio and optimize your
            traffic. And shorten the URL and custom QR code.
          </div>
          <div className="flex gap-x-10 w-full  items-center ">
            <Link
              target="_blank"
              to={"/link"}
              className="px-8 py-2 bg-white rounded cursor-pointer border border-[#2c8c87]"
            >
              CREATE NOW
            </Link>
            <Link
              target="_blank"
              to={"/demo"}
              className="px-8 py-2 bg-white rounded cursor-pointer flex items-center justify-center gap-x-2 border "
            >
              SAMPLE SCIS <HiOutlineExternalLink />
            </Link>
          </div>
        </div>
        <div className="flex flex-1">
          <img src={hero} alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default Container;
