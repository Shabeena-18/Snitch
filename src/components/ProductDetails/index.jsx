import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../Header";

const USD_TO_INR = 80;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      setStatus("loading");
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (response.ok === false) {
          setStatus("failure");
          return;
        }
        const data = await response.json();
        setProduct(data);
        setStatus("success");
      } catch (error) {
        setStatus("failure");
      }
    };
    getProduct();
  }, [id]);

  const decrease = () => quantity > 1 && setQuantity(quantity - 1);
  const increase = () => setQuantity(quantity + 1);

  const renderBody = () => {
    if (status === "loading") return <p className="info-text">Loading...</p>;
    if (status === "failure") {
      return (
        <div className="info-text">
          <p>Product Not Found</p>
          <button type="button" className="shop-now-button" onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      );
    }
    return (
      <div className="details-card">
        <img src={product.thumbnail} alt={product.title} className="details-img" />
        <div className="details-info">
          <h1 className="details-title">{product.title}</h1>
          <p className="details-price">Rs {Math.round(product.price * USD_TO_INR)}/-</p>
          <div className="details-rating-row">
            <p className="rating-badge">{product.rating.toFixed(1)} &#9733;</p>
            <p className="reviews">{(product.reviews || []).length} Reviews</p>
          </div>
          <p className="details-description">{product.description}</p>
          <p className="details-line">
            <b>Available:</b> {product.availabilityStatus}
          </p>
          <p className="details-line">
            <b>Brand:</b> {product.brand || "Snitch"}
          </p>
          <hr className="details-hr" />
          <div className="quantity-row">
            <button type="button" className="qty-btn" onClick={decrease}>-</button>
            <p className="qty-value">{quantity}</p>
            <button type="button" className="qty-btn" onClick={increase}>+</button>
          </div>
          <button type="button" className="add-cart-btn" onClick={() => navigate("/cart")}>
            ADD TO CART
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="details-page">{renderBody()}</div>
    </>
  );
};

export default ProductDetails;
