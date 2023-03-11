import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor} from './Store'
import './Translations'
import FlashMessage from "react-native-flash-message";
import ApplicationNavigator from './Navigators/Application'

import TrackPlayer from 'react-native-track-player';

const App = () => {
  useEffect(()=> {
    TrackPlayer.setupPlayer();
  }, []);
  
  return (
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
        <FlashMessage />
      </PersistGate>
    </Provider>
  )

}

export default App
