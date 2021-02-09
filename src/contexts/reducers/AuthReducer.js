import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  FETCH_LOADING,
  LOAD_USER,
  LOGIN_USER,
  REGISTER_USER,
} from "../actionTypes";

export default (state, action) => {
  switch (action.type) {
    case FETCH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        success: true,
        currentUser: action.payload.user.first_name,
        userInfo: action.payload.user,
        isLoading: false,
        msg: action.payload.msg,
      };
    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        msg: action.payload.msg,
        success: true,
        msg: action.payload.msg,
        isLoading: false,
      };
    case LOAD_USER:
      return {
        ...state,
        userInfo: action.payload,
        currentUser: action.payload.first_name,
        isAuthenticated:
          action.payload.message === "jwt malformed" ? false : true,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        errors: action.payload.errors,
        success: false,
        msg: action.payload.msg ? action.payload.message : action.payload,
      };
    case CLEAR_ERRORS:
      localStorage.setItem("ERRORS", "ERROR CLEARED");
      return {
        ...state,
        errors: null,
        msg: "",
        isLoading: false,
      };

    default:
      return state;
  }
};
