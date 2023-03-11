import { View, Text, StyleSheet, TouchableOpacity, Pressable, Dimensions, BackHandler, ToastAndroid, PixelRatio, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { Colors, fonts } from '../Constants/theme'
import AudioView from './AudioView'
import VideoView from './VideoView'
import TrackPlayer, { Capability, Event, useProgress, useTrackPlayerEvents } from 'react-native-track-player'
import PlayerWidget from './PlayerWidget'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { State, usePlaybackState } from 'react-native-track-player'
import { setFullmode, updateNowPlaying } from '../Features/Player'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
const { height, width } = Dimensions.get("window");

const Player = () => {

  const [currentTabindex, setCurrentTabindex] = useState(0);
  const [trackObject, setTrackObject] = useState({});
  const [trackIndex, setTrackIndex] = useState(0);
  const fullmode = useSelector(state => state.player.fullmode);
  const playbackState = usePlaybackState();
  const [disableTab, setDisableTap] = useState(false);
  const dispatch = useDispatch();
  const progress = useProgress();



  // constans
  const fWidth = 70;
  // animations
  const fTranslateX = useSharedValue(0);

  const bottomMargin = useSharedValue(-height);


  const tempDisableTap = () => {
    setDisableTap(true);
    setTimeout(() => {
      setDisableTap(false);
    }, 1000)
  }

  const handlefTranslate = () => {
    if (!trackObject.video_url) {
      ToastAndroid.show("No video available", ToastAndroid.SHORT);
      return false;
    }
    if (!disableTab) {
      if (currentTabindex === 0) {
        fTranslateX.value = withTiming(fWidth);
        tempDisableTap();
        setCurrentTabindex(1);
        setTimeout(() => TrackPlayer.pause(), 200);
      } else {
        fTranslateX.value = withTiming(0);
        tempDisableTap();
        setCurrentTabindex(0);
      }
    }
  }

  const switchAudio = () => {
    fTranslateX.value = withTiming(0);
    setCurrentTabindex(0);
  }

  const handleFullMode = () => {
    dispatch(setFullmode(true));
    bottomMargin.value = withTiming(0, { duration: 400 });
  }

  const handleWidgetMode = () => {
    dispatch(setFullmode(false));
    switchAudio();
    bottomMargin.value = withTiming(-height + 130, { duration: 400 });
  }

  const hideWidget = () => {
    dispatch(setFullmode(false));
    bottomMargin.value = withTiming(-height, { duration: 400 });;
  }

  const rfocusStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: fTranslateX.value }
      ]
    }
  })

  const rFullScreen = useAnimatedStyle(() => {
    return {
      bottom: bottomMargin.value,
    }
  })


  // set up evets
  const events = [
    Event.PlaybackError,
    Event.PlaybackTrackChanged,
    Event.RemoteJumpForward,
    Event.RemoteJumpBackward,
    Event.RemoteSeek
  ]

  useTrackPlayerEvents(events, async e => {
    if (e.type === Event.PlaybackError) {
      ToastAndroid.show("Network error", ToastAndroid.SHORT);
      await TrackPlayer.stop();
    }
    else if (e.type === Event.PlaybackTrackChanged) {
      await getUpdate();
      await TrackPlayer.play();
      dispatch(updateNowPlaying({ currTime: 0 }))
    }
    else if (e.type === Event.RemoteJumpForward) {
      const newProgress = progress.position + 30;
      if (newProgress < progress.duration) {
        await TrackPlayer.seekTo(newProgress);
      }
    }
    else if (e.type === Event.RemoteJumpBackward) {
      const newProgress = progress.position - 30;
      if (newProgress > 3) {
        await TrackPlayer.seekTo(newProgress);
      }
    }
    else if (e.type === Event.RemoteSeek) {
      await TrackPlayer.seekTo(e.position);
    }
  })

  const getUpdate = async () => {
    const trackIndex = await TrackPlayer.getCurrentTrack();
    const trackObj = await TrackPlayer.getTrack(trackIndex);
    setTrackIndex(trackIndex);
    setTrackObject(trackObj);
    TrackPlayer.updateNowPlayingMetadata({
      duration: progress.duration,
      title: trackObj.title,
      artist: "Apostle Timi Erewejoh",
      album: "Leadership Messages",
      notificationCapabilities: [
          Capability.Pause,
          Capability.Play,
          Capability.SeekTo,
          Capability.JumpForward,
          Capability.JumpBackward,
      ]
    })
  }

  const setUp = async () => {
    if (playbackState !== State.None) {
      await getUpdate();
    }
  }

  useEffect(() => {
    if (playbackState !== State.None && playbackState !== State.Stopped && fullmode === true) {
      setUp();
    }
  }, [playbackState]);

  useEffect(() => {
    if (fullmode === true) {
      handleFullMode();
      tempDisableTap();
    }
  }, [fullmode])

  useEffect(() => {
    hideWidget();
  }, [])



  // custom back button behaviour
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (fullmode) {
          handleWidgetMode();
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [fullmode])
  );


  return (
    <Animated.View style={[styles.container, rFullScreen]}>
      <View style={{
        display: fullmode ? "none" : "flex",
      }}>
        <PlayerWidget
          trackObject={trackObject} hideWidget={hideWidget} handleFullMode={handleFullMode} />
      </View>
      {/* top bar start */}
      <View style={styles.playerTop}>
        <TouchableOpacity
          onPress={handleWidgetMode}
        >
          <Icon name='chevron-down' color={Colors.white} type='Entypo' size={fonts.title.fontSize} />
        </TouchableOpacity>
        <View style={styles.switchWrap}>
          <Animated.View style={[styles.switchFocus, rfocusStyle, {
            backgroundColor: "#fff"
          }]} />
          <Pressable
            onPress={handlefTranslate}
            style={
              styles.switchTextWrap
            }>
            <Text style={styles.switchText}>Audio</Text>
            <Text style={styles.switchText}>Video</Text>
          </Pressable>
        </View>
        <TouchableOpacity>
          {/* <Icon name='ellipsis-vertical-sharp' color={Colors.white} type='Ionicons' size={fonts.title.fontSize} /> */}
        </TouchableOpacity>
      </View>
      {/* top bar end */}
      {
        currentTabindex == 0
          ? <AudioView
            fullmode={fullmode}
            trackObject={trackObject}
            progress={progress}
          />
          : <VideoView
            trackIndex={trackIndex}
            trackObject={trackObject}
          />
      }
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: Colors.black,
    position: "absolute",
    bottom: 0,
    height: height,
    width: "100%",
    overflow: "hidden"
  },
  playerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 40,
    width: "90%"
  },
  switchWrap: {
    flexDirection: "row",
    width: 140,
    backgroundColor: Colors.grey,
    borderRadius: 10,
    position: "relative"
  },
  switchTextWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  switchText: {
    fontSize: fonts.small.fontSize,
    color: Colors.darkgrey,
    fontFamily: "NotoSans-Bold",
    width: 70,
    padding: 6,
    textAlign: "center"
  },
  switchFocus: {
    backgroundColor: Colors.white,
    position: "absolute",
    borderRadius: 10,
    width: 70,
    height: "100%"
  }
})

export default Player