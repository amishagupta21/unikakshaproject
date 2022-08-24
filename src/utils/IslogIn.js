
let token = JSON.parse(localStorage.getItem('user'))?.stsTokenManager?.accessToken

const IslogIn = () => {
    if (token) {
        return true
    } else {
        return false
    }
}


export default IslogIn;