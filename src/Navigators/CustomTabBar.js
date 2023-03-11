import { Colors } from '../Constants/theme';
import React from 'react';
import { View, Pressable, Dimensions, StyleSheet, Text } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Player from '../Components/Player';
import { useSelector } from 'react-redux';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import Ripple from 'react-native-material-ripple';

const TabBar = ({ state, descriptors, navigation }) => {
    const fullmode = useSelector(state => state.player.fullmode);
    const tabHeight = useSharedValue(60);

    const rHeightStyle = useAnimatedStyle(() => {
        return {
            height: tabHeight.value,
        }
    });;

    useEffect(() => {
        if (fullmode) {
            tabHeight.value = withTiming(0, { duration: 200 });
        } else {
            tabHeight.value = 60;
        }
    }, [fullmode])

    return (
        <View style={[styles.container]}>
            <Player />
            <Animated.View style={[styles.mainContainer, rHeightStyle]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    let iconName;

                    if (route.name === 'Home') {
                        iconName = isFocused
                            ? 'ios-home'
                            : 'ios-home-outline';
                        return <View key={index} style={[styles.mainItemContainer, { borderRightWidth: label == "notes" ? 3 : 0 }]}>
                            <Ripple
                                rippleCentered={true}
                                rippleOpacity={1}
                                rippleSize={120}
                                rippleDuration={500}
                                onPress={onPress}
                                style={{ backgroundColor: isFocused ? "#030D16" : "#182028", borderRadius: 20, }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15 }}>
                                    <Ionicon name={iconName} color={isFocused ? Colors.white : Colors.grey} size={20} />
                                </View>
                            </Ripple>
                        </View>
                    }
                    else if (route.name === 'My Library') {
                        iconName = isFocused ? 'video-library' : 'video-library';
                        return <View key={index} style={[styles.mainItemContainer, { borderRightWidth: label == "notes" ? 3 : 0 }]}>
                            <Ripple
                                rippleCentered={true}
                                rippleOpacity={1}
                                rippleSize={120}
                                rippleDuration={500}
                                onPress={onPress}
                                style={{ backgroundColor: isFocused ? "#030D16" : "#182028", borderRadius: 20, }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15 }}>
                                    <MaterialIcons name={iconName} color={isFocused ? Colors.white : Colors.grey} size={32} />
                                </View>
                            </Ripple>
                        </View>
                    }

                    else if (route.name === 'Sermons') {
                        iconName = isFocused ? 'ios-cart' : 'ios-cart-outline';
                        return <View key={index} style={[styles.mainItemContainer, { borderRightWidth: label == "notes" ? 3 : 0 }]}>
                            <Ripple
                                rippleCentered={true}
                                rippleOpacity={1}
                                rippleSize={120}
                                rippleDuration={500}
                                onPress={onPress}
                                style={{ backgroundColor: isFocused ? "#030D16" : "#182028", borderRadius: 20, }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15 }}>
                                    <Ionicon name={iconName} color={isFocused ? Colors.white : Colors.grey} size={22} />
                                </View>
                            </Ripple>
                        </View>
                    }
                    else if (route.name === 'Read') {
                        iconName = isFocused ? 'open-book' : 'open-book';
                        return <View key={index} style={[styles.mainItemContainer, { borderRightWidth: label == "notes" ? 3 : 0 }]}>
                            <Ripple
                                rippleCentered={true}
                                rippleOpacity={1}
                                rippleSize={120}
                                rippleDuration={500}
                                onPress={onPress}
                                style={{ backgroundColor: isFocused ? "#030D16" : "#182028", borderRadius: 20, }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15 }}>
                                    <Entypo name={iconName} color={isFocused ? Colors.white : Colors.grey} size={22} />
                                </View>
                            </Ripple>
                        </View>
                    }
                    else if (route.name === 'Account') {
                        iconName = isFocused ? 'account' : 'account-outline';
                        return <View key={index} style={[styles.mainItemContainer, { borderRightWidth: label == "notes" ? 3 : 0 }]}>
                            <Ripple
                                rippleCentered={true}
                                rippleOpacity={1}
                                rippleSize={120}
                                rippleDuration={500}
                                onPress={onPress}
                                style={{ backgroundColor: isFocused ? "#030D16" : "#182028", borderRadius: 20, }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15 }}>
                                    <MaterialCommunityIcons name={iconName} color={isFocused ? Colors.white : Colors.grey} size={22} />
                                </View>
                            </Ripple>
                        </View>
                    }
                })}
            </Animated.View >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 2000
    },
    mainContainer: {
        flexDirection: 'row',
        width: "100%",
        backgroundColor: "#182028",
        bottom: 0,
        position: "absolute",
        height: 60
    },
    mainItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        borderColor: "#333B42"
    },
})


export default TabBar; 