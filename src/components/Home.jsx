import { Carousel } from "react-bootstrap";

export default function Home({ token, userData }) {
  return (
    <>
      {token ? (
        <h1 className="page-title">Welcome User!</h1>
      ) : (
        <h1>Welcome Guest!</h1>
      )}
    </>
  );
}
