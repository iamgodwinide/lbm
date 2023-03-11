import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'series',
  initialState: {
    series: {}
  },
  reducers: {
    updateSeries: (state, { payload }) => {
      if (payload) {
        state.series = payload
      }
    }
  },
})

export const { updateSeries } = slice.actions

export default slice.reducer
