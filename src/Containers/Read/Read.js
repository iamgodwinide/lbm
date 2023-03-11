import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native'
import React from 'react'
import { messages, sliderImages } from '../../Constants';
import Header from '../../Components/Header';
// import Carousel from 'react-native-snap-carousel'
import { useSelector } from 'react-redux';
import Icon from 'react-native-dynamic-vector-icons';
import Devotional from '../../Components/Devotional';
const screenWidth = Dimensions.get("screen").width;

const renderItem = ({ item }) => {
  return (
    <View style={{
      position: "relative",
      overflow: "hidden",
      borderRadius: 10
    }}>
      <ImageBackground
        source={item}
        style={{
          height: 250
        }}
      />
    </View>
  );
}

const Read = () => {
  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: "#fff"
    }}>
      {/* header start */}
      <Header title={"Read"} />
      {/* header end */}
      {/* carousel start */}
      <View style={{
        marginVertical: 20,
      }}>
        {/* <Carousel
          data={sliderImages}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * .7}
          loop
          layout="default"
          autoplay={true}
          enableMomentum={true}
          lockScrollWhileSnapping={true}
        /> */}
      </View>
      {/* carousel end */}

      <View style={{
        marginHorizontal: 20,
        marginTop: 20,
      }}>
        <Text style={{
          color: "#000",
          textTransform: "uppercase",
          fontSize: 15,
          fontFamily: "NotoSans-Bold"
        }}>weekly devotional</Text>
      </View>

      <View style={{
        marginBottom: 150
      }}>
        <Devotional />
      </View>
    </ScrollView>
  )
}

export default Read