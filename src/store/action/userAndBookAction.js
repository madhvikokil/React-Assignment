import { v4 as uuidv4 } from 'uuid';
export const getUsersList = () => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
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
        const firestore = getFirestore();
        let userType = localStorage.getItem("typeOfUser");
        if(userType === 'seller') {
            firestore.collection('books').where('addedBy', '==' , 'seller').get().then((res) => {
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
        firestore.collection('books').doc(id).set({
          id: id,
          author: bookDetails.author,
          title: bookDetails.title,
          description: bookDetails.description,
          status: bookDetails.status,
          price: bookDetails.price,
          discount: bookDetails.discount,
          addedBy: bookDetails.addedBy
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
      firestore.collection('books').doc(bookDetails.id).update({
        id: bookDetails.id,
        author: bookDetails.author,
        title: bookDetails.title,
        description: bookDetails.description,
        status: bookDetails.status,
        price: bookDetails.price,
        discount: bookDetails.discount,
        addedBy: bookDetails.addedBy
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
      console.log("details: ", details);
      dispatch({ type: "GET_BOOK_DETAIL", details });
  }).catch(err => {
    dispatch({ type: 'GET_BOOK_DETAIL' , err});
  })
}
}

export const placeOrder = (book) => {
    return(dispatch, getstate, { getFirestore }) => {
      const firestore = getFirestore();
      const uid = localStorage.getItem('uid');
      let id = uuidv4();
      firestore.collection('orders').doc(id).set({
        orderId: id,
        bookId: book.id,
        finalPrice: book.price,
        orderDate: new Date(),
        status: "PENDING",
        userId: uid,
        titleOfBook: book.title

      }).then((res) => {
        dispatch({ type: 'ORDER_PLACED' })
      }).catch(err => {
      dispatch({ type: 'ORDER_PLACED_ERROR' , err});
    })
  }
}

export const updateOrderByAdmin = (book) => {
  return(dispatch, getstate, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('orders').doc(book.orderId).update({
      ...book,
      status: "COMPLETED",
    }).then((res) => {
      dispatch({ type: 'ORDER_PLACED' })
    }).catch(err => {
    dispatch({ type: 'ORDER_PLACED_ERROR' , err});
  })
}
}

export const getMyOrders = (uid) => {
    return(dispatch, getstate, { getFirestore }) => {
      const firestore = getFirestore();
      firestore.collection('orders').where('userId', '==' , `${uid}`).get().then((res) => {
        let data = [];
        res.forEach((doc) => {
            data.push(doc.data());
          });
        dispatch({ type: "MY_ORDERS", data })
    }).catch(err => {
      dispatch({ type: "MY_ORDERS_ERROR", err});
    })
  }
}