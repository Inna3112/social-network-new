import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a585aace-28a5-48d9-b1ef-e81ab36cf848"
    },
})


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    }
}
export const followAPI = {
    postFollow(userId: number){
        return instance.post(`follow/${userId}`)
    },
    deleteFollow(userId: number){
        return instance.delete(`follow/${userId}`)
    }
}
export const meAPI = {
    getMe(){
        return instance.get('auth/me')
            .then(response => response.data)
    }
}
export const profileAPI = {
    getProfile(userId: string){
        return instance.get(`profile/`+userId)
    }
}

