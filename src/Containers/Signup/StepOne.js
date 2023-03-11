import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import TitleButton from '../../Components/TitleButton'
import img1 from '../../Assets/Images/apostle.jpg'


const StepOne = ({ nextPage }) => {
    const width = useWindowDimensions().width;
    return (
        <View style={{
            width
        }}>
            <Image
                source={img1}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>Hello there, so glad you are here! 🎉</Text>
                <Text style={styles.subTitle}>My team and I have created this app for you to easily access powerful leadership resources that will empower you to become a perfect Leader!</Text>
                <TitleButton
                    text={"let's go"}
                    onPress={nextPage}
                />
            </View>
        </View>
    )
}

export default StepOne

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: "100%",
        marginTop: 20
    },
    content: {
        padding: 15
    },
    title: {
        fontSize: 30,
        fontFamily: "NotoSans-Medium",
        color: "#fff"
    },
    subTitle: {
        fontSize: 18,
        fontFamily: "NotoSans-Medium",
        color: "#fff",
        marginTop: 10
    }
})