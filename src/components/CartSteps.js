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
  const country = 'india';
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

  const handleRazorPay = () => {
    const options = {
      key: 'rzp_live_IUxBVbUJmPlqhT', // Enter the Key ID generated from the Dashboard
      amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
      currency: 'INR',
      name: 'Acme Corp',
      description:
        'A Wild Sheep Chase is the third novel by Japanese author  Haruki Murakami',
      image: 'https://example.com/your_logo',
      order_id: 'order_9A33XWu170gUtm', // This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      handler(response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'note value',
      },
      theme: {
        color: '#F37254',
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

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
                  if (country === 'india') {
                    // razorpay payment
                    handleRazorPay();
                  } else {
                    // stripe payment
                    setActiveStep(3);
                    setUserData(data2);
                  }
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
