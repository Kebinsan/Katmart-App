import { useParams } from "react-router-dom";

export default function ProductInfo({ product }) {
  const { id } = useParams();
  console.log(id, product);
  return (
    <>
      <p>{product.title}</p>
    </>
  );
}
