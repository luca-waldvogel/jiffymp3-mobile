import AuthForm from '@/components/AuthForm';
import { auth } from '@/components/firebase-auth';
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Index() {
    return (
        <AuthForm
            onSubmit={(email, password) => signInWithEmailAndPassword(auth, email, password)}
            errorMessage="Invalid credentials. Please try again."
            buttonText="Sign In"
            buttonStyle="button"
            navigationHref="/register"
            navigationText="Register"
            successMessage="User ${user.uid} logged in successfully"
        />
    )
}
