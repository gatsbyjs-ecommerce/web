import React from 'react';
import styled from 'styled-components';

import HomeSubscribeForm from './HomeSubscribeForm';

const Container = styled.section`
  background-color: ${props => props.theme.borderColor};
  padding: 3rem;
  text-align: center;
  align-items: center;
  h3 {
    line-height: 2.5rem;
  }
  .control {
    text-align: center;
  }
  input {
    color: ${props => props.theme.textColorDark};
  }
`;

const HomeSignup = () => {
  return (
    <Container className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-two-fifths is-offset-one-third">
            <p>Free Standard Shipping | 30 day returns</p>
            <h3 className="is-size-3">First Time Customer?</h3>
            <h3 className="is-size-3">Sign Up For 10% Off Now</h3>
            <HomeSubscribeForm />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomeSignup;
