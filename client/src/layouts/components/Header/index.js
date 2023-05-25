import { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BsPerson, BsCart2 } from "react-icons/bs";

import NavBar, { NavBarMobile } from "../NavBar";
import Search from "../Search";

import authApi from "../../../api/authApi";
import { logout } from "../../../redux/actions/auth";
import { destroy } from "../../../redux/actions/cart";
import { RiAccountBoxLine, RiQuestionAnswerLine } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import styles from "./Header.module.css";

function Header() {
  console.log("header Render");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const handleLogout = async () => {
    const resultLogout = await authApi.logout();
    console.log(resultLogout);
    dispatch(logout());
    dispatch(destroy());
    const token = localStorage.getItem("accessToken");
    if (token) {
      localStorage.removeItem("accessToken");
    }
    navigate({ pathname: "/dang-nhap" });
  };
  const [isAction2, setIsAction2] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsAction2(true) : setIsAction2(false);
      // window.scrollY = 0 ? setIsAction2(false) : setIsAction2(false);
    });
  });

  return (
    <div
      className={`${
        isAction2
          ? "bg-white py-2 lg:px-4 xl:px-10 2xl:px-20 shadow-md xs:px-4 "
          : "bg-none py-2 shadow-md lg:px-4 xl:px-10 2xl:px-20 xs:px-4 "
      }  z-20  fixed w-full  `}
    >
      <div className={styles.headerCenter}>
        <div>
          <div className={styles.headerRow}>
            <NavBarMobile />
            <div className=" flex justify-between gap-x-4 w-[966px]">
              <div className="text-2xl text-red-800 font-medium">
                <Link to={"/home"}>SCIS.com.vn</Link>
              </div>
              {/* <div className={` {styles.search}`}>
                <Search />
              </div> */}
              <NavBar />
            </div>

            <div className={`${styles.headerCenterRight} d-flex`}>
              <div className={styles.headerIcon}>
                {currentUser.email && currentUser.fullName ? (
                  <div
                    className={` xs:w-[50px] lg:w-[150px] xl:w-[200px] flex items-center justify-center flex-col ${styles.account}`}
                  >
                    <img
                      className={styles.avatar}
                      src={currentUser?.avatar?.url}
                      alt=""
                    />
                    <p>{currentUser.fullName}</p>
                    <div
                      className={`  px-6 absolute right-0  shadow-max-elevation-light text-left bg-white rounded-t-lg md:rounded-lg overflow-auto opacity-100 translate-y-0 shadow-3xl ${styles.accountPopup} `}
                    >
                      {currentUser.role === 1 && (
                        <div className="pt-4 px-2 ">
                          <div className=" flex flex-col  rounded-lg bg-white md:-mx-4 md:rounded-md gap-x-2 ">
                            <div className="text-concrete text-sm mb-2 font-semibold">
                              Account
                            </div>
                            <div
                              className={`flex  items-center ${styles.item}`}
                            >
                              <RiAccountBoxLine className="w-4" />
                              <Link
                                className={styles.popupLink}
                                to="/tai-khoan"
                              >
                                My account
                              </Link>
                            </div>
                          </div>
                          <div className="flex flex-col my-3 rounded-lg bg-white md:-mx-4 md:rounded-md gap-x-2 ">
                            <div className="text-concrete text-sm mb-3 font-semibold">
                              Support
                            </div>
                            <div className="flex gap-y-4 flex-col">
                              <div className="flex gap-x-2 items-center">
                                <AiOutlineQuestionCircle className="w-4" />
                                <div>Ask a question</div>
                              </div>
                              <div className="flex gap-x-2 items-center ">
                                <RiQuestionAnswerLine className="w-4" />
                                <div>Submit feedback</div>
                              </div>
                            </div>
                            <div className="flex gap-y-4 flex-col mt-4">
                              <div
                                onClick={handleLogout}
                                className="flex justify-center items-end bg-[#38B2AC] w-[90px] h-full rounded px-2 py-1 text-white text-sm gap-x-2 cursor-pointer mb-2"
                              >
                                Logout
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {currentUser.role > 1 && (
                        <div className="pt-4 px-2 pb-2">
                          <div className=" flex flex-col  rounded-lg bg-white md:-mx-4 md:rounded-md gap-x-2 ">
                            <div className="text-concrete text-sm mb-2 font-semibold">
                              Account
                            </div>
                            <div
                              className={`flex  items-center ${styles.item}`}
                            >
                              <RiAccountBoxLine className="w-4" />
                              <Link className={styles.popupLink} to="/admin">
                                Manage Siss
                              </Link>
                            </div>
                          </div>
                          <div
                            onClick={handleLogout}
                            className="flex justify-center items-end bg-[#38B2AC] w-[90px] h-full rounded px-2 py-1 text-white text-sm gap-x-2 cursor-pointer mt-3 mb-2"
                          >
                            Log out
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/dang-nhap"
                    className="flex flex-col justify-center items-center"
                  >
                    <BsPerson />
                    <p>Account</p>
                  </Link>
                )}
              </div>
              <div className={`flex items-center ${styles.headerIcon}`}>
                <Link to="/gio-hang">
                  <BsCart2 className="2xl:w-[32px] xs:w-[24px]" />
                  <p>Cart</p>
                  <span className={` ${styles.count} `}>
                    {cart.list.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.searchMobile}>
        <div className="2xl:hidden">
          <Search />
        </div>
      </div>
    </div>
  );
}

export default memo(Header);
