import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { loginUser, registerUser } from "../api/server";
import { Form, Button } from "react-bootstrap";

export default function AccountForm({ setToken }) {
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const { action } = useParams();
  const title = action === "signin" ? "Sign In" : "Sign Up";
  const Navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let data = {};
    if (action === "register") {
      data = await registerUser(user);
      {
        /*TODO issue registering new account due to limited capabilities with api*/
      }
    } else {
      data = await loginUser(user);
    }
    if (data.token) {
      setToken(data.token);
      Navigate("/");
    } else {
      setError("failed to sign in");
      console.log("error logging in");
    }
  };

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
      {error && <div>username or password is incorrect</div>}
      <Form className="account-form" onSubmit={onSubmitHandler}>
        {title === "Sign Up" && (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        {title === "Sign Up" && (
          <Form.Group className="mb-3" controlId="check-robot">
            <Form.Check type="checkbox" label="I am not a robot" required />
          </Form.Group>
        )}
        <div className="account-form-submit">
          {title === "Sign In" && (
            <>
              <Form.Text className="text-muted">Need an Account? </Form.Text>
              <Link className="create-account" to="/account/register">
                Create Account
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
    </>
  );
}
