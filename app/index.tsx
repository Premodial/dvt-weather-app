import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import {retrieveUserData} from './services/storage/storage';
import { user_auth_state, screens } from './constants';
import {useUserStore} from './store/userStore';
import {logErrorToServer} from './services/logger/errorReportingApi'
export default function Index() {
    const {setUserId, setIsLoggedIn} = useUserStore();
    const router = useRouter();

    useEffect(() => {
      const checkIfUserIsLoggedIn = async () => {
            try {
                const userData = await retrieveUserData(user_auth_state);
                
                if (userData && userData.isLoggedIn) {
                    setUserId(userData.userId);
                    setIsLoggedIn(true);
                    router.push(screens.WEATHER);
                }
            } catch (error) {
                logErrorToServer(error);
            }
        };

        checkIfUserIsLoggedIn();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.skipButtonContainer}>
                    <TouchableOpacity style={styles.skipButton}  onPress={() => router.push(screens.WEATHER)}>
                        <Text style={styles.skipButtonText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.main}>
                <Text style={styles.title}>Weather App</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.continueWithGoogleButton} onPress={() => router.push(screens.LOGIN)}>
                    <Text style={styles.continueWithGoogleButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 24,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 16,
    },
    skipButtonContainer: {
        marginRight: 5,
    },
    skipButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 20,
        width: 65,
        alignItems: 'center',
    },
    skipButtonText: {
        color: 'white',
        fontSize: 16,
    },
    main: {
        flex: 8,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 960,
        marginHorizontal: "auto",
    },
    title: {
        fontSize: 64,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#333',
    },
    goToAboutButton: {
        marginTop: 20,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 8,
    },
    goToAboutButtonText: {
        color: 'white',
        fontSize: 16,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 16,
    },
    continueWithGoogleButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 8,
        height: 50,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueWithGoogleButtonText: {
        color:  'white',
        fontSize: 16,
        fontWeight: "bold",

    },
});
