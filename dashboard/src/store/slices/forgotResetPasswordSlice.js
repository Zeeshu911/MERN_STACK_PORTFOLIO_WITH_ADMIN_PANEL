import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPassSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state = state;
    },
  },
});

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
    console.log(email);
    const response = await axios.post(
      "https://mern-stack-portfolio-backend-code.onrender.com/api/v1/user/password/forgot",
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    console.log(response);
    dispatch(
      forgotResetPassSlice.actions.forgotPasswordSuccess(response.data.message)
    );
  } catch (error) {
    console.log(error);
    dispatch(
      forgotResetPassSlice.actions.forgotPasswordFailed(
        error.response.data.message
      )
    );
  }
};

export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch(forgotResetPassSlice.actions.resetPasswordRequest());
      const response = await axios.put(
        ` https://mern-stack-portfolio-backend-code.onrender.com/api/v1/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      dispatch(
        forgotResetPassSlice.actions.resetPasswordSuccess(response.data.message)
      );
    } catch (error) {
      console.log(error);
      dispatch(
        forgotResetPassSlice.actions.resetPasswordFailed(
          error.response.data.message
        )
      );
    }
  };

export const clearAllForgotResetPassErrors = () => (dispatch) => {
  dispatch(forgotResetPassSlice.actions.clearAllErrors());
};

export default forgotResetPassSlice.reducer;
