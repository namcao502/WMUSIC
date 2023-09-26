import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/firestore";

const AuthObserver = () => {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in...
                console.log("User is signed in...");
                const uid = user.uid;
            } else {
                // User is signed out...
                console.log("User is signed out...");
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return null;
};

export default AuthObserver;
