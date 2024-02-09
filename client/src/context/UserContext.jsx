import { createContext, useState,useEffect } from "react";

const initialState = {
    current_user: null
};

export const UserContext = createContext({
    current_user: initialState.current_user,
    login: () => { },
    updatedUser: () => { },
    logout: () => { }
});

const getItemFromLocalStore = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : initialState;
};


export const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(getItemFromLocalStore);

      useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
      }, [currentUser]);

    function login(user) {
        setCurrentUser(user);
    }

    function updatedUser(updatedInfo) {
        setCurrentUser((prevState) => ({...prevState, ...updatedInfo}));
    }

    function logout() {
        setCurrentUser(null);
    }

    const userValues = {
        current_user: currentUser,
        login,
        updatedUser,
        logout
    }
    return <UserContext.Provider value={userValues}>
        {children}
    </UserContext.Provider>
}