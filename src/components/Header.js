import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { darken } from 'polished';
import { useStoreState } from 'easy-peasy';
import ReactGA from 'react-ga';
import { filter } from 'lodash';

import config from '../utils/config';

const categoriesQuery = graphql`
  query allSanityCategory {
    allSanityCategory(sort: { fields: title, order: ASC }) {
      edges {
        node {
          id
          slug {
            current
          }
          title
          parents {
            id
            slug {
              current
            }
          }
        }
      }
    }
  }
`;

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
  @media only screen and (min-width: 1024px) {
    .navbar-dropdown {
      background: #282828;
      a.navbar-item {
        color: #a0a0a0;
      }
      a.navbar-item:hover {
        color: #ffffff;
      }
    }
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
  const data = useStaticQuery(categoriesQuery);

  // filter categories
  const allCategories = data.allSanityCategory.edges;
  const parentCategories = filter(allCategories, o => o.node.parents === null);
  const categories = parentCategories.map(o => {
    const children = filter(allCategories, oc => {
      return oc.node.parents !== null && oc.node.parents.id === o.node.id;
    });
    return { ...o.node, children };
  });

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
              <LogoImg src="/images/logo.png" alt={config.siteName} />
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
              onClick={() => {
                setIsActive(!isActive);
                ReactGA.event({
                  category: 'User',
                  action: 'Toggle Mobile Menu',
                });
              }}
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
              {categories &&
                categories.map(category => (
                  <div
                    key={category.id}
                    className="navbar-item has-dropdown is-hoverable"
                  >
                    <Link to={category.slug.current} className="navbar-link">
                      {category.title}
                    </Link>
                    {category.children && category.children.length > 0 ? (
                      <div className="navbar-dropdown">
                        {category.children.map(({ node: childCategory }) => (
                          <Link
                            key={childCategory.id}
                            to={childCategory.slug.current}
                            className="navbar-item"
                          >
                            {childCategory.title}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}

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
