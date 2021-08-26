import {UsersType} from '../redux/users-reducer';


export const updateObjectInArray = (items: UsersType[], itemId: number, objPropName: keyof UsersType, newObjProps: any) => {
    return items.map(u => {
        return u[objPropName] === itemId ? {...u, ...newObjProps} : u
    })
}