import { useRouter } from 'expo-router';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { signOut } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useMemo, useState } from 'react';
import { Animated, Image, Keyboard, Linking, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { auth } from '@/components/firebase-auth';
import { firebaseConfig } from '@/components/firebase-config';
import { commonStyles } from '@/styles/common';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export default function Converter() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fadeAnim] = useState(new Animated.Value(1));
    const router = useRouter();

    const apiEndpoint = useMemo(() => {
        if (!API_BASE_URL) return null;
        return API_BASE_URL.endsWith('/') ? `${API_BASE_URL}convert` : `${API_BASE_URL}/convert`;
    }, []);

    useEffect(() => {
        if (loading) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(fadeAnim, {
                        toValue: 0.3,
                        duration: 1000,
                        useNativeDriver: false,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        } else {
            fadeAnim.setValue(1);
        }
    }, [loading, fadeAnim]);

    const handleConvert = async () => {
        Keyboard.dismiss();
        setMessage(null);
        setError(null);

        if (!apiEndpoint) {
            setError('API base URL fehlt. Prüfe die .env (EXPO_PUBLIC_API_BASE_URL).');
            return;
        }

        if (!url.trim()) {
            setError('Bitte einen YouTube-Link eingeben.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url.trim() }),
            });

            if (!response.ok) {
                throw new Error(`API-Fehler: ${response.status}`);
            }

            const data = await response.json();
            const filename = data?.title as string | undefined;
            if (!filename) {
                throw new Error('Kein Dateiname vom API erhalten.');
            }

            // TODO: Replace mockBlob with actual audio data from API
            const mockBlob = new Blob([], { type: 'audio/mpeg' });

            const storageRef = ref(storage, `mp3/${filename}`);
            await uploadBytes(storageRef, mockBlob, { contentType: 'audio/mpeg' });

            const dUrl = await getDownloadURL(storageRef);
            setDownloadUrl(dUrl);
            setMessage(filename);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!downloadUrl) return;
        try {
            await Linking.openURL(downloadUrl);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Download failed');
        }
    };

    const handleLogout = async () => {
        Keyboard.dismiss();
        try {
            await signOut(auth);
            router.replace('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Logout fehlgeschlagen');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={commonStyles.container}>
                <View style={commonStyles.signInContainer}>
                    <View style={commonStyles.logoContainer}>
                        <Image
                            source={require('@/assets/images/logo.png')}
                            style={commonStyles.imageBig}
                        />
                    </View>

                    <View style={commonStyles.form}>
                        <TextInput
                            style={commonStyles.input}
                            value={url}
                            onChangeText={setUrl}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="YouTube URL"
                            placeholderTextColor="#999999"
                        />

                        {error && (
                            <Text style={commonStyles.errorText}>{error}</Text>
                        )}

                        <TouchableOpacity
                            style={commonStyles.button}
                            onPress={handleConvert}
                            disabled={loading}
                        >
                            {loading ? (
                                <Animated.Text
                                    style={[
                                        commonStyles.buttonText,
                                        {
                                            color: fadeAnim.interpolate({
                                                inputRange: [0.3, 1],
                                                outputRange: ['#007AFF', '#ffffff'],
                                            }),
                                        },
                                    ]}
                                >
                                    loading...
                                </Animated.Text>
                            ) : (
                                <Text style={commonStyles.buttonText}>Convert</Text>
                            )}
                        </TouchableOpacity>

                        {message && (
                            <View style={commonStyles.successContainer}>
                                <Text style={commonStyles.successTitle}>Saved to database:</Text>
                                <Text style={commonStyles.successMessage}>{message}</Text>
                                <TouchableOpacity
                                    style={commonStyles.buttonDownload}
                                    onPress={handleDownload}
                                >
                                    <Text style={commonStyles.buttonText}>Download MP3</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <View style={commonStyles.navigator}>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={commonStyles.navigatorText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

