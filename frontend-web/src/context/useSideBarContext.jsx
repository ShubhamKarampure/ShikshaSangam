import React, { createContext, useContext, useState } from "react";

const SideBarContext = createContext(undefined);

function useSideBarContext() {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error(
      "useSideBarContext must be used within a SideBarProvider"
    );
  }
  return context;
}

export const SideBarProvider = ({ children }) => {
  const [selected, setSelected] = useState("Dashboard");
  return (
    <SideBarContext.Provider value={{selected,setSelected}}>
      {children}
    </SideBarContext.Provider>
  );
};

export default useSideBarContext;
