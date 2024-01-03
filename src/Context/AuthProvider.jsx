import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

import { auth } from "../firebase/config";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL,
                });
                setIsLoading(false);
                navigate("/");
                return;
            }
            setIsLoading(false);
            navigate("/login");
        });

        //clean function
        return () => {
            unsubscribed();
        };
    }, [navigate]);

    return <AuthContext.Provider value={{ user }}>{isLoading ? <Spin /> : children}</AuthContext.Provider>;
}

export default AuthProvider;
