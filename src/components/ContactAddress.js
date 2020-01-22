import React from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';

const Address = styled.address`
  font-size: 0.9rem;
`;

const ContactAddress = () => {
  const location = useStoreState(state => state.user.location);

  return (
    <>
      {location.country === 'India' ? (
        <Address>
          6in.co
          <br />
          104, New Sarabha Nagar,
          <br />
          Jalandhar, Punjab
          <br />
          India
          <br />
          Tel: <a>0091-8847411956</a>
        </Address>
      ) : (
        <Address>
          6in.co
          <br />
          46 Waddens Brook lane,
          <br />
          Wednesfield, WV11 3SF
          <br />
          United Kingdom
          <br />
          Tel: <a>0044-121-318-9800</a>
        </Address>
      )}
    </>
  );
};

export default ContactAddress;
