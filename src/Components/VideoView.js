import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { Colors, fonts } from '../Constants/theme'
import Slider from '@react-native-community/slider'
import TextTicker from 'react-native-text-ticker'
const { width, height } = Dimensions.get("window");
import Video from 'react-native-video';
import { useProgress } from 'react-native-track-player'
import Animated from 'react-native-reanimated'
import Loader from './Loader'
import { useDispatch } from 'react-redux'
import { updateNowPlaying } from '../Features/Player'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import Ripple from 'react-native-material-ripple'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'


const VideoView = ({ trackObject }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const [playbackState] = useState({});
  const [State] = useState({});
  const [VPlayer, setVPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [currTime, setCurrTime] = useState("00:00");
  const [dur, setDur] = useState("00:00");
  const [currTimeNum, setCurrTimeNum] = useState(0);
  const [loop, setLoop] = useState(false);
  const [ended, setEnded] = useState(false);
  const [pbTime, setPbTime] = useState(0);
  const progress = useProgress();
  const [playerReady, setPlayerReady] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rate, setRate] = useState(1);

  const pausePlay = async () => {
    if (!initialized) {
      VPlayer.seek(progress.position)
      setIsPlaying(!isPlaying);
      setInitialized(true);
      setEnded(false);
    } else {
      setIsPlaying(!isPlaying);
      setEnded(false);
    }
  }

  const handleOnEnd = async () => {
    if (!loop) {
      setIsPlaying(!isPlaying);
      setEnded(true);
    }
  }

  const restart = async () => {
    if (VPlayer) {
      VPlayer.seek(0);
      setEnded(false);
      setTimeout(() => setIsPlaying(!isPlaying), 200);
    }
  }

  const handleSeek = async value => {
    if (VPlayer) {
      if (!playerReady) {
        setPlayerReady(true);
        return
      }
      setEnded(false);
      VPlayer.seek(value);
    }
  }

  const seekForward = async () => {
    if (VPlayer) {
      if (currTime + 45 < progress.duration) {
        VPlayer.seek(currTime + 30);
        setEnded(false);
        setIsPlaying(false);
      }
    }
  }

  const seekBackward = async () => {
    if (VPlayer) {
      if (currTime > 35) {
        VPlayer.seek(currTime - 30);
        setIsPlaying(false);
        setEnded(false);
      } else {
        VPlayer.seek(0);
        setEnded(false);
        setEnded(false);
      }
    }
  }

  const toggleRepeat = async () => {
    setLoop(!loop)
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleRating = rating => {
    setRate(rating);
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
      return '00:00:00'
    }
  }

  const handleProgress = async (timeObj) => {
    dispatch(updateNowPlaying({
      ...trackObject,
      currTime: timeObj.currentTime
    }))
    setCurrTime(formatTime(timeObj.currentTime));
    setDur(formatTime(progress.duration));
    setCurrTimeNum(timeObj.currentTime);
  }


  return (
    <>
      {/* video start */}
      <View style={[{
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }]}>
        <View style={{
          display: loading ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          overflow: "hidden",
          height: height * .35,
          width,
          marginHorizontal: 20,
          position: "relative"
        }}>
          <Animated.Image
            source={{ uri: trackObject?.artwork }}
            style={[styles.artStyle]}
            resizeMode="cover"
            height={"100%"}
            width={"100%"}
          />
          <Loader />
        </View>
        <View style={[{
          minWidth: "100%",
        }, styles.fullscreen]}>
          <Video
            ref={ref => setVPlayer(ref)}
            source={{ uri: trackObject.video_url }}
            paused={isPlaying}
            currentPlaybackTime={pbTime}
            repeat={loop}
            resizeMode={"contain"}
            rate={rate}
            minLoadRetryCount={3}
            onEnd={handleOnEnd}
            playInBackground={true}
            fullscreenOrientation="landscape"
            onLoad={() => {
              setTimeout(() => {
                setLoading(false);
                setDur(formatTime(progress.duration));
                setCurrTime(formatTime(progress.position));
                setPbTime(progress.position);
                pausePlay();
              }, 200)
            }}
            onProgress={timeObj => handleProgress(timeObj)}
            style={[
              {
                display: loading ? "none" : "flex",
                minHeight: 250,
                maxHeight: 450,
                width,
              }
            ]}
          />
        </View>
      </View>
      {/* video end */}
      {/* controls start */}
      <View style={styles.controllerWrap}>
        <TextTicker
          style={styles.titleStyle}
          duration={7000}
          bounce={false}
          marqueeDelay={1000}
          animationType={"auto"}
        >
          {trackObject?.title}
        </TextTicker>
        <Text style={styles.date}>{trackObject?.artist}</Text>

        <View style={styles.sliderContainer}>
          <NativeViewGestureHandler disallowInterruption={true}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={progress.duration || 1}
              value={currTimeNum || 0}
              minimumTrackTintColor={Colors.white}
              maximumTrackTintColor="lightgrey"
              thumbTintColor={Colors.white}
              onValueChange={value => handleSeek(value)}
            />
          </NativeViewGestureHandler>

          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <Text style={styles.timerText}>{currTime}</Text>
            <Text style={styles.timerText}>{dur}</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.centerButtons}>
            <Ripple
              onPress={seekBackward}
              rippleDuration={700}
              rippleSize={150}
              rippleOpacity={.7}
              rippleCentered={true}
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
              loading
                ?
                <Ripple
                  onPress={pausePlay}
                  rippleDuration={700}
                  rippleSize={150}
                  rippleOpacity={.7}
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
                : ended
                  ?
                  <Ripple
                    onPress={restart}
                    rippleDuration={700}
                    rippleSize={150}
                    rippleOpacity={.7}
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
                      onPress={setUpPlayer}
                      rippleDuration={700}
                      rippleSize={150}
                      rippleOpacity={.7}
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
                      rippleSize={150}
                      rippleOpacity={.7}
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
                        <Icon name={!isPlaying ? 'pause' : 'play'} type='FontAwesome5' size={fonts.largeText.fontSize} color={Colors.white} />
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
            <Icon name={loop ? 'repeat-once' : 'repeat'} type='MaterialCommunityIcons' size={fonts.title.fontSize} color={Colors.white} />
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
      {/* controls end */}
    </>
  )
}

const styles = StyleSheet.create({
  artStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },
  controllerWrap: {
    marginHorizontal: 20
  },
  titleStyle: {
    color: Colors.white,
    fontFamily: "NotoSans-Bold",
    fontSize: 16,
    textTransform: "capitalize"
  },
  date: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: "NotoSans-Light"
  },
  sliderContainer: {
    marginVertical: 20
  },
  slider: {
    width: width * .96,
    height: 20,
    alignSelf: "center"
  },
  timerText: {
    fontSize: fonts.small.fontSize * .8,
    fontFamily: "NotoSans-Medium",
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
    width: "60%"
  },
  soundOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  }
})

export default VideoView