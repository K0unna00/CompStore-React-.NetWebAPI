import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    id: null,
    role: null,
    name: null
}

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        authorize: (state, action) => {
            state.isAuth = action.payload;
        },
        saveId: (state, action) => {
            state.id = action.payload;
        },
        saveRole: (state, action) => {
            state.role = action.payload;
        },
        saveName: (state, action) => {
            state.name = action.payload;
        },
    },
})

export const { authorize, saveId, saveRole,saveName } = currentUserSlice.actions

export default currentUserSlice.reducer