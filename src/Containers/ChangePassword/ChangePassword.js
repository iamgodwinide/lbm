import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../Constants/theme'
import Separator from '../../Components/Separator'
import Icon from 'react-native-dynamic-vector-icons'
import { showMessage } from 'react-native-flash-message'
import { makePostRequest } from '../../Config'
import { useSelector } from 'react-redux'
import { current } from '@reduxjs/toolkit'

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [prevPass, setPrevPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newPass2, setNewPass2] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const token = useSelector(state => state.user.user.token);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (newPass.length < 6 || newPass2.length < 6 || prevPass.length < 6) {
                showMessage({
                    message: "Passwords must be a minimum of 6 characters",
                    duration: 2000,
                    backgroundColor: "red",
                    color: "#fff",
                })
                setLoading(false);
                return false;
            }
            const headers = {
                "x-auth-token": token
            }
            const res = await makePostRequest("users/update-password", {
                prevPass, newPass, newPass2
            }, headers);
            setLoading(false);

            if (!res.success) {
                showMessage({
                    message: res.msg,
                    duration: 2000,
                    backgroundColor: "red",
                    color: "#fff",
                })
            } else {
                showMessage({
                    message: res.msg,
                    duration: 2000,
                    backgroundColor: "green",
                    color: "#fff",
                })
            }

        } catch (err) {
            console.log(err);
            setLoading(false);
            showMessage({
                message: "Something went wrong",
                duration: 2000,
                backgroundColor: "red",
                color: "#fff",
            })
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={styles.root}>
                <Text style={styles.title}>Change Password</Text>
                <Text style={styles.text}>Your new password must be different from your previous password.</Text>
                <Separator />
                <View>
                    <Text style={styles.text}>Current Password</Text>
                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.input}
                            placeholder="******"
                            secureTextEntry={secureTextEntry}
                            onChangeText={text => setPrevPass(text)}
                            value={prevPass}
                        />
                        <Pressable
                            onPress={() => setSecureTextEntry(!secureTextEntry)}
                        >
                            <Icon name="eye" type="Ionicons" size={25} color="#353434" />
                        </Pressable>
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>New Password</Text>
                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.input}
                            placeholder="******"
                            secureTextEntry={secureTextEntry}
                            onChangeText={text => setNewPass(text)}
                            value={newPass}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>Retype Password</Text>
                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.input}
                            placeholder="******"
                            secureTextEntry={secureTextEntry}
                            onChangeText={text => setNewPass2(text)}
                            value={newPass2}
                        />
                    </View>
                </View>
                <Pressable
                    onPress={() => loading ? false : handleSubmit()}
                    style={styles.button}>
                    {
                        loading
                            ? <ActivityIndicator size={20} color="#fff" />
                            : <Text style={[styles.text, { color: "#fff", textAlign: "center" }]}>Update Password</Text>
                    }
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        marginHorizontal: 20
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
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        marginVertical: 20,
        borderRadius: 10,
    }
})