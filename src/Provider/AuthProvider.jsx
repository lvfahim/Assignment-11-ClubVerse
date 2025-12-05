import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebade.confic/Firebase';
export const AuthContext = createContext()
const googleProvider = new GoogleAuthProvider();
const auth=getAuth(app)
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const Google = ()=>{
        return signInWithPopup(auth,googleProvider)
    }
    const Login = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const Register = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
     const UpData = (UpDataProfile)=>{
       return updateProfile(auth.currentUser,UpDataProfile)
    }
     const ForgetPasssword = (email)=>{
        return sendPasswordResetEmail(auth, email)
    }
    const LogOut = ()=>{
        return signOut(auth)
    }
    useEffect(()=>{
        const unSub = onAuthStateChanged(auth ,(currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        });
        return()=>{
            unSub()
        };
    },[])
    const info={
       Register,
       setUser,
       user,
       UpData,
       Login,
       LogOut,
       Google,
       loading,
       ForgetPasssword
    }
    return <AuthContext.Provider value={info}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;