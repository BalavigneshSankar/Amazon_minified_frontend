import { useState, useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { CartContext } from "../../store/cartContext";

const Product = ({
  id,
  thumbnail,
  title,
  rating,
  price,
  description,
  stock,
}) => {
  const cartCtx = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  // Rating fixed to 2 decimal places
  const ratingCorrected = rating.toFixed(1);

  // Description trimmed and contionally added Read more button
  let descriptionTrimmed = description;
  let moreToRead = false;
  if (description.length > 50) {
    descriptionTrimmed = `${description.slice(0, 50)}...`;
    moreToRead = true;
  }

  return (
    <article className="product-card">
      <div className="product-img-rating-container">
        <img src={thumbnail} alt={title} className="product-img" />
        <p className="product-rating">
          <AiFillStar className="rating-icon" />
          <span>{ratingCorrected}</span>
        </p>
      </div>
      <div className="product-info">
        <div className="product-title-price-container">
          <h3 className="product-title">{title}</h3>
          <p className="product-price">
            <span>$</span>
            {price}
            <span>/unit</span>
          </p>
        </div>
        <p className="product-description">
          {descriptionTrimmed}
          {moreToRead && (
            <button type="button" className="btn-read-more">
              Read more
            </button>
          )}
        </p>
      </div>
      <div className="product-cta">
        <div className="product-quantity-container">
          <button
            type="button"
            className="btn-decrement"
            onClick={() => setQuantity((quantity) => quantity - 1)}
            disabled={quantity === 1 ? true : false}
          >
            -
          </button>
          <input
            type="number"
            className="input-quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button
            type="button"
            className="btn-increment"
            onClick={() => setQuantity((quantity) => quantity + 1)}
            disabled={quantity === stock ? true : false}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className="btn"
          onClick={() => {
            cartCtx.updateCartHandler({
              id,
              thumbnail,
              title,
              description,
              price,
              quantity,
              stock,
            });
          }}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
};

export default Product;
