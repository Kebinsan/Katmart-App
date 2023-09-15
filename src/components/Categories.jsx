import { useNavigate } from "react-router-dom";
export default function Categories({ allCategories, setCategory }) {
  const navigate = useNavigate();

  const onClick = (category) => {
    setCategory(category);
    navigate(`/products/${category}`);
  };
  return (
    <div className="category-container">
      <ul className="categories-links">
        {allCategories.map((category) => {
          return (
            <li
              key={category}
              className="category"
              onClick={() => {
                onClick(category);
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
