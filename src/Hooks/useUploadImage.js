import { s3bucket } from "../Config/s3";
import { decode } from "base64-arraybuffer";
import fs from 'react-native-fs'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePic } from "../API/profile";

const useUploadImage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSucess] = useState(false);
    const { _id: userID, token } = useSelector(state => state.user.user);

    const headers = {
        "x-auth-token": token
    }

    try {
        const uploadImage = async (img) => {
            setLoading(true);
            const fileExt = img.path.split(".").reverse()[0];
            const fileName = userID + Math.random() + "." + fileExt;

            let ContentDisposition = 'inline;filename="' + fileName + '"';
            const base64 = await fs.readFile(img.path, 'base64');
            const arrayBuffer = decode(base64);

            const params = {
                Bucket: "lbmobilestorage1",
                Key: `profile_pictures/${fileName}`,
                Body: arrayBuffer,
                ContentDisposition,
                ContentType: img.mime
            };

            s3bucket.upload((params), async (err, data) => {
                if (err) {
                    setLoading(false);
                    setError("Somehting went wrong");
                    console.log(err);
                    return false;
                }

                await updateProfilePic(
                    {
                        profile_url: data.Location
                    },
                    headers,
                    dispatch
                );
                setLoading(false);
                setSucess("Photo updated");
            })
        }

        return { uploadImage, loading, error, success }
    } catch (err) {
        setLoading(false);
        setError("Something went wrong");
        console.log(err);
    }
}

export default useUploadImage;