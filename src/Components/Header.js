import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../Constants/theme'
import { useSelector } from 'react-redux'


const Header = ({ title, nobalance }) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user)

  return (
    <View style={{
      paddingVertical: 10,
      paddingHorizontal: 6,
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOpacity: 1.5,
      shadowOffset: {
        height: 1,
        width: 0
      },
      elevation: 7
    }}>
      <TouchableOpacity
        onPress={navigation.openDrawer}
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}>
        <Icon type='Ionicons' name='menu' size={35} color="#000" />
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontFamily: "NotoSans-Bold"
          }}
        >{title}</Text>
      </TouchableOpacity>

      {
        (nobalance === false || typeof nobalance === 'undefined')
        && <TouchableOpacity
          onPress={() => navigation.navigate("PurchaseCoin")}
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: Colors.darkBlue,
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 10
          }}>
          <Icon type='FontAwesome5' name='coins' size={30} color="#fff" style={{
            marginRight: 7
          }} />
          <Text style={{
            fontSize: 16,
            fontFamily: "NotoSans-Bold",
            color: "#fff"
          }}>{user.coins}</Text>
          <Icon type='Feather' name='plus' size={20} color="#fff" style={{
            marginHorizontal: 2
          }} />
        </TouchableOpacity>
      }
    </View>
  )
}

export default Header