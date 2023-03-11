import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import Icon from 'react-native-dynamic-vector-icons'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors, fonts } from '../../Constants/theme'
import { useEffect } from 'react'
import LoadingLottie from '../../Components/LoadingLottie'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import MessageListItem from '../../Components/MessageListItem'


const Playlist = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState(null);
  const messages = useSelector(state => state.userMessages.messages);
  const [playlistMessages, setPlaylistMessages] = useState([]);


  useEffect(() => {
    const { playlist } = route.params;
    setPlaylist(playlist);
    const _plMessages = messages.filter(m => m.seriesID === playlist._id);
    setPlaylistMessages(_plMessages);
    setLoading(false);
  }, []);

  if (loading) return <LoadingLottie />

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: Colors.darkBlue
    }}>

      <View style={{
        paddingVertical: 10,
        paddingHorizontal: 6,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#fff",
        shadowOpacity: 1.5,
        shadowOffset: {
          height: 1,
          width: 0
        },
        elevation: 7
      }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
          <Icon type='AntDesign' name='arrowleft' size={25} color="#fff" />
        </Pressable>
      </View>

      <View style={{
        marginHorizontal: 20,
        marginVertical: 50,
        flexDirection: "row",

      }}>
        <View
          style={{
            width: "40%"
          }}
        >
          <Image
            source={{ uri: playlist.artwork }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10
            }}
          />
        </View>
        <View style={{
          width: "60%"
        }}>
          <Text
            numberOfLines={3}
            style={{
              ...fonts.medium,
              fontWeight: "bold",
              marginBottom: 10,
              color: '#fff'
            }}>
            {playlist.title}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              ...fonts.small * .95,
              marginBottom: 10,
              color: 'lightgrey'
            }}>
            By <Text
              style={{
                fontWeight: "bold"
              }}
            >Timi Kelvin Erewejoh</Text>
          </Text>
          <Text
            numberOfLines={3}
            style={{
              ...fonts.medium * .95,
              color: '#fff'
            }}>
            Playlist ⚫ {playlistMessages.length} Message{playlistMessages.length > 1 ? "s" : ""}
          </Text>
        </View>
      </View>


      {/* messages */}
      {
        playlistMessages.map((message, key) => (
          <View key={key} style={{
            marginHorizontal: 10
          }}>
            <MessageListItem message={message} light={true} goBack={true} />
          </View>
        ))
      }

    </ScrollView>
  )
}

export default Playlist

const styles = StyleSheet.create({})