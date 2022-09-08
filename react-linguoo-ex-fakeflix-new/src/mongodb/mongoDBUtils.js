// import axios from "../axiosInstance";
import { instanceLinguoo } from "../axiosInstance";
import { setToken, setLocalStorageCurrentUser } from '../shared/localStorage'

export const authMongoDB = {

    createUserWithEmailAndPassword: (name, email, password) => {
        return instanceLinguoo.post('users', {email, name, password})
        .then(res => {
            return res.data;
        })
        .catch(error => {
            console.log('Error al crear usuario', error);
        })
    },


    signInWithEmailAndPassword: (email, password) => {
        return instanceLinguoo.post('users/login', {email, password})
        .then((res)=>{
            return res.data;
        })
        .catch((error)=>{
            console.log('Ocurrió un error con la autenticación.', error);
        })   
    }
    ,
    createUserProfileDocument: async (isSignUp, userAuth, token) => {

        if (!userAuth) return;
    
        const userRef = userAuth;
        // const snapShot = await userRef.get();
        
        // if (!snapShot.exists) {
        //     const { displayName, email, photoURL } = userAuth;
        //     const createdAt = new Date();
        //     try {
        //         await userRef.set({
        //             displayName,
        //             email,
        //             photoURL,
        //             createdAt,
        //             ...additionalData,
        //         })
        //     } catch (error) {
        //         console.log("error creating user", error.message)
        //     }
        // }
        if(userRef){
            setToken(token);
            setLocalStorageCurrentUser(userAuth);
        }
    
        return userRef;
    }
    

}