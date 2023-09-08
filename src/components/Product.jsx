export default function Product({ product }) {
  return (
    <div className="product">
      <p>{product.title}</p>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <p>{product.title}</p>
    </div>
  );
}
