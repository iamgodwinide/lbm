import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { Colors } from '../../Constants/theme'
import Separator from '../../Components/Separator'
import apostle from '../../Assets/Images/apostle5.jpg';
import ogo from '../../Assets/Images/ogo.jpg';
import victor from '../../Assets/Images/victor.jpg';
import joseph from '../../Assets/Images/joseph.jpg';
import temi from '../../Assets/Images/temi.jpg';
import felix from '../../Assets/Images/felix.jpg';
import freeman from '../../Assets/Images/freeman.png';
import queen from '../../Assets/Images/queen.jpg';
import prayer from '../../Assets/Images/prayer.jpg';
import jegede from '../../Assets/Images/jegede.jpg';
import godwin from '../../Assets/Images/godwin.png';
import team from '../../Assets/Images/team.jpeg';

const screenWidth = Dimensions.get("window").width;

const Frame = ({ source, name, role }) => {
    return (
        <View style={styles.frame}>
            <Image
                source={source}
                style={styles.image}
            />
            <Text style={styles.nameText}>{name}</Text>
            {
                role
                &&
                <Text style={styles.titleText}>{role}</Text>

            }
        </View>
    )
}

const About = () => {
    return (
        <ScrollView style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: Colors.white
        }}>
            <Header nobalance={true} />
            <Text style={styles.bigTitle}>About Us</Text>
            <Text style={styles.title}>Hi, We're the BLMI Media Team</Text>
            <Separator />
            <Text style={styles.text}>
                The media knight is a ministry under BLMi. We ensure that the gospel of christ reaches the world so that God's purpose on earth can be fulfilled.
            </Text>
            <Text style={styles.title}>What Drives Us?</Text>
            <Separator />
            <Text style={styles.text}>
                God's purpose is that all men should be save. So what drives the media knight is SOULS. Through our content men will be reconciled back to God and strengthen their relationship with God.
            </Text>
            <Text style={styles.title}>
                Meet our Team
            </Text>

            <View style={styles.bigFrame}>
                <Image
                    source={apostle}
                    style={styles.bigImage}
                />
                <Text style={styles.nameText}>Apostle Womotimi Kelvin Erewejoh</Text>
                <Text style={styles.titleText}>President, General Overseer.</Text>
            </View>

            <View style={styles.stwrap}>
                <View style={styles.line} />
                <Text style={[styles.text, { marginHorizontal: 5 }]}>Executives</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.frameWrap}>
                <Frame source={ogo} name="Senior Pastor Ogo" />
                <Frame source={victor} name="Pastor Victor" />
                <Frame source={joseph} name="Pastor Joseph" />
                <Frame source={temi} name="Victor Temitope" role="HOD, Media Department." />
            </View>

            <View style={styles.stwrap}>
                <View style={styles.line} />
                <Text style={[styles.text, { marginHorizontal: 5 }]}>Members</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.frameWrap}>
                <Frame source={felix} name="Meheux Tuoyo Felix" role="Chief Graphic Designer" />
                <Frame source={freeman} name="Freeman" role="Video Editor/Motion Graphics Designer" />
                <Frame source={queen} name="Kwaghve Queen Awashima" role="Social media manager" />
                <Frame source={jegede} name="Emmanuel Aidokhai Jegede" role="Content Creator" />
                <Frame source={prayer} name="Prayer Tukorogha Tamaralakemefa" role="Cinematographer" />
                <Frame source={godwin} name="Godwin Idemudia" role="Software Engineer" />
            </View>

        </ScrollView>
    )
}

export default About

const styles = StyleSheet.create({
    bigTitle: {
        fontSize: 25,
        fontFamily: "NotoSans-Black",
        color: Colors.primary,
        textAlign: "center",
    },
    title: {
        fontSize: 20,
        fontFamily: "NotoSans-Black",
        color: Colors.black,
        textAlign: "center",
        marginTop: 40
    },
    stwrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 20
    },
    line: {
        height: 1,
        flex: 1,
        backgroundColor: Colors.grey
    },
    text: {
        fontSize: 15,
        fontFamily: "NotoSans-Light",
        color: Colors.grey,
        textAlign: "center"
    },
    nameText: {
        color: Colors.black,
        fontFamily: "NotoSans-Bold"
    },
    titleText: {
        color: Colors.grey,
        fontFamily: "Roboto-Light"
    },
    bigFrame: {
        width: 300,
        alignSelf: "center"
    },
    bigImage: {
        height: 370,
        aspectRatio: 1,
        alignSelf: "center",
        resizeMode: "contain",
        marginVertical: 10
    },
    frameWrap: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    frame: {
        width: screenWidth / 2.3,
        marginBottom: 20,
        alignItems: "center"
    },
    image: {
        height: screenWidth / 2.3,
        aspectRatio: 1,
        borderRadius: 30
    },
    teamImage: {
        height: 120,
        width: "100%",
        marginVertical: 10
    }
})