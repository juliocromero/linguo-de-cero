import { takeLatest, all, put, call } from "redux-saga/effects";
import { authActionTypes } from "./auth.types";
import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from "../../firebase/firebaseUtils";
import { authMongoDB } from "../../mongodb/mongoDBUtils";
import { removeUserAuth } from '../../shared/localStorage';

import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from "./auth.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
		const userSnapshot = yield userRef.get();
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

export function* getSnapshotFromMongoDBUserAuth(isSignUp, userAuth, token) {
	
	try {
		const userRef = yield call(authMongoDB.createUserProfileDocument, isSignUp, userAuth, token);
		// const userSnapshot = yield userRef.get();
		yield put(signInSuccess({ id: userRef._id, ...userRef }));
		// yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

// export function* signInWithEmail({payload: { email, password }}) {
// 	try {
// 		const { user } = yield auth.signInWithEmailAndPassword(email, password);
// 		yield getSnapshotFromUserAuth(user);
// 	} catch (e) {
// 		yield put(signInFailure(e.message));
// 	}
// }

export function* signInWithToken({payload: { token }}) {
	
	try {
		yield getSnapshotFromMongoDBUserAuth(false, {_id: '630620aca9a92b1270e99b85', email: 'julioromero138@gmail.com', name: 'julio'}, token);
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

export function* signInWithEmail({payload: { email, password }}) {
	try {
		const { isSignUp, user, token  } = yield authMongoDB.signInWithEmailAndPassword(email, password);
		
		yield getSnapshotFromMongoDBUserAuth(isSignUp, user, token);
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

export function* signInAnonymously() {
	try {
		const { user } = yield auth.signInAnonymously();
		yield getSnapshotFromUserAuth(user);
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

export function* checkIfUserIsAuthenticated(){
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

export function* signOut(){
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
		removeUserAuth();
	} catch (e) {
		yield put(signOutFailure(e.message));
	}
}

// export function* signUp({payload: { displayName, email, password }}){
// 	try {
// 		const { user } = yield auth.createUserWithEmailAndPassword(email, password);
// 		yield put(signUpSuccess({ user, additionalData: { displayName } }))
// 	} catch (e) {
// 		yield put(signUpFailure(e.message));
// 	}
// }

export function* signUp({payload: { displayName, email, password }}){
	try {
		const { isSignUp, user, token  } = yield authMongoDB.createUserWithEmailAndPassword(displayName, email, password);
		yield put(signUpSuccess({ isSignUp, user, token }))
		// yield getSnapshotFromMongoDBUserAuth(isSignUp, user, token);
	} catch (e) {
		yield put(signUpFailure(e.message));
	}
}

// export function* signInAfterSignUp({payload: { user, additionalData }}){
// 	yield getSnapshotFromUserAuth(user, additionalData);
// }

export function* signInAfterSignUp({payload: { isSignUp, user, token }}){
	yield getSnapshotFromMongoDBUserAuth(isSignUp, user, token);
}

export function* onCheckUserSession(){
	yield takeLatest(authActionTypes.CHECK_USER_SESSION, checkIfUserIsAuthenticated);
}

export function* onGoogleSignInStart(){
	yield takeLatest(authActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart(){
	yield takeLatest(authActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onTokenSignInStart(){
	yield takeLatest(authActionTypes.SIGN_IN_WITH_TOKEN, signInWithToken);
}

export function* onAnonymousSignInStart(){
	yield takeLatest(authActionTypes.ANONYMOUS_SIGN_IN_START, signInAnonymously);
}

export function* onSignOutStart(){
	yield takeLatest(authActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart(){
	yield takeLatest(authActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess(){
	yield takeLatest(authActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* authSagas() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onAnonymousSignInStart),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onTokenSignInStart)
	]);
}