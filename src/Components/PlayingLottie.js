import { View } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { lottiefiles } from '../Constants'

const PlayingLottie = () => {
  return (
    <View style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <AnimatedLottieView
        source={lottiefiles.playing}
        loop
        autoPlay
        speed={2}
        style={{
          width: 40
        }}
      />
      </View>
  )
}

export default PlayingLottie