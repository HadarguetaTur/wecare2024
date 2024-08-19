import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchUsers, getUserByToken } from "../action/userAction";


const initialState = {
  user: null,
  users: [],
  filteredUsers: [], 
  selectedCategory: 'all',
  loading: false,
  error: null,
  status: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUserCategory: (state, action) => { 
      state.selectedCategory = action.payload;
      state.filteredUsers = state.selectedCategory === 'all'
        ? state.users
        : state.users.filter(user => user.category === state.selectedCategory);
    },
    setCurrentUser(state, action) {
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
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action);
        state.users = action.payload.users;
        state.filteredUsers =  
          state.selectedCategory === "all"
            ? state.users
            : state.users.filter(
                (user) => user.category === state.selectedCategory
              );
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});


export const selectUserById = (state, id) => {
  return state.user.users.find(user => user.id === id);
}



export const selectUserByCategory = createSelector(
  [state => state.user.filteredUsers, (_, category) => category],
  (filteredUsers, category) => {
    return filteredUsers.filter(user => user.isCareProvider === true && user.category === category);
  }
);

export const {
  setSelectedUserCategory,  
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
