import { Spinner } from "react-bootstrap";
export default function Loading({ loading }) {
  return (
    <div className="loading">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
