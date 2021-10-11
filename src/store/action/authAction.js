export const authLogin = (auth) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        // async code
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().signInWithEmailAndPassword(
            auth.email,
            auth.password
        ).then((res) => {
            localStorage.setItem('uid', res.user.uid);
            return firestore.collection('users').doc(res.user.uid).get().then((res) => {
                localStorage.setItem('typeOfUser', res.data().userType);
                dispatch({ type: "LOGIN_SUCCESS", auth });
            })
        }).catch((err => {
            dispatch({ type: "LOGIN_ERROR", err});
        }))
    }
}

export const authSignup = (auth) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            auth.email,
            auth.password,
        ).then((res) => {
            return firestore.collection('users').doc(res.user.uid).set({
                firstName: auth.firstName,
                lastName: auth.lastName,
                email: auth.email,
                userType: auth.typeOfUser,
                uid: res.user.uid
            }).then((res) => {
                dispatch({ type: "SIGNUP_SUCCESS", res });
            })
        }).catch((err) => {
            dispatch({ type: "SIGNUP_ERROR", err })
        })
    }
}

export const logout = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            localStorage.removeItem("typeOfUser");
            localStorage.removeItem("uid");
            localStorage.removeItem("isEdit");
            dispatch({ type: "LOGOUT_SUCCESS" })  
        })
    }
}
 