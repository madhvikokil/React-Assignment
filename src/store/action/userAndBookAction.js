import { v4 as uuidv4 } from 'uuid';
export const getUsersList = () => {
    return(dispatch, getState, { getFirestore }) => {
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

export const getUserDetails = (id) => {
  return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      firestore.collection('users').doc(id).get().then((res) => {
        let details = res.data();
          dispatch({ type: "USER_DETAILS", details })
      }).catch((err => {
        dispatch({ type: "USER_DETAILS_ERROR" , err })
      }))
  }
}

export const getBookList = () => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        let uid = localStorage.getItem("uid");
        let userType = localStorage.getItem("typeOfUser");
        if(userType === 'seller') {
            firestore.collection('books').where('uid', '==' , `${uid}`).get().then((res) => {
                let data = [];
                res.forEach((doc) => {
                    data.push(doc.data());
                  });
                dispatch({ type: "GET_BOOKS_LIST", data })
            }).catch((err => {
              dispatch({ type: "GET_BOOKS_LIST", err});
          }))
        } else {
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
}

export const getPublishedBookList = () => {
    return(dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
            firestore.collection('books').where('status', '==' , 'PUBLISHED').get().then((res) => {
                let data = [];
                res.forEach((doc) => {
                    data.push(doc.data());
                  });
                dispatch({ type: "GET_PUBLISHED_BOOKS_LIST", data })
            }).catch((err => {
              dispatch({ type: "GET_PUBLISHED_BOOKS_LIST", err});
            }))
    }
}

export const addBook = (bookDetails) => {
    return(dispatch, getSelection, { getFirestore }) => {
        const firestore = getFirestore();
        let id = uuidv4();
        let user = localStorage.getItem('typeOfUser');
        let uid = localStorage.getItem('uid');
        let actualPrice = bookDetails.price - (bookDetails.price * (bookDetails.discount/100));
        firestore.collection('books').doc(id).set({
          id: id,
          author: bookDetails.author,
          title: bookDetails.title,
          description: bookDetails.description,
          status: bookDetails.status,
          price: bookDetails.price,
          discount: bookDetails.discount,
          // addedBy: bookDetails.addedBy,
          userType: bookDetails.userType || user,
          uid: bookDetails.uid || uid,
          actualPrice: actualPrice
      }).then(() => {
            dispatch({ type: 'ADD_BOOK_SUCCESS' });
          }).catch(err => {
            dispatch({ type: 'ADD_BOOK_FAILURE' , err});
          });
    }
}
export const updateBook = (bookDetails) => {
  return(dispatch, getSelection, { getFirestore }) => {
      const firestore = getFirestore();
        let actualPrice = bookDetails.price - (bookDetails.price * (bookDetails.discount/100));
        let user = localStorage.getItem('typeOfUser');
        let uid = localStorage.getItem('uid');
      firestore.collection('books').doc(bookDetails.id).update({
        id: bookDetails.id,
        author: bookDetails.author,
        title: bookDetails.title,
        description: bookDetails.description,
        status: bookDetails.status,
        price: bookDetails.price,
        discount: bookDetails.discount,
        // addedBy: bookDetails.addedBy,
        userType: bookDetails.userType || user,
        uid: bookDetails.uid || uid,
        actualPrice: actualPrice
    }).then(() => {
          dispatch({ type: 'UPDATE_BOOK_SUCCESS' });
        }).catch(err => {
          dispatch({ type: 'UPDATE_BOOK_FAILURE' , err});
        });
  }
}

export const deleteBook = (bookDetails) => {
  return(dispatch, getSelection, { getFirestore }) => {
      const firestore = getFirestore();
      firestore.collection('books').doc(bookDetails).delete().then(() => {
          dispatch({ type: 'DELETE_BOOK_SUCCESS' });
        }).catch(err => {
          dispatch({ type: 'DELETE_BOOK_FAILURE' , err});
        });
  }
}

export const fetchBookDetails = (id) => {
    return(dispatch, getSelection, { getFirestore }) => {
    const firestore = getFirestore();
      
    firestore.collection('books').doc(id).get().then((res) => {
      let details = res.data();
      dispatch({ type: "GET_BOOK_DETAIL", details });
  }).catch(err => {
    dispatch({ type: 'GET_BOOK_DETAIL' , err});
  })
}
}
