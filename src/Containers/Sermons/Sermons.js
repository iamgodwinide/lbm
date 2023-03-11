import { Text, View, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import Icon from 'react-native-dynamic-vector-icons'
import Message from '../../Components/Message'
import Series from '../../Components/Series'
import { useSelector } from 'react-redux'
import { Colors } from '../../Constants/theme'


const Sermons = ({ navigation }) => {
    const messages = useSelector(state => state.messages.messages);
    const series = useSelector(state => state.series.series);
    const latestMessage = messages[0];
    return (
        <ScrollView style={{
            backgroundColor: "#fff"
        }}>
            <Header title="SERMONS" />
            <View style={{
                marginHorizontal: 20
            }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SearchSermon")}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#e6e6e6",
                        padding: 10,
                        borderRadius: 10,
                        marginTop: 20
                    }}>
                    <Icon type="Feather" name="search" size={25} color="#000" />
                    <Text style={{
                        fontFamily: "NotoSans-Bold",
                        color: "grey",
                        marginLeft: "3%"
                    }}>
                        Search for sermon topics or series
                    </Text>
                </TouchableOpacity>
            </View>
            {
                latestMessage
                    ? <View style={{
                        marginTop: 20
                    }}>
                        <ImageBackground
                            source={{ uri: latestMessage.artwork }}
                        >
                            <View style={{
                                zIndex: 1,
                                marginTop: 10,
                                padding: 20
                            }}>
                                <Text style={{
                                    color: "#fff",
                                    fontSize: 15,
                                    marginTop: 20,
                                    fontFamily: "NotoSans-Bold",
                                    textTransform: "uppercase",
                                    textShadowColor: "#000",
                                    textShadowOffset: { height: 2, width: 0 },
                                    textShadowRadius: 0.65,
                                }}>LATEST SERMON</Text>
                                <Text
                                    numberOfLines={2}
                                    style={{
                                        color: "#fff",
                                        fontSize: 20,
                                        fontFamily: "NotoSans-Bold",
                                        textTransform: "uppercase",
                                        textShadowColor: "#000",
                                        textShadowOffset: { height: 2, width: 0 },
                                        textShadowRadius: 0.65,
                                    }}>{latestMessage.title}</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("ViewSermon", { message: latestMessage })}
                                    style={{
                                        backgroundColor: "#636363",
                                        borderColor: "#fff",
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        width: 120,
                                        padding: 10,
                                        marginTop: 10
                                    }}>
                                    <Text style={{
                                        color: "#fff",
                                        fontFamily: "NotoSans-Bold",
                                        textAlign: "center"
                                    }}>GET IT NOW</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                backgroundColor: "rgba(0,0,0,0.7)",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                height: "100%",
                                width: "100%"
                            }} />
                        </ImageBackground>
                    </View>
                    : <></>
            }

            <View style={{
                marginHorizontal: 20,
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Text style={{
                    color: "#000",
                    textTransform: "uppercase",
                    fontSize: 15,
                    fontFamily: "NotoSans-Medium"
                }}>latest messages</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SeeMoreMessage")}
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Text style={{
                        color: "#1046D0",
                        textTransform: "uppercase",
                        fontSize: 15,
                        fontFamily: "NotoSans-Medium"
                    }}>view all</Text>
                    <Icon type="Ionicons" name="chevron-forward" size={20} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                style={{
                    marginTop: 20
                }}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
            >
                {
                    messages.map((m, key) => (
                        <Message
                            message={m}
                            key={m._id}
                            onPress={() => navigation.navigate("ViewSermon", { message: m })}
                        />
                    ))
                }
            </ScrollView>

            <View style={{
                marginHorizontal: 20,
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <Text style={{
                    color: "#000",
                    textTransform: "uppercase",
                    fontSize: 15,
                    fontFamily: "NotoSans-Medium"
                }}>latest series</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SeeMoreSeries")}
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Text style={{
                        color: "#1046D0",
                        textTransform: "uppercase",
                        fontSize: 15,
                        fontFamily: "NotoSans-Medium"
                    }}>view all</Text>
                    <Icon type="Ionicons" name="chevron-forward" size={20} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                style={{
                    marginTop: 20,
                    marginBottom: 110
                }}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
            >
                {
                    Object.keys(series).map((m) => (
                        <Series
                            series={series[m]}
                            key={series[m]._id}
                            onPress={() => navigation.navigate("ViewSeries", { series: series[m] })}
                        />
                    ))
                }
            </ScrollView>

        </ScrollView>
    )
}

export default Sermons
