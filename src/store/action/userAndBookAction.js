export const getUsersList = () => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        // async code
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('users').get().then((res) => {
            let data = [];
            res.forEach((doc) => {
                data.push(doc.data());
              });
            dispatch({ type: "GET_USERS_LIST", data })
        }).catch((err => {
                dispatch({ type: "GET_USERS_LIST", err});
            }))
    }
}

export const getBookList = () => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        // async code
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('books').get().then((res) => {
            let data = [];
            res.forEach((doc) => {
                data.push(doc.data());
              });
            dispatch({ type: "GET_BOOKS_LIST", data })
        }).catch((err => {
                dispatch({ type: "GET_BOOKS_LIST", err});
            }))
    }
}