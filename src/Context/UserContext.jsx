import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../Components/Loading";

const UserContext = createContext();

export default function UserContextProvider({children}) {
    const [user, setUser] = useState(false);

    useEffect(() =>{
        const unsuscribe = onAuthStateChanged(auth, (user) =>{
            console.log(user)
            setUser(user);
        });
        return unsuscribe;
    },[]);

    if(user == false) return (<p>..loading</p>)
   
    return (
        <UserContext.Provider value={{user}}>{children}</UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);