import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
//import icont
import { SlReload } from "react-icons/sl";
import { ImEarth } from "react-icons/im";
import hinhnen from "../assets/images/hinhnen.jpg";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Card = () => {
  const [inputName, setInputName] = useState("");
  const handleInputName = (e) => {
    setInputName(e.target.value);
  };
  const navigate = useNavigate();
  //chọn ảnh
  //   const [selectedFile, setSelectedFile] = useState(null);
  //   // const [selectedFile2, setSelectedFile2] = useState(null);
  //   const handleFileInput = (e) => {
  //       setSelectedFile(e.target.files[0]);
  //   };

  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [previewUrl1, setPreviewUrl1] = useState(null);
  const [previewUrl2, setPreviewUrl2] = useState(null);

  const handleFileInputChange1 = (event) => {
    const file = event.target.files[0];
    setSelectedFile1(file);
    setPreviewUrl1(URL.createObjectURL(file));
  };

  const handleFileInputChange2 = (event) => {
    const file = event.target.files[0];
    setSelectedFile2(file);
    setPreviewUrl2(URL.createObjectURL(file));
  };
  const handleFileInput2 = (e) => {
    setSelectedFile2(e.target.files[0]);
  };
  // goi api lay qrcode
  const defaultValue = "http://localhost:3000/demo/";
  //lay user xong get api ra để láy qrcodename
  const infoUser = JSON.parse(localStorage.getItem("infoUser"));
  const [qrCodeName, setQrCodeName] = useState("");
  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:8000/api/qrcode/${infoUser.userID}`)
  //       .then((response) => {
  //         setQrCodeName(response.data.qrCodeName);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, [infoUser.userID]);
  //gọi api để post lên database
  //   const PostQRcode = async (qrCodeName) => {
  //     await callApi(`api/qrcode/update/${infoUser.userID}`, "post", {
  //       qrCodeName: qrCodeName,
  //     })
  //       .then((res) => {
  //         toast.success("Create QRcode success!", {
  //           position: "top-right",
  //           autoClose: 1500,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         console.log("Thất bại");
  //         toast.error("Create QRcode errol!", {
  //           position: "top-right",
  //           autoClose: 1500,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       });
  //   };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const params = formData.get("params");
    // PostQRcode(params);
  };

  return (
    <section className="h-screen xs:h-full">
      <div className="w-full h-full flex gap-x-10 flex-col gap-y-10 px-24 lg:flex-row xl:px-20 lg:px-40 pb-10 pt-24">
        <div className="flex flex-col flex-auto gap-y-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-auto gap-y-4"
          >
            {/* img  */}
            <div className="flex flex-col gap-y-2">
              <div className=" text-xl font-medium">
                Choose a photo for the front{" "}
              </div>
              <div className="flex gap-x-4 border border-[#B2BABB] px-2 py-2 items-center rounded">
                <ImEarth className="text-[#707B7C]" />
                <input type="file" onChange={handleFileInputChange1} />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className=" text-xl font-medium">
                Choose a photo for the back side{" "}
              </div>
              <div className="flex gap-x-4 border border-[#B2BABB] px-2 py-2 items-center rounded">
                <ImEarth className="text-[#707B7C]" />
                <input type="file" onChange={handleFileInputChange2} />
              </div>
            </div>

            {/* link  */}

            {/* tao qrcode  */}
            <Link
              to={"/thanh-toan"}
              className="bg-purple-700 mt-4 hover:bg-purple-500 transition-all duration-500 justify-center rounded text-white flex gap-x-3 items-center w-[230px] h-[40px]"
            >
              <button className=" w-full h-full cursor-pointer flex items-center justify-center gap-x-2  px-4 py-1">
                <SlReload />
                Create Card
              </button>
              <ToastContainer />
            </Link>
          </form>
        </div>
        <div className=" flex flex-auto items-center flex-col gap-y-8">
          {selectedFile1 ? (
            <div className="flex flex-col gap-y-2">
              <div className="relative">
                {/* <img
                                    // src={URL.createObjectURL(selectedFile)}
                                    alt="Selected file"
                                    // style={{ maxWidth: '100%' }}
                                    className="w-[500px] h-[350px] relative flex object-contain border border-black"
                                /> */}
                {previewUrl1 && (
                  <img
                    src={previewUrl1}
                    alt="Preview 1"
                    style={{ maxWidth: "100%" }}
                    className="w-[450px] h-[310px] relative flex object-cover border border-black"
                  />
                )}
                <div className="absolute bottom-10 left-10 text-3xl font-medium text-white">
                  {inputName}
                </div>
                <QRCode
                  value={`${defaultValue}${qrCodeName}`}
                  size={100}
                  id="qr-code"
                  className="top-10 right-10 absolute"
                />
              </div>
              <div className="relative">
                {/* <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected file"
                                style={{ maxWidth: '100%' }}
                                className="w-[500px] h-[350px] relative flex object-contain border border-black"
                            /> */}
                {previewUrl2 && (
                  <img
                    src={previewUrl2}
                    alt="Preview 2"
                    className="w-[450px] h-[310px] relative flex object-cover border border-black"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-y-2">
              <div
                className="w-[450px] h-[310px] relative flex object-cover border border-black"
                style={{ backgroundImage: `url(${hinhnen})` }}
              >
                <QRCode
                  value={`${defaultValue}${qrCodeName}`}
                  size={100}
                  id="qr-code"
                  className="top-10 right-10 absolute"
                />
              </div>
              <div
                className="w-[450px] h-[310px] relative flex object-cover border border-black"
                style={{ backgroundImage: `url(${hinhnen})` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Card;
