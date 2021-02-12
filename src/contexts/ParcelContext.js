import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import ParcelReducer from "./reducers/ParcelReducer";
import * as types from "./actionTypes";

//initial state
const initialState = {
  parcels: [],
  isLoading: false,
  response: null,
  success: null,
  errors: null,
};

//create contet
export const ParcelContext = createContext(initialState);

export default function ParcelProvider({ children }) {
  const [state, dispatch] = useReducer(ParcelReducer, initialState);
  const {
    state: { userInfo, token },
  } = useContext(AuthContext);

  useEffect(() => {
    loadParcels();
  }, [userInfo]);
  const loadParcels = () => {
    const userId = userInfo && userInfo.id; //check if userdata is loaded
    console.log(userId);
    dispatch(setParcelLoading());
    fetch(`https://sendit-parcel.herokuapp.com/parcels/${userId}`, {
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: types.LOAD_PARCELS, payload: data });
      });
  };

  const createParcel = (parcel) => {
    dispatch(setParcelLoading());
    fetch("https://sendit-parcel.herokuapp.com/parcels", {
      method: "POST",
      body: JSON.stringify(parcel),
      headers: {
        "Content-type": "Application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: types.CREATE_PARCEL, payload: data });
      });
  };

  const editPickUpDestination = (parcel, parcel_id) => {
    // const parcel_id = getState().parcels.parcels && getState().parcels.parcels.id; //check if userdata is loaded
    dispatch(setParcelLoading());
    fetch(
      `https://sendit-parcel.herokuapp.com/parcels/${parcel_id}/destination`,
      {
        method: "PUT",
        body: JSON.stringify(parcel),
        headers: {
          "Content-type": "Application/json",
          "x-access-token": token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: types.EDIT_PICKUP_DESTINATION, payload: data });
      });
  };

  const cancelDelivery = (id) => {
    dispatch(setParcelLoading());
    const user_id = userInfo && userInfo.id;

    fetch(`https://sendit-parcel.herokuapp.com/parcels/${id}/cancel`, {
      method: "PUT",
      body: JSON.stringify({ user_id }),
      headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: types.CANCEL_DELIVERY, payload: data });
      });
  };

  const clearErrors = () => {
    dispatch({ type: types.CLEAR_ERRORS });
    console.log("cleared");
  };

  const setParcelLoading = () => {
    return {
      type: types.PARCELS_LOADING,
    };
  };

  return (
    <ParcelContext.Provider
      value={{
        state,
        loadParcels,
        createParcel,
        clearErrors,
        editPickUpDestination,
        cancelDelivery,
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
}
