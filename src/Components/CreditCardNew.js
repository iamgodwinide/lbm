import { View, Text, ScrollView, Pressable, ActivityIndicator, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { CreditCardInput } from "react-native-credit-card-input";
import { useDispatch, useSelector } from 'react-redux';
import { buyToken } from '../API/profile';
import reactNativePaystack from 'react-native-paystack';
import { showMessage } from 'react-native-flash-message';
 

const CreditCardNew = ({route}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(0);
  const [price, setPrice] = useState(0);
  const [data, setData] = useState({valid:false});
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  
  const headers = {
    "x-auth-token": user.token
}

const handleBuyToken = async () => {
    const res = await buyToken(
        { userID: user._id, token },
        headers,
        dispatch
    );
    if (res.success) {
        showMessage({
            message: "Transaction successful",
            backgroundColor: "green",
            color: "#fff",
            duration: 3000
        });
        navigation.goBack()
    } else {
        setLoading(false);
        showMessage({
            message: "Something went wrong",
            backgroundColor: "red",
            color: "#fff",
            duration: 3000
        });
    }
}

const chargeCard = (data) => {
    if (loading) return false;
    setLoading(true);

    const {
        number,
        expiry,
        cvc,
    } = data;

    reactNativePaystack.chargeCard({
        cardNumber: number,
        expiryMonth: expiry.slice(0, 2),
        expiryYear: expiry.slice(3),
        cvc,
        email: user.email,
        amountInKobo: price * 100
    })
        .then(() => {
            handleBuyToken();
        })
        .catch(error => {
            setLoading(false);
            showMessage({
                message: error.message,
                backgroundColor: "yellow",
                color: "#000",
                duration: 2000
            });
        })

    }

    const onSubmit = () => {
        setLoading(true);
        chargeCard(data.values);
    }


    useEffect(() => {
        const { price, tokens } = route.params;
        setPrice(price);
        setToken(tokens);
    }, [route?.params])

    // prevent going back when loading
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (loading) {
                    return true;
                } else {
                    return false;
                }
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [loading])
    );


  return (
    <ScrollView style={{
        flex: 1,
        backgroundColor: "#fff"
    }}>
        <Pressable 
        onPress={()=> navigation.goBack() }
        style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
        }}>
            <Icon name="chevron-back" type="Ionicons" size={30} color="#000"/>
            <Text style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: "NotoSans-Bold",
                color: "#000",
            }}>Back</Text>
        </Pressable>

        <View style={{
            marginTop: 40,
            marginHorizontal: 20
        }}>
            <Text style={{
                fontSize: 18,
                fontFamily: "NotoSans-Bold",
                color: "#000"
            }}>Amount: <Text style={{
                fontFamily: "NotoSans-Regular"
            }}>
                N{price}
                </Text>
            </Text>
            <Text style={{
                fontSize: 18,
                fontFamily: "NotoSans-Bold",
                color: "#000",
                marginBottom: 50,
                paddingBottom: 10
            }}>Number Of Tokens:
             <Text style={{
                fontFamily: "NotoSans-Regular",
                marginLeft: 10
            }}>
                {token}
                </Text> 
            </Text>
            <CreditCardInput onChange={ data => setData(data)} />
            {
                data.valid
                &&
                (
                loading
                ?<Pressable style={{
                    backgroundColor: "#6c25fa",
                    padding: 10,
                    width: "100%",
                    borderRadius: 10,
                    alignSelf: "center",
                    marginTop: 20
                }}>
                    <ActivityIndicator size={25} color="#fff" />
                </Pressable>
                :<Pressable 
                onPress={onSubmit}
                style={{
                    backgroundColor: "#6c25fa",
                    padding: 10,
                    width: "100%",
                    borderRadius: 10,
                    alignSelf: "center",
                    marginTop: 20
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 18,
                        color: '#fff',
                        fontFamily: "NotoSans-Bold"
                    }}>Pay Now</Text>
                </Pressable>
                )
            }
        </View>

    </ScrollView>
  )
}

export default CreditCardNew