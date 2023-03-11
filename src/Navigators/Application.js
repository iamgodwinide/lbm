import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '../Hooks'
import { navigationRef } from './utils'
import ViewSermon from '../Containers/ViewSermon/ViewSermon'
import ReadDevotional from '../Containers/ReadDevotional/ReadDevotional'
import SeeMoreMessage from '../Containers/SeeMoreMessage/SeeMoreMessage'
import SearchSermon from '../Containers/SearchSermon/SearchSermon'
import PurchaseCoin from '../Containers/PurchaseCoin/PurchaseCoin'
import Bio from '../Containers/Bio/Bio'
import SearchLibrary from '../Containers/SearchLibrary/SearchLibrary'
import Playlist from '../Containers/Playlist/Playlist'
import DrawerNavigation from './Drawer'
import ViewSeries from '../Containers/ViewSeries/ViewSeries'
import TabNavigation from './Tab'
import SearchSermonResult from '../Containers/SearchSermonResult/SearchSermonResult'
import Starter from '../Containers/Starter/Starter'
import Signup from '../Containers/Signup/Signup'
import Signin from '../Containers/SignIn/Signin'
import { useSelector } from 'react-redux'
import SplashScreen from '../Components/SplashScreen'
import EditBio from '../Containers/Bio/EditBio'
import SeeMoreSeries from '../Containers/SeeMoreSeries/SeeMoreSeries'
import CreditCard from '../Components/CreditCardNew'
import ChangePassword from '../Containers/ChangePassword/ChangePassword'
import ShareToken from '../Containers/ShareToken/ShareToken'
import Storage from '../Containers/Storage'
import Feedback from '../Containers/FeedBack'
import ForgotPassword from '../Containers/ForgotPassword'

const Stack = createStackNavigator()

const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()

  const isLoggedIn = useSelector(state => state.user.user.token);
  const loaded = useSelector(state => state.app.loaded);


  return (
    <SafeAreaView style={[Layout.fill]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={'light-content'} backgroundColor={"#182028"} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {
            isLoggedIn === null
              ? (
                <>
                  <Stack.Screen
                    name='Starter'
                    component={Starter}
                  />
                  <Stack.Screen
                    name='Signup'
                    component={Signup}
                  />
                  <Stack.Screen
                    name='Signin'
                    component={Signin}
                  />
                  <Stack.Screen
                    name='ForgotPassword'
                    component={ForgotPassword}
                  />
                </>
              )
              : (
                <>
                  {
                    !loaded
                    && <Stack.Screen
                      name='SplashScreen'
                      component={SplashScreen}
                    />
                  }
                  <Stack.Screen
                    name="Drawer"
                    component={DrawerNavigation}
                  />
                  <Stack.Screen
                    name="ViewSermon"
                    component={ViewSermon}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="ViewSeries"
                    component={ViewSeries}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="ReadDevotional"
                    component={ReadDevotional}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="SeeMoreSeries"
                    component={SeeMoreSeries}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="SeeMoreMessage"
                    component={SeeMoreMessage}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="SearchSermon"
                    component={SearchSermon}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="SearchSermonResult"
                    component={SearchSermonResult}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="SearchLibrary"
                    component={SearchLibrary}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="PurchaseCoin"
                    component={PurchaseCoin}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="Bio"
                    component={Bio}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="ShareToken"
                    component={ShareToken}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="EditBio"
                    component={EditBio}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="Storage"
                    component={Storage}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="Feedback"
                    component={Feedback}
                    options={{
                      animationEnabled: true,
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="CreditCard"
                    component={CreditCard}
                    options={{
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="Playlist"
                    component={Playlist}
                    options={{
                      presentation: "modal"
                    }}
                  />
                  <Stack.Screen
                    name="Tabs"
                    component={TabNavigation}
                    options={{
                      presentation: "modal"
                    }}
                  />
                </>
              )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
