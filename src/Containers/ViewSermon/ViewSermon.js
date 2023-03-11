import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, Pressable, ActivityIndicator, BackHandler, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import LoadingLottie from '../../Components/LoadingLottie'
import { Colors } from '../../Constants/theme'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import { makePostRequest } from '../../Config'
import { updateUserMessages } from '../../Features/UserMessages'
import { updateUser } from '../../Features/User'


const ViewSermon = ({ route }) => {
    const [openAbout, setOpenAbout] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(false);
    const [audioLoading, setAuidioLoading] = useState(false);
    const [hasMessage, setHasMessage] = useState({});

    const user = useSelector(state => state.user.user);
    const userMessages = useSelector(state => state.userMessages.messages);
    const types = { video: "video", audio: "audio" }

    const purchase = async (type) => {
        try {
            const res = await makePostRequest("users/buy-message", {
                messageID: message._id,
                userID: user._id,
                token: message[type === types.video ? "videoPrice" : "audioPrice"],
                fullPurchase: type === types.video
            }, {
                "x-auth-token": user.token
            });
            if (res?.success) {
                dispatch(updateUserMessages(res.userMessages));
                dispatch(updateUser(res.user));
                setHasMessage({
                    ...hasMessage,
                    [type == types.video ? "video_url" : "url"]: true
                })
                showMessage({
                    message: "Message purchased successfully",
                    backgroundColor: "green",
                    color: "#fff"
                })
            } else {
                showMessage({
                    message: res?.msg || "Something went wrong",
                    backgroundColor: "red",
                    color: "#fff"
                });
            }
            setAuidioLoading(false);
            setVideoLoading(false);
        } catch (err) {
            console.log(err);
            showMessage({
                message: "Sorry, something went wrong",
                backgroundColor: "red",
                color: "#fff"
            })
            setAuidioLoading(false);
            setVideoLoading(false);
        }
    }

    const handleBuyMessage = (type) => {
        try {
            if (videoLoading || audioLoading) return false;
            if (type === types.video) {
                setVideoLoading(true);
            } else {
                setAuidioLoading(true);
            }
            Alert.alert(null, "Are you sure you want to purchase this message?", [
                {
                    text: "yes",
                    onPress: () => purchase(type)
                },
                {
                    text: "no",
                    onPress: () => {
                        setVideoLoading(false);
                        setAuidioLoading(false);
                    }
                }
            ])
        }
        catch (err) {
            console.log(err);
            showMessage({
                message: "Sorry, something went wrong",
                backgroundColor: "red",
                color: "#fff"
            })
            setAuidioLoading(false);
            setVideoLoading(false)
        }
    }

    useEffect(() => {
        const { message } = route.params;
        const messageExists = userMessages.filter(m => m.message_id === message._id);
        if (messageExists.length > 0) {
            setHasMessage(messageExists[0]);
        }
        setMessage(message);
        setLoading(false);
    }, [userMessages]);

    // custom back button behaviour
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (videoLoading || audioLoading) {
                    return true;
                } else {
                    return false;
                }
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [videoLoading, audioLoading])
    );


    return (
        loading
            ? <LoadingLottie />
            : <ScrollView style={{
                flex: 1,
                backgroundColor: "#eee"
            }}>

                <View style={{
                    backgroundColor: "#fff",
                    paddingVertical: 10,
                    paddingHorizontal: 6,
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    shadowColor: "#000",
                    shadowOpacity: 1.5,
                    shadowOffset: {
                        height: 1,
                        width: 0
                    },
                    elevation: 7
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            alignItems: "center"
                        }}>
                        <Icon type='AntDesign' name='arrowleft' size={30} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("PurchaseCoin")}
                        style={{
                            marginHorizontal: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: Colors.darkBlue,
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 10
                        }}>
                        <Icon type='FontAwesome5' name='coins' size={30} color="#fff" style={{
                            marginRight: 5
                        }} />
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#fff"
                        }}>{user.coins}</Text>
                        <Icon type='Feather' name='plus' size={30} color="#fff" style={{
                            marginHorizontal: 5
                        }} />
                    </TouchableOpacity>
                </View>

                <ImageBackground
                    source={{ uri: message.artwork }}
                    style={{
                        height: 300,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <View style={{
                        zIndex: 1,
                        alignItems: "center"
                    }}>
                        <Image source={{ uri: message.artwork }}
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 10
                            }}
                        />
                        <Text style={{
                            color: "#fff",
                            fontSize: 16,
                            fontFamily: "NotoSans-Black",
                            marginTop: 10,
                            textAlign: "center"
                        }}>
                            {message.title}
                        </Text>
                        <Text style={{
                            color: "#fff",
                            fontSize: 14,
                            fontFamily: "NotoSans-Regular",
                            textAlign: "center",
                            marginTop: 10
                        }}>
                            {message.date}
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: "rgba(0,0,0,0.83)",
                        position: "absolute",
                        height: "100%",
                        width: "100%"
                    }} />
                </ImageBackground>

                <View style={{
                    marginTop: 10
                }}>

                    <View style={{
                        marginVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#fff",
                        paddingHorizontal: 20,
                        paddingVertical: 10
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <Icon type='AntDesign' name='playcircleo' size={25} color="#000" />
                            <View style={{
                                marginLeft: 10
                            }}>
                                <Text style={{
                                    color: "#000",
                                    fontSize: 16,
                                    fontFamily: "NotoSans-Bold"

                                }}>VIDEOSTREAM</Text>
                                <Text
                                    style={{
                                        color: "red",
                                        fontSize: 16,
                                        fontFamily: "NotoSans-Bold"

                                    }}
                                >+FREE AUDIO</Text>
                            </View>
                        </View>
                        {
                            videoLoading
                                ? <Pressable style={{
                                    backgroundColor: "#1046D0",
                                    padding: 10,
                                    borderRadius: 10,
                                    width: 80,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <ActivityIndicator size={25} color={"#fff"} />
                                </Pressable>
                                : hasMessage.video_url
                                    ? <Pressable
                                        style={{
                                            backgroundColor: Colors.grey,
                                            padding: 10,
                                            borderRadius: 10,
                                            width: 100
                                        }}>
                                        <Text style={{
                                            color: "#fff",
                                            fontFamily: "NotoSans-Bold",
                                            textAlign: "center"
                                        }}>Purchased</Text>
                                    </Pressable>
                                    : <TouchableOpacity
                                        onPress={() => handleBuyMessage(types.video)}
                                        style={{
                                            backgroundColor: "#1046D0",
                                            padding: 10,
                                            borderRadius: 10,
                                            width: 80
                                        }}>
                                        <Text style={{
                                            color: "#fff",
                                            fontFamily: "NotoSans-Bold",
                                            textAlign: "center"
                                        }}>{message.videoPrice} Token{message.audioPrice > 1 ? "s" : ""}</Text>
                                    </TouchableOpacity>

                        }
                    </View>

                    <View style={{
                        marginVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#fff",
                        paddingHorizontal: 20,
                        paddingVertical: 10
                    }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <Icon type='Ionicons' name='ios-headset-outline' size={25} color="#000" />
                            <View style={{
                                marginLeft: 10
                            }}>
                                <Text style={{
                                    color: "#000",
                                    fontSize: 16,
                                    fontFamily: "NotoSans-Bold"
                                }}>AUDIO ONLY</Text>
                            </View>
                        </View>
                        {
                            audioLoading
                                ? <Pressable style={{
                                    backgroundColor: "#1046D0",
                                    padding: 10,
                                    borderRadius: 10,
                                    width: 80,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <ActivityIndicator size={25} color={"#fff"} />
                                </Pressable>
                                : hasMessage.url
                                    ? <Pressable
                                        style={{
                                            backgroundColor: Colors.grey,
                                            padding: 10,
                                            borderRadius: 10,
                                            width: 100
                                        }}>
                                        <Text style={{
                                            color: "#fff",
                                            fontFamily: "NotoSans-Bold",
                                            textAlign: "center"
                                        }}>Purchased</Text>
                                    </Pressable>
                                    : <TouchableOpacity
                                        onPress={() => handleBuyMessage(types.audio)}
                                        style={{
                                            backgroundColor: "#1046D0",
                                            padding: 10,
                                            borderRadius: 10,
                                            width: 80
                                        }}>
                                        <Text style={{
                                            color: "#fff",
                                            fontFamily: "NotoSans-Bold",
                                            textAlign: "center"
                                        }}>{message.audioPrice} Token{message.audioPrice > 1 ? "s" : ""}</Text>
                                    </TouchableOpacity>
                        }
                    </View>
                    <Pressable
                        onPress={() => setOpenAbout(!openAbout)}
                        style={{
                            marginVertical: 10,
                            backgroundColor: "#fff",
                            paddingHorizontal: 20,
                            paddingVertical: 10
                        }}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Icon type='AntDesign' name='infocirlceo' size={25} color="#000" />
                                <Text style={{
                                    marginLeft: 10,
                                    color: "#000",
                                    fontSize: 16,
                                    fontFamily: "NotoSans-Bold"
                                }}>ABOUT THIS SERMON</Text>
                            </View>
                            <Icon type='Ionicons' name={openAbout ? 'chevron-down' : 'chevron-forward'} size={25} color="#000" />
                        </View>
                        <Text
                            style={{
                                marginTop: 20,
                                lineHeight: 25,
                                fontSize: 16,
                                fontFamily: "NotoSans-Regular",
                                color: "#000",
                                display: openAbout ? "flex" : "none"
                            }}
                        >
                            {message.about}
                        </Text>
                    </Pressable>

                </View>
            </ScrollView>
    )
}

export default ViewSermon