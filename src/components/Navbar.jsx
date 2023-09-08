import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop";
import AccountForm from "./AccountForm";

export default function Navbar({ allProducts }) {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/account/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop allProducts={allProducts} />} />
        <Route path="/account/login" element={<AccountForm />} />
      </Routes>
    </>
  );
}
