import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { loginUser, registerUser } from "../api/server";
import { Form, Button } from "react-bootstrap";

export default function AccountForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { action } = useParams();
  const title = action === "signin" ? "Sign In" : "Sign Up";
  const Navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let data = {};
    if (action === "register") {
      data = await registerUser(email, username, password);
      {
        /*TODO issue registering new account due to limited capabilities with api*/
      }
    } else {
      data = await loginUser(username, password);
    }
    if (data.token) {
      setToken(data.token);
      Navigate("/");
    } else {
      setError("failed to sign in");
      console.log("error logging in");
    }
  };

  return (
    <>
      <Form onSubmit={onSubmitHandler}>
        {title === "Sign Up" && (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
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
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>
        {title === "Sign Up" && (
          <Form.Group className="mb-3" controlId="check-robot">
            <Form.Check type="checkbox" label="I am not a robot" required />
          </Form.Group>
        )}
        {title === "Sign In" && (
          <>
            <Form.Text className="text-muted">Need an Account? </Form.Text>
            <Link className="create-account" to="/account/register">
              Create Account
            </Link>
          </>
        )}
        <Button className="account-form-submit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
