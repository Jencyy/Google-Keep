
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../../firebase'; 
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, []);

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
