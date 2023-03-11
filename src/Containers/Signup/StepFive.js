import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import TitleButton from '../../Components/TitleButton'
import { Colors } from '../../Constants/theme'
import { makePostRequest } from '../../Config'
import { useState } from 'react'
import { messageAlert } from '../../functions/message'
import MaskInput from 'react-native-mask-input';
import { useEffect } from 'react'


const StepFive = ({ nextPage, setUserData, userInfo }) => {
    const width = useWindowDimensions().width;
    const [loading, setLoading] = useState(false);
    const [serial_no, set_serial_no] = useState("");
    const [isValid, setIsValid] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const res = await makePostRequest(`users/validate-serial-no`, { serial_no });
            if (!res?.success) {
                messageAlert(res.msg, 'warning');
            } else if (res?.success === true) {
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

    useEffect(() => {
        if (serial_no.length === 9) setIsValid(true);
        else setIsValid(false);
    }, [serial_no])

    return (
        <View style={{
            width
        }}>
            <View style={styles.content}>
                <Text style={styles.title}>Provide the Ref/Serial Number in your membership certificate.</Text>
                {/* form */}
                <View style={styles.formWrap}>
                    <View style={styles.inputwrap}>
                        <Text style={styles.label}>Reference Number</Text>
                        <View style={styles.textInputwrap}>
                            <MaskInput
                                value={serial_no}
                                onChangeText={(masked) => {
                                    set_serial_no(masked);
                                    setUserData({ serial_no: masked })
                                }}
                                mask={[/\D/, /\D/, /\D/, '/', /\d/, /\d/, '/', /\d/, /\d/]}
                                placeholder="XXX/XX/XX"
                                style={styles.input}
                                autoCapitalize="characters"
                                keyboardType={"ascii-capable"}
                            />
                        </View>
                        <TitleButton
                            text={"continue"}
                            onPress={handleSubmit}
                            loading={loading}
                            disabled={!isValid}
                        />
                    </View>
                </View>
                {/* form */}
            </View>
        </View>
    )
}

export default StepFive

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
        width: "90%",
    },
    error: {
        color: "yellow",
        marginTop: 5
    }
})