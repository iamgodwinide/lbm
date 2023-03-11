import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'user',
    initialState: {
        user: {
            token: null
        }
    },
    reducers: {
        login: (state, { payload }) => {
            if (payload) {
                state.user = payload
            }
        },
        logout: (state) => {
            state.user = {
                token: null
            }
        },
        updateUser: (state, { payload }) => {
            if (payload) {
                state.user = {
                    ...state.user,
                    ...payload
                }
            }
        }
    },
})

export const { login, logout, updateUser } = slice.actions

export default slice.reducer
