"use client"
import React, { useEffect, useState } from "react";
import UserContext from "./userContext";

// Define the type for user data
interface UserData {
    email: string;
    userType: boolean;
}

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null); 

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const { email, userType } = JSON.parse(userData);
            setUser({ email, userType } as UserData); 
        }
    }, []);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
