import React, { useState, useReducer, useContext, createContext } from 'react';

const AppContext = createContext();

const likesReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_LIKES_COUNT':
        return {
          ...state,
          postId: action.postId,
          likesCount: action.likesCount,
        };
      default:
        return state;
    }
  };

const AppProvider = ({ children }) => {
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [smallSidebar, setSmallSidebar] = useState(false);
  const [likesState, dispatch] = useReducer(likesReducer, { }); 

  return (
    <AppContext.Provider  
      value={{
        mobileSidebar,
        setMobileSidebar,
        smallSidebar,
        setSmallSidebar,
        likesState,
        dispatch
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