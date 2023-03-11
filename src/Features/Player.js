import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'player',
  initialState: {
    nowPlaying: {
      currTime: 0
    },
    fullmode: false
  },
  reducers: {
    updateNowPlaying: (state, { payload }) => {
      if (payload) {
        state.nowPlaying = payload
      }
    },
    setFullmode: (state, { payload }) => {
      state.fullmode = payload
    }
  },
})

export const { updateNowPlaying, setFullmode } = slice.actions

export default slice.reducer
