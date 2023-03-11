import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'usermessages',
  initialState: {
    recent: [],
    messages: [

    ],
    downloaded: {}
  },
  reducers: {
    updateUserMessages: (state, { payload }) => {
      if (payload) {
        state.messages = payload
      }
    },
    addDownload: (state, { payload }) => {
      if (payload) {
        state.downloaded = {
          ...state.downloaded,
          [payload._id]: payload
        }
      }
    },
    addToRecent: (state, { payload }) => {
      if (payload) {
        const newList = state.recent.filter(m => m._id !== payload._id).slice(0, 8);
        newList.unshift(payload);
        state.recent = newList;
      }
    },
    setDownloadded: (state, { payload }) => {
      if (payload) {
        state.downloaded = payload;
      }
    },
    removeAll: (state) => {
      state.messages = [];
    },
    removeAllRecent: (state) => {
      state.recent = [];
    },
    removeAllDownloaded: (state) => {
      state.downloaded = {};
    }
  },
})

export const { updateUserMessages, addDownload, addToRecent, setDownloadded, removeAll, removeAllRecent, removeAllDownloaded } = slice.actions

export default slice.reducer
