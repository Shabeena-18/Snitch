import { Link, useNavigate } from "react-router";
import Logo from "../Logo";

const Header = () => {
  const navigate = useNavigate();

  // Part 2 will also remove the stored JWT token here
  const onClickLogout = () => {
    navigate("/login", { replace: true });
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <Logo />
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/products" className="nav-link">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link">Cart</Link>
          </li>
          <li>
            <button type="button" className="logout-btn" onClick={onClickLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
