import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import moment from 'moment'


const ReadDevotional = ({ navigation, route }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [opacity, setOpacity] = useState(0);
    const [offset, setOffset] = useState(0);
    const [devotional, setDevotional] = useState(null);


    useEffect(() => {
        const { devotional } = route.params;
        if (devotional) setDevotional(devotional);
    })

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: opacity,
            duration: 2000
        })
    }, [opacity])

    if (!devotional) return <></>
    return (
        <View style={{
            flex: 1
        }}>
            <ScrollView
                onScroll={(event) => {
                    const currentOffset = event.nativeEvent.contentOffset.y;
                    if (currentOffset > offset) {
                        setOpacity(1)
                    } else {
                        setOpacity(0);
                    }
                    setOffset(currentOffset);
                }}
                style={{
                    backgroundColor: "#fff"
                }}>

                <View style={{
                    paddingVertical: 10,
                    paddingHorizontal: 6,
                    flexDirection: "row",
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
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                        <Icon type='AntDesign' name='arrowleft' size={25} color="#000" />
                        <Text style={{
                            color: "#000",
                            fontSize: 15,
                            textAlign: "center",
                            fontFamily: "NotoSans-Bold"
                        }}>Go back</Text>
                    </TouchableOpacity>
                </View>

                <ImageBackground
                    source={{ uri: devotional.artwork }}
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
                        <Image source={{ uri: devotional.artwork }}
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
                            {devotional.title}
                        </Text>
                        <Text style={{
                            color: "#fff",
                            fontSize: 14,
                            fontFamily: "NotoSans-Light",
                            textAlign: "center",
                            marginTop: 10
                        }}>
                            {moment(new Date(devotional.date)).format("dddd D MMMM YYYY")}
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
                    marginTop: 10,
                    marginHorizontal: 20
                }}>
                    <View style={{
                        backgroundColor: "lightgrey",
                        height: 1,
                        marginVertical: 20
                    }} />

                    <Text style={{
                        fontSize: 25,
                        lineHeight: 30,
                        fontFamily: "NotoSans-Black",
                        textTransform: "capitalize",
                        color: "#000"
                    }}>
                        {devotional.title}
                    </Text>

                    <Text style={{
                        fontSize: 18,
                        fontFamily: "NotoSans-Regular",
                        lineHeight: 25,
                        color: "#424242",
                        marginTop: 20,
                    }}>
                        {devotional.body}
                    </Text>

                </View>
            </ScrollView>
        </View>
    )
}

export default ReadDevotional