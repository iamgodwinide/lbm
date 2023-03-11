import { View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { Colors } from '../../Constants/theme'
import { useNavigation } from '@react-navigation/native'
import { setUpPlayer } from '../../MediaFunctions'
import PlayingLottie from '../../Components/PlayingLottie'
import useTrackObject from '../../Hooks/useTrackObject'
import { useDispatch, useSelector } from 'react-redux'
import { setFullmode, updateNowPlaying } from '../../Features/Player'
import MessageListItem from '../../Components/MessageListItem'
import { addToRecent } from '../../Features/UserMessages'

const Library = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const navigation = useNavigation();
    const trackObject = useTrackObject();
    const dispatch = useDispatch();
    const [playlists, setPlaylists] = useState({});
    const tracks = useSelector(state => state.userMessages.messages);
    const recent = useSelector(state => state.userMessages.recent);
    const downloaded = useSelector(state => state.userMessages.downloaded);
    const series = useSelector(state => state.series.series);
    const user = useSelector(state => state.user.user);


    const handlePlay = (track) => {
        dispatch(updateNowPlaying({ currTime: 0 }));
        dispatch(setFullmode(true));
        dispatch(addToRecent(track));
        if (downloaded[track._id]) {
            setUpPlayer(downloaded[track._id]);
        } else {
            setUpPlayer(track);
        }
    }

    useEffect(() => {
        tracks.forEach(track => {
            if (track.seriesID) {
                setPlaylists({
                    ...playlists,
                    [track.seriesID]: series[track.seriesID]
                });
            }
        })
    }, [])


    return (
        <SafeAreaView
            style={{
                backgroundColor: "#fff",
                flex: 1
            }}
        >
            <ScrollView style={{
                paddingBottom: 110
            }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Library</Text>
                </View>
                <View style={styles.container}>
                    <Pressable
                        onPress={() => navigation.navigate("SearchLibrary")}
                        style={styles.searchContainer}>
                        <Icon type='AntDesign' name='search1' color='#000' size={25} />
                        <Text style={styles.searchText}>Search for a sermon</Text>
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <Text style={styles.smallTitle}>Recent Activity</Text>
                    </View>
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        recent.length === 0
                            ? <Text
                                style={[styles.text, { textAlign: "center", marginLeft: 20 }]}
                            >No Recent activities.</Text>
                            : recent.map((message, key) => (
                                <TouchableOpacity
                                    onPress={() => handlePlay(message)}
                                    key={key}
                                    style={{
                                        marginLeft: 15,
                                        width: 160
                                    }}
                                >
                                    <View>
                                        <Image
                                            style={{
                                                width: "100%",
                                                height: 100,
                                                borderRadius: 10
                                            }}
                                            source={{ uri: message.artwork }}
                                        />
                                        {
                                            trackObject?.id == key
                                                ? <PlayingLottie />
                                                : <></>
                                        }
                                    </View>
                                    <Text style={styles.text} numberOfLines={2}>{message.title}</Text>
                                </TouchableOpacity>
                            ))
                    }
                </ScrollView>
                <View style={styles.container}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Text style={styles.smallTitle}>Playlists</Text>
                    </View>
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        Object.keys(playlists).length === 0
                            ? <Text
                                style={[styles.text, { textAlign: "center", marginLeft: 20 }]}
                            >No Playlists available.</Text>
                            : Object.keys(playlists).map((id, key) => (
                                <Pressable
                                    onPress={() => navigation.navigate("Playlist", { playlist: playlists[id] })}
                                    key={key} style={{
                                        marginLeft: 15
                                    }}>
                                    <View style={styles.playlistContainer}>
                                        <Image
                                            style={{
                                                width: 200,
                                                height: 200
                                            }}
                                            source={{ uri: playlists[id]?.artwork }}
                                        />
                                        <Text style={styles.playlistTitle}>{playlists[id]?.title}</Text>
                                    </View>
                                </Pressable>
                            ))
                    }
                </ScrollView>
                <View style={styles.container}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 10
                    }}>
                        <Text style={styles.smallTitle}>Sermons</Text>
                    </View>
                    <View style={{
                        marginBottom: 10,
                        flexDirection: "row"
                    }}>
                        <Pressable
                            onPress={() => setTabIndex(0)}
                            style={{
                                borderBottomWidth: 2,
                                borderColor: tabIndex === 0 ? Colors.primary : "#000",
                                width: "50%",
                                minWidth: 60
                            }}>
                            <Text style={[styles.smallTitle, {
                                textAlign: "center",
                                color: tabIndex === 0 ? Colors.primary : "#000"
                            }]}>All</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setTabIndex(1)}
                            style={{
                                borderBottomWidth: 2,
                                borderColor: tabIndex === 1 ? Colors.primary : "#000",
                                width: "50%",
                                minWidth: 150
                            }}>
                            <Text style={[styles.smallTitle, {
                                textAlign: "center",
                                color: tabIndex === 1 ? Colors.primary : "#000"
                            }]}>Downloaded</Text>
                        </Pressable>
                    </View>
                    {
                        tabIndex === 0
                            ? <ScrollView
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    marginTop: 20,
                                    marginBottom: 60
                                }}
                            >
                                {
                                    tracks.length === 0
                                        ? <Text
                                            style={[styles.text, { textAlign: "center", marginLeft: 20 }]}
                                        >You haven't purchased any sermon yet.</Text>
                                        : tracks.map((message, key) => (
                                            <MessageListItem message={message} light={false} key={key} />
                                        ))
                                }
                            </ScrollView>
                            : <ScrollView
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    marginTop: 20,
                                    marginBottom: 60
                                }}
                            >
                                {
                                    Object.keys(downloaded).length === 0
                                        ? <Text
                                            style={[styles.text, { textAlign: "center", marginLeft: 20 }]}
                                        >Downloaded sermons will appear here.</Text>
                                        : Object.keys(downloaded).map((message, key) => downloaded[message].user_id === user._id ? (
                                            <MessageListItem message={downloaded[message]} light={false} key={downloaded[message]._id} />
                                        ) : <View key={downloaded[message]._id} ></View>
                                        )
                                }
                            </ScrollView>
                    }
                </View>
                <View style={{ marginBottom: 100 }} />
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 20
    },
    title: {
        fontSize: 30,
        fontFamily: "NotoSans-Black",
        color: "#000"
    },
    smallTitle: {
        fontSize: 18,
        fontFamily: "NotoSans-Bold",
        color: "#000"
    },
    text: {
        fontSize: 14,
        fontFamily: "NotoSans-Medium",
        color: "#000",
        textTransform: 'capitalize'
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#edebeb",
        padding: 10,
        borderRadius: 10
    },
    searchText: {
        fontSize: 16,
        fontFamily: "NotoSans-Medium",
        color: "#626262",
        marginLeft: 10
    },
    vbar: {
        alignSelf: "stretch",
        backgroundColor: "#dbdbdb",
        height: 5
    },
    playlistContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#000"
    },
    playlistTitle: {
        fontSize: 15,
        fontFamily: "NotoSans-Bold",
        marginTop: 10,
        color: "#fff"
    },
    playlistSmallTitle: {
        fontSize: 14,
        fontFamily: "NotoSans-Medium",
        color: "#fff"
    }
})

export default Library