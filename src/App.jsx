import { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { fetchAllCategories, fetchAllProducts } from "./api/server";
import Home from "./components/Home";
import Shop from "./components/Shop";
import AccountForm from "./components/AccountForm";
import Categories from "./components/Categories";
/*bootstrap*/
import { Dropdown, Button } from "react-bootstrap";
import { Cart3 } from "react-bootstrap-icons";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const navigate = useNavigate();

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

  /**
   * resets token when signing out
   */
  const signOut = () => {
    setToken(null);
    navigate("/");
  };

  /**
   * sign in button handler, navigates to sign in form
   */
  const signIn = () => {
    navigate("/account/signin");
  };

  return (
    <>
      <nav>
        <div className="nav-bar">
          <Link className="item" to="/">
            Home
          </Link>
          <Link className="item" to="/shop">
            Shop
          </Link>
          <div className="right-align-nav">
            <div className="right-nav-content">
              {token ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="White">Account</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Profile</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button variant="white">
                    <Cart3 /> 0 {/*TODO*/}
                  </Button>
                </>
              ) : (
                <Link className="item" to="/account/signin" onClick={signIn}>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Categories allCategories={allCategories} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={<Shop allProducts={allProducts} token={token} />}
        />
        <Route
          path="/account/:action"
          element={<AccountForm setToken={setToken} />}
        />
      </Routes>
    </>
  );
}

export default App;
