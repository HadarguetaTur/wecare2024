import store from '../store/index';

export function getAuthToken(){
    const token = localStorage.getItem('token')
    return token;
}
export function getCurrentUser(){
    const user = localStorage.getItem('currentUser')
    return user;
}




export const getStore = () => store;