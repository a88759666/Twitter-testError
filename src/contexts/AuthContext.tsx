import { checkPermissionUser, login, register } from "api/Auth";
import React ,{ createContext, useContext, useEffect, useState } from "react";
import * as jwt from 'jsonwebtoken'
import { useLocation } from "react-router-dom";



type defaultAuthContextType = {
    isAuthenticated: boolean,
    currentMember: jwt.JwtPayload | null,
    register: (data:{ account: string, name: string, password: string, passwordConfirm: string, email: string}) => Promise<any>,
    login: (data: { account: string, password: string }) => Promise<any>,
    logout: () => void
}

const defaultAuthContext = {
    isAuthenticated: false,
    currentMember: null,
    register: async (data:{ account: string, name: string, password: string, passwordConfirm: string, email: string}): Promise<any> => {},
    login: async (data: { account: string, password: string }): Promise<any> => {},
    logout: () => {}
}

const AuthContext = createContext<defaultAuthContextType>(defaultAuthContext)

type AuthProviderProps = {
    children: React.ReactNode
  }

export const AuthProvider:React.FC<AuthProviderProps> = ({ children }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)
    const [ payload, setPayload ] = useState<jwt.JwtPayload | null>(null)
    const { pathname } = useLocation()
    async function getRegister(data:{ account: string, name: string, password: string, passwordConfirm: string, email: string}) {
        const { success, authToken } = await register({
            account: data.account,
            name: data.name,
            email: data.email,
            password: data.password,
            passwordConfirm: data.passwordConfirm
        })
        const temPayload = jwt.decode(authToken) as jwt.JwtPayload
        if(temPayload) {
            setPayload(temPayload)
            setIsAuthenticated(true)
            localStorage.setItem('authToken', authToken)
        } else {
            setPayload(null)
            setIsAuthenticated(false)
        }
        return success
    }
    async function getLogin(data: { account: string, password: string }){
        const { success, authToken } = await login({
            account: data.account,
            password: data.password,
        })
        const temPayload = jwt.decode(authToken) as jwt.JwtPayload
            if(temPayload){
            setPayload(temPayload)
            setIsAuthenticated(true)
            localStorage.setItem('authToken', authToken)
        }else{
            setPayload(null)
            setIsAuthenticated(false)
        }
        return success
    }
    function getLogout(){
        localStorage.removeItem('authToken')
        setPayload(null)
        setIsAuthenticated(false)
    }
    function getCurrentMember(){
        if (payload) {
            return {
                id: payload.sub,
                name: payload.name
            }
        }
    }
    useEffect(() => {
        async function checkTokenIsValid() {
            const authToken = localStorage.getItem('authToken')
            if(!authToken) {
                setIsAuthenticated(false)
                setPayload(null)
                return;
            }
            const result = await checkPermissionUser(authToken)
            if(result) {
                setIsAuthenticated(true)
                const temPayload = jwt.decode(authToken) as jwt.JwtPayload
                setPayload(temPayload)
            } else {
                setIsAuthenticated(false)
                setPayload(null)
            }
        }
    }, [pathname])
    const providerValue = {
        isAuthenticated,
        currentMember: getCurrentMember,
        register: getRegister,
        login: getLogin,
        logout: getLogout
    }

    return <>
        <AuthContext.Provider value={providerValue}>
            { children }
        </AuthContext.Provider>
    </>
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}