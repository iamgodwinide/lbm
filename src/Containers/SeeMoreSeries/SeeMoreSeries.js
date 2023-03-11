import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { useSelector } from 'react-redux'
import Separator from '../../Components/Separator'

const SeeMoreSeries = ({ navigation }) => {
    const data = useSelector(state => state.series.series);
    return (
        <ScrollView
            style={{
                backgroundColor: "#fff"
            }}>
            <View style={{
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
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <Icon type='AntDesign' name='arrowleft' size={25} color="#000" />
                    <Text
                        style={{
                            color: "#000",
                            fontSize: 15,
                            fontWeight: "bold"
                        }}
                    >Go back</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                marginHorizontal: 20,
                marginTop: 20
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: "NotoSans-Bold",
                    color: "#000"
                }}>All Series</Text>
            </View>

            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 20,
                    marginHorizontal: 20
                }}
            >
                {
                    Object.keys(data).map((series, key) => (
                        <View key={key}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("ViewSeries", { series: data[series] })}
                                key={key} style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 10
                                    }}
                                    source={{ uri: data[series].artwork }}
                                />
                                <View>
                                    <Text numberOfLines={2} style={[styles.text, {
                                        fontSize: 14,
                                        marginBottom: 10,
                                        fontFamily: "NotoSans-Bold",
                                        width: 150
                                    }]}>{data[series].title}</Text>
                                    <Text style={[styles.text, {
                                        fontSize: 13,
                                    }]}>{data[series].created}</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <TouchableOpacity>
                                        <Icon name='chevron-right' type='Entypo' size={25} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                            <Separator />
                        </View>

                    ))
                }
            </ScrollView>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 20
    },
    title: {
        fontSize: 30,
        fontFamily: "NotoSans-Bold",
        color: "#000"
    },
    smallTitle: {
        fontSize: 18,
        fontFamily: "NotoSans-Bold",
        color: "#000"
    },
    text: {
        fontSize: 13,
        color: "#000",
        textTransform: 'capitalize'
    }
})

export default SeeMoreSeries