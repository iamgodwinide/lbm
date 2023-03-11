import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LoadingLottie from '../../Components/LoadingLottie'
import { useSelector } from 'react-redux'
import ModalHeader from '../../Components/ModalHeader'
import { Colors } from '../../Constants/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { width } = Dimensions.get("window");

const ViewSeries = ({ route }) => {
    const [series, setSeries] = useState(null);
    const messages = useSelector(state => state.messages.messages);
    const [seriesMessages, setSeriesMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();


    useEffect(() => {
        const { series } = route.params;
        setSeries(series);
        const messagesInSeries = messages.filter(m => m.seriesID === series._id);
        setSeriesMessages(messagesInSeries);
        setLoading(false);
    }, []);

    return (
        loading
            ? <LoadingLottie />
            : <ScrollView style={{
                flex: 1,
                backgroundColor: "#eee"
            }}>
                <ModalHeader title={"Series"} />
                <Image
                    source={{ uri: series.artwork }}
                    style={{
                        resizeMode: "cover",
                        height: 150,
                        width
                    }}
                />
                <View style={{
                    marginHorizontal: 20,
                    marginTop: 40
                }}>
                    {
                        seriesMessages.map((m, key) => (
                            <View
                                key={m._id}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 20
                                }}
                            >
                                <View style={{
                                    flexDirection: "row",
                                    width: "60%",
                                    paddingHorizontal: 10
                                }}>
                                    <Image
                                        source={{ uri: m.artwork }}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            resizeMode: "cover",
                                            borderRadius: 10
                                        }}
                                    />
                                    <View style={{
                                        marginLeft: 5
                                    }}>
                                        <Text
                                            style={{
                                                color: Colors.black,
                                                fontWeight: "bold",
                                                fontSize: 15
                                            }}
                                        >{m.title}</Text>
                                        <Text
                                            style={{
                                                color: Colors.black,
                                                fontSize: 11
                                            }}
                                        >{m.date}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("ViewSermon", { message: m })}
                                    style={{
                                        backgroundColor: Colors.primary,
                                        paddingHorizontal: 15,
                                        paddingVertical: 10,
                                        borderRadius: 10
                                    }}
                                >
                                    <Text style={{
                                        color: Colors.white,
                                        fontWeight: "bold"
                                    }}>GET</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>

            </ScrollView>
    )
}

export default ViewSeries

const styles = StyleSheet.create({})