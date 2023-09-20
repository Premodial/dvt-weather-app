import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from 'expo-router';
import { logIn } from '../../services/firebase/auth/loginIn';
import {useUserStore} from '../../store/userStore';
import {setUserData} from '../../services/storage/storage'; 
import { user_auth_state, screens } from '../../constants';
import { logErrorToServer } from '../../services/logger/errorReportingApi';

const ERROR_MESSAGES = {
    REQUIRED_FIELDS: 'Email and password are required',
    INVALID_CREDENTIALS: 'Wrong email or password',
};

const PLACEHOLDERS = {
    EMAIL: 'Email',
    PASSWORD: 'Password',
};

const BUTTON_TEXTS = {
    LOGIN: 'Login with Email',
};


interface UserData {
    userId: string;
    email: string | null;
    isLoggedIn: boolean;
}

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUserId, setIsLoggedIn } = useUserStore();

    const handleEmailPasswordLogin = async () => {
        try {
            if (!email || !password) {
                throw new Error(ERROR_MESSAGES.REQUIRED_FIELDS);
            }
            const userCredential = await logIn(email, password);
            setUserId(userCredential.user.uid);
            const userData: UserData = {
                userId: userCredential.user.uid,
                email: userCredential.user.email || null,
                isLoggedIn: true,
            };            
            setUserData(user_auth_state, userData)
            setUserId(userData.userId);
            setIsLoggedIn(true);
            router.push(screens.WEATHER);
        } catch (err) {
            setError(ERROR_MESSAGES.INVALID_CREDENTIALS);
            logErrorToServer(err);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.main}>
                {error && <Text style={styles.errorText}>{error}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder={PLACEHOLDERS.EMAIL}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder={PLACEHOLDERS.PASSWORD}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleEmailPasswordLogin}>
                    <Text style={styles.loginButtonText}>{BUTTON_TEXTS.LOGIN}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10,
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
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        height: 50,
    },
    loginButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
        height: 50,
        justifyContent: 'center',

    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 16,
    },
});

