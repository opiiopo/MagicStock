import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
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

export const { textChange } = searchSlice.actions;

export default searchSlice.reducer;