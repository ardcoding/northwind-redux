import React, {useEffect, useState} from "react"
import { connect} from "react-redux"
import { getCategories} from "../../redux/actions/categoryAction"
import { saveProduct} from "../../redux/actions/productActions"
import ProductDetail from "./ProductDetail"
import { useNavigate, useParams } from 'react-router-dom';
import { validate } from "@babel/types";

function AddOrUpdateProduct({
    products,
    categories,
    getProducts,
    getCategories,
    saveProduct,
    history,
    ...props
}){
    const[product, setProduct]=useState({...props.product})
    const [errors, setErrors] = useState({ });

    useEffect(()=>{
        if(categories.length===0){
            getCategories()
        }
        setProduct({...props.product})
    },[props.product])


    function handleChange(event){
        const{name,value}=event.target
        setProduct(previousProduct => ({
            ...previousProduct,
            [name]:name==="categoryId"?parseInt(value,10):value
        }))
        validate(name,value)
    }
    function validate(name,value) {
        if (name === "productName" && value === "") {
          setErrors(previousErrors => ({
            ...previousErrors,
            productName: "Product name necessary"
          }));
        }else{
            setErrors(previousErrors => ({
                ...previousErrors,
                productName: ""
              }));
        }
      }

    function HANDLESAVE(event){
        event.preventDefault();
        let navigate = useNavigate();
        saveProduct(product).then(()=>{
            navigate("/")
        })
    }

    return (
        <ProductDetail
        product={product}
        categories={categories}
        onChange={handleChange}
        onSave={HANDLESAVE}
        errors={errors}
        />
    )
}

export function getProductById(products,productId){
    let product = products.find(product => product.id == productId)||null
    return product
}

function MAPSATEPROPS(state){

    const productId=useParams().productId;
    const product = productId && state.productListReducer.length > 0
    ? getProductById(state.productListReducer,productId):{}
    
    return{
        product,
        products: state.productListReducer,
        categories:state.categoryListReducer
    }
}

const mapDispatchToProps={
    getCategories,saveProduct
}

export default connect(MAPSATEPROPS,mapDispatchToProps)(AddOrUpdateProduct)