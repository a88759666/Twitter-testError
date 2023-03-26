import axios from 'axios'
import { Tweet } from 'type'
const baseUrl = 'https://arcane-beyond-08221.herokuapp.com'
interface payloadType {
    description: string,
    UserId: number,
}
const axiosInstance = axios.create({
    baseURL: baseUrl
})

// axiosInstance.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('authToken');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}` 
//       }
//       return config;
//     },
//     (error) => {
//       console.error(error);
//     },
// )

export async function getUserTweet() {
    try {
        const res =  await axios.get(`${baseUrl}/api/users/:id/tweets`)
        return res.data as Tweet[]
    } catch (error) {
        console.error('Get tweets failed:', error)
    }
}

export async function createTweet(payload:payloadType) {
    try{
        const {  description, UserId } = payload
        const res = await axios.post(`${baseUrl}/api/tweets`, {
            description,
            UserId,
            
        })
        return res.data
    }catch(error){
        console.error('create todo failed:', error)
    }
    
}