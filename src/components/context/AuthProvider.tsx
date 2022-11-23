import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ReactNode, useState } from "react";
import jwt_decode from 'jwt-decode'
import { IUserLoggedInData } from "../../Model/IUserLoggedInData";


export const AuthContext = React.createContext({} as AuthContext);

type AuthProviderProps = {
    children: ReactNode;
}


export function useAuth() {
    return useContext(AuthContext)
}

type AuthContext = {
    setAuth: React.Dispatch<React.SetStateAction<string>>
    auth: string
    tokenDecoded: () => string
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [auth, setAuth] = useState<string>(undefined)


    let tokenDecoded = () => {
        let tokenBearer = localStorage.getItem("token")
        if (tokenBearer !== null) {
            let decoded: IUserLoggedInData = jwt_decode(tokenBearer);
            setAuth(decoded.roles)
            return auth
        }
    }


    return (
        <div>
            <AuthContext.Provider
                value={{
                    setAuth,
                    auth,
                    tokenDecoded
                }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

