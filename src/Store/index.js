import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import { api } from '../Services/api'
import theme from './Theme'
import player from '../Features/Player'
import messages from '../Features/Messages'
import userMessages from '../Features/UserMessages'
import series from '../Features/Series'
import devotionals from '../Features/Devotionals'
import departments from '../Features/Departments'
import user from '../Features/User'
import app from '../Features/App'

const rootPersistConfig = {
  key: 'testing1180',
  storage: AsyncStorage,
  blacklist: ['player']
}

const playerPersistConfig = {
  key: 'player',
  storage: AsyncStorage,
  blacklist: ['fullmode', 'nowPlaying']
}

const reducers = combineReducers({
  theme,
  player: persistReducer(playerPersistConfig, player),
  messages,
  userMessages,
  series,
  devotionals,
  departments,
  user,
  app,
  api: api.reducer
});

const persistedReducer = persistReducer(rootPersistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware)

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    return middlewares
  }
})


const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }
