import {useState, useEffect} from 'react';
import { auth, googleProvider } from '../utils/firebase';
import { signInWithPopup,createUserWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from "react-router-dom";


const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const handleGoogleSignUp = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            console.log("User signed up:", result.user);
            navigate('/');
        }).catch((error) => {
            console.error("Error during sign-in:", error);
        });
    };

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("User signed up:", userCredential.user.user);
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated blob background */}
            <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    className="blob-animated relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 via-sky-400 to-purple-400 opacity-30 sm:w-[72rem]"
                    style={{
                    clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>

            {/* Signup Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative z-10">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Email and password</h2>
                        <input
                            type="text"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-2 mb-2 rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-2 mb-4 rounded"
                        />
                        <button
                            onClick={handleSignUp}
                            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className="text-center">
                        <h2 className="text-lg font-semibold mb-2">Connect with</h2>
                        <img
                            src="/google.svg"
                            alt="Icon"
                            style={{ width: "40px", height: "40px", cursor: "pointer" }}
                            onClick={handleGoogleSignUp}
                            className="mx-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;