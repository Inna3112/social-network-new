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
export type ResponseType<T> = {
    resultCode: number
    messages: String[]
    data: T
}
type GetMeResponseType = {
    id: number | null,
    email: string | null,
    login: string | null,
}

type LoginResponseType = {
    userId: number
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followSuccess(userId: number) {
        return instance.post<ResponseType<{}>>(`follow/${userId}`)
    },
    unFollowSuccess(userId: number) {
        return instance.delete<ResponseType<{}>>(`follow/${userId}`)
    },
    getProfile(userId: number | null) {
        console.warn('Obsolete method. Please use profileAPI object!')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number | null) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType<{}>>(`profile/status`, {status: status})
    },
    savaPhoto(photoFile: any) {
        let formData = new FormData()
        formData.append("image", photoFile)

        return instance.put<ResponseType<{ small: string, large: string }>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const authAPI = {
    getMe() {
        return instance.get<ResponseType<GetMeResponseType>>('auth/me')
            .then(response => response.data)
    },
    logIn(email: string | null, password: string | null, rememberMe = false) {
        return instance.post<ResponseType<LoginResponseType>>('auth/login', {
            email, password, rememberMe
        })
    },
    logout() {
        return instance.delete<ResponseType<{}>>('auth/login')
    }
}


