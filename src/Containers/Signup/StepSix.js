import { StyleSheet, Text, View, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import TitleButton from '../../Components/TitleButton'
import { TextInput } from 'react-native-gesture-handler'
import { Colors } from '../../Constants/theme'
import { makePostRequest } from '../../Config'
import { useState } from 'react'
import { Formik } from 'formik'
import { passwordSchema } from '../../schema'
import { messageAlert } from '../../functions/message'
import Icon from 'react-native-dynamic-vector-icons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import padlockImg from '../../Assets/Images/lock.jpg'



const StepSix = ({ nextPage, userInfo }) => {
    const width = useWindowDimensions().width;
    const [loading, setLoading] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const res = await makePostRequest(`users/register`, { ...userInfo, ...values });
            if (!res?.success) {
                messageAlert(res.msg, 'warning');
            } else if (res?.success === true) {
                messageAlert(res.msg, 'success');
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
                    source={padlockImg}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 100,
                        marginVertical: 30,
                        alignSelf: "center"
                    }}
                />
                <Text style={styles.title}>Final step, enter a unique password for your account.</Text>
                {/* form */}
                <View style={styles.formWrap}>

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
                                    text={"finish"}
                                    onPress={handleSubmit}
                                    loading={loading}
                                    disabled={!isValid}
                                />
                            </View>
                        )}
                    </Formik>
                </View>
                {/* form */}
            </View>
        </View>
    )
}

export default StepSix

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
        marginVertical: 10
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
    }
})