import { Link } from 'expo-router';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Image, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { firebaseConfig } from '@/components/firebase-config';
import { commonStyles } from '@/styles/common';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

function parseFilename(contentDisposition: string | null): string | null {
    if (!contentDisposition) return null;
    const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
    if (!match) return null;
    return match[1].replace(/['"]/g, '');
}

export default function Converter() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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

            // Handle title-only JSON responses gracefully
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                const title = data?.title || 'Unbekannter Titel';
                setMessage(`${title}`);
                return;
            }

            // Fallback: Blob upload when API returns file
            const blob = await response.blob();
            if (!blob || blob.size === 0) {
                throw new Error('Leere Antwort erhalten.');
            }

            const filenameFromHeader = parseFilename(response.headers.get('content-disposition'));
            const safeName = filenameFromHeader || `converted-${Date.now()}.mp3`;
            const storageRef = ref(storage, `mp3/${safeName}`);

            await uploadBytes(storageRef, blob, { contentType: 'audio/mpeg' });

            setMessage(`Upload successful: ${safeName}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
        } finally {
            setLoading(false);
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
                            <Text style={commonStyles.buttonText}>{loading ? 'Lädt…' : 'Get Name'}</Text>
                        </TouchableOpacity>

                        {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
                        {message && (
                            <View
                                style={{
                                    marginTop: 12,
                                    padding: 12,
                                    borderRadius: 6,
                                    backgroundColor: '#E6FFE6',
                                    borderWidth: 1,
                                    borderColor: '#32CD32'
                                }}
                            >
                                <Text style={{ color: '#0F5132', fontWeight: '600' }}>Done</Text>
                                <Text style={{ color: '#0F5132', marginTop: 4 }}>{message}</Text>
                            </View>
                        )}
                    </View>

                    <View style={commonStyles.navigator}>
                        <Link href="/register" dismissTo>
                            <Text style={commonStyles.navigatorText} onPress={Keyboard.dismiss}>Logout</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

