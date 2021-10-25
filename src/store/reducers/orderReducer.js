const initState = {
    orderPlaced: null,
    isUpdated: false,
    isDeleted: false,
    myOrders: null
}
const orderReducer = (state = initState, action) => {
    // manipulate state
    switch(action.type) {
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


export default orderReducer;