import {useState, useEffect} from 'react';
import { auth, googleProvider } from '../utils/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import {useNavigate} from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            console.log("User signed in:", result.user);
            navigate('/');
        }).catch((error) => {
            console.error("Error during sign-in:", error);
        });
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in 
            console.log("User signed in:", userCredential.user);
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <>
            <h1>Login</h1>
            <div className='flex flex-column'>
                <div>
                    <h2>Email and password</h2>
                    <input type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                    <input type="text" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                    <button onClick={handleSignIn}>Login</button>
                </div>
                <div>
                    <h2>Connect with</h2>
                    <img src="/google.svg" alt="Icon" style={{ width: "40px", height: "40px", cursor: "pointer" }} onClick={handleGoogleSignIn} />
                </div>
            </div>
        </>
    )
}

export default Login;