import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'devotionals',
    initialState: {
        devotionals: []
    },
    reducers: {
        updateDevotionals: (state, { payload }) => {
            if (payload) {
                state.devotionals = payload
            }
        }
    },
})

export const { updateDevotionals } = slice.actions

export default slice.reducer
