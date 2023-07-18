import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function cartReducer(state = initialState.cart,action){
    switch(action.type){
        case actionTypes.ADD_TO_CART:
            var isAdded = state.find(c=>c.product.id === action.payload.product.id);
            if(isAdded){
                var newState = state.map(cartItem => {
                    if(cartItem.product.id === action.payload.product.id){
                        return Object.assign({},isAdded,{quantity:isAdded.quantity+1})
                    }
                    return cartItem
                })
                return newState
            }else{
                    return[...state,{...action.payload}]
                } 
            case actionTypes.REMOVE_FROM_CART:
                const changeState = state.filter(cartItem => cartItem.product.id !== action.payload.id)
                return changeState
                
                default:
                    return state
            }
        }