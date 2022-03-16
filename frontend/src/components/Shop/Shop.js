import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { addToDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart(products);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  // products to be rendered on the UI
  const [displayProducts, setDisplayProducts] = useState([]);
  const size = 10;
  useEffect(() => {
    fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        const pageSize = Math.ceil(count / size);
        console.log(data);
        setPageCount(pageSize);
        setProducts(data.result);
        setDisplayProducts(data.result);
      });
  }, [page]);

  const handleAddToCart = (product) => {
    const exists = cart.find((pd) => pd.key === product.key);
    let newCart = [];
    if (exists) {
      const rest = cart.filter((pd) => pd.key !== product.key);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, product];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    // save to local storage (for now)
    addToDb(product.key);
  };

  const handleSearch = (event) => {
    const searchText = event.target.value;

    const matchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setDisplayProducts(matchedProducts);
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search Product"
        />
      </div>
      <div className="shop-container">
        <div className="product-container">
          {displayProducts?.map((product) => (
            <Product
              key={product.key}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
          {/* pagination */}
          <div className="pagination">
            {[...Array(pageCount).keys()].map((numbers) => (
              <button
                className={numbers === page ? "selected" : ""}
                key={numbers}
                onClick={() => setPage(numbers)}
              >
                {numbers}
              </button>
            ))}
          </div>
        </div>
        <div className="cart-container">
          <Cart cart={cart}>
            <Link to="/review">
              <button className="btn-regular">Review Your Order</button>
            </Link>
          </Cart>
        </div>
      </div>
    </>
  );
};

export default Shop;
