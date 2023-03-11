import { BackHandler, Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useState, useRef } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { Colors } from '../../Constants/theme'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Completed from './Completed'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import StepFive from './StepFive'
import StepSix from './StepSix'


const Signup = () => {
    const navigation = useNavigation();
    const steps = Array(6).fill(0);
    const [currentStep, setCurrentStep] = useState(0);
    const scrollRef = useRef();
    const width = useWindowDimensions().width;

    const [userInfo, setUserInfo] = useState({});

    const setUserData = values => {
        setUserInfo({
            ...userInfo,
            ...values
        })
    }

    const nextPage = () => {
        scrollRef.current.scrollTo({
            x: (currentStep + 1) * width,
            animation: true
        });
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevPage = () => {
        scrollRef.current.scrollTo({
            x: (currentStep - 1) * width,
            animation: true
        });
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }else{
            navigation.goBack()
        }
    }

    // custom back button behaviour
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (currentStep > 0 && currentStep < 7) {
                    setCurrentStep(currentStep - 1);
                    prevPage();
                    return true;
                } else {
                    return false;
                }
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [currentStep])
    );

    return (
        <ScrollView
            style={styles.scroll}
        >
            <View style={styles.nav}>
                <Pressable
                    onPress={prevPage}
                >
                    <Icon name='arrow-back' type='ionicons' size={25} color="#fff" />
                </Pressable>
                <Pressable
                    onPress={() => navigation.goBack()}
                >
                    <Icon name='x' type='Feather' size={25} color="#fff" />
                </Pressable>
            </View>

            {/* pills */}
            <View style={styles.pillsWrap}>
                {
                    steps.map((_, key) => (
                        <View style={[styles.pill, {
                            backgroundColor: currentStep >= key ? "#fff" : "grey"
                        }]} key={`step_${key}`} />
                    ))
                }
            </View>
            {/* pills */}

            {/* steps */}
            <ScrollView
                ref={scrollRef}
                pagingEnabled
                horizontal
                scrollEnabled={false}
            >
                <StepOne nextPage={nextPage} />
                <StepTwo setUserData={setUserData} nextPage={nextPage} />
                <StepThree setUserData={setUserData} nextPage={nextPage} />
                <StepFour userInfo={userInfo} nextPage={nextPage} />
                {/* <StepFive setUserData={setUserData} userInfo={userInfo} nextPage={nextPage} /> */}
                <StepSix userInfo={userInfo} nextPage={nextPage} />
                <Completed nextPage={nextPage} />
            </ScrollView>
            {/* steps */}

        </ScrollView>
    )
}

export default Signup

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: Colors.darkerBlue
    },
    nav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15
    },
    pillsWrap: {
        marginHorizontal: 15,
        flexDirection: "row",
        marginVertical: 10
    },
    pill: {
        flexGrow: 1,
        height: 3,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: "#fff"
    }
})