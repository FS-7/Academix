
export function validateEmail(email: string){
    if(email == null)
        return false
    if(email.length > 32)
        return false
    if(email != RegExp(""))
        return false
    return true
}

export function validatePhone(phone: string){
    if(phone == null)
        return false
    if(phone.length != 10)
        return false
    if(phone != RegExp(""))
        return false
    return true
}

export function validatePassword(password: string, password2: string=password){
    if(password == null)
        return false
    if(password.length < 8)
        return false
    if(password.length > 32)
        return false
    if(password == password2)
        return false
    return true
}