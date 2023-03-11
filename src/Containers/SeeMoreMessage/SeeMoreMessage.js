import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { useSelector } from 'react-redux'
import Separator from '../../Components/Separator'
import LoadingLottie from '../../Components/LoadingLottie'
import { makeGetRequest } from '../../Config'
import { showMessage } from 'react-native-flash-message'
import { Colors } from '../../Constants/theme'


const SeeMoreMessage = ({ navigation }) => {
    const user = useSelector(state => state.user.user);
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(1);


    const renderEmpty = () => (
        <View style={{
            alignItems: "center"
        }}>
            <Text style={styles.text}>No Data at the moment</Text>
        </View>
    );

    const renderFooter = () => (
        <View style={{
            alignItems: "center"
        }}>
            {
                fetching
                && <ActivityIndicator size={25} color={Colors.primary} />
            }
            {
                !nextPage
                && <Text style={[styles.text, { fontSize: 15, marginVertical: 10, textTransform: "lowercase" }]}>That's all for now.</Text>
            }
        </View>
    );


    const getByPage = async pageNum => {
        try {
            const res = await makeGetRequest(`content/messages/pagination/${pageNum}`, {
                "x-auth-token": user.token
            })
            setData([...data, ...res.messages]);
            setNextPage(res.nextPage);
            setLoading(false);
            setFetching(false);
        } catch (err) {
            showMessage({
                message: "Check your internet connection",
                color: "#fff",
                backgroundColor: "red"
            })
            setLoading(false);
            console.log(err);
        }
    }

    const getMoreData = () => {
        if (nextPage) {
            setFetching(true);
            getByPage(nextPage);
        }
    }

    useEffect(() => {
        getByPage(page);
    }, [])

    return (
        <View
            style={{
                flex: 1,
                marginHorizontal: 10,
                backgroundColor: "#fff"
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
                            fontSize: 15,
                            fontFamily: "NotoSans-Bold"
                        }}
                    >Go back</Text>
                </TouchableOpacity>

                <View style={{
                    flexDirection: "row",
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SearchSermon")}
                        style={{
                            marginHorizontal: 10,
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                        <Icon type='Feather' name='search' size={25} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{
                marginVertical: 20
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: "NotoSans-Bold",
                    color: "#000"
                }}>All Sermons</Text>
            </View>
            {
                loading
                    ? <LoadingLottie />
                    : data.length === 0
                        ? renderEmpty()
                        : <FlatList
                            contentContainerStyle={{ flexGrow: 1 }}
                            data={data}
                            keyExtractor={(item) => item._id}
                            ListFooterComponent={renderFooter}
                            ListEmptyComponent={renderEmpty}
                            onEndReachedThreshold={7}
                            onEndReached={getMoreData}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item: message }) => (
                                <View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("ViewSermon", { message })}
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}>
                                        <View style={{
                                            flexDirection: "row"
                                        }}>
                                            <Image
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 10,
                                                    marginRight: 10
                                                }}
                                                source={{ uri: message.artwork }}
                                            />
                                            <View>
                                                <Text numberOfLines={2} style={[styles.text, {
                                                    fontSize: 14,
                                                    marginBottom: 10,
                                                    fontFamily: "NotoSans-Bold",
                                                    width: 150
                                                }]}>{message.title}</Text>
                                                <Text style={[styles.text, {
                                                    fontSize: 13,
                                                }]}>{message.date}</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}>
                                            <TouchableOpacity>
                                                <Icon name='chevron-right' type='Entypo' size={25} color="#000" />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                    <Separator />
                                </View>
                            )}
                        />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 20
    },
    title: {
        fontSize: 30,
        fontFamily: "NotoSans-Bold",
        color: "#000"
    },
    smallTitle: {
        fontSize: 18,
        fontFamily: "NotoSans-Bold",
        color: "#000"
    },
    text: {
        fontSize: 13,
        color: "#000",
        textTransform: 'capitalize'
    }
})

export default SeeMoreMessage