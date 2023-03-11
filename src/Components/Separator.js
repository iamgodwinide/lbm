import { StyleSheet, View } from 'react-native'
import React from 'react'

const Separator = () => {
    return (
        <View
            style={styles.separator}
        />
    )
}

export default Separator

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: "#eee",
        marginHorizontal: 20,
        marginVertical: 10
    }
})