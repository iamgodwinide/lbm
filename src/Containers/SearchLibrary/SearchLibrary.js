import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import LoadingLottie from '../../Components/LoadingLottie'
import { setUpPlayer } from '../../MediaFunctions'
import { updateNowPlaying } from '../../Features/Player'
import NoResult from '../../Components/NoResult'
import Separator from '../../Components/Separator'
import MessageListItem from '../../Components/MessageListItem'

const SearchLibrary = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const messages = useSelector(state => state.userMessages.messages);
    const [term, setTerm] = useState("");
    const dispatch = useDispatch();

    const handlePlay = (tracks, key) => {
        dispatch(updateNowPlaying({ currTime: 0 }));
        setUpPlayer(tracks, key);
    }

    useEffect(() => {
        setData(messages);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (term.length > 0) {
            const filtered = messages.filter(m => m.title.toLowerCase().includes(term.toLowerCase()));
            setData(filtered);
        } else {
            setData(messages);
        }
    }, [term]);

    return (
        loading
            ? <LoadingLottie />
            : <ScrollView style={{
                flex: 1,
                backgroundColor: "#eee"
            }}>
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
                                marginLeft: 10,
                                fontSize: 15,
                                fontWeight: "bold"
                            }}
                        >Search</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginHorizontal: 20
                }}>
                    {/* search input */}
                    <TextInput
                        placeholder="I'm looking for..."
                        placeholderTextColor={"grey"}
                        keyboardType="web-search"
                        keyboardAppearance='dark'
                        returnKeyType='search'
                        returnKeyLabel='search'
                        autoFocus={true}
                        value={term}
                        onChangeText={text => setTerm(text)}
                        style={{
                            fontSize: 30,
                            fontWeight: "bold",
                            marginVertical: 10
                        }}
                    />
                    {/* search input end */}
                </View>

                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "grey",
                        height: 2,
                        marginHorizontal: 10
                    }}
                />

                {
                    data.length === 0
                        ? <NoResult />
                        : <View style={styles.container}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 10
                            }}>
                                <Text style={styles.smallTitle}>Sermons</Text>
                            </View>

                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    marginTop: 20
                                }}
                            >
                                {
                                    data.map((message, key) => (
                                        <MessageListItem message={message} key={key} goBack={true} />
                                    ))
                                }
                            </ScrollView>
                        </View>
                }
            </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 20
    },
    title: {
        fontSize: 30,
        fontFamily: "Roboto-Bold",
        color: "#000"
    },
    smallTitle: {
        fontSize: 18,
        fontFamily: "Roboto-Bold",
        color: "#000"
    },
    text: {
        fontSize: 13,
        fontFamily: "Roboto-Regular",
        color: "#000",
        textTransform: 'capitalize'
    }
})

export default SearchLibrary