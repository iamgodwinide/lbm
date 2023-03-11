import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Containers/Home/Home'
import Icon from 'react-native-dynamic-vector-icons'
import Sermons from '../Containers/Sermons/Sermons'
import Read from '../Containers/Read/Read'
import Account from '../Containers/Account/Account'
import Library from '../Containers/Library/Library'
import TabBar from './CustomTabBar'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home-outline';
            return <Icon type='Ionicons' name={iconName} size={size} color={color} />;
          } else if (route.name === 'My Library') {
            iconName = focused ? 'video-library' : 'video-library';
            return <Icon type='MaterialIcons' name={iconName} size={size} color={color} />;
          } else if (route.name === 'Sermons') {
            iconName = focused ? 'ios-cart' : 'ios-cart';
            return <Icon type='Ionicons' name={iconName} size={size} color={color} />;
          } else if (route.name === 'Read') {
            iconName = focused ? 'open-book' : 'open-book';
            return <Icon type='Entypo' name={iconName} size={size} color={color} />;
          }
          else if (route.name === 'Account') {
            iconName = focused ? 'account-outline' : 'account-outline';
            return <Icon type='MaterialCommunityIcons' name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#1046D0',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontFamily: "NotoSans-Bold"
        }
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Sermons" component={Sermons} />
      <Tab.Screen name="My Library" component={Library} />
      <Tab.Screen name="Read" component={Read} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}

export default TabNavigation
