import { showMessage } from 'react-native-flash-message'

export const messageAlert = (message, type) => {
    showMessage({
        message,
        duration: 2000,
        position: "top",
        hideOnPress: true,
        type,
        titleStyle: {
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 17
        }
    })

}