import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { lottiefiles } from '../Constants'

const NoResult = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
        }}>
            <AnimatedLottieView
                source={lottiefiles.cat}
                autoPlay={true}
                loop
                style={{
                    height: 200,
                    aspectRatio: 1,
                    alignSelf: "center"
                }}
            />
            <Text style={styles.text}>Sorry, your search did not return any result</Text>
        </View>
    )
}

export default NoResult

const styles = StyleSheet.create({
    text: {
        color: "#000",
        fontSize: 25,
        fontFamily: "NotoSans-Regular",
        textAlign: "center",
        marginTop: 25,
        marginHorizontal: 20
    }
})