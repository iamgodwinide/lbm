import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, fonts } from '../Constants/theme'
import TextTicker from 'react-native-text-ticker'
import Icon from 'react-native-dynamic-vector-icons'
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player'
import { useDispatch } from 'react-redux'
import { setFullmode } from '../Features/Player'

const PlayerWidget = ({ trackObject, handleFullMode, hideWidget }) => {
    const playbackState = usePlaybackState();
    const dispatch = useDispatch()

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

    const stopPlayer = async () => {
        hideWidget();
        dispatch(setFullmode(false));
        await TrackPlayer.stop();
        await TrackPlayer.destroy();
    }

    return (
        <Pressable
            onPress={handleFullMode}
            style={styles.container}>
            <View style={{
                width: "20%",
                height: 70
            }}>
                <Image
                    source={{ uri: trackObject?.artwork }}
                    width={60}
                    height={60}
                    style={{
                        width: 60,
                        height: 60,
                        margin: 5,
                        resizeMode: "cover",
                        borderRadius: 10
                    }}
                />
            </View>
            <View style={{
                width: "45%",
                paddingLeft: 10
            }}>
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
            </View>
            <View style={{
                width: "35%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingRight: 10
            }}>
                {
                    playbackState === State.Connecting || playbackState === State.Buffering
                        ? <TouchableOpacity
                            onPress={pausePlay}
                        >
                            <Icon name={'play'} type='FontAwesome5' size={fonts.largeText.fontSize / 1.3} color={Colors.white} />
                        </TouchableOpacity>
                        : playbackState === State.Stopped
                            ? <TouchableOpacity
                                onPress={restart}
                            >
                                <Icon name={'reload1'} type='AntDesign' size={fonts.largeText.fontSize / 1.3} color={Colors.white} />
                            </TouchableOpacity>
                            : <TouchableOpacity
                                onPress={pausePlay}
                            >
                                <Icon name={playbackState === State.Playing ? 'pause' : 'play'} type='FontAwesome5' size={fonts.largeText.fontSize / 1.3} color={Colors.white} />
                            </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={stopPlayer}
                >
                    <Icon name='close' type='AntDesign' size={fonts.largeText.fontSize} color={Colors.white} />
                </TouchableOpacity>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#182028",
        flexDirection: "row",
        alignItems: "center",
    },
    titleStyle: {
        color: Colors.white,
        fontFamily: "NotoSans-Bold",
        textTransform: "capitalize"
    },
    date: {
        color: Colors.white,
        fontSize: 11,
        fontFamily: "NotoSans-Light"
    },
})

export default PlayerWidget