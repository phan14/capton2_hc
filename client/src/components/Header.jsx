import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarContext } from "../contexts/SidebarContext";
import NavbarRespon from "./NavbarRespon.jsx";
import Tippy from "@tippyjs/react/headless";
import Wrapper from "./Wrapper";
import avatar from "../assets/images/avtar.jpg";
// import icon
import { BiLogIn } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import {
  AiOutlinePlus,
  AiOutlineQuestionCircle,
  AiFillCaretDown,
} from "react-icons/ai";
import {
  RiAccountBoxLine,
  RiMoneyDollarCircleLine,
  RiQuestionAnswerLine,
} from "react-icons/ri";
import Search from "../layouts/components/Search";

const Header = (props) => {
  const { isActive, setIsActive } = useContext(SidebarContext);
  const [userName, setUserName] = useState("");
  const [isaction, setIsAction] = useState(false);
  const [userId, setUserId] = useState();
  const [avatarHeader, setAvatarHedaer] = useState();
  const { isShow, setIsShow } = useState(false);

  const onShow = () => {
    setIsShow(true);
  };
  // useEffect(() => {
  //     const infoUser = JSON.parse(localStorage.getItem('infoUser'));
  //     const fechtApi = async () => {
  //         await callApi(`api/user/profile/${infoUser.userID}`, 'get')
  //             .then((data) => {
  //                 setUserName(data.data.fullName);
  //                 setUserId(data.data.userId);
  //             })
  //             .catch((error) => {
  //                 console.log('fail', error);
  //             });
  //     };
  //     fechtApi();
  // }, [userName]);
  // const handleLogout = () => {
  //     localStorage.removeItem('infoUser');
  //     setUserName('');
  //     setUserId('');
  //     setIsAction(!isaction);
  //     navigate('/login');
  // };
  const [isAction2, setIsAction2] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsAction2(true) : setIsAction2(false);
      // window.scrollY = 0 ? setIsAction2(false) : setIsAction2(false);
    });
  });
  return (
    // header w-full bg-gradient-to-r border-b-2 py-2 lg:px-24
    <div
      className={`${
        isAction2
          ? "bg-white py-2 lg:px-24 shadow-md"
          : "bg-none py-2 shadow-md lg:px-24  "
      }  z-20 w-full fixed`}
    >
      <div className="flex justify-between items-center  w-full flex-initial h-12 ">
        <div className="text-2xl text-red-800 font-medium">
          <Link to={`${userId ? `/` : "/home"}`}>SCIS.com.vn</Link>
          {/* <Link to={`/`}>SCIS.com.vn</Link> */}
        </div>
        <div className="flex ">
          <div className="lg:hidden">
            <NavbarRespon />
          </div>
          <div className="lg:flex xl:gap-x-14 lg:gap-x-10 hidden justify-between items-center w-full text-[1.1rem] font-normal ">
            <div className={`${isShow ? "block" : "hidden"}`}>
              <Search />
            </div>
            {/* {MENU_HEADER.map((item) => (
              <Link to="/rules">{item}</Link>
            ))} */}
            <Link to="/rules">Rules</Link>
            <Link to="/link">Link</Link>
            <Link to="/">Shop</Link>
            <Link to={`/card`}>Qrcode</Link>
          </div>
        </div>

        <div className="lg:flex lg:justify-center lg:items-center hidden   gap-x-2">
          {userName ? (
            <div className="lg:flex lg:justify-center lg:items-center hidden gap-x-2 cursor-pointer">
              <Tippy
                interactive
                delay={[0, 0]}
                hideOnClick="toggle"
                placement="bottom-end"
                trigger="click"
                render={(attrs) => (
                  <div className="box" tabIndex="-1" {...attrs}>
                    <Wrapper>
                      <div className=" py-4 px-4">
                        <Link
                          to={"/profile"}
                          className="rounded-lg bg-white md:-mx-4 md:rounded-md flex gap-x-2 my-4"
                        >
                          {avatarHeader ? (
                            <img
                              src={avatarHeader}
                              alt=""
                              className="w-8 h-8 rounded-full object-contain"
                            />
                          ) : (
                            <img
                              src={avatar}
                              alt=""
                              className="w-8 h-8 rounded-full object-contain"
                            />
                          )}
                          <div>
                            <div>{userName}</div>
                            <div className="text-xs text-gray-600">
                              @minhdz142001
                            </div>
                          </div>
                        </Link>
                        <div className="flex flex-col my-4 rounded-lg bg-white md:-mx-4 md:rounded-md gap-x-2 ">
                          <div className="text-concrete text-sm mb-3 font-semibold">
                            Account
                          </div>
                          <div className="flex gap-y-4 flex-col">
                            <div className="flex gap-x-2 items-center ">
                              <RiAccountBoxLine />
                              <Link to={`/profile`} className="w-full">
                                My account
                              </Link>
                            </div>
                            <div className="flex gap-x-2 items-center">
                              <RiMoneyDollarCircleLine />
                              <Link to="/payment" className="w-full">
                                Billing
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col my-4 rounded-lg bg-white md:-mx-4 md:rounded-md gap-x-2 ">
                          <div className="text-concrete text-sm mb-3 font-semibold">
                            Support
                          </div>
                          <div className="flex gap-y-4 flex-col">
                            <div className="flex gap-x-2 items-center">
                              <AiOutlineQuestionCircle />
                              <div>Ask a question</div>
                            </div>
                            <div className="flex gap-x-2 items-center ">
                              <RiQuestionAnswerLine />
                              <div>Submit feedback</div>
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            // handleLogout();
                          }}
                          className=" flex justify-center items-end bg-[#38B2AC] w-[90px] h-full rounded px-2 py-1 text-white text-sm gap-x-2 cursor-pointer"
                        >
                          Logout
                        </div>
                      </div>
                    </Wrapper>
                  </div>
                )}
                content="Hello"
              >
                <div className="flex items-center gap-x-2">
                  {avatarHeader ? (
                    <img
                      src={avatarHeader}
                      alt=""
                      className="w-8 h-8 rounded-full object-contain"
                    />
                  ) : (
                    <img
                      src={avatar}
                      alt=""
                      className="w-8 h-8 rounded-full object-contain"
                    />
                  )}

                  {userName}
                  <AiFillCaretDown />
                </div>
              </Tippy>
            </div>
          ) : (
            // </Tippy>
            <div
              className={`${
                isaction
                  ? "lg:flex lg:justify-center lg:items-center  gap-x-2"
                  : "lg:flex  gap-x-2"
              } `}
            >
              <Link
                to="/login"
                className="flex justify-center items-center w-[110px]] h-full bg-white rounded px-2 py-1 gap-x-2 text-black text-sm cursor-pointer border-2 "
              >
                <BiLogIn />
                Login
              </Link>
              <Link
                to="/register"
                className="flex justify-center items-center bg-[#38B2AC] w-[90px] h-full rounded px-2 py-1 text-white text-sm gap-x-2 cursor-pointer"
              >
                <AiOutlinePlus />
                Register
              </Link>
            </div>
          )}
        </div>
        <div
          className="text-2xl flex justify-center items-center w-8 h-8 cursor-pointer text-red-600 lg:hidden"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <AiOutlineMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
