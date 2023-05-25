import React from "react";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { BsTelephone, BsFillSunFill } from "react-icons/bs";
// import avatar from '../assets/imgs/avtar.jpg';

const Demo = () => {
  return (
    <div className="w-full h-full max-h-screen ">
      <div className="flex flex-col  bg-black w-full h-full relative">
        <div className=" top-4 flex flex-col  text-white gap-y-4 pb-20">
          <div className="flex items-center flex-col">
            <img
              // src={avatar}
              alt=""
              className="w-28 h-28 mt-10 rounded-full object-contain flex justify-center"
            />
            <div className="flex flex-col items-center gap-y-2">
              <div className="text-xl  font-medium">Võ Minh</div>
              <div className="text-xs">Liên hệ: 09633765405</div>
            </div>
          </div>
          <div className="flex flex-col mt-2 lg:gap-y-4 items-center w-full">
            <div className="bg-[#222222] rounded-xl lg:w-[680px] lg:h-[56px] flex items-center ">
              <div className="h-full w-[20%] flex items-center ">
                <FiFacebook className="w-[80%] h-[60%]" />
              </div>
              <div className="text-base flex items-center justify-center w-[50%] pl-10">
                Facebbook
              </div>
            </div>
            <div className="bg-[#222222] rounded-xl lg:w-[680px] lg:h-[56px] flex items-center ">
              <div className="h-full w-[20%] flex items-center ">
                <FiInstagram className="w-[80%] h-[60%]" />
              </div>
              <div className="text-base flex items-center justify-center w-[50%] pl-10">
                Instagram
              </div>
            </div>
            <div className="bg-[#222222] rounded-xl lg:w-[680px] lg:h-[56px] flex items-center ">
              <div className="h-full w-[20%] flex items-center ">
                <BsTelephone className="  w-[80%] h-[50%]" />
              </div>
              <div className="text-base flex items-center justify-center w-[50%] pl-10">
                Zalo
              </div>
            </div>
            <div className="bg-[#222222] rounded-xl lg:w-[680px] lg:h-[56px] flex items-center ">
              <div className="h-full w-[20%] flex items-center ">
                <FiFacebook className="w-[80%] h-[60%]" />
              </div>
              <div className="text-base flex items-center justify-center w-[50%] pl-10">
                Facebbook
              </div>
            </div>
            <div className="bg-[#222222] rounded-xl lg:w-[680px] lg:h-[56px] flex items-center ">
              <div className="h-full w-[20%] flex items-center ">
                <FiInstagram className="w-[80%] h-[60%]" />
              </div>
              <div className="text-base flex items-center justify-center w-[50%] pl-10">
                Instagram
              </div>
            </div>
            <div className="bg-[#222222] rounded-xl lg:w-[680px] lg:h-[56px] flex items-center ">
              <div className="h-full w-[20%] flex items-center ">
                <BsTelephone className="  w-[80%] h-[50%]" />
              </div>
              <div className="text-base flex items-center justify-center w-[50%] pl-10">
                Zalo
              </div>
            </div>
            <div className="bg-[#222222] rounded-xl lg:w-[680px] lg:h-[56px] flex items-center ">
              <div className="h-full w-[20%] flex items-center ">
                <FiFacebook className="w-[80%] h-[60%]" />
              </div>
              <div className="text-base flex items-center justify-center w-[50%] pl-10">
                Facebbook
              </div>
            </div>
            <div className="bg-[#222222] rounded-xl lg:w-[680px] lg:h-[56px] flex items-center ">
              <div className="h-full w-[20%] flex items-center ">
                <FiInstagram className="w-[80%] h-[60%]" />
              </div>
              <div className="text-base flex items-center justify-center w-[50%] pl-10">
                Instagram
              </div>
            </div>
            <div className="bg-[#222222] rounded-xl lg:w-[680px] lg:h-[56px] flex items-center ">
              <div className="h-full w-[20%] flex items-center ">
                <BsTelephone className="  w-[80%] h-[50%]" />
              </div>
              <div className="text-base flex items-center justify-center w-[50%] pl-10">
                Zalo
              </div>
            </div>
          </div>
        </div>
        <div className="flex absolute gap-x-1 font-medium items-center justify-center w-full h-12 text-lg text-white  bottom-0  py-2">
          SCSS <BsFillSunFill />
        </div>
      </div>
    </div>
  );
};

export default Demo;
