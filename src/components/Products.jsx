import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";

export default function Products({ allProducts, setSelectedProduct }) {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const { category } = useParams();
  const { query } = useParams();

  useEffect(() => {
    if (category) {
      if (category === "all") {
        setFilteredProducts(allProducts);
        //console.log("all");
      } else {
        setFilteredProducts(
          allProducts?.filter((product) => category === product.category)
        );
        //console.log("category");
      }
      if (query) {
        console.log(filteredProducts);
        setFilteredProducts(
          filteredProducts?.filter((product) =>
            Object.values(product).some(
              (val) => typeof val === "string" && val.includes(query)
            )
          )
        );
        //console.log(query);
      }
    } else {
      console.log("error");
    }
  }, [category]);

  return (
    <>
      {/*renders all products*/}
      <div className="product-container">
        {filteredProducts?.length > 0 ? (
          filteredProducts?.map((product) => {
            return (
              <Product
                key={product.id}
                product={product}
                setSelectedProduct={setSelectedProduct}
              />
            );
          })
        ) : (
          <div>No Results Found</div>
        )}
      </div>
    </>
  );
}
