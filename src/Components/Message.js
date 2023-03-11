import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Ripple from 'react-native-material-ripple'

const Message = ({ onPress, message }) => {
    return (

        <Ripple
            onPress={onPress}

        >
            <TouchableOpacity
                style={{
                    width: 130,
                    marginLeft: 10,
                    marginVertical: 10
                }}
            >
                <Image
                    source={{ uri: message.artwork }}
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
                        color: "#000",
                        fontFamily: "NotoSans-Medium"
                    }}>
                        {message.title}
                    </Text>
                    <Text style={{
                        fontSize: 11,
                        marginTop: 3,
                        fontFamily: "NotoSans-Light",
                        color: "#000",
                    }}>
                        {message.date}
                    </Text>
                </View>
            </TouchableOpacity>
        </Ripple>
    )
}

export default Message