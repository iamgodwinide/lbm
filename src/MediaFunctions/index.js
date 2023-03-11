import TrackPlayer, { AppKilledPlaybackBehavior, Capability, RepeatMode } from "react-native-track-player";


export const setUpPlayer = async (track) => {
    if (track) {
        await TrackPlayer.reset();
        await TrackPlayer.add({ ...track })
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        await TrackPlayer.updateOptions({
            stopWithApp: true,
            alwaysPauseOnInterruption: true,
            appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.JumpForward,
                Capability.JumpBackward,
                Capability.SeekTo,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.JumpForward,
                Capability.JumpBackward,
                Capability.SeekTo,
            ],
            // notificationCapabilities: [
            //     Capability.Pause,
            //     Capability.Play,
            //     Capability.SeekTo,
            //     Capability.JumpForward,
            //     Capability.JumpBackward,
            // ],
            progressUpdateEventInterval: 2,
        });
    }
}