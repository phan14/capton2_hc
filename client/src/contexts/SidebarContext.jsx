import React, { createContext, useState } from "react";

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handleOpen = () => {
    setIsOpen(false);
  };
  const CloseResponsive = () => {
    setIsActive(false);
  };

  return (
    <SidebarContext.Provider
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
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
