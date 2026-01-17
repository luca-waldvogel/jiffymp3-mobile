import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from '@/components/AuthForm';
import { auth } from '@/components/firebase-auth';

export default function Index() {
    return (
        <AuthForm
            onSubmit={(email, password) => signInWithEmailAndPassword(auth, email, password)}
            errorMessage="Email or Password is incorrect"
            buttonText="Sign In"
            buttonStyle="button"
            navigationHref="/register"
            navigationText="Register"
        />
    )
}
