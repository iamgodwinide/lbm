import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import TitleButton from '../../Components/TitleButton'
import { useNavigation } from '@react-navigation/native'


const Completed = () => {
    const width = useWindowDimensions().width;
    const navigation = useNavigation();
    return (
        <View style={{
            width
        }}>
            <View style={styles.content}>
                <Text style={styles.title}>Password Reset Complete Successful🥳.</Text>
                {/* form */}
                <View style={styles.messageWrap}>
                    <Text style={styles.subtitle}>
                        Your password reset was successful, you can now login.</Text>
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