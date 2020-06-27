import { createSlice } from "@reduxjs/toolkit";
import { endpointURL } from "../../../settings";
import { post } from '../../../requester';
export const slice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: "",
    role: "",
    headers: {},
  },
  reducers: {
    loginSuccess: (state, action) => {
      console.log("From reducer!");
      console.log(state);
      console.log(action);

      state.isAuthenticated = true;
      state.headers = {
        Authorization: "Bearer " + action.payload.token,
        "Content-Type": "application/json",
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = slice.actions;

export const login = (username, password,history) => dispatch => {
 console.log("LOGIN")
 console.log(username)
 console.log(password)
 
  dispatch(
    post(
      endpointURL + "/user/login",
      {
        username: username,
        password: password,
      },
      (res) => {
        //if success
        console.log("SUCCES");
        console.log(res)
        dispatch(loginSuccess(res.data));
        history.push("/dashboard");
      },
      () => {
        //if error
      },
      () => {
        //finally do
      }
    )
  )
};
export default slice.reducer;