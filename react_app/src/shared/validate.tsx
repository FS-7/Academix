
export function validateEmail(email: string){
    if(email == null)
        return false
    if(email.length > 32)
        return false
    const regex = new RegExp('^[^@]+@[^@]+\.[^@]+$');
    if(!regex.test(email))
        return false
    return true
}

export function validatePhone(phone: string){
    if(phone == null)
        return false
    if(phone.length != 10)
        return false
    const regex = new RegExp('^[0-9\-\+]{10}$');
    if(!regex.test(phone))
        return false
    return true
}

export function validatePassword(password: string, password2: string=password){
    if(password == null)
        return false
    const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$")
    if(!regex.test(password))
        return false
    if(password != password2)
        return false
    return true
}