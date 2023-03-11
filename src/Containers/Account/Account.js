import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Modal, StyleSheet, Alert, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header'
import blank from '../../Assets/Images/blank.png'
import Icon from 'react-native-dynamic-vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Separator from '../../Components/Separator'
import useUploadImage from '../../Hooks/useUploadImage'
import { showMessage } from 'react-native-flash-message'
import { Colors } from '../../Constants/theme'
// import ImagePicker from 'react-native-image-crop-picker';
import { logout } from '../../Features/User'
import { removeAll, removeAllRecent } from '../../Features/UserMessages'
import { setAppLoaded } from '../../Features/App'


const Account = () => {
  const user = useSelector(state => state.user.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
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

  const handleLogoutUser = () => {
    Alert.alert(null, "Are you sure you want to logout", [
      {
        text: "yes",
        onPress: () => {
          dispatch(logout());
          dispatch(removeAll());
          dispatch(removeAllRecent());
          dispatch(setAppLoaded(false))
        }
      },
      {
        text: "no",
        onPress: () => false
      }
    ])
  }

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
      backgroundColor: "#fff",
      flex: 1
    }}>
      {/* header start */}
      <Header title={"Account"} />
      {/* header end */}


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
            fontFamily: "NotoSans-Light",
            textAlign: "center",
          }}>{user.email}</Text>
          {/* <Text style={{
            color: "#fff",
            fontSize: 14,
            fontFamily: "NotoSans-Bold",
            textAlign: "center",
          }}>SERIAL NO:{user.serialnumber || "XXX-XXX-XXXX"}</Text> */}
        </View>
      </ImageBackground>

      {/* <View style={{
        marginTop: 30,
        marginHorizontal: 20
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Bio")}
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
          <Icon name="person-outline" type="Ionicons" size={20} color="#000" />
          <Text style={{
            fontSize: 15,
            marginLeft: 10,
            color: "#000",
            fontFamily: "NotoSans-Bold"
          }}>Membership and Bio</Text>
        </TouchableOpacity>
      </View> */}

      <Separator />

      <View style={{
        marginHorizontal: 20
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ShareToken")}
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
          <Icon name="coins" type="FontAwesome5" size={20} color="#000" />
          <Text style={{
            fontSize: 15,
            marginLeft: 10,
            color: "#000",
            fontFamily: "NotoSans-Bold"
          }}>Share Token</Text>
        </TouchableOpacity>
      </View>

      <Separator />

      <View style={{
        marginHorizontal: 20
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Feedback")}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Icon name="chatbox-outline" type="Ionicons" size={20} color="#000" />
          <Text style={{
            fontSize: 15,
            marginLeft: 5,
            color: "#000",
            fontFamily: "NotoSans-Bold"
          }}>
            Submit Feedback</Text>
        </TouchableOpacity>
      </View>

      <Separator />

      <View style={{
        marginHorizontal: 20
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Storage")}
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
          <Icon name="ios-settings-outline" type="Ionicons" size={20} color="#000" />
          <Text style={{
            fontSize: 15,
            marginLeft: 10,
            color: "#000",
            fontFamily: "NotoSans-Bold"
          }}>Storage Settings</Text>
        </TouchableOpacity>
      </View>

      <Separator />

      <View style={{
        marginHorizontal: 20
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChangePassword")}
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
          <Icon name="security" type="MaterialIcons" size={20} color="#000" />
          <Text style={{
            fontSize: 15,
            marginLeft: 10,
            color: "#000",
            fontFamily: "NotoSans-Bold"
          }}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <Separator />

      <View style={{
        marginHorizontal: 20
      }}>
        <TouchableOpacity style={{
          flexDirection: "row",
          alignItems: "center"
        }}
          onPress={handleLogoutUser}
        >
          <Icon name='logout' type='AntDesign' size={25} color="#000" />
          <Text style={{
            fontSize: 15,
            marginLeft: 10,
            color: "#000",
            fontFamily: "NotoSans-Bold"
          }}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Separator />

      <View style={{
        marginHorizontal: 20,
        marginTop: 10
      }}>
        <Text style={{
          fontSize: 13,
          color: "#000",
          fontFamily: "Roboto-Medium",
          textAlign: "center"
        }}>Version 1.0(1)</Text>
      </View>

      <View
        style={{
          marginBottom: 200
        }}
      />

    </ScrollView>
  )
}

export default Account



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