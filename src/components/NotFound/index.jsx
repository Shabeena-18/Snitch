import { Link } from "react-router";

const NotFound = () => (
  <div className="empty-cart">
    <h1 className="empty-heading">Page Not Found</h1>
    <p className="empty-text">We are sorry, the page you requested could not be found.</p>
    <Link to="/">
      <button type="button" className="shop-now-button">
        Go Home
      </button>
    </Link>
  </div>
);

export default NotFound;
