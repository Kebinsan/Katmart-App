import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
/*Bootstrap*/
import { Dropdown, Button } from "react-bootstrap";
import { Cart, Cart3, Search } from "react-bootstrap-icons";

export default function Navigation({
  token,
  setToken,
  setCategory,
  category,
  cart,
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
          <div>
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
          <form
            className="search-container"
            onSubmit={() => {
              navigate(`/products/${category}/${searchQuery}`);
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
              <Search />
            </Button>
          </form>
          <div className="right-align-nav">
            <div className="right-nav-content">
              {token ? (
                <>
                  <Dropdown>
                    <Dropdown.Toggle variant="White">Account</Dropdown.Toggle>
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
                  <Button variant="white">
                    <Cart3 /> 0
                  </Button>
                </>
              ) : (
                <Button variant="outline-dark" onClick={signIn}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
