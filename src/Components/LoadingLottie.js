import { View, Text } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { lottiefiles } from '../Constants'

const LoadingLottie = () => {
    return (
        <View style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <AnimatedLottieView
                source={lottiefiles.loadingLottie}
                loop={true}
                autoPlay={true}
                style={{
                    width: 100,
                    height: 100
                }}
            />
            <Text style={{
                fontSize: 15,
                color: "#000",
                fontFamily: "NotoSans-Bold"
            }}>Please wait</Text>
        </View>
    )
}

export default LoadingLottie