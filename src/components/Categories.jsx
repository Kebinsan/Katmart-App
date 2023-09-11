import { useNavigate } from "react-router-dom";
export default function Categories({ allCategories }) {
  const navigate = useNavigate();
  return (
    <div className="category-container">
      <ul className="categories-links">
        {allCategories.map((category) => {
          return (
            <li
              key={category}
              className="category"
              onClick={() => {
                navigate(`/products/${category}`);
              }}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
