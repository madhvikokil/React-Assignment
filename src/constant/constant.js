export const email = {
    placeholder: "E-mail address",
    type: "text",
    name: "email",
    icon: "user",
    iconPosition: "left",
    rules:['required', 'email']
}

export const password = {
    placeholder: "Password",
    type: "password",
    name: "password",
    icon: "lock",
    iconPosition: "left",
    rules:['required', 'password']
}

export const firstName = {
    placeholder: "First Name",
    icon: "user",
    type: "text",
    name: "firstName",
    iconPosition: "left",
    rules:['required']
}

export const lastName = {
    placeholder: "Last Name",
    icon: "user",
    type: "text",
    name: "lastName",
    iconPosition: "left",
    rules:['required']
}

export const titleOfBook = {
    id: "form-input-control-first-name",
    label: "Title",
    name: "title",
    required: true,
    rules:['required']
}

export const authorOfBook = {
    id: "form-input-control-author-name",
    label: "Author", 
    name: "author",
    required: true ,
    rules:['required']
}

export const descriptionOfBook = {
    id: "form-textarea-control-opinion",
    label: "Description",
    name: "description",
    required: true,
    rules:['required']
}

export const statusOfBook = {
    id: 'status',
    label: 'Status',
    name: "status",
    required: true,
    rules:['required']
}

export const seller = {
    id: 'seller',
    label: 'Seller Type',
    name: "sellerType",
    required: true,
    rules:['required']
}

export const bookPrice ={
    id: 'form-input-control-price',
    label: 'Price',
    name: 'price',
    required: true,
    rules:['required']
}

export const discountRate = {
    id: 'form-input-control-discount',
    label: 'Discount',
    name: 'discount', 
    required: true,
    maxLength: 2,
    rules:['required']
}