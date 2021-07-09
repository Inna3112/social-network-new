import axios from "axios";
import {UsersType} from "../redux/users-reducer";
import {ProfileType} from "../redux/profile-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a585aace-28a5-48d9-b1ef-e81ab36cf848"
    },
})

type GetResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string
}
type FollowResponseType = {
    resultCode: number
    messages: String[]
    data: object
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followSuccess(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`)
    },
    unFollowSuccess(userId: number) {
        return instance.delete<FollowResponseType>(`follow/${userId}`)
    },
    getProfile(userId: string) {
        console.warn('Obsolete method. Please use profileAPI object!')
        return profileAPI.getProfile(userId)
    }
}

type UpdateStatusType = {
    resultCode: number
    messages: string[]
    data: {}
}
export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string){
        return instance.put<UpdateStatusType>(`profile/status`, {status: status})
    }
}

type getMeResponseType = {
    resultCode: number
    messages: String[]
    data: {
        id: number
        email: string
        login: string
    }
}

type LoginRequestType = {
    resultCode: number
    messages: [],
    data: {
        userId: number
    }
}
type LogOutRequestType = {
    resultCode: number
    messages: string []
    data: {}
}
export const authAPI = {
    getMe(){
        return instance.get<getMeResponseType>('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean){
        return instance.post<LoginRequestType>('auth/login', {
            email, password, rememberMe
        })
    },
    logout(){
        return instance.delete<LogOutRequestType>('auth/login')
    }
}


