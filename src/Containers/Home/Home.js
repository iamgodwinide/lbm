import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView
} from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
import { useSelector } from 'react-redux';
import { greeting } from '../../functions/greeting';
import Devotional from '../../Components/Devotional';
import Icon from 'react-native-dynamic-vector-icons';
import { Colors } from '../../Constants/theme';
import Separator from '../../Components/Separator';
import AnimatedLottieView from 'lottie-react-native';

const Home = ({ navigation }) => {

  const messages = useSelector(state => state.messages.messages);
  const user = useSelector(state => state.user.user);

  const greet = greeting();


  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}>
        {/* header start */}
        <Header title={"Home"} />
        {/* header end */}

        {/* greeting start */}
        <View>
          <ImageBackground
            source={greet.image}
            resizeMode="cover"
            style={{
              minHeight: 230,
            }}
          >
            <View style={{
              width: 120,
              height: 120,
              position: "absolute",
              top: -10,
              left: -10,
              zIndex: 2
            }}>
              <AnimatedLottieView
                source={greet.lottie}
                autoPlay={true}
                loop
              />
            </View>
            <View style={{
              zIndex: 1,
              paddingHorizontal: 20,
              position: "absolute",
              bottom: 20
            }}>
              <Text style={{
                color: "#fff",
                fontSize: 30,
                fontFamily: "NotoSans-Black",
                textTransform: "capitalize",
                textShadowColor: '#000',
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 10,
              }}>{greet.greet}, {user?.firstname}</Text>
              <Text style={{
                color: "#fff",
                fontSize: 15,
                marginTop: 5,
                fontFamily: "NotoSans-Black",
                textTransform: "uppercase",
                textShadowColor: '#000',
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 10
              }}>{greet.message}</Text>
            </View>

            <View style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              position: "absolute",
              height: "100%",
              width: "100%"
            }} />
          </ImageBackground>
        </View>
        {/* greeting end */}

        {/* devotional start */}
        <Devotional />
        {/* devotional end */}

        {/* messages start */}
        <View style={{
          marginHorizontal: 20,
          marginTop: 50,
          marginBottom: 20,
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <Text style={{
            color: Colors.black,
            textTransform: "uppercase",
            fontSize: 15,
            fontFamily: "NotoSans-Medium"
          }}>recent sermons</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SeeMoreMessage")}
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text style={{
              color: Colors.primary,
              textTransform: "uppercase",
              fontSize: 15,
              fontFamily: "NotoSans-Medium"
            }}>view all</Text>
            <Icon type="Ionicons" name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 110
          }}
        >
          {
            messages?.length === 0
              ? <Text style={{
                fontSize: 15,
                color: "#000",
                textAlign: "center",
                fontFamily: "NotoSans-Regular"
              }}>No Messages available</Text>
              : messages?.map((m) => (
                <View key={m._id}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ViewSermon", { message: m })}
                    style={{
                      marginHorizontal: 20,
                      flexDirection: "row"
                    }}
                  >
                    <Image
                      source={{ uri: m.artwork }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 10,
                        resizeMode: "cover"
                      }}
                    />
                    <View style={{
                      width: "60%",
                      paddingHorizontal: 10
                    }}>
                      <Text style={{
                        fontSize: 15,
                        fontFamily: "NotoSans-Medium",
                        color: "#000",
                      }}>
                        {m.title}
                      </Text>
                      <Text style={{
                        fontSize: 13,
                        fontFamily: "NotoSans-Light",
                        color: "#000",
                      }}>
                        {m.date}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Separator />
                </View>
              ))
          }
        </View>
        <View style={{
          marginBottom: 100
        }} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home