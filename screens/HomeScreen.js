import { auth } from './firebase'
import { useNavigation } from '@react-navigation/core'
import { signOut } from "firebase/auth";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, Text, Image, Button, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'tailwind-rn'
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const DUMMY_DATA = [
    {
        firstName: 'Catherine',
        lastName: 'Snow',
        job: "Full-time Tutor",
        photoURL: "https://www.nea.org/sites/default/files/legacy/2020/04/new_teacher.jpeg",
        age: 27,
        id: 123,
    },
    {
        firstName: 'B',
        lastName: 'Son',
        job: "Full-time Tutor",
        photoURL: "https://elearningindustry.com/wp-content/uploads/2019/10/professional-development-tools-for-teachers.jpg",
        age: 27,
        id: 456,
    },
    {
        firstName: 'C',
        lastName: 'Son',
        job: "Full-time Tutor",
        photoURL: "https://www.timeshighereducation.com/sites/default/files/styles/the_breaking_news_image_style/public/angry_teacher.jpg?itok=YhkRbBz7",
        age: 27,
        id: 789,
    },
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const [profiles, setProfiles] = useState([]);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.replace("Role")
            })
            .catch(error => alert(error.message))
    }

    useLayoutEffect(() => {
        const unsub = onSnapshot(doc(db, "student", auth.currentUser.uid), (snapshot) => {
            console.log(snapshot);
            if (!snapshot.exists()) {
                navigation.navigate("Modal")
            }
        });

        return unsub();
    }, []);

    const swipeLeft = (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        console.log(`You swiped PASS on ${userSwiped.fullName}`);

        setDoc(doc(db, 'student', auth.currentUser.uid, 'passes', userSwiped.id),
            userSwiped);
        setDoc(doc(db, 'tutor', userSwiped.id, 'passes', auth.currentUser.uid),
            userSwiped);
    };

    const swipeRight = async (cardIndex) => {

    };

    useEffect(() => {
        let unsub;

        const fetchCards = async () => {
            unsub = onSnapshot(collection(db, 'tutor'), (snapshot) => {
                setProfiles(
                    snapshot.docs.filter(doc => doc.id !== auth.currentUser.uid).map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );
            });
        };

        fetchCards();
        return unsub;
    }, [])

    console.log(profiles);

    return (
        <SafeAreaView>
            {/* Header */}
            <View style={tw("flex-row items-center justify-between px-5")}>
                <TouchableOpacity onPress={handleSignOut}>
                    <
                        Ionicons name='arrow-back-circle' size={30} color="#000000"
                    />
                </TouchableOpacity>
                

                <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
                    <Ionicons name='person-circle-outline' size={50} color="#000000" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                    <Ionicons name='chatbubbles' size={30} color="#000000" />
                </TouchableOpacity>

            </View>

            {/*End of Header */}

            {/* Cards */}
            <View style={tw("flex-1 -mt-1")}>
                <Swiper
                    containerStyle={{ backgroundColor: "transparent" }}
                    cards={profiles}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    verticalSwipe={false}
                    onSwipedLeft={(cardIndex) => {
                        console.log('Swipe PASS');
                        swipeLeft(cardIndex);
                    }}
                    onSwipedRight={(cardIndex) => {
                        console.log('Swipe MATCH');
                        swipeRight(cardIndex);
                    }}
                    backgroundColor={"#4FD0E9"}
                    overlayLabels={{
                        left: {
                            title: "NOPE",
                            style: {
                                label: {
                                    textAlign: "right",
                                    color: "red",
                                },
                            },
                        },
                        right: {
                            title: "MATCH",
                            style: {
                                label: {
                                    textAlign: "left",
                                    color: "green",
                                },
                            },
                        },
                    }}
                    renderCard={(card) => card ? (
                        <View key={card.id} style={tw("bg-white h-3/4 rounded-xl")}>
                            <Image
                                style={tw("absolute top-0 h-full w-full rounded-xl")}
                                source={{ uri: card.photoURL }}
                            />

                            <View style={[tw("absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl"
                            ),
                            styles.cardShadow,
                            ]}
                            >
                                <View>
                                    <Text style={tw("text-xl font-bold")}>
                                        {card.fullName}
                                    </Text>
                                    <Text>{card.type}</Text>
                                </View>
                                <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                            </View>
                        </View>
                    ) : (
                        <View
                            style={[
                                tw(
                                    "relative bg-white h-3/4 rounded-xl justify-center items-center"
                                ),
                                styles.cardShadow,
                            ]}
                        >
                            <Text style={tw("font-bold pb-5")}>No more profiles</Text>

                            <Image
                                style={tw("h-20 w-full")}
                                height={100}
                                width={100}
                                source={{ uri: "https://links.papareact.com/6gb" }}
                            />
                        </View>
                    )}
                />
            </View>

            {/* Signout */}

            
        </SafeAreaView>
    );
};

export default HomeScreen

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
});