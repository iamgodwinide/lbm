import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'app',
    initialState: {
        loaded: false
    },
    reducers: {
        setAppLoaded: (state, { payload }) => {
            if (typeof payload === 'boolean') {
                state.loaded = payload
            }
        },
    },
})

export const { setAppLoaded } = slice.actions

export default slice.reducer
