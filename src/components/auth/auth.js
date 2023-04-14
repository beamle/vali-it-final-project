import React, {useState, useEffect} from 'react';
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import AddTimeslot from "../pages/AddTimeslot";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in.");
                setIsLoggedIn(true);
            } else {
                console.log("User is logged out.");
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err);
        }
    }

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    }


    return (
        <div>
            {isLoggedIn ? <AddTimeslot/> :
                <div>
                    <input
                        placeholder="Email..."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Password..."
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={signIn}>Sign in</button>
                    <button onClick={register}>Register</button>
                    {error && <p>{error}</p>}
                </div>
            }
        </div>
    );
};

export default Auth;
