import { createContext, useState } from "react";

export const UserContext = createContext({
    current_user: null,
    login: () => { },
    logout: () => { }
});


export const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    function login(user) {
        setCurrentUser(user);
    }

    function logout() {
        setCurrentUser(null);
    }

    const userValues = {
        current_user: currentUser,
        login,
        logout
    }
    return <UserContext.Provider value={userValues}>
        {children}
    </UserContext.Provider>
}