import { useEffect, useState } from "react";
import { Link } from "react-router";
import Header from "../Header";

const FALLBACK_IMAGES = [
  "https://picsum.photos/seed/snitch-main/600/700",
  "https://picsum.photos/seed/snitch-small/400/300",
];

const Home = () => {
  const [images, setImages] = useState(FALLBACK_IMAGES);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const [a, b] = await Promise.all([
          fetch("https://dummyjson.com/products/category/mens-shirts?limit=1"),
          fetch("https://dummyjson.com/products/category/womens-dresses?limit=1"),
        ]);
        const dataA = await a.json();
        const dataB = await b.json();
        setImages([dataA.products[0].images[0], dataB.products[0].images[0]]);
      } catch (error) {
        setImages(FALLBACK_IMAGES); // keep the fallback pictures
      }
    };
    loadImages();
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
          <p className="home-description">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <Link to="/products">
            <button type="button" className="shop-now-button">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="home-collage">
          <div className="home-blob" />
          <img src={images[0]} alt="fashion" className="collage-main" />
          <img src={images[1]} alt="shopping" className="collage-small" />
        </div>
      </div>
    </div>
  );
};

export default Home;
