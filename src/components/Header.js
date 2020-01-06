import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { darken } from 'polished';

const cartQuery = gql`
  query CartItems {
    cartItems @client {
      id
    }
  }
`;

const Container = styled.div`
  padding: 1rem 0;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
  margin-bottom: 2rem;

  .cart-count {
    font-size: 0.8rem;
    color: ${props => props.theme.mainBrandColor};
    margin-top: -14px;
    margin-left: 2px;
  }

  .navbar-brand {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .navbar-menu {
    padding-left: 6rem;
  }

  .navbar-item,
  .navbar-link {
    color: ${props => props.theme.textColor};
  }
  .navbar-link:not(.is-arrowless) {
    padding-right: 0.5;
  }
  .navbar-link:not(.is-arrowless)::after {
    display: none;
  }
  .navbar-item.has-dropdown:hover .navbar-link,
  a.navbar-item:hover {
    background-color: transparent;
    color: ${props => darken(0.75, props.theme.textColor)};
  }
`;

const Header = () => {
  const { data } = useQuery(cartQuery);
  const cartItems = data ? data.cartItems || [] : [];

  return (
    <Container>
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              6in
            </Link>

            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item has-dropdown is-hoverable">
                <Link to="/iphone" className="navbar-link">
                  iPhone
                </Link>
                <div className="navbar-dropdown">
                  <Link to="/iphone-11-pro" className="navbar-item">
                    iPhone 11
                  </Link>
                  <Link to="/iphone-11-pro" className="navbar-item">
                    iPhone 11 Pro
                  </Link>
                  <Link to="/iphone-11-pro-max" className="navbar-item">
                    iPhone 11 Pro Max
                  </Link>
                </div>
              </div>

              <div className="navbar-item has-dropdown is-hoverable">
                <Link to="/apple-watch" className="navbar-link">
                  Apple Watch
                </Link>
                <div className="navbar-dropdown">
                  <Link to="/apple-watch-leather" className="navbar-item">
                    Leather Straps
                  </Link>
                  <Link to="/apple-watch-steel" className="navbar-item">
                    Steel Straps
                  </Link>
                  <Link to="/apple-watch-sports" className="navbar-item">
                    Sports Straps
                  </Link>
                </div>
              </div>

              <div className="navbar-item has-dropdown is-hoverable">
                <Link to="/accessories" className="navbar-link">
                  Accessories
                </Link>
                <div className="navbar-dropdown">
                  <Link to="/airpods-case" className="navbar-item">
                    Airpods Case
                  </Link>
                </div>
              </div>

              <div className="navbar-item has-dropdown is-hoverable">
                <Link to="/help" className="navbar-link">
                  Help
                </Link>
                <div className="navbar-dropdown">
                  <Link to="/contact" className="navbar-item">
                    Contact
                  </Link>
                  <Link to="/shipping-info" className="navbar-item">
                    Shipping
                  </Link>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <Link to="/account" className="navbar-item">
                <i className="fas fa-user" />
              </Link>
              <Link to="/cart" className="navbar-item">
                <i className="fas fa-shopping-cart" />
                <div className="cart-count">{cartItems.length}</div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </Container>
  );
};

Header.defaultProps = {
  home: {},
};

Header.propTypes = {
  home: PropTypes.object,
};

export default Header;
