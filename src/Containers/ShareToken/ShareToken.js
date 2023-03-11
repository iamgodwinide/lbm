import { ActivityIndicator, BackHandler, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Colors } from '../../Constants/theme';
import Separator from '../../Components/Separator';
import Icon from 'react-native-dynamic-vector-icons';
import { showMessage } from 'react-native-flash-message';
import { makePostRequest } from '../../Config';
import { useFocusEffect } from '@react-navigation/native';

const ShareToken = ({navigation}) => {
    const user = useSelector(state => state.user.user);
    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!email || !amount) {
                showMessage({
                    message: "Enter recipient email and amount of tokens",
                    color: "#fff",
                    backgroundColor: "red",
                    duration: 3000
                });
                setLoading(false);
                return false;
            }
            const res = await makePostRequest("users/share-token", { token: amount, email }, {
                "x-auth-token": user.token
            })
            if (res?.success) {
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
            <Text style={styles.title}>Share Token</Text>
            <Separator />
            <View>
                <Text style={styles.text}>Shareable Token Balance</Text>
                <Text style={[styles.text, {
                    marginVertical: 5,
                    fontSize: 18
                }]}>
                    <Icon name='coins' type='FontAwesome5' size={20} color="#000" />
                    {" "}{user.coins}</Text>
            </View>
            <Separator />
            <View>
                <Text style={styles.text}>Number of tokens</Text>
                <View style={styles.inputWrap}>
                    <TextInput
                        style={styles.input}
                        placeholder="amount"
                        keyboardType='decimal-pad'
                        onChangeText={text => setAmount(text)}
                        value={amount}
                    />
                </View>
            </View>
            <View>
                <Text style={styles.text}>Receipient Email</Text>
                <View style={styles.inputWrap}>
                    <TextInput
                        style={styles.input}
                        placeholder="email"
                        keyboardType='email-address'
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={() => loading ? false : handleSubmit()}
                style={styles.button}>
                {
                    loading
                        ? <ActivityIndicator size={20} color="#fff" />
                        : <Text style={[styles.text, { color: "#fff", textAlign: "center" }]}>Share</Text>
                }
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ShareToken

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
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        marginVertical: 20,
        borderRadius: 10,
    }
})