import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services/user.service";
import { setCurrentUser } from "../reducers/userSlice";

export const updateDetails = createAsyncThunk(
    "user/updateMe",
    async (userDetails, { rejectWithValue, dispatch }) => {
      try {
        const response = await userService.updateUser(userDetails);
        console.log(response);
        if(response.status==="success"){
          dispatch(setCurrentUser(response.data.user))
    
        }

        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
  export const getUserByToken = createAsyncThunk(
    "user/getUserByToken",
    async (token, { rejectWithValue}) => {
      try {  
        const response = await userService.getUserByToken(token);
        return response.data.data;
      } catch (err) {
        return rejectWithValue(err.response.data || "Error fetching user by token");
      }
    }
  );
  
  export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (user, { rejectWithValue }) => {
      try {
        const res = await userService.deleteUser(user);
        return res;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );