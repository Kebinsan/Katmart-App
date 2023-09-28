import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
/*Bootstrap*/
import { Dropdown, Button } from "react-bootstrap";
import { Cart3, Search } from "react-bootstrap-icons";

export default function Navigation({
  token,
  setToken,
  setCategory,
  cartQuantity,
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(null);

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
          <div className="left-nav-content">
            <Link className="item logo" to="/">
              KatMart
            </Link>
            <Link
              className="item"
              to="/products/all"
              onClick={() => {
                setCategory("all");
              }}
            >
              Shop
            </Link>
          </div>
          <div className="search-container">
            <form
              onSubmit={() => {
                navigate(`/products/search/${searchQuery}`);
              }}
            >
              <input
                className="search"
                type="text"
                placeholder="search"
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
              />
              <Button
                className="search-button"
                variant="outline-primary"
                size="sm"
                type="submit"
              >
                <Search className="search-icon" />
              </Button>
            </form>
          </div>
          <div className="right-align-nav">
            <div className="right-nav-content">
              {token ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="account-nav"
                      variant="outline-light"
                    >
                      Account
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          navigate("/account/profile");
                        }}
                      >
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Button variant="outline-light sign-in-nav" onClick={signIn}>
                  Sign In
                </Button>
              )}
              <Button className="cart-button" onClick={() => navigate("/cart")}>
                <Cart3 />
                <span> {cartQuantity}</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
