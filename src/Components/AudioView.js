import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ImageBackground, Modal, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { Colors, fonts } from '../Constants/theme'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import Slider from '@react-native-community/slider'
import TextTicker from 'react-native-text-ticker'
import TrackPlayer, { State, usePlaybackState, RepeatMode } from 'react-native-track-player'
import { useDispatch, useSelector } from 'react-redux'
import Ripple from 'react-native-material-ripple'
import { updateNowPlaying } from '../Features/Player'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get("screen");


const AudioView = ({ trackObject, progress }) => {
  const dispatch = useDispatch();
  const [repeat, setRepeat] = useState(false);
  const nowPlaying = useSelector(state => state.player.nowPlaying);
  const [resumed, setResumed] = useState(false);
  const [sliderReady, setSliderReady] = useState(true);
  const playbackState = usePlaybackState();
  const [diskRolling, setDiskRolling] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rate, setRate] = useState(1);

  const degree = useSharedValue(0);
  // rotation animation
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${degree.value}deg` }]
    }
  });

  const pausePlay = async () => {
    if (playbackState === State.Paused || playbackState === State.Ready) {
      TrackPlayer.play();
    }
    else {
      TrackPlayer.pause();
    }
  }

  const restart = async () => {
    setplaybackError(false);
    await TrackPlayer.reset();
    await TrackPlayer.play();
  }

  const seekForward = async () => {
    if (progress.position + 35 < progress.duration)
      await TrackPlayer.seekTo(progress.position + 30);
  }

  const seekBackward = async () => {
    if (progress.position > 30) {
      await TrackPlayer.seekTo(progress.position - 30);
    } else {
      await TrackPlayer.seekTo(0);
    }
  }

  const toggleRepeat = async () => {
    if (RepeatMode) {
      await TrackPlayer.setRepeatMode(repeat ? RepeatMode.Queue : RepeatMode.Track);
      setRepeat(!repeat);
    }
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleRating = rating => {
    setRate(rating);
    if (TrackPlayer.isServiceRunning) {
      TrackPlayer.setRate(rating);
    }
    toggleModal();
  }

  const padNum = num => num.length > 1 ? num : `0${num}`;

  const formatTime = (time) => {
    if (progress.duration) {
      const minutes = padNum(Math.floor((time / 60) % 60).toString());
      const hours = padNum(Math.floor((time / 60) / 60).toString());
      const seconds = padNum(Math.round(time % 60).toString());
      return `${hours}:${minutes}:${seconds}`
    } else {
      return '00:00'
    }
  }

  const setUp = async () => {
    await TrackPlayer.seekTo(nowPlaying.currTime);
    setResumed(true);
    await TrackPlayer.play();
  }

  useEffect(() => {
    if (playbackState === State.Playing || playbackState === State.Paused) {
      setSliderReady(false);
      setRate(1);
    }
    if ((playbackState === State.Paused || playbackState === State.Ready) && resumed === false) {
      setUp();
    }
  }, [playbackState]);

  useEffect(() => {
    if (!diskRolling) {
      degree.value = withRepeat(withTiming(360, { duration: 5000, easing: Easing.linear }), -1);
      setDiskRolling(true);
    }
  }, []);


  useEffect(() => {
    dispatch(updateNowPlaying({
      ...trackObject,
      currTime: progress.position
    }))
  }, [progress])


  return (
      <View>
        <ImageBackground
          source={require("../Assets/Images/audioTrack.png")}
          resizeMode="cover"
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            overflow: "hidden",
            height: height * .35,
            aspectRatio: 1,
            marginHorizontal: 20,
            marginBottom: 50,
          }}>
          <Animated.View style={rStyle}>
            <Animated.Image
              source={{ uri: trackObject?.artwork }}
              style={styles.artStyle}
              resizeMode="cover"
            />
          </Animated.View>
        </ImageBackground>
        <View style={styles.controllerWrap}>
          <TextTicker
            style={styles.titleStyle}
            duration={7000}
            bounce={false}
            marqueeDelay={1000}
            animationType={"auto"}
            loop
          >
            {trackObject?.title}
          </TextTicker>
          <Text style={styles.date}>{trackObject?.artist}</Text>

          <View style={styles.sliderContainer}>
            <NativeViewGestureHandler disallowInterruption={true}>
            <Slider
              disabled={sliderReady}
              style={styles.slider}
              minimumValue={0}
              maximumValue={progress.duration}
              value={progress.position}
              minimumTrackTintColor={Colors.white}
              maximumTrackTintColor="lightgrey"
              thumbTintColor={Colors.white}
              tapToSeek={true}
              // onSlidingComplete={value => {
              //   TrackPlayer.seekTo(value);
              // }}
              onValueChange={value => {
                TrackPlayer.seekTo(value);
              }}
            />
            </NativeViewGestureHandler>


            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <Text style={styles.timerText}>{progress.position ? formatTime(progress.position) : "00:00:00"}</Text>
              <Text style={styles.timerText}>{progress.duration ? formatTime(progress.duration) : "00:00:00"}</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <View style={styles.centerButtons}>
              <Ripple
                onPress={seekBackward}
              >
                <TouchableOpacity
                  style={{
                    padding: 5
                  }}
                >
                  <Icon name='replay-30' type='MaterialIcons' size={fonts.largeText.fontSize * 1.2} color={Colors.white} />
                </TouchableOpacity>
              </Ripple>
              {
                playbackState === State.Connecting || playbackState === State.Buffering
                  ?
                  <Ripple
                    rippleDuration={700}
                    rippleOpacity={.7}
                    rippleSize={150}
                    rippleCentered={true}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "rgba(77, 77, 77, 0.4)",
                        height: 70,
                        width: 70,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 50
                      }}
                    >
                      <ActivityIndicator size={fonts.largeText.fontSize} color={Colors.white} />
                    </TouchableOpacity>
                  </Ripple>
                  : playbackState === State.Stopped
                    ?
                    <Ripple
                      onPress={restart}
                      rippleDuration={700}
                      rippleOpacity={.7}
                      rippleSize={150}
                      rippleCentered={true}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: "rgba(77, 77, 77, 0.4)",
                          height: 70,
                          width: 70,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 50
                        }}
                      >
                        <Icon name={'reload1'} type='AntDesign' size={fonts.largeText.fontSize} color={Colors.white} />
                      </TouchableOpacity>
                    </Ripple>
                    : playbackState === State.None
                      ?
                      <Ripple
                        onPress={restart}
                        rippleDuration={700}
                        rippleOpacity={.7}
                        rippleSize={150}
                        rippleCentered={true}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: "rgba(77, 77, 77, 0.4)",
                            height: 70,
                            width: 70,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 50
                          }}
                        >
                          <Icon name={'error-outline'} type='MaterialIcons' size={fonts.largeText.fontSize} color={Colors.white} />
                        </TouchableOpacity>
                      </Ripple>
                      :
                      <Ripple
                        onPress={pausePlay}
                        rippleDuration={700}
                        rippleOpacity={.7}
                        rippleSize={150}
                        rippleCentered={true}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: "rgba(77, 77, 77, 0.4)",
                            height: 70,
                            width: 70,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 50
                          }}
                        >
                          <Icon name={playbackState === State.Playing ? 'pause' : 'play'} type='FontAwesome5' size={20} color={Colors.white} />
                        </TouchableOpacity>
                      </Ripple>
              }
              <Ripple
                onPress={seekForward}

              >
                <TouchableOpacity
                  style={{
                    padding: 5
                  }}
                >
                  <Icon name='forward-30' type='MaterialIcons' size={fonts.largeText.fontSize * 1.2} color={Colors.white} />
                </TouchableOpacity>
              </Ripple>
            </View>
          </View>

          <View style={styles.soundOptionsContainer}>
            <TouchableOpacity
              onPress={toggleModal}
            >
              <Text style={[styles.timerText, {
                fontFamily: "NotoSans-Black"
              }]}>{rate}x</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleRepeat}
            >
              <Icon name={repeat ? 'repeat-once' : 'repeat'} type='MaterialCommunityIcons' size={fonts.title.fontSize} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <Modal
            transparent
            visible={showModal}
          >
            <Pressable
              onPress={toggleModal}
              style={{
                flex: 2,
                backgroundColor: "rgba(0,0,0,.7)"
              }} />
            <View style={{
              backgroundColor: Colors.black,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
              {
                [0.5, 0.75, 1, 1.5]
                  .map((m, key) => (
                    <TouchableOpacity
                      key={key}
                      style={{
                        paddingVertical: 15
                      }}
                      onPress={() => handleRating(m)}
                    >
                      <Text style={{
                        color: Colors.white,
                        textAlign: "center",
                        fontFamily: "Roboto-Bold"
                      }}>{m}x</Text>
                    </TouchableOpacity>
                  ))
              }
            </View>
          </Modal>

        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  artStyle: {
    width: 130,
    height: 130,
    borderRadius: 200
  },
  controllerWrap: {
    marginHorizontal: 20
  },
  titleStyle: {
    color: Colors.white,
    ...fonts.medium,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  date: {
    color: Colors.white,
    ...fonts.small,
    fontSize: 14
  },
  sliderContainer: {
    marginVertical: 20,
  },
  slider: {
    width: width * .96,
    height: 20,
    alignSelf: "center",
  },
  timerText: {
    fontSize: fonts.small.fontSize * .8,
    color: Colors.white
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  centerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    alignSelf: "center"
  },
  soundOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  }
})

export default AudioView