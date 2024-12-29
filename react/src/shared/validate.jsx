
export function validateEmail(email){
    if(email == null)
        return false
    if(email.length > 32)
        return false
    const regex = new RegExp('^[^@]+@[^@]+\.[^@]+$');
    if(!regex.test(email))
        return false
    return true
}

export function validatePhone(phone){
    if(phone == null)
        return false
    if(phone.length != 10)
        return false
    const regex = new RegExp('^[0-9\-\+]{10}$');
    if(!regex.test(phone))
        return false
    return true
}

export function validatePassword(password, password2=password){
    if(password == null)
        return false
    const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$")
    if(!regex.test(password))
        return false
    if(password != password2)
        return false
    return true
}

export function validateLevel(level){
    if(level < 0 || level > 3)
        return false
    return true
}

export function userLoggedIn() {
    return JSON.parse(localStorage.getItem('logged_user'));
}