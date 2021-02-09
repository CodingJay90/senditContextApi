import {
  CANCEL_DELIVERY,
  CLEAR_ERRORS,
  CREATE_PARCEL,
  EDIT_PICKUP_DESTINATION,
  LOAD_PARCELS,
  PARCELS_LOADING,
} from "../actionTypes";

export default function (state, action) {
  switch (action.type) {
    case PARCELS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_PARCELS:
      return {
        ...state,
        parcels: action.payload,
        isLoading: false,
      };
    case CREATE_PARCEL:
      return {
        ...state,
        parcels: state.parcels.parcel && [
          ...state.parcels,
          action.payload.parcel,
        ], //check if user has any parcel to prevent errors in react
        isLoading: false,
        success: action.payload.success ? true : false,
        errors: action.payload.errors ? action.payload : null,
      };
    case EDIT_PICKUP_DESTINATION:
      return {
        ...state,
        isLoading: false,
        success: action.payload.success ? true : false,
        parcels: state.parcels.map((parcel) =>
          parcel.id === action.payload.id ? action.payload : parcel
        ),
      };
    case CANCEL_DELIVERY:
      return {
        ...state,
        response: action.payload,
        isLoading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
        isLoading: false,
        success: null,
        parcels: state.parcels && [
          // ...state.parcels,
          { ...state.parcels, errors: null },
        ],
      };

    default:
      return state;
  }
}
