import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-dynamic-vector-icons';
import Separator from '../../Components/Separator';
import { useState } from 'react';
import { useEffect } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import { useDispatch } from 'react-redux';
import { removeAllDownloaded } from '../../Features/UserMessages';

const Storage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [size, setSize] = useState(0);
    const [loading, setLoading] = useState(true);
    const [removing, setRemoving] = useState(false);


    const getSize = async () => {
        try {
            setLoading(true);
            const appPath = RNFS.DocumentDirectoryPath;
            const path = appPath + "/.backup/.files";
            const exists = await RNFetchBlob.fs.exists(path);
            if (exists) {
                const files = await RNFS.readDir(path);
                const size = files.reduce((prev, curr) => {
                    return prev + curr.size;
                }, 0);
                const size_in_gb = size / 1000000000;
                setSize(size_in_gb.toFixed(2));
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const removeAll = async () => {
        try {
            setRemoving(true);
            const appPath = RNFS.DocumentDirectoryPath;
            const path = appPath + "/.backup/.files";
            const exists = await RNFetchBlob.fs.exists(path);
            if (exists) {
                await RNFS.unlink(path);
                dispatch(removeAllDownloaded());
                getSize();
                setSize(0);
            }
            setRemoving(false);
        } catch (err) {
            console.log(err);
            setRemoving(false);
        }
    }

    const handleRemoveAll = () => {
        Alert.alert(null, "Are you sure?", [
            {
                text: "yes",
                onPress: removeAll
            },
            {
                text: "no"
            }
        ])
    }

    useEffect(() => {
        getSize();
    }, [])

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
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

            <View style={{ marginHorizontal: 20, marginVertical: 30 }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: "NotoSans-Black",
                    color: "#000"
                }}>Downloads & Storage</Text>
                <Separator />
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={styles.text}>Audio Sermons</Text>
                    <Text style={styles.text}>
                        {
                            loading
                                ? <Text style={{
                                    color: "#000"
                                }}>calculating...</Text>
                                : size + "GB"
                        }
                    </Text>
                </View>
                <Separator />
                <TouchableOpacity
                    onPress={handleRemoveAll}
                    style={{
                        padding: 10,
                        backgroundColor: "red",
                        borderRadius: 10
                    }}>
                    {
                        removing
                            ? <ActivityIndicator size={20} color='#fff' />
                            : <Text style={[styles.text, { textAlign: "center", color: "#fff" }]}>Remove All</Text>
                    }
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Storage

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        color: "#000",
        fontFamily: "NotoSans-Medium"
    }
})