import React, { useState, useContext, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [mobileSidebar, setMobileSidebar] = useState(false);
  
  return (
    <AppContext.Provider  
      value={{
        mobileSidebar,
        setMobileSidebar,
      }} 
    >
      { children }
    </AppContext.Provider>
  )
};

export const useGlobalContext = () => {
  return  useContext(AppContext)
}

export default AppProvider;