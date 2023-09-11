import { Link, Route, Routes } from "react-router-dom";

export default function Categories({ allCategories }) {
  console.log(typeof allCategories);
  return (
    <div className="categories-nav">
      {/* {allCategories?.ForEach((category) => {
        return <p>{category}</p>;
      })} */}
    </div>
  );
}
