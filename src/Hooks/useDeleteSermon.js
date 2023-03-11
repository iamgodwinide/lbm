import { setDownloadded } from "../Features/UserMessages";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";

const useDeleteSermon = () => {
    try {
        const [deleting, setDeleting] = useState(false);
        const dispatch = useDispatch();
        const downloaded = useSelector(state => state.userMessages.downloaded);


        const deleteSermon = async (message) => {
            setDeleting(true);
            const fileExists = await RNFetchBlob.fs.exists(message.url);
            if (fileExists) {
                await RNFetchBlob.fs.unlink(message.url);
                const newDownloaded = { ...downloaded };
                delete newDownloaded[message._id];
                dispatch(setDownloadded(newDownloaded));
                showMessage({
                    message: "Message removed from storage",
                    backgroundColor: "green",
                    duration: 2000
                })
            } else {
                showMessage({
                    message: "Something went wrong",
                    backgroundColor: "red",
                    duration: 2000
                })
            }
            setDeleting(false);
        }

        return {
            deleting,
            deleteSermon
        }

    } catch (err) {
        console.log(err);
    }
}

export default useDeleteSermon