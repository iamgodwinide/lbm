import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import TitleButton from '../../Components/TitleButton'
import { TextInput } from 'react-native-gesture-handler'
import { Colors } from '../../Constants/theme'
import { Formik } from 'formik'
import { basicInfoSchema } from '../../schema'

const StepTwo = ({ nextPage, setUserData }) => {
    const width = useWindowDimensions().width;

    const handleSubmit = (values) => {
        setUserData(values);
        nextPage();
    }

    return (
        <View style={{
            width
        }}>
            <View style={styles.content}>
                <Text style={styles.title}>Before we start, could we please get some info ?</Text>
                {/* form */}
                <Formik
                    validationSchema={basicInfoSchema}
                    initialValues={{
                        firstname: "",
                        lastname: "",
                        nickname: "",
                        email: "",
                        phone: ""
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                        <View style={styles.formWrap}>
                            <View style={styles.inputwrap}>
                                <Text style={styles.label}>What's your first name?</Text>
                                <TextInput
                                    style={[styles.input, {
                                        borderWidth: errors.firstname ? 2 : 0,
                                        borderColor: "yellow"
                                    }]}
                                    keyboardType="name-phone-pad"
                                    allowFontScaling={false}
                                    name="firstname"
                                    value={values.firstname}
                                    onBlur={handleBlur('firstname')}
                                    onChangeText={handleChange('firstname')}
                                />
                                <Text
                                    style={styles.error}
                                >
                                    {errors.firstname}
                                </Text>
                            </View>
                            <View style={styles.inputwrap}>
                                <Text style={styles.label}>Last name</Text>
                                <TextInput
                                    style={[styles.input, {
                                        borderWidth: errors.lastname ? 2 : 0,
                                        borderColor: "yellow"
                                    }]}
                                    keyboardType="name-phone-pad"
                                    allowFontScaling={false}
                                    name="lastname"
                                    value={values.lastname}
                                    onBlur={handleBlur('lastname')}
                                    onChangeText={handleChange('lastname')}
                                />
                                <Text
                                    style={styles.error}
                                >
                                    {errors.lastname}
                                </Text>
                            </View>
                            <View style={styles.inputwrap}>
                                <Text style={styles.label}>What do your friends call you? 😊(optional)</Text>
                                <TextInput
                                    style={[styles.input, {
                                        borderWidth: errors.nickname ? 2 : 0,
                                        borderColor: "yellow"
                                    }]}
                                    keyboardType="name-phone-pad"
                                    allowFontScaling={false}
                                    name="nickname"
                                    value={values.nickname}
                                    onBlur={handleBlur('nickname')}
                                    onChangeText={handleChange('nickname')}
                                />
                                <Text
                                    style={styles.error}
                                >
                                    {errors.nickname}
                                </Text>
                            </View>
                            <View style={styles.inputwrap}>
                                <Text style={styles.label}>And phone number</Text>
                                <TextInput
                                    style={[styles.input, {
                                        borderWidth: errors.phone ? 2 : 0,
                                        borderColor: "yellow"
                                    }]}
                                    keyboardType="phone-pad"
                                    allowFontScaling={false}
                                    placeholder="090123456.."
                                    name="phone"
                                    value={values.phone}
                                    onBlur={handleBlur('phone')}
                                    onChangeText={handleChange('phone')}
                                />
                                <Text
                                    style={styles.error}
                                >
                                    {errors.phone}
                                </Text>
                            </View>
                            <TitleButton
                                text={"let's go"}
                                onPress={handleSubmit}
                                disabled={!isValid}
                            />
                        </View>
                    )}
                </Formik>
                {/* form */}
            </View>
        </View>
    )
}

export default StepTwo

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