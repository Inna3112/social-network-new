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
    getProfile(userId: number | null) {
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
    getProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number | null) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string){
        return instance.put<UpdateStatusType>(`profile/status`, {status: status})
    }
}
type getMeResponseType = {
    resultCode: number
    messages: string []
    data: {
        id: number | null,
        email: string | null,
        login: string | null,
    }
}

type LoginResponseType = {
    resultCode: number
    messages: string[],
    data: {
        userId: number
    }
}
type LogoutResponseType = {
    resultCode: number
    messages: string []
    data: {}
}
export const authAPI = {
    getMe(){
        return instance.get<getMeResponseType>('auth/me')
            .then(response => response.data)
    },
    logIn(email: string | null, password: string | null, rememberMe = false){
        return instance.post<LoginResponseType>('auth/login', {
            email, password, rememberMe
        })
    },
    logout(){
        return instance.delete<LogoutResponseType>('auth/login')
    }
}


