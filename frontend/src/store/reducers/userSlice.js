import { createSlice } from "@reduxjs/toolkit";
import { getUserByToken } from "../action/userAction";

const initialState = {
  user: null,
  loading: false,
  error: null,
  status: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      console.log(action,'state');
      state.user = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByToken.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUserByToken.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentUser,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} = userSlice.actions;
export default userSlice.reducer;
