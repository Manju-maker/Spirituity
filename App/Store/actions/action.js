import { LOGIN_SUCCESS, LOGIN_REQUEST } from '../../utils/constant';

const login = payload => {
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}
const isLogin = payload => {
    return {
        type: LOGIN_REQUEST,
        payload
    }
}


export {
    login,
    isLogin
}