import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  id: string | null;
  name: string | null;
  email: string | null;
  phone?: string | null;
  token: string | "";
  role: "chauffeur" | "admin" | null;
}

const initialState: AuthState = {
  id: null,
  name: null,
  email: null,
  phone: null,
  token: "",
  role: null,
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth: (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone || null;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    loginSuccess: (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone || null;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.phone = null;
      state.token = "";
      state.role = null;
    },
  },
});

export const { hydrateAuth, loginSuccess, logout } = authslice.actions;
export default authslice.reducer;
