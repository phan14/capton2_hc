import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsArrowsMove } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
// import ToggleSwitch from '../../components/Toggle//ToggleSwitch';
import { useContext } from "react";
import { CreateLinkAccountContext } from "../../contexts/CreateLinkAccountContext";
import "../Toggle/toggle.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import informationAPI from "../../api/informationAPI";
import { useSelector } from "react-redux";


const ContentLinkAccount = ({ isActive }) => {
  const {
    handleUpdateTitle,
    removeCart,
    handleUpdateUrl,
    cart,
    handleOnDragEnd,
  } = useContext(CreateLinkAccountContext);

  // const { userId, fullName, avatar } = useSelector((state) => state.auth);
  // const [linkName, setLinkName] = useState({})
  // useEffect(()=>{
  //   const getLinkName = async () =>
  //   {
  //     const data111 = await informationAPI.getInfor(userId)
  //     setLinkName(data111.link)
  //     console.log(linkName);
  //   }
  //   getLinkName();
  // },[])

  const updateTitle = (id, newTitle) => {
    handleUpdateTitle(id, newTitle);
  };

  const updateUrl = (id, newUrl) => {
    handleUpdateUrl(id, newUrl);
  };

  const { userId, fullName, avatar } = useSelector((state) => state.auth);

  const handleUpdate = async () =>{
    const updateAppearance = {
      // informationName: profileTitle,
      // informationNote: inputValueIntroduction,
      // informationAvatar: imageSrc,
      // informationPhone: '',
      informationLink: cart,
      // Theme: {},
    }
    console.log(updateAppearance);
    await informationAPI.putInfor(userId, updateAppearance)
    .then(data=>{
      console.log('oke');
    }).catch(err =>{
      console.log('fail');
    })
    // console.log(cart);

  }

  return (
    <div className="h-full">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="list1">
          {(provided) => (
            <div
              className="list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {cart?.map((item,index) => {
                return (
                  <Draggable
                    key={item._id}
                    draggableId={item?.url}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={`${
                          isActive
                            ? "border rounded-md mt-10 flex px-4 py-2 gap-x-8 h-[100px] shadow-sm "
                            : "border rounded-md mt-10 flex px-4 py-2 gap-x-8 h-[100px] opacity-50"
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="flex items-center justify-center cursor-pointer h-full">
                          <BsArrowsMove />
                        </div>
                        <div className="flex flex-col w-[70%] gap-x-4">
                          <div className="flex  ">
                            <input
                              type="text"
                              id={item.title}
                              name={item.title}
                              value={item.title}
                              placeholder="title"
                              onChange={(e) =>
                                updateTitle(item._id, e.target.value)
                              }
                              className="outline-none py-2 text-base w-[355px]"
                            />
                            <label
                              htmlFor={item.title}
                              className="cursor-pointer w-4 flex items-center justify-center bg-white "
                            >
                              <MdOutlineModeEdit />
                            </label>
                          </div>
                          <div className="flex  ">
                            <input
                              type="text"
                              id={item.url}
                              placeholder="Url"
                              defaultValue={item.url}
                              className="outline-none text-base w-[355px]"
                              onChange={(e) => {
                                updateUrl(item._id, e.target.value);
                              }}
                            />
                            <label
                              htmlFor={item.url}
                              className="cursor-pointer w-4 flex items-center justify-center bg-white"
                            >
                              <MdOutlineModeEdit />
                            </label>
                          </div>

                          <div className="flex justify-between items-start pt-2 gap-2 text-concrete">
                            <div className="flex gap-2 flex-wrap"></div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-center items-center gap-y-2">
                          <div className="py-1 px-1"></div>
                          <div
                            className="cursor-pointer px-1 py-1"
                            onClick={() => {
                              removeCart(item._id);
                            }}
                          >
                            <RiDeleteBinLine className="text-lg font-normal" />
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div
        onClick={() => handleUpdate()}
        className="bg-violet-700 text-white px-2 py-2 rounded-2xl flex justify-center cursor-pointer items-center font-medium gap-x-2 mt-8"
      >
        <button>Update</button>
      </div>
    </div>
  );
};

export default ContentLinkAccount;
