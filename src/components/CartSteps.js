import React, { useState, useEffect } from 'react';
import { Spring, animated } from 'react-spring';
import randomstring from 'randomstring';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useStoreState } from 'easy-peasy';
import { isEmpty } from 'lodash';

import Heading from './Heading';
import CheckoutProgress from './CheckoutProgress';
import CartItems from './CartItems';
import CheckoutForm from './CheckoutForm';
import PaymentForm from './PaymentForm';
import PaymentConfirmed from './PaymentConfirmed';

const createOrderMutation = gql`
  mutation createOrder($input: OrderInput!) {
    createOrder(input: $input) {
      id
      orderId
    }
  }
`;

const verifyCardMutation = gql`
  mutation verifyCard($input: VerifyCardInput!) {
    verifyCard(input: $input) {
      id
    }
  }
`;

const CartSteps = () => {
  const client = useApolloClient();
  const [activeStep, setActiveStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [orderData, setOrderData] = useState({});
  const cartItems = useStoreState(state => state.cart.items);
  const [createOrder, { data: createOrderResult }] = useMutation(
    createOrderMutation,
  );
  const [verifyCard, { data: verifyCardResult }] = useMutation(
    verifyCardMutation,
  );
  // console.log('data', data, verifyCardResult, createOrderResult);

  useEffect(() => {
    // make verifyCard mutation to generate token
    if (!isEmpty(paymentData)) {
      verifyCard({ variables: { input: paymentData } });
    }
  }, [paymentData]);

  useEffect(() => {
    console.log('now create order', verifyCardResult);
    if (!verifyCardResult) {
      return;
    }
    const tokenId = verifyCardResult.verifyCard.id;
    const orderId = randomstring.generate(6).toUpperCase();
    const { email, fullName, ...address } = userData;
    const productIds = cartItems.map(item => {
      return item.id;
    });
    createOrder({
      variables: {
        input: {
          tokenId,
          orderId,
          customer: { email, fullName, address: { ...address } },
          productIds,
        },
      },
    });
  }, [verifyCardResult]);

  useEffect(() => {
    console.log('now show success', createOrderResult);
    if (!createOrderResult) {
      return;
    }
    setOrderData(createOrderResult.createOrder);
    setActiveStep(4);

    // empty cart
    client.writeData({ data: { cartItems: [] } });
  }, [createOrderResult]);

  return (
    <div className="section">
      <div className="container">
        <Heading>Cart</Heading>
        <Spring
          native
          from={{ opacity: 0 }}
          to={{
            opacity: activeStep !== 1 ? 1 : 0,
            // eslint-disable-next-line prettier/prettier
          }}
        >
          {styles => (
            <animated.div style={styles}>
              <CheckoutProgress activeStep={activeStep} />
            </animated.div>
          )}
        </Spring>
        <div className="columns">
          <Spring
            native
            from={{ marginLeft: '25%' }}
            // eslint-disable-next-line prettier/prettier
            to={{ marginLeft: activeStep === 1 ? '25%' : '0%' }}
          >
            {stylesProps => (
              <animated.div
                style={stylesProps}
                // eslint-disable-next-line prettier/prettier
                className="column section is-half is-hidden-mobile"
              >
                <CartItems
                  cartItems={cartItems}
                  showCheckoutBtn={activeStep === 1}
                  handlePayment={() => {
                    setActiveStep(2);
                  }}
                />
              </animated.div>
            )}
          </Spring>
          <div className="column section is-hidden-tablet">
            <CartItems
              cartItems={cartItems}
              showCheckoutBtn={activeStep === 1}
              handlePayment={() => {
                setActiveStep(2);
              }}
            />
          </div>
          <div className="column section">
            {activeStep === 2 && (
              <CheckoutForm
                handlePayment={data2 => {
                  setActiveStep(3);
                  setUserData(data2);
                }}
              />
            )}
            {activeStep === 3 && (
              <PaymentForm
                handlePayment={data2 => {
                  setPaymentData(data2);
                }}
              />
            )}
            {activeStep === 4 && <PaymentConfirmed orderData={orderData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSteps;
