import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
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
});
