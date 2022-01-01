import { createSlice } from '@reduxjs/toolkit'

export const navigationSlice = createSlice({
    name: 'search',
    initialState: {
        text: ''
    },
    reducers: {
        textChange: (state, action) => {
            state.text = action.payload
        }
    }
});

export const selectText = state => state.search.text;

export const { textChange } = navigationSlice.actions;

export default navigationSlice.reducer;