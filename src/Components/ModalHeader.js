import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { useNavigation } from '@react-navigation/native'


const ModalHeader = ({ title }) => {
    const navigation = useNavigation();
    return (
        <View style={{
            zIndex: 10,
            paddingVertical: 10,
            paddingHorizontal: 6,
            backgroundColor: "#fff",
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
                <Text
                    style={{
                        color: "#000",
                        fontSize: 15,
                        marginLeft: 20,
                        fontFamily: "NotoSans-Bold"
                    }}
                >{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModalHeader