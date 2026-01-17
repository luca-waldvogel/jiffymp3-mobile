import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from '@/components/AuthForm';
import { auth } from '@/components/firebase-auth';

export default function Register() {
    return (
        <AuthForm
            onSubmit={(email, password) => createUserWithEmailAndPassword(auth, email, password)}
            errorMessage="Must be a valid email address and a password with 6 or more characters"
            buttonText="Create Account"
            buttonStyle="buttonRegister"
            navigationHref="/"
            navigationText="Back to Login"
        />
    )
}
