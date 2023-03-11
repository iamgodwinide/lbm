import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-dynamic-vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../Constants/theme'


const SearchSermon = () => {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState("");
    const keywords = [
        "salvation",
        "grace",
        "love",
        "healing",
        "vision",
        "faith",
        "hope",
        "alter"
    ];
    const years = [
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022
    ];

    const handleSearhByText = () => {
        navigation.navigate("SearchSermonResult", { keyword: null, year: null, searchTerm: searchTerm.toLowerCase() });
    }

    const handleSearchByYear = (year) => {
        navigation.navigate("SearchSermonResult", { keyword: null, year, searchTerm: null });
    }

    const handleSearchByTag = (keyword) => {
        navigation.navigate("SearchSermonResult", { keyword, year: null, searchTerm });
    }


    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: "#eee"
        }}>
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
                    <Icon type='AntDesign' name='arrowleft' size={25} color="#000" />
                    <Text
                        style={{
                            color: "#000",
                            marginLeft: 10,
                            fontSize: 15,
                            fontFamily: "NotoSans-Bold"
                        }}
                    >Search</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                marginHorizontal: 20
            }}>
                {/* search input */}
                <TextInput
                    placeholder="I'm looking for..."
                    placeholderTextColor={"grey"}
                    keyboardType="web-search"
                    keyboardAppearance='dark'
                    returnKeyType='search'
                    returnKeyLabel='search'
                    autoFocus={true}
                    onChangeText={text => setSearchTerm(text)}
                    onSubmitText={handleSearhByText}
                    onSubmitEditing={handleSearhByText}
                    style={{
                        fontSize: 30,
                        fontFamily: "NotoSans-Bold",
                        marginVertical: 30
                    }}
                />
                {/* search input end */}
                <Text style={{
                    fontSize: 15,
                    color: "#000",
                    fontFamily: "NotoSans-Bold",
                    marginVertical: 20,
                    textTransform: "uppercase"
                }}>Or Select a keyword</Text>
            </View>

            <View style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginHorizontal: 20
            }}>
                {
                    keywords.map((keyword, key) => (
                        <TouchableOpacity
                            onPress={() => handleSearchByTag(keyword)}
                            key={key}
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderColor: Colors.primary,
                                borderWidth: 1,
                                marginRight: 5,
                                marginVertical: 10,
                                borderRadius: 5
                            }}>
                            <Text style={{
                                textTransform: "uppercase",
                                color: Colors.primary,
                                fontSize: 16,
                                fontFamily: "NotoSans-Regular"
                            }}>{keyword}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            <View style={{
                marginHorizontal: 20
            }}>
                <Text style={{
                    fontSize: 15,
                    color: "#000",
                    fontFamily: "NotoSans-Bold",
                    marginVertical: 20,
                    textTransform: "uppercase"
                }}>Or Browse by year</Text>
            </View>

            <View style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginHorizontal: 20
            }}>
                {
                    years.map((years, key) => (
                        <TouchableOpacity
                            onPress={() => handleSearchByYear(years)}
                            key={key}
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderColor: Colors.primary,
                                borderWidth: 1,
                                marginRight: 5,
                                marginVertical: 10,
                                borderRadius: 5
                            }}>
                            <Text style={{
                                textTransform: "uppercase",
                                color: Colors.primary,
                                fontSize: 16,
                                fontFamily: "NotoSans-Regular"
                            }}>{years}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </ScrollView>
    )
}

export default SearchSermon