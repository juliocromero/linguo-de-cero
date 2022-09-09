import { authActionTypes } from "./auth.types"
// import { instanceLinguoo } from '../../axiosInstance'

export const checkUserSession = () => ({
    type: authActionTypes.CHECK_USER_SESSION
})

export const emailSignInStart = emailAndPassword => ({
    type: authActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})
export const tokenSignInStart = token => ({
    type: authActionTypes.SIGN_IN_WITH_TOKEN,
    payload: token
})

export const googleSignInStart = () => ({
    type: authActionTypes.GOOGLE_SIGN_IN_START
})

export const anonymousSignInStart = () => ({
    type: authActionTypes.ANONYMOUS_SIGN_IN_START
})

export const signInSuccess = user => ({
    type: authActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const signInFailure = error => ({
    type: authActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const signOutStart = () => ({
    type: authActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type: authActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = error => ({
    type: authActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

export const signUpStart = userCredentials => ({
    type: authActionTypes.SIGN_UP_START,
    payload: userCredentials
})

export const signUpRequest = ()=> ({
    type: authActionTypes
}) 

// export const signUpSuccess = ({ user, additionalData }) => ({
//     type: authActionTypes.SIGN_UP_SUCCESS,
//     payload: { user, additionalData }
// })

export const signUpSuccess = ({ isSignUp, user, token }) => ({
    type: authActionTypes.SIGN_UP_SUCCESS,
    payload: { isSignUp, user, token }
})

export const signUpFailure = error => ({
    type: authActionTypes.SIGN_UP_FAILURE,
    payload: error
})