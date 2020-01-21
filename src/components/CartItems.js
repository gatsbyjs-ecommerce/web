import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStoreActions } from 'easy-peasy';
import { Link } from 'gatsby';

import CurrencyFormat from './CurrencyFormat';
import CouponForm from './CouponForm';

const Item = styled.article`
  min-height: 200px;
  .image {
    height: auto;
  }
  img.cart-item-image {
    object-fit: cover;
    width: 128px;
    height: auto;
  }
  .remove {
    color: ${props => props.theme.primaryColor};
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-left: 1rem;
  }
`;

const BuyBtn = styled.button`
  width: 100%;
  margin-top: 3rem;
`;

const CartItems = ({
  showCheckoutBtn,
  handlePayment,
  cartItems,
  discount,
  setDiscount,
}) => {
  const [total, setTotal] = useState(0);
  const [shippingTotal, setShippingTotal] = useState(0);
  const [couponCode, setCouponCode] = useState(null);
  const removeFromCart = useStoreActions(actions => actions.cart.remove);
  // console.log('cartItems', cartItems);

  const handleApplyDiscount = ({ discountPercentage, code }) => {
    const discountNew = (discountPercentage / 100) * total;
    setDiscount(Math.round(discountNew));
    setCouponCode(code);
  };

  const calculateTotal = () => {
    let newTotal = 0;
    let newShipping = 0;
    cartItems.forEach(item => {
      newTotal += item.price;
      if (item.shippingCost) {
        newShipping += item.shippingCost;
      }
    });
    if (total !== newTotal) {
      setTimeout(() => {
        setTotal(newTotal);
        setShippingTotal(newShipping);
      }, 300);
    }
  };

  // run every time cart item updates
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      calculateTotal();
    }
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div>
        <h3 className="has-text-centered	is-size-4">No items in your cart.</h3>
        <br />
        <p className="has-text-centered	is-size-4">
          <Link to="/shop">Browse to our product gallery</Link>
        </p>
      </div>
    );
  }

  return (
    <>
      {cartItems.map((item, index) => (
        <Item className="media" key={item.itemId}>
          {item.image && (
            <figure className="media-left">
              <div className="image is-128x128">
                <img
                  src={item.image}
                  className="cart-item-image"
                  alt={item.title}
                />
              </div>
            </figure>
          )}
          <div className="media-content">
            <div className="content">
              <p>
                <strong className="is-size-5">{item.title}</strong>{' '}
                <small className="has-text-grey-light is-uppercase">
                  {item.sku}
                </small>
                <br />
                <span className="is-size-5 has-text-weight-bold has-text-grey-dark">
                  <CurrencyFormat amount={item.price} />
                </span>
                <a className="remove" onClick={() => removeFromCart(index)}>
                  remove
                </a>
              </p>
            </div>
          </div>
        </Item>
      ))}
      <hr />
      <div className="columns is-multiline">
        <div className="column is-6 is-offset-6">
          {!showCheckoutBtn && (
            <>
              <CouponForm
                handleSubmit={values => handleApplyDiscount(values)}
              />
              <hr />
            </>
          )}
        </div>
        <div className="column is-6 is-offset-6">
          <p className="is-size-5 has-text-dark has-text-right">
            <small>Shipping:</small>{' '}
            <span className="has-text-weight-bold">
              <CurrencyFormat amount={shippingTotal} />
            </span>
          </p>
          {discount > 0 && (
            <p className="is-size-5 has-text-dark has-text-right">
              <small>Discount:</small>{' '}
              <span className="has-text-weight-bold">
                -<CurrencyFormat amount={discount} />
              </span>
            </p>
          )}
          <p className="is-size-4 has-text-dark has-text-right">
            <small>Total:</small>{' '}
            <span className="has-text-weight-bold">
              <CurrencyFormat amount={total + shippingTotal - discount} />
            </span>
          </p>
        </div>
      </div>
      {showCheckoutBtn && (
        <BuyBtn
          className="product-info-btn button is-dark is-large is-radiusless is-uppercase"
          onClick={() => {
            handlePayment({
              items: cartItems,
              total,
              discount,
              couponCode,
            });
          }}
        >
          Checkout
        </BuyBtn>
      )}
    </>
  );
};

export default CartItems;
