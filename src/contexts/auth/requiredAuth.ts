import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export const requiredAuth = () => ({
    verifyAuth: () => {
        const auth = useContext(AuthContext);
        if(!auth)
            return false;
        return true;
    }
})