import { Link } from "react-router";
import Header from "../Header";

const Cart = () => (
  <>
    <Header />
    <div className="empty-cart">
      <h1 className="empty-heading">Your Cart Is Empty</h1>
      <p className="empty-text">Add products from the store to see them here.</p>
      <Link to="/products">
        <button type="button" className="shop-now-button">
          Shop Now
        </button>
      </Link>
    </div>
  </>
);

export default Cart;
