import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUpPlayer } from '../MediaFunctions';
import { setFullmode, updateNowPlaying } from '../Features/Player';
import Icon from 'react-native-dynamic-vector-icons';
import Separator from './Separator';
import useDownloadSermon from '../Hooks/useDownloadSermon';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Colors } from '../Constants/theme';
import useDeleteSermon from '../Hooks/useDeleteSermon';
import { useNavigation } from '@react-navigation/native';
import { addToRecent } from '../Features/UserMessages';
import Ripple from 'react-native-material-ripple';

const MessageListItem = ({ message, light, goBack }) => {
    const dispatch = useDispatch();
    const downloaded = useSelector(state => state.userMessages.downloaded);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const navigation = useNavigation();

    const { download, loading, progress } = useDownloadSermon();
    const { deleteSermon } = useDeleteSermon()

    const handlePlay = () => {
        dispatch(updateNowPlaying({ currTime: 0 }));
        dispatch(setFullmode(true));
        if (isDownloaded) {
            setUpPlayer(downloaded[message._id]);
        }
        dispatch(addToRecent(message));
        dispatch(updateNowPlaying({ currTime: 0 }));
        if (downloaded[message._id]) {
            setUpPlayer(downloaded[message._id]);
        } else {
            setUpPlayer(message);
        }
        if (goBack) {
            navigation.goBack();
        }
    }

    useEffect(() => {
        if (downloaded[message._id]) {
            setIsDownloaded(true);
        } else {
            setIsDownloaded(false);
        }
    }, [downloaded]);


    const handleDelete = () => {
        Alert.alert(
            "Remove from device?",
            "This message will always be in your library. You can download it again for offline playback again at any time.",
            [
                {
                    text: "Remove",
                    onPress: () => deleteSermon(downloaded[message._id]),
                },
                {
                    text: "Cancel",
                }
            ]
        )
    }

    const actionButton = () => {
        if (isDownloaded) {
            return (
                <TouchableOpacity
                    onPress={handleDelete}
                >
                    <Icon name='md-checkmark-done-circle-sharp' type='Ionicons' size={30} color={Colors.primary} />
                </TouchableOpacity>
            )
        }
        if (loading) {
            return (
                <TouchableOpacity
                >
                    <CircularProgress
                        value={progress}
                        radius={20}
                        progressValueStyle={{
                            color: Colors.black
                        }}
                        activeStrokeColor={Colors.primary}
                        inActiveStrokeWidth={1}
                        activeStrokeWidth={5} />
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity
                onPress={() => download(message)}
            >
                <Icon name='download-circle-outline' type='MaterialCommunityIcons' size={30} color={light ? "#fff" : "#000"} />
            </TouchableOpacity>
        )
    }

    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                <Ripple
                    onPress={handlePlay}
                    rippleCentered={true}
                    rippleSize={400}
                    rippleDuration={400}
                    rippleColor={"#000"}
                    style={{
                        borderRadius: 10,
                        overflow: "hidden",
                        flexDirection: "row"
                    }}>
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10
                        }}
                        source={{ uri: message.artwork }}
                    />
                    <View style={{
                        marginLeft: 20
                    }}>
                        <Text numberOfLines={2} style={[styles.text, {
                            marginBottom: 10,
                            fontFamily: "NotoSans-Bold",
                            width: 150,
                            color: light ? "#fff" : "#000"
                        }]}>{message.title}</Text>
                        <Text style={[styles.text, {
                            fontSize: 11,
                            fontFamily: "NotoSans-Light",
                            color: light ? "#fff" : "#000"
                        }]}>{message.date}</Text>
                    </View>
                </Ripple>

                <View style={{
                    flexDirection: "row"
                }}>
                    {actionButton()}
                </View>
            </View>
            <Separator />
        </>

    )
}

export default MessageListItem

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontFamily: "NotoSans-Medium",
        color: "#000",
        textTransform: 'capitalize'
    }
})