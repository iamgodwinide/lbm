import { StyleSheet, Text, View, Pressable, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { TextInput } from 'react-native-gesture-handler';
import TitleButton from '../../Components/TitleButton';
import { Colors } from '../../Constants/theme';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { emailSchema } from '../../schema';
import { messageAlert } from '../../functions/message';
import { makeGetRequest } from '../../Config';


const StepOne = ({ nextPage, setUserData }) => {
    const width = useWindowDimensions().width
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const res = await makeGetRequest(`users/get-user/${values.email}`);
            if (!res?.success) {
                messageAlert(res.msg, 'warning');
            } else if (res?.success === true) {
                setUserData(res.user);
                setLoading(false);
                nextPage();
            } else {
                messageAlert("Something went wrong", 'danger');
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            messageAlert("Something went wrong", 'danger')
            setLoading(false);
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
                <Text style={[styles.title, {
                    textAlign: "center"
                }]}>Welcome Back</Text>
                <Text style={[styles.subtitle, {
                    textAlign: "center",
                }]}>Please enter your email to continue</Text>

                <Formik
                    validationSchema={emailSchema}
                    initialValues={{
                        email: ""
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                        <View style={styles.formWrap}>
                            <View style={styles.inputwrap}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={[styles.input, {
                                        borderWidth: errors.email ? 2 : 0,
                                        borderColor: "yellow"
                                    }]}
                                    keyboardType="email-address"
                                    allowFontScaling={false}
                                    name="email"
                                    value={values.email}
                                    onBlur={handleBlur('email')}
                                    onChangeText={handleChange('email')}
                                    autoCapitalize={'none'}
                                />
                                <Text
                                    style={styles.error}
                                >
                                    {errors.email}
                                </Text>
                            </View>
                            <TitleButton
                                text={"let's go"}
                                onPress={handleSubmit}
                                disabled={!isValid}
                                loading={loading}
                            />
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}

export default StepOne

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
    input: {
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 5,
        fontSize: 18,
        fontFamily: "NotoSans-Bold",
        color: Colors.darkBlue
    },
    error: {
        color: "yellow",
        marginTop: 5
    }
})