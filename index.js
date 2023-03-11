/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import TrackPlayer from 'react-native-track-player';
import { LogBox } from 'react-native';

import RNPaystack from 'react-native-paystack';
import keys from './keys';

RNPaystack.init({ publicKey: keys.paystack });



TrackPlayer.registerPlaybackService(() => require('./service'));

LogBox.ignoreLogs(["SerializableStateInvariantMiddleware", "ImmutableStateInvariantMiddleware"])

AppRegistry.registerComponent(appName, () => App)
