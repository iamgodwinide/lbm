import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, } from 'react-native'
import React from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { useNavigation } from '@react-navigation/native'
import visualizer from '../../Assets/Images/visualizer.png'
import { useSelector } from 'react-redux'
import { Colors } from '../../Constants/theme'
import Separator from '../../Components/Separator'

const PurchaseCoin = () => {
  const navigation = useNavigation()
  const user = useSelector(state => state.user.user);

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: "#fff"
    }}>
      <ImageBackground
        source={require("../../Assets/Images/dark-bg.jpg")}
        style={{
          backgroundColor: "#2B2828",
          minHeight: 300,
          overflow: "hidden"
        }}
      >
        {/* shadow start */}
        <View
          style={{
            backgroundColor: "rgba(0,0,0,.8)",
            position: "absolute",
            width: "100%",
            height: "100%"
          }}
        />
        {/* shadow end */}
        <View style={{
          paddingVertical: 10,
          paddingHorizontal: 6,
          flexDirection: "row",
          justifyContent: 'space-between',
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
            <Icon type='AntDesign' name='arrowleft' size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={{
          color: "#fff",
          fontSize: 18,
          fontFamily: "NotoSans-Bold",
          textAlign: "center"
        }}>You have <Text style={{ fontWeight: "bold" }}>{user.coins}</Text> Tokens</Text>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 30,
          marginBottom: 20
        }}>
          <Icon name="coins" type='FontAwesome5' size={60} color={Colors.white} />
          <Icon name="folder-video" type='Entypo' size={60} color={Colors.white} />
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
        }}>
          <Text style={{
            color: "#fff",
            fontSize: 18,
            fontFamily: "NotoSans-Bold",
            textAlign: "center"
          }}>1 Token</Text>
          <Icon name="equals" type="FontAwesome5" color="#fff" size={25} />
          <Text style={{
            color: "#fff",
            fontSize: 16,
            fontFamily: "NotoSans-Bold",
            textAlign: "center"
          }}>1 MESSAGE</Text>
        </View>
        <View style={{
          marginHorizontal: 20
        }}>
          <Text style={{
            color: "#fff",
            fontSize: 14,
            fontFamily: "NotoSans-Bold",
            textAlign: "center",
            marginTop: 20
          }}>Save when you buy more</Text>
        </View>
      </ImageBackground>


      {/* purchase start */}
      <View style={{
        margin: 20,
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 20
        }}>
          <View>
            <Text style={{
              fontSize: 14,
              fontFamily: "NotoSans-Bold",
              color: "#000"
            }}>1 Token</Text>
          </View>

          <View>
            <Text style={{
              fontFamily: "NotoSans-Bold",
              color: "#000"
            }}>NGN50</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("CreditCard", { price: 50, tokens: 1 })}
            style={{
              backgroundColor: "#1046D0",
              padding: 10,
              paddingHorizontal: 15,
              borderRadius: 10
            }}>
            <Text style={{
              fontFamily: "NotoSans-Bold",
              color: "#fff"
            }}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 20
        }}>
          <View>
            <Text style={{
              fontSize: 14,
              fontFamily: "NotoSans-Bold",
              color: "#000"
            }}>2 Tokens</Text>
          </View>

          <View>
            <Text style={{
              fontFamily: "NotoSans-Bold",
              color: "#000"
            }}>NGN80</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("CreditCard", { price: 80, tokens: 2 })}
            style={{
              backgroundColor: "#1046D0",
              padding: 10,
              paddingHorizontal: 15,
              borderRadius: 10
            }}>
            <Text style={{
              fontFamily: "NotoSans-Bold",
              color: "#fff",
            }}>Buy Now</Text>
          </TouchableOpacity>

        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 20
        }}>
          <View>
            <Text style={{
              fontSize: 14,
              fontFamily: "NotoSans-Bold",
              color: "#000"
            }}>5 Tokens</Text>
          </View>

          <View>
            <Text style={{
              fontFamily: "NotoSans-Bold",
              color: "#000"
            }}>NGN150</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("CreditCard", { price: 150, tokens: 5 })}
            style={{
              backgroundColor: "#1046D0",
              padding: 10,
              paddingHorizontal: 15,
              borderRadius: 10
            }}>
            <Text style={{
              fontFamily: "NotoSans-Bold",
              color: "#fff"
            }}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <Separator />
        <Text style={{
          textAlign: "center",
          color: "#000",
          fontSize: 14,
          marginTop: 30,
          fontWeight: "500"
        }}>All prices are stated in Naira</Text>
      </View>
      {/* purchase end */}

    </ScrollView>
  )
}

export default PurchaseCoin