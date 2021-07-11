
 export const required = (value: string) => {
    if(value) {
        return undefined
    } else {
        return 'Field is required'
    }

}
 export const maxLengthCreator = (maxLength: number) => (value: string) => {
     if(value.length > maxLength) {
         return `Max length must be less ${maxLength} symbols`
     }else {
         return undefined
     }

 }