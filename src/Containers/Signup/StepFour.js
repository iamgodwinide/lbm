import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import TitleButton from '../../Components/TitleButton'
import OtpInputs from 'react-native-otp-inputs'
import { messageAlert } from '../../functions/message'
import otpImage from '../../Assets/Images/otp.jpg'

const StepFour = ({ nextPage, userInfo }) => {
    const width = useWindowDimensions().width;
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        if (userInfo?.sentOtp !== otp) {
            messageAlert("Incorrect OTP.", "warning");
            setLoading(false);
            return
        }
        setLoading(false);
        messageAlert("OTP correct.", "success");
        nextPage();
    }



    return (
        <View style={{
            width
        }}>
            <View style={styles.content}>
                <Image
                    source={otpImage}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 100,
                        marginVertical: 30,
                        alignSelf: "center"
                    }}
                />
                <Text style={styles.title}>We sent an OTP to the email you provided, enter it below</Text>
                {/* form */}
                <View style={styles.formWrap}>
                    <OtpInputs
                        numberOfInputs={4}
                        autofillFromClipboard={true}
                        inputStyles={{
                            backgroundColor: "#fff",
                            padding: 10,
                            flexGrow: 1,
                            width: 60,
                            height: 60,
                            margin: 10,
                            borderRadius: 5,
                            fontSize: 25,
                            fontFamily: "NotoSans-Bold",
                            textAlign: "center",
                        }}
                        inputContainerStyles={{
                            maxWidth: 400,
                            marginVertical: 20
                        }}
                        handleChange={otp => setOtp(otp)}
                    />

                </View>
                {/* form */}
                <TitleButton
                    text={"confirm"}
                    onPress={handleSubmit}
                    loading={loading}
                    disabled={otp.length !== 4}
                />
            </View>
        </View>
    )
}

export default StepFour

const styles = StyleSheet.create({
    content: {
        padding: 15
    },
    title: {
        fontSize: 20,
        fontFamily: "NotoSans-Medium",
        color: "#fff"
    },
    subtitle: {
        fontSize: 17,
        fontFamily: "NotoSans-Regular",
        color: "#fff"
    },
    formWrap: {
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    optionswrap: {
        flexDirection: "row"
    }
})