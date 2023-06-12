import { useContext, useEffect } from "react";
import { CartContext } from "../store/cartContext";
import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import Error from "../components/products/Error";

const CartPage = () => {
  const { cartItems, error, fetchCartItems } = useContext(CartContext);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  // Total number of units
  const totalUnits = cartItems
    .map((cartItem) => cartItem.quantity)
    .reduce((total, quantity) => total + quantity, 0);

  // Total Amount = (Item1 price * Item1 quantity) + (Item2 price * Item2 quantity) + ...
  const totalAmount = cartItems
    .map((cartItem) => cartItem.price * cartItem.quantity)
    .reduce((total, amount) => total + amount, 0);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="cart">
      <div className="main-container">
        <div className="title-link-container">
          <h2 className="title">
            {cartItems.length > 0
              ? "Shopping Cart"
              : "Your Amazon Cart is empty."}
          </h2>
          <Link to="/products" className="products-link">
            &#8592; Go to Products Page
          </Link>
        </div>
        <div className="cart-items-container">
          {cartItems.map((cartItem) => (
            <CartItem key={cartItem._id} {...cartItem} />
          ))}
        </div>
        <div className="total-price-container">
          <p className="total-price-title">{`Subtotal (${totalUnits} items):`}</p>
          <p className="total-price-value">
            <span>$</span>
            {totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
