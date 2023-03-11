import { StyleSheet, Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/theme'
import { useState } from 'react'

const TitleButton = ({ text, textColor, backgroundColor, onPress, disabled, loading }) => {
    const [canPress, setCanPress] = useState(true);
    const handlePress = () => {
        if (canPress) {
            if (!loading || !disabled) {
                setCanPress(false);
                onPress();
                setTimeout(() => {
                    setCanPress(true);
                }, 2000)
            }
        }
    }
    return (
        <Pressable
            onPress={handlePress}
            style={[
                styles.button, {
                    backgroundColor: disabled === true ? "grey" : backgroundColor ? backgroundColor : Colors.primary
                }]}>
            {
                loading
                    ? <ActivityIndicator
                        size={30}
                        color={"#fff"}
                    />
                    : <Text style={[{ color: textColor }, styles.buttonText]}>{text}</Text>

            }
        </Pressable>
    )
}

export default TitleButton

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 20
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontFamily: "NotoSans-Bold",
        textAlign: "center",
        textTransform: "uppercase"
    },
})