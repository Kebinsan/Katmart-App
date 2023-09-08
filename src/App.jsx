import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { fetchAllProducts } from "./api/server";

function App() {
  const [allProducts, setAllProducts] = useState({});

  useEffect(() => {
    const getAllProducts = async () => {
      const result = await fetchAllProducts();
      setAllProducts(result);
      console.log(allProducts);
    };
    getAllProducts();
  }, []);

  return (
    <>
      <Navbar allProducts={allProducts} />
    </>
  );
}

export default App;
