export const userMetaData = [
    { title: "Email", key: "email" },
    { title: "First Name", key: "firstName" },
    { title: "Last Name", key: "lastName" },
    { title: "User Type", key: "userType", transform: (val) => val.toUpperCase()}
];

export const publishedBooksMetaData = [
    { title: "Title", key: "title" },
    { title: "Author", key: "author" },
    { title: "Price(Rs.)", key: "price" },
    { title: "Discount Applied", key: "discount"},
    { title: "Final Price", key: "actualPrice" },
    { title: "Action", key: "" },
];

export const bookMetaData = [
    { title: "Title", key: "title" },
    { title: "Author", key: "author" },
    { title: "Price(Rs.)", key: "price" },
    { title: "Discount", key: "discount" },
    { title: "Actual Price", key: "actualPrice"},
    { title: "User", key: "userType", transform: (val) => val.toUpperCase() },
    { title: "Status", key: "status", transform: (val) => val.toUpperCase() },
    { title: "Action", key: "" },
];

export const myOrderMetaData = [
    { title: "Book Title", key: "titleOfBook" },
    { title: "Price(Rs.)", key: "price" },
    { title: "Discount Applied", key: "discount" },
    { title: "Actual Price", key: "actualPrice" },
    { title: "User Type", key: "user", transform: (val) => val.toUpperCase()},
    { title: "Status", key: "status", transform: (val) => val.toUpperCase()},
];

export const orderMetaData = [
    { title: "Book Title", key: "titleOfBook" },
    { title: "Price(Rs.)", key: "price" },
    { title: "Discount Applied", key: "discount" },
    { title: "Actual Price", key: "actualPrice" },
    { title: "Status", key: "status" },
    { title: "Complete the Order", key: "" },
];