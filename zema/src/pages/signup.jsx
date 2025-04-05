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
        <>  
            <div className="bg-white">
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                    <div className='flex items-center justify-center'>
                        <h1>Sign Up</h1>
                        <div className='flex flex-column'>
                            <div>
                                <h2>Email and password</h2>
                                <input type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                                <input type="text" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                                <button onClick={handleSignUp}>Sign Up</button>
                            </div>
                            <div>
                                <h2>Connect with</h2>
                                <img src="/google.svg" alt="Icon" style={{ width: "40px", height: "40px", cursor: "pointer" }} onClick={handleGoogleSignUp} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;