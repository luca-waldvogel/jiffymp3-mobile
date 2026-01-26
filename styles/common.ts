import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    signInContainer: {
        marginBottom: 100
    },
    form: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 20,
    },
    button: {
        borderRadius: 5,
        backgroundColor: '#007AFF',
        padding: 15,
        alignItems: 'center',
    },
    buttonRegister: {
        borderRadius: 5,
        backgroundColor: '#32CD32',
        padding: 15,
        alignItems: 'center',
    },
    buttonDownload: {
        borderRadius: 5,
        backgroundColor: '#32CD32',
        padding: 15,
        alignItems: 'center',
        marginTop: 10
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        padding: 15,
        marginBottom: 10
    },
    imageBig: {
        width: 250,
        height: 120,
        resizeMode: 'contain'
    },
    text: {
        color: '#000',
    },
    errorText: {
        color: '#FF0000',
        marginBottom: 10
    },
    navigator: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    navigatorText: {
        color: '#007AFF',
        fontSize: 16
    },
    logoContainer: {
        alignItems: 'center'
    },
    buttonText: {
        color: 'white'
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    successContainer: {
        marginTop: 12,
        padding: 12,
        borderRadius: 6,
        backgroundColor: '#E6FFE6',
        borderWidth: 1,
        borderColor: '#32CD32'
    },
    successTitle: {
        color: '#0F5132',
        fontWeight: '600'
    },
    successMessage: {
        color: '#0F5132',
        marginTop: 4
    }
});
