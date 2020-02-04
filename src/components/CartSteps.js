import React, { useState, useEffect } from 'react';
import { Spring, animated } from 'react-spring';
import randomstring from 'randomstring';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { isEmpty } from 'lodash';
// import ReactGA from 'react-ga';

import Heading from './Heading';
import CheckoutProgress from './CheckoutProgress';
import CartItems from './CartItems';
import CheckoutForm from './CheckoutForm';
import PaymentForm from './PaymentForm';
import PaymentConfirmed from './PaymentConfirmed';
import { theme } from '../utils/theme';
import config from '../utils/config';

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

const updateOrderMutation = gql`
  mutation updateOrder($input: OrderUpdateInput!) {
    updateOrder(input: $input) {
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
  const [country, setCountry] = useState('India');
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [orderData, setOrderData] = useState({});
  const [discount, setDiscount] = useState(0);
  const cartItems = useStoreState(state => state.cart.items);
  const location = useStoreState(state => state.user.location);
  const emptyCart = useStoreActions(actions => actions.cart.empty);
  const [createOrder, { data: createOrderResult }] = useMutation(
    createOrderMutation,
  );
  const [updateOrder] = useMutation(updateOrderMutation);
  const [verifyCard, { data: verifyCardResult }] = useMutation(
    verifyCardMutation,
  );
  // console.log('data', data, verifyCardResult, createOrderResult);

  useEffect(() => {
    if (location && location.country) {
      setCountry(location.country);
    }
  }, [location]);

  const handleCreateOrder = async gateway => {
    const tokenId = verifyCardResult ? verifyCardResult.verifyCard.id : '';
    const orderId = randomstring.generate(6).toUpperCase();
    const { email, fullName, ...address } = userData;
    const products = cartItems.map(item => {
      return { id: item.id, sku: item.sku };
    });
    const inputData = {
      tokenId,
      orderId,
      customer: { email, fullName, address: { ...address } },
      products,
      discount,
      country: location.country,
      currencyCode: location.currencyCode,
    };

    await createOrder({
      variables: {
        input: inputData,
        gateway,
      },
    });
  };

  const finishOrder = () => {
    // ReactGA.plugin.execute('ecommerce', 'addTransaction', {
    //   id: createOrderResult.createOrder.orderId,
    //   name: 'test checkout', // Product name. Required.
    //   sku: 'DD23444', // SKU/code.
    //   category: 'Party Toys', // Category or variation.
    //   price: '11.99', // Unit price.
    //   quantity: '1', // Quantity.
    // });
    // ReactGA.plugin.execute('ecommerce', 'send');
    // ReactGA.plugin.execute('ecommerce', 'clear');

    setOrderData(createOrderResult.createOrder);
    setActiveStep(4);
    emptyCart();
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

    if (country === 'India') {
      // use razor pay
      const options = {
        key: config.razorPayKey, // Enter the Key ID generated from the Dashboard
        amount: `${createOrderResult.createOrder.total}00`,
        currency: 'INR',
        name: config.siteName,
        description: config.description,
        image: config.logo,
        order_id: createOrderResult.createOrder.paymentId, // This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
        handler() {
          // do mutation to update payment ID and payment status to success
          updateOrder({
            variables: {
              input: {
                orderId: createOrderResult.createOrder.orderId,
                status: 'paid',
              },
            },
          });
          finishOrder();
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
      setLoading(false);
    } else {
      finishOrder();
    }
  }, [createOrderResult]);

  useEffect(() => {
    if (!isEmpty(userData) && country === 'India') {
      handleCreateOrder('razorpay');
    }
  }, [userData]);

  return (
    <section className="section">
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
                  discount={discount}
                  setDiscount={setDiscount}
                  handlePayment={() => {
                    setActiveStep(2);
                  }}
                />
              </animated.div>
            )}
          </Spring>
          <div
            className={`column section ${
              activeStep === 2 ? 'is-hidden-mobile' : ''
            } is-hidden-tablet`}
          >
            <CartItems
              cartItems={cartItems}
              showCheckoutBtn={activeStep === 1}
              discount={discount}
              setDiscount={setDiscount}
              handlePayment={() => {
                setActiveStep(2);
              }}
            />
          </div>
          <div className="column section">
            {activeStep === 2 && (
              <CheckoutForm
                enableReinitialize
                initialValues={{ country: location.country }}
                loading={loading}
                handlePayment={data2 => {
                  setLoading(true);
                  if (country === 'India') {
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
    </section>
  );
};

export default CartSteps;
