import React, { useState, useEffect } from 'react';
import { Spring, animated } from 'react-spring';
import randomstring from 'randomstring';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { isEmpty } from 'lodash';

import Heading from './Heading';
import CheckoutProgress from './CheckoutProgress';
import CartItems from './CartItems';
import CheckoutForm from './CheckoutForm';
import PaymentForm from './PaymentForm';
import PaymentConfirmed from './PaymentConfirmed';
import { theme } from '../utils/theme';

const createOrderMutation = gql`
  mutation createOrder($input: OrderInput!, $gateway: String) {
    createOrder(input: $input, gateway: $gateway) {
      id
      orderId
      paymentId
      total
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
  const [activeStep, setActiveStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [orderData, setOrderData] = useState({});
  const cartItems = useStoreState(state => state.cart.items);
  const emptyCart = useStoreActions(actions => actions.cart.empty);
  const [createOrder, { data: createOrderResult }] = useMutation(
    createOrderMutation,
  );
  const [verifyCard, { data: verifyCardResult }] = useMutation(
    verifyCardMutation,
  );
  // console.log('data', data, verifyCardResult, createOrderResult);

  const handleCreateOrder = async gateway => {
    const tokenId = verifyCardResult ? verifyCardResult.verifyCard.id : '';
    const orderId = randomstring.generate(6).toUpperCase();
    const { email, fullName, ...address } = userData;
    const productIds = cartItems.map(item => {
      return item.id;
    });
    const inputData = {
      tokenId,
      orderId,
      customer: { email, fullName, address: { ...address } },
      productIds,
    };

    await createOrder({
      variables: {
        input: inputData,
        gateway,
      },
    });
  };

  useEffect(() => {
    // make verifyCard mutation to generate token
    if (!isEmpty(paymentData)) {
      verifyCard({ variables: { input: paymentData } });
    }
  }, [paymentData]);

  useEffect(() => {
    if (!verifyCardResult) {
      return;
    }
    handleCreateOrder('stripe');
  }, [verifyCardResult]);

  useEffect(() => {
    // console.log('now show success', createOrderResult);
    if (!createOrderResult) {
      return;
    }

    if (country === 'india') {
      // use razor pay
      const options = {
        key: 'rzp_test_utnkFIuYF4POGv', // Enter the Key ID generated from the Dashboard
        amount: `${createOrderResult.createOrder.total}00`,
        currency: 'INR',
        name: '6in',
        description: 'Phone accessories',
        // image: 'https://example.com/your_logo',
        order_id: createOrderResult.createOrder.paymentId, // This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
        handler(response) {
          console.log('razorpay response', response);
          // TODO: do mutation to update payment ID and payment status to success
          setOrderData(createOrderResult.createOrder);
          setActiveStep(4);
          emptyCart();
        },
        prefill: {
          name: userData.fullName,
          email: userData.email,
          contact: userData.telephone,
        },
        notes: {
          address: userData.address,
        },
        theme: {
          color: theme.mainBrandColor,
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
    } else {
      setOrderData(createOrderResult.createOrder);
      setActiveStep(4);
      emptyCart();
    }
  }, [createOrderResult]);

  const handleRazorPay = () => {
    handleCreateOrder('razorpay');
  };

  useEffect(() => {
    if (!isEmpty(userData) && country === 'india') {
      handleRazorPay();
    }
  }, [userData]);

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
                    setUserData(data2);
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
