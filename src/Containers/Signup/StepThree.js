import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import TitleButton from '../../Components/TitleButton'
import { TextInput } from 'react-native-gesture-handler'
import { Colors } from '../../Constants/theme'
import { Formik } from 'formik'
import { emailSchema } from '../../schema'
import { useState } from 'react'
import { makeGetRequest } from '../../Config'
import { messageAlert } from '../../functions/message'

const StepThree = ({ nextPage, setUserData }) => {
    const width = useWindowDimensions().width;
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const res = await makeGetRequest(`users/send-otp/${values.email}`);
            if (!res?.success) {
                messageAlert(res.msg, 'warning');
            } else if (res?.success === true) {
                console.log(res.otp);
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
                <Text style={styles.title}>Enter your email</Text>
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
                                text={"let's go"}
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

export default StepThree

const styles = StyleSheet.create({
    content: {
        padding: 15
    },
    title: {
        fontSize: 20,
        fontFamily: "NotoSans-Medium",
        color: "#fff"
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