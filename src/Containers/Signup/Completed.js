import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import TitleButton from '../../Components/TitleButton'
import AnimatedLottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'


const Completed = () => {
    const width = useWindowDimensions().width;
    const navigation = useNavigation()
    return (
        <View style={{
            width
        }}>
            <View style={styles.content}>
                <Text style={styles.title}>Registration Successful🥳.</Text>
                {/* form */}
                <View style={styles.messageWrap}>
                    <Text style={styles.subtitle}>
                        Your account registration was successful,
                        our team will now review your profile,
                        if you are eligible your account will be approved.</Text>

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <AnimatedLottieView
                            source={require("../../Assets/lottiefiles/admin.json")}
                            loop
                            autoPlay
                            style={styles.lottie}
                        />
                    </View>
                </View>
                {/* form */}
                <TitleButton
                    text={"CLOSE"}
                    onPress={() => navigation.navigate("Starter")}
                />
            </View>
        </View>
    )
}

export default Completed

const styles = StyleSheet.create({
    content: {
        padding: 15
    },
    title: {
        fontSize: 20,
        fontFamily: "NotoSans-Bold",
        color: "#fff"
    },
    subtitle: {
        fontSize: 17,
        fontFamily: "NotoSans-Regular",
        color: "#fff"
    },
    messageWrap: {
        marginVertical: 20
    },
    lottie: {
        width: 300
    }
})