import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
  const [itemCount, setItemCount] = useState(0);
  const {
    cartItems = {},   // fallback to empty object if undefined
    addToCart,
    removeFromCart,
    url = '',
    currency = '₹'
  } = useContext(StoreContext) || {}; // fallback to empty context if StoreContext is undefined

  const quantity = cartItems?.[id] || 0;

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
        {quantity === 0 ? (
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="Remove" />
            <p>{quantity}</p>
            <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="Add" />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p> <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{desc}</p>
        <p className="food-item-price">{currency}{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
