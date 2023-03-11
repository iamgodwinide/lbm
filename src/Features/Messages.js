import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'player',
    initialState: {
        messages: [
        ]
    },
    reducers: {
        updateMessages: (state, { payload }) => {
            if (payload) {
                state.messages = payload
            }
        }
    },
})

export const { updateMessages } = slice.actions

export default slice.reducer
