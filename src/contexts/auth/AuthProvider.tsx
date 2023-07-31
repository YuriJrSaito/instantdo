import { useState, useEffect } from "react"
import { AuthContext } from "./AuthContext"
import { User } from '../../types/User'
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({children}:{children: JSX.Element}) =>{
    const [user, setUser] = useState<User | null>(null);
    const api = useApi();

    useEffect(()=>{
        let name = localStorage.getItem('user');
        if(name)
            setUser({name: name});
    }, [])

    const signin = async (name: string) =>{
        const data = await api.signin(name);
        if(data.user)
        {
            setUser(data.user);
            localStorage.setItem('user', data.user.name);
            return true;
        }
        return false;
    }

    const signout = async () =>{
        await api.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}