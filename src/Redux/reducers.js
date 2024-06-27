import {createSlice} from '@reduxjs/toolkit';

let initialState = {Role: ''};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    AddRole: (state, action) => {
      state.Role = action.payload;
    },
    RemoveRole: (state, action) => {
      state.Role = '';
    },
  },
});
export let {AddRole, RemoveRole} = UserSlice.actions;
export default UserSlice.reducer;
