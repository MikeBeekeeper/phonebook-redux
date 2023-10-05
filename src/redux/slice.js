import { createSlice } from '@reduxjs/toolkit';

export const myContactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    add(state, action) {
        state.push(action.payload);
    },
    remove(state, action) {
    return state.filter(el => el.id !== action.payload);
    },
  },
});

export const myFilterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return (state = action.payload);
    },
  },
});

export const { add, remove } = myContactsSlice.actions;
export const { changeFilter } = myFilterSlice.actions;
