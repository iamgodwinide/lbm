import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../Constants/theme'
import Icon from 'react-native-dynamic-vector-icons'

const DepartmentList = ({ departments, deleteDept }) => {
    return (
        <View style={styles.pillWrap}>
            {
                typeof departments === "object" && Object.keys(departments).map((name, key) => (
                    <View style={styles.pill} key={key}>
                        <Text style={styles.pillText}>
                            {departments[name].name}
                        </Text>
                        <TouchableOpacity
                            onPress={() => deleteDept(name)}
                        >
                            <Icon name="delete" type='ionicons' size={25} style={{ marginLeft: 10 }} color="#fff" />
                        </TouchableOpacity>
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