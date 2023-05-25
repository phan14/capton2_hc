import React, { useContext, useState } from "react";
import { RxCaretRight } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import { IoAdd } from "react-icons/io5";
import imgtt from "../../assets/images/icontiktok.svg";
import imgtw from "../../assets/images/icontw.svg";
import imgfb from "../../assets/images/iconfb.jpg";
import iconlinkedin from "../../assets/images/iconlinkedin.webp";
import iconfacebook from "../../assets/images/iconfacebook.png";
import iconyoutube from "../../assets/images/iconyoutube.png";

import { ModalContext } from "../../contexts/ModalContext";
import ContentLinkAccount from "./ContentLinkAccount";
import { CreateLinkAccountContext } from "../../contexts/CreateLinkAccountContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
const CreateLink = ({linkname}) => {
  const { isActive, setIsActive } = useContext(ModalContext);
  const {
    seturl,
    url,
    handleAddToCart,
    title,
    handleInput,
    setTitle,
    iconSocial,
    setIconSocial,
  } = useContext(CreateLinkAccountContext);


  const [isLink, setIsLink] = useState(false);

  const handleurlChange = (event) => {
    const value = event.target.value;
    seturl(value);
    setIsLink(isValidUrl(value));
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
 

  return (
    <div>
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className="bg-red-500 text-white px-2 py-2 rounded-2xl flex justify-center cursor-pointer items-center font-medium gap-x-2"
      >
        <IoAdd className="text-xl font-medium" />
        <button>Add link</button>
      </div>
      <div className={`${isActive ? " hidden " : " block "}  `}>
        <div className="w-full h-[400px] z-20 shadow-lg 2xl:px-8 xs:px-2 py-2 ">
          <div className={`${isActive ? "hidden " : "block"} `}>
            <div className="flex justify-between pt-4">
              <div className="font-medium text-sm">Enter Url and Title</div>
              <div
                onClick={() => {
                  setIsActive(!isActive);
                }}
                className="px-2 py-1 cursor-pointer flex justify-end mr-6"
              >
                <GrClose />
              </div>
            </div>
            <div className="bodyModal w-full border-b py-2">
              <div className="flex justify-between 2xl:px-16 xs:px-4 items-center gap-x-5">
                <div className=" flex flex-col w-full gap-y-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    className="border rounded-xl w-full px-2 h-12 text-sm"
                    onChange={handleInput}
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    value={url}
                    className="border rounded-xl w-full px-2 h-12 text-sm"
                    onChange={handleurlChange}
                  />
                </div>
                <button
                  className={`w-20 py-3 rounded-3xl font-medium ${
                    isLink
                      ? "bg-red-500 text-white "
                      : "bg-gray-300 text-gray-500 "
                  }`}
                  onClick={() => {
                    if (isLink) {
                      handleAddToCart();
                      setIsActive(!isActive);
                      setIsLink(false);
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-[#666b5f]">
                  Inspired by your interests
                </div>
                <div className="flex gap-x-1 items-center font-medium text-[#8129d9] px-2 py-1 cursor-pointer ">
                  {/* <div className="border-b border-transparent  hover:border-b hover:border-[#8129d9]">
                    View all
                  </div>
                  <RxCaretRight className="text-xl" /> */}
                </div>
              </div>
              <div className="flex gap-x-2 px-6 xs:px-0 xs:gap-x-1">
                <div className="my-2 flex flex-col items-center justify-center relative transition duration-75 ease-out ">
                  <button
                    className="hover:ring-sand hover:ring-2 hover:ring-inset active:bg-chalk  focus-visible:outline-black w-[88px] h-[88px] outline-none outline-offset-[-2px] bg-marble rounded-lg  antialiased text-black overflow-hidden mb-2"
                    aria-label="Pinterest"
                    onClick={() => {
                      const a = "https://www.tiktok.com/";
                      const title = "Tiktok";
                      setTitle(title);
                      seturl(a);
                      setIsLink(true);
                    }}
                  >
                    <div
                      className="flex justify-center items-center"
                      aria-hidden="true"
                    >
                      <div className="rounded-sm overflow-hidden">
                        <img
                          src={imgtt}
                          alt=""
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </div>
                  </button>
                  <p className="text-black text-xs w-full text-center font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    Tiktok
                  </p>
                </div>
                <div className="my-2 flex flex-col items-center justify-center relative transition duration-75 ease-out ">
                  <button
                    className="hover:ring-sand hover:ring-2 hover:ring-inset active:bg-chalk  focus-visible:outline-black w-[88px] h-[88px] outline-none outline-offset-[-2px] bg-marble rounded-lg border-marble antialiased text-black overflow-hidden mb-2"
                    aria-label="Pinterest"
                    onClick={() => {
                      const a = "https://facebook.com/";
                      const title = "Facebook";
                      setTitle(title);
                      seturl(a);
                      setIsLink(true);
                    }}
                  >
                    <div
                      className="flex justify-center items-center"
                      aria-hidden="true"
                    >
                      <div className="rounded-sm overflow-hidden">
                        <img
                          src={iconfacebook}
                          alt=""
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </div>
                  </button>
                  <p className="text-black text-xs w-full text-center font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    Facebook
                  </p>
                </div>
                <div className="my-2 flex flex-col items-center justify-center relative transition duration-75 ease-out ">
                  <button
                    className="hover:ring-sand hover:ring-2 hover:ring-inset active:bg-chalk  focus-visible:outline-black w-[88px] h-[88px] outline-none outline-offset-[-2px] bg-marble rounded-lg border-marble antialiased text-black overflow-hidden mb-2"
                    aria-label="Pinterest"
                    onClick={() => {
                      const a = "https://youtube.com/";
                      const title = "Youtube";
                      setTitle(title);
                      seturl(a);
                      setIsLink(true);
                    }}
                  >
                    <div
                      className="flex justify-center items-center"
                      aria-hidden="true"
                    >
                      <div className="rounded-sm overflow-hidden">
                        <img
                          src={iconyoutube}
                          alt=""
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </div>
                  </button>
                  <p className="text-black text-xs w-full text-center font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    Youtube
                  </p>
                </div>
                <div className="my-2 flex flex-col items-center justify-center relative transition duration-75 ease-out ">
                  <button
                    className="hover:ring-sand hover:ring-2 hover:ring-inset active:bg-chalk  focus-visible:outline-black w-[88px] h-[88px] outline-none outline-offset-[-2px] bg-marble rounded-lg border-marble antialiased text-black overflow-hidden mb-2"
                    aria-label="Pinterest"
                    onClick={() => {
                      const a = "https://twitter.com/";
                      const title = "Twitter";
                      setTitle(title);
                      seturl(a);
                      setIsLink(true);
                    }}
                  >
                    <div
                      className="flex justify-center items-center"
                      aria-hidden="true"
                    >
                      <div className="rounded-sm overflow-hidden">
                        <img
                          src={imgtw}
                          alt=""
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </div>
                  </button>
                  <p className="text-black text-xs w-full text-center font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    Twitter
                  </p>
                </div>
                <div className="xs:hidden 2xl:flex my-2 flex flex-col items-center justify-center relative transition duration-75 ease-out ">
                  <button
                    className="hover:ring-sand hover:ring-2 hover:ring-inset active:bg-chalk  focus-visible:outline-black w-[88px] h-[88px] outline-none outline-offset-[-2px] bg-marble rounded-lg border-marble antialiased text-black overflow-hidden mb-2"
                    aria-label="Pinterest"
                    onClick={() => {
                      const a = "https://linkedin.com/";
                      const title = "Linkedin";
                      setTitle(title);
                      seturl(a);
                      setIsLink(true);
                    }}
                  >
                    <div
                      className="flex justify-center items-center"
                      aria-hidden="true"
                    >
                      <div className="rounded-sm overflow-hidden">
                        <img
                          src={iconlinkedin}
                          alt=""
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </div>
                  </button>
                  <p className="text-black text-xs w-full text-center font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
                    Linkedin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="listContentLinkAccount">
        <ContentLinkAccount isActive={isActive} />
        {/* {cart.map((item) => (
                    // <ContentLinkAccount key={item.id} isActive={isActive} url={item.url} data={item} />
                    <ContentLinkAccount key={item.id} isActive={isActive} url={item.url} />
                ))} */}
      </div>
    </div>
  );
};

export default CreateLink;
