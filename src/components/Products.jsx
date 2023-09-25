import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";
import { Spinner } from "react-bootstrap";

export default function Products({ allProducts, loading }) {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const { category } = useParams();
  const { query } = useParams();

  /**
   * Filters the displayed products
   * depending on category filter as
   * well as searched query
   */
  useEffect(() => {
    if (category) {
      if (category === "all") {
        setFilteredProducts(allProducts);
      } else {
        setFilteredProducts(
          allProducts?.filter((product) => category === product.category)
        );
      }
      if (query) {
        setFilteredProducts(
          filteredProducts?.filter((product) =>
            Object.values(product).some(
              (val) => typeof val === "string" && val.includes(query)
            )
          )
        );
      }
    } else {
      console.log("error");
    }
  }, [category]);

  return (
    <>
      {
        /*displays loading spinner while waiting on products to fetch*/
        loading ? (
          <div className="loading">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="product-container">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                return <Product key={product.id} product={product} />;
              })
            ) : (
              <div>No Results Found</div>
            )}
          </div>
        )
      }
    </>
  );
}
