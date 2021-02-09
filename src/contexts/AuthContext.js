import React, { createContext, useReducer } from "react";
import AuthReducer from "./reducers/AuthReducer";
import * as types from "./actionTypes";

//initial state
const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  currentUser: null,
  isLoading: false,
  success: null,
  userInfo: null,
  msg: "",
  errors: null,
};

//create context
export const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //register user
  const registerUser = (user) => {
    dispatch(setItemsLoading());
    fetch("https://sendit-parcel.herokuapp.com/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "Application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.success === false) {
          dispatch({ type: types.REGISTER_USER, payload: data });
        } else {
          dispatch({ type: types.AUTH_ERROR, payload: data });
          setTimeout(() => {
            dispatch(clearErrors());
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };

  const setItemsLoading = () => {
    return {
      type: types.FETCH_LOADING,
    };
  };

  const clearErrors = () => {
    return { type: types.CLEAR_ERRORS };
  };

  //return provider
  return (
    <AuthContext.Provider value={{ state, registerUser, clearErrors }}>
      {children}
    </AuthContext.Provider>
  );
}
