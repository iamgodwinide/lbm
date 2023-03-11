import { View, Text, ScrollView, Image, TouchableOpacity, Modal, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import Icon from 'react-native-dynamic-vector-icons'
import blank from '../../Assets/Images/blank.png'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { Colors } from '../../Constants/theme'
import DepartmentList from '../../Components/DepartmentList2'
import { useState } from 'react'
// import ImagePicker from 'react-native-image-crop-picker';
import useUploadImage from '../../Hooks/useUploadImage'
import { useEffect } from 'react'
import { showMessage } from 'react-native-flash-message'

const Bio = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const [modalVisible, setModalVisible] = useState(false);

  const { uploadImage, loading: imgLoading, success, error } = useUploadImage();

  // const handleOpenCamera = async () => {
  //   try {
  //     const img = await ImagePicker.openCamera({
  //       cropping: true,
  //       mediaType: "photo",
  //       useFrontCamera: true,
  //       freeStyleCropEnabled: true
  //     })
  //     setModalVisible(false);
  //     if (img.size > 3000000) {
  //       showMessage({
  //         message: "Image size is too large, max of 3mb filesize is allowed.",
  //         color: "#fff",
  //         backgroundColor: "red",
  //         textStyle: { textAlign: "center" }
  //       })
  //       return false;
  //     }
  //     // upload image
  //     if (img) {
  //       uploadImage(img);
  //     }
  //   } catch (err) {
  //     setModalVisible(false);
  //     console.log(err);
  //   }
  // }

  // const handleOpenGallery = async () => {
  //   try {
  //     const img = await ImagePicker.openPicker({
  //       cropping: true,
  //       freeStyleCropEnabled: true,
  //       mediaType: "photo",
  //       maxFiles: 1
  //     })
  //     setModalVisible(false);
  //     if (img) {
  //       uploadImage(img);
  //     }
  //   } catch (err) {
  //     setModalVisible(false);
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    if (error) {
      showMessage({
        message: "Something went wrong",
        backgroundColor: "red",
        duration: 2000
      })
    }
    if (success) {
      showMessage({
        message: "Photo updated",
        backgroundColor: "green",
        duration: 2000
      })
    }
  }, [success, error]);


  return (
    <ScrollView style={{
      backgroundColor: "#eee",
      flex: 1
    }}>

      {/* modal */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onDismiss={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalButton}
              // onPress={handleOpenCamera}
            >
              <View style={styles.modalIcon}>

                <Icon
                  type="FontAwesome"
                  name="camera"
                  size={20}
                  color={"#000"}
                />
              </View>
              <Text style={styles.modalButtonText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              // onPress={handleOpenGallery}
            >
              <View style={styles.modalIcon}>
                <Icon
                  type="FontAwesome"
                  name="folder-open"
                  size={20}
                  color={"#000"}
                />
              </View>
              <Text style={styles.modalButtonText}>Open Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* modal end */}

      <ImageBackground
        source={require("../../Assets/Images/dark-bg.jpg")}
        style={{
          backgroundColor: "#2B2828",
          paddingVertical: 20,
          minHeight: 250,
          overflow: "hidden",
          borderBottomRightRadius: 100
        }}
      >
        <View style={{
          height: 150,
          width: 150,
          alignSelf: "center"
        }}>
          <View style={{
            height: 150,
            width: 150,
            position: "relative"
          }}>
            <Image
              source={
                user.profile_pic
                  ? { uri: user.profile_pic }
                  : blank
              }
              style={{
                height: 150,
                width: 150,
                borderRadius: 100,
                alignSelf: "center"
              }}
            />
            {
              imgLoading
              && <ActivityIndicator size={40} color={Colors.primary} style={{
                position: "absolute",
                top: 60,
                left: 55
              }} />
            }
          </View>
          {/* <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              position: "absolute",
              bottom: 5,
              right: 5,
              backgroundColor: Colors.darkBlue,
              borderRadius: 25,
              padding: 10
            }}>
            <Icon name="camera" type="Entypo" size={20} color={"#fff"} />
          </TouchableOpacity> */}
        </View>

        <View>
          <Text style={{
            color: "#fff",
            fontSize: 18,
            fontFamily: "NotoSans-Bold",
            textAlign: "center",
            textTransform: "capitalize",
            marginTop: 20
          }}>{user.firstname} {user.lastname}</Text>
          <Text style={{
            color: "#fff",
            fontSize: 14,
            textAlign: "center",
          }}>{user.email}</Text>
          <Text style={{
            color: "#fff",
            fontSize: 14,
            fontFamily: "NotoSans-Bold",
            textAlign: "center",
          }}>SERIAL NO:{user.serialnumber || "XXX-XXX-XXXX"}</Text>
        </View>
      </ImageBackground>

      <View style={{
        padding: 20,
        marginTop: 20,
        backgroundColor: "#fff"
      }}>
        <Text style={{
          color: "#000",
          fontSize: 17,
          fontFamily: "NotoSans-Bold"
        }}>Position:</Text>
        <Text style={{
          color: "#000",
          fontSize: 15,
          fontFamily: "NotoSans-Medium"
        }}>{user.position || "Leader"}</Text>
      </View>

      <View style={{
        padding: 20,
        marginTop: 20,
        backgroundColor: "#fff"
      }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <Text style={{
            color: "#000",
            fontSize: 17,
            fontFamily: "NotoSans-Bold"
          }}>My Bio:</Text>
        </View>
        <Text style={{
          color: "#000",
          fontSize: 15,
          fontFamily: "NotoSans-Medium"
        }}>{user.bio || "I am a loveblazer."} </Text>
      </View>

      <View style={{
        padding: 20,
        marginTop: 20,
        backgroundColor: "#fff"
      }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <Text style={{
            color: "#000",
            fontSize: 17,
            fontFamily: "NotoSans-Bold"
          }}>PLH(Pastoral Love House):</Text>
        </View>
        <Text style={{
          color: "#000",
          fontSize: 15,
          fontFamily: "NotoSans-Medium"
        }}>{user.plh || "Not set"}</Text>
      </View>


      <View style={{
        padding: 20,
        marginTop: 20,
        backgroundColor: "#fff"
      }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <Text style={{
            color: "#000",
            fontSize: 17,
            fontFamily: "NotoSans-Bold"
          }}>Department(s):</Text>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "25%"
          }}>
          </View>
        </View>
        <DepartmentList departments={user.departments || {}} />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("EditBio")}
        style={{
          width: 170,
          height: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          backgroundColor: Colors.darkgrey,
          borderRadius: 10,
          marginTop: 15,
          marginBottom: 60
        }}
      >
        <Text style={{
          fontSize: 14,
          fontFamily: "NotoSans-Regular",
          color: "#fff",
          textAlign: "center"
        }}>Edit Profile {" "}</Text>
        <Icon name='edit' type={"Feather"} size={17} color={"#fff"} />
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Bio

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"

  },
  modalActions: {
    padding: 15,
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 7
  },
  modalButtonText: {
    textAlign: "center",
    color: Colors.black,
    fontSize: 16,
    fontFamily: "NotoSans-Bold",
  },
  modalButton: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  modalIcon: {
    backgroundColor: "#c4c4c4",
    padding: 10,
    borderRadius: 50,
    marginRight: 10
  }
})