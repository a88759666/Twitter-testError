import axios from 'axios'

const authUrl = 'https://arcane-beyond-08221.herokuapp.com/api' as string
interface payloadType {
    account: string,
    password: string,
    email?: string
    name?: string
    passwordConfirm?: string
}

export async function login(payload:payloadType) {
    try {
        const { account, password } = payload
        const { data } = await axios.post(`${authUrl}/signin`, {
            account,
            password
        })
        console.log(data)
        const { authToken } = data
        
        if(authToken) {
            return {
                success: true,
                ...data
            }
        } else {
            return data
        }
    } catch (error) {
        console.error('login failed:', error)
    }
    
}

export async function register(payload:payloadType) {
    const { account, name, password, email, passwordConfirm } = payload
    try {
        const { data } = await axios.post(`${authUrl}/users`,{
            account,
            name,
            password,
            passwordConfirm,
            email
        })
    
        const { authToken } = data
    
        if(authToken){
            return { success:true, ...data }
        } else {
            return data
        }
    } catch (error) {
        console.error('register failed:', error)
    }
   
}

export async function checkPermissionUser(authToken:string | null) {
    try {
        const res = await axios.get(`${authUrl}/users/:id`,{
            headers:{
                Authorization: 'Bearer ' + authToken
            }
        })
        return res.data.success
    } catch (error) {
        console.error('check permissionUser failed:', error)
    }
    
}