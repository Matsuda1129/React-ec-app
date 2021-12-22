export const initialState = {
    loading: {
        state: false,
        text: ""
    },
    products: {
        list: []
    },
    users: {
        cart:[],
        customer_id: "",
        payment_method_id: "",
        orders: [],
        email:'',
        isSignedIn: false,
        role: "",
        uid: "",
        username: ""
    }
};