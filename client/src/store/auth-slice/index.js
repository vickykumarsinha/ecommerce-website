import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated : false,
    isLoading : false,      // if an authentication request is in progress
    user: null
}

// creating Async thunk 
export const registerUser = createAsyncThunk('/auth/register',

    async(formData) => {
        const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
            withCredentials: true
        })
        return response.data;
    }
) 

// creating Redux Slice named auth
const authSlice = createSlice({
    name: 'auth',
    initialState,
    // Functions specify how slice's state should change in response to actions.
    reducers: {
        setUser : (state, action) =>{},
    },

    extraReducers: (builder) => {
        builder.addCase(registerUser.pending,  (state)=> {
            state.isLoading = true;

        }).addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;  // no user info saved after register
            state.isAuthenticated = false;

        }).addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
});

export const{setUser}  = authSlice.actions;
export default authSlice.reducer;
