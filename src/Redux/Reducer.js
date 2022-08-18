import {  toast } from 'react-toastify';

let values = {
    cart: [],
}
export const Reducer = (state = { ...values }, action) => {
    let product = action.payload
    console.log(product)
    if (action.type === "ADD_ITEM") {
        toast.info ("item has been added",{
            autoClose: 2000,
        })
        let productAdd = action.payload
        if (state.cart.length === 0) {
            //[...state.cart] => فكها خليها عبار عن اوبجكتس منفردة جمب بعض عشان هنضيف عليهم المنتج اللي جاي
            //{ ...productElse, quantity: 1 } => هنكون جوا اوبجكت وهنفك عناصره ونحط معاهم الكميه بتاعة العنصر اللي اول مرة يجيي وهتكون طبعا واحد-
            let newValues = [...state.cart, { ...productAdd, quantity: 1 }]

            return { cart: [...newValues] }

        } else if (state.cart.length > 0) {
            let existItem = state.cart.find(element => element.id === productAdd.id)

            if (!existItem) {
                return { cart: [...state.cart, { ...productAdd, quantity: 1 }] }

            } else {
                let indexItem = state.cart.indexOf(existItem)
                state.cart[indexItem].quantity = state.cart[indexItem].quantity + 1
                return { cart: state.cart }
            }
        }
    }
    // ###########################################################################################
    if(action.type==="PLUS"){
        console.log("plus")
        product.quantity=product.quantity + 1;
        console.log(product)
        console.log(state.cart)
        return {cart:state.cart}
    }


    if (action.type === "DELETE_ITEM") {
        if (product.quantity <= 1) {
            return { cart: state.filter(element => element.id !== product.id) }
        } else {
            let newCart = state.map(element => element.id === product.id ? { ...element, quantity: element.quantity - 1 } : element)
            return { state: newCart }
        }
    }


    return state
}