import { buyToken } from '../API/profile';
import { Colors } from '@/Constants/theme';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
    ActivityIndicator,
    BackHandler,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet, Text, View
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import reactNativePaystack from 'react-native-paystack';
import { useDispatch, useSelector } from 'react-redux';
import Separator from './Separator';
import { useForm, FormProvider } from 'react-hook-form'
import CreditCardForm, { Button } from 'rn-credit-card'
import AnimatedLottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';


const CreditCardComponent = ({ navigation, route }) => {
    const [token, setToken] = useState(0);
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const formMethods = useForm({
        // to trigger the validation on the blur event
        mode: 'onBlur',
        defaultValues: {
            holderName: '',
            cardNumber: '',
            expiration: '',
            cvv: '',
        },
    });

    const headers = {
        "x-auth-token": user.token
    }

    const handleBuyToken = async () => {
        const res = await buyToken(
            { userID: user._id, token },
            headers,
            dispatch
        );
        if (res.success) {
            showMessage({
                message: "Transaction successful",
                backgroundColor: "green",
                color: "#fff",
                duration: 3000
            });
            navigation.goBack()
        } else {
            setLoading(false);
            showMessage({
                message: "Something went wrong",
                backgroundColor: "red",
                color: "#fff",
                duration: 3000
            });
        }
    }

    const chargeCard = (data) => {
        if (loading) return false;
        setLoading(true);

        const {
            cardNumber,
            expiration,
            cvv,
        } = data;

        reactNativePaystack.chargeCard({
            cardNumber,
            expiryMonth: expiration.slice(0, 2),
            expiryYear: expiration.slice(3),
            cvc: cvv,
            email: user.email,
            amountInKobo: price * 100
        })
            .then(() => {
                handleBuyToken();
            })
            .catch(error => {
                setLoading(false);
                showMessage({
                    message: error.message,
                    backgroundColor: "yellow",
                    color: "#000",
                    duration: 2000
                });
            })

    }

    const { handleSubmit, formState } = formMethods;

    const onSubmit = (model) => {
        setLoading(true);
        chargeCard(model);
    }


    useEffect(() => {
        const { price, tokens } = route.params;
        setPrice(price);
        setToken(tokens);
    }, [route?.params])

    // prevent going back when loading
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (loading) {
                    return true;
                } else {
                    return false;
                }
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [loading])
    );

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <FormProvider {...formMethods}>
                <Text style={styles.title}>Make Payment</Text>
                <Separator />
                <View style={{
                    marginHorizontal: 20,
                    flexDirection: "row"
                }}>
                    <Text style={[styles.text, {
                        marginRight: 20
                    }]}>Price: ₦{price}</Text>
                    <Text style={styles.text}>Tokens: {token}</Text>
                </View>
                <Separator />
                <KeyboardAvoidingView
                    style={styles.avoider}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <CreditCardForm
                        LottieView={AnimatedLottieView}
                        horizontalStart
                        overrides={{
                            labelText: {
                                marginTop: 16,
                            },
                        }}
                        backgroundImage={
                            <Image
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 12,
                                }}
                                source={require('../Assets/Images/abstract.jpg')}
                            />
                        }
                    />

                    {formState.isValid && (
                        loading
                            ? <Pressable style={{
                                backgroundColor: Colors.primary,
                                padding: 10,
                                width: 200,
                                alignSelf: "center"
                            }}>
                                <ActivityIndicator size={25} color="#fff" />
                            </Pressable>
                            : <Button
                                style={styles.button}
                                title={'CONFIRM PAYMENT'}
                                onPress={handleSubmit(onSubmit)}
                            />
                    )}

                </KeyboardAvoidingView>

            </FormProvider>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    avoider: {
        flex: 1,
        padding: 36,
    },
    title: {
        textAlign: "center",
        fontSize: 22,
        fontFamily: "NotoSans-Bold",
        color: "#000",
        marginVertical: 20
    },
    button: {
        margin: 36,
        marginTop: 0,
    },
    text: {
        color: "#000",
        fontSize: 18,
        fontFamily: "NotoSans-Light",
    }
});


export default CreditCardComponent