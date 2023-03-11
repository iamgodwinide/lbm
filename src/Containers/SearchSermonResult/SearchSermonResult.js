import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import Icon from 'react-native-dynamic-vector-icons'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../Constants/theme'
import Separator from '../../Components/Separator'
import { useSelector } from 'react-redux'
import LoadingLottie from '../../Components/LoadingLottie'
import NoResult from '../../Components/NoResult'
import { messageAlert } from '../../functions/message'
import { makeGetRequest } from '../../Config'

const SearchSermonResult = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user.user);
    const [result, setResult] = useState([]);


    const searchMessage = async (keyword, year, searchTerm) => {
        try {
            const res = await makeGetRequest(`content/messages/search?keyword=${keyword}&year=${year}&searchTerm=${searchTerm}`,
                {
                    'x-auth-token': user.token
                }
            );
            if (res?.success) {
                setResult(res.messages);
                setLoading(false);
            } else {
                messageAlert(res.msg, "danger")
                setLoading(false);
            }
        } catch (err) {
            messageAlert("Network error", "warning");
            setLoading(false);

        }
    }

    useEffect(() => {
        const { keyword, year, searchTerm } = route.params;
        searchMessage(keyword, year, searchTerm);
    }, [])

    return (
        <ScrollView>
            <View style={{
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
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <Icon type='AntDesign' name='arrowleft' size={25} color="#000" />
                    <Text
                        style={{
                            color: "#000",
                            fontSize: 16,
                            fontWeight: "bold"
                        }}
                    >{" "}Back</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>
                Search Results {result.length > 0 && result.length}
            </Text>
            <Separator />
            {loading
                ? <LoadingLottie />
                : result.length === 0
                    ? <NoResult />
                    : <View>
                        {
                            result.map((message, key) => (
                                <>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("ViewSermon", { message })}
                                        key={key}
                                        style={{
                                            flexDirection: "row",
                                            marginHorizontal: 10
                                        }}>
                                        <Image
                                            style={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: 10
                                            }}
                                            source={{ uri: message.artwork }}
                                        />
                                        <View style={{
                                            marginLeft: 10
                                        }}>
                                            <Text numberOfLines={2} style={[styles.text, {
                                                fontSize: 14,
                                                marginBottom: 10,
                                                fontWeight: "bold",
                                                width: 150
                                            }]}>{message.title}</Text>
                                            <Text style={[styles.text, {
                                                fontSize: 13,
                                            }]}>{[message.date]}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <Separator />
                                </>
                            ))
                        }
                    </View>
            }
        </ScrollView>)
}

export default SearchSermonResult

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontFamily: "Roboto-Bold",
        color: Colors.black,
        marginHorizontal: 10,
        marginVertical: 10
    },
    text: {
        color: "#000",
        fontFamily: "Roboto-Regular"
    }
})