
const tokenName = 'linguoo_web_lplayer_token';

export const getFromLocalStorage = key => {
    return localStorage.getItem(key);
}

export const getToken = () => {
    return getFromLocalStorage(tokenName);
}

export const removeUserAuth = ()=> {
    localStorage.removeItem('user');
    //console.log(localStorage.getItem(tokenName));
    console.log(tokenName)
    localStorage.removeItem(tokenName);
    localStorage.removeItem('persist:root');
}

export const getLocalStorageCurrentUser = () => {
    const user = JSON.parse(getFromLocalStorage('user'));
    if(user && user._id) {
        user.id = user._id        
    }
    return user;
}

export const setLocalStorageCurrentUser = user => {
    localStorage.setItem('user', JSON.stringify(user));            
} 

export const setToken = token => {
    localStorage.setItem(tokenName, token);                
}

export const setLocalStorageKey = (key, value) => {
    localStorage.setItem(key, value);
}