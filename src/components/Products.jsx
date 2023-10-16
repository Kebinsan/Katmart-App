import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";
import Loading from "./Loading";
import { FilterRight } from "react-bootstrap-icons";
import Canvas from "./Canvas";
import Sort from "./Sort";

export default function Products({ allProducts, loading }) {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const { category } = useParams();
  const { query } = useParams();
  const [show, setShow] = useState(false);
  const [reRender, setReRender] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  }, [category]);

  /**
   * re-renders this component so that sort works
   */
  useEffect(() => {
    setReRender(false);
  }, [reRender]);

  return (
    <>
      {
        /*displays loading spinner while waiting on products to fetch*/
        loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            <Canvas
              handleClose={handleClose}
              show={show}
              products={filteredProducts}
              setProducts={setFilteredProducts}
            />
            <div className="sort-filter-container">
              <div className="filter-icon">
                <Sort
                  products={filteredProducts}
                  setProducts={setFilteredProducts}
                  setReRender={setReRender}
                />
                <FilterRight color="#672934" onClick={handleShow} />
              </div>
            </div>
            <div className="product-container">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  return <Product key={product.id} product={product} />;
                })
              ) : (
                <div>No Results Found</div>
              )}
            </div>
          </>
        )
      }
    </>
  );
}
