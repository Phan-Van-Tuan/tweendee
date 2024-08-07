// src/features/users/usersSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetUserDto, UsersState } from "../../models/user.interface";

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const loadUsers = createAsyncThunk(
  "users/loadUsers",
  async (dto: GetUserDto) => {
    const response = await axios.get(
      `https://randomuser.me/api/?page=${dto.page}&results=${dto.pageSize}`
    );
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.results;
      console.log(state.users);
      state.totalPages = action.payload.info.pages;
      // state.totalPages = Math.ceil(action.payload.info.results / 10);
    });
    builder.addCase(loadUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { setPage } = usersSlice.actions;
export default usersSlice.reducer;
