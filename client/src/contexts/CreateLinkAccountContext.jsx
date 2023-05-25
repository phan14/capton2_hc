import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import informationAPI from "../api/informationAPI";
// import informationAPI from "../../api/informationAPI";



export const CreateLinkAccountContext = createContext();

const CreateLinkAccountProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(0);
  const [url, seturl] = useState("");
  const [iconSocial, setIconSocial] = useState("");

  
  const handleAddToCart = () => {
    const newCart = [...cart, { title: title,url: url }];
    setCart(newCart);
    // setId(id + 1);
    seturl("");
    setTitle("");
    setIconSocial("");
    
    console.log(newCart);
  };
  const handleurl = (e) => {
    seturl(e.target.value);
  };
  const handleInput = (e) => {
    setTitle(e.target.value);
  };
  const handleUpdateTitle = (id, newTitle) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        return { ...item, title: newTitle };
      }
      return item;
    });
    setCart(updatedCart);
  };
  const handleUpdateUrl = (id, newUrl) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        return { ...item, url: newUrl };
      }
      return item;
    });
    setCart(updatedCart);
    console.log(cart);
  };
  const removeCart = (id) => {
    const newCart = cart.filter((item) => {
      return item._id !== id;
    });
    setCart(newCart);
  };
  const clearCart = () => {
    setCart([]);
  };
  //appearance
  const [profileTitle, setProfileTitle] = useState("");
  const handleProfileTitle = (e) => {
    setProfileTitle(e.target.value);
  };
  const [inputValueIntroduction, setInputValueIntroduction] = useState("");
  const maxInputLength = 70;
  function handleInputChange(event) {
    const value = event.target.value;
    setInputValueIntroduction(value.slice(0, maxInputLength));
  }

  //toggle
  const [checked, setChecked] = useState(true);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  //selectImg
  const [selectedFile, setSelectedFile] = useState({});
  // const [isFilePicked, setIsFilePicked] = useState(false)
  // const [selectedFile2, setSelectedFile2] = useState(null);
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    // setIsFilePicked(true)
  };

  // img appearance

  const [imageSrc, setImageSrc] = useState({});
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "kczsnfkt");
    
      const {
        data: { secure_url, public_id },
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/dtfsciqga/image/upload",
        formData
      );
      if (secure_url && public_id) {
        const avatar = {
          url: secure_url,
          publicId: public_id,
        };
        setImageSrc(avatar);
      }
    }catch(err){
      console.log(err);
    }
    // const imageUrl = URL.createObjectURL(file);
    
  };
  const removeFileInputChange = () => {
    setImageSrc({url: 'https://res.cloudinary.com/dtfsciqga/image/upload/v1684033250/no-avatar_kitran.png'});
  };


  const handleOnDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const items = Array.from(cart);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCart(items);
  };
  const [type, setType] = "navbar1";

  // themes
  const [color, setColor] = useState("");
  const [background, setBackground] = useState("");
  const [box, setBox] = useState("");
  const [border, setBorder] = useState("");
  return (
    <CreateLinkAccountContext.Provider
      value={{
        cart,
        url,
        title,
        id,
        iconSocial,
        setIconSocial,
        border,
        setBorder,
        profileTitle,
        inputValueIntroduction,
        maxInputLength,
        checked,
        selectedFile,
        imageSrc,
        type,
        setType,
        color,
        setColor,
        background,
        box,
        setBox,
        setProfileTitle,
        setBackground,
        handleOnDragEnd,
        removeFileInputChange,
        handleFileInputChange,
        handleurl,
        handleFileInput,
        setChecked,
        toggleChecked,
        handleInputChange,
        setId,
        handleInput,
        handleProfileTitle,
        setTitle,
        seturl,
        setCart,
        handleAddToCart,
        removeCart,
        clearCart,
        handleUpdateTitle,
        handleUpdateUrl,
        setInputValueIntroduction,
        setImageSrc,
      }}
    >
      {children}
    </CreateLinkAccountContext.Provider>
  );
};

export default CreateLinkAccountProvider;
