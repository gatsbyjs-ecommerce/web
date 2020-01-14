/* eslint no-underscore-dangle: 0 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigateTo } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import { useStoreActions } from 'easy-peasy';
import ReactGA from 'react-ga';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import { Spring, animated } from 'react-spring';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share';

import config from '../utils/config';
import { theme } from '../utils/theme';
import { formatCurrency, makeId } from '../utils/helpers';
import { BlockContent } from './Content';
import Heading from './Heading';

const RatingContainer = styled.div`
  text-align: right;
  margin-bottom: 5px;
  span {
    margin-left: 5px;
    font-size: 0.9rem;
  }
`;

const Price = styled.div`
  color: ${theme.primaryColor};
  font-size: 1.5rem;
  span {
    color: #4a4a4a;
    font-size: 1rem;
    text-decoration: line-through;
    font-weight: light;
  }
`;

const BuyBtn = styled.button`
  width: 100%;
  margin-top: 3rem;
`;

const ShippingInfo = styled.p`
  margin-top: 5px;
  padding-right: 10px;
  margin-bottom: 10px;
`;

const AccordionStyled = styled(Accordion)`
  margin-top: 3rem;
  .accordion__title {
    border-bottom: 1px solid #979797;
    padding: 0.9rem 0;
    cursor: pointer;
    :focus {
      outline: none;
    }
    h3 {
      text-transform: uppercase;
      font-weight: 700;
    }
  }
  .accordion__body {
    display: block;
    padding: 1rem 0;
  }
  .accordion__body--hidden {
    display: none;
  }
`;

const ShareContainer = styled.div`
  padding: 0.9rem 0;
  border-top: 1px solid #979797;

  .level-item {
    float: left;
  }
  h3 {
    text-transform: uppercase;
    font-weight: 700;
    float: left;
  }
  .share-icons {
    float: right;
    width: 110px;
    .level-item {
      margin-left: 0.3rem;
    }
  }
  svg {
    color: #4a4a4a;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const Variants = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 1rem;
`;

const VariantColor = styled.div`
  background-color: ${props => props.color};
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin: 0 5px;
  float: left;
  cursor: pointer;
  box-shadow: inset 0 0 5px #848484;
  border: ${props =>
    `2px solid ${props.active ? props.theme.mainBrandColor : 'white'}`};
`;

const VariantDevice = styled.div`
  background-color: ${props => props.color};
  height: 40px;
  border-radius: 4px;
  margin: 0 7px;
  float: left;
  cursor: pointer;
  box-shadow: inset 0 0 2px #848484;
  border: ${props =>
    `2px solid ${props.active ? props.theme.mainBrandColor : 'white'}`};
  padding: 0 8px;
  align-items: center;
  font-size: 0.85rem;
  display: flex;
`;

const ProductInfo = ({
  product,
  home,
  reviews,
  variant,
  setVariant,
  variantDevice,
  setVariantDevice,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const addToCart = useStoreActions(actions => actions.cart.add);
  // console.log('product', product);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 400);
  }, []);

  const metaUrl = `${config.siteUrl}/product/${product.slug.current}`;
  const metaTitle = `Checkout ${product.title} at 6in`;

  ReactGA.plugin.execute('ecommerce', 'addItem', {
    id: product._id,
    title: product.title,
    sku: variant.sku || '-',
    price: variant.discountPrice,
    // category: 'Cases',
    quantity: '1',
  });

  const handleAddToCart = () => {
    const itemData = {
      itemId: makeId(5),
      id: product._id,
      title: product.title,
      slug: product.slug.current,
      shippingCost: product.shippingCost,
      sku: variant.sku,
      price: variant.discountPrice,
      image: variant.featuredImage.asset.fluid.src,
      color: variant.color.hex,
      device: variantDevice.title,
      quantity: 1,
    };
    addToCart(itemData);

    setTimeout(() => navigateTo('/cart'), 600);
  };

  return (
    <>
      <RatingContainer>
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <span>{reviews.length} Reviews</span>
      </RatingContainer>
      <Heading centered>{product.title}</Heading>
      <Price className="has-text-weight-semibold has-text-centered">
        {formatCurrency(variant.discountPrice)}{' '}
        {variant.discountPrice < variant.price && (
          <span>{formatCurrency(variant.price)}</span>
        )}
      </Price>
      <Spring native from={{ opacity: 0 }} to={{ opacity: isVisible ? 1 : 0 }}>
        {stylesProps => (
          <animated.div style={stylesProps}>
            <Variants>
              {product.otherVariants &&
                product.otherVariants.map(variantItem => {
                  return variantItem.color ? (
                    <VariantColor
                      key={variantItem.title}
                      color={variantItem.color.hex}
                      active={
                        variant.color
                          ? variant.color.hex === variantItem.color.hex
                          : false
                      }
                      onClick={() => setVariant(variantItem)}
                    />
                  ) : null;
                })}
            </Variants>
            <Variants>
              {product.device &&
                product.device.map(variantItem => {
                  return (
                    <VariantDevice
                      key={variantItem.id}
                      active={variantDevice.id === variantItem.id}
                      onClick={() => setVariantDevice(variantItem)}
                    >
                      {variantItem.title}
                    </VariantDevice>
                  );
                })}
            </Variants>
            <BuyBtn
              className="product-info-btn button is-dark is-medium is-radiusless is-uppercase"
              // eslint-disable-next-line prettier/prettier
              onClick={() => handleAddToCart()}
            >
              Add to cart
            </BuyBtn>
            <ShippingInfo>Free Shipping to India.</ShippingInfo>
            <AccordionStyled>
              <AccordionItem expanded>
                <AccordionItemTitle>
                  <h3>Product Details</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  {product._rawBody && (
                    <BlockContent blocks={product._rawBody.en || []} />
                  )}
                  <p>Made in India</p>
                  <p>All prices include sales taxes.</p>
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemTitle>
                  <h3>Delivery & Returns</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <ReactMarkdown source={home.productDeliveryInfo} />
                  <br />
                  <ReactMarkdown source={home.productShippingReturns} />
                </AccordionItemBody>
              </AccordionItem>
            </AccordionStyled>
            <ShareContainer>
              <h3>Share</h3>
              <div className="share-icons">
                <div className="level">
                  <div className="level-item">
                    <FacebookShareButton
                      url={metaUrl}
                      quote={metaTitle}
                      hashtag="#sejalsuits"
                    >
                      <i className="fab fa-facebook-square" />
                    </FacebookShareButton>
                  </div>
                  <div className="level-item">
                    <TwitterShareButton
                      url={metaUrl}
                      title={metaTitle}
                      hashtags={['sejalsuits', 'punjabisuits']}
                    >
                      <i className="fab fa-twitter-square" />
                    </TwitterShareButton>
                  </div>
                  <div className="level-item">
                    <EmailShareButton url={metaUrl} subject={metaTitle}>
                      <i className="fas fa-envelope" />
                    </EmailShareButton>
                  </div>
                </div>
              </div>
            </ShareContainer>
          </animated.div>
        )}
      </Spring>
    </>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,
};

export default ProductInfo;
