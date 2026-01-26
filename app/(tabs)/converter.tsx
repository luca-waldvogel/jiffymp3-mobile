import { useRouter } from 'expo-router';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Image, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

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
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const apiEndpoint = useMemo(() => {
        if (!API_BASE_URL) return null;
        return API_BASE_URL.endsWith('/') ? `${API_BASE_URL}convert` : `${API_BASE_URL}/convert`;
    }, []);

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

            setMessage(filename);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setLoading(false);
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
                            <Text style={commonStyles.buttonText}>{loading ? 'loading…' : 'Convert'}</Text>
                        </TouchableOpacity>

                        {loading && <ActivityIndicator style={commonStyles.loadingIndicator} />}
                        {message && (
                            <View style={commonStyles.successContainer}>
                                <Text style={commonStyles.successTitle}>Saved to database:</Text>
                                <Text style={commonStyles.successMessage}>{message}</Text>
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

