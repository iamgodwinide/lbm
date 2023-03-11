import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/theme'

const DepartmentList = ({ departments }) => {
    return (
        <View style={styles.pillWrap}>
            {
                Object.keys(departments).map((name, key) => (
                    <View style={styles.pill} key={key}>
                        <Text style={styles.pillText}>
                            {departments[name].name}
                        </Text>
                    </View>
                ))
            }
        </View>
    )
}

export default DepartmentList

const styles = StyleSheet.create({
    pillWrap: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    pill: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 20,
        marginRight: 10,
        backgroundColor: Colors.primary,
        borderRadius: 10
    },
    pillText: {
        fontSize: 15,
        fontFamily: "NotoSans-Bold",
        color: "#fff"
    },
})