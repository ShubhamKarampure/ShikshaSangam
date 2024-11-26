import React, { createContext, useContext, useState } from "react";

const SignUpPageContext = createContext(undefined);

function useSignUpPageContext() {
  const context = useContext(SignUpPageContext);
  if (context === undefined) {
    throw new Error(
      "useSignUpPageContext must be used within a SignUpPageProvider"
    );
  }
  return context;
}

export const SignUpPageProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const increaseStep = () => {
    setActiveStep((prev) => prev + 1);
  }
  return (
    <SignUpPageContext.Provider value={{increaseStep}}>
      {children}
    </SignUpPageContext.Provider>
  );
};

export default useSignUpPageContext;
