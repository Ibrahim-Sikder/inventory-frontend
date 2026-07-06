import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUser = {
  userId: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "employee";
};

type TAuthState = {
  user: TUser | null;
  isLoading: boolean;
};

const initialState: TAuthState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setUser, setAuthLoading, logout } = authSlice.actions;
export default authSlice.reducer;