import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from './Tab';
import { Colors } from '../Constants/theme';
import About from '../Containers/About/About';
import { useEffect } from 'react';
import { fetchAll } from '../API/fetchAll';
import { useDispatch, useSelector } from 'react-redux';
import CustomDrawer from './CustomDrawer';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    // make API call on intervals
    const makeAPICalls = () => {
        try {
            if (user !== undefined) {
                fetchAll(0, user, dispatch);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        makeAPICalls();
    }, [])

    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            initialRouteName="App"
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: "#182028",
                drawerActiveTintColor: Colors.white,
                drawerInactiveTintColor: Colors.black,
                drawerLabelStyle: {
                    fontFamily: "NotoSans-Bold",
                    fontSize: 17
                },
                drawerType: "slide"
            }}>
            <Drawer.Screen name="App" options={{ drawerLabel: "Home" }} component={TabNavigation} />
            <Drawer.Screen name="About" options={{ drawerLabel: "About Us" }} component={About} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation