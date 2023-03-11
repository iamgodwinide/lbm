import { BackHandler, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import blmlogo from '../Assets/Images/logo.png'
import AnimatedLottieView from 'lottie-react-native'
import { lottiefiles } from '../Constants'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAppLoaded } from '../Features/App'
import { fetchData } from '../API/fetchAll'
import { useFocusEffect } from '@react-navigation/native'

const SplashScreen = () => {
    const dispatch = useDispatch();
    const [hint, setHint] = useState("Getting things ready ");
    const user = useSelector(state => state.user.user);


    useEffect(() => {
        let isCancelled = false;
        // make all api calls
        fetchData(0, setHint, user, setAppLoaded, dispatch);
        return () => {
            isCancelled = true;
        }
    }, []);

    // custom back button behaviour
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => true;
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    return (
        <View style={styles.root}>
            <Image
                source={blmlogo}
                style={styles.image}
            />
            <AnimatedLottieView
                source={lottiefiles.loadingLottie}
                loop
                autoPlay
                style={styles.loader}
            />
            <Text style={styles.hint}>{hint}</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 140,
        height: 140,
        resizeMode: "contain",
        alignSelf: "center"
    },
    hint: {
        color: "#000",
        fontSize: 16,
        marginVertical: 15,
        fontFamily: "NotoSans-Bold",
    },
    loader: {
        height: 50,
        marginVertical: 10
    }
})