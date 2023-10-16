import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { loginUser, registerUser } from "../api/api";
import { Form, Button } from "react-bootstrap";
import Message from "./Message";
import { Alert } from "react-bootstrap";

export default function AccountForm({ setToken }) {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const { action } = useParams();
  const Navigate = useNavigate();
  const title = action === "signin" ? "Sign In" : "Sign Up";

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setMessage(null);
    if (action === "register") {
      //register user
      const result = await registerUser(user);
      setMessage(result.message);
      if (result.success) {
        setSuccess(result.success);
        Navigate("/account/signin");
      }
    } else {
      //login user
      const result = await loginUser({
        email: user.email,
        password: user.password,
      });
      setMessage(result.message);
      //if a token is received, user successfully logged in, set token
      if (result.token) {
        setToken(result.token);
        Navigate("/");
      }
    }
  };

  /**
   * @param {*} event
   * sets the form values to a user object state
   */
  const handleChange = (event) => {
    event.preventDefault();
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <h1 className="page-title">{title}</h1>

      {/*Alert management*/}
      {message && (
        <div className="warnings-container">
          {!success ? (
            <Alert variant="warning" className="warning-alert">
              {Array.isArray(message) ? (
                <>
                  {message.map((msg, i) => {
                    return <Message key={i} message={msg} />;
                  })}
                </>
              ) : (
                <Message message={message} />
              )}
            </Alert>
          ) : (
            <Alert variant="success">
              <Message message={message} />
            </Alert>
          )}
        </div>
      )}

      {/*account form fields*/}
      <div className="account-form-container">
        <Form className="account-form" onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          {title === "Sign Up" && (
            <>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          {/*Verify password and robot check form field only displays on signup page*/}
          {title === "Sign Up" && (
            <>
              <Form.Group className="mb-3" controlId="password2">
                <Form.Label>Verify Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password again"
                  name="password2"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="check-robot">
                <Form.Check type="checkbox" label="I am not a robot" required />
              </Form.Group>
            </>
          )}
          <div className="account-form-bottom">
            {title === "Sign In" ? (
              <>
                <Form.Text className="text-muted">Need an Account? </Form.Text>
                <Link
                  className="link-style"
                  to="/account/register"
                  onClick={() => {
                    setMessage(null);
                  }}
                >
                  Create Account
                </Link>
              </>
            ) : (
              <>
                <Form.Text className="text-muted">
                  Already have an account?{" "}
                </Form.Text>
                <Link
                  className="link-style"
                  to="/account/signin"
                  onClick={() => {
                    setMessage(null);
                  }}
                >
                  Sign In
                </Link>
              </>
            )}
            <Button
              className="account-form-submit"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
