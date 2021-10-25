export const adminroutes = [
    {to: '/dashboard', name: 'Home', active: 'home', position: ''},
    {to: '/dashboard/users', name: 'Users list', active: 'userList', position: ''},
    {to: '/dashboard/books', name: 'Book list', active: 'bookList', position: ''},
    {to: '/dashboard/my-orders', name: 'My Orders', active: 'myOrder', position: ''},
    {to: '/', name: 'Log Out', active: 'logout', position: 'right'},
];

export const customerRoutes = [
    {to: '/dashboard', name: 'Home', active: 'home', position: ''},
    {to: '/dashboard/my-orders', name: 'My Order', active: 'myOrder', position: ''},
    {to: '/', name: 'Log Out', active: 'logout', position: 'right'},
];

export const sellerRoutes = [
    {to: '/dashboard', name: 'Home', active: 'home', position: ''},
    {to: '/dashboard/books', name: 'Books List', active: 'bookList', position: ''},
    {to: '/dashboard/my-orders', name: 'My Order', active: 'myOrder', position: ''},
    {to: '/', name: 'Log Out', active: 'logout', position: 'right'},
];

export const openRoutes = [
    {to: '/', name: 'Home', active: 'home', position: ''},
    {to: '/signin', name: 'Sign In', active: 'signin', position: ''},
    {to: '/signup', name: 'Sign Up', active: 'signup', position: ''},
];