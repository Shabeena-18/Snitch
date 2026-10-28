import { useEffect, useState } from "react";
import { Link } from "react-router";
import Header from "../Header";

const PRODUCTS_URL = "https://dummyjson.com/products?limit=100";
const USD_TO_INR = 80;

// Maps the sidebar categories to DummyJSON categories
const CATEGORY_GROUPS = [
  { id: "Clothing", list: ["mens-shirts", "womens-dresses", "tops", "mens-shoes", "womens-shoes"] },
  { id: "Electronics", list: ["smartphones", "laptops", "tablets", "mobile-accessories"] },
  { id: "Appliances", list: ["kitchen-accessories", "home-decoration", "furniture"] },
  { id: "Grocery", list: ["groceries"] },
  { id: "Toys", list: ["sports-accessories", "beauty", "skin-care"] },
];

const RATINGS = [4, 3, 2, 1];

const SORT_OPTIONS = [
  { id: "PRICE_HIGH", label: "Price (High-Low)" },
  { id: "PRICE_LOW", label: "Price (Low-High)" },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [activeRating, setActiveRating] = useState(0);
  const [sortBy, setSortBy] = useState("PRICE_HIGH");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(PRODUCTS_URL);
        const data = await response.json();
        setProducts(data.products);
        setStatus("success");
      } catch (error) {
        setStatus("failure");
      }
    };
    getProducts();
  }, []);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("");
    setActiveRating(0);
  };

  const group = CATEGORY_GROUPS.find((item) => item.id === activeCategory);

  const visibleProducts = products
    .filter((item) => (group ? group.list.includes(item.category) : true))
    .filter((item) => item.rating >= activeRating)
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortBy === "PRICE_HIGH" ? b.price - a.price : a.price - b.price));

  const renderStars = (count) =>
    [1, 2, 3, 4, 5].map((n) => (
      <span key={n} className={n <= count ? "star star-on" : "star"}>
        &#9733;
      </span>
    ));

  const renderFilters = () => (
    <aside className="filters">
      <div className="search-box">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <h2 className="filter-heading">Category</h2>
      <ul className="filter-list">
        {CATEGORY_GROUPS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={item.id === activeCategory ? "filter-btn filter-active" : "filter-btn"}
              onClick={() => setActiveCategory(item.id === activeCategory ? "" : item.id)}
            >
              {item.id}
            </button>
          </li>
        ))}
      </ul>

      <h2 className="filter-heading">Rating</h2>
      <ul className="filter-list">
        {RATINGS.map((stars) => (
          <li key={stars}>
            <button
              type="button"
              className={stars === activeRating ? "rating-btn filter-active" : "rating-btn"}
              onClick={() => setActiveRating(stars)}
            >
              {renderStars(stars)} <span className="and-up">&amp; up</span>
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="clear-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </aside>
  );

  const renderProducts = () => {
    if (status === "loading") return <p className="info-text">Loading...</p>;
    if (status === "failure") return <p className="info-text">Something went wrong. Please try again.</p>;
    if (visibleProducts.length === 0) return <p className="info-text">No Products Found</p>;
    return (
      <ul className="products-grid">
        {visibleProducts.map((item) => (
          <li key={item.id}>
            <Link to={`/products/${item.id}`} className="product-card">
              <img src={item.thumbnail} alt={item.title} className="product-img" />
              <h3 className="product-title">{item.title}</h3>
              <p className="product-brand">by {item.brand || "Snitch"}</p>
              <div className="product-row">
                <p className="product-price">Rs {Math.round(item.price * USD_TO_INR)}/-</p>
                <p className="rating-badge">{item.rating.toFixed(1)} &#9733;</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Header />
      <div className="products-page">
        {renderFilters()}
        <section className="products-section">
          <div className="products-top">
            <h1 className="products-heading">All Products</h1>
            <label className="sort-box">
              Sort by
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {renderProducts()}
        </section>
      </div>
    </>
  );
};

export default Products;
