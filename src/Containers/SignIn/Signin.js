import { ImageBackground, StyleSheet, Text, View, ScrollView, useWindowDimensions, BackHandler } from 'react-native'
import React, { useState, useRef } from 'react'
import img1 from '../../Assets/Images/apostle4.jpg';
import { Colors } from '../../Constants/theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

const Signin = () => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
    const steps = Array(5).fill(0);
    const [currentStep, setCurrentStep] = useState(0);
    const scrollRef = useRef();
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
        }
    }
    // custom back button behaviour
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (currentStep > 0 && currentStep < 2) {
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
            style={{
                flex: 1,
                backgroundColor: Colors.darkerBlue
            }}
        >
            <View style={[styles.root, { minHeight: height }]}>
                <ImageBackground
                    source={img1}
                    style={styles.backgroundImg}
                />
            </View>
            {/* steps */}
            <ScrollView
                ref={scrollRef}
                pagingEnabled
                horizontal
                scrollEnabled={false}
                style={{
                    width,
                    height,
                    position: "absolute",
                    top: 0,
                    left: 0
                }}
            >
                <StepOne setUserData={setUserData} nextPage={nextPage} />
                <StepTwo userInfo={userInfo} nextPage={nextPage} />
            </ScrollView>
            {/* steps */}
        </ScrollView>
    )
}

export default Signin

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    backgroundImg: {
        height: 400
    }
});