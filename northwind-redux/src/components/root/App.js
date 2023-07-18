import React from "react";
import { Container } from "reactstrap";
import Dashboard from "./Dashboard";
import Navi from "../navi/Navi"
import CartDetail from "../cart/CartDetail";
import {Route, Routes} from "react-router-dom"
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";
function App() {
  return (
    <Container>
      <Navi/>
      <Routes>
       <Route path="*" exact element={<NotFound/>}/>
        <Route path="/" exact element={<Dashboard/>}/>
        <Route path="/cart" exact element={<CartDetail/>}/>
        <Route path="/product" exact element={<Dashboard/>}/>
        <Route path="/saveproduct/:productId" exact element={<AddOrUpdateProduct/>}/>
        <Route path="/saveproduct" exact element={<AddOrUpdateProduct/>}/>
      </Routes>
    </Container>
  );
}

export default App;
