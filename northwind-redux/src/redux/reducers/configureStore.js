import { applyMiddleware, createStore } from "redux";
import rootReducer from "./index"
import thunk from "redux-thunk"


 function configureStore(){
    return createStore(rootReducer,applyMiddleware(thunk))
}

export default configureStore