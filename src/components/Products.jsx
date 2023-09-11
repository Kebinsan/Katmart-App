import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";

export default function Products({ allProducts, setSelectedProduct }) {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const { category } = useParams();

  useEffect(() => {
    if (category && category !== "all") {
      setFilteredProducts(
        allProducts?.filter((product) => category === product.category)
      );
    } else {
      setFilteredProducts(allProducts);
    }

    console.log(allProducts);
  }, [category]);

  return (
    <>
      {/*renders all products*/}
      <div className="product-container">
        {filteredProducts?.map((product) => {
          return (
            <Product
              key={product.id}
              product={product}
              setSelectedProduct={setSelectedProduct}
            />
          );
        })}
      </div>
    </>
  );
}
