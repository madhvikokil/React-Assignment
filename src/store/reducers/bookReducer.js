const initState = {
    userList: null,
    bookList: null,
    publishedBookList: null,
    bookStatus: null,
    bookDetail: null,
    orderPlaced: null,
    isUpdated: false,
    isDeleted: false
}
const bookReducer = (state = initState, action) => {
    // manipulate state
    switch(action.type) {
        case 'GET_USERS_LIST':
        return {
            ...state,
            userList: action.data,
        }

        case 'GET_BOOKS_LIST':
        return {
            ...state,
            bookList: action.data,
        }

        case 'GET_PUBLISHED_BOOKS_LIST':
            return {
                ...state,
                publishedBookList: action.data
            }
        
        case 'ADD_BOOK_SUCCESS':
            return {
                ...state,
                bookStatus: true
            }
        
        case 'ADD_BOOK_FAILURE':
            return {
                ...state,
                bookStatus: null
            }

        case 'UPDATE_BOOK_SUCCESS':
            return {
                ...state,
                isUpdated: true
            }
            
        case 'UPDATE_BOOK_FAILURE':
            return {
                ...state,
                isUpdated: false
            }
                
        case 'DELETE_BOOK_SUCCESS':
            return {
                ...state,
                isDeleted: true
            }
                
        case 'DELETE_BOOK_FAILURE':
            return {
                ...state,
                isDeleted: false
            }
        
        case 'GET_BOOK_DETAIL':
            return {
                ...state,
                bookDetail: action.details
            }
        
        case 'ORDER_PLACED':
            return{
                ...state,
                orderPlaced: 'Success'
            }
        
        case 'ORDER_PLACED_ERROR':
            return{
                ...state,
                orderPlaced: action.err
            }
        
        case 'MY_ORDERS':
        return{
            ...state,
            myOrders: action.data
        }
    
        case 'MY_ORDERS_ERROR':
            return{
                ...state,
                myOrders: action.err
            }

        default:
            return state
    }
}


export default bookReducer;