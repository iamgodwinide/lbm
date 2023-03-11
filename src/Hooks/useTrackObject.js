import React, { useEffect, useState } from 'react'
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

const useTrackObject = () => {
    const [trackObject, setTrackObject] = useState({ id: 1000000000 });
    const playbackState = usePlaybackState();

    const getUpdate = async () => {
        const trackIndex = await TrackPlayer.getCurrentTrack();
        if (trackIndex) {
            const trackObj = await TrackPlayer.getTrack(trackIndex);
            if (trackObj == null) {
                await getUpdate();
            }
            else if (trackObj?._id) {
                setTrackObject(trackObj);
            } else {
                setTrackObject({ id: -1 });
            }
        } else {
            setTrackObject({ id: -1 });
        }
    }
    useEffect(() => {
        getUpdate();
    }, [playbackState]);

    return trackObject;
}

export default useTrackObject