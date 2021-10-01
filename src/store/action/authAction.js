import { Redirect } from 'react-router'

export const authLogin = (auth) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        // async code
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().signInWithEmailAndPassword(
            auth.email,
            auth.password
        ).then((res) => {
            return firestore.collection('users').doc(res.user.uid).get().then((res) => {
                localStorage.setItem('typeOfUser', res.data().userType);
                dispatch({ type: "LOGIN_SUCCESS", auth });
                // Redirect to user specific dashboard on the basis of the type
                // if(res.data().userType === 'admin') {
                //     console.log("if");
                //     <Redirect to="/admin-dashboard"/>
                    
                // } else {
                //     console.log("else");

                //     <Redirect to="/customer-dashboard"/>
                // }
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
                userType: auth.typeOfUser
            }).then(() => {
                dispatch({ type: "SIGNUP_SUCCESS", auth });
            })
        }).catch((err) => {
            dispatch({ type: "SIGNUP_ERROR", err })
        })
    }
}
 