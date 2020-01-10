import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { darken } from 'polished';
import { useStoreState } from 'easy-peasy';

const Container = styled.div`
  padding: 0 0;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};

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
    @media only screen and (max-width: 1024px) {
      padding-left: 1rem;
    }
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

const LogoImg = styled.img`
  height: 50px;
  max-height: 2.25rem !important;
  width: auto;
`;

const MobileCart = styled.div`
  margin-left: auto;
  margin-top: 5px;
`;

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const cartItems = useStoreState(state => state.cart.items);

  return (
    <Container>
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <LogoImg src="/images/6in-logo.png" alt="6in logo" />
            </Link>

            <MobileCart className="is-hidden-tablet">
              <Link to="/cart" className="navbar-item">
                <i className="fas fa-shopping-cart" />
                <div className="cart-count">{cartItems.length}</div>
              </Link>
            </MobileCart>

            <a
              role="button"
              className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarMain"
              onClick={() => setIsActive(!isActive)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div
            id="navbarMain"
            className={`navbar-menu ${isActive ? 'is-active' : ''}`}
          >
            <div className="navbar-start">
              <div className="navbar-item has-dropdown is-hoverable">
                <Link to="/apple" className="navbar-link">
                  iPhone
                </Link>
                <div className="navbar-dropdown">
                  <Link to="/apple/iphone-11" className="navbar-item">
                    iPhone 11
                  </Link>
                  <Link to="/apple/iphone-11-pro" className="navbar-item">
                    iPhone 11 Pro
                  </Link>
                  <Link to="/apple/iphone-11-pro-max" className="navbar-item">
                    iPhone 11 Pro Max
                  </Link>
                </div>
              </div>

              <div className="navbar-item has-dropdown is-hoverable">
                <Link to="/apple/apple-watch" className="navbar-link">
                  Apple Watch
                </Link>
                <div className="navbar-dropdown">
                  <Link to="/leather-straps" className="navbar-item">
                    Leather Straps
                  </Link>
                  <Link to="/steel-straps" className="navbar-item">
                    Steel Straps
                  </Link>
                  <Link to="/sports-straps" className="navbar-item">
                    Sports Straps
                  </Link>
                </div>
              </div>

              <div className="navbar-item has-dropdown is-hoverable">
                <Link to="/apple/airpods" className="navbar-link">
                  Airpods
                </Link>
                <div className="navbar-dropdown">
                  <Link to="/leather-airpods-case" className="navbar-item">
                    Leather Case
                  </Link>
                  <Link to="/silicone-airpods-case" className="navbar-item">
                    Silicone Case
                  </Link>
                </div>
              </div>

              <div className="navbar-item has-dropdown is-hoverable">
                <a href="#" className="navbar-link">
                  Help
                </a>
                <div className="navbar-dropdown">
                  <Link to="/contact" className="navbar-item">
                    Contact
                  </Link>
                  <Link to="/page/delivery-information" className="navbar-item">
                    Shipping
                  </Link>
                </div>
              </div>
            </div>

            <div className="navbar-end is-hidden-mobile">
              <Link to="/account" className="navbar-item">
                <i className="fas fa-user" />
              </Link>
              <Link to="/cart" className="navbar-item">
                <i className="fas fa-shopping-cart" />
                <div className="cart-count">{cartItems.length}</div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
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
