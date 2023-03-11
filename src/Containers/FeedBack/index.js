import { ActivityIndicator, BackHandler, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Colors } from '../../Constants/theme';
import Icon from 'react-native-dynamic-vector-icons';
import { showMessage } from 'react-native-flash-message';
import { makePostRequest } from '../../Config';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

const Feedback = () => {
    const user = useSelector(state => state.user.user);
    const navigation = useNavigation();
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!feedback) {
                showMessage({
                    message: "Write your feedback first",
                    color: "#000",
                    backgroundColor: "yellow",
                    duration: 3000
                });
                setLoading(false);
                return false;
            }
            const res = await makePostRequest("users/submit-feedback", { feedback, rating }, {
                "x-auth-token": user.token
            });
            if (res?.success) {
                setSubmitted(true);
                showMessage({
                    message: res.msg,
                    color: "#fff",
                    backgroundColor: "green",
                    duration: 3000
                });
            } else {
                showMessage({
                    message: res.msg,
                    color: "#fff",
                    backgroundColor: "red",
                    duration: 3000
                });
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            showMessage({
                message: "Something went wrong",
                color: "#fff",
                backgroundColor: "red"
            })
            setLoading(false);
        }
    }

    const handleRate = index => {
        setRating(index);
    }

    // custom back button behaviour
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

        <ScrollView style={styles.root}>
            <View style={{
                backgroundColor: "#fff",
                paddingVertical: 10,
                paddingHorizontal: 6,
                flexDirection: "row",
                justifyContent: 'space-between',
                alignItems: 'center',
                shadowColor: "#000",
                shadowOpacity: 1.5,
                shadowOffset: {
                    height: 1,
                    width: 0
                },
                elevation: 7
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        alignItems: "center"
                    }}>
                    <Icon type='AntDesign' name='arrowleft' size={30} color="#000" />
                </TouchableOpacity>
            </View>
            {
                submitted
                    ? <View>
                        <AnimatedLottieView
                            source={require("../../Assets/lottiefiles/thumbs-up.json")}
                            autoPlay={true}
                            loop={true}
                            style={{ width: 150, height: 160, marginLeft: -20 }}
                        />
                        <Text style={[styles.title, { textAlign: "left", fontSize: 30, marginTop: -30, marginBottom: 0 }]}>Thank You</Text>
                        <Text style={[styles.text, { textAlign: "left" }]}>Your feedback has been submitted successfully</Text>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                marginTop: 20
                            }}>
                            <Text style={[styles.text, { color: Colors.primary }]}>Go back</Text>
                        </TouchableOpacity>
                    </View>
                    : <>
                        <Text style={[styles.title, { textAlign: "left" }]}>Rate Your Experience</Text>
                        <View style={styles.ratingWrap}>
                            {
                                Array(5).fill(0).map((_, key) => (
                                    <TouchableOpacity key={key}
                                        onPress={() => handleRate(key + 1)}
                                    >
                                        <Icon name={(key + 1) <= rating ? "star" : "star-o"} type='FontAwesome' size={35} color={Colors.primary} />
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <View>
                            <View style={styles.inputWrap}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Tell us on how we can improve..."
                                    multiline={true}
                                    keyboardType='ascii-capable'
                                    onChangeText={text => setFeedback(text)}
                                    value={feedback}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => loading ? false : handleSubmit()}
                            style={styles.button}>
                            {
                                loading
                                    ? <ActivityIndicator size={20} color="#fff" />
                                    : <Text style={[styles.text, { color: "#fff", textAlign: "center" }]}>Submit</Text>
                            }
                        </TouchableOpacity>
                    </>
            }
        </ScrollView>
    )
}

export default Feedback

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontFamily: "NotoSans-Bold",
        color: Colors.black,
        textAlign: "center",
        marginVertical: 20
    },
    text: {
        fontSize: 16,
        fontFamily: "NotoSans-Medium",
        color: "#353434"
    },
    inputWrap: {
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    input: {
        width: "90%",
        fontSize: 16,
        fontFamily: "NotoSans-Medium",
        color: "#353434"
    },
    ratingWrap: {
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: 250
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        marginVertical: 20,
        borderRadius: 10,
    }
})