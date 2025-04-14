import { useState } from "react"

import React, {useEffect, useState} from "react"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../firebase"

const Profile = () => {
    const [usename, setUsername] = useState("");

    useEffect(() => {
        const fetchUsername = async () => {
            onAuthStateChanged(auth, async (user) => { 
                if (user){
                    const userDocRef = doc(db, "users", userid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setUsername(userDocSnap.data().username);
                    } else { 
                        setUsername("Anonymous");
                    }
                } else {
                    window.location.href = "Login.html";
                }
            });
        };
        fetchUsername();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Hi, {username}!</h1>
        </div>
    );
};

export default Profile;
