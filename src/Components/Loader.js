import { View } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { lottiefiles } from '../Constants'

const Loader = () => {
  return (
    <View style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <AnimatedLottieView
      source={lottiefiles.fire}
      loop
      speed={2}
      autoPlay
      style={{
        width: 80
      }}
      />
      </View>
  )
}

export default Loader