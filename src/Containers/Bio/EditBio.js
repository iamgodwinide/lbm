import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-dynamic-vector-icons'
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../Constants/theme'
import TitleButton from '../../Components/TitleButton'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import { updateProfile } from '../../API/profile'
import DepartmentList from '../../Components/DepartmentList'

const EditBio = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);
    const [plh, setPlh] = useState(user.plh || "");
    const [bio, setBio] = useState(user.bio);
    const [pickedDept, setPickedDept] = useState("");
    const depts = useSelector(state => state.departments.departments);
    const userDepts = useSelector(state => state.user.user.departments);
    const [newDepts, setNewDepts] = useState({ ...userDepts });
    const [loading, setLoading] = useState(false);

    const addDept = value => {
        setPickedDept(value);
        setNewDepts({
            ...newDepts,
            [value]: {
                name: value,
                userID: user.id
            }
        })
    }

    const deleteDept = value => {
        const _newDepts = { ...newDepts };
        delete _newDepts[value];
        setNewDepts(_newDepts);
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = {
                bio,
                plh,
                departments: newDepts
            }
            const res = await updateProfile(data, {
                "x-auth-token": user.token
            },
                dispatch
            )
            setLoading(false);
            if (res.success) {
                showMessage({
                    message: "Profile Updated Successfully",
                    backgroundColor: "green",
                    duration: 2000
                })
            } else {
                setLoading(false);
                showMessage({
                    message: res.msg,
                    backgroundColor: "red",
                    duration: 2000
                })
            }

        } catch (err) {
            showMessage({
                message: "Something went wrong :(",
                backgroundColor: "red",
                duration: 2000
            })
            setLoading(false);
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{
                backgroundColor: "#fff"
            }}
        >
            <View style={{
                paddingVertical: 10,
                paddingHorizontal: 6,
                flexDirection: "row",
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
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <Icon type='AntDesign' name='arrowleft' size={25} color="#000" />
                    <Text style={{
                        color: "#000",
                        fontSize: 15,
                        textAlign: "center",
                        fontFamily: "NotoSans-Bold"
                    }}>Go back</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputWrap}>
                <Text style={styles.label}>Bio</Text>
                <View>
                    <TextInput
                        style={styles.largeinput}
                        multiline={true}
                        autoCorrect
                        value={bio}
                        onChangeText={text => {
                            if (bio.length < 51) {
                                setBio(text)
                            }
                        }}
                    />
                    <Text
                        style={{
                            textAlign: "right",
                            color: '#000',
                            fontFamily: "NotoSans-Light"
                        }}
                    >{bio.length}/500</Text>
                </View>
            </View>

            <View style={styles.inputWrap}>
                <Text style={styles.label}>Pastoral Love House</Text>
                <View style={{
                    borderWidth: 2,
                    marginVertical: 5
                }}>
                    <Picker
                        selectedValue={plh}
                        onValueChange={(itemValue, itemIndex) =>
                            setPlh(itemValue)
                        }>
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Dominion" value="Dominion" />
                        <Picker.Item label="Charismatic" value="Charismatic" />
                    </Picker>
                </View>
            </View>

            <View style={styles.inputWrap}>
                <Text style={styles.label}>Departments</Text>

                <DepartmentList departments={newDepts} deleteDept={deleteDept} />

                <View style={[styles.inputWrap, { marginHorizontal: 0 }]}>
                    <View style={{
                        borderWidth: 2,
                        marginVertical: 5
                    }}>
                        <Picker
                            selectedValue={pickedDept}
                            onValueChange={addDept}
                            mode='dropdown'
                        >
                            {
                                Object.keys(depts).map((dept) => (
                                    <Picker.Item key={depts[dept].id} label={depts[dept].name} value={depts[dept].name} />
                                ))
                            }
                        </Picker>
                    </View>
                </View>
                <TitleButton
                    text={"Update"}
                    onPress={handleSubmit}
                    loading={loading}
                />
            </View>

        </ScrollView>
    )
}

export default EditBio

const styles = StyleSheet.create({
    inputWrap: {
        marginHorizontal: 10,
        marginVertical: 20
    },
    label: {
        fontSize: 20,
        fontFamily: "NotoSans-Bold",
        color: "#000"
    },
    largeinput: {
        borderWidth: 2,
        borderRadius: 5,
        marginVertical: 5,
        color: "#000",
        fontSize: 16,
        fontFamily: "NotoSans-Regular"
    },
    addWrap: {
        marginTop: 20,
    },
    addText: {
        fontSize: 15,
        fontFamily: "NotoSans-Bold",
        color: "#000"
    }
})