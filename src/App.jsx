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
import { Spinner } from "react-bootstrap";

export default function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(window.localStorage.getItem("cart") || null);

  /**
   * fetches all products
   */
  useEffect(() => {
    const getAllProducts = async () => {
      const result = await fetchAllProducts();
      setAllProducts(result);
      setLoading(false);
    };
    getAllProducts();
  }, [allProducts.length]);

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
   * TODO
   * Add get user data here when server is running
   */

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

  /**
   * sets cart in local storage
   */
  useEffect(() => {
    if (cart) {
      window.localStorage.setItem("cart", cart);
    } else {
      window.localStorage.removeItem("cart");
    }
  }, [cart]);
  return (
    <>
      <Navigation
        token={token}
        setToken={setToken}
        setCategory={setCategory}
        category={category}
        cart={cart}
      />

      <Categories allCategories={allCategories} setCategory={setCategory} />
      {
        /*displays loading spinner while waiting on products to fetch*/
        loading ? (
          <div className="loading">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account/profile" element={<Profile />}></Route>
              <Route
                path="/account/:action"
                element={<AccountForm setToken={setToken} />}
              />
              <Route
                path="/products/product/:id"
                element={
                  <ProductInfo product={selectedProduct} setCart={setCart} />
                }
              />
              <Route
                path="/products/:category"
                element={
                  <Products
                    allProducts={allProducts}
                    setSelectedProduct={setSelectedProduct}
                    loading={loading}
                  />
                }
              />
              <Route
                path="/products/:category/:query"
                element={
                  <Products
                    allProducts={allProducts}
                    setSelectedProduct={setSelectedProduct}
                    loading={loading}
                  />
                }
              />
            </Routes>
          </>
        )
      }
    </>
  );
}
