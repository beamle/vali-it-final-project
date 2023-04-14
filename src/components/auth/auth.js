import React, {useState, useEffect} from 'react';
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AddTimeslot from "../pages/AddTimeslot";
// import {db} from "../../config/firebase";
import {collection, addDoc, doc, getDocs, query, where, updateDoc} from 'firebase/firestore';
import { db } from '../../config/firebase'

const usersCollectionRef = collection(db, "firma")

const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState({loggedIn: false, companyId: null});
    const [docRef, setDocRef] = useState('');


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in.");
                setIsLoggedIn({loggedIn: true, companyId: user.uid});
            } else {
                console.log("User is logged out.");
                setIsLoggedIn({loggedIn: false, companyId: null});
            }
        });

        return () => unsubscribe();
    }, []);


    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const docRef = await addDoc(usersCollectionRef, {
                Description: '',
                Location: '',
                Name: '',
                email: email,
                Service_type: '',
                imgSrc: '',
                authUserId: auth.currentUser.uid,
            });
            setDocRef(docRef)
            console.log(`New document has been added with ID: ${docRef.id}`);
            await updateDoc(doc(usersCollectionRef, docRef.id), {
                docRefId: docRef.id
            });
            console.log(`Document ${docRef.id} has been updated with the docRefId field`);
            // You can pass the docRef.id as a prop to another component here.
        } catch (err) {
            console.error(err);
        }
    }


    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const querySnapshot = await getDocs(query(collection(db, "test"), where("authUserId", "==", auth.currentUser.uid)));
            if (querySnapshot.docs.length === 1) {
                setDocRef(querySnapshot.docs[0].id);
                console.log(`Document ID: ${querySnapshot.docs[0].id}`);
            } else {
                console.error("Expected to find exactly 1 matching user document.");
            }
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    }



    return (
        <div>
            {isLoggedIn.loggedIn ? <AddTimeslot
                    companyId={docRef?.id} // send only if it's not undefined
                    authUserId={auth.currentUser.uid}
                    />:
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
