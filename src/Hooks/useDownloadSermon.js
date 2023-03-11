import { PermissionsAndroid } from "react-native";
import { useState } from "react";
import RNFetchBlob from "rn-fetch-blob";
import { useDispatch } from "react-redux";
import { addDownload } from "../Features/UserMessages";
import { showMessage } from "react-native-flash-message";
import RNFS from 'react-native-fs';


const useDownloadSermon = () => {
    try {
        const dispatch = useDispatch()
        const [loading, setLoading] = useState(false);
        const [downloaded, setDownloaded] = useState(false);
        const [progress, setProgress] = useState(0);
        const [error, setError] = useState("");

        // check for permissions
        const permissions = [
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ]

        const startDownload = async (message) => {
            try {
                const appPath = RNFS.DocumentDirectoryPath;
                const directory = appPath + "/.backup/.files";
                const fileName = message.url.split("/").reverse()[0];
                const path = directory + `/${message._id}${fileName}`;



                const task = RNFetchBlob.config({
                    timeout: 10000,
                    path,
                    indicator: false,
                    fileCache: false
                })
                    .fetch("GET", message.url)
                    .progress((received, total) => {
                        setProgress((received / total) * 100);
                    })
                    .then(res => {
                        if (res.respInfo.status == 200) {
                            dispatch(addDownload({
                                ...message,
                                url: `file://${path}`
                            }));
                            setDownloaded(true);
                            setLoading(false);
                        } else {
                            setLoading(false);
                            setDownloaded(false);
                            setProgress(0);
                            showMessage({
                                message: "Something went wrong",
                                backgroundColor: "red",
                                duration: 2000
                            })
                        }
                    }).finally(() => {
                        setLoading(false);
                        setDownloaded(false);
                        setProgress(0);
                    })

            } catch (err) {
                setLoading(false);
                setDownloaded(false);
                setProgress(0);
                console.log(err);
                showMessage({
                    message: "Something went wrong",
                    backgroundColor: "red",
                    duration: 2000
                })
            }
        }



        const download = async (message) => {
            try {
                setLoading(true);
                const grantedWrite = await PermissionsAndroid.check(permissions[0]);
                const grantedRead = await PermissionsAndroid.check(permissions[1]);

                const appPath = await RNFetchBlob.android.getSDCardApplicationDir()
                const directory = appPath + "/.backup/.files";

                if (grantedRead && grantedWrite) {
                    RNFetchBlob.fs.exists(directory)
                        .then(value => {
                            if (!value) {
                                RNFetchBlob.fs.mkdir(directory)
                                    .then(value => {
                                        if (value) {
                                            startDownload(message);
                                        } else {
                                            showMessage({
                                                message: "Message downloaded",
                                                backgroundColor: "green",
                                                duration: 2000
                                            })
                                            setDownloaded(false);
                                            setLoading(false);
                                            setProgress(0);
                                        }
                                    })
                                    .catch(err => {
                                        setLoading(false);
                                        console.log(err);
                                        showMessage({
                                            message: "Something went wrong",
                                            backgroundColor: "red",
                                            duration: 2000
                                        })
                                    })
                            } else {
                                startDownload(message);
                            }
                        })
                        .catch(err => {
                            setLoading(false);
                            console.log(err);
                            showMessage({
                                message: "Something went wrong",
                                backgroundColor: "red",
                                duration: 2000
                            })
                        });
                } else {
                    PermissionsAndroid.requestMultiple(permissions);
                    setLoading(false);
                }

            } catch (err) {
                setLoading(false);
                console.log(err);
                showMessage({
                    message: "Something went wrong",
                    backgroundColor: "red",
                    duration: 2000
                })
            }
        }

        return {
            loading,
            download,
            downloaded,
            progress,
            error
        }

    } catch (err) {
        console.log(err);
    }
}

export default useDownloadSermon