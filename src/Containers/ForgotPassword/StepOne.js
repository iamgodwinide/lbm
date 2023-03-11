import { StyleSheet, Text, View, useWindowDimensions, Image, ScrollView } from 'react-native'
import React from 'react'
import TitleButton from '../../Components/TitleButton'
import { TextInput } from 'react-native-gesture-handler'
import { Colors } from '../../Constants/theme'
import { Formik } from 'formik'
import { emailSchema } from '../../schema'
import { useState } from 'react'
import { makeGetRequest } from '../../Config'
import { messageAlert } from '../../functions/message'
import forgotImg from '../../Assets/Images/forgot.jpg'

const StepOne = ({ nextPage, setUserData }) => {
    const width = useWindowDimensions().width;
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const res = await makeGetRequest(`users/send-otp/${values.email}?reset=true`);
            if (!res?.success) {
                messageAlert(res.msg, 'warning');
            } else if (res?.success === true) {
                console.log(res.otp);
                messageAlert(res.msg, 'success');
                setUserData({ ...values, sentOtp: res.otp });
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
        <View style={{
            width
        }}>
            <View style={styles.content}>
                <Image
                    source={forgotImg}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 100,
                        marginVertical: 30,
                        alignSelf: "center"
                    }}
                />
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.text}>Don't worry! it happens, please enter the address associated with your account.</Text>
                {/* form */}
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
                                text={"continue"}
                                onPress={handleSubmit}
                                disabled={!isValid}
                                loading={loading}
                            />
                        </View>
                    )}
                </Formik>
                {/* form */}
            </View>
        </View>
    )
}

export default StepOne

const styles = StyleSheet.create({
    content: {
        padding: 15
    },
    title: {
        fontSize: 30,
        fontFamily: "NotoSans-Medium",
        color: "#fff"
    },
    text: {
        fontSize: 18,
        fontFamily: "NotoSans-Medium",
        color: "#fff",
        marginVertical: 10,
    },
    formWrap: {
        marginVertical: 20
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
        color: Colors.darkBlue
    },
    error: {
        color: "yellow",
        marginTop: 5
    }
})