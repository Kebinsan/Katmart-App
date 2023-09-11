import { Link, useNavigate } from "react-router-dom";
/*Bootstrap*/
import { Dropdown, Button } from "react-bootstrap";
import { Cart3, Search } from "react-bootstrap-icons";

export default function Navigation({ token, setToken }) {
  const navigate = useNavigate();

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
          <Link className="item logo" to="/">
            KatMart
          </Link>
          <Link className="item" to="/products/all">
            Shop
          </Link>
          <form>
            <input className="search" type="text" placeholder="search" />
            <Button
              className="search-button"
              variant="outline-primary"
              size="sm"
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
    </>
  );
}
