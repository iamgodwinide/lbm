import { ImageBackground, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import img1 from '../../Assets/Images/apostle3.jpg'
import TitleButton from '../../Components/TitleButton'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../Constants/theme'

const Starter = () => {
    const navigation = useNavigation();
    return (
        <ImageBackground
            source={img1}
            style={styles.background}
        >
            <View style={styles.contentWrap}>
                <Text style={styles.title}>Welcome to the Love Blazers App</Text>
                <TitleButton
                    text={"get started"}
                    onPress={() => navigation.navigate("Signup")}
                />
                <Pressable
                    onPress={() => navigation.navigate("Signin")}
                >
                    <Text style={[styles.buttonText, {
                        fontFamily: "NotoSans-Medium",
                        fontSize: 17
                    }]}>i already have an account</Text>
                </Pressable>
            </View>
        </ImageBackground>
    )
}

export default Starter

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    contentWrap: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "40%",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        borderColor: Colors.primary,
        borderTopWidth: 4

    },
    title: {
        fontSize: 30,
        fontFamily: "NotoSans-Black",
        textTransform: "capitalize",
        color: "#fff"
    },
    buttonText: {
        fontSize: 20,
        color: "#fff",
        fontFamily: "NotoSans-Bold",
        textAlign: "center",
        textTransform: "uppercase"
    }
})