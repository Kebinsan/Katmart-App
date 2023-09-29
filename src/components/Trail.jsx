import { useNavigate } from "react-router-dom";

export default function Trail({ category }) {
  const navigate = useNavigate();

  return (
    <>
      {category === "all" ? (
        <p className="page-trail">{category}</p>
      ) : (
        <p className="page-trail">
          <span
            className="trail-link"
            onClick={() => {
              navigate("/products/all");
            }}
          >
            all
          </span>
          / {category}
        </p>
      )}
    </>
  );
}
