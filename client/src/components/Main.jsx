import React from "react";
import icmember from "../assets/images/icmember.png";
import SCIS from "../assets/images/SCIS.png";
import tich from "../assets/images/tich.png";
import shortlink from "../assets/images/shortlinkpng@2x.png";
import icqrcode from "../assets/images/icqrcode.png";
import analasys from "../assets/images/analyticspng@2x.png";
import mauxanh from "../assets/images/mauxanh.png";
import icpject from "../assets/images/icpject.png";
import icpixel from "../assets/images/icpixeltracking.png";
import icdomain from "../assets/images/icdomain.png";
import ana0 from "../assets/images/ana0.png";
import ana5 from "../assets/images/ana5.png";
import group9 from "../assets/images/Group9.png";
import { Link } from "react-router-dom";
import { BsSpotify, BsTwitter, BsYoutube } from "react-icons/bs";

const Main = () => {
  return (
    <div className="px-20 bg-[#fff1e5] pt-20">
      <div>
        <div className="1 lg:flex flex-col  lg:flex-row">
          <div>
            <img src={SCIS} alt="" />
          </div>
          <div className="flex flex-col justify-center pl-10 gap-y-4 lg:w-[40%] ">
            <img src={icmember} alt="" className="w-10 h-10" />
            <h2 className="font-bold text-2xl">SCIS PAGE</h2>
            <p>
              Create your own unique and highly customizable BioLink site
              easily.
            </p>
            <ul className="mt-2 flex flex-col gap-y-1 justify-center">
              <li className="flex gap-x-2 items-center ">
                <img src={tich} alt="" className="w-4 h-3 " /> Custom colors and
                brands
              </li>
              <li className="flex gap-x-2 items-center">
                <img src={tich} alt="" className="w-4 h-3 " />
                Many easy-to-use blocks
              </li>
              <li className="flex gap-x-2 items-center">
                <img src={tich} alt="" className="w-4 h-3 " />
                SEO Settings
              </li>
              <li className="flex gap-x-2 items-center">
                <img src={tich} alt="" className="w-4 h-3 " />
                Password protection, sensitive content alert
              </li>
            </ul>
          </div>
        </div>
        <div className="2 lg:flex flex-col mt-20 lg:flex-row ">
          <div className="flex flex-col justify-center pl-10 gap-y-4 flex-1 ">
            <img src={icmember} alt="" className="w-10 h-10" />
            <h2 className="font-bold text-2xl">SCIS PAGE</h2>
            <p>Correct! You can also use our service as a shortener.</p>
            <ul className="mt-2 flex flex-col gap-y-1 justify-center">
              <li className="flex gap-x-2 items-center ">
                <img src={tich} alt="" className="w-4 h-3 " /> Scheduling and
                Expiration Limits
              </li>
              <li className="flex gap-x-2 items-center">
                <img src={tich} alt="" className="w-4 h-3 " />
                Targeting by country, device and language
              </li>
              <li className="flex gap-x-2 items-center">
                <img src={tich} alt="" className="w-4 h-3 " />
                Rotate A/B
              </li>
              <li className="flex gap-x-2 items-center">
                <img src={tich} alt="" className="w-4 h-3 " />
                Password protection, sensitive content alert
              </li>
            </ul>
          </div>
          <div className=" flex flex-1">
            <img src={shortlink} alt="" />
          </div>
        </div>
        <div className="3 lg:flex flex-col mt-20 lg:flex-row ">
          <div className=" flex flex-1">
            <img src={shortlink} alt="" />
          </div>
          <div className="flex flex-col justify-center pl-10 gap-y-4 flex-1 ">
            <img src={icqrcode} alt="" className="w-10 h-10" />
            <h2 className="font-bold text-2xl">QR Code</h2>
            <p>
              Full-featured QR code generation system with easy-to-use
              templates.
            </p>
            <ul className="mt-2 flex flex-col gap-y-1 justify-center">
              <li className="flex gap-x-2 items-center ">
                <img src={tich} alt="" className="w-4 h-3 " /> Custom colors
                with color range
              </li>
              <li className="flex gap-x-2 items-center">
                <img src={tich} alt="" className="w-4 h-3 " />
                Custom icons
              </li>
              <li className="flex gap-x-2 items-center">
                <img src={tich} alt="" className="w-4 h-3 " />
                Vcard templates, WiFi, Calendar, Location..etc
              </li>
            </ul>
          </div>
        </div>
        <div className="4 lg:flex flex-col mt-20 lg:flex-row ">
          <div className="flex flex-col justify-center pl-10 gap-y-4 flex-1 ">
            <img src={icqrcode} alt="" className="w-10 h-10" />
            <h2 className="font-bold text-2xl">Integrated Analytics</h2>
            <p>
              Daily analytics, referrer, country, operating system, language and
              more.
            </p>
          </div>
          <div className=" flex flex-1">
            <img src={analasys} alt="" />
          </div>
        </div>
        <div
          className="5 relative w-full  my-20 h-[400px] lg:h-[250px]"
          style={{
            backgroundImage: `url(${mauxanh})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute flex flex-col lg:flex-row gap-y-4 justify-around items-center w-full h-full py-20">
            <div className="w-[255px] h-[127px] bg-white rounded flex justify-center items-center flex-col gap-y-2">
              <div className="text-gray-700">Link</div>
              <div className="font-medium text-xl">142,882+</div>
            </div>
            <div className="w-[255px] h-[127px] bg-white rounded flex justify-center items-center flex-col gap-y-2">
              <div className="text-gray-700">QR Code </div>
              <div className="font-medium text-xl">142,882+</div>
            </div>
            <div className="w-[255px] h-[127px] bg-white rounded flex justify-center items-center flex-col gap-y-2">
              <div className="text-gray-700">Pageviews</div>
              <div className="font-medium text-xl">142,882+</div>
            </div>
          </div>
        </div>

        <div className="6 flex  w-full h-[255px] xs:h-[750px] justify-center my-30 ">
          <div className=" flex flex-col lg:flex-row justify-around items-center w-full h-full gap-y-4">
            <div className="w-[275px] h-[150px] xs:h-[250px] px-8 py-4 bg-white rounded flex justify-center  flex-col gap-y-4">
              <div className=" flex  items-center gap-x-2 bg-slate-100 rounded-sm px-2 py-1">
                <img src={icpject} alt="" className="w-6 h-5 " />
                <div className="font-medium text-xl">Project</div>
              </div>
              <div className=" text-sm text-gray-700">
                The easiest way to categorize your managed resources.
              </div>
            </div>
            <div className="w-[290px] h-[150px] xs:h-[250px] px-4 bg-white rounded flex justify-center flex-col gap-y-4">
              <div className=" flex  items-center gap-x-2  bg-slate-100 rounded-sm px-2 py-1">
                <img src={icpixel} alt="" className="w-6 h-5 " />
                <div className="font-medium text-xl">Pixel tracking </div>
              </div>
              <div className=" text-sm text-gray-700 w-full px-5">
                Facebook, Google Analytics, Google Tag Manager, LinkedIn,
                Pinterest, Twitter, Quora, TikTok pixel tracking available.
              </div>
            </div>
            <div className="w-[280px] h-[150px] xs:h-[250px] px-4 bg-white rounded flex justify-center flex-col gap-y-4">
              <div className=" flex  items-center gap-x-2 px-5 bg-slate-100 rounded-sm py-1">
                <img src={icdomain} alt="" className="w-6 h-5 " />
                <div className="font-medium text-xl">Custom domains </div>
              </div>
              <div className=" text-sm text-gray-700 px-5">
                Connect your own domain or use our predefined ones.
              </div>
            </div>
          </div>
        </div>

        <div className="7 flex flex-col w-full h-full my-20 gap-y-3 ">
          <div className=" flex lg:flex-row flex-col  h-full w-full gap-x-8 ">
            <img src={ana0} alt="" />
            <div className=" flex flex-col gap-y-4">
              <div className="font-bold text-2xl">
                Analyze your audience and keep your followers engaged
              </div>
              <div className="ml-10">
                Track your engagement over time, monitor revenue and learn
                what’s converting your audience. Make informed updates on the
                fly to keep them coming back.
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col h-full w-full gap-x-8 gap-y-10 ">
            <img src={ana5} alt="" className="xl:w-[60%] xs:w-[100%]" />
            <div className=" flex justify-center lg:justify-end lg:items-end pb-10  ">
              <Link
                to="/login"
                className="bg-[#E9C0E9] rounded-full px-3 py-2 "
              >
                Get started for free
              </Link>
            </div>
          </div>
        </div>

        <div className="8 my-20">
          <div className="flex flex-col justify-center items-center gap-y-2">
            <div className="text-2xl font-bold">
              The fast, friendly and powerful link in bio tool.
            </div>
            <div className="bg-[#E9C0E9] px-3 py-2 rounded-full">
              Explore all plans
            </div>
          </div>
          <div className="my-10 flex flex-col lg:flex-row gap-y-10 justify-center items-center gap-x-28">
            <div className="gap-y-3 flex flex-col justify-center ">
              <div className="bg-[#E9C0E9] flex rounded-full h-[80px] w-[320px] items-center gap-x-4 px-8">
                <BsYoutube className="text-[#780016] text-5xl " />
                <div className="px-10 py-2 bg-pink-400 rounded-full"></div>
              </div>
              <div className="bg-[#E9C0E9] flex rounded-full h-[80px] w-[320px] items-center gap-x-4 px-8">
                <BsTwitter className="text-[#780016] text-5xl " />
                <div className="px-16 py-2 bg-pink-400 rounded-full"></div>
              </div>
              <div className="bg-[#E9C0E9] flex rounded-full h-[80px] w-[320px] items-center gap-x-4 px-8">
                <BsSpotify className="text-[#780016] text-5xl " />
                <div className="px-8 py-2 bg-pink-400 rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-row gap-x-2">
              <div className="px-10 py-10 rounded-3xl text-white bg-[#02ACC4]">
                00
              </div>
              <div className="px-10 py-10 text-black rounded-full bg-[#C8D8F4]">
                Jan
              </div>
              <div className="px-9 py-9  text-white rounded-3xl bg-[#061492]">
                12am
              </div>
            </div>
          </div>
          <div className="flex gap-x-12 justify-center items-center w-full">
            <div className="w-[380px]">
              Customize your Linktree to match your brand. Make it feel like
              you.
            </div>
            <div className="w-[380px]">
              Manage, update and schedule content with our quick, easy editor.
            </div>
          </div>
        </div>

        <div className="9 pb-20 flex justify-center items-center ">
          <img src={group9} alt="" className="w-[150px]" />
        </div>
      </div>
    </div>
  );
};

export default Main;
