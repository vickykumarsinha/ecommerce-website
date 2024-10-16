import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,      // if an authentication request is in progress
    user: null,
};

// creating Async thunk: register 
// Asynchronous operations (like registering or logging in a user) are handled using createAsyncThunk.
// sends a POST request to the /auth/register API. formData sent in the request body, and withCredentials: true ensures that cookies (e.g., authentication tokens) are sent with the request. 
// response data is returned, used in Redux to update the state.

export const registerUser = createAsyncThunk('/auth/register',

    async (formData) => {
        const response = await axios.post('http://localhost:5001/api/auth/register', 
            formData, {
                withCredentials: true
        });
        return response.data;
    }
)
// login
export const loginUser = createAsyncThunk('/auth/login',

    async (formData) => {
        const response = await axios.post('http://localhost:5001/api/auth/login', formData, {
            withCredentials: true
        })
        return response.data;
    }
)

// logout
export const logoutUser = createAsyncThunk(
    "/auth/logout",
  
    async () => {
      const response = await axios.post(
        "http://localhost:5001/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    }
  );

// auth-middleware
export const checkAuth = createAsyncThunk('/auth/checkauth',

    async () => {
        const response = await axios.get('http://localhost:5001/api/auth/check-auth',
            {
                withCredentials: true,
                headers: {
                    "Cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                },
            });
        return response.data;
    }
);

// creating Redux Slice named auth
const authSlice = createSlice({
    name: 'auth',
    initialState,
    // Functions specify how slice's state should change in response to actions.
    reducers: {
        setUser: (state, action) => { },
    },

    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;

        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;  // no user info saved after register
            state.isAuthenticated = false;

        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;

        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;

        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success ? true : false;

        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;

        }).addCase(checkAuth.pending, (state) => {
            state.isLoading = true;

        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success ? true : false;

        }).addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
