import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/auth.service";
import { setCurrentUser } from "../reducers/userSlice";

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue ,dispatch}) => {
    try {
      const data = await authService.signUp(formData);
      dispatch(setCurrentUser(data.data.user));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const data = await authService.signIn(formData);
      dispatch(setCurrentUser(data.data.user));
      return data

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Signin failed. Please try again."
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const data = await authService.resetPassword(email);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Reset password failed. Please try again."
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await authService.logOut();
      localStorage.removeItem('token')
      dispatch(setCurrentUser(null));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  }
);
