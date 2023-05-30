import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itemCount : 0,
}

export const cartSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.itemCount = action.payload;
        },
        add: (state, action) => {
            state.itemCount ++;
        },
        remove: (state, action) => {
            state.itemCount --;
        },
    },
})

export const { setCount, add , remove } = cartSlice.actions

export default cartSlice.reducer