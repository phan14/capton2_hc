import React, { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handleOpen = () => {
    setIsOpen(false);
  };
  const CloseResponsive = () => {
    setIsActive(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        handleOpen,
        isActive,
        setIsActive,
        CloseResponsive,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
