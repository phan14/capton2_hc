import React, { useContext } from "react";
// import { FiFacebook, FiInstagram } from 'react-icons/fi';
import { BsFillSunFill } from "react-icons/bs";
import avatar from "../../assets/images/avtar.jpg";
import { Link } from "react-router-dom";
import { CreateLinkAccountContext } from "../../contexts/CreateLinkAccountContext";

const ViewLinkAccount = () => {
  const {
    cart,
    border,
    profileTitle,
    inputValueIntroduction,
    imageSrc,
    color,
    background,
    box,
  } = useContext(CreateLinkAccountContext);

  return (
    <div className={`flex justify-center relative w-full `}>
      <div
        className={`w-full h-full border-[10px] border-black rounded-[40px] ${background}  `}
      ></div>
      <div
        className={`absolute top-4  w-[90%] h-[470px] flex flex-col items-center ${color} gap-y-4`}
      >
        <div className="flex items-center flex-col gap-y-2">
          <img
              src={imageSrc?.url}
              alt=""
              className="w-20 h-20 mt-10 rounded-full object-cover flex justify-center"
            />

          <div className="flex flex-col items-center gap-y-1">
            <div className="text-sm  font-medium max-w-[200px]">
              {profileTitle ? profileTitle : "Your Name"}
            </div>
            <p className="text-xs word-wrap max-w-[180px] break-words">
              {inputValueIntroduction ? inputValueIntroduction : "Introduction"}
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-2 gap-y-4 lg:gap-y-3 items-center w-[220px] max-h-[220px] overflow-auto ">
          {cart.map((item, index) => (
            <Link
              key={item._id}
            index = {index}
              to={`${item.url}`}
              id={item.id}
              className={` rounded-xl w-[90%] min-h-[34px] flex items-center ${box} ${color} ${border} `}
              target="_blank"
            >
              {/* <div className="h-full  flex items-center justify-center"></div> */}
              <div
                onClick={() => {
                  console.log(item.id);
                }}
                className={` text-xs flex items-center justify-center w-[240px] ${color} ${box}`}
              >
                {item.title ? item.title : "Title"}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`flex gap-x-1 text-xs font-medium items-center absolute bottom-10 ${color}`}
      >
        SCIS <BsFillSunFill />
      </div>
    </div>
  );
};

export default ViewLinkAccount;
