import Product from "./Product";

export default function Shop({ allProducts }) {
  return (
    <>
      <div className="product-container">
        {allProducts?.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    </>
  );
}
