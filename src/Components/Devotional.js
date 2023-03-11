import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-dynamic-vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';


const Devotional = () => {
    const navigation = useNavigation()
    const latestDevotional = useSelector(state => state.devotionals.devotionals)[0];
    const date = new Date(latestDevotional?.date);
    const month = moment(date).format("MMM");
    const day = moment(date).format("D");

    if (!latestDevotional) return <></>
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginHorizontal: 20
        }}>

            <View style={{
                width: "20%"
            }}>
                <View style={{
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                    minHeight: 90,
                    width: "100%",
                    overflow: "hidden",
                    shadowColor: "#000",
                    shadowOpacity: 1.5,
                    shadowOffset: {
                        height: 1,
                        width: 0
                    },
                    elevation: 7
                }}>
                    <View style={{
                        backgroundColor: "#1046D0",
                        height: 15,
                        justifyContent: "center"
                    }}>
                    </View>
                    <Text style={{
                        fontSize: 23,
                        fontFamily: "NotoSans-Black",
                        color: "#1046D0",
                        textAlign: "center",
                    }}>{day}</Text>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: "NotoSans-Black",
                        color: "#1046D0",
                        textAlign: "center",
                        textTransform: "uppercase"
                    }}>{month}</Text>
                </View>
            </View>

            <View style={{
                width: "75%"
            }}>
                <Text style={{
                    fontWeight: "600",
                    color: "#000",
                    fontSize: 16,
                    fontFamily: "NotoSans-Bold",
                    textTransform: "capitalize",
                }}>
                    {latestDevotional.title}
                </Text>
                <Text style={{
                    fontSize: 16,
                    fontFamily: "NotoSans-Light",
                    color: "#000",
                    marginTop: 10,
                }}
                    numberOfLines={7}
                >
                    {latestDevotional.body}
                </Text>
                <Text style={{
                    fontFamily: "NotoSans-Bold",
                    color: "#000",
                    fontSize: 14,
                    marginTop: 10
                }}>
                    {latestDevotional.mainBibleText}
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate("ReadDevotional", { devotional: latestDevotional })}
                    style={{
                        borderWidth: 1,
                        borderColor: "#1046D0",
                        borderRadius: 5,
                        padding: 5,
                        marginTop: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#1046D0",
                            textTransform: "uppercase",
                            fontFamily: "NotoSans-Bold"
                        }}
                    >
                        Read Devotional
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Devotional

const styles = StyleSheet.create({})