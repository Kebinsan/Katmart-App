import { Link, Route, Routes } from "react-router-dom";

export default function Categories({ allCategories }) {
  return (
    <div className="categories-nav">
      {allCategories?.forEach((category) => {
        console.log(category);
        return <div className="category">{category}</div>;
      })}
    </div>
  );
}
