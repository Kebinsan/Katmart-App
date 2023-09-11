import { useState, useEffect } from "react";
import { fetchAllCategories, fetchAllProducts } from "./api/server";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
/*Components*/
import Home from "./components/Home";
import Products from "./components/Products";
import AccountForm from "./components/AccountForm";
import Profile from "./components/Profile";
import ProductInfo from "./components/ProductInfo";
import Categories from "./components/Categories";

export default function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );

  /**
   * fetches all products
   */
  useEffect(() => {
    const getAllProducts = async () => {
      const result = await fetchAllProducts();
      setAllProducts(result);
      console.log(allProducts);
    };
    getAllProducts();
  }, []);

  /**
   * fetches all categories
   */
  useEffect(() => {
    const getAllCategories = async () => {
      const result = await fetchAllCategories();
      setAllCategories(result);
    };
    getAllCategories();
  }, []);

  /**
   * sets token in local storage
   */
  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <>
      {/*Navigation component*/}
      <Navigation token={token} setToken={setToken} />
      {/*Categories filter buttons component*/}
      <Categories allCategories={allCategories} />
      {/*Routes*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/profile" element={<Profile />}></Route>
        <Route
          path="/account/:action"
          element={<AccountForm setToken={setToken} />}
        />
        <Route
          path="/products/product/:id"
          element={<ProductInfo product={selectedProduct} />}
        />
        <Route
          path="/products/:category"
          element={
            <Products
              allProducts={allProducts}
              setSelectedProduct={setSelectedProduct}
            />
          }
        />
      </Routes>
    </>
  );
}
