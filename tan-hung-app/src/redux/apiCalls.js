import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user, navigate) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const logout = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    await publicRequest.post("/auth/logout");
    dispatch(logoutSuccess());
    navigate("/");
  } catch (err) {
    dispatch(logoutFailure());
  }
};
