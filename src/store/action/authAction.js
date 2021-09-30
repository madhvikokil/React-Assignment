export const authLogin = (auth) => {
    return(dispatch, getState, { getFirebase }) => {
        // async code
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            auth.email,
            auth.password
        ).then(() => {
            dispatch({ type: "LOGIN_SUCCESS", auth });
        }).catch((err => {
            dispatch({ type: "LOGIN_ERROR", err});
        }))
    }
}