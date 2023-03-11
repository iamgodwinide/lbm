import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Series = ({ onPress, series }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: 130,
                marginLeft: 10,
                marginVertical: 10
            }}
        >
            <Image
                source={{ uri: series.artwork }}
                style={{
                    width: "100%",
                    height: 100,
                    borderRadius: 10,
                    resizeMode: "cover"
                }}
            />
            <View style={{
                width: "100%",
                marginTop: 10
            }}>
                <Text style={{
                    fontSize: 15,
                    fontFamily: "NotoSans-Medium",
                    color: "#000",
                }}>
                    {series.title}
                </Text>
                <Text style={{
                    fontSize: 11,
                    marginTop: 10,
                    fontFamily: "NotoSans-Light",
                    color: "#000",
                }}>
                    {series.date}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Series