import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { useSelector } from 'react-redux'
import Icon from 'react-native-dynamic-vector-icons'
import Separator from '../Components/Separator'

const CustomDrawer = props => {
    const user = useSelector(state => state.user.user);
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require("../Assets/Images/dark-bg.jpg")}
            >
                <View
                    style={{
                        backgroundColor: "rgba(0, 0, 0, .7)",
                        position: "absolute",
                        width: "100%",
                        height: "100%"
                    }}
                />
                <Image
                    source={user.profile_pic ? { uri: user.profile_pic } : require("../Assets/Images/blank.png")}
                    resizeMode="cover"
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        alignSelf: "center",
                        marginVertical: 20
                    }}
                />
                <Text style={[styles.text, {
                    textTransform: "capitalize",
                    marginBottom: 10
                }]}
                >{user.firstname} {user.lastname}</Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20
                }}>
                    <Text style={styles.text}>{user.coins} Tokens </Text>
                    <Icon type='FontAwesome5' name='coins' size={30} color="#fff"
                        style={{
                            paddingHorizontal: 10
                        }}
                    />
                </View>
            </ImageBackground>
            <DrawerContentScrollView {...props}
            >
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <Separator />
            <View style={{
                marginVertical: 10
            }}>
                <Text style={[styles.text, {
                    color: "#000"
                }]}>Version 1.0</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#fff",
        fontFamily: "NotoSans-Regular",
        textAlign: "center"
    }
})

export default CustomDrawer