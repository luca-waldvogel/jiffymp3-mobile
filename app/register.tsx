import AuthForm from '@/components/AuthForm';
import { auth } from '@/components/firebase-auth';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
    return (
        <AuthForm
            onSubmit={(email, password) => createUserWithEmailAndPassword(auth, email, password)}
            errorMessage="Registration failed. Please try again."
            buttonText="Create Account"
            buttonStyle="buttonRegister"
            navigationHref="/"
            navigationText="Back to Login"
            successMessage="New user ${user.uid} created with email: ${user.email}"
        />
    )
}
