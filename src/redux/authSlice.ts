import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loginUser, signupUser} from '../api/api';
import {string} from '../Common/String';
import Toast from 'react-native-toast-message';

interface AuthState {
  isAuthenticated: boolean;
  userRole: 'Admin' | 'Customer' | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: null,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}: {email: string; password: string}, thunkAPI) => {
    try {
      const response = await loginUser(email, password);
      Toast.show({
        type: 'error',
        text1: string.messages.loginSucess,
      });
      return response;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: any, thunkAPI) => {
    try {
      const response = await signupUser(userData);
      Toast.show({
        type: 'error',
        text1: string.messages.SignupSucess,
      });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;
