import { auth} from '../utils/firebase';
import {signOut } from "firebase/auth";

const Dashboard = () => {
    
    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log(" Sign-out successful.")
        }).catch((error) => {
        console.log("An error happened.")
        });
    }
    return (
        <>
            <h1>hello user</h1>
            <button onClick={handleSignOut}>Sign Out</button>
            

        </>
    )
}

export default Dashboard;