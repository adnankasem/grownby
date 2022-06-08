import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import { SIGNED_IN, SIGNED_OUT } from "./actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppContextProps {
  isSignedIn: boolean;
  userSignedIn: () => {};
  userSignedOut: () => {};
}

const initialState = {
  token: AsyncStorage.getItem("@auth_Key"),
  isSignedIn: AsyncStorage.getItem("@auth_Key") ? true : false,
};

const AppContext = React.createContext({} as AppContextProps);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const userSignedIn = () => {
    dispatch({ type: SIGNED_IN });
  };
  const userSignedOut = () => {
    dispatch({ type: SIGNED_OUT });
  };

  return (
    <AppContext.Provider value={{ ...state, userSignedIn, userSignedOut }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
