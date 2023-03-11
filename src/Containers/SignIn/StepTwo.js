import { StyleSheet, Text, View, Pressable, useWindowDimensions, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { TextInput } from 'react-native-gesture-handler';
import TitleButton from '../../Components/TitleButton';
import { Colors } from '../../Constants/theme';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { passwordSchema } from '../../schema';
import { makePostRequest } from '../../Config';
import { messageAlert } from '../../functions/message';
import { login } from '../../Features/User';
import { navigateAndSimpleReset } from '../../Navigators/utils';
import { useDispatch, useSelector } from 'react-redux';


const StepTwo = ({ userInfo }) => {
    const width = useWindowDimensions().width
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const { firstname, lastname, email, profile_pic } = userInfo;
    const [errMsg, setErrMsg] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            setErrMsg("");
            setLoading(true);
            const data = { email: userInfo.email, password: values.password }
            const res = await makePostRequest("auth/login", data);
            if (!res.success) {
                messageAlert(res.msg, 'warning');
                setErrMsg(res.msg);
            } else if (res?.success === true) {
                dispatch(login({
                    ...res.user,
                    token: res.token
                }));
                setLoading(false);
                navigateAndSimpleReset("SplashScreen", 0)
            } else {
                setErrMsg(res.msg);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setErrMsg("Something went wrong");
        }
    }

    return (
        <View style={[styles.content, {
            width,
        }]}>
            <View style={styles.navWrap}>
                <Pressable
                    onPress={() => navigation.goBack()}
                >
                    <Icon
                        name="chevron-left"
                        type="Feather"
                        size={35}
                        color="#fff"
                    />
                </Pressable>
            </View>

            <View style={styles.loginWrap}>
                <View style={styles.profilewrap}>
                    <Image
                        source={{ uri: profile_pic || "https://lbmobilestorage.s3.amazonaws.com/images/blank.png" }}
                        style={styles.image}
                    />
                    <View style={styles.profileContent}>
                        <Text style={[styles.mintitle, {
                            fontFamily: "NotoSans-Bold"
                        }]}>{firstname} {lastname}</Text>
                        <Text style={styles.mintitle}>{email}</Text>
                    </View>
                </View>
                {
                    errMsg.length > 0
                    &&
                    <Text style={styles.errMsg}>
                        {errMsg}
                    </Text>
                }
                <Formik
                    validationSchema={passwordSchema}
                    initialValues={{
                        password: ''
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ values, isValid, errors, handleChange, handleSubmit }) => (
                        <View style={styles.inputwrap}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.textInputwrap}>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="default"
                                    allowFontScaling={false}
                                    secureTextEntry={secureTextEntry}
                                    value={values.password}
                                    autoCapitalize={'none'}
                                    onChangeText={handleChange('password')}
                                />
                                <Pressable
                                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                                >
                                    <Icon
                                        name={secureTextEntry ? 'eye' : 'eye-off'}
                                        type='Feather'
                                        size={25}
                                        color={"#000"}
                                    />
                                </Pressable>
                            </View>
                            <Text
                                style={styles.error}
                            >
                                {errors.password}
                            </Text>
                            <TitleButton
                                text={"login"}
                                onPress={handleSubmit}
                                loading={loading}
                                disabled={!isValid}
                            />
                        </View>
                    )}
                </Formik>
                <Pressable
                    onPress={() => navigation.navigate("ForgotPassword")}
                    style={{
                        marginBottom: 10
                    }}
                >
                    <Text style={styles.subtitle}>Forgot Password?</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default StepTwo

const styles = StyleSheet.create({
    content: {
        zIndex: 3,
        top: 0,
        left: 0,
        height: "100%",
        backgroundColor: "rgba(0,0,0,.6)"
    },
    navWrap: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    loginWrap: {
        marginTop: 120,
        backgroundColor: "rgba(11, 11, 15, .9)",
        width: "90%",
        maxWidth: 500,
        alignSelf: "center",
        borderRadius: 10,
        padding: 10
    },
    profilewrap: {
        flexDirection: "row",
        alignItems: "center"
    },
    profileContent: {
        margin: 10,
        justifyContent: "center"
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    title: {
        fontSize: 28,
        fontFamily: "NotoSans-Medium",
        color: "#fff"
    },
    subtitle: {
        fontSize: 18,
        fontFamily: "NotoSans-Light",
        color: "#fff"
    },
    mintitle: {
        color: "#fff",
        fontFamily: "NotoSans-Light"
    },
    textInputwrap: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 5
    },
    label: {
        fontSize: 18,
        fontFamily: "NotoSans-Medium",
        color: "#fff",
        marginVertical: 10
    },
    input: {
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 5,
        fontSize: 18,
        fontFamily: "NotoSans-Bold",
        color: Colors.darkBlue,
        width: "90%"
    },
    error: {
        color: "yellow",
        marginTop: 5
    },
    errMsg: {
        color: "#000",
        backgroundColor: "yellow",
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center"
    }
})